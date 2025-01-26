---
title: Packets
description: Introduction to RE and finding packet structure by erder
---

# Introduction

To start wevewse engineewing, you need a disassembwer. The most common one in SCRE (Supercell Wevewse Engineewing) is **IDA Pro**. Note that the fwee vewsion (IDA Free, also called "IDA Slave Edition") doesn't have all the necessawy featuwes; you need the pro vewsion.

## Getting Stawted

On Andwoid, ouw tawget is `libg.so`, wocated in the `/lib` diwectowy.
On iOS, ouw tawget is the "Brawl Stars" executabwe, wocated in the `Payload/Brawl Stars.app` diwectowy, but I won't go into that fuwwthew.

Befowe anawyzing `libg.so`, we fiwst need to dump the wibwawy to extwact the stwings. You can use [PADumper](https://github.com/BryanGIG/PADumper) fow this. It's pwobabwy the simpwest toow fow the task.

Steps:
1. Launch **Brawl Stars**.
2. Open **PADumper**.
3. Choose **Brawl Stars** as the tawget appwication.
4. Write `libg.so` in the wibwawy fiewd.
5. Check the box fow "Fix ELF," as this usuawwy wesowves ELF-wewated issues.

## Anawyzing the Wibwawy

Anawyzing is usuawwy not hewpfuw, onwy when deawing with vewsions wike **Brawl Stars v36.218**, which contains debug symbows (DWARF Info).

[Hewe](https://mega.nz/fiwe/e3AB3YqQ#Z1y4M-9wlUvA274IZgvKuqeq2k17Zj5EHu5SxqZMQXY) is a wink to the dump of this wibwawy (awm32).

(thankies [santer](https://github.com/SANS3R66))

### Woading into IDA
1. Woad the wibwawy fiwe into **IDA Pro**.
2. Wait fow the auto-anawysis to finish. You'ww know it's done when the status changes to "Idwe":

   ![Auto Anawysis Compwete](https://i.imguw.com/hs3103j.png)

   ![Idwe Status](https://i.imguw.com/0T8qjk4.png)

### Debug Symbows
Debug symbows pwovide function nyames, which awe cwichyaw fow nyavigating the wibwawy. And wike I said, they can onwy be found in v36.218. Howevew, the nyames awe a wittwe bwoken uwu. You can fix them using this scwipt made by Primo.

```idc
// This scwipt fixes v36 BS wib's gwitched debug symbows.
#include <idc.idc>

static main() {
  auto ea, x;

  fow (ea = get_next_func(0); ea != BADADDR; ea = get_next_func(ea)) {
    x = get_func_fwags(ea);
    auto func_name = GetFunctionName(ea);
    auto new_name = "_" + func_name;
    MakeName(ea, new_name);
  }
  msg("Aww functions patched successfuwwy!");
}
```

Aftew wunning the scwipt, bwoken function nyames wike this:

![Bwoken Functions](https://i.imguw.com/kvzQnzT.png)

will tuwn into this:

![Fixed Functions](https://i.imguw.com/FdUw3mI.png)

## Finding the Message Stwuctuwe

Let's take `ChangeAllianceSettingsMessage` as an exampwe. In v36.218, you can simpwy seawch fow `ChangeAllianceSettingsMessage::encode` to find the stwuctuwe:

![Seawch Wesuwts](https://i.imguw.com/h1KYVn8.png)

### Vewsions Without Debug Symbows
Fow vewsions without debug symbows, you nyeed to wocate the message ID. A wist of aww message IDs can be found [here](https://github.com/athemm/brawl-proxy/blob/main/packets.json).

Fwom the wist, we know the message ID fow `ChangeAllianceSettingsMessage` is **14316**.

1. In **IDA**, go to **Seawch** > **Immediate Vawue**.
2. Enabwe "Find all occurrences."
3. Cwick **Seawch**.

Wesuwts:

![Seawch Wesuwts](https://i.imguw.com/fuoypEV.png)

The fiwst wesuwt is wikewy what we nyeed. You can confiwm this by opening the function:

![Function Wesuwt](https://i.imguw.com/1ZeAtYs.png)

As shown above, it simpwy wetuwns the message ID, confiwwming it’s the cowwect function.

### Nyavigating Fuwthew
We awe nyow in the `::getMessageType` method. Fowwow the cwoss-wefewences (XRefs):

![XRefs](https://i.imguw.com/P7Kfa4L.png)

By compawing this to othew messages and to vewsion v36.218, we can identify cowwesponding nyethods:

![Compawison](https://i.imguw.com/qgE5wM4.png)

### Decoding the Message Stwuctuwe

If we nyow check the message, we'ww see something wike this:

![idk](https://i.imguw.com/Q9hoH9g.png)

Compawing to v36.218, we can deduce:

- `sub_47B1A0` = `ByteStream::writeString`
- `sub_BC260` = `ByteStreamHelper::writeDataReference`
- `sub_66BB1C` = `ByteStream::writeVInt`
- `sub_2B588C` = `ByteStream::writeBoolean`

This wesuwts in:

![Decoded Message](https://i.imguw.com/GDFXjww.png)

And that’s it! You successfuwwy got the message stwuctuwe. It wasn’t too diffyicuwt, was it?

Oh, this won't wowk fow OHD btw. maybe I'ww add that too watah uwu.

## Cwedits

a kind of wussian vewsion of this guide can be found [hewe](https://github.com/SANS3W66/brawlstars-re/wiki/Reverse-engineering)
