---
layout: post
category : Heist
tags : [heist, procedural-generation-series-tech]
tagline : In Which Some History Is Discussed
title : What Is Procedural Generation?
---
{% include JB/setup %}


## TL;DR

An overview of what Procedural generation is and why it is useful.

## What's All The Fuss About?

[Game development budgets](http://www.wired.com/gamelife/2011/02/dice-blockbuster-games/) are exploding. Driven largely by demands for super realism or for ever larger worlds, dev teams are growing to encompass more and more people to produce more and more content required. This is a problem for a couple of reasons:

### Big Budgets Kill Creativity

If a company spends $50,000,000 making a game they want to be _very_ sure that it will sell! That means that no one is willing to invest that huge budget in a _new_ idea because no one knows if it will flop, instead it makes business sense to invest in new iterations of existing sequels for a safe return.

### Hand Made Content Kills Replayability

You buy a big budget game. Play the hand-crafted, highly linear, single player campaign. Then have a blast killing people on the 5 multiplayer maps available.

Well, that kinda sounds like a bad way to spend $60 doesn't it? There's no point playing the single player again, you already know how it ends! And those built in multiplayer maps start to get a bit old after a while.

## Fundamentally...

The problem is that hand crafted content costs _lots_ and it just isn't viable to spend all that extra time and money on a more replayable experience. A studio could dedicate the resources building a branching storyline with completely different choices at every opportunity and hundreds of totally different endings but they're going to make development cost 10x more, and most players will still only play once or twice anyway so that definitely isn't a good investment.

What's really needed is another entire approach to developing content. An approach where, after an initial cost, you can build lots and lots of content very quickly and for almost no extra cost.

## Surprise Reveal

That's what procedural generation is (no one saw that coming, right?). Procedural content generation (PCG) is simply the idea of getting the computer to create content for you instead of an artist. The key idea is that PCG will generate similar but slightly different thing each time (infinite variety), _very_ large worlds can be generated (infinite size) and gameplay can be somehow _responsive_ to what the player does (infinite replayability).

#### Infinite Variety

The quintessential example of an infinite variety PCG system is [SpeedTree](http://www.speedtree.com/). Every wondered how games have such a [vast number of trees](http://www.youtube.com/watch?feature=player_detailpage&v=EhwZ7Sb0PHA), none looking exactly the same? It's a safe bet that SpeedTree was used.

SpeedTree is an "imperfect factory". Essentially an artist spends some time describing the rules that define the kind of tree they want (paremeters like branch length and angle, tree height, leaf density etc), once that initial effort has been put in SpeedTree can generate a literally infinite number of trees which meet these parameters. The incredible thing here is that the initial work by the artist is quite probably *less* than the work required to hand model a single tree, and the total development cost of SpeedTree is undoubtedly less than how much it would cost to hand model an entire forest!

Some other examples:

 * Borderlands has 87 bazillion unique guns
 * Strategy games usually come with the option to generate a random map (implying there are billions of maps)
 * Rhythm games procedurally generate their levels from a seed file (the music). Implying as many levels as there are possible music tracks
 
#### Infinite Size

A Natural consequence of infinite variety is that it becomes easy to generate really big worlds. Got an algorithm to create varied tiles of landscape? Keep applying it until you have a world of any size!

 * Elite has 2048 systems (a huge number for the 1984 release date)
 * The huge worlds in the Elder Scrolls series were all procedurally generated during development
 * Minecraft generates a world significantly larger than the surface area of the entire Earth

### Infinite Replayability

Procedural generation of gameplay rather than content is starting to become popular and I think we're going to see a lot of development in this area over the next few years.

The best example I have of this is Left 4 Dead. In L4D the "AI director" coordinates the game behind the scenes. If a team is playing well together they will encouter more zombies, more frequently, with more specials and less medkits scattered around the world. Wheras if a team is playing badly they will encouter less enemies, less frequently and will frequently find medkits and better guns scattered around the world. This all adds up to L4D having huge replay value, even though it only has a few handcrafted maps which do not change between play sessions.

This kind of generation can be stretched further to create highly branching storylines, with every action the plyer takes generating new events, stories and missions.

## How Does This Apply To Heist?

Heist will take advantage of all three benefits of procedural generation. Right now the most obvious use is the procedurally generated cities which reap the benefits of size and variety. In the future I plan to implement an "AI director", just like L4D, which will coordinate the AI of the entire city, partly for realism and partly for responsive gameplay.