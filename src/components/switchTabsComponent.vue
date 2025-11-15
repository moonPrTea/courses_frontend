<script setup lang="ts">
import type {SwitchTabsProperties} from "@/interfaces/tabs.ts";
import {ref, computed, watch} from "vue";

const props = withDefaults(defineProps<SwitchTabsProperties>(), {
  currentIndex: 0
})

const currentIndex = ref(props.currentIndex);
const countTabs = computed(() => props.tabs.length);

const changeIndex = (index: number) => {
  currentIndex.value = index;
}

const emit = defineEmits<{
  (e: 'tab-change', index: number): void
}>()

watch(currentIndex, (newIndex: number) => {
  emit('tab-change', newIndex)
})

</script>

<template>
  <div
    class="switch-tabs"
    :class="[`consist-${countTabs}-tabs`, `is-active-${currentIndex}`]"
  >
    <template v-for="(tab, index) in props.tabs" :key="tab.id">
      <input
        type="radio"
        :name="currentName"
        :id="`consist-${currentName}-tab-${tab.id}`"
        class="input"
        :checked="index === currentIndex"
        @change="changeIndex(index)"
        :class="'switch'"
      >
      <label :for="`${currentName}-tab-${tab.id}`" class="label">
        {{ tab.label }}
      </label>
    </template>
  </div>
</template>

<style scoped lang="scss">

</style>
