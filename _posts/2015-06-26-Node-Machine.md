---
layout: post
category : heist-game
tags : [heist, procedural-generation]
tagline : In Which Node Machine Is Microvlogged About
---
{% include JB/setup %}


## TL;DR

I've been working on the procedural generation toolkit NODE/Machine.

## Why NODE/Machine?

About a month ago I decided that one thing I really needed to be able to show off the game properly was a decent looking level. A huge amount of work has gone into my procedural generation system and I have a lot of really powerful tech lying around unused. There is a good reason this tech has gone unused: writing scripts to define geometric objects is a *massive pain in the ass*. Now if *I*, the creator of the system, find this to be a problem no one else is going to stand a chance so something had to be done.

## Enter Stage: NODE/Machine

NODE/Machine (NM) is a procedural generation toolkit I have been building to help solve this problem. It is essentially an IDE and a collection of domain specific languages for creating various parts of a procedural world. The first part of this was mentioned in my last post; a 2D layout system for designing procedural facades. I've put out a few videos about this on twitter, here's the latest one on facades:

<video style="width:  100%; height: auto;" src="/assets/fancyfacade1.webm" controls="true"></video>

As you can see from this there's some markup (inspired by [WPF](https://en.wikipedia.org/wiki/Windows_Presentation_Foundation) and syntactically based on [YAML](http://yaml.org/)). This markup has some elements specifically designed for facades. For example the "Fit" element has a single child and clones it multiple times into the available space - this wouldn't be very useful for a UI layout language but is great for facades where you often want to repeat a common element such as a window several times.

Another key feature of NODE/Machine that you can see here is that it connects to the game and sends designs across instantly. This means you don't have to visualise the complex geometry that you're working on in your head, and you don't have to wait a long time to restart the game and reload the entire level just to see one item.

## Building Ex NODE/Machina

The next feature I worked on after facades was the first part of building generation - what floors are placed into a building. This is basically a 1 dimensional problem - just a basic stack of floors. I took the same approach as with facade markup; creating a DSL based on YAML for laying out floors in a single dimension.

Here's an example of a building:


    !Building
    Aliases:
      - &residential_floor_count !NormalValue
        Min: 2
        Max: 5
    Verticals:
        # First lift from ground->lowest skylobby
        - Tags: { 1: [lift] }
          Bottom: !Num { N: 0 }
          Top: !Id { Id: Skylobby, Search: Up, Filter: First }
    
        # Set of lifts from skylobby up to next skylobby
        - Tags: { 1: [lift] }
          Bottom: !Id { Id: Skylobby }
          Top: !Id { Id: Skylobby, Search: Up, Filter: First }
    
        # Express lift for penthouse
        - Tags: { 1: [lift] }
          Bottom: !Num { N: 0 }
          Top: !Id { Id: Penthouse }
    Floors:
      - !Floor
        Tags: { 50: [roof, garden], 50: [roof, helipad] }
      - !Floor
        Tags: { 50: [penthouse], 50: null }
      - !Repeat
        Count:
          Min: 1
          Max: 5
        Items:
          - !Floor
            Id: Skylobby
            Tags: { 1: [skylobby] }
          - !Range
            Includes:
              - Count: *residential_floor_count
                Tags: { 1: [apartment] }
      - !Floor
        Tags: { 1: [ground floor, lobby, shops] }
      - !Ground {}

There's really two main things going on here, floors and verticals. Let's look at floors first. The lowest items in the floors array is a marker for the ground, anything below this is a basement. Immediately above this is a **!Floor** tag which means we're specifying a single floor. The items in the **Tags** object define what this floor will be, a *floorplan* script will be found which has all of the specified tags. The *number*, which is the key, is the probability of this set of tags being selected, so if you look further up you'll see some floors with two options and a 50/50 chance of choosing each.

The floors also have a **!Repeat** tag, which means the children of this item are repeated some number of times. Here the count is set to between 1 and 5 repeats in the *Count* property. The items being repeated are, from the top down, a single floor (a skylobby, in this case) and then a *range* of floors.

A **!Range** is a set of *includes* which be output by the parent, but in no specific order. There's only one include in this example, so this range isn't really very useful. An interesting thing to note is that the *Count* here is set to **residential_floor_count* - what does that mean? YAML allows us to define named objects, such as:

    - &residential_floor_count !NormalValue
      Min: 5
      Max: 10

We can then reference this named object somewhere later in the markup. If you look right at the top you see the residential_floor_count is defined in the *Aliases* property. This is important because every time the range gets repeated we always use *exactly* the same Count object - this means every repeat has the same number of floors included.

Finally at the top we have two more floors. One is a 50/50 chance of a penthouse or null, if null is selected then no floor is created at all. The other is simply a roof with a 50/50 choice between two different types of roof.

An example output from all this is:

 - roof, garden
 - penthouse
 - skylobby
 - apartment
 - apartment
 - apartment
 - skylobby
 - apartment
 - apartment
 - apartment
 - skylobby
 - apartment
 - apartment
 - apartment
 - ground floor, lobby, shops

Exactly what we expected: A ground floor, followed by several exactly duplicated runs of apartments and skylobbies, with a penthouse and a roof garden at the top.

The other part of that example code above is *vertical elements*, this is things like stairs, lifts, fire escapes and ventilation shafts which are vertically oriented and thus cross several floors. The code for this, duplicated from above, is:

    Verticals:
        # First lift from ground->lowest skylobby
        - Tags: { 1: [lift] }
          Bottom: !Num { N: 0 }
          Top: !Id { Id: Skylobby, Search: Up, Filter: First }
    
        # Set of lifts from skylobby up to next skylobby
        - Tags: { 1: [lift] }
          Bottom: !Id { Id: Skylobby }
          Top: !Id { Id: Skylobby, Search: Up, Filter: First }
    
        # Express lift for penthouse
        - Tags: { 1: [lift] }
          Bottom: !Num { N: 0 }
          Top: !Id { Id: Penthouse }

There are three vertical elements here. Each one has a set of tags which works in the same way as floors (multiple sets of tags, and relative weighted probabilities). The *Bottom* and *Top* properties are "floor selectors" (vaguely inspired by CSS selectors) which matche sets of elements. Vertical elements are created between *every pair* in the top and bottom sets.

Hopefully it should be fairly self explanatory how these work. The top one is hardcoded to match floor 0, and the finds floors with ID "Skylobby", the Search direction and filter ensures it only finds at most one floor and that will be the lowest skylobby. The middle one finds *all* skylobbies as the bottom, and then from each skylobby finds the single next skylobby upwards. Finally the third one matches the ground floor (floor 0) and the penthouse - in some cases the penthouse doesn't exist in which case this selector simply does nothing because it creates zero *pairs* of floors.

Here's my latest video featuring building floor selection:

<video style="width:  100%; height: auto;" src="/assets/BuildingGeneration1.webm" controls="true"></video>

 ## What Are All These Embedded Videos?
 
 I haven't done a full youtube update for a couple of weeks; those videos take several *hours* to script, film, record, edit and upload (even if they're only a few minutes long). Instead I have been experimenting with making "micro updates" in webm form and then sharing them on twitter. These videos are entirely unscripted, and I don't edit them at all - they take as long to make as they do to watch! I've really enjoyed making these and I actually plan to start doing one a day, just covering whatever random progress I made that day.
 
 If you want to catch these micro video updates [follow me on Twitter](https://twitter.com/martindevans).
 
 
 
 
 
 
 





