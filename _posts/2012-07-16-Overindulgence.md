---
layout: post
category : Heist-Game
tags : [heist, release]
tagline : In Which I Decided Never Again To Indulge My Artistic Side
---
{% include JB/setup %}


## TL;DR

I fixed up graphics and have made a new release. Download it from [the usual place] (http://placeholder-software.co.uk/setup/heistgame/publish.htm).

## Graphics!

That's right, Heist finally has some graphics which aren't black and white! At the moment the graphics don't actually look that great, but that's mostly because I'm a rubbish artist and only made 2 materials - concrete and brick. Once you get into a city you'll see everything is mostly greyish white, that's concrete (look closely and you can see some swirly patterns in it which look kinda like poured concrete). A few buildings are a pale blue colour, which is brick. I'm not to sure why I made bricks blue to be honest... it's been a long week ;)

Graphics are not quite finished right now, and I'm going to leave them unfinished for a while - there are more important tasks to get Heist to something playable right now.

### Ditch The Diffuse

The way in which city materials are drawn is inspired by [this essay] (http://artisaverb.info/DitchingDiffuse.html). Normally games texture things by an artist painting a diffuse map, which contains all the surface details in one texture including little bits of damage and grime applied to the surface. The problem with this approach is that surfaces cannot share a texture unless they also share exactly the same patterns of grime and damage. My approach is that the game loads in several maps, a height map defines the shape of the surface, a damage map defines how the surface might be damage (and this can be blended in differently for each surface), and then a gradient map defines how to turn the damaged heightmap into a coloured diffuse map. In theory this all means that an artist only has to define each surface once, they simply need to split damage, height and colour out into three textures instead of cramming them all into one as usual.

## Texture Packs

Heist now actually supports custom texture packs, which is kinda cool (maybe a better artist than me could make some non blue bricks).

### Loading A Custom Texture Pack

Right now there's no menu for selecting your custom texture pack, so if you want to use one you'll have to drop the pack into _C:\Users\USERNAME\AppData\Roaming\Heist\TexturePacks_ then go into _C:\Users\USERNAME\AppData\Roaming\Heist\Configuration.ini_ and change _TexturePack=_ to _TexturePack=PATH-TO-PACK.zip_, now the game will load in your texture pack (If the game can't find your texture pack, it will load the default one).

### Creating A Custom Texture Pack

A large part of my work this week has been making a tool to create texture packs from a set of source images. This tool takes a load of 512x512 images and packs them up into a single texture atlas for the game to use, it also optionally uses the incredible [pngcrush] (http://pmt.sourceforge.net/pngcrush/) program to crush the images down to a much smaller size so that texture packs don't get too big. The tool also generates normal maps off the input heightmaps, so you don't have to generate them yourself. You can download the TexturePackr tool [here] (http://placeholder-software.co.uk/setup/TexturePackr.zip), there's an included readme with detailed instructions. If you make a texture pack, I'd love to see what you do! Send me pictures, or even just the pack itself so I can have a play :D

## Greenlight

I might write a full blog post about this sometime in the week, but [Greenlight](http://steamcommunity.com/greenlight/) looks brilliant, I'm aiming to get something playable by the time that's out so I can be on there at launch with something interesting for people to try.

## Some Time

Now that I have a texture atlas system in place it actually wouldn't be that much more work to implement a Sparse Virtual Texturing system (otherwise known as [MegaTexturing](http://en.wikipedia.org/wiki/MegaTexture)). I'm not certain a SVT system would actually be terribly useful, but I will look into that sometime. Not soon though, a SVT system wouldn't get me a signficant way towards anything playable, which is the most important thing right now.

## Next Time

I'm going to be looking into Artificial Intelligence for the next couple of weeks. AI is incredibly important to Heist - lots of buildings is only half of a city, the other half is hundreds of NPCs wandering around doing their own thing and reacting to the player in believable ways. Obviously the AI system is going to be scriptable in Lua, I'm thinking some kind of modular system which allows you to define a single behaviour and some triggers, so the NPC keeps transitioning between a load of different behaviours based on environmental triggers. My aim for the release in two weeks is currently a load of plain old NPCs wandering around, and a few zombies who wander around threatening and infecting other NPCs - which sounds like a good AI test _and_ something vaguely playable all rolled up into one.