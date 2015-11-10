Ext.define 'Purple.controller.Menu'
  extend: 'Ext.app.Controller'
  config:
    refs:
      mainContainer: 'maincontainer'
      topToolbar: 'toptoolbar'
      feedbackButton: '[ctype=feedbackButton]'
      inviteButton: '[ctype=inviteButton]'
      menuButton: '[ctype=menuButton]'
      requestGasTabContainer: '#requestGasTabContainer'
      accountTab: '#accountTab'
      accountTabContainer: '#accountTabContainer'
      loginForm: 'loginform'
      mapForm: 'mapform'
      map: '#gmap'
    control:
      feedbackButton:
        feedbackButtonTap: 'feedbackButtonTap'
      inviteButton:
        inviteButtonTap: 'inviteButtonTap'
      topToolbar:
        helpButtonTap: 'helpButtonTap'
        menuButtonTap: 'menuButtonTap'

  backButtonStack: []

  launch: ->
    @callParent arguments

  open: ->
    @getMainContainer().openContainer()

  close: ->
    @getMainContainer().closeContainer()

  isClosed: ->
    @getMainContainer().isClosed()

  lockMenu: ->
    @getMainContainer().setSlideSelector false

  unlockMenu: ->
    @getMainContainer().setSlideSelector 'slideable'

  pushOntoBackButton: (fn) ->
    @backButtonStack.push fn
    @getMainContainer().addCls 'makeMenuButtonBeBackButton'
    @lockMenu()

  popOffBackButton: ->
    (@backButtonStack.pop())()
    if @backButtonStack.length is 0
      @getMainContainer().removeCls 'makeMenuButtonBeBackButton'
      @unlockMenu()

  popOffBackButtonWithoutAction: ->
    @backButtonStack.pop()
    if @backButtonStack.length is 0
      @getMainContainer().removeCls 'makeMenuButtonBeBackButton'
      @unlockMenu()

  clearBackButtonStack: ->
    @backButtonStack = []
    @getMainContainer().removeCls 'makeMenuButtonBeBackButton'
    @unlockMenu()

  menuButtonTap: ->
    if @backButtonStack.length isnt 0
      @popOffBackButton()
    else
      if @isClosed()
        @open()
      else
        @close()

  helpButtonTap: ->
    if @getCurrentIndex() is 5
      # already on Help page
      @selectOption (@indexBeforeHelp ? 2)
      @popOffBackButtonWithoutAction()
    else
      @indexBeforeHelp = @getCurrentIndex()
      @pushOntoBackButton => @selectOption @indexBeforeHelp
      @selectOption 5

  feedbackButtonTap: ->
    @selectOption 6

  getCurrentIndex: ->
    @getMainContainer().getActiveItem().data.index

  selectOption: (index) ->
    @getMainContainer().getItems().getAt(0).select index, no, no

  changeTitle: (index, title) ->
    @getMainContainer().getAt(0).getAt(2).getAt(index).setData
      title: title

  showTitles: (indicies) ->
    for i in indicies
      @getMainContainer().getAt(0).getAt(2).getAt(i).show()

  hideTitles: (indicies) ->
    for i in indicies
      @getMainContainer().getAt(0).getAt(2).getAt(i).hide()

  adjustForAppLoginState: ->
    if util.ctl('Account').isUserLoggedIn()
      @hideTitles [1]
      if util.ctl('Account').isCourier()
        @hideTitles [0, 4, 7]
        @showTitles [2, 3, 8, 9]
        localStorage['purpleCourierGallons87'] ?= 0
        localStorage['purpleCourierGallons91'] ?= 0
        if not util.ctl('Main').courierPingIntervalRef?
          util.ctl('Main').initCourierPing()
      else
        @hideTitles [8, 9]
        @showTitles [2, 3, 4, 7]
      util.ctl('Account').populateAccountForm()
    else
      @hideTitles [2, 3, 4, 7, 8, 9]
      @showTitles [1]