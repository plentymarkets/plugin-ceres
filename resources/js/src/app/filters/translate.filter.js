import TranslationService from "services/TranslationService";

Vue.filter("translate", (value, params) =>
{
    return TranslationService.translate(value, params);
});
