import {isNullOrUndefined}from "../helper/utils";
import {replaceAll, capitalize}from "../helper/strings";

const TranslationService = (function($)
{

    const _translations = {};

    return {
        registerGroup: _registerGroup,
        setLocale: _setLocale,
        translate: _translate
    };

    function _registerGroup(namespace, group)
    {
        if (_translations.hasOwnProperty(namespace))
        {
            console.warn("Cannot override namespace \"" + namespace + "\"");
            return;
        }

        _translations[namespace] = {};

        if (_translations[namespace].hasOwnProperty(group))
        {
            console.warn("Cannot override group \"" + namespace + "::" + group);
            return;
        }

        _translations[namespace][group] = {};
    }

    function _setLocale(locale)
    {
        Object
            .keys(_translations)
            .forEach(namespace =>
{
                Object
                    .keys(_translations[namespace])
                    .forEach(group =>
{
                        $.ajax({
                            url: "/translations/" + namespace + "/" + group + "/" + locale,
                            method: "GET",
                            async: false,
                            success: translations =>
{
                                _translations[namespace][group] = translations;
                            },
                            error: (request, statusText, error) =>
{
                                console.error("Cannot load translation data " + namespace + "::" + group + " (" + locale + ")");
                                console.error(error);
                            }
                        });
                    });
            });
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
                    input = replaceAll(
                        input,
                        ":" + key,
                        values[key]
                    );
                    input = replaceAll(
                        input,
                        ":" + capitalize(key),
                        capitalize(values[key])
                    );
                    input = replaceAll(
                        input,
                        ":" + key.toUpperCase(),
                        values[key].toUpperCase()
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
