'use strict'

const retextKeywords = require('retext-keywords')
const nlcstToString = require('nlcst-to-string')
const readPkgUp = require('read-pkg-up')
const retext = require('retext')
const fs = require('fs')

const formatString = (string) => {
  return string.toLowerCase().replace(/[^\w\s|-]/g, '').split(' ').join('-')
}

const merge = (first, second) => {
  return first.concat(second.filter((node) => {
    return first.indexOf(node) < 0
  }))
}

const getKeyphrases = (file) => {
  return file.data.keyphrases.map((keyphrase) => {
    return keyphrase.matches[0].nodes.map(nlcstToString).join('')
  })
  .map(formatString)
}

const getKeywords = (file) => {
  return file.data.keywords.map((keyword) => {
    return nlcstToString(keyword.matches[0].node)
  })
  .map(formatString)
}

const extract = (input) => {
  const file = retext().use(retextKeywords).process(input)
  return merge(getKeyphrases(file), getKeywords(file))
}

const fromFile = (file, callback) => {
  return fs.readFile(file, (error, string) => {
    if (error) {
      return callback(error)
    }
    return callback(null, extract(string))
  })
}

const fromPackageJson = (callback) => {
  return readPkgUp().then((json) => {
    let description = json.pkg.description
    let name = json.pkg.name
    let result = []

    result = extract(name)

    if (description) {
      description = extract(description)
      result = merge(description, result)
    }

    return callback(null, result)
  })
  .catch((error) => callback(error))
}

const process = (string, callback) => {
  if (typeof string === 'function') {
    callback = string
    string = null
  }

  if (string) {
    return callback(null, extract(string))
  }

  return fromPackageJson(callback)
}

module.exports = {
  formatString,
  merge,
  getKeyphrases,
  getKeywords,
  extract,
  fromFile,
  fromPackageJson,
  process
}
