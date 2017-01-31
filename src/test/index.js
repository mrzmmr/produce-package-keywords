'use strict'

import {default as retextKeywords} from 'retext-keywords'
import {default as retext} from 'retext'
import {default as path} from 'path'
import {default as tape} from 'tape'
import {default as fs} from 'fs'

import * as packageKeywords from '../lib'

const testtxt1 = path.resolve('./src/test/test.txt1')
const testtxt2 = path.resolve('./src/test/test.txt2')
const testtxt1string = fs.readFileSync(testtxt1, 'utf-8')
const testtxt2string = fs.readFileSync(testtxt2, 'utf-8')

const expected = {
  keyphrases: [
    'terminology extraction',
    'terms',
    'term extraction',
    'knowledge domain',
    'information extraction'
  ],
  keywords: [
    'term',
    'extraction',
    'Terminology',
    'web',
    'domain'
  ]
}

const expected2 = {
  keyphrases: [
    testtxt2string
  ],
  keywords: [
    'text'
  ]
}

tape('Should return array of keywords | test.txt1', (test) => {
  return retext().use(retextKeywords).process(testtxt1string, (err, file) => {
    if (err) {
      test.fail(err)
    }
    const result = packageKeywords.pullKeywords(file)
    test.ok(Array.isArray(result))
    test.deepEqual(result, expected.keywords)
    test.end()
  })
})

tape('Should return array of keyphrases | test.txt1', (test) => {
  return retext().use(retextKeywords).process(testtxt1string, (err, file) => {
    if (err) {
      test.fail(err)
    }
    const result = packageKeywords.pullKeyphrases(file)
    test.ok(Array.isArray(result))
    test.deepEqual(result, expected.keyphrases)
    test.end()
  })
})

tape('Should return array of keywords | test.txt2', (test) => {
  return retext().use(retextKeywords).process(testtxt2string, (err, file) => {
    if (err) {
      test.fail(err)
    }
    const result = packageKeywords.pullKeywords(file)
    test.ok(Array.isArray(result))
    test.deepEqual(result, expected2.keywords)
    test.end()
  })
})

tape('Should return array of keyphrases | test.txt2', (test) => {
  return retext().use(retextKeywords).process(testtxt2string, (err, file) => {
    if (err) {
      test.fail(err)
    }
    const result = packageKeywords.pullKeyphrases(file)
    test.ok(Array.isArray(result))
    test.deepEqual(result, [])
    test.end()
  })
})

tape('Should return object | From string | test.txt1', (test) => {
  return packageKeywords.process(testtxt1string, (err, result) => {
    if (err) {
      test.fail(err)
    }

    test.ok(typeof result === 'object')
    test.deepEqual(result, expected)
    test.end()
  })
})

tape('Should return object | From path | test.txt1', (test) => {
  return packageKeywords.process(testtxt1, (err, result) => {
    if (err) {
      test.fail(err)
    }

    test.ok(typeof result === 'object')
    test.deepEqual(result, expected)
    test.end()
  })
})

tape('Should return object | From string | test.txt2', (test) => {
  return packageKeywords.process(testtxt2string, (err, result) => {
    if (err) {
      test.fail(err)
    }

    test.ok(typeof result === 'object')
    test.deepEqual(result, expected2)
    test.end()
  })
})

tape('Should return object | From path | test.txt2', (test) => {
  return packageKeywords.process(testtxt2, (err, result) => {
    if (err) {
      test.fail(err)
    }

    test.ok(typeof result === 'object')
    test.deepEqual(result, expected2)
    test.end()
  })
})

tape('Should return string | From file | testtxt1', (test) => {
  return packageKeywords.stringFromFile(testtxt1, (err, result) => {
    if (err) {
      return test.fail(err)
    }

    test.ok(typeof result === 'string')
    test.equal(result, testtxt1string)
    test.end()
  })
})

tape('Should return string | From string | testtxt1', (test) => {
  return packageKeywords.stringFromFile(testtxt1string, (err, result) => {
    if (err) {
      return test.fail(err)
    }

    test.ok(typeof result === 'string')
    test.equal(result, testtxt1string)
    test.end()
  })
})

tape('Should return string | From file | testtxt2', (test) => {
  return packageKeywords.stringFromFile(testtxt2, (err, result) => {
    if (err) {
      return test.fail(err)
    }

    test.ok(typeof result === 'string')
    test.equal(result, testtxt2string)
    test.end()
  })
})

tape('Should return string | From string | testtxt2', (test) => {
  return packageKeywords.stringFromFile(testtxt2string, (err, result) => {
    if (err) {
      return test.fail(err)
    }

    test.ok(typeof result === 'string')
    test.equal(result, testtxt2string)
    test.end()
  })
})
