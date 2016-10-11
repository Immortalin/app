Utils = require('./test_utils.js')

assert = require('assert')
sinon = require('sinon')

describe 'webdriver.io page', ->

  it 'check gas price at different locations', ->
    this.timeout(30000)

    browser.setGeoLocation # 90403
      latitude: 34.027897
      longitude: -118.499335
      altitude: 200
    # browser.url "http://localhost:3000/ok"
    # console.log browser.getText('body')
    console.log "L15"
    browser.url Utils.clientUrl
    Utils.waitUntil 'visible', '#requestGasButton'
    Utils.waitUntil 'enabled', '#requestGasButton'
    browser.pause 3000
    console.log browser.getText('#gas-price-display')
    assert.equal browser.getText('#gas-price-display-87'), "$3.05"
    assert.equal browser.getText('#gas-price-display-91'), "$3.29"

    browser.setGeoLocation
      latitude: 34.286097
      longitude: -118.673906
      altitude: 200
    browser.url Utils.clientUrl
    Utils.waitUntil 'visible', '#requestGasButton'
    Utils.waitUntil 'enabled', '#requestGasButton'
    assert.equal browser.getText('#gas-price-unavailable'), "Location Outside Service Area"

    browser.setGeoLocation
      latitude: 33.022104
      longitude: -117.278696
      altitude: 200
    browser.url Utils.clientUrl
    Utils.waitUntil 'visible', '#requestGasButton'
    Utils.waitUntil 'enabled', '#requestGasButton'
    assert.equal browser.getText('#gas-price-display-87'), "$2.99"
    assert.equal browser.getText('#gas-price-display-91'), "$3.19"

    browser.setGeoLocation
      latitude: 32.799097
      longitude: -117.238433
      altitude: 200
    browser.url Utils.clientUrl
    Utils.waitUntil 'visible', '#requestGasButton'
    Utils.waitUntil 'enabled', '#requestGasButton'
    assert.equal browser.getText('#gas-price-display-87'), "$2.93"
    assert.equal browser.getText('#gas-price-display-91'), "$3.15"

