常用表格类型封装
<!--调用时: 例:-->
<!--<ComTable-->
<!--  :handleWidth="200"-->
<!--  :tableTitle="tableTitle"-->
<!--  :tableData="tableData"-->
<!--  @handleChange="handleChange"-->
<!--  @handleSwitch="handleSwitch"-->
<!--  @handleChecked="handleChecked"-->
<!--&gt;-->
<!--  <template slot="handle" slot-scope="scope">-->
<!--    <el-button type="text" size="small">编辑{{scope.index}}</el-button>-->
<!--  </template>-->
<!--</ComTable>-->
调用时参数说明:
    type: 表格类型.  非必传.  值: selection(多选)  /  checkbox(单选)   类型: string /index:序号1.2.3...
    ishandle: 是否展示操作栏    非必传    默认为true    true/false
    isMove: 是否可以上下移动    非必传    默认为false    true/false
    handleWidth: 操作栏宽度    非必传   默认200
    tableTitle: 表头.  必传.   类型: 数组   例:
        tableTitle: [{
            prop: 'name',  绑定的字段
            label: '姓名',   表头名称
            width: '200',   列宽度
            filter: 'date'    过滤器. 需要展示的类型. 非必传.  值:
                date: 日期格式(YYYY-MM-DD)
                time: 时间格式(YYYY-MM-DD : HH:mm:ss)
                image: 图片
        }]
    tableData: 要展示的数据. 必传   类型: array   例:
        tableData: [{
        name: '张三',
        age: '10',
        date: new Date()
        }],
插槽:
    slot="handle":    handle: 插槽名称
    slot-scope="scope":    scope: 组件传递给插槽的值  scope.row:  当前行的内容  scope.index: 当前行的索引
事件:
    handleChange (size, current) {}, //分页改变时的回调----   size: 每页的数量   current: 第几页
    handleSwitch (row, index) {}, // 切换开关时的回调-========   this.tableData: 滑块值改变后的数据.row: 当前行数据 index: 当前行的索引
    handleChecked (val) {},  // 勾选时的回调----   val: 选中的数据  多选是val是数组, 单选时是对象

<template>
  <div class="hello">
    <el-table
      :data="tableData"
      style="width: 98%"
      @selection-change="handleSelectionChange"
      border>
      <el-table-column v-if="type=='checkbox'" label="选择">
        <template slot-scope="{ row }">
          <el-checkbox v-model="row.isChecked" @change="handleChecked(row)"></el-checkbox>
        </template>
      </el-table-column>
      <el-table-column v-if="type=='selection'" :reserve-selection="true" type="selection" width="55" />
      <el-table-column v-if="type=='index'" type="index" label="序号" width="55" />
      <template v-for="(item, index) of tableTitle">
        <el-table-column
          :prop="item.prop"
          :label="item.label"
          :key="index"
          :min-width="item.width"
        >
          <template slot-scope="{ row, $index }" style="height: 100%;">
            <span v-if="item.filter == 'date'">
              {{ row[item.prop] | dateFilter }}
            </span>
            <span v-else-if="item.filter == 'time'">
              {{ row[item.prop] | timeFilter }}
            </span>
            <span v-else-if="item.filter == 'image' && row[item.prop]">
              <img :src="row[item.prop]" alt="" style="height: 45px;">
            </span>
            <span v-else-if="item.filter == 'switch'">
              <el-switch
                v-model="row[item.prop]"
                @change="change(row, $index)"
              />
            </span>
            <span v-else>
              {{ row[item.prop] }}
            </span>
          </template>
        </el-table-column>
      </template>
<!--      插槽: 操作-->
      <el-table-column label="操作" v-if="ishandle" :width="handleWidth">
        <template slot-scope="scope">
          <slot name="handle" :row="scope.row" :index="scope.$index"></slot>
          <span style="margin-left: 10px" v-if="isMove"  class="customRow">
            <a
              class="el-icon-top"
              @click.stop="handleMove(scope.row, scope.$index, 'up')">
            </a>
            <a
              class="el-icon-bottom"
              @click.stop="handleMove(scope.row, scope.$index, 'down')">
            </a>
          </span>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      background
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      :page-size="pageSize"
      :current-page.sync="current"
      :page-sizes="[10, 20, 30, 40, 50, 100]"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      >
    </el-pagination>

  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    handleWidth: { // 操作宽度
      default: 200
    },
    isMove: {// 是否支持移动
      type: Boolean,
      default: false
    },
    ishandle: { // 是否有操作按钮
      type: Boolean,
      default: true
    },
    queryInfo: Object, // 其他参数
    type: String, // 单选/多选/或值展示
    tableTitle: Array, // 表头
    tableData: Array, // 数据
  },
  data () {
    return {
      total: 1000,
      pageSize: 10,
      current: 1
    }
  },
  methods: {
    handleSizeChange (size) { // 改变每页数量
      this.pageSize = size
      this.$emit('handleChange', this.pageSize, this.current)
    },
    handleChecked (row) { // 单选
      if (row.isChecked) {
        this.tableData.map(item => {
          if (item.id != row.id) {
            this.$set(item, 'isChecked', false)
          }
        })
        this.$emit('handleChecked', row)
      } else {
        this.$emit('handleChecked', '', row)
      }
    },
    handleSelectionChange (row) { // 多选
      this.$emit('handleChecked', row)
    },
    handleCurrentChange (current) { //换页
      this.current = current
      this.$emit('handleChange', this.pageSize, this.current)
    },
    change (row, index) { // 切换开关
      this.$emit('handleSwitch', row, index)
    },
    // 上下移动
    handleMove(row, idx, dropType) {
      let upid
      if (dropType == 'up') {
        if(idx == 0){
          this.$message({
            message: '处于顶端，不能继续上移',
            type: 'warning'
          });
          return
        }
        upid = idx-1;
      } else {
        if(idx == this.tableData.length - 1){
          this.$message({
            message: '处于底端，不能继续下移',
            type: 'warning'
          });
          return
        }
        upid = idx + 1;
      }
      let param = {};
      param.id1 = row.id;//当前节点id
      param.id2 =this.tableData[upid].id;//上/下一个节点id
      this.$emit('handleMove', param)
    },
  }
}
</script>

<style scoped lang="scss">
  .customRow {
    a {
      color: #6C57FF;
    }
    a:hover {
      color: #DF396C
    }
  }
</style>
