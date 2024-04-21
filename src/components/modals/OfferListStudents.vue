<script setup lang="ts">
import BaseModal from 'components/modals/base/BaseModal.vue'
import { IUniversityStudent } from 'src/models/university.model'
import EmptyBanner from 'components/EmptyBanner.vue'
import { formatPersonName } from 'src/utils/nameFormat.util'
import { useRouter } from 'vue-router';
import { onBeforeMount, ref } from 'vue';
import { FilesApiService } from 'src/services/api/filesApi.service';
const router = useRouter();
const photoList = ref<Array<string>>([]);
const props = defineProps<{
  title: string;
  students: Array<IUniversityStudent>;
}>();

onBeforeMount(async () => {
  await loadData();
});

async function loadData() {
  for (let i = 0; i < props.students.length; i++) {
    const url = await FilesApiService.getFile(props.students[i].avatar_salt);
    photoList.value.push(`data:image/png;base64,${url}`);
  }
}

function openStudent(idUser: number) {
  console.log('asdasdasd');
  router.push('/profile/' + idUser);
}
defineEmits<{(e: 'confirm'): void }>();
</script>

<template>
  <BaseModal
    class="flex justify-center items-center"
    overlay-transition="vfm-fade"
    hide-footer
    :title="title"
    content-class="flex flex-col max-w-xl mx-4 p-4 bg-white dark:bg-gray-900 border dark:border-gray-700 rounded-lg space-y-2"
    @cancel="$emit('confirm')"
  >
    <div class="students">
      <EmptyBanner v-if="!students?.length">
        <template #title>Пока нет студентов</template>
      </EmptyBanner>
      <q-item
        v-else
        v-for="(student, index) in students"
        :key="student.id"
        class="students--item cursor-pointer"
        @click="openStudent(student.id)"
      >
        <q-item-section avatar>
          <q-avatar>
            <img
              :src="photoList[index]"
              alt="avatar"
            >
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label>{{ formatPersonName(student.first_name, student.last_name, student.middle_name) }}</q-item-label>
          <q-item-label caption>Рейтинг: {{ student.rating }} </q-item-label>
        </q-item-section>
      </q-item>
    </div>
  </BaseModal>
</template>

<style lang="scss" scoped>
.students {
  max-height: 800px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 8px;

  &--item:not(:first-child) {
    padding-top: 8px;
    border-top: 1px solid black;
  }
}
</style>
