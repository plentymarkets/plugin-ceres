<template>
    <div v-if="targetLang" class="d-flex py-2">
        <div class="align-self-center mr-auto">{{ textTranslations[targetLang] }}</div>

        <div class="align-self-center text-nowrap">
            <a :href="redirectUrl" :class="'btn btn-sm btn-appearance'">
                {{ buttonTranslations[targetLang] }}
            </a>
            <a href="#" @click="refuseRedirect()" class="m-sm-1">
                <i class="fa fa-close"></i>
            </a>
        </div>
    </div>
</template>

<script>
import { navigateTo } from "../../services/UrlService";
export default {
    data()
    {
        return {
            redirectUrl: null,
            targetLang: null,
            isMounted: false
        };
    },
    props:
    {
        autoRedirect: Boolean,
        textTranslations: {
            type: Object,
            default: () => {}
        },
        buttonTranslations: {
            type: Object,
            default: () => {}
        },
        languageMap: {
            type: Object,
            default: () => {}
        }
    },
    created()
    {
        // maybe not the smarted solution to prevent CLS
        this.targetLang = "en";
    },

    mounted()
    {
        this.isMounted = true;

        if (!App.isShopBuilder)
        {
            if (!window.localStorage.getItem('redirectDeactivated'))
            {
                this.initialize();
            }
            else
            {
                this.targetLang = null;
            }
        }
    },

    methods: {
        initialize()
        {
            // exclude the current language from the language list
            const browserLanguages = this.getBrowserLanguages().filter(
                (language) => language !== App.language
            );

            for (const browserLanguage of browserLanguages)
            {
                // check if the language has a mapped target language
                if (this.languageMap[browserLanguage])
                {
                    this.redirectUrl = this.getLanguageUrl(browserLanguage);

                    if (this.redirectUrl)
                    {
                        // if a redirect url was found and the auto redirect is enabled, navigate to the redirectUrl
                        if (this.autoRedirect)
                        {
                            navigateTo(this.redirectUrl);
                        }
                        else
                        {
                            this.targetLang = browserLanguage;
                        }
                        break;
                    }
                }
            }
        },

        getLanguageUrl(language)
        {
            return document
                .querySelector(`link[hreflang="${language}"]`)
                ?.getAttribute("href");
        },

        getBrowserLanguages()
        {
            return [
                ...new Set(
                    window.navigator.languages.map(
                        (language) => language.split("-")[0]
                    )
                ),
            ];
        },

        refuseRedirect()
        {
            this.targetLang = null;
            window.localStorage.setItem("redirectDeactivated", true);
        }
    },
};
</script>
