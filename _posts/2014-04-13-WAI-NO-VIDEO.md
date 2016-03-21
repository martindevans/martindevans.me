---
layout: post
category : Heist-Game
tags : [changelog, heist]
tagline : In Which A Tradition Is Not Upheld
title: WAI NO VIDEO
---
{% include JB/setup %}


## TL;DR

This week I completed my task late on Saturday evening so I haven't got any content for a video.

## This week...

- Floor Plan Generation

## So Why No Video?

This week my task was floor plan generation. I have a system for laying out buildings in a city block, and I have everything in place for representing buildings with multiple floors and cross floor features like elevators and stairwells so the last thing I really need for basic city generation is a way to represent floor plans. However, this turned out to be a lot more difficult than I expected!

#### Take 1 / Monday

My first approach was to attempt to adapt the city block generation for floor plan generation. A city block is a load of plots of land in a big 2D area (the block) and a floor plan is a load of rooms in a big 2D area (the floor) and so I thought I could generalise what I already had into a system for generating 2D plans. After a huge amount of refactoring work on the parcelling system (and fixing a few bugs in it) I discovered that really there are enough subtle differences in the two systems that a unified plan generator would be extremely complex (and so abstract it would be difficult to use). I undid all this work (except the bugfixes) and went back to the drawing board.

#### Take 2 / Tuesday + Wednesday

I spent some time on Tuesday [sketching out](/assets/Notepad1.JPG) [details of](/assets/Notepad2.JPG) a new system based on the *topology* of floors. By using a [doubly connected edge list](https://en.wikipedia.org/wiki/Doubly_connected_edge_list) structure I could represent rooms in a way that makes neighbourhood queries really fast and easy (which rooms neighbour this room, which 2 rooms are either side of this wall, which walls connect to this wall etc).

This system, again, turned out to be too abstract to be of any real use. Building up the rooms in the doubly connected edge list is a bookkeeping nightmare and I couldn't find a good way to hide all the complexity from the end building designer. The problem is when a doubly connected edge list is still only half built basically none of the queries work, e.g.

 > Q. What Rooms Are Adjacent To X
 
 > A. _NullReferenceException_
 
 The most important time to make these queries is *when you're still deciding where to put new rooms* which is guaranteed to be when the list isn't complete and thus queries can't be made!
 
#### Take 3 / A.K.A. "This will only take me one day" / Thursday + Friday + Saturday
 
 My third attempt at cracking this problem was to go back to basics - instead of trying to supply a clever system for generating floor plans (parcelling) or a helpful system to make creating floor plans easy (doubly connected edge list) I decided to simply supply all the geometric tools to make working with Concave 2D shapes easy. The new system allows you to place down a room (any 2D shape) in a floor plan, if the room you have placed overlaps with a previous room the system will clip the room to correct the overlap. At *any time* you can query a room to find all of it's neighbours and the precise area of wall between two neighbouring rooms.
 
 This system turned out to be [incredibly](/assets/Notepad3.JPG) [complex](/assets/Notepad4.JPG) (because everything is more complex when you can't assume shapes are convex) and it took me an extra day of work on Saturday (usually my only full day off) to finally get it working! Usually I aim to get my work done halfway through Friday and then I spend the rest of the afternoon putting together a few showcase bits of the new system for the video on Sunday but that obviously wasn't a possibility this time and I have no good demos of the new floor plan system **which is why there is no video**.
 
## Next Week?
 
 My plan for this next week is to finish of some of the last few rough corners in the floor plan system on Monday and then to move onto *something new*. Hopefully I should have a really big video next week where I can show off both floor plan generation and *something new* at the same time.