---
layout: post
category : Heist-Game
tags : [heist]
tagline : In Which The Death Of Lua Is Announced
---
{% include JB/setup %}


## TL;DR

I'm replacing Lua scripting in the engine with C# scripting.

## Scripting Is Dead

### Disclaimer

I think [Lua](http://www.lua.org/) is pretty cool, it's a very minimal and elegant language. for small tasks (configuration files, throwaway scripts, UI mods etc) Lua would probably be my choice of language. This post should most certainly *not* be read as a criticism purely of Lua!

### Let's Talk About Dynamic Languages

[Dynamic languages](https://en.wikipedia.org/wiki/Dynamic_programming_language) are languages which defer some of the things traditionally done at compilation time to runtime. The most obvious example is deferring compile time type checking to runtime time checking, another common feature is modifying objects at runtime. Python, Javascript\*, Ruby and Perl are all examples of inexplicably popular dynamically typed languages.

#### Python

I've never particularly liked dynamic languages - it always seemed pretty stupid to be to *delay* useful stuff like type checking until runtime. For example my experience with learning Python\** (my first dynamic language) was constantly referring back to the documentation because method signatures are useless:

    def __init__(self, *args):
    
So... how exactly do I call this again? Better refer back to the documentation because I don't have a type system constraining me to only passing in the correct things! Naturally, if you do anything wrong you don't know until runtime. 

If you're thinking "It's ok, unit tests solve this" then you're an idiot and you need a new Job - writing unit tests (which are essentially hand written compile time checks) to check types is a total waste of my time. Unbelievably there are even [lint tools](http://c2.com/cgi/wiki?PyChecker) for python - quite why anyone would waste their time writing a heuristic compile time checker for a dynamic language is beyond me.

#### Javascript

I should mention Javascript, probably one of the [worst languages I have ever used](http://stackoverflow.com/a/359509/108234). Javascript is not only dynamic it's also [weak](https://en.wikipedia.org/wiki/Strong_and_weak_typing) (i.e. it tries to completely pretend there's no such thing as types). For example:

    var a = "a";
    var b = 1;
    print(a - b);
   
This is a pretty stupid thing to want to do, what does a string minus an int even mean!? In C# (statically and strongly typed) you'd get an error (at compile time, which usually means about 1 second after you've typed it):

    Operator '-' cannot be applied to operands of type 'int' and 'string'

In Python (dynamically typed, still strong) you'd get basically the same error, just deferred to runtime:

    TypeError: unsupported operand type(s) for -: 'str' and 'int'
    
What about Javascript (delusionally typed)? It says "Sweet, a string minus an int, yeah I can do that!":

    NaN
    
Fuck you. This happens because Javascript will coerce things to hell and back before it admits there's such a thing as types! Coercing "a" to a number makes no damn sense and (rather than _actually_ failing) Javascript just says, "yeah, I can totally do that, it's NaN". Which of these three responses is the most useful, I wonder?

I'm just going to leave this here:

((([][[]]+[])[(!![])]+'')[(-~(!![]))+(~~(!![]))+(~~(!![]))])+((0/0+'')[~~(!![])])+(([1, 2, 3][!!({}==[])]+'')[-~4])+(""+([]===[]))[-~(!![])]

That is some perfectly valid javascript. Try executing it.

\* To be fair, if you're doing web development you don't have much choice to use Javascript ([until recently](http://www.typescriptlang.org/)). But that's another blog post.

\*\* It's been a *really* long time since I've used python and I've done my best to forget the eldritch horrors I encountered when learning it. Therefore my examples are stolen from [here](http://widgetsandshit.com/teddziuba/2008/12/python-makes-me-nervous.html)

### Let's Talk About Lua

I expect it's clear by now that I don't really like dynamic languages, which leads to the natural question: "Why the hell did you spend 1.5 years writing a game engine scriptable in Lua?". My aim with the Heist engine was (and still is) that it would be *very* moddable - even games that I myself write for the engine are really just mods. I thought that it would be easier for a newbie/hobbyist programmer to edit a bit of Lua code than to fiddle around with the big scary C# and it's angry compiler. The thing is the big angry compiler is seriously useful - if you make a little mistake calling one of the many engine methods it will tell you before you can even compile your mod. This is approximately 1000000x better than running a script to generate a city and _hoping_ that your script gets selected to do whatever it does and then hoping you notice the error in the log spam.

There's another problem with Lua - it's very different to C#. The Heist Engine is written in C# and the plugins for it (were) written in Lua, to facilitate this I have wasted vast amounts of time writing a huge library of code (both Lua and C#) which exists purely for the purpose of translating between how the two languages want to do things. For example, here's a script which simply adds a cube into the world:

    function Subdivide(node)
        local cube = CSG.CreateCube().Translate(Vector3.New(1, 10, 20));
        node.World.Union(cube);
    end

In these two lines of code the boundary between C# and Lua is crossed 6 times. Every single one of those times requires a load of complicated code to coerce types back and forth (which is not only slow and difficult to write, it's also very slow to execute). I finally got fed up with this the other day and decided to do something about it...

## Long Live Scripting

So, I'm getting rid of Lua. I'm replacing it with the only sane solution for scripting a C# game engine: C#.

The Heist engine has been abandoned. I've ported all the non scripting related code (most of it) to a new Engine called *[Epimetheus](https://en.wikipedia.org/wiki/Epimetheus_(mythology))*. This change gives me mods which are:

1. Strongly typed (more robust)
2. Faster to execute (faster city generation)
3. Less memory hungry (bigger cities)
4. Easier to write (more in varied cities)
5. Easier for *me* to design a scripting interface for, which means...
6. A more comprehensive scripting interface, which means...
7. More powerful mods, which means...
8. More game modes!
9. Better language support (don't like C#? Use some other [CLI language](https://en.wikipedia.org/wiki/List_of_CLI_languages))

Everyone wins!

## There's No Such Thing As A Free Lunch

The down side to all this is that any previous timetable I had has gone out of the window. I've got to rewrite the entire scripting interface for C#, of course this shouldn't be very difficult since all the code I'm trying to expose to scripts is *already* written in C#! Then I have to port all the old mods over to C#, which will be a little more difficult. That said, I'm certain that any time I spend now will be *easily* saved in the future which much more robust and rapidly developed mods both by myself and others.