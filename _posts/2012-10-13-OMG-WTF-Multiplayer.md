---
layout: post
category : Heist
tags : [heist]
tagline : In Which Tasty Tasty Multiplayer Happens
---
{% include JB/setup %}


## TL;DR

The next major feature of multiplayer is mostly done.

## OMG!

I have recovered from the RSI I spoke about last time, which is good because I was actually starting to go crazy due to lack of coding! Since then I haven't said anything on my blog, because I've been in a crazy coding frenzy to make up for lost time. My focus has been split between two tasks...

### The Other Game

I mentioned last time that I was working on another game project with some friends using a lot of the technology I've built for Heist to rapidly build another small game. That sort of fell through, turns out not everyone is as into making games as I am (who would have guessed), the project is still around but now I'm working on it with a more experienced programmer who is as in to making games as I am.

This project is proving to be incredibly useful for Heist, which is excellent. Thanks to the smaller scope of this project some things which are not clear within the complexity of Heist become much clearer, this leads to improvements in the base code library both games depend on and thus leads to improvements in Heist. The big improvements have come with multiplayer...

### Multiplayer

Multiplayer is something that I have been working on for Heist on and off for months, it seems like every time I complete a major feature in Heist my next major task is more work on multiplayer! A vast amount of work for the new project was picking the multiplayer code out of Heist and making it into something more generally usable in lots of games, of course this is a good thing because it means I only have to solve these hard problems once and then I can use the code for multiplayer in all my games.

I'm going to do a blog post later/tomorrow detailing a whole load of stuff about the networking system I've built, overall I'm quite happy with the abstraction I've built although there are a few improvements I'd like to make which I might talk about too.

## WTF?

Getting an abstraction for multiplayer is half the battle, the other half is getting it integrated with Heist. When you start a game in Heist you will have a load of active *data sources*, these sources supply scripts for various things in the game (e.g. the [World Scripts](https://bitbucket.org/martindevans/worldscripts/src) which define the buildings in the world), of course if you join a multiplayer game it is critical that you have the same set of active data sources as all the other people in the game otherwise crazy-weird-stuff (tm) will happen. So what Heist does is when you join a game the host sends an XML document a bit like this:

    <sources>
      <source type="World" protocol="hg" name="WorldScripts">
        <path><![CDATA[https://martindevans@bitbucket.org/martindevans/worldscripts]]></path>
      </source>
    <sources>

This document simply lists all the sources the host has enabled and then the joining client can simply go and fetch all those sources (in this case using "hg", the [Mercurial](http://mercurial.selenic.com/) version control system). There is an interesting hidden subtlety here, what happens if you start a server and then the data source is updated? For example you start a server using the bitbucket worldscripts data source, and then I push a new load of scripts to bitbucket. The host won't have these new scripts since data sources are only pulled when a game starts but the client will since it joined later. To solve this problem Heist also sends along the "version" of each script source, for Mercurial this is simple (it is a _version_ control system, after all), I then make sure the client has the same version as the host and all will be good :D

## BBQ!

The end result of all this work is this:

![OMG! WTF? BBQ!](/assets/omgwtfbbq.png)

This screenshot is taken from my laptop, down there is a player running on my PC (waving a torch about). Top left you can see the chatbox, added entirely through scripts, working perfectly.

## Coming Soon

Some details of the technical internals of exactly what the networking system does and how it does it.