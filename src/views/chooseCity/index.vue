<template>
  <m-choose-city @changeCity="changeCity" @changeProvince="changeProvince"></m-choose-city>
</template>

<script lang="ts" setup>
const changeProvince = (val: string) => {
  console.log(val);
}

const changeCity = (val: string) => {
  console.log(val);
}
</script>

<style lang="scss" scoped>

</style>