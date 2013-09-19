---
layout: post
category : Game-Design
tags : [general-gaming, game-design, game-development, stealth-analysis-series]
tagline : In Which Splinter Cell Is Played
---
{% include JB/setup %}


## TL;DR

I'm still playing the game, this is just a log of my first impressions - It will be tidied up into a proper analysis once I finish.

## General Impression

I've never played any splinter cell games besides blacklist, and from [reviews](http://www.pcgamer.com/review/splinter-cell-blacklist-review/) I've read it seems like I'm missing out - blacklist does feel a lot like a series of puzzles to solve rather than a simple stealth game. That said, I've really been enjoying solving this particular series of puzzles. The game also gets quite a lot of _small stuff_ right, which is great.

## The Good

As I said, the game gets a lot of the little details right. This is actually the thing I'm most interested in since I'm reviewing these games as a way to analyse what does and doesn't work in a stealth game for my own game.

### Sticky Cover

The game has a fantastic implementation of sticky cover. In most implementations I've seen once you're in cover you are either stuck in that cover (only able to move left and right), sometimes you're able to flip across from one piece of cover to another (e.g. across a door). Blacklist extends the cover jumping mechanic to be in the hands of the player - when you're in one piece of cover and looking at another a single keypress will send you diving across to the cover. This may not sound big but it's actually a big win for immersion - you're not busy wrestling with movement controls and manually trying to move from cover to cover, instead you're diving around cover like a total pro while concentrating on the tactical situation at hand.

### In World Hints

The game doesn't hide objectives in some annoying mission menu (replace "menu" with "PDA", "Diary", "Journal", "Notes" to taste). Missions are instead written into the world - as you enter a new level it will literally have some huge text written onto a nearby building stating your mission, as you complete a mission and round a corner you'll again be confronted with text stating your mission (while additional details and exposition are given over the radio). This same system of in world hints for missions applies to the entire control scheme - whenever you're capable of performing some action (e.g. climb over a wall) there will be a little hint painted into the world showing the key to perform the action.

On the surface this sounds terribly immersion breaking - real soldiers don't often get orders sent to them via mural (or see movement hints painted on walls). I think it's reasonable to tradeoff the tiny immersion loss of in world hints for the huge confidence gain a player gets by being able to run around a level and know how to do everything - it's *very* immersion breaking to run up to a wall and then be caught by a guard because you accidentally vaulted over it instead of taking cover!

### Everyone Is Deadly

This is definitely not a game with any bullet sponges, I've basically played exclusively using a pistol and a knife (sometimes falling back to a silenced sniper rifle for long range kills when necessary), this makes the player supremely deadly. The enemies, if they ever catch you, are also extremely deadly (not quite as deadly as the player - usually finishing me off with a burst or two of bullets). This obviously all works very well within a stealth focussed game where you know that if you get caught the guards will almost certainly kill you.

### Optional Multiplayer

Blacklist has a lot of missions which are not central to the main plot - simple things like "eliminate all the people at this blood diamond mine" or "plant electronic signal taps at 3 locations in this building without being detected". Most (all?) these missions can be done either solo or cooperatively with one other person, this is really cool. The game doesn't just drop an extra person into the same mission as call it done either - when you're working with another person there are new routes available that cannot be done with a single player.

### Uneven Multiplayer

Blacklist has the "Spies Vs Mercs" Gamemode which pitches powerful, heavily armed and armoured mercs against sneaky spies, armed with peashooters and paper thin armour. I haven't played much SvM yet and the bit I did play seemed punishingly difficult to newbies. However, this is a pretty interesting idea to bear in mind for any kind of stealth game - essentially putting one team of players into the shoes of the hapless AI guards getting slaughtered by elite sneaky spies.

## The Bad

### Failure Amplification

Conversely to the last point the game suffers something I'm going to call _Failure Amplification_ - there are some points where the game deliberately amplifies a very small mistake into having much larger consequences than normal. Usually when you get spotted by an enemy they will shout out (alerting nearby enemies) and start searching for you, after a while they usually give up the search and return to patrolling. However, there are some levels where you are informed that the enemy has reinforcements standing by and that if you are spotted they will summon the reinforcements (who will then arrive _instantly_, in large numbers, and on a permanent high alert). In these levels the small failure (being spotted by one single enemy) results in a massively amplified response. This doesn't really increase the standard stealth game tension - after all your sneaking about will be the same as usual - it just introduces an incredibly frustrating event that usually requires a quicksave load.

### Dogs

Dogs. Oh God how much do I hate dogs in Blacklist. Humans are predictable and understandable - they react to noises by investigating them and they can only see things in front of them. Not dogs, oh no, Dogs react to small noises by...barking loudly and putting almost every guard on alert (failure amplification to the max). Not only that, I honestly have no clue how dogs detect me half the time, I guess the game gives them some omnidirectional sense of smell that picks up enemies in a radius.

The main problem with dogs is that I simply don't understand them and the game makes no effort to help. Whenever I'm detected by a human it *makes sense*, I know that he saw me because I failed to take cover properly. Conversely whenever I'm detected by a dog it feels like total bullshit, I was detected by the dog through two layers of cover, whilst not moving, in a big smelly junk yard... yeah that makes sense.