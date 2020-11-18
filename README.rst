===========================
 A tale of commit messages
===========================

Backwards in time un-learning as we go.

I really don't speak javascript, so these few commits were an
exploration of how things work.


ea3d6bf change some function names
==================================

This commit message would normally trigger alarm bells: what function
names?

Happily, it is a self contained module, nothing as yet depends on it,
so this change is likely good.

Sometimes it is best to start at the end and work in the other
direction.

Compilers read top to bottom, often the interesting bit is at the
bottom, once you have defined what you need.

Reading the difference, from bottom to top, we do indeed see functions
changing names, *call2* to *debug* and *i_* chopped from beginnings.

What's this?   A call to *noLoop()* in *draw()* and a call to *draw()*
when *keyPressed()*.   I wonder if this worked?

For the rest I seem to be struggling to draw a mask created by *could_be()*.

https://github.com/swfiua/sketchy/commit/ea3d6bf546fe5650d88448c8d69ebfcdd8cb4ca3


022f9b3 image confusion alert btw what triggers draw?
=====================================================

A commit message with an alert?  This looks like me trying to figure
out how images really work.

Something reminds me, I do not think I ever got picking colours from
an uploaded image working.


bd8a1e1 could be comment
========================

And indeed it is a comment.

At the top of the *could_be* function, briefly explaining what it is
trying to do.

Wondering if the javascript world has a python-esque doc-string
convention.

Self documenting code works well.


39c0c17 could_be makes pretty pictures
======================================

We can read this one top to bottom.

Our friendly image, the *Mask* makes an early appearance.

A mystery: *get_color* and *multiply* deleted.

Calls to *get_color()* replaced with *color(get(mouseX, mouseY))*.

I think I just did this while trying to understand the various types,
but it is unusual for me to delete a function like *get_color()*.

Next we see a new function, *could_be()*.

Examples of for loops, syntax is C-style.

Looping round the width and height of an image, to examine each pixel
in turn.   This was what I could not get to work for the uploaded
image, it had no *get()*.

Doing something to every pixel in an image must be a common task, I
wonder is there already another way?

Now we have a function *overlay()* which seems to morph into an
*apply*.

Things are turning inside out here.

The whole module is about manipulating colours.  These are stored as
red, green, blue values.  Often we want to make the same
transformation to each channel.

So *apply()* is a helper function, that applies the function to the
red, blue and green, in turn, and returns the results as a list.

Now we find out what happened to *multiply()*, it has migrated down
the file and is now just a call to *apply* that passes in *imultiply*
as the function.

It is debatable whether we need a function to do this, but it saves
going and fixing all the calls to multiply to be *apply(imultiply(..))*.

9ac425e overlay muddling along
==============================

This fix relates to the formula at the heart of the whole module.

It separates the function that is applied to each of the red, blue and
green out into its own function.

Note the *for (cc of [red, green, blue])* for looping over a list of values.

eb2c3b9 still mixed up?
=======================

One gotcha with changing things to pass values around through function
parameters and return values is the language will not protect you from
passng parameters in the wrong order.

This fix was picking an order and applying it throughout the module.

294e138 all mixed up?
=====================

This is just what it says, intermediate step.  Deleting some global
variables.

Commenting out a *pop()* and a *push()*.

Also looks to be where I discovered *for cc (of ...)*

ac94037 attempt to tidy up sketch
=================================

Looks like everything has changed, but this was mostly just white
space formatting changes.

Oh, and deletion of some global variables, so no need to initialise in
*setup()* too.

A closer look at *overlay()* and it has been made more complicated
with a loop round the three colors.


1c4e869 break everything figuring out scope in js
=================================================

Also includes a change to *index.html*.

This is where I started exploring how the scope of variables works in
javascript.

Some globals deleted, see for example, *let Y*.

And two functions at the end *call1()* and *call2()*, again exploring
how things work.

What difference does *let* or *var* make to the scope?


e6892d1 index.html wrapper
==========================

Just that, get something that works in my browser.


0ffd43c initial colour magic
============================

What we started with.
