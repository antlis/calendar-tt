<script setup lang="ts">
const WEEKEND_INDEX = [0,6]

defineProps<{
  id: string
  day: string
  event: string
  ariaLabel: string
  ariaDisabled: boolean
  styling: string
  tooltipContent: string
  classes: string[]
}>()
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
  <div
    class="event"
    v-if="event"
  >
    <VTooltip>
      <div>
        {{ event }}
      </div>
      <template #popper>
        <span class="tooltip-content">
          {{ tooltipContent }}
        </span>
      </template>
    </VTooltip>
  </div>
</template>
