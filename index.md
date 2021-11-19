---
layout: page
title: Blog 3.0
tagline: I make games.
---
{% assign first_post = site.posts.first %}
<div id="post">
    <div class="row">
        <div class="span11">
            <h2><a href="{{ first_post.url }}">{{ first_post.title }}</a></h2>
            <div id="date">published {{ first_post.date | date_to_string }}</div>
            {{ first_post.content }}
            <a id="more" href="{{ first_post.url }}#comments-thread">Comments &raquo;</a>
        </div>
    </div>
</div>

<hr />

<h2>archive</h2>
<ul id="archive">
    {% for post in site.posts %}
        <li>
            <a href="{{ post.url }}">{{ post.title }}</a>
            <abbr>{{ post.date | date_to_string }}</abbr>
        </li>
    {% endfor %}
</ul>
