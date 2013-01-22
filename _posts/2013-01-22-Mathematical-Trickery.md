---
layout: post
category : Heist
tags : [heist]
tagline : Mind = Blown
---
{% include JB/setup %}


## TL;DR

Physics guns are probably more complex than you think.

## What Is A Physics Gun?

A [Physics Gun](http://www.youtube.com/watch?feature=player_detailpage&v=bDoarTCUxUA#t=72s) is just a device to manipulate physical objects in the world. It simply lets the person wielding the gun grab an object and then move, rotate or scale it. Obviously this is pretty important for the construct mode which is basically an _entire gamemode_ about moving, rotating and scaling stuff!

I've spent the last 4 working days building my physics gun - which was a lot longer than expected. This is mostly because I spent 2 days messing around with dot products and cross products and all sorts of nasty geometric mathematics, which got me nowhere useful, before I finally thought of a very cool trick.

## Attempt 1: Physics Guns Move Stuff

Ok, so attempt one was based on the (fairly critical) assumption that a physics gun is _all about moving stuff_. The scripting interface for tools supplies values indicating where the tool is, and which direction it is facing. So all I had to do was move the grabbed object around by however the direction and position values changed, Simple! This turned out to be something of a train wreck:

    local entityToolDirection = GetEntity().GetProperty("tool_direction");
    local entityToolPosition = GetEntity().GetProperty("tool_position");
    
    function UpdateTargetPosition()
        local relativeGrabDirection = (targetPosition - entityToolPosition.Value).Normalize();  --direction from tool to target grab point
        local requiredDirection = Vector3.New(entityToolDirection.Value).Normalize();           --Vector pointing from tool to where we want target to be
        
        --Now rotate target by angle between tool look direction and grab point
        local axis = relativeGrabDirection.Cross(requiredDirection);
        local angle = math.acos(relativeGrabDirection.Dot(requiredDirection));
        local rotation = Quaternion.CreateFromAxisAngle(axis, angle);
        
        --Apply rotation
        local body = GetBodyFromEntity(target);
        local transform = Matrix4x4.CreateTranslation(-entityToolPosition.Value) * Matrix4x4.CreateFromQuaternion(rotation) * Matrix4x4.CreateTranslation(entityToolPosition.Value);
        body.SetWorldTransform(Matrix4x4.New(body.GetWorldTransform()) * transform);
    end
    
Well... that was painful. Believe it or not this is actually a _simplified_ version of the mess I ended up with, it doesn't properly handle grabbing objects anywhere other than their dead center, and it doesn't really handle translation at all (it tries to but it doesn't work).

So how is this _meant_ to work? Let's pretend that all we want to handle is rotation, so that means all we need is to determine an axis (to rotate around) and an angle (the amount to rotate). Taking the [cross product](http://en.wikipedia.org/wiki/Cross_product) of the _vector to the grabbed object_ and the _tool look direction_ gets us an axis, then the dor product of the same two gets us an angle. Then these things can be used to create a quaternion (a clever mathematical thing which describes rotations) which we apply to the body to rotate it relative to the physics gun.

This is, to say the least, a little bit ugly. There are several special cases I skipped over in the example above, and it doesn't even do the entire job! [Here's a video](http://www.youtube.com/watch?v=cPVmPutUbu4) of the gun not working.

## Attempt 2: Physics Gun Stop Stuff Moving

Wait, what? That title makes no sense! Physics guns are all about moving stuff, aren't they? Another way to think of a physics gun is that it makes stuff *not* move _relative to the gun_. As the gun moves, the grabbed object will stay in exactly the same position relative to the gun no matter how you wave the gun around. It seems pedantic to restate it like that but it's actually very important because there are established ways to make one thing move relative to another which are nice and simple to use. Let's have a look (this is the complete thing, handling rotation and movement):

    local inverse = Matrix4x4.Invert(previousToolTransform);    --Invert frame of reference from last time
    local transform = CalculateToolTransform();                 --Calculate the frame of reference defined by the tool
    previousToolTransform = transform;
    
    local body = GetBodyFromEntity(target);
    body.SetWorldTransform(body.GetWorldTransform() * inverse * transform);
    
This is conceptually quite simple, all we do is transform the tool into the "frame of reference" defined by the tool. Before we do that though, we have to translate it *out* of the frame of reference from the last time - this is what the inverse does.

# Why Do I Care?

I spent several days working this out, and it was a non obvious trick to get something which _seems_ almost trivially simple to implement. Also, when I inevitably fall behind schedule I can point to this as an excuse ;)

# Latest Release

There's another release out in [the usual place](http://www.placeholder-software.co.uk/static-files/setup/heistgame/publish.htm). When you create the game, you should select construct mode and then you can create shapes, move them about the world and mess around with constructive solid geometry to create stuff.

## Coming Soon

I'm moving into mixing construct mode in with the city generation now. The _plan_ is to have this done in a month or two - if everything goes to plan (that was a joke. Haha. Fat chance) then I will have a release available in March with a playable construct mode, the city will hopefully be much more impressive (since I will use my own tools to add lots more detail) and I shall be prepping for a Greenlight release.