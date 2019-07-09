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
        const currentBreakpoint = this.getCurrentBreakpoint();

        // set timeout to fire event at end of callstack
        setTimeout(() => { this.fireBreakpointChangedEvent(currentBreakpoint); }, 0); // eslint-disable-line
        this.oldBreakpoint = currentBreakpoint;

        window.addEventListener("resize", () =>
        {
            const currentBreakpoint = this.getCurrentBreakpoint();

            // If breakpoint changed execute functions
            if (currentBreakpoint !== this.oldBreakpoint)
            {
                this.executeFunctions();
                this.fireBreakpointChangedEvent(currentBreakpoint);
                this.oldBreakpoint = currentBreakpoint;
            }
        });
    }

    // Calculate the currently used Bootstrap Breakpoint
    getCurrentBreakpoint()
    {
        let currentBreakpoint;

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

        return currentBreakpoint;
    }

    executeFunctions()
    {
        for (const functionsToExecute of this.functionList)
        {
            functionsToExecute();
        }
    }

    fireBreakpointChangedEvent(currentBreakpoint)
    {
        const event = new CustomEvent("onBreakpointChange", { "detail": { "oldBreakpoint": this.oldBreakpoint, "breakpoint": currentBreakpoint } });

        document.dispatchEvent(event);
    }

    addFunctions(addedFunction)
    {
        this.functionList.push(addedFunction);
    }
}
