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
                currentBreakpoint = "xl";
            }
            else if (window.matchMedia("(min-width:992px)").matches)
            {
                currentBreakpoint = "lg";
            }
            else if (window.matchMedia("(min-width:768px)").matches)
            {
                currentBreakpoint = "md";
            }
            else if (window.matchMedia("(min-width:576px)").matches)
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
            if (document.documentElement.clientWidth >= 1200)
            {
                currentBreakpoint = "xl";
            }
            else if (document.documentElement.clientWidth >= 992)
            {
                currentBreakpoint = "lg";
            }
            else if (document.documentElement.clientWidth >= 768)
            {
                currentBreakpoint = "md";
            }
            else if (document.documentElement.clientWidth >= 576)
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
