// import something here
import vuelidate from 'vuelidate'
// leave the export, even if you don't use it
export default ({ app, router, Vue }) => {
  // something to do
  Vue.prototype.$v = vuelidate
}