<template>
  <div id="app">
    <header class="header" ></header>
    <el-container class="container">
      <menu class="menuLeft"></menu>
      <div class="main">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>活动管理</el-breadcrumb-item>
          <el-breadcrumb-item>活动列表</el-breadcrumb-item>
          <el-breadcrumb-item>活动详情</el-breadcrumb-item>
        </el-breadcrumb>
        <router-view />
      </div>
    </el-container>
  </div>
</template>

<script>
  export default {

  }
</script>

<style lang="scss">
  html, body, #app {
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;

  }
  div {
    padding: 0;
    margin: 0;
  }
  #app {
    display: flex;
    flex-direction: column;
    .header {
      height: 100px;
      background-color: #42b983;
    }
    .container {
      flex: 1;
    }
  }


  #app .container{
    margin: 0;
    padding: 0;
    display: flex;
    .menuLeft {
      padding: 0;
      margin: 0;
      background-color: #f66;
      width: 300px;
      height: 100%;
    }
    .main {
      padding: 20px;
    }
  }

</style>
