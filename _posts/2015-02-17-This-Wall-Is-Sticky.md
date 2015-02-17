---
layout: post
category : game-development
tags : [heist, game-development]
tagline : In Which Sticky Walls Are Discussed
---
{% include JB/setup %}


## TL;DR

I'm working on a sticky cover system, it's quite complicated.

## What Is Sticky Cover?

Sticky cover is a mechanic where you can move into "cover" and then move around inside the cover. Once you're in cover your input is handled in a different way; for example rather than A making you move left it instead makes you move left *along the cover*. Here's an example of some sticky cover in **Splinter Cell: Blacklist**:

<video id="Blacklist" width="640" height="360" controls preload>
    <source src="/assets/Blacklist-Cover.mp4" type="video/mp4; codecs=avc1.42E01E,mp4a.40.2">
    <source src="/assets/Blacklist-Cover.webm" type="video/webm; codecs=vp8,vorbis">
    <source src="/assets/Blacklist-Cover.ogv"  type="video/ogg; codecs=theora,vorbis">
</video>

You can see a few interesting things in the video:

 - Moving into cover requires just a single keypress
 - Once in cover moving around will not move you out of cover
 - There are special animations to move between cover
 - When in cover the game indicates *other* pieces of cover you can move to (watch out for little green arrows)

## Why Would You Want Sticky Cover?

Let's look at those three interesting points from the video again...

#### Moving Into Cover Requires A Single Keypress

Obviously sticky cover does not *add* anything to the game - you could just require that the player use the normal movement controls to get into cover. This isn't very nice though, it means that when the player wants to get into cover they have to wrestle with the controls to perform some precise maneuvering. having a *Take Cover* button means that the player isn't having immersion broken by wrestling with controls, instead they're moving around from cover to cover like a badass supersoldier.

#### Moving Around Will Not Move You Out Of Cover

This is kind of similar to the last point - if we didn't have sticky cover we could just require that the player move around carefully and not expose themselves. Once again this means the player is having to wrestle with controls to do what they want. With sticky cover you can move around confident you're not going to hold the D key one second too long and walk right out into the line of fire.

#### There Are Special Animations To Move Between Cover

Because the movement is context sensitive the game knows what you're trying to do and can play a more appropriate animations. To achieve this with non context sensitive controls you'd either have to try to detect what the player is trying to do (which will sometimes be wrong and thus very frustrating for the player) or to have an insanely complicated control setup which allows the player to perform all the different actions involved.

#### When In Cover The Game Indicates Other Cover

It's a fact that games aren't perfect simulations of the world, sometimes you'll look at something and say "yeah that's definitely good cover" but then it turns out it's actually 1 centimeter too short and it doesn't count as cover at all. Or maybe you're in some cover and you think "yeah that cover is within diving distance" and so you do your dive to move to that cover but it's 20cm too far away and now you're dead. With the game showing you where appropriate cover is neither of these are a problem - when you move into some cover you can be absolutely confident that your character will do what you expect and will end up in some valid cover.

## Let's Implement Sticky Cover

We're convinced that in a tactical game with cover we definitely want sticky cover - let's implement it! This is where it gets complicated.

#### Aside: Raycasting

Most of the heavy lifting of sticky cover is done with raycasting (in my implementation, at least) so we'd better understand what raycasting is! Raycasting allows you to pass a ray into the physics engine and get back everything that touches that ray, it's very cheap and so you can happily perform loads of raycasts each frame.

### Step One - Let's Find Some Cover

This is pretty simple: when the player presses the *take cover* key you need to find some cover. The first thing to do here is just to cast a ray out from the camera an appropriate distance and check if you can find a surface which could be cover.

<img src="/assets/Cover-Check-1.png" width="357" height="179" align="right">

Here we've got the thick black line indicating the ray coming from the camera and this hits the wall. The red line indicates the *normal* of the surface at the point where the ray hit. Here's our first exit condition: if the normal at that point is not roughly horizontal that means the surface is unsuitable to be cover.

We can test if the normal is horizontal with a [dot product](https://en.wikipedia.org/wiki/Dot_product). The dot product gets us the cosine of the angle between two vectors, so we can do `Normal . Up` and check that the value lies in some acceptable range.

### Step 2 - Is This Point Accessible?

<img src="/assets/Cover-Check-2.png" width="357" height="179" align="left">

So we have a point next to some roughly vertical surface, that's not enough to check if this is a cover point or not! We need to check if it's actually physically possible to *get* to this point.

##### Is There A Floor Below This Point?

If there's no floor, this clearly isn't a good place to try and stand. We can use the raycast and dot product check again. This time we need a ray *down* from the point on the wall and then we need to check if the normal at the point found points roughly upwards.

##### How High Is The Ceiling?

We could have found a perfectly acceptable cover point but the ceiling could be so low we cannot get there even when crouching! This time we don't care about the direction of the surface normal, instead we just want to perform a raycast upwards and check how far away the first hit is.

There is of course the possibility that the raycast won't hit anything at all because there is no roof. In this case I just return a sufficiently large value because it doesn't really matter so long as it's greater than the player character's standing height.

### Step 3 - Is This Actually *Cover*?

<img src="/assets/Cover-Check-3.png" width="357" height="179" align="right">

Let's say we've found a vertical surface with a floor below it and no roof above it, is this definitely cover? No. I could have just described a single brick lying in the middle of a field - it's accessible but it's too short; it's only cover for your toes.

We need to find out how high this vertical surface is. We can achieve this with a binary search along the surface. The lower bound of the search is at the floor point we've detected, and the upper bound is at the roof height we've detected. All we have to do is project a ray in the *opposite* direction to the surface normal, if we detect nothing we've clearly gone over the top of the cover (lower the upper bound of the search) and if we detect something we've hit the cover (raise the lower bound of the search).

### Yay Cover

<img src="/assets/heist-cover.jpg" width="357" height="179" align="left">

Now that we know how to find a cover point, what do we do with it? First thing we're likely to want to do is to move to it from a random nearby point. At the moment I achieve this by turning the character towards the cover and making it run, in the future I'm likely to replace this with a specific *move into cover* animation (a dive or a roll).

Once we're in cover then we want to handle the player pressing the left and right buttons. This should make the character move left and right *perpendicular to the cover normal*.

The first thing to do when the player presses a key is to search in that direction for cover points. I achieve this by simply probing to the side of the player, roughly 5cm away, if a cover point is found then the player can move. Since the test is performed every frame whilst the direction key is held down the game has 5cm of warning to stop the character from hitting the end of the cover. Once the game has found a cover point you simply need to start the strafing animation and to turn the player to face the normal of the newly found cover point (which may be different if you're moving around curved cover).
