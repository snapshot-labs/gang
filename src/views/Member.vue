<script setup lang="ts">
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { useApp } from '@/composables/useApp';

const route = useRoute();
const { app } = useApp();

const id: string = route.params.id as string;

const member = ref(app.value.members[id]);
const leads = ref(
  Object.values(app.value.circles).filter(circle => circle.lead === id)
);
</script>

<template>
  <Container class="s-box max-w-[800px] py-5 space-y-3">
    <div class="text-center">
      <img
        :src="member.avatar"
        class="h-[40px] w-[40px] rounded-full mb-2 inline-block"
      />
      <h2 class="mb-4">{{ member.name }}</h2>
    </div>

    <div v-if="leads.length">
      <div class="eyebrow">Lead(s)</div>
      <div v-for="(lead, key) in leads" :key="key">
        <router-link :to="{ name: 'circle', params: { id: lead.id } }">
          <b>#{{ lead.id }}</b>
        </router-link>
      </div>
    </div>

    <div>
      <div class="eyebrow">Gang(s)</div>
      <div v-for="(circle, key) in member.circles.split(',')" :key="key">
        <router-link :to="{ name: 'circle', params: { id: circle } }">
          <b>#{{ circle }}</b>
        </router-link>
      </div>
    </div>
  </Container>
</template>
