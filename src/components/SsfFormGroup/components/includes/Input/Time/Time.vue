<template>
  <div class="ssf-input-container ssf-form-time">

    <input-label :label="parent.label" :placeholder="placeholder" :icon="icon" @label-click="onLabelClick"
                 key="time-label"/>

    <div class="ssf-time-container" @click="toggleShowItems">
      <div class="ssf-form-control" :class="parent.inputClass">
        <div class="ssf-text-container" ref="ssfTextContainer">
          <span v-if="parent.value" :value="parent.value">{{ parent.value }}</span>
        </div>
        <div class="ssf-time-input-container" :class="{open: show.items}" :style="{height: ssfContainerHeight}">
          <ssf-clock ref="clockContainer" :value="parent.value" v-show="show.items" @selected="onSelected"
                     @click.stop="removeEvent"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  import SsfClock   from "@/components/SsfFormGroup/components/includes/Input/Time/Clock";
  import InputLabel from "../includes/InputLabel";

  export default {
    name: "SsfInputTime",

    components: { SsfClock, InputLabel },

    props: {},

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

      icon() {
        return this.parent.$data.options.icon
      },

      parent() {
        return this.$parent
      },

      placeholder() {
        let placeholder = this.parent.placeholder, label = this.parent.label;
        return (placeholder === true) ? label : (typeof placeholder).toLowerCase() === 'string' ? placeholder : ''
      },

      autocomplete() {
        let autocomplete = this.parent.autocomplete;
        return `${autocomplete ? autocomplete === true ? this.parent.name : autocomplete : ''}`
      }
    },

    methods: {

      onLabelClick() {
        this.$nextTick(() => {
          this.focused = true;
          this.toggleShowItems();
          this.$forceUpdate()
        })
      },

      removeEvent(event) {
        event.preventDefault()
      },

      getSsfContainerHeight() {
        let element = this.$refs.clockContainer.$el;
        return element && element.offsetHeight > 0 ? `${element.offsetHeight}px` : 'inherit';
      },

      toggleShowItems() {
        this.show.items = !this.show.items;
        this.$nextTick(() => {
          this.ssfContainerHeight = this.getSsfContainerHeight()
        })
      },

      onSelected(time) {
        this.$emit('input', time)
      },

      onInput() {
        this.$nextTick(() => {
          this.$emit('input', this.$refs.inputComponent.value)
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .ssf-time-container {
    position: relative;
    cursor: pointer;

    .ssf-time-input-container {
      &.open {
        position: absolute;
        top: 45px;
        left: 0;
        bottom: 0;
        background: #FFF;
        z-index: 1051;

        &:before {
          content: '';
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          height: 100%;
          width: 100%;
          z-index: -1;
          background: transparent;
          cursor: default;
        }
      }
    }

    .ssf-value-container {
      & > ul {
        padding: 0;
        margin: 0;
      }

      li {
        list-style-type: none;
        padding: 10px;
      }
    }

    .ssf-text-container.open {
      height: 50px;
      line-height: 50px;
      padding-left: 10px;
      width: 100%;
    }

    .ssf-value-item:hover {
      background: #000;
      color: #FFF;
    }

    .ssf-value-item.selected {
      background: #ddd;
    }

    .ssf-time-option-title {
      color: #ddd;
    }
  }
</style>
