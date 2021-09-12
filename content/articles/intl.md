---
id: 1620700048294pq2r3i8hb
title: Getting Started with ECMAScript Internationalization API
published_at: 2021-09-11T23:58:38.069Z
tags: javascript, intl, i18n
excerpt: One of the most important aspects of the web is to make it accessible to everyone, which also means content...
slug: getting-started-with-ecmascript-internationalization-api
crosspostedOn: ''
crosspostLink: ''
---

One of the most important aspects of the web is to make it accessible to everyone, which also means content should be **available in different languages and formats**.

In this post, we're going to cover the Internalization API that came as standard in late 2012 and it's implemented alongside the official ECMAScript language specification (JavaScript).

## Intl

ECMAScript Internationalization API provides a suite of objects and methods to format numbers, regions, dates, and times based on language. The `Intl` namespace is available in pretty most all [evergreen browsers](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl#browser_compatibility), [JavaScript runtimes](https://nodejs.org/api/intl.html) and works with several unicode country locales.

Let's take a look at some of them:

### Intl.ListFormat

`Intl.ListFormat` is a constructor for language-sensitive list formatting. It can be used to make human-readable lists without having to worry with fancy string interpolations.

```js
const listFormat = new Intl.ListFormat('en', {
  style: 'long', // the length of output message, it can be "long", "short" or "narrow"
  type: 'conjunction', // "and" separator,
})

listFormat.format(['tom holland', 'tobey maguire', 'andrew garfield'])

// tom holland, tobey maguire, and andrew garfield
```

### Intl.DateTimeFormat

`Intl.DateTimeFormat` is a constructor for date and time formatting, very similar to the `Date.prototype.toLocaleString` method as it formats a date object into string based on series of [options](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat#parameters) like year, month, day and so on.

```js
new Intl.DateTimeFormat('en', {
  weekday: 'long',
  year: 'numeric',
  month: 'short',
  day: '2-digit',
}).format(new Date(2021, 07, 27))

// Friday, Aug 27, 2021
```

You can also display both date and time in different styles:

```js
new Intl.DateTimeFormat('en', {
  dateStyle: 'long',
  timeStyle: 'short',
}).format(new Date(2021, 07, 27))

// August 27, 2021 at 9:55 PM
```

### Intl.RelativeTimeFormat

Unlike the Date object methods we've mentioned previously, we can make use of the `Intl.RelativeTimeFormat` constructor to format **relative** time in a more readable form.

`format` takes two arguments, the first one being a number and the second a string between "second", "minute", "hour", "day", "month" and "year"

```js
const timeFormat = new Intl.RelativeTimeFormat('en-US', {
  style: 'long',
  numeric: 'auto',
})

timeFormat.format(1, 'hour')
// in 1 hour

timeFormat.format(-5, 'month')
// 5 months ago

timeFormat.format(1, 'day')
// tomorrow
```

### Intl.DisplayNames

`Intl.DisplayNames` is a constructor to display and translate regions, languages, and country currencies.

It can be useful when working with geolocation-based systems and financial software as you can easily see the full normalized string based on the language tag without having to maintain a huge list of country's translations.

```js
const regionNames = new Intl.DisplayNames(['en-US'], { type: 'region' })

regionNames.of('UK')
// United Kingdom

const currencies = new Intl.DisplayNames(['en-US'], { type: 'currency' })

currencies.of('JPY')
// Japanese Yen

const language = new Intl.DisplayNames(['en'], { type: 'language' })

language.of('PT-BR')
// Brazilian Portuguese
```

### Intl.NumberFormat

`Intl.NumberFormat` — it's a helpful method to format numbers to currencies, decimal, percentages and work with several units as well. Behave the same as the others constructors, it accepts the locale(s) and options. No need to rely on custom snippets and complex regexes anymore :)

Formats a number in currency-style with currency symbol and no fraction digits.

> Note: This API relies on the ISO 4217 standard that defines numeric and alphabetic currency codes.

```js
const language = navigator.language ?? 'en-US'

const euroCurrency = new Intl.NumberFormat(language, {
  style: 'currency',
  currency: 'EUR', // currency code, such as "USD", "JPY", "BRL"
  currencyDisplay: 'narrowSymbol', // show the currency symbol (default)
  maximumFractionDigits: 0,
})

euroCurrency.format(2999)
// €2,999
```

Formats a number to megabyte unit. When using units you can check the possible values [here](https://tc39.es/proposal-unified-intl-numberformat/section6/locales-currencies-tz_proposed_out.html#sec-issanctionedsimpleunitidentifier).

```js
new Intl.NumberFormat(language, {
  style: 'unit',
  unit: 'megabyte',
}).format(100)
// 100 MB
```

Formats a number in a short way and it can also be transformed to a scientific notation.

```js
new Intl.NumberFormat('en-US', {
  // whether to format as plain number (standard), order-of-magnitude (scientific) or compact string
  notation: 'compact',
  compactDisplay: 'short',
}).format(7_000_000_000)
// 7B

new Intl.NumberFormat(language, { notation: 'scientific' }).format(Math.PI)
// 3.142E0
```

### Intl.PluralRules

`Intl.PluralRules` — constructor for objects that enable plural-sensitive formatting and language-specific rules for plurals.

```js
const pluralRule = new Intl.PluralRules('RU')

new Intl.PluralRules('RU').select(0)
// many
new Intl.PluralRules('RU').select(1)
// one
new Intl.PluralRules('RU').select(2)
// few
```

We can make use of this method to choose a plural form of a sentence.

```js
const usPluralRule = new Intl.PluralRules('en-US')
const pluralize = (quantity, singular, plural) => {
  const result = usPluralRule.select(quantity)
  const isSingular = result === 'one'

  return isSingular ? `${quantity} ${singular}` : `${quantity} ${plural}`
}

pluralize(1, 'car', 'cars')
// 1 car
pluralize(2, 'car', 'cars')
// 2 cars
```

### Default options

Part of the constructors of the Intl API has a method `resolvedOptions` that can be used to display the default options computed to a chosen locale.

```js
new Intl.NumberFormat('en-US').resolvedOptions()

// locale: "en-US"
// maximumFractionDigits: 3
// minimumFractionDigits: 0
// minimumIntegerDigits: 1
// notation: "standard"
// numberingSystem: "latn"
// signDisplay: "auto"
// style: "decimal"
// useGrouping: true
```

## Bonus tip: How to properly use a language code

All constructors under the Internalization API requires at least one language code (or locale) which is based on the [BCP-47](https://datatracker.ietf.org/doc/html/rfc4647#section-3.4) list. BCP-47 provides two types of algorithms to match the chosen locale, but it still can't be able to identify if don't enter in the right format, e.g. "EN-US" is no the same as "en-US".

`Intl.getCanonicalLocales()` allows us to properly identify and return valid locales:

```js
const getLanguageCodes = (codes) => {
  try {
    const locales = Intl.getCanonicalLocales(codes)
    return locales
  } catch (error) {
    console.error(error)
  }
}

getLanguageCodes(['en-us', 'Pt-Br'])
// ['en-US', 'pt-BR']
```

The Intl API offers convenient methods with a standard interface to the specification and allows us to specify the control details (language code or locale) of their behavior with the advantage of your implementation being is _framework-agnostic!_

I hope you have found this article useful, check out the following links to learn more:

### Resources

- [Intl MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl)

- [npm intl package](https://www.npmjs.com/package/intl)

- [Introduction to the ECMAScript Internationalization API - Norbert Lindenberg](https://norbertlindenberg.com/2012/12/ecmascript-internationalization-api/index.html)

- [Intl caniuse](https://caniuse.com/?search=Intl)

- [ECMAScript Internationalization API Specification](https://402.ecma-international.org/1.0/#sec-11)
