<script setup lang="ts">
import { _t, _d } from '@/helpers/utils';

defineProps({
  event: Object
});
</script>

<template>
  <div class="py-2 px-3 border-b last:border-b-0 flex">
    <div class="flex-auto">
      <a :href="event.htmlLink" target="_blank mr-1">
        {{ event.summary }}
      </a>
      {{ _d(event.end.ts - event.start.ts) }}
    </div>
    <div>
      {{ _t(event.start.ts) }}
    </div>
  </div>
</template>
