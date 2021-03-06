# "LOCAL", "PROD", "DEV"
VERSION = "LOCAL"

if VERSION is "LOCAL" or VERSION is "DEV"
  window.onerror = (message, url, lineNumber) ->
    alert "#{message} #{lineNumber}"
    return false
else
  window.onerror = (message, url, lineNumber) ->
    ga_storage?._trackEvent 'error', 'App Error', "#{message} #{lineNumber}"
    # let the default handler run as well
    # (yes this is inverse to the more logical 'true', but I think it's needed)
    return false

window.util =
  # ! ALWAYS UPDATE lastCacheVersionNumber conditional in index.html
  VERSION_NUMBER: "1.11.10"
  
  WEB_SERVICE_BASE_URL: switch VERSION
    when "LOCAL" then "http://Christophers-MacBook-Pro.local:3000/"
    # when "LOCAL" then "http://192.168.1.225:3000/"
    # when "LOCAL" then "http://localhost:3000/"
    when "DEV" then "http://purple-dev-env.elasticbeanstalk.com/"
    when "PROD" then "https://purpledelivery.com/"

  APP_DOWNLOAD_LINK: "http://purpleapp.com/app"

  STRIPE_PUBLISHABLE_KEY: switch VERSION
    when "LOCAL" then 'pk_test_HMdwupxgr2PUwzdFPLsSMJoJ'
    when "DEV" then 'pk_test_HMdwupxgr2PUwzdFPLsSMJoJ'
    when "PROD" then 'pk_live_r8bUlYTZSxsNzgtjVAIH7bcA'

  SEGMENT_WRITE_KEY: switch VERSION
    when "LOCAL" then 'egckTdE1OGE9MUdIdQHUC3FvvUDXdLUG'
    when "DEV" then 'egckTdE1OGE9MUdIdQHUC3FvvUDXdLUG'
    when "PROD" then 'RLf4HciCdW72A4VSJCZ87WcMQs5Kdoix'

  # SIFT_SCIENCE_SNIPPET_KEY: switch VERSION
  #   when "LOCAL" then 'a9e732d5be'
  #   when "DEV" then 'a9e732d5be'
  #   when "PROD" then '4426d49b93'

  GCM_SENDER_ID: "254423398507" # was 254423398507

  STATUSES: [
    "unassigned"
    "assigned"
    "enroute"
    "servicing"
    "complete"
    "cancelled"
  ]

  NEXT_STATUS_MAP:
    "unassigned": "assigned"
    "assigned": "accepted"
    "accepted": "enroute"
    "enroute": "servicing"
    "servicing": "complete"
    "complete": "complete"
    "cancelled": "cancelled"

  # you can cancel your order if its status is below
  # (this is just frontend logic, there is a hard constraint in backend)
  CANCELLABLE_STATUSES: [
    "unassigned"
    "assigned"
    "accepted"
    "enroute"
  ]

  ACTIVE_STATUSES: [
    "unassigned"
    "assigned"
    "accepted"
    "enroute"
    "servicing"
  ]

  # returns the controller (just a convenience function)
  ctl: (controllerName) ->
    Purple.app.getController controllerName

  # show a component for a specified amount of time (t, millis), then hide it
  flashComponent: (c, t = 5000) ->
    c.show()
    setTimeout (=> c.hide()), t

  centsToDollars: (x) ->
    # ceil, here, matches how prices are handled on app-service
    (Math.ceil(x) / 100).toFixed 2

  # like centsToDollars but gives 7, 7.25 instead of 7.00, 7.25
  centsToDollarsShort: (x) ->
    dollars = (Math.ceil(x) / 100)
    if Math.ceil(x) % 100 is 0
      (Math.ceil(x) / 100).toFixed 0
    else
      (Math.ceil(x) / 100).toFixed 2

  isEmpty: (obj) ->
    for key of obj
      if obj.hasOwnProperty key
        return false
    true

  confirm: (message, title, yesCallback, noCallback, yesButtonText = "Yes", noButtonText = "No") ->
    if not (Ext.os.is.Android or Ext.os.is.iOS)
      if confirm "#{title}\n#{message}"
        yesCallback?()
      else
        noCallback?()
    else
      navigator.notification.confirm(
        message,
        ((index) -> if index is 2 then yesCallback?() else noCallback?()),
        title,
        [noButtonText, yesButtonText]
      )

  confirmDialog: (message, indexFunction, title, buttons) ->
    if not Ext.os.is.Android and not Ext.os.is.iOS
      if confirm title + '\n' + message
        indexFunction 1
      else
        indexFunction 2
    else
      navigator.notification.confirm message, indexFunction, title, buttons

  alert: (message, title, callback) ->
    if not (Ext.os.is.Android or Ext.os.is.iOS)
      alert "#{title}\n#{message}"
      callback?()
    else
      navigator.notification.alert message, callback, title

  handleDeepLinkUrl: (url) ->
    while util.ctl('Menu').backButtonStack.length
      util.ctl('Menu').popOffBackButton()
    if util.ctl('Account').isUserLoggedIn()
      switch url
        when 'purpleapp://map'
          util.ctl('Main').getMainContainer().getItems().getAt(0).select 0, no, no
        when 'purpleapp://membership'
          util.ctl('Main').getMainContainer().getItems().getAt(0).select 2, no, no
          util.ctl('Subscriptions').subscriptionsFieldTap()
        when 'purpleapp://account'
          util.ctl('Main').getMainContainer().getItems().getAt(0).select 2, no, no
        when 'purpleapp://editaccount'
          util.ctl('Main').getMainContainer().getItems().getAt(0).select 2, no, no
          util.ctl('Account').showEditAccountForm()
        when 'purpleapp://orders'
          util.ctl('Main').getMainContainer().getItems().getAt(0).select 3, no, no
        when 'purpleapp://vehicles'
          util.ctl('Main').getMainContainer().getItems().getAt(0).select 4, no, no
        when 'purpleapp://help'
          util.ctl('Main').getMainContainer().getItems().getAt(0).select 5, no, no
        when 'purpleapp://feedback'
          util.ctl('Main').getMainContainer().getItems().getAt(0).select 6, no, no
        when 'purpleapp://invite'
          util.ctl('Main').getMainContainer().getItems().getAt(0).select 7, no, no
          
  googleMapsDeepLink: (url) ->
    (if Ext.os.is.iOS then "comgooglemaps://" else "http://maps.google.com/maps") + url

  withinRadius: (lat, lng, radius) ->
    # for LA
    latDegLenInMeters = 110923.30777170813
    lngDegLenInMeters = 92328.2051277882
    x1 = lat # fleet location lat
    y1 = lng # fleet location lng
    x2 = util.ctl('Main').lat # our lat
    y2 = util.ctl('Main').lng # our lng
    diffX = (x2 - x1) * latDegLenInMeters
    diffY = (y2 - y1) * lngDegLenInMeters
    radius * radius > (diffX * diffX) + (diffY * diffY)
