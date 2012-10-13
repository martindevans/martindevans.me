---
layout: post
category : Heist
tags : [heist]
tagline : In Which Great Technical Depth Is Discussed
---
{% include JB/setup %}


## TL;DR

In depth talk about the technical details of how networking in Heist works #1

## Fair Warning

Networking is a huge topic, and I'm going to be talking about a lot of technical details. This is not going to be a blog post for the faint of heart!

## Where To Start?

There's a lot to talk about with networking, I'm going to try and cover all these topics:

 - Topology
 - Session Initiation
 - Connection Initiation
 - Delivery Guarantees
 - Named Data Pipes
 - Packet Encoding In C#
 
That's a lot of topics though, so I'm going to cover each one in a separate blog post rather than writing one colossal post right now!
 
## Topology

Heist is built to be a peer to peer game where every peer in the session should have a connection to every other peer in the session. This has a few advantages and a few disadvantages:

The Good:
- Less Latency
- No Central Point Of Failure

The Bad:
- More Complex Implementation (Sort of)
- More Connections

Let's go over those one by one.

### Less Latency

This one should be pretty obvious. If everyone is talking via a server then the time for a message to get from peer A to peer B is:

    Time(A->Server) + Time(Server->B)
   
instead of:

    Time(A->B)
    
### No Central Point Of Failure

Again this should be obvious. If there's a single central server then if the server goes down the entire game goes down, which sucks.

Now, saying Heist does not have a central server is _slightly_ misleading. There is a "special" peer in the session which is the "host" peer, this is the first peer that new peers connect to when they join the session, it's also the peer that lists this game session on the global server list and keeps it up to date. This is hardly a central point of failure though, migrating the responsibilities of this peer would not be terribly difficult to implement (it's planned). Even without migrating the responsibilities when this peer drops the session will continue on for the rest of the players.

### More Connections

Again very obvious, every peer has to maintain (N-1) connections to all the other peers, instead of just 1 connection to the server. Establishing a connection between two peer is hard work, there's a whole laod of different ways in which it can fail and establishing N-1 connections is a lot more hard work. Fortunately I don't really care, it's hard to code but it's something I only have to do once and then I can reuse this logic every time I want to establish a new connection.

### More Complex Implementation

This is the biggie, the really really big biggie. With a peer to peer implementation *everything* is more complex. There's no single place you can point to and say "That's the state of the world, synchronise everything to it", instead the state of the world is spread across all of the peers, they all "own" entities arbitrarily spread out across the world and they all need to interact these with other entities they don't necessarily own. If this sounds complicated that's good, it is.

It's complicated in a way that I think is good though, the solution I have adopted splits actions up into three parts:

1. Check State, and decide what to do (this runs on the peer which owns the entity in question)
2. Receive a message of what to do, and do it (this runs on all peers with a copy of this entity)
3. Apply error correction algorithms over time to make sure things stay in step

This is really highly decoupled, and it's been proven a few times in my experiences programming Heist that this kind of decoupling can come in useful for other things. For example, I can get in there and trigger an action in other ways, just by sending out the correct type of message and pretending it was from the state checking code.

## I Lied To You

The topology of Heist isn't actually fixed. The game is built in such a way that peers understand the fact that some entities are owned locally, and some are owned remotely. Well, in Client/Server no entities are owned locally, and all are owned remotely (by the peer), this is a situation which Heist understands. This is the real reason that Heist is Peer to Peer, it could be turned into a Client/Server setup with a fairly small amount of work in session initiation and entity ownership code. I already have some ideas in mind for long running Heist servers, where a very low power machine can host the world and basically just act as a packet switch and a database which sends packets to the appropriate peers and will send out the current state of an entity when a peer requests it - with these very simple changes Heist suddenly has persistant world servers!