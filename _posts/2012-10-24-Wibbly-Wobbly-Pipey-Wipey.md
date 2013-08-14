---
layout: post
category : Heist-Game
tags : [heist, networking-series]
tagline : In Which Great Technical Depth Is Discussed (Again)
---
{% include JB/setup %}


## TL;DR

Network messages are sent in named pipes.

## Topics

In this series I'm covering 5 topics:

 - [Topology](/Heist/2012/10/14/Topological-My-Dear-Watson/)
 - [Session/Connection Initiation](/Heist/2012/10/15/Get-Up-And-Initiate-That-Session/)
 - [Delivery Guarantees](/Heist/2012/10/17/Say-What/)
 - Named Data Pipes
 - [Packet Encoding In C#](/Heist/2012/11/07/Packet-Encoding/)
 
## My Worst Nightmare

So far we've covered how Heist gets into a session, and then how it guarantees (or doesn't) delivery of packets. The question remains what do we actually put into packets now that we have the ability to send them? One Possible way to organise things is like this:

    Function PacketDelivered(Packet)
    {
        flag = Packet.ReadByte();
        if (flag == 0)
            HandleFooPacket(Packet);
        else if (flag == 1)
            HandleBar(Packet);
        else if (flag == 2)
            HandleBash(Packet);
        else if
            //And so on
            
That's one way of doing things, it's also horrible. Adding any new packet type requires manually updating this if statement, which would very rapidly grow out of control as it gained references to every networked part of your project so that it could route packets as necessary.

Of course the above can be made a little better, we could have something like this:

    Handlers = {};

    Function RegisterPacketHandler(Flag, Handler)
    {
        Handlers[flag] = Handler;
    }

    Function PacketDelivered(Packet)
    {
        flag = Packet.ReadByte();
        Handlers[flag].Handle(Packet);
    }
    
That's a bit better, now you don't have a massive if statement to keep updating _and_ the network system no longer has to reference every part of the entire project in an effort to route packets. It's still not great though, each handler has to specify a flag which isn't something it really cares about (and if two handlers specify the same flag it's game over). The instant thought that comes to mind here is to do this:

    NextHandler = 0;

    Function RegisterPacketHandler(Handler)
    {
        id = NextHandler;
        NextHandler = NextHandler + 1;
        Handlers[id] = Handler;
    }
    
But that doesn't work at all! Remember, this is a distributed system, we need the same number allocated to the same handler on all machines in the session otherwise this is all pointless. So, the RegisterPacketHandler function is going to need to specify _some kind_ of unique ID, and preferably it shouldn't be something arbitrary like a number.

## Named Pipes

This is where named pipes come in. When something wants to register a new type of packet it creates a named pipe like so:

    Pipe = Pipes.GetPipe("General Chat", true, true);
    
This example creates a pipe with the name "General Chat", which is Reliable and Ordered. Now it can subscribe to the pipe:

    Pipe.Subscribe(function(msg, sender)
        //received msg from sender
    end);
    
Once subscribed, any time any peer sends a message it will get sent across the network to all suscribing peers. Nice and simple.

## Strings are big, integers are not

This is where it gets complicated, strings are really big so we can't just go sticking a string at the front of every packet in place of the single byte we were using as a flag before. A single character of a string is _at best_ one byte long, and at worst could be 4 bytes long - for a single character!

Heist solves this problem by turning string names into unique integer IDs which it negotiates as pipes are created, an integer is 4 bytes long (and with clever tricks Heist only ever needs to send 3 bytes of it). Each pipe really has several names, the string name which everything externally refers to it as and one or more integer ID(s) which the internal piping system refers to pipes as, when a peer sends out a pipe packet it can use the integer ID as the flag instead of the string name which is an awful lot smaller. So, the basic execution of this is:

    Peer 1 Creates Pipe "General Chat"
    Peer 1 Assigns Pipe "General Chat" the ID 1
    Peer 1 Sends a message to all peers assigning ID 1 to Pipe "General Chat"

    --Time passes--
    
    All other Peers send back message confirming ID of "General Chat" is 1
    
    --Time passes--
    
    Peer N Creates Pipe "General Chat", which already has ID 1 assigned
    Peer N Sends message with flag 1
    
    --Time passes--

    Peer M Receives a message with flag 1, it knows this is shorthand for "General Chat"
    
We seem to have everything here, no matter which peer initially creates the pipe all peers use the correct ID and can talk to any other peer with the ID. What we're missing is a subtle race condition, what if this happens:

    Peer 1 Creates Pipe "General Chat"
    Peer 1 Assigns Pipe "General Chat" the ID 1
    Peer 1 Sends a message to all peers assigning ID 1 to Pipe "General Chat"

    --Time passes--
    
    Peer 2 Creates Pipe "General Chat"
    Peer 2 Assigns Pipe "General Chat" the ID 258
    Peer 2 Sends a message to all peers assigning ID 258 to Pipe "General Chat"
    
    --Time passes--
    
    Other Peers explode
    
After some investigation it turned out that every peer in the network session simultaneously exploding was not the optimal handling of this case. Luckily, I've already handled this! Remember I said that every pipe has a single string name and one *or more* integer ID(s), this is why. When a peer receives a message with an ID for a pipe it stores that ID as shorthand and sends back a confirmation to the peer which sent it, if it already has a shorthand stored for this pipe name well that's fine, now it has two. When a peer wants to send out a message it will use whichever shorthand it happened to receive first, since all other peers know about this shorthand that's fine and the second shorthand which got sent out is still stored and valid if a peer happens to send out a message using that shorthand.