---
layout: post
category : Heist
tags : [heist]
tagline : In Which Excuses Are Made
title : Why Does Heist Keep Crashing?
---
{% include JB/setup %}


## TL;DR

Heist crashes lots because it's in development!

## A Nice Problem To Have

I have a very nice problem with Heist – I keep getting bug reports being emailed to me! This is nice because it means that people are playing my game even though it's really early in development, doesn't have any gameplay, is totally unstable and I've not advertised it at all! Almost all bug reports share the same root problem...

## Persistence

A critical point to remember is that Heist is designed to be highly modifiable – without any installed mods Heist doesn't even get as far as showing a main menu, let alone any gameplay! Of course, not showing a main menu and having no gameplay would kind of suck, so the game currently has a default mod baked into it which shows a menu and downloads some default gameplay.

Mods aren't the only thing that can be configured about Heist either. During development I've made an effort to have <del>no</del> as few hardcoded values as possible; if I feel I need a value then it gets put into the configuration file. These configuration values can be anything from simple stuff (key bindings) to complex stuff (network NAT negotiation period) to inexplicable stuff (synchronicity of the world generator).

My point here is that Heist has a _lot_ of stuff that gets saved out to disk, and it is loaded back up next time you play. It would be a waste to download and unpack the default mods every time you played. It would also be incredibly annoying if Heist forgot changes to your keybinds every time you played!

## Version Management

This is why Heist keeps breaking in almost the same way with every single version. I'm developing so rapidly at the moment that every time you play you're loading up a new _and incompatible_ version of the game. When the game starts it tries to load your configuration and mods from the last time and *BOOM* something somewhere chokes on the old data.

To be clear the incompatibility isn't because I've changed the syntax. If that were the case I could easily just parse the file in the old way and the new way and use whichever one worked, then I could write out the data in the new format so that it would only ever be a problem once. The problem is that I'm frequently changing the _semantics_ of files. For example I occasionally change the name of arguments in the scripting interface, there's no good way to handle this.

## But You Could...

I could handle this much better. The mod system could ignore incompatible mods and inform the user that they need to fix something. The configuration file could be ignored if it's badly formatted. I could publish a list of compatible versions and make the game delete all old configuration if it's from an incompatible version. For now though, these things require more effort than I think is really worth it.

Of course, once the game is properly released these problems will start to go away from "both ends". Development will almost never be making breaking changes to the on disk format, which means data will be compatible between most versions and these problems will occur much less frequently. Also, handling of incompatible data or broken mods will be implemented properly by then, so if there is something wrong the game will handle it gracefully and inform the user rather than exploding in your face and sending me an email.

## What Can I Do About It?

All the configuration data and mod data that Heist stores is in one folder:

C:\Users\YOUR USERNAME HERE\AppData\Roaming\Heist

If your game breaks, delete that folder and try again. Of course, if it still breaks make sure to send me a bug report.