let _instance = null;

export class MediaQueryHelperClass
{
    constructor()
    {
        if (!_instance)
        {
            _instance = this;
            this.initListener();
        }

        return _instance;
    }

    initListener()
    {
        this.functionList = [];
        this.oldBreakpoint = this.getCurrentBreakpoint();

        window.addEventListener("resize", () =>
        {
            const currentBreakpoint = this.getCurrentBreakpoint();

            // If breakpoint changed execute functions
            if (currentBreakpoint !== this.oldBreakpoint)
            {
                this.executeFunctions();
                this.oldBreakpoint = currentBreakpoint;
            }
        });
    }

    // Calculate the currently used Bootstrap Breakpoint
    getCurrentBreakpoint()
    {
        let currentBreakpoint;

        // FIX IE support
        if (window.matchMedia)
        {
            if (window.matchMedia("(min-width:1200px)").matches)
            {
                currentBreakpoint = "lg";
            }
            else if (window.matchMedia("(min-width:992px)").matches)
            {
                currentBreakpoint = "md";
            }
            else if (window.matchMedia("(min-width:768px)").matches)
            {
                currentBreakpoint = "sm";
            }
            else
            {
                currentBreakpoint = "xs";
            }
        }
        else
        {
            // eslint-disable-next-line no-lonely-if
            if ($(window).width() >= 1200)
            {
                currentBreakpoint = "lg";
            }
            else if ($(window).width() >= 992)
            {
                currentBreakpoint = "md";
            }
            else if ($(window).width() >= 768)
            {
                currentBreakpoint = "sm";
            }
            else
            {
                currentBreakpoint = "xs";
            }
        }

        return currentBreakpoint;
    }

    executeFunctions()
    {
        for (const functionsToExecute of this.functionList)
        {
            functionsToExecute();
        }
    }

    addFunctions(addedFunction)
    {
        this.functionList.push(addedFunction);
    }
}
