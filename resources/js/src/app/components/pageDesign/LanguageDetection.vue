<template>
    <div v-if="targetLang" class="d-flex py-2">
        <div class="align-self-center mr-auto">{{ texttranslations[targetLang] }}</div>

        <div class="align-self-center text-nowrap">
            <a :href="redirectUrl" :class="'btn btn-sm btn-appearance'">
                {{ buttontranslations[targetLang] }}
            </a>
            <a href="#" @click="refuseRedirect()" class="m-sm-1">
                <i class="fa fa-close"></i>
            </a>
        </div>
    </div>
</template>

<script>
import { isDefined } from "../../helper/utils";
import { navigateTo } from "../../services/UrlService";
export default {
    data() {
        return {
            redirectUrl: null,
            targetLang: null
        };
    },
    props:
    {
        autoRedirect: Boolean,
        texttranslations: {
            type: Object,
            default: () => {}
        },
        buttontranslations: {
            type: Object,
            default: () => {}
        }
    },
    mounted()
    {
        this.initializeComponent();
    },
    methods: {
        initializeComponent() {
            if (App.isShopBuilder)
            {
                this.targetLang = App.defaultLanguage;
            }
            else
            {
                window.navigator.languages.forEach((language) => {
                    // values like "de", "en"...
                    const languageAbbreviation = language.split("-")[0];
                    const redirectUrl = document
                        .querySelector(`link[hreflang="${languageAbbreviation}"]`)
                        ?.getAttribute("href");
    
                    if (App.language !== languageAbbreviation && isDefined(redirectUrl))
                    {
                        if (this.autoRedirect && !App.isShopBuilder)
                        {
                            navigateTo(redirectUrl);
                        }
                        else if (!window.localStorage.getItem("redirectDeactivated"))
                        {
                            this.targetLang = languageAbbreviation;
                            this.redirectUrl = redirectUrl;
                        }
                    }
                });
            }
        },
        refuseRedirect()
        {
            this.targetLang = null;
            window.localStorage.setItem("redirectDeactivated", true);
        }
    },
};
</script>
