---
title: Onffline Battles
description: A tutorial on how to enable offline battles by PrimoDevHacc
---

How to enable offline battles on any client?

To enable offline battles, you basically need to make the play button start an offline battle

How though?

The battle type is the 3rd argument of HomePage::startGame, and offline battle type is 3, so we need to patch the argument number 3 to make it always 3.


But first we need to find HomePage::startGame!

This is pretty easy to find this function, you need to find the function called _srand in ida pro, xref it by pressing x and take a look of all functions using it, once you found a function where you see
'if a3 == 3" it means you are in the correct place, now all you need to do on your frida script is:


```js
Interceptor.attach(cache.base.add(HomePage::startGame),{
        onEnter: function(args) {
            args[3] = ptr(3);
        }
    });
```

replace "HomePage::startGame" by its actual address
