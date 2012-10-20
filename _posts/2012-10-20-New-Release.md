---
layout: post
category : Heist
tags : [heist, release]
tagline : In Which You Stop Reading This Blogpost To Check Out Greenlight
---
{% include JB/setup %}


## TL;DR

An new release of Heist.

## Where Is It?

If you've never played Heist before you can [get it from here](http://www.placeholder-software.co.uk/static-files/setup/heistgame/publish.htm). If you've played Heist before then just run it and it should offer to auto update (if it doesn't, just get it again and it'll write over the old version. Then [send me an email](mailto://martin@placeholder-software.co.uk) and tell me you had this problem).

## Major Features

 - Better multiplayer implementation
 - In Game HUD
 - New Scripting API for entities
 - New Scripting API for behaviours
 - Internally reimplemented tools (still a work in progress)
 - New Scripting API for tools
 - A sun with a day night cycle (entire cycle is 3 minutes)
 - A Laser Rifle
 
## How to play

It's still not _entirely_ obvious how to play, I'll be working on fixing that for the next release. A few of the least intuitive things:

 - When you first spawn you'll drop out of the sky and die to fall damage then instantly respawn (long standing bug)
 - There's no indicator which weapons you have equipped (work in progress)
 - When you spawn you have weapon 0 equipped, but the only valid weapons are 1, 2, 3 and 4. Rolling the mouse wheel will move you off this invalid weapon to a valid one (Fixed internally, release coming soon)
 - Number keys do _not_ toggle weapons (work in progress)
 - Sounds created by tools all emanate from the world origin (work in progress)

### What are my guns!?

Since there's no indicator what you have equipped yet, these are the tools:

1. Box Spawn (click to spawn a box on top of your head)
2. Sniper Rifle (click to fire, this will knock back boxes an impressive distance)
3. Laser Rifle (click to fire, this will fire a slow moving yellow laser bolt which looks cool at night)
4. Torch (Pretty useful at night)
 
## Full Changelog

This isn't really a _full_ changelog, it's just a summary of the most important things I noticed while skimming over the past 2 months of git logs.

 - Fixed bugs in world subdivision
 - Faster texture atlas loading
 - Texture atlas will no longer consume 1Gb of memory while loading
 - Written some vague code exploring how to implement AI
 - Added in game HUD
 - Added a Lua to Javascript bridge for in game HUD scripting
 - Written multiplayer chat entirely in lua
 - Added a score board to HUD
 - Added a kill log to HUD
 - Supported BSON data in networking
 - Silently translate Lua tables to BSON for network transport
 - Better abstracted script sources (now called data sources)
 - Improved UI resource loading
 - Rebindable game controls (still a work in progress)
 - Added Script resource loading (currently only text and audio, still a work in progress)
 - Refactored network packet reading
 - Rewritten entire packet encoding/decoding system
 - Rewritten peer connection initialisation
 - Endlessly bug tested networking
 - Implemented a new system for synchronising network peers to the correct world state
 - Cut out half the code from Heist and moved it into a separate library
 - Achieved 52% test coverage on entire networking library (100% on some parts like encoding)
 - Written a load of clever bit twiddling trickery for packet encoding
 - Modified entity factory to handle default values, making scripting a load simpler in the default case
 - Refactored Configuration system to be much more robust
 - Rewritten Sound Renderer
 - Rewritten backend metaserver infrastructure
 - Migrated backend to a new server host
 - Neatened up physics body implementation (still a work in progress)
 - Neatened up API for entities
 - Neatened up API for behaviours
 - Rewritten every script to be in line with new APIs
 - Added many new input events (weapons, road vehicles, air vehicles, naval vehicles)
 - Rewritten texture pack format
 - Modified all data sources to support versioning
 - Changed format of data source configuration file