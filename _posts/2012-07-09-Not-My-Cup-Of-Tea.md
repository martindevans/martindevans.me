---
layout: post
category : Heist
tags : [heist]
tagline : In Which I Reveal An Intense Dislike
---
{% include JB/setup %}


## TL;DR

I made terrible progress this last week thanks to graphics programming being horrible.

## What Went Right?

A few things did go right this week. I updated the scripting interface to handle coercing of types between lua and C# in a more consistent way and it has turned out to be fantastic to work with, hopefully no one will ever notice this because it just does what you expect! Another thing was adding a torch tool to the player, this turned out to be trivially simple to create the tool and add it to the player inventory. Basically I now have more confidence in my scripting system, which is nice, but it wasn't what I was really working on.

## What Went Wrong?

### Lights

They are still way too dim, and I have no idea why! This isn't really a bug so much as an artifact of bad documentation for the renderer and I haven't spent very much time looking into it.

### Texture Atlas

This is the biggie. A texture atlas is basically all the textures to apply to the city squashed together into one single texture, this means I'm only *really* appplying one texture to the city, I just apply different bits of it to different parts of the city and it looks like lots of textures. The obvious problem with such a system is leaking of data between the textures, just around the edge of one texture I might accidentally sample pixels from the next. There are standard fixes to this kind of problem (make all textures sized to a power of two, have a single pixel border around the egde of each texture, don't use linear filtering)... none of which have worked! I'm currently totally at a loss as to what might cause these borders.

## The Light At The End Of The Tunnel

Luckily, whatever is causing these borders is probably my fundamental ignorance of anything to do with programming proper graphical things. Once I discover what the problem is I expect it will be trivially easy to fix.