// for docs see https://github.com/brockpetrie/vue-moment
import TranslationService from "../services/TranslationService";
import Vue from "vue";
import dayjs from "dayjs";

const dateFilter = function()
{
    const args = Array.prototype.slice.call(arguments);
    const input = args.shift();

    let date;

    if (isNaN(new Date(input).getTime()))
    {
        return input;
    }

    if (Array.isArray(input) && typeof input[0] === "string")
    {
        // If input is array, assume we're being passed a format pattern to parse against.
        // Format pattern will accept an array of potential formats to parse against.
        // Date string should be at [0], format pattern(s) should be at [1]
        date = dayjs(input[0], input[1]);
    }
    else
    {
        // Otherwise, throw the input at moment and see what happens...
        date = dayjs(input);
    }

    if (!date.isValid())
    {
        // Log a warning if moment couldn't reconcile the input. Better than throwing an error?
        console.warn("Could not build a valid `dayjs` object from input.");
        return input;
    }

    return date.format(args.shift() || TranslationService.translate("Ceres::Template.devDateFormatMoment"));
};

Vue.filter("moment", dateFilter);
Vue.filter("date", dateFilter);
