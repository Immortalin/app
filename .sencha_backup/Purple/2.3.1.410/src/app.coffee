Ext.Loader.setPath
  'Ux.field': 'ux'
  'Ext.ux': 'ux'
  'Override.form': 'override'
  'Override.field': 'override'

Ext.application
  name: 'Purple'
  requires: [
    'Override.form.Panel'
    'Override.field.Select'
    'Ux.field.SelectOtherField'
    'Ux.field.MoneyField'
    'Ux.field.RatingField'
    'Purple.plugin.NonListPullRefresh'
  ]
  controllers: [
    'Main'
    'Menu'
    'Account'
    'Vehicles'
    'Orders'
    'PaymentMethods'
    'GasTanks'
  ]
  views: [
    'MainContainer'
    'TopToolbar'
  ]

  launch: ->
    # Initialize the main view
    Ext.Viewport.add [
      Ext.create 'Purple.view.MainContainer'
    ]