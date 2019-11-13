<template>
  <div class="ssf-input-container">
    <label :class="{active}" v-if="label">
      <ssf-icon :type="$parent.iconType" :icon="$parent.icon" :solid="$parent.solid" :regular="$parent.regular"
                :brand="$parent.brand" :light="$parent.light" :normal="$parent.normal" :outlined="$parent.outlined"
                :rounded="$parent.rounded" :filled="$parent.filled" :twoTone="$parent.twoTone" :sharp=$parent.sharp
                :fw="$parent.fw" :animated="$parent.animated" :rotate="$parent.rotate" :pull="$parent.pull"
                v-if="$parent.icon" class="mr-1"/>
      <span v-html="label"></span>
    </label>
    <div class="ssf-date-container" @click="toggleShowItems">
      <div class="ssf-form-control" :class="inputClass">
        <div class="ssf-text-container" ref="ssfTextContainer">
          <span v-if="value" :value="value">{{ value }}</span>
        </div>
        <div class="ssf-date-input-container" :class="{open: show.items}" :style="{height: ssfContainerHeight}">
          <ssf-clock ref="clockContainer" :value="value" v-show="show.items" @selected="onSelected"
                     @click.stop="removeEvent"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

    import SsfClock from "./Clock";

    export default {
        name: "SsfInputTime",

        components: {
            SsfClock,
        },

        props: {
            /* COMMONS */
            name      : { type: String, required: true },
            label     : { type: String, required: false },
            value     : { required: false, default: null },
            required  : { type: Boolean, required: false, default: false },
            inputClass: { type: String, required: false, default: '' },
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

        computed: {
            active() {
                return this.focused || (this.value && ((typeof this.value === "string" && this.value.trim() !== '') || typeof this.value !== "string"))
            }
        },

        methods: {

            removeEvent(event) {
                event.preventDefault()
            },

            getSsfContainerHeight() {
                let element = this.$refs.clockContainer.$el
                return element && element.offsetHeight > 0 ? `${element.offsetHeight}px !important` : 'inherit !important';
            },

            toggleShowItems() {
                this.show.items = !this.show.items
                this.$nextTick(() => {
                    this.ssfContainerHeight = this.getSsfContainerHeight()
                })
            },

            onSelected(time) {
                this.$emit('input', time)
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
    top: 45px;
    left: 0;
    bottom: 0;
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

  .ssf-value-container > ul {
    padding: 0 !important;
    margin: 0 !important;
  }

  .ssf-value-container li {
    list-style-type: none;
    padding: 10px;
  }

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
  }

  .ssf-date-option-title {
    color: #ddd;
  }

</style>

