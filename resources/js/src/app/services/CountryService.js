module.exports = (function($)
{

    return {
        parseShippingCountries: parseShippingCountries,
        parseShippingStates   : parseShippingStates,
        translateCountryNames : translateCountryNames,
        sortCountries         : sortCountries
    };

    function parseShippingCountries(countryList, id)
    {
        var deliveryCountries = [];

        if (countryList === null)
        {
            return deliveryCountries;
        }

        for (var key in countryList)
        {
            var country     = countryList[key];
            var option      = {id: country.id, name: country.name, locale: country.isoCode2, selected: false};

            option.selected = (id === country.id);
            deliveryCountries.push(option);
        }

        return deliveryCountries;
    }

    function translateCountryNames(countryNameMap, countries)
    {
        if (countryNameMap === null)
        {
            return;
        }
        for (var id in countryNameMap)
        {
            var name = countryNameMap[id];

            for (var i = 0, len = countries.length; i < len; i++)
            {
                var country = countries[i];

                if (country.id === id)
                {
                    country.name = name;
                    break;
                }
            }
        }
    }

    function sortCountries(countries)
    {
        countries.sort(function(first, second)
        {
            if (first.name < second.name)
            {
                return -1;
            }
            if (first.name > second.name)
            {
                return 1;
            }
            return 0;
        });
    }

    function parseShippingStates(countryList, countryID)
    {
        var states      = [];

        for (var key in countryList)
        {
            var country = countryList[key];

            if (country.id === countryID)
            {
                states = country.states;
                break;
            }
        }

        return states;
    }

})(jQuery);
