---
layout: post
category : Heist-Game
tags : [heist, release]
tagline : In Which You Stop Reading This Blogpost To Play My Game
---
{% include JB/setup %}


## TL;DR

An new release of Heist.

## Where Is It?

If you've never played Heist before you can [get it from here](http://www.placeholder-software.co.uk/static-files/setup/heistgame/publish.htm). If you've played Heist before then just run it and it should offer to auto update (if it doesn't, just get it again and it'll write over the old version. Then [send me an email](mailto://martin@placeholder-software.co.uk) and tell me you had this problem).

## Major Features

 - Bugfixes in Behaviour Scripting Interface
 - Bugfixes in  Entity Scripting Interface
 - New Network Protocol (saving 1 byte in every single packet sent)
 
## How to play

It's still not _entirely_ obvious how to play, I'll be working on fixing that for the next release. A few of the least intuitive things:

 - When you first spawn you'll drop out of the sky and die to fall damage then instantly respawn (long standing bug)
 - Number keys do _not_ toggle weapons (work in progress)
 - Sounds created by tools all emanate from the world origin (work in progress)

### What are my guns!?

Since there's no indicator what you have equipped yet, these are the tools:

1. Box Spawn (click to spawn a box on top of your head)
2. Sniper Rifle (click to fire, this will knock back boxes an impressive distance)
3. Laser Rifle (click to fire, this will fire a slow moving yellow laser bolt which looks cool at night)
4. Torch (Pretty useful at night)

### Work In Progress

I'm currently working on a weapon indicator, which will automatically appear in your game once I have it done.