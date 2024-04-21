<template>
  <div class="top-students">
    <h3>Топ 10 студентов сайта</h3>
    <div class="top-students--students">
      <q-card
        v-for="(student, index) in topStudents"
        :key="student.user_id"
        class="my-card"
        @click="onGoToStudent(student.user_id)"
      >
        <img :src="student.avatar">

        <q-card-section>
          <div class="text-h6">{{ index + 1 }} место</div>

          <div class="text-subtitle2">{{ formatPersonName(student.user.first_name, student.user.last_name, student.user.middle_name) }}</div>
        </q-card-section>

        <q-card-section>
          Баллов: {{ student.totalPoints }}
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { ProfileApiService } from 'src/services/api/profileApi.service'
import { ITopStudent } from 'src/models/profile/topStudent.model'
import { formatPersonName } from '../utils/nameFormat.util'
import { useRouter } from 'vue-router'
import { useUserStore } from 'stores/user'

const topStudents = ref<Array<ITopStudent>>([]);
const router = useRouter();
const store = useUserStore();

function onGoToStudent(id: number) {
  if (!store.isLoggedIn) {
    return;
  }

  router.push(`/profile/${id}`);
}

onMounted(async () => {
  topStudents.value = await ProfileApiService.loadTopStudents();
})
</script>

<style lang="scss" scoped>
.top-students {
  &--students {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 32px;

    .q-card {
      width: 350px;

      img {
        width: 350px;
        height: 350px;
        object-fit: cover;
      }
    }
  }
}
</style>
