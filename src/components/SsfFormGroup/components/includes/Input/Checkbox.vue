<template>
  <div class="ssf-input-container">
    <label>
      <input type="checkbox" :id="name" :name="name" :value="value" class="ssf-form-control" :class="{'checked': value}"
             :required="required" :disabled="disabled" @change="$emit('change')" @input="updateValue()"
             ref="inputComponent" :checked="value">&nbsp;
      <span v-if="label">
        <ssf-icon :type="$parent.iconType" :icon="$parent.icon" :solid="$parent.solid" :regular="$parent.regular"
                  :brand="$parent.brand" :light="$parent.light" :normal="$parent.normal" :outlined="$parent.outlined"
                  :rounded="$parent.rounded" :filled="$parent.filled" :twoTone="$parent.twoTone" :sharp=$parent.sharp
                  :fw="$parent.fw" :animated="$parent.animated" :rotate="$parent.rotate" :pull="$parent.pull"
                  v-if="$parent.icon" class="mr-1"/>
        <span v-html="label"></span>
    </span>
    </label>
  </div>
</template>

<script>

    import SsfIcon from 'ssf-icon'

    export default {
        name: "SsfInputCheckbox",

        components: {
            SsfIcon
        },

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

        methods: {

            updateValue() {
                this.$nextTick(() => {
                    this.$emit('input', !this.value)
                })
            }
        }
    }
</script>

<style scoped>

</style>
