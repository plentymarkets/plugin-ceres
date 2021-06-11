<template>
  <div v-if="languageText" class="row py-2">
    <div class="col-sm-8">{{ languageText }}</div>
    <div class="col-sm-4 text-right">
      <a :href="languageRedirect" :class="'btn btn-sm btn-' + appearance">{{ buttonText }}</a>
      <a href="#" @click="deactivateRedirection" class="m-sm-1"><i class="fa fa-close"></i></a>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        languageText: '',
        buttonText: '',
        languageRedirect: '',
        appearance: '',
        textLanguages: ''
      }
    },
    props: ["redirect", "appearance", "langtext"],
    mounted() {
      this.initializeComponent()
    },
    methods: {
      initializeComponent() {

        this.setAppearance();
        this.setTextLanguages();

        for (let i = 0; i < window.navigator.languages.length; i++) {
          const langObject= window.navigator.languages[i].split('-')
          const linkTag = document.querySelector('link[hreflang="' + langObject[0] +'"]')

          if (App.language !== langObject[0] && linkTag) {
            if (this.$props.redirect){
              if (!window.localStorage.getItem('redirectActive')){
                window.localStorage.setItem('redirectActive', true);
                window.location.href = linkTag.getAttribute('href')
              }
            } else if (!window.localStorage.getItem('redirectDeactivated')) {
              window.localStorage.removeItem('redirectActive');
              this.setLanguage(langObject[0]);
              this.languageRedirect = linkTag.getAttribute('href')
              break;
            }
          }

        }
      },
      deactivateRedirection() {
        this.languageText = null;
        window.localStorage.setItem('redirectDeactivated', true);
      },
      setAppearance() {
        this.appearance = this.$props.appearance;
      },
      setTextLanguages() {
        this.textLanguages = this.$props.langtext
      },
      setLanguage(lang) {
        const langObj = JSON.parse(this.textLanguages);
        for (let i=0; i < langObj.length; i++){
          if (langObj[i].languageCountry === lang) {
            this.languageText = langObj[i].languageText;
            this.buttonText = langObj[i].languageButton;
            break
          }
        }
      }
    }
  }
</script>
