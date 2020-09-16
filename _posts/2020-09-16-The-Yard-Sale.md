---
layout: post
category : Game-Design
tags : [game-design]
tagline : In Which A Video Is Summarised
---
{% include JB/setup %}

# TL;DR

[This](https://www.youtube.com/watch?v=PkZoGDKy_L4) game design technique is great. I've summarised how it works in this blog post.

# What Is The Big Board

**The Big Board** is a practical framework for holistic design iteration detailed by [Zak McClendon](https://twitter.com/zakmcc) in [this video](https://www.youtube.com/watch?v=PkZoGDKy_L4).

In a highly creative project like a game the project will often start out with a poorly defined game concept and each member of the team will have different ideas about exactly what that concept means. Furthermore there will be a huge number of desirable features that are not _critical_ to the concept but are desirable. Resolving the inevitable creative conflicts between incompatible ideas and low priority ideas is critical to a well designed game. The Big Board is a _process_ to help with this - the most important part of it is not the final artifact (a board full of cards) but is instead the collaborative process of creating the board. The big board helps everyone on the team understand the creative tradeoffs being made, reduces the scope of creative differences and helps tackle scope creep.

# The Process

The Big Board process is a simple 6 step process. The steps aren't strictly ordered and any step can be repeated or done out of order, whatever fits the discussion the best. The main goal of this process is to act as a framework for discussion amongst the team.

1. Prompt Team with the highest level game design concept. e.g. "An MMORTS".
2. Generate ideas.
   - _Every_ idea that anyone comes up with should written down on a card.
   - Ideas can be very specific technical features such as "the camera should support strategic zoom" or high level concepts such as "the game should promote non violent alternatives to warfare".
3. Classify cards into categories (see below for more detail on categories).
   - Some cards may be difficulty to classify - break them up into smaller cards and classify all of those. Sometimes it will turn out that all the smaller cards fit into the same category and can be merged back into a single stack of cards that are treated as one card.
4. Discuss every single card, writing an exact definition of what it means.
   - This definition stage is one of the most important parts of the process - it builds a common vocabulary for the team.
   - Some cards will be difficult to define - break them up into smaller cards. This reduces the problem to smaller and simpler problems. Sometimes a set of cards can be merged back together into a single stack of cards that are treated as one card.
5. Rank all cards.
   - This stage exposes conflicts within the game design such as `Replayability` conflicting with `highly scripted storyline`. Keeping conflicting cards both on the board is fine, this stage is just establishing priorities for different cards.
6. Repeat 2->5 as many times as necessary.

# Categories

Step 3 requires classifying cards into categories. The exact categories to use depends on the team and the type of game being made, the following are just examples and should probably be adapted before starting the process (or even after starting the process, if it becomes clear that one category is over or underused).

### Creative Promises
These cards represents a promise from you to the audience about what they will experience in your game. These are the high level thigns that you would use to describe your game to a person. When you create a promise card you can probably generate a lot of other cards in other categories by thinking about what fulfilling this promise would require.

Examples:
 - Bioshock2: You are a big daddy.
 - Supreme Commander: You are in control of the entire military.

## Design Values
These cards represent basic principles that you use to guide other decisions. These are things that you will use when assessing the suitability and priority of other cards.

Examples:
 - Immersion.
 - Depth
 - Consistency
 - Replayability
 - Player Retention

## Cultural Values
These cards represent basic out-of-game principles that are important to you.

Examples:
 - Historical Accuracy
 - Representation
 - Non Violent Solutions

## Interaction Paradigms
These cards express at a high level what players spend their time doing. Often an interaction paradigm will come directly a creative promise and represents the mechanic that fulfils that promose.

Examples:
 - Walking/exploring
 - Base Building
 - Designing Vehicles
 - Watching Cutscenes

## Features

The majority of cards will be "features" - very specific things that the game does to implement the interaction paradigms. Since there are so many features this can be broken down into a number of smaller categories.

### Required Features

Features that absolutely must exist in the game. The lack of one of these features would break a creative promise.

### Desired Features

Feature that would be good to get into the game, but aren't required to fulfil creative promises.

### Wishlist Features

Other features that would be nice to have but probably won't make it into the game. Most new features will start here and then some will get promoted to desired features after some discussion.

### Boilerplate Features

All the boring technical features that are required to make the game work. e.g. save/load, localisation, multiplayer etc.

## Cornfield

This is the idea hospice. Cards which are not going to be implemented are moved here, add the reason for moving a card to the cornfield to the card itself as a record for any later team members browsing the cornfield.

## Foggy Notions

Vague ideas no one knows how to execute. Maybe a common vague notion that people keep coming up with but then never gets fully expanded. Acts as a "bounty board" for people to attempt to brainstorm/prototype these ideas and promote them to other categories.

# Benefits

This process and final board full of cards have a number of benefits. The board lives on the wall of the office, creating a visualisation of the scope of the entire project which is visible to everyone. The entire design is no longer living in the head of several designers.

Because the board is created entirely by a collaborative process of collectively generating ideas and then ranking them no one feels left out. If an idea is rejected it was for clear reasons to do with prioiritising other things above it. Conversely because there is an easy way to downrank ideas without discarding them out of hand it is natural to drop features than are "nice to have" but aren't critical to the overall game concept.

# Taking It Further

The Big Board isn't a one off design meeting and shouldn't become some bits of cardboard on the wall that everyone ignores. Every time someone comes up with a new idea they can collect a few people together to insert it into the correct place on the board and discuss the merits of this idea.

As the game is developed the board should also be frequently reviewed to check that what's being built is in line with what was expected. For example are creative promises being fulfilled? If not, why not? If the current game is fun without that promise can it be removed? if so, which other features should be removed?

Another potential use of the big board is to generate new ideas by making hypothetical changes. For example if you take your _least_ important creative promoise and move it to the top what changes? During the process of investigating you may discover some interesting new things about the design space.

# Common Conflicts

While developing the big board you are likely to encounter some of these common problems.encounter.

Inability to order two cards. This likely indicates a core conflict about what different members of the team want from the game. Very important to resolve or else the final game will end up poorly defined between these two things.

Holy Grail cards. These are cards which are just written as trying to fix problems with other games. These aren't good promises and are quite likely to be impossible to achieve. For example `Dwarf Fortress but accessible` - DF is only fun because of it's incredible _depth_m which is in direct conflict with accessibility. Rewrite holy grail cards into positive promises and then discuss them as normal.

Conflicts. Sometimes two cards will directly conflict with each other. For example `Excellent Linear Narrative` and `Replayability`. This is fine, one of the cards will be ranked above the other and that makes it clear which features you need to compromise on to achieve both (or which one needs to be sent to the cornfield). Potentially you could add a card to the Foggy Notions category related to combining these two things _somehow_.

Mixed Messages. Sometimes two cards don't conflict in the sense that they cannot both be implemented, but simply send mixed messages. For example a creative promise to `show the horrors of war` is in conflict with a feature card to `brutal melee takedowns`. Conflicts like this don't _have_ to be resolved to complete the game, but it's worth being aware of the Dissonance and trying to remove one of them for a more consistent experience.