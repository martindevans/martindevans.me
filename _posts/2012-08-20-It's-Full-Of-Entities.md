---
layout: post
category : Heist-Game
tags : [heist]
tagline : In Which The True Nature Of The Collection Of Collections Of Behaviours Is Revealed To Be A Scene
---
{% include JB/setup %}


## TL;DR

I talk about how Heist holds its view of the world in memory.

## Background

I was planning to talk about my progress on the in game User Interface this week, but as I planned out the post in my mind I hit a bit of a wall - my solution to loading the UI revolves around loading certain things into the game in a certain way which turns out to be really neat - but if you don't understand how Heist manages the world it'll all go over your head! So this week I'm going to explain some of the internals of how Heist manages the world.

## The Scene

The Scene is the entire world. Literally everything goes into the scene, characters are in the scene, lights are in the scene, even cameras are in there. The scene is essentially the single store of _state_ in the entire game, if there is a piece of information about the game that changes over time it's probably stored in the scene. This means that all the parts of code which make up the world (e.g. the rendering engine) simply grab the bits of the scene they need every frame and do their thing (e.g. Render the next frame), which is conceptually nice and simple.

## Entities

Of course, the scene isn't just a random collection of data thrown together, that would get very messy very quickly! Rather, data is stored in objects called entities. Each entity has a load of _properties_ and a load of _behaviours_.

### Properties

Properties are the only place to store state in an entity, everything which changes about an entity is stored in a property. For example, if you have a player entity it would have properties for position, velocity, rotation, remaining health, total health, health regen rate etc etc. Properties have a name, so various parts of the system can all retrieve the same property from the same entity and will all be reading the same value. Conversely, if something gets the property and changes it, then everything else which has retrieved the same property will now get the updated value.

### Behaviours

Properties just store data, of course we need something to read and write that data data - that's where behaviours come in, they describe how an entity acts in the world. So let's say, for example, we have an entity with 3 properties:

* Position
* Velocity
* Mesh

This entity has all that we need for a bouncing ball, but as it is it won't do anything, in fact it won't even be rendered! But if we add some behaviours to it:

* Renderable
* GraphicsMesh
* PhysicsMesh
* PhysicsObject

Suddenly this ball is visible (Renderable+Graphics Mesh), it will collide with things (PhysicsObject+PhysicsMesh), and it will move (PhysicsObject)! Magic!

#### Isn't this all a bit complex?

Some people might be thinking this sounds a bit complex, but actually it simplifies the system. Look at the last example, the Physics system and the renderable system don't know anything about the existance of the other, but they work together to render a moving ball because they're both working on the same set of properties and as physics updates the position then the rendering system updates what it draws.

## Other stuff

In truth there are a few other parts to the scene. For example, there are "Behaviour Managers", one for exach type of behaviour, which holds a list of all behaviours of that type - this is use for things like the renderer, which needs a list of all Renderables to draw. That kind of stuff is an implementation detail though, and so far doesn't expose itself to the scripting system at all because I don't think it's needed.

## Open Source

If you're interested in the details of this system then you're in luck, the entire entity system used by heist is an open source project which you can find [here on github](https://github.com/martindevans/Myre). It's a bit light on documentation at the moment, which is something I plan to fix, but in the meantime if you have any question feel free to drop me an [email](mailto:martindevans@gmail.com) or leave a comment below :)