<template>
<el-container class="login-back">
  <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-position="left" label-width="0px" class="demo-ruleForm login-container">
    <h3 class="title">系统登录</h3>
    <el-form-item prop="loginId">
      <el-input type="text" v-model="ruleForm2.loginId" auto-complete="off" placeholder="账号"></el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input type="password" v-model="ruleForm2.password" auto-complete="off" placeholder="密码"></el-input>
    </el-form-item>
    <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox>
    <el-form-item style="width:100%;">
      <el-row>
         <el-col  :span="6">&nbsp;</el-col>
        <el-col :span="6">
          <el-button type="primary" style="width:80%;" @click.native.prevent="handleSubmit2" :loading="logining">
            登录
          </el-button>
        </el-col>
        <el-col  :span="6">
          <el-button style="width:80%;" @click.native.prevent="handleReset2">重置</el-button>
        </el-col>
        <el-col  :span="6">&nbsp;</el-col>
      </el-row>

    </el-form-item>
  </el-form>
</el-container>
</template>

<script>
import NProgress from "nprogress";
import qs from "qs";

export default {
  name: "login",
  data() {
    return {
      logining: false,

      ruleForm2: {
        loginId: "admin",
        password: "123456"
      },
      rules2: {
        loginId: [
          {
            required: true,
            message: "请输入账号",
            trigger: "blur"
          }
          // { validator: validaePass }
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur"
          }
          // { validator: validaePass2 }
        ]
      },
      checked: true
    };
  },
  methods: {
    handleReset2() {
      this.$refs.ruleForm2.resetFields();
    },
    setSessionStroage(user) {
      window.sessionStorage.setItem("user", JSON.stringify(user));
      window.sessionStorage.setItem("permission", "all");
      this.$store
        .dispatch("setRouters")
        .then(res => {
          if (res.code == "200") {
            this.$router.addRoutes(this.$store.state.sys.addRouters);
            window.sessionStorage.setItem(
              "routers",
              JSON.stringify(this.$store.state.sys.addRouters)
            ); //存储路由
            this.$router.push("/");
          } else {
            this.handleReset2();
          }
        })
        .catch(error => {
          console.log(error);
          this.handleReset2();
        });
    },
    handleSubmit2(ev) {
      let that = this;
      this.$refs.ruleForm2.validate(valid => {
        if (valid) {
          this.logining = true;
          NProgress.start();
          let loginParams = {
            loginName: this.ruleForm2.loginId,
            password: this.ruleForm2.password
          };
          // $http
          //   .post(
          //     "http://localhost:8080/museum/public/test/getModel",
          //     qs.stringify(loginParams)
          //   )
          //   .then(resp => {});
          if (
            this.ruleForm2.loginId == "admin" &&
            this.ruleForm2.password == "123456"
          ) {
            NProgress.done();
            this.logining = false;
            this.setSessionStroage(loginParams);
          } else {
            this.$message.error("请输入正确的用户名密码！");
            NProgress.done();
            this.logining = false;
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.login-container {
  /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
  -webkit-border-radius: 5px;
  border-radius: 5px;
  -moz-border-radius: 5px;
  background-clip: padding-box;
  margin-bottom: 20px;
  background-color: #f9fafc;

  margin: 180px auto;
  border: 0px solid #729bd1;
  width: 450px;
  padding: 35px 35px 15px 35px;
  .title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }
  .remember {
    margin: 0px 0px 35px 0px;
  }
}
.login-back {
  background-color: #62ce4d;
  background-image: url("../assets/img/back-img/skin-greenish.jpg");
  -moz-background-size: 100% 100%;
  background-size: 100% 100%;
  background-repeat: repeat;
}
</style>
