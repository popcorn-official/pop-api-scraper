// Import the necessary modules.
// @flow
/* eslint-disable no-unused-expressions */
import { expect } from 'chai'

import {
  Context,
  IProvider
} from '../src'

/** @test {Context} */
describe('Context', () => {
  /**
   * The context object to test
   * @type {Context}
   */
  let context: Context

  /**
   * Hook for setting up the Context tests.
   * @type {Function}
   */
  before(() => {
    context = new Context()
  })

  /** @test {Context#execute} */
  it('should throw an error when executing the default provider', () => {
    expect(context.execute.bind(context)).to
      .throw('Using default method: \'scrapeConfigs\'')
  })

  /** @test {Context#provider} */
  it('should check if Context has a provider', () => {
    const current = context.provider
    const iProvider = new IProvider()
    context.provider = iProvider

    expect(context.provider).to.not.equal(current)
    expect(context.provider).to.equal(iProvider)
  })
})
