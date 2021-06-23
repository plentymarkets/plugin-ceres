<template>
    <div v-if="targetLang" class="d-flex py-2">
        <div class="align-self-center mr-auto">{{ textTranslations[targetLang] }}</div>

        <div class="align-self-center text-nowrap">
            <a :href="redirectUrl" :class="'btn btn-sm btn-appearance'">
                {{ buttonTranslations[targetLang] }}
            </a>
            <a href="#" @click="refuseRedirect()" class="m-sm-1">
                <i class="fa fa-fw fa-close"></i>
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
            targetLang: null
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

    computed:
    {
        browserLanguages()
        {
            if (!window)
            {
                return [];
            }

            return [
                ...new Set(
                    window.navigator.languages.map(
                        (language) => language.split("-")[0]
                    )
                ),
            ];
        },
    },

    mounted()
    {
        if (!App.isShopBuilder)
        {
            if (!window.localStorage.getItem('redirectDeactivated'))
            {
                this.initialize();
            }
        }
    },

    methods: {
        initialize()
        {
            for (const browserLanguage of this.browserLanguages())
            {
                // exclude current language and check if the language has a mapped target language
                if (browserLanguage !== App.language && this.languageMap[browserLanguage])
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

        refuseRedirect()
        {
            this.targetLang = null;
            window.localStorage.setItem("redirectDeactivated", true);
        }
    },
};
</script>
