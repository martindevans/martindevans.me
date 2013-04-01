---
layout: post
category : Heist
tags : [heist]
tagline : In Which A Game Is Exposed
title : What Is Heist?
---
{% include JB/setup %}


## TL;DR

Heist is a game engine, and a series of games built using the engine.

## Why This Post?

I'm planning to start being a bit more public about Heist soon, initially by posting on [r/gamedev](http://www.reddit.com/r/gamedev). I don't want to do a full explanation of exactly what Heist is every time I introduce someone new to it so that's what this post is for.

## What Is Heist?

### What Was Heist To Start With?

Heist was originally conceived about 6 years ago (2007). First there was this crazy idea I got into my head that entire cities could be generated by a computer, I was totally obsessed with this idea for a couple of years while in college. The second part was that I love Heist movies, and many of them consist of creatively misusing the environment _around_ the target of the Heist to somehow create a flaw within the bank. The simplest example would be [The Bank Job](http://uk.imdb.com/title/tt0200465/) where they simply tunnel into the bank. Once you have these two thoughts bouncing around your head the idea becomes pretty obvious: Generate a city around a bank for the ultimate Heist game!

Once I started work on Heist (in January of 2012) it became clear that the project, in some ways, wasn't ambitious enough (not something I get accused of very often). Building an entire city generator and then just setting one single game in it felt like such a massive waste of potential. The biggest demonstration of this was that every time I mentioned the city generator to people they would mention other games they would love to see in such a system.

A few suggestions people have made:

 - Break Into Banks
 - Multiplayer Deathmatch
 - Procedural Racing Game
 - Procedural Mirrors Edge
 - Spiderman/Worms 3D mashup
 - Detective Game (explore city, talk to NPCs)
 - Assassination
 - Zombie Survival (The most common suggestion by far)
 - World Building (Minecraft) / Contraption Building (Gmod) Mashup

Luckily this became clear while I was experimenting with procedural generation technology and hadn't even started on building the game yet. Once I began thinking about building the game itself I expanded the scope a little...
 
## So What _Is_ Heist?

### A Game Engine

Heist is a game engine, which is a platform for building many other games with. The engine supports procedural generation of massive worlds and is designed to be controlled by lua scripts to define new gamemodes and entities.

### A Series Of Games

While the engine is in development I will also be building test games using the engine to push it's capabilities. If these games turn out to be any good then I shall keep them around, polish them up and release them.

### A Game About Breaking Into Banks

Once the engine has been developed enough that it has all the features I need to build this game mode, I will do so. There's nothing special about the Heist game mode any more, it's just another game in the series.