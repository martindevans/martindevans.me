---
layout: post
category : Heist
tags : [heist, procedural-generation-series-tech]
tagline : In Which Long String Of Meaningless Text Are Given Meaning
title : How Does Procedural Generation Work?
---
{% include JB/setup %}


## TL;DR

L-Systems are about replacing lines of meaningless text with cool stuff... like most programming, really.

## But There's A Hole In My Bucket...

So we've talked about [what procedural generation is for](/Heist/2012-11-18-What-Is-Procedural-Generation.md/), and [what it isn't](/Heist/2012-11-23-What-Isn't-Procedural-Generation.md/) but how does it _really_ work?

Ultimately procedural generation is just about building algorithms to create art – of course, there's no one magic algorithm to do that! However, there are a few basic elements that often appear in relation to procedural generation algorithms. Big disclaimer: these are the things that often seem to appear in relation to *me* thinking about how to solve *my* procedural generation problems; I'm certain that other things could be added to this list. If you think of anything missing tell me about it, and I'll probably learn something new. Ordered roughly by how complex they are to use, from least to most complex:

 - Noise
 - Voronoi diagrams
 - L-Systems
 - Markov chains
 
## Noise

Noise is actually quite hard to define. Everyone understands noise from their day to day experiences as "an unwanted random addition to a signal" – think annoying traffic noises added to the "signal" coming from your car radio, or unwanted background chatter added to the "signal" of the conversation you're trying to have. Another definition that wikipedia gives, which I think is more relevant, is: "noise can be considered random unwanted data without meaning". Why is this more relevant? Well, sometimes we *want* random data without meaning. Imagine the patterns in a piece of marble. They have no meaning and are randomly laid out, so if we wanted to procedurally generate a marble pattern it stands to reason we'd need some noise.

The most well known kind of noise (in the field of computer graphics anyway) is *Perlin Noise*

![Perlin Noise](http://upload.wikimedia.org/wikipedia/commons/d/da/Perlin_noise.jpg)

The point of perlin noise is that it has pseudo random features _which are all the same size_. This is really useful for many things – if you know roughly how large the noise features are going to be, you can more carefully control the way in which you use the noise to create certain effects. For example if you're generating landscapes you could add together many layers of perlin noise with different scales. You use the layer with features a few feet wide to control little bumps in the landscape and you use the layer with features a few kilometres wide to control the overall geography of the landscape. This is actually how Minecraft generates a lot of the landscape: biomes are selected with overlaid heat and moisture maps, mountains are generated with large scale simplex noise added to small scale simplex noise for hills and finally caves are multiple levels of simplex noise _subtracted_ off the main landscape.

Since inventing perlin noise Ken Perlin has since created simplex noise, which has several advantages over perlin noise. Simplex noise has the same features as perlin noise but is far faster to compute. If you're interested in how simplex noise works (or how it differs from perlin noise) check out [Simplex Noise Demystified](http://webstaff.itn.liu.se/~stegu/simplexnoise/simplexnoise.pdf).

## Voronoi Diagrams

<style><!-- Yes, style tag in body, what you gonna do? -->
    path {
      fill: yellow;
      stroke: #000;
    }
     
    circle {
      fill: #fff;
      stroke: #000;
      pointer-events: none;
    }
     
    .PiYG .q0-9{fill:rgb(197,27,125)}
    .PiYG .q1-9{fill:rgb(222,119,174)}
    .PiYG .q2-9{fill:rgb(241,182,218)}
    .PiYG .q3-9{fill:rgb(253,224,239)}
    .PiYG .q4-9{fill:rgb(247,247,247)}
    .PiYG .q5-9{fill:rgb(230,245,208)}
    .PiYG .q6-9{fill:rgb(184,225,134)}
    .PiYG .q7-9{fill:rgb(127,188,65)}
    .PiYG .q8-9{fill:rgb(77,146,33)}
</style>

<a href="http://bl.ocks.org/4060366"><svg id="voronoi" width="960" height="500" class="PiYG"></svg></a>

<script src="http://d3js.org/d3.v3.min.js">
</script>

<script type="text/javascript">
    var width = 960,
        height = 500;
     
    var vertices = d3.range(75).map(function(d) {
      return [Math.random() * width, Math.random() * height];
    });
     
    var svg = d3.select("#voronoi")
        .on("mousemove", update);
     
    svg.selectAll("path")
        .data(d3.geom.voronoi(vertices))
      .enter().append("path")
        .attr("class", function(d, i) { return i ? "q" + (i % 9) + "-9" : null; })
        .attr("d", function(d) { return "M" + d.join("L") + "Z"; });
     
    svg.selectAll("circle")
        .data(vertices.slice(1))
      .enter().append("circle")
        .attr("transform", function(d) { return "translate(" + d + ")"; })
        .attr("r", 2);
     
    function update() {
      vertices[0] = d3.mouse(this);
      svg.selectAll("path")
          .data(d3.geom.voronoi(vertices)
          .map(function(d) { return "M" + d.join("L") + "Z"; }))
        .filter(function(d) { return this.getAttribute("d") != d; })
          .attr("d", function(d) { return d; });
    }
</script>

Voronoi diagrams are dead simple to explain and have many applications, both in science and art. Imagine a load of points scattered across a plane, which we'll call seed points. Now we want to classify every single point on the plane into a region. To do this, we simply put each point into the same region as the closest seed point. If you inspect the demo above you'll see that's what is going on – each coloured region shows the set of points which are closest to the (white dot) seed point in that region. Naturally, this definition extends into as many dimensions as you like, most usefully 2D and 3D of course.

If noise is good for generating continuous things, voronoi noise is good for generating discontinuous things. For example, you could use voronoi noise as the basis for generating city blocks by placing roads along the edges of the regions and filling in the regions with buildings and maybe some minor roads for large blocks.

If you're interested in how voronoi diagrams and noise can be used together check out [this fantastic blog post](http://www-cs-students.stanford.edu/~amitp/game-programming/polygon-map-generation/) about procedurally generating an island.

## L-Systems

<!-- TEMPORARY
<canvas id="lsystem" width="256" height="256"></canvas>
<script>
    var string = "X";
    var rules = {
        "X" : "F-[[X]+X]+F[+FX]-X",
        "F" : "FF"
    };
    
    function produce(input) {
        var output = "";
        for (var i = 0; i < input.length; i++) {
            var rule = rules[input[i]];
            if (rule) {
                output += rule;
            } else {
                output += input[i];
            }
        }
        return output;
    }
    
    var canvas = document.getElementById("lsystem");
    var context = canvas.getContext("2d");
    
    function draw(input) {
        context.clearRect(0, 0, canvas.width, canvas.height);   //Doesn't work!
        canvas.width = canvas.width;
        context.strokeStyle = "green";
        
        var stack = [];
        var state = {
            X: canvas.offsetWidth / 2,
            Y: canvas.offsetHeight,
            Angle: -Math.PI / 2,
        }
        
        function drawForward() {
            context.moveTo(state.X, state.Y);
            state.X = state.X + Math.cos(state.Angle) * 3;
            state.Y = state.Y + Math.sin(state.Angle) * 3;
            context.lineTo(state.X, state.Y);
            context.stroke();
        }
        
        for (var i = 0; i < input.length; i++) {
            var c = input[i];
            if (c == 'F') {
                drawForward();
            } else if (c == '-') {
                state.Angle -= 1 * (0.2 + Math.random() * 0.8);   //Turn left 25 degrees
            } else if (c == '+') {
                state.Angle += 1 * (0.2 + Math.random() * 0.8);   //Turn right 25 degrees
            } else if (c == '[') {
                stack.push({
                    X: state.X,
                    Y: state.Y,
                    Angle: state.Angle
                });
            } else if (c == ']') {
                state = stack.pop();
            }
        }
    }
    
    setInterval(function()
    {
        var str = string;
        for (var i = 0; i < 5; i++) {
            str = produce(str);
        }
        draw(str);
    }, 100);
</script>
-->

Noise and Voronoi regions are good ways to generate largely meaningless data, but what about when we want data which is in some way meaningful? L-Systems were originally invented by a biologist to simulate the growth of mould and it has turned out that they're good at generating many other patterns. An L-System can be imagined as a string rewriting system – you start off with some string and then, according to a set of rules, you replace all the letters in the string with other sequences of letters and you keep doing this as many times as you like.

That's a bit abstract, so here's an example. The trees above are generated with this starting string:

 - X
 
and these rules:

 - Replace "X" with "F-[[X]+X]+F[+FX]-X"
 - Replace "F" with "FF"
 - If not "X" or "F", don't change it
 
That's it! Let's step through a few iterations of this.

 1. X
 2. F-[[X]+X]+F[+FX]-X
 3. FF-[[F-[[X]+X]+F[+FX]-X]+F-[[X]+X]+F[+FX]-X]+FF[+FFF-[[X]+X]+F[+FX]-X]-F-[[X]+X]+F[+FX]-X
 
Now these strings aren't really looking terribly useful – however does that string describe that tree? In this case the letters are taken as commands to a turtle graphics system:

 - "F" means draw a short line forward
 - "-" means turn left some small randomised amount
 - "+" means turn right some small randomised amount
 - "[" means save the current position and angle on a stack
 - "]" means restore the previous position and angle off the stack
 
L-Systems don't have to just be string rewriting systems either – that's just a convenient way to talk about them. For example Heist uses what amounts to an L-System in it's city generation, but is implemented very differently. Each script is a node which places a bit of geometry or a few child nodes. For example, a "City" is a node, which places down a load of building and road nodes. A "Road" is a node which places a load of pavement and streetlamp nodes. A "Building" is a node which places a load of window, door and room nodes inside itself. If you think about it, this is an L-System – we have symbols:

 - City
 - Road
 - Building
 - Pavement
 - Street lamp
 - Window
 - Door
 - Room
 
and we have rules:

 - City => Road, Building
 - Road => Street lamp, pavement
 - Building => Door, Window, Room
 
## Markov Chains

<!-- Editors Note: Don't edit -->
_data but as a thing that type of areas has several stages of the name and then another small game projects of the game but has IP address pairs it to put up Sold So here are procedurally generated by pasting the name General Chat Peer Assigns Pipe General Chat Time_
<!-- Editors Note: Resume editing -->

L-Systems are a good way to generate data which is structured and meaningful in a way based on solid rules, but a lot of the world doesn't have solid rules which can be simply expressed to an L-System. Instead, a lot of the world is based on fuzzy half rules which no one really fully understands. This is where Markov chains shine.

Markov chains are for generating strings of values which are in some way coherent, or conform to unspoken or intuitive rules. To express the rules to the system you simply given it some existing data which conforms to these rules, and it will generate more data in the same trend. The paragraph of nonsense above was generated by using my entire blog as the definition of how text is written and then asking for more text. Markov chains have been used in games to generate names of people or places. This is a perfect example of where the rules for the system are complex, difficult to express to a computer and are intuitively understood by the reader. Simply give the Markov generator a load of place names and now you have an almost infinite supply of new place names – perfect!

The way in which this works is actually very simple. From the example data the Markov chain generator works out the probability of any given symbol being followed by other particular symbols. To generate new data the system picks a random start symbol and then just randomly picks subsequent symbols weighted by how common they are. There are _loads_ of applications of this:

 - Generate Character Names
 - Generate Road Names
 - Generate Strings of Building Types (Shops often go next to other shops, but sometimes offices and occasionally houses)
 - Generate [Music](http://thepasqualian.com/?p=1831) (This is totally awesome, I didn't think it would sound so convincing!)
 
## Putting It All Together

None of these techniques are good enough to generate complicated things on their own. The point is that these four techniques (and others) can act as basic building blocks for much larger procedural generation algorithms. It becomes the job of the artist not to create art, but to pick out the building blocks and the parameters for algorithms to create the kind of art that they want.

I mentioned it before, but check out [this blog post](http://www-cs-students.stanford.edu/~amitp/game-programming/polygon-map-generation/) for an example of putting bits together. He uses perlin noise and voronoi diagrams to generate a landscape with roads and biomes.
