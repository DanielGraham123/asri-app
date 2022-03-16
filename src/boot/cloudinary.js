import {
  boot
} from 'quasar/wrappers'
import Cloudinary from 'cloudinary-vue';

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async ({
  Vue
}) => {
  Vue.use(Cloudinary, {
    configuration: {
      cloudName: "bilitts"
    }
  });
})
