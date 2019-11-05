<template>
  <div class="ssf-input-container ssf-form-password">
    <label v-html="label" :class="{active}" v-if="label"></label>

    <!-- TYPE : password -->
    <input :type="inputType" :id="name" :name="name" :value="value" class="ssf-form-control"
           :required="required" :disabled="disabled" :placeholder="`${placeholder ? label : ''}`"
           @change="$emit('change')" @input="updateValue()" @focusin="focused = true" @focusout="focused = false"
           :autocomplete="`${autocomplete ? autocomplete === true ? name : autocomplete : 'off'}`"
           ref="inputComponent">

    <span class="ssf-password-toggle" @click="toggleShow">
      <img src="@/assets/img/eye.png" alt="Eye" v-if="!show">
      <img src="@/assets/img/eye-slash.png" alt="Eye slash" v-if="show">
    </span>

  </div>
</template>

<script>

    export default {
        name : "SsfInputPassword",
        props: {
            /* COMMONS */
            name    : { type: String, required: true },
            label   : { type: String, required: false },
            value   : { required: false, default: null },
            required: { type: Boolean, required: false, default: false },

            /* INPUT */
            type        : { type: String, required: false, default: 'text' },
            disabled    : { type: Boolean, required: false, default: false },
            placeholder : { type: Boolean, required: false, default: false },
            autocomplete: { required: false, default: false },

        },

        computed: {
            active() {
                return this.focused || (this.value && ((typeof this.value === "string" && this.value.trim() !== '') || typeof this.value !== "string"))
            }
        },

        data() {
            return {
                focused  : false,
                show     : false,
                inputType: 'password'
            }
        },

        methods: {

            toggleShow() {
                this.show = !this.show
                this.inputType = this.show ? 'text' : 'password'
            },

            updateValue() {
                this.$nextTick(() => {
                    this.$emit('input', this.$refs.inputComponent.value)
                })
            }
        }
    }
</script>

<style scoped>

</style>
