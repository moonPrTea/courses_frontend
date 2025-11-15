<script setup lang="ts">

import {ref} from "vue";
import {registrationStore} from "@/stores/registrationData.ts";
import { useRouter } from "vue-router";
import type {ValidationAnswer} from "@/interfaces/registration.ts";

const ValidUsername = ref<boolean | null>(null);
const ValidPassword = ref<boolean | null>(null);
const ValidEmail = ref<boolean | null>(null);

const store = registrationStore();
const router = useRouter();


const ErrorInformation = ref<ValidationAnswer[]>([]);

const inputEmail = ref<string>("");
const inputPassword = ref<string>("");
const inputUsername = ref<string>("");

const createUser = async() => {
  await store.checkUser(inputEmail.value, inputPassword.value, inputUsername.value);
  const success = store.success;
  if (success) {
    await router.push('/login')
    return
  }

}

const checkUsername = async () => {
  if (inputUsername.value === "") {
    ValidUsername.value = null;
    return;
  }

  await store.checkUsername(inputUsername.value);

  if (store.answer) {
    const currentRecord = {...store.answer as ValidationAnswer};
    currentRecord.type_ = "username";
    const itemIndex = ErrorInformation.value.findIndex(elem => elem.type_ === currentRecord.type_);

    if (itemIndex !== -1) {
      ErrorInformation.value.splice(itemIndex, 1);
    }
    ErrorInformation.value.push(currentRecord);
    ValidUsername.value = currentRecord.success;
  }
}


const checkPassword = async () => {
  if (inputPassword.value === "") {
    ValidPassword.value = null;
    return;
  }

  await store.checkPassword(inputPassword.value);

  if (store.answer) {
    const currentRecord = store.answer as ValidationAnswer;
    currentRecord.type_ = "password";
    const itemIndex = ErrorInformation.value.findIndex(elem => elem.type_ === currentRecord.type_);

    if (itemIndex !== -1) {
      ErrorInformation.value.splice(itemIndex, 1);
    }
    ErrorInformation.value.push(currentRecord);
    ValidPassword.value = currentRecord.success;
  }
}


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

const getError = (type: string) => {
  return ErrorInformation.value?.find(elem => elem.type_ === type)?.detail;
}
</script>


<template>
  <div class="login-fields">
    <div class="main-card">
      <div class="left-text">moonPrTea</div>
      <div class="fields">
        <div class="content">
          <h2 class="title">registration port</h2>
          <div class="fields-group">
            <label for="email" class="label">username</label>
            <input
                class="input"
                v-model="inputUsername"
                :class="{'is-error': ValidUsername === false, 'is-success': ValidUsername === true}"
                required
                type="text" id="username"

                placeholder="Введите ваш username"
                @input="checkUsername()"

            />
            <div v-if="ValidUsername === false" style="margin: 0; color: #f14668;">
              <span class="text text-is-small">
                {{getError("username")}}
              </span>
            </div>
          </div>

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
              :class="{'is-error': ValidPassword === false, 'is-success': ValidPassword === true}"
              @input="checkPassword()"
            />
            <div v-if="ValidPassword === false" style="margin: 0; color: #f14668;">
            <span class="text text-is-small">
              {{getError("password")}}
            </span>
            </div>
          </div>
        </div>
          <div class="fields-group">
            <button type="submit"
                    class="confirm-button"
                    :disabled="ValidPassword != true || ValidUsername != true || ValidEmail != true"
                    @click="createUser"
            >
            создать
          </button>
          </div>
          <router-link to="/login" class="link">Уже есть аккаунт?</router-link>
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
  justify-content: center;
  gap: 0.5rem;
}

.left-text {
  position: absolute;
  top: 10px;
  left: 10px;
  font-size: 1rem;
  padding: 2px 6px;
  border-radius: 4px;
  color: #2c2d30;
}


</style>
