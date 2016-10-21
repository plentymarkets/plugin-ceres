Vue.component("language-select", {

    template: "#vue-language-select",

    props: [
        "currentLang"
    ],

    /**
     * Check the current language and update the country flag in the header
     */
    ready: function()
    {
        if (this.currentLang === "de")
        {
            document.getElementById("currentFlagIcon").classList.add("flag-icon-de");
        }
        else
        {
            document.getElementById("currentFlagIcon").classList.add("flag-icon-gb");
        }
    },

    methods: {
        /**
         * Change language if the flag has changed in the header
         * @param lang
         */
        languageChanged: function(lang)
        {
            if (lang === "de")
            {
                window.open(window.location.origin + "/de" + window.location.pathname, "_self");
            }
            else
            {
                window.open(window.location.origin + "/en" + window.location.pathname, "_self");
            }
        }
    }

});
