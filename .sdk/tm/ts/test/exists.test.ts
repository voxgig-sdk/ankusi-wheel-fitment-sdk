
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { AnkusiWheelFitmentSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = AnkusiWheelFitmentSDK.test()
    equal(testsdk instanceof AnkusiWheelFitmentSDK, true,
      'AnkusiWheelFitmentSDK.test() must return a client synchronously')
  })

})
