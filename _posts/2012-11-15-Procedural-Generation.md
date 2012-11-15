---
layout: post
category : Heist
tags : [heist, procedural-generation-series]
tagline : In Which A New Series Is Revealed
---
{% include JB/setup %}


## TL;DR

I'm going to write a series of blog posts about procedural generation.

## That Was Fun!

I've just finished writing the networking series and I'm moving right on to a series about procedural generation. The networking series was fun to write – hopefully it was interesting to read! While writing it I noticed a few optimisations I could make to Heist, so it was useful to at least one person.

The networking series was written while I was working on a big internal milestone (more details on that in a week or two when I have it all polished up). Obviously this super secret milestone involved lots of networking, so it made sense to write a networking blog series while working on it. Now that this milestone is done I'm going to move on to the next one soon, which will involve building a new gamemode for Heist and all the technology and tools needed to make it possible.

## Minecraft Is _So_ 2011

This might seem unrelated, but do you ever see cool constructions in real life or other games and think to yourself, "That's really cool... I wonder if I could build that in Minecraft?" I certainly do, and it's lead to an incredible number of wasted hours building cool things. Recently I've been playing [Guns of Icarus](http://gunsoficarus.com/) (basically a game about flying steampowered airships blowing each other up), and I also [saw](http://www.youtube.com/watch?v=Rx8rnR3gl3Y) [some](http://www.youtube.com/watch?v=8kLnd_KI46o) [videos](http://www.youtube.com/watch?v=u9J9xeXVSEw), all of which set my imagination going about how well I could build a steam powered airship thing in Minecraft. Alas, I decided that I didn't have time to dedicate to a new Minecraft mega project and that was that.

## And That Was That

A big part of Heist is procedural generation of worlds. Most of the time the world would be a city to carry out a bank job in, but there's nothing stopping the world generator from being used to generate other megastructures... floating steam powered airships for example. So, this is my next major goal for Heist – I'm going to polish up the world generator and the scripting interface and then build all the tools I need to create the scripts for a procedurally generated airship _into the game_. The critical part here is that the tools I use will be built into the game as a new gamemode. Building new parts for a world will not involve writing boring lua scripts (unless you want to), and it won't involve opening up a separate world builder tool (although I might build such a thing with enhanced debugging capabilities for hand written scripts). Instead, you simply start up the game and start [crafting a world](http://www.youtube.com/watch?v=VzFpg271sm8).

## The Series

This series is going to have 2 parallel sets of entries.

### Procedural Generation

This is the main meat of the series – a set of posts on the subject of procedural generation with overviews of different ways of doing it, how other games do it, drawbacks of these techniques and some of the technical underpinnings of implementing procedural generation.

### Steampunk Airships 

These will be a series of posts about the new gamemode in Heist, with details on how it works, how to play it, where to get preview releases and what progress I am making on the steampunk airship world scripts.