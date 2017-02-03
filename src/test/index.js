'use strict'

const retextKeywords = require('retext-keywords')
const Retext = require('retext')
const path = require('path')
const tape = require('tape')
const fs = require('fs')

const ppk = require('../lib')

const retext = Retext()

const filePath = path.resolve(__dirname, './test.txt1')

const expected = [
  'package',
  'test',
  'produce-package-keywords',
  'keywords',
  'packages',
  'users',
  'npm'
]

const expectedKeyphrases = [ 'package' ]

const expectedKeywords = [
  'package',
  'test',
  'produce-package-keywords',
  'keywords',
  'packages',
  'users',
  'npm'
]

const expected2 = [
  'package',
  'keywords',
  'users',
  'npm',
  'produce-package-keywords'
]

const array1 = [
  'foo bar',
  'foo bar baz',
  'foo\'s bar',
  'foo\'s bar\'s baz\'s'
]

const array1expected = [
  'foo-bar',
  'foo-bar-baz',
  'foos-bar',
  'foos-bars-bazs'
]

const ok = (test, result, expected) => {
  test.ok(result)
  test.ok(Array.isArray(result))
  test.deepEqual(result, expected)
  test.end()
}

/*
 * Callback api
 */

tape('Should return hyphenated, de-apostrophied array | formatString', (t) => {
  return ok(t, array1.map((p) => ppk.formatString(p)), array1expected)
})

tape('Should return uniq\'d merged array | merge', (t) => {
  const array = ['foo-bar', 'bar-foo', 'foo-bar-baz', 'baz-bar-foo']
  const expectedArray = [
    'foo-bar',
    'foo-bar-baz',
    'foos-bar',
    'foos-bars-bazs',
    'bar-foo',
    'baz-bar-foo'
  ]
  return ok(t, ppk.merge(array1expected, array), expectedArray)
})

tape('Should return keyphrases from test.txt1 | getKeyphrases', (t) => {
  const file = retext.use(retextKeywords).process(fs.readFileSync(filePath))
  const result = ppk.getKeyphrases(file)

  return ok(t, result, expectedKeyphrases)
})

tape('Should return keywords from test.txt1 | getKeywords', (t) => {
  const file = retext.use(retextKeywords).process(fs.readFileSync(filePath))
  const result = ppk.getKeywords(file)

  return ok(t, result, expectedKeywords)
})

tape('Should return merged array from test.txt1 | extract', (t) => {
  const result = ppk.extract(fs.readFileSync(filePath))
  const expectedArray = ppk.merge(expectedKeywords, expectedKeyphrases)

  return ok(t, result, expectedArray)
})

tape('Should return array from file | fromFile | callback', (t) => {
  return ppk.fromFile(filePath, (error, result) => {
    if (error) {
      return t.fail(error)
    }

    return ok(t, result, expected)
  })
})

tape('Should return array from package.json | fromPackageJson | callback', (t) => {
  return ppk.fromPackageJson((error, result) => {
    if (error) {
      return t.fail(error)
    }
    return ok(t, result, expected2)
  })
})

tape('Should return array from string | process | callback', (t) => {
  return ppk.process(fs.readFileSync(filePath, 'utf-8'), (error, result) => {
    if (error) {
      return t.fail(error)
    }

    return ok(t, result, expected)
  })
})

tape('Should return array from package.json | process | callback', (t) => {
  return ppk.process((error, result) => {
    if (error) {
      return t.fail(error)
    }

    return ok(t, result, expected2)
  })
})

tape('Should fail from file | fromFile | callback', (t) => {
  t.plan(1)
  t.throws(() => {
    return ppk.fromFile((error, result) => {
      if (error) {
        throw error
      }
    })
  })
})

tape('Should fail from file | fromFile | callback', (t) => {
  t.plan(1)
  t.throws(() => {
    return ppk.fromFile('./foo', (error, result) => {
      if (error) {
        throw error
      }
    })
  })
})
 

 /*
 * Promise api
 */
