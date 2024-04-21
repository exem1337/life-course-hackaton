<template>
  <q-page class="landing">
    <div class="landing--item landing--hero">
      <div class="landing--hero__text">
        <h3>LifeCourse - Виртуальный мир студента</h3>
        <p>Открытое пространство для студентов, ВУЗов, работодателей со всех городов России.</p>
      </div>
      <div class="landing--hero__images">
        <img
          src="../assets/images/landing/student-reading.jpg"
          alt="lifecourse"
        >
        <img
          src="../assets/images/landing/students-project.jpg"
          alt="lifecourse"
        >
        <img
          src="../assets/images/landing/students-happy.jpg"
          alt="lifecourse"
        >
      </div>
    </div>
    <div class="landing--item students">
      <img
        src="../assets/images/landing/backpack.jpg"
        alt="lifecourse"
      >
      <span>
        СТУ <br>
        ДЕН <br>
        ТАМ <br>
      </span>

      <div class="students--action">
        <ul class="students--action__items">
          <li>
            Присоединитесь к порталу своего ВУЗа
          </li>
          <li>
            Делитесь новостями студенческой жизни
          </li>
          <li>
            Следите за обновлениями одногруппников и университета
          </li>
          <li>
            Участвуйте в университетских мероприятиях
          </li>
          <li>
            Откликайтесь на вакансии работодателей
          </li>
        </ul>
        <q-btn
          class="bg-primary text-white"
          @click="onOpenRegisterStudentModal"
        >
          Студентам
        </q-btn>
      </div>
    </div>

    <div class="landing--item students">
      <img
        src="../assets/images/landing/osu.jpeg"
        alt="lifecourse"
      >
      <span>
        ВУЗ <br>
        АМ <br>
      </span>

      <div class="students--action">
        <ul class="students--action__items">
          <li>
            Создайте портал вашего ВУЗа
          </li>
          <li>
            Делитесь самыми интересными событиями вашего учебного заведения
          </li>
          <li>
            Создавайте мероприятия
          </li>
          <li>
            Формируйте списки лучших студентов
          </li>
        </ul>
        <q-btn
          class="bg-primary text-white"
          @click="onOpenRegisterUniversityAdminModal"
        >
          ВУЗам
        </q-btn>
      </div>
    </div>

    <div class="landing--item students">
      <img
        src="../assets/images/landing/work.jpg"
        alt="lifecourse"
      >
      <span class="text-dark">
        РАБОТО <br>
        ДАТЕЛЯМ
      </span>

      <div class="students--action">
        <ul class="students--action__items">
          <li>
            Создавайте свои вакансии
          </li>
          <li>
            Просматривайте отклики студентов на вакансии
          </li>
          <li>
            Найдите лучших студентов по всей России
          </li>
          <li>
            Просматривайте подробную информацию о достижениях студентов
          </li>
        </ul>
        <q-btn
          class="bg-primary text-white"
          @click="onOpenRegisterJobGiverModal"
        >
          Работодателям
        </q-btn>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { inject } from 'vue'
import ModalManager from 'src/services/base/modalManager.service'
import RegisterStudentModal from 'components/modals/RegisterStudentModal.vue'
import JobGiverRegisterModal from 'components/modals/JobGiverRegisterModal.vue'
import { useMeta } from 'quasar'
import RegisterUniversityModal from 'components/modals/RegisterUniversityModal.vue'

const modalManager = inject<ModalManager>(ModalManager.getServiceName());

useMeta({
  title: 'LifeCourse - Виртуальный мир студента',
});

function onOpenRegisterStudentModal(): void {
  modalManager?.openAsyncModal(RegisterStudentModal);
}

function onOpenRegisterUniversityAdminModal(): void {
  modalManager?.openAsyncModal(RegisterUniversityModal);
}

function onOpenRegisterJobGiverModal(): void {
  modalManager?.openAsyncModal(JobGiverRegisterModal);
}

defineOptions({
  name: 'IndexPage',
})
</script>

<style lang="scss" scoped>
@import "src/css/quasar.variables";

.base-wrapper {
  margin-bottom: 60px;
}

.landing {
  &--item {
    margin-top: 120px;
  }

  &--hero {
    display: flex;
    gap: 64px;
    overflow: hidden;
    margin-right: -40px;

    h3 {
      font-weight: 500;
    }

    &__images {
      display: flex;
      gap: 16px;

      img {
        width: 500px;
        height: 500px;
        object-fit: cover;

        &:first-child {
          border-top-left-radius: 32px;
          border-bottom-left-radius: 32px;
        }
      }
    }
  }

  .students {
    width: 100%;
    height: 600px;
    position: relative;
    padding: 32px;
    display: flex;
    justify-content: flex-end;

    img {
      position: absolute;
      top: 0;
      left: 0;
      object-fit: cover;
      width: 100%;
      height: 100%;
      border-radius: 32px;
    }

    span {
      position: absolute;
      top: 32px;
      left: 32px;
      color: $white;
      font-weight: 700;
      font-size: 96px;
      line-height: 96px;
    }

    &--action {
      background: $white;
      width: 400px;
      height: 100%;
      border-radius: 20px;
      position: relative;
      padding: 20px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      &__items {
        display: flex;
        flex-direction: column;
        gap: 32px;
        padding-left: 32px;

        li {
          font-size: 20px;
          line-height: 28px;
          font-weight: 500;
        }
      }
    }
  }
}
</style>
