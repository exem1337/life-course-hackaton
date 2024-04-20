<template>
  <q-footer
    elevated
    class="app-footer--title"
  >
    <q-toolbar class="app-footer--toolbar">
      <!-- <q-toolbar-title class="app-footer--toolbar-title"> -->
      <router-link to="/partners">Партнеры </router-link>
      <router-link to="/terms">Условия использования </router-link>
      <router-link to="/contacts">Обратная связь </router-link>
      <div class="app-footer--center">
        <router-link to="/"> 
          <q-avatar>
            <img src="../assets/logo.svg" />
          </q-avatar>
          <div class="logo-text">LifeCourse</div>
        </router-link>
      </div>
      <router-link to="/about">О нас </router-link>
      <router-link to="/ads">Реклама </router-link>
      <router-link to="/privacypolicy">Политика конфиденциальности</router-link>
      <!-- </q-toolbar-title> -->
    </q-toolbar>
    <q-toolbar class="app-footer--toolbar-underline">
      <div class="icons">
        <a
          href="https://vk.com/firsthackaton"
          target="_blank"
        >
          <img
            src="../assets/vk.svg"
            alt="VK"
          >
        </a>
        <a
          href="https://t.me/OrenHack"
          target="_blank"
        >
          <img
            src="../assets/telegram.svg"
            alt="Telegram"
          >
        </a>
        <a
          href="https://instagram.com/yourprofile"
          target="_blank"
        >
          <img
            src="../assets/instagram.svg"
            alt="Instagram"
          >
        </a>
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

.icons a img {
  filter: brightness(0) saturate(100%) invert(27%) sepia(95%) saturate(4452%) hue-rotate(204deg) brightness(99%) contrast(101%);
  width: 24px; /* или другой размер, который вам нужен */
  height: auto;
  transition: filter 0.3s ease; /* плавное изменение при наведении */
}

.icons a:hover img {
  filter: brightness(0) saturate(100%) invert(47%) sepia(71%) saturate(2932%) hue-rotate(143deg) brightness(104%) contrast(97%);
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
