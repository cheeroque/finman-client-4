<script setup lang="ts">
const { isExpanded } = defineProps<{
  colspan?: number
  isExpanded?: boolean
}>()

const isLocalExpanded = ref(false)

watch(() => isExpanded, (value) => {
  if (value) {
    nextTick(() => {
      isLocalExpanded.value = true
    })
  } else {
    isCollapsing.value = true
    isLocalExpanded.value = false
  }
})

const isCollapsing = ref(false)

const expansionRef = useTemplateRef('expansionRef')
const expandedHeight = ref('0px')

function handleEnter() {
  expandedHeight.value = expansionRef.value?.scrollHeight
    ? `${expansionRef.value?.scrollHeight}px`
    : 'auto'
}

function handleAfterLeave() {
  isCollapsing.value = false
  expandedHeight.value = '0px'
}
</script>

<template>
  <tr
    v-if="isExpanded || isCollapsing"
    data-expansion
  >
    <td :colspan>
      <Transition
        enter-active-class="h-(--expanded-height) overflow-hidden"
        leave-from-class="h-(--expanded-height)"
        leave-active-class="h-0 overflow-hidden"
        @enter="handleEnter"
        @after-leave="handleAfterLeave"
      >
        <div
          v-show="isLocalExpanded"
          ref="expansionRef"
          class="transition-all duration-300"
          :style="{
            '--expanded-height': expandedHeight,
          }"
        >
          <slot />
        </div>
      </Transition>
    </td>
  </tr>
</template>
