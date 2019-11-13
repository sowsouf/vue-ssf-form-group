<template>
  <div :class="`${row ? 'row ' : ''}${col || ''}`">
    <div :class="containerClass()">

      <ssf-select :name="name" :label="label" :required="required" :value="value" :items="optionItems"
                  :field="optionField" :optionLabel="optionLabel" @input="updateValue" :input-class="inputClass"
                  v-if="select"/>

      <ssf-input :type="type" :label="label" :name="name" :value="value" :required="required" :disabled="disabled"
                 :items="optionItems" :field="optionField" :placeholder="placeholder" :autocomplete="autocomplete"
                 :step="step" :min="min" :max="max" @input="updateValue" :inline="inline" ref="input"
                 :input-class="inputClass" :show-error="showError" v-else/>

    </div>
  </div>
</template>

<script>

    import momentTimezone from 'moment-timezone'

    import SsfInput  from "./includes/Input/Main";
    import SsfSelect from "./includes/Select";

    export default {
        name      : "SsfFormGroup",
        components: { SsfSelect, SsfInput },
        created() {
            momentTimezone.locale('fr')
        },
        props     : {
            /* CONTAINERS */
            col           : { type: String, required: false },
            row           : { type: Boolean, required: false },
            formGroupClass: { type: String, required: false, default: '' },
            icon          : { type: String, required: false, default: null },

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

            /* SELECT */
            select     : { type: Boolean, required: false, default: false },
            optionItems: { type: Array, required: false },
            optionField: { type: String, required: false, default: null },
            optionLabel: { type: String, required: false, default: null },

            /* RADIO */
            inline: { type: Boolean, required: false, default: false },

            /* NUMBER */
            step: { type: Number, required: false, default: 1 },
            min : { type: Number, required: false, default: null },
            max : { type: Number, required: false, default: null },

            /* FILE */
            showError: { type: Boolean, required: false, default: true },
        },

        /*props: [
            'title',
            'name',
            'type',
            'required',
            'model',
            'value',
            'select',
            'options',
            'optionValue',
            'optionLabel',
            'mclass',
            'error',
            'disabled',
        ],*/

        data() {
            return {
                // value: null
            }
        },

        directives: {
            focus: {
                // définition de la directive
                /*inserted(el, binding, vnode) {
                    if (vnode.context.helpers.isLabelActive(vnode.context.object, vnode.context.name))
                        el.focus()
                }*/
            }
        },

        watch: {
            /*object(value) {
                this.value = value[this.name]
            }*/
        },

        methods: {

            containerClass() {
                return `${
                    (this.type === 'checkbox' ? 'ssf-checkbox-group'
                            : this.type === 'switch' ? 'ssf-checkbox-switch'
                                : this.type === 'radio' ? 'ssf-radio-group'
                                    : 'ssf-form-group'
                    )
                } ${this.formGroupClass}`.trim()
            },

            updateValue(value) {
                if (!this.disabled) {
                    this.$emit('change')
                    this.$emit('input', value)
                }
                this.$forceUpdate()
            }
        }
    }
</script>

<style lang="scss">

  $defaultBorder: #ddd;
  $defaultBorderRadius: 4px;

  .ssf-row {
    display: -ms-flexbox;
    display: flex;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    width: 100%;
  }

  .ssf-form-group {
    position: relative;
    width: 100% !important;

    .ssf-form-control {
      font-size: 14px;
      width: 100% !important;
      padding: 14px 18px !important;
      background-color: transparent !important;
      min-height: 45px !important;
      box-sizing: border-box;
      border: 1px solid $defaultBorder;
      -webkit-border-radius: $defaultBorderRadius;
      -moz-border-radius: $defaultBorderRadius;
      border-radius: $defaultBorderRadius;

      &:focus,
      &:focus + .ssf-number-control {
        -webkit-box-shadow: none;
        -moz-box-shadow: none;
        box-shadow: none;
        border-color: #225a94;
        outline: 0;
      }

      &:-webkit-autofill,
      &:-webkit-autofill:hover,
      &:-webkit-autofill:focus,
      &:-webkit-autofill:active {
        -webkit-box-shadow: 0 0 0 0 white inset !important;
        -moz-box-shadow: 0 0 0 0 white inset !important;
        box-shadow: 0 0 0 0 white inset !important;
      }

      .is-valid {
        border-color: #6aa280;
      }

      .is-invalid {
        border-color: #d6534c;
      }
    }

    label {
      position: absolute;
      font-size: 13px !important;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      height: 100%;
      display: flex;
      align-items: center;
      padding: 0 10px;
      color: #9e9e9e;
      /*font-weight: 300;*/
      margin-left: 0 !important;
      transition: all .25s;
      z-index: -1;
    }

    .ssf-form-control:focus + label,
    label.active {
      top: -8px;
      left: inherit;
      right: inherit;
      margin-left: 15px !important;
      height: 16px !important;
      font-size: 10px !important;
      background-color: #fff;
      z-index: 1;
    }

    input.ssf-form-control, select.ssf-form-control {
      -moz-appearance: none !important;
      -webkit-appearance: none !important;
      appearance: none !important;
    }

    .ssf-form-password {
      position: relative;

      .ssf-password-toggle {
        position: absolute;
        top: 0;
        right: 10px;
        bottom: 0;
        height: 15px;
        width: 15px;
        margin-top: auto;
        margin-bottom: auto;
        cursor: pointer;

        img {
          height: 100%;
          width: 100%;
        }
      }
    }

    .ssf-form-number {
      position: relative;

      .ssf-form-control {
        padding-right: 0 !important;
        padding-left: 50px !important;
      }

      label {
        margin-left: 42px !important;
      }

      .ssf-form-control:focus + label,
      label.active {
        margin-left: 42px !important;
      }

      .ssf-number-control {
        -webkit-user-select: none;
        -moz-user-select: none;
        user-select: none;

        .control {
          position: absolute;
          top: 1px;
          bottom: 1px;
          display: flex;
          justify-content: center;
          align-items: center;
          width: 40px;
          cursor: pointer;
          background: #fff;
          transition: all .5s;

          &:hover {
            background: #000;

            &.control-more:before,
            &.control-more:after,
            &.control-less:after {
              background: #fff;
            }
          }

          &.control-more {
            right: 1px;
            border-top-right-radius: $defaultBorderRadius;
            border-bottom-right-radius: $defaultBorderRadius;
            /*<!--border-left: 1px solid $defaultBorder;-->*/

            &:before {
              height: 2px;
              width: 15px;
            }

            &:after {
              height: 15px;
              width: 2px;
            }

          }

          &.control-less {
            left: 1px;
            border-top-left-radius: $defaultBorderRadius;
            border-bottom-left-radius: $defaultBorderRadius;
            /*border-right: 1px solid $defaultBorder;*/

            &:after {
              height: 2px;
              width: 15px;
            }
          }

          &.control-more:before,
          &.control-more:after,
          &.control-less:after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            margin: auto;
            background: $defaultBorder;
          }

        }
      }

    }

  }

  .ssf-checkbox-group {

    input[type=checkbox] {

      position: relative;
      -webkit-appearance: none !important;
      border: 1px solid $defaultBorder;
      height: 20px;
      width: 20px;
      -webkit-border-radius: $defaultBorderRadius;
      -moz-border-radius: $defaultBorderRadius;
      border-radius: $defaultBorderRadius;
      cursor: pointer;
      margin-right: 10px;

      &:focus, &:active, &:hover {
        outline: 0;
        -webkit-box-shadow: none !important;
        -moz-box-shadow: none !important;
        box-shadow: none !important;
      }

      &:checked:before,
      .checked:before {
        content: '';
        top: -6px;
        left: 8px;
        position: absolute;
        height: 18px;
        width: 9px;
        border-bottom: 2px solid #0f0f0f;
        border-right: 2px solid #0f0f0f;
        transform: rotate(45deg);
      }
    }

    label {
      display: flex;
      align-items: center;
    }
  }

  .ssf-checkbox-switch {

    label {
      position: relative;
      display: flex;
      align-items: center;
    }

    input[type=checkbox] {
      height: 15px;
      width: 30px;
      border: 1px solid $defaultBorder;
      background-color: $defaultBorder;
      -webkit-appearance: none;
      -moz-appearance: none;
      border-radius: 90px;

      &:focus, &:active, &:hover {
        outline: 0;
        -webkit-box-shadow: none !important;
        -moz-box-shadow: none !important;
        box-shadow: none !important;
      }
    }

    .slider {
      content: "";
      position: absolute;
      height: 13px;
      width: 13px;
      top: 0;
      left: 5px;
      bottom: 0;
      background-color: #fff;
      margin-top: auto;
      margin-bottom: auto;
      border-radius: 50%;
      -webkit-transition: .4s;
      -o-transition: .4s;
      transition: .4s;
    }

    .slider.checked,
    input[type=checkbox]:checked + .slider.checked {
      -webkit-transform: translateX(13px);
      -ms-transform: translateX(13px);
      transform: translateX(13px);
    }

    input[type=checkbox]:checked {
      background-color: #2196F3;
      border-color: #2196F3;
    }

  }

  .ssf-radio-group {

    input[type=radio] {

      position: absolute;
      -webkit-appearance: none !important;
      -moz-appearance: none !important;
      border: 1px solid $defaultBorder;
      height: 20px;
      width: 20px;
      -webkit-border-radius: 50%;
      -moz-border-radius: 50%;
      border-radius: 50%;
      cursor: pointer;
      margin-left: -22px;
      margin-top: 0 !important;
      box-sizing: border-box !important;

      &:focus, &:active, &:hover {
        outline: 0;
        -webkit-box-shadow: none !important;
        -moz-box-shadow: none !important;
        box-shadow: none !important;
      }

      &:checked, .checked {
        border-color: #0f0f0f;
        border-width: 2px;
      }

      &:checked:before,
      .checked:before {
        content: '';
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        margin: auto;
        position: absolute;
        height: 10px;
        width: 10px;
        border-radius: 50%;
        background-color: #0f0f0f;
      }
    }

    label:not(.ssf-radio-button) {
      font-size: 13px !important;
      /*display: flex;*/
      /*align-items: center;*/
      padding: 0 10px 10px;
      color: #9e9e9e;
      display: block;
    }

    label.ssf-radio-button {
      height: 20px;
    }

    label.ssf-radio-button {
      display: flex;
      align-items: center;
      padding-left: 35px;


      &:not(.ssf-radio-inline) {
        margin-bottom: 5px;
      }

      &.ssf-radio-inline {
        display: inline-block;
        vertical-align: middle;
        min-height: 20px;
      }
    }
  }

  .ssf-form-group,
  .ssf-checkbox-group,
  .ssf-checkbox-switch,
  .ssf-radio-group {
    margin-top: 8px;
    margin-bottom: 20px;
  }

  /*

  .time-picker input.display-time {
    text-align: center;
    font-weight: 300;
    font-size: inherit;
    height: 50px !important;
    width: 100% !important;
    border-radius: 10px;
    padding: 15px !important;
    background-color: transparent !important;
  }

  .time-picker .dropdown {
    top: 100% !important;
    left: 0;
    right: 0;
    margin-left: auto;
    margin-right: auto;
    box-shadow: none !important;
    padding-bottom: 15px;
  }

  .time-picker .dropdown,
  .time-picker .dropdown .select-list {
    width: 15em !important;
    height: 20em !important;
  }

  .time-picker .dropdown ul::-webkit-scrollbar {
    display: none !important;
  }*/

</style>
