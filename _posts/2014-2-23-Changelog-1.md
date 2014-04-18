---
layout: post
category : heist-game
tags : [changelog, heist]
tagline : In Which A Tradition Is Upheld
---
{% include JB/setup %}


## TL;DR

The first proper changelog is out, I talk about how multiplayer no longer sucks.

## This week...

[**Watch The Video!**](https://www.youtube.com/watch?v=ke00kU7H4IY)

- Reviewed networking code and fixed many small bugs.
- Exposed networking system to plugins allowing them to send messages about whatever they like to other peers.
- Taken advantage of this in the DM plugin to send player input and sync animations across the network.

## What's Next?

I'm thinking about adding in some of the most basic elements of the actual Heist gamemode next, so I can pull off a (_extremely_) basic Heist - basically just loot entities to collect, an inventory system to put loot into, an escape point which ends the game and counts up how much loot your team made off with. I'd also like to get a basic bank layout generator going, but I think that's probably a couple of weeks down the road yet.