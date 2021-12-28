---
layout: post
category : Personal
tags : [general]
tagline : In Which A Plague Occurs (Again)
---
{% include JB/setup %}

# TL;DR

Overcrowded had to be rebuilt. COVID19 sucks.

# What Did I Do In 2020?

In my [last retrospective](https://martindevans.me/personal/2020/12/31/2020-Retrospective/) I talked about how Overcrowded was nearly ready for release, learning [KiCad](https://www.kicad.org/) and the failure of Bounded Planet project.

# Placeholder Software

This year we've released 7 updates for Dissonance with a number of improvements:
 - Add [RNNoise](https://jmvalin.ca/demo/rnnoise/) support.
 - Worked around a weird Unity linker bug which broke Dissonance logging in Thailand/Argentina.
 - Added a low pass filter to attenuate high pitched sounds (above the normal range of human speech).
 - Modified some power "mobile" platforms to use the desktop AEC, since it's higher quality.
 - Showing dBFS in the UI everywhere (See below).
 - Increased priority of Dissonance AudioSource components (so the Unity audio engine never mutes them).
 - Not playing silence when not speaking, so Dissonance isn't using up so many audio engine "voices".
 - Added support for capturing and uploading realtime "metrics".
 - Various synchronisation fixes (every time we fix this someone finds a new and exciting way to get out of sync).
 - Improved AGC handling of long periods of silence (no longer amplifying nothing up so that next time you speak it deafens everyone).
 - Added realtime diagnostics to AEC, accessible through scripts.

As you can see no huge new changes here - Dissonance is quite stable and generally works well in most situations. We're just adding small new improvements and features (or adding a large ones, such as RNNoise, as optional extras).

### dBFS

Previously we'd avoided showing decibels anywhere in the UI. dB is a very misunderstood unit and so we tried to avoid mentioning it anywhere - for example the fader controls were all `0 to 1`, which indicated the actual number the signal would be multiplied by. However, this itself is very confusing since the input is linear but the perception is non-linear! Instead we've decided to swap to showing dBFS everywhere in the UI - even if you don't understand what this means (decibels below full scale) it's more intuitive.

## Overcrowded

Last year I mentioned that we'd been working on "Overcrowded" since mid 2019 and it was nearly ready for release. It hasn't released yet, so what went wrong?

Early in the year we were still working to tweak the old local avoidance system which was based on ORCA (Optimal Reciprocal Collision Avoidance). ORCA is quite a well know algorithm to solve the local avoidance problem, but it seems to have a major problem. In _theory_ it provides optimal solutions to local avoidance, but in practice optimal solutions do not always look natural and when the scenario gets so overcrowded that there is no good solution (or the best option varies wildly from frame to frame, as agents move around) ORCA totally breaks down and looks awful. We had been trying to patch this up for a while with various system to detect poor behaviour and work around it, but we weren't ever happy with the quality - there was always some new corner case which looked bad.

Eventually Tom invented a completely new local avoidance system which is significantly better than ORCA in practical environments. It's simpler, faster to evaluate and has the concept of falling back to suboptimal solutions built right in to it. It also handles solving the problem from frame-to-frame better, with agents "sticking" to their previous solution (even if it's no longer optimal) as long as it's good enough. Obviously this took a while to design, implement and test so it delayed release quite a bit, but it was definitely worth it!

We were just about ready to release again (around September) when another roadblock occurred. Unity [had announced](https://forum.unity.com/threads/notice-on-dots-compatibility-with-unity-2021-1.1091800/) that some bits of DOTS (such as ECS) would not be compatible with Unity 2021 during the beta phase. We had hoped that this would be resolved by the time we came to release, but unfortunately not. We decided that we couldn't release Overcrowded, which completely depends on the ECS, while ECS was in such an uncertain state. So we're now rewriting Overcrowded again, with a reduced feature set, this time not depending on ECS at all (but still using the Job system etc). Hopefully we'll be able to release this in Q1 of 2022!

# Blogging

I started a series on building a toy compiler for Yolol, Inspired by my work on `Yolol.IL` (which compiles Yolol into dotnet bytecode and achieves millions of lines/second). I plan to do a couple more entries in that series on compiling to IL and some optimisation tricks.

# Projects

## Yolol.IL

I've really had fun building Yolol.IL, but I think I'm coming to the end of what I can squeeze out of it in terms of speed. Yolol really isn't a very good language to optimise - if I wanted to get into incredibly complex analysis and optimisation there's more I could do but I've intentionally tried to keep Yolol.IL very simple (mostly single-pass) for the sake of maintainability.

What has been particularly interesting with this project is it's seen a huge amount of use in my Discord code-golf challenge (a bot presents a challenge, users can solve it by submitting code), running hundreds of millions of lines of code this year which means that it is one of my most battle tested projects. However, even with all of that when I ran a fuzzer against it I still found a number of bugs. After every change I have run the fuzzer for a couple of hours before updating the code golf challenge and in several cases users have reported bugs. It really goes to show that avoiding bugs in a system like this is nearly impossible without a huge amount of testing!

## YololBlazor

This was a fun little project ([link](https://martindevans.github.io/YololBlazor/?state=1DCB2D0F80201405D0BFC26E868091CD44319A4C149C6F14E46E0F4DCEFFEE473AE95C88DC04011C1326A995D6AC95C5A8E44DB427A446E74CE1C121B50F0F8B25D7533AC205BEF77FB82D6665D1BC479EED1045F0F703)) I threw together recently to explore [Blazor](https://dotnet.microsoft.com/en-us/apps/aspnet/web-apps/blazor) - a system for building a web applications in C# (compiled to wasm). It's a debugger for Yolol which saves it's state in the URL so states can be linked to other people. My code-golf bot uses this for feedback - when a submitted solution fails it links out to the debugger with the state of the program encoded in the URL so it's as if you hit a breakpoint when it fails!

Blazor is a really impressive project which removes a lot of the pain of building web projects (aka having to touch JavaScript) and I will certainly be using this for future web apps.

## Raspberry Pi Pico

Early in 2021 the [Raspberry Pi Pico](https://www.raspberrypi.com/products/raspberry-pi-pico/) was released. Unlike all other raspberry Pi boards this is not a Linux computers running on a broadcom SoC - instead it's a custom designed chip (RP2040) and it's a microcontroller. This is the first time RPi have designed their own chip and I'm very excited to see where they go in the future with this - my expectation is that the RPi5 will be based on a custom SoC.

The Pico particularly caught my imagination because although it's intended as a microcontroller it has similar power to early games consoles. The Pico can overclock to 250MHz and has 264KB of RAM with 16MB of flash storage, for comparison the Sega Saturn (released 1994) has a 28.6MHz CPU and 2MB of RAM. Now of course this isn't a direct comparison - the games consoles usually had custom chips to accelerate graphics and the Pico does not. Nonetheless the similar power really caught my imagination and I started some game development work on the Pico, eventually completing a port of one of my earliest VB6 games (Toast): [PicoToast](https://github.com/martindevans/PicoToast).

I plan to develop more games for the Pico. I have a vague plan of specifying a "console" assembled out of specific parts with free 3D printable housings available which other people can develop for. A bit like a fantasy console (e.g. Pico8) but with some actual hardware!

## VBToast

Way back in 2018 I developed Toast in Visual Basic 6 - this was one of my earliest games which was genuinely fun and had other people playing it. For years I thought I had lost the source code when the hard drive in our family PC died but earlier this year I found a copy of it on an ancient backup drive! To ensure it never gets lost again, the source code is now [on GitHub](https://github.com/martindevans/VBToast) along with a [downloadable binary](https://github.com/martindevans/VBToast/releases/tag/1.0.0).

I found this immediately after finishing PicoToast, so the similar floaty movement in PicoToast is entirely from reverse engineering the precompiled VBToast version I still had a copy of.

## Saturn's Envy

This year someone from the Cylon community [ran a gamejam](https://itch.io/jam/spacecode) with the rules:
 - Set in space
 - Somehow related to programming

I created **Saturn's Envy**. This is a game in two parts:

The [simulator](https://github.com/martindevans/Yolol-SpaceShipCombatSimulator) accepts the code (written in Yolol) for two space ships, runs the battle as fast as possible and saves the results to a replay file. The [player](https://github.com/martindevans/Yolol-SpaceCombatPlayer) takes replay files and renders the battle. I integrated this into my [Yolol code Discord bot](https://github.com/martindevans/Yolol-Ladder) so players can submit fleets through Discord and query for leaderboards etc. Battles are saved on the server and can be viewed with a WebGL compiled version of the player, available [here](https://referee.cylon.xyz/fleets/player/).

This was a great project and I really enjoyed the gamejam format. It was a very slow gamejam (about a month) so it gave time for everyone to talk about their ideas and work on them without having to drop everything else for the duration of the jam. However, it was a short enough time that I had to slash off intended features every day of development just to make the deadline. I learned a lot about managing the scope of games, which is always a major problem for indie games!

## Ephemeris

With that experience in mind I have just recently (as my Christmas holiday project) started on a new game called **Ephemeris**. This is intended as a realistic space combat tactics game/simulator akin to [Children of a Dead Earth](https://store.steampowered.com/app/476530/Children_of_a_Dead_Earth/) but less janky/better graphics/multiplayer/wider range of tech etc.

# Interesting Stuff

Some other interesting things that I encountered in 2021 in no particular order:

 - [Blazor](https://dotnet.microsoft.com/en-us/apps/aspnet/web-apps/blazor)
 - [Raspberry Pi Pico](https://www.raspberrypi.com/products/raspberry-pi-pico/)
 - [LLVMSharp](https://github.com/dotnet/LLVMSharp)
 - [Ryujinx](https://github.com/Ryujinx/Ryujinx)
 - [Lunatic](https://github.com/lunatic-solutions/lunatic)