<template>
  <q-footer
    elevated
    class="app-footer--title"
  >
    <q-toolbar class="app-footer--toolbar">
      <!-- <q-toolbar-title class="app-footer--toolbar-title"> -->
      <router-link to="/page">Партнеры </router-link>
      <router-link to="/page">Условия использования </router-link>
      <router-link to="/page">Обратная связь </router-link>
      <div class="app-footer--center">
        <q-avatar>
          <img src="../assets/image 5.svg" />
        </q-avatar>
        <div class="logo-text">LifeCourse</div>
      </div>
      <router-link to="/page">О нас </router-link>
      <router-link to="/page">Реклама </router-link>
      <router-link to="/page">Политика конфиденциальности</router-link>
      <!-- </q-toolbar-title> -->
    </q-toolbar>
    <q-toolbar class="app-footer--toolbar-underline">
      <div class="icons">
        <img src="../assets/vk.svg">
        <img src="../assets/telegram.svg">
        <img src="../assets/instagram.svg">
      </div>
      <div class="info">
        <p>© ООО "СОЗНАНИЕ" 2024</p>
        <p>460048, Оренбургская область, г Оренбург, Томилинская ул, д. 238, помещ. 2</p>
      </div>
    </q-toolbar>
  </q-footer>
</template>

<style lang="scss" scoped>
@import "src/css/quasar.variables";

.q-layout__section--marginal{
  color: #333;
}

:global(.q-footer) {
  z-index: 2;
  position: static;
  border-top: 1px solid $primary;
  box-shadow: 0px -1px 48px -17px rgba(0, 0, 0, 0.56);
}

.app-footer{
  display: flex;
  align-items: center;

  &--title{
    background-color: #fff;
    height: 300px;
  }
      &--toolbar{
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid $primary;
      padding: 35px;
      flex-wrap: wrap;

      a{
        color: $primary;
        text-decoration: none;
        font-weight: 600;
        max-width: 150px;
        text-align: center;
      }

    }

    &--center{
     display: flex;
      align-items: center;
      .logo-text{
      color: $primary;
     }
    }
    &--toolbar-underline{
      display: flex;
      flex-direction: column;
      margin-top: 20px;

    .icons{
      width: 100%;
      display: flex;
      gap: 32px;
      justify-content: center;

        img{
          width: 30px;
          height: 30px;
        }
      }

      .info{
        padding-top: 10px;
        display: flex;
        flex-direction: column;
        align-items: center;
        p{
          color: black;
        }
      }
   }
}
</style>
