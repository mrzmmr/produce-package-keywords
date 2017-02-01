'use strict'

import {default as retextKeywords} from 'retext-keywords'
import {default as nlcstToString} from 'nlcst-to-string'
// import {default as readPkgUp} from 'read-pkg-up'
import {default as exists} from 'fs-exists-sync'
import {default as retext} from 'retext'
import {default as fs} from 'fs'

export const stringFromFile = (input) => {
  return new Promise((resolve, reject) => {
    if (!exists(input)) {
      return resolve(input)
    }

    return fs.readFile(input, 'utf-8', (err, string) => {
      if (err) {
        return reject(err)
      }

      return resolve(string)
    })
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

export const process = (input) => {
  return new Promise((resolve, reject) => {
    return stringFromFile(input).then((string) => {
      return retext().use(retextKeywords).process(string, (err, file) => {
        if (err) {
          return reject(err)
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

        return resolve(returns)
      })
    }).catch((err) => {
      return reject(err)
    })
  })
}

export default process
