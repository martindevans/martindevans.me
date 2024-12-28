---
layout: post
category : Personal
tags : [general]
tagline : In Which Games Are Built
---
{% include JB/setup %}

# Sticking With Unity

In my [last retrospective](https://martindevans.me/personal/2023/12/30/2023-Retrospective/) I talked about the big Unity backstab and how I was considering moving away from Unity as my primary game engine. Fortunately Unity recovered form this pretty rapidly and they seem to be on a much better course now, so I have decided to stick with Unity.

# Ephemeris

Ephemeris is a simulator of near-future realistic space combat. If this sounds like something you'd be interested in playing, come and chat with us on [Discord](https://discord.gg/nnY3tPwpuV)!

In 2022 Ephemeris was really just a series of vaguely related side projects. I was playing with things like accurate integrators and rendering of astronomical scale scenes in Unity. In 2023 this became a bit more serious, I was still working on Placeholder Software as my main job, but I was more seriously experimenting with Ephemeris related things to see if it was feasible. In 2024 Ephemeris has become my full time, bringing together a lot of those prototypes into one coherent project.

I have been keeping daily notes on progress since June this year, and I intend to keep doing this. Now that I've been doing it for a few months it's hard to imagine _not_ keeping notes like this! You can find the 2024 notes [here](https://martindevans.github.io/EphemerisNotes/category/2024/). So what did I work on every month?

### June

One major aspect of Ephemeris is multiplayer. In May and June I experimented with a custom networking system called [`HandyNetworking`](https://github.com/martindevans/HandyNetworking/tree/master). This was intended as a flexible front-end which could be plugged into different backends (e.g. LiteNetLib, SteamNetworkingSockets, Epic Online Services etc). I didn't really like the end result of this experiment and I scrapped it, multiplayer is something I'll come back to look at later (in Novemeber 2024).

### July

In July I did a lot of work setting up the scene framework in Unity. Working out what layers I need for various things - for example very large things like planets and very small things like spacecraft are on different layers and are composited together to appear as if they're in the same shot. This also involved building a manager for the camera system, which handles switching modes from looking at large things (planets) to looking at small things (spaceships).

I also ported across an old experiment for rendering symbols, using instanced rendering to draw thousands of symbols together. This will be used a lot in Ephemeris - showing all of the other things in space such as ships and missiles. In fact a game like this is almost entirely about symbols on the map!

### August

In the previous months I had been experimenting with a FUI (Futuristic User Interface) framework to use in Ephemeris. In August I started developing a small game, using this framework for the HUD. This game was a docking simulator, where you have control of a pod in space and must dock with a nearby space station.

This ended up being a great project - it helped development of the FUI framework as I had to polish bits to make them usable and develop entirely new UI controls as needed for the game. Additionally I play tested the game with some friends and learned a lot about UI design by paying careful attention to how they used the UI, what bits they missed, and what things they misunderstood.

My initial prototype just used the built in Unity physics but ideally I want something separate from Unity for the main game, so I also investigated various other C# physics engines. [BEPU](https://github.com/bepu/bepuphysics2) would be my preferred choice, but it's not compatible with the runtime version available in Unity. [Jitter2](https://github.com/notgiven688/jitterphysics2) has the same problem, but if we go all the way back to Jitter1 there is a [C# port to netstandard2.1](https://www.nuget.org/packages/Jitter.Core#readme-body-tab). The code of this port is _very_ messy, so I started refactoring this, removing unneeded features and cleaning up the code (e.g. using .NET vectors instead of a custom vector type).

### September

For most of September I was participating in the 4 week long Cylon Gamejam. See `Cylon Game Jam` for details on the game I built. Once I got back to working on Ephemeris at the end of the month I resumed the Jitter refactoring and experimented with some ideas for thruster control (determining which thrusters to fire for a target movement/rotation).

### October

Given how much I felt that I learned about UI design and play-testing from the docking simulator game in August, I decided to build another docking sim minigame. This time inside of the main Ephemeris project using all of the technology I have developed for the game - this means the pod and the station would be on true n-body orbits, the entire solar system would be in the sim, there would be properly sized planets visible in the background etc. This would be a good way to do a "shakedown test" on all of these components I have built.

A big part of this turned out to be about improving precision. The Ephemeris simulation uses a variable timestep for the n-body simulation - timesteps can be as small as 100ms or as large as 10 **minutes**. Of course rendering needs to show something once every 16.6ms (60 FPS), there is an interpolation system that takes the nearest two points from the integrator and calculates the current position. Due to the absolutely _enormous_ speeds and positions involved (e.g. 30,000m/s at 149,597,870,700m from the Sun) a tiny percentage error in this interpolation can result in huge absolute errors. Normally this isn't a problem, but if you have 2 bodies orbiting near each other - for example during docking - those errors can cause the two bodies to oscillate back and forth.

At the start I was using a quadratic bezier interpolation with positional oscillations of about 500m (approximately 1.5% error relative to the velocity). I developed a new "kinematic interpolation" system which assumes constant jerk (change in acceleration) which pushes that error down to about 0.1m, which is about 0.0003% error!

Another source of error is engine burns - when a burn is created at short notice the points being interpolated can suddenly change during interpolation. Rather than a smooth wobble this causes a sudden jerk. Improving the magnitude of the wobble reduced the jerkiness but did not entirely eliminate it, so I added another system which detects this jerk and basically smooths it out over multiple frames.

### November

If October was all about deep technical work for the docking sim minigame, November was the opposite. I spent all of this month working on high level things like menu UI, HUD UI, sound effects, visuals, settings management, scene management etc. This work was slow going, but I learned a lot and all of these things are of course necessary for the full game!

### December

I started another prototype for multiplayer, this time using [Mirror](https://mirror-networking.com/) instead of my own framework. Mirror is more tied to GameObjects than I would like and this isn't a perfect fit for Ephemeris (which uses my own ECS), but it's a much more robust system which I've already used for multiple games in the past.

### The Future

In 2035 I'll continue working on Ephemeris, with the aim of getting an early-access prototype out to some players. If you're interested in that, join us on [Discord](https://discord.gg/nnY3tPwpuV)!

# Cylon Game Jam

This year we ran another [Cylon](https://discord.gg/Dcn7BG4) community gamejam. This year we all suggested a topic and then voted on them to generate a ranked list of themes. Every game **required** the top theme and could freely pick at least one other from the list:

- Running Out Of Space (**Required**)
- Asymmetry
- The Space Race
- Light
- Outer Space
- Primitive Primitives
- Reveal
- Switch Off
- Stringa Superstes
- Paper
- Car Alarms
- No way back

Each year we do one of these jams I set myself a personal goal that I consider _almost_ impossible to achieve, to really push myself. My game this year was a pretty unique idea that I've never seen done before - a battle royale real time strategy game! Players all start off on a plane and drop into the map wherever they want, there are various pickups scattered around the map which they fight over, the map slowly shrinks and the last person alive is the winner.

A lot of my previous gamejam games have been playable and fun, but things like menus were very lacking. One thing I really wanted to get right this year was to fix that and have a great game-feel all the way through. I picked a style I like - a pixel art retro-style inspired by Command & Conquer - and really worked hard to make the whole game fit that artistic direction. For example the menu was something I kept coming back to and tweaking - it's the first thing anyone will see about the game and making it look professional goes a long way to setting expectations!

<div class="image-container" align="center">
  <img src="/assets/2024/ECOM/Menu.png" style="width:99%"/>

  <video controls muted style="width:48%; vertical-align:middle">
    <source src="/assets/2024/ECOM/Map.webm" type="video/webm" />
  </video>

  <video controls muted style="width:48%; vertical-align:middle">
    <source src="/assets/2024/ECOM/Menu.webm" type="video/webm" />
  </video> 
</div>

Overall I'm very happy with how the game turned out. It's a genuinely fun game and as far as I'm aware is a fairly fresh take on real-time strategy. Obviously there's more that could be done to develop the game - I really wanted to add more unit types - but as a 3 week gamejam entry I think it's a great success.

**If you would like to try the game out it is available to [download here](https://github.com/martindevans/martindevans.me/releases/download/0.0.3/ECOM.zip)**. If you want to play multiplayer you will have to open port 7777 on the host.

# Blender

One of the problems I have always had with my games is art. I'm capable of building the technical parts of a game, but I can't really make my own art, so I always have to use a very basic art style with pre-existing assets I can purchase. I decided to start on the path to solving this problem by learning blender. Obviously I don't really expect to be able to make all of my own assets - that requires real artistic skill that takes years to develop - but if I ever want that I'd better get started now! I've made a lot of practice pieces this year:

<div class="image-container" align="center">
  <img src="/assets/2024/blender/raptor1.png" style="width:49%"/>
  <img src="/assets/2024/blender/raptor2.png" style="width:49%"/>

  <img src="/assets/2024/blender/arasaka1.jpg" style="width:32%"/>
  <img src="/assets/2024/blender/arasaka2.jpg" style="width:32%"/>
  <img src="/assets/2024/blender/arasaka3.jpg" style="width:32%"/>

  <img src="/assets/2024/blender/headset1.jpg" style="width:32%"/>
  <img src="/assets/2024/blender/headset2.png" style="width:32%"/>
  <img src="/assets/2024/blender/headset3.jpg" style="width:32%"/>

  <img src="/assets/2024/blender/triplechii1.png" style="width:99%"/>

  <img src="/assets/2024/blender/goggles1.png" style="width:49%"/>
  <img src="/assets/2024/blender/goggles2.png" style="width:49%"/>

  <img src="/assets/2024/blender/leg1.png" style="width:32%"/>
  <img src="/assets/2024/blender/leg2.jpg" style="width:32%"/>
  <img src="/assets/2024/blender/leg3.jpg" style="width:32%"/>
</div>

# Neptune's Pride (Collective Game)

At the start of the year I played a game of [Neptune's Pride](https://np.ironhelmet.com/#landing) with a group of 11 players. NP is a fantastic strategy game - the mechanics are simple enough that no one is going to lose a game due to not understanding the mechanics, but deep enough to be interesting. Instead winning or losing a game of Neptune's pride depends almost entirely on your ability to conduct diplomacy and organise true alliances.

In this game I spawned right in the middle of the map, which is a very difficult starting position. I had to ensure I had good diplomatic relations with most of the players in the game at all times! My empire was very long and thin so was very exposed to invasion everywhere - there was no "front line" I could defend.

The following video is the entire game from my point of view (it may skip some ticks if I forgot to record the game at that tick).

<div class="image-container" align="center">
  <video controls muted style="width:99%; vertical-align:middle">
    <source src="/assets/2024/NP.mp4" type="video/mp4" />
  </video> 
</div>

- 0m 0s: Spawn, I'm yellow circles
- 1m 0s: Invade green circles
- 1m 10s: Discover green squares (west)
- 1m 10s: Ally with light blue squares (north)
- 1m 25s: Ally with light blue circles (east)
- 1m 30s: Begin a coordinated invasion of dark blue circles with my ally light blue circles
- 1m 31s: Continue invading green circles in the south as well, coordinating with green squares to not accidentally attack them
- 1m 45s: Ally with green squares
- 2m 30s: At some point I discovered that blue squares had betrayed me (he was offering other players money and tech to attack me). Begin a coordinated invasion with my allies: orange circles, green squares and blue circles.
- 3m 31s: While everyone else is cleaning up the last of blue squares I begin a lightning invasion of red circles.
- 3m 57s: Tensions with blue circles were high, as a "warning shot" I destroy the last dark blue circle "haven" system. This triggers was with light blue circles.
- 4m 45s: green squares invades dark blue squares, I use this as leverage to ally with dark blue squares.
- 5m 10s: I finally manage to persuade dark blue squares to backstab his ally light blue circles. This breaks the organised resistance and allows orange circle and myself to start making real progress in the north east.
- There are now 2 major alliances. Both alliances are in the process of invading smaller empires, it becomes a long stalemate at this point.
  - Me (Yellow Circles) + Orange Circles
  - Green Squares + Purple Circles
- 8m: We break the alliance and begin attacking green squares. My fleets push deep into his core worlds in the west while orange circles slowly advances from the north. There are skirmishes along the south east line with some planets exchanging hands but nothing major.
- 10m 30s: The original core worlds of green squares have been entirely conquered, invasion of purple circles (who was allied with green squares) starts.
- My main concern now is orange circles backstabbing me. I am making slower progress at the front because all over the map I have large garrison fleets building up. I deliberately setup my main resupply lines to pass right through/near core orange worlds so I could rapidly divert and invade if necessary.
- Victory!

# Open Source Projects

## Myriad.ECS

Last year I built PROTOLOGIC, a programming game that I was building outside of Unity specifically to learn new engines. One of the things I used with PROTOLOGIC was an ECS (Entity Component System) called [Arch](https://github.com/genaray/Arch). 

I like the overall design of Arch except for one major issue - whenever there is a trade-off to be made between a dangerously unsafe API and a _tiny_ bit more speed, they will always choose speed. I wasted a lot of time chasing down very weird bugs in PROTOLOGIC caused by this - a mistake in one bit of code can corrupt the world and then cause completely unrelated bugs elsewhere.

To address this, I started my own C# ECS project: [**Myriad.ECS**](https://github.com/martindevans/Myriad.ECS).

I've been using Myriad.ECS in my projects this year, including Ephemeris, and I think it's a very nice framework to work with. The API doesn't include many footguns and offers several different querying techniques which are suitable in different circumstances. There are some special component types that have special powers such as; `phantom components` (making tracking of destroyed entities easy), `disposable components` (making resource management easy) and `relational components` (naming setting up links between entities easy).

## Serpent / Wazzy

[Wazzy](https://github.com/martindevans/Wazzy) is an implementation of the [WASI spec](https://wasi.dev/) (WebAssembly System Interface). It is written in pure C# and is designed to be easily extensible with custom implementations of parts of the spec.

[Serpent](https://github.com/martindevans/Serpent) is built on top of Wazzy. Using Serpent it's easy create an entirely self-contained Python environment. The Python code executes within WASM and asynchronously yields back to C# at opportune moments (e.g. if `time.sleep(100)` is called that **will not** block C#). My original goal with this was to create a safe Python environment which can be used as a "tool" for language models to write an execute code.

## LLamaSharp

[LLamaSharp](https://github.com/SciSharp/LLamaSharp) is a C# wrapper around [llama.cpp](https://github.com/ggerganov/llama.cpp). This is **not** my project alone, but I became one of the lead maintainers last year and I've continued working on it this year.

In 2024 my major contribution to LLamaSharp was the development of the [`BatchedExecutor`](https://github.com/SciSharp/LLamaSharp/blob/master/LLama/Batched/BatchedExecutor.cs) which is an entirely new low-level abstraction around language models. The `BatchedExecutor` is designed to expose all of the power of llama.cpp in a safe way, for example multiple parallel sequences evaluated all together in one batch is as simple as:

```csharp
var executor = new BatchedExecutor(/* parameters here */);

var seq1 = executor.Create();
seq1.Prompt([ /* tokens */ ]);
var seq2 = executor.Create();
seq2.Prompt([ /* tokens */ ]);

await executor.Infer();

var logits = seq1.Sample();
```

Sequences can be easily saved and loaded, forked into 2 sequences with the same prefix (which internally share the same space in memory), the KV cache can be accessed and manipulated (e.g. to implement context shifting), sequences can even be prompted with embeddings directly which allows things like LLava.

My long term goal for 2025 is to rewrite many of the higher level parts of LLamaSharp to operate on top of the `BatchedExecutor`, this will reduce the overall complexity of the project by implementing it all in one place and should offer more power to advanced users since they can always build on top of `BatchedExecutor` instead of using the low level llama.cpp primitives.

# Interesting Stuff

Some other interesting things that I encountered in 2024 in no particular order:

 - [Suzume](https://en.wikipedia.org/wiki/Suzume)
 - [Land of the Lustrous](https://en.wikipedia.org/wiki/Land_of_the_Lustrous)
 - [Dune 2](https://en.wikipedia.org/wiki/Dune:_Part_Two)
 - [The Orbital Children](https://en.wikipedia.org/wiki/The_Orbital_Children)
 - [Sousou no Frieren](https://en.wikipedia.org/wiki/Frieren)
 - [RWBY](https://en.wikipedia.org/wiki/RWBY)
   - RWBY is something I've been familiar with since it came out, but I had basically forgotten about it. When I heard that season 9 was out I rewatched all of the series and then season 9. Once I finished that they announced that Rooster teeth was shutting down - this reminded some friends about RWBY so I ended up participating in a complete rewatch with them as well so I watched the entire series twice back to back! Let's hope for news about Season 10 in 2025.
