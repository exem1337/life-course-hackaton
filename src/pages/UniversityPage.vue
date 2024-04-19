<template>
  <div class="university-page page-wrapper">
    <div class="university-page--title">
      <div class="university-page--title__image" />
      <div class="university-page--title__text">
        Университет Синергия <br>
        <div class="university-page--title__text--inner">
          <span>280 студентов</span>
          <q-btn outline>
            к студентам
            <q-icon name="person" />
          </q-btn>
        </div>
      </div>
    </div>
    <div class="university-page--gallery">
      <p>Галерея ВУЗа</p>
      <q-carousel
        v-model="slide"
        animated
        navigation
        infinite
        :autoplay="autoplay"
        arrows
        transition-prev="slide-right"
        transition-next="slide-left"
        @mouseenter="autoplay = false"
        @mouseleave="autoplay = true"
      >
        <q-carousel-slide
          :name="1"
          img-src="https://cdn.quasar.dev/img/mountains.jpg"
        />
        <q-carousel-slide
          :name="2"
          img-src="https://cdn.quasar.dev/img/parallax1.jpg"
        />
        <q-carousel-slide
          :name="3"
          img-src="https://cdn.quasar.dev/img/parallax2.jpg"
        />
        <q-carousel-slide
          :name="4"
          img-src="https://cdn.quasar.dev/img/quasar.jpg"
        />
      </q-carousel>
    </div>
    <div class="university-page--faculties">
      <p>Факультеты</p>
      <q-list
        bordered
        class="rounded-borders"
      >
        <q-expansion-item
          expand-separator
          label="Институт математики и информационных технологий"
          caption="ИМИТ"
        >
          <q-card>
            <q-card-section>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem, eius reprehenderit eos corrupti
              commodi magni quaerat ex numquam, dolorum officiis modi facere maiores architecto suscipit iste
              eveniet doloribus ullam aliquid.
            </q-card-section>
          </q-card>
        </q-expansion-item>

        <q-expansion-item
          expand-separator
          label="Архитектурно-строительный факультет"
          caption="АСФ"
        >
          <q-card>
            <q-card-section>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem, eius reprehenderit eos corrupti
              commodi magni quaerat ex numquam, dolorum officiis modi facere maiores architecto suscipit iste
              eveniet doloribus ullam aliquid.
            </q-card-section>
          </q-card>
        </q-expansion-item>

        <q-expansion-item
          expand-separator
          label="Аэрокосмический институт"
          caption="АКИ"
        >
          <q-card>
            <q-card-section>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem, eius reprehenderit eos corrupti
              commodi magni quaerat ex numquam, dolorum officiis modi facere maiores architecto suscipit iste
              eveniet doloribus ullam aliquid.
            </q-card-section>
          </q-card>
        </q-expansion-item>
      </q-list>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const slide = ref<number>(1);
const autoplay = ref<boolean>(true);
</script>

<style lang="scss" scoped>
@import "src/css/quasar.variables";

.university-page {
  &--title {
    display: flex;
    align-items: center;
    gap: 32px;
    padding-bottom: 60px;
    margin-bottom: 60px;
    border-bottom: 1px solid $dark-gray;

    &__image {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      background-color: gray;
    }

    &__text {
      font-size: 28px;
      font-weight: 500;
      line-height: 36px;

      &--inner {
        display: flex;
        align-items: center;
        gap: 16px;
        margin-top: 16px;

        span {
          font-size: 14px;
          color: $dark;
          font-weight: 400;
          line-height: 20px;
        }

        .q-btn {
          :deep(.q-btn__content) {
            display: flex;
            align-items: center;
            justify-content: space-between;
          }
        }
      }
    }
  }

  &--gallery {
    padding-bottom: 60px;
    margin-bottom: 60px;
    border-bottom: 1px solid $dark-gray;

    p {
      font-size: 20px;
      line-height: 28px;
      font-weight: 500;
      margin-bottom: 16px;
    }

    .q-carousel {
      border-radius: 8px;
    }
  }

  &--faculties {
    padding-bottom: 60px;

    p {
      font-size: 20px;
      line-height: 28px;
      font-weight: 500;
      margin-bottom: 16px;
    }

    :deep(.q-item) {
      padding: 16px 32px;
    }
  }
}
</style>
