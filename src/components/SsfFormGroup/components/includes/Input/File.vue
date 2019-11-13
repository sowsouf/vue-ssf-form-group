<template>
  <div class="ssf-input-container ssf-form-file">
    <label :class="{active}" v-if="label">
      <ssf-icon :type="$parent.iconType" :icon="$parent.icon" :solid="$parent.solid" :regular="$parent.regular"
                :brand="$parent.brand" :light="$parent.light" :normal="$parent.normal" :outlined="$parent.outlined"
                :rounded="$parent.rounded" :filled="$parent.filled" :twoTone="$parent.twoTone" :sharp=$parent.sharp
                :fw="$parent.fw" :animated="$parent.animated" :rotate="$parent.rotate" :pull="$parent.pull"
                v-if="$parent.icon" class="mr-1"/>
      <span v-html="label"></span>
    </label>

    <!-- TYPE : file -->
    <input type="file" :id="name" :name="name" class="ssf-form-control" :class="inputClass" @change="onFileSelected"
           :required="required" ref="inputComponent"/>

    <div class="ssf-form-control ssf-file-selector" @click="onSelectorClick">
      <div class="file-info" v-if="file">
        {{ file.name }}&nbsp;<span class="file-size">({{ humanizeSize(file.size) }})</span>
      </div>
      <div class="selector">
        <span>Choisir un fichier...</span>
      </div>
      <div class="delete-file" @click.stop="updateValue(true)"></div>
    </div>

  </div>
</template>

<script>

    import swal from 'sweetalert2'
    import SsfIcon from 'ssf-icon'

    let config = {
        mimes: {
            pdf : 'application/pdf',
            csv : 'text/csv',
            text: 'text/plain',
            gif : 'image/gif',
            jpg : 'image/jpeg',
            png : 'image./png',
            icon: 'image/x-icon'
        }
    }

    export default {
        name : "SsfInputFile",

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
            showError : { type: Boolean, required: false, default: true },

            /* INPUT */
            type       : { type: String, required: false, default: 'text' },
            disabled   : { type: Boolean, required: false, default: false },
            placeholder: { type: Boolean, required: false, default: false },

            mimes: {
                type    : String,
                required: false,
                default : 'pdf, csv, text, gif, jpzg, png, icon'
            }
        },

        computed: {
            active() {
                return this.focused || this.file
            },
        },

        data() {
            return {
                focused: false,
                file   : null,
                options: {
                    mimes: null
                }
            }
        },

        created() {
            this.initMimes()
        },

        watch: {
            mimes() {
                this.initMimes()
            }
        },

        methods: {

            initMimes() {
                let mimes = this.mimes.split(', ')
                this.options.mimes = {}
                mimes.forEach((mime) => this.options.mimes[mime] = config.mimes[mime] || null)
            },

            onSelectorClick() {
                this.$nextTick(() => {
                    return this.$refs.inputComponent.click()
                })
            },

            onFileSelected($event) {
                let event = $event || window.event, target = event.target || event.dataTransfer,
                    file = target.files[0] || null
                return this.checkFile(file) ? (this.file = file) && this.updateValue() : this.$emit('error')
            },

            humanizeSize(size) {
                if (size / 1000 < 1000)
                    return Number((size / 1000).toFixed(1)) + ' Ko'
                if (size / 1000 / 1000 < 1000)
                    return Number((size / 1000 / 1000).toFixed(1)) + ' Mo'
                return Number((size / 1000 / 1000 / 1000).toFixed(1)) + ' Go'
            },

            updateValue(del = false) {
                if (del) {
                    this.file = null
                    this.$forceUpdate()
                }
                this.$emit('input', this.file)
            },

            checkMimeType(mime) {
                return mime && this.options.mimes
                    ? Object.keys(this.options.mimes).find(key => Array.isArray(this.options.mimes[key]) ? this.options.mimes[key].includes(mime) : this.options.mimes[key] === mime)
                        ? true
                        : this.showError ? this.showErrorMessage('mime') : false
                    : false
            },

            checkFile(file) {
                return file === null ? false : this.checkMimeType(file.type)
            },

            showErrorMessage(type) {
                let text = type === 'mime' ? "Le format de fichier n'est pas autorisé" : "Une erreur est survenue"
                return (swal.fire({ text, icon: 'error', showConfirmButton: false }) || true) && false
            }
        }
    }
</script>

<style lang="scss" scoped>

  .ssf-form-file {
    input[type=file].ssf-form-control {
      display: none;
    }

    .ssf-form-control.ssf-file-selector {
      position: relative;
      cursor: pointer;

      .file-info {
        .file-size {
          font-size: small;
          font-style: italic;
          color: #dddddd;
        }
      }

      .selector, .delete-file {
        position: absolute;
        top: 0;
        bottom: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: auto;
        margin-bottom: auto;
      }

      .selector {
        right: 0;
        width: 150px;
        color: #FFFFFF;
        border-top-right-radius: 4px;
        border-bottom-right-radius: 4px;
        background: #0f0f0f;
        font-style: italic;
      }

      .delete-file {
        right: 155px;
        width: 20px;
        height: 20px;

        &:before,
        &:after {
          content: '';
          position: absolute;
          height: 10px;
          width: 2px;
          background: #0f0f0f;
        }

        &:before {
          transform: rotate(45deg);
        }

        &:after {
          transform: rotate(-45deg);
        }

        &:hover {
          &:before, &:after {
            background: #d6534c;
          }
        }

      }
    }

  }

</style>
