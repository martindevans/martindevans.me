---
layout: post
category : Heist
tags : [heist]
tagline : In Which A Note About HUGE SUCCESS Is Authored
---
{% include JB/setup %}


## TL;DR

I improved rendering performance a lot.

## It's Hard To Overstate My Satisfaction

Heist, obviously, has a huge amount of geometry it needs to draw every frame - ideally the game should be drawing an entity city full of buildings and rooms every 16 milliseconds!

### But There's No Sense Crying Over Every Mistake.

So the first approach I took with Heist was a very _carefully considered and well designed_ approach to rendering I like to call, "RENDER ALL THE THINGS":

![All the things](/assets/render-all-the-things.jpg)

Essentially, I dispatch the geometry of the entire city as one massive render call every frame. This actually isn't as stupid as it may sound, multiple render calls can get expensive and the GPU is good at pushing large amounts of geometry, especially in a [deferred renderer](http://en.wikipedia.org/wiki/Deferred_shading) like Heist uses. The other advantage of this approach is that it's really simple to implement; there is one massive vertex buffer which data is thrown into, and then I just render that buffer.

### And Tore Me To Pieces.

It's common sense when rendering stuff not to render things which aren't on screen! This was the flaw with the old system, it's simple and only requires one single draw call _but_ it draws everything all the time - even things which are behind you. So this improvement of mine introduces culling to the city, the system only draws things which are within the camera viewport. This was actually a fairly simple change, the Myre.Graphics engine already does culling if you present the data to it in the right way (which I wasn't before), once I'd split the city model up into lots of entities (still sharing the same buffer behind the scenes) suddenly performance increased as the engine automagically took advantage of this and started culling away things out of view!

## I Think I Prefer To Stay Inside.

I still have some tidying up to do on this code, so I haven't released it yet. I will be pushing out this update as soon as possible (hopefully within a few hours). Hopefully once I release it you'll see the general performance of the game increase a huge amount - to me it feels a lot smoother on my high performance gaming PC, and it even runs smoothly on my laptop which before only managed ~10fps!