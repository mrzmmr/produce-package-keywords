'use strict'

/*
 * Dependencies
 */

import {default as retextKeywords} from 'retext-keywords'
import {default as nlcstToString} from 'nlcst-to-string'
import {default as exists} from 'fs-exists-sync'
import {default as retext} from 'retext'
import {default as fs} from 'fs'

export const stringFromFile = (input, callback) => {
  if (!exists(input)) {
    return callback(null, input)
  }

  return fs.readFile(input, 'utf-8', (error, string) => {
    if (error) {
      return callback(error)
    }

    return callback(null, string)
  })
}

export const pullKeyphrases = (file) => {
  return file.data.keyphrases.map((phrase) => {
    return phrase.matches[0].nodes.map(nlcstToString).join('')
  })
}

export const pullKeywords = (file) => {
  return file.data.keywords.map(keyword => {
    return nlcstToString(keyword.matches[0].node)
  })
}

export const process = function (input, callback) {
  return stringFromFile(input, function (error, string) {
    if (error) {
      return callback(error)
    }

    return retext().use(retextKeywords).process(string, function (error, file) {
      if (error) {
        return callback(error)
      }

      const returns = {
        keyphrases: pullKeyphrases(file),
        keywords: pullKeywords(file)
      }

      if (returns.keyphrases.length === 0) {
        returns.keyphrases = [string]
      }

      if (returns.keywords.length === 0) {
        returns.keywords = [string]
      }

      return callback(null, returns)
    })
  })
}

export default process
