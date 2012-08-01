---
layout: post
category : Heist
tags : [heist, artificial-intelligence]
tagline : In Which I Program Myself More Friends
---
{% include JB/setup %}


## TL;DR

I'm working on big stuff for AI right now, which means I just can't keep up with a release every two weeks

## No More Fortinghtly Fun :(

I started doing these releases every two weeks when the city engine was approaching some form of completion, it's been very useful having a target to motivate me through the stages of polishing up a few bits of the city generation. However, for now, the city generation is done (there is more to be done on it, but it's not a priority) and releases every two weeks are basically impossible right now. I need a few weeks to sort out exactly how AI is going to work and then lay out a lot of groundwork before anything changes in the game.

## Progress

It's not all bad news though, I'm making good progress on AI. I've been working on a prototype for crowd AI and I think I'll have that finished later today, once that's done I'll begin work on the lua scripting system for AI. My aim is to have a top down 2D world with AIs running lua scripts by next week, the system should run in a way that new lua scripts can be dropped in and they automatically start getting used by the AIs as they're needed. The idea is that scripts find others scripts to do work for them, so my example last week was:

### Get Lunch
1. Run a behaviour to search the generated city for places to get food
2. Run a behaviour to walk to the place
  2a. Run a pathfind behaviour
  2b. Run a follow path behaviour
    2bI. Constantly keep running navigate crowd behaviours
3. Arrive at place to eat, query the building for suitable scripts to run

This system allows a lot of flexibility. In stage one, it searches the city for places which publish themselves as somewhere suitable to eat, so someone could write a new script to generate a new type of place to eat and suddenly AIs would start using it. Stage three retrieves a behaviour from the place itself, this means that AIs in different places will act differently and appropriately, so for example in a coffee shop they'll queue up and collect an order from the counter but in a restaurant they'll sit down and wait for someone to take their order.

## Topology

Implied above is some kind of markup on the buildings of the city, certain buildings can "publish" themselves as suitable for certain actions (e.g. get food) and then AIs can query the building for suitable behaviours. Essentially this is another part of city generation, at the moment the _topography_ of the city is generated but not the _topology_. Implementing this will be the next big task after the AI scripting system is done, changing the city generation system to add some concept of topology to the city.

## Next Release

I do still intend to make extremely alpha releases whenever I can, but the next one will take a while! I imagine it will be a fairly boring hand build environment with a few markers scattered around ("work", "get food", "home") which the AIs will navigate between as they wish, obviously navigating around each other in a realistic looking crowd.