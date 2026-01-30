---
id: 8a48gahfsx
published_at: 2026-01-30T18:35:18.662Z
excerpt: "Long time ago, I decided to migrate to my first Linux distro ever: Linux Mint. I had a pretty smooth experience initially and decided to tweak some settings here and there to make it look better..."
crosspostedOn:
crosspostLink:
title: My Automated Machine Setup for 2026
tags: linux
slug: my-automated-dev-setup-for-a-new-machine-in-2026
---

Long time ago, I decided to migrate to my first Linux distro ever: Linux Mint. I had a pretty smooth experience initially and decided to tweak some settings here and there to make it look better. Then, I did the same thing on Manjaro, Ubuntu, ElementaryOS, and others. Even though I got used to changing settings every so often, sometimes I didn’t feel like doing it all from scratch again.

> It's perfect timing to move into Linux now that [Windows s**ks](https://ntdotdev.wordpress.com/2026/01/25/state-of-the-windows-what-is-going-on-with-windows-11/)

Especially when I got a new machine and decided to hop on a new distro and enjoy the goods of Hyprland. So I decided to automate some things.

So I wanted three things:
- Use as few dependencies as possible
- Be able to run on Linux and macOS-based systems
- Have all my dotfiles and packages installed automatically

The project is: [freshsetup](https://github.com/jeferson-sb/freshsetup/tree/main)

I was using freshsetup as a personal tool for automating my setup, and then I decided, why not opensource it?

## Installation

Before running this project, your system would need to have `make`, `git`, and `python3`, so make sure you have those before going forward.

The first command is simple:
- If you have mac: `make install/macos`
- If you have ubuntu/debian: `make install/ubuntu`
- If you have arch: `make install/arch`

<img-lazy src="https://firebasestorage.googleapis.com/v0/b/portfolio-d3c7c.appspot.com/o/pika-os-make-install-ubuntu.webp?alt=media&token=add9a15e-e76a-4eea-b3f7-9ca795e2dabf" alt="" width="870" height="500" />

### Choosing packages and apps

Next, you choose which packages you would want to install on your system.

This is a **key feature** I wanted in this setup, because sometimes when hopping between systems, I don't want to wait for everything installed once, but rather only a handful of packages I really want.

<img-lazy src="https://firebasestorage.googleapis.com/v0/b/portfolio-d3c7c.appspot.com/o/pikaos-select-packages.webp?alt=media&token=d7ad294a-8df2-40a6-b42d-109e429511ab" alt="" width="870" height="500" />

You can run the same command again and choose other packages if you like.

<img-lazy src="https://firebasestorage.googleapis.com/v0/b/portfolio-d3c7c.appspot.com/o/pikaos-installing.webp?alt=media&token=cf3a7a6b-954b-44d2-adb3-3a88f613e986" alt="" width="870" height="500" />

Once everything is downloaded properly, you will see the output: <i>"Your system is successfully configured :)"</i>

<img-lazy src="https://firebasestorage.googleapis.com/v0/b/portfolio-d3c7c.appspot.com/o/pikaos-installing-final.webp?alt=media&token=5e879fac-f997-4171-90df-968d5e1c0db7" alt="" width="870" height="500" />

## Dotfiles

The idea behind dotfiles is to have all my aliases, editor, and terminal config that I need almost 100% of the time. It keeps the old config you had for zsh in case you need it.

This setup contains:

- [Git aliases](https://github.com/jeferson-sb/freshsetup/blob/main/.dotfiles/git/.gitconfig)
- [Zsh config](https://github.com/jeferson-sb/freshsetup/blob/main/.dotfiles/zsh/.zshrc)
- [Neovim setup with LazyVIM and LunarVIM (if you needed)](https://github.com/jeferson-sb/freshsetup/tree/main/.config/nvim)

<img-lazy src="https://firebasestorage.googleapis.com/v0/b/portfolio-d3c7c.appspot.com/o/pikaos-dotfiles.webp?alt=media&token=442095d8-bfad-4cab-83ff-c9af38a74b6e" alt="" width="870" height="500" />


## Final Results

[PikaOS](https://wiki.pika-os.com/en/home) Hyprland:

<img-lazy src="https://firebasestorage.googleapis.com/v0/b/portfolio-d3c7c.appspot.com/o/pikaos-end-result.webp?alt=media&token=8e0e48ef-4385-4ece-b75a-9bbca62f871c" alt="" width="870" height="700" fullbleed />

[Manjaro](https://manjaro.org/) Gnome:

<img-lazy src="https://firebasestorage.googleapis.com/v0/b/portfolio-d3c7c.appspot.com/o/arch-end-result.webp?alt=media&token=2ab40391-a866-455f-92e7-8114249b8b62" alt="" width="870" height="700" fullbleed />


And that's it! In a few minutes, my system is ready for work/gaming/studying. In the future, I will also include some other settings like keyboard shortcuts for programs, file system settings, mouse, and monitor. But these are more personal, so I might do it in another script.

