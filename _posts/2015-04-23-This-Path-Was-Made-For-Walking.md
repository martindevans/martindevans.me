---
layout: post
category : Heist-Game
tags : [heist, artificial-intelligence]
tagline : In Which Paths Are Walked Along
---
{% include JB/setup %}


## TL;DR

String pulling and steering behaviours are a good combination for walking along a path.

## Path Following

NPCs have two stages of work to get to a destination. First they need to perform *pathfinding*, this is where you use A\* (or something similar) on a navmesh which will find a broad path to follow to get to the destination. Secondly, the NPC needs to follow the path.

I've [talked](http://martindevans.me/heist-game/2013/04/10/Pathfinding/) about pathfinding before, as well as [some of my work](http://martindevans.me/heist-game/2015/03/27/Cross-Chunk-Navmeshes/) with the navmeshes which pathfinding works with. These past few weeks I have been working on path following, experimenting with different techniques to see what works best.

## Isn't Path Following Really Simple?

It seems like path following ought to be dead simple, you've done the hard bit with your A\* search now you just need to walk along the lines connecting the navmesh regions! The problem with this is it can result in dreadful paths with most navmesh geometries. For example, here is a basic floor plan with 2 possible paths drawn onto it:

<a href="/assets/navmesh-paths.png"><img src="/assets/navmesh-paths.png" align="left" width="500" height="auto" padding="3px"></a>

The red line is the kind of path a human would naturally take, it's the most direct way to get from A to B because it cuts in close to the corners. This is the kind of behaviour we want from our NPCs.

The blue dots are the center points of each navmesh section and the pink line is what you get if you simply walk along those points - it looks dreadful!

So we need some kind of algorithm which will take in a series of navmesh faces and return a series of points which is the "human like" path to follow.

## Steering Behaviours

Absolutely [ages ago](http://martindevans.me/heist-game/2012/07/24/Artificial-Stupidity/) I forked SharpSteer2 to introduce a load of code quality improvements, use modern C# features, fix bugs and introduce new features. SharpSteer2 is a port of [OpenSteer](http://opensteer.sourceforge.net/), a library which provides basic primitives that can be used to build complex steering behaviours.

My fork of SharpSteer2 is actively maintained and is available on [Github](https://github.com/martindevans/SharpSteer2) and [Nuget](https://www.nuget.org/packages/SharpSteer2/).

I experimented with passing the pink path into steering behaviours and then trying to predict ahead along the path to smooth out the rough edges. This is actually what Left4Dead Zombies do (see [Slide 14](https://www.valvesoftware.com/publications/2009/ai_systems_of_l4d_mike_booth.pdf)). However I could not get this to work convincingly, smoothing can only look so far ahead and will always be defeated by really long sections. Additionally as the NPC walks along the path she wiggles around as she discovers new path features, this is probably acceptable for a great big mob of zombies charging at the player but it does *not* look like how humans walk - we take straight lines or big long curves - and would be very obvious in a slower paced stealth game.

## Funnel Narrowing

The funnel narrowing algorithm is an algorithm to find a path formed from straight lines along a series of portals. The "portals" in this case are the *edges* of the navmesh faces along the path, they are perpendicular to the path and indicate gateways that must be passed through.

The algorithm is [described in detail here](http://digestingduck.blogspot.co.uk/2010/03/simple-stupid-funnel-algorithm.html) and comes with code to implement it (not C#, but easy enough to transcribe). The essence of funnel narrowing is that we have a triangle (a "funnel") from the point of the path we're currently at to the two points on the next portal, this funnel can sometimes be narrows by moving one of the edges to connect to the *next* portal along. You simply keep narrowing the funnel until changing the edge would widen the funnel. Follow that link above if you're interested in implementing it.

The funnel narrowing algorithm provides a line something like the red line in the image above which is what we wanted all along... but now what do we do with it?

## Steering Behaviours, Part 2

Steering behaviours weren't any good at solving the problem of finding a good humanlike path through the navmesh but they're perfectly suited to following the output of the funnel narrowing algorithm. The whole point of steering behaviours is that they can be combined, so we can combine a path following steer with obstacle avoidance (e.g. avoid other people in hallways) to get nice natural path following.

This is dead simple to implement:

    //Avoid other NPCs
    var steer = SteerToAvoidCloseNeighbors(otherNpcs);
    
    //If we're not avoiding anything, then follow the path
    if (steer == Vector3.Zero)
    {
        steer = SteerToFollowPath(path);
    }
    
    //Apply whatever steering force we calculated above
    ApplySteeringForce(steer);
    
## So, Are We Done?

That's it! We can walk along a path, awesome. But what if:

 - The NPC leaves the path
 - The target position moves
 - Something more important than walking along this path happens
 
### The NPC Leaves The Path
 
 There are events in the game which could knock the NPC far off the path, for example say an explosion blasts the NPC away from the path. This is quite simple to handle; we simply check if the NPC is contained within one of the navmesh faces along the route. If the NPC leaves the navmesh path then we just recalculate the entire path from where they are currently standing.
 
### The Target Position Moves

The target could be moving object, for example the NPC could be pursuing the player. Same as before we simply check if the player is within the navmesh path and if they are not recalculate a new path.

### Something More Important Happens

There is more to life than walking along paths. Everything I have described here is just a simple behaviour to get to places; how we make actual *decisions* is a different topic which I shall cover soon.