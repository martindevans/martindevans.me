---
layout: post
category : Heist-Game
tags : [changelog, heist]
tagline : In Which An Intense Dislike For Sand Is Revealed
---
{% include JB/setup %}


## TL;DR

Removed sandboxing, it was too slow.

## Wait No Video?

No video this week, I spent most of my time chasing down a performance problem and solving it.

## This Week

For a long time I've had a problem with performance in the Epimetheus Engine -  in _some_ rare circumstances performance would absolutely tank (down to less than 1 frame per second sometimes). This was caused by the way sandboxing was done.

#### What Is Sandboxing?

Epimetheus is an engine built for plugins - there is no game called "Heist", just a plugin to the Epimetheus Engine. Without plugins there isn't even a main menu! A problem with plugins is that they *could* be a security problem - after all anyone can write plugins. To fix this the plugins have always been loaded into a separate "AppDomain", this is a .Net concept which is a bit like a separate process. The important thing with AppDomains is you can set permissions onto them, for example ban the entire scripting Domain from reading or writing any files on disk!

#### Sandboxing Is Awesome!

No, it's not. I mean AppDomains are a nice idea but their implementation turns out to have some big drawbacks.

First up is garbage collection. In C# memory management is done through a garbage collector (GC) - to free up some memory you just get rid of all references to it and the GC will clean up that memory for you - this is a fundamental part of the language. Except in AppDomains. When you have an object in another AppDomain it's no longer enough to hold a reference to it, instead you have to have some complex code to do with sponsoring the lifetime of the object. Basically this means that I occasionally got an error caused by having a reference to an object in the other AppDomain that has been garbaged collected. This is actually a programmer error, but when you mess around with something as fundamental as changing the entire memory management system that's what you get!

Second is communicating across the AppDomain boundary. In C# (and basically every other language) there are two types of type: *Value Types* are passed by value, and *Reference Types* are passed by reference. This means that if I pass a value type to you then you simply get a copy of the value but if I pass a reference type to you then you actually get a pointer to the same object. Again, this is pretty fundamental to the language. When you pass objects across the AppDomain boundary they are almost always serialized (i.e. *Value Type* behaviour) **even if they're a reference type**. This is confusing as hell to program with! Again, we're messing around with something fundamental to the language and practically *encouraging* programmer errors!

Third is performance. It is possible to pass objects across the AppDomain boundary by *reference* rather then by *value*. What this actually does is pass a proxy value across the boundary (by value) and then when a method is called on the proxy it calls back to the real object in the other AppDomain. So here's a simple bit of code:

    //This class is instantiated in the engine, and passed by reference into the AppDomain
    class MyClass
    {
        int value;

        int GetInteger()
        {
            return value++;
        }
    }
    
    //This code runs in a plugin
    MyClass instance = /* value by reference from engine */
    int sum = 0;
    for (int i = 0; i < 10000; i++) {
        sum += instance.GetInteger();
    }
    
Pretty simple stuff - this is just looping 10,000 times and summing up the integers it gets. i.e. 10,000 integer additions and 10,000 method calls - this is *really* basic stuff and computers can do both of these things *really* fast. In fact this takes just 0.27ms to execute on my PC! Let's include AppDomains; if I run exactly the same test except this time I run the loop inside another AppDomain this test takes 11.3ms - **AppDomains are 37.7 times slower at method calls**! This isn't just breaking something fundamental to the C# programming model, this is breaking something fundamental to programming computers in general, this is *begging* for programmer errors.

Believe it or not these were just the primary problems with sandboxing, there were more but I don't want to bore you with a huge list of problems!

#### Sandboxing Sucks.

There's only one solution to this: remove AppDomain based sandboxing. Actually removing sandboxing didn't take me very long, but once sandboxing was gone there were a whole lot of warts in the plugin API that I could fix.

 - Asynchronous tasks can now return a Task object (previously I could not send Task into the other AppDomain)
 - Asynchronous tasks can be cancelled (previously cancellation tokens could not be sent into the other AppDomain)
 - Referencing scripts (internal engine stuff) is more robust
 - Callbacks now just implemented as normal event handlers (previously I could not send event handlers to the other AppDomain, so I had to invent my own bastardized version)
 - No more horrible performance pitfalls for plugins!

## What's Next?

I did get a little work done on the aimbot (which I mentioned last week as my goal for this week), in fact it's more or less done now. I'm going to go full steam ahead for a multiplayer test sometime in the next two weeks - I'd like to get it done this week but I hear there's some little event going on mid week ;)