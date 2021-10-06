<template>
  <div :class="pictureClass"  :style="backgroundSource">
  </div>
</template>

<script>
import { detectWebP } from "../../helper/featureDetect";
import { isDefined } from "../../helper/utils";

export default {
    props:
    {
        url: "",
        fallbackUrl: "",
        pictureClass: ""
    },
    data(){
        return {
            supported: undefined
        }
    },
    beforeMount()
    {
        detectWebP(((supported) =>
        {
            this.supported = supported;
        }));
    },
    computed: {
        /**
         *  Determine appropriate image url to use as background source
         */
        backgroundSource() {
            if (!this.url)
            {
                return null;
            }
            if (isDefined(this.supported))
            {
                if (!this.supported && this.fallbackUrl?.length) {
                    return { backgroundImage: 'url(' + this.fallbackUrl + ')' };
                }
            }
            return { backgroundImage: 'url(' + this.url + ')' };
        }
    }
}
</script>
