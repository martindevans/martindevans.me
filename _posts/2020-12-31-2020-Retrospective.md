---
layout: post
category : Personal
tags : [general]
tagline : In Which A Plague Occurs
---
{% include JB/setup %}

# TL;DR

Overcrowded is nearly ready for release. COVID19 sucks.

# What Did I Do In 2018?

In my [last retrospective](https://martindevans.me/personal/2019/12/31/2019-Retrospective/) I talked about releasing [Fancy Folders](https://assetstore.unity.com/packages/tools/utilities/fancy-folders-143763?aid=1100lJ2J), beginning development on Overcrowded and getting into the [Starbase](https://www.frozenbyte.com/2019/05/starbase-a-new-sci-fi-mmo-game-by-frozenbyte-revealed/) community.

# Placeholder Software

This year we've released 11 updates for Dissonance with a number of improvements:
 - Fixed strange inspector behaviour when editing prefabs (due to a change in how Unity handle prefabs)
 - Fixed the editor crashing when inspecting the AEC filter (due to a Unity bug)
 - Fixed muted players not being unmuted instantly 
 - Fixed an issue that could cause voice packets to be dropped or long periods of time!
 - Dropped support for Unity 2017.4
 - Improved VU meters in inspector
 - Removed support for spatializer plugins (due to a change in Unity)
 - Improved precision of audio sync system
 - Improved audio quality in poor network conditions
 - Improved Automatic Gain Control handling of silence
 - Added better support for custom microphone systems
 - Released a free integration with [NatDevice](https://assetstore.unity.com/packages/tools/integration/natdevice-media-device-api-162053?aid=1100lJ2J)
 - Added support for Windows+ARM64 (e.g. Hololens 2)

As you can see there haven't been any huge changes this year. At this point Dissonance itself is quite stable and most of the changes are small improvements to a specific subsystem or fixes to workaround issues in Unity! I'm overall pretty happy with how Dissonance is at the moment.

We've also released 3 updates to Wet Stuff:
 - Fixed a loading loop that could lock up the editor (due to a change in Unity)
 - Fixed an `ArgumentOutOfRangeException` in the instanced rendering system
 - Removed some (harmless) warnings that were confusing users
 - Added a warning about using 2D mode in scene view (incompatible with Wet Stuff)
 - Dropped support for Unity 2017.4
 - Added support for "Mesh" shaped decals instead of just sphere or box shaped

Again no huge changes here, mostly just small tweaks to improve the overall user experience. `Mesh` type decals are a pretty major feature from an end user perspective, but actually were quite simple to implement!

# Overcrowded

Since mid 2019 we've been working on this huge new project. Overcrowded is intended as a full toolkit to handle the movement of agents in the scene. It does pathfinding (currently using the Unity pathfinder, but we'd like to replace that in the future) but that's not really the main focus of the project. The main focus is what comes _after_ pathfinding: how to get agents to move naturally along paths. This is split into two main systems: global planning and local planning.

**Global Planning** is where you look at the high level goals of the agent (e.g. follow this path) and then come up with a way to achieve them (e.g. walk towards the next waypoint). This is something you're familiar with if you've used anything like [steering behaviours](https://www.red3d.com/cwr/steer/gdc99/). However, basic steering behaviours have serious problems when you try to compose them, for example they can cancel out and cause the agent to move nowhere. You can add hacks on to try and fix this, but they're really just fundamentally broken. Overcrowded has a much more advanced system of ["Context Aware Steering Behaviours"](https://crowds.readthedocs.io/en/latest/GettingStarted/SteeringBehaviours/) which aggregates all of the steering impulses into a "context" and then picks the best direction to move from that context - it will never get stuck with two impulses cancelling out. The context also naturally supports negative steering behaviours which cause an agent to _not_ steer in a given direction - that's _not_ the same as actively steering away from it it's simply discouraging moving in that direction. This actually turns out to be incredibly powerful and as I've used the systems I've often found myself _mostly_ using negative steering behaviours combined with just one or two positive behaviours.

**Local Avoidance** is where the agent looks at the immediate area around it and decides where it should walk for the next one or two steps. This might sound pretty simple but is actually quite complex and is incredibly important to natural looking movement - humans moving in a crowded will tweak their movement direction to avoid collisions with other people, taking into account how those other people will also tweak their movement to avoid collisions. Initially when we started working on Overcrowded we thought that we'd simply be able to implement an algorithm directly from [some](http://gamma.cs.unc.edu/ORCA/) [academic](http://gamma.cs.unc.edu/PLE/pubs/PLE.pdf) [papers](http://gamma.cs.unc.edu/CompAgent/egMain.pdf) on the topic, but it turned out that all of these algorithms had bad behaviour in various different edge cases which made them unacceptable to use in a game. On top of that the performance of many of these algorithms left a lot to be desired! Instead we've developed an entirely new local avoidance system that is faster, simpler, cleanly handles most bad cases, is easily extensible and is even built with GPU computation in mind!

"That sounds awesome, where can I buy it?", you're thinking. Well... you can't yet. We're very close to an initial release, so watch this space. If you're _really_ interested in trying out this system please send me an email (`martin@placeholder-software.co.uk`) expressing your interest and I can probably give you an alpha version to try out. We really appreciate the feedback :)

# Blogging

Well, I did better than last year at least with my blog post summarising "The Yard Sale", a game design technique developed by [Zac McClendon](https://twitter.com/zakmcc) which I'm a big fan of. I wrote this blog post to explain the technique to a team I wanted to use it with for...

# Bounded Planet

[Bounded Planet](https://github.com/CylonSB/bounded-planet) was a game development project with the people from the Cylon Discord server I spend a lot of time hanging out in. The idea grew out of a discussion about an MMORTS I used to play called [Boundless Planet](https://web.archive.org/web/20171128191210/http://www.boundlessplanet.com/). We came up with a plan to write a similar game together in Rust using the [Bevy game engine](https://bevyengine.org/). We made some decent progress with a basic network system, adapting [EGUI](https://github.com/emilk/egui) to render in Bevy, simple landscape generation and rendering and some camera movement.

Unfortunately we could never agree on a good design and the project is mostly dead. All of our design sessions basically degenerated into arguments about how much the game should be a clone of Supreme Commander. The strength of the Yard Sale technique is that it allows you to define some guiding principles and then iteratively create/discard features until you arrive a set of features that satisfy your overall design principles, often that final feature set may not be at all like what you initially imagined _which is a good thing_ - it means you've discovered some new ideas! However, if this isn't kept in mind by everyone involved it becomes an argumentative process as everyone tries to redefine the core principles to support their pet features. I think the "Yard Sale" technique really works better if you're all physically present and moving the cards around on a pinboard.

# KiCad

Lockdown sucks and everyone needs a hobby to get through it. I've taken up PCB design and soldering of the completed boards (ordered from JLC) to pass the time. This is a really fun combination of browsing datasheets and electronics stores for interesting parts, learning enough about electronics to design the schematics and then routing the traces on the actual board. Here are a few boards I've designed this year:

<div class="image-container" align="center">
  <img src="/assets/pcb1.png" />
  <img src="/assets/pcb2.png" />
  <img src="/assets/pcb3.png" />
  <img src="/assets/pcb4.png" />
</div>

I have a long term goal of designing something good enough to sell on [Tindie](https://www.tindie.com/). I don't really expect to sell very many, but it'd be cool to have something good enough to manufacture and sell in (very small) runs. Maybe some kind of hat for the Raspberry Pi400, if I can work out what functionality to put in it!

# Interesting Stuff

Some other interesting things that I encountered in 2020 i no particular order:

 - [Neptune's Pride](np.ironhelmet.com)
 - [Bevy](https://bevyengine.org/)
 - [SpaceX](http://www.spacex.com/)
 - [JLC Component Catalogue](https://yaqwsx.github.io/jlcparts/)
 - [CircuitJS](https://www.falstad.com/circuit/circuitjs.html)
 - [3flab](https://3fl.jp/portfolio/sidonia/)
 - [PCBWay](https://www.pcbway.com/)
 - [/r/cyberdeck](https://www.reddit.com/r/cyberDeck/)
 - [Raspberry Pi 400](https://www.raspberrypi.org/products/raspberry-pi-400/)
 - [Terminal.GUI](https://github.com/migueldeicaza/gui.cs)
 - [Zig](https://github.com/ziglang/zig)