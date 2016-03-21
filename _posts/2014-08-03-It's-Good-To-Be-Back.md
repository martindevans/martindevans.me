---
layout: post
category : Heist-Game
tags : [changelog, heist]
tagline : In Which The Author Returns From The Realm Beyond Death
---
{% include JB/setup %}


## TL;DR

I'm back, my wrist is still fragile but I've got some great work done on AI.

## Triumphant Return

*Finally* I manage to get a changelog out! This has been a pretty depressing few weeks - always so close to functioning AI but never managing to achieve it because typing is painful. However I've finally managed to scrape together enough AI tech to make a video.

[**Watch The Video!**](https://www.youtube.com/watch?v=VojGdLELv7o)

- Completed Integrating GoAP
- Integrated and overhauled Behaviour Trees
- Polished NPC path generation
- NPC path following
- Redesigning/Refactoring [SharpSteer2](https://github.com/martindevans/SharpSteer2), my open source fork of [SharpSteer](https://sharpsteer.codeplex.com/) / [OpenSteer](http://opensteer.sourceforge.net/)
- Entirely new [Base-ArtificialIntelligence](https://bitbucket.org/martindevans/base-artificialintelligence) project for Epimetheus plugins to use as a base for various AIs in game
 - Integrating SharpSteer2 into Base-ArtificialIntelligence
- Minor refactoring work to tie together AI inputs and the animation controller originally used just for the player character

As you can see, I've been quite busy even whilst recovering!

## What Next?

As cool as AI is it's been pretty depressing working on it with RSI - progress was slow and, literally, painful. For now I'm going to distance myself from AI a little and work on something else to get my mind off it!