<script setup lang="ts">
import { ref } from 'vue'
import datesObject from '@/calendarData.json'

const WEEKEND_INDEX = [0,6]
const { dates: datesRaw } = datesObject
const dates = datesRaw.map(({ date, event }) => {
  const dateObj = new Date(date)
  return {
    dates: dateObj,
    customData: {
      event,
    },
  }
})

const attrs = ref([
  {
    key: 'today',
    content: {
      style: {
        fontStyle: 'italic',
        color: '#45d8be'
      },
    },
    dates: new Date(),
  },
  ...dates
])

const localeConfig = {
  id: 'ru',
  firstDayOfTheWeek: 2,
  masks: { weekdays: 'WWWW' },
}

const log = (data: any) => {
  console.log(data);
}
</script>

<template>
  <VCalendar
    :attributes="attrs"
    :locale="localeConfig"
    class="custom-calendar"
    expanded
    borderless
  >
    <!-- <template v-slot:day-content="data"> -->
    <!--   <button @click="log(data)">day</button> -->
    <!-- </template> -->

    <template #day-content="{ day, dayProps, attributes }">
      <div
        :class="[
          ...dayProps.class,
          WEEKEND_INDEX.includes(new Date(day.id).getDay()) && 'weekend',
          new Date(day.id) < new Date() && 'is-disabled'
        ]"
        :style="dayProps.style"
        :aria-label="dayProps['aria-label']"
        role="button"
        :ariaDisabled="dayProps['aria-disabled']"
        @click="log(day)"
      >
        {{ day.day }}
      </div>
      <div
        class="event"
        v-if="attributes?.[0]?.customData?.event"
      >
        {{ attributes?.[0]?.customData?.event }}
      </div>
    </template>
    <!-- <template #day-popover="{ format }"> -->
    <!--   <div class="text-sm"> -->
    <!--     something -->
    <!--   </div> -->
    <!-- </template> -->
  </VCalendar>
</template>

<style scoped lang="scss">
// check /src/assets/custom-calendar.scss
</style>
