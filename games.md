---
layout: page
title: Games
tagline: All My Games
---
{% include JB/setup %}
{% include lightbox/setup.html %}

This list is by no means _all_ of the games I have created. I've made hundreds and hundreds of other games/prototypes. This is just the projects that I consider to be "important" somehow.

# Major Games
 - [Asteroids II (VB)](#asteroids)
 - [Toast (VB)](#toast)
 - [Twilight Nightmare (Java)](#twilight-nightmare)
 - [Myriad (XNA)](#myriad)
 - [Heist (XNA)](#heist)
 - [Parsec (Unity)](#parsec)
 - [Yolol Code Golf (C#)](#2020-yolol-code-golf)
 - [Bounded Planet (Bevy)](#2020-bounded-planet-rustbevy)
 - [Saturn's Envy (C#, Unity)](#2021-saturns-envy)
 - [Save The Spire (Unity)](#2022-save-the-spire)
 - [Zegg (Unity)](#2023-zegg)
 - [Ephemeris (Unity)](#ephemeris)
 - [PROTOLOGIC (C#, Unity)](#protologic)
 - Future...

# 2006: Visual Basic 5/6
Back in college, when I was first learning to program, I used VB5 and VB6. I built all my games by moving elements around on Windows forms!

Around this time I made a _lot_ of games, about one every week or two for the entire 2 years of college. Unfortunately although I have the VB6 source code for many of these games, I don't have any way to build them. The only two I still have binaries for are Asteroids and Toast.

## Toast

This is a game about a slice of ninja toast, collecting melons to extend his life and his understanding of the way of the true butter brotherhood. No idea why that's the storyline! The physics are very "floaty", with a massive amount of air control of the toast. Jumping while gripping onto a wall propels your upwards along the wall, so you can "wall jump" around the levels like a ninja!

You can download it to try [here](/assets/2024/Toast/Platformer.zip). There's even a map maker which you can download [here](/assets/2024/Toast/ToastMapMaker.zip).

<video src="/assets/2024/Toast/T_2024-02-13_15-51-33.webm" style="margin-left: 25%; width: 50%" controls="true"></video>
<br />

## Asteroids

This is a remake of asteroids, using only lines drawn from point to point (like an old vector graphics display). This was an experiment to move away from the square/boxy sprite style graphics you're forced to use if you only draw with Windows form elements! You can download it to try [here](/assets/2024/Asteroids2/AsteroidsII.zip).

<video src="/assets/2024/Asteroids2/Asteroids_II_2024-02-13_15-33-04.webm" style="margin-left: 25%; width: 50%" controls="true"></video>

**Note**: You'll need to acquire mscomctl.ocx for this to run. See [this StackOverflow question](https://stackoverflow.com/questions/39251880/mscomctl-ocx-missing-windows-10). Note the comment with advice if the installation fails.

# 2007: XNA
Around this time I started learning C# and [XNA](https://en.wikipedia.org/wiki/Microsoft_XNA). XNA was a really amazing toolkit built by Microsoft, which was basically a lightweight C# wrapper around DirectX. Games built using XNA could even be deployed to Xbox360, which at the time was absolutely mind blowing - console games were only for big studios with very very expensive devkit hardware! This is actually the reason that I ended up buying the only console I have ever owned - an Xbox360.

Unfortunately I can't get any of the games from this period running. I think they probably require early versions of the XNA redistributable or the dotnet framework installed.

## Explosion Pong

This was a just a simple pong game for local multiplayer. What makes it special is this was my first game which I built out to a completely playable game on Xbox360. I took it around to a friend's house one afternoon and played a few rounds with a group of friends, "just like a real game"!

## Velocity (Design & Media)

This was a 4 person group project in the first year of University (2008). We had to build a media project of some kind, naturally my group built a game using XNA. We were pretty proud of the project (although, with hindsight, it's not a very fun game) as it was the first big game project that we were showing off for a few other people to play. I don't have a build of the game, but here are some prototype pictures:

<div class="image-container" align="center">
  <img src="/assets/2024/DandMproject/unnamed.png" style="width:40%; height: 350px"/>
  <img src="/assets/2024/DandMproject/unnamed2.png" style="width:40%; height: 350px"/>
</div>
<br />

# 2009: Java

Our University course taught Java as the main language, so I developed one game entirely in Java.

## Twilight Nightmare

In the second year of University there was another 4 person project. This time the brief was to build a game with a multiplayer component. My team developed a platformer game called **Twilight Nightmare**, the twist of the game is zones where the laws of physics are slightly different. In the end we only implemented two zones: one zone where gravity is in another direction, and another where time runs at a different speed.

<video src="/assets/2024/TwilightNightmare/javaw_2024-02-13_18-58-38.webm" style="margin-left: 25%; width: 50%" controls muted></video>

Unfortunately the game doesn't seem to handle modern high resolution monitors (maybe an issue with scaling), so the video looks a bit weird, but you get the idea!

This was a really cool game, _way_ beyond anything any other team made! During demo day we had a constant crowd of people waiting to play and in the end we won the prize for the best game. This was the first game where it was really successful, genuinely fun and was played by large crowds of people. Very exciting!

Available for download [here](/assets/2024/TwilightNightmare/Product.zip). Should work for LAN play right away, Internet play requires opening port 45563 on the host.

# 2010: XNA

After graduating from University I decided to pursue independent game development. This was around the time when "indie development" was becoming big (from my perspective at least) - Xbox Live Indie Games had been a decent success, more small developers were releasing games on Steam, Greenlight came onto the scene in 2012 and reinforced that trend.

## Myriad

This was a game I started developing with my friend Tom Gillen. I'm not certain on the exact timeline, I think we were probably working on this in 2010. Myriad was a strategy game inspired by games like Darwinia and Supreme Commander, which had shown that you could have a strategy game with a very large number of units. We wanted to try and develop an RTS which was much more "free form" than games designed around static base building, with important units acting like your base (e.g. a priest moving around summoning angels to fight in your holy army, rather than a static barracks).

For Myriad we developed landscape rendering (learning about [ROAM](https://en.wikipedia.org/wiki/ROAM)), instanced rendering of units, deterministic simulation (physics engine built entirely on fixed point calculations) and network sync using that (sending player inputs and relying on determinism to stay in sync).

The demands of our final project and exams at University eventually meant that development on Myriad stopped. But it was quite an influential project for both of us. Tom even went on to develop a renderer as his final project named `Myre`: **My**riad **R**endering **E**ngine.

## Heist

This is a game that I had been dreaming up for years at this point. The idea was to build a game where players could perform heists at all levels of complexity. Advancing your criminal career up from basics (breaking into houses), up to intermediate (contract industrial espionage, breaking into offices and research labs) up to the ultimate heist (casinos or banks) where you have to pull off a heist like Ocean's Eleven to succeed. With hindsight this was an impossible game design problem, but it didn't stop me working on it for years around 5 years!

Development of Heist involved:
 - Custom game engine called `HeistCore` - written in C#, scriptable with Lua.
 - Another custom game engine called `Epimetheus` - written in C#, scriptable with Lua.
 - A deferred renderer named `Myre` - adapted from Tom Gillen's university final year project. [Code here](https://github.com/martindevans/Myre).
 - A game toolkit named `Placeholder.*` (AI, Audio, Resource Management, Networking etc)
 - A procedural city generator. Generating rooms, houses, skyscrapers, building facades, road networks etc.

Although Heist never became a playable game I learned a huge amount working on it. Not just because worked on every part of a game engine, and learned a bit about everything involved in making a game. But also because I had specific things I needed to achieve (e.g. I need to play some sound effects for this) and had to learn how to build things without overengineering them, and how to build things in a maintainable way so that I could come back to it a year later when I'd forgotten all the details!

Over the years I wrote many _many_ blog posts about the development of Heist:

<ul>
    {% for page in site.tags.heist %}
    <li><a href="{{ page.url }}">{{ page.title }}</a></li>
    {% endfor %}
</ul>

With many many images in all those blog posts:

<div class="image-container" align="center">
  <img src="/assets/ZoeBones.png" style="max-width:19%; height: 200px"/>
  <img src="/assets/Torchlight.png" style="max-width:20%; height: 200px"/>
  <img src="/assets/voxel-smiley.png" style="max-width:20%; height: 200px"/>
  <img src="/assets/TensorRoadsImg1.png" style="max-width:20%; height: 200px"/>
  <img src="/assets/ParcelledFloorplan.png" style="max-width:19%; height: 200px"/>
</div>

<div class="image-container" align="center">
  <img src="/assets/gbuffer_normals.png" style="max-width:22%; height: 200px"/>
  <img src="/assets/floorplan-teaser.png" style="max-width:30%; height: 200px"/>
  <img src="/assets/CircularCity.png" style="max-width:22%; height: 200px"/>
  <img src="/assets/character.png" style="max-width:22%; height: 200px"/>
</div>
<br />

# 2016: Unity

When I started Heist I looked at the game engine market and decided to make my own engine with XNA. At the time Unity would have only been on version 3.0! However, by 2016 Unity was up to version 5.0 and was much more widely used.

## Dissonance Voice Chat

In 2016 Tom quit his job and I stopped development on Heist, together we formed [Placeholder Software](https://placeholder-software.co.uk/). The plan was for us to take some of the cool tech from Heist (mostly procedural city/building generation) and port it over to Unity as assets to sell. Before that we decided to make a voice chat asset to get familiar with the market. [Dissonance Voice Chat](https://assetstore.unity.com/packages/slug/70078?aid=1100lJDF) has gone on to be an excellent product that we're still selling to this day!

## Wet Stuff

Not a game, but still a cool project. Wet Stuff is a Unity asset which makes any surface appear wet. It does this with some clever trickery in the GBuffer, so unfortunately it only works for the old "built in renderer" which Unity are phasing out. We've never worked out how to port it to the newer pipelines (URP/HDRP).

As part of development of Wet Stuff I spent almost three months putting together a "demo reel" for the asset. After all this time this is the first really artistic project that I ever released to the public! See the video on YouTube [here](https://www.youtube.com/embed/-9zrrXtgD0M?si=oeP0nQa0XGP2vFvu).

## Parsec

Around 2018 Tom and I decided to experiment with building a game instead of assets. We were both excited by the possibilities around the new Unity DOTS stack, particularly ECS. The last game we had worked on together was Myriad, which was all about large scale battles, so I guess there's a bit of a theme there!

Parsec was intended to be a space colony sim, something like Rimworld crossed with Oxygen not included, but onboard a spaceship which you slowly expand over time. Rather than starting at basics and working your way up the tech tree (which is a bit of a tired trope at this point) you would start with a small ship (e.g. an escape pod) and build it up using salvage from other destroyed ships. Each new area you entered (e.g. not sure how it'd work, but it could be when you "jump" from one system to another) would have a certain amount of wrecks, some more dangerously unstable than others, and it's up to you which you enter. Exploring wrecks and working out how to safely/quickly take them apart would be an important part of the game alongside putting the bits back together on your ship!

Here are some random images taken from PRs in the project. First is a tile system, automatically selecting the correct tile based on adjacency. Second is a power system, built out of tiles with various adjacency rules.

<div class="image-container" align="center">
  <img src="/assets/2024/Parsec/wq221n9w.bmp" style="max-width:49%; height: 250px"/>
  <img src="/assets/2024/Parsec/ty4qikcs.bmp" style="max-width:49%; height: 250px"/>
</div>
<br />

Finally an experiment with realtime fluid sim. We had some ideas like fluid sloshing in tanks causing hull stress. Or even atmosphere sloshing around the ship, e.g. heavier gasses like CO2 displacing air when accelerating.

<div class="image-container" align="center">
  <img src="/assets/2024/Parsec/screenshot.gif" style="width:50%"/>
</div>
<br />

Eventually we killed the project because Unity ECS was absolutely the wrong technology choice to use in 2018. It was incredibly new and unstable, the API kept radically changing and we had to keep making changes to the game to adapt. Eventually there was a change that would have required too much rewriting and that was the final straw.

## 2020: Yolol Code Golf

In 2019 I joined [Cylon](https://discord.gg/WaCmEQJzkE), a Discord community focused on "Yolol", the in game programming language of [Starbase](https://store.steampowered.com/app/454120/Starbase/). I built out a [Yolol interpreter](https://github.com/martindevans/Yolol/tree/master/YololEmulator), [Yolol optimiser](https://github.com/martindevans/Yolol/tree/master/Yolol.Analysis) and eventually a full [Yolol compiler](https://github.com/martindevans/Yolol.IL). I used the Yolol compiler to build out a Yolol code golf game in a Discord bot, [source here](https://github.com/martindevans/Yolol-Ladder).

Each week the bot would announce a challenge like this:

```
Given a set of numbers which is either all even or all odd, find the incorrect value in the set.

Examples:
 - Inputs: `806928`, Output: `9`
 - Inputs: `573154`, Output: `4`
 - Inputs: `404070`, Output: `7`
```

And players would write solutions like this:

```vbnet
k=10^3l=10^4o=k*l
i=:i a=i%10b=i/l*k%10c=i/10^5*k%10d=i/k^2*k%10z/=(a%2+b%2+c%2)%3goto4
e=i/o*k%10f=i/l^2*k:o=d*((d+a)%2)+e*((e+a)%2)+f*((f+a)%2):done=1goto2
:o=a*((a+d)%2)+b*((b+d)%2)+c*((c+d)%2):done=1goto2
```

I published a new challenge every single week, for about 2 years. With a small but dedicated set of players who participated in many of these challenges. Over that time this acted as a fantastic test set for my Yolol runtime and compiler, shaking out many bugs. I think the compiler is probably one of the most well tested programs I've ever written!

## 2020: Bounded Planet (Rust/Bevy)

Bounded Planet was a group project which we started working on in Cylon. The vision for the game was a persistent MMORTS, inspired by a game I played back in 2006 called [`Boundless Planet`](https://www.onrpg.com/games/boundless-planet/). We were trying to focus on empire building, logistics and true strategy rather than the shallow "strategy" that many RTS games have (advanced rock/paper/scissors).

Rust and especially Bevy were a very bad choice for development at this point, Bevy in particular was very new an immature. We only chose it specifically _because_ it was something new and different, not because it was the right tool for the job. This technical immaturity of the platform, and infighting over the design of the game eventually killed it.

It was for this project that I wrote [The Yard Sale](https://martindevans.me/game-design/2020/09/16/The-Yard-Sale/) blog post, detailing the design system we were (trying to) use. That's gone on to be my standard system for thinking about, analysing and designing games.

This is the only screenshot of the game I can find anywhere:

<div class="image-container" align="center">
  <img src="/assets/2024/BoundedPlanet/94496898-8d093580-01ed-11eb-802f-0ce2a23b37a3.png" style="width:50%"/>
</div>
<br />

## 2021: Saturn's Envy

In 2021 we decided to run a Cylon gamejam, the theme (appropriately enough) was "space & programming". I decided to create a game based on my Yolol.IL engine (a Yolol to dotnet IL compiler). Players could write Yolol code to control spaceships, then submit that code to a Discord bot which would run battles and maintain a leaderboard. Replays can be watched [online here](https://referee.cylon.xyz/fleets/player/).

This game is split into two parts, the "simulator" (which runs battles) and the "player" (which displays the replay files). The simulator is [open source](https://github.com/martindevans/Yolol-SpaceShipCombatSimulator) but the player is not (due to all the assets which I don't have permission to redistribute).

<div class="image-container" align="center">
  <img src="/assets/2024/SaturnsEnvy/firefox_2024-02-14_20-11-48.jpg" style="width:50%"/>
</div>
<br />

## 2022: Save The Spire

In 2022 we did another Cylon gamejam. This time there were a lot of themes, we voted in order to rank them, everyone could pick as many or as few themes from the list as they wanted:
1. Magic
2. Factory
3. Space
4. Indirect Unit Control
5. Zachtronics
6. Multiplayer

With all of my previous games I have tried to build something I was confident would be a fun game, usually that meant it was a recognisable adaptation of an existing game/genre with a couple of unique twists to make it my own. This time I wanted to try something completely different, a total mashup of different games types with weird gameplay - I wasn't confident it would be fun but I was confident it would be something new. That's the advantage of a game jam, you're not wasting a huge amount of time on something that turns out to be bad!

Save the spire had a tower floating in space, with various bit of machinery attached to it. You could build platforms to connect together bits of machinery. Magical golems would walk around your platforms operating the machinery, eventually bringing the tower back to life. It wasn't really a very fun game, the camera controls are terrible and the best strategy is just to connect everything to everything else and the golems will sort it out automatically.

<video src="/assets/2024/SaveTheSpire/Unity_2024-02-14_15-22-19.webm" style="margin-left: 25%; width: 50%" controls="true"></video>
<br />

Available for download [here](https://github.com/martindevans/martindevans.me/releases/download/0.0.1/SaveTheSpire.zip). Not open source, due to assets used.

## 2023: Zegg

In 2023 we did another Cylon gamejam. This time everyone had to build a game based on the theme of **Exploration** with at least one other theme from:
 - Time
 - Sacrifice
 - Once more, with feeling
 - Navigation
 - Unlikely Combinations
 - Computers/Circuitry
 - Don't Stop Moving
 - Musical

I added a couple of extra personal goals:
1. A game everyone could enjoy right away (Saturn's Envy was _playable_ but Yolol is awful, Save The Spire was weird and experimental).
2. A camera system that players wouldn't hate (Saturn's Envy and Save The Spire both had awful cameras).
3. Multiplayer.

Zegg is a top-down, roguelike, multiplayer, dungeon crawler with a twist. When you die you replay the map from the start again, but with copies of yourself doing exactly what you did on all your previous runs! The map is designed so that some puzzles are _impossible_ to solve alone and you have to co-operate with previous versions of yourself. In this video you can see that I need to get two previous copies of myself onto the switches (lighting up the green lines), so that the third copy can go through the gate:

<video src="/assets/2024/Zegg/Zegg_2024-02-14_22-43-28.webm" style="margin-left: 25%; width: 50%" controls="true"></video>
<br />

Zegg was a big hit in the game jam demos, everyone enjoyed playing. There were even players trying to speed run the game!

Available for download [here](https://github.com/martindevans/martindevans.me/releases/download/0.0.2/Zegg-Final.zip). Not open source, due to assets used.

## Ephemeris

Ephemeris is a game concept I started working on around 2022, and I'm still working on it now (early 2024). The idea is to build a completely realistic simulator of orbital space combat. e.g. Children of a Dead Earth, but multiplayer and more accessible.

There are many _unrealistic_ space combat games out there, such as Homeworld (naval carrier based combat in space), Nebulous: Fleet Command (naval battle ship combat in space) or Infinity (fighter aircraft combat in space). The problem with all these games is they simply take an existing kind of combat and drop it into space, without really thinking about what would make space combat completely unique.

The only realistic ones I know of are [Children of a Dead Earth](https://store.steampowered.com/app/476530/Children_of_a_Dead_Earth/) or [Kerbal Space Program](https://store.steampowered.com/app/220200/Kerbal_Space_Program/) with appropriate mods.

I worked on some early prototypes in 2022, mostly messing with rendering very large scale scenes in Unity:

<div class="image-container" align="center">
  <img src="/assets/2022/Unity_2022-01-02_01-58-38.png" style="max-width:24%; height: 250px"/>
  <img src="/assets/2022/Unity_2022-09-22_03-19-32.png" style="max-width:24%; height: 250px" />
  <video controls muted style="max-width:24%; vertical-align:middle; height: 250px">
    <source src="/assets/2022/Unity_2022-01-09_02-18-44.webm" type="video/webm">
  </video>
  <video controls muted style="max-width:24%; vertical-align:middle; height: 250px">
    <source src="/assets/2022/Unity_2022-04-13_02-32-22.webm" type="video/webm">
  </video>
</div>
<br />

In 2023 I worked on the simulation side of things, building an N-Body integrator using the Unity ECS. I also worked on the UI side of things, diving deep into a rabbit hole drawing perfect lines on the GPU:

<div class="image-container" align="center">
  <img src="/assets/2023/EphemerisLineWithMarker.png" style="width:32%; height: 250px"/>
  <img src="/assets/2023/EphemerisLineWithMarkerCloseup.png" style="width:32%; height: 250px"/>
  <img src="/assets/2023/EphemerisBezierArc.png" style="width:32%; height: 250px" />  

  <video controls muted style="width:60%; vertical-align:middle; height: 350px">
    <source src="/assets/2023/EphemerisJupiterTimelapse.webm" type="video/webm" />
  </video>
</div>
<br />

I've started up another page dedicated to the game, called [`Ephemeris Notes`](https://martindevans.github.io/EphemerisNotes). This site has all kinds of things related to the game; [useful websites](https://martindevans.github.io/EphemerisNotes/category/web-pages/), other related [media](https://martindevans.github.io/EphemerisNotes/category/media/) and all kinds of [implementation details](https://martindevans.github.io/EphemerisNotes/category/implementation-details/).

Unfortunately in 2023 Unity announced **the runtime fee** and shot themselves in the foot with a thermonuclear shotgun, just as I was ramping up the time I spent on Ephemeris. I decided to put Ephemeris on hold until it was clear what engine I should use.

## PROTOLOGIC

Protologic is a game I started in direct response to the Unity runtime fee situation. It's an adaptation of the old [Saturn's Envy](#2021-saturns-envy) idea, but ships are programmed with WebAssembly instead of Yolol. This is a useful project because it lets me experiment with a few different technologies:

**Non Unity ECS sim**. For example using [Arch](https://github.com/genaray/Arch) to run a high performance simulation, totally disconnected from all the Unity ECS weirdness. This is useful even if I decide to use Unity, I can use Arch as an alternative to the Unity ECS even inside Unity.

**Non Unity Player**. Saturn's Envy/Protologic work by running the simulation as fast as possible to generate a "replay" file which is displayed in a separate application. This allows me to build the player in multiple different engines ([Unity](https://unity.com/), [Godot](https://godotengine.org/), [Stride](https://www.stride3d.net/) etc), which is much simpler than porting the entire game between engines!

**WebAssembly**. I think there's a lot of potential for modding games using WebAssembly, the secure/sandboxed nature of WASM means mods could be passed between clients without requiring trust. For example it would be safe to join a totally random game server and download all of the mods off the host!

Battles can be watched online [here](https://referee.cylon.xyz/protologic/player/), and if you want to join in and play you can join [Cylon](https://discord.gg/WaCmEQJzkE) and submit to the *Protologic bot. The latest version of the sim/player for offline use are currently available [here](https://github.com/Protologic/Release).

<div class="image-container" align="center">
  <img src="/assets/2024/Protologic/firefox_2024-02-15_16-33-33.jpg" style="width:50%"/>
</div>
<br />