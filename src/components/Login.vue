<template>
  <div>
    <el-dialog
      v-model="store.showLogin"
      top="20vh"
      width="450px"
      :lock-scroll="false"
      :show-close="false"
      destroy-on-close
      class="login-dia"
      @close="handleCloseDia"
    >
      <div>
        <div class="flex items-center justify-center relative">
          <div class="title">explore ease</div>
          <img
            src="/@/static/close.png"
            alt=""
            class="absolute right-0 cursor-pointer"
            @click="handleCloseDia"
          />
        </div>

        <div v-if="isLogin">
          <img src="/@/static/hi.png" alt="" class="mt-5" />
          <el-form
            class="mt-10 w-full"
            ref="ruleFormRef"
            :rules="rules"
            :model="ruleForm"
          >
            <el-form-item prop="userName">
              <div class="flex flex-col mx-auto w-full">
                <p style="color: #3569b7">Email</p>
                <el-input
                  type="text"
                  placeholder="example@gmail.com"
                  v-model="ruleForm.userName"
                  clearable
                  autocomplete="off"
                  maxlength="30"
                  class="ipt w-full"
                  @keyup.enter="onSignIn"
                >
                </el-input>
              </div>
            </el-form-item>
            <el-form-item prop="password">
              <div class="flex flex-col mx-auto w-full">
                <p style="color: #3569b7">Password</p>
                <el-input
                  :type="isShowPassword ? 'text' : 'password'"
                  placeholder="Enter Your Password"
                  v-model="ruleForm.password"
                  autocomplete="off"
                  maxlength="20"
                  class="ipt"
                  @keyup.enter="onSignIn"
                >
                  <template #suffix>
                    <!-- <img src="/@/static/eye.png" alt="" /> -->
                    <img v-if="!isShowPassword" src="/@/static/eye.png" alt="" @click="isShowPassword = !isShowPassword"/>
                    <img  v-else src="/@/static/unsee.png" style="width:18px" alt="" @click="isShowPassword =!isShowPassword"/>
                  </template>
                </el-input>
              </div>
            </el-form-item>

            <el-form-item prop="api_key">
              <div class="flex flex-col mx-auto w-full">
                <p style="color: #3569b7">api_key</p>
                <el-input
                  type="text"
                  placeholder="api_key"
                  v-model="ruleForm.api_key"
                  clearable
                  autocomplete="off"
                  maxlength="30"
                  class="ipt w-full"
                  @keyup.enter="onSignIn"
                >
                </el-input>
              </div>
            </el-form-item>

            <div class="flex justify-between w-full my-2 px-4">
            </div>
            <el-form-item>
              <el-button
                type="primary"
                class="login-btn"
                @click="onSignIn"
                :loading="loading"
              >
                Login
              </el-button>
            </el-form-item>
          </el-form>

          <div class="flex justify-center">
            <span>Don’t have an account ? </span>
            <span
              style="color: #3569b7"
              class="ml-2 cursor-pointer"
              @click="handleAction(1)"
            >
              Sign Up
            </span>
          </div>
        </div>

        <!-- register -->
        <div v-else>
          <img src="/@/static/hi2.png" alt="" class="mt-5" />
          <el-form class="mt-10" ref="ruleFormRef" :rules="rules" :model="ruleForm">
            <el-form-item prop="userName w-full">
              <div class="flex flex-col mx-auto w-full">
                <p style="color: #3569b7">Email</p>
                <el-input
                  type="text"
                  placeholder="example@gmail.com"
                  v-model="ruleForm.userName"
                  clearable
                  autocomplete="off"
                  maxlength="30"
                  class="ipt w-full"
                  @keyup.enter="onRegister"
                >
                </el-input>
              </div>
            </el-form-item>
            <el-form-item prop="password">
              <div class="flex flex-col mx-auto w-full">
                <p style="color: #3569b7">Create Password</p>
                <el-input
                  :type="isShowPassword ? 'text' : 'password'"
                  placeholder="Enter Your Password"
                  v-model="ruleForm.password"
                  autocomplete="off"
                  maxlength="20"
                  class="ipt w-full"
                  @keyup.enter="onRegister"
                >
                  <template #suffix>
                    <img v-if="!isShowPassword" src="/@/static/eye.png" alt="" @click="isShowPassword =!isShowPassword"/>
                    <img  v-else src="/@/static/unsee.png" style="width:18px" alt="" @click="isShowPassword =!isShowPassword"/>
                  </template>
                </el-input>
              </div>
            </el-form-item>
            <el-form-item prop="repassword">
              <div class="flex flex-col mx-auto w-full">
                <p style="color: #3569b7">Confirm Password</p>
                <el-input
                  :type="isShowrePassword ? 'text' : 'password'"
                  placeholder="Enter Your Password"
                  v-model="ruleForm.repassword"
                  autocomplete="off"
                  maxlength="20"
                  class="ipt w-full"
                  @keyup.enter="onRegister"
                >
                  <template #suffix>
                    <img v-if="!isShowrePassword" src="/@/static/eye.png" alt="" @click="isShowrePassword = !isShowrePassword"/>
                    <img  v-else src="/@/static/unsee.png" style="width:18px" alt="" @click="isShowrePassword =!isShowrePassword"/>

                  </template>
                </el-input>
              </div>
            </el-form-item>

            <el-form-item>
              <el-button
                type="primary"
                class="login-btn"
                @click="onRegister"
                :loading="loading"
              >
                Sign Up
              </el-button>
            </el-form-item>
          </el-form>

          <div class="flex justify-center">
            <span>Already have an account ? </span>
            <span
              style="color: #3569b7"
              class="ml-2 cursor-pointer"
              @click="handleAction(2)"
            >
              Login
            </span>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { ref } from "vue";
import { useMapStore } from "/@/stores/mapRoutes";
const store = useMapStore();
const ruleFormRef = ref();

const validateName = (rule, value, callback) => {
  if (!value) {
    callback(new Error("Please enter the account number"));
  } else if (!email(value)) {
    // callback(new Error("Please enter the correct email address"));
    callback();
  } else {
    callback();
  }
};

let isLogin = ref(true);
/**
 * 验证电子邮箱格式
 */
function email(value) {
  return /^\w+((-\w+)|(\.\w+))*@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/.test(
    value
  );
}

let ruleForm = ref({
  userName: "",
  password: "",
  repassword: "",
  api_key: "",
});

const validatePsd = (rule, value, callback) => {
  if (!value) {
    callback(new Error("Please enter the password"));
  } else {
    callback();
  }
};

const validatePsd2 = (rule, value, callback) => {
  if (!value) {
    callback(new Error("Please enter the password"));
  } else if (ruleForm.value.password !== ruleForm.value.repassword) {
    callback(new Error("The password is inconsistent twice"));
  } else {
    callback();
  }
};
const rules = {
  api_key: [{ required: true, trigger: "blur" }],
  userName: [{ validator: validateName, required: true, trigger: "blur" }],
  password: [{ validator: validatePsd, required: true, trigger: "blur" }],
  repassword: [{ validator: validatePsd2, required: true, trigger: "blur" }],
};
let loading = ref(false);
let isShowPassword = ref(false);
let isShowrePassword = ref(false);

function handleCloseDia() {
  store.showLogin = false;
  isLogin.value = true;
  resetForm();
}

function handleAction(type) {
  isLogin.value = type === 2;
  resetForm();
}

function onSignIn() {
  ruleFormRef.value.validate((valid, fields) => {
    if (valid) {
      loading.value = true;
      store.login(ruleForm.value).finally(() => (loading.value = false));
    }
  });
}
function onRegister() {
  ruleFormRef.value.validate((valid, fields) => {
    if (valid) {
      loading.value = true;
      store.register(ruleForm.value).then(res=>{
         if(res) {
           resetForm()
           isLogin.value = true
         }
      })
      .finally(() => (loading.value = false));
    }
  });
}
function ToFind() {}

function resetForm() {
  ruleFormRef.value.resetFields();
  loading.value = false;
  isShowPassword.value = false
  isShowrePassword.value = false
  ruleForm.value = {
    userName: "",
    password: "",
    repassword: "",
    api_key: "",
  };
}
</script>

<style lang="scss" scoped>
:deep(.el-dialog) {
  border-radius: 40px;
  padding: 20px 40px;
}
.title {
  font-size: 32px;
  font-weight: 700;
  text-align: center;
  background: linear-gradient(90deg, #618ac8 0%, #75c7cc 100%);
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.ipt {
  height: 48px;
  border-radius: 10px;
}
:deep(.input__wrapper) {
  border: 1px solid #3569b766;
}

.login-btn {
  width: 312px;
  height: 48px;
  border-radius: 48px;
  border: none;
  margin: auto;
  background: #5c789e;
}
</style>
