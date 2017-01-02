---
layout: post
category : Game-Development
tags : [heist, game-development, general]
tagline : In Which A Lot Happens
---
{% include JB/setup %}

# TL;DR

I started a company, but not doing what I expected.

# What Did I Do In 2016?

In my [last retrospective](http://martindevans.me/game-development/2016/01/04/2015-Retrospective/) I opened by saying that Epimetheus was a solid engine which I had spent more time (in 2015) developing features of. Towards the end of 2016 and for the first half of 2016 Epimetheus was a very solid platform - I made updates only every few days (fixes and minor API enhancements) while mostly working on stuff on top of the engine.

## Floorplan Generation

The main meat of my work was on the [Base-CityGeneration library ](https://bitbucket.org/martindevans/base-citygeneration/commits/all) which is the base of all procedural generation for Heist (my game built with Epimetheus). At the end of 2015 I finished off road generation and building shell generation so my work at the start of 2016 was on floor plan generation, this is by far the most complex of *any* procedural generation I have ever attempted. I think it's telling that although there are millions of articles on procedural texture generation or landscape generation and there are a fair few on the more complex problems like road generation or building shell generation there is almost *nothing* in the blogosphere or published articles about floorplan generation. Most systems I could found had annoying restrictions like the floor generates inside an area made entirely of rectangular corners, which is almost useless if you want to generate interesting building shells!

My first work on floorplans was building a low level system for handling the representation of 2D space. This system should be able to handle queries about shapes such as what other shapes neighbour this shape, exactly where along the walls do they overlap and how far away is the neighbour. I also built a system (based on this) which could convert a set of non-overlapping rooms into a list of brushes for a CSG system - this handles complexities such as subdividing the walls into sections, running the facade generators on each wall and slotting little miter brushes in between the walls to join everything up. This results in something like this:

<style>
 #image-container img {
 	max-height: 235px;
 	width: auto;
 }
</style>

<div id="image-container" align="center">
  <img src="assets/FloorPlanPrototype.png" width="40%">
</div>

Once this sytem was complete (it took a while, making these kinds of generic data structures for accelerating computational geometry is devilishly complex) I moved onto experimenting with generating actual floor plans. My initial experiments focused on specifying constraints on rooms like min size, max size, must connect to X, at least N must exist etc, then a generic constraint solver ran over these constraints and placed the rooms into appropriate places. Rules were specified in order of importance so less important rules could be violated to satisfy more important ones - for example the bathroom often ends up being squashed below it's min size or into some awkward shape which is often true of real architecture! This system was *incredibly* cool and generated some very nice example layouts in my initial tests. Howevever this didn't scale at all, as soon as I started introducing odd building shapes (e.g. something as simple as a non convex building) the constraint solver would end up following dead ends and never find an appropriate solution (the algorithmic complexity is probably out of this world). This was a shame and I'd really love to pursue this line of research again in the future (maybe using a more powerful constraint solver, they get better all the time).

I moved on to something much simpler. Rather than generating floorplans based off realistic constraints I would generate some acceptable rooms shapes and then tweak them into useful floor plans by merging together rooms which are too small, slightly moving border walls and then assign rooms functions to generated shapes *after* the fact. This iterative method is basically guatanteed to produce *something* since if it gets really confused it can just stop tweaking and use whatever it has. I generated my initial floor plans with a growth based system which seeded the outer walls at regular intervals, grew walls inwards and tended to split and merge walls with 90 degree corners. I did some additional work to trace corridors along rooms walls to get the floorplans into the game:

<div id="image-container" align="center">
  <img src="assets/floorplan-teaser.png" width="40%">
  <img src="assets/floorplans-in-game.gif" width="40%">
</div>

## Placeholder Software

Ever since making silly little games in visual basic I've always used the moniker "Placeholder Software" as a company name for my work, the plan was always for me to turn this into a real company once Heist was ready for release. In September 2016 Placeholder software did finally become a real company but not in the way I had imagined! My friend [Tom Gillen](https://github.com/TomGillen) quit his job (software dev, but not game dev) with the intention of doing something related to gamedev for a year to enhance his CV and then looking for a job in the industry. We hatched a plan to devlop Unity assets together (and make some money too, yay).

Our first product *Dissonance* will release _tomorrow_ (exciting and terrifying all at once). I'll post another blog post with more information about that in the next few days (I'll probably do a short series on some of the interesting technology involved in the asset).

## Open Source

I'm a massive fan of open source and try to release as much of my code as possible. When developing Epimetheus I would often publish basic packages I developed as part of that as totally separate nuget packages (e.g. [SwizzleMyVectors](https://github.com/martindevans/SwizzleMyVectors) is a set of basic extensions to the dotnet vectors). I've slowed down a little on the open source this year because I haven't been developing Epimetheus and simply haven't needed to write so many low level packages (Unity is fairly "batteries included"), hopefully as I get to know Unity better I'll be able to identify more basic things which are missing and release some open source solutions.

 - **Sushi Crash**
   - A side project to develop a bot capable of playing Dota 2 using the new Lua API added with the 7.0 patch (mid December). I'm hoping for a TI bot tournament in 2017 ;)
   - Personal project
   - Do not depend upon this for anything
 - [**Handy Collections**](https://github.com/martindevans/HandyCollections)
   - A collection of... collections. Various datastructures I have needed over the years have been built into this library. I depended upon this for Epimetheus and some bits of it are in use in Dissonance.
   - Actively used and maintained
   - Reported bugs will be rapidly fixed
   - PRs will be considered (breaking changes likely rejected)
 - [**ExternalProcessLauncher-Unity**](https://github.com/martindevans/ExternalProcessLauncher-Unity)
   - A tiny library (single file you can copy into a unity project) which allows you to launch an external process from the Unity launcher. This is intended for when you want to move work out of the Unity editor into another process (e.g. in another language). Handles starting and stopping the process when the editor opens/closes.
   - Actively used and maintained
   - Reported bugs will be rapidly fixed
   - PRs will be considered (including breaking changes)
 - [**HashMedly**](https://github.com/martindevans/HashMedly)
   - Everyone always implements the csharp `GetHashCode` method wrong, this library is intended to fix that.
   - Actively used and maintained
   - Reported bugs will be rapidly fixed
   - PRs will be considered (breaking changes likely rejected)

## Interesting Stuff

I love to learn new things, so every year I encounter a wide variety of interesting things. Here's a few random things I found interesting this year (in absolutely no order):
 - [Oculus Touch](https://www3.oculus.com/en-us/rift/)
 - [SpaceX](http://www.spacex.com/)
 - [Mars Colonisation](https://www.reddit.com/r/colonizemars)
 - [Microkernels](http://wiki.osdev.org/Microkernel)
 - [Houyhnhnm Computing](https://ngnghm.github.io/)
 - [Urbit](https://www.urbit.org/)
 - [Prusa i3 MK2](http://shop.prusa3d.com/en/3d-printers/59-original-prusa-i3-mk2-kit.html)
 - [Vivaldi](https://vivaldi.com/)
 - [The Laundry Files](https://www.goodreads.com/series/50764-laundry-files)
 - [Midori](http://joeduffyblog.com/)
 - [Unity3D](https://unity3d.com/)
 - [Children Of A Dead Earth](http://store.steampowered.com/app/476530/)
 - [Mi Band 2](http://www.mi.com/en/miband2/)
 - [Servo](https://servo.org/)
 - [Game Maker's Toolkit](https://www.youtube.com/user/McBacon1337)