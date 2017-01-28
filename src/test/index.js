'use strict'

var producePackageKeywords = require('../').process
var path = require('path')
var tape = require('tape')
var fs = require('fs')

var testtxt1 = path.resolve('./src/test/test.txt1')
var testtxt2 = path.resolve('./src/test/test.txt2')

var expected = {
  keywords: [
    'term',
    'extraction',
    'Terminology',
    'web',
    'domain'
  ],
  keyphrases: [
    'terminology extraction',
    'terms',
    'term extraction',
    'knowledge domain',
    'information extraction'
  ]
}

var expected2 = {
  keyphrases: [ testtxt2 ],
  keywords: [ testtxt2 ]
}

tape('Should produce ' + expectedstring + '\n from path', function (test) {
  return producePackageKeywords(testtxt1, function (error, result) {
    if (error) {
      test.fail(error)
    }

    test.deepEqual(result, expected)
    test.end()
  })
})

tape('Should produce ' + expectedstring + '\n from string', function (test) {
  var result = fs.readFileSync(testtxt1, 'utf-8')
  return producePackageKeywords(result, function (error, result) {
    if (error) {
      test.fail(error)
    }

    test.deepEqual(result, expected)
    test.end()
  })
})

tape('Should produce ' + expected2 + '\n from string', function (test) {
  return producePackageKeywords(testtxt2, function (error, result) {
    if (error) {
      test.fail(error)
    }

    test.deepEqual(result, expected2)
    test.end()
  })
})
