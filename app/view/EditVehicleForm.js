Ext.define('Purple.view.EditVehicleForm', {
  extend: 'Ext.form.Panel',
  xtype: 'editvehicleform',
  requires: ['Ext.form.*', 'Ext.field.*', 'Ext.Button'],
  config: {
    layout: {
      type: 'hbox',
      pack: 'start',
      align: 'start'
    },
    height: '100%',
    submitOnAction: false,
    cls: ['request-form', 'vehicle-form', 'accent-bg', 'slideable'],
    scrollable: {
      direction: 'vertical',
      directionLock: true,
      translatable: {
        translationMethod: 'auto'
      }
    },
    listeners: {
      initialize: function() {
        if (this.config.vehicleId !== 'new') {
          return this.getAt(1).add([
            {
              xtype: 'spacer',
              flex: 0,
              height: 100
            }, {
              xtype: 'container',
              flex: 0,
              layout: {
                type: 'vbox',
                pack: 'start',
                align: 'center'
              },
              cls: 'links-container',
              style: "width: 100%;\ntext-align: center;\npadding-bottom: 20px;",
              items: [
                {
                  xtype: 'button',
                  ui: 'plain',
                  text: 'Delete Vehicle',
                  handler: (function(_this) {
                    return function() {
                      return _this.fireEvent('deleteVehicle', _this.config.vehicleId);
                    };
                  })(this)
                }
              ]
            }
          ]);
        }
      }
    },
    items: [
      {
        xtype: 'spacer',
        flex: 1
      }, {
        xtype: 'container',
        flex: 0,
        width: '85%',
        layout: {
          type: 'vbox',
          pack: 'start',
          align: 'start'
        },
        items: [
          {
            xtype: 'component',
            flex: 0,
            ctype: 'editVehicleFormHeading',
            cls: 'heading',
            html: ''
          }, {
            xtype: 'component',
            flex: 0,
            cls: 'horizontal-rule'
          }, {
            xtype: 'selectfield',
            ctype: 'editVehicleFormYear',
            flex: 0,
            name: 'year',
            label: 'Year',
            listPicker: {
              title: 'Select Vehicle Year'
            },
            cls: ['click-to-edit', 'bottom-margin', 'visibly-disabled'],
            disabled: true,
            options: ['Loading...']
          }, {
            xtype: 'selectotherfield',
            ctype: 'editVehicleFormMake',
            flex: 0,
            name: 'make',
            label: 'Make',
            promptTitle: 'Enter New Make',
            promptMessage: '',
            listPicker: {
              title: 'Select Vehicle Make'
            },
            cls: ['click-to-edit', 'bottom-margin', 'visibly-disabled'],
            disabled: true,
            options: ['Please select year...']
          }, {
            xtype: 'selectotherfield',
            ctype: 'editVehicleFormModel',
            flex: 0,
            name: 'model',
            label: 'Model',
            promptTitle: 'Enter New Model',
            promptMessage: '',
            listPicker: {
              title: 'Select Vehicle Model'
            },
            cls: ['click-to-edit', 'bottom-margin', 'visibly-disabled'],
            disabled: true,
            options: ['Please select make...']
          }, {
            xtype: 'selectotherfield',
            ctype: 'editVehicleFormColor',
            flex: 0,
            name: 'color',
            label: 'Color',
            promptTitle: 'Enter New Color',
            promptMessage: '',
            listPicker: {
              title: 'Select Vehicle Color'
            },
            cls: ['click-to-edit', 'bottom-margin', 'visibly-disabled'],
            disabled: true,
            options: ['Loading...']
          }, {
            xtype: 'component',
            flex: 0,
            cls: 'horizontal-rule'
          }, {
            xtype: 'selectfield',
            ctype: 'editVehicleFormGasType',
            flex: 0,
            name: 'gas_type',
            label: 'Gas',
            listPicker: {
              title: 'Select Vehicle Gas'
            },
            cls: ['click-to-edit', 'bottom-margin'],
            options: [
              {
                text: 'Unleaded 87 Octane',
                value: '87'
              }, {
                text: 'Unleaded 91 Octane',
                value: '91'
              }
            ]
          }, {
            xtype: 'textfield',
            ctype: 'editVehicleFormLicensePlate',
            name: 'license_plate',
            label: 'License Plate',
            labelWidth: 125,
            flex: 0,
            cls: ['bottom-margin', 'uppercase-input'],
            clearIcon: false
          }, {
            xtype: 'hiddenfield',
            ctype: 'editVehicleFormPhoto',
            name: 'photo'
          }, {
            xtype: 'button',
            ctype: 'editVehicleFormTakePhotoButton',
            ui: 'plain',
            cls: ['take-photo'],
            text: 'Take Photo',
            handler: function() {
              return this.fireEvent('takePhoto');
            }
          }, {
            xtype: 'container',
            flex: 0,
            height: 110,
            width: '100%',
            padding: '0 0 5 0',
            layout: {
              type: 'vbox',
              pack: 'center',
              align: 'center'
            },
            items: [
              {
                xtype: 'button',
                ui: 'action',
                cls: 'button-pop',
                text: 'Save Changes',
                flex: 0,
                handler: function() {
                  return this.up().up().up().fireEvent('saveChanges', this.up().up().up().config.saveChangesCallback);
                }
              }
            ]
          }
        ]
      }, {
        xtype: 'spacer',
        flex: 1
      }
    ]
  }
});
