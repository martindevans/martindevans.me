---
layout: post
category : Game-Design
tags : [general-gaming, game-design, game-development, stealth-analysis-series]
tagline : In Which Many Games Are Played
---
{% include JB/setup %}


## TL;DR

I'm giving myself a plausible sounding excuse to slack off and play games.

## A Reminder About Heist

I've been talking a lot about the development of the engine recently (previously HeistCore, now Epimetheus), talking about how it can be expanded with plugins and also talking about some of the underlying technical details of how it works. However, this stuff is really all besides the point - the ultimate goal of this project is to build a _stealth based, co-operative, multiplayer_ game about breaking into banks.

## Standing On The Shoulders Of Giants a.k.a. _Talent Borrows, Genius Steals_

With the change over to Epimetheus using C# scripting I feel like the engine in nearly in a state when I can start developing full games with it soon. As I have always said I won't be developing the full Heist game mode immediately but if I want to do that eventually I'd better get doing some serious research! To that end I'm compiling a list of games with similar elements to Heist which I shall play through and will publish a brief post about my thoughts on the game when I finish.

## The List

Not all the games on this list are (or will be) stealth games. I'll probably also add some games on this list which at first have nothing (obviously) in common with Heist but gave me some inspiration while playing them.

### The Series (So Far)

<ul>
    {% for page in site.tags.stealth-analysis-series %}
    <li><a href="{{ page.url }}">{{ page.title }}</a></li>
    {% endfor %}
</ul>

### Completed Games

- Dishonored
- Deus Ex: Human Revolution
- Assassins Creed
- System Shock
- Hitman: Sniper Challenge
- The Ship
- Hotline Miami
- Mark Of The Ninja

### In Progress

- Hitman: Absolution
- Monaco
- Hitman: Blood Money
- Amnesia: The Dark Descent
- Thief: Deadly Shadows
- Skyrim
- Frozen Synapse
- Door Kickers
- Grand Theft Auto
- Splinter Cell: Chaos Theory
- Assassins Creed: Black Flag

## ???

I'm actively looking for suggestions to add to this list. Any suggestions of games with co-operative and/or stealth elements are _very_ welcome.
