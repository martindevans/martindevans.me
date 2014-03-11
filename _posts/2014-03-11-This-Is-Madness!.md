---
layout: post
category : game-development
tags : [game-development]
tagline : NO! THIS IS OPEN SOURCE!
---
{% include JB/setup %}


## TL;DR

Several really cool projects have been released by some really big names in gaming.

# "If you're good at something, never do it for free"

There are a *lot* of tools for building games for free these days, even entire engines like Unity, Unreal and Irrlicht are just given away and this is _fantastic_ - more people making games is good news for the industry. However, some of the best tools are only available for crazy price tags - e.g. Maya is **$3,675** - a price tag which makes an Indie developer like me go and cry in a corner. To bring me out from my corner several really cool tools have been released, totally free, in just the last couple of days.

## Firelight Technologies: FMOD Audio Middleware

> *FMOD Studio is an audio content creation tool for games, with a focus on a ‘Pro Audio’ approach. It has an entirely new interface that will be more familiar to those using professional Digital Audio Workstations than existing game audio tools and is loaded with new features.*

Firelight Technologies [announced yesterday ](http://www.fmod.org/fmod-now-free-for-indies/) that FMOD is now free for commercial indie projects. Games with a development budget under $100K can use FMOD for free! This is *really huge*, implementing a full featured Audio engine is a pain in the ass and I expect most indie games just opt to ad-hoc build features as they need them. Someone on Reddit summed this up perfectly:

> *This is so* fucking *huge, and I am so excited. Sound designers can find it very difficult to be proud of their work without proper implementation, and it's been nearly impossible to convince indie devs to shell out for middleware because it's so goddamn expensive especially with multiple porting becoming commonplace with unity. I am so excited about this. It will save indie devs hundreds of hours of audio programming and exponentially increase the quality of audio in low-budget games.*

For me personally this is great. The audio engine in Epimetheus is *very* basic - it can render 3D audio and only handles attenuation by distance + doppler shifting. I'm not going to replace it any time soon but I expect eventually I'll drop FMOD in as a straight replacement and then after that doing more advanced audio FX will be much easier.

## Valve: DirectX To OpenGL Translator

> *Direct3D -> OpenGL translation layer.*

> *Taken directly from the DOTA2 source tree; supports:*
> *Limited subset of Direct3D 9c. Bytecode-level HLSL to GLSL translator. Some SM3 support: Multiple Render Targets, no Vertex Texture Fetch*

[TOGL](https://github.com/ValveSoftware/ToGL) is a translation layer which Valve use in Dota2 to translate the (Windows only) DirectX calls into (Cross platform) OpenGL calls. This isn't particularly useful to me, personally, but it's pretty cool and I imagine we might possibly see this code cleaned up a little to become a more general purpose DirectX->OpenGL translator.

## Sony: Authoring Tools Framework

> *[Authoring Tools Framework](https://github.com/SonyWWS/ATF) (ATF) is a set of C#/.NET components for making tools on Windows. ATF has been used by most Sony first party game studios to make many custom tools such as Naughty Dog’s level editor and shader editor for The Last of Us, Guerrilla Games’ sequence editor for Killzone games (including the Killzone: Shadow Fall PS4 launch title), an animation blending tool at Santa Monica Studios, a level editor at Bend Studio, a visual state machine editor for Quantic Dream, sound editing tools, and many others. ATF has been in continuous development in Sony's Worldwide Studios central tools group since early 2006.*

This looks like it's going to be an incredible resource for me when it comes to building a set of modding tools for Epimetheus. ATF includes basically a complete framework for building game development tools (and I guess it would be pretty damn useful for not game development related tools too).

# Pretty Cool

This is a pretty cool coincidence that these three sweet tools all came out on the same day. I wonder if this is the start of a trend? I certainly hope so!