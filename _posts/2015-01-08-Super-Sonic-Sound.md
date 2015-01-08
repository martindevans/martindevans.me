---
layout: post
category : game-development
tags : [open-source, programming]
tagline : In Which An Open Source Project Is Born
---
{% include JB/setup %}


## TL;DR

I have released a C# wrapper for [FMOD studio](http://www.fmod.org/fmod-studio/), get it [here](https://github.com/martindevans/SupersonicSound).

## FMOD

FMOD is an audio middleware for games which comes in two parts: FMOD Programmers API and FMOD Studio.

<img align="right" src="assets/FMOD Studio.png"></img>

FMOD studio is an audio creation tool for your audio artists to use to create complex sound effects - using the studio you can create sounds which depends upon parameters and run complicated state machines and then the game can tweak those parameters at runtime and make your sounds responsive to in game events.

The FMOD programmers API is what you use in your game to playback these complicated sound effects. It handles stuff like loading lots of different file formats, generating sounds and effects in realtime, controlling occlusion and reverberation from geometry and positional sound.

Way back in March last year I [posted about](/game-development/2014/03/11/This-Is-Madness!/) how  FMOD had changed their licensing to be *very* indie friendly. To quote their sales page:

 > FMOD Studio Free For Indies! License – Budget under $100k USD
If you are developing an indie title and your total costs are less than $100k USD at time of shipping, you can now use FMOD for free!

Since then I've had a plan to integrate FMOD into the Epimetheus engine and use it in Heist. The sound system I currently have implemented does positional sounds but nothing else and desperately needs replacing.

## FMOD API

Unfortunately there's a slight problem with using FMOD - it's a C++ API. That's ok though because it comes with a supplies C# wrapper using PInvoke to directly call the native FMOD code. Of course this wrapper is very thin, it just exposes FMOD into C# in the native style of FMOD and makes no effort to make it look like C# code at all. Here's an example of some basic FMOD code in C++ and then the same code using the supplied C# wrapper:

    // C++
    FMOD.Studio.ParameterInstance instance;
    ERRCHECK(_eventInstance.getParameter(name, &instance));
    return instance;
    
    // C#
    FMOD.Studio.ParameterInstance instance;
    Util.ERRCHECK(_eventInstance.getParameter(name, out instance));
    return instance;

Not the prettiest code I have ever seen. Note that the *actual* result of this function is passed as an out parameter, and then if there's an error it returns an error code (which you can easily forget to check). Using this would either drive me mad, make me produce very brittle code, or both. What I really want is something like this:

    var instance = _eventInstance.Parameters[name];	//throws exceptions instead of error codes

This is the kind of thing my new open source project, **[Supersonic Sound](https://github.com/martindevans/SupersonicSound)**, is for.

## Supersonic Sound

Supersonic sound (SSS) is built entirely as a wrapper *around* the C# wrapper supplied with FMOD - I didn't write a single PInvoke in this project and so you can be confident the foundation of SSS is as solid as if you used the FMOD wrapper (because, in fact, you are). This design means that if the FMOD wrapper is updated it's *very* easy to update SSS just by dropping the C# wrapper files into the right place in the project and rebuilding.

## Implementation Notes

### Exceptions

FMOD has 49 different return codes from functions, one is "OK" every other one is an error code. I decided that the best approach to handling this would be to have a base FmodException class and then create 48 different exceptions derived from it so that every different error code will throw a unique exception. Obviously if you want to catch an exception you don't need 48 different catch clauses - you just need one to catch FmodException.

    try
    {
        // Stuff
    }
    catch (FmodException e)
    {
        //Something broke
    }

Some of the error codes are in obvious groups, for example:

 - ERR\_INVALID\_FLOAT
 - ERR\_INVALID\_HANDLE
 - ERR\_INVALID\_PARAM
 - ERR\_INVALID\_POSITION
 - ERR\_INVALID\_SPEAKER
 - ERR\_INVALID\_SYNCPOINT
 - ERR\_INVALID\_THREAD
 - ERR\_INVALID\_VECTOR

All of these are to do with invalid parameters being passed into FMOD. In this case the exceptions all have a common base exception you can catch:

 - FmodException
     - BaseFmodInvalidException
         - FmodInvalidHandleException
         - FmodInvalidParamException
         - FmodInvalidPositionException
         - FmodInvalidSpeakerException
         - FmodInvalidSyncPointException
         - FmodInvalidThreadException
         - FmodInvalidVectorException

### Structures

One of the strangest appearing choices I made in Supersonic Sound is to return *struct* instead of *objects* for FMOD objects, this is not a very C# style thing to do. I did this because the FMOD wrapper *already* creates wrapper objects for FMOD objects, if Supersonic Sound created wrapper objects around these objects then the API would allocate two objects for every object and could end up being quite allocation heavy. Instead I have implemented all wrappers as structs which internally have the FMOD wrapper object. All these structs are immutable because all state is held within FMOD, not within the struct itself and there should be no problem passing them around and using them.

One problem with passing structs around instead of objects is that they're pass-by-value which means passing a large structure around can be very expensive. This is not a large problem for Supersonic Sound because all the wrapper structs just contain a single field (the FMOD wrapper object) and so they're no more expensive to pass around than an object-by-reference.

### Naming

I have tried to maintain the naming of methods in Supersonic Sound as much as possible. Obviously C# naming conventions are different from those of the FMOD library and so I have changed capitalisation of methods and structures etc. e.g.

    RESULT getSoundInfo(string key, out SOUND_INFO);
    
Becomes:
    
    SoundInfo GetSoundInfo(string key);
    
Here you can see:

 - The return value is now the sound info, instead of a result code
 - Method name is capitalised
 - Structure is SOUND_INFO is called SoundInfo

There are some places in the FMOD API where multiple methods do the same thing with different arguments, e.g.

    getBank(string key);
    getBankById(GUID id);

These have become:

    GetBank(string key);
    GetBank(Guid id);

i.e. they are simply overloaded with the same name, instead of having "byId" prefixed on the name.

Finally properties which are getters and setters simply become properties, e.g.

    getVolume(out float);
    setVolume(float volume);
 
Instead have become:

    float Volume { get; set; }

#### Naming - Indexers

The most radical name changes between FMOD and Supersonic Sound come in index properties. For example in *Sound* there are several methods for manipulating channels:

    RESULT getMusicNumChannels(out int numchannels);
    RESULT setMusicChannelVolume(int channel, float volume);
    RESULT getMusicChannelVolume(int channel, out float volume);
 
The first one could simply become a readonly property `MusicNumChannels { get; }` and the other two would have to stay as methods because they need the channel index parameter. Instead in cases like these I have decided to use indexed properties, so instead this becomes something like:

    thing.MusicChannels.Count;
    thing.MusicChannels[123].Volume = 0.5f;

Which is a much more fluent interface than before.

## Future Development

There's little point releasing an open source project without some commitment to future development! As it stands almost everything in Supersonic sound is implemented except a few things which are both not very important *and* are hard to port. However if you use the library and find that a feature is missing *please* [create an issue](https://github.com/martindevans/SupersonicSound/issues) and I will try my best to implement the feature - none of the missing features are impossible to implement and so I should be able to get something done for your very quickly.

Similarly if you find a bug, or even an annoying inconsistency, please [create an issue](https://github.com/martindevans/SupersonicSound/issues) and tell me about it.

#### Nuget package

I plan to get a nuget package up soon<sup>tm</sup> but I have no experience with releasing nuget packages with native dependencies and I need to investigate how that's done.