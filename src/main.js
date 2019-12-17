// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

import App     from './App'
// import helpers from './app/helpers'

Vue.config.productionTip = false

// Vue.prototype.helpers = helpers


new Vue({
  el    : '#app',
  render: h => h(App)
}).$mount('#app')

// import SsfFormGroup from './components/SsfFormGroup'; export default SsfFormGroup
