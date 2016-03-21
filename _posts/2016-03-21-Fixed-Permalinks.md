---
layout: post
category : Site-Update
tags : [site-update, general]
tagline : In Which Some Much Needed Maintenance Is Conducted
---

## Broken Permalinks

I recently discovered that permalinks to my blog posts have been broken - this means that things like [reddit posts](https://www.reddit.com/domain/martindevans.me/) and Google search results pointing to my blog were all broken for an unknown amount of time! I *think* this was caused by Github [upgrading their version of Jekyll](https://github.com/blog/2100-github-pages-now-faster-and-simpler-with-jekyll-3-0) to 3.0 which has some slightly different rules about how permalinks are configured. Previously my permalinks were:

    permalink: /:categories/:year/:month/:day/:title
    
Jekyll 2.0 interpreted this as meaning an optional trailing slash was allowed. However Jekyll 3.0 requires you to add that trailing slash explicitly if you want it. This means I fixed the entire problem by simply adding a / to the end of the [config](https://github.com/martindevans/martindevans.github.com/blob/master/_config.yml):

    permalink: /:categories/:year/:month/:day/:title/

It's frustrating this happened just after I published a couple of relatively popular blog posts about procedural generation. If you've come to my site and encountered a [404](http://martindevans.me/404) page I apologise for that :(

## Loading Speed Optimisations

While I was fiddling with the configuration for the site I also made some changes to the default layout of pages. All of the Javascript which generates the polygon background is now loaded at the bottom of the body tag, instead of the top of the head tag. If scripts are in the head they block the browser from doing anything else while the script downloads (resulting in a blank page while things download), conversely if scripts are in the body tag they do not block. Of course, the page will render to the screen *before* the scripts do anything which means you may see the page without it's polygon background if you're on a particularly slow connection - but this isn't really a problem.

Additionally I have also included all of the CSS served from the same domain as my blog (some of it comes from an external CDN) inline in the head tag. This seems ugly but ultimately the browser is going to have to download those bytes - we may as well do it all in one request!

After all this I still don't get a particularly fantastic score from [Google PageSpeed Insights](https://developers.google.com/speed/pagespeed/insights/?url=http%3A%2F%2Fmartindevans.me%2Fgame-development%2F2015%2F12%2F27%2FProcedural-Generation-For-Dummies-Lots%2F&tab=desktop), only 80/100 for desktop, but it's definitely improved (especially on bad network connections).

## Procedural Generation For Dummies?

It's been a long time since I've published an entry in my [Procedural Generation For Dummies]({% post_url 2015-12-11-Procedural-Generation-For-Dummies %}) series. The last entry regarding city generation was published right at the end of December - almost three months ago. This is because I started work on floor plan generation and ultimately decided that the approach I was taking was fundamentally flawed and I needed to go back to the drawing board! Of course this was pretty depressing so I took a break from working on procedural generation altogether for a couple of months to work on character animation.

For the past few weeks I have been working on a new floor plan generation system which seems to be working much better. I will be resuming entries in the series very soon, in the meantime here's a teaser:

<style>
 #image-container img {
 	max-height: 235px;
 	width: auto;
 }
</style>
 
<div id="image-container" align="center">
<img src="/assets/floorplan-teaser.png" width="54%">
</div>