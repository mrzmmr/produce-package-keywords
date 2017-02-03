# produce-package-keywords

[![CircleCI](https://img.shields.io/circleci/project/github/mrzmmr/produce-package-keywords.svg)](https://circleci.com/gh/mrzmmr/produce-package-keywords)
[![Codecov](https://img.shields.io/codecov/c/github/mrzmmr/produce-package-keywords.svg)](https://codecov.io/gh/mrzmmr/produce-package-keywords)
[![npm](https://img.shields.io/npm/v/produce-package-keywords.svg)](https://www.npmjs.com/package/produce-package-keywords)

> Produces keywords for a package by analyzing its package.json, a string, or
> file.

## Table of Contents

- [Install](#install)
- [Usage](#usage)
- [Api](#api)
- [Contribute](#contribute)
- [License](#license)

## Install

```sh
npm install produce-package-keywords --save
```

## Usage

```js
const ppk = require('produce-package-keywords')

```

produce keywords given a file

```js
ppk.fromFile('path/to/file.txt', (error, result) => {
  if (error) {
    ...
  }

  ...
})
```

produce keywords given a string

```js
ppk.process(string, callback)

// alias

ppk(string, callback)
```

```js
ppk(string, (error, result) => {
  if (error) {
    ...
  }

  ...
})
```

or from package.json's name and description fields

```js
ppk.process(callback)

// alias

ppk(callback)
```

```js
ppk((error, result) => {
  if (error) {
    ...
  }

  ...
})
```

## Api

### producePackageKeywords([string], callback)

Returns an error first callback with an array of extracted keywords from string
if given, otherwise from package.json's name and description fields.

#### options

**[string]** - optional string argument

**callback** - error first callback
  
### producePackageKeywords.fromFile(file, callback)

Returns an error first callback with an array of extracted keywords from the
given file

#### options

**file** - file to extract from

**callback** - error first callback

## Tests

```sh
npm install
npm test
```

[![standard-readme compliant](https://img.shields.io/badge/standard--readme-OK-green.svg?style=flat-square)](https://github.com/RichardLitt/standard-readme)
[![David](https://img.shields.io/david/mrzmmr/produce-package-keywords.svg)](https://david-dm.org/)
[![David](https://img.shields.io/david/dev/mrzmmr/produce-package-keywords.svg)](https://david-dm.org/)

## Contribute

PRs accepted and greatly appreciated.

## Dependencies

- [nlcst-to-string](https://github.com/wooorm/nlcst-to-string): Stringify NLCST
- [read-pkg-up](https://github.com/sindresorhus/read-pkg-up): Read the closest package.json file
- [retext](https://github.com/wooorm/retext/tree/master/packages): Natural language processor powered by plugins
- [retext-keywords](https://github.com/wooorm/retext-keywords): Keyword extraction with Retext

## Dev Dependencies

- [babel-cli](https://github.com/babel/babel/tree/master/packages): Babel command line.
- [babel-preset-latest](https://github.com/babel/babel/tree/master/packages): Babel preset including es2015+
- [codecov](https://github.com/codecov/codecov-node): Uploading report to Codecov: https://codecov.io
- [nyc](https://github.com/istanbuljs/nyc): the Istanbul command line interface
- [rimraf](https://github.com/isaacs/rimraf): A deep deletion module for node (like `rm -rf`)
- [tap-spec](https://github.com/scottcorgan/tap-spec): Formatted TAP output like Mocha&#39;s spec reporter
- [tape](https://github.com/substack/tape): tap-producing test harness for node and browsers



## License

MIT © mrzmmr
