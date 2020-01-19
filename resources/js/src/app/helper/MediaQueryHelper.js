import { safePush } from "./array";
import { isDefined } from "./utils";

let _instance = null;

export class MediaQueryHelper
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
        this.functionList = {};
        const currentBreakpoint = this.getCurrentBreakpoint();

        this.oldBreakpoint = currentBreakpoint;

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
        const currentBreakpoint = this.getCurrentBreakpoint();
        const functionsToRun = Array.prototype.concat(this.functionList[currentBreakpoint], this.functionList["all"]);

        for (const functionToExecute of functionsToRun)
        {
            if (isDefined(functionToExecute))
            {
                functionToExecute();
            }
        }
    }

    addFunction(addedFunction, breakpoints = ["all"])
    {
        for (const breakpoint of breakpoints)
        {
            this.functionList[breakpoint] = safePush(this.functionList[breakpoint], addedFunction);
        }
    }
}
