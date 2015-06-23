// Generated by CoffeeScript 1.3.3
var VERSION;

VERSION = "LOCAL";

window.util = {
  VERSION_NUMBER: "1.0.3",
  WEB_SERVICE_BASE_URL: (function() {
    switch (VERSION) {
      case "LOCAL":
        return "http://192.168.0.2:3000/";
      case "PROD":
        return "https://purpledelivery.com/";
      case "DEV":
        return "http://purple-dev.elasticbeanstalk.com/";
    }
  })(),
  STRIPE_PUBLISHABLE_KEY: (function() {
    switch (VERSION) {
      case "LOCAL":
        return 'pk_test_HMdwupxgr2PUwzdFPLsSMJoJ';
      case "PROD":
        return 'pk_live_r8bUlYTZSxsNzgtjVAIH7bcA';
      case "DEV":
        return 'pk_test_HMdwupxgr2PUwzdFPLsSMJoJ';
    }
  })(),
  GCM_SENDER_ID: "254423398507",
  MINIMUM_GALLONS: 10,
  GALLONS_INCREMENT: 5,
  GALLONS_PER_TANK: 5,
  STATUSES: ["unassigned", "assigned", "enroute", "servicing", "complete", "cancelled"],
  NEXT_STATUS_MAP: {
    "unassigned": "assigned",
    "assigned": "accepted",
    "accepted": "enroute",
    "enroute": "servicing",
    "servicing": "complete",
    "complete": "complete",
    "cancelled": "cancelled"
  },
  CANCELLABLE_STATUSES: ["unassigned", "assigned", "accepted", "enroute"],
  ctl: function(controllerName) {
    return Purple.app.getController(controllerName);
  },
  flashComponent: function(c, t) {
    var _this = this;
    if (t == null) {
      t = 5000;
    }
    c.show();
    return setTimeout((function() {
      return c.hide();
    }), t);
  },
  centsToDollars: function(x) {
    return (x / 100).toFixed(2);
  }
};
