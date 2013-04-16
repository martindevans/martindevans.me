---
layout: post
category : Heist
tags : [heist, artificial-intelligence, ai-series]
tagline : In Which The Author Talks About Something He Never Intends To Use
---
{% include JB/setup %}


## TL;DR

Finite State Machines are the most boring way to do game AI.

## What Is A Finite State Machine?

Finite State Machines (FSM) are a _very_ simple concept to understand. You simply work out _all_ the states that your system can be in, and then for every single state work out _every single action_ you can take from that state (and in what circumstance you would take it). This is best explained by [XKCD](http://xkcd.com/627/), I feel. Here's an example of an extremely basic game AI for a game:

![Finite State Machine](/assets/FiniteStateMachine.png)

Pretty basic stuff I hope. The AI will patrol around until it finds an enemy, once it has located the enemy it will shoot it until they are dead and then it will... have a panic attack because there is no way to get back to the patrol state! The problem is that this AI is *really* boring - playing against this would get very predictable very fast. You really need a few more states, to account for various interesting events. For example:

![Finite State Machine](/assets/FiniteStateMachine2.png)

Oh God, what happened here? This is a slightly more interesting AI, but even this one is missing some pretty vital parts. E.g. If you throw a grenade an AI making coffee he will totally ignore it, so you need to add more connections from basically every node to dive for cover if a grenade is sighted. If the enemy is no longer in sight after dropping snacks the AI will be confused, so you need to add a connection there to "search cautiously". Once again there's no way back from combat to patrolling so we need another connetion there. If we wanted to add in little things like AIs meeting each other mid patrol and exchanging some small we'd need a whole load of states to handle seeing each other, stopping, talking *and* all the extra conenctions for what happens if they see a grenade/enemy while doing all this.

What I'm trying to get at here is that FSMs might *seem* like a good way to create AIs, because the game designer retains complete control, but actually they're terrible because the designer retains _complete control_ of _every action the AI will ever make_ which is loads more control than we really want.

## Why Would You Tell Me About Such A Dreadful Way To Design AI?

Heist doesn't use any FSMs for AI (it does have a rather complex FSM for network session negotiation, but that's something we _want_ to be boring and predictable) so why would I bother telling you about FSMs? Finite State Machines were the way game AIs were written almost exclusively up until 2000 (as far as I can tell, I'm not exactly a history student), even today FSMs are still an important part of game AI. I've mostly talked about FSMs because some of the systems I will be discussing were invented almost entirely to solve the problems with FSMs and discussing these systems without first discussing the basics FSM would be very difficult.

## Coming Soon

I'm going to discuss *Goal Oriented Action Planning* and *Behaviour Trees* in the next coupla of entries. Both of these are techniques which improve upon the limitations of Finite State Machines.