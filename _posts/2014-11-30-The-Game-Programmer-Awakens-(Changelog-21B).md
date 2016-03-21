---
layout: post
category : Heist-Game
tags : [changelog, heist]
tagline : In Which A Promise Is Made To Stop Using Lame Allusions To Star Wars Films
---
{% include JB/setup %}


## TL;DR

Sound!

## Last Week

Before I get started I want to apologise for last week - I had a really busy weekend and doing my update totally slipped my mind. I suddenly remember at 23:30 on Sunday evening what is was that had been bugging me all day! By then it was too late and I decided just to leave it to this week instead.

## This Week

[Watch The Video!](http://youtu.be/NSIQ1Syvww8)

- Start of an NPC suspicion framework
- Events for NPCs to react to sounds
- A sound renderer for humans to hear sounds
- Tidied up a large and ugly part of the modding API to insulate plugins from breaking changes within the engine

## What's Next?

The NPC suspicion framework is only a very early start on this stuff - right now I don;t have a single NPC character which actually uses these events. I'm going to do a lot of work next week on neatening up the old AI code and integrating this new event system into it, my aim will be to have a couple of different NPCs who patrol around the test level with different attitudes:

 - Shoot on sight (simple test of NPC sight)
 - Pursue and shoot when suspicious (simple test of NPC suspicion)