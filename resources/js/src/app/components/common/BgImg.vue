<template>
  <div :class="pictureClass"  :style="{ backgroundImage: 'url(' + backgroundSource + ')' }">
  </div>
</template>

<script>
import { detectWebP } from "../../helper/featureDetect";
import { isDefined } from '../../helper/utils';

export default {


    props:
    {
        url: '',
        fallbackUrl: '',
        pictureClass: ''
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
            if(isDefined(this.supported))
            {
                 if(this.supported && this.url && this.mimeType){
                    return this.url;
                } else {
                    return this.fallbackUrl;
                }
            }
            return '';
        },

        /**
         * Check if url points to a .webp image and return appropriate mime-type
         */
        mimeType() {
            const matches = this.url.match(/.?(\.\w+)(?:$|\?)/);

            if(matches)
            {
                return matches[1] === ".webp" ? "image/webp" : null;
            }

            return null;
        }
    }
}
</script>