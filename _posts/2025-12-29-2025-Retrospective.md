---
layout: post
category : Personal
tags : [general]
tagline : In Which Games Are Renamed
---
{% include JB/setup %}

# More Of The Same

In my [last retrospective](https://martindevans.me/personal/2024/12/28/2024-Retrospective/) I talked about developing Ephemeris and learning Blender, those have continued to be the dominant themes for 2025 too.

# ~~Ephemeris~~ Kessler: Orbital Warfare

~~Ephemeris~~ **Kessler: Orbital Warfare** is a realistic simulation of near-future space combat. If this sounds like something you'd be interested in playing, come and chat with us on [Discord](https://discord.gg/nnY3tPwpuV)!

I've been calling this idea "Ephemeris" for years, this was only ever a working title and it was always my intention to come up with a new name eventually. Unfortunately another game named Ephemeris was released this year and that forced me to come up with something. I've settled on **Kessler: Orbital Warfare**.

I have been keeping daily notes on progress since mid 2024, and I intend to keep doing this. You can find the 2025 notes [here](https://martindevans.github.io/EphemerisNotes/category/2025/). Personally I've found taking notes like this has three primary benefits, in order of importance:

1. On days when I'm feeling like I haven't achieved much I can look at the huge list of work achieved recently and realise that I am actually making good progress. This **really* helps with motivation.
2. Since I write down _everything_ that I do, I have become much more aware of what work is involved in a project. This really helps me estimate the scope of work in advance, and correctly estimate how long it will take.
3. When working on a system that I haven't touched for a while, all of the notes are still there. For me this is the last important point because my notes aren't well structured as documentation, and I _very_ heavily comment my code so that's usually a better reference.
4. It makes writing the next section of this post is much easier!

## 2025 Progress

I've made some great progress in 2025, each of these items probably represents around 2 weeks work with many smaller items getting done along the way:
 - Selected multiplayer framework (Mirror)
 - Multiplayer lobby system
 - Multiplayer entity management (spawning/destruction)
 - Orbital data sync over the network
 - Multiplayer time control
 - UI development (building core UI code)
 - Physics sim for thermals
 - Tactical view
 - Core systems simulating sensors
 - AESA RADAR sensor, using this system
 - Bullet simulation (capable of simulating tens of thousands of bullets)
 - Bullet rendering
 - Core systems for collision detection (Octree, Sweep & Prune)
 - Multiplayer sync for bullets
 - Deep research on armour damage models
 - Built armour designer minigame (IMPACT). More on this below.
 - Clicking on orbits
 - Core systems for HUD
 - Engine burn gizmo (like the KSP manoeuvre node gizmo)
 - Scheduling engine burns using gizmo

Overall I'm incredibly happy with progress in 2025! For years I have been working on building out a lot of bits of technology that I knew I would need for a realistic space game; full scale solar system simulation, rendering of planets, n-body orbital integration, rendering lines etc. This year it feels like that has changed - many of the features I listed above were building on top of that core tech, it feels like I'm finally building a **game** instead of a **space-game-engine**. I think that trend is going to continue in 2026, lots of plumbing together existing features into a game.

## 2026 Goals

My major milestone goal for this year is to release an alpha version of the game with basic multiplayer orbital combat in **the first half of 2026**. If you're interested in playing that alpha, join us on [Discord](https://discord.gg/nnY3tPwpuV)!

# IMPACT Minigame

In previous years I've taken part in the CYLON gamejam and I've built some games I'm really proud of (see my [games](/games) list). Unfortunately the CYLON community was based around a game called STARBASE which has died, and CYLON has died with it. I decided to work on a minigame for a month instead.

**IMPACT** (**I**mpact **M**odelling **P**rogram for **A**rmor **C**onfiguration **T**esting) is a spacecraft armour design and test program, styled as an alt-history 1970's joint DoD/NASA program to develop armour for orbital warships. the game is available to [download for free here](https://github.com/martindevans/IMPACT). Join us on [Discord](https://discord.gg/nnY3tPwpuV) to show off your designs!

This is based on the research I did into the physics of hypervelocity impacts in September and uses the damage model I have developed for Kessler.

<div class="image-container" align="center">
  <img src="/assets/2025/IMPACT/IMPACT1.jpg" style="width:49%"/>
  <img src="/assets/2025/IMPACT/IMPACT2.jpg" style="width:49%"/>

  <img src="/assets/2025/IMPACT/IMPACT3.jpg" style="width:49%"/>
  <img src="/assets/2025/IMPACT/IMPACT4.jpg" style="width:49%"/>
</div>

# Blender

In mid 2024 I started learning Blender, and in 2025 it's become a really major thing for me. I've learned a lot, and I'm starting to feel like I could actually build game-ready assets at a usable quality level!

<div class="image-container" align="center">
  <img src="/assets/2025/Blender/Basroil1.jpg" style="width:49%"/>
  <img src="/assets/2025/Blender/Basroil2-002.png" style="width:49%"/>
</div>

<div class="image-container" align="center">
  <img src="/assets/2025/Blender/Basroil2-003.png" style="width:33%"/>
  <img src="/assets/2025/Blender/Basroil2-004.png" style="width:33%"/>
  <img src="/assets/2025/Blender/Basroil2-005.png" style="width:33%"/>
</div>

<div class="image-container" align="center">
  <img src="/assets/2025/Blender/Supersaturn1.jpg" style="width:49%"/>
  <img src="/assets/2025/Blender/Supersaturn2.jpg" style="width:49%"/>
</div>

<div class="image-container" align="center">
  <img src="/assets/2025/Blender/Supersaturn3.jpg" style="width:49%"/>
  <img src="/assets/2025/Blender/Supersaturn4.jpg" style="width:49%"/>
</div>

<div class="image-container" align="center">
  <img src="/assets/2025/Blender/ClothesCharacter1.png" style="width:33%"/>
  <img src="/assets/2025/Blender/ClothesCharacter4.png" style="width:33%"/>
  <img src="/assets/2025/Blender/ClothesCharacter3.png" style="width:33%"/>
</div>

<div class="image-container" align="center">
  <img src="/assets/2025/Blender/ClothesCharacter2.png" style="width:49%"/>
  <img src="/assets/2025/Blender/ClothesCharacter5.png" style="width:49%"/>
</div>

<div class="image-container" align="center">
  <img src="/assets/2025/Blender/BannerInterior1.png" style="width:33%"/>
  <img src="/assets/2025/Blender/BannerLandingShip1.png" style="width:33%"/>
  <img src="/assets/2025/Blender/BannerLandingShip2.jpg" style="width:33%"/>
</div>

<div class="image-container" align="center">
  <img src="/assets/2025/Blender/BeamSaber1.png" style="width:49%"/>
  <img src="/assets/2025/Blender/SparrowDagger1.png" style="width:49%"/>
</div>

<div class="image-container" align="center">
  <img src="/assets/2025/Blender/SparrowDagger2.jpg" style="width:49%"/>
  <img src="/assets/2025/Blender/NotConcorde1.png" style="width:49%"/>
</div>

<div class="image-container" align="center">
  <img src="/assets/2025/Blender/HarperDagger1.png" style="width:49%"/>
  <img src="/assets/2025/Blender/HarperDagger2.png" style="width:49%"/>
</div>

<div class="image-container" align="center">
  <img src="/assets/2025/Blender/BigSearchRadar1.png" style="width:49%"/>
  <img src="/assets/2025/Blender/OrbitalAttackShip1.jpg" style="width:49%"/>
</div>

<div class="image-container" align="center">
  <img src="/assets/2025/Blender/BuildingCube1.png" style="width:33%"/>
  <img src="/assets/2025/Blender/BuildingSteps1.png" style="width:33%"/>
  <img src="/assets/2025/Blender/Konbini1.png" style="width:33%"/>
</div>

# Open Source Software

## Myriad.ECS

[**Myriad.ECS**](https://github.com/martindevans/Myriad.ECS) is a high performance ECS built in C#. I use Myriad in Kessler, so it's used every day and has a lot of useful features that I've discovered the need for.

### Changes in 2025
 - Lots of optimisations for speed and memory usage
 - `Disposable` components receive a callback when an entity is destroyed
 - Hierarchical transform system
 - Various internal optimisations for systems that walk entity relationships (like a hierarchy)
 - Delegates support in map/reduce queries
 - Queries which collect results into a collection
 - `PhantomNotifier` components receive a callback when entity becomes a phantom
 - Resumable queries with cursors
 - `HasComponent` overloads for checking multiple components all at once
 - Overloads for delegate queries that take no type params (filtered entirely by `QueryDescription`)
 - Delegate chunk queries
 - Added ability to enable/disable system groups
 - Unsafe accessors for entities/components in chunks (useful for integrating with Unity job system)
 - Delayed entity resolving from `CommandBuffer` (add entities to a list when the buffer is eventually executed)
 - Tests, tests and more tests. I find it fun to drive up test coverage!
 - Global chunk/archetype IDs
 - Job safety system (basically per archetype locking). Designed to integrate with the Unity safety system.

## LLamaSharp

[**LLamaSharp**](https://github.com/SciSharp/LLamaSharp) is a C# wrapper around [llama.cpp](https://github.com/ggerganov/llama.cpp). This is **not** my project alone, but I became one of the lead maintainers in 2023 and I've continued working on it this year.

## Fox4

[**Fox4**](https://github.com/martindevans/Fox4) is an experimental AI pilot for VTOL VR, built on the [AI Pilot](https://github.com/Strikeeaglechase/AIPilot) framework built by [Strikeeaglechase](https://github.com/Strikeeaglechase). Fox4 was intended as a project to learn about reinforcement learning - the core idea was to learn air combat through self-play, in the same way as AlphaGo learned Go to a superhuman level. The pilot part is built in C#, that collects data logs and the Python part learns from those logs. Unfortunately I wasn't able to train the pilots to maintain level flight, even with a lot of rewards tweaks. I'd like to come back to learning about RL sometime (maybe through this project, maybe through something else).

## HandySerialization

[**HandySerialization**](https://github.com/martindevans/HandySerialization) is a binary serialization library I have developed for use in game networking, it provides precise control over byte-level and bit-level packing of data.

I did a lot of work for this in April when I was developing the encoding scheme for orbital data, the final result is a general purpose lossless predictive encoder for sequences of doubles, which can compress orbital data down to about 33% of it's original size! No doubt next time I work on anything with multiplayer this library will see more features added.

## Wasm2cs

[Wasm2cs](https://github.com/martindevans/Wasm2cs) is a compiler from WASM to C# code.

This isn't a serious project that I'm using for anything, but it's a cool idea so I wanted to share it. Imagine if you could take a native C++ dependency, compile it to WASM and then import that into a C# project as plain old C# code. No native dependencies, no WASM engine dependency. I think this idea came about when I read about [WasmBoxC](https://kripken.github.io/blog/wasm/2020/07/27/wasmboxc.html) which is a system for sandboxing bits of C code by compiling `C -> WASM -> C`. The final code is just normal C code you can use, but it's sandboxed!

The end result of `wasm2cs` works for a simple program that writes `"Hello World"` to the terminal, but I never managed to get it working for more complex programs like the asyncified Python runtime for [Serpent](https://github.com/martindevans/Serpent).

# Interesting Stuff

Some other interesting things that I encountered in 2025 in no particular order:
 - [VRChat](https://hello.vrchat.com/)
 - [Bigscreen Beyond 2](https://store.bigscreenvr.com/en-gb/products/bigscreen-beyond-2)
 - [Banner of the Stars](https://en.wikipedia.org/wiki/Banner_of_the_Stars)
   - I've seen it before, but I rewatched the anime and reread all of the Manga this year. A couple of my Blender projects have been BotS ships.
 - [Anime Cels for sale](https://www.animanga.com/db/cels/)
 - [Realsense D421](https://www.realsenseai.com/products/stereo-depth-camera-module-d421/)
   - Traditionally 3D cameras are very expensive, but this one is just £75!
 - VTubers
   - While watching tutorial videos on Blender for how to build a VRChat avatar I came across [this video](https://www.youtube.com/watch?v=VmwW47UWO60). That sucked me into the world of VTubers!
   - Some favourites:
     - [Smellizabeth](https://www.twitch.tv/smellizabeth), currently rebranding to [Aeri Andromeda](https://www.twitch.tv/aeriandromeda). Gaming, Blender, art.
     - [Pikat](https://www.twitch.tv/pikat). Art, gaming.
     - [Ellie_Minibot](https://www.twitch.tv/ellie_minibot). Robotics engineer with an interest in AI.
     - [Vedal987](https://www.twitch.tv/vedal987). Develops the AI Vtuber Neuro-sama, fascinating AI project!
     - [Ironmouse](https://www.twitch.tv/ironmouse). Obviously.
