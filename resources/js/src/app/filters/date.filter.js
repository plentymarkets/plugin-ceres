// for docs see https://github.com/brockpetrie/vue-moment
import TranslationService from "services/TranslationService";

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
        date = moment(string = input[0], formats = input[1], true);
    }
    else
    {
        // Otherwise, throw the input at moment and see what happens...
        date = moment(input);
    }

    if (!date.isValid())
    {
        // Log a warning if moment couldn't reconcile the input. Better than throwing an error?
        console.warn("Could not build a valid `moment` object from input.");
        return input;
    }

    function parse()
    {
        const args = Array.prototype.slice.call(arguments);
        const method = args.shift();

        switch (method)
        {
        case "add":

            // Mutates the original moment by adding time.
            // http://momentjs.com/docs/#/manipulating/add/

            var addends = args.shift()
                .split(",")
                .map(Function.prototype.call, String.prototype.trim);

            obj = {};
            for (let aId = 0; aId < addends.length; aId++)
            {
                const addend = addends[aId].split(" ");

                obj[addend[1]] = addend[0];
            }
            date = date.add(obj);
            break;

        case "subtract":

            // Mutates the original moment by subtracting time.
            // http://momentjs.com/docs/#/manipulating/subtract/

            var subtrahends = args.shift()
                .split(",")
                .map(Function.prototype.call, String.prototype.trim);

            obj = {};
            for (let sId = 0; sId < subtrahends.length; sId++)
            {
                const subtrahend = subtrahends[sId].split(" ");

                obj[subtrahend[1]] = subtrahend[0];
            }
            date = date.subtract(obj);
            break;

        case "from":

            // Display a moment in relative time, either from now or from a specified date.
            // http://momentjs.com/docs/#/displaying/fromnow/

            var from = "now";

            if (args[0] === "now") args.shift();

            if (moment(args[0]).isValid())
            {
                // If valid, assume it is a date we want the output computed against.
                from = moment(args.shift());
            }

            var removeSuffix = false;

            if (args[0] === true)
            {
                args.shift();
                removeSuffix = true;

            }

            if (from != "now")
            {
                date = date.from(from, removeSuffix);
                break;
            }

            date = date.fromNow(removeSuffix);
            break;

        case "calendar":

            // Formats a date with different strings depending on how close to a certain date (today by default) the date is.
            // http://momentjs.com/docs/#/displaying/calendar-time/

            var referenceTime = moment();

            if (moment(args[0]).isValid())
            {
                // If valid, assume it is a date we want the output computed against.
                referenceTime = moment(args.shift());
            }

            date = date.calendar(referenceTime);
            break;

        default:
            // Format
            // Formats a date by taking a string of tokens and replacing them with their corresponding values.
            // http://momentjs.com/docs/#/displaying/format/

            var format = method || TranslationService.translate("Ceres::Template.devDateFormatMoment");

            date = date.format(format);
        }

        if (args.length) parse.apply(parse, args);
    }

    parse.apply(parse, args);

    return date;
};

Vue.filter("moment", dateFilter);
Vue.filter("date", dateFilter);
