// Generated by CoffeeScript 1.3.3

Ext.define('Purple.controller.Orders', {
  extend: 'Ext.app.Controller',
  requires: ['Purple.view.Order'],
  config: {
    refs: {
      mainContainer: 'maincontainer',
      topToolbar: 'toptoolbar',
      ordersTabContainer: '#ordersTabContainer',
      orders: 'orders',
      ordersList: '[ctype=ordersList]',
      order: 'order'
    },
    control: {
      orders: {
        viewOrder: 'viewOrder',
        loadOrdersList: 'loadOrdersList'
      },
      order: {
        backToOrders: 'backToOrders'
      }
    }
  },
  orders: null,
  launch: function() {
    return this.callParent(arguments);
  },
  getOrderById: function(id) {
    var o, order, _i, _len, _ref;
    _ref = this.orders;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      o = _ref[_i];
      if (o['id'] === orderId) {
        order = o;
        break;
      }
    }
    return order;
  },
  viewOrder: function(orderId) {
    var o, order, _i, _len, _ref;
    this.getOrdersTabContainer().setActiveItem(Ext.create('Purple.view.Order', {
      orderId: orderId
    }));
    _ref = this.orders;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      o = _ref[_i];
      if (o['id'] === orderId) {
        order = o;
        break;
      }
    }
    return console.log(order);
  },
  backToOrders: function() {
    return this.getOrdersTabContainer().remove(this.getOrder(), true);
  },
  loadOrdersList: function(forceUpdate, callback) {
    if (forceUpdate == null) {
      forceUpdate = false;
    }
    if (callback == null) {
      callback = null;
    }
    if ((this.orders != null) && !forceUpdate) {
      return this.renderOrdersList(this.orders);
    } else {
      Ext.Viewport.setMasked({
        xtype: 'loadmask',
        message: ''
      });
      return Ext.Ajax.request({
        url: "" + util.WEB_SERVICE_BASE_URL + "user/details",
        params: Ext.JSON.encode({
          user_id: localStorage['purpleUserId'],
          token: localStorage['purpleToken']
        }),
        headers: {
          'Content-Type': 'application/json'
        },
        timeout: 30000,
        method: 'POST',
        scope: this,
        success: function(response_obj) {
          var response;
          Ext.Viewport.setMasked(false);
          response = Ext.JSON.decode(response_obj.responseText);
          if (response.success) {
            this.orders = response.orders;
            util.ctl('Vehicles').vehicles = response.vehicles;
            this.renderOrdersList(this.orders);
            return typeof callback === "function" ? callback() : void 0;
          } else {
            return Ext.Msg.alert('Error', response.message, (function() {}));
          }
        },
        failure: function(response_obj) {
          var response;
          Ext.Viewport.setMasked(false);
          response = Ext.JSON.decode(response_obj.responseText);
          return console.log(response);
        }
      });
    }
  },
  renderOrdersList: function(orders) {
    var list, o, v, _i, _len, _results,
      _this = this;
    list = this.getOrdersList();
    list.removeAll(true, true);
    _results = [];
    for (_i = 0, _len = orders.length; _i < _len; _i++) {
      o = orders[_i];
      v = util.ctl('Vehicles').getVehicleById(o.vehicle_id);
      _results.push(list.add({
        xtype: 'textfield',
        id: "oid_" + o.id,
        flex: 0,
        label: "" + (Ext.util.Format.date(new Date(o.target_time_start * 1000), "F jS")) + "<br />\n" + v.year + " " + v.make + " " + v.model,
        labelWidth: '100%',
        cls: ['bottom-margin'],
        disabled: true,
        listeners: {
          initialize: function(field) {
            return field.element.on('tap', function() {
              var oid;
              oid = field.getId().split('_')[1];
              return _this.viewOrder(oid);
            });
          }
        }
      }));
    }
    return _results;
  }
});
