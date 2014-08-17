---
layout: post
category : heist-game
tags : [changelog, heist]
tagline : In Which An Apology Is Made
---
{% include JB/setup %}


## TL;DR

I never intended to do a video last week, but forgot to put out a blog post stating this. I've been doing work on floor plans, it's difficult.

## Oops!

Last week I was away from home and didn't intend to put out a video. In these circumstances I usually put out a blog post before I go away, or after I get back explaining the situation but this totally slipped my mind last week! Luckily I've been working on the same thing both weeks so I can do it all as one big update this week.

## Floorplans

After getting all the AI stuff tied together a couple of weeks ago I decided to move onto something new - generation of building internals. This is something that I've worked on before and each time I come back to it I advanced my technique a little bit, usually building out some more supporting libraries to make generation easier. For example earlier this year I built a parcelling system which I use for generating the layout of buildings in a block as well as the layout of rooms on a floor which can generate layouts like this:

![Parcelled Floor](assets/ParcelledFloorplan.png)

Obviously this isn't a complete layout - it needs corridors and stairwells and other non-room features added, but it's a good start.

One thing that this floor plan lacks is any information about what room neighbours what other rooms and without this information it's obviously pretty difficult to generate appropriate doors and windows. This is the problem I've been trying to solve the last couple of weeks by building a generic "floor plan" representation which solves several problems:

 - Overlapping rooms are clipped to no longer overlap
 - Rooms hanging *outside* the building are clipped to stay within the allowable bounds
 - Neighbourhood data is generated between rooms
 - Walls between rooms have a thickness, and all rooms should be generated with a *Wall-Thickness* gap between them
 
My current prototype generates a plan a little like this:
 
 ![Floor Plan Prototype](assets/FloorPlanPrototype.png)
 
You can see that this plan has:

 - three rooms (white sections)
 - Neighbour sections between rooms (red sections)
 - Walls of appropriate thickness (blue for internal walls, green for external walls)
  
### Aaaargh
  
Building this system has been a *nightmare*. The system allows rooms and floors of any shape, and efficiency projecting every room onto every other room and then checking for occlusions by every *other* room is pretty hard! Honestly, I'm not convinced I've gone about this the right way and I'm going to spend some more time next week considering alternative approaches.

Once this floor plan system is done I'm going to be moving onto building a demo/tutorial level which will have distinct areas (rooms/floors/buildings) assigned to individual game mechanics. The plan is that I can add new areas as I add new game mechanics and then I have a single area to test and tune each mechanic.