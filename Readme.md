# produce-package-keywords

[![standard-readme compliant](https://img.shields.io/badge/standard--readme-OK-green.svg?style=flat-square)](https://github.com/RichardLitt/standard-readme)
[![CircleCI](https://img.shields.io/circleci/project/github/mrzmmr/produce-package-keywords.svg)](https://circleci.com/gh/mrzmmr/produce-package-keywords)
[![Codecov](https://img.shields.io/codecov/c/github/mrzmmr/produce-package-keywords.svg)](https://codecov.io/gh/mrzmmr/produce-package-keywords)
[![David](https://img.shields.io/david/mrzmmr/produce-package-keywords.svg)](https://david-dm.org/)
[![David](https://img.shields.io/david/dev/mrzmmr/produce-package-keywords.svg)](https://david-dm.org/)
[![npm](https://img.shields.io/npm/v/produce-package-keywords.svg)](https://www.npmjs.com/package/produce-package-keywords)

> Produces keywords for a package by analyzing its package.json, readme and/or given file.

TODO: Fill out this long description.

## Table of Contents

- [Install](#install)
- [Usage](#usage)
- [Contribute](#contribute)
- [License](#license)

## Install

```sh
npm install produce-package-keywords --save
```

## Usage

```js
const packageKeywords = require('produce-package-keywords')

```

Then you can pass the function a path to a file, or a string.

```js
const input = 'path/to/file.txt' // or string

producePackageKeywords(input, (error, result) => {
  if (error) {
    console.error(error)
  }
  console.log(result)
})
```
  
## Tests

```sh
npm install
npm test
```

## Dependencies

- [is-file](https://github.com/jsdevel/node-is-file): Tests if a given path resolves to a file.
- [nlcst-to-string](https://github.com/wooorm/nlcst-to-string): Stringify NLCST
- [retext](https://github.com/wooorm/retext/tree/master/packages): Natural language processor powered by plugins
- [retext-keywords](https://github.com/wooorm/retext-keywords): Keyword extraction with Retext

## Dev Dependencies

- [codecov](https://github.com/codecov/codecov-node): Uploading report to Codecov: https://codecov.io
- [eslint](https://github.com/eslint/eslint): An AST-based pattern checker for JavaScript.
- [eslint-config-standard](https://github.com/feross/eslint-config-standard): JavaScript Standard Style - ESLint Shareable Config
- [eslint-plugin-promise](https://github.com/xjamundx/eslint-plugin-promise): Enforce best practices for JavaScript promises
- [eslint-plugin-standard](https://github.com/xjamundx/eslint-plugin-standard): ESlint Plugin for the Standard Linter
- [nyc](https://github.com/istanbuljs/nyc): the Istanbul command line interface
- [rimraf](https://github.com/isaacs/rimraf): A deep deletion module for node (like `rm -rf`)
- [tape](https://github.com/substack/tape): tap-producing test harness for node and browsers
- [tap-spec](https://github.com/scottcorgan/tap-spec): Formatted TAP output like Mocha&#39;s spec reporter

## Contribute

PRs accepted and greatly appreciated.

## License

MIT © mrzmmr
