---
title: Online Battles
description: A tutorial on how to make online battles by PrimoDevHacc
---

How to make online battles?

This is pretty easy to get structure, this tutorial will be focused on that, you will have to code logic yourself.

On goal function is BitStream::writePositiveInt 

To find it you will have to go a little deep 😅

If you use older versions (i think under 26)
First open ida and do "alt + i" and then enter "10555" this is ClientInputMessage id

We need to find the ctor, so make sure the function isn't only "return 10555", you have to see "case 10555", then just down this you will see a function: its the ctor

Now we have the ctor, xref it. You will now land in another function, you will also xref

Now scroll a little bit until you see

```js
if ( dword_smth )
  {
    sub_our_target(*(_DWORD *)(a1 + 28), a2, LODWORD(v3));
    if ( sub_smth(*(_DWORD *)(a1 + 28)) )
    {
      v7 = *(_DWORD *)(*(_DWORD *)(a1 + 28) + 164);
```

now go to sub_our_target

then you will find a function in an if statement
"sub_smth(a1, 0, 0)"

enter this function

now find a function that has many arguments and might appear multiple times, this is LogicGameObjectsManager::encode!

Find a function that isn't used as variable

and get the address of the function "sub_smth(a1, a2, number)" you just found BitStream::writePositiveInt!!!!
now complete the address of this script and run it using a computer!

```js
Interceptor.attach(base.add(your address), {
    onEnter: function(args) {
         console.log("self.writePositiveInt(" + args[1].toInt32() + "," + args[2].toInt32() + ")")
   },
});
}
```

you just got battle structure!
