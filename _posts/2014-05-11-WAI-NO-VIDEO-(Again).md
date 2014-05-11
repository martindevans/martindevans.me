---
layout: post
category : heist-game
tags : [changelog, heist]
tagline : In Which A Tradition Is Not Upheld
title: WAI NO VIDEO (Again)
---
{% include JB/setup %}


## TL;DR

This week I worked on two separate goals and although I finished them both neither are easy to graphically demo in a video format.

## This week...

- Support For More Complex Electronic Systems
- Physics Joints/Constraints

## So Why No Video?

The two things I worked on this week are two completely separate systems which I need for what I plan to do next week, unfortunately neither are particularly graphical in nature and so I can't really demo them in a video!

## Complex Electronics

I started off the week working on the electronics for doors. This is a surprisingly complicated set of systems including:

 - Sensors to detect if the player pressed 'use' on the door to open/close it
 - (pickable) Lock mechanisms
 - Lock control mechanisms (e.g. a code panel as I showed last week)
 - Timers (electronic code panel unlocks door for a set time before closing it and relocking)
 - Motors to open/close the door
 
None of these is particularly complex on it's own, but together that's quite a lot of parts to put together (and of course to debug the underlying electronics framework). It didn't take me long building these circuits to realise that I had a couple of problems.

#### 1. The Electronics System Was A System Of Devices With _One Input_ And _One Output_.

This is a bit of a problem! It was possible to work around the limitation by building a device out of multiple interconnected devices and so you could have a load of input devices connected to some logic and a single output device but this was a colossal pain in the ass to work with! It took me a couple of days to refactor the electronic infrastructure system to remove this limitation and then to rebuild a load of devices (which had previously been multiple partial-devices) into single devices. For example Electronic Infrastructure now has a much easier to use boolean logic system (_And_, _Or_, _Not_, _Xor_ etc).

#### 2. Building Circuitry Was Very Repetitive

A timed latch is a pretty simple device consisting of 2 inputs, 1 output and 3 components and 9 connections (i.e. 15 line of code at least). This a fair amount of boilerplate code to have to write every single time you want to use a basic circuit like a timed latch and the same logic extends to any commonly reusable circuitry. To fix this problem I extended the circuitry definition system so that you can use circuits as devices themselves - so now you can define a timed latch circuit and use it in other circuits.

## Physics Joints/Constraints

Previously I have built a lot of support for asking the physics engine about the scene - raycasts and volume queries etc. What I haven't done very well up until now was build support for creating complicated setups within the physics engine - basically I was lacking support for all the joints and constraints you need to build interesting things (like doors, with sliders, motors and hinges). I spent the rest of the week refactoring the (very basic) support I already had in place for constraints (previously used only in the character controller) and expanding it out to support many more types of joints. By the end of Monday I should have support for every single type of joint in the BEPU engine (about 20).

## Why Do You Keep Talking About Doors?

My goal for all of this is to build a set of doors with locks, keys, code panels, motors, sensors and alarms (obviously this is pretty important for a game about breaking into buildings). I now have all the separate parts to do this built into the engine and scripting system - it's just a matter of assembling the parts together in the right way now!