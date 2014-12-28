Ext.define 'Purple.view.MainContainer',
  extend: 'Ext.ux.slidenavigation.View'
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
            <img src="resources/images/slide-menu-logo.png" class="slide-menu-logo" />
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
              ui: 'plain'
              text: 'Feedback?'
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
        
        # Enable the slide button using the defaults defined above in
        # `slideButtonDefaults`.
        slideButton: false
        items: [
          {
            xtype: "toptoolbar"
            cls: [
              'bordered'
              'shadowed'
            ]
          }
          {
            xtype: "mapform"
          }
        ]
      }
    ]
    
  initialize: ->
    @callParent arguments

    if localStorage['purpleUserId']?
      @addItems [
        {
          title: "Account"
          items: [
            {
              xtype: "toptoolbar"
              cls: [
                'bordered'
              ]
            }
            {
              xtype: 'accountform'
            }
          ]
        }
      ]
    else
      @addItems [
        {
          title: "Login"
          cls: 'slideable'
          items: [
            {
              xtype: 'loginform'
            }
          ]
        }
      ]
