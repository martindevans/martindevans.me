---
layout: post
category : Personal
tags : [general]
tagline : In Which A Plague Subsides
---
{% include JB/setup %}

# TL;DR

Started working seriously on a new game: Ephemeris.

# What Did I Do In 2021?

In my [last retrospective](https://martindevans.me/personal/2021/12/30/2021-Retrospective/) I talked about a major redesign of Overcrowded and mentioned starting on a side project (over Christmas) named _Ephemeris_.

# Placeholder Software

## Dissonance Voice Chat

This year we've released 7 updates for Dissonance with a number of improvements:
 - Added a new audio synchronisation system which detects extreme packet loss and briefly interrupts audio playback to fully reset the system.
 - Added a brand new way to do positional audio, based on spatial hashes. This does not scale cost with the numbers of listeners, so it can handle huge crowds.
 - Fixed some strange MacOS bugs to do with marshalling between C++ and C# components. It seems like Unity used to do it technically wrong and we relied on the old but wrong behaviour, so when they fixed it we ended up with a regression.
 - Added x86_64 support for Android (this used to be for emulators only, but it seems like some Chromebooks are now x86_64).
 - Added a way for server side scripts to intercept raw audio packets. We used this to integrate with [Toxmod](https://www.modulate.ai/tox-mod) for a client.
 - Implemented a new way to subscribe to the raw audio stream from the Dissonance microphone.
 - Added Magic Leap 2 support.
 - Added Apple M1 support.
 - Vastly improved audio quality of RNNoise.
 - Added an "offline comms network" which makes Dissonance _think_ it's in a chat session even when there's no network.
 - Two major new integrations: [FMOD Recording](https://assetstore.unity.com/packages/tools/integration/dissonance-for-fmod-recording-213412?aid=1100lJDF) and [FMOD Playback](https://assetstore.unity.com/packages/tools/integration/dissonance-for-fmod-playback-213415?aid=1100lJDF)

### New Audio Subscriber

This is an interesting feature not because of what it is, but rather due to the motivations behind it and the lessons learned. Ever since release Dissonance has had a way to subscribe to the raw audio that the Dissonance microphone is recording, some people have used this to show a frequency spectrum as you speak, or to record everything you say to a file.

This subscriber system was always built to be high performance and not particularly easy to use - all the audio is delivered on a background thread (the audio recording thread) which must not be blocked for a long period of time (e.g. doing IO). The documentation explained this and included a very quick-n-dirty script to show how you could transfer audio across to the main thread. We didn't expect anyone to actually use this script, it was just an example and not something suitable for real world use.

Inevitably every time someone contacted me asking for support about this feature their code would include a copy of the example code, adapted to their use case. I'm definitely not blaming the users here - in fact copying examples from the documentation and adapting them is the _right way to do things_ if you're unfamiliar with a system! This one was totally on us not understanding that **example code should always be production quality**!

### Toxmod

[Toxmod](https://www.modulate.ai/tox-mod) is an automatic content moderation system for voice. It monitors realtime voice streams and flags potential bad behaviour for moderators to review, acting as a filter to cut out the 99% of content which isn't a problem. When moderating voice this is critically important!

Unfortunately this isn't available as a plugin for Dissonance since it was developed for a client. But I would encourage anyone else who is serious about moderating voice chat in games to consider Toxmod.

## Overcrowded

For the last two years I've talked about the struggle to release "Overcrowded", our asset for steering behaviours and local avoidance. If you check the [Placeholder Software store page](https://assetstore.unity.com/publishers/23373?aid=1100lJDF) you'll see that it has _still_ not released!

As I said last year we had to initiate a total rewrite of the asset due to Unity announcing that ECS would not be available on some versions of Unity 2021. With hindsight this was a mistake because in the time it has taken us to do that rewrite ECS has become fully stabilised and released version 1.0 - we should have just waited. Eventually in mid 2022 we decided to put the project on hold, both of us were getting pretty burned out with the project and initiating _another_ rewrite back to the new `ECS 1.0` was definitely not feasible.

We _may_ revisit the project next year, possibly releasing something _much_ smaller than originally planned as a first step in releasing several smaller assets which work together to provide the complete Overcrowded feature set we had originally planned.

## WasmBox

Our next project after Overcrowded is a total change of direction: we're developing a WebAssembly (WASM) integration for Unity. This is based on [wasmtime-dotnet](https://github.com/bytecodealliance/wasmtime-dotnet) and extends it with a number of features such as safe job system support, precompiling WASM at build time etc. We'll be releasing this very soon, feel free to contact me (martin@placeholder-software.co.uk) if this is something you'd be interested in testing out.

# Blogging

As you've probably noticed I wrote no new blog posts in 2022, sorry about that. However, I have recently started a new project that's a bit like a blog: [Ephemeris Notes](https://martindevans.github.io/EphemerisNotes/). These are my notes created during the development of Ephemeris on all sorts of relevant topics: games, films, TV, rocketry, weaponry, integrators, floating point accuracy etc. I'm actively adding new content to this all of the time and some of what I write is like a mini article/blog post explaining something to myself. For example [this article](https://martindevans.github.io/EphemerisNotes/ImplementationDetails/PrecisionScale/) about floating point precision where I explore the benefits of using different unit scales.

# Ephemeris

Ephemeris is a game project that I have been working on as a side project all year. Ephemeris is intended to be a realistic space combat tactics simulator akin to [Children Of A Dead Earth](https://store.steampowered.com/app/476530/Children_of_a_Dead_Earth/). As mentioned above I'm writing [development notes](https://martindevans.github.io/EphemerisNotes/) on the project, so if this sounds like the kind of game you'd be interested in check those out and maybe [join the Discord](https://discord.gg/c7VTX5C4tq).

I worked on one version of the project on and off throughout the year, using an asset store package called [Gravity Engine](https://assetstore.unity.com/packages/tools/game-toolkits/gravity-engine-62432?aid=1100lJDF) to drive the core simulation and [Space Graphics Toolkit](https://assetstore.unity.com/packages/tools/level-design/space-graphics-toolkit-4160?aid=1100lJDF) for most of the graphics. I made some really great progress, putting together a realistic map of the entire solar system with full support for modding in new bodies all driven with an on-rails simulation for the planets and an n-body simulation for the spacecraft.

<div class="image-container" align="center">
  <img src="/assets/2022/Unity_2022-01-02_01-58-38.png" style="max-width:20%"/>
  <img src="/assets/2022/Unity_2022-09-22_03-19-32.png" style="max-width:20%" />
  <video controls muted style="max-width:20%; vertical-align:middle">
    <source src="/assets/2022/Unity_2022-01-09_02-18-44.webm" type="video/webm">
  </video>
  <video controls muted style="max-width:20%; vertical-align:middle">
    <source src="/assets/2022/Unity_2022-04-13_02-32-22.webm" type="video/webm">
  </video>
</div>

This was as much a research/learning project as much as it was a serious attempt to make a game. One of the things I learned it that while Gravity Engine is pretty good it really doesn't fit with how I want things to work - I really want a fully deterministic simulation which runs in the Unity ECS for maximum performance.

As an experiment just before Christmas 2022 I started on a project to write my own gravity system in ECS, just to see how hard it would be. When I started I honestly wasn't sure if I was going to use it, in fact I expected to discover that it was all vastly more difficult than I expected and to return to using Gravity Engine. Instead I've written a hybrid N-Body simulator (all gravity sources such as planets and moons are on rails, all space craft are n-body simulated) which spreads the load across all cores and has a variable timestep to reduce the amount of work necessary. I'm very happy with this and I'm going to be moving across all of the work I did previously to this new project.

<div class="image-container" align="center">
  <img src="/assets/2022/Unity_2022-12-16_16-23-49.png" style="max-width:50%"/>
</div>

This has given a new lease of life to the project - I can now see a path to a high performance multiplayer orbital combat simulation which would never have been possible with Gravity Engine. I'm excited to get working on this in the new year!

# Save The Spire

This year we ran another [Cylon](https://discord.gg/Dcn7BG4) community gamejam. This year we all suggested a topic and then voted on them to generate a ranked list of themes, this left us with an extremely opened ended theme:

 1: Magic
 2: Factory
 3: Space
 4: Indirect Unit Control
 5: Zachlike
 6: Multiplayer
 7: Princess Of Mars
 8: Yolol
 9: Completely html/CSS/JavaScript game

This year I decided to do a very weird project that I didn't really expect to work very well as a game. For me that's the great thing about a gamejam - I can build something weird and wonderful to explore a new bit of game design without having to commit to it or really have any expectations of it.

The game is called "Save The Spire". You discover a huge magical (1) structure floating through the sky (3) which appears to be some kind of arcane (1) factory (2). There are some units standing on the structure which you cannot directly control (4), instead you can place down new walkways (which the units will walk over to and build). There are various clues hidden around the factory as to how it works and it's your job to piece them together and restore the factory to working order.

**[You can download it to try it out here](https://github.com/martindevans/martindevans.me/releases/download/0.0.1/SaveTheSpire.zip)**.

As a game this didn't really work (and that's fine!). I think with some more careful game design and art direction it could maybe be made to work. There were a few common complaints from all the players:
 1. The start of the game gives no direction at all. The game is _meant_ be to mysterious and encourage you to explore, but it's a bit _too_ mysterious at the moment.
 2. Golem spawner (little block with a floating Darwinian in it) looks identical to a golem (a normal Darwinian) so it's unclear it's something special.
 3. It's a bit repetitive. There are multiple elements that need connecting up and they are all a bit different, but not enough. I simply didn't have enough time to create more variations.
 4. It's too simple. Once you have worked out that connecting things together makes things happen you can win by just connecting everything to everything. There's never a reason _not_ to connect two things!

Overall I have to say I'm quite happy with this feedback. Everyone agreed the core of the game is something unusual and interesting. The negative feedback is mostly stuff I had anticipated - it just needed a lot more tweaking and maybe one more major mechanic to being it all together (which I didn't have time to do in a jam).

# Projects

## Margarine

This is a **3D** game for the [PicoSystem](https://shop.pimoroni.com/products/picosystem?variant=32369546985555) - and RP2040 based handheld console. It uses a Wolfenstein style raycast renderer to draw 3D (ish) environments. Even at the low resolution of the PicoSystem (240x240) it's driving the RP2040 CPU as hard as possible to manage this!

## SolarBlaze

This year we had a solar system installed (panels and battery). The inverter is obviously a computer system capable of monitoring the system, recording statistics, reporting them back to the manufacturer etc but we're completely locked out of it! Instead the only way we can monitor the system is to use the app which is provided - that can't be used on PC, has no option to export the data and is generally quite rubbish.

Fortunately someone has built a project called [LXP bridge](https://github.com/celsworth/lxp-bridge) which interprets the inverter messages and logs them to an MQTT endpoint in a useful format. I've used this to build [SolarBlaze](https://github.com/martindevans/SolarBlaze), which is a Blazor based front end to monitor the data. It's quite rough at the moment, but once the sun is shining again I'll get back to working on this and will consider publishing it as a project anyone can use (with proper setup instructions etc).

# Interesting Stuff

Some other interesting things that I encountered in 2022 in no particular order:

 - [Blazor](https://dotnet.microsoft.com/en-us/apps/aspnet/web-apps/blazor)
 - [Raspberry Pi Pico](https://www.raspberrypi.com/products/raspberry-pi-pico/)
 - [r/cyberdeck](https://www.reddit.com/r/cyberDeck/)
 - [PicoSystem](https://shop.pimoroni.com/products/picosystem?variant=32369546985555)
 - [WASI](https://wasi.dev/)
 - [Inochi 2D](https://github.com/Inochi2D/inochi2d)
 - [Docusaurus](https://github.com/facebook/docusaurus)
 - [Catalyst](https://github.com/curiosity-ai/catalyst)
 - [BFlat](https://github.com/bflattened/bflat)
 - [MOOS](https://github.com/nifanfa/MOOS)
 - [Castlevania](https://en.wikipedia.org/wiki/Castlevania_(TV_series))
 - [Spotify](https://open.spotify.com/)