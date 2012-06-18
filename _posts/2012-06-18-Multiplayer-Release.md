---
layout: post
category : Heist
tags : [heist, release]
tagline : In Which The Interconnectedness Of All Things Is Revealed
---
{% include JB/setup %}


## TL;DR

I'm releasing multiplayer in a _very_ early form, it should work for many players but has only been tested with 2. Download it from [the usual place] (http://placeholder-software.co.uk/setup/heistgame/publish.htm).

## Release Often, Break Things

As promised last week I'm releasing the first early version of multiplayer for Heist this week. In this release are a few other things too:

- Multiplayer Sessions
- Tools And Guns
- New Menu System
- Fixes For Bugs Reported Last Time
- Performance Enhancements
- Overhauled Server List
- A New Character Model
- More Reliable Handling Of Script Updating

The top three are the most interesting ones of course.

### Multiplayer Sessions

Setting up or joining a multiplayer session should be relatively simple. To host simply:

Click Multiplayer > Click Host > Enter a session Name > Click Host > Enjoy

To join, click Multiplayer and there is a list of all currently running sessions, select one and click the name to join. When you're selecting a server, you can filter by name and location just by typing into the search boxes at the top. _Ping does not currently work, I'll fix that soon, ignore it for now_.

#### Ports And Stuff

If you want to play a multiplayer session of Heist you almost certainly need to forward port 56451, this applies if you are hosting or joining! If you manage to join _without_ forwarding this port then please contact me and tell me what router you're using!

### Tools And Guns

Once you're in a game (singleplayer ot multiplayer) you'll have access to a tool and a gun, to swap between them roll your mouse wheel (there's no indication which one you have equipped yet). If you have the tool equipped left clicking will spawn a box above your head which will disappear after 30 seconds. If you have the gun equipped left clicking will fire the gun, shooting players doesn't kill them (yet) but it will hit the box around.

### New Menu System

I'm pretty proud of the new menu system, it's basically just rendering a locally hosted website in the game client so I can use the power of HTML5, CSS3 and Javascript to build cool menus - I expect I'll be swapping the menu designs around quite a lot when I need a bit more of an easygoing task to work on!

## Next Time

I'm currently deciding what to work on for the next release; I have a choice between writing a scriptable AI system or working on graphics. Personally I think AI would the sensible choice, but for some reason I really wanted to work on some kind of procedural texturing system and animation rigging for characters!