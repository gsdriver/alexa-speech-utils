# alexa-speech-utils
Nodejs module that provides helper functions for generating text or SSML responses in the English language
Designed for use with Alexa or other speech output devices.  Contributions are welcome - if you don't find
a utility function that you want - add it!

# Available functions

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
  pause - An amount of time to pause between each item - if specified, the returned string will be in SSML format
  ssmltag - If specified, the return value will be wrapped in <speak> tags
}
```

Example:

```
and(['milk', 'cream', 'honey'], {pause:'1s', ssmltag;true});
```

will return the string

```
<speak>milk <break time='1s'/> cream <break time='1s'/> and honey</speak>
```

```
or(['milk', 'cream', 'honey']);
```

will return the string

```
milk, cream, or honey
```

# Contributing - bug fixes and new functionality

Contributions are welcome!  Please feel free to fork this code and submit pull requests, for bug fixes or feature enhancements.

 1. Fork it!
 2. Create your featured branch: `git checkout -b my-feature`
 3. Commit your changes: `git commit -m 'add some feature'`
 4. Push to the branch: `git push origin my-feature`
 5. Submit a pull request

Many Thanks!
