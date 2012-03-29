/**
 *  SenchaTalk Home screen
 *  @author Paul Roth
**/
/*global Ext */

Ext.define( 'senchaTalk.view.Home', {
	extend: 'Ext.Panel',
	xtype: 'Home',
	
	config: {
		fullscreen: true,
		scrollable: true,
		layout: 'vbox',
		
		styleHtmlContent: true,
		html: [
			'<img src="http://www.darkbluestudios.com/transfer/proth/sencha.png" />',
			'<h1>Welcome to Sencha Touch</h1>',
			"<p>You're creating the Getting Started app. This demonstrates how ",
			"to use tabs, lists and forms to create a simple app</p>",
			'<h2>Sencha Touch (2.0.0)</h2>'
		].join(""),
		items: [{
			xtype: "panel",
			docked: "bottom",
			padding: 10,
			layout: { type: 'vbox', align : 'center', pack  : 'start' },
			
			items: []
		}]
	}
});
