<template>
  <el-container>
    <!-- 头部 -->
    <el-header>
      <div class="logo_wrap">
        <img src="~assets/logo.png" alt="" />
        <span>电商后台管理系统</span>
      </div>
      <el-button @click="logout">退出</el-button>
    </el-header>
    <!-- 头部结束 -->
    <!-- 主体 -->
    <el-container>
      <!-- 侧边 -->
      <el-aside :width="collapse?'64px':'200px'">
        <div class="toggle_btn" @click="toggleClick">|||</div>
        <!-- 菜单 -->

        <el-menu
          :default-active="activeMenu"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          unique-opened
          :collapse="collapse"
          :collapse-transition="false"
          router 
          
          
        >
          <!-- 一级菜单 -->
          <el-submenu
            :index="'' + item.id"
            v-for="item in menuList"
            :key="item.id"
          >
            <template slot="title">
              <i :class="iconObj[item.id]"></i>
              <span>{{item.authName}}</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item :index="'/' + item2.path" v-for="item2 in item.children" :key="item2.id" @click="menuItemClick(item2.path)">
              <template>
                <i class="el-icon-menu"></i>
                <span>{{item2.authName}}</span>
              </template>
             
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 内容 -->
      <el-main> 
        
        <router-view></router-view>
        
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      menuList: [],
      iconObj: {
        '125': 'iconfont icon-user',
        '103': 'iconfont icon-tijikongjian',
        '101': 'iconfont icon-shangpin',
        '102': 'iconfont icon-danju',
        '145': 'iconfont icon-baobiao'
      },
      collapse: false,
      activeMenu: ''
    };
  },
  components: {
    
  },
  created() {
    this.getMenuList();
  },
  methods: {
    logout() {
      window.sessionStorage.clear();
      this.$router.push("/login");
    },
    handleOpen(key, keyPath) {
      
    },
    handleClose(key, keyPath) {
      
    },
    menuItemClick(e) {
      this.activeMenu = e
    },
    toggleClick() {
      this.collapse = !this.collapse
    },
    async getMenuList() {
      const { data: res } = await this.$http({
        url: "/menus",
      });
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg);
      this.menuList = res.data;
  
    },
  },
};
</script>

<style scoped lang="less">
.el-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .logo_wrap {
    img {
      width: 40px;
    }
    span {
      padding-left: 10px;
    }
  }
}
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
  .iconfont {
    margin-right: 10px;
  }
  .el-menu {
    border-right: none;
  }
  .toggle_btn {
    height: 40px;
    line-height: 40px;
    width: 100%;
    cursor: pointer;
  }
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  
}

#app > .el-container {
  margin-bottom: 40px;
  height: 100%;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  
}

.el-container:nth-child(7) .el-aside {
  
}

</style>