<template>
  <div class="university-page page-wrapper">
    <div class="university-page--title">
      <div class="university-page--title__image" />
      <div class="university-page--title__text">
        {{ university?.fullname }} <br>
        <div class="university-page--title__text--inner">
          <span>{{ studentsCount }} студентов</span>
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
        v-for="faculty in university?.faculties"
        :key="faculty.id"
        bordered
        expand-separator
        class="rounded-borders q-mt-md"
      >
        <q-expansion-item
          expand-separator
          :label="faculty.fullname"
          :caption="faculty.shortname"
          default-opened
        >
          <q-expansion-item
            :header-inset-level="1"
            expand-separator
            label="Кафедры"
            icon="cases"
            default-opened
          >
            <template v-slot:header>
              <q-item-section class="university-page--faculties__departments">
                <q-icon
                  class="q-mr-md"
                  name="cases"
                  size="25px"
                />
                Кафедры
              </q-item-section>
              <q-item-section>
                <div class="row items-center justify-end">
                  <q-btn
                    round
                    color="primary"
                    size="10px"
                    icon="add"
                    @click.stop=""
                  />
                </div>
              </q-item-section>
            </template>
            <q-expansion-item
              v-for="department in faculty.departments"
              :key="department.id"
              switch-toggle-side
              dense-toggle
              :header-inset-level="1"
              :content-inset-level="2"
            >
              <template v-slot:header>
                <q-item-section>
                  {{ department.fullname }}
                </q-item-section>
                <q-item-section>
                  <div
                    class="row items-center justify-end"
                    style="padding-right: 40px"
                  >
                    <q-btn
                      class="q-mr-md"
                      round
                      color="primary"
                      size="10px"
                      icon="edit"
                      @click.stop=""
                    />
                    <q-btn
                      round
                      color="primary"
                      size="10px"
                      icon="delete"
                      @click.stop=""
                    />
                  </div>
                </q-item-section>
              </template>
              <q-expansion-item
                :header-inset-level="0"
                expand-separator
                default-opened
              >
                <template v-slot:header>
                  <q-item-section class="university-page--faculties__departments">
                    <q-icon
                      class="q-mr-md"
                      name="stream"
                      size="25px"
                    />
                    Потоки
                  </q-item-section>
                  <q-item-section>
                    <div class="row items-center justify-end">
                      <q-btn
                        round
                        color="primary"
                        size="10px"
                        icon="add"
                        @click.stop=""
                      />
                    </div>
                  </q-item-section>
                </template>
                <q-expansion-item
                  v-for="directions in department.directions"
                  :key="directions.id"
                  switch-toggle-side
                  dense-toggle
                  :header-inset-level="0"
                  :content-inset-level="0"
                >
                  <template v-slot:header>
                    <q-item-section>
                      {{ directions.fullname }}
                    </q-item-section>
                    <q-item-section>
                      <div
                        class="row items-center justify-end"
                        style="padding-right: 40px"
                      >
                        <q-btn
                          class="q-mr-md"
                          round
                          color="primary"
                          size="10px"
                          icon="edit"
                          @click.stop=""
                        />
                        <q-btn
                          round
                          color="primary"
                          size="10px"
                          icon="delete"
                          @click.stop=""
                        />
                      </div>
                    </q-item-section>
                  </template>
                  <q-expansion-item
                    :header-inset-level="1"
                    expand-separator
                    default-opened
                  >
                    <template v-slot:header>
                      <q-item-section class="university-page--faculties__departments">
                        <q-icon
                          class="q-mr-md"
                          name="group"
                          size="25px"
                        />
                        Группы
                      </q-item-section>
                      <q-item-section>
                        <div class="row items-center justify-end">
                          <q-btn
                            round
                            color="primary"
                            size="10px"
                            icon="add"
                            @click.stop=""
                          />
                        </div>
                      </q-item-section>
                    </template>
                    <q-expansion-item
                      v-for="group in directions.groups"
                      :key="group.id"
                      hide-expand-icon
                      switch-toggle-side
                      dense-toggle
                      :header-inset-level="2"
                      :content-inset-level="3"
                    >
                      <template v-slot:header>
                        <q-item-section>
                          {{ group.fullname }}
                        </q-item-section>
                        <q-item-section>
                          <div
                            class="row items-center justify-end"
                            style="padding-right: 40px"
                          >
                            <q-btn
                              class="q-mr-md"
                              round
                              color="primary"
                              size="10px"
                              icon="edit"
                              @click.stop=""
                            />
                            <q-btn
                              round
                              color="primary"
                              size="10px"
                              icon="delete"
                              @click.stop=""
                            />
                          </div>
                        </q-item-section>
                      </template>
                    </q-expansion-item>
                  </q-expansion-item>
                </q-expansion-item>
              </q-expansion-item>
            </q-expansion-item>
          </q-expansion-item>
        </q-expansion-item>
      </q-list>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onBeforeMount, ref } from 'vue';
import { useRoute } from 'vue-router';
import { LocalitiesApiService } from 'src/services/api/localitiesApi.service';
import { IUniversity } from 'src/models/university.model';
const route = useRoute();
const slide = ref<number>(1);
const studentsCount = ref<number>();
const university = ref<IUniversity>();
const autoplay = ref<boolean>(true);
onBeforeMount(async () => {
  university.value = await LocalitiesApiService.loadUniversity(Number(route.params.universityId));
  studentsCount.value = await LocalitiesApiService.getCountStudentsInLocalitiesId(Number(route.params.universityId));
});
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

    &__departments{
      display: flex;
      flex-direction: row;
      justify-content: start;
      align-items: center;
      font-size: 16px;
      font-weight: 600;
    }
  }
}
</style>
