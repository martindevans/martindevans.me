---
layout: post
category : Personal
tags : [general]
tagline : In Which A Lot Happens
---
{% include JB/setup %}

# TL;DR

I released [Fancy Folders](https://assetstore.unity.com/packages/tools/utilities/fancy-folders-143763?aid=1100lJ2J), worked on an emulator/optimiser/compiler for an in game language ([Yolol](https://github.com/martindevans/Yolol)) and learned about PCB design ([KiCad](https://kicad-pcb.org/)).

# What Did I Do In 2018?

In my [last retrospective](https://martindevans.me/personal/2019/01/02/2018-Retrospective/) I talked about working on [Wet Stuff For Unity](https://assetstore.unity.com/packages/tools/particles-effects/wet-stuff-118969?aid=1100lJ2J) and the death of the Parsec project, a game development project which we worked on for the latter half of the year.

# Placeholder Software/Fancy Folders

One of the big changes to Placeholder Software this year came from attending the Unity Unite Europe conference in Copenhagen. This year there was an asset store publisher meetup - it was great to meet up with other people in the same business as us, and to put some faces to some Discord handles! While attending there we heard the same advice from everyone we talked to - open a discord server - [so we did](https://discord.gg/bBr4Ze). There were lots of smaller tips too, some of which we've quietly put into action and some of which will probably be the basis for big changes in the business in the future.

At the start of 2019 we released [Fancy Folders](https://assetstore.unity.com/packages/tools/utilities/fancy-folders-143763?aid=1100lJ2J) onto the asset store. This was an experiment into making a much smaller and cheaper asset than our previous products with a much broader appeal (every single person who uses Unity could benefit from Fancy Folders). As an experiment I have to conclude that it failed. The asset is cheap, which means that we need to drive a lot of sales to make it worthwhile. It's also highly integrated into the Unity Editor which makes it a lot of work to keep up to date.

Marketing is also not exactly our area of expertise - both of us at Placeholder Software are software engineers and we barely do any marketing for our other projects, ultimately referrals through the Unity Asset Store drives almost all of our sales. This works for quite unique assets with immediately obvious value such as Wet Stuff or Dissonance but doesn't really work for something like Fancy Folders.

While working on Fancy Folders we've continued to provide support and updates for Dissonance. Dissonance is now very stable, with the reported issues generally being quite rare (and hard to track down) or caused by a regression in a version of Unity. We pushed out 7 updates in 2019 with a number of improvements:

 - Improved Editor Appearance (better VU meters)
 - Improved Editor Experience (better "dirty" marking of components)
 - Added VAD sensitivity support
 - Added assembly definitions
 - Added runtime permissions checking for Android
 - Added a workaround for a Unity regression (Dissonance would fail to load about 10% of the time!)
 - Added better handling for missing/corrupted DLLs (run with disabled functionality instead of crashing)
 - Added support for Magic Leap (thanks to ML for lending me a device to test on!)
 - Added network backend for [Mirror](https://github.com/vis2k/Mirror)
 - Added ultra low latency support for LAN use (a surprisingly frequent request)

As you can see there are all fairly small iterative improvements to a very stable base, which is a situation I'm very happy about!

# Overcrowded / Unity DOTS ECS

Since April we have been working on a big new project (working title: crowds) which is for simulating the movement of NPCs in games - a little bit like [A* Pathfinding Project](https://assetstore.unity.com/packages/tools/ai/a-pathfinding-project-pro-87744?aid=1100lJ2J) but with a focus on much larger groups of NPCs moving freely or in Formation.

We knew right from the start that simply using gameObjects was not going to be viable for the kind of scale we want to achieve. Initially we developed it using gameObjects and components as a kind of "front end" for the developer which accessed data in a simulation object, internally the sim was built as a special purpose ECS which scheduled jobs to process buffers of data. This was a _total nightmare_ - managing ownership of data buffers in a way that satisfied the Unity job system was a constant source of pain and working around the job system safety checks was a constant source of brittle code. We persisted with this approach for about a month but was obvious that it was seriously hurting our pace of development and would never result in code that meets our standards for release.

So we swapped to the Unity DOTS ECS. This was something we were _very_ reluctant to do - part of the reason that we killed Parsec was the technical risk introduced by the Unity ECS being a constant moving target which required us to frequently refactor every single system in the game. Additionally most Unity developers are not using ECS, don't understand ECS and don't plan to move to ECS (soon) so we didn't want to make Crowds be an ECS only asset. This has resulted in a bit of a strange hybrid - the core of crowds is entirely in the ECS and scheduled with jobs (it scales with number of cores very well) but the "frontend" for creating and interacting with agents is still gameObjects and components. This hybrid is an evolution of what we used in Parsec, so it's nice that something good has come from that work!

# Blogging

I've been ~~really bad~~ _nonexistant_ at updating the blog this year. I've encountered plenty of interesting programming problems with both my work/Unity projects as well as some very interesting side projects. I've simply not been in the habit of blogging about these things, I really hope I can get back into writing about things next year.

# Starbase/Yolol

Back in May Frozenbyte [announced](https://www.frozenbyte.com/2019/05/starbase-a-new-sci-fi-mmo-game-by-frozenbyte-revealed/) a new game coming soon called **Starbase**. This is an open world space game with a big focus on detailed engineering of ships (power/data/fuel/structural integrity are all important aspects). This _really_ looks like my kind of thing, so I was very excited.

Another aspect of the game is a language called Yolol which can be used for some limited scripted of devices within the game. They put out a wiki which included a detailed description of the language and so within a couple of weeks of the announcement I [released an emulator](https://github.com/martindevans/Yolol) for the community to use!

I also joined a community that emerged from the Starbase community called CYLON which is primarily intended as a place to learn Yolol at all levels, basic syntax up to designing a full in game interplanetary networking internet using Yolol powered routers. Although CYLON still has a main focuss on StarBase and Yolol it's also evolved into a fun place to discuss software development with like minded people.

# Open Source

I'm a huge fan of open source - I have published [145 GitHub repositories](https://github.com/martindevans?tab=repositories) over the last 10 years!

### [Yolol](https://github.com/martindevans/Yolol)

This has been my biggest side project of the year. Initially it started off as a basic parser/interpreter for Yolol. After that I started adding utilities for inspecting and transforming the syntax tree which soon evolved into basic optimisation passes which rewrite Yolol into better Yolol. After that I read a bit about how compilers work and added a `Control Flow Graph` analsysis pass to the system which can be used for far more complex optimisations. Most recently I have been experimenting with converting small parts of the CFG into an SMT solver (Z3) so I can drive optimisations based on the logical deductions of the solver.

I didn't really know anything about how the internals of compilers worked at the start of this year, so although this might sound like a lot of work for a toy language it's been worth it as a learning project. Compilers are some of the most complex and important tools I interact with on a daily basis, it's nice that they're not quite such a black box any more!

### [Yolol.IL](https://github.com/martindevans/Yolol.IL)

This is another interesting learning project masquerading as a useless Yolol project. `Yolol.IL` compiles Yolol code into dotnet IL code - in theory making it extremely fast to execute. This is a side project to a side project so development on it is pretty slow, I haven't had time to profile it yet.

# Interesting Stuff

Some other interesting things I encountered in 2019 in no partiucular order:
 - [SpaceX](http://www.spacex.com/)
 - [Unite Copenhagen Conference](https://unity.com/event/unite/2019/copenhagen)
 - [Starbase](https://store.steampowered.com/app/454120/Starbase/)
 - [Legion ECS](https://github.com/TomGillen/legion)
 - [Cities Skylines](https://store.steampowered.com/app/255710/Cities_Skylines/)
 - [KiCad](https://kicad-pcb.org/)
 - [Fusion 360](https://www.autodesk.co.uk/products/fusion-360/overview)