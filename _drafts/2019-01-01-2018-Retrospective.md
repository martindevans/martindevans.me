---
layout: post
category : Personal
tags : [general]
tagline : In Which A Lot Happens
---
{% include JB/setup %}

# TL;DR

I developed [Dissonance Voice Chat](https://www.assetstore.unity3d.com/#!/content/70078?aid=1100lJ2J) all year.

# What Did I Do In 2017?

In my [last retrospective](http://martindevans.me/personal/2018/01/13/2017-Retrospective/) I talked about working on [Dissonance Voice Chat For Unity](https://www.assetstore.unity3d.com/#!/content/70078?aid=1100lJ2J) and some interesting open source projects I had worked on.

# Placeholder Software

Placeholder Software is the company operated by myself and [Tom Gillen](https://github.com/TomGillen), we make Unity assets such as [Dissonance Voice Chat](https://www.assetstore.unity3d.com/#!/content/70078?aid=1100lJ2J) and [Wet Stuff](https://assetstore.unity.com/packages/tools/particles-effects/wet-stuff-118969?aid=1100lJ2J). In 2018 I have been mostly maintaining/supporting Dissonance while Tom has taken the lead of developing Wet Stuff.

Wet Stuff is a graphical asset so it was much easier to advertise than Dissonance - everyone loves eye candy! In April I spent the entire month putting together a video demonstrating the basics of what can be done with Wet Stuff which was my first project in Unity intended for actual real world use, everything else has been test projects or silly little hobby games in my spare time. I think it turned out really nicely:

<div style="position: relative;width: 100%;padding-bottom:56%;">
    <iframe src="https://www.youtube.com/embed/-9zrrXtgD0M" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen="" style="
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
    "></iframe>
</div>

This was made using an early version of [Wet Stuff](https://assetstore.unity.com/packages/tools/particles-effects/wet-stuff-118969?aid=1100lJ2J), [Cinemachine](https://unity3d.com/learn/tutorials/topics/animation/using-cinemachine-getting-started) and the [Viking Village](https://assetstore.unity.com/packages/essentials/tutorial-projects/viking-village-29140) pack. The music and sound effects all came from [AudioBlocks](https://www.audioblocks.com/).

While Tom was working primarily on Wet Stuff I was providing support for Dissonance and pushed out 9 updates. We've really been trying to keep Dissonance stable this year and we haven't had to put out a single breaking change (even while making some pretty major improvements). Most of the changes were driven by user feedback, so I added a lot of things which they asked for in support emails or even things that I thought would have helped them not need to ask for support in the first place.

### Features
 - Improved log messages when the Microphone changes.
 - Showing an error message in the VoiceReceiptTrigger/VoiceBroadcastTrigger inspector when no room is selected
 - Added some additional sanity checks to the network packet writing system to ensure it never writes out of bounds
 - Dissonance can now be installed anywhere in the project. The welcome window will rewrite the code to change hardcoded paths to point to the correct location
 - Decoding channel data as soon as the first packet is received. This means GetSpeakingChannels will return useful information when PlayerStartedSpeaking is called.
 - Dark Rift 2 Support.
 - Added help links in editor inspector out to reference docs.
 - Enabled Forward Error Correction (FEC) in the codec, this will improve audio quality when there are small amounts of packet loss.
 - Increased maximum dynamic sync adjustment, this will improve audio synchronisation when there are skips in time (e.g. low frame rates, overloaded CPU).
 - Improved network handshake protocol to support an unlimited number of players in a Dissonance session (previously limited to ~20).
 - Added ResetMicrophoneCapture method, which will force a reset of the Dissonance microphone system. This can resolve some issue caused by third party systems disabling the microphone.
 - Showing audio attenuation caused by trigger fades in the VoiceBroadcastTrigger inspector
 - Added additional details to the DissonanceComms profiler
 - Done the necessary setup for users to add asmdef files to Dissonance if required
 - Added a PacketLoss property to VoicePlayerState
 - Added WebRTC Network integration
 - Support for using Photon Unity Networking 2
 - Audio Quality/FrameSize can be set at runtime (although changes will not take effect until disconnect/reconnect)
 - Extra monitoring on the receive system to detect terrible network conditions disrupting voice chat

### Bug Fixes
 - Fixed the AEC running the mobile AEC on Desktop platforms (resulting in significantly worse echo cancellation) and the PC AEC running on mobile platforms (resulting in significantly worse performance).
 - Fixed AEC platform check crashing when performed on a UWP application built in Unity 2017.1 or newer
 - Fixed DissonanceComms inspector crashing with InvalidCastException when the PlaybackPrefab field was set.
 - Relocated the MacOS binaries to fix the MacOS build process for 2017.3 and higher
 - Prevented IsNetworkInitialized from throwing if checked before Start is called
 - Always using network order (Big endian) for network packet headers
 - Prevented inspector throwing exception when inspecting the playback prefab during a play session
 - Fixed DissonanceComms inspector to properly accept all types of playback prefab (also added some additional sanity checking)
 - Fixed build failure on OSX when using Unity 2017.3 or greater. This was caused by a change in how Unity loads plugins.
 - Fixed a potential backlog of audio if the application is suspended and then resumed for a short period.
 - Fixed native audio plugins for Hololens.
 - Replaced code which allocated (in certain error cases) with non allocating version.
 - Made sure that the network mode is set before the client/server code is initialized.
 - Reduced size of cross thread packet buffer, ensuring packets are pushed downstream sooner (removing a potential source of buffer bloat).
 - Significantly increased the threshold of playback buffer oversize detection (Detected oversized buffer before playback started). This will trigger much less often and will also tolerate more inconsistent frame rates.
 - Fixed desync compensation not correctly recording the number of samples it has corrected
 - Prevented playback buffer oversize detection detecting an oversize buffer caused by the previous speech session overunning
 - Fixed VoiceBroadcastTrigger component to properly fade out speech when tokens are removed.
 - Fixed RemoteVoiceVolume property not accepting any value except zero.
 - Fixed host migration for Photon Unity Networking integration.
 - Fixed all voice from a speak being lost in some circumstances (particularly when the speaker mutes themselves)


Dissonance Updates
Wet Stuff
Blogging
ML
Windows Phone/Android
Game dev business / Parsec
Open Source
 - Mute (https://github.com/martindevans/Mute)
 - Word2Vec server (https://github.com/martindevans/Word2Vec_Server)
 - Basic Sentiment (https://github.com/martindevans/basic-sentiment)

Interesting Stuff
 - Keras
 - SpaceX
 - Hitman 2
 - Violet Evergarden
 - Sony XM2 headphones