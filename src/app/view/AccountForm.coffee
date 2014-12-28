Ext.define 'Purple.view.AccountForm'
  extend: 'Ext.form.Panel'
  xtype: 'accountform'
  requires: [
    'Ext.form.*'
    'Ext.field.*'
    'Ext.Button'
  ]
  config:
    layout:
      type: 'hbox'
      pack: 'start'
      align: 'start'
    submitOnAction: no
    cls: [
      'account-form'
      'accent-bg'
    ]
    items: [
      {
        xtype: 'container'
        id: 'logoutButtonContainer'
        flex: 0
        layout:
          type: 'vbox'
          pack: 'start'
          align: 'center'
        cls: 'links-container'
        style: """
          position: absolute;
          bottom: 15px;
          width: 100%;
          text-align: center;
        """
        items: [
          {
            xtype: 'button'
            ui: 'plain'
            text: 'Logout'
            handler: ->
              @up().up().fireEvent 'logoutButtonTap'
          }
        ]
      }
      {
        xtype: 'spacer'
        flex: 1
      }
      {
        xtype: 'container'
        flex: 0
        width: '85%'
        layout:
          type: 'vbox'
          pack: 'start'
          align: 'start'
        items: [
          {
            xtype: 'component'
            flex: 0
            cls: 'heading'
            html: 'Account'
          }
          {
            xtype: 'component'
            flex: 0
            cls: 'horizontal-rule'
          }
          {
            xtype: 'textfield'
            flex: 0
            name: 'email'
            value: 'email here'
          }
          {
            xtype: 'component'
            flex: 0
            cls: 'horizontal-rule'
          }
        ]
      }
      {
        xtype: 'spacer'
        flex: 1
      }
    ]
