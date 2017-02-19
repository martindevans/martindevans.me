---
layout: post
category : VoIP
tags : [Dissonance, VoIP]
tagline : In Which A Pipeline Is Dissected
---
{% include JB/setup %}

# TL;DR

I've released a voice communications asset on the [Unity store](https://www.assetstore.unity3d.com/#!/content/70078?aid=1100lJ2J)!

# Placeholder Software

In my 2016 retrospective I mentioned that I had started a company called Placeholder software and that we had released [Dissonance Voice Chat](https://www.assetstore.unity3d.com/#!/content/70078?aid=1100lJ2J) onto the Unity store. Dissonance has been available for a little over a month now and we've been working flat out fixing bugs, fulfilling feature requests, upgrading bits and pieces of the system, and providing support. It's a part of software development I've not done much of before and it's been a lot of fun!

This blog post is not just an advert for Dissonance - I'm going to break down the long and complex process involved with getting high quality VoIP to work (specifically in Unity, but the concepts obviously are very transferable to any platform).

# Voice Pipeline

First off, what is a pipeline and what does it do? For a good conversation over VoIP we need 5 things out of the pipeline:

 - Low Latency
 - High Quality Audio
 - Low Bandwidth Usage
 - Tolerance To Packet Loss
 - Tolerance To Clock Skew (transmitter and receiver clocks running slightly out of sync)

Getting all of these things to work at the same time can be quite challenging! A further requirement for Unity is that as little of it runs on the main thread as possible - that runs all of the game logic and we don't want a low frame rate disrupting voice quality.

## Digital Signal Processing Basics

Before we look at the complete Dissonance pipeline it's important to know a little about how digital signal processing works.

#### Signal

A signal is just a sound - in physical terms that's a wave. There are many ways to represent a signal - the most common is to store the displacement at each moment in time. Each of these displacement values is a _sample_.

#### Sample

A sample is a single numeric value in the signal. There are a lot of ways to represent numbers in a computer - the most common formats for audio are 16 bit integers, 24 bit integers or 32 bit floating point numbers. Unity uses 32 bit floats for all of it's audio and so does Dissonance.

#### Frame

A digital signal processing pipeline does not operate on a stream of individual signals - it instead operates on blocks called frames. Each frame is a short period of time (for example in Dissonance this can be tweaked to 20ms, 40ms, or 60ms). There are some places in the pipeline where samples are added to a buffer and at these points the frame size is generally being converted (hence the buffer, to accumulate the excess samples).

#### Sample Rate

Recall that a _signal_ is formed of a series of _samples_ which store some data about the signal - the sample rate is how frequently the underlying signal (which has conceptually infinite resolution) is converted into samples. A common audio sample rate is 44100Hz, or 44100 samples every second.

The Dissonance pipeline operates at different sample rates at different places - the _resample_ steps in the pipeline are where the sample rate is changed to whatever we need it to be.

Ok now we have the glossary out of the way let's take a look at the complete pipeline for Dissonance - this is everything from the microphone on the sender side to the speaker on the receiver side. We'll break this into bits and look at what they all do:

<style>
 #image-container img {
 	max-height: 235px;
 	width: auto;
 }
</style>

<div id="image-container" align="center">
<a href="dissonance-pipeline-diagram.svg">
<svg xmlns="http://www.w3.org/2000/svg" width="1008" height="1274" xmlns:xlink="http://www.w3.org/1999/xlink"><source><![CDATA[Note over Mic Capture: Mic _clip.GetData
Note over Mic Capture: Buffer into _rawMicSamples
Note over Mic Capture: Read a complete frame
Mic Capture->Encoding Thread: audio frame
Note over Encoding Thread: Resample to capture rate
Note over Encoding Thread: Convert to int16
Note over Encoding Thread: Process through VAD
Note over Encoding Thread: Speex preprocessor
Note over Encoding Thread: Convert back to float32
Note over Encoding Thread: Delay buffer
Note over Encoding Thread: Encode
Note over Encoding Thread: Write into packet
Encoding Thread->Server: Send packet
Server->Client: Send packet
Note over Client: Copy packet
Note over Client: Add to transfer buffer
Client->Decoding Thread: Read from transfer buffer
Note over Decoding Thread: Add to jitter buffer
Note over Decoding Thread: Decode
Note over Decoding Thread: Apply volume ramping
Note over Decoding Thread: Convert frames to samples
Note over Decoding Thread: Apply soft clipping
Note over Decoding Thread: Split mono to all channels
Note over Decoding Thread: Playback in AudioSource]]></source><desc></desc><defs><marker viewBox="0 0 5 5" markerWidth="5" markerHeight="5" orient="auto" refX="5" refY="2.5" id="markerArrowBlock"><path d="M 0 0 L 5 2.5 L 0 5 z"></path></marker><marker viewBox="0 0 9.6 16" markerWidth="4" markerHeight="16" orient="auto" refX="9.6" refY="8" id="markerArrowOpen"><path d="M 9.6,8 1.92,16 0,13.7 5.76,8 0,2.286 1.92,0 9.6,8 z"></path></marker></defs><g class="title"></g><g class="actor"><rect x="70.875" y="20" width="116.96875" height="39" stroke="#000000" fill="#ffffff" style="stroke-width: 2;"></rect><text x="80.875" y="45" style="font-size: 16px; font-family: &quot;Andale Mono&quot;, monospace;"><tspan x="80.875">Mic Capture</tspan></text></g><g class="actor"><rect x="70.875" y="1215" width="116.96875" height="39" stroke="#000000" fill="#ffffff" style="stroke-width: 2;"></rect><text x="80.875" y="1240" style="font-size: 16px; font-family: &quot;Andale Mono&quot;, monospace;"><tspan x="80.875">Mic Capture</tspan></text></g><line x1="129.359375" x2="129.359375" y1="59" y2="1215" stroke="#000000" fill="none" style="stroke-width: 2;"></line><g class="actor"><rect x="207.84375" y="20" width="151.953125" height="39" stroke="#000000" fill="#ffffff" style="stroke-width: 2;"></rect><text x="217.84375" y="45" style="font-size: 16px; font-family: &quot;Andale Mono&quot;, monospace;"><tspan x="217.84375">Encoding Thread</tspan></text></g><g class="actor"><rect x="207.84375" y="1215" width="151.953125" height="39" stroke="#000000" fill="#ffffff" style="stroke-width: 2;"></rect><text x="217.84375" y="1240" style="font-size: 16px; font-family: &quot;Andale Mono&quot;, monospace;"><tspan x="217.84375">Encoding Thread</tspan></text></g><line x1="283.8203125" x2="283.8203125" y1="59" y2="1215" stroke="#000000" fill="none" style="stroke-width: 2;"></line><g class="actor"><rect x="379.796875" y="20" width="72.984375" height="39" stroke="#000000" fill="#ffffff" style="stroke-width: 2;"></rect><text x="389.796875" y="45" style="font-size: 16px; font-family: &quot;Andale Mono&quot;, monospace;"><tspan x="389.796875">Server</tspan></text></g><g class="actor"><rect x="379.796875" y="1215" width="72.984375" height="39" stroke="#000000" fill="#ffffff" style="stroke-width: 2;"></rect><text x="389.796875" y="1240" style="font-size: 16px; font-family: &quot;Andale Mono&quot;, monospace;"><tspan x="389.796875">Server</tspan></text></g><line x1="416.2890625" x2="416.2890625" y1="59" y2="1215" stroke="#000000" fill="none" style="stroke-width: 2;"></line><g class="actor"><rect x="496.6640625" y="20" width="72.78125" height="39" stroke="#000000" fill="#ffffff" style="stroke-width: 2;"></rect><text x="506.6640625" y="45" style="font-size: 16px; font-family: &quot;Andale Mono&quot;, monospace;"><tspan x="506.6640625">Client</tspan></text></g><g class="actor"><rect x="496.6640625" y="1215" width="72.78125" height="39" stroke="#000000" fill="#ffffff" style="stroke-width: 2;"></rect><text x="506.6640625" y="1240" style="font-size: 16px; font-family: &quot;Andale Mono&quot;, monospace;"><tspan x="506.6640625">Client</tspan></text></g><line x1="533.0546875" x2="533.0546875" y1="59" y2="1215" stroke="#000000" fill="none" style="stroke-width: 2;"></line><g class="actor"><rect x="697.203125" y="20" width="151.953125" height="39" stroke="#000000" fill="#ffffff" style="stroke-width: 2;"></rect><text x="707.203125" y="45" style="font-size: 16px; font-family: &quot;Andale Mono&quot;, monospace;"><tspan x="707.203125">Decoding Thread</tspan></text></g><g class="actor"><rect x="697.203125" y="1215" width="151.953125" height="39" stroke="#000000" fill="#ffffff" style="stroke-width: 2;"></rect><text x="707.203125" y="1240" style="font-size: 16px; font-family: &quot;Andale Mono&quot;, monospace;"><tspan x="707.203125">Decoding Thread</tspan></text></g><line x1="773.1796875" x2="773.1796875" y1="59" y2="1215" stroke="#000000" fill="none" style="stroke-width: 2;"></line><g class="note"><rect x="49.5859375" y="79" width="159.546875" height="29" stroke="#000000" fill="#ffffff" style="stroke-width: 2;"></rect><text x="54.5859375" y="99" style="font-size: 16px; font-family: &quot;Andale Mono&quot;, monospace;"><tspan x="54.5859375">Mic _clip.GetData</tspan></text></g><g class="note"><rect x="10" y="128" width="238.71875" height="29" stroke="#000000" fill="#ffffff" style="stroke-width: 2;"></rect><text x="15" y="148" style="font-size: 16px; font-family: &quot;Andale Mono&quot;, monospace;"><tspan x="15">Buffer into _rawMicSamples</tspan></text></g><g class="note"><rect x="31.890625" y="177" width="194.9375" height="29" stroke="#000000" fill="#ffffff" style="stroke-width: 2;"></rect><text x="36.890625" y="197" style="font-size: 16px; font-family: &quot;Andale Mono&quot;, monospace;"><tspan x="36.890625">Read a complete frame</tspan></text></g><g class="signal"><text x="158.10546875" y="236.5" style="font-size: 16px; font-family: &quot;Andale Mono&quot;, monospace;"><tspan x="158.10546875">audio frame</tspan></text><line x1="129.359375" x2="283.8203125" y1="245" y2="245" stroke="#000000" fill="none" style="stroke-width: 2; marker-end: url(&quot;#markerArrowBlock&quot;);"></line></g><g class="note"><rect x="173.15625" y="265" width="221.328125" height="29" stroke="#000000" fill="#ffffff" style="stroke-width: 2;"></rect><text x="178.15625" y="285" style="font-size: 16px; font-family: &quot;Andale Mono&quot;, monospace;"><tspan x="178.15625">Resample to capture rate</tspan></text></g><g class="note"><rect x="208.34375" y="314" width="150.953125" height="29" stroke="#000000" fill="#ffffff" style="stroke-width: 2;"></rect><text x="213.34375" y="334" style="font-size: 16px; font-family: &quot;Andale Mono&quot;, monospace;"><tspan x="213.34375">Convert to int16</tspan></text></g><g class="note"><rect x="195.1484375" y="363" width="177.34375" height="29" stroke="#000000" fill="#ffffff" style="stroke-width: 2;"></rect><text x="200.1484375" y="383" style="font-size: 16px; font-family: &quot;Andale Mono&quot;, monospace;"><tspan x="200.1484375">Process through VAD</tspan></text></g><g class="note"><rect x="199.546875" y="412" width="168.546875" height="29" stroke="#000000" fill="#ffffff" style="stroke-width: 2;"></rect><text x="204.546875" y="432" style="font-size: 16px; font-family: &quot;Andale Mono&quot;, monospace;"><tspan x="204.546875">Speex preprocessor</tspan></text></g><g class="note"><rect x="177.5546875" y="461" width="212.53125" height="29" stroke="#000000" fill="#ffffff" style="stroke-width: 2;"></rect><text x="182.5546875" y="481" style="font-size: 16px; font-family: &quot;Andale Mono&quot;, monospace;"><tspan x="182.5546875">Convert back to float32</tspan></text></g><g class="note"><rect x="225.9375" y="510" width="115.765625" height="29" stroke="#000000" fill="#ffffff" style="stroke-width: 2;"></rect><text x="230.9375" y="530" style="font-size: 16px; font-family: &quot;Andale Mono&quot;, monospace;"><tspan x="230.9375">Delay buffer</tspan></text></g><g class="note"><rect x="252.328125" y="559" width="62.984375" height="29" stroke="#000000" fill="#ffffff" style="stroke-width: 2;"></rect><text x="257.328125" y="579" style="font-size: 16px; font-family: &quot;Andale Mono&quot;, monospace;"><tspan x="257.328125">Encode</tspan></text></g><g class="note"><rect x="204.046875" y="608" width="159.546875" height="29" stroke="#000000" fill="#ffffff" style="stroke-width: 2;"></rect><text x="209.046875" y="628" style="font-size: 16px; font-family: &quot;Andale Mono&quot;, monospace;"><tspan x="209.046875">Write into packet</tspan></text></g><g class="signal"><text x="301.671875" y="667.5" style="font-size: 16px; font-family: &quot;Andale Mono&quot;, monospace;"><tspan x="301.671875">Send packet</tspan></text><line x1="283.8203125" x2="416.2890625" y1="676" y2="676" stroke="#000000" fill="none" style="stroke-width: 2; marker-end: url(&quot;#markerArrowBlock&quot;);"></line></g><g class="signal"><text x="426.2890625" y="706.5" style="font-size: 16px; font-family: &quot;Andale Mono&quot;, monospace;"><tspan x="426.2890625">Send packet</tspan></text><line x1="416.2890625" x2="533.0546875" y1="715" y2="715" stroke="#000000" fill="none" style="stroke-width: 2; marker-end: url(&quot;#markerArrowBlock&quot;);"></line></g><g class="note"><rect x="479.671875" y="735" width="106.765625" height="29" stroke="#000000" fill="#ffffff" style="stroke-width: 2;"></rect><text x="484.671875" y="755" style="font-size: 16px; font-family: &quot;Andale Mono&quot;, monospace;"><tspan x="484.671875">Copy packet</tspan></text></g><g class="note"><rect x="430.6875" y="784" width="204.734375" height="29" stroke="#000000" fill="#ffffff" style="stroke-width: 2;"></rect><text x="436.6875" y="804" style="font-size: 16px; font-family: &quot;Andale Mono&quot;, monospace;"><tspan x="435.6875">Add to transfer buffer</tspan></text></g><g class="signal"><text x="543.0546875" y="843.5" style="font-size: 16px; font-family: &quot;Andale Mono&quot;, monospace;"><tspan x="543.0546875">Read from transfer buffer</tspan></text><line x1="533.0546875" x2="773.1796875" y1="852" y2="852" stroke="#000000" fill="none" style="stroke-width: 2; marker-end: url(&quot;#markerArrowBlock&quot;);"></line></g><g class="note"><rect x="679.609375" y="872" width="187.140625" height="29" stroke="#000000" fill="#ffffff" style="stroke-width: 2;"></rect><text x="685.609375" y="892" style="font-size: 16px; font-family: &quot;Andale Mono&quot;, monospace;"><tspan x="684.609375">Add to jitter buffer</tspan></text></g><g class="note"><rect x="741.6875" y="921" width="62.984375" height="29" stroke="#000000" fill="#ffffff" style="stroke-width: 2;"></rect><text x="746.6875" y="941" style="font-size: 16px; font-family: &quot;Andale Mono&quot;, monospace;"><tspan x="746.6875">Decode</tspan></text></g><g class="note"><rect x="679.609375" y="970" width="187.140625" height="29" stroke="#000000" fill="#ffffff" style="stroke-width: 2;"></rect><text x="685.609375" y="990" style="font-size: 16px; font-family: &quot;Andale Mono&quot;, monospace;"><tspan x="684.609375">Apply volume ramping</tspan></text></g><g class="note"><rect x="658.21875" y="1019" width="229.921875" height="29" stroke="#000000" fill="#ffffff" style="stroke-width: 2;"></rect><text x="663.21875" y="1039" style="font-size: 16px; font-family: &quot;Andale Mono&quot;, monospace;"><tspan x="663.21875">Convert frames to samples</tspan></text></g><g class="note"><rect x="684.0078125" y="1068" width="178.34375" height="29" stroke="#000000" fill="#ffffff" style="stroke-width: 2;"></rect><text x="690.0078125" y="1088" style="font-size: 16px; font-family: &quot;Andale Mono&quot;, monospace;"><tspan x="689.0078125">Apply soft clipping</tspan></text></g><g class="note"><rect x="653.8203125" y="1117" width="238.71875" height="29" stroke="#000000" fill="#ffffff" style="stroke-width: 2;"></rect><text x="658.8203125" y="1137" style="font-size: 16px; font-family: &quot;Andale Mono&quot;, monospace;"><tspan x="658.8203125">Split mono to all channels</tspan></text></g><g class="note"><rect x="666.9140625" y="1166" width="212.53125" height="29" stroke="#000000" fill="#ffffff" style="stroke-width: 2;"></rect><text x="671.9140625" y="1186" style="font-size: 16px; font-family: &quot;Andale Mono&quot;, monospace;"><tspan x="671.9140625">Playback in AudioSource</tspan></text></g></svg>
</a>
</div>

> Click the image to see it in a new window.

Wow that's larger than I expected when I started making the diagram! First off let's break this down and look just at the sender.

## Capture Pipeline

The sender side of the system is called the "capture" pipeline because it captures the audio from the user.

<div id="image-container" align="center">
<svg xmlns="http://www.w3.org/2000/svg" width="510" height="716" xmlns:xlink="http://www.w3.org/1999/xlink"><source><![CDATA[Note over Mic Capture: Mic _clip.GetData
Note over Mic Capture: Buffer into _rawMicSamples
Note over Mic Capture: Read a complete frame
Mic Capture->Encoding Thread: audio frame
Note over Encoding Thread: Resample to capture rate
Note over Encoding Thread: Convert to int16
Note over Encoding Thread: Process through VAD
Note over Encoding Thread: Speex preprocessor
Note over Encoding Thread: Convert back to float32
Note over Encoding Thread: Delay buffer
Note over Encoding Thread: Encode
Note over Encoding Thread: Write into packet]]></source><desc></desc><defs><marker viewBox="0 0 5 5" markerWidth="5" markerHeight="5" orient="auto" refX="5" refY="2.5" id="markerArrowBlock"><path d="M 0 0 L 5 2.5 L 0 5 z"></path></marker><marker viewBox="0 0 9.6 16" markerWidth="4" markerHeight="16" orient="auto" refX="9.6" refY="8" id="markerArrowOpen"><path d="M 9.6,8 1.92,16 0,13.7 5.76,8 0,2.286 1.92,0 9.6,8 z"></path></marker></defs><g class="title"></g><g class="actor"><rect x="70.875" y="20" width="116.96875" height="39" stroke="#000000" fill="#ffffff" style="stroke-width: 2;"></rect><text x="80.875" y="45" style="font-size: 16px; font-family: &quot;Andale Mono&quot;, monospace;"><tspan x="80.875">Mic Capture</tspan></text></g><g class="actor"><rect x="70.875" y="657" width="116.96875" height="39" stroke="#000000" fill="#ffffff" style="stroke-width: 2;"></rect><text x="80.875" y="682" style="font-size: 16px; font-family: &quot;Andale Mono&quot;, monospace;"><tspan x="80.875">Mic Capture</tspan></text></g><line x1="129.359375" x2="129.359375" y1="59" y2="657" stroke="#000000" fill="none" style="stroke-width: 2;"></line><g class="actor"><rect x="207.84375" y="20" width="151.953125" height="39" stroke="#000000" fill="#ffffff" style="stroke-width: 2;"></rect><text x="217.84375" y="45" style="font-size: 16px; font-family: &quot;Andale Mono&quot;, monospace;"><tspan x="217.84375">Encoding Thread</tspan></text></g><g class="actor"><rect x="207.84375" y="657" width="151.953125" height="39" stroke="#000000" fill="#ffffff" style="stroke-width: 2;"></rect><text x="217.84375" y="682" style="font-size: 16px; font-family: &quot;Andale Mono&quot;, monospace;"><tspan x="217.84375">Encoding Thread</tspan></text></g><line x1="283.8203125" x2="283.8203125" y1="59" y2="657" stroke="#000000" fill="none" style="stroke-width: 2;"></line><g class="note"><rect x="49.5859375" y="79" width="159.546875" height="29" stroke="#000000" fill="#ffffff" style="stroke-width: 2;"></rect><text x="54.5859375" y="99" style="font-size: 16px; font-family: &quot;Andale Mono&quot;, monospace;"><tspan x="54.5859375">Mic _clip.GetData</tspan></text></g><g class="note"><rect x="10" y="128" width="238.71875" height="29" stroke="#000000" fill="#ffffff" style="stroke-width: 2;"></rect><text x="15" y="148" style="font-size: 16px; font-family: &quot;Andale Mono&quot;, monospace;"><tspan x="15">Buffer into _rawMicSamples</tspan></text></g><g class="note"><rect x="31.890625" y="177" width="194.9375" height="29" stroke="#000000" fill="#ffffff" style="stroke-width: 2;"></rect><text x="36.890625" y="197" style="font-size: 16px; font-family: &quot;Andale Mono&quot;, monospace;"><tspan x="36.890625">Read a complete frame</tspan></text></g><g class="signal"><text x="158.10546875" y="236.5" style="font-size: 16px; font-family: &quot;Andale Mono&quot;, monospace;"><tspan x="158.10546875">audio frame</tspan></text><line x1="129.359375" x2="283.8203125" y1="245" y2="245" stroke="#000000" fill="none" style="stroke-width: 2; marker-end: url(&quot;#markerArrowBlock&quot;);"></line></g><g class="note"><rect x="173.15625" y="265" width="221.328125" height="29" stroke="#000000" fill="#ffffff" style="stroke-width: 2;"></rect><text x="178.15625" y="285" style="font-size: 16px; font-family: &quot;Andale Mono&quot;, monospace;"><tspan x="178.15625">Resample to capture rate</tspan></text></g><g class="note"><rect x="208.34375" y="314" width="150.953125" height="29" stroke="#000000" fill="#ffffff" style="stroke-width: 2;"></rect><text x="213.34375" y="334" style="font-size: 16px; font-family: &quot;Andale Mono&quot;, monospace;"><tspan x="213.34375">Convert to int16</tspan></text></g><g class="note"><rect x="195.1484375" y="363" width="177.34375" height="29" stroke="#000000" fill="#ffffff" style="stroke-width: 2;"></rect><text x="200.1484375" y="383" style="font-size: 16px; font-family: &quot;Andale Mono&quot;, monospace;"><tspan x="200.1484375">Process through VAD</tspan></text></g><g class="note"><rect x="199.546875" y="412" width="168.546875" height="29" stroke="#000000" fill="#ffffff" style="stroke-width: 2;"></rect><text x="204.546875" y="432" style="font-size: 16px; font-family: &quot;Andale Mono&quot;, monospace;"><tspan x="204.546875">Speex preprocessor</tspan></text></g><g class="note"><rect x="177.5546875" y="461" width="212.53125" height="29" stroke="#000000" fill="#ffffff" style="stroke-width: 2;"></rect><text x="182.5546875" y="481" style="font-size: 16px; font-family: &quot;Andale Mono&quot;, monospace;"><tspan x="182.5546875">Convert back to float32</tspan></text></g><g class="note"><rect x="225.9375" y="510" width="115.765625" height="29" stroke="#000000" fill="#ffffff" style="stroke-width: 2;"></rect><text x="230.9375" y="530" style="font-size: 16px; font-family: &quot;Andale Mono&quot;, monospace;"><tspan x="230.9375">Delay buffer</tspan></text></g><g class="note"><rect x="252.328125" y="559" width="62.984375" height="29" stroke="#000000" fill="#ffffff" style="stroke-width: 2;"></rect><text x="257.328125" y="579" style="font-size: 16px; font-family: &quot;Andale Mono&quot;, monospace;"><tspan x="257.328125">Encode</tspan></text></g><g class="note"><rect x="204.046875" y="608" width="159.546875" height="29" stroke="#000000" fill="#ffffff" style="stroke-width: 2;"></rect><text x="209.046875" y="628" style="font-size: 16px; font-family: &quot;Andale Mono&quot;, monospace;"><tspan x="209.046875">Write into packet</tspan></text></g></svg>
</div>

The work of the capture pipeline is split across two threads. The `Mic Capture` thread in this diagram is the main Unity thread - we want to do as little work as possible here! The Unity API is completely single threaded so we have to read the data off the mic on the main thread, but we want to move it off to somewhere else as soon as possible.

The Unity API for [reading data from the mic](https://docs.unity3d.com/ScriptReference/AudioClip.GetData.html) looks like this:

`public bool GetData(float[] data, int offsetSamples);`

Unity keeps a rolling buffer of audio from the mic (in our case up to 1 second long) and then we can read data from it as it becomes available. Once a second has passed it wraps around and begins overwriting the old audio data. In an early version of Dissonance we read from this buffer once enough audio was available to process (one _frame_, usually 40ms) however this turned out to produce subtle audio artifacts every time it looped around. To fix this we moved to a new technique where we read data from the microphone as soon as it is available and keep our *own* buffer of data until a frame is ready to go. This is the first two steps in the diagram.

Once a complete frame is in the buffer it is copied out of the buffer and into an array of the correct size - this array is then sent to the encoding thread for the real work to happen. The encoding thread spends it's entire lift processing frames, when no frames are available it sleeps until a new frame is delivered from the main thread.

### Preprocessing

The preprocessing step itself consists of two phases - we first want to run the _Voice Activation Detector_ (VAD) on the plain audio coming from the microphone and then we want to clean up the audio (noise removal, automatic gain control). These steps have to happen in this order because the VAD can get very confused if gain control is done first!

The VAD and the preprocessor are both external open source components - the [WebRTC VAD](https://chromium.googlesource.com/external/webrtc/stable/webrtc/+/master/common_audio/vad) and [speexdsp](https://github.com/xiph/speexdsp). Both these components work with 16 bit integer audio but the Dissonance pipeline natively operates with 32 bit floating point audio, and in addition the VAD only operates at certain specific sample rates.

The microphone hardware may not supply the sample rate we want so the very first step is to convert the audio to the right sample rate (the _capture rate_ mentioned in the diagram) and then convert it to 16 bit audio. The floating point value will be in the -1 to 1 range so the conversion is very simple:

```
for (var i = 0; i < count; i++)
{
    var sample = input.Array[i + input.Offset];

    //Clip the sample into the allowable range
    short converted;
    if (sample >= 1.0f)
        converted = short.MaxValue;
    else if (sample <= -1.0f)
        converted = short.MinValue;
    else
        converted = (short)(sample * 0x8000);

    output.Array[i + output.Offset] = converted;
}
```

And back to float again:

```
for (var i = 0; i < count; i++)
    output.Array[i + output.Offset] = input.Array[i + input.Offset] / 0x8000;
```

Once the conversion is done the data is pushed into the VAD which will classify the frame as speech or not-speech. After that the data is pushed through the speex preprocessor - this runs two processes: Automatic Gain Control (AGC) and Noise Removal. AGC automatically tweaks the volume of the input signal so that the output signal is always roughly the same volume - this means that in a group conversation with a collection of different people, speaking different volumes to different microphone hardware everyone will sound roughly the same volume. Noise removal... removes noise.

The next step of the pipeline is the somewhat odd sounding _delay buffer_. Recall that one of the things this pipeline should do is be low latency - so why is there a deliberate delay buffer? Voice detectors are not perfect and one place they particularly struggle is the first frame of voice - it might only be 25% voice but it still needs to be classified as voice otherwise the start of what someone says is cut off. The delay buffer delays the voice signal by one single frame but the VAD operates before the buffer - this allows the VAD to have ~20-60ms of foreknowledge and almost entirely fixes the cut off problems.

Finally, once all this is done (assuming the VAD is active, or push-to-talk is pressed) we need to transmit the audio to the other players. To do this we need to encode the audio using a codec which will reduce the size of the raw data from the rather ridiculous:

> 48,000samples/second * 4 bytes = 192,000bytes/second

For this, Dissonance (and almost every other VoIP software) uses [Opus](https://opus-codec.org/). The range of bandwidth Opus can use depends upon quality settings - it'll be somewhere between 750bytes/second (extremely low quality voice) up to 63,750bytes/second (extremely high quality full orchestral music).

## The Network

Once the encoding side has produced a packet of encoded audio we need to send this across to the other people in the session so they can listen to it. Dissonance doesn't require any particular network architecture (there's a basic interface which you can implement to provide any network architecture you like). However, there's a default implementation of that interface for a basic client server architecture. Here's the pipeline for that architecture:

<div id="image-container" align="center">
<svg xmlns="http://www.w3.org/2000/svg" width="681" height="353" xmlns:xlink="http://www.w3.org/1999/xlink"><source><![CDATA[Encoding Thread->Server: Send packet
Server->Client: Send packet
Note over Client: Copy packet
Note over Client: Add to transfer buffer
Client->Decoding Thread: Read from transfer buffer]]></source><desc></desc><defs><marker viewBox="0 0 5 5" markerWidth="5" markerHeight="5" orient="auto" refX="5" refY="2.5" id="markerArrowBlock"><path d="M 0 0 L 5 2.5 L 0 5 z"></path></marker><marker viewBox="0 0 9.6 16" markerWidth="4" markerHeight="16" orient="auto" refX="9.6" refY="8" id="markerArrowOpen"><path d="M 9.6,8 1.92,16 0,13.7 5.76,8 0,2.286 1.92,0 9.6,8 z"></path></marker></defs><g class="title"></g><g class="actor"><rect x="10" y="20" width="151.953125" height="39" stroke="#000000" fill="#ffffff" style="stroke-width: 2;"></rect><text x="20" y="45" style="font-size: 16px; font-family: &quot;Andale Mono&quot;, monospace;"><tspan x="20">Encoding Thread</tspan></text></g><g class="actor"><rect x="10" y="294" width="151.953125" height="39" stroke="#000000" fill="#ffffff" style="stroke-width: 2;"></rect><text x="20" y="319" style="font-size: 16px; font-family: &quot;Andale Mono&quot;, monospace;"><tspan x="20">Encoding Thread</tspan></text></g><line x1="85.9765625" x2="85.9765625" y1="59" y2="294" stroke="#000000" fill="none" style="stroke-width: 2;"></line><g class="actor"><rect x="181.953125" y="20" width="72.984375" height="39" stroke="#000000" fill="#ffffff" style="stroke-width: 2;"></rect><text x="191.953125" y="45" style="font-size: 16px; font-family: &quot;Andale Mono&quot;, monospace;"><tspan x="191.953125">Server</tspan></text></g><g class="actor"><rect x="181.953125" y="294" width="72.984375" height="39" stroke="#000000" fill="#ffffff" style="stroke-width: 2;"></rect><text x="191.953125" y="319" style="font-size: 16px; font-family: &quot;Andale Mono&quot;, monospace;"><tspan x="191.953125">Server</tspan></text></g><line x1="218.4453125" x2="218.4453125" y1="59" y2="294" stroke="#000000" fill="none" style="stroke-width: 2;"></line><g class="actor"><rect x="298.8203125" y="20" width="72.78125" height="39" stroke="#000000" fill="#ffffff" style="stroke-width: 2;"></rect><text x="308.8203125" y="45" style="font-size: 16px; font-family: &quot;Andale Mono&quot;, monospace;"><tspan x="308.8203125">Client</tspan></text></g><g class="actor"><rect x="298.8203125" y="294" width="72.78125" height="39" stroke="#000000" fill="#ffffff" style="stroke-width: 2;"></rect><text x="308.8203125" y="319" style="font-size: 16px; font-family: &quot;Andale Mono&quot;, monospace;"><tspan x="308.8203125">Client</tspan></text></g><line x1="335.2109375" x2="335.2109375" y1="59" y2="294" stroke="#000000" fill="none" style="stroke-width: 2;"></line><g class="actor"><rect x="499.359375" y="20" width="151.953125" height="39" stroke="#000000" fill="#ffffff" style="stroke-width: 2;"></rect><text x="509.359375" y="45" style="font-size: 16px; font-family: &quot;Andale Mono&quot;, monospace;"><tspan x="509.359375">Decoding Thread</tspan></text></g><g class="actor"><rect x="499.359375" y="294" width="151.953125" height="39" stroke="#000000" fill="#ffffff" style="stroke-width: 2;"></rect><text x="509.359375" y="319" style="font-size: 16px; font-family: &quot;Andale Mono&quot;, monospace;"><tspan x="509.359375">Decoding Thread</tspan></text></g><line x1="575.3359375" x2="575.3359375" y1="59" y2="294" stroke="#000000" fill="none" style="stroke-width: 2;"></line><g class="signal"><text x="103.828125" y="89.5" style="font-size: 16px; font-family: &quot;Andale Mono&quot;, monospace;"><tspan x="103.828125">Send packet</tspan></text><line x1="85.9765625" x2="218.4453125" y1="98" y2="98" stroke="#000000" fill="none" style="stroke-width: 2; marker-end: url(&quot;#markerArrowBlock&quot;);"></line></g><g class="signal"><text x="228.4453125" y="128.5" style="font-size: 16px; font-family: &quot;Andale Mono&quot;, monospace;"><tspan x="228.4453125">Send packet</tspan></text><line x1="218.4453125" x2="335.2109375" y1="137" y2="137" stroke="#000000" fill="none" style="stroke-width: 2; marker-end: url(&quot;#markerArrowBlock&quot;);"></line></g><g class="note"><rect x="281.828125" y="157" width="106.765625" height="29" stroke="#000000" fill="#ffffff" style="stroke-width: 2;"></rect><text x="286.828125" y="177" style="font-size: 16px; font-family: &quot;Andale Mono&quot;, monospace;"><tspan x="286.828125">Copy packet</tspan></text></g><g class="note"><rect x="232.84375" y="206" width="204.734375" height="29" stroke="#000000" fill="#ffffff" style="stroke-width: 2;"></rect><text x="238.84375" y="226" style="font-size: 16px; font-family: &quot;Andale Mono&quot;, monospace;"><tspan x="237.84375">Add to transfer buffer</tspan></text></g><g class="signal"><text x="345.2109375" y="265.5" style="font-size: 16px; font-family: &quot;Andale Mono&quot;, monospace;"><tspan x="345.2109375">Read from transfer buffer</tspan></text><line x1="335.2109375" x2="575.3359375" y1="274" y2="274" stroke="#000000" fill="none" style="stroke-width: 2; marker-end: url(&quot;#markerArrowBlock&quot;);"></line></g></svg>
</div>

Pretty basic stuff. The sender transmits the packet to the server on the encoding thread (once again, minimising the work on the main game thread). The server determines which clients need to receive this packet and forwards it on to them.

When the client receives the packet we don't really know what thread we're on - the receive method is called by user code which integrates with their network integration. We assume this is probably the main thread and so the packet is copied from the receive buffer and sent over to the decoding thread as soon as possible.

## Playback Pipeline

<div id="image-container" align="center">
<svg xmlns="http://www.w3.org/2000/svg" width="334" height="481" xmlns:xlink="http://www.w3.org/1999/xlink"><source><![CDATA[Note over Playback: Add to jitter buffer
Note over Playback: Decode
Note over Playback: Apply volume ramping
Note over Playback: Convert frames to samples
Note over Playback: Apply soft clipping
Note over Playback: Split mono to all channels
Note over Playback: Playback in AudioSource]]></source><desc></desc><defs><marker viewBox="0 0 5 5" markerWidth="5" markerHeight="5" orient="auto" refX="5" refY="2.5" id="markerArrowBlock"><path d="M 0 0 L 5 2.5 L 0 5 z"></path></marker><marker viewBox="0 0 9.6 16" markerWidth="4" markerHeight="16" orient="auto" refX="9.6" refY="8" id="markerArrowOpen"><path d="M 9.6,8 1.92,16 0,13.7 5.76,8 0,2.286 1.92,0 9.6,8 z"></path></marker></defs><g class="title"></g><g class="actor"><rect x="84.0703125" y="20" width="90.578125" height="39" stroke="#000000" fill="#ffffff" style="stroke-width: 2;"></rect><text x="94.0703125" y="45" style="font-size: 16px; font-family: &quot;Andale Mono&quot;, monospace;"><tspan x="94.0703125">Playback</tspan></text></g><g class="actor"><rect x="84.0703125" y="422" width="90.578125" height="39" stroke="#000000" fill="#ffffff" style="stroke-width: 2;"></rect><text x="94.0703125" y="447" style="font-size: 16px; font-family: &quot;Andale Mono&quot;, monospace;"><tspan x="94.0703125">Playback</tspan></text></g><line x1="129.359375" x2="129.359375" y1="59" y2="422" stroke="#000000" fill="none" style="stroke-width: 2;"></line><g class="note"><rect x="35.7890625" y="79" width="187.140625" height="29" stroke="#000000" fill="#ffffff" style="stroke-width: 2;"></rect><text x="41.7890625" y="99" style="font-size: 16px; font-family: &quot;Andale Mono&quot;, monospace;"><tspan x="40.7890625">Add to jitter buffer</tspan></text></g><g class="note"><rect x="97.8671875" y="128" width="62.984375" height="29" stroke="#000000" fill="#ffffff" style="stroke-width: 2;"></rect><text x="102.8671875" y="148" style="font-size: 16px; font-family: &quot;Andale Mono&quot;, monospace;"><tspan x="102.8671875">Decode</tspan></text></g><g class="note"><rect x="35.7890625" y="177" width="187.140625" height="29" stroke="#000000" fill="#ffffff" style="stroke-width: 2;"></rect><text x="41.7890625" y="197" style="font-size: 16px; font-family: &quot;Andale Mono&quot;, monospace;"><tspan x="40.7890625">Apply volume ramping</tspan></text></g><g class="note"><rect x="14.3984375" y="226" width="229.921875" height="29" stroke="#000000" fill="#ffffff" style="stroke-width: 2;"></rect><text x="19.3984375" y="246" style="font-size: 16px; font-family: &quot;Andale Mono&quot;, monospace;"><tspan x="19.3984375">Convert frames to samples</tspan></text></g><g class="note"><rect x="40.1875" y="275" width="178.34375" height="29" stroke="#000000" fill="#ffffff" style="stroke-width: 2;"></rect><text x="46.1875" y="295" style="font-size: 16px; font-family: &quot;Andale Mono&quot;, monospace;"><tspan x="45.1875">Apply soft clipping</tspan></text></g><g class="note"><rect x="10" y="324" width="238.71875" height="29" stroke="#000000" fill="#ffffff" style="stroke-width: 2;"></rect><text x="15" y="344" style="font-size: 16px; font-family: &quot;Andale Mono&quot;, monospace;"><tspan x="15">Split mono to all channels</tspan></text></g><g class="note"><rect x="23.09375" y="373" width="212.53125" height="29" stroke="#000000" fill="#ffffff" style="stroke-width: 2;"></rect><text x="28.09375" y="393" style="font-size: 16px; font-family: &quot;Andale Mono&quot;, monospace;"><tspan x="28.09375">Playback in AudioSource</tspan></text></g></svg>
</div>

Finally, we have the playback pipeline which once again operates in a separate thread to the main thread. It reads packets from the network "transfer buffer", parses them and plays them back.

### Jitter Buffer

We want our voice to be played back as quickly as possible (low latency). However this can present a problem - if we play back a packet as soon as it arrives then the other packet must arrive *exactly* on time otherwise we'll have nothing to play back! The pipeline can handle not having the next packet available - it invokes a part of Opus called *Packet Loss Concealment* and essentially just makes up some sound to fill the gap - but this doesn't sound great and we don't want to use it often.

The jitter buffer fixes this situation by storing enough packets to smooth out the jitter in arrival time. For example if we have 100ms of audio in the jitter buffer then the next packet can be up to 100ms later than normal and it'll still sound ok. The jitter buffer in Dissonance attempts to size itself dynamically by starting out with a conservative size (100ms) and then shrinking itself (by playing back audio a tiny bit faster) as it measures the actual network jitter.

### Volume Ramping

When someone starts or stops talking it can often cause a nasty sounding *click* because the signal is discontinuous (suddenly skips from silence to speech in one instant). To mitigate this, volume ramping detects if this is a transition frame (first or last) and ramps the volume up or down over the length of the entire frame. This does not totally remove the discontinuity but it does reduce it below the audible threshold.

### Convert Frames To Samples

Up to this point (all the way from early in the encoding pipeline) we've been handling things one frame at a time. However the Unity audio system does not want frames of the same size - it comes along whenever it wants and demands however many samples it needs.

This stage of the pipeline removes the frames we've been handling so far and allows the rest of the pipeline to pull things one sample at a time. Conceptually this is pretty simple - just read a frame and then keep returning samples from it when asked, and when you run out of frames read another one and continue. In practice this turns out to be rather complex - reading one sample at a time is far too inefficient, so instead the converter has to try and read data in the largest blocks possible. Additionally, there is some metadata flowing through the pipeline alongside each frame - the converter has to keep track of the metadata for samples as it reads them and return the correct metadata alongside each block of samples.

### Soft Clipping

It's possible that the encoding pipeline produced a bad audio signal with clipping in it (the signal attempts to go louder than max and just tops out). This could be caused by overeager gain control, a badly configured microphone or just someone shouting loudly! Clipping is one of the worst sounding problems in an audio pipeline - in fact it can be downright painful if you're using a loud headset.

Soft clipping (which is part of Opus) distorts the signal to remove the horrible clipping artifacts by slightly smoothing out the bits which clip. This isn't a perfect solution because it introduces slightly incorrect harmonics, but they won't even be perceptible unless there's some major clipping going on.

### Playback In AudioSource

Finally, we get to the end of the pipeline. This is implemented using the [`OnAudioFilterRead`](https://docs.unity3d.com/ScriptReference/MonoBehaviour.OnAudioFilterRead.html) method of Unity. The unity audio thread comes along whenever it needs new data to play, pulls data out of the decoding pipeline, splits the data out so the same thing is playing on all channels (voice data is totally mono channel), and that's it! From this point on the Audio passes through the Unity audio system just as if it's a playing sound effect.

# Blatant Self Promotion

<iframe src="https://api.assetstore.unity3d.com/affiliate/embed/package/70078/widget-wide?aid=1100lJ2J" style="width:600px; height:130px; border:0px;"></iframe>
