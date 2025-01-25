---
title: "Best" way to debug scripts
description: Tutorial made by kubune describing the best way to code in frida!
---


This tutorial will teach you how to quickly test your code without repacking your entire `.apk` and compiling it. 

It's gonna be fun to code when you learn this!

**Steps:**

1. **Attach frida**
   - Add [frida gadget](https://github.com/frida/frida/releases/) library to the `lib/arch` directory.
   - Load it in `GameApp.smali` (In newer versions it's `TitanApplication.smali` and the `"g"` searching method won't work in them. Check `BSD Brawl` and load your gadget under the `"BSD"` gadget loading).
    - Do not create `.config.so` file. Gadget will be automatically in `listen` mode and we're going to use it.
      
2. **Enable USB debugging**
   - Enable USB debugging in settings. You can find tutorials online on how to do it, so I won't explain it here.

3. **Installing dependencies**
   - Download `node.js` latest LTS version and install it (Make sure it's going to add to the system PATH).
   - Create a new directory in your desired place (for example: Desktop). This is where our project will be.
   - Open `cmd.exe` in the directory location and type this:
     ```
     npm install frida
     ```
     This will install frida node.js package on your PC
   - [OPTIONAL] If you want to quickly create script type this in `cmd.exe`:
     ```
     echo. >script.js
     ```
     This will create `script.js` file in your working directory.

4. **Install ADB**
   - Install ADB `(Android Debugging Bridge)`, there's plenty of tutorials on the internet, I'm sure you'll install it on your own.
     
5. **Loading the script**
   - Plug in your phone with USB cable to the PC
   - Allow USB debugging.
   - In `cmd.exe` type:
     ```
     adb devices
     ```
     It will try to connect to your phone via the bridge.
   - Press **Allow** on the phone.
   - Now open Brawl Stars with the frida gadget in it. It will be stuck on the black screen until you start the script
   - To start the script in `cmd.exe` type:
     ```
     frida -U Gadget -l script.js
     ```
   - Your script will start executing and you can modify the script in runtime!


