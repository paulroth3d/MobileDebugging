/**
 *  SFDC Panel Controller
**/
/*global Ext, forcetkClient, SalesforceOAuthPlugin, senchaTalk */

Ext.define( "senchaTalk.controller.SfdcController", {
	extend: 'Ext.app.Controller',
	
	config: {
		refs: {
			//someCustomView: '#CustomViewId'
			//someCustomBtn: '#CustomViewId button[action=doCustom]'
			
			sfdcPanel: '#SFDCPanel',
			
			accountsBtn: '#SFDCPanel button[action=accounts]',
			contactsBtn: '#SFDCPanel button[action=contacts]',
			logoutBtn: '#SFDCPanel button[action=logout]',
			outputBox: '#SFDCPanel #outputBox'
		},
		
		control: {
			/* 
			someCustomBtn: {
				tap: 'someLocalMethod'
			}
			*/
			logoutBtn: {
				tap: function( whichButton, e, listenerOptions ){
					console.log( 'logout button pressed' );
					
					SalesforceOAuthPlugin.logout();
				}
			},
			accountsBtn: {
				tap: function( whichButton, e, listenerOptions ){
					console.log( 'accounts button pressed');
					forcetkClient.query("SELECT Name FROM Account", this.handleAccountsSuccess, this.handleErrorSfdc);
				}
			},
			contactsBtn: {
				tap: function( whichButton, e, listenerOptions ){
					console.log( 'contacts button pressed' );
					forcetkClient.query("SELECT Name FROM Contact", this.handleContactsSuccess, this.handleErrorSfdc);
				}
			}
		}
	},
	
	init: function(){
		console.log( "initialized senchaTalk.controller.SfdcController controller" );
	},
	
	handleContactsSuccess: function( response ){
		var controller = senchaTalk.app.getController( "SfdcController" );
		
		console.log( "handle results[ this, controller]" );
		console.log( this );
		console.log( controller );
		
		var resultBox = controller.getOutputBox();
		resultBox.setValue( "contacts retrieved" );
	},
	
	handleAccountsSuccess: function( response ){
		var controller = senchaTalk.app.getController( "SfdcController" );
		
		console.log( "handle results[ this, controller]" );
		console.log( this );
		console.log( controller );
		
		var resultBox = controller.getOutputBox();
		resultBox.setValue( "accounts retrieved" );
	},
	
	handleErrorSfdc: function( error ){
		console.log( error );
		
		var controller = senchaTalk.app.getController( "SfdcController" );
		var outputBox = controller.getOutputBox();
		
		outputBox.setValue( 'Error occurred' );
	}
});
