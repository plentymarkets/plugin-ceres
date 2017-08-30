Vue.directive("waiting-animation", {
    bind()
	{
        this.el.firstRendering = true;
        this.el.initialClass = this.el.className;
    },

    update(value)
	{
        if (this.el.firstRendering)
		{
            this.el.firstRendering = false;
            return;
        }
        if (value)
		{
            this.el.className = "";
            this.el.className = "fa fa-circle-o-notch fa-spin";

            if (this.el.initialClass.includes("fa-lg"))
			{
                this.el.className += " fa-lg";
            }
        }
        else
		{
            this.el.className = this.el.initialClass;
        }
    }
});
