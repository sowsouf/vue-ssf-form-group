<template>
  <div class="ssf-input-container">
    <label v-html="label" :class="{active}" v-if="label"></label>
    <div class="ssf-date-container" @click="toggleShowItems" @dblclick="onDoubleClick">
      <div class="ssf-form-control">
        <div class="ssf-text-container" ref="ssfTextContainer">
          <span v-if="value" :value="value">{{ value }}</span>
        </div>
        <div class="ssf-date-input-container" :class="{open: show.items}" :style="{height: ssfContainerHeight}">
          <ssf-calendar ref="calendarContainer" :value="value ? helpers.moment(value, format).format('YYYY-MM-DD') : null"
                        v-show="show.items" @selected="onSelected" @click.stop="removeEvent"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

    import SsfCalendar from "./Calendar";

    export default {
        name: "SsfInputDate",

        components: {
            SsfCalendar,
        },

        props: {
            /* COMMONS */
            name    : { type: String, required: true },
            label   : { type: String, required: false },
            value   : { required: false, default: null },
            required: { type: Boolean, required: false, default: false },

            /* DATE */
            format: { type: String, required: false, default: 'DD/MM/YYYY' },
        },

        data() {
            return {
                show              : { items: false },
                ssfContainerHeight: 0,
                focused           : false
            }
        },

        created() {
        },

        mounted() {
            this.$nextTick(() => {
                this.ssfContainerHeight = this.getSsfContainerHeight()
            })
        },

        computed: {
            active() {
                return this.focused || (this.value && ((typeof this.value === "string" && this.value.trim() !== '') || typeof this.value !== "string"))
            }
        },

        methods: {

            removeEvent(event) {
                console.log("yiiiiih")
                event.preventDefault()
            },

            getSsfContainerHeight() {
                let element = this.$refs.calendarContainer.$el
                return element && element.offsetHeight > 0 ? `${element.offsetHeight}px !important` : 'inherit !important';
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

            onSelected(date) {
                this.toggleShowItems()
                this.$emit('input', date.format(this.format))
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

<style lang="scss">

  .ssf-date-container {
    position: relative;
    cursor: pointer;
  }

  .ssf-date-input-container.open {
    position: absolute;
    top: 44px;
    left: 0;
    /*right: 0;*/
    bottom: 0;
    /*-webkit-box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12) !important;*/
    /*box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12) !important;*/
    background: #FFF !important;
    z-index: 1051;
  }

  .ssf-date-input-container.open:before {
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

  .ssf-date-option-title {
    color: #ddd;
  }

</style>

