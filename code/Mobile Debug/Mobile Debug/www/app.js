/**
 *  Main starting point for the application.
 *  
 *  This is where the views, models, controllers and profiles are stored.
 *  
 *  It is also a very good place to bounce events and or relate utility methods.
**/
/*global Ext, SalesforceOAuthPlugin, forcetkClient, forcetk */

//<debug>
Ext.Loader.setPath({
	'Ext': 'sdk/src'
});
//</debug>

var senchaTalkApp = Ext.application({
	name: 'senchaTalk',
	apiVersion: 'v23.0',

	requires: [
		'Ext.MessageBox'
	],

	views: ['Main','Home','SFDC','ContactMe', 'LayoutExample', 'Docking', 'TemplateDemo' ],
	
	controllers: [ 'Contact', 'SfdcController' ],

	icon: {
		57: 'resources/icons/Icon.png',
		72: 'resources/icons/Icon~ipad.png',
		114: 'resources/icons/Icon@2x.png',
		144: 'resources/icons/Icon~ipad@2x.png'
	},
	
	phoneStartupScreen: 'resources/loading/Homescreen.jpg',
	tabletStartupScreen: 'resources/loading/Homescreen~ipad.jpg',
	
	/**
	 *  Launch is the initial function when the application is ready
	**/
	launch: function() {
		var self = this;
		
		//-- now we get the auth credentials to connect to salesforce
		//-- see _oldIndex.html for the standard file
		console.log( "get auth credentials");
		SalesforceOAuthPlugin.getAuthCredentials(
			function( creds ){
				console.log( 'getAuthCredentials returned' );
				console.log( creds );
				console.log( Ext.encode( creds ) );
				
				forcetkClient = new forcetk.Client(creds.clientId, creds.loginUrl);
				forcetkClient.setSessionToken(creds.accessToken, this.apiVersion, creds.instanceUrl);
				forcetkClient.setRefreshToken(creds.refreshToken);
				forcetkClient.setUserAgentString(creds.userAgent);
				
				self.appReady();
			}, function( error ){
				console.log( "Error occurred while loading credentials" );
			}
		);
	},
	
	/**
	 *  App Ready is a custom method that is called when everything is complete
	**/
	appReady: function(){
		
		console.log( "--- APP READY called----" );
		
		// Destroy the #appLoadingIndicator element
		Ext.fly('appLoadingIndicator').destroy();

		// Initialize the main view
		Ext.Viewport.add(Ext.create('senchaTalk.view.Main'));
	},

	onUpdated: function() {
		Ext.Msg.confirm(
			"Application Update",
			"This application has just successfully been updated to the latest version. Reload now?",
			function() {
				window.location.reload();
			}
		);
	},
	
	//-- custom methods added to the controller
	/**
	 *  Custom method to show notification, but provide fallback if not on ios
	 *  @param message
	 *  @param callback
	 *  @param title
	**/
	showNotification: function( message, callback, title ){
		if( callback == null ) callback = Ext.emptyFn;
		if( title == null ) title = '';
		
		if( navigator && navigator.notification && navigator.notification.alert ){
			navigator.notification.alert(
				message,			// message
				callback,			// callback
				title				// title
				// 'Done'			// buttonName
			)
		} else {
			alert( message );
			callback();
		}
	}
});
