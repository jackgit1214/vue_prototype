<template>
<header id="header" class="main-header">
  <a href="#" @click="expandMenu" id="menu-toggle">
    <font-awesome-icon icon="bars" size="2x" /> </a>
  <a id="mytitle" class="logotext" href="#" @click="testMenu">XXX管理系统 1.0</a>
          <el-button type="small" @click="goTest">go</el-button>
                  <el-button type="small" @click="goTest1">go1</el-button>
                  <el-button type="small" @click="goTest2">go2</el-button>
  <nav class="navbar">
    <el-menu :default-active="activeIndex" @select="handleSelect" mode="horizontal">
      <el-menu-item index="1">
        <el-badge :value="3" class="item">
          <i class="el-icon-message"></i>
        </el-badge>
      </el-menu-item>
      <el-menu-item index="2">
        <el-popover placement="bottom" trigger="click" popper-class="customPopper">
          <div class="personContent">
            <div class="userHeader">
              <img src="@/assets/img/back-img/skin-ocean.jpg" class="img-circle" alt="User Image">
              <p>{{curUser.name}}（{{curUser.loginId}}）
                <small>{{curUser.loginDate}}</small>
              </p>
            </div>
            <div class="user-body">
              <el-row>
                <el-col :span="8">
                  <p>{{curUser.email}}</p>
                </el-col>
                <el-col :span="8">
                  <p>{{curUser.qq}}</p>
                </el-col>
                <el-col :span="8">
                  <p>{{curUser.phone}}</p>
                </el-col>
              </el-row>
              <!-- /.row -->
            </div>
          </div>
          <span slot="reference">
            <font-awesome-icon icon="user" size="2x" />
            <span> {{curUser.name}}</span>
          </span>
        </el-popover>
      </el-menu-item>
      <el-menu-item index="3">
        <i class="el-icon-setting"></i>
      </el-menu-item>
    </el-menu>
  </nav>
</header>
</template>

<script>
import $ from "jquery";
import { Menus } from "@/router/menu";
import { testMenus } from "@/router/test.js";
export default {
  name: "sys-mainheader",
  components: {},
  data() {
    return {
      sysMenus: Menus,
      switchValue: true,
      curUser: {
        name: "张三",
        loginId: "admin",
        loginDate: new Date(),
        email: "23422@qq.com",
        qq: "23422",
        phone: "15214587894"
      },
      input21: "",
      activeIndex: "2"
    };
  },
  methods: {
    showPwd() {
      if (this.$store.state.sys.pwdCollapse) {
        this.$store.dispatch("setPwd", false);
      } else {
        this.$store.dispatch("setPwd", true);
      }
    },
    expandMenu() {
      this.$store.dispatch("setCollapse", !this.$store.state.sys.collapse);
    },
    handleSelect(key, keyPath) {},
    changeSwi(val) {
      $("#testAside").toggle();
    },
    getIndex() {
      this.$router.push("/person");
    },
    goTest() {
      this.$router.addRoutes(testMenus);
      let loginParams = {
        loginName: "admin",
        password: "123456"
      };
      window.sessionStorage.setItem("user", JSON.stringify(loginParams));
    },
    goTest1() {
      this.$router.push("/system/code");
    },
    goTest2() {
      this.$router.push("/system/index");
    },
    testMenu() {
      var os = require("os");

      //获取cpu(处理器架构)
      var arch = os.arch();
      console.log("获取cpu(处理器架构)" + arch);

      //获取cpu信息
      var cpus = os.cpus();
      console.log("cpu信息:" + cpus.model);

      //字节顺序 高位优先返回BE,低位优先的返回LE
      var endianness = os.endianness();
      console.log("字节顺序 高位优先返回BE,低位优先的返回LE" + endianness);

      //空闲内存字节
      var freemem = os.freemem();
      console.log("空闲内存字节" + freemem);

      //当前登录用户的根目录
      var homedir = os.homedir();
      console.log("登录用户的根目录" + homedir);

      //操作系统主机名
      var hostname = os.hostname();
      console.log("主机名：" + hostname);

      //系统最近5、10、15分钟的平均负载,这是一个针对linux或unix的统计，windows下始终返回[0,0,0]
      var loadavg = os.loadavg();
      console.log(loadavg);

      //网络配置列表
      var networkInterfaces = os.networkInterfaces();
      console.log("网络配置列表" + networkInterfaces.toString());
      for (item1 in networkInterfaces) {
        console.log(item1);
      }
      //操作系统类型,返回值有'darwin', 'freebsd', 'linux', 'sunos' , 'win32'
      var platform = os.platform();
      console.log("操作系统类型" + platform);

      //操作系统版本
      var release = os.release();
      console.log("操作系统版本" + release);

      //操作系统临时文件的默认目录
      var tmpdir = os.tmpdir();
      console.log(tmpdir);

      //系统总内存
      var totalmem = os.totalmem();
      console.log(totalmem);

      //操作系统名称，基于linux的返回linux,基于苹果的返回Darwin,基于windows的返回Windows_NT
      var type = os.type();
      console.log(type);

      //计算机正常运行时间
      var uptime = os.uptime();
      console.log(uptime);
    },
    logout() {
      this.$router.push("/test1");
    }
  }
};
</script>

<style lang="scss" scoped>
.item {
  margin-top: 10px;
  margin-right: 30px;
}

.el-icon-message {
  padding-bottom: 10px;
}

.personContent {
  width: 300px;
}

.el-row {
  margin-bottom: 1px;
}
</style><style lang="scss">
.customPopper {
  padding: 5px;
  margin-top: 25px !important;
}

.el-menu--horizontal .el-menu-item {
  padding-left: 2px;
  padding-right: 2px;
  height: 55px;
}

.item sup {
  top: 15px !important;
}
</style>
