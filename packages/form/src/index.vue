<template>
  <el-form ref="form" v-if="model" :validate-on-rule-change="false" :model="model" :rules="rules" v-bind="$attrs">
    <template v-for="(item, index) in options" :key="index">
      <el-form-item v-if="!item.children || !item.children!.length" :prop="item.prop" :label="item.label">
        <component v-if="item.type !== 'upload' && item.type !== 'editor'" :placeholder="item.placeholder"
          v-bind="item.attrs" :is="`el-${item.type}`" v-model="model[item.prop!]"></component>
        <el-upload v-if="item.type === 'upload'" v-bind="item.uploadAttrs" :on-preview="onPreview" :on-remove="onRemove"
          :on-success="onSuccess" :on-error="onError" :on-progress="onProgress" :on-change="onChange"
          :before-upload="beforeUpload" :before-remove="beforeRemove" :http-request="httpRequest" :on-exceed="onExceed">
          <slot name="uploadArea"></slot>
          <slot name="uploadTip"></slot>
        </el-upload>
        <div id="editor" v-if="item.type === 'editor'"></div>
      </el-form-item>
      <el-form-item v-if="item.children && item.children.length" :prop="item.prop" :label="item.label">
        <component :placeholder="item.placeholder" v-bind="item.attrs" :is="`el-${item.type}`"
          v-model="model[item.prop!]">
          <component v-for="(child, i) in item.children" :key="i" :is="`el-${child.type}`" :label="child.label"
            :value="child.value"></component>
        </component>
      </el-form-item>
    </template>
    <el-form-item>
      <slot name="action" :form="form" :model="model"></slot>
    </el-form-item>
  </el-form>
</template>

<script lang='ts' setup>
import { PropType, ref, onMounted, watch, nextTick } from 'vue'
import { FormInstance, FormOptions } from './types/types'
import cloneDeep from 'lodash/cloneDeep'
import E from "wangeditor"

let emits = defineEmits(['on-preview', 'on-remove', 'on-success', 'on-error', 'on-progress', 'on-change', 'before-upload', 'before-remove', 'on-exceed'])

let props = defineProps({
  options: {
    type: Array as PropType<FormOptions[]>,
    required: true
  },
  httpRequest: {
    type: Function
  }
})

let model = ref<any>(null)
let rules = ref<any>(null)
let form = ref<FormInstance | null>()
let edit = ref()

let initForm = () => {
  if (props.options && props.options.length) {
    let m: any = {}
    let r: any = {}
    props.options.map((item: FormOptions) => {
      m[item.prop!] = item.value
      r[item.prop!] = item.rules
      if (item.type === 'editor') {
        nextTick(() => {
          if (document.getElementById('editor')) {
            const editor = new E('#editor')
            editor.config.placeholder = item.placeholder!
            editor.create()
            editor.txt.html(item.value)
            editor.config.onchange = (newHtml: string) => {
              model.value[item.prop!] = newHtml
            }
            edit.value = editor
          }
        })
      }
    })
    model.value = cloneDeep(m)
    rules.value = cloneDeep(r)
  }
}

let resetFields = () => {
  form.value!.resetFields()
  if (props.options && props.options.length) {
    let editorItem = props.options.find(item => item.type === 'editor')!
    edit.value.txt.html(editorItem.value)
  }
}

let validate = () => {
  return form.value!.validate
}

let getFormData = () => {
  return model.value
}

defineExpose({
  resetFields,
  validate,
  getFormData
})

onMounted(() => {
  initForm()
})

watch(() => props.options, () => {
  initForm()
}, { deep: true })


let onPreview = (file: File) => {
  emits('on-preview', file)
}
let onRemove = (file: File, fileList: FileList) => {
  emits('on-remove', { file, fileList })
}
let onSuccess = (response: any, file: File, fileList: FileList) => {
  let uploadItem = props.options.find(item => item.type === 'upload')!
  model.value[uploadItem.prop!] = { response, file, fileList }
  emits('on-success', { response, file, fileList })
}
let onError = (err: any, file: File, fileList: FileList) => {
  emits('on-error', { err, file, fileList, })
}
let onProgress = (event: any, file: File, fileList: FileList) => {
  emits('on-progress', { event, file, fileList })
}
let onChange = (file: File, fileList: FileList) => {
  emits('on-change', { file, fileList })
}
let beforeUpload = (file: File) => {
  emits('before-upload', file)
}
let beforeRemove = (file: File, fileList: FileList) => {
  emits('before-remove', { file, fileList })
}
let onExceed = (files: File, fileList: FileList) => {
  emits('on-exceed', { files, fileList })
}
</script>

<style lang='scss' scoped>

</style>