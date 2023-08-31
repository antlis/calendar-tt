<script setup lang="ts">
import CalendarDayEvent from './CalendarDayEvent.vue'

const WEEKEND_INDEX = [0,6]

interface IDayProps {
  id: string
  day: string
  event?: string
  description?: string
  tooltipContent?: string
  ariaLabel: string
  ariaDisabled: boolean
  styling: string
  classes: string[]
}

defineProps<IDayProps>()
</script>

<template>
  <div
    :class="[
      ...classes,
      WEEKEND_INDEX.includes(new Date(id).getDay()) && 'weekend',
      new Date(id) < new Date() && 'is-disabled'
    ]"
    :style="styling"
    :aria-label="ariaLabel"
    role="button"
    :ariaDisabled="ariaDisabled"
  >
    {{ day }}
  </div>
  <CalendarDayEvent
    v-if="event"
    :event="event"
    :description="description"
    :tooltip-content="tooltipContent"
  />
</template>

<style scoped lang="scss">
.weekend {
  color: var(--vt-c-text-soft-blue);
}
</style>
