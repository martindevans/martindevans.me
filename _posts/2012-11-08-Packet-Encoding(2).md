---
layout: post
category : Heist
tags : [heist, networking-series]
tagline : In Which There is Much Talk Of Bytes And Bits
---
{% include JB/setup %}


## TL;DR

Some things can be smaller than other things in some circumstances.

## Compression

It's a basic fact of data compression that you can't compress everything, if you make one thing take less space then you *must* be making something else take more space to store. Given this fact how does anyone ever compress any data? Image compression, music compression and general compression (e.g. zip) all do a pretty good job of it. All data compression simply works in one of two ways.

### Lossy Compression

As the title implies, lossy compression loses some data when it compresses it. It's obvious how you can make a file smaller if you throw some of the data away! This might sound pretty stupid but it's probably the kind of compression you use most often, every time you view and image on a website or listen to an mp3 file you're using lossy compression. The trick to lossy compression is knowing which data to throw away.

### Lossless Compression

You may have guessed that the other type of compression does _not_ lose data when it is compressed. It's less obvious how this works, after all if you've got exactly the same data it must take the same space... right? Lossless compression works by making more common patterns take less space, and less common patterns take more space. For example, music files are not just random noise (usually) instead they are smooth curves which means that any value is going to be (normally) only a small difference from the previous value, so we can use a compression system that writes out the differences between values and uses less bits to encode small numbers and suddenly our music file is smaller (this is roughly how the lossless flac music format works).

## Glossary

A *floating point number* stores a huge range of numbers, both very large and very small. Using less bits to store a float does not reduce the range, instead it reduces the precision.

An *Unsigned Integer* stores (obviously) whole numbers. Using less bits to store an integer does not reduce the precision instead it reduces the range of possible values that can be represented. i.e. a 16 bit integer simply *cannot* represent values larger than 65535, but a 32 bit one can represent all the way up to 4,294,967,295.

A *Signed Integer* can represent negative (whole) values. A signed integer simply shifts the range of possible values down by half, if an unsigned 16 bit integer can represent 0 -> 65535 then a signed 16 bit integer can represent -(65535/2) -> (65535/2).

Binary number are represented using *Bits*, A bit is either a 1 or a 0. In the same way as normal numbers the rightmost number means it's own value, the next number to the left means it's value * 10, and so on. A more in depth explanation is pretty far out of scope here, [read wikipedia](http://en.wikipedia.org/wiki/Binary_numeral_system#Counting_in_binary) if you're unfamiliar with binary.

A *byte* is the smallest value we can represent, it takes 8 bits. The packet encoding system never writes values less than 1 byte because it's just a pain to handle.

## Network Encoding

When writing a packet you'll usually use a combination of both of these methods. Last time I included a list of all the methods Heist offers for writing to packets, here they are again classified as lossless or lossy:

#### Lossless
 - WriteVariableUint64
 - WriteRotationQuaternion64
 - WriteVector3Float32
 - WriteVector2Float32
 
#### Lossy
 - WriteFloat16
 - WriteVariableFloat16
 - WriteNormalizedFloat8
 - WriteRangeLimitedFloat8
 - WriteRotationQuaternion32
 - WriteVector3Float16
 - WriteVector2Float16

### WriteVariableUint64
 
This is a lossless compression method for writing out any unsigned integer (64 bits is the largest any C# integer, hence UInt64). The key to how this method works is that it takes less space to write out smaller values, it's used in Heist to write out things like the length of any array (which is quite likely to be small) or the ID of an entity (which is assigned in ascending order, and so get larger with time).

How do we achieve this compression? It's quite simple really:

    for (int i = 0; i < sizeof(UInt64); i++)        //Keep looping over all the bits in this number
    {
        byte writeByte = (byte)(value & 127);       //Take the 7 least significant bits
        value >>= 7;                                //shift the next 7 bits of the value into the least significant position

        if (value != 0)                             //If there are any useful bits left...
            writeByte |= 128;                       //...Then set the most significant bit of the byte to 1

        Write(writeByte);                           //Write out this single byte

        if (value == 0)                             //If there's no more data
            return;                                 //...Then stop trying to encode more data
    }
    
I lied, that's not simple! Here's an example using binary to represent the numbers:

    value = 0001010110100101                        //A 16 bit integer, the value 5541
    
    writeByte = value & 01111111                    //This is value & 127 expressed in binary. Basically this takes the 7 least significant (right most) bits.
                                                    //This means writeByte is now 0100101 (37)
                                                    
    value >>= 7                                     //Move all the bits in value 7 to the right
                                                    //This means value is now 0000000000101011
                                                    
    if (value != 0)                                 //True! Value is still 43
        writeByte |= 10000000                       //This means set the bits in writeByte to true if they are already set *or* they're set in the given value
                                                    //00100101 or 10000000 = 10100101
                                                    
    Write(writeByte)                                //Put this byte in the packet to be sent
    
    if (value == 0)                                 //False! Value is still 43
    
    /* Next Loop Iteration */
    
    writeByte = value & 01111111                    //This means writeByte is now 0101011 (43)
    
    value >>= 7                                     //This means value is now 0000000000000000
    
    if (value != 0)                                 //False! Value is 0
    
    Write(writeByte)                                //Put this byte in the packet to be sent
    
    if (value == 0)                                 //True!
        return;                                     //We're done
        
So in this case we took a 16 bit integer (2 bytes) and saved ourselves... nothing, we still used two bytes. However if we had used a 64 bit integer (8 bytes) it would still have only taken 2 bytes, that's a 75% compression ratio (which is awesome).

Hopefully it should be relatively obvious how this is decoded. You read byte by byte, and if the 8th bit in the byte is set it means there are more bytes to come, if it's unset it means we're done.

As I mentioned earlier, all compression makes some values bigger to make others smaller. Of course, the things that get here are the big numbers... the *really really* big numbers. A 64 bit integer can represent values up to 1.8446744x10^19. I can't think of any reason Heist is likely to send values this big, so we're good!

## That Was Quite Long

Explaining all that took more space than I expected! I'm going to stop there and continue explaining there other encoding systems (the lossy ones) at a later date.