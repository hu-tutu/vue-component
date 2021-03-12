
<template>
  <div class="home">
    <div class="home-control">
      <Com_Excel></Com_Excel>
      <Com_Dragger></Com_Dragger>
      <Com_Spreadsheet></Com_Spreadsheet>
      <Button @click="type='tree'">tree的封装</Button>
      <Button @click="type='table'">table封装</Button>
      <Button @click="type='simple'">单元格合并-简单版本</Button>
      <!--  -->
      <Button @click="type='encapsulation'">单元格合并-封装版本</Button>
    </div>
    <div class="view-wrap">
<!--      tree组件-->
      <ComTree
        v-if="type === 'tree'"
        :handleWidth="200"
        :treeData="data"
        :queryInfo="queryTree"
        @tree-move="handleTreeMove"
      >
        <template slot="buttonSlot" slot-scope="scope">
          <el-button type="text" icon="el-icon-plus" size="small" @click.stop="deleteTree(scope.row)">新增</el-button>
          <el-button type="text" icon="el-icon-edit-outline" size="small" @click.stop="deleteTree(scope.row)">编辑</el-button>
          <el-button type="text" icon="el-icon-delete" size="small" @click.stop="deleteTree(scope.row)">删除</el-button>
        </template>
      </ComTree>
<!--      table组件-->
      <ComTable
        v-if="type === 'table'"
        :handleWidth="200"
        :tableTitle="tableTitle"
        :tableData="tableData"
        @handleMove="handleMove"
        @handleChange="handleChange"
        @handleSwitch="handleSwitch"
        @handleChecked="handleChecked"
      >
        <template slot="handle" slot-scope="scope">
          <el-button type="text" size="small" @click.stop="deleteTree(scope.row)">编辑</el-button>
        </template>
      </ComTable>
<!--      合并单元格-->
      <simple v-if="type === 'simple'"></simple>
      <encapsulation v-if="type === 'encapsulation'"></encapsulation>
    </div>
  </div>
</template>

<script>
import ComTable from '@/components/Com_Table.vue'
import ComTree from '@/components/Com_Tree.vue'
import simple from '../components/simple'
import encapsulation from '../components/encapsulation'
import Com_Excel from "../components/Com_Excel";
import Com_Dragger from "../components/Com_Dragger";
import Com_Spreadsheet from "../components/Com_Spreadsheet";

import { mapActions, mapState } from 'vuex'

export default {
  name: 'Home',
  components: {
    ComTable,
    ComTree,
    simple,
    encapsulation,
    Com_Excel,
    Com_Dragger,
    Com_Spreadsheet
  },
  data () {
    return {
      // 树
      type: 'tree',
      queryTree: {
        isMove: true,
      },
      data: [
        {
        id: 1,
        label: '一级 1',
        children: [{
          id: 4,
          label: '二级 1-1',
          children: [{
            id: 9,
            label: '三级 1-1-1'
          }, {
            id: 10,
            label: '三级 1-1-2'
          }]
        }]
      }, {
        id: 2,
        label: '一级 2',
        children: [{
          id: 5,
          label: '二级 2-1'
        }, {
          id: 6,
          label: '二级 2-2'
        }]
      }, {
        id: 3,
        label: '一级 3',
        children: [{
          id: 7,
          label: '二级 3-1'
        }, {
          id: 8,
          label: '二级 3-2',
          children: [{
            id: 11,
            label: '三级 3-2-1'
          }, {
            id: 12,
            label: '三级 3-2-2'
          }, {
            id: 13,
            label: '三级 3-2-3'
          }]
        }]
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
      },

      // 表格
      tableTitle: [
        {
        prop: 'name',
        label: '姓名',
        width: '200',
      },{
        prop: 'sex',
        label: '性别',
        width: '200',
        filter: 'switch',
      },{
        prop: 'url',
        label: '头像',
        width: '200',
        filter: 'image',
      },{
        prop: 'date',
        label: '出生日期',
        width: '200',
        filter: 'date'
      },],
      tableData: [
        {
        id: 1,
        name: '张三',
        sex: true,
        url: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3202059567,1723387850&fm=26&gp=0.jpg',
        date: new Date()
      },{
        id: 2,
        name: '张三',
        sex: true,
        url: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3202059567,1723387850&fm=26&gp=0.jpg',
        date: new Date()
      },{
        id: 3,
        name: '张三',
        sex: true,
        url: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3202059567,1723387850&fm=26&gp=0.jpg',
        date: new Date()
      },{
        id: 4,
        name: '张三',
        sex: true,
        url: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3202059567,1723387850&fm=26&gp=0.jpg',
        date: new Date()
      },],
    }
  },
  computed: {
    ...mapState(['findSubject'])
  },
  mounted() {
    this.getDetails('0000')
  },
  methods: {
    ...mapActions(['getDetails']),
    deleteTree (row) {
      console.log(row)
    },
    // tree相关事件
    handleTreeMove (params) {
      // param.id1  当前节点id
      // param.id2  上/下一个节点id
      console.log(params)
    },

    // table相关事件
    handleChange (size, current) {
      // 分页改变时的回调----   size: 每页的数量   current: 第几页
      console.log(size, current, 'tableData')
    },
    handleSwitch (row, index) {
      // 切换开关时的回调-========   this.tableData: 滑块值改变后的数据.row: 当前行数据 index: 当前行的索引
      console.log(this.tableData, '--tableData---', row, index)
    },
    handleChecked (val) {
      // 勾选时的回调----   val: 选中的数据  多选是val是数组, 单选时是对象
      console.log(val, 'val===')
    },
    handleMove (params) {
      // 上下移动时的回调========param.id1  当前节点id   param.id2   上/下一个节点id
      console.log(params)
    },
  }
}
</script>
<style lang="scss" scoped>
  .home {
    margin-top: 40px;
    .home-control {
      margin-bottom: 20px;
    }
  }

</style>
