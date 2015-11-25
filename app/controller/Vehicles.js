Ext.define('Purple.controller.Vehicles', {
  extend: 'Ext.app.Controller',
  requires: ['Purple.view.EditVehicleForm'],
  config: {
    refs: {
      mainContainer: 'maincontainer',
      topToolbar: 'toptoolbar',
      vehiclesTabContainer: '#vehiclesTabContainer',
      vehicles: 'vehicles',
      vehiclesList: '[ctype=vehiclesList]',
      editVehicleForm: 'editvehicleform',
      editVehicleFormHeading: '[ctype=editVehicleFormHeading]',
      backToVehiclesButton: '[ctype=backToVehiclesButton]',
      editVehicleFormYear: '[ctype=editVehicleFormYear]',
      editVehicleFormMake: '[ctype=editVehicleFormMake]',
      editVehicleFormModel: '[ctype=editVehicleFormModel]',
      editVehicleFormColor: '[ctype=editVehicleFormColor]',
      editVehicleFormGasType: '[ctype=editVehicleFormGasType]',
      editVehicleFormLicensePlate: '[ctype=editVehicleFormLicensePlate]',
      editVehicleFormPhoto: '[ctype=editVehicleFormPhoto]',
      editVehicleFormTakePhotoButton: '[ctype=editVehicleFormTakePhotoButton]',
      requestForm: 'requestform',
      requestFormVehicleSelect: '[ctype=requestFormVehicleSelect]',
      requestFormGallonsSelect: '[ctype=requestFormGallonsSelect]',
      requestFormTimeSelect: '[ctype=requestFormTimeSelect]',
      sendRequestButton: '[ctype=sendRequestButton]'
    },
    control: {
      vehicles: {
        editVehicle: 'showEditVehicleForm',
        loadVehiclesList: 'loadVehiclesList'
      },
      editVehicleForm: {
        backToVehicles: 'backToVehicles',
        saveChanges: 'saveChanges',
        deleteVehicle: 'askToDeleteVehicle'
      },
      editVehicleFormYear: {
        change: 'yearChanged'
      },
      editVehicleFormMake: {
        change: 'makeChanged'
      },
      editVehicleFormModel: {
        change: 'modelChanged'
      },
      editVehicleFormColor: {
        change: 'colorChanged'
      },
      editVehicleFormTakePhotoButton: {
        takePhoto: 'addImage'
      },
      requestFormVehicleSelect: {
        initialize: 'initRequestFormVehicleSelect',
        change: 'requestFormVehicleSelectChange'
      }
    }
  },
  vehicles: null,
  vehicleList: window.vehicleList,
  colorList: ['', 'White', 'Black', 'Silver', 'Gray', 'Red', 'Blue', 'Brown', 'Biege', 'Cream', 'Yellow', 'Gold', 'Green', 'Pink', 'Purple', 'Copper', 'Camo'],
  launch: function() {
    return this.callParent(arguments);
  },
  updateVehicleList: function(category, text) {
    var make, year;
    year = this.getEditVehicleFormYear().getValue();
    make = this.getEditVehicleFormMake().getValue();
    if (category === 'make' && !this.vehicleList[year][text]) {
      this.vehicleList[year][text] = [];
      this.updateMakeOptions(year);
      this.getEditVehicleFormMake().setValue(text);
    }
    if (category === 'model' && this.vehicleList[year][make].indexOf(text) === -1) {
      this.vehicleList[year][make].push(text);
      this.updateModelOptions(year, make);
      this.getEditVehicleFormModel().setValue(text);
    }
    if (category === 'color' && this.colorList.indexOf(text) === -1) {
      this.updateColorOptions(text);
      return this.getEditVehicleFormColor().setValue(text);
    }
  },
  updateMakeOptions: function(year) {
    var options;
    options = this.getMakeList(year).map(function(x) {
      return {
        text: x,
        value: x
      };
    });
    options.push({
      text: '',
      value: ''
    });
    options.sort(function(a, b) {
      return a.text.localeCompare(b.text);
    });
    this.getEditVehicleFormMake().setOptions(options);
    return this.getEditVehicleFormMake().addOtherField();
  },
  updateModelOptions: function(year, make) {
    var options;
    options = this.getModelList(year, make).map(function(x) {
      return {
        text: x,
        value: x
      };
    });
    options.push({
      text: '',
      value: ''
    });
    options.sort(function(a, b) {
      return a.text.localeCompare(b.text);
    });
    this.getEditVehicleFormModel().setOptions(options);
    return this.getEditVehicleFormModel().addOtherField();
  },
  updateColorOptions: function(text) {
    this.colorList.push(text);
    this.getEditVehicleFormColor().setOptions(this.getColorList().map(function(x) {
      return {
        text: x,
        value: x
      };
    }));
    return this.getEditVehicleFormColor().addOtherField();
  },
  addSavedVehicles: function(vehicle) {
    if (!this.vehicleList[vehicle.year][vehicle.make]) {
      this.vehicleList[vehicle.year][vehicle.make] = [];
      this.updateMakeOptions(vehicle.year);
    }
    if (this.vehicleList[vehicle.year][vehicle.make].indexOf(vehicle.model) === -1) {
      this.vehicleList[vehicle.year][vehicle.make].push(vehicle.model);
      this.updateModelOptions(vehicle.year, vehicle.make);
    }
    if (this.colorList.indexOf(vehicle.color) === -1) {
      return this.updateColorOptions(vehicle.color);
    }
  },
  getVehicleById: function(id) {
    var i, len, ref, v, vehicle;
    ref = this.vehicles;
    for (i = 0, len = ref.length; i < len; i++) {
      v = ref[i];
      if (v['id'] === id) {
        vehicle = v;
        break;
      }
    }
    return vehicle;
  },
  getYearList: function() {
    var v, vehicle;
    return ((function() {
      var ref, results;
      ref = this.vehicleList;
      results = [];
      for (v in ref) {
        vehicle = ref[v];
        results.push(v);
      }
      return results;
    }).call(this)).sort(function(a, b) {
      return parseInt(b) - parseInt(a);
    });
  },
  getMakeList: function(year) {
    var ref, results, v, vehicle;
    if (this.vehicleList[year] != null) {
      ref = this.vehicleList[year];
      results = [];
      for (v in ref) {
        vehicle = ref[v];
        results.push(v);
      }
      return results;
    } else {
      return [];
    }
  },
  getModelList: function(year, make) {
    var i, len, ref, ref1, results, v;
    if (((ref = this.vehicleList[year]) != null ? ref[make] : void 0) != null) {
      ref1 = this.vehicleList[year][make];
      results = [];
      for (i = 0, len = ref1.length; i < len; i++) {
        v = ref1[i];
        results.push(v);
      }
      return results;
    } else {
      return [];
    }
  },
  getColorList: function() {
    return this.colorList;
  },
  yearChanged: function(field, value) {
    var make, year;
    year = this.getEditVehicleFormYear().getValue();
    make = this.getEditVehicleFormMake().getValue();
    this.updateMakeOptions(year);
    if (make) {
      this.updateModelOptions(year, make);
    }
    if (year) {
      this.getEditVehicleFormMake().setDisabled(false);
    } else {
      this.getEditVehicleFormMake().setDisabled(true);
    }
    return this.getEditVehicleFormMake().addOtherField();
  },
  makeChanged: function(field, value) {
    var year;
    year = this.getEditVehicleFormYear().getValue();
    this.updateModelOptions(year, value);
    this.getEditVehicleFormModel().addOtherField();
    if (value && value !== 'Other...') {
      this.getEditVehicleFormModel().setDisabled(false);
    } else {
      this.getEditVehicleFormModel().setDisabled(true);
    }
    return this.getEditVehicleFormMake().fieldChange(field, value);
  },
  modelChanged: function(field, value) {
    return this.getEditVehicleFormModel().fieldChange(field, value);
  },
  colorChanged: function(field, value) {
    return this.getEditVehicleFormColor().fieldChange(field, value);
  },
  showEditVehicleForm: function(vehicleId, suppressBackButtonBehavior) {
    var i, len, options, ref, v, vehicle;
    if (vehicleId == null) {
      vehicleId = 'new';
    }
    if (suppressBackButtonBehavior == null) {
      suppressBackButtonBehavior = false;
    }
    this.getVehiclesTabContainer().setActiveItem(Ext.create('Purple.view.EditVehicleForm', {
      vehicleId: vehicleId
    }));
    ref = this.vehicles;
    for (i = 0, len = ref.length; i < len; i++) {
      v = ref[i];
      this.addSavedVehicles(v);
    }
    if (!suppressBackButtonBehavior) {
      util.ctl('Menu').pushOntoBackButton((function(_this) {
        return function() {
          return _this.backToVehicles();
        };
      })(this));
    }
    this.getEditVehicleFormHeading().setHtml(vehicleId === 'new' ? 'Add Vehicle' : 'Edit Vehicle');
    this.getEditVehicleFormYear().setOptions(options = this.getYearList().map(function(x) {
      return {
        text: x,
        value: x
      };
    }), options.unshift({
      '': ''
    }));
    this.getEditVehicleFormYear().setDisabled(false);
    this.getEditVehicleFormColor().setOptions(this.getColorList().map(function(x) {
      return {
        text: x,
        value: x
      };
    }));
    this.getEditVehicleFormColor().addOtherField();
    this.getEditVehicleFormColor().setDisabled(false);
    if (vehicleId !== 'new') {
      vehicle = this.getVehicleById(vehicleId);
      this.getEditVehicleFormYear().setValue(vehicle['year']);
      this.yearChanged(null, vehicle['year']);
      this.getEditVehicleFormMake().setValue(vehicle['make']);
      this.makeChanged(null, vehicle['make']);
      this.getEditVehicleFormModel().setValue(vehicle['model']);
      this.getEditVehicleFormColor().setValue(vehicle['color']);
      this.getEditVehicleFormGasType().setValue(vehicle['gas_type']);
      this.getEditVehicleFormLicensePlate().setValue(vehicle['license_plate']);
      if ((vehicle['photo'] != null) && vehicle['photo'] !== '') {
        return this.setVehiclePhoto(vehicle['photo']);
      }
    }
  },
  backToVehicles: function() {
    return this.getVehiclesTabContainer().remove(this.getEditVehicleForm(), true);
  },
  loadVehiclesList: function() {
    if (this.vehicles != null) {
      return this.renderVehiclesList(this.vehicles);
    } else {
      Ext.Viewport.setMasked({
        xtype: 'loadmask',
        message: ''
      });
      return Ext.Ajax.request({
        url: util.WEB_SERVICE_BASE_URL + "user/details",
        params: Ext.JSON.encode({
          version: util.VERSION_NUMBER,
          user_id: localStorage['purpleUserId'],
          token: localStorage['purpleToken'],
          os: Ext.os.name
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
            this.vehicles = response.vehicles;
            util.ctl('Orders').orders = response.orders;
            util.ctl('Orders').loadOrdersList();
            this.renderVehiclesList(this.vehicles);
            localStorage['purpleReferralReferredValue'] = response.system.referral_referred_value;
            return localStorage['purpleReferralReferrerGallons'] = response.system.referral_referrer_gallons;
          } else {
            return navigator.notification.alert(response.message, (function() {}), "Error");
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
  renderVehiclesList: function(vehicles) {
    var i, len, list, results, v;
    list = this.getVehiclesList();
    if (list == null) {
      return;
    }
    list.removeAll(true, true);
    results = [];
    for (i = 0, len = vehicles.length; i < len; i++) {
      v = vehicles[i];
      results.push(list.add({
        xtype: 'textfield',
        id: "vid_" + v.id,
        flex: 0,
        label: "<span class=\"maintext\">" + v.year + " " + v.make + " " + v.model + "</span>\n<br /><span class=\"subtext\">" + v.color + " / <span class=\"license-plate\">" + v.license_plate + "</span></span>\n<span class=\"vehicle-photo\" style=\"background-image: url('" + v.photo + "') !important;\"></span>",
        labelWidth: '100%',
        cls: ['bottom-margin', 'vehicle-list-item'],
        disabled: true,
        listeners: {
          initialize: (function(_this) {
            return function(field) {
              return field.element.on('tap', function() {
                var vid;
                vid = field.getId().split('_')[1];
                return _this.showEditVehicleForm(vid, false);
              });
            };
          })(this)
        }
      }));
    }
    return results;
  },
  saveChanges: function(callback) {
    var values, vehicleId;
    values = this.getEditVehicleForm().getValues();
    vehicleId = this.getEditVehicleForm().config.vehicleId;
    values['id'] = vehicleId;
    Ext.Viewport.setMasked({
      xtype: 'loadmask',
      message: ''
    });
    return Ext.Ajax.request({
      url: util.WEB_SERVICE_BASE_URL + "user/edit",
      params: Ext.JSON.encode({
        version: util.VERSION_NUMBER,
        user_id: localStorage['purpleUserId'],
        token: localStorage['purpleToken'],
        vehicle: values
      }),
      headers: {
        'Content-Type': 'application/json'
      },
      timeout: 30000,
      method: 'POST',
      scope: this,
      success: function(response_obj) {
        var response, temp_arr;
        Ext.Viewport.setMasked(false);
        response = Ext.JSON.decode(response_obj.responseText);
        if (response.success) {
          this.vehicles = response.vehicles;
          util.ctl('Orders').orders = response.orders;
          this.backToVehicles();
          this.renderVehiclesList(this.vehicles);
          if (typeof callback === 'function') {
            temp_arr = this.vehicles.slice(0);
            temp_arr.sort(function(a, b) {
              return (new Date(b.timestamp_created)) - (new Date(a.timestamp_created));
            });
            return callback(temp_arr[0].id);
          } else {
            return util.ctl('Menu').popOffBackButtonWithoutAction();
          }
        } else {
          return navigator.notification.alert(response.message, (function() {}), "Error");
        }
      },
      failure: function(response_obj) {
        var response;
        Ext.Viewport.setMasked(false);
        response = Ext.JSON.decode(response_obj.responseText);
        return console.log(response);
      }
    });
  },
  askToDeleteVehicle: function(id) {
    return navigator.notification.confirm("", ((function(_this) {
      return function(index) {
        switch (index) {
          case 1:
            return _this.deleteVehicle(id);
        }
      };
    })(this)), "Are you sure you want to delete this vehicle?", ["Delete Vehicle", "Cancel"]);
  },
  deleteVehicle: function(vehicleId) {
    Ext.Viewport.setMasked({
      xtype: 'loadmask',
      message: ''
    });
    return Ext.Ajax.request({
      url: util.WEB_SERVICE_BASE_URL + "user/edit",
      params: Ext.JSON.encode({
        version: util.VERSION_NUMBER,
        user_id: localStorage['purpleUserId'],
        token: localStorage['purpleToken'],
        vehicle: {
          id: vehicleId,
          active: 0
        }
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
          this.vehicles = response.vehicles;
          util.ctl('Orders').orders = response.orders;
          this.backToVehicles();
          this.renderVehiclesList(this.vehicles);
          return util.ctl('Menu').popOffBackButtonWithoutAction();
        } else {
          return navigator.notification.alert(response.message, (function() {}), "Error");
        }
      },
      failure: function(response_obj) {
        var response;
        Ext.Viewport.setMasked(false);
        response = Ext.JSON.decode(response_obj.responseText);
        return console.log(response);
      }
    });
  },
  initRequestFormVehicleSelect: function() {
    var opts;
    if (this.vehicles != null) {
      opts = this.vehicles.map(function(v) {
        return {
          text: v.year + " " + v.make + " " + v.model,
          value: v.id
        };
      });
      opts.push({
        text: "New Vehicle",
        value: 'new'
      });
      return this.getRequestFormVehicleSelect().setOptions(opts);
    } else {
      Ext.Viewport.setMasked({
        xtype: 'loadmask',
        message: ''
      });
      return Ext.Ajax.request({
        url: util.WEB_SERVICE_BASE_URL + "user/details",
        params: Ext.JSON.encode({
          version: util.VERSION_NUMBER,
          user_id: localStorage['purpleUserId'],
          token: localStorage['purpleToken'],
          os: Ext.os.name
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
            this.vehicles = response.vehicles;
            util.ctl('Orders').orders = response.orders;
            localStorage['purpleReferralReferredValue'] = response.system.referral_referred_value;
            localStorage['purpleReferralReferrerGallons'] = response.system.referral_referrer_gallons;
            opts = this.vehicles.map(function(v) {
              return {
                text: v.year + " " + v.make + " " + v.model,
                value: v.id
              };
            });
            opts.push({
              text: "New Vehicle",
              value: 'new'
            });
            return this.getRequestFormVehicleSelect().setOptions(opts);
          } else {
            return navigator.notification.alert(response.message, (function() {}), "Error");
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
  requestFormVehicleSelectChange: function(field, value) {
    var ready;
    if (value === 'new') {
      util.ctl('Menu').selectOption(4);
      this.showEditVehicleForm('new', true);
      this.getEditVehicleForm().config.saveChangesCallback = (function(_this) {
        return function(vehicleId) {
          util.ctl('Menu').popOffBackButtonWithoutAction();
          util.ctl('Menu').selectOption(0);
          _this.initRequestFormVehicleSelect();
          return _this.getRequestFormVehicleSelect().setValue(vehicleId);
        };
      })(this);
      return util.ctl('Menu').pushOntoBackButton((function(_this) {
        return function() {
          util.ctl('Menu').popOffBackButtonWithoutAction();
          _this.backToVehicles();
          util.ctl('Main').backToMapFromRequestForm();
          return util.ctl('Menu').selectOption(0);
        };
      })(this));
    } else {
      ready = (this.getRequestFormGallonsSelect() != null) && (this.getRequestFormTimeSelect() != null);
      return setTimeout(((function(_this) {
        return function() {
          var a, availability, g, gallonsOpts, gasType, i, j, len, ref, ref1, ref2, ref3, ref4, t, time, timeOpts;
          gasType = _this.getVehicleById(value).gas_type;
          ref = _this.getRequestForm().config.availabilities;
          for (i = 0, len = ref.length; i < len; i++) {
            a = ref[i];
            if (a['octane'] === gasType) {
              availability = a;
              break;
            }
          }
          if (availability.gallons < util.MINIMUM_GALLONS) {
            navigator.notification.alert("Sorry, we are unable to deliver " + availability.octane + " Octane to your location at this time.", (function() {}), "Unavailable");
            _this.getRequestFormGallonsSelect().setDisabled(true);
            _this.getRequestFormTimeSelect().setDisabled(true);
            _this.getSendRequestButton().setDisabled(true);
            return;
          }
          gallonsOpts = [];
          for (g = j = ref1 = util.MINIMUM_GALLONS, ref2 = availability.gallons, ref3 = util.GALLONS_INCREMENT; ref3 > 0 ? j <= ref2 : j >= ref2; g = j += ref3) {
            gallonsOpts.push({
              text: "" + g,
              value: "" + g
            });
          }
          _this.getRequestFormGallonsSelect().setOptions(gallonsOpts);
          _this.getRequestFormGallonsSelect().setDisabled(false);
          timeOpts = [];
          ref4 = availability.times;
          for (t in ref4) {
            time = ref4[t];
            timeOpts.push({
              text: time['text'],
              value: t,
              order: time['order']
            });
          }
          timeOpts.sort(function(a, b) {
            return a['order'] - b['order'];
          });
          _this.getRequestFormTimeSelect().setOptions(timeOpts);
          _this.getRequestFormTimeSelect().setDisabled(false);
          return _this.getSendRequestButton().setDisabled(false);
        };
      })(this)), (ready ? 5 : 500));
    }
  },
  addImage: function() {
    var addImageStep2;
    addImageStep2 = Ext.bind(this.addImageStep2, this);
    return addImageStep2(Camera.PictureSourceType.CAMERA);
  },
  addImageStep2: function(sourceType) {
    var addImageSuccess;
    addImageSuccess = Ext.bind(this.addImageSuccess, this);
    return navigator.camera.getPicture(addImageSuccess, (function() {}), {
      destinationType: Camera.DestinationType.DATA_URL,
      quality: 40,
      targetWidth: 700,
      targetHeight: 700,
      correctOrientation: true
    });
  },
  addImageSuccess: function(dataUrl) {
    dataUrl = "data:image/jpeg;base64," + dataUrl;
    return this.setVehiclePhoto(dataUrl);
  },
  setVehiclePhoto: function(dataUrl) {
    this.getEditVehicleFormTakePhotoButton().element.dom.style.cssText = "background-image: url('" + dataUrl + "') !important;";
    return this.getEditVehicleFormPhoto().setValue(dataUrl);
  }
});
