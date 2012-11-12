---
layout: post
category : Heist
tags : [heist, networking-series]
tagline : In Which There is Much Talk Of Bytes And Bits
---
{% include JB/setup %}


## TL;DR

Sometimes the best way to make something smaller is to throw half of it away.

## Don't Throw That Away!

Last time I talked about the variable length encoding Heist uses for integers which are likely to be near zero. There were a few other lossless operations I listed which I should explain before moving on:

 - WriteVariableUint64
 - WriteRotationQuaternion64
 - WriteVector3Float32
 - WriteVector2Float32
 
### WriteRotationQuaternion64

A _rotation quaternion_ is a way of storing rotations in 3D space, it's the way Heist uses because the [BEPU Physics](http://bepuphysics.codeplex.com/) engine prefers to represent rotations like this. A rotation Quaternion has 2 parts, an axis vector and an angle of rotation. As axis vector is a 3 dimensional vector which represents an axis, this means it's values will all be between 1 and -1 and that the total length of the vector will be 1. An angle of rotation is a rotation about this axis and will lie between -1 and 1. An interesting property of rotation quaternions is that if we have a quaternion which has SOME_AXIS and SOME_ROTATION it is equivalent to the quaternion with -SOME_AXIS and -SOME_VALUE.

Write rotation quaternion takes advantage of all but one of these constraints to pack a quaternion down. The first thing to do is to make sure the rotation component is positive, once it is we know it will definitely lie within the range of 0 to 1. XNA includes a system for encoding 16 bit floats *which are in the 0 to 1 range*, so the angle is written out using this. The axis is pretty similar, the best encoding method to use is the same one used for the rotation but we can't do that directly (remember the value is in the -1 to 1 range), instead we simply divide the number by 2 (now it's -0.5 to 0.5) and then add 0.5 (now it's 0 to 1) problem solved!

    if (ANGLE < 0)
    {
        ANGLE = -ANGLE;
        AXIS = -AXIS;
    }
    
    WriteNormalizedFloat16(ANGLE);          //Must be in 0 to 1 range
    WriteNormalizedFloat16(AXIS.X / 2 + 1); //Remap into 0 to 1 range, then write
    WriteNormalizedFloat16(AXIS.Y / 2 + 1);
    WriteNormalizedFloat16(AXIS.Z / 2 + 1);

Did you notice which property isn't exploited here? We know that the axis values must represent a vector of length 1, this property could be exploited to increase the precision by encoding the signs of the axis elements and 2 of the 3 elements (less elements means we can take more space per element which means more precision). To decode this it's simple maths to calculate the value of the remaining element (and then give it the correct sign, which is stored explicitly). I don't do this because it's significantly more complicated than simply writing out 4 16 bit floats after some mathematical trickery!

### Write VectorNFloat32

These methods are pretty boring, they just directly write out the elements of a vector as full 32 bit floating point values. Used for things where large range and precision is important, e.g. position.

## Out With the Less Important Bits

The lossy encoding options aren't actually very exciting, all but 3 are trivial. Here are the trivial ones:

 - WriteFloat16. Lose some precision and write out a float using 16 instead of 32 bits
 - WriteRotationQuaternion32. Same as write quaternion 64, except use half as many bits for everything
 - WriteVector3Float16. Use WriteFloat16 for all elements of a vector3
 - WriteVector2Float16. Uuse WriteFloat16 for all elements of a vector2
 - WriteNormalizedFloat8. Wwrite a floating point value using 8 bits assuming it is in the 0 to 1 range
 - WriteRangeLimitedFloat8. Remap a number into the 0 to 1 range, then write a normalized float
 
## And We're Done

That's that, I'm fed up with talking about encoding numbers into bytes! I'm thinking about doing another series soon (tm) on how the procedural generation works in Heist which is a far more interesting topic (with much more screenshot potential).