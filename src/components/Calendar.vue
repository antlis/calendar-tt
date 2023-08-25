<script setup lang="ts">
import { ref } from 'vue'
import datesObject from '@/calendarData.json'

const WEEKEND_INDEX = [0,6]
const LOCALE_CONFIG = {
  id: 'ru',
  firstDayOfTheWeek: 2,
  masks: { weekdays: 'WWWW' },
}
const { dates: datesRaw } = datesObject
const dates = datesRaw.map(({ date, event }) => {
  const dateObj = new Date(date)
  return {
    dates: dateObj,
    customData: {
      event,
    },
    popover: {
      label: event
    }
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
</script>

<template>
  <VCalendar
    :attributes="attrs"
    :locale="LOCALE_CONFIG"
    class="custom-calendar"
    expanded
    borderless
  >
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
      >
        {{ day.day }}
      </div>
      <div
        class="event"
        v-if="attributes?.[0]?.customData?.event"
      >
        <VTooltip>
          <div>
            {{ attributes?.[0]?.customData?.event }}
          </div>
          <template #popper>
            <span class="tooltip-content">
              {{ day.locale.monthNames[day.month - 1].toUpperCase() }}
            </span>
          </template>
        </VTooltip>
      </div>
    </template>
  </VCalendar>
</template>

<style scoped lang="scss">
// check /src/assets/custom-calendar.scss
</style>
