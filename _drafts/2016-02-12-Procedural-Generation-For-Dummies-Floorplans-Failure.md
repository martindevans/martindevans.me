---
layout: post
category : game-development
tags : [game-development, procedural-generation, procedural-generation-for-dummies]
tagline : In Which A Failure Is Discussed
title: "Procedural Generation For Dummies: Floor Plan Failure"
---

My game, Heist, is a cooperative stealth game set in a procedurally generated city. This series of blog posts is an introduction to my approach for rapidly generating entire cities. I am developing the city generator as I write these blog posts and I do *not* know the best way to do it - it's all experimental! When experimenting failures can be just as important as success; so that's why in this post I'm going to discuss how my floor plan generator experiments so far have *failed*.

If you're interested in following the series as it's released you can follow me on [Twitter](https://twitter.com/), [Reddit](https://www.reddit.com/user/martindevans/) or Subscribe to my [RSS feed](http://martindevans.me/rss.xml)

The code related to this article is open source and can be found [here](<https://bitbucket.org/martindevans/base-citygeneration/src/8aa49400561f02ea812f61171c789b6981265412/Base-CityGeneration/Elements/Building/Internals/Floors/Design/?at=default>). Unfortunately it has some closed source dependencies which means you won't be able to compile it (I hope to fix that soon) but at least you can read along (and criticise my code).

## Floor Plan Generation

After lot subdivision has finished we have a set of areas to place buildings into. The next stage is to fit a building *footprint* into this lot - for example if you think about your house it probably doesn't fill it's entire lot, for example there could be gardens at the front and back. I'm going to break out of sequence and *not* discuss that in this post - instead we're going to assume we've generated a footprint and now we want to generate a floor plan to fill the footprint.

### Difficulties

Let's think about some of the things we have to take into account when we're laying out a floor plan.

#### Shape

The shape of the space we're laying out the floorplan in has been set (as mentioned above) and can't be changed (at least not in the architecture of this system). If you want to expand a wall a little bit of space to a room you're out of luck!

#### External Design

The location of external features such as windows and doors are probably set *before* floor plan generation even starts. i.e. The location of external features conforms to an *external* style of the building without any real consideration for the internals.

#### Vertical Features

Floor do not exist completely independently from other floors in the same building. Somehow all the floors which share a vertical feature (e.g. a stairwell) must decide between them where to place the feature.

In my system I largely ignore this constraint by leaving the decision *entirely* to the lowest floor and then the rest of the floors just have to work around the vertical feature.

#### Connectivity

The floor plan must be well connected - at a minimum all rooms must be accessible! The question is: accessible from what? For example on a ground floor there could be *multiple* external doors - should we say that every room must be accessible from *every* door or simply *any* door?

This is an important thing to think carefully about because this generator is for a game about breaking into buildings - if the floor plan is over-connected then breaking in is going to be too simple! Conversely if it's under-connected the player has no *choice* on how to approach the level and the game is boring.

### High Level Approach