'use strict'

/*
 * Dependencies
 */

var retextKeywords = require('retext-keywords')
var nlcstToString = require('nlcst-to-string')
var exists = require('fs-exists-sync')
var retext = require('retext')
var fs = require('fs')

var stringFromFile = function (input, callback) {
  if (!exists(input)) {
    return callback(null, input)
  }

  return fs.readFile(input, 'utf-8', function (error, string) {
    if (error) {
      return callback(error)
    }

    return callback(null, string)
  })
}

var pullKeywords = function (file) {
  return file.data.keywords.map(function (keyword) {
    return nlcstToString(keyword.matches[0].node)
  })
}

var pullKeyphrases = function (file) {
  return file.data.keyphrases.map(function (phrase) {
    return phrase.matches[0].nodes.map(nlcstToString).join('')
  })
}

var process = function (input, callback) {
  return stringFromFile(input, function (error, string) {
    if (error) {
      return callback(error)
    }

    return retext().use(retextKeywords).process(string, function (error, file) {
      if (error) {
        return callback(error)
      }

      return callback(null, {
        keyphrases: pullKeyphrases(file),
        keywords: pullKeywords(file)
      })
    })
  })
}

module.exports = {
  stringFromFile: stringFromFile,
  pullKeyphrases: pullKeyphrases,
  pullKeywords: pullKeywords,
  process: process
}
