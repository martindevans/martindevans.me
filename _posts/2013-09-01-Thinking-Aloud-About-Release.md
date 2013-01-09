layout: post
category : Heist
tags : [heist, steam, greenlight]
tagline : In Which Some Loud Thinking Is Conducted
---
{% include JB/setup %}


## TL;DR

Greenlight seems like the way to go.

## A Quick Recap

Last week I mentioned that my current mid term goal is to get some kind of release out for Heist within a few months. I considered my options last week to be:

1. Working towards a full steam release (1+ Year(s))
2. Working towards a Greenlight release (within 6 months)
3. Putting myself on Greenlight as a preview/concept (now?)
4. Hosting my own paid alpha (now?)
5. Kickstarter (???)

This is obviously a really big decision and I'm going to use this blog post as a place to think out loud about the relative advantages and disadvantages of the different options.

### Steam

Publishing on steam has some *huge* advantages. The most obvious is that Steam is [_ridiculously_ popular](http://store.steampowered.com/stats/) - simply getting onto steam gets you exposure to ~10,000,000 gamers! Additionally valve are masters at selling games, getting their advice on pricing and marketing schemes is worth paying for. If you publish on steam you also get access to the [Steamworks SDK](http://www.steampowered.com/steamworks/) which looks like it would save me implementing a whole load of backend infrastructure myself. Just a few things Steamworks does for you:
 - Multiplayer matchmaking
 - Multiplayer session initiation ([NAT holepunching!](http://martindevans.me/Heist/2012/10/15/Get-Up-And-Initiate-That-Session/))
 - Leaderboards
 - Valve anti cheat
 - Cloud save files
 - Steam workshop for mods (huge feature for a game designed for modding like Heist)
 - Voice chat
 - In game DLC/micro transactions
 
Every single one of these things could take (optimistically) 2 to 4 weeks for me to implement, and I likely wouldn't do it as well as valve. This means hosting on Steam and using steamworks instantly saves me about *6 months work* building infrastructure.

Of course Valve take a cut of my sales through steam. However, I think saving myself at least sixth months work as well as getting onto the most popular games distribution platform in the world is worth paying for.

#### Full Steam Release

A release on steam requires the game to be in some state I can call "complete" with a straight face, I estimate it would take me nearly a year to get Heist to this point. This is longer than I would like before getting at least _some_ kind of release out. Practically this means that if I go for a full steam release I would probably also need to self host a paid alpha, which is a lot of extra effort. On top of this Valve are obviously [moving steam away from a closed submission system](http://www.computerandvideogames.com/385601/gabe-newell-the-future-of-steam-is-user-generated-stores/#) and more towards greenlight.

I don't really see this as a viable option any more. It would take too long, require a lot of extra effort and may not even be a viable option given the way Valve could decide to change steam over the next year.

#### Greenlight

[Greenlight](http://steamcommunity.com/greenlight/) is the new, community curated, system for getting a game onto steam - It's obviously the route meant for indies like myself. Critically getting a game accepted onto steam still gets you access to the steamworks SDK, so I still have that *massive advantage*. Greenlight has two different sections, _concept_ and _full game_. The concept section of Greenlight is for (obviously) semi complete game concepts, it says:

> If you have an early game or software concept that you'd like to get in front of potential customers, you can post them here [in the concept section] to get feedback and reaction. Posting in the concept section allows you to create a page that supports the same features as normal Greenlight items such as discussions and comments. The voting here serves only to give the developer data and reactions and doesn't work toward getting the game distributed on Steam.

So I can get a concept page up as soon as I feel I have something (anything) worth showing.

After concepts a game can be moved into being a full greenlight submission at any time, full submissions are for when the game is (nearly) ready for a release on steam. I've skimmed Greenlight and found a few projects which have been greenlighted which are promising alpha/beta/full release dates, so it looks like with Greenlight I could put Heist on fairly early in development (e.g. as soon as I have one single completed gamemode) and promise many more updates once the game was released.

### Self Hosted

Self hosting is what I am currently doing, with a self updating version of the game available for free from [here](http://www.placeholder-software.co.uk/static-files/setup/heistgame/publish.htm). However, if I really want to self host a proper paid release of Heist I would need (at the very least):
 - Website
 - Store (with proper setup for payment providers)
 - An account system
 - Better modding support
 - Better multiplayer setup (NAT, matchmaking)
 - Discussion forums
 
I have no real experience setting up infrastructure stuff like this and I think it could easily take me a couple of months to get just these things setup. Given that Steam provides every single one of these things (although I would probably want to have a separate website still) I can't consider self hosting a realistic alternative.

### Kickstarter

Kickstarter is not exactly an alternative to the above - if I ran a kickstarter campaign I'd still need to select a release system. A few people have mentioned kickstarter to me though, so I thought I should consider it out loud. Realistically the only way a load of funding from kickstarter could help if if I hired another developer to work on Heist with me, this would require about $30,000 (software developer wages for 1 year). This is of course assuming that while I hire this other person I still get nothing myself. Hiring another developer would require me to setup a company, keep proper accounts, pay an accountant, hunt for a developer, interview developers, bring them up to speed on how Heist works and then manage them. Realistically this could take a couple of months to get right and would land a lot of extra work (but no extra money) on me. Kickstarter is still an option I'm considering, but _right now_ I don't feel it's the right fit for Heist.

## Conclusion

I think it should be fairly obvious that Greenlight is the only viable option here. Steam is such a fantastic marketing opportunity and Steamworks is such a huge amount of infrastucture work I don't have to do that it's easily worth paying the percentage fees to Valve.

I think the way forward from here is going to be to put Heist up on Greenlight concepts within the month, then perhaps move over to a full Greenlight game as soon as I have a single gamemode done (most likely construct mode). Exactly when I move from concepts will depend upon the feedback I get from people on Greenlight of course.