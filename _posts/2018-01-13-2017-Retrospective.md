---
layout: post
category : Personal
tags : [general]
tagline : In Which A Lot Happens
---
{% include JB/setup %}

# TL;DR

I developed [Dissonance Voice Chat](https://www.assetstore.unity3d.com/#!/content/70078?aid=1100lJ2J) all year.

# What Did I Do In 2016?

In my [last retrospective](http://martindevans.me/game-development/2017/01/01/2016-Retrospective/) I talked about forming [Placeholder Software](https://placeholder-software.co.uk/) and releasing Dissonance Voice Chat onto the asset store right at the start of the year.

# Dissonance Voice Chat

Obviously the bulk of my work in 2017 was on Dissonance voice chat. We released in late January of 2017 and it's been all go since then - dealing with support requests by email, fixing bugs discovered in the wild, developing new features and pushing all this out in 19 versions.

This has been completely unlike any software development work I've done before - previously it's all been closed source development on Epimetheus/Heist (with no customers influencing my decisions) or it's open source work where I can happily just answer with "I'll be happy to accept a PR" if I don't want to work on whatever is being requested. It can be stressful but in general it's been great fun!

I think the most interesting aspect is how this has influenced how I write code. New stuff that I write is a lot more robust and ready for release with extra things to help inevitable debugging e.g. live readouts in editor of as much as possible, logging _everything_ but hiding that behind a toggle to not annoy users, verifying as much about the runtime environment as possible (not trusting the user to set it up properly).

### Releasing on the asset store

Releasing on a store implies a whole load of other associated work. Making branding images, keeping on top of reviews (making sure to respond to any review that isn't 5 stars) and collaborating with other developers to cross promote our products. The hardest thing, which I'm still not confident about, is making pricing decisions - in 2017 we raised the price twice as we released major new features or gained confidence about how stable/robust Dissonance is. We also participated in 2 store wide sales (at different discount levels) and were featured once in the 24 hours sale. Measuring the impact of all this and extrapolating it out to make future decisions about the price is very difficult!

### Compatibility with Android/Linux/iOS

I have learnt a _lot_ about compiling stuff for other platforms this year. I've done a tiny bit of work on a Linux server before (Javascript and Mono) and I've written an app for Android before (pure Java), but this was a whole different level. Over the year Dissonance has used 3 native plugins, (Opus, speexdsp and webRTC) and I've had to get those building for as many platforms as possible _and_ make sure that they are as backwards compatible with older versions of the platforms.

### Learning C++

I've always hated [C++](http://uncyclopedia.wikia.com/wiki/C%2B%2B), it's such a huge and complex language seemingly packed with as many footguns as possible. With the arrival of Rust I thought there was a good chance I may avoid heaving to learn C++ altogether. Of course this was not to be - I could write all my new code in Rust but the world still runs on C++! I learnt a huge amount about C++ for Dissonance while working on changes to Opus (to make it easier to compile on iOS), reverse engineering how libspeexdsp works (attempting to get AEC to work) and extracting just the bits of webRTC that I need to make preprocessing/VAD/AEC to work.

I must admit C++ isn't as bad as I thought, as long as you know what legacy parts of the language to avoid and you have decent tooling to back you up it's actually not a bad way to write relatively cross platform code.

### Collaborating With Other Developers

A big feature of Dissonance is that it is specifically designed to abstract over the network layer - allowing us to use the same code for multiple different networking systems. We've already got seven network integrations (Forge Remastered, Forge classic, Photon Unity Networking, Photon Bolt, UNet HLAPI, UNet LLAPI and Steamworks p2p) and we plan to write even more. We've had a great response from other asset developers collaborating with us to help integrate the two assets together and then cross promoting our assets.

I particularly want to shout out to Darrin at [Crazy Minnow Studio](http://crazyminnowstudio.com/posts/multiplayer-lipsync-with-salsa-and-dissonance-voice-chat/). I asked him if he would be interested in bringing together Dissonance and [SALSA lip sync](https://www.assetstore.unity3d.com/en/#!/content/16944?aid=1100lJ2J), he responded enthusiastically and did a huge amount of work to make it happen - he essentially wrote the entire script, all the documentation and even made a great tutorial video on how to set it up.

The [end result](http://crazyminnowstudio.com/posts/multiplayer-lipsync-with-salsa-and-dissonance-voice-chat/) is super cool! Especially in VR - it adds a lot of immersion to see character faces animated as they talk.

# Open Source

I'm a massive fan of open source and try to release as much of my code as possible, I'm sad to say I've slowed down a lot in 2017. Usually I would keep the main project closed source and open source any helper libraries I wrote e.g. the [SwizzleMyVectors](https://github.com/martindevans/SwizzleMyVectors) library which I wrote to help me port Epimetheus over to not use XNA vector types. However, Dissonance is designed to be a single self-contained package so there are no parts we've released like that yet - we may break out some parts of it (e.g. logging) into a helper library as we develop more projects.

That's not to say I've not released anything though!

#### [**ZedZedZed**](https://github.com/martindevans/ZedZedZed)
 
This is a C# wrapper for the [Z3 theorem prover](https://github.com/Z3Prover/z3). Rather than writing constraints like this:

```
var b = ctx.MkConst("B", ctx.RealSort);
var c = ctx.MkConst("C", ctx.IntSort);
s.Assert(ctx.MkEq(ctx.MkReal(1), ctx.MkDiv((ArithExpr)b, ctx.MkMul(ctx.MkReal(13, 10), (ArithExpr)c))));
```

You can write it as a C# expression:

```
var b = ctx.MkConstReal("B");
var c = ctx.MkConstInt("C");
s.Assert(ctx.MkExpr(b, c, (bb, cc) => 1 == b / (c * 1.3)));
```

This isn't very well developed at the moment. It works fairly well for booleans and integers but has absolutely no support for reals (they don't map perfectly into the C# type system).

#### [e3d-scad](https://github.com/martindevans/e3d-scad/)

<style>
 #image-container img {
 	max-height: 235px;
 	width: auto;
 }
</style>

This is a library of parts modelled in [OpenSCAD](http://www.openscad.org/). I'm attempting to replicate parts from the [e3d product line](https://e3d-online.com/) as I need them for my own designs.

<div class="image-container" align="center">
  <img src="https://raw.githubusercontent.com/martindevans/e3d-scad/master/e3d-v6/e3d-v6.gif" width="40%"/>
</div>

This has been useful for...

#### [Rule Breaker](https://github.com/Unlimited-Development-Works/Rule-Breaker)

This is a collaboration with my [Dan](https://github.com/datkinson) to design a [CoreXY](http://corexy.com/) printer from scratch. We're both into 3d printing but neither of us is a mechanical engineer so this is a pretty interesting learning experience!

<div class="image-container" align="center">
  <img src="https://cloud.githubusercontent.com/assets/177519/26061958/52a4f312-3981-11e7-9c17-261c555954d8.gif" width="50%"/>
</div>

With Rule Breaker 1 we're just aiming for something which can print - If it can produce a quality [benchy](https://www.thingiverse.com/thing:763622) I will be very happy! Hopefully once we have built that and learnt all the things we did wrong we will move on to design another printer with a similar design but much much larger.

#### [Rock](https://github.com/martindevans/Rock)

Rock is an interpreter for the [Nock](https://urbit.org/docs/nock/definition/) (the lowest level part of Urbit) written in Rust. Implementing a Nock interpreter has become my goto project for learning a new language: it's relatively simple to implement the most basic Nock operators, a little complex to implement the complex Nock operators and there's essentially limitless optimisation opportunity.

# 3D printing

At the start of the year I got myself a [Prusa i3 MK2](https://shop.prusa3d.com/en/3d-printers/59-original-prusa-i3-mk2-kit.html) and started a year long obsession with 3D printing! As mentioned above I'm working to design my own printer from scratch which has also got me interested in learning about embedded programming (I purchased an [STM32F303K8](https://www.amazon.co.uk/STM32-NUCLEO-F303K8-development-STM32F303K8-connectivity/dp/B071JTRQP9/) microcontroller to experiment with over the Christmas holiday).

I also have ambitions to build a [hangprinter](https://hangprinter.org/) once the weather warms up a little and I can take over the entire garage to build a printer.

# Virtual Reality

Back in July Oculus put on a sale for the headset and touch controllers for just £399! After I got a VR headset I managed to talk a lot of my friends into getting headsets to and it's caused a pretty big change - we're all big gamers and we've played a big range of fantastic games. But we've also spent a lot of time just hanging out in VR, building shared spaces or just chatting in a nice environment.

A lot of people may say VR is overhyped but I honestly haven't met anyone yet who wasn't amazed by VR when they tried it - I can't help but think something with such draw even to non techie people is going to be big! 

## Interesting Stuff

Some other interesting things I encountered in 2017

 - [SpaceX](http://www.spacex.com/)
 - [Urbit](https://www.urbit.org/)
 - [Vivaldi](https://vivaldi.com/)
 - [Applied Science](https://www.youtube.com/channel/UCivA7_KLKWo43tFcCkFvydw)
 - [2 Minute Papers](https://www.youtube.com/user/keeroyz)
 - [Unite Amsterdam Conference](https://unite.unity.com/2017/europe)
 - [Matrix](https://matrix.org/)
 - [Stormlight Archive](https://en.wikipedia.org/wiki/The_Stormlight_Archive)
 - [Minetest](https://www.minetest.net/)
 - [MatterSlice](https://github.com/MatterHackers/MatterSlice)
 - [VORON](https://github.com/mzbotreprap/VORON)