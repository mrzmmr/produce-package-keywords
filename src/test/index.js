'use strict'

var ppk = require('../index.js')
var path = require('path')
var tape = require('tape')

var testtxt1 = path.resolve('./src/test/test.txt1')

tape('Test stringFromFile', function (test) {
  return ppk.stringFromFile(testtxt1, function (error, result1) {
    if (error) {
      test.fail(error)
    }

    return ppk.stringFromFile('This is text 2.\n', function (error, result2) {
      if (error) {
        test.fail(error)
      }

      var expected1 = 'This is text 1.\n'
      var expected2 = 'This is text 2.\n'

      test.equal(result1, expected1, 'Called with file')
      test.equal(result2, expected2, 'Called with text')
      test.end()
    })
  })
})

