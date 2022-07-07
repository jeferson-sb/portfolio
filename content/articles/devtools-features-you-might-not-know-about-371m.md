---
id: 522337
title: Chrome DevTools Features You Might Not Know About
slug: devtools-features-you-might-not-know-about-371m
published_at: 2020-11-22T20:41:35.301Z
tags: webdev,devtools,frontend,chrome
excerpt: Chrome dev tools is a suite of tools that, we web developers, can use on our daily basis to prototype, analyze and debug our Javascript, CSS, and HTML code ...
crosspostedOn: Dev.to
crosspostLink: https://dev.to/jeferson_sb/devtools-features-you-might-not-know-about-371m
url: https://dev.to/jeferson_sb/devtools-features-you-might-not-know-about-371m
path: /articles/devtools-features-you-might-not-know-about-371m
canonicalUrl: https://dev.to/jeferson_sb/devtools-features-you-might-not-know-about-371m
coverImage: https://dev-to-uploads.s3.amazonaws.com/uploads/articles/603v3sacknru4f8u3dcd.png
---

Chrome dev tools is a suite of tools that, we web developers, can use on our daily basis to prototype, analyze and debug our Javascript, CSS, and HTML code.

In this post, I'll introduce you to some of the most interesting and lesser-known Chrome DevTools Features that you might find useful.

## Getting started

You can open up your browser DevTools by pressing <kbd>Ctrl + Shift + I</kbd> (Windows) or <kbd>Cmd + Option + I</kbd> (Mac)

> Note: Some of the features are available only on Chrome 85+

## Rendering

By default this tab is hidden, however, you can enable it by pressing <kbd>Cmd/Ctrl + Shift + P</kbd> and type "Show Rendering". This feature provides you a series of options to visualize your page's rendering performance.

<img-lazy src="https://dev-to-uploads.s3.amazonaws.com/i/35ugmr413qbrtwoil6ev.png" alt="show" height="660" width="870" />

**`Paint Flashing`** option gives you the ability to visualize when something is repainted on the screen.

<img-lazy src="https://dev-to-uploads.s3.amazonaws.com/i/z8ioi6m1d9ekpy2r34aw.gif" alt="paint" height="420" width="870" />

**`Layout shift`** shows you which areas of your page (highlighted blue) are being shifted at any point in time. A layout shift occurs when a visible element on your page changes position or size, affecting the position of content around it.

<img-lazy src="https://dev-to-uploads.s3.amazonaws.com/i/0c38f52mkh3dx8i152nk.gif" alt="layout shift" height="420" width="870" />

**`Frame rendering stats`** display frames per second and GPU usage in realtime on your current page.

<img-lazy src="https://dev-to-uploads.s3.amazonaws.com/i/1flyxbxgo2zkt1ydy6po.gif" alt="fps" height="400" width="auto" fit="contain" bgColor="none" />

**`Scrolling performance issues`** option highlights elements that can slow down your page scrolling.

<img-lazy src="https://dev-to-uploads.s3.amazonaws.com/i/tdtthnmfwsqhofv8fje3.png" alt="scroll" width="870" height="500" />

**`Highlight ad frames`** option shows all ad frames present on your website

<img-lazy src="https://dev-to-uploads.s3.amazonaws.com/i/9rlxzrii6e0jfcyt7701.png" alt="ad" width="870" height="480" />

### CSS Media Features

**`Emulate CSS prefers-color-scheme`** prefers-color-scheme allows us to set a system theme preference for interfaces like light or dark mode

<img-lazy src="https://dev-to-uploads.s3.amazonaws.com/i/h3aefd5mydkdlmjlwq1g.gif" alt="prefers-color-scheme" />

**`Emulate CSS prefers-reduced-motion`** prefers-reduced-motion can set a preference to minimize the amount of animation or motion a website uses.

<img-lazy src="https://dev-to-uploads.s3.amazonaws.com/i/kf9rsx0ta7cslgyc16fw.gif" alt="reduced" />

**`Emulate vision deficiency`** is a nice accessibility option to simulate color vision deficiencies in realtime on your current page. This feature can give us a better understanding of how people with different types of vision deficiencies experience our website

<img-lazy src="https://dev-to-uploads.s3.amazonaws.com/i/wknf2cbuwko8q4hpoer2.gif" alt="vision deficiency" />

## CSS Overview

CSS Overview is a quite new and experimental tool present on newer versions of chrome that enables to take a quick overview of what colors and fonts a website use as well as unused properties, declarations, and even how many media queries are being used.

<img-lazy src="https://dev-to-uploads.s3.amazonaws.com/uploads/articles/jg61t7oek2no1r6njvxa.jpg" alt="animations tab" />

Open with <kbd>CTRL + SHIFT + P</kbd> and type `Show CSS Overview` and then we click on "Capture overview"

<img-lazy src="https://dev-to-uploads.s3.amazonaws.com/uploads/articles/281cwjge87dyuo2rfga9.png" alt="" />

## Animations

In the animations panel, you have access to a timeline of each animation frame happening on the page.
It's fully interactive, you can go back and forth, play, and pause in each frame.

<img-lazy src="https://dev-to-uploads.s3.amazonaws.com/i/seu0u5exey8nth74gw2t.gif" alt="" />

## Coverage

The Coverage tab allows us to find unused blocks of code in our application. Shipping lots of JS/CSS code can be a problem in web development if the user is downloading extra content.

Coverage shows a list of resources each containing how many bytes it has and how many of them are unused and you can actually open the file then the unused parts will be highlighted in red at the left.

<img-lazy src="https://dev-to-uploads.s3.amazonaws.com/i/2hfony83uoms37s3eazc.png" alt="" />

## Network Conditions

`Network Conditions` tab it's very simple, you may notice that some of the features are the same presented in the `Network` tab, but it has one of the most useful features, User-Agent.

In DevTools now you can emulate a browser or device by disabling "Select automatically" the dropdown will now be enabled for you to select a different User-Agent like Firefox or Safari, or Chrome on Android, and so on. You can even create your custom User-Agent.

> _Note: This only works in your current website tab and while the DevTools is open_

<img-lazy src="https://dev-to-uploads.s3.amazonaws.com/i/cet2qqhsb16ukw7mmy09.png" alt="" />

## Search

And finally, the search tab allows us to quickly search files by string or regex

<img-lazy src="https://dev-to-uploads.s3.amazonaws.com/i/5drkpns8b1z3h8yfusua.png" alt="" />

---

Good to mention that even though these demos were captured on Chrome, you can experiment with the features in any Chromium-based browser as well.

I hope you found these features helpful, if you have some feedback or suggest please leave a comment in the section below. ✌

## Further Reading

[Debugging JavaScript - Chrome DevTools 101](https://www.youtube.com/watch?v=H0XScE08hy8&list=PLNYkxOF6rcIC74v_mCLUXbjj7Ng7oTAPE&ab_channel=GoogleChromeDevelopers)

[What's New in DevTools](https://developers.google.com/web/updates/2020/08/devtools)

[Chrome DevTools Performance Rendering]
(https://developers.google.com/web/tools/chrome-devtools/evaluate-performance/reference?hl=en#rendering)

[Performance Analysis Reference](https://developers.google.com/web/tools/chrome-devtools/evaluate-performance/reference?hl=en)

[prefers-reduced-motion](https://web.dev/prefers-reduced-motion/)

[prefers-color-scheme](https://developer.mozilla.org/pt-BR/docs/Web/CSS/@media/prefers-color-scheme)
