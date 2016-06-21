// Generated by CoffeeScript 1.10.0
var assert, getList, getMenu, hitBack, sinon, waitForAlert, waitUntil;

assert = require('assert');

sinon = require('sinon');

describe('webdriver.io page', function() {
  it('should have the right title', function() {
    var title;
    console.log('should have the right title');
    browser.url('file:///Users/Patrick/Desktop/app/index-debug.html');
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
  it('should test accounts', function() {
    var name, phone;
    console.log('should test accounts');
    getMenu('div=Account');
    console.log('go to account');
    name = browser.getValue('[name="name"]');
    console.log('Name: ' + name[1]);
    assert.equal(name[1], 'Patrick Tan');
    phone = browser.getValue('[name="phone_number"]');
    console.log('Phone: ' + phone[1]);
    assert.equal(phone[1], '(714) 864 9041');
  });
  it('should register a credit card', function() {
    this.timeout(30000);
    console.log('should register a credit card');
    getMenu('div=Account');
    console.log('go to account');
    browser.click('div=Payment');
    console.log('click on credit card');
    browser.waitUntil('visible', 'span=Add Card');
    browser.click('span=Add Card');
    console.log('click add card');
    browser.setValue('[name="card_number"]', '4242424242424242');
    browser.setValue('[name="card_cvc"]', '123');
    browser.setValue('[name="card_billing_zip"]', '90024');
    console.log('fill in text');
    browser.click('div=Exp. Month');
    browser.click('span=6 (June)');
    console.log('month set to 6 (June)');
    waitUntil('value', '[name="card_exp_month"]');
    browser.click('div=Exp. Year');
    browser.click('span=2020');
    console.log('year set to 2020');
    waitUntil('value', '[name="card_exp_year"]');
    browser.click('span=Save Changes');
    waitUntil('visible', '[name="payment_method"]', 30000);
  });
  it('should delete a credit card', function() {
    console.log('should delete a credit card');
    getMenu('div=Account');
    console.log('go to account');
    browser.click('div=Payment');
    console.log('click on credit card');
    browser.waitUntil('visible', 'div=Visa*4242');
    browser.click('div=Visa *4242');
    waitForAlert(true);
    waitForAlert(true);
    console.log('alerts clicked');
    hitBack();
    console.log('back clicked');
  });
  it('should make an order', function() {
    var clock;
    this.timeout(30000);
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
  it('should delete the order', function() {
    console.log('should delete the order');
    getMenu('div=Orders');
    getList('.order-list-item');
    console.log('order clicked');
    browser.click('span=Cancel Order');
    waitForAlert(true);
    console.log('deleted');
    waitUntil('visible', 'div=Orders');
  });
  it('should create a new car', function() {
    console.log('should create a new car');
    getMenu('div=Vehicles');
    console.log('go to vehicles');
    browser.click('span=Add Vehicle');
    browser.click('div=Year');
    browser.click('span=2016');
    console.log('year set to 2016');
    waitUntil('value', '[name="year"]');
    browser.click('div=Make');
    browser.click('span=Acura');
    console.log('make set to Acura');
    waitUntil('value', '[name="make"]');
    browser.click('div=Model');
    browser.click('span=MDX');
    console.log('Model set to MDX');
    waitUntil('value', '[name="model"]');
    browser.click('div=Color');
    browser.click('span=White');
    console.log('color set to white');
    waitUntil('value', '[name="color"]');
    browser.setValue('[name="license_plate"]', '1ABC234');
    console.log('license plate set');
    browser.click('span=Save Changes');
    waitUntil('visible', 'span=2016 Acura MDX');
  });
  it('should delete the newest car', function() {
    console.log('should delete the new car');
    getMenu('div=Vehicles');
    console.log('go to vehicles');
    getList('.vehicle-list-item');
    console.log('car clicked');
    browser.click('span=Delete Vehicle');
    waitForAlert(true);
    console.log('deleted');
    waitUntil('visible', 'span=Add Vehicle');
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
