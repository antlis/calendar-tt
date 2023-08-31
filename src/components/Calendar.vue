<script setup lang="ts">
import { ref } from 'vue'
import datesObject from '@/calendarData.json'
import CalendarDay from './CalendarDay.vue'
import { useMediaQuery } from '@vueuse/core'

const isLargeScreen = useMediaQuery('(min-width: 768px)')

const LOCALE_CONFIG = {
  id: 'ru',
  firstDayOfTheWeek: 2,
  masks: { weekdays: 'WWWW' },
}

const { dates: datesRaw } = datesObject
const dates = datesRaw.map(({ date, event, description }) => {
  const dateObj = new Date(date)
  return {
    dates: dateObj,
    customData: {
      event,
      description,
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
  <!--
    Changing key rerenders component to update locale config */ }}
    And set weekdays to WW for small screens
  -->
  <VCalendar
    :key="isLargeScreen ? 1 : 2"
    :attributes="attrs"
    :locale="isLargeScreen
      ? LOCALE_CONFIG :
      {
        ...LOCALE_CONFIG,
        ...{ masks: { weekdays: 'WW' } }
      }
    "
    class="custom-calendar"
    expanded
    borderless
  >
    <template #day-content="{ day, dayProps, attributes }">
      <!--
          Cause there is no props typings
          for v-calendar plugin it causes issues below
          so I put ignore to the next line
      -->
      <!-- @vue-ignore -->
      <CalendarDay
        :id="day.id"
        :classes="dayProps.class"
        :day="day.day"
        :styling="dayProps.style"
        :event="attributes?.[0]?.customData?.event"
        :description="attributes?.[0]?.customData?.description"
        :aria-label="dayProps['aria-label']"
        :aria-disabled="dayProps['aria-disabled']"
        :tooltip-content="day.locale.monthNames[day.month - 1].toUpperCase()"

      />
    </template>
  </VCalendar>
</template>

<style scoped lang="scss">
// Override styles should be defined globally to work
// So
// check /src/assets/custom-override.scss
</style>
