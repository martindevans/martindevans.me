---
layout: post
category : Heist
tags : [heist]
tagline : In Which I Discuss Playing Multiplayer Games Without A Network Connection
---
{% include JB/setup %}


## TL;DR

I had an interesting discussion about heist multiplayer with a friend of mine and we realised that Heist could actually largely be played in asychronous multiplayer.

## An Important Note

In previous blog posts I've talked about Heist in the general sense, which has been slightly misleading. Heist is two things:

1. A game engine which supports scripted gamemodes
2. A specific gamemode

In this post, I'm talking specifically about the gamemode called Heist which is obviously something to do with stealing stuff. *I'm not certain on how the Heist mode is going to play, So don't take anything here as set in stone*

### Persistent Characters

One thing that I really like in games is long term persistence, having a long term character profile can add a lot to the experience of a game. For example, Left 4 Dead is a really good game, but DayZ communicates the experience of surviving a zombie apocalypse a _lot_ better because you have a persistant character and death really becomes important instead of a minor inconvenience. Of course persistant characters don't suit every game, they only work when the experience you're trying to communicate actally involves long term importance and significance.

### Asynchronous Multiplayer

This is the idea that two people don't have to be playing a game at the same time to play together, for example postal chess, "draw something" and "(Frozen Synapse)[http://www.frozensynapse.com/]" all allow two people who are never playing at the same time to play together. Any turn based game can be made into an asynchronous game trivially... Heist isn't turn based, but I'm not one to let the impossible stop me.

### Let's Play

Conventionally a Heist has several stages:

1. Pick the target
2. Scout out the target
3. Come up with a plan
4. Get equipment
5. Pull off Heist

Only one of these stages (#5) requires everyone to be online together, all the others can be done whenever people want. Picking a target and scouting it out require only the same city (which is easy, cities are procedurally generated off a seed). Coming up with a plan doesn't even require you to be in the game. Getting equipment could also be done out of the game, through some kind of web portal which allows you to spend your hard earned cash on new equipment, alternatively you could go play in single player to get some equipment, and thanks to persistant characters you'll still have that equipment in multiplayer.

## I Thought You Were Working on AI?

I am, but it's really hard, I have a lot of choices to make about:

- How to modify the city system to generate AI data
- How to write the scripting system for AI behaviours
- How to synchronise hundreds of AI characters over the network
- How to simulate hundreds of AI characters without melting your CPU

I am making progress but I don't want to blog about it until I have made some solid dicisions.