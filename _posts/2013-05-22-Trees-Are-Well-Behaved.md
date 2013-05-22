---
layout: post
category : Heist
tags : [heist, artificial-intelligence, ai-series]
tagline : In Which The Secret Life Of Trees Is Exposed
---
{% include JB/setup %}


## TL;DR

Behaviour trees are better than Finite State Machines for basic AI.

## What Is A Behaviour Tree?

A Behaviour Tree (BT) is an improvement on Finite State Machines (FSM) which encapsulates the behaviours an AI undertakes in a more sensible way, making behaviours easier to design individually and then compose together later in a complete AI. Conceptually BTs are pretty simple: every time the AI is updated the tree is traversed from top down, each time execution reaches a node it does what that node says. Let's have an example, I'm going to make the dead simple guard AI from [Last Time](/heist/2013/04/16/Finite-State-Machines-(Are-Boring)/) using a BT instead of an FSM:

![Behaviour Tree](/assets/BehaviourTree.png)

This is slightly less simple than the FSM example, for example what are these "Concurrent Selector" Nodes? How *exactly* does this get used? Let's run through an example. Remember, *every* time the AI is updated, we traverse the entire tree from the top down.

1) Priority Selector - Traverse child nodes in priority order. In my example left most nodes are a higher priority. So we move to the left most child (the concurrent selector).
2) Concurrent Selector - A concurrent selector visits all of it's children each time, and fails if any of them fail. So we move to the first child to find out if it fails.
3) Condition: Grenade In Sight? - There are no grenades in sight, so this node fails, which means the concurrent selector fails, and we get all the way back up to the priority selector.
4) Priority Selector - Traverse child nodes in priority order. The left most child is now marked as *failed*, so moved on to the next child.
5) Concurrent Selector - Again, visit children in order and fail if any of them fail.
6) Condition: Enemy In Sight? - Nope, no enemies in sight, so fail and fall all the way back again.
7) Priority Selector - Both concurrent selectors are now marked as failed, moved on to the next child in priority order.
8) Action: Patrol - This starts a patrol. Finally we have succeeded in doing something.

The critical thing here is to remember that the entire tree is visited every time. Now that our AI is happily patrolling along everything will work as we might expect - if a grenade appears the first concurrent selector will suddenly succeed and the "Dive For Cover" action will interrupt the "Patrol" action. Similarly, if the AI sees an enemy while patrolling it will start shooting at it.

## What else can this thing do?

I mentioned a couple of "selector" nodes in my example above - these are really the language of how behaviour trees express themselves. There are plenty of other nodes:

- Priority Selector: Traverses child nodes in priority order. Used for picking among multiple different actions.
- Concurrent Selector: Traverse children in order and fail if any of them fail.
- Condition: Checks if some Condition is true. Fails if the condition is not true.
- Action: Do something.
- Loop: Run all children in order, when reaching the last child start again. (e.g. Patrol Point 1, Patrol Point 2, Patrol Point 3).
- Sequence: Run all their children in order. Used for executing a sequence of actions (e.g. Get closer to enemy -> punch enemy -> drag unconscious body to prison cell).
- Random: Pick some random child.

There are some hidden subtleties here, for example what is the difference between a concurrent selector (visit children in order, fail if any fail) and a sequence selector (visit children in order, fail if any fail)? The different is how they handle long running actions. Some actions (most actions, in fact) will take longer to execute than 1 single update cycle and if we want our AIs to have some consistency to their actions we need to handle this. When an action node in a behaviour tree begins executing it (and all it's ancestors) are marked as "running", next time there is an update nodes can handle these running nodes differently. e.g.

- Concurrent Selector: Traverse children in order and fail if any of them fail.
- Sequence Selector: Traverse children in order (starting from the first "running" node, if there are any).

Now we can see that the difference between the two if how they handle long running sequences of actions.

## So is this how the Heist AI works?

Partly yes, mostly no. Behaviour trees are a good way to design simple AIs but they're still not a great way to design truly complex AIs which react to player actions in novel ways. I'll be talking about _that_ next time, when I talk about _Goal Oriented Action Planning_.