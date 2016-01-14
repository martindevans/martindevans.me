---
layout: post
category : game-development
tags : [game-development, procedural-generation, procedural-generation-for-dummies]
tagline : In Which The Heavens Are Built
title: "Procedural Generation For Dummies: Galaxy Generation"
---
{% include JB/setup %}

## Procedural <strike>City</strike> Generation For Dummies Series

<ul>
    {% for page in site.tags.procedural-generation-for-dummies %}
    <li><a href="{{ page.url }}">{{ page.title }}</a></li>
    {% endfor %}
</ul>

My game, Heist, is a cooperative stealth game set in a procedurally generated city. This series of blog posts is an introduction to my approach for rapidly generating entire cities. This post is a little bit of a divergence away from cities to talk about a fun little side project I worked on: Galaxy Generation.

The code related to this article is open source and can be found [here](https://github.com/martindevans/CasualGodComplex). It's a completely standalone galaxy generation library which you can use in your own projects.

## Galaxy Generation

For my city generator the system is hierarchical - a single generator just knows how to generate one level of the city and then invokes more generators to fill in the gaps. For example a building generator knows how to create building shapes and choose which floors to use but then simply invokes a floor generator for each floor to actually fill in the details of the floor plan.

//TODO: insert animation of same galaxy with and without swirl applied

The galaxy generator works in a similar way; the high level galaxy generators invokes separate generators for different parts of the galaxy such as the core and the arms. However, there is a major difference: when a nested generator creates a star the parent generator has a chance to modify it. This allows me to generate the core and the arms and then apply a swirl effect to all the stars later which vastly simplifies the implementation of the sub-generators.

Let's look a the basic generators one by one, from the bottom up...

### Sphere

//TODO: insert an animation of a sphere

[This](https://github.com/martindevans/CasualGodComplex/blob/master/CasualGodComplex/Galaxies/Sphere.cs) is the simplest of all of the generators; it simply generates a roughly spherical blob of stars. The blob of stars is denser in the middle and slowly fades to nothing as distance increases. This is achieved through a *normal distribution* - more commonly known as a *bell curve*.

//TODO: this image credited to wikipedia: https://upload.wikimedia.org/wikipedia/commons/8/8c/Standard_deviation_diagram.svg

A normal distribution is a probability distribution with a higher probability of things being in the center. As you can see from the diagram above there is a 68.2% chance of something being within 1 *deviation* of the center, a 27.2% chance of something being within 2 deviations, a 4.2% chance of being within 3 and so on. The *deviation* is a parameter which you can pick, so a very large value will get a low density blob of stars spread out a long way and a very small value will get a very high density blob of stars clumped tightly together. My implementation allows you to specify the deviation separately for each axis, so you can actual generate oblate spheroids with this.

### Cluster

//TODO: insert an animation of a cluster

The [cluster generator](https://github.com/martindevans/CasualGodComplex/blob/master/CasualGodComplex/Galaxies/Cluster.cs) is similar to the sphere generator. However, instead of placing *stars* in a loosely spherical blob it places *spheres of stars*. This generator is inspired by a vaguely scientific basis of how galaxies work - stars are generated in nebulae which will tend to form a clump of stars. Additionally large masses will pull in nearby stars and form clumps. This is used most prominently in the core of the galaxy where a large number of clusters are placed into a relatively tight area (using a small *standard deviation*) to simulate the super high density galactic centre we see in real galaxies.

### Spiral

//TODO: insert an animation of a spiral galaxy

This is the generator which really brings the others together to form something that looks like a real galaxy. Near the start I mentioned how higher level generators in this system have a chance to modify the stars generated at lower levels - this capability is used by the spiral galaxy i two ways.

Firstly all generated stars have a *swirl* effect applied to them to introduce the appearance of rotation. All the parts of the galaxy are generated as if there were no rotation at all (e.g. the arms are dead straight out from the center) and then the spiral galaxy applies a swirl modifier to bend the arms. The [swirl](https://github.com/martindevans/CasualGodComplex/blob/master/CasualGodComplex/StarExtensions.cs#L22) method rotates a star around a given axis based on the distance from the center.

Secondly there is a *void* right at the center of the galaxy (to simulate the location of a supermassive blackhole). All stars generated within this void are simply deleted.

Let's have a look at the three parts of the spiral generator:

##### Background

//TODO: insert an animation of the background

The [background](https://github.com/martindevans/CasualGodComplex/blob/master/CasualGodComplex/Galaxies/Spiral.cs#L88) is simply a huge *sphere* with the standard deviation set to the size of the galaxy. This means that the galactic disk will have some stars above and below and there will be a very low density halo of stars scattered around the galaxy in all directions. The swirl effect is not applied to these stars.

##### Galactic Core

//TODO: insert an animation of the core with and without swirl

The [galactic core](https://github.com/martindevans/CasualGodComplex/blob/master/CasualGodComplex/Galaxies/Spiral.cs#L93) is a very tight *cluster*, with the standard devitation set to be about 5-10% of the size of the galaxy. The swirl effect is five times stronger on these stars (and is naturally stronger at short distances from the origin) so the center is *very* strongly rotated around - giving the impression of a chaotic galactic center wrapped around a supermassive blackhole. What started off as spheres distributed around the center ends up many tiny little arms wrapped right around the core.

##### Arms

//TODO: insert an animation of arms with and without swirl

The [arms](https://github.com/martindevans/CasualGodComplex/blob/master/CasualGodComplex/Galaxies/Spiral.cs#L113) begin life as roughly straight lines of *spheres*. Each sphere is initially generated somewhere along a dead straight line and is then rotated to the middle of it's respective arm - with a little random variance to make the arms a little more ragged. After all this the swirl effect is applied to the arms which gives the entire galaxy the appearance of rotation.

Other galaxy types could be generated by varying how the arms are created. For example a bar galaxy could *not* apply the swirl effect within a certain distance of the galactic core - which woud cause the arms to remain straight near the core and thus create a solid bar.

## Colour

You may noticed that these examples all have colours assigned to the stars. These colours are generated by picking the *temperature* of the star and then converting that temperature into a colour (assuming the star is a black body radiator). This isn't a particularly scientifically accurate system for two reasons. Firstly the temperature is picked using a normal distribution; however star temperatures are unlikely to be normally distributed in reality. I couldn't find any information about the real distribution though, so a normal distribution will do. Secondly stars are not true black body radiators due to various elements in their atmosphere absorbing emitted radiation. However a black body estimate is a close enough estimate.

## Names

You can't see this in the renderings above, but all the stars in these galaxies have names assigned to them. This generates names such as:

 - Superba
 - Gamma-77
 - Alpha Alnati II
 - Ham 44
 - A12

There are several different name generators which are randomly chosen between. Having multiple generators ensure there are entirely different *styles* of names in the pool - this fixes a common problem with procedural generation where things become boring because the patterns become obvious.

The most basic is simply a markov chain which was taught with a large set of [real star names](https://github.com/martindevans/CasualGodComplex/blob/master/CasualGodComplex/StarName.cs#L13) as well as [fictional star names](https://github.com/martindevans/CasualGodComplex/blob/master/CasualGodComplex/StarName.cs#L107). This generates names such as *Superba*.

A slightly more complex strategy applies random prefixes and suffixes to markov generated names. There is a slight (1%) chance this could chain *further* prefixes and suffixes. This could generate names like *Alpha Alnati II* (greek letter prefix and roman numeral suffix), *San Gamma* (prefix), *Xendi Kappa* (greek letter suffix) or *San Gamma Gorgon II 44.7* (2 prefixes, 2 suffixes).

Another strategy simply generates names like a scientific index with a letter and an integer. This generates names such as *A-21*, *C-34* or *D-07*.

Finally there is a strategy which picks names from a pre-set list. This list doesn't have many names on it at the moment, but can obviously generate completely unique names (perhaps associated with some special gameplay event at that star).

Different strategies have weights associated with them so the majority of stars have scientifically indexed name. There's a lower chance of markov names (with prefixes and suffixes). Finally the very lowest chance is for unique names (an extension to this could remove unique names from the list, so they are truly unique).

//TODO: Great big galaxy






