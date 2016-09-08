var ApiService = require('services/ApiService');
var NotificationService = require('services/NotificationService');
var ModalService = require('services/ModalService');

Vue.component('login', 
{
	template: '#vue-login',

	props:
	[
		"modalElement"
	],

	data: function () 
	{
		return {
			password: "",
			username: ""
		};
	},

	methods: 
	{
		showLogin: function() 
		{
			ModalService.findModal( document.getElementById(this.modalElement) ).show();
		},

		sendLogin: function ()
		{
			var component = this;

			ApiService.post("/rest/customer/login", {email: this.username, password: this.password}, {supressNotifications: true})
				.done(function (response)
				{
					ApiService.setToken(response);

					if(document.getElementById(component.modalElement) != null)
					{
						ModalService.findModal( document.getElementById(component.modalElement) ).hide();
					}

					NotificationService.success("Erfolgreich eingeloggt").closeAfter(3000);
				})
				.fail(function (response)
				{
					switch(response.code)
					{
						case 401:
							NotificationService.error("Anmeldedaten sind ungültig").closeAfter(3000);
							break;
					}
				});
		}
	}
});
