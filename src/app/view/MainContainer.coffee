Ext.define 'Purple.view.MainContainer',
  extend: 'Ext.ux.slidenavigation.View'
  requires: [
    'Purple.view.MapForm'
    'Purple.view.RequestForm'
    'Purple.view.RequestConfirmationForm'
    'Purple.view.LoginForm'
    'Purple.view.AccountForm'
    'Purple.view.Orders'
    'Purple.view.Vehicles'
    'Purple.view.Help'
    'Purple.view.Feedback'
  ]
  xtype: 'maincontainer'
  config:
    fullscreen: yes
    cls: 'main-container'

    ###*
    Any component within the container with an 'x-toolbar' class
    will be draggable.  To disable draggin all together, set this
    to false.
    ###
    slideSelector: "slideable"
    
    ###*
    Container must be dragged 10 pixels horizontally before allowing
    the underlying container to actually be dragged.
    
    @since 0.2.2
    ###
    containerSlideDelay: -1

    container:
      scrollable: no
      cls: 'accent-bg'
    
    ###*
    Time in milliseconds to animate the closing of the container
    after an item has been clicked on in the list.
    ###
    selectSlideDuration: 200
    
    ###*
    Enable content masking when container is open.
    
    @since 0.2.0
    ###
    itemMask: true

    shadowStyle: '0px 0px 0px 6px rgba(0,0,0,0.1)'
    
    ###*
    Define the default slide button config.  Any item that has
    a `slideButton` value that is either `true` or a button config
    will use these values at the default.
    ###
    slideButtonDefaults:
      selector: "menu-button"

    list:
      maxDrag: 265
      width: 265
      grouped: no
      scrollable: no
      items: [
        {
          xtype: 'component'
          cls: 'menu-toolbar'
          docked: 'top'
          html: """
            <img src="resources/images/logo-light.png" class="slide-menu-logo" />
          """
        }
        {
          xtype: 'container'
          layout:
            type: 'vbox'
            pack: 'start'
            align: 'start'
          padding: '0 0 14 19'
          docked: 'bottom'
          cls: 'menu-links'
          items: [
            {
              xtype: 'button'
              ui: 'plain'
              text: 'Invite a Friend'
            }
            {
              xtype: 'component'
              flex: 0
              height: 10
            }
            {
              xtype: 'button'
              ctype: 'feedbackButton'
              ui: 'plain'
              text: 'Feedback?'
              handler: -> @fireEvent 'feedbackButtonTap'
            }
          ]
        }
      ]

    ###*
    Change this to 'right' to dock the navigation list to the right.
    ###
    listPosition: "left"

    items: [
      {
        title: "Request Gas"
        
        items: [
          {
            xtype: "toptoolbar"
            cls: [
              'slideable'
              'bordered'
              # 'shadowed'
            ]
          }
          {
            xtype: 'container'
            id: 'requestGasTabContainer'
            layout:
              type: 'card'
              # animation: 'pop'
            items: [
              {
                xtype: "mapform"
              }
            ]
          }
        ]
      }
      {
        title: "Login"
        cls: 'slideable'
        items: [
          {
            xtype: 'loginform'
          }
        ]
      }
      {
        title: "Account"
        items: [
          {
            xtype: "toptoolbar"
            cls: [
              'slideable'
              'bordered'
            ]
          }
          {
            xtype: 'accountform'
          }
        ]
      }
      {
        title: "Orders"
        items: [
          {
            xtype: "toptoolbar"
            cls: [
              'slideable'
              'bordered'
            ]
          }
          {
            xtype: 'container'
            id: 'ordersTabContainer'
            layout:
              type: 'card'
            items: [
              {
                xtype: 'orders'
              }
            ]
          }
        ]
      }
      {
        title: "Vehicles"
        items: [
          {
            xtype: "toptoolbar"
            cls: [
              'slideable'
              'bordered'
            ]
          }
          {
            xtype: 'container'
            id: 'vehiclesTabContainer'
            layout:
              type: 'card'
            items: [
              {
                xtype: 'vehicles'
              }
            ]
          }
        ]
      }
      {
        title: "Help"
        items: [
          {
            xtype: "toptoolbar"
            cls: [
              'slideable'
              'bordered'
            ]
          }
          {
            xtype: 'help'
          }
        ]
      }
      {
        title: "Feedback"
        items: [
          {
            xtype: "toptoolbar"
            cls: [
              'slideable'
              'bordered'
            ]
          }
          {
            xtype: 'feedback'
          }
        ]
      }
    ]

    listeners:
      initialize: ->
        util.ctl('Menu').adjustForAppLoginState()
        util.ctl('Menu').hideTitles [
          5 # always hide Help
          6 # Feedback
        ] 
    
  initialize: ->
    @callParent arguments
