<script setup lang="ts">
import { ref } from 'vue'
import InfoIcon from './icons/IconInfo.vue'
import { useMediaQuery } from '@vueuse/core'

const isLargeScreen = useMediaQuery('(min-width: 768px)')

interface IDayEventProps {
  event?: string
  description?: string
  tooltipContent?: string
}

const eventBox = ref(null)

function toggleDescriptionVisibility() {
  const elem = (eventBox as any)
  elem.value.classList.toggle('event--popup-visible')
}

defineProps<IDayEventProps>()
</script>

<template>
  <div
    class="event"
    @click="toggleDescriptionVisibility"
    :data-description="description"
    ref="eventBox"
  >
    <VTooltip>
      <div class="event__title">
        <span v-if="isLargeScreen">{{ event }}</span>
        <i v-else class="event__info-icon"><InfoIcon /></i>
      </div>
      <template #popper>
        <span v-if="isLargeScreen" class="event__tooltip-content">
          {{ tooltipContent }}
        </span>
        <div v-else class="event__tooltip-content">
          <div>{{ tooltipContent }}</div>
          <div>{{ event }} - {{ description }}</div>
        </div>
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
  position: realtive;

  &:after {
    content: attr(data-description);
    position: absolute;
    background: white;
    border: thin solid black;
    top: -180px;
    width: 250px;
    height: 200px;
    text-align: center;
    display: none;
  }

  &--popup-visible:after {
    display: block;
  }

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
