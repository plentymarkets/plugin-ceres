<template>
  <div>language selection placeholder from vue</div>
</template>

<script>
  export default {
    mounted() {
      this.initializeComponent()
    },
    methods: {
      initializeComponent() {
        console.log('Default language:', App.defaultLanguage);
        console.log('Current language:', App.language);
        console.log('Language map:', App.languageMap);
        console.log('Browser languages:', window.navigator.languages);
      }
    }
  }
</script>
