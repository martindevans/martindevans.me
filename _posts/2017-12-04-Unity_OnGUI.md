---
layout: post
category : Unity
tags : [Unity, Programming]
tagline : In Which A Code Pattern Is Discussed
---
{% include JB/setup %}

# TL;DR

I've encountered a this issue when using Unity GUI several times:

`ArgumentException: Getting control 1's position in a group with only 1 controls when doing Repaint`

Here's how to fix it...

# Unity IMGUI

Unity has two GUI systems. There's the [component based GUI system](https://docs.unity3d.com/Manual/UISystem.html) which has a hierarchy of control components placed into the scene graph - this is pretty good for building complex in game GUIs.

Then there's the scripting based [Immediate Mode GUI](https://docs.unity3d.com/Manual/GUIScriptingGuide.html) (IMGUI). IMGUI isn't really intended to be used for game UIs but it's great for building debugging displays or Unity editor extensions. With IMGUI it's trivial to build a UI:

```
void OnGUI() {
  if (GUILayout.Button("Say Hello"))
    Debug.Log("Hello!");
}
```

I use this a _lot_ for building all of the various editor extensions for [Dissonanc](https://www.assetstore.unity3d.com/#!/content/70078?aid=1100lJ2J) requires as well as the UI for the various demo scenes. 

# The Error

Several times when developing UIs with this system I have encountered the following error:

> ArgumentException: Getting control 1's position in a group with only 1 controls when doing Repaint

This is a little cryptic! Usually this will happen when I'm building a complex UI which has multiple states controlled by the UI itself.

The problem comes from the way the IMGUI works. It does not simply get called once a frame, instead it gets called multiple times and each time it does the `Event.current` property is different (indicating the reason the call happened). There are two particularly important events, `Layout` and `Repaint`. **Layout** is the first event to happen each frame. **Repaint** is the last event to happen each frame.

So we can understand part of the error message now - when it refers to "Repaint" it's referring to the last event to be processed. The rest of the error message is relatively clear to decode to, it's trying to get the position of a control which doesn't exist!

Based off this knowledge here's a fairly contrived example which demonstrates the problem:

```
private void OnGUI()
{
    if (Event.current.type == EventType.Layout)
    {
        GUILayout.Label("A");
    }
    else
    {
        GUILayout.Label("B");
        GUILayout.Label("C");
    }
}
```

This is deliberately creating 2 controls during repaint even though only 1 exists during layout. The sequence of events in a single frame will be:

 - Layout
   - Choose position for A
 - Repaint
   - Paint A at position chosen earlier
   - Paint B at position chosen earlier - throws exception!

Obviously in my real world UIs I'm changing the state of things in between the Layout and Repaint event and causing this to happen inadvertently.

# The Solution

I've adopted a solution to this (it's actually been invented twice in the development of Dissonance, once by Tom and once by me). The idea is to keep major state changes away from the OnGUI method. Usually for a complex GUI you might do something like this:

```
enum State { A, B, C }

State _state;

void OnGUI()
{
  switch (_state)
  {
    case State.A: DrawGuiA(); break;
    case State.B: DrawGuiB(); break;
    case State.C: DrawGuiC(); break;
  }
}
```

The problem with this is that if you swap state at any point here you'll almost certainly cause the error (because there's probably a very big change in the UI layout when state changes).

Instead, try doing something like this:

```
interface IState : IDisposable
{
  void Activate();
  IState OnGUI();
}

class A : IState { /** skipped **/ }

class B : IState { /** skipped **/ }

class C : IState { /** skipped **/ }
```

Here I've defined an interface to represent UI states. It's important to note that the GUI no longer mutates the state, instead it _returns_ another state object which is the next UI state (it can return itself, if it hasn't changed).

```
private void OnGUI()
{
  var next = _state.OnGUI();
  
  //Early exit if transitioning to self
  if (ReferenceEquals(next, _state))
    return;
  
  //If we already have a next state, overwrite it
  if (_nextState != null)
    _nextState.Dispose();
    
  //Save next state
  _nextState = next;
}
                
private void Update()
{
  if (_nextState != null)
  {
    //Discard the current state
    _state.Dispose();
    
    //Move to next state
    _state = _nextState;
    _nextState.Activate();
  }
}
```

Here we're saving that `IState` return value and (if it's different) transitioning to it in the `Update` method - this keeps the complex changing UI of UI layout _away_ from the OnGUI method where it can cause trouble!