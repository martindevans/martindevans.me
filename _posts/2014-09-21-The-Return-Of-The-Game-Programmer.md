---
layout: post
category : heist-game
tags : [changelog, heist]
tagline : In Which An Apology Is Made
---
{% include JB/setup %}


## TL;DR

I think my work with floor plans is **finally** over!

## The Revenge Of The Floorplans

As I said in my last update, just over a month ago, I've been working on floor plan generation and it's been a _lot_ more difficult than I anticipated! The difficulty comes from what I think is probably overloading too many responsibilities into the system - it tries to ensure that rooms stay inside the bounds of the floor, rooms don't overlap and to generate facades between rooms with appropriate markup about which facades link which pairs of rooms together. On top of this slightly overloaded design, the entire system is (obviously) about manipulating geometry and those kinds of system tend be to extremely complicated by their nature; subtle bugs to do with numerical accuracy, comparison tolerances and the like start to creep in. Essentially, this is my long winded excuse for no updates for a while: I've been making progress but nothing exciting or graphical - just lots of geometry manipulation functions.

However, I think all this is mostly behind me now. I've spent the last week *using* the floor plan system to generate train carriages (nice simple, self contained, single floor buildings - an excellent test case) and then ironing out the last few bugs I've found. When designing a floor plan there are now a lot of conveniences available:

 - Rooms may overlap other rooms, the overlap will be fixed automatically
 - Rooms may hang *outside* the building boundary, this will again be fixed automatically
 - Rooms may have zero wall thickness between them, the rooms will be shrunk to make space for a separating wall
 - Walls will be placed between all rooms
 - Walls will be placed around external wall bordering with rooms
 - Rooms can stamp features (such as doors and windows) into surrounding walls
 - Rooms are informed of what other rooms border them, and exactly where the borders are
 
All this make it pretty easy to write a floor layout script, for example here is a excerpt from one of my train carriage test scripts:

        protected override void CreateRooms(FloorPlan plan)
        {
            //Get some style values
            var wallThickness = HierarchicalParameters.InternalWallThickness(Random);

            //Create balconies on either end
            float balconyLength = Math.Min(3, Length / 10f);
            _balcony1 = CreateBalcony(plan, true, balconyLength).Single();
            _balcony2 = CreateBalcony(plan, false, balconyLength).Single();

            //Reference point to create rooms relative to
            var point = plan.ExternalFootprint.First();

            //Add seating room
            _seatingArea = plan.AddRoom(new Vector2[]
            {
                Offset(point, (balconyLength + 0.05f) / Length, 0),
                Offset(point, (Length - balconyLength - 0.05f) / Length, 0),
                Offset(point, (Length - balconyLength - 0.05f) / Length, 1),
                Offset(point, (balconyLength + 0.05f) / Length, 1),
            }, wallThickness, ScriptReference.Find<IClassicRoom, ISecondClassSeating>()).Single();
        }

        protected override void CreatedRooms(FloorPlan plan)
        {
            base.CreatedRooms(plan);

            _balcony1.Node.TryConnect(_seatingArea.Node);
            _balcony2.Node.TryConnect(_seatingArea.Node);
        }
        
These two methods are all that is needed to create 3 rooms (2 balconies, and an open seating area in the middle) and then to connect the balconies to the seating area with doors punched through the connecting wall. Making sure the rooms don't overlap, or hang over the side of the carriage is handled for you as well as placing all of the separating walls and determining what rooms are adjacent to what other rooms.

## Next!

My plan for the last month or two has been to build a tutorial-like level with little areas to teach/test each new mechanic. This will be very useful for me to develop each mechanic with it's own little contained environment to test and tweak the mechanic. Train carriages seemed like a good way to do this and so my tutorial level is going to be a train robbery (board the train, fight/dodge guards, move along the train, steal something from somewhere and then jump off the back). My work for the next few months is going to be building out new mechanics each week along test areas for them and probably also building some other small test levels as gameplay tests to see how fun the game is when all the mechanics interact together - exciting stuff!

## But Where Is My Video?

Coming Soon(tm). Building floorplan generation wasn't anything particularly graphical and so I didn't do any videos, developing gameplay mechanics is the *perfect* thing for a video to demonstrate the mechanic as well as discuss some of the game design choices I made involving it and so I'm really hoping (and looking forward to) I can get back to making weekly videos - possibly slightly longer or more frequent ones than the brief technical updates that I've done so far.