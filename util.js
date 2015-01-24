// Generated by CoffeeScript 1.3.3
var VERSION;

VERSION = "DEV";

window.util = {
  WEB_SERVICE_BASE_URL: (function() {
    switch (VERSION) {
      case "LOCAL":
        return "http://192.168.0.16:3000/";
      case "PROD":
        return "https://service.purpleapp.com/";
      case "DEV":
        return "http://purple-dev.elasticbeanstalk.com/";
    }
  })(),
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
  }
};
