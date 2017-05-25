# alexa-speech-utils
Nodejs module that provides helper functions for generating text or SSML responses in the English language
Designed for use with Alexa or other speech output devices.  Contributions are welcome - if you don't find
a utility function that you want - add it!

# Loading module

When loading the module, you can pass in an options structure (optional) that specifies how the module should
run.  Currently the only supported parameter is "speakTag" which will include SSML tags around the response.

```
const alexautils = require('alexa-speech-utils');
const utils = alexautils({speakTag: true});
```

This will cause output to be returned wrapped with <speak> tags

# Available functions
## and
## or

`and` takes a list of items and combines them with "and"
`or` takes a list of items and combines them with "or"

```
and(items, options)
or(items, options)
```

The arguments to `and` or `or` are:

 * items - an array of items to combine together into a string
 * options - an optional object providing additional details to and
 
The options structure is composed of the following fields:

```
{
  pause - Amount of time to pause between each item - if specified, the returned string will be in SSML format
}
```

Example:

```
and(['milk', 'cream', 'honey'], {pause:'1s'});
```

will return the string

```
milk <break time='1s'/> cream <break time='1s'/> and honey
```

```
or(['milk', 'cream', 'honey']);
```

will return the string

```
milk, cream, or honey
```
## numberOfItems

`numberOfItems` takes a list of number along with singular and plural nouns to return a string

```
numberOfItems(number, singular, plural)
```

Example:

```
numberOfItems(0, 'dog', 'dogs');
```

will return the string

```
no dogs
```
## relativeDate

`relativeDate` takes a date and formats it relative to the current date, using today, yesterday,
tomorrow, and only mentioning the year if it differs from the current year.  You can optionally
include the time as well.

```
relativeDate(date, options)
```

The options structure is composed of the following fields:

```
{
  includeTime - If set, hours and minutes will be included in the response
}
```

Example:

```
const now = Date.now();
const date = new Date(now);
date.setDate(date.getDate() - 1);

relativeDate(date);
```

will return the string

```
yesterday
```

## formatCurrency

`amount` numerical amount to turn into a currency
`locale` locale to determine the appropriate currency symbol - currently supports en-US, en-GB, and de-DE.  Default is en-US

```
formatCurrency(amount, locale)
```

Example:

```
formatCurrency(100, 'en-GB');
```

will return the string

```
£100
```

# Contributing - bug fixes and new functionality

Contributions are welcome!  Please feel free to fork this code and submit pull requests, for bug fixes or feature enhancements.

 1. Fork it!
 2. Create your featured branch: `git checkout -b my-feature`
 3. Commit your changes: `git commit -m 'add some feature'`
 4. Push to the branch: `git push origin my-feature`
 5. Submit a pull request

Many Thanks!
