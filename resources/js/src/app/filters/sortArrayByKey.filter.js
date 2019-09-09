import Vue from "vue";
import { sortByKey } from "../helper/array";

Vue.filter("sortArrayByKey", (array, key, desc) =>
{
    return sortByKey(array, key, desc);
});
