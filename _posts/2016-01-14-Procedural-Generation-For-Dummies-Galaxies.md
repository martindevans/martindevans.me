---
layout: post
category : game-development
tags : [game-development, procedural-generation, procedural-generation-for-dummies]
tagline : In Which The Heavens Are Built
title: "Procedural Generation For Dummies: Galaxy Generation"
---

<script src="//cdnjs.cloudflare.com/ajax/libs/three.js/r71/three.min.js"></script>
<script>
renderFuncs = [];
function animate() {

    requestAnimationFrame(animate);

    for (index in renderFuncs) {
        (renderFuncs[index])();
    }
}
animate();

function displayGalaxy(containerId, stars) {
    var camera, scene, renderer;
	var mesh;
    var container = document.getElementById(containerId);
    
    var camera = new THREE.PerspectiveCamera(20, container.clientWidth / container.clientHeight, 5, 3500);
    camera.position.z = 2550;

    var scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x050505, 2000, 3500);

    var particles = stars.length;
    var geometry = new THREE.BufferGeometry();
    var positions = new Float32Array(particles * 3);
    var colors = new Float32Array(particles * 3);
    var color = new THREE.Color();
    var n = 1000, n2 = n / 2;
    for (var i = 0; i < positions.length; i += 3) {

        var star = stars[i / 3];

        // positions
        positions[i] = star.x;
        positions[i + 1] = star.y;
        positions[i + 2] = star.z;

        // colors
        var vx = (star.r);
        var vy = (star.g);
        var vz = (star.b);
        color.setRGB(vx, vy, vz);

        colors[i] = color.r;
        colors[i + 1] = color.g;
        colors[i + 2] = color.b;
    }

    geometry.addAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.addAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.computeBoundingSphere();

    var material = new THREE.PointCloudMaterial({ size: 15, vertexColors: THREE.VertexColors });

    var particleSystem = new THREE.PointCloud(geometry, material);
    scene.add(particleSystem);

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.CreationTime = new Date();
    renderer.setClearColor(scene.fog.color);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(container.clientWidth, container.clientHeight);

    container.appendChild(renderer.domElement);

    window.addEventListener('resize', function() {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    }, false);

    var speed = Math.random() * 0.75 + 0.5;
    renderFuncs.push((function() {

		var time = Date.now() * 0.001;

		particleSystem.rotation.x = 0.85;
		particleSystem.rotation.y = -time * 0.13 * speed;

		renderer.render(scene, camera);
	}));
}
</script>

## Procedural <strike>City</strike> Generation For Dummies Series

<ul>
    {% for page in site.tags.procedural-generation-for-dummies %}
    <li><a href="{{ page.url }}">{{ page.title }}</a></li>
    {% endfor %}
</ul>

My game, Heist, is a cooperative stealth game set in a procedurally generated city. This series of blog posts is an introduction to my approach for rapidly generating entire cities. This post is a fun diversion away from city generation to explore a weekend project from a few months back: Galaxy Generation!

The code related to this article is open source and can be found [here](https://github.com/martindevans/CasualGodComplex) and [here](https://github.com/martindevans/MarvellousMarkovModels). It's a complete C\#  galaxy generation library which you can use in your own projects.

## Galaxy Generation

<style>
.ar169-wrapper {
    width: 100%;
    display: inline-block;
    position: relative;
}

.ar169-wrapper:after {
    padding-top: 56.25%;
    display: block;
    content: '';
}

.ar169 {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background-color: black;
  color: white;
}
</style>

For my city generator the system is hierarchical - a single generator just knows how to generate one level of the city and then invokes more generators to fill in the gaps. For example a city generator just knows how to place roads, which then calls a city block generator to place buildings, which then invokes a floor generator to place rooms etc.

The galaxy generator works in a similar way; the high level galaxy generator invokes separate generators for different parts of the galaxy such as the core and the arms. However, there is a major difference: when a nested generator creates a star the parent generator has a chance to *modify* it. This allows me to generate the core and the arms and then apply a swirl effect to all the stars later which vastly simplifies the implementation of the sub-generators.

<div class="ar169-wrapper">
  <div class="ar169" id="big-demo-galaxy"></div>
</div>

Let's look a the basic building blocks one by one...

### Sphere

<div class="ar169-wrapper">
  <div class="ar169" id="sphere-demo-galaxy"></div>
</div>

[This](https://github.com/martindevans/CasualGodComplex/blob/master/CasualGodComplex/Galaxies/Sphere.cs) is the simplest of all of the generators; it simply generates a roughly spherical blob of stars. The blob of stars is denser in the middle and slowly fades to nothing as distance increases. This is achieved through a *normal distribution* - more commonly known as a *bell curve*.

<center>
    <img src="https://upload.wikimedia.org/wikipedia/commons/8/8c/Standard_deviation_diagram.svg">
    <br />
    <strong>Standard Deviation Graph - Wikimedia</strong>
</center>
<br />

A normal distribution is a probability distribution with a higher probability of things being in the center. As you can see from the graph above there is a 68.2% chance of something being within 1 *deviation* of the center, a 27.2% chance of something being within 2 deviations, a 4.2% chance of being within 3 and so on. The *deviation* is a parameter which you can pick, so a very large value will get a low density blob of stars spread out a long way and a very small value will get a very high density blob of stars clumped tightly together. My implementation allows you to specify the deviation separately for each axis, so you can actual generate oblate spheroids with this.

In the example above is a sphere with the deviation the same on all axes, so it's roughly the same in all directions but has no other apparent structure - it has a very natural appearance.

### Cluster

<div class="ar169-wrapper">
  <div class="ar169" id="cluster-demo-galaxy"></div>
</div>

The [cluster generator](https://github.com/martindevans/CasualGodComplex/blob/master/CasualGodComplex/Galaxies/Cluster.cs) is similar to the sphere generator. However, instead of placing individual *stars* according to a normal distribution it places *other generators*. In the example above I have generated a clusters of spheres, so we have a loose collection of blobs of stars. This is a perfect example of how a generator calls another, simpler, generator to use as a building block.

This generator is inspired by a vaguely scientific basis of how galaxies work - stars are generated in nebulae which will tend to form a clump of stars. Additionally large masses will pull in nearby stars and form even larger groups. This is used most prominently in the core of the galaxy where a large number of clusters are placed into a relatively tight area to simulate the super high density galactic centre we see in real galaxies (around something of immensely high mass such as a supermassive blackhole).

### Spiral

<div class="ar169-wrapper">
  <div class="ar169" id="spiral-demo-galaxy-2"></div>
</div>

This is the generator which really brings the others together to form something that looks like a real galaxy. Near the start I mentioned how higher level generators in this system have a chance to modify the stars generated at lower levels - this capability is used by the spiral galaxy in two ways.

Firstly all generated stars have a *swirl* effect applied to them to introduce the appearance of rotation. All the parts of the galaxy are generated as if there were no rotation at all (e.g. the arms are dead straight out from the center) and then the spiral galaxy applies a swirl modifier to bend the arms. The [swirl](https://github.com/martindevans/CasualGodComplex/blob/master/CasualGodComplex/StarExtensions.cs#L22) method rotates a star around a given axis based on the distance from the center.

Secondly there is a *void* right at the center of the galaxy (to simulate the location of a supermassive blackhole). All stars generated within this void are simply deleted.

Let's have a look at the three parts of the spiral generator:

#### Background

<div class="ar169-wrapper">
  <div class="ar169" id="spiral-bg"></div>
</div>

The [background](https://github.com/martindevans/CasualGodComplex/blob/master/CasualGodComplex/Galaxies/Spiral.cs#L88) is simply a huge *sphere* with the standard deviation set to the size of the galaxy. This means that the galactic disk will have some stars above and below and there will be a very low density halo of stars scattered around the galaxy in all directions. The swirl effect is not applied to these stars.

#### Galactic Core

<div class="ar169-wrapper" style="width:48%">
  <div class="ar169" id="spiral-core-notwist"></div>
</div>
<div class="ar169-wrapper" style="width:48%">
  <div class="ar169" id="spiral-core-twist"></div>
</div>

The [galactic core](https://github.com/martindevans/CasualGodComplex/blob/master/CasualGodComplex/Galaxies/Spiral.cs#L93) is a very tight *cluster*, with the standard devitation set to be about 5-10% of the size of the galaxy. The swirl effect is five times stronger on these stars (and is naturally stronger at short distances from the origin) so the center is *very* strongly rotated around - giving the impression of a chaotic galactic center wrapped around a supermassive blackhole. What started off as spheres distributed around the center ends up many tiny little arms wrapped right around the core.

In the example above you can see the galactic core without swirl (on the left) and with swirl (on the right).

#### Arms

<div class="ar169-wrapper" style="width:48%">
  <div class="ar169" id="spiral-arm-notwist"></div>
</div>
<div class="ar169-wrapper" style="width:48%">
  <div class="ar169" id="spiral-arm-twist"></div>
</div>

The [arms](https://github.com/martindevans/CasualGodComplex/blob/master/CasualGodComplex/Galaxies/Spiral.cs#L113) begin life as a series of spheres generated (roughly) along a line. The swirl effect pulls these straight arms around into a nicer shape which gives the entire galaxy the appearance of rotation.

Other galaxy types could be generated by varying how the arms are created. For example a bar galaxy could *not* apply the swirl effect within a certain distance of the galactic core - which would cause the arms to remain straight near the core and thus create a solid bar. Alternatively some small arms could be generated between the larger ones with lower density of stars, or perhaps starting away from the core.

In the examples above you can see some arms generated without swirl (on the left) and with swirl (on the right).

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

The most basic is simply a markov chain which was taught with a large set of [real star names](https://github.com/martindevans/CasualGodComplex/blob/master/CasualGodComplex/StarName.cs#L13) as well as [fictional star names](https://github.com/martindevans/CasualGodComplex/blob/master/CasualGodComplex/StarName.cs#L107). This generates names such as *Superba* and *Alnati* - single nonsense words. The implementation of the markov chains is my own open source library [Marvellous Markov Models](https://github.com/martindevans/MarvellousMarkovModels).

A slightly more complex strategy applies random prefixes and suffixes to markov generated names. There is a slight (1%) chance this could chain *further* prefixes and suffixes. This could generate names like *Alpha Alnati II* (greek letter prefix and roman numeral suffix), *San Gamma* (san prefix), *Xendi Kappa* (greek letter suffix) or *San Gamma Gorgon II 44.7* (2 prefixes, 2 suffixes).

Another strategy simply generates names as if from a scientific index; with a letter and an integer. This generates names such as *A-21*, *C-34* or *D-07*.

Finally there is a strategy which picks names from a pre-set list. This list doesn't have many names on it at the moment, but can obviously generate completely unique names (perhaps associated with some special gameplay event at that star). An obvious extension which I have not implemented would be for this name generator to *remove* unique names from the system once used to ensure that they are *truly* unique.

Different strategies have weights associated with them so the majority of stars have scientifically indexed name. There's a lower chance of markov names (with prefixes and suffixes). Finally the very lowest chance is for unique names.

<div class="ar169-wrapper">
  <div class="ar169" id="final-spiral"></div>
</div>

<script>
(function() {

    function galaxy(container, dataPath) {
        $.ajax({ url: dataPath })
        .done(function(data) {
            //Yeah yeah, eval is evil. Bite me
            displayGalaxy(container, eval(data));
        });
    }

    galaxy("big-demo-galaxy", "assets/demo-galaxy.js");
    galaxy("sphere-demo-galaxy", "assets/sphere-galaxy.js");
    galaxy("cluster-demo-galaxy", "assets/cluster-galaxy.js");
	galaxy("spiral-demo-galaxy-2", "assets/spiral-galaxy-2.js");
    galaxy("spiral-bg", "assets/spiral-bg.js");
    galaxy("spiral-core-notwist", "assets/spiral-core-notwist.js");
    galaxy("spiral-core-twist", "assets/spiral-core-twist.js");
    galaxy("spiral-arm-notwist", "assets/spiral-arm-notwist.js");
    galaxy("spiral-arm-twist", "assets/spiral-arm-twist.js");
    galaxy("final-spiral", "assets/final-spiral-demo.js");

})();

</script>





