<script setup>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import IconField from "primevue/iconfield";
import InputIcon from "primevue/inputicon";
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import Tag from 'primevue/tag';
import PlayerForm from "../components/PlayerForm.vue";
import DirectorForm from "../components/DirectorForm.vue";
import { ref, onMounted, computed } from "vue";
import { useI18n } from "vue-i18n";

const games = ref([]);
const { t } = useI18n();
const expandedRows = ref([]);
const pageName = computed(() => t("menu.games"));

const headers = computed(() => ({
  name: t("table.header_system"),
  director: t("table.header_director"),
  date: t("table.header_date"),
  city: t("table.header_city"),
  players: t("table.header_players"),
}));

const filters = ref({
  global: { value: null, matchMode: "contains" },
  system: { value: null, matchMode: "contains" },
  master: { value: null, matchMode: "contains" },
  city: { value: null, matchMode: "contains" },
});

const clearFilter = () => {
  filters.value = {
    global: { value: null, matchMode: "contains" },
    system: { value: null, matchMode: "contains" },
    master: { value: null, matchMode: "contains" },
    city: { value: null, matchMode: "contains" },
  };
};

onMounted(async () => {
  const response = await fetch("data/games.json");
  games.value = await response.json();
});

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("es-ES");
};
</script>

<template>
  <div class="background-galaxy h-[120px] md:h-[150px] flex items-center">
    <h2 class="text-3xl md:text-4xl font-bold p-6 md:p-8">{{ pageName }}</h2>
  </div>

  <div class="container mx-auto px-4 py-8 min-h-[500px]">
    <div class="flex flex-col lg:flex-row gap-8">

      <div class="w-full lg:w-3/4">
        <DataTable :value="games" v-model:filters="filters" dataKey="id"
          :globalFilterFields="['system', 'master', 'city']" :paginator="true" :rows="10"
          v-model:expandedRows="expandedRows" filterDisplay="menu"
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink"
          currentPageReportTemplate="{first} a {last} de {totalRecords}" :rowsPerPageOptions="[5, 10, 25]"
          class="p-datatable-sm shadow-md rounded-lg overflow-hidden">
          <template #header>
            <div class="flex flex-wrap justify-end items-center gap-3">
              <IconField class="w-full sm:w-auto">
                <InputIcon>
                  <i class="pi pi-search" />
                </InputIcon>
                <InputText v-model="filters['global'].value" :placeholder="$t('table.search_placeholder')"
                  class="w-full sm:w-64" />
              </IconField>
              <Button type="button" icon="pi pi-filter-slash" :label="$t('table.clear_button')" outlined
                @click="clearFilter()" class="w-full sm:w-auto" />
            </div>
          </template>

          <template #empty>
            <div class="p-4 text-center">{{ $t("table.party_empty") }}</div>
          </template>
          <template #loading> {{ $t("table.party_loading") }} </template>

          <Column field="system" :header="headers.name" sortable>
            <template #header>
              <i class="pi pi-book mr-2"></i>
            </template>
          </Column>

          <Column field="date" :header="headers.date" sortable>
            <template #header>
              <i class="pi pi-calendar mr-2"></i>
            </template>
            <template #body="slotProps">
              {{ formatDate(slotProps.data.date) }}
            </template>
          </Column>

          <Column field="city" sortable class="hidden md:table-cell">
            <template #header>
              <i class="pi pi-map-marker mr-2"></i>
            </template>
          </Column>

          <Column>
            <template #header>
              <i class="pi pi-users mr-2"></i>
            </template>
            <template #body="slotProps">
              <span class="font-semibold">{{ slotProps.data.currentPlayers }}/{{ slotProps.data.maxPlayers }}</span>
            </template>
          </Column>

          <Column expander class="w-[3rem]" />

          <template #expansion="slotProps">
  <div class="p-4 bg-gray-50/50 dark:bg-gray-900/40 border-y border-gray-100 dark:border-gray-700/50">

    <div class="flex justify-between items-start mb-5">
      <div class="flex flex-col gap-2">
        <h3 class="text-base font-bold text-gray-800 dark:text-gray-100 leading-tight">
          {{ slotProps.data.name }}
        </h3>
        <div class="flex gap-1.5">
          <Tag
            :value="slotProps.data.level === 1 ? $t('table.level.beginner') : slotProps.data.level === 2 ? $t('table.level.intermediate') : $t('table.level.advanced')"
            :severity="slotProps.data.level === 1 ? 'success' : slotProps.data.level === 2 ? 'warn' : 'danger'"
            class="text-[10px] px-2 py-0.5 h-auto" 
          />
          <Tag 
            :value="slotProps.data.isOnline ? 'Online' : $t('table.in_person')"
            :severity="slotProps.data.isOnline ? 'info' : 'secondary'" 
            class="text-[10px] px-2 py-0.5 h-auto" 
          />
        </div>
      </div>

      <div class="ml-auto self-center">
        <PlayerForm />
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-12 gap-6 ">

      <div class="md:col-span-7 space-y-4 text-sm">
        <p class="text-gray-500 dark:text-gray-400 italic leading-snug border-l-2 border-gray-200 dark:border-gray-700 pl-3">
          {{ slotProps.data.description }}
        </p>

        <div class="flex flex-col gap-1.5">
          <p>
            <span class="font-semibold text-gray-400/80">{{ $t("table.expand_directed") }}:</span>
            <span class="text-gray-700 dark:text-gray-300 ml-1">{{ slotProps.data.master }}</span>
          </p>
          <p>
            <span class="font-semibold text-gray-400/80">{{ $t("table.expand_address") }}:</span>
            <span class="text-gray-700 dark:text-gray-300 ml-1">{{ slotProps.data.address }}</span>
          </p>
        </div>
      </div>

      <div class="md:col-span-5">
        <div v-if="slotProps.data.extraDetails"
          class="p-3 bg-white/50 dark:bg-gray-800/50 rounded border border-gray-200/60 dark:border-gray-700/60 shadow-sm">
          <span class="block text-[10px] font-bold text-gray-400 mb-1.5 uppercase tracking-wide">
            {{ $t("table.expand_notes") }}
          </span>
          <p class="text-xs text-gray-600 dark:text-gray-400 whitespace-pre-wrap leading-normal">
            {{ slotProps.data.extraDetails }}
          </p>
        </div>
      </div>

    </div>
  </div>
</template>
        </DataTable>
      </div>

      <div class="w-full lg:w-1/4 ">
        <div class="cristal p-6 rounded-xl shadow-lg border border-white/20 sticky top-4 flex flex-col gap-6 ">
          <h2 class="text-2xl font-bold">{{ $t("games.public") }}</h2>
          <p class="text-gray-700 dark:text-gray-300 leading-relaxed">{{ $t("games.paragraph") }}</p>
          <DirectorForm class="w-full" />
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>
/* Solo mantenemos lo que Tailwind no cubre directamente o efectos visuales específicos */
.cristal {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}
</style>