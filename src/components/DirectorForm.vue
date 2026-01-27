<script setup lang="ts">
import { ref, reactive, computed } from "vue";
import { useI18n } from "vue-i18n";
import { useVuelidate } from "@vuelidate/core";
import { required, minValue, helpers } from "@vuelidate/validators";
import Button from "primevue/button";
import Dialog from "primevue/dialog";
import Avatar from "primevue/avatar";
import InputText from "primevue/inputtext";
import Textarea from "primevue/textarea";
import DatePicker from "primevue/datepicker";
import InputNumber from "primevue/inputnumber";
import Checkbox from "primevue/checkbox";
import Select from "primevue/select";
import Divider from "primevue/divider";
import { IftaLabel } from "primevue";
import Message from "primevue/message";

const { t } = useI18n();
const visible = ref(false);

const game = reactive({
  id: null,
  name: "",
  master: "",
  date: null,
  time: "",
  city: "",
  address: "",
  level: null,
  system: "",
  maxPlayers: null,
  currentPlayers: null,
  description: "",
  isOnline: false,
  extraDetails: "",
});

const levels = computed(() => [
  { label: t('form.directorForm.levels.beginner'), value: 1 },
  { label: t('form.directorForm.levels.intermediate'), value: 2 },
  { label: t('form.directorForm.levels.advanced'), value: 3 },
]);

// Validadores personalizados con traducción
const futureDate = helpers.withMessage(
  () => t('form.directorForm.validation.futureDate'),
  (value) => !value || value > new Date()
);
const positiveNumber = helpers.withMessage(
  () => t('form.directorForm.validation.positiveNumber'),
  minValue(1)
);
const maxGreaterThanCurrent = helpers.withMessage(
  () => t('form.directorForm.validation.maxPlayersError'),
  (value, vm) => !vm.currentPlayers || !value || value >= vm.currentPlayers
);

const rules = computed(() => ({
  name: { required: helpers.withMessage(() => t('form.common.errors.required', { field: t('form.directorForm.fields.adventureName') }), required) },
  master: { required: helpers.withMessage(() => t('form.common.errors.required', { field: t('form.directorForm.fields.gameMaster') }), required) },
  date: { required: helpers.withMessage(() => t('form.common.errors.required', { field: t('form.directorForm.fields.date') }), required), futureDate },
  time: { required: helpers.withMessage(() => t('form.common.errors.required', { field: t('form.directorForm.fields.time') }), required) },
  city: { required: helpers.withMessage(() => t('form.common.errors.required', { field: game.isOnline ? t('form.directorForm.fields.platformName') : t('form.directorForm.fields.city') }), required) },
  address: { required: helpers.withMessage(() => t('form.common.errors.required', { field: game.isOnline ? t('form.directorForm.fields.invitationLink') : t('form.directorForm.fields.address') }), required) },
  level: { required: helpers.withMessage(() => t('form.common.errors.required', { field: t('form.directorForm.fields.level') }), required) },
  system: { required: helpers.withMessage(() => t('form.common.errors.required', { field: t('form.directorForm.fields.system') }), required) },
  currentPlayers: { positiveNumber },
  maxPlayers: {
    positiveNumber,
    maxGreaterThanCurrent: helpers.withParams(
      { currentPlayers: game.currentPlayers },
      maxGreaterThanCurrent
    ),
  },
  description: { required: helpers.withMessage(() => t('form.common.errors.required', { field: t('form.directorForm.fields.description') }), required) },
}));

const v$ = useVuelidate(rules, game);

const handleSubmit = () => {
  v$.value.$touch();
  if (v$.value.$invalid) return;
  visible.value = false;
};
</script>

<template>
  <div class="card flex justify-center">
    <Button @click="visible = true" class="!font-bold !text-white flex items-center gap-2">
    <i class="pi pi-megaphone"></i>
    <span>{{ t("games.lets") }}</span>
</Button>

    <Dialog v-model:visible="visible" modal :style="{ width: '30rem' }">
      <template #header>
        <div class="inline-flex items-center justify-center gap-2">
          <Avatar image="/dado.png" shape="circle" />
          <span class="font-bold whitespace-nowrap">{{ t('form.directorForm.header.title') }}</span>
        </div>
      </template>

      <span class="text-surface-500 dark:text-surface-400 block mb-8">
        {{ t('form.directorForm.header.subtitle') }}
      </span>

      <Message v-if="v$.$error" severity="error" icon="pi pi-times-circle" class="mb-2">
        {{ t('form.common.errors.genericError') }}
      </Message>

      <div class="flex flex-col gap-8 w-full">
        <div>
          <div class="text-lg font-semibold text-surface-900 dark:text-surface-0 mb-3 flex items-center gap-2">
            <i class="pi pi-info-circle"></i>
            <span>{{ t('form.directorForm.sections.basicInfo') }}</span>
          </div>

          <div class="mb-4">
            <IftaLabel>
              <InputText id="name" v-model="game.name" variant="filled" fluid
                :class="{ 'p-invalid': v$.name.$error }" />
              <label for="name">{{ t('form.directorForm.fields.adventureName') }}</label>
            </IftaLabel>
            <div v-if="v$.name.$error" class="p-error text-xs ml-3 mt-1">{{ v$.name.$errors[0]!.$message }}</div>
          </div>

          <div class="mb-4">
            <IftaLabel>
              <InputText id="master" v-model="game.master" variant="filled" fluid
                :class="{ 'p-invalid': v$.master.$error }" />
              <label for="master">{{ t('form.directorForm.fields.gameMaster') }}</label>
            </IftaLabel>
            <div v-if="v$.master.$error" class="p-error text-xs ml-3 mt-1">{{ v$.master.$errors[0]!.$message }}</div>
          </div>
          <Divider />
        </div>

        <div>
          <div class="text-lg font-semibold text-surface-900 dark:text-surface-0 mb-3 flex items-center gap-2">
            <i class="pi pi-calendar"></i>
            <span>{{ t('form.directorForm.sections.date') }}</span>
          </div>
          <div class="flex gap-6">
            <div class="flex-1 relative mb-4">
              <IftaLabel>
                <DatePicker id="date" v-model="game.date" variant="filled" fluid showIcon dateFormat="yy-mm-dd"
                  :class="{ 'p-invalid': v$.date.$error }" />
                <label for="date">{{ t('form.directorForm.fields.date') }}</label>
              </IftaLabel>
              <div v-if="v$.date.$error" class="p-error text-xs ml-3 mt-1">{{ v$.date.$errors[0]!.$message }}</div>
            </div>
            <div class="flex-1 relative mb-4">
              <IftaLabel>
                <InputText id="time" type="time" v-model="game.time" variant="filled" fluid
                  :class="{ 'p-invalid': v$.time.$error }" />
                <label for="time">{{ t('form.directorForm.fields.time') }}</label>
              </IftaLabel>
              <div v-if="v$.time.$error" class="p-error text-xs ml-3 mt-1">{{ v$.time.$errors[0]!.$message }}</div>
            </div>
          </div>
          <Divider />
        </div>

        <div>
          <div
            class="text-lg font-semibold text-surface-900 dark:text-surface-0 mb-3 flex justify-between items-center gap-2">
            <div>
              <i class="pi pi-map-marker mr-3"></i>
              <span>{{ game.isOnline ? t('form.directorForm.sections.platform') :
                t('form.directorForm.sections.location')
              }}</span>
            </div>
            <div class="flex items-center gap-2 p-inputgroup">
              <Checkbox inputId="isOnline" v-model="game.isOnline" :binary="true" />
              <label for="isOnline" class="ml-2 cursor-pointer font-medium">{{ t('form.directorForm.fields.onlineGame')
              }}</label>
            </div>
          </div>

          <div class="mb-4">
            <IftaLabel>
              <InputText id="city" v-model="game.city"
                :placeholder="game.isOnline ? t('form.directorForm.placeholders.platform') : t('form.directorForm.placeholders.city')"
                variant="filled" fluid :class="{ 'p-invalid': v$.city.$error }" />
              <label for="city">{{ game.isOnline ? t('form.directorForm.fields.platformName') :
                t('form.directorForm.fields.city') }}</label>
            </IftaLabel>
            <div v-if="v$.city.$error" class="p-error text-xs ml-3 mt-1">{{ v$.city.$errors[0]!.$message }}</div>
          </div>

          <div class="mb-4">
            <IftaLabel>
              <InputText id="address" v-model="game.address"
                :placeholder="game.isOnline ? t('form.directorForm.placeholders.link') : t('form.directorForm.placeholders.address')"
                variant="filled" fluid :class="{ 'p-invalid': v$.address.$error }" />
              <label for="address">{{ game.isOnline ? t('form.directorForm.fields.invitationLink') :
                t('form.directorForm.fields.address') }}</label>
            </IftaLabel>
            <div v-if="v$.address.$error" class="p-error text-xs ml-3 mt-1">{{ v$.address.$errors[0]!.$message }}</div>
          </div>
          <Divider />
        </div>

        <div>
          <div class="text-lg font-semibold text-surface-900 dark:text-surface-0 mb-3 flex items-center gap-2">
            <i class="pi pi-box"></i>
            <span>{{ t('form.directorForm.sections.gameDetails') }}</span>
          </div>
          <div class="flex gap-6 mb-4">
            <div class="flex-1">
              <IftaLabel>
                <InputText id="system" v-model="game.system" variant="filled" fluid
                  :class="{ 'p-invalid': v$.system.$error }" />
                <label for="system">{{ t('form.directorForm.fields.system') }}</label>
              </IftaLabel>
              <div v-if="v$.system.$error" class="p-error text-xs ml-3 mt-1">{{ v$.system.$errors[0]!.$message }}</div>
            </div>
            <div class="flex-1">
              <IftaLabel>
                <Select id="level" v-model="game.level" :options="levels" optionLabel="label" optionValue="value"
                  :placeholder="t('form.directorForm.placeholders.selectLevel')" variant="filled" fluid
                  :class="{ 'p-invalid': v$.level.$error }" />
                <label for="level">{{ t('form.directorForm.fields.level') }}</label>
              </IftaLabel>
              <div v-if="v$.level.$error" class="p-error text-xs ml-3 mt-1">{{ v$.level.$errors[0]!.$message }}</div>
            </div>
          </div>
          <div class="flex gap-6">
            <div class="flex-1 relative">
              <IftaLabel>
                <InputNumber id="currentPlayers" v-model="game.currentPlayers" variant="filled" fluid
                  :class="{ 'p-invalid': v$.currentPlayers.$error }" />
                <label for="currentPlayers">{{ t('form.directorForm.fields.currentPlayers') }}</label>
              </IftaLabel>
              <div v-if="v$.currentPlayers.$error"
                class="p-error text-xs absolute left-3 bottom-1 bg-surface-0 dark:bg-surface-800 px-1 rounded-sm z-10 shadow-sm">
                {{ v$.currentPlayers.$errors[0]!.$message }}</div>
            </div>
            <div class="flex-1 relative">
              <IftaLabel>
                <InputNumber id="maxPlayers" v-model="game.maxPlayers" variant="filled" fluid
                  :class="{ 'p-invalid': v$.maxPlayers.$error }" />
                <label for="maxPlayers">{{ t('form.directorForm.fields.maxPlayers') }}</label>
              </IftaLabel>
              <div v-if="v$.maxPlayers.$error"
                class="p-error text-xs absolute left-3 bottom-1 bg-surface-0 dark:bg-surface-800 px-1 rounded-sm z-10 shadow-sm">
                {{ v$.maxPlayers.$errors[0]!.$message }}</div>
            </div>
          </div>
          <Divider />
        </div>

        <div>
          <div class="text-lg font-semibold text-surface-900 dark:text-surface-0 mb-3 flex items-center gap-2">
            <i class="pi pi-align-left"></i>
            <span>{{ t('form.directorForm.sections.description') }}</span>
          </div>
          <div class="mb-4">
            <IftaLabel>
              <Textarea id="description" v-model="game.description" variant="filled" fluid rows="3" autoResize
                :class="{ 'p-invalid': v$.description.$error }" />
              <label for="description">{{ t('form.directorForm.fields.description') }}</label>
            </IftaLabel>
            <div v-if="v$.description.$error" class="p-error text-xs ml-3 mt-1">{{ v$.description.$errors[0]!.$message
            }}
            </div>
          </div>
          <IftaLabel>
            <Textarea id="extraDetails" v-model="game.extraDetails" variant="filled" fluid rows="2" autoResize />
            <label for="extraDetails">{{ t('form.directorForm.fields.extraDetails') }}</label>
          </IftaLabel>
        </div>
      </div>

      <template #footer>
        <Button :label="t('form.common.buttons.cancel')" text severity="secondary" @click="visible = false" />
        <Button :label="t('form.common.buttons.send')" severity="secondary" variant="outlined" @click="handleSubmit" />
      </template>
    </Dialog>
  </div>
</template>