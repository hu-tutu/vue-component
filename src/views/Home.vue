
<template>
  <div class="home">
    <ComTable
      :handleWidth="200"
      :tableTitle="tableTitle"
      :tableData="tableData"
      @handleChange="handleChange"
      @handleSwitch="handleSwitch"
      @handleChecked="handleChecked"
    >
      <template slot="handle" slot-scope="scope">
        <el-button type="text" size="small">编辑{{scope.index}}</el-button>
      </template>
    </ComTable>
  </div>
</template>

<script>
import ComTable from '@/components/Com_Table.vue'

export default {
  name: 'Home',
  components: {
    ComTable
  },
  data () {
    return {
      tableTitle: [{
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
      tableData: [{
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
  mounted() {
  },
  methods: {
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

    }
  }
}
</script>
