---
layout: post
category : Heist-Game
tags : [heist]
tagline : In Which Work Is Resumed
---
{% include JB/setup %}


## TL;DR

Don't get RSI, it sucks.

## Remorseless Self Pity

As I briefly mentioned a couple of weeks ago, I've had RSI these last couple of weeks. It seems that years of gaming and coding finally caught up with me with a _vengeance_ and forcibly put me out of action. This was some incredibly bad timing, since I've had RSI we've had:

- An Expensive New Gaming Mouse
- Lots of Coding Time
- Guild Wars 2
- Lots of Coding Time
- Battlefield 3: Armoured Kill
- Lots of Coding Time
- Borderlands 2

You get the idea, I would like to do some of the above. Preferably I would like to do _all_ of the above! Anyway if you've been feeling some slight twinges in your wrist, arms or back while gaming/coding recently then for your own sake go and _do something else_! My solution (once unable to use the computer) was to watch anime while doing pressups and weightlifting to strengthen my arm muscles, multitasking FTW!

## Remorse

I haven't been completely idle these last three weeks, people who know me probably realise it is physically impossible for me to not write code for three entire weeks. Instead of writing new code, I've been reading code, in two ways.

### [Refuctoring](http://www.codinghorror.com/blog/2012/07/new-programming-jargon.html)

I mentioned last time that I was going over the networking code, writing a few unit tests. I've gone a _little_ bit beyond that now, in the last week I've pulled out 6000 lines of code from Heist and moved them into a separate library (Called Placeholder.\*) for building games - that's about 20% of the entire of Heist modified in a single week. During this time I have:

- Redesigned the networking system
- Redesigned the packet serialisation system for networking
- Achieved 100% test coverage on packet serialisation
- Completely rewritten the audio renderer
- Completely rewritten the input system
- Lots of polising of existing code
- Fixed endless bugs
- Written a library which is easily usable in other game projects of mine

The new library is better tested, better designed, has neater abstractions and most importantly is designed for re-use in more games! I'm certain I would not have done this if it were not for the RSI, which honestly doesn't in the slightest make up for weeks of pain, but it's a nice thought.

### I Can Barely Type, What I Need Is Another Game Project!

Logic! No, honestly, that really is logical. I started a new project with a few friends of mine, all programmers of varying levels of experience who were interested in making games. We're remaking a game I made ages ago in Java, this time using C#. The important thing about this project is _I'm not writing much code for it_, I'm just the project leader (see, I told you it was logical). This is intended to be a short project, I've set a goal of getting the game complete enough to get it onto steam greenlight by christmas, which actually shouldn't be a terribly difficult goal. I'm sure sometime around new year I shall write a summary of the project, and what I learnt about project management doing it. I'm also sure I'll mention the game long before then, when we have something demoable in a month or so I'll put up some pictures here.

The hardest part of the project for me so far is simply bringing the team up to speed, the problem is we're using a lot of technology I'm _very_ familiar with:

- C#/XNA (My primary language for 5 years)
- Myre (I've been involved with this for over 3 years)
- Placeholder.\* (Basically all of my time coding over the past 8 months)

A lot of the basic setup of the project (the stuff we're doing now, at the start) is plugging together components that are already written into Myre or Placeholder.\* which isn't what anyone is _really_ interested in when making games. It's a fun challenge.

### MORE GAMES

The coolest thing that's come out of all this is that I realised that I have a whole load of really awesome technology for making games really quickly - I reckon I could throw together a simple game in two or three days, even with network multiplayer included, and have it be fairly polished. My mind is abuzz with ideas for games, it's a fun time to be a game designer! Once I properly get recovered from RSI and back to games I suspect I shall do something like a monthly game jam - build whatever game is on my mind at the moment, with a time limit of 36 hours coding time over three days, and just see how it plays and if it's worth developing into something more.