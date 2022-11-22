<script setup lang="ts">
import { Ref, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useApp } from '@/composables/useApp';

const route = useRoute();
const { app } = useApp();

const id: string = route.params.id as string;

const member = ref(app.value.members[id]);
const leads = ref(
  Object.values(app.value.circles).filter(circle => circle.lead === id)
);
const events: Ref<any[]> = ref(
  app.value.calendar.filter((event: any) =>
    member.value.circles.split(',').includes(event.summary.replace('#', ''))
  )
);
</script>

<template>
  <Container class="s-box max-w-[800px] py-5 space-y-3">
    <div>
      <img
        :src="member.avatar"
        class="h-[40px] w-[40px] rounded-full mb-2 inline-block"
      />
      <h2 class="mb-4">{{ member.name }}</h2>
    </div>

    <div v-if="leads.length">
      <div class="eyebrow mb-2">
        <IH-star class="inline-block" />
        Leading
      </div>
      <div v-for="(lead, key) in leads" :key="key">
        <router-link :to="{ name: 'circle', params: { id: lead.id } }">
          <b>#{{ lead.id }}</b>
        </router-link>
      </div>
    </div>

    <div>
      <div class="eyebrow mb-2">
        <IH-stop class="inline-block" />
        Gang(s)
      </div>
      <div v-for="(circle, key) in member.circles.split(',')" :key="key">
        <router-link :to="{ name: 'circle', params: { id: circle } }">
          <b>#{{ circle }}</b>
        </router-link>
      </div>
    </div>

    <div v-if="events.length">
      <div class="eyebrow mb-2">
        <IH-calendar class="inline-block" />
        Event(s)
      </div>
      <div class="x-block">
        <Event v-for="(event, key) in events" :key="key" :event="event" />
      </div>
    </div>
  </Container>
</template>
