---
layout: post
category : Heist-Game
tags : [changelog, heist]
tagline : In Which Navmeshes Are Discussed
---
{% include JB/setup %}


## TL;DR

Navmeshes now connect across chunks. No video because that just isn't an interesting thing to make a video about!

## This Week

I've worked on system for automatically connecting navigation meshes across chunk boundaries, allowing AIs to navigate the world just as well as humans can.

<a href="/assets/navmesh-cross-chunks.jpg"><img src="/assets/navmesh-cross-chunks.jpg" align="left" width="400" height="auto"></a>

The world in the Epimetheus engine is loaded in chunks which are 50x50x50 meters, as the player moves around the world chunks are procedurally generated and loaded/unloaded in the background n theory allowing for very large worlds without any loading screens. Navigation meshes define the area NPCs may walk and are automatically generated for each individual chunk using the amazing [recastnavigation](https://github.com/memononen/recastnavigation) system. However, until this week navmeshes did not go *between* chunks which means that an NPC could not navigate between chunks!

The world generation system is extremely complex because there are three systems involved and all of them run in parallel to the main game thread. 

### World Generator

The world generator is concerned with *generating* the data of the world, it creates the geometry and entities in the scene. The world generation system holds a topological map of the world, something like:

 - Building
   - Floor
     - Room
     - Room
   - Floor
     - Room
   - Floor
     - Room
 - Building
   - Floor
     - Room
   - Floor
     - Room
     - Room
     
And then chooses appropriate nodes in this tree to subdivide and generate the actual physical geometry for. This system attempts to choose nodes *near to* the player so that as the player moves around the world everything is already generated before they get there.

### Chunk Database

The chunk database is, as the name implies, a collection of chunks (50x50x50 meter cubes). Each chunk contains all the data about the world within itself. The chunk database has a very tight memory budget (essentially how many chunks it may keep in memory at any one time) and must write out chunks to disk to stay within budget. Other parts of the game engine can submit their requests for chunks to be loaded and the chunk database will attempt to satisfy them.

There's some hidden complexity here, chunks store the physical and graphical geometry of the world within their bounds but we might not know what that is yet if the world generator hasn't created it yet! The world generator is constantly submitting requests to load chunks so that it can modify their geometry, this means the chunk database has to be very fast to because otherwise it would easily become the bottleneck in world generation. Additionally the chunks store their navigation mesh, but once again we don't know what the navigation mesh looks like if the geometry of this chunk has not been generated. The chunk system has to regenerate navigation meshes once the world generation system indicates that it has completed all it's work within a chunk.

### World Streaming System

The world streaming system is the final part of the puzzle. The other two systems simply generate data and store it appropriately, the world streaming system monitors the player and submits requests to the chunk database to load up chunks which the player needs loaded. For example, when the player moves the world streaming system will unload some chunks behind them and load up some chunks ahead of them.

There is a level of detail progression here, so within 100m of the player the world is fully loaded, rendered and simulated whilst further away the world will be loaded and rendered but is not actually simulated. Finally, very far from the player the chunks will be loaded into memory (reading from disk is *slooooow*) but will not be rendered.

## So... What Does This Have To Do With Navigation Meshes?

I'm getting to that! Imagine that the world is completely empty to start with, the first thing that will happen is that the world generator will generate a chunk of geometry and indicate that it is finished, now a navmesh for that chunk will be generated. We can't yet connect this navmesh to any other chunks because there *aren't any other chunks*!

We need to keep track of the fact that this navmesh is generated but not yet connected, and then connect it to other navmeshes when we can. So imagine that we continue playing and the chunk next to this one is finished and generates a navmesh... but there's no guarantee the first chunk is still loaded, it could be written to disk and we don't want to load it into memory, which most likely forces something more important *out* of memory.

We need to keep track of which navmeshes are generated *and* which chunks they have been connected with. Rather than do all this extra bookkeeping I came up with what I think is quite a neat solution; for every unconnected part of the navmesh I simply put in a connection that links to nowhere (yet). When an NPC is trying to find a path and it asks where this connection leads we go off and search for a connection, if the chunk isn't loaded we just return null and the AI can't path that way. This means NPCs will try to path around unloaded chunks which is actually *exactly what we want*, an NPC which walks into an unloaded chunk will disappear from the game (until the chunk is loaded) and that kinda sucks.