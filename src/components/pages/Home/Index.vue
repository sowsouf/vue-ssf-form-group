<template>
  <div class="home">

    <h1>Welcome to homepage, do what you want</h1>

    {{ test }}

    <ssf-form-group type="hidden" name="text" v-model="test.text" :required="true" :disabled="false"
                    :placeholder="false" :autocomplete="true" label="Text input"/>

    <ssf-form-group type="text" name="text" v-model="test.text" :required="true" :disabled="false" :placeholder="false"
                    :autocomplete="true" label="Text input"/>

    <ssf-form-group type="password" name="password" v-model="test.password" :required="true" :disabled="false"
                    :placeholder="false" :autocomplete="true" label="Password input"/>

    <ssf-form-group type="checkbox" name="checkbox" v-model="test.checkbox" :required="true" :disabled="false"
                    :placeholder="false" :autocomplete="true" label="Checkbox input"/>

    <ssf-form-group type="date" name="date" v-model="test.date" col="col-12" label="Date input"/>

    <ssf-form-group type="time" name="time" v-model="test.time" col="col-12" label="Time input"/>

    <ssf-form-group type="number" name="number" v-model="test.number" col="col-12" label="Number input" :step="5"
                    :max="50"/>

    <ssf-form-group type="switch" name="switch" v-model="test.switch" :required="true" :disabled="false"
                    :placeholder="false" :autocomplete="true" label="Switch input"/>

    <ssf-form-group name="select" v-model="test.select" :select="true" :option-items="items"
                    option-field="id" col="col-12" label="Select input"/>

    <ssf-form-group type="radio" name="radio" v-model="test.radio" :option-items="items" option-field="id"
                    label="Radio input"/>

    <ssf-form-group type="radio" name="radio" v-model="test.radio" :option-items="items" option-field="id"
                    label="Radio input inline" :inline="true"/>
    <!--    <ssf-form-group type="switch" name="field" v-model="test.id" col="col-12" label="Label bidon"/>-->

  </div>
</template>

<script>

    import SsfFormGroup from "../../SsfFormGroup/";

    export default {

        name: 'Home',

        components: { SsfFormGroup },

        data() {
            return {
                test : {
                    text    : null,
                    select  : null,
                    password: null,
                    checkbox: false,
                    date    : null,
                    time    : null,
                    number  : null,
                    switch  : false,
                    radio   : null,
                    field   : null,
                    id      : null
                },
                items: [{ id: "toto" }, { id: "titi" }, { id: "tata" }]
            }
        },

        created() {
        },

        methods: {}

    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
