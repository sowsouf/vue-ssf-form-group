<template>
  <div class="ssf-input-container ssf-form-number">
    <label :class="{active}" v-if="label && !placeholder" @click="onLabelClick">
      <ssf-icon :type="$parent.iconType" :icon="$parent.icon" :solid="$parent.solid" :regular="$parent.regular"
                :brand="$parent.brand" :light="$parent.light" :normal="$parent.normal" :outlined="$parent.outlined"
                :rounded="$parent.rounded" :filled="$parent.filled" :twoTone="$parent.twoTone" :sharp=$parent.sharp
                :fw="$parent.fw" :animated="$parent.animated" :rotate="$parent.rotate" :pull="$parent.pull"
                v-if="$parent.icon" class="mr-1"/>
      <span v-html="label"></span>
    </label>

    <!-- TYPE : password -->
    <input type="number" :id="name" :name="name" :value="value" class="ssf-form-control" :class="inputClass"
           :step="step" :min="min" :max="max" :required="required" :disabled="disabled"
           :placeholder="`${placeholder ? label : ''}`" @change="$emit('change')" @input="updateValue"
           @focusin="focused = true" @focusout="focused = false"
           :autocomplete="`${autocomplete ? autocomplete === true ? name : autocomplete : 'off'}`" ref="inputComponent">

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

  import SsfIcon from 'ssf-icon'

  export default {
    name: "SsfInputNumber",

    components: {
      SsfIcon
    },

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

      onLabelClick() {
        this.$nextTick(() => {
          this.focused = true
          this.$refs.inputComponent.focus()
        })
      },

      format(value) {
        value = !value.includes(',') || (value).toString().split(',').length > 1 ? value : parseInt(`${value}00`)
        return (Math.round(value) === value ? parseInt(value) : parseFloat(value))
      },

      updateValue(direction = null) {
        let value = this.format((this.value).toString().replace('.', ','))
        value = Number.isNaN(value) ? Number.isNaN(this.min) ? 0 : this.min : value
        if (direction === 1 && ((this.max && value + this.step <= this.max) || !this.max))
          this.$emit('input', value + this.step)
        else if (direction === -1 && ((this.min && value - this.step >= this.min) || !this.min))
          this.$emit('input', value - this.step)
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
