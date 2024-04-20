<template>
  <div class="page-wrapper"> 
    <q-page class="q-pa-md">
      <h3>Условия использования платформы LifeCourse</h3>
    
      <q-expansion-item
        label="Введение"
        expanded
        class="custom-label"
      >
        <p>Добро пожаловать на платформу LifeCourse. Этот документ описывает условия, при которых предоставляются наши услуги. Используя LifeCourse, вы соглашаетесь с этими условиями.</p>
      </q-expansion-item>

      <q-expansion-item
        label="Использование платформы"
        class="custom-label"
      >
        <p>Платформа LifeCourse предоставляет образовательные материалы и инструменты для обучения. Вы можете использовать наши услуги для личного и не коммерческого использования. Запрещено использовать ресурсы сайта для каких-либо коммерческих целей без нашего разрешения.</p>
      </q-expansion-item>

      <q-expansion-item
        label="Права интеллектуальной собственности"
        class="custom-label"
      >
        <p>Все материалы, опубликованные на LifeCourse, защищены законами об авторском праве и принадлежат нам или нашим лицензиарам. Не допускается копирование, распространение или модификация любых материалов без нашего явного разрешения.</p>
      </q-expansion-item>

      <q-expansion-item
        label="Ограничение ответственности"
        class="custom-label"
      >
        <p>Мы стремимся обеспечить точность и актуальность материалов на LifeCourse, но не несем ответственности за возможные неточности или устаревшие данные. Также мы не гарантируем непрерывный доступ к платформе в случае технических сбоев.</p>
      </q-expansion-item>

      <q-expansion-item
        label="Изменения условий использования"
        class="custom-label"
      >
        <p>Мы можем периодически обновлять эти условия. При внесении изменений мы уведомим вас путем обновления даты в начале этих условий и, при значительных изменениях, через платформу или по электронной почте.</p>
      </q-expansion-item>

      <q-expansion-item
        label="Контактная информация"
        class="custom-label"
      >
        <p>Если у вас есть вопросы о наших условиях использования, пожалуйста, свяжитесь с нами по адресу support@lifecourse.com.</p>
      </q-expansion-item>
    </q-page>
  </div>
</template>

<script lang="ts" setup>
import { QExpansionItem, QPage } from 'quasar'
</script>

<style scoped lang="scss">
@import "src/css/quasar.variables";
.q-expansion-item {
  margin-bottom: 10px;
}
:deep(.custom-label .q-item__label) {
  font-size: large; /* Увеличение размера шрифта */
  font-weight: bold; /* Делаем текст жирным */
  color: $primary; /* Пример изменения цвета */
}
</style>
