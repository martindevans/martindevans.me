---
layout: post
category : Heist
tags : [heist, artificial-intelligence]
tagline : In Which I Program Myself More Friends
---
{% include JB/setup %}


## TL;DR

I'm working on Artificial Intelligence for Heist at the moment.

## The Soul Of A City Is In Its People

I've spent the last few months putting in a lot of effort to building the city in Heist, building the systems required for a nice scripting system which allows you to construct buildings with geometric brushes and then building all the systems behind the scene to manage all that geometry, and generating it as fast as possible so the player never encounters non generated world. That's been fun (I should probably blog about how it all works sometime), but as the title says *The Soul Of A City Is In Its People* - my virtual cities don't feel like cities at all if there are no people there!

## Aspects Of AI

There are two aspects of AI to consider for Heist:

The first aspect is the _quantity_ of the AI - I need a good way to simulate large crowds wandering around. This doesn't actually need as many AIs as you might think, when you're down inside a crowd in a first person view you can't see very far thanks to all the people in the way - so long as there is always a crowd immediately around the players they'll never know the difference. So the system will be constantly spawning characters out of the players view and then making them walk past the player and around a corner where they disappear.

The second aspect to consider is the _quality_ of the AI - a single character needs to be realistic and contribute to the feel of the city. If the player were to pick a person out of the crowd and stalk them for a while then that person should act realistically, e.g. Go to a local caf&eacute; at lunch, head home at the end of the day, fetch their car from the car park, go to a house somewhere in the city and hang around in it for a while, go to bed at night etc. This is pretty much completely opposed to the number of AIs, it's not possible to simulate an entire crowd of AIs with that much depth and complexity! That's ok though, as I mentioned before the system will constantly spawn AIs around the player and despawn them when they're far enough away from the player. This means that no single AI will ever be near the player for very long, if they _are_ near the player for a long time then the system can dynamically "upgrade" the AI to add more complex behaviours to it.

### Quantity

There are various systems for simulating large crowds of entities and handling all the jostling for position that goes on in such a system. One is [Continuum Crowds] (http://grail.cs.washington.edu/projects/crowd-flows/continuum-crowds.pdf) which simulate the crowd as a flow field, sort of as if it were a kind of liquid. Variations of this system can simulate [huge crowds](https://www.youtube.com/embed/pqBSNAOsMDc). These are the kinds of crowd used in assassins creed, which is one of the few games to simulate an entire city like Heist. Supreme Commander 2 also uses the same system for controlling vast armies of robots of varying sizes and speeds moving around one another.

Another system I looked at is called (OpenSteer)[http://opensteer.sourceforge.net/], this system is a library which helps programmers rapidly build AI "vehicles" for games. OpenSteer can't handle crowds of tens of thousands like the Continuum Crowds, but it's significantly simpler to understand and there is already a (port to C#)[http://sharpsteer.codeplex.com/], which means it's a lot less work for me to use. The port was unfortunately somewhat out of date, and had a few little issues I wanted to fix (bringing it better in line with .net conventions, and fixing some bugs in the process), so it looks like (I'm now maintinaing the C# port)[https://github.com/martindevans/SharpSteer2] of OpenSteer! See a video of it in action [here](https://www.youtube.com/embed/TshKQ_SLeh8), simulating a crowd of ~150 people.

### Quality

Quality of AI is a bit harder to handle than quantity. Right now I don't have a complete plan for how to do AI, I do have some ideas of doing it like the city generation so people write small self contained behaviours for AIs in lua, which use other behaviours so that the system works together cooperatively. E.g. A "Get Lunch" behaviour could run the "Get Lunch From Cafe" behaviour, which in turn runs the "Find Cafe" and "Walk to Objective" behaviours, which could be using the "Find Path To Objective" and "Navigate Through Crowd" etc etc. Coupled with a hierarchy of needs the AI could just keep invoking scripts like this to satisfy needs and that may be enough to get a convincing AI. That's next weeks task!
