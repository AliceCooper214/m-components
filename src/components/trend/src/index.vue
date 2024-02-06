<template>
  <div class="trend">
    <div class="text" :style="{ color: textColor }">
      <slot v-if="slots.default"></slot>
      <div v-else>{{ text }}</div>
    </div>
    <div class="icon">
      <component :is="`el-icon-${toLine(upIcon)}`" :style="{ color: !reverseColor ? upIconColor : '#52c41a' }"
        v-if="type === 'up'"></component>
      <component :is="`el-icon-${toLine(downIcon)}`" :style="{ color: !reverseColor ? downIconColor : '#f5222d' }"
        v-else></component>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, useSlots } from 'vue';
import { toLine } from '@/utils'

let props = defineProps({
  type: {
    type: String,
    default: 'up'
  },
  upIcon: {
    type: String,
    default: 'ArrowUp'
  },
  downIcon: {
    type: String,
    default: 'ArrowDown'
  },
  text: {
    type: String,
    default: '文字'
  },
  reverseColor: {
    type: Boolean,
    default: false
  },
  upIconColor: {
    type: String,
    default: '#f5222d'
  },
  downIconColor: {
    type: String,
    default: '#52c41a'
  },
  upTextColor: {
    type: String,
    default: 'rgb(0,0,0)'
  },
  downTextColor: {
    type: String,
    default: 'rgb(0,0,0)'
  }
})

let slots = useSlots()

let textColor = computed(() => {
  return props.type === 'up' ? props.upTextColor : props.downTextColor
})
</script>

<style lang='scss' scoped>
.trend {
  display: flex;
  align-items: center;

  .text {
    font-size: 12px;
    margin-right: 4px;
  }

  .icon {
    svg {
      width: 0.8em;
      height: 0.8em;
    }
  }
}
</style>