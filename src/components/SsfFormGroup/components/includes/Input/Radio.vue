<template>
  <div class="ssf-input-container">
    <label v-html="label"></label>

    <label v-for="item in items" :class="{'ssf-radio-inline': inline}" class="ssf-radio-button">
      <input type="radio" :id="name" :name="name" :value="(item[field] || item)" class="ssf-form-control"
             :class="{checked: isChecked(item, value)}" :required="required"
             :disabled="disabled" @change="$emit('change')" @input="updateValue(item)"
             ref="inputComponent" :checked="isChecked(item, value)">&nbsp;<span>{{ item[field] || item }}</span>

      <!--<li class="ssf-value-item" :class="{selected: item[field] === value}" v-if="items && field"
          v-for="item in items"
          @click.stop="onSelectedOption(item[field])">
        {{ item[field] }}
      </li>-->

    </label>
  </div>
</template>

<script>
    export default {
        name: "SsfInputRadio",

        props: {
            /* COMMONS */
            name    : { type: String, required: true },
            label   : { type: String, required: false },
            value   : { required: false, default: null },
            required: { type: Boolean, required: false, default: false },

            /* INPUT */
            type    : { type: String, required: false, default: 'text' },
            disabled: { type: Boolean, required: false, default: false },

            /* RADIO */
            items : { type: Array, required: true },
            field : { type: String, required: false, default: null },
            inline: { type: Boolean, required: false, default: false },
        },

        methods: {

            isChecked(item, value) {
                return this.field ? item[this.field] === value : item === value
            },

            updateValue(item) {
                this.$emit('input', this.field ? item[this.field] : item)
            }
        }
    }
</script>

<style scoped>

</style>
