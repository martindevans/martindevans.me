---
layout: post
category : heist-game
tags : [heist, procedural-generation]
tagline : In Which Fantastic Facades Are Fabricated Fast
---
{% include JB/setup %}


## TL;DR

FMOD audio. Expanded geometry system. Failing at animations. Mixamo. Procedural Generation Toolkit. Facade Generation.

## Oops

It's been one entire month since I last did a blog post (and my last one even promised a topic *coming soon*)... oops. I've been crunching hard this month and working on loads of different features to try and bring various things up to a quality I would be happy to release. Of course, lots of polishing changes don't make for interesting blog posts! On top of that, I spent a lot of time working on some stuff which ultimately I failed at so that was a lot of time spent with no results to talk about in a blog posts.

## FMOD Audio

The old audio system in game was built on the basic XNA 3D audio system - it could render sounds in 3D and *that was it* - I have been intending to replace it with something better for months. Just recently I encountered a bug in the old audio system which was (occasionally) crashing the game. Rather than spending a load of time fixing an ultimately useless system I decided to bite the bullet and go ahead with my long planned swap to FMOD.

What is FMOD anyway? To quote myself from a [few months back](/game-development/2015/01/08/Super-Sonic-Sound/#fmod):

> FMOD studio is an audio creation tool for your audio artists to use to create complex sound effects - using the studio you can create sounds which depends upon parameters and run complicated state machines and then the game can tweak those parameters at runtime and make your sounds responsive to in game events.

> The FMOD programmers API is what you use in your game to playback these complicated sound effects. It handles stuff like loading lots of different file formats, generating sounds and effects in realtime, controlling occlusion and reverberation from geometry and positional sound.

That quote is from a blog post where I announced the release of [SuperSonicSound](https://github.com/martindevans/SupersonicSound), an open source library which wraps the FMOD C++ style API and presents it in a much more friendly C# style.

FMOD is great because it allows me to author really complex sounds including stuff such as multiple sounds playing, cues from the game, parameters from the game. When I load this sound up in the game I just... play it. No worrying about any of that complexity!

So here's an example of the reload sound for a magnum:

<video src="assets/FmodMagnumReload.webm"></video>

At the start are 3 overlapping *multisounds*. Each time a multisound plays it chooses a single sound from a set to play, in this case it chooses randomly. After a small delay there is another multisound which randomly chooses one of several clicking noises for the chamber being closed. On top of all this there is some automatic modulation of pitch and volume - every single time any of these sounds play their pitch and modulation and randomly varied by a small amount.

All of this complexity was really easy to create in the editor, and to use it all in game the code is as simple as:

    event = audioService.GetEvent("WeaponSounds/Magnum/Reload");
    audioService.Play(event);
    
Awesome!

## Characters And Animations

The next big thing I came to work on was characters and animations. At the moment the game has precisely one character, Zoe:

 <img src="assets/character.png" class="img-responsive" width="50%">
 
 Zoe isn't even the right style of character for the game so I need to totally new set of characters, preferably hundreds of them so I can fill up crowds of NPCs on the street. I found this amazing service called [Mixamo](https://www.mixamo.com/) which allows you to create characters in a tool called [Fuse](https://www.mixamo.com/fuse) and then you can pick animations from their library of animations (which is huge, and expanding all the time) and then you just download it all and you're good to go.
 
 I signed up immediately! A few characters I quickly threw together in Fuse look pretty good:
  
TODO: INSERT IMAGES HERE

In my experience *anything* to do with graphics and animations is a total nightmare. Unfortunately this time was no different. The obvious way to use Mixamo is to attach the same animations to every single one of my characters and download that, nice and simple. There are two problems here:

 1. Mixamo charges per animation per character. This means I would need to buy my animations hundreds of times, once per NPC, which would be extremely expensive!
 2. I would have hundreds of copies of the same animation on disk and in memory. Animations are actually surprisingly large and the game would probably be many gigabytes (and require just as much memory).
 
Luckily the solution to this isn't too complex. Rather than downloading the same animations hundreds of times, just download them once and then *retarget* them to whatever NPC you want (at runtime). I spent an entire week working on this and still don't have all of the bugs ironed out! The problem is that there are so many things that can go wrong:

 - Maybe the different characters have different skeletons? (I later checked with Mixamo, they don't).
 - Maybe I'm an idiot and this approach just won't work! (I also checked this with Mixamo, the basic idea is fine).
 - Perhaps the FBX file format sucks, I'll use Collada instead
 - Perhaps the collada importer is broken, I'll use Collada for models and BVH for animations
 - There's no BVH importer for XNA, guess I'll write my own...
 - Perhaps my retargetting code is wrong (probably)
 
There are loads of complex little issues here, often to do with some annoying thing like file formats or matrix handedness. After two weeks working on this I put it on the backburner - Mixamo is an awesome service and I'm definitely going to have to do this work in the near future, but for now it's on hold.

## Procedural Generation Toolkit

Procedural generation has always been a core part of what is cool and unique about this game; there's a limitless number of banks to rob! Sometimes a bank will be insecure *because of what is next door* and with procedural generation you can explore that possibility. Procedural generation was the earliest part of the engine which I built (a couple of years ago) and although I've come back to it a few times to add more complex features (e.g. [Floorplan](http://martindevans.me/heist-game/2014/08/17/The-Ball-Is-Picked-Back-Up/) generation) I've never really properly demonstrated the full power of this fully armed and operational procedural development engine.

There's a reason for this lack of complex demos: writing generation scripts is *hard*, it requires visualising lots of geometry in your head. This is why I've been using this same test level for so long, it hasn't been worth the effort to build a huge new level.

Obviously before I make any kind of release I'm going to need some proper levels and I can't rely upon building them entirely in code. To this end I've started building a tool called **NODE/Machine**. NODE/Machine is a toolkit for designing and building levels using the procedural generation system - split up into several independent tools for different jobs. All the tools link up to the game, so you can design an element (e.g. a floorplan) and then click a button to see it in game instantly.

### Facades

This week I have been working on facade generation. It's heavily work in progress, but here's a quick demo of me throwing together a basic facade in NODE/Machine:

<video src="assets/NodeMachineFacade1.webm"></video>

There are a couple of bugs here, but hopefully you get the idea - with this simple little markup language you can design walls to go into the game! Next week I'll (hopefully) have these bugs stamped out and have a much more complicated and impressive looking demo actually rendering in game.