<template>
  <div class="ssf-input-container">
    <label>
      <input type="checkbox" :id="name" :name="name" :value="value" class="ssf-form-control" :class="{'checked': value}"
             :required="required" :disabled="disabled" @change="$emit('change')" @input="updateValue()"
             ref="inputComponent" :checked="value">&nbsp;<span v-html="label"></span>
      <span class="slider" :class="{'checked': value}"></span>
    </label>
  </div>
</template>

<script>
    export default {
        name: "SsfInputSwitch",

        props: {
            /* COMMONS */
            name    : { type: String, required: true },
            label   : { type: String, required: false },
            value   : { required: false, default: null },
            required: { type: Boolean, required: false, default: false },

            /* INPUT */
            type    : { type: String, required: false, default: 'text' },
            disabled: { type: Boolean, required: false, default: false },
        },

        data() {
            return {
                focused: false
            }
        },

        methods: {

            isDefault() {
                let defaults = ['text']
                return defaults.includes(this.type)
            },

            updateValue() {
                this.$nextTick(() => {
                    console.log(this.$refs.inputComponent, this.value)
                    this.$emit('input', !this.value)
                })
            }
        }
    }
</script>

<style scoped>

</style>
