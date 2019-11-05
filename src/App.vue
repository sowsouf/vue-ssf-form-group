<template>
  <div id="app">

    <home/>

  </div>
</template>

<script>

    import SsfFormGroup from "./components/SsfFormGroup/components/Main";
    import Home         from './components/pages/Home/Index'

    export default {
        name: 'App',

        components: {
            Home,
            SsfFormGroup,
        },

        created() {
        },

        data() {
            return {}
        },

        methods: {}
    }
</script>

<style>
  #app {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  /*.container-fluid {
    -webkit-transition: width .3s, margin-left .3s;
    -moz-transition: width .3s, margin-left .3s;
    -ms-transition: width .3s, margin-left .3s;
    -o-transition: width .3s, margin-left .3s;
    transition: width .3s, margin-left .3s;
  }

  .container-fluid.almost-full-width {
    width: calc(100% - 50px);
  }

  .navbar-logo {
    height: 50px;
  }

  .v-sidebar-menu {
    z-index: 111
  }

  .v-sidebar-menu .vsm-arrow:after,
  .v-sidebar-menu .collapse-btn:after {
    font-family: "Font Awesome 5 Pro", sans-serif;
  }

  .v-sidebar-menu .collapse-btn {
    !*color: #001529 !important;*!
    background-color: #EBC8B2 !important;
    outline: 0 !important;
  }

  .v-sidebar-menu .vsm-item > .vsm-link > .vsm-icon {
    background-color: transparent !important;
  }

  .v-sidebar-menu.vsm-collapsed .vsm-item.active-item > .vsm-link > .vsm-title,
  .v-sidebar-menu.vsm-collapsed .vsm-item.active-item > .vsm-link > .vsm-icon,
  .v-sidebar-menu .vsm-item:not(.active-item) > .vsm-link > .vsm-title,
  .v-sidebar-menu .vsm-item:not(.active-item) > .vsm-link > .vsm-icon {
    color: #EBC8B2 !important;
  }

  .v-sidebar-menu .vsm-item:hover,
  .v-sidebar-menu .vsm-item:hover {
    background-color: #fff !important;
  }

  .v-sidebar-menu .vsm-item.first-item.active-item > .vsm-link, .v-sidebar-menu .vsm-item.first-item.parent-active-item > .vsm-link {
    -webkit-box-shadow: inset 3px 0 0 0 #EBC8B2;
    -moz-box-shadow: inset 3px 0 0 0 #EBC8B2;
    box-shadow: inset 3px 0 0 0 #EBC8B2;
  }

  .v-sidebar-menu:not(.vsm-collapsed) .vsm-item.first-item.active-item {
    background-color: #EBC8B2 !important;
  }

  .v-sidebar-menu .vsm-mobile-bg {
    background-color: #EBC8B2 !important;
  }

  .v-sidebar-menu .vsm-item.mobile-item {
    display: none !important;
  }*/

</style>
