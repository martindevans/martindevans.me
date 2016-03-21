---
layout: post
category : Heist-Game
tags : [changelog, heist]
tagline : In Which Movies Are Needlessly Quoted
---
{% include JB/setup %}


## TL;DR

I'm getting close to an interesting NPC in Heist, this post is the high level view of how AI works.

## Wai No Changelog?

There was no changelog published on Sunday 13th July 2014 because I was on holiday for most of the week and thus didn't have time to work on Heist and get something ready to demo. I did actually make good progress on AI but it just isn't ready to demo yet (next week, hopefully).

## A History Lesson

I've previously talked in some depth about different AI techniques and how they work in my [Artificial Stupidity]({% post_url 2013-04-08-Artificial-Stupidity-Series %}) series. This series was just a discussion of how these technologies work without talking about if/how I will use them myself in Heist.

I first worked on AI [way back]({% post_url 2012-07-24-Artificial-Stupidity %})  in 2012 when I spent some time researching AI for crowds and flocking behaviours. This kind of stuff is useful when you have a large crowd of fairly uniforms NPCs - for example the crowds in Assassins Creed. That was mostly just a research effort, although it did spawn [my fork](https://github.com/martindevans/SharpSteer2) of a C# port of [OpenSteer](http://opensteer.sourceforge.net/) which will come in handy soon.

I eventually came back to AI when I wrote my [Artificial Stupidity]({% post_url 2013-04-08-Artificial-Stupidity-Series %}) series in which I investigated different techniques for AI and write about their advantages and disadvantages. When I blogged about these techniques I also tried implementing them so I had a good grasp on exactly how they work and their advantages and disadvantages.

This resulted in me implementing:

 - [Pathfinding](/heist-game/2013/04/10/Pathfinding/) (Planning how to get where you want)
 - [G.O.A.P](/heist-game/2013/06/11/27-Gigawatts-Of-Cake/) (Planning what to do next)
 - [Behaviour Trees](/heist-game/2013/05/22/Trees-Are-Well-Behaved/) (Hand designed sequences of actions)

These implementations were all independent pieces of code and weren't really integrated into anything. My work for the past few weeks has been going over these, reminding myself how they work, neatening up the code and then properly integrating them into the systems of the engine.

In fact now that you know this you can see the progression pretty clearly in my changelog videos. The last five changelogs have been:

 - Pathfinding
  1. [Beginning work on procedural generation of pathfinding information](/heist-game/2014/06/08/Losing-My-Way/)
  2. [Prep work on world generator](/heist-game/2014/06/15/Changelog-14/)
  3. [Completed](/heist-game/2014/06/22/Happy-Birthday/)
 - G.O.A.P
  1. [Overhauling G.O.A.P implementation](/heist-game/2014/06/29/Changelog-16/)
  2. [Integrating it into the engine](/heist-game/2014/07/06/Changelog-17/)

During my holiday last week, and full time this week, I am working on integrating fully integrating behaviour trees. Once this is done I shall spend some time writing some full NPC characters for Heist - probably a guard who patrols and arrests people, a SWAT squad who move and work in a cohesive unit and a "civilian" NPC who wanders around and flees from danger. Stealth games are ultimately about the player(s) vs the AI and this kind of stuff is absolutely core to Heist.

## The View From Ten Thousand Feet

 Now that you know what components I'm implementing for AI it might start to become clear how the Heist AI is going to work. G.O.A.P is a technique for deciding *what* actions to take next but doesn't have a way to define exactly what actions are. Wheras behaviour trees are a good way to hand define AI behaviours but start to look repetitive when a single big behaviour tree is used for the entire AI behaviour.
 
 I'm going to try and achieve the best of both worlds by combing these two techniques so that I define a single *action* with a single behaviour tree and then G.O.A.P can string together sequences of these hand programmed behaviour trees into interesting sequences.

## AI Extensions

A great feature of this technique is that two actions don't have to in any way know about each other to work together. This means that if someone writes a new AI behaviour in a plugin it can be used in the NPCs right alongside other behaviours defined in other plugins. In this way NPCs could become very rich as new actions can quickly and easily be added into the mix.