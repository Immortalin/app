Ext.define 'Purple.controller.GasTanks',
  extend: 'Ext.app.Controller'
  requires: [
    'Purple.view.Order'
  ]
  config:
    refs:
      mainContainer: 'maincontainer'
      topToolbar: 'toptoolbar'
      gasTanks: 'gastanks'
      gasTanks87: '[ctype=gasTanks87]'
      gasTanks91: '[ctype=gasTanks91]'
      gasTanksSaveButton: '[ctype=gasTanksSaveButton]'
    control:
      gasTanks:
        saveChanges: 'saveChanges'
        initialize: 'setInitialValueFromLocalStorage'
      gasTanks87:
        change: 'gasTanksChanged'
      gasTanks91:
        change: 'gasTanksChanged'

  launch: ->
    @callParent arguments

  setInitialValueFromLocalStorage: ->
    @getGasTanks().setValues
      gas_tanks_87: localStorage['purpleCourierGallons87'] / 5
      gas_tanks_91: localStorage['purpleCourierGallons91'] / 5

  gasTanksChanged: ->
    @getGasTanksSaveButton().setDisabled no

  saveChanges: ->
    values = @getGasTanks().getValues()
    localStorage['purpleCourierGallons87'] = values['gas_tanks_87'] * 5
    localStorage['purpleCourierGallons91'] = values['gas_tanks_91'] * 5
    @getGasTanksSaveButton().setDisabled yes
