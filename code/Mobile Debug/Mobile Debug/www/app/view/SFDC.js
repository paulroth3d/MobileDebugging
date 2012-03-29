Ext.define( 'senchaTalk.view.SFDC', {
	extend: 'Ext.Panel',
	xtype: 'SFDC',
	id: 'SFDCPanel',
	
	config: {
		fullscreen: true,
		scrollable: true,
		padding: 10,
		layout: { type: 'vbox', align : 'center', pack  : 'start' },
		items: [{
			xtype: "panel",
			layout: 'hbox',
			items: [{
				xtype: 'button',
				text: 'Accounts',
				action: 'accounts'
			},{
				xtype: 'button',
				text: 'Contacts',
				action: 'contacts'
			},{
				xtype: 'spacer',
				width: 40
			},{
				xtype: 'button',
				text: 'Log out',
				action: 'logout'
			}]
		},{
			xtype: 'textareafield',
			id: 'outputBox',
			height: 20,
			width: 300
		},{
			xtype: 'spacer',
			height: 10
		},{
			xtype: 'panel',
			layout: 'vbox',
			id: 'resultsBox'
		}]
	}
});
