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
            if (isDefined(this.supported))
            {
                if (!this.supported) {
                    return this.fallbackUrl;
                }
            }
            return this.url;
        }
    }
}
</script>
