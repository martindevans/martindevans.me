---
layout: post
category : General-Development
tags : [compiler-series, compiler, yolol]
tagline : In Which An Interpreter Is Born
---
{% include JB/setup %}

# TL;DR

The second stage of compiling a language is interpreting it.

# Compiler Series

This article is the third in a series on how to build a compiler for a simple language into CIL.

<ul>
    {% for page in site.tags.compiler-series %}
    <li><a href="{{ page.url }}">{{ page.title }}</a></li>
    {% endfor %}
</ul>

# What Is Interpreting

todo

# Building Language Primitives

todo: Number/Rope

# Walking The Syntax Tree

todo: ast walking visitor pattern