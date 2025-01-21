---
title: Socket
description: Introduction to socket for your Brawl Stars server by Natesworks
---

Brawl Stars uses TCP for the client to communicate with the server and vice-versa (excluding battles; that uses UDP). A **socket** is an endpoint for communication between two devices. Use the socket library, or the equivelent for your programming language of choice, for lobby, team, friends, shop etc.

## What's a packet

Packets are data sent over a network that is divided into smaller segments.

## Client vs Server packets

A client packet is a packet where the client sends the data and a server packet is the same, but the server sends the data.

## Packet ID

The packet ID tells the server what to do with the data (eg. read token). You can find packet ID list [here](https://github.com/PeterHackz/documentations/wiki/%233-brawl-stars-messages-ids). The packet ID is the first 2 bytes of the packets then the next 3 bytes is the length of the packet, and finally the next 2 bytes are packet version.

