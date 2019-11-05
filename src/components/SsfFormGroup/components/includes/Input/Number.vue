<template>
  <div class="ssf-input-container ssf-form-number">
    <label v-html="label" :class="{active}" v-if="label"></label>

    <!-- TYPE : password -->
    <input type="number" :id="name" :name="name" :value="value" class="ssf-form-control" :step="step" :min="min"
           :max="max" :required="required" :disabled="disabled" :placeholder="`${placeholder ? label : ''}`"
           @change="$emit('change')" @input="updateValue" @focusin="focused = true" @focusout="focused = false"
           :autocomplete="`${autocomplete ? autocomplete === true ? name : autocomplete : 'off'}`"
           ref="inputComponent">

    <div class="ssf-number-control">
      <div class="control control-more" @click="updateValue(1)">
        <span></span>
      </div>
      <div class="control control-less" @click="updateValue(-1)">
        <span></span>
      </div>
    </div>

  </div>
</template>

<script>

    export default {
        name : "SsfInputNumber",
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
            step        : { type: Number, required: false, default: 1 },
            min         : { type: Number, required: false, default: null },
            max         : { type: Number, required: false, default: null },

        },

        computed: {
            active() {
                return this.focused || this.value || this.formatted === 0
            },

            formatted() {
                return this.format(this.value)
            }
        },

        data() {
            return {
                focused: false,
            }
        },

        methods: {

            format(value) {
                return (Math.round(value) === value ? parseInt(value) : parseFloat(value))
            },

            updateValue(direction = null) {
                if (direction === 1 && ((this.max && this.value + this.step <= this.max) || !this.max))
                    this.$emit('input', this.value + this.step)
                else if (direction === -1 && ((this.min && this.value - this.step >= this.min) || !this.min))
                    this.$emit('input', this.value - this.step)
                else
                    this.$nextTick(() => {
                        this.$emit('input', this.format(this.$refs.inputComponent.value))
                    })
            }
        }
    }
</script>

<style scoped>

</style>
