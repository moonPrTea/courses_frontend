<script setup lang="ts">
import { ref } from 'vue'
import {loginStore} from "@/stores/loginData.ts";
import {setToken} from "@/composables/login.ts";
import type {UserTokenData} from "@/interfaces/user.ts";
import {useRouter} from "vue-router";
import type {Token} from "@/interfaces/login.ts";
import type {ValidationAnswer} from "@/interfaces/registration.ts";

const store = loginStore();
const router = useRouter();

const tokenData = ref<Token>({
  token: '',
  expires_time: 0,
  token_data: {
    username: '',
    email: '',
    admin: false,
    user_courses: 0
  },
})

const ErrorInformation = ref<ValidationAnswer[]>([]);

const inputEmail = ref<string>('');
const inputPassword = ref<string>('');
const ErrorMessage = ref<string>('');

const ValidEmail = ref<boolean | null>(null);
const showError = ref<boolean | null>(null);

const checkEmail = async () => {
  if (inputEmail.value === "") {
    ValidEmail.value = null;
    return;
  }
  await store.checkEmail(inputEmail.value);
  if (store.answer) {
    const currentRecord = {...store.answer as ValidationAnswer};
    currentRecord.type_ = "email";
    const itemIndex = ErrorInformation.value.findIndex(elem => elem.type_ === currentRecord.type_);

    if (itemIndex !== -1) {
      ErrorInformation.value.splice(itemIndex, 1);
    }
    ErrorInformation.value.push(currentRecord);
    ValidEmail.value = currentRecord.success;
  }
}

const checkUserData = async() => {
    await store.checkUserCredentials(inputEmail.value, inputPassword.value);

    tokenData.value.token = store.token;
    tokenData.value.token_data = store.token_data as UserTokenData;
    tokenData.value.expires_time = Date.now() + 15 * 60 * 1000;

    if (!store.success) {
      // --> далее задача - добавить механизм, обрабатывающий ошибки апи
      showError.value = true;
      ErrorMessage.value = 'Данные не могут быть идентифицированы'
      return 0;

    }
    setToken(tokenData.value);
    await router.push('/');

}

const getError = (type: string) => {
  return ErrorInformation.value?.find(elem => elem.type_ === type)?.detail;
}

</script>


<template>
  <div v-if="showError == true">
  </div>
  <div class="login-fields">
    <div class="left-text">moonPrTea</div>
    <div class="main-card">
      <div class="fields">
        <div class="content">
          <h2 class="title">auth params</h2>
          <div class="fields-group">
            <label for="email" class="label">email</label>
            <input
                type="email" id="email"
                v-model="inputEmail" class="input"
                required placeholder="Введите ваш email"
                :class="{'is-error': ValidEmail === false, 'is-success': ValidEmail === true}"
                @input="checkEmail()"
            />
            <div v-if="ValidEmail === false" style="margin: 0; color: #f14668;">
              <span class="text is-small">
                {{getError("email")}}
              </span>
            </div>
          </div>

          <div class="fields-group">
            <label for="password" class="label">пароль</label>
            <input
                type="password" id="password"
                v-model="inputPassword" class="input"
                required placeholder="Введите ваш пароль"
            />
          </div>
          <div class="fields-group">
            <button type="submit" @click="checkUserData" class="confirm-button" :disabled="false">войти
          </button>
          </div>
          <div class="main-links">
            <router-link to="/registration" class="link">Регистрация</router-link>
            <router-link to="/forgot-psw" class="link">Забыли пароль?</router-link>
          </div>
        </div>
      </div>


    </div>
  </div>
</template>


<style lang="scss" scoped>
.login-fields {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 20px;
  overflow: hidden;

}


.main-links {
  display: flex;
  justify-content: space-between;
  font-size: 1rem;
  margin-bottom:0
}

.fields {
  flex: 1;
  padding: 1rem;
}

.fields-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  justify-content: center;
}

.left-text {
  position: absolute;
  top: 10px;
  left: 10px;
  font-size: 1rem;
  background-color: #FFFFFF;
  padding: 2px 6px;
  border-radius: 4px;
  color: #2c2d30;
}
</style>
