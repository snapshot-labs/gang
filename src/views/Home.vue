<script setup lang="ts">
import { Ref, ref } from 'vue';
import { useApp } from '@/composables/useApp';

const { app } = useApp();

const events: Ref<any[]> = ref(
  app.value.calendar.filter((event: any) => !event.summary.includes('#'))
);
</script>

<template>
  <Container class="s-box max-w-[800px] py-5 space-y-4">
    <div v-if="events.length">
      <div class="eyebrow mb-2">
        <IH-calendar class="inline-block" />
        Event(s)
      </div>
      <div class="x-block">
        <Event v-for="(event, key) in events" :key="key" :event="event" />
      </div>
    </div>
    <div>
      <div class="eyebrow mb-2">
        <IH-stop class="inline-block" />
        Gang(s)
      </div>
      <div class="space-y-4">
        <div
          v-for="(circle, key) in Object.values(app.circles).filter(
            c => !c.parent
          )"
          :key="key"
        >
          <h3 class="mb-2">
            {{ circle.id }}
            <UiCounter
              :counter="
                Object.values(app.circles).filter(c => c.parent === circle.id)
                  .length
              "
            />
          </h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
            <router-link
              v-for="(sub, key1) in Object.values(app.circles).filter(
                c => c.parent === circle.id
              )"
              :key="key1"
              :to="{ name: 'circle', params: { id: sub.id } }"
              class="overflow-hidden border rounded-lg px-3 py-2"
            >
              <h3 class="mb-2">#{{ sub.id }}</h3>
              <div>
                <div v-if="app.members[sub.lead]" class="mb-2">
                  <div class="eyebrow">Lead</div>
                  <img
                    :src="app.members[sub.lead].avatar"
                    class="h-[28px] w-[28px] rounded-full inline-block"
                  />
                  {{ app.members[sub.lead].name }}
                </div>
                <div>
                  <div class="eyebrow">Member(s)</div>
                  <div class="-space-x-1">
                    <span
                      v-for="(member, key2) in Object.values(
                        app.members
                      ).filter(m => m.circles.split(',').includes(sub.id))"
                      :key="key2"
                      class="inline-block"
                    >
                      <img
                        :src="member.avatar"
                        class="h-[28px] w-[28px] rounded-full"
                      />
                    </span>
                  </div>
                </div>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </Container>
</template>
