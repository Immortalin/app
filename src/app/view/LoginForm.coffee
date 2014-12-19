Ext.define 'Purple.view.LoginForm'
  extend: 'Ext.form.Panel'
  xtype: 'loginform'
  requires: [
    'Ext.form.*'
    'Ext.field.*'
    'Ext.Button'
  ]
  config:
    layout:
      type: 'hbox'
      pack: 'center'
      align: 'center'
    cls: [
      'login-form'
      'strong-accent-bg'
    ]
    scrollable: no
    submitOnAction: no
      
    items: [
      {
        xtype: 'spacer'
        flex: 1
      }
      {
        xtype: 'container'
        flex: 0
        width: '75%'
        layout:
          type: 'vbox'
          pack: 'center'
          align: 'center'
        items: [
          {
            xtype: 'spacer'
            flex: 1
          }
          {
            xtype: 'component'
            flex: 0
            padding: '0 0 30px 0'
            html: """
              <img src="resources/images/logo-light.png" class="login-logo" />
            """
          }
          {
            xtype: 'textfield'
            id: 'emailAddressField'
            flex: 0
            name: 'email_address'
            clearIcon: no
            value: ''
          }
          {
            xtype: 'component'
            cls: 'special-label'
            flex: 0
            html: 'email'
          }
          {
            xtype: 'textfield'
            id: 'passwordField'
            flex: 0
            name: 'password'
            clearIcon: no
            value: ''
          }
          {
            xtype: 'component'
            cls: 'special-label'
            flex: 0
            html: 'password'
          }
          {
            xtype: 'container'
            id: 'loginButton'
            flex: 0
            height: 110
            padding: '27 0 10 0'
            layout:
              type: 'vbox'
              pack: 'center'
              align: 'center'
            items: [
              {
                xtype: 'button'
                ui: 'action'
                cls: 'button-pop'
                text: 'Login'
                flex: 0
                handler: ->
                  @up().fireEvent 'submitLoginForm'
              }
            ]
          }
          {
            xtype: 'component'
            flex: 0
            html: 'or login with'
            style: 'color: #ffffff;'
          }
          {
            xtype: 'container'
            flex: 0
            padding: '10 0 10 0'
            layout:
              type: 'hbox'
              pack: 'center'
              align: 'center'
            items: [
              {
                xtype: 'spacer'
                flex: 1
              }
              {
                xtype: 'button'
                cls: 'icon-login-button'
                ui: 'plain'
                html: """
                  <img src="resources/images/facebook-logo.png" />
                """
                flex: 0
                handler: ->
                  @up().fireEvent 'facebookLogin'
              }
              {
                xtype: 'spacer'
                flex: 1
              }
              {
                xtype: 'button'
                cls: 'icon-login-button'
                ui: 'plain'
                html: """
                  <img src="resources/images/google-logo.png" />
                """
                flex: 0
                handler: ->
                  @up().fireEvent 'googleLogin'
              }
              {
                xtype: 'spacer'
                flex: 1
              }
            ]
          }
          {
            xtype: 'spacer'
            flex: 1
          }
          {
            xtype: 'container'
            id: 'registerButton'
            flex: 0
            layout:
              type: 'vbox'
              pack: 'start'
              align: 'center'
            padding: '0 0 15 0'
            cls: 'links-container'
            items: [
              {
                xtype: 'button'
                ui: 'plain'
                text: 'Register'
                handler: ->
                  @up().fireEvent 'registerButtonTap'
              }
            ]
          }
        ]
      }
      {
        xtype: 'spacer'
        flex: 1
      }
    ]
