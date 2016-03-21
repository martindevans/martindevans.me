---
layout: post
category : Game-Development
tags : [heist, game-development, general]
tagline : In Which A Lot Happens
---
{% include JB/setup %}


## TL;DR

2014 was a pretty cool year.

## What Did I Do In 2014?

In my [last retrospective](/heist-game/2014/01/01/730-Days-Later/) I had just completed removing the Lua API and had high hopes for being on greenlight within the year, obviously this was *hopelessly* optimistic (let's face it, you're not qualified to be a programmer if you can estimate timetables). Despite this failing to happen 2014 wasn't a disappointing year - quite the opposite! Epimetheus has reached the stage where I feel like it's a solid engine and I can spend most of my time doing game development instead of engine development, in theory I should be able to very quickly make new and simple gamemodes now.

### Japan

The big event of 2014 was, of course, my three and a half week trip to Japan! I took something like 2000 pictures and put together an album [here](/japan2014.html).

### Changelogs

The biggest change to how I do development in 2014 was my changelog videos - a quick video update released every week on Sunday telling people about "what's new and what's changed in the game". I've skipped over a few of these on weeks when my work wasn't particularly easy to demo, and I've managed to do 24 in total (roughly one every two weeks). What I *haven't* done with the changelogs yet is advertise them to try and get a decent number of viewers, this is something I should really start doing once I restart the videos (this week or next week).

### Open Source

I continue to be a massive fan of open source and release a lot of my code publicly (MIT License FTW). This year I have made some pretty cool contributions to open source, all of which are [available on github](https://github.com/martindevans).

#### New Open Source Projects

##### [WebDesktop](https://github.com/martindevans/WebDesktop)
  - A project to render a webpage over your desktop - desktop widgets using a web stack!
  - Not currently actively developed, but it pretty much works and I'd like to do more work on it sometime.
  
##### [SupersonicSound](https://github.com/martindevans/SupersonicSound)
  - A very lightweight C# wrapper for [FMOD](http://www.fmod.org/)
  - Largely complete, actively developed.
  
##### [Bastet](https://github.com/martindevans/Bastet)
  - A [CoAP](https://en.wikipedia.org/wiki/Constrained_Application_Protocol)/HTTP Proxy server for smart home devices
  - Not *currently* actively developed, we're working on other smart home stuff at the moment but Bastet is very core to the whole thing.
  
##### [LCARS](https://github.com/martindevans/LCARS)
  - A CSS framework for Start Trek style LCARS interfaces
  - Not actively developed, works for a few basic demo interfaces.
  - This project was just for fun and was a good way to learn various web things (Typescript, LESS, node, HTML5 custom elements).
  
##### [Sorcery](https://github.com/martindevans/Sorcery)
  - A library for evaluating [Combinator Algebras](https://en.wikipedia.org/wiki/Combinatory_logic) in C#.
  - This one was just for fun, I might pick it back up or I might not.
  
##### [KeybaseFSharp](https://github.com/martindevans/KeybaseFSharp)
  - An F# wrapper around the [Keybase](https://keybase.io/) API.
  - Also a WPF desktop client for Keybase.
  - This project was a way to learn about F#, and then became a way to learn about WPF. Not being developed right now, but I continue to think Keybase is totally awesome and I'll probably pick this back up at some point.
  
##### [Cassowary.net](https://github.com/martindevans/Cassowary.net)
  - An incremental constraint solver.
  - This is a fork of Cassowary.net which was a port from Java, which was itself a port from Smalltalk and to be honest... you could tell - the code was not C# style at all!
  - Improved code quality, implemented unit testing, implemented a new way to express constraints (using C# [expression trees](http://msdn.microsoft.com/en-us/library/bb397951.aspx)), created a [nuget package](https://www.nuget.org/packages/Cassowary/).
  - This project is largely complete and so does not have any recent commits but it *is* in use by my city generation so it's alive and well maintained.
  
##### [SharpSteer2](https://github.com/martindevans/SharpSteer2)
  - This is a fork of SharpSteer2, which was a fork of SharpSteer, which was a port of OpenSteer from C++ to C# for a much older version of C#. As with Cassowary.net the code was functional but wasn't properly up to the standards of modern C#.
  - Unit testing, naming conventions, removed dead and useless code, improved usability with extension methods on interfaces which make implementing the interface much easier, bugfixes and new features!
  - As with Cassowary.net my work on this project is more or less done but the project is in active use by my AI and is well maintained.
  
##### [PlaceholderHomepage](https://github.com/martindevans/PlaceholderHomepage)
  - I made a [homepage](http://placeholder-software.co.uk/) for my game. It's a bit out of date now, I guess I should fix that!
  
##### [Epimetheus-Public](https://github.com/martindevans/Epimetheus-Public)
  - This is a repository for all the public facing parts of Epimetheus (my game engine) - bug reports and documentation for plugin development.
  
##### [NockFSharp](https://github.com/martindevans/NockFSharp)
  - A basic implementation of [Nock](http://doc.urbit.org/doc/nock/tut/1/) in F#.
  - This was just a learning exercise for F#, as well as an attempt to get my head around Nock (which is part of [Urbit](http://doc.urbit.org/), which is bizarre and awesome).

### Game Development

My job is game development, so what did I do with that this year? My primary focus is the **Epimetheus Engine**, my custom game engine. This is supported by **Placeholder.\***, a (closed source) set of libraries for various game related things (advanced entity management, networking, game audio, AI etc). Finally the whole thing is based on my open source game library [Myre](https://github.com/martindevans/Myre). I quickly skimmed the commit notes for the entire of last for for these three core projects and this is the mile high view of what I did (I'm not really mentioning bugfixes in this list, so just mentally drop a couple of hundred bugfixes for each project into this list).

#### **Epimetheus**

240 commits<br />
5,840 files changed<br />
12,385 lines written<br />
41,130 lines changed<br />


 - Implemented animation system for plugins (enables playing animation clips on models)
 - Typednames change
 - gbuffer shader in plugin
 - Steamworks.net
 - Plugin networking (arbitrary types in messages)
 - Plugin entry point
 - Plugin persistent settings
 - Improved respawning
 - Improved tool wielding
 - physics detector volumes
 - RequireJS UI (massive UI moddability improvement)
 - Plugin loading events (<PrePull> <PostPull> etc)
 - Lots of wrestling with appdomain plugin system
  - Myre Events across boundaries
  - Network Pipe messages across boundaries
  - GC collecting too early
  - GC never collecting (memory leak!)
 - Many UI rendering improvements
 - Improved parallelism of world generator
 - Improved how the generator chooses which nodes to procedurally generate next
 - Massively improved world parallelism service with buffering of geometry operations (50x speedup)
 - Sped up procedural mesh generation (x2 speedup)
 - Implemented a system for 2D procedural geometry (using CSG)
 - Improved lighting
 - Improved physics body scripting
 - Added new physics shapes
 - In world user interfaces (using awesomium)
 - Improved input system (stackable contexts)
 - Implemented way to "use" items in the world (pressing E)
 - Mouse input to in world UIs
 - Exposed broadphase queries to plugins (hugely improves detector volumes)
 - Implemented collision groups
 - Physics constraints/joints/motors/limits
 - Split out UI rendering in rendering pipeline (future UI post processing)
 - Implemented a way to query the renderer about lighting conditions in a certain position
 - Scriptable rendering pipeline
 - Per camera pipeline (means per camera FX, enables e.g. night vision goggles)
 - Implemented crouching (seriously)
 - Implemented queries on the state of the character (e.g. HasSupport/HasTraction queries)
 - Totally rewritten chunking service
 - Implemented a streaming service to go alongisde the new chunking service
 - Implemented positional errors in world generator
 - Implemented navmesh generation
 - Goal oriented action planning exposed in plugins
 - Implemented a basic NPC entirely in plugins
 - Implemented infrastructure for pathfinding
 - Sped up ReST API
 - Implemented immediate mode debugging service
 - String pulling to generate smooth paths
 - Improved 2D geometry generation
 - Implemented train level using improved floorplan/2D geometry generation
 - Removed subtracting from the world is procedural scripts (:O)
 - Implemented weapon quick switching
 - Implemented player inventories
 - Implemented ragdolls (not entirely successfully)
 - Future proofed all event types
 - Implemented hitpoints
 - Implemented 3D audio playback for entities
 - Implemented a way to play sourceless sounds at arbitrary points in 3D space
 - Implemented a new system for defining entities (mixins)
 - Rewritten GOAP AiActions to be easier to use
 - Added more capabilities to debug drawing service
 - Implemented a system for NPCs to use tools (e.g. guns)
 - Removed sandboxing (OMG)
  - Vastly improved plugin API
  - Removed a load of hacky types to work around how sandboxing worked
  - *Vast* performance improvements
  - No more memory leaks
  - No more game crashing when GC collected a vital object on the wrong side of the sandbox
 - Implemented an aimbot NPC
 - Improved pathfinding so that queries are cancellable
 - Implemented a score tracking service
 - Enabled steam overlay in game

#### **Myre**

103 commits<br />
780 files changed<br />
Line count statistics unavailable (they're thrown off by moving lots of files around)<br />


 - Implemented animation in the renderer
 - Implemented animation clip loading in the content pipeline
 - Implemented parallel evaluation of animation channels
 - Rewritten data collections to be more strongly typed (TypedName)
 - Changed *EVERYTHING* to use TypedName
 - Rebuilt nuget packages for Myre
 - Animation bugfixes
 - Made property initialisation more implicit
 - Made property initialisation less implicit
 - Improved renderer pipeline infrastructure
 - Made point and sun lights (de)activatable
 - Fixed depth test in particle system
 - Fixed material content loading
 - Improved spotlights (angular falloff)
 - Improved shadow mapping in directional light
 - Implemented Vector3 swizzling methods
 - Dropped support for xbox360
 - Improved animation system to allocate less memory
 - Implemented infrastructure for procedural animation clip generation (needed for e.g. ragdolls)
 - Implemented parallel evaluation of animation instances
 - Improved linear keyframe reduction in content pipeline
 - Dropped support for windows phone 7
 - Implemented collection initializers for named box collection
 - Implemented Writer for console

#### **Placeholder**

125 commits<br />
3,103 files changes<br />
9,029 lines added<br />
46,218 lines changed<br />

 - Implemented system for improved thread safety for steam
 - Switched to Steamworks.net from my own steamworks wrapper (HotAndSteamy)
 - Implemented logical assertions for GOAP (AND OR NOT XOR)
 - Implemented network translators for a load of types
 - Improved CSG system (error handling)
 - Made BSP transforms more robust
 - Implemented 8 way BSP splitting
 - Implemented navmesh generation (Recast based)
 - Implemented funnel narrowing path generation
 - Modified navmesh generation to check ceiling heights
 - Expression based GOAP condition/goal system
 - Improved agent plan selection
 - Improved behaviour tree
 - Implemented navmesh raycasting
 - Implemented new nodes for behaviour tree (Condition, Setup)
 - Implemented rich presence providers
 - Made CSG operations entirely deterministic
 - Implemented ADSR amplitude envelopes for audio renderer
 - Implemented variable length floating point encoding
 - Implemented a jukebox system to play music (based on XNA MediaPlayer)
 - Removed Jukebox (XNA MediaPlayer is terrible)
 - Implemented system for playing sounds at a position (with no associated emitter entity)
 - Improved expression based GOAP system
 - Implemented cancelling pathfinding tasks
 - Begun works on Audio2, a new audio renderer based on FMOD

#### Plugins

I haven't got detailed changelogs for these (there are too many) but I have done a lot of development of plugins too. A lot of functionality is tied up in these plugins and they're a significant part of development. Remember, every plugin I develop is open source, and you can find them all [on Bitbucket](https://bitbucket.org/martindevans).

##### Deathmatch Gamemode
Testing moving, shooting, NPCs etc.
  
##### Base-ArtificialIntelligence
Library for building NPCs for Epimetheus.
  
##### Electronic-Infrastructure
Library for building circuitry in game (e.g. wiring up logic for controlling automatic doors).
  
##### Construct Gamemode
A sandbox test mode.
  
##### City1
A set of scripts for the procedural city generator.
  
##### Character-Controllers
Library for building player controlled characters for Epimetheus.
  
##### Base-Equipment
Library for building wieldable tools for Epimetheus (e.g. guns).
  
##### Base-GameUI
A HTML template along with a load of Javascript plugins for constructing UIs (mainly HUDs).
  
##### Base-Sneaky
Library for implementing sneaky things (stealth, detection, disguises etc).
  
##### Default-Shaders
A set of shaders for the engine (including fundamental things like the GBuffer shader - you can completely change how the renderer works by replacing these).
  
##### Base-TrainGeneration
A set of scripts for generating trains. Trains are compact and have lots of little rooms and narrow corridors so this was a great test for the procedural city generator.
  
##### Base-CityGeneration
A library for implementing procedural generation scripts.
  
##### Base-Achievement
Library for tracking hierarchies of goals.

### Things I enjoyed

It turns out that I have spare time to do things that aren't game development (I know, was surprised too). These are some of the things I enjoyed this year:

 - [Japan!](http://martindevans.me/japan2014.html)
 - [FMOD](http://www.fmod.org/)
 - [Rust](http://www.rust-lang.org/)
 - [Urbit](http://urbit.org/)
 - [J](http://www.jsoftware.com/)
 - [Combinator Algebra](https://en.wikipedia.org/wiki/Combinatory_logic)
 - [Operating Systems Development](http://wiki.osdev.org/Main_Page)
 - [Noragami](http://myanimelist.net/anime/20507/Noragami)
 - [Hanamonogatari](http://myanimelist.net/anime/21855/Hanamonogatari)
 - [Sidonia No Kishi](http://myanimelist.net/anime/19775/Sidonia_no_Kishi)
 - [Amagi Brilliant Park](http://myanimelist.net/anime/22147/Amagi_Brilliant_Park)
 - [Unlimited Blade Works](http://myanimelist.net/anime/22297/Fate/stay_night:_Unlimited_Blade_Works_(TV))
 - [Log Horizon 2](http://myanimelist.net/anime/23321/Log_Horizon_2nd_Season)
 - [Parasyte](http://myanimelist.net/anime/22535/Kiseijuu:_Sei_no_Kakuritsu)
 - [Shirobako](http://myanimelist.net/anime/25835/Shirobako)
 - [Donkeyboy](http://www.donkeyboy.no/)
 - [The Rasmus](http://www.therasmus.com/)
 - [Sunrise Avenue](http://www.sunriseave.com/en/home/)
 - [Royal Republic](http://www.royalrepublic.net/)
 - [Imagine Dragons](https://www.imaginedragonsmusic.com/)
 - [Celldweller](http://www.celldweller.com/)
 - [Blue Stahli](http://www.bluestahli.com/site/)
 
### That Was Longer Than I Expected

Turns out 2014 was a busy year! let's hope just as much exciting stuff happens in 2015 (Heist released on greenlight? Could it be!?).