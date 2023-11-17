---
id: 4gg5ha081e
title: How to mix colors in CSS
published_at: 2023-10-08T23:31:01.858Z
tags: CSS
excerpt: Color plays a vital role on today's web and also our daily life. And as technology progresses, new colors are born in modern displays, monitors, and we need a way to represent them in web too...
slug: css-color-mix
crosspostedOn: ''
crosspostLink: ''
---

**Color** plays a _vital role_ in today's web and also our daily life. And as technology progresses, new colors are born in modern displays, monitors, and we need a way to represent them in web too.

When it comes to creating or picking colors , developers often rely on design tools to reproduce these tokens. However, most of the time by choosing from classic RGB or even HSL can't be sufficient sometimes.

CSS now can access colors outside of the <abbr title="standard RGB color space">sRGB</abbr> gamut, so we're going beyond to see alternative and potentially better colorspaces to represent those colors. While in this small journey you'll see how to mix colors by using the new `color-mix()` CSS function.

## New Colorspaces

Before we introduce some of the new colorspaces, you may be wonder **why** do need more ways to create colors?

Having more or less colors comes down to human color perception and is subjective to how we see things on the screen. A low or wide range of colors it is going to be determined by the gamut of a display and coordinated via the chromaticity space diagram of a colorspace.

<img-lazy src="https://firebasestorage.googleapis.com/v0/b/portfolio-d3c7c.appspot.com/o/chromaticity.png?alt=media&token=c3872c62-d992-4ae3-8a9a-2d59a01e3380&_gl=1*18qf78h*_ga*MTI5ODQwMzU1Mi4xNjgyMzA0Mjk2*_ga_CW55HF8NVT*MTY5NjgwNzAwNS40LjEuMTY5NjgwNzAxNy40OC4wLjA." height="600" contain />

> _Color space is a specific organization of colors. In combination with color profiling supported by various physical devices, it supports reproducible representations of color_ - <AppLink isExternal to="https://en.wikipedia.org/wiki/Color_space">Wikipedia</AppLink>

Color spaces arrange colors of a gamut in certain shapes, being some in 3D shapes like cubes (rgb) and others as cylinders (hsl).

We often apply colors in CSS in the so-called **sRGB**, used for the legacy `rgb`, `hex`, `hsl`, and `hwb` color functions. But there are way more possible colors that are capable of human eye seeing visible outside of these spectrums.

`lch` - Device-independent representation that stands for _CIE Lightness_, _Chroma_ and _Hue_. It allows for more precise control over the appearance of colors, especially when it comes to adjusting the lightness and saturation. More precise as per human perception.
<ColorBox color="lch(50% 100 27)" />

`lab` - Stands for _Lightness_, _A_ (green-red axis) and _B_ (blue-yellow axis) channels. The A and B axis represent unique axes of human color vision in values between ±160.

<ColorBox color="lab(90 -60 -120)" />

Both `lch` and `lab` formats are expressed under the CIELAB color space. A rectangular colorspace built on axis around lightness that can range from 0% to 100%.

<img-lazy src="https://drafts.csswg.org/css-color-4/images/CH-plane-wheel.svg" />

`oklch` - Practically an improvement around `lch` with better chroma uniformity and linear lightness. You can essentialy use `oklch` where `lch` is being used.
Checkout this awesome color picker by Evil Martians team: https://oklch.com/

<ColorBox color="oklch(60% 0.10 0.11)" />

`oklab` - Corrective to LAB. It also improves linear lightness and hue uniformity compared to CIE LAB.

<ColorBox color="oklab(60% 0.10 0.11)" />

Any CIE space colors (lch, oklch, lab, oklab) are capable of representing the entire human visible color spectrum, but we can also explicit create colors from a specific color gamut.

The `color()` function is normalized way to access colors within any RGB color spaces. This new function can be used for any color space that specifies colors with R, G and B channels.

High-definition displays can have much more amount of colors than standard sRGB in `display-p3` and `Rec2020` colorspaces.

<ColorBox color="color(rec2020 .34 .58 .73)" size="200" />

They can also be used to create perceptually consistent gradients:

<ColorBox color="linear-gradient(to right, color(display-p3 34% 58% 73%), color(display-p3 50% 90% 50%))" size="200" />

## Mixing two colors

Now that we have good grasp of these new color formats, let's explore how we can mix them with `color-mix()`.

`color-mix()` is a CSS function that can take two colors and dynamically create adjusted color based on a mix of them in a given method (colorspace)

`color-mix(in <colorspace> | <interpolation>, <color1> <n%>, <color2> <n%>)`

Where the values can be:

- Colorspaces: `srgb`, `srgb-linear`, `lab`, `oklab`, `hsl`, `hwb`, `lch`, `oklch`.
- Interpolation method: `shorter`, `longer`, `increasing`, `decreasing`.
- `<n%>`: Percentage amount from 0% to 100%. Default to 50%.

```css
.mix {
  --color: color-mix(in srgb, yellow, red);
}
```

<ColorMix method="srgb" style="--left: yellow; --right: red;" />

<img-lazy src="https://firebasestorage.googleapis.com/v0/b/portfolio-d3c7c.appspot.com/o/computed-color.png?alt=media&token=c8720727-c6a2-4d35-84b1-4c69a6ac9db6&_gl=1*3hm15y*_ga*MTI5ODQwMzU1Mi4xNjgyMzA0Mjk2*_ga_CW55HF8NVT*MTY5Njc5NzA4Ni4zLjEuMTY5Njc5NzY4Mi40MS4wLjA." height="644" width="637" />
<figcaption><i>(Final computed value of the color mix in DevTools)</i></figcaption>

## Color stops

The following example mixes 60% of blue and 40% yellow in `lch`.

```css
.mix {
  --color: color-mix(in lch, lch(50 61 267) 60%, lch(81 95 80) 40%);
}
```

<ColorMix method="lch" controls="stop" left="60" right="40" style="--left: lch(50 61 267); --right: lch(81 95 80);" />

## Mixing colorspaces

You can mix color from different methods. Color interpolation can be from any of the colorspaces metioned like hsl to lch, lab to oklab, and the color-algorithm will do the calculation to interpolate them to a proximum value.

```css
.mix {
  --color: color-mix(in hsl, hsl(0 50% 50%), #7acedd);
}
```

<ColorMix method="hsl" controls="colorSpace" style="--left: hsl(0 50% 50%); --right: #7acedd;" />

Notice the suttle different tones of purple when switching between colorspaces.
Behind the scenes both colors are converted to the given colorspace. Some methods may have a wide range of colors than others, thus represeting a distinct mixed color.

## Alpha

There is a significant change when using alpha colors where colors have their components (chroma, lightness, hue) converted to rgb channels and premultiplied with three alpha values, one for each channel (red, green and blue).

Follow the example below where mixes 50% opaque red with 90% opaque green. Since the amount of both colors are ommited, the are both at 50%.

```css
.mix {
  --color: color-mix(in lab, lab(49 72.05 57.68 / 0.5), lab(84 -74.11 75.76 / 0.9));
}
```
<ColorMix method="lab" controls="colorSpace stop" style="--left: lab(49 72.05 57.68 / 0.5); --right: lab(84 -74.11 75.76 / 0.9);" />

Where the final computed color will be: `color(srgb 0.936942 0.916944 0.0808208 / 0.7)`

You can dive in the details of the calculation on the spec [here](https://drafts.csswg.org/css-color-5/#color-mix-with-alpha).

### Hue inporlation

Finally, we can also tweak colors to short of wider angles of the color wheel.

```css
/* Mixing with blue and white in short angle */
.mix {
  --color: color-mix(in hsl shorter hue, hsl(240 100% 50%), hsl(0 100% 100%));
}
```

<ColorMix method="hsl shorter hue" style="--left: hsl(240 100% 50%); --right: hsl(0 100% 100%);" />

Previously, every example were mixing by connecting two hue values in a straight line. This is interesting because by opting for a longer route we're able to get more vibrant hues in the result.
```css
/* Mixing with blue and white in a longer angle */
.mix {
  --color: color-mix(in hsl longer hue, hsl(240 100% 50%), hsl(0 100% 100%));
}
```

<ColorMix method="hsl longer hue" style="--left: hsl(240 100% 50%); --right: hsl(0 100% 100%);" />

This is especially useful to create gradients without having "dead zones" in the middle.

Shorter:
<ColorBox color="
linear-gradient(
  to right in lch shorter hue, 
  lch(41 80 290), 
  lch(81 104 150)
)" size="200" /> 

Longer:
<ColorBox color="
linear-gradient(
  to right in lch longer hue, 
  lch(41 80 290), 
  lch(81 104 150)
)" size="200" /> 

Whether if there is any "best" or go-to colorspace to use it all depends what you're trying to achieve, accuracy and how much support you're expecting from user's devices. Test each one and see what you like the most!

## Further Reading

- <AppLink isExternal to="https://drafts.csswg.org/css-color-5/#color-mix">Color Mix spec</AppLink>
- <AppLink isExternal to="https://drafts.csswg.org/css-color/#predefined">Colorspaces spec</AppLink>
- <AppLink isExternal to="https://css-tricks.com/nerds-guide-color-web/">A Nerd’s Guide to Color on the Web</AppLink>
- <AppLink isExternal to="https://developer.chrome.com/articles/high-definition-css-color-guide/#hwb">High Definition CSS Color Guide</AppLink>
