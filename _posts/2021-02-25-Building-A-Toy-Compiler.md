---
layout: post
category : General-Development
tags : [compiler-series, compiler, yolol]
tagline : In Which A Compiler Is Born
---
{% include JB/setup %}

# TL;DR

I've been building a compiler for a toy language, it's fun and surprisingly simple.

# Compiler Series

Over the last couple of years I've been keeping an eye on [Starbase](https://store.steampowered.com/app/454120/Starbase/), an in-development game about designing and building spaceships. In particular I've been a member of [CYLON](https://discord.gg/Dcn7BG4) a server dedicated to exploring the in game programming language "Yolol". Developing tools for Yolol has been a fun platform for me to explore the world of parsers, optimisers, type checkers and compilers. In this series I'm going to explain how I built a complete Yolol->[CIL](https://en.wikipedia.org/wiki/Common_Intermediate_Language) compiler which runs code about 100x faster than a basic interpreter.

You may wonder: "Why should I read this if I don't care about Yolol/Starbase"? The point of this series isn't really Yolol - instead it's an overview of how to compile a fairly simple (although _not_ trivial) language to CIL so that it runs really fast. Hopefully these techniques could be applied to more useful domain specific languages to vastly speed up certain programs.

<ul>
    {% for page in site.tags.compiler-series %}
    <li><a href="{{ page.url }}">{{ page.title }}</a></li>
    {% endfor %}
</ul>

# An Overview Of Yolol

Although Yolol is not the main focus of this series I'm going to start by explaining the basics of the language, just to establish a basic understanding of things.

A Yolol program is limited to 20 lines with just 70 characters per line. A line is executed every 0.2 seconds. Any errors in a line (e.g. divide by zero) simply cause execution to fall through to the next line, this means that the layout of code on lines and correct handling of error is critically important to the semantics of the program! Many commonly used tricks in Yolol programs are based around deliberately triggering errors to break out of a tight single-line loop.

```
i=10                            // Setup loop counter
/* do work */ x/=i-- goto 2     // Keep executing line two until div zero error
                                // Fallthrough to here when loop is complete
```

A line of Yolol code consists of a list of statements separated by spaces. A statement can be:

 - goto line (e.g. `goto 7`
 - assign (e.g. `field=value`)
 - op assign (e.g. `field+=value`)
 - modify (e.g. `field++`)
 - if (e.g. `if a then statements else statements end`)

```
if x then i=10 else i=5 end i*=2 x/=y goto3     // You can use as many statements
d=c-- x/=i-- goto2                              // as you like as long as they
o=d goto1                                       // fit into 70 characters.
```

Yolol expressions are fairly basic. All of the basic mathematical operators are available (e.g. add/divide etc) as well as some comparison operators (e.g. greater than/equal to etc). There are also some "keyword" operators which take a single value and return a single value (e.g. `sin x`).

```
i=10
x=i*sin(12-7) y=x>i
```

Yolol only has two types: `Number` and `String`. Numbers are 64 bit with a fixed precision of just 3 decimal places! Strings are slightly odd - they can be manipulated with many (not all) of the normal mathematical operators. Combining strings and numbers results in the number being converted into a string before the operation happens.

Since Yolol has no indirect addressing at all (no arrays or pointers) strings contain some of the most powerful operations available in the language! Decrementing a string removes the last character and returns the rest of the string. Subtracting a string from another string removes the last instance of the second string from the first.

```
str="Hello" x=str--                             // x=="Hello", str=="Hello"
left="Hello, World" right="o" sub=left-right    // sub=="Hello, Wrld
```

All comparison operators simply return `1` for true and `0` for false. When evaluating if a value is "true" (e.g. in an `if` statement) the number `0` is false and _all_ other values are considered true.

```
if 0 then this_will_not_happen=1 end
if "hello" then this_will_happen=1 end
if "0" then so_will_this=1 end
x = not "Hello, World"                  // x==0
```

## Simple, But Not Trivial

As you can see Yolol is a fairly simple language with some interesting features. It's simple enough that I can write all of the tools necessary to work with it, but it's just complex enough that writing a those tools and optimising them is a fun challenge.

If you're interested in learning more about the language a member of the community has written an [excellent guide](https://yolol.info/landing) to getting started. After that, join [CYLON](https://discord.gg/Dcn7BG4) and say hi!