<template>
  <div class="header">
    <el-icon @click="toggle">
      <span>
        <el-icon-expand v-if="collapse"></el-icon-expand>
        <el-icon-fold v-else></el-icon-fold>
      </span>
    </el-icon>
  </div>
</template>

<script lang="ts" setup>
let props = defineProps<{
  collapse: boolean,
}>()
let emits = defineEmits(['update:collapse'])
let toggle = () => {
  emits('update:collapse', !props.collapse)
}
</script>

<style lang="scss" scoped>
.header {
  height: 60px;
  padding: 0 20px;
  display: flex;
  align-items: center;
}
</style>