---
layout: post
category : game-development
tags : [game-development, procedural-generation, procedural-generation-for-dummies]
tagline : In Which Fantastic Footprints Are Fathomed
title: "Procedural Generation For Dummies: Building Footprints"
---
{% include JB/setup %}

## Procedural City Generation For Dummies Series

<ul>
    {% for page in site.tags.procedural-generation-for-dummies %}
    <li><a href="{{ page.url }}">{{ page.title }}</a></li>
    {% endfor %}
</ul>

My game, Heist, is a cooperative stealth game set in a procedurally generated city. This series of blog posts is an introduction to my approach for rapidly generating entire cities. If you're interested in following the series as it's released you can follow me on [Twitter](https://twitter.com/), [Reddit](https://www.reddit.com/user/martindevans/) or Subscribe to my [RSS feed](http://martindevans.me/rss.xml)

A lot of the code for my game is open source - the code applicable to this article can be found [here](https://bitbucket.org/martindevans/base-citygeneration/src/8aa49400561f02ea812f61171c789b6981265412/Base-CityGeneration/Elements/Building/Design/?at=default). Unfortunately it has some closed source dependencies which means you won't be able to compile it (I hope to fix that soon) but at least you can read along (and criticise my code).

## Building Footprint Generation

After [road generation]({% post_url 2015-12-11-Procedural-Generation-For-Dummies-Roads %}) has created blocks (the gaps between roads) and [lot generation]({% post_url 2015-12-27-Procedural-Generation-For-Dummies-Lots %}) has split these lots up into spaces for individual buildings we need to decide on the shape of the building to place into the lot - this is the *footprint* of the building. A simple example of this is your average house. A house does not entirely fill the lot it's placed in - there could be gardens at the front and back, paths along the sides and space to park a car etc.

Buildings are rarely the same shape all the way up, so once footprint generation has decided on the ground floor we need to run it again for all higher floors to decide how the shape of the building changes. This can simply be the same algorithm used for the ground floor but with the shape of the previous floor input as the starter shape instead of the shape of the lot. My system clips *all* shapes to the input shape, which ensures that nothing can ever be larger than the lot (which would be an error) or overhang a lower floor (which isn't strictly an error, but would look strange).

I think there are two fundamentally different approaches to this problem, each of which is applicable to a different type of building. An additive/growth based approach which is good for houses or old buildings (which frequently have extensions added onto the side) and a subtractive approach which is better for very large commercial buildings which often fill most of their lot. I will briefly discuss how both work, however I have only actually implemented the subtractive approach (since commercial buildings are what I really care about for my game).

## Additive Footprint Generation

This approach works by starting with a simple seed shape (perhaps a cuboid in the center of the lot) and then adding on new shapes or growing existing shapes until the footprint is sufficiently large. This is best for older buildings which have had a lot of extensions added onto the side over time.

First we start off with a simple "seed shape" - this is some very small shape which fits into the lot space a long way from any of the edges. We will then grow this seed shape by adding new parts on to it until some threshold is reached. Growth could proceed either by literally growing the existing shape (cutting it off when it hits certain reserved areas such as paths and gardens) or by adding new bits onto the shape.

<style>
 #image-container img {
 	max-height: 235px;
 	width: auto;
 }
</style>
 
<div id="image-container" align="center">
<img src="/assets/footprint_additive_add.png" width="54%">
</div>

For example here we've got the basic seed shape (blue quadrangle), some reserved areas (gardens and paths) and a shape has been added onto the seed shape (circle). When adding parts like this there are two things to consider:

#### Rotation

A circle doesn't care about rotation but other shapes do! If a square was added onto the side of the house you wouldn't want it welded on at some random angle, instead it should intersect the existing house at 90 degrees. As a general rule any part added to the house should intersect whatever parent part it was attached to with it's internal angle (90 degrees for a square) or *half* it's internal angle if it intersects at a corner.

### Positioning

If we were to attach new parts completely randomly the house could grow to be a *very* odd shape. For example attach another circle to the circle in the above example and that's a bizarre shape! To rectify this we should add two new restrictions. First, different shapes should have different probabilities so a circle has a lower chance of being added than a square. This could quite easily be a tweakable parameter which could result in very different house shapes (e.b. set the chance of all shapes except circles to be zero and you get a pretty interesting architectural style for your city). Second, every new shape added should have a lower probability of a child shape being attached to it. This prevents long chains of shapes being attached to one another. Once again this could be a tweakable parameter leading to different architectural styles with the change of a single value.

## Subtractive Footprint Generation

This is the approach that I have actually implemented in the Heist city generator. Subtractive generation works by starting with the lot shape and slicing bits off. This is best for big buildings which almost completely fill their lot. Also it's a good approach for generating *upstairs* footprints (since the second floor of a building usually looks a lot of the first floor).

From a technical perspective this is a *very* simple technique (simpler than the additive technique). For every floor we have a function which takes a shape, and produces a new shape. The ground floor gets passed in the shape of the lot, underground floors gets passed the shape of the floor above and above ground floors get passed the shape of the floor below. My implementation of this idea works by chaining together a series of simple functions:

<div id="image-container" align="center">
    <img src="/assets/Footprint Bevel.png" width="19%">
    <img src="/assets/Footprint Invert Corners.png" width="19%">
    <img src="/assets/Footprint Shrink.png" width="19%">
    <img src="/assets/Footprint Twist.png" width="19%">
    <img src="/assets/Footprint Twist Clip.png" width="19%">
</div>

Becuase each function is simple it's quite simple to define new functions, which results in a very powerful system for defining new footprints.

### Corners Cases

The immediately obvious problem with this system is *area*. Most of these functions remove some space from the shape which means that if we chain too many together we could end up with a tiny little footprint that can't have a reasonable floorplan. For this reason there are also conditional steps in the pipeline which perform an action, check if the condition is ok, and execute a fallback if not. For example we can define a part of the pipeline which says something like this:

```
!MinArea
{
    Area: 100,
    Action: !Shrink { Distance: 10 },
    Fallback: !Bevel { Distance: 1 }
}
```

Here we're saying try to shrink the footprint by 10 meters (the *Action*), if that results in an area < 100 then instead bevel the corners by 1m (the *Fallback*). This example leads on to another interesting case to consider: sometimes the action you want to take might depend upon the action the previous generator took, this is handled by metadata.

Every generator has a metadata container passed into it which is just a simple in memory key/value store for arbitrary values. Using this you could setup two generators to collaborate. Let's modify the example above so that it sets a flag indicating which choice it took:

```
!MinArea
{
    Area: 100,
    Fallback: !MetaSet
        Type: Boolean
        Key: AreaLimited
        Value: True
}

!MetaPredicate
{
    Key: AreaLimited
    Pass: !Bevel { Distance: 1 }
    Fail: !Shrink { Distance: 10 }
}
```

Now the area check runs and does nothing except set a flag to true. Critically because nothing ever unsets that flag and these generators run in order away from the ground floor once that flag is set all subsequent floors will continue to see it set. The second part then acts on this flag, running a shrink if the flag is unset (i.e. the flag test failed) and running a bevel if the flag is set (i.e. the flag test passed). If we use this same generator for every floor then the building will shrink down to a small footprint and then all subsequent floors will just apply a little bevelling.

## Conclusion

Generating building footprints is an important problem which turns out to be fairly simple to solve if you avoid small residential properties. By chaining together a series of very simple generators some very complex behaviours can be achieved. Next time I'll talk about how the different parts of a building are modelled (in a software engineering sense) by the procedural generation system.
