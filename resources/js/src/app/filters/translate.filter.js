import TranslationService from "../services/TranslationService";
import Vue from "vue";

Vue.filter("translate", (value, params) =>
{
    return TranslationService.translate(value, params);
});
