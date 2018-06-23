---
layout: post
category : game-development
tags : [game-development, VoIP, Programming, Unity, networking]
tagline : In Which A Protocol Is Discussed
title: "Lessons In Network Protocol Design Learned The Hard Way"
---

# TL;DR

Basic network protocols aren't too hard to design, but make sure to think about forward compatibility.

# Network Protocols

A lot of applications need to communicate over a network, all of these applications will need to decide what protocol they use to communicate. You may think that it's easy to decide that you're going to just use [JSON](https://www.json.org/)/[Protobuf](https://github.com/google/protobuf)/[Flatbuffers](https://google.github.io/flatbuffers/) and call it a done but it's more complex than that - whichever one you choose you need to choose what data do you put _into_ these containers? In this blog post I'm going to use the low level binary protocol of [Dissonance voice chat](https://www.assetstore.unity3d.com/#!/content/70078?aid=1100lJ2J) as my example simply because I'm very familiar with the protocol, but the general lessons learned should apply to any communication protocol.

# Protocol Sanity

Weird things happen in networks. At some point you're going to receive the wrong packet from the wrong address at the wrong time with the wrong encoding and _if you're lucky_ it'll just cause a crash because of the faulty encoding. If you're unlucky it'll be parsed as a valid message in your protocol and cause some bizarre effect which will leave you scratching your head when you come to debug it. Dissonance includes two _sanity checks_ in the packet to try to make sure this cannot happen:

## Magic Number

The very first two bytes in a Dissonance packet are always `0x8bc7`. If a packet is received by Dissonance and it does not contain these two bytes it is immediately discarded without anything further being read from it. This keeps the potential damage of receiving the wrong packet to a minimum.

## Session Number

The magic number ensures that if a non-Dissonance packet ends up getting given to Dissonance no damage is caused but what if a valid Dissonance packet gets sent to the wrong place? To combat this situation Dissonance chooses a totally random _session number_ when a new server is created - every packet (except handshake packets) has the 4 bytes of the session number immediately after the magic number. Just like the magic number if an incorrect session number packet is received it is immediately discarded.

# Protocol Compatibility

The most important lesson I have learned when working on Dissonance is about compatibility - early versions of Dissonance did not provide any guarantees about protocol compatibility and we frequently broke compatibility to add new features or fix small bugs. With hindsight this was a huge mistake, once an application id deployed across a network is becomes very difficult to coordinate upgrading all of the servers and clients at the same time! There are three aspects of compatibility to keep in mind when designing a protocol:

### Version Identifiers

Sometimes it's necessary to make a change which breaks compatibility. In these cases it can become a nightmare to coordinate updating all of the clients and server together if old clients start talking to new servers (or vice versa) and ending up confused by the change in the protocol. It's always useful to have a version identifier in the protocol so that messages encoded in using the old version of the protocol can be detected and discarded.

### Backward Compatibility

Backward Compatibility is when a change to a new version is made in such a way that older versions of the protocol can still udnerstand it. Often this can simply be done by supporting both the old and the new version of the protocol available for communication - when you first establish a new connection you can work out which protocol version to use either by inspecting the version identifier or by explicitly performing some kind of handshake where the two clients exchange a set of things they understand and then they can both use the best one.

### Forward Compatibility

Forward compatibility is when the new version is designed in such a way that it can tolerate unknown changes in future (as yet unwritten) new versions. For example a packet decoding system could be written to keep reading a packet until it has parsed everything it "expects" from that packet - newer versions of the protocol can safely append more information to the end of a packet and older clients will simply ignore it. Many low levels serialization protocols will give you this for "free", for example with JSON the receiver pulls the data out of the fields it knows, any new fields will just be ignored.

# Protocol Generality

We have a general principal of trying to ensure compatibility, both forward and backward, but how do we do that? I think this requires a shift in how you think about the individual packets. When designing the Dissonance network protocol my thinking was very simple - whenever the design called for some new interaction between client and server I would design a new packet which encompassed all of the information needed for that transaction. However this kind of design is extremely inflexible.

A concrete example of a problem with this is a bug which was reported on Dissonance - sessions with ~20 people would crash when another person joined. This is because the handshake response from the server to the new clients includes _all_ of the information about the session and all the clients in the session, with ~20 people this information is large enough to exceed the maximum packet size. The solution to this could be quite simple - the handshake response can simply be split up into fragments and the client reassembles the packet by appending together all the fragments until all of them have arrived - after that the handshake is decoded as normal. Of course, this completely breaks compatibility. The solution which I have chosen is to instead return the handshake response with _no_ client information (as if the session is empty) and then to immediately follow it up with a packet per client containing all the information about that client (this `ClientState` packet already existed in the protocol for another purpose).

In that example I was _lucky_ that the `ClientState` packet existed and could perform exactly the function I needed. However I realised that it would be possible to design the protocol in such a way that this kind of thing is more likely. Instead of thinking about the exact *interactions between client and server* and designing a protocol to perform those interactions you should think about the *data structures on the client and the server* and design a protocol to update them. The client and server in Dissonance both have a set of clients and metadata about them, the `ClientState` message is a general purpose message which overwrites all of the metadata for a given client.