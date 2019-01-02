---
layout: post
category : Personal
tags : [general]
tagline : In Which A Lot Happens
---
{% include JB/setup %}

# TL;DR

I developed [Dissonance Voice Chat](https://www.assetstore.unity3d.com/#!/content/70078?aid=1100lJ2J), released [Wet Stuff](https://assetstore.unity.com/packages/tools/particles-effects/wet-stuff-118969?aid=1100lJ2J) and learned about Machine Learning.

# What Did I Do In 2017?

In my [last retrospective](http://martindevans.me/personal/2018/01/13/2017-Retrospective/) I talked about working on [Dissonance Voice Chat For Unity](https://www.assetstore.unity3d.com/#!/content/70078?aid=1100lJ2J) and some interesting open source projects I had worked on.

# Placeholder Software/Dissonance/Wet Stuff

In 2018 we released [Wet Stuff](https://assetstore.unity.com/packages/tools/particles-effects/wet-stuff-118969?aid=1100lJ2J) onto the asset store. Wet Stuff is a graphical asset so it was much easier to advertise than Dissonance - everyone loves eye candy! I spent over a month putting together a minute long video demonstrating what can be done with Wet Stuff. This was the first Unity project I've made intended to really **look good**. Everything else I have done has been related to Dissonance (no graphics at all) or just a little side projects for fun (more concerned about gameplay than visuals). I think it turned out rather well:

<div style="position: relative;width: 100%;padding-bottom:56%;">
    <iframe src="https://www.youtube.com/embed/-9zrrXtgD0M" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen="" style="
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
    "></iframe>
</div>

This was made using an early version of [Wet Stuff](https://assetstore.unity.com/packages/tools/particles-effects/wet-stuff-118969?aid=1100lJ2J), the [Cinemachine](https://unity3d.com/learn/tutorials/topics/animation/using-cinemachine-getting-started) package (amazing for camera work in Unity), the [Viking Village](https://assetstore.unity.com/packages/essentials/tutorial-projects/viking-village-29140) pack and finally the music and sound effects all came from [AudioBlocks](https://www.audioblocks.com/).

While Tom was working primarily on Wet Stuff I was providing support for Dissonance and pushed out 9 updates over the year. Last year we were pushing hard to add lots of new features and worked our way through several major versions (i.e. breaking changes). This year we've really been trying to keep Dissonance _stable_ and I'm happy to say that we haven't had to put out a single breaking change even while making some pretty major improvements. Some of the more interesting features added this year:

 - [Dark Rift 2](https://assetstore.unity.com/packages/tools/network/darkrift-networking-2-95309?aid=1100lJ2J) Networking support.
 - [WebRTC Network integration](https://assetstore.unity.com/packages/tools/network/webrtc-network-47846?aid=1100lJ2J) support.
 - [Photon Unity Networking 2](https://assetstore.unity.com/packages/tools/network/pun-2-free-119922?aid=1100lJ2J) support.
 - Supporting an unlimited number of players in a Dissonance session (previously limited to ~20).
 - Enabled Opus `Forward Error Correction` (FEC). This improves audio quality when there are small amounts of packet loss.
 - Extra monitoring on the receive system to detect terrible network conditions disrupting voice chat
 - Increased maximum dynamic sync adjustment, this will improve audio synchronisation when there are skips in time (e.g. low frame rates, overloaded CPU).

Of course over the year we've also fixed a lot of bugs, 21 have been mentioned in all the changelogs over the year, but some of those were multiple similar bugs aggregated together so the number is probably closer to ~30. The rate of bugfixes has slowed down a lot in the past few months and I'm really happy with how stable Dissonance is at the moment.

# The Parsec Project Is Dead

Placeholder didn't only do Wet Stuff/Dissonance this year, we also worked on the start of a game project codenamed `Parsec`. We've never mentioned it anywhere before so the first time anyone will hear of it is here, talking about it's death! This was a game we both really wanted to play and doesn't really exist anywhere in the market at the moment. We spent the six months up until Christmas building prototypes and learning some of the cool new tech in Unity such as the ECS (which we definitely wanted to use for this game). Unfortunately we killed the project at the end of the six month prototype period, not because we were unhappy with the prototypes but for two other risks: technical risk and business risk.

The business risk is simply because games are a very risky business. We'd probably need to take on debt to finance development of the game and if it didn't sell well it could very easily destroy the company. It would be better to continue developing tools for developers (much less risky) and using the money from that to expand the company until we can take on bigger projects.

The technical risk is due to ongoing flux in how Unity development happens. Right now there's a big shift going on to replace the core of Unity with the `Entity Component System` (ECS). The performance of ECS is incredible and we would definitely want to use it for a game. However, it is still heavily in development and over the 6 month prototype period we had to rewrite systems multiple times to keep up with deprecations. There's also no editor support for ECS at all, so we had to develop our own hacky system synchronising GameObjects and ECS Entities to even be able to use the Editor. This will all settle down over the next 6 months and become much less painful to use.

# Blogging

I've been really bad at updating the blog this year. In the past I have written about the projects I am working on (such as Heist), but I don't want this to become a Placeholder Software blog. Alternatively I have written about interesting programming problems I have encountered and my solutions to them, however simply providing support for Dissonance (and the kind of maintenance updates associated with that) hasn't introduced me to many new topics that are worth blogging about. I do have a bit of a backlog of topics I'd like to write about at the moment, so maybe I'll try to do several of those early this year.

I wrote a little about network protocol design in [Lessons In Network Protocol Design Learned The Hard Way](http://martindevans.me/game-development/2018/06/23/Lessons-Learned-Network-Protocol-Design), inspired by working on two Dissonance updates which I just about managed to make to the network system without breaking compatibility. This wasn't a particularly well planned post and I'd like to think more deeply about the topic and write a better post in the future.

I also wrote [Dithering About Dither](http://martindevans.me/game-development/2018/03/27/Dithering-About-Dither/) which I think is a much better post about the shape and colour of random numbers and how that knowledge can be used to apply dithering. Dithering is a fascinating topic which can be of use to anyone doing any kind of data processing, it's not just for 8 bit graphics!

# Open Source

I'm a huge fan of open source - I have published [132 GitHub repositories](https://github.com/martindevans?tab=repositories) over the last 9 years! This year I have three interesting new repositories which are all linked together:

### [*Mute](https://github.com/martindevans/Mute)

*Mute (named after the shipboard AI from [Analogue: A Hate Story](https://en.wikipedia.org/wiki/Analogue:_A_Hate_Story)) is a bot for a personal discord server I hang out in. She's specifically a side project intended to accept contributions from others in the server, many of whom are programmers but only a couple of them know C#, so code quality is not fantastically high and anything that works is merged even if it's "ugly".

Towards the end of the year I started trying to add "natural language" features to *Mute so that people can interact with her conversationally like Alexa/Siri/Cortana. This has lead me down the path of learning all about Machine Learning.

### [Basic Sentiment](https://github.com/martindevans/basic-sentiment)

This has been my experimental/learning project for ML. Initially *Mute had a basic sentiment analyser using [ML.NET](https://dotnet.microsoft.com/apps/machinelearning-ai/ml-dotnet) and I used this project to develop a better sentiment analyser using deep learning with [Keras](https://keras.io/). The project has three parts:

The **sentiment** directory contains the first sentiment analysis model, largely following basic Keras tutorials. This is just an `Embedding` layer (convert words into vectors), an `LSTM` (process individual words in turn, converting the entire sentence into a vector) and finally a single `Dense` layer to classify sentences as `Negative`, `Positive` or `Neutral`.

The **w2v** directory contains an attempt at building a [Word2Vec](https://en.wikipedia.org/wiki/Word2vec) model. This is a model which converts words into vectors in a relatively low dimension space. In a well trained set of word vectors you can do some pretty interesting things, most famously `King - Man + Woman = Queen`. The idea is that you can train word vectors and then use those in other models as a pretrained `Embedding` layer, this can both save training time and significantly improve model performance.

Finally the **pretrained_w2v** directory contains another sentiment analyser which I built from the ground up, rather than following tutorials. This converts sentences into big matrices using the pretrained word embeddings so the model is much simpler and faster to train because it doesn't need to train an Embedding layer. The model has a `Dropout` layer (randomly throws away some dimensions of data during training), a `Bidirectional LSTM` (process words one by one both forwards and backwards, converting the entire sentence into a vector) and then a set of `Dense` layers which process the sentence vector before the final `Dense` layer which outputs the three classes (`Negative`, `Positive` and `Neutral`).

### [Word2Vec Server](https://github.com/martindevans/Word2Vec_Server)

I wanted to deploy my new sentiment analyser into *Mute but had a problem - the pretrained Google word vectors I am using require about 3GB of memory! That's doable but starting the bot then takes a really long time as it loads the data from disk. This project serves word vectors over a very simple HTTP API, so the word vectors can stay loaded even when the bot is restarted.

Longer term I would like to add indexing to this project so that it doesn't need to store all of the vectors in memory. Perhaps storing them in a database similar to [magnitude](https://github.com/plasticityai/magnitude). This should also speed up `vector -> word` lookups which at the moment require searching through all 100M words!

# Interesting Stuff

Some other interesting things I encountered in 2018 in no partiucular order:
 - [SpaceX](http://www.spacex.com/)
 - [Urbit](https://www.urbit.org/)
 - [Unite Berlin Conference](https://unite.unity.com/2018/berlin)
 - [Keras](https://keras.io/)
 - [HITMAN 2](https://store.steampowered.com/app/863550/HITMAN_2/)
 - [Violet Evergarden](https://myanimelist.net/anime/33352/Violet_Evergarden)
 - [Panic! at the Disco](https://panicatthedisco.com/)
 - [Sony WH-1000XM2 Headphones](https://www.sony.co.uk/electronics/headband-headphones/wh-1000xm2)
 - [Discord](https://discordapp.com/)
 - [RimWorld Multiplayer](https://github.com/Zetrith/Multiplayer)