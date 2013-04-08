---
layout: post
category : Heist
tags : [heist, artificial-intelligence, ai-series]
tagline : In Which Distractions Are Revealed To Sometimes Be A Good Thing
---
{% include JB/setup %}


## TL;DR

I'm been hard at work on Artificial Intelligence.

## Where Have You Been!?

It's been a while since my last blog post, sorry about that. I was aiming to get a page up on Steam Greenlight at the end of last month - I decided that I would keep my head down, work extra super hard and then come back with an announcement of my Greenlight page. That didn't happen because the [UI system that Heist uses](http://awesomium.com/) released a new version which I upgraded to and instantly discovered a major bug in it. Rather than wasting my time working around the bug I've been working on other stuff until the bug is fixed (soon, according to their support). I have to admit I think this whole thing has worked out rather well - the UI work was really dragging me down and the change to something else has been very refreshing.

## Something Else

As you may have guessed from the title, the something else I have been working on is Artificial Intelligence. I first played around with this topic [ages ago](/Heist/2012/07/24/Artificial-Stupidity/) but I didn't make any great progress on the AI itself - I was improving the various supporting systems required for AI when RSI put me out of commission for a month. By the time I got back into action I decided to work on other, simpler, tasks to catch up to my timetable a little.

As seems to be becoming tradition on this blog every time I start a significant new phase of development I'm going to do a series of blog posts on Artificial Intelligence for games. Here are all the posts in the series (this will update itself as more are added, so keep checking):

<ul>
    {% for page in site.tags.ai-series %}
    <li><a href="{{ post.url }}">{{ page.title }}</a></li>
    {% endfor %}
</ul>