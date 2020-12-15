<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <el-row>
        <el-col :span="3">
          <el-button type="primary">添加角色</el-button>
        </el-col>
      </el-row>

      <!-- 表格数据 -->
      <el-table :data="rolesList" stripe border>
        <!-- 展开列 -->
        <el-table-column type="expand">
          <template slot-scope="scope">
            <el-row
              v-for="(item1, index1) in scope.row.children"
              :key="item1.id"
              class="bdbottom vcenter"
              :class="{ bdtop: index1 === 0 }"
            >
              <!-- 一级权限 -->
              <el-col :span="5">
                <el-tag>{{ item1.authName }}</el-tag>
                <i class="el-icon-caret-right"></i>
              </el-col>
              <!-- 二级 三级权限 -->
              <el-col :span="19">
                <el-row
                  v-for="(item2, index2) in item1.children"
                  :key="item2.id"
                  :class="{ bdtop: index2 !== 0 }"
                >
                  <el-col :span="6">
                    <el-tag>{{ item2.authName }}</el-tag>
                    <i class="el-icon-caret-right"></i>
                  </el-col>
                  <el-col :span="18">
                    <el-tag
                      type="warning"
                      v-for="item3 in item2.children"
                      :key="item3.id"
                      closable
                      @close="removeRoleById(scope.row, item3.id)"
                      >{{ item3.authName }}</el-tag
                    >
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
            <pre>{{ scope.row }}</pre>
          </template>
        </el-table-column>
        <!-- 数据列 -->
        <el-table-column type="index"></el-table-column>
        <el-table-column label="角色名称" prop="roleName"></el-table-column>
        <el-table-column label="角色描述" prop="roleDesc"></el-table-column>
        <el-table-column label="操作" width="300px">
          <template slot-scope="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              @click="showEditDialog(scope.row.id)"
              >编辑</el-button
            >
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="removeRoleById(scope.row.id)"
              >删除</el-button
            >
            <el-button
              type="warning"
              icon="el-icon-setting"
              size="mini"
              @click="showSetRightDialog(scope.row)"
              >分配权限</el-button
            >
          </template>
        </el-table-column>
      </el-table>

      <!-- 分配权限 -->
      <el-dialog
        title="分配权限"
        :visible.sync="setRightDialogVisible"
        width="50%"
        @close="setRightDialogClosed"
      >
        <el-tree
          :data="rightsList"
          :props="treeProps"
          ref="treeRef"
          show-checkbox 
          node-key="id"
          default-expand-all
          :default-checked-keys="defKeys"
        ></el-tree>
        <span slot="footer" class="dialog-footer">
          <el-button @click="setRightDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="allotRights">确 定</el-button>
        </span>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      rolesList: [],

      // 权限列表
      rightsList: [],
      // 树形组件的格式
      treeProps: {
        label: 'authName',
        children: 'children'
      },
      //   默认选中节点ID值
      defKeys: [],
      //   当前即将分配权限的Id
      roleId: 0,
      setRightDialogVisible: false
    };
  },
  created() {
    this.getRolesList();
  },
  methods: {
    // 请求数据
    async getRolesList() {
      const { data: res } = await this.$http.get("roles");
      if (res.meta.status !== 200) {
        return this.$message.error("获取角色列表失败！");
      }

      this.rolesList = res.data;
    },
    // tag标签的x按钮
    async removeRoleById(role, rightId) {
      const confirmRes = await this.$confirm(
        "此操作将永久删除该文件, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => err);

      if (confirmRes !== "confirm") {
        return this.$message("已取消");
      }
      // 确认发送网络请求
      const { data: res } = await this.$http.delete(
        `roles/${role.id}/rights/${rightId}`
      );
      if (res.meta.status !== 200) {
        return this.$message("删除失败");
      }
      //  否则就是删除成功, 这里不重新获取数据 不然会刷新页面 直接将新的权限值赋值过去
      role.children = res.data;
      console.log(role);
      console.log(res);
    },
    // 事件监听相关
    // 分配权限按钮的点击
    async showSetRightDialog(role) {
      this.roleId = role.id
      const {data: res} = await this.$http.get('rights/tree')
      if (res.meta.status !== 200) {
        return "获取权限失败"
      }
      //   保存数据
      this.rightsList = res.data
      console.log(role);
        //   递归获取三级节点的id
      this.getLeafkeys(role, this.defKeys)

      // 显示dialog
      this.setRightDialogVisible = true
    },
    setRightDialogClosed() {
      this.defKeys = []

    },
     // 通过递归 获取角色下三级权限的 id, 并保存到defKeys数组
    getLeafkeys (node, arr) {
      // 没有children属性，则是三级节点
      if (!node.children) {
        return arr.push(node.id)
      }
      node.children.forEach(item => this.getLeafkeys(item, arr))
    },
    // 分配权限
    async allotRights () {
      // 获得当前选中和半选中的Id
      const keys = [
        ...this.$refs.treeRef.getCheckedKeys(),
        ...this.$refs.treeRef.getHalfCheckedKeys()
      ]
      // join() 方法用于把数组中的所有元素放入一个字符串
      const idStr = keys.join(',')
      const { data: res } = await this.$http.post(`roles/${this.roleId}/rights`, { rids: idStr })
      if (res.meta.status !== 200) { return this.$message.error('分配权限失败！') }
      this.$message.success('分配权限成功!')
      this.getRolesList()
      this.setRightDialogVisible = false
    }
  },
  
};
</script>

<style scoped lang="less">
.bdbottom {
  border-bottom: 1px solid #eee;
}
.bdtop {
  border-top: 1px solid #eee;
}

.el-tag {
  margin: 10px;
}
// 垂直居中
.vcenter {
  display: flex;
  align-items: center;
}
</style>