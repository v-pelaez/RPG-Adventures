<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import Avatar from 'primevue/avatar'
import InputText from 'primevue/inputtext'
import Textarea from 'primevue/textarea'
import { IftaLabel } from 'primevue'

const { t } = useI18n()
const visible = ref(false)

const name = ref('')
const email = ref('')
const message = ref('')

// Regex nativas JS
const regexName = /^[a-zA-ZÁÉÍÑÓÚÜáéíñóúü\s]{2,50}$/i
const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
const regexMessage = /^[\w\s\.,¡!¿?]{10,500}$/

const errores = ref({
    nombre: '',
    email: '',
    mensaje: ''
})

const validateField = (valor, regex, clave) => {
    // Mapeo de claves para las etiquetas de los errores
    const labelKey = `form.playerForm.fields.${clave === 'nombre' ? 'name' : clave === 'mensaje' ? 'message' : 'email'}`

    if (!valor.trim()) {
        errores.value[clave] = t('form.common.errors.required', { field: t(labelKey) })
        return false
    }
    if (!regex.test(valor)) {
        errores.value[clave] = t('form.common.errors.invalidFormat', { field: t(labelKey) })
        return false
    }
    errores.value[clave] = ''
    return true
}

const validateForm = () => {
    let validated = true
    validated = validateField(name.value, regexName, 'nombre') && validated
    validated = validateField(email.value, regexEmail, 'email') && validated
    validated = validateField(message.value, regexMessage, 'mensaje') && validated
    return validated
}

const handleSubmit = () => {
    if (validateForm()) {
        visible.value = false
        name.value = email.value = message.value = ''
    }
}
</script>

<template>
    <div class="card flex justify-center">
        <Button @click="visible = true" class="font-bold !text-white flex items-center gap-2">
            <i class="pi pi-plus-circle"></i>
            <span>{{ t('form.common.buttons.enroll') }}</span>
        </Button>
        <Dialog v-model:visible="visible" modal :style="{ width: '25rem' }">
            <template #header>
                <div class="inline-flex items-center justify-center gap-2">
                    <Avatar image="dado.png" shape="circle" />
                    <span class="font-bold whitespace-nowrap">{{ t('form.playerForm.header.title') }}</span>
                </div>
            </template>

            <span class="text-surface-500 dark:text-surface-400 block mb-8">
                {{ t('form.playerForm.header.subtitle') }}
            </span>

            <div class="flex flex-col gap-4 w-full">
                <IftaLabel>
                    <InputText id="username" v-model="name" variant="filled" fluid :invalid="!!errores.nombre"
                        @blur="validateField(name, regexName, 'nombre')" />
                    <label for="username">{{ t('form.playerForm.fields.name') }}</label>
                    <small v-if="errores.nombre" class="p-error block mt-1">{{ errores.nombre }}</small>
                </IftaLabel>

                <IftaLabel>
                    <InputText id="email" v-model="email" variant="filled" fluid :invalid="!!errores.email"
                        @blur="validateField(email, regexEmail, 'email')" />
                    <label for="email">{{ t('form.playerForm.fields.email') }}</label>
                    <small v-if="errores.email" class="p-error block mt-1">{{ errores.email }}</small>
                </IftaLabel>

                <IftaLabel>
                    <Textarea id="message" v-model="message" variant="filled" fluid rows="4" autoResize
                        :invalid="!!errores.mensaje" @blur="validateField(message, regexMessage, 'mensaje')" />
                    <label for="message">{{ t('form.playerForm.fields.message') }}</label>
                    <small v-if="errores.mensaje" class="p-error block mt-1">{{ errores.mensaje }}</small>
                </IftaLabel>
            </div>

            <template #footer>
                <Button :label="t('form.common.buttons.cancel')" text severity="secondary" @click="visible = false"
                    autofocus />
                <Button :label="t('form.common.buttons.send')" severity="secondary" variant="outlined"
                    @click="handleSubmit" />
            </template>
        </Dialog>
    </div>
</template>