const Popper = require("popper.js");

Vue.component("popper", {

    delimiters: ["${", "}"],

    props: [
        "template",
        "placement"
    ],

    created()
    {
        this.$options.template = this.template;
    },

    mounted()
	{
        this.$nextTick(() =>
        {
			// eslint-disable-next-line
			this.popper = new Popper(this.$refs.popperButton, this.$refs.popperNode, {
				placement: this.placement,
				modifiers: {
					arrow: {
						element: this.$refs.popperArrow
					}
				}
			});
        });
    },

    data: function()
    {
        return {
            isVisible: false,
            popper: null
        };
    },

    methods:
    {
        togglePopper()
		{
            this.isVisible = !this.isVisible;

            this.popper.scheduleUpdate();
        }
    }
});
