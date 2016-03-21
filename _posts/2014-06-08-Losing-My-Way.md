---
layout: post
category : Heist-Game
tags : [changelog, heist]
tagline : In Which A Major New Project Is Begun
---
{% include JB/setup %}


## TL;DR

No changelog today because I've started working on a major new feature (AI) and I can't get that to a demo-able state in a single week!

## This week...

- Decided to work on NPCs
- Begun overhauling world generation

## NPCs and World Generation

At first glance this seems like a terrible lack of focus - why did I decide to work on NPCs and then dive into overhauling world generation? I already have a few AI systems like action planning, decision trees and pathfinding implemented but not integrated into the same and so the sensible thing to do is integrate those.

There is one notable thing I do *not* have that's vital for AI - A navigation mesh (navmesh). A navigation mesh defines the bits of floor which can and cannot be walked on, without a one AIs cannot move at all because they don't know what surfaces may be walked on or what paths are available from here to there. Usually a navmesh is generated as part of the level compilation stage, however since Heist generates levels procedurally that means the navmesh must be generated on-the-fly too.

This brings us to world generation. Navmeshes are inextricably tied to the world and so they must be created as the world is generated and as AIs need them. I had two choices here:

1. Integrate navmeshes into the current world generation system (a hacky system I have wanted to replace for a while).
2. Replace the current system and integrate navmeshes into the new and improved system

Obviously I have gone for option two. This new world generation system should lead to massive increases in world generation speed, physics/graphics mesh generation and will have integrated navigation mesh generation too. I hope to get this work finished early next week, and then I can start bringing other AI systems into the engine one by one.