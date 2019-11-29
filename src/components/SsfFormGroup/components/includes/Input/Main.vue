<template>
  <div class="ssf-input-container">
    <label :class="{active}" v-if="isDefault() && label" class="ssf-form-label" @click="onLabelClick">
      <ssf-icon :type="iconType" :icon="icon" :solid="solid" :regular="regular" :brand="brand" :light="light"
                :normal="normal" :outlined="outlined" :rounded="rounded" :filled="filled" :twoTone="twoTone"
                :sharp=sharp :fw="fw" :animated="animated" :rotate="rotate" :pull="pull" v-if="icon" class="mr-1"/>
      <span v-html="label"></span>
    </label>

    <!-- TYPE : text -->
    <input :type="type" :id="name" :name="name" :value="value" class="ssf-form-control" :class="inputClass"
           :required="required" :disabled="disabled" :placeholder="`${placeholder ? label : ''}`"
           @change="$emit('change')"
           :autocomplete="`${autocomplete ? autocomplete === true ? name : autocomplete : 'off'}`"
           @input="updateValue()" @focusin="focused = true" @focusout="focused = false" ref="inputComponent"
           v-if="isDefault()">

    <!-- TYPE : password -->
    <ssf-input-password v-else-if="type === 'password'" :name="name" :value="value" :required="required" :label="label"
                        :disabled="disabled" :placeholder="placeholder" @change="$emit('change')"
                        :autocomplete="autocomplete" @input="updateValue" ref="inputComponent"
                        :input-class="inputClass"/>

    <!-- TYPE : file -->
    <ssf-input-file v-else-if="type === 'file'" :name="name" :value="value" :required="required" :label="label"
                    :disabled="disabled" :placeholder="placeholder" @change="$emit('change')"
                    :autocomplete="autocomplete" @input="updateValue" ref="inputComponent"
                    :input-class="inputClass" :show-error="showError"/>

    <!-- TYPE : checkbox -->
    <ssf-input-checkbox v-else-if="type === 'checkbox'" :name="name" :required="required" :label="label"
                        :disabled="disabled" :value="value" @change="$emit('change')" @input="updateValue"
                        ref="inputComponent" input-class="inputClass"/>

    <!-- TYPE : date -->
    <ssf-input-date v-else-if="type === 'date'" :name="name" :required="required" :label="label"
                    :disabled="disabled" :value="value" @change="$emit('change')" @input="updateValue"
                    ref="inputComponent" :input-class="inputClass"/>

    <!-- TYPE : time -->
    <ssf-input-time v-else-if="type === 'time'" :name="name" :required="required" :label="label"
                    :disabled="disabled" :value="value" @change="$emit('change')" @input="updateValue"
                    ref="inputComponent" :input-class="inputClass"/>

    <!-- TYPE : number -->
    <ssf-input-number v-else-if="type === 'number'" :name="name" :value="value" :required="required" :label="label"
                      :disabled="disabled" :placeholder="placeholder" @change="$emit('change')" :step="step" :min="min"
                      :max="max" :autocomplete="autocomplete" @input="updateValue" ref="inputComponent"
                      :input-class="inputClass"/>

    <!-- TYPE : switch -->
    <ssf-input-switch v-else-if="type === 'switch'" :name="name" :required="required" :label="label" :value="value"
                      :disabled="disabled" @change="$emit('change')" @input="updateValue" ref="inputComponent"
                      :input-class="inputClass"/>

    <!-- TYPE : radio -->
    <ssf-input-radio v-else-if="type === 'radio'" :name="name" :required="required" :label="label" :value="value"
                     :items="items" :field="field" :disabled="disabled" @change="$emit('change')" @input="updateValue"
                     :inline="inline" ref="inputComponent" :input-class="inputClass"/>

  </div>
</template>

<script>
    import SsfInputCheckbox from "./Checkbox";
    import SsfInputDate     from "./Date/Date";
    import SsfInputFile     from "./File";
    import SsfInputNumber   from "./Number";
    import SsfInputPassword from "./Password";
    import SsfInputRadio    from "./Radio";
    import SsfInputSwitch   from "./Switch";
    import SsfInputTime     from "./Time/Time";

    import SsfIcon from 'ssf-icon'

    export default {
        name      : "SsfInput",
        components: {
            SsfInputFile,
            SsfInputTime,
            SsfInputDate,
            SsfInputNumber,
            SsfInputPassword,
            SsfInputRadio,
            SsfInputSwitch,
            SsfInputCheckbox,

            SsfIcon
        },
        props     : {
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

            /* RADIO */
            items : { type: Array, required: false },
            field : { type: String, required: false, default: null },
            inline: { type: Boolean, required: false, default: false },

            /* NUMBER */
            step: { type: Number, required: false, default: 1 },
            min : { type: Number, required: false, default: null },
            max : { type: Number, required: false, default: null },

            /* FILE */
            showError: { type: Boolean, required: false, default: true },

            /* ICONS */
            iconType: { type: String, required: false, default: 'fa' },
            iconSize: { type: String, required: false, default: '' },
            icon    : { type: String, required: false, default: null },

            /* FONT AWESOME */
            fw      : { type: Boolean, required: false, default: false },
            animated: { type: Boolean, required: false, default: false },
            rotate  : { type: String, required: false, default: '' },
            pull    : { required: false, default: false },
            // STRONG
            regular : { type: Boolean, required: false, default: false },
            solid   : { type: Boolean, required: false, default: false },
            light   : { type: Boolean, required: false, default: false },
            brand   : { type: Boolean, required: false, default: false },
            normal  : { type: Boolean, required: false, default: false },

            /* MATERIAL */
            outlined: { type: Boolean, required: false, default: true },
            rounded : { type: Boolean, required: false, default: false },
            filled  : { type: Boolean, required: false, default: false },
            twoTone : { type: Boolean, required: false, default: false },
            sharp   : { type: Boolean, required: false, default: false },
        },

        computed: {
            active() {
                return this.focused || (this.value && ((typeof this.value === "string" && this.value.trim() !== '') || typeof this.value !== "string"))
            }
        },

        data() {
            return {
                focused: false
            }
        },

        methods: {

            onLabelClick() {
                this.$nextTick(() => {
                    this.focused = true
                    this.$refs.inputComponent.focus()
                })
            },

            isDefault() {
                let defaults = ['password', 'checkbox', 'switch', 'date', 'time', 'number', 'radio', 'file']
                return !defaults.includes(this.type)
            },

            updateValue(value = null) {
                this.$nextTick(() => {
                    this.$emit('input', value === null && this.type !== 'file' ? this.$refs.inputComponent.value : value)
                })
            }
        }
    }
</script>

<style scoped>

</style>
