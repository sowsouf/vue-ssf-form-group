<template>
  <div class="ssf-input-container">
    <label v-html="label" :class="{active}"></label>
    <div class="ssf-select-container" @click="toggleShowItems" @dblclick="onDoubleClick">

      <div class="ssf-form-control">

        <div class="ssf-select-input-container" :class="{open: show.items}" :style="{height: ssfContainerHeight}">
          <div class="ssf-text-container" :class="{open: show.items}" ref="ssfTextContainer">
            <span v-if="value" :value="value">{{ value }}</span>
            <span v-else-if="show.items" class="ssf-select-option-title">Choisir une valeur... {{ required ? '(*)' : '' }}</span>
          </div>
          <div class="ssf-value-container">
            <ul v-show="show.items" id="ssfValueList" ref="ssfValueList">
              <li class="ssf-value-item" :class="{selected: item[field] === value}" v-if="items && field"
                  v-for="item in items"
                  @click.stop="onSelectedOption(item[field])">
                {{ item[field] }}
              </li>
              <li class="ssf-value-item" :class="{selected: item === value}" v-else-if="items" v-for="item in items"
                  @click.stop="onSelectedOption(item)">{{
                item }}
              </li>
            </ul>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "SsfSelect",

        props: {
            /* COMMONS */
            name    : { type: String, required: true },
            label   : { type: String, required: false },
            value   : { required: false, default: null },
            required: { type: Boolean, required: false, default: false },

            /* SELECT */
            items: { type: Array, required: true },
            field: { type: String, required: false, default: null },
        },

        computed: {
            active() {
                return this.focused || (this.value && ((typeof this.value === "string" && this.value.trim() !== '') || typeof this.value !== "string"))
            }
        },

        data() {
            return {
                show              : { items: false },
                ssfContainerHeight: 0,
                focused           : false
            }
        },

        mounted() {
            this.$nextTick(() => {
                this.ssfContainerHeight = this.getSsfContainerHeight()
            })
        },

        methods: {

            getSsfContainerHeight() {
                let element = this.$refs.ssfValueList
                return element && element.clientHeight > 0 ? `${element.clientHeight + this.$refs.ssfTextContainer.clientHeight}px !important` : 'inherit !important';
            },

            toggleShowItems() {
                this.show.items = !this.show.items
                this.$nextTick(() => {
                    this.ssfContainerHeight = this.getSsfContainerHeight()
                })
            },

            onSelectedOption(value) {
                this.toggleShowItems()
                this.$emit('input', value)
            },

            onDoubleClick(event) {
                event.preventDefault()
            },

            updateValue() {
                this.$nextTick(() => {
                    this.$emit('input', this.$refs.selectComponent.value)
                })
            },

        }
    }
</script>

<style scoped>

  .ssf-select-container {
    position: relative;
    cursor: pointer;
  }

  .ssf-select-input-container.open {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    -webkit-box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12) !important;
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12) !important;
    background: #FFF !important;
    z-index: 1051;
  }

  .ssf-select-input-container.open:before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    height: 100%;
    width: 100%;
    z-index: -1;
    background: transparent !important;
    cursor: default !important;
  }

  .ssf-value-container {
    /*background-color: #fff;*/
  }

  .ssf-value-container > ul {
    padding: 0 !important;
    margin: 0 !important;
  }

  .ssf-value-container li {
    list-style-type: none;
    padding: 10px;
  }

  /*.ssf-text-container {
    cursor: pointer !important;
  }*/

  .ssf-text-container.open {
    height: 50px;
    line-height: 50px;
    padding-left: 10px;
    width: 100%;
  }

  .ssf-value-item:hover {
    background: #000 !important;
    color: #FFF !important;
  }

  .ssf-value-item.selected {
    background: #ddd;
    /*color: #FFF !important;*/
  }

  .ssf-select-option-title {
    color: #ddd;
  }

  /*

 */

</style>
