---
layout: page
title: Japan 2014
tagline: Gallery From My Holiday To Japan
---

In 2014 I went to Japan for three weeks, we visited Kawaguchiko lake (near Fuji), the ancient capital Kyoto, Hiroshima, Nagoya, Matsumoto and Tokyo.

## Gallery

Click on any of the images to get a full size version.

### Kawaguchiko

Fuji is the tallest mountain in Japan. Around the base are fives lakes; Kawaguchiko, Saiko, Yamanakako, Shojiko and Motosuko. The lakes a popular tourist destination for Japanese and foreigners alike. We went here mostly because there's *not* much to do which makes it a fantastic place to recover from close to 40 hours awake and travelling as well as jetlag from 9 timezones!

The hotel description promised great views of Fuji and most definitely did not disappoint! On the very first day we were up at 6am and were lucky enough to see Fuji poking through the fog. We thought that would probably be all that we saw of Fuji, but we turned out to be incredibly lucky with the weather and later in the day we were on top of a nearby hill just as the clouds were clearing and got some beautiful shots. Throughout the day the clouds slowly cleared and we got more incredible shots of Fuji.

{% for pic in site.data.Japan2014.kawaguchiko %}
    {% capture thumbnail %}{{ site.data.Japan2014.basePath }}{{ site.data.Japan2014.thumbPrefix }}{{ pic }}{% endcapture %}
    {% capture fullpath %}{{ site.data.Japan2014.basePath }}{{ pic }}{% endcapture %}
    {% include lightbox/photo.html thumb="{{ thumbnail }}" path="{{ fullpath }}" %}
{% endfor %}
{% include lightbox/spacer.html %}

### Kyoto

Kyoto was the home of the emperor and the capital of Japan from 794 through to 1868. It's a city absolutely *packed* with history - there are no less than **17** UNESCO World Heritage sites in the city! We spent an entire week exploring Kyoto and I still feel like we barely scratched the surface of what there is to see here.

{% include lightbox/photo.html thumb="/assets/Japan/Kyoto/thumb-WP_20141024_15_32_46_Pro.jpg" path="/assets/Japan/Kyoto/WP_20141024_15_32_46_Pro.jpg" %}
{% include lightbox/photo.html thumb="/assets/Japan/Kyoto/thumb-WP_20141020_18_04_27_Pro.jpg" path="/assets/Japan/Kyoto/20141020_18_04_27_Pro.jpg" %}
{% include lightbox/photo.html thumb="/assets/Japan/Kyoto/thumb-WP_20141019_13_06_14_Pro.jpg" path="/assets/Japan/Kyoto/WP_20141019_13_06_14_Pro.jpg" %}
{% include lightbox/photo.html thumb="/assets/Japan/Kyoto/thumb-WP_20141018_15_11_27_Pro.jpg" path="/assets/Japan/Kyoto/WP_20141018_15_11_27_Pro.jpg" %}
{% include lightbox/photo.html thumb="/assets/Japan/Kyoto/thumb-WP_20141018_14_52_50_Pro.jpg" path="/assets/Japan/Kyoto/WP_20141018_14_52_50_Pro.jpg" %}
{% include lightbox/photo.html thumb="/assets/Japan/Kyoto/thumb-WP_20141021_15_28_29_Pro.jpg" path="/assets/Japan/Kyoto/WP_20141021_15_28_29_Pro.jpg" %}
{% include lightbox/photo.html thumb="/assets/Japan/Kyoto/thumb-WP_20141021_16_29_53_Pro.jpg" path="/assets/Japan/Kyoto/WP_20141021_16_29_53_Pro.jpg" %}
{% include lightbox/photo.html thumb="/assets/Japan/Kyoto/thumb-WP_20141022_20_19_58_Pro.jpg" path="/assets/Japan/Kyoto/WP_20141022_20_19_58_Pro.jpg" %}
{% include lightbox/spacer.html %}

### Hiroshima

### Nagoya

### Matsumoto

### Tokyo