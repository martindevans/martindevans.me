---
layout: post
category : Heist
tags : [heist, networking-series]
tagline : In Which Great Technical Depth Is Discussed (Again)
---
{% include JB/setup %}


## TL;DR

Part #2 in my series on how Heist does networking stuff. This time about setting up a session and initiating connections.

## Topics

In this series I'm covering 5 topics:

 - [Topology](/Heist/2012/10/14/Topological-My-Dear-Watson/)
 - Session/Connection Initiation
 - [Delivery Guarantees](/Heist/2012/10/17/Say-What/)
 - Named Data Pipes
 - Packet Encoding In C#
 
## Making The First Move

There are two parts to session initiation:

1. How to host a new session and advertise it to the world
2. How to find an existing session and join it

## Hosting A Session

### Global Server List

When a peer starts a new game session it submits some information to a [central server list](http://metaserver.placeholder-software.co.uk/serverlist/Game_Name/create-server) and gets back a JSON response which indicates that this server will be listed for the next 2 minutes, this response includes a special control key. While the game is still running the hosting peer can use the control key to "ping" the game and reset the timer, or it can specifically delete the game from the list.

### NAT Negotiation

NAT (Network Address Translation) is a technique used by routers to translate one network address space into another. For example your home router has one single IP which the general internet can talk to, and yet you (probably) have multiple computers attached to that router all with different addresses - this translation from a single public IP to multiple private IP addresses is NAT. NAT is evil.

NAT is evil because it makes establishing an inward connection _really hard_ impossible. Here's an example:

 1. You have a home network, with 2 computers, one of which is hosting a Heist game
 2. I try to join your game, so a packet gets sent to your router
 3. Router receives a packet and has no idea which of the two computers to send it to, so it ignores it.
 
Fail.

So, we need some way to convince the router that it needs to send packets on a certain port to a certain machine inside the network. For this purpose the hosting peer listens to a (pubnub)[http://www.pubnub.com/] channel. Pubnub is a cloud messaging service which basically allows you to create a named pipe and then anyone anywhere in the world (with the correct details) can send a receive messages on this pipe. Critically pubnub doesn't care about NAT because the internal computer establishes an outward connection to the pubnub servers. Once an outward connection is established breaking through NAT is possible, the connecting peer can talk to the hosting peer and they can negotiate some way through the NAT (more on this later).

## Joining A Session

### Global Server List

The hosting peer, as mentioned, lists it's game session on a global server list. Logically, the place to start to find a session to join is this list. If you submitted a server at [that link earlier](http://metaserver.placeholder-software.co.uk/serverlist/Game_Name/create-server) try visiting [this link](http://metaserver.placeholder-software.co.uk/serverlist/Game_Name.json) now - if you read all of the above in under 2 minutes then your fake server entry should still be listed. The server list returns 7 pieces of information:

 - Name. The name of this session.
 - Game. The game which this session is part of, e.g. Heist
 - Port. The network port to talk to this server on.
 - IP. The IP of the session host as perceived by the session host, this will usually be a local IP from behind NAT.
 - RemoteIP. The IP of the host as perceived by the server list, this will usually be the public IP.
 - Tag. Any arbitrary information.
 - Id. A unique ID for this server.

### NAT Negotiation
 
As I mentioned before, at this point the host server is sitting around listening to a pubnub channel waiting for something to happen. The connecting peer now connects to the same pubnub channel and sends a message to the host containing telling the host the public IP of the connecting host. Now is when the NAT punching happens, the host now knows who is trying to connect to it and where from so it also starts trying to connect back to them - the router(s) sitting in the middle performing NAT will see an incoming stream of packets on Port X _and_ an outgoing stream of packets on Port X, it will reasonably assum ehtye have something to do with one another and will route the incming packets to the computer which sent the outgoing packets.

To be honest this is a pretty nasty hack, it works in most circumstances with your normal NAT configuration but won't work in many others. Such is the nature of NAT negotiation though.

### Why 2 IP Addresses

I'm sure you're asking yourself right now why the server list has 2 IP addresses for the game host. Interesting question, here's a subtle case for you to consider... What if the host and the peer are both _behind the same NAT_?

In this case, if the connecting peer tried to connect to the public IP of the host it would be connecting to the public IP of its own NAT. The router would get very confused because it would see an outward stream of packets from the connecting peer to... itself? And then another outwards stream of packets from the host, trying to initiate a connection back to... itself again?

Instead, Heist handles this case itself. Before trying the whole NAT punching pubnub negotiating thing Heist just tries to connect to the local IP of the server, if the connecting peer just happens to be on the sharing the same NAT as the hosting peer then the connection will be established successfully and the connecting peer will never progress to trying out all the clever NAT tricks.

## Everything Is More Fun With Three People

This is all very nice, but Heist supports more than 2 peers (technically it supports 256, but only if the peers have an awesome upload rate). So, let's pretend we have a session set up with two peers and a third peer wants to join, what does it do?

First peer3 connects to the host peer as usual. When any peer connects the host peer responds with a blob of important session information, part of which is a list of other peers in the session (with each peer having 2 IP addresses listed, same as before, so that NAT can be negotiated if necessary). After this point everything is the same as before, peer3 now has a load of IP address pairs it has to connect to if it wants to join the session and it can simply work through them one by one negotiating NAT as necessary over the pubnub channel.
 
http://metaserver.placeholder-software.co.uk/serverlist/Heist_Debug.json