// Generated by CoffeeScript 1.3.3

Ext.define('Purple.view.TopToolbar', {
  extend: 'Ext.Toolbar',
  xtype: 'toptoolbar',
  config: {
    docked: 'top',
    ui: 'top-toolbar',
    title: 'Purple',
    items: [
      {
        xtype: 'button',
        ctype: 'infoButton',
        cls: 'light',
        ui: 'plain',
        iconCls: 'icomoon-jared-mdstand',
        iconMask: true,
        handler: function() {
          return this.fireEvent('infoButtonTap');
        }
      }, {
        xtype: 'button',
        ctype: 'helpButton',
        ui: 'plain',
        iconCls: 'icomoon-jared-question',
        iconMask: true,
        handler: function() {
          return this.fireEvent('helpButtonTap');
        }
      }
    ]
  }
});
