<template>
  <div class="ssf-input-container ssf-form-password">
    <label :class="{active}" v-if="label  && !placeholder" @click="onLabelClick">
      <ssf-icon :type="$parent.iconType" :icon="$parent.icon" :solid="$parent.solid" :regular="$parent.regular"
                :brand="$parent.brand" :light="$parent.light" :normal="$parent.normal" :outlined="$parent.outlined"
                :rounded="$parent.rounded" :filled="$parent.filled" :twoTone="$parent.twoTone" :sharp=$parent.sharp
                :fw="$parent.fw" :animated="$parent.animated" :rotate="$parent.rotate" :pull="$parent.pull"
                v-if="$parent.icon" class="mr-1"/>
      <span v-html="label"></span>
    </label>

    <!-- TYPE : password -->
    <input :type="inputType" :id="name" :name="name" :value="value" class="ssf-form-control" :class="inputClass"
           :required="required" :disabled="disabled" :placeholder="`${placeholder ? label : ''}`"
           @change="$emit('change')" @input="updateValue()" @focusin="focused = true" @focusout="focused = false"
           :autocomplete="`${autocomplete ? autocomplete === true ? name : autocomplete : 'off'}`"
           ref="inputComponent">

    <span class="ssf-password-toggle" @click="toggleShow">
      <ssf-icon icon="eye" :solid="true" v-if="!show"/>
      <ssf-icon icon="eye-slash" :solid="true" v-if="show"/>
    </span>

  </div>
</template>

<script>

    import SsfIcon from 'ssf-icon'

    export default {
        name: "SsfInputPassword",

        components: { SsfIcon },

        props: {
            /* COMMONS */
            name      : { type: String, required: true },
            label     : { type: String, required: false },
            value     : { required: false, default: null },
            required  : { type: Boolean, required: false, default: false },
            inputClass: { type: String, required: false, default: '' },

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

            onLabelClick() {
                this.$nextTick(() => {
                    this.focused = true
                    this.$refs.inputComponent.focus()
                })
            },

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
