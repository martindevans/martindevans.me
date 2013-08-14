---
layout: post
category : Heist-Game
tags : [heist, networking-series]
tagline : In Which Great Technical Depth Is Discussed (Again)
---
{% include JB/setup %}


## TL;DR

I have a pretty neat system based on C# generics and reflection for encoding of packets.

## Topics

In this series I'm covering 5 topics:

 - [Topology](/Heist/2012/10/14/Topological-My-Dear-Watson/)
 - [Session/Connection Initiation](/Heist/2012/10/15/Get-Up-And-Initiate-That-Session/)
 - [Delivery Guarantees](/Heist/2012/10/17/Say-What/)
 - [Named Data Pipes](/Heist/2012/10/24/Wibbly-Wobbly-Pipey-Wipey/)
 - Packet Encoding In C#

## The Question Remains

[Last time](/Heist/2012/10/24/Wibbly-Wobbly-Pipey-Wipey/) I talked about *how* packets get routed to the right place through pipes, the question remains *what* exactly gets sent? The obvious solution is just to say that all pipes send and receive byte arrays. That's a pretty terrible solution though, it means that every sender and receiver needs a load of logic for translating binary blobs into some type of data. It's obviously going to be better in the long term to encapsulate the translation somewhere else, so that's what Heist does. A pipe directly sends and receives types (in C# parlance, pipes are _generically typed_), the pipe system finds a translator which knows how to turn Type(T) into a binary blob and then back again.

Translators in Heist are just a class which extends the BasePipeTranslator&lt;T&gt; class, when the pipe system wants to find a translator it simply scans all of the loaded types available to it and finds the one where T is the type it wants. Of course, writing a translator is usually really trivial:

    class Vector3Translator
        :BaseTranslator<Vector3>
    {
        public override Vector3 FromBytes(BasePacketReader stream)
        {
            return new Vector3(
                stream.ReadSingle(),
                stream.ReadSingle(),
                stream.ReadSingle()
            );
        }

        public override void ToBytes(Vector3 data, BasePacketWriter stream)
        {
            stream.WriteSingle(data.X);
            stream.WriteSingle(data.Y);
            stream.WriteSingle(data.Z);
        }
    }
    
What's going on here is fairly simple. The BaseTranslator&lt;Vector3&gt; class is abstract and requires that ToBytes and FromBytes are implemented, what each one does is (I hope) fairly obvious. The BasePacketWriter and BasePacketReader are convenience classes which implement reading and writing of all the basic primitive types (int, uint, short etc) which I'll talk about in more detail in a minute.

So how is this used? Here's a basic example of a pipe which sends and receives Vector3's:

    var pipe = GetPipe<Vector3>("Name Of This Pipe");
    pipe.Send(new Vector3(1, 2, 3));
    
That's it! The system automatically finds a translator for Vector3, and every time Send is called it passes the value through the ToBytes method and sends the resulting blob of bytes across the network.

## Reusability is cool

There's another cool use of this translator system which makes writing translators quite simple in many cases. The BasePacketWriter type has a generically typed method Write&lt;T&gt; which (similarly to pipes) finds a translator which knows how to translator type(T) into binary and back and then uses it. This means that translators can easily use other translators inside themselves, for example:

    class PhysicsStateTranslator
        :BaseTranslator<PhysicsState>
    {
        public override void ToBytes(PhysicsState data, BasePacketWriter stream)
        {
            stream.Write<Vector3>(data.Position);
            stream.Write<Vector3>(data.Velocity);
            stream.Write<Vector3>(data.Orientation);
            stream.Write<Vector3>(data.AngularVelocity);
        }
    
        public override PhysicsState FromBytes(BasePacketReader stream)
        {
            return new PhysicsState(
                stream.Read<Vector3>(),
                stream.Read<Vector3>(),
                stream.Read<Vector3>(),
                stream.Read<Vector3>()
            );
        }
    }
    
As you can see, PhysicsState wants to send 4 Vector3s, so instead of writing out all 12 floats one by one it uses the Write&lt;Vector3&gt; method to invoke the Vector3Translator. I think that's pretty cool!

## Clever Bit Twiddling Hacks

*I'm going to do another set of blog posts of some of the clever bit twiddling used within Heist but here's a bit of a taster ;)*

As I mentioned earlier the BasePacketReader/Writer classes handle reading and writing of the primitive types. This is *not* as simple as it sounds, every bit counts when it comes to packing data into a network packet! Most values can be encoded in such a way that more common values use a smaller amount of space than less common ones. For example Heist has an encoder that writes out arrays of items, it's obvious that most arrays are going to be quite small _but_ I don't want to enforce a hard limit by encoding the length as a byte. So in this case the length of the array is encoded using "variable length encoding", this writes out the bytes of the value in 7 bit chunks, each byte uses 7 bits to store actual data and then a single bit to indicate if there are more bytes of data coming up.

This principle applies to a load of different values and so the packet reader/writers have many different helper methods for encoding data in different ways. Here's a list of all the most interesting encoding methods, I'll talk about these soon (tm):

 - WriteVariableUint64
 - WriteFloat16
 - WriteVariableFloat16
 - WriteNormalizedFloat8
 - WriteRangeLimitedFloat8
 - WriteRotationQuaternion32
 - WriteRotationQuaternion64
 - WriteVector3Float32
 - WriteVector3Float16
 - WriteVector2Float32
 - WriteVector2Float16