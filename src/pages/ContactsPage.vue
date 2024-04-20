<template>
  <div class="page-wrapper"> 
    <q-card>
      <q-card-section>
        <div class="text-h6">Контактная форма</div>
        <div class="text-subtitle1">Свяжитесь с нами, если у вас есть вопросы или предложения!</div>
      </q-card-section>

      <q-card-section>
        <q-form
          class="q-gutter-md"
          @submit="onSubmit"
          @reset="onReset"
        >
          <q-input
            v-model="name"
            filled
            label="Ваше имя*"
            hint="Введите ваше полное имя"
            :rules="[val => val && val.length > 0 || 'Поле обязательно к заполнению']"
          />
          <q-input
            v-model="email"
            filled
            label="Ваш Email*"
            type="email"
            hint="Введите ваш email адрес"
            :rules="[val => val && val.length > 0 || 'Поле обязательно к заполнению']"
          />
          <q-input
            v-model="message"
            filled
            label="Ваше сообщение*"
            type="textarea"
            hint="Напишите ваше сообщение здесь"
            :rules="[val => val && val.length > 0 || 'Поле обязательно к заполнению']"
          />

          <div>
            <q-btn
              label="Отправить"
              type="submit"
              color="primary"
              class="q-mr-sm"
            />
            <q-btn
              label="Очистить"
              type="reset"
              color="primary"
              outline
            />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useQuasar } from 'quasar';

const $q = useQuasar();
const name = ref<string>('');
const email = ref<string>('');
const message = ref<string>('');

function onSubmit() {
  console.log('Форма отправлена:', name.value, email.value, message.value);
  $q.notify({
    color: 'green-4',
    textColor: 'white',
    icon: 'cloud_done',
    message: 'Сообщение успешно отправлено!',
  });
}

function onReset() {
  name.value = '';
  email.value = '';
  message.value = '';
}
</script>
