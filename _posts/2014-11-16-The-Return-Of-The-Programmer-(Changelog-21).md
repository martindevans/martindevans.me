---
layout: post
category : Heist-Game
tags : [changelog, heist]
tagline : In Which Our Hero Returns From Strange Faraway Lands
---
{% include JB/setup %}


## TL;DR

I'm back from my 3 week holiday in Japan.

## This week

There's no video this week. I did want to get one out but I'd forgotten a particular oddity about my editing software which messed everything up - of course I only realised this when I was *just* about finished with the 2 hour recording and editing process :(

Most of my time this week was just easing myself back into work and reminding myself how everything in the engine works. I went over the engine with a fresh set of eyes and tied up a few loose ends. I'm quite pleased with how well everything fits together, none of the stereotypical "Oh dear God who wrote this awful code?" moments when looking at my own code!

I did complete one basic task: writing an objective system (you can find the repository [on bitbucket](https://bitbucket.org/martindevans/base-achievement) as usual). The objective system keeps track of a hierarchical set of goals and calculates things like progress towards completion, or completion of parent goals when all/some/any of the child goals are completed. The system is also written to be serialised easily into a blob of JSON so that the UI can show the objective state.

Here's what it looks like at the moment, using a set of test goals designed around DoTA2:

![Objective UI](/assets/objective-example.png)

## What's Next?

I've got the objective system mostly working, although not integrated into any game modes yet. I'll probably leave that for a while and move onto something gameplay related, probably sneaking mechanics.