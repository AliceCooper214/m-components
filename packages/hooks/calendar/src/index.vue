<template>
  <div id="calendar"></div>
</template>

<script lang="ts" setup>
import { PropType, watch, onMounted, ref } from 'vue';
import { Calendar, EventClickArg, EventContentArg } from '@fullcalendar/core'
import { EventItem } from './types';

let props = defineProps({
  local: {
    type: String,
    default: 'zh-cn'
  },
  initialView: {
    type: String,
    default: 'dayGridMonth'
  },
  buttonText: {
    type: Object,
    default: () => {
      return {
        today: '今天',
        month: '月',
        week: '周',
        day: '日',
        prevYear: '上一年',
        nextYear: '下一年',
        prev: '上一月',
        next: '下一月'
      }
    }
  },
  headerToolbar: {
    type: Object,
    default: () => {
      return {
        start: 'title',
        center: '',
        end: 'prev today next'
      }
    }
  },
  footerToolbar: {
    type: Object
  },
  events: {
    type: Array as PropType<EventItem[]>,
    default: () => []
  },
  eventContent: {
    type: Function
  }
})

let emits = defineEmits(['date-click', 'event-click'])

let calendar = ref<Calendar>()

let renderCalendar = () => {
  let el = document.getElementById('calendar')
  if (el) {
    calendar.value = new Calendar(el, {

    })
    calendar.value.render()
  }
}

watch(() => props.events, () => {
  renderCalendar()
}, { deep: true })

onMounted(() => {
  renderCalendar()
})
</script>

<style lang='scss' scoped>
svg {
  width: 1em;
  height: 1em;
}
</style>