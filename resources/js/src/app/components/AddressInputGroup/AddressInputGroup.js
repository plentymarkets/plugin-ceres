Vue.component( 'address-input-group',
{
	template: '#vue-address-input-group',

	props:
	[
		'addressData',
		'locale'
	],

	created: function()
	{
		if(!this.addressData)
		{
			this.addressData = {};
		}

		this.locale = "DE";
	}
} );
