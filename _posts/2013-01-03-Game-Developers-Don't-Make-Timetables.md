---
layout: post
category : Heist
tags : [heist]
tagline : In Which A Promise Is Prepared To Be Broken
---
{% include JB/setup %}


## TL;DR

I want a timetable to work to, and I don't see any reason to keep it secret.

## An Explosion Of Buildings

The coolest thing about the way cities work in Heist is that lots of people can all contribute a small bits and the system will place them together even though no one is collaborating with anyone else. Of course for this to happen it is vitally important that contributing something small is actually a small amount of effort - even better it should be fun!

At the moment contributing new parts of a city is _not fun_. First you need to learn lua, and then you need to learn the Heist procedural generation API, and then you need to manipulate a load of CSG brushes in your head until you've worked out how to construct a parametric building just by writing down lines of code. Needless to say this is why the city currently isn't terribly detailed, I'm the only contributor and I have better things to do with my time (like writing the actual game).

### But It Doesn't Have To Be This Way!

Games like [Minecraft](http://minecraft.net/), [Garrys mod](http://garrysmod.com/) and [Kerbal Space Program](https://kerbalspaceprogram.com/) have proved that people really love to build things. The problem isn't that people don't _want_ to build cities. The problem is that right now, building cities is really boring and requires not insignificant programming skills and effort.

### The Big Reveal

The next few months of development on Heist will be working towards solving this problem by developing an in game construction mode which allows players to create/edit/save and load shapes and then to use these shapes to build procedural cities which can then be loaded in any of the other Heist gamemodes as places to play in. This is quite exciting for me because most of the work for this mode will _not_ be engine work, instead I will be doing most of my work in writing Lua scripts to create the new gamemode and associated scripted tools/entities which means this will be the first real test of how flexible the game is for modding.

The other thing I'm going to be working on in the same period is working out how exactly I'm going to start making money off all this hard work. To start with I'm simply going to be posting on Screenshot Saturday over at [r/gamedev](http://www.reddit.com/r/gamedev) <del>every</del> most weeks to get a little more attention on the project. Beyond that point I see my options as:

1. Working towards a full steam release
2. Working towards a Greenlight release
3. Putting myself on Greenlight as a preview/concept
4. Hosting my own paid alpha
5. Kickstarter

Of these options I think hosting my own paid alpha is the most likely while getting onto steam is the most desirable. _There's a lot to talk about here so I'll talk about this in more detail in another blog post_.

## Timetable

I promised a timetable, so here it is:

### January

- Basic Construct Mode (tools to create and manipulate CSG brushes)
- Material selection for CSG brushes
- Shape Library (a place to save and load custom shapes from, persistant)
- <del>Account System (a centralised profile for players of Heist, for when I get bored with CSG)</del> [Steam accounts](/Heist/2013/01/09/Thinking-Aloud-About-Release/)
- Better Mod UI on main menu (more graphical, prettier layout, descriptions of mods, force refresh)

### February

- Parametric Construct Mode (allow players to create nodes containing shapes with sizes like "X is 75% of the width of Y")
- Parametric Saving (save parametric shapes as scripts for city generator)
- Generate Cities (allow players to generate an regenerate small chunks of a city on the fly, including using the paramtetric shapes they just saved)

### March

- Multiplayer Construct Mode (shouldn't be a massive amount of work)
- General Multiplayer Polish (make NAT negotiation more reliable, better session initiation)
- Prepare For Paid Alpha Release? (depends on what I decide)
