---
layout: post
category : game-development
tags : [heist, game-development, general]
tagline : In Which A Lot Happens
---
{% include JB/setup %}

# TL;DR

2015 was a year of perpetually being close to ready.

# What Did I Do In 2015

In my [last retrospective](http://martindevans.me/game-development/2015/01/13/2014-Retrospective/) I said that I felt Epimetheus was a solid engine and I could spend 2015 working on gameplay instead of engine code. This *sort of* happened but every time I came to write some game code I discovered something in the engine needed some polish to get it to release quality!

## Open Source

I'm a massive fan of open source and release loads of my code publicly - I even hope to open source the entire Epimetheus engine and Heist game I've been working on later this year (probably after it goes on sale).

#### New Open Source Projects

 - **ZSharp** A very recent experiment in designing a *totally functional* language - this is a language which is statically guaranteed to terminate. Turing completeness is overrated!
   - Personal project
   - Do not depend upon this for anything
 - [**SwizzleMyVectors**](https://github.com/martindevans/SwizzleMyVectors) .Net4.6 brings new SIMD enabled vector types. SwizzleMyVectors adds a load of helpful structs and extension methods to them. Things such as rays, line segments, bounding rectangles and boxes are all included.
   - Actively used and maintained
   - Reported bugs will be rapidly fixed
   - PRs will be considered (breaking changes likely rejected)
 - [**Beautiful Blueprints**](https://github.com/martindevans/BeautifulBlueprints) A 2D layout system with YAML markup. Specifically designed for building facade layout but intended to be fairly generic for any 2D layout situation.
   - Actively used and maintained
   - Reported bugs will be fixed, but not rapidly if they do not impact my own usage of the library
   - PRs will be considered (breaking changes likely rejected)
 - [**Aimless Names**](https://github.com/martindevans/AimlessNames) A procedural human name generator.
   - Used in some of my code, but not something I'm actively working on at the moment
   - Reported bugs will probably sit until I come back to working on this code
   - PRs will likely be accepted

## Interesting Stuff

I love to learn new things, so every year I usually encounter a wide variety of fascinating things to learn about! Here's a few things I found cool this year (in no particular order):
   
 - [SpaceX](http://www.spacex.com/)
 - [Mars Colonisation](https://www.reddit.com/r/colonizemars)
 - [Liquid Rocket Engine Engineering](http://www.amazon.com/Engineering-Liquid-Propellant-Progress-Astronautics-Aeronautics/dp/1563470136)
 - [Operating System Development](http://wiki.osdev.org/Expanded_Main_Page)
 - [Microkernels](http://wiki.osdev.org/Microkernel)
 - [Minix3](http://www.minix3.org/)
 - [Dawn](http://www.nasa.gov/mission_pages/dawn/main/index.html)
 - [Rosetta](http://www.esa.int/Our_Activities/Space_Science/Rosetta)
 - [New Horizons](http://www.nasa.gov/mission_pages/newhorizons/main/index.html)
 - [Hibike! Euphonium](http://myanimelist.net/anime/27989/Hibike!_Euphonium)
 - [Knights Of Sidonia: Battle For Planet 9](http://myanimelist.net/anime/24893/Sidonia_no_Kishi:_Daikyuu_Wakusei_Seneki)
 - [Charlotte](http://myanimelist.net/anime/28999/Charlotte)
 - [Rust](https://www.rust-lang.org/)
 - [Home Automation](https://github.com/bastet)
 - [The Martian](http://www.amazon.co.uk/Martian-Andy-Weir/dp/1785031139/)
 - [Cinema Bizarre](https://en.wikipedia.org/wiki/Cinema_Bizarre)
 - [Celldweller](http://www.celldweller.com/eoae/)
 
## Game Development
My job is game development. Specifically writing my engine, Epimetheus, and my game, Heist.

### Changelogs

I largely stopped doing changelog videos in 2015 - the kind of features I was working on didn't seem terribly exciting to make a video about. With the city generator shaping up recently I'm hoping to start doing changelog videos again soon - and this time I will advertise them better!
   
### Character Control

I spent some time at the start of the year working on control schemes. Obviously this is incredibly important as *everything* the player does goes through the control scheme! If it's bad people will give up playing right away.

This work led me into a few other associated areas such as tools/weapons aiming (closely associated with control schemes, [decals](http://martindevans.me/game-development/2015/02/27/Drawing-Stuff-On-Other-Stuff-With-Deferred-Screenspace-Decals/) for visualising weapons impacts, camera control to ensure the camera doesn't clip level geometry, [sticky cover](http://martindevans.me/game-development/2015/02/17/This-Wall-Is-Sticky/) to make stealthy movement easier and [navmesh generation](http://martindevans.me/heist-game/2015/03/27/Cross-Chunk-Navmeshes/) for an experimental NPC aimbot to play against.

Now that this work is complete I have a character controller that makes it easy to quickly move in a stealthy way around an environment. As well as the ability to aim and use weapons and some basic NPC guards (still more work to do here) to play against. I'm pretty happy with how this all turned out, even if it was more work than I initially expected!

### Character Animation

A large part of the control system is choosing which animations to play. For example if a character wants to move across a gap from one piece of cover to another I probably want to play a short *dive roll* animation followed by a repeating *idle in cover* animation. This is a problem because the character I have been using is just a basic placeholder with a very basic set of animations (walk, run, fall, jump). In May I discovered a service called mixamo which allows you to create characters in their *Fuse* tool (kind of like a super advanced MMO character creator) and then buy animations to attach to the characters. Here's some examples which I threw together in no time at all:

<style>
 #image-container img {
 	max-height: 235px;
 	width: auto;
 }
 </style>
 
 <div id="image-container" align="center">
<img src="/assets/gangnam.gif" width="25%">
<img src="/assets/maraschino.gif" width="25%">
<img src="/assets/twerk.gif" width="25%">
</div>

I took several weeks trying to extract data from the downloaded mixamo files, rewriting my entire animation content and rendering pipeline in the process (very painful work), but unfortunately I failed to get it working. This turns out to be a known issue in Mixamo (something to do with the way the data is encoded). I will be coming back to character animation soon (it's critically important, if nothing else I can't have all the players and every NPC looking exactly the same).

### Procedural Generation

With control input done, and character animation on hand I moved on to generating interesting environments. I've been using the same test map for over a year (just jamming new features into the map) and it was starting to get pretty boring (and crowded)! In June I began work on an application called [NODE/Machine](http://martindevans.me/heist-game/2015/06/26/Node-Machine/). NODE/Machine is a *designer* for procedural worlds - it can connect to the game and send across your designs as you design them so you can fly/walk around them and tweak your design.

I last worked on procedural generation in 2014, laying down various base classes for representing the world. This was important work but didn't really generate anything interesting - I just output the most basic blocky designs to prove everything worked. With NODE/Machine I started building on top of these classes to design far more detailed generators for various parts of the city. The approach I have taken is for each generator to be scriptable using a YAML derived language so anyone can write new scripts describing parts of the world without having to write any C#!

With this technique I have written generators for [road layouts](http://martindevans.me/game-development/2015/12/11/Procedural-Generation-For-Dummies-Roads/), [lots](http://martindevans.me/game-development/2015/12/27/Procedural-Generation-For-Dummies-Lots/), building facades, building internals (order of floors, placement of vertical elements such as stairs) and I am currently working on floorplans. This work has taken most of my time in the last half of the year and I have been terribly bad about writing about it - this has changed just recently with my [procedural generation for dummies](http://martindevans.me/game-development/2015/12/11/Procedural-Generation-For-Dummies/) series.

### Mod API overhaul

Right at the end of 2014 I removed mod sandboxing. This was for a variety of reasons which you can [read about here](http://martindevans.me/heist-game/2014/12/22/Sandboxing-Is-Dead-Long-Live-Sandboxing/). Sandboxing the mods put a *lot* of limits on how I could write the API (this was one of the reasons for removing it) and so as I have worked on all these other things I have refactored and redesigned almost the entire API. The end result is a *far* nicer modding API which makes writing mods far more pleasant.

### Epimetheus

Epimetheus is my C# game engine which I am building alongside my game, Heist. The engine is designed to have excellent support for plugins which can add new functionality. Ultimately the Heist gamemode is simply a set of interdependent plugins loaded into the engine. Currently the engine is closed source, but hopefully that will change next year. I've skimmed my changelogs for the year, largely to remind *myself* what I achieved this year. Here's some highlights:

- Score service
- Primitive sounds engine enhancements
- Websocket based UI messaging System
- (Many) usability enhancements to entities
- Exposed rendering pipeline to plugins
- Built in memory index of plugins (speeds up instantiating plugin components)
- Implemented Screen Space Deferred Decals
- Improved resolution scaling of in game UIs
- Implemented 3D text rendering
- Fixed navmesh traversal across world chunks
- Implemented in world floating/holographic UI displays
- Implemented behaviour trees and exposed it to plugin system
- Removed custom sound engine and replaced it with [SupersonicSound](https://github.com/martindevans/SupersonicSound) (FMOD)
- Implemented loading FMOD sound banks from plugins
- Various quality of life improvements to world generator
 - Removing sources of non-determinism
 - Added extra sanity checks on parameters
 - Made deleting the world and creating a new one much easier
 - Exposed configuration of world generator to ReST API
- Added utilities for evaluating bezier/quadratic curves
- Experimented with, and eventually gave up on, Fody
- Replaced many plugin API return values with IReadonlyList&lt;T&gt; instead of T[]
- Massive swapover from using XNA vectors to using System.Numerics vectors
 - Also upgrade to .net 4.6 at the same time
 - Verified *every single* usage of Matrices and Vectors in the entire engine
 - Built [SwizzleMyVectors](https://github.com/martindevans/SwizzleMyVectors) project with various helper functions and types
- Implemented deferred depth peeled transparency
- Optimised memory usage
- Added support for native DLLs in plugins

### Placeholder.*

Placeholder.* is a series of low level game libraries which Epimetheus is built upon. Everything from content management to artificial intelligence. Currently these libraries are closed source, but I hope this will change next year - I'm considering open sourcing the libraries and selling commercial licenses to the unity gamedev crowd.

- Added an event with a reference to an entity when it is being disposed. Meaning properties from disposed entites can be inspected.
- Upgraded input service to only send events regarding input devices which are in use
- Moved polling of input devices to a parallel task
- Implemented network encoding of dimensional unit vectors using only 2 bytes
- Upgraded navmesh generation (various small improvements)
- Implemented "string pulling" algorithm to generate a straight path through a navmesh path
- Massive swapover from using XNA vectors to using System.Numerics vectors
- Rewritten convex hull generation to be faster, have a better worst-case runtime and be simpler