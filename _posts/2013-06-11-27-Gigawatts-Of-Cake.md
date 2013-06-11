---
layout: post
category : Heist
tags : [heist, artificial-intelligence, ai-series]
tagline : In Which It Is Revealed That The Cake Was A Major Power Source For Aperture Science
---
{% include JB/setup %}


## TL;DR

Goal Oriented Action Planning is the best way for a lazy game designer to build AI.

## What Is Goal Oriented Action Planning?

I've talked about [Finite State Machines (FSM)](/heist/2013/04/16/Finite-State-Machines-(Are-Boring\)/) and [Behaviour Trees (BT)](/heist/2013/05/22/Trees-Are-Well-Behaved/) as general techniques for deciding what action an AI should take next and I've talked about [pathfinding](/heist/2013/04/10/Pathfinding/) as a general AI topic for how to get around the world. What happens when we put all these things together? We get Goal Oriented Action Planning (GOAP)!

With both FSMs and BTs the game designer has to carefully craft the enemy AI so it will act in the way he wants - this design stage is basically the designer laying out the sequence of actions needed to achieve some desired goal. Where else have we talked about a sequence of actions to reach a goal? Pathfinding!

Goal Oriented Action Planning uses pathfinding techniques to search for a valid sequence of actions to satisfy a goal.

## So How Does That Work?

Setting up an AI for GOAP is actually pretty simple. The AI simply needs a set of actions it can take, with each action having it's effect and it's required conditions carefully described. The system then picks an action that satisfies one of the required conditions of the goal state and applies that, it simply keeps applying actions (picked by a heuristic function, like A\* pathfinding) until all the required conditions are complete.

Let's have an example, this is the one I used while developing the GOAP system.

#### Actions
- Go To _Some Destination_
- Buy Flour (Requires: Location Is Shop)
- Buy Eggs (Requires: Location Is Shop)
- Buy Sugar (Requires: Location Is Shop)
- Bake Cake (Requires: Location Is Kitchen, Inventory Contains: Flour, 2xEgg, Sugar)

Let's say my current state is:
- In Kitchen
- 0xCakes In Inventory

Having no cake is a terrible situation to be in, we must rectify that! So our goal here is:

- 1 Cake In Inventory

There's only 1 action I can take to satisfy this goal: _Bake Cake_. Let's apply that. Now our goal is:

- Inventory Contains: Flour, 2xEgg, Sugar

We're already in the kitchen, so that's not a goal here even though the _Bake Cake_ action requires it. We need eggs, flour and sugar (none of which can be obtained while in the kitchen), the only applicable action here is to go to the shop, which makes our goal:

- Inventory Contains: Flour, 2xEgg, Sugar.

We didn't achieve anything here, what gives? Remember this search is just like A\* Pathfinding, sometimes you have to get further away from your destination in order to get there. Now that we're in the supermarket we can buy eggs, flour or sugar, let's skip a few steps and do all three. This makes our goal:

- ... Nothing!

That's it. We've not got a _backwards_ plan for how to make cake. To execute the plan we have to do it in reverse order. An additional gotcha is with goto actions, we need to flip the goto actions around so they goto where they came from during planning, also we need to start the plan with a goto _wherever the planning ended up_. So the plan becomes:

1. Goto Shop (Implicitly inserted at start of plan)
2. Buy Ingredients
3. Goto Kitchen (Reversal of _goto shop_ during planning)
4. Bake Cake

## Yay, Cake!

My concern when implementing this was that GOAP might be too slow to use practically. My test GOAP implementation (which actually is a lot less efficient because it currently plans forwards not backwards, I'll change this later) currently generates a plan for this cake scenario in about 0.3 milliseconds. Given that it might take an AI 5 minutes (or more) to execute this plan that's pretty damn fast!

## But Cake Isn't Everything In Life

Sadly, we can't get by in life simply by baking 3300 cakes every second. If I wanted to implement the guard AI I've been using in my FSM and BT examples I would need two goals:

1. Do Not Die
2. Kill Enemies

If the AI had appropriate action available to it then it could satisfy these goals by _diving for cover_ when a grenade is in sight (satisfies goal _Do Not Die_), by _shooting enemies_ when an enemy is in sight (satisfies goal _Kill Enemies_) and by _patrolling_ (finding an enemy is a prerequisite to shooting them). Such a simple AI to describe (3 actions, 2 goals) would replace the 8 node Behaviour Tree and the 15+ node Finite State Machine.

The implementation of multiple goals is quite simple. Simply pick the highest priority _unsatisfied_ goal and formulate a plan to satisfy it. If a higher priority goal becomes unsatisfied during plan execution just form a new plan and do that instead. So, for example, if a grenade rolls into sight while patrolling then the AI would interrupt the _Kill Enemies_ goal plan with a new _Do Not Die_ plan (and then presumably dive for cover).

## Emergence

The really cool thing about GOAP is _emergence_. With other techniques the AI will only ever do things that the designer thought of first, so you're effectively codifying the designer into the game. With GOAP the AI will pick the most efficient plan and do that (not *always* the most efficient, of course you could add some randomness to the AIs planning), this leads to the AI doing very interesting, unexpected things. For example I also have a test AI which implements the guard example I've been using with a few added extras, at one point I removed the _Do Not Die_ goal (essentially made the AI fearless), it formulated a rather interesting plan:

1. Patrol until you find an enemy
2. Patrol until you find an enemy
3. Patrol until you find an enemy (It kept patrolling until all 20 enemies were following it and shooting at it)
4. Walk into the oncoming hail of bullets to the closest enemy
5. Punch enemy to death
6. Take gun from limp corpse
7. Proceed to perfectly headshot half the remaining enemies
8. Walk up to nearest dead enemy, take ammo
9. Reload Gun
10. Perfectly headshot remaining enemies

This is a pretty stupid plan (obviously), there's no way the AI is *actually* going to get to execute all of that plan without dying. But it _is_ fascinating that the AI can come up with such unexpected behaviour all by itself.

## This Sounds Like Rubbish, You're a Lazy Game Designer

Some other titles you _may_ have heard of which use GOAP:

- F.E.A.R
- S.T.A.L.K.E.R
- Fallout 3
- Demigod
- Just Cause 2
- Deus Ex: Human Revolution

Among many others.