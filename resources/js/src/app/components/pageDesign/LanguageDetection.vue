<template>
  <div class="row py-2">
    <div class="col-md-8">{{ languageText }}</div>
    <div class="col-md-4 text-right">
      <a :href="languageRedirect" :class="'btn btn-sm btn-appearance'">{{ buttonText }}</a>
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
        textLanguages: ''
      }
    },
    props: ["redirect", "texttranslations", "buttontranslations"],
    mounted() {
      this.initializeComponent()
    },
    methods: {
      initializeComponent() {

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
              this.setText(langObject[0]);
              this.setButton(langObject[0]);
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
      setText(lang) {
        const textLangObj = JSON.parse(JSON.stringify(this.$props.texttranslations));
        this.languageText = textLangObj[lang];
      },
      setButton(lang) {
        const buttonLangObj = JSON.parse(JSON.stringify(this.$props.buttontranslations));
        this.buttonText = buttonLangObj[lang];
      }
    }
  }
</script>
