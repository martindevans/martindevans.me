---
layout: post
category : Heist-Game
tags : [heist, release, game-development]
tagline : In Which A Long Absence Is Ended
---
{% include JB/setup %}


## TL;DR

I've been busy.

## A Brief Project Update

It's been a long time since my last update, sorry about that. This _isn't_ because I've been slacking and haven't had anything interesting to talk about, quite the opposite in fact! So what have I been up to?
 - Complete User Interface Rewrite
 - Talking To Valve
 - Designing The First Game I Intend To Build With The Engine
 - Beginning Work On Multiplayer Streaming Of Infinite Worlds
 
### Try It Here

First things first, if you want to try the latest version you can get it [here](http://placeholder-software.co.uk/setup/heistgame/publish.htm). This version has a new main menu which allows things like managing installed mods and configuring game options, also a new HUD for deathmatch mode. Some important caveats:
 - The main menu is very unfinished, it has only the most basic functionality I personally needed for my testing of the game.
 - Construct mode is quite broken, it had a lot of custom UI code which I've had to disable until I make it compatible with the new UI system.
 - The Deathmatch mode HUD is incomplete, it doesn't yet show equipped tools.
 - Press Y to open up the chat dialog and talk to yourself ;)
 
### User Interface
 
Just after my last post I started on a major upgrade to the user interface system in Heist, now that's mostly complete and the new system is significantly more efficient, easier to program and has a much better scripting interface to Lua. If you try out the [demo](http://placeholder-software.co.uk/setup/heistgame/publish.htm) you should instantly notice the new Main Menu which is approximately 1000 times less likely to be a cause of eye cancer than the old one it replaces. There's also a new in game HUD, but right now that's still work in progress.

Why did I rebuild the HUD? Well the old one always gave me nightmares - the whole thing was a minefield of picky initialisation logic, complex callback hierarchies and a total aversion to multihtreading. Also, performance sucked. Eventually my hand was forced because I upgraded to a new release of [Awesomium](http://awesomium.com/) and encountered a bug which made the old way of doing things impossible (until they fixed the bug). So I was forced to either wait until they fixed the bug, or find a new way of doing things.

### Talking To Valve

Valve recently hosted a chat with all the Greenlught developers which I took part in. To be honest it was a bit of a mess, there were something like 150 developers in a single chat room all yelling out their questions and the meeting ended with half the question never getting answered. Despite that the meeting was very useful - A lot of interesting ideas were thrown back and forth and the Valve people seemed very receptive of new ideas, as well as saying that they were already working on some of the things suggested. For example, I asked about getting access to the Steamworks SDK *before* getting Greenlighted (e.g. as soon as you become a Greenlight developer) - right now the top thread on the Greenlight developers discussion forum is one created by a Valve person asking about what we'd want early access to Steamworks for and exactly how we'd hope to use it. Overall I'm pretty excited about some of the stuff that came out of this discussion - no one is denying that Greenlight has some major problems right now but everyone has lots of ideas for how to fix it and the people in charge are receptive to these ideas. If you're interested in a summary of the chat there's one [here](http://gamasutra.com/blogs/EnriqueDryere/20130507/191870/Main_Points_from_Valves_Greenlight_Developer_Chat_5713.php) or another one [here](https://crunchingkoalas.com/improving_steam_greenlight_aka_complete_waste_of_time/).

### Designing The First Game

As I've mentioned before my project comes in two bits:

1) The HeistCore engine, which is just a game engine designed to handle huge, procedurally generated, multiplayer environments with lots of scripting support.
2) *Multiple* games built on the engine.

The "Heist" game (Co-op breaking into banks) was never intended to be the first game - that's an incredibly complicated game which is going to need a lot of complicated scripting for alarms, complicated scripting for generating banks, complicated programming for realistic AI etc etc. I've thrashed out a different design which I'm now working towards and which I'm not going to tell you anything about (yet).

### Infinite Streaming

This is really the last core component of the engine which has been missing for all this time. The game currently streams the geometry of the world so it supports very large worlds, but when it unloads part of the world it simply ignores all the entities in that section and they fall into the infinite void below the world. My current work is making it correctly find all the entities in the unloaded section, save their state (including the state of all the scripts) and then remove them from the world. Obviously when a section gets reloaded the game has to go off to it's directory of saved data and reload all the entities in the section, including correctly reinitializing their state.

There's a nice side effect to all this. Once I have a system that can unload chunks the player is not in, and then reload them when the player comes back I instantly get save games for free. When the player quits the game I can simply consider *all* chunks in need of unloading. When the player reloads the games I simply need to load in the chunks around the player as normal. Naturally, multiplayer save games will also be supported (how many FPS games can claim that?).

### What's The Plan?

I think it should take about 2 weeks to get the work on streaming worlds done (including saving and reloading games). After that I'm going to spend some time getting Deathmatch mode up to scratch, with the world streaming in and out as players move about and the entire game state able to be saved and reloaded so that an interrupted match can be continued at a later date.