import { defaultValue, isNullOrUndefined } from "../helper/utils";
import { replaceAll, capitalize } from "../helper/strings";
import jQuery from "jquery";

const TranslationService = (function($)
{
    let _translations = {};

    // initialize translations
    if (typeof translations !== "undefined")
    {
        _translations = translations;
    }
    else
    {
        _readTranslations();
    }

    return {
        translate: _translate
    };

    function _readTranslations()
    {
        const identifierPattern = /^(\w+)::(\w+)$/;
        const tags = document.querySelectorAll("script[data-translation]");

        for (let i = 0; i < tags.length; i++)
        {
            if (!tags[i].dataset || !tags[i].dataset.translation)
            {
                continue;
            }

            const identifier = tags[i].dataset.translation;

            if (!identifier || !identifierPattern.test(identifier))
            {
                console.error("Cannot read translations from script tag. Identifier is not valid");
            }

            const match = identifierPattern.exec(identifier);
            const namespace = match[1];
            const group = match[2];

            if (!_translations.hasOwnProperty(namespace))
            {
                _translations[namespace] = {};
            }

            if (_translations[namespace].hasOwnProperty(group))
            {
                console.warn("Cannot override group \"" + namespace + "::" + group);
                continue;
            }

            try
            {
                _translations[namespace][group] = JSON.parse(tags[i].innerHTML);
            }
            catch (err)
            {
                console.error("Error while parsing translations (" + identifier + ")");
            }

        }
    }

    function _translate(key, params)
    {
        const identifier = _parseKey(key);

        if (identifier === null)
        {
            return key;
        }

        const namespace = _translations[identifier.namespace];

        if (isNullOrUndefined(namespace))
        {
            return key;
        }

        const group = namespace[identifier.group];

        if (isNullOrUndefined(group))
        {
            return key;
        }

        const value = group[identifier.key];

        if (!isNullOrUndefined(value))
        {
            return _replacePlaceholders(value, params);
        }

        return key;
    }

    function _replacePlaceholders(input, values)
    {
        values = values || {};

        Object
            .keys(values)
            .sort((keyA, keyB) => keyB.length - keyA.length)
            .forEach(
                key =>
                {
                    const value = "" + defaultValue(values[key], "");

                    input = replaceAll(
                        input,
                        ":" + key,
                        value
                    );
                    input = replaceAll(
                        input,
                        ":" + capitalize(key),
                        capitalize(value)
                    );
                    input = replaceAll(
                        input,
                        ":" + key.toUpperCase(),
                        value.toUpperCase()
                    );
                }
            );

        return input;
    }

    function _parseKey(key)
    {
        const keyPattern = /^(\w+)::(\w+)\.(\w+)$/;

        if (keyPattern.test(key))
        {
            const match = keyPattern.exec(key);

            return {
                namespace: match[1],
                group: match[2],
                key: match[3]
            };
        }

        return null;

    }
})(jQuery);

export default TranslationService;
