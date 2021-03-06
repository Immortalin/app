Utils = ->

# Utils.clientUrl = 'file:///Users/celwell/purple/app/index-debug.html'
# Utils.clientUrl = 'file:///home/travis/build/Purple-Services/app/index-debug.html'
Utils.clientUrl = 'http://127.0.0.1:8080/index-debug.html'

Utils.getMenu = (divName) ->
  browser.pause 500
  menus = browser.elements '.menuButton'
  returnMenu = menus.value[menus.value.length - 1].ELEMENT
  browser.elementIdClick returnMenu
  browser.pause 250 #wait for menu to stop moving
  browser.click divName
  console.log 'menu click'
  browser.pause 250
  return

Utils.hitBack = () ->
  browser.pause 500
  menus = browser.elements '.menuButton'
  returnMenu = menus.value[menus.value.length - 1].ELEMENT
  browser.elementIdClick returnMenu
  browser.pause 500
  return

Utils.getList = (className) ->
  list = browser.elements className
  clickList = list.value[0].ELEMENT
  browser.elementIdClick clickList
  console.log 'list click'
  browser.pause 250 #wait for menu to stop moving
  return

Utils.waitUntil = (func, selector, timeout) ->
  if !timeout
    timeout = 10000

  switch func
    when 'visible' then browser.waitForVisible selector, timeout
    when 'value' then browser.waitForValue selector, timeout
    when 'enabled' then browser.waitForEnabled selector, timeout
  browser.pause 500
  return

Utils.waitForAlert = (click) ->
  console.log 'inside waitForAlert'
  i = 0
  while i < 25
    try
      browser.alertText()
      break
    catch err
      i++
      console.log i
      browser.pause 500
      continue
  console.log browser.alertText()
  browser.pause 250
  if click is true
    browser.alertAccept()
    console.log 'alert accepted'
  else
    browser.alertDismiss()
    console.log 'alert dismissed'
  browser.pause 500

Utils.login = (name) ->
  browser.url Utils.clientUrl
  console.log 'should login for test ' + name
  Utils.getMenu 'div=Login'
  console.log 'choose login'
  browser.setValue '.x-input-email', 'patrick@purpleapp.com'
  browser.setValue '.x-input-password', 'patrick'
  console.log 'login info'
  browser.click '#loginButtonContainer'
  console.log 'login'
  Utils.waitUntil 'visible', '#requestGasButton'
  return

module.exports = Utils;
