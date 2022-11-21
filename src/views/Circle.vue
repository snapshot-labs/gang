<script setup lang="ts">
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { useApp } from '@/composables/useApp';

const route = useRoute();
const { app } = useApp();

const id: string = route.params.id as string;

const circle = ref(app.value.circles[id]);
const lead = ref(app.value.members[circle.value.lead]);
const domains = ref(app.value.domains.filter(domain => domain.circle === id));
</script>

<template>
  <Container class="s-box max-w-[800px] py-5">
    <div class="mb-4">
      <h2 class="mb-2">#{{ circle.id }}</h2>
      <p v-if="circle.about">{{ circle.about }}</p>
    </div>
    <div v-if="circle.id" class="space-y-3">
      <div v-if="lead">
        <div class="eyebrow">Lead</div>
        <router-link :to="{ name: 'member', params: { id: lead.id } }">
          <img
            :src="lead.avatar"
            class="h-[32px] w-[32px] rounded-full inline-block"
          />
          {{ lead.name }}
        </router-link>
      </div>

      <div>
        <div class="eyebrow">Member(s)</div>
        <div
          v-for="(member, key) in Object.values(app.members).filter(m =>
            m.circles.split(',').includes(circle.id)
          )"
          :key="key"
          class="mb-1"
        >
          <router-link
            :to="{ name: 'member', params: { id: member.id } }"
            class="mb-1 space-x-1"
          >
            <img
              :src="member.avatar"
              class="h-[32px] w-[32px] rounded-full inline-block"
            />
            {{ member.name }}
          </router-link>
        </div>
      </div>

      <div v-if="domains.length">
        <div class="eyebrow">Domain(s)</div>
        <div v-for="(domain, key) in domains" :key="key">
          <a :href="domain.name" target="_blank">
            {{ domain.name }}
          </a>
        </div>
      </div>
    </div>
  </Container>
</template>
