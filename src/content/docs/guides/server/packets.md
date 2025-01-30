---
title: Packets
description: Introduction to RE and finding packet structure by sans (real)
---

# Introduction
To begin reverse engineering, you need a disassembler. The most commonly used in **Supercell Reverse Engineering (SCRE)** is **IDA Pro**. Note that the free version (IDA Free, also called "IDA Slave Edition") doesn't have all the necessary features; you need the pro version.

## Getting Started
On Android, our target is `libg.so`, located in the `/lib` directory.
On iOS, our target is the "Brawl Stars" executable, located in the `Payload/Brawl Stars.app` directory, but I won't go into that further.

Before analyzing `libg.so`, we first need to dump the library to extract the strings. You can use [PADumper](https://github.com/BryanGIG/PADumper) for this. It's probably the simplest tool for the task.

Steps:  
1. Launch **Brawl Stars**.  
2. Open **PADumper**.  
3. Choose **Brawl Stars** as the target application.  
4. Write `libg.so` in the library field.  
5. Check the box for "Fix ELF," as this usually resolves ELF-related issues.

## Analyzing the Library
Analyzing is usually not helpful, only when dealing with versions like **Brawl Stars v36.218**, which contains debug symbols (DWARF Info).

[Here](https://mega.nz/file/e3AB3YqQ#Z1y4M-9rlUvA274IZgvKuqeq2k17Zj5EHu5SxqZMQXY) is a link to the dump of this library (arm32).

(Thanks [santer](https://github.com/SANS3R66))!

### Loading into IDA
1. Load the library file into **IDA Pro**.  
2. Wait for the auto-analysis to finish. You'll know it's done when the status changes to "Idle":

   ![Auto Analysis Complete](https://i.imgur.com/hs3103j.png)  
   ![Idle Status](https://i.imgur.com/0T8qjk4.png)

### Debug Symbols
Debug symbols provide function names, which are critical for navigating the library. And like I said, they can only be found in v36.218. However, the names are a little broken. You can fix them using this script made by Primo.

```cpp
// This script fixes v36 BS lib's glitched debug symbols.
#include <idc.idc>

static main() {
  auto ea, x;

  for (ea = get_next_func(0); ea != BADADDR; ea = get_next_func(ea)) {
    x = get_func_flags(ea);
    auto func_name = GetFunctionName(ea);
    auto new_name = "_" + func_name;
    MakeName(ea, new_name);
  }
  msg("All functions patched successfully!");
}
```

After running the script, broken function names like this:

![Broken Functions](https://i.imgur.com/kvzQnzT.png)

will turn into this:

![Fixed Functions](https://i.imgur.com/FdUw3mI.png)

## Finding the Message Structure
Let's take `ChangeAllianceSettingsMessage` as an example. In v36.218, you can simply search for `ChangeAllianceSettingsMessage::encode` to find the structure:

![Search Results](https://i.imgur.com/h1KYVn8.png)

### Versions Without Debug Symbols
For versions without debug symbols, you need to locate the message ID. A list of all message IDs can be found [here](https://github.com/athemm/brawl-proxy/blob/main/packets.json).

From the list, we know the message ID for `ChangeAllianceSettingsMessage` is **14316**.

1. In **IDA**, go to **Search** > **Immediate Value**.  
2. Enable "Find all occurrences."  
3. Click **Search**.

Results:

![Search Results](https://i.imgur.com/fuoypEV.png)

The first result is likely what we need. You can confirm this by opening the function:

![Function Result](https://i.imgur.com/1ZeAtYs.png)

As shown above, it simply returns the message ID, confirming it’s the correct function.

### Navigating Further
We are now in the `::getMessageType` method. Follow the cross-references (XRefs):

![XRefs](https://i.imgur.com/P7Kfa4L.png)

By comparing this to other messages and to version v36.218, we can identify corresponding methods:

![Comparison](https://dl.natesworks.com/haccwiki/media/comparison.png)

### Decoding the Message Structure
If we now check the message, we'll see something like this:

![idk](https://i.imgur.com/Q9hoH9g.png)

Comparing to v36.218, we can deduce:

- `sub_47B1A0` = `ByteStream::writeString`  
- `sub_BC260` = `ByteStreamHelper::writeDataReference`  
- `sub_66BB1C` = `ByteStream::writeVInt`  
- `sub_2B588C` = `ByteStream::writeBoolean`

This results in:

![Decoded Message](https://i.imgur.com/GDFXjww.png)

And that’s it! You successfully got the message structure. It wasn’t too difficult, was it?

## Credits
A kind of Russian version of this guide can be found [here](https://github.com/SANS3R66/brawlstars-re/wiki/Reverse-engineering).
