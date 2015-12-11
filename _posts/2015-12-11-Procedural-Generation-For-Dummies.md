---
layout: post
category : game-development
tags : [game-development, procedural-generation]
tagline : In Which It Is Revealed Locked Doors Aren't So Bad
---
{% include JB/setup %}

## Procedural City Generation For Dummies

My game, Heist, is a cooperative stealth game set in a procedurally generated city. Why put in all the effort to writing a procedural generator when it would be far easier to simply hand build some levels, as most other games do? Fundamentally stealth games are about solving puzzles - with the puzzle constructed in a 3D space out of alarms and NPC guards. With just a few hand constructed levels a player will rapidly learn the solutions to the puzzles and the game has no replay value.

A solution to this is procedural generation of some element of the game which ensures that the puzzle is a little different each time. A great example of this is Left 4 Dead (L4D) which originally had just four maps! It uses *procedural narrative* to vary the events which happen in response to player actions. This keeps the tension high and makes every play through unique - ensuring that L4D is fun to play again and again.

L4D is a game about shooting zombies, so the procedural aspect of the game varies the timing of zombie attacks. The core of a stealth game is exploring the level to find the locations of guards and alarms so that's where I need to focus my procedural generation - generating maps.

In this series I will explain the techniques I am using for procedural city generation. This involves the generation of things such as road networks, building shapes and floorplans:

<img src="assets/TensorRoadsImg1.png" style="width:33%;height:auto">
<img src="assets/BigSkyscraper.png" style="width:33%;height:auto">
<img src="assets/ParcelledFloorplan.png" style="width:33%;height:auto">

I may also extend into some more things I have planned for the future such as procedural generation of guard patrol paths, alarm system placement and gameplay guided prop placement.

Throughout the series it should be kept in mind that I am trying to create a generator for *good looking* buildings which are *fun to play in* - gameplay is far more important than realism! Sometimes a tradeoff between the two has to be made and I will always prefer the choice which enhances gameplay. For example many real buildings will only have one long straight corridor - this is a boring level, it's far better to have alternative routes through the building to evade guards and alarms.

With that said, let's dive right in with an overview of how the system is generally structured...

## Start At The Top

Fundamentally the entire generator is a massive [L-System](https://en.wikipedia.org/wiki/L-system). Each part of the system only knows how to increase the level of detail by one level and this is recursively applied until we reach the maximum level of detail. For example a typical game level might look like this:

 - Start With A "City"
 - "City" Creates roads and blocks
 - "Road" - Creates road geometry and street furniture
 - "Block" - Creates lots
 - "Lot" - Creates building occupying
 - "Building" - Creates floors and facades
 - "Facade" - Creates windows and doors
 - "Floor" - Creates rooms and corridors
 - "Room" - Creates game props such as furniture
 
If you start off with a city node and keep subdividing it's ancestors you eventually end up with an entire city, full of buildings, where you can enter every single room of every single building.

With this structure creating a full procedural world generator becomes a matter of designing a number of separate generators for each individual part. I will cover one generator in each blog post in this series.

## Gameplay In An Infinite World

So does this solve the infamous inaccessible area problem of large open world games? i.e. you have a huge explorable world (e.g. watchdogs, GTA) but most of it actually sits behind locked, indestructible doors and cannot ever be explored. In principle yes it does, you just generate *everything* in the entire city.

In practice I don't plan to do this for two reasons. Firstly it's extremely difficult to dynamically generate that much geometry on the fly without bringing powerful computer to it's knees - and that's without considering the fact that there is an entire game running at the same time!

Secondly it becomes hard to provide good directed gameplay when the player could be anywhere at any time. I plan to generate large areas, such as one single city block, and then keep the player confined within that area. If you think about games such as GTA and watchdogs they also do this - although you can go anywhere in the city at any time most of the actual *gameplay* (except car chases) is restricted to a small area of the city such as the single building which you are currently infiltrating. Watchdogs goes as far as to warn you when you're leaving the "mission area" and you will fail the mission if you do not return - literally keeping you confined to an area of the city.