<template>

  <el-container>

    <bodyHeader/>
    <div id="slider" class="right-sider" :class="[$store.state.sys.pwdCollapse?'active':'']" >
      <el-form :model="userInfo" :rules="rules" ref="userInfo">
        <el-form-item label="" class="form-group label-no-margin" prop="origPwd">
          <el-col>
            <el-input placeholder="原密码" v-model="userInfo.origPwd" type="password"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="" class="form-group label-no-margin" prop="newPwd">
          <el-col>
            <el-input placeholder="新密码" v-model="userInfo.newPwd" type="password"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="" class="form-group label-no-margin" prop="newPwd2" style="border:none">
          <el-col>
            <el-input placeholder="重复新密码" v-model="userInfo.newPwd2" type="password"></el-input>
          </el-col>
        </el-form-item>
        <div class="clearfix">
          <el-button type="primary" @click="changePwd" style="float:left;width:47%">修改密码</el-button>
          <el-button type="info" @click="rest" style="float:right;width:47%;background:#999;border-color:#999">取消</el-button>
        </div>
      </el-form>
    </div>

    <el-container>
      <el-aside id="testAside" v-bind:style="{width: $store.state.sys.asideWidth + 'px',height:$store.state.sys.screen.workAreaHeight+'px' }" >
        <subMenu/>
      </el-aside>
      <el-container>
        <el-main>
          <el-row :gutter="20">
            <el-col :span="24">
              <router-view/>
            </el-col>
          </el-row>
        </el-main>

      </el-container>

    </el-container>
    <el-footer>Footer</el-footer>
  </el-container>

</template>

<script>
import bodyHeader from "@/components/mainHeader.vue";
import subMenu from "@/components/subMenu.vue";
import systemMain from "@/components/systemMain.vue";
import $ from "jquery";
export default {
  name: "main-frame",
  components: {
    subMenu,
    bodyHeader,
    systemMain
  },
  data() {
    var valOld = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入旧密码"));
      } else {
        console.log(value);
        callback();
      }
    };

    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.userInfo.newPwd) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      timer: true,
      userInfo: {
        origPwd: "",
        newPwd: "",
        newPwd2: ""
      },

      rules: {
        origPwd: [
          {
            validator: valOld,
            trigger: "blur"
          }
        ],
        newPwd: [
          {
            validator: validatePass,
            trigger: "change"
          }
        ],
        newPwd2: [
          {
            validator: validatePass2,
            trigger: "blur"
          }
        ]
      }
    };
  },
  created() {
    console.log("mainfrmae ............................");
  },
  mounted() {
    const that = this;

    window.onresize = () => {
      return (() => {
        let wHeight = document.documentElement.clientHeight;

        this.$store.state.sys.screen.contentHeight = wHeight;
      })();
    };
  },
  beforeRouteUpdate(to, from, next) {
    next();
  },
  watch: {
    $route(to, from) {},
    screenHeight(val) {
      if (!this.timer) {
        this.screenHeight = val;
        this.$store.state.sys.screenHeight = val;
        this.timer = true;
        let that = this;
        setTimeout(function() {
          that.timer = false;
        }, 800);
      }
    }
  },
  methods: {
    rest() {
      this.$refs["userInfo"].resetFields();
      this.$store.dispatch("setPwd", false);
      //$("#slider").attr("class", "right-sider");
    },
    changePwd() {
      this.$refs["userInfo"].validate(valid => {
        if (valid) {
          console.log("调用接口！");
        } else {
          return false;
        }
      });
    }
  }
};
</script>

<style>
.el-main {
  padding-top: 0px;
  padding-bottom: 0px;
  padding-left: 10px;
  padding-right: 10px;
}

.el-col {
  border-radius: 4px;
  padding-right: 2px !important;
  padding-left: 2px !important;
}

.bg-purple-dark {
  background: #99a9bf;
}

.bg-purple {
  background: #d3dce6;
}

.bg-purple-light {
  background: #e5e9f2;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}

.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}

.right-sider.active {
  right: 0px;
}

.right-sider {
  width: 240px;
  padding: 20px;
  box-sizing: border-box;
  border-radius: 2px;
  position: fixed;
  right: -240px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  transition: opacity 0.3s, transform 0.3s, right 0.3s, top 0.4s;
  overflow: hidden;
  z-index: 999;
  top: 60px;
  height: 100%;
}
</style>
