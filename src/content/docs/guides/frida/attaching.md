---
title: Attaching frida tutorial
description: A tutorial on how to attach frida by Natesworks
---


This tutorial explains how to attach a Frida script to Brawl Stars. Frida is a dynamic instrumentation toolkit that lets you inject scripts into running processes.

**NOTE:** MT Manager does not decompile dex files use something like apktool.

**Steps:**

1. **Copy the Frida script:**
   - Place your Frida script into the `/lib/arch/` directory within the APK. Replace arch with the appropriate architecture (eg. armabi-v7 or armabi-v8) 
   - Name the script `libXXX.script.so`, where `XXX` can be any name (e.g., `libdebug.script.so`).

2. **Create a configuration file:**
   - In the same directory as frida script, create a configuration file named `libXXX.config.so` (e.g., `libdebug.config.so`).
   - This file should contain the following JSON content, which tells Frida how to interact with the script:

     ```json
     {
         "interaction": {
             "type":"script",
             "path":"libXXX.script.so",
             "on_change":"reload"
         }
     }
     ```

3. **Add frida gadget:**
   - Download [Frida gadget](https://github.com/frida/frida/releases/)
   - Place it inside of libXXX.so.

4. **Modify the application's Smali code:**

    **Offline**
   
   - Open the `smali/com/supercell/titan/GameApp.smali` file.
   - Locate the line containing `"g"`.
   - Move below the invoke.
   - Insert the following Smali code to load your Frida script:

     ```smali
     const-string lib, "XXX" 
     invoke-static {lib}, Ljava/lang/System;->loadLibrary(Ljava/lang/String;)V 
     ```
     Replace `"XXX"` with the name you used in step 1 (e.g., `"debug"`).

   **BSD**
     
   - Open the `smali/com/supercell/titan/TitanApplication.smali` file.
   - Locate the line containing `"BSD"`.
   - Move below the invoke.
   - Insert the following Smali code to load your Frida script:

     ```smali
     const-string lib, "XXX" 
     invoke-static {lib}, Ljava/lang/System;->loadLibrary(Ljava/lang/String;)V 
     ```
