---
layout: post
category : Heist-Game
tags : [changelog, heist]
tagline : In Which A Design Does Not Work
---
{% include JB/setup %}


## TL;DR

I've been working on ragdolls this week but the approach I took didn't quite work as expected so they're going to be done early next week instead.

## This week

As I said last week I've been planning to work on gameplay mechanics from now on. However gameplay mechanics needs a solid foundation and this week I decided to implement ragdolls - which I can then build a few other mechanics on top of. Ragdolls will support things like:

 - Killing/Incapacitating Someone (body collapses to the floor)
 - Dragging/Hiding bodies
 
And although they're not directly related, bodies are a component of:

 - Looting incapacitated characters
  - Stealing Keys
  - Stealing clothes (for disguises)
  - Deadly Vs Non-Deadly approaches to play
  
## Groundwork

The first thing I had to do for ragdolls was overhaul the animation system. An animation system has to do a few jobs:

 - Choose which animation clip is playing
 - Choose which frame is playing (based on the time)
 - Blend frames from multiple animation clips (if multiple animations are playing at once)
 - Interpolate between multiple frames if the time is not exactly on a keyframe
 - Calculate bone transforms
 - Calculate world transforms
 - Calculate skin transforms
 - Put the transform data into the right place in the rendering engine
 
Previously I had one big *AnimationController* class which did most of this work - but that was beginning to be a pain to maintain. So the first thing I did was split this into three classes, *AnimationQueue* which handles all the animation clip stuff:

 - Choose which animation is playing
 - Blend frame from multiple animation clips
 
*Animated* which handles most of the calculation:

 - Calculate world transforms
 - Calculate skin transforms
 - Put transform data into the right place in the rendering engine
 
And finally *PlayingClip* which handles playing back a single clip:

 - Choose which frame is playing (based on the time)
 - Calculating bone transforms (usually just reading them straight from an animation file)
 - Interpolate between multiple frames if the time is not exactly on a keyframe
 
### The Secret Sauce Is PlayingClip

Ragdolls are effectively procedurally generated animations - objects in the physics engine simulate particular bones and then you just need to supply that data, frame by frame, to the animation system. This new architecture has a class to do exactly that - PlayingClip is responsible for supplying the correct transforms for a particular point time. So all I have to do is place some objects into the physics engine, and create an instance of PlayingClip that copies transforms from them - **easy**.

## So All I Have To Do Is...

Yeah, it's never that easy is it. The question is - *what objects do I have to place in the physics engine and where do I have to place them*?

![Graphical Skeleton](/assets/ZoeBones.png)

As you can see here the character model already has a skeleton - this is the skeleton that is driven by the animation system whenever an animation is playing from file. It makes sense just to directly put these bones into the physics engine so there's a very close match up between animations from file and procedural animations from physics engine. Unfortunately the results were less than optimal:

![Less Than Optimal Results](/assets/Oh-God-I-Am-So-Sorry.png)

I'm so sorry for your loss.

So what happened? Well if you look closely at that diagram of the graphical skeleton again you'll see two problems:

#### 1) Hands And Fingers

Physics engines do not like lots of really small and fiddly objects. The graphical skeleton has lots of small and fiddly objects (all in close proximity) on the hands. This leads to a lot of instability which manifests as jittering - that horrible mess above actually looks much worse in game because it's *jittering* between various horribly deformed poses!

#### 2) Non Physical Bones

The graphical skeleton has a few bones with no vertices attached to them, for example the "root bone" runs from the floor (in between the two feet) up to the crotch and is the support which the rest of the skeleton is built on top of. The physics engine _Really Hates_ these bones with zero mass/volume (which leads to even more instability and jittering).

#### Why Don't We Just...

I tried a few things to fix this. For example the small bones around the fingers are troublesome because of their extremely low mass and tendency to collide with other fingers in troublesome ways - so I tried introducing a minimum mass limit (so fingers are much denser than the rest of the body) as well as making fingers not collide with one another. These kind of hacks *changed* the nature of the problems, but there were still some pretty nasty instability problems which make the system useless. In the end an amalgamation of hacks and workaround is not going to result is stable skeletons.

## Fine Then, *You* Make The Skeleton

In the end, I decided that the solution to this problem is to *not* use the graphical skeleton to generate the physical skeleton - they're used in different ways and there's just too much of a mismatch between them. Instead I started writing a content pipeline extension which allows you to define a skeleton in an XML and this will be processed into an efficient to load binary skeleton definition when you compile it. Although I wanted to avoid more content authoring workload if possible I don't think this is too bad - writing the skeleton definitions is pretty simple and then just needs a little bit of tweaking to get a good skeleton.

## Next Time

Hopefully I should get hand authored ragdolls done in a couple of days  and then I can move onto something else. I'm thinking either dragging bodies or hand to hand combat (although maybe I'll find something else entirely unrelated to ragdolls instead)!