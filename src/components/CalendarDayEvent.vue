<script setup lang="ts">
import InfoIcon from './icons/IconInfo.vue'
import { useMediaQuery } from '@vueuse/core'

const isLargeScreen = useMediaQuery('(min-width: 768px)')

interface IDayEventProps {
  event?: string
  tooltipContent?: string
}

defineProps<IDayEventProps>()
</script>

<template>
  <div class="event">
    <VTooltip>
      <div class="event__title">
        <span v-if="isLargeScreen">{{ event }}</span>
        <i v-else class="event__info-icon"><InfoIcon /></i>
      </div>
      <template #popper>
        <span class="event__tooltip-content">
          {{ tooltipContent }}
        </span>
      </template>
    </VTooltip>
  </div>
</template>

<style scoped lang="scss">
.event {
  cursor: pointer;
  margin: 0 3%;
  background: var(--vt-c-soft-pink);
  font-size: 26px;
  @media (max-width: 1850px) {
    font-size: 1vw;
  }

  &__title {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    @media (max-width: 768px) {
      text-align: center;
    }
  }

  &__info-icon, &__info-icon svg {
    width: 18px;
    height: 18px;
  }

}
</style>
