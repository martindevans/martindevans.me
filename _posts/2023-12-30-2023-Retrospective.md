---
layout: post
category : Personal
tags : [general]
tagline : In A Betrayal Occurs
---
{% include JB/setup %}

# Ephemeris

In my [last retrospective](https://martindevans.me/personal/2023/01/01/2022-Retrospective/) I talked about starting serious work on Ephemeris. Ephemeris is an orbital combat simulator game, with near future technology, attempting to be as realistic as possible.

I started off the year experimenting with an n-body integrator in Unity ECS. Eventually settling on using an [RKF45F integrator](https://maths.cnam.fr/IMG/pdf/RungeKuttaFehlbergProof.pdf) which allows the timestep to change constantly, doing the least computation required to satisfy your accuracy requirements. You can read more about the integrator in [Ephemeris Notes](https://martindevans.github.io/EphemerisNotes/ImplementationDetails/Physics/Integration/).

After that I started working on... drawing lines! This might sound trivial, but there's actually a huge amount of complexity in drawing lines and it's critically important for a game like Ephemeris which will represent almost all game state as lines and labels on those lines! These lines need to be fast (there's a lot of them), fixed width in screen space (they can't be in world space, scale is too big in space), not suffering from aliasing (it looks awful), capable of being marked (e.g. points of interest or regions of interest). I experimented with various approaches to line rendering to solve all these problems: [GPU rendering from a compute buffer](https://martindevans.github.io/EphemerisNotes/ImplementationDetails/Rendering/GPULines/), [building meshes on CPU](https://martindevans.github.io/EphemerisNotes/ImplementationDetails/Rendering/CPULines/), [signed distance fields for grids](https://martindevans.github.io/EphemerisNotes/ImplementationDetails/Rendering/LineGridRendering/) and [pure GPU pixel perfect bezier curve rendering](https://martindevans.github.io/EphemerisNotes/ImplementationDetails/Rendering/GPUBezierCurves/).

<div class="image-container" align="center">
  <img src="/assets/2023/EphemerisLineWithMarker.png" style="width:32%"/>
  <img src="/assets/2023/EphemerisLineWithMarkerCloseup.png" style="width:32%"/>
  <img src="/assets/2023/EphemerisBezierArc.png" style="width:32%" />  

  <video controls muted style="width:48%; vertical-align:middle">
    <source src="assets/2023/UnityAnimationStateMachineZegg.webm" type="video/webm" />
  </video>

  <video controls muted style="width:48%; vertical-align:middle">
    <source src="assets/2023/EphemerisJupiterTimelapse.webm" type="video/webm" />
  </video>
</div>

# Cylon Game Jam

This year we ran another [Cylon](https://discord.gg/Dcn7BG4) community gamejam. This year we all suggested a topic and then voted on them to generate a ranked list of themes. Every game **required** the top theme and could freely pick at least one other from the list:

 - 50: Exploration
 - 49: Time
 - 47: Sacrifice
 - 46: Once more, with feeling
 - 45: Navigation
 - 41: Unlikely Combinations
 - 39: Computers/Circuitry
 - 36: Don't Stop Moving
 - 15: Musical

As usual I massively overdid it and picked the top 4 themes _and also_ decided to make the game a multiplayer game! Ephemeris is a multiplayer game, so this seemed like a good opportunity to build a complete multiplayer game end-to-end.

The game is a twin stick, top down, co-operative, dungeon crawler. The twist on the co-operative dungeon crawler theme is that every time the party dies it rewinds back to the start and you respawn. At the same time _copies of yourself_ replay all of your previous runs at the same time! This means you have to co-operative _with yourself_ to solve various puzzles in the dungeon.

A game like this requires a huge amount of work creating the animation state machine, controlling movement (walk, run, dodge roll, dash), attacks (sword slash, big sword slash, sword jab, fire bow, spear jab etc), defence (shield block) and reactions (hit, big hit, stunned, death) and all of the various transitions between these states. Here's that in action:

<div class="image-container" align="center">
  <video controls muted style="max-width:50%; vertical-align:middle">
    <source src="assets/2023/UnityAnimationStateMachineZegg.webm" type="video/webm" />
  </video>
</div>

I've _never_ used the animation state machine in any of my games before. My games are usually much more like "simulations" that you can interact with, and an animation state machine is not required for that. It was great to learn this tool.

Much of the game ended up becoming driven by this state machine, player inputs would simply trigger animations and if I wanted to adjust the gameplay effect of that (e.g. make a sword slash happen a bit faster) I could just adjust the state machine. I'm sure this is how many games are made, but it's new for me!

Overall I'm very happy with how the game turned out. The concept is simple, but very fun to play with and people had a lot of fun playing the game in different ways during the demos. For example some people played it solo, some people just explored the dungeon, some people kept killing the same enemies over and over making the fight more and more of a mess, some people tried to speed run it (shortest overall length) and others tried to speed run it (shortest time from final spawn to exiting the dungeon). I think it's a great sign that people enjoyed the game enough to do all that! I think the concept could be developed into something worth selling, but this kind of game requires a lot of art assets so it's not something I'm likely to do.

**If you would like to try the game out it is available to [download here](https://github.com/martindevans/martindevans.me/releases/download/0.0.2/Zegg-Final.zip)**. If you want to play multiplayer you will have to open port 7777 on the host (it is possible to play solo, since you can always co-operate with yourself from another timeline when necessary).

By the way one of the rooms in the game will slow performance to a crawl, if you find it you'll have to start a new run since performance will be ruined on all future runs too! Gamejam quality software ;)

# Obsidian

Last year I started writing the [Ephemeris Notes](https://martindevans.github.io/EphemerisNotes/), a set of notes on all things related to Ephemeris. I found this really helpful for organising my thinking on the project, writing down scattered thoughts so they can be refined later or writing detailed articles on complex topics so that I myself can re-read them later when I've forgotten the details!

Inspired by that experience I started using [Obsidian](https://obsidian.md/) for general note taking this year. I haven't fully embraced the note taking, and in fact my use of the notes has fallen off a little recently, but it's something I'm going to keep working at in 2024.

# Placeholder Software

## Dissonance

This year we've released 4 updates for Dissonance with a number of improvements:
 - Fixed an issue with resuming audio playback after the app is suspended (e.g. put into background on a phone).
 - Many smaller fixes related to resuming from backgrounding (e.g. resetting various counters).
 - Added a new `IAudioOutputSubscriber` interface, which makes it easy to access (and modify) to the audio Dissonance is playing.
 - Fixed `Amplitude` property for the local player so it measures _after_ preprocessing (most importantly, after gain control).
 - Fixed spelling of `SubcribeToVoiceActivation`. Only took 6 years for someone to spot that!
 - Added additional metrics accessible on the server (e.g. packet loss).
 - Added an "always send" room that forces audio to be sent to the server (even if no one is listening).

## Wasmbox

Last year I mentioned that were were developing "Wasmbox", a WebAssembly runtime for Unity. Wasmbox ended up developing into a very cool project that could do lots of cool tricks. A WASM file could be imported in through the Unity asset pipeline, this import process automatically applied [Wizer](https://github.com/bytecodealliance/wizer) initialisation, [Binaryen](https://github.com/WebAssembly/binaryen) optimisations (including asyncify), Wasmtime precompilation (i.e. skipping runtime JIT cost entirely), Brotli compression and auto generated C# wrapper code.

The C# wrapper code was particularly useful, it enabled us to make sure that a loaded WASM instance is not "misused". For example a call can be made inside a job and the entire instance is unusable while the job is running (i.e. an extension of the Unity "safety system" to arbitrary WASM calls).

You might notice that this section is written in the past tense, well that's because of the Unity shaped elephant in the room...

## Unity Backstab

Back in September Unity announced a sudden and unexpected pricing change to a totally insane pricing structure based on installs. Everyone in the games industry hated this fee structure and the backlash was incredible to watch. 10 days later [they announced a complete replacement](https://blog.unity.com/news/open-letter-on-runtime-fee) of this install fee with a new policy which is much more reasonable. This was a total disaster for Unity, and we still haven't seen all of the fallout from this decision.

At Placeholder Software we decided to rollback on developing new products (such as Wasmbox, which we have deprecated) and instead to transition to just supporting our existing projects (Dissonance is **not** going anywhere). This is because if they can decide to just roll out totally insane policies like the runtime fee overnight then Unity no longer seems like a safe foundation to build assets and games on.

Of course this has left me with a big decision to make: do I trust Unity long term and keep developing with Unity (which I do consider to be a good engine)? Or do I migrate to another engine and start learning from scratch again?

At the time this was happening I looked around and found three potential candidate to replace Unity:
 - [Godot](https://godotengine.org/)
 - [Stride3D](https://www.stride3d.net/)
 - [FLAX](https://flaxengine.com/features/)

As of right now I have not decided which engine to use, or if I should stick with Unity. However, what **is** clear is that I can't learn a new engine by working on a project of such complexity as Ephemeris! This has directly led to me starting a new game...

# Protologic

Back in 2021 my entry for the Cylon gamejam was [Saturn's Envy](https://martindevans.me/personal/2021/12/30/2021-Retrospective/#saturns-envy). This was a programming where you you used Yolol (the language which Cylon is all about) to program space battleships. When you had a program you could submit it to a Discord bot which would schedule battles and maintain a leaderboard of ships. This was pretty fun, and quite a few people submitted fleets, but it was always held back by the fact that Yolol is a _terrible_ language and no one wants to build large complex software in it!

Protologic re-imagines this idea, the ships now run WASM. That means that the ships can use any language which compiles to WASM, of which [there are many](https://github.com/appcypher/awesome-wasm-langs)! If you're interested in this the Protologic bot is currently available in [Cylon](https://discord.gg/Dcn7BG4), and the battle replays are available to watch online [here](https://referee.cylon.xyz/protologic/player/).

This is a great project to learn new engines because the sim (running battles & generating replay files) is completely decoupled from the front end (loads replay files and displays them in a game engine). This means I can build a completely new "front end" in another engine without having to worry about the complexity of re-implementing all of the game logic. [The current frontend](https://referee.cylon.xyz/protologic/player/) is written in Unity (adapted directly from the gamejam submission) and I plan to write new frontends in Godot and Stride.

# Open Source Projects

### Wazzy

[Wazzy](https://github.com/martindevans/Wazzy) is an implementation of the [WASI spec](https://wasi.dev/) (WebAssembly System Interface). It is written in pure C# and is designed to be easily extensible with custom implementations of parts of the spec. This was originally part of Wasmbox, but it seemed a shame to let it die, so I've extracted out everything except for the filesystem implementation into this open source project. This is in active use in Protologic.

### Autofocus

[Autofocus](https://github.com/martindevans/Autofocus) is a C# API client for the [AUTOMATIC1111 API](https://github.com/AUTOMATIC1111/stable-diffusion-webui). It attempts to model the API in a type-safe way, preventing possible user errors. This is in active use in *Mute (my Discord bot).

### LLamaSharp

[LLamaSharp](https://github.com/SciSharp/LLamaSharp) is a C# wrapper around [llama.cpp](https://github.com/ggerganov/llama.cpp). This is **not** my project! Back in July I tried to use LLamaSharp in *Mute but I quickly encountered some errors and submitted some PRs to fix them. [295 commits later](https://github.com/SciSharp/LLamaSharp/commits?author=martindevans) and I've become one of the lead developers on LLamaSharp!

# Interesting Stuff

Some other interesting things that I encountered in 2023 in no particular order:

 - [PicoVision](https://shop.pimoroni.com/products/picovision)
 - [WASM Languages List](https://github.com/appcypher/awesome-wasm-langs)
 - [Banner of the Stars](https://en.wikipedia.org/wiki/Banner_of_the_Stars) (anime)
 - [ChatGPT](https://chat.openai.com/)
 - [Obsidian](https://obsidian.md/)
 - [Stride3D](https://www.stride3d.net/)
 - [Gaussian Splatting](https://github.com/aras-p/UnityGaussianSplatting)
 - [rustc_codegen_clr](https://github.com/FractalFir/rustc_codegen_clr)
 - [interoptopus](https://github.com/ralfbiedert/interoptopus)