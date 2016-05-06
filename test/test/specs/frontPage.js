// Generated by CoffeeScript 1.10.0
var assert, getList, getMenu, hitBack, sinon, waitForAlert, waitUntil;

assert = require('assert');

sinon = require('sinon');

describe('webdriver.io page', function() {
  it('should have the right title', function() {
    var title;
    console.log('should have the right title');
    browser.url('file:///Users/Patrick/Desktop/purple-app/index-debug.html');
    title = browser.getTitle();
    assert.equal(title, 'Purple');
  });
  it('should login', function() {
    console.log('should login');
    getMenu('div=Login');
    console.log('choose login');
    browser.setValue('.x-input-email', 'patrick@purpleapp.com');
    browser.setValue('.x-input-password', 'patrick');
    console.log('login info');
    browser.click('#loginButtonContainer');
    console.log('login');
    waitUntil('visible', '#requestGasButton');
  });
  it('should make an order', function() {
    var clock;
    browser.pause(250);
    console.log('should make an order');
    getMenu('div=Request Gas');
    console.log('request gas menu');
    waitUntil('visible', '#requestGasButton');
    waitUntil('enabled', '#requestGasButton');
    browser.click('#requestGasButton');
    console.log('request gas button');
    waitUntil('visible', '#sendRequestButtonContainer');
    waitUntil('enabled', '#sendRequestButtonContainer');
    clock = sinon.useFakeTimers(new Date(2016, 3, 29).getTime());
    console.log(new Date());
    browser.click('#sendRequestButtonContainer');
    clock.restore();
    console.log(new Date());
    waitUntil('visible', '#confirmOrderButtonContainer');
    clock = sinon.useFakeTimers(new Date(2016, 3, 29).getTime());
    console.log(new Date());
    console.log('review order button');
    browser.click('#confirmOrderButtonContainer');
    clock.restore();
    console.log(new Date());
    console.log('confirm order');
    clock.restore();
    console.log(new Date());
    waitForAlert(true);
    console.log('clicked alert');
    waitUntil('visible', 'div=Orders');
  });
});

getMenu = function(divName) {
  var menus, returnMenu;
  browser.pause(500);
  menus = browser.elements('.menuButton');
  returnMenu = menus.value[menus.value.length - 1].ELEMENT;
  browser.elementIdClick(returnMenu);
  browser.pause(250);
  browser.click(divName);
  console.log('menu click');
  browser.pause(250);
};

hitBack = function() {
  var menus, returnMenu;
  browser.pause(500);
  menus = browser.elements('.menuButton');
  returnMenu = menus.value[menus.value.length - 1].ELEMENT;
  browser.elementIdClick(returnMenu);
  browser.pause(500);
};

getList = function(className) {
  var clickList, list;
  list = browser.elements(className);
  clickList = list.value[0].ELEMENT;
  browser.elementIdClick(clickList);
  console.log('list click');
  browser.pause(250);
};

waitUntil = function(func, selector, timeout) {
  if (!timeout) {
    timeout = 10000;
  }
  switch (func) {
    case 'visible':
      browser.waitForVisible(selector, timeout);
      break;
    case 'value':
      browser.waitForValue(selector, timeout);
      break;
    case 'enabled':
      browser.waitForEnabled(selector, timeout);
  }
  browser.pause(500);
};

waitForAlert = function(click) {
  var err, error, i;
  i = 0;
  while (i < 25) {
    try {
      browser.alertText();
      break;
    } catch (error) {
      err = error;
      i++;
      browser.pause(500);
      continue;
    }
  }
  console.log(browser.alertText());
  browser.pause(250);
  if (click === true) {
    browser.alertAccept();
    console.log('alert accepted');
  } else {
    browser.alertDismiss();
    console.log('alert dismissed');
  }
  return browser.pause(500);
};