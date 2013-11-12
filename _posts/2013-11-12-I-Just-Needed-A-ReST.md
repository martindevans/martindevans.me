---
layout: post
category : heist-game
tags : [heist, game-development, rest]
tagline : In Which A 42.195 Kilometre Sprint Is Completed
---
{% include JB/setup %}


## TL;DR

I've completed a whole load of really big tasks in the time since my last update.

## Scripting

In my [last post](/heist-game/2013/08/14/Scripting-Is-Dead-Long-Live-Scripting/) about the game I talked about how I was starting to replace the old Lua scripting system with a new C# scripting system. I finished up the post by pointing out how this was going to set back any previous timetables I had but that I would hopefully save time in the future. Well I was totally right (on both accounts, so that makes this pretty neutral news).

It took a while to figure out how Appdomains work to properly sandbox scripts but I now have a _much_ better scripting system. The biggest gain is simply having proper types which means I'm no longer constantly consulting documentation on exactly what arguments a function requires (and then in the function itself asserting that the arguments are of the right type and doing lots of silly coercion etc). On top of that C# is simply a faster and more powerful language than Lua, so scripts are much more testable, easier to write and faster to execute. I think the new scripting API is going to be *loads* more accessible to modders - simply add a reference to EpimetheusPlugins in your C# project and intellisense will tell you the rest!

The downside of course is all the lost work. All the various mods I had implemented like the [circular city](/assets/CircularCity.png), Deathmatch, Construct mode, various tools and weapons, [BigSkyscraper](/assets/BigSkyscraper.png) and others are all gone and must be replaced.

## Multiplayer

I have made [two](/heist-game/2012/06/18/Multiplayer-Release/) [attempts](/heist-game/2012/10/13/OMG-WTF-Multiplayer/) at multiplayer before, both times I got a basic multiplayer system working before encountering some annoying difficulties with something like session handling, session initiation, joining in progress, players dropping mid game, entity ownership etc etc and moved on to another task. I didn't want to talk about multiplayer a third time until I had something solid working.

This time I've made a totally new multiplayer session handling system all implemented on top of Steamworks. When a game is in progress all the players are in a steam lobby together, thus if any kind of session management stuff needs to be done (e.g. sending a message to another peer before the session is fully initiated) I don't have to mess with a half initiated session instead I just send the message via the steam lobby! Obviously the lobby is also used pregame for player chat and choosing game configuration options.

There is one really massive huge problem with this: I don't have any kind of agreement with steam to distribute the game (I will hopefully be on greenlight before 2013 ends). This obviously means that I cannot distribute the game in its current form. However the whole steam lobby dependency well abstracted and when I eventually get around to implementing my own lobby system I can swap out steam and distribute that version of the game.

## Logging

This is going to sound stupid but it's true: after nearly two years of development I've added proper logging into the engine. It's not complete but now that I have a [logging framework](http://nlog-project.org/) built in it's really easy to wire up a class with logging messages when I encounter a problem with the class. Sometimes I even just wire up a class with logging when I'm bored to pass the time (_very_ bored).

## ReSTful API

One thing that I was unhappy with for a long was how the main menu worked: the menu rendered a webpage (from a file) and also bound a load of C# messages as global javascript functions. I ended up with a horrible ad-hoc mess of bound functions and no good way to interact with them because javascript frameworks all assume (quite reasonably) stuff happens through AJAX and not magic global functions!

There's an obvious solution here, in fact I already mentioned it: if javascript frameworks are all built around using AJAX then why not use AJAX? This seemed totally crazy since this means the game would have to be run a local webserver in the background! Really though there's nothing wrong with that - the UI is a website so why not serve it properly?

This has turned out to be the second best (after C# scripting) change I've ever made to the engine. It started off as a simple API exposing all the configuration options of the engine:

 * GET **http://localhost:41338/config** (list all options)
 * GET **http://localhost:41338/config/{option name}** (show specific config option)
 * PATCH **http://localhost:41338/config/{option name}** (change a specific config option)
 
 This meant I could get rid of the equivalent methods I was binding before and it seemed to work nicely. It had the added little bonus that you could visit these links in your browser while the game is running and interact with the backend API yourself. Since this experiment worked I went and replaced all of the methods bound in the main menu, this reduced MainMenu.cs from a 500 line beast with lots of complex handling for marshalling async callbacks back onto the UI thread to post results back into the javascript context down to this:
 
    public class MainMenu
            :AwesomiumScreen
    {
        public MainMenu(IKernel kernel)
            : base(kernel, Path.Combine(Configuration.UiDirectory,"Screens\\MainMenu2\\MainMenu.html"))
        {
        }
    }
    
That seems like an improvement to me! There was still one thing here that I was unhappy about though and it's that URL hardcoded in there. The way that works is that whatever path you have configured as your UiDirectory must have a file MainMenu.html at that relative filepath (if it doesn't then you don't get a MainMenu shown, bad luck).

The way any other content in the engine is located is you supply a path fragment and it basically finds any file in any mods directory which ends in that fragment. So if you're looking for "foo/bar.bash" it'll find things like:

* Mod1/foo/bar.bash
* Mod2/directory/foo/bar.bash
* Mod3/directory/directory/foo/bar.bash

Why should menu locations be any different? The Main menu is making two mistakes here:

1. Specifying the UiDirectory instead of searching *all* mods
2. Being too specific and not just searching for MainMenu.html

Now I already had an API endpoint which would give back the contents of any file in a mod. Using the example file paths from above:

    http://localhost:41338/modifications/The_ID_Of_Mod_1/foo/bar.bash
    
This would return the contents of the file **foo/bar.bash**. So really the MainMenu should be using a path like this to serve itself. All that was needed was a way to take MainMenu.html and locate which mod and what path to serve. So the new MainMenu.cs looks like this:

    public class MainMenu
        :AwesomiumScreen
    {
        public MainMenu(IKernel kernel)
            : base(kernel, new Uri("http://localhost:41338/views/MainMenu.html"))
        {
        }
    }
    
"views" is an endpoint that will take the rest of the URL as a search path and search all installed mods for that path, once it finds something that matches it redirects to that file and renders it out as a html view. This makes the new menu system loads better than the old one, now you no longer need all your UI elements in one mod (specified by the UiDirectory option), instead any file in any mod which can be a menu is found as used as appropriate!

#### Simple Tools Built Quickly

Since this journey of discovery improving the MainMenu.cs I've added lots of extra capability to the ReST API:

* The entire lobby menu interacts with the steam lobby object via the API (plus a websocket for delivering live messages). 
* All screen transitions are managed via the API
* Various engine performance statistics are published on the API
* Details of the render pipeline (with images showing each stage) are published via the API (and the entire render pipeline can be reorganised with a simple PUT)
* All entities currently in the scene are shown in the API and can be created, deleted and updated with HTTP requests

The consequence of all this power being in the API is that if I want a tool to do a single job I can build it as a webpage and act through the API. For example, if I want a tool to show all the lights in the scene and manipulate their positions/colours that's a nice simple webpage to throw together and then I can fiddle with the lighting of the scene in real time from a nice simple purpose build tool.

## Ivory Towers/Coming Soon

I'm sure some people who are following the project have thought it (I certainly have): I'm building lots of cool engines tech but no games! For the past two years I've been building the engine tech to do some pretty unprecedented stuff (vast procedurally generated) worlds, I'm finally at the point where it's all mature enough for me to start working on games! I finished work on the entity API today and tied up a lot of little loose ends before moving on to the next big sprint (tomorrow).

The next two things I do are going to be:

1. Deathmatch
2. Heist

The deathmatch is the simplest gamemode I can implement. Simply some people in a multiplayer session killing one another with guns. This will be a test of all the basics of the system such as generating small shared worlds, physics, player movement, hit detection etc etc. The Heist mode will start off as a _very_ basic iteration over this, it will basically just be a box (labelled _loot_) which the players can pick up and carry to a certain point to win the game. Once I have this basic Heist mode I can start working on the features that make Heist fun such as complicated buildings containing the loot, alarm systems guarding the loot and NPCs populating the world around the loot.