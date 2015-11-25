Ext.define('Purple.view.RequestConfirmationForm', {
  extend: 'Ext.form.Panel',
  xtype: 'requestconfirmationform',
  requires: ['Ext.form.*', 'Ext.field.*', 'Ext.Button'],
  config: {
    layout: {
      type: 'hbox',
      pack: 'start',
      align: 'start'
    },
    height: '100%',
    submitOnAction: false,
    cls: ['request-form', 'view-order', 'accent-bg', 'slideable'],
    scrollable: {
      direction: 'vertical',
      directionLock: true,
      translatable: {
        translationMethod: 'auto'
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
            cls: 'heading',
            html: 'Review Order'
          }, {
            xtype: 'component',
            flex: 0,
            cls: 'horizontal-rule'
          }, {
            xtype: 'hiddenfield',
            name: 'time'
          }, {
            xtype: 'textfield',
            flex: 0,
            name: 'display_time',
            label: 'Time',
            disabled: true,
            cls: ['visibly-disabled']
          }, {
            xtype: 'hiddenfield',
            name: 'vehicle_id'
          }, {
            xtype: 'textfield',
            flex: 0,
            name: 'vehicle',
            label: 'Vehicle',
            disabled: true,
            cls: ['visibly-disabled']
          }, {
            xtype: 'textfield',
            id: 'addressStreetConfirmation',
            flex: 0,
            name: 'address_street',
            label: 'Location',
            labelWidth: 89,
            disabled: true,
            cls: ['visibly-disabled', 'bottom-margin']
          }, {
            xtype: 'component',
            id: 'specialInstructionsConfirmationLabel',
            flex: 0,
            html: 'Special Instructions',
            cls: ['visibly-disabled', 'field-label-text']
          }, {
            xtype: 'component',
            id: 'specialInstructionsConfirmation',
            name: 'special_instructions',
            cls: 'special-instructions-confirmation',
            html: '',
            disabled: true,
            height: 'auto'
          }, {
            xtype: 'component',
            flex: 0,
            cls: 'horizontal-rule'
          }, {
            xtype: 'textfield',
            flex: 0,
            name: 'gas_price_display',
            label: 'Gas Price',
            labelWidth: 115,
            disabled: true,
            cls: ['visibly-disabled']
          }, {
            xtype: 'moneyfield',
            flex: 0,
            name: 'service_fee',
            label: 'Service Fee',
            labelWidth: 115,
            disabled: true,
            cls: ['visibly-disabled', 'bottom-margin']
          }, {
            xtype: 'textfield',
            id: 'freeGasField',
            flex: 0,
            name: 'discount',
            label: 'Free Gallons',
            labelWidth: 125,
            disabled: true,
            value: '',
            cls: ['bottom-margin', 'visibly-disabled']
          }, {
            xtype: 'textfield',
            id: 'discountField',
            flex: 0,
            name: 'discount',
            label: 'Coupon Code',
            labelWidth: 125,
            disabled: true,
            value: 'Enter',
            cls: ['click-to-edit', 'bottom-margin', 'visibly-disabled'],
            listeners: {
              initialize: function(field) {
                return field.element.on('tap', function() {
                  util.ctl('Main').promptForCode();
                  return Ext.select('.x-msgbox').setStyle('text-transform', 'uppercase');
                });
              }
            }
          }, {
            xtype: 'moneyfield',
            id: 'totalPriceField',
            flex: 0,
            name: 'total_price',
            label: 'Total',
            disabled: true,
            cls: ['highlighted']
          }, {
            xtype: 'hiddenfield',
            id: 'couponCodeField',
            name: 'coupon_code'
          }, {
            xtype: 'hiddenfield',
            name: 'gas_price'
          }, {
            xtype: 'hiddenfield',
            name: 'gallons'
          }, {
            xtype: 'hiddenfield',
            name: 'gas_type'
          }, {
            xtype: 'hiddenfield',
            name: 'lat'
          }, {
            xtype: 'hiddenfield',
            name: 'lng'
          }, {
            xtype: 'hiddenfield',
            name: 'address_zip'
          }, {
            xtype: 'hiddenfield',
            name: 'special_instructions'
          }, {
            xtype: 'container',
            id: 'cofirmOrderButtonContainer',
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
                text: 'Confirm Order',
                flex: 0,
                handler: function() {
                  return this.up().up().up().fireEvent('confirmOrder');
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
