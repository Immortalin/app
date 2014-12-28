// Generated by CoffeeScript 1.3.3

Ext.define('Purple.view.AccountForm', {
  extend: 'Ext.form.Panel',
  xtype: 'accountform',
  requires: ['Ext.form.*', 'Ext.field.*', 'Ext.Button'],
  config: {
    layout: {
      type: 'hbox',
      pack: 'start',
      align: 'start'
    },
    submitOnAction: false,
    cls: ['account-form', 'accent-bg'],
    items: [
      {
        xtype: 'container',
        id: 'logoutButtonContainer',
        flex: 0,
        layout: {
          type: 'vbox',
          pack: 'start',
          align: 'center'
        },
        cls: 'links-container',
        style: "position: absolute;\nbottom: 15px;\nwidth: 100%;\ntext-align: center;",
        items: [
          {
            xtype: 'button',
            ui: 'plain',
            text: 'Logout',
            handler: function() {
              return this.up().up().fireEvent('logoutButtonTap');
            }
          }
        ]
      }, {
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
            html: 'Account'
          }, {
            xtype: 'component',
            flex: 0,
            cls: 'horizontal-rule'
          }, {
            xtype: 'textfield',
            flex: 0,
            name: 'email',
            value: 'email here'
          }, {
            xtype: 'component',
            flex: 0,
            cls: 'horizontal-rule'
          }
        ]
      }, {
        xtype: 'spacer',
        flex: 1
      }
    ]
  }
});
