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

After [road generation](/game-development/2015/12/11/Procedural-Generation-For-Dummies-Roads/) has created blocks (the gaps between roads) and [lot generation](/game-development/2015/12/27/Procedural-Generation-For-Dummies-Lots/) has split these lots up into spaces for individual buildings we need to decide on the shape of the building to place into the lot - this is the *footprint* of the building. A simple example of this is your average house. A house does not entirely fill the lot it's placed in - there could be gardens and the front or back, paths along the side or a space to park a car etc.

Once footprint generation is done for the ground floor it still remains to decide the shape of all the other floors! This can simply be the same algorithm but with the shape of the previous floor input as the starter shape instead of the shape of the lot. My system clips *all* shapes to the input shape, which ensures that nothing can ever be larger than the lot (which would be an error) or overhang a lower floor (which isn't strictly an error, but would look strange).

I think there are two fundamentally different approaches to this problem, each of which is applicable to a different type of building. An additive/growth based approach which is good for houses or old buildings (which frequently have extensions added onto the side) and a subtractive approach which is better for very large commercial buildings which often fill most of their lot. I will briefly discuss how both work, however I have only actually implemented the subtractive approach (since commercial buildings are what I really care about for my game).

## Additive Footprint Generation

This approach works by starting with a simple seed shape (perhaps a cuboid in the center of the lot) and then adding on new shapes or growing existing shapes until the footprint is sufficiently large. This is best for old buildings which have had a lot of extensions added onto the side over time.

#### Choose Seed Shape

Firstly we're going to need a shape to start growing. The actual shape isn't particularly important (since we're going to grow out and completely subsume this shape) but it's location is. My approach would be to shrink in the edges of the lot by some amount on each edge, for example in by a path width on the sides leading from the road and in by some random garden width on the sides next to the road and then to place a shape in the middle of whatever area is left.

<style>
 #image-container img {
 	max-height: 235px;
 	width: auto;
 }
</style>
 
<div id="image-container" align="center">
<img src="/assets/footprint_additive_shrink.png" width="54%">
</div>

Above is a simple example of this. We have some arbitrary shape defined by lot generation in black. We then randomly choose whether or not to place a path along a side - in this case we chose to place a path along the left side. Then we randomly choose where to place gardens and how lage to make them - in this case we have both a front and a back garden. These choices would require quite careful handling in certain scenarios, for example a lot with *multiple* roads bordering it or a more complex shape without a single side leading from back to front.

#### Grow The Shape

Once we have a seed shape we're going to grow it out. This is a fairly simply process of choosing random shapes from a palette and and adding them to a random location on the shape. When a shape is added it should have a center point which is *inside* the existing shape, but not too far from the edge - this ensures there is always a good connection to the new shape *but* the new shape is not entirely contained within the existing shape.

<div id="image-container" align="center">
<img src="/assets/footprint_additive_add.png" width="54%">
</div>

In the example above we've added a circle on to the house. The center of the circle (marked with a cross) is exactly on the edge of the starter shape. I deliberately chose a circle here because it's rotation invariant, with more complex shapes we need to take into account rotation.

With more complex shapes we *could* just add them with a random rotation but this wouldn't look good - extensions to houses are rarely stuck on at a random angle! Instead each shape should be put in place and then rotated until one of the intersections with the existing shape is a multiplier of the internal angle of the shape being added. Here are some examples:

<div id="image-container" align="center">
<img src="/assets/footprint_additive_square.png" width="30%">
<img src="/assets/footprint_additive_octagon.png" width="30%">
<img src="/assets/footprint_additive_hexagon.png" width="30%">
</div>

The internal angles of a square are 90 degrees, so the intersection with the existing shape is a multiple of 90. In this case exactly 90 degrees. The internal angles of an octagon are 45 degrees, so the intersection with the existing shape is a multipler of 45 - in this case 135 degrees.

As we grow the shape another thing to consider is that we don't want to grow into certain spaces - for example building over the path from front to back would be bad. For small areas like the path we can simply clip the new shape to the smaller footprint. However for larger spaces like the gardens it's ok to grow into them a little, so instead we weight all vertices by how far into these "forbidden" spaces they are - when choosing where to add new shapes we can take into account the weight and make it less likely to add new shapes in forbidden spaces.

#### Repeat Until Complete

We can keep adding shapes, but when do we stop? There are two stopping conditions I can think of; either we stop because there is no more space to grow into, or the building is "large enough".

The first case is actually harder than it sounds to implement becuase we don't necessarily have hard limits. If we have soft limits (like the garden example from earlier) there could be a lot of valid locations to add a shape *but* they could all be very low probability. The best solution to this seems likely to be checking the *total* probability of all valid locations and terminating if we select a random number not in that range. That way as the remaining space becomes less and less desirable to build on there's an ever higher chance the building will stop growing.

No procedural generator stands alone - everything is invoked by something at a higher level. Before footprint generation is invoked we could select a house style and use that to drive the footprint generation - for example passing in a *target size* parameter, when that size is achieved we stop growing (maybe with some probability which grows exponentially the more the target size is exceeded). We could also bias the shape selection based on the house style, e.g. a certain style causes a lot more circles to be selected, resulting in a very bulbous footprint.

## Subtractive Footprint Generation

This is the approach that I have actually implemented in the Heist city generator. Subtractive generation works by starting with the lot shape and removing bits.


