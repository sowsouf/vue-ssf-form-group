<template>
  <div class="ssf-input-container">
    <label v-html="label" :class="{active}" v-if="isDefault() && label"></label>

    <!-- TYPE : text -->
    <input :type="type" :id="name" :name="name" :value="value" class="ssf-form-control" :class="inputClass" :required="required"
           :disabled="disabled" :placeholder="`${placeholder ? label : ''}`" @change="$emit('change')"
           :autocomplete="`${autocomplete ? autocomplete === true ? name : autocomplete : 'off'}`"
           @input="updateValue()" @focusin="focused = true" @focusout="focused = false" ref="inputComponent"
           v-if="isDefault()">

    <!-- TYPE : password -->
    <ssf-input-password v-else-if="type === 'password'" :name="name" :value="value" :required="required" :label="label"
                        :disabled="disabled" :placeholder="placeholder" @change="$emit('change')"
                        :autocomplete="autocomplete" @input="updateValue" ref="inputComponent" :class="inputClass"/>

    <!-- TYPE : checkbox -->
    <ssf-input-checkbox v-else-if="type === 'checkbox'" :name="name" :required="required" :label="label"
                        :disabled="disabled" :value="value" @change="$emit('change')" @input="updateValue"
                        ref="inputComponent" :class="inputClass"/>

    <!-- TYPE : date -->
    <ssf-input-date v-else-if="type === 'date'" :name="name" :required="required" :label="label"
                    :disabled="disabled" :value="value" @change="$emit('change')" @input="updateValue"
                    ref="inputComponent" :class="inputClass"/>

    <!-- TYPE : time -->
    <ssf-input-time v-else-if="type === 'time'" :name="name" :required="required" :label="label"
                    :disabled="disabled" :value="value" @change="$emit('change')" @input="updateValue"
                    ref="inputComponent" :class="inputClass"/>

    <!-- TYPE : number -->
    <ssf-input-number v-else-if="type === 'number'" :name="name" :value="value" :required="required" :label="label"
                      :disabled="disabled" :placeholder="placeholder" @change="$emit('change')" :step="step" :min="min"
                      :max="max" :autocomplete="autocomplete" @input="updateValue" ref="inputComponent" :class="inputClass"/>

    <!-- TYPE : switch -->
    <ssf-input-switch v-else-if="type === 'switch'" :name="name" :required="required" :label="label" :value="value"
                      :disabled="disabled" @change="$emit('change')" @input="updateValue" ref="inputComponent" :class="inputClass"/>

    <!-- TYPE : radio -->
    <ssf-input-radio v-else-if="type === 'radio'" :name="name" :required="required" :label="label" :value="value"
                     :items="items" :field="field" :disabled="disabled" @change="$emit('change')" @input="updateValue"
                     :inline="inline" ref="inputComponent" :class="inputClass"/>

  </div>
</template>

<script>
    import SsfInputCheckbox from "./Checkbox";
    import SsfInputDate     from "./Date/Date";
    import SsfInputNumber   from "./Number";
    import SsfInputPassword from "./Password";
    import SsfInputRadio    from "./Radio";
    import SsfInputSwitch   from "./Switch";
    import SsfInputTime     from "./Time/Time";

    export default {
        name      : "SsfInput",
        components: {
            SsfInputTime,
            SsfInputDate,
            SsfInputNumber,
            SsfInputPassword,
            SsfInputRadio,
            SsfInputSwitch,
            SsfInputCheckbox
        },
        props     : {
            /* COMMONS */
            name    : { type: String, required: true },
            label   : { type: String, required: false },
            value   : { required: false, default: null },
            required: { type: Boolean, required: false, default: false },
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

            isDefault() {
                let defaults = ['text', 'email']
                return defaults.includes(this.type)
            },

            updateValue(value = null) {
                this.$nextTick(() => {
                    this.$emit('input', value === null ? this.$refs.inputComponent.value : value)
                })
            }
        }
    }
</script>

<style scoped>

</style>
