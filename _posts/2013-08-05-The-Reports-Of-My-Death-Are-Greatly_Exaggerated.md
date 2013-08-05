---
layout: post
category : site-update
tags : [generals]
tagline : In Which The Author Suddenly Remembers He Has A Blog
---
{% include JB/setup %}


## TL;DR

I suck at keeping this blog up to date.

## Where The Hell Have You Been?!

It's been nearly 2 months since my last update, sorry about that. June is always a busy month for my family and then in July I was crunching hard to try and achieve a goal (multiplayer deathmatch) in time for a LAN party I was running. Unfortunately I didn't even achieve that goal because I discovered a critical bug in one of my dependencies (I'm *still* waiting for them to get back to me on that. Protip: Don't buy the Ludosity Steamworks wrapper).

## What The Hell Have You Been Doing?!

- Adding support for save games (not exposed in the demo as it's not complete yet, but most of the complicated work is done).
- Huge improvements to how content is managed (mods can now load content, which is pretty important!)
- Added a [character](assets/character.png) and overhauled some of the character controller code to make it more scriptable.
- Since I discovered I can't do multiplayer how I wanted (I'll come back to that) I've been working on building a skyscraper. As I work I've been implementing loads of changes to make building design easier (concave footprints, 2D CSG functions, entity creation from world scripts).

## Multiplayer

This is the thing that consumed a lot of my time, and unfortunately I have nothing to show for it. Valve recently gave all greenlight developers access to the Steamworks SDK (this is awesome) and so I decided to write multiplayer using steamworks (for now) to free myself of all the horrible complicated bits like NAT traversal and session initiation. I went out and purchased a .Net [wrapper around steamworks](http://u3d.as/content/ludosity/ludosity-s-steamworks-wrapper/2qg) and got to work. Unfortunately the wrapper seems to have a critical bug in it (it will arbitrarily crash after a garbage collection) and so all my time was wasted. I _have_ contacted ludosity about this (twice, over 1 month ago) but they haven't got back to me. I can only recommend that you *DO NOT BUY THIS WRAPPER*. I'm considering my options with steamworks at the moment (this will likely be the subject of my next blog post).

## But What About AI?

I had intended to finish the AI series with demos of the AI in game (after I got basic multiplayer working), obviously my timetable has been a little thrown off! However, I do intend to come back to the AI series soon (tm).