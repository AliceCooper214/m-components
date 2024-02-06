<template>
  <el-menu class="el-menu-vertical-demo" :default-active="defaultActive" :router="router" v-bind="$attrs">
    <template v-for="(item, i) in data" :key="i">
      <el-menu-item v-if="!item[children] || !item[children].length" :index="item[index]">
        <component v-if="item[icon]" :is="`el-icon-${toLine(item[icon])}`"></component>
        <span>{{ item[name] }}</span>
      </el-menu-item>
      <el-sub-menu v-if="item[children] && item[children].length" :index="item[index]">
        <template #title>
          <component v-if="item[icon]" :is="`el-icon-${toLine(item[icon])}`"></component>
          <span>{{ item[name] }}</span>
        </template>
        <el-menu-item v-for="(item1, index1) in item[children]" :key="index1" :index="item1.index">
          <component v-if="item1[icon]" :is="`el-icon-${toLine(item1[icon])}`"></component>
          <span>{{ item1[name] }}</span>
        </el-menu-item>
      </el-sub-menu>
    </template>
  </el-menu>
</template>

<script lang="ts" setup>
import { toLine } from '@/utils';
import { PropType } from 'vue';

defineProps({
  data: {
    type: Array as PropType<any[]>,
    required: true
  },
  defaultActive: {
    type: String,
    default: ''
  },
  router: {
    type: Boolean,
    default: false
  },
  name: {
    type: String,
    default: 'name'
  },
  index: {
    type: String,
    default: 'index'
  },
  icon: {
    type: String,
    default: 'icon'
  },
  children: {
    type: String,
    default: 'children'
  },
})
</script>

<style lang="scss" scoped>
svg {
  margin-right: 4px;
  width: 1em;
  height: 1em;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
}
</style>