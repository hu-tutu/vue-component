<template>
  <div class="com-dragger">
<!--    安装命令： npm install --save sortablejs vuedraggable-->
    <!--使用draggable组件 sortablejs原生实现拖拽的js ， 实现拖拽功能-->
    <div class="containerLift">

<!--      表单头部-->
      <div class="deliveryTitle">
        <draggable class="draggableTitle" v-model="titleData" group="itxst"  @end="end" @start="start" animation="300">
          <el-row>
            <el-col :span="(24/titleData.length)" v-for="(item, index) in titleData" :key="index">
              <div  class="inputBoox" v-if="item != null">
                <div v-if="item.type == 'image'" class="upload-box">
                  <el-upload
                    class="avatar-uploader"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess">
                    <img v-if="imageUrl" :src="imageUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
                </div>
                <div class="titleItem" v-else>{{item.name}}</div>
                <i class="el-icon-close deleteBtn" @click="deleteItem(titleData, item, index)"></i>
              </div>
            </el-col>
          </el-row>
        </draggable>
      </div>


<!-- 主表信息 -->
      <div class="dragger-col">
        <draggable
          v-for="(row, i) of mainDatas"
          :key="i"
          class="draggableBox"
          v-model="row.mainRow"
          group="itxst"
          @end="end"
          @start="start"
          animation="300">
          <transition-group>
            <div v-for="(item, index) in row.mainRow" :key="index">
              <div  class="inputBoox" v-if="item != null">
                <div>{{ item.name }}</div>
                <div></div>
                <i class="el-icon-close deleteBtn" @click="deleteItem(row.mainRow, item, index)"></i>
              </div>
              <div class="inputBoox" v-else></div>
            </div>
          </transition-group>
        </draggable>
        <div class="addCol">
          <el-button type="primary" plain size="mini" @click="addRow()">添加列</el-button>
          <el-button type="danger" plain size="mini">删除列</el-button>
        </div>
      </div>

<!--      表格字段-->
      <div class="tablecol">
        <el-table
          :data="dataList"
          border
          row-key="id"
          align="left">
          <el-table-column
            v-for="(item, index) in tableTitle"
            :key="`col_${index}`"
            :prop="dropCol[index].prop"
            :label="item.name">
          </el-table-column>
        </el-table>
      </div>

      <!-- 底部信息 -->
      <div class="dragger-col">
        <draggable
          v-for="(row, i) of footerDatas"
          :key="i"
          class="draggableBox"
          v-model="row.mainRow"
          group="itxst"
          @end="end"
          @start="start"
          animation="300">
          <transition-group>
            <div v-for="(item, index) in row.mainRow" :key="index">
              <div  class="inputBoox" v-if="item != null">
                <div>{{ item.name }}</div>
                <div></div>
                <i class="el-icon-close deleteBtn" @click="deleteItem(row.mainRow, item, index)"></i>
              </div>
              <div class="inputBoox" v-else></div>
            </div>
          </transition-group>
        </draggable>
        <div class="addCol">
          <el-button type="primary" plain size="mini" @click="addRow()">添加列</el-button>
          <el-button type="danger" plain size="mini">删除列</el-button>
        </div>
      </div>
    </div>

<!--    参数配置项-->
    <div class="containerRight">
      <h4 style="text-align: center">参数配置</h4>
      <div class="Title">
        <p>主表参数匹配
          <el-button size="mini" type="primary" @click="addParams(maintableData)">添加</el-button>
        </p>
        <el-table
          :data="maintableData"
          border
          style="width: 100%">
          <el-table-column
            prop="label"
            label="系统参数名称"
            min-width="10">
          </el-table-column>
          <el-table-column
            prop="name"
            label="单据参数名称"
            min-width="14">
            <template slot-scope="{ row }">
              <el-input v-model="row.name"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            width="50">
            <template slot-scope="scope">
              <el-button @click="handleAdd(scope.row)" :disabled="scope.row.status == 'Y'" type="primary" size="small">添加</el-button>
<!--              <el-button v-if="scope.row.status == 'Y'" type="text" size="small" @click="deleteItem(scope.row)">移出</el-button>-->
            </template>
          </el-table-column>
        </el-table>

      </div>

      <div class="table-params">
        <div class="Title">
          <p>明细表参数匹配
            <el-button size="mini" type="primary" @click="addParams(tableData)">添加</el-button>
          </p>
          <el-table
            :data="tableData"
            border
            style="width: 100%; position: relative">
            <el-table-column
              prop="label"
              label="系统参数名称"
              min-width="10">
            </el-table-column>
            <el-table-column
              prop="name"
              label="单据参数名称"
              min-width="14">
              <template slot-scope="{ row }">
                <el-input v-model="row.name"></el-input>
              </template>
            </el-table-column>
            <el-table-column
              label="操作"
              width="50">
              <template slot-scope="scope">
                <el-button @click="handleTableAdd(scope.row)" v-if="scope.row.status != 'Y'" type="primary" size="small">添加</el-button>
                <el-button v-if="scope.row.status == 'Y'" type="danger" size="small" @click="deleteTableItem(scope.row, scope.$index)">移出</el-button>
              </template>
            </el-table-column>

          </el-table>

        </div>
      </div>

    </div>
  </div>
</template>
<script>
  //导入draggable组件
  import draggable from 'vuedraggable'
  import Sortable from 'sortablejs'
  export default {
    //注册draggable组件
    components: {
      draggable,
    },
    data() {
      return {
        // 表单头部
        titleData: [],
        imageUrl: '',

        //定义要被拖拽对象的数组-主表
        mainDataL:[],
        mainDataR:[],
        mainDataC:[],
        mainDataBL: [],
        mainDataBR: [],

        // 表单的表格的相关数据
        dataList: [],
        mainDatas: [],
        footerDatas: [],
        // 主表信息配置项
        maintableData: [{
          label: '公司名称1',
          name: '公司名称222',
          prop: 'name',
          type: 'image',
          id: -1,
          status: 'N'
        },{
          label: 'UPP送货单',
          name: 'UPP送货单',
          prop: 'name',
          id: -2,
          status: 'N'
        },{
          id: -3,
          label: '公司名称1',
          name: '自编码',
          prop: 'name',
          status: 'N'
        },{
          id: 1,
          label: '公司名称1',
          name: '名称111',
          prop: 'name',
          status: 'N'
        },{
          id: 2,
          label: '公司名称2',
          name: '名称222222',
          prop: 'code',
          status: 'N'
        },{
          id: 3,
          label: '公司名称3',
          name: '名称333',
          prop: 'age',
          status: 'N'
        },{
          id: 4,
          label: '公司名称3',
          name: '名称33434',
          prop: 'id',
          status: 'N'
        },{
          id: 4,
          label: '公司名称3',
          name: '名称33434',
          prop: 'id',
          status: 'N'
        },{
          id: 5,
          label: '公司名称3',
          name: '名称33434',
          prop: 'id',
          status: 'N'
        },{
          id: 6,
          label: '公司名称3',
          name: '名称33434',
          prop: 'id',
          status: 'N'
        },{
          id: 7,
          label: '公司名称3',
          name: '名称33434',
          prop: 'id',
          status: 'N'
        },{
          id: 8,
          label: '公司名称3',
          name: '名称33434',
          prop: 'id',
          status: 'N'
        },],
        // 可拖拽的表格title
        tableTitle: [],
        dropCol: [],
        // 表格配置项
        tableData: [
          {
          id: 1,
          label: '公司名称1',
          name: '公司名称1111',
          prop: 'name',
          status: 'N'
        },{
          id: 2,
          label: '公司名称2',
          name: '公司名称222222',
          prop: 'code',
          status: 'N'
        },{
          id: 3,
          label: '公司名称3',
          name: '公司名称333',
          prop: 'age',
          status: 'N'
        },{
          id: 4,
          label: '公司名称4',
          name: '公司名称44444',
          prop: 'id',
          status: 'N'
        },
        ],
      };
    },
    mounted() {
      // this.rowDrop() // 行拖动
      this.columnDrop()  // 列拖动
      this.tableData.map((row, index) => {
        if (index < 5) {
          this.tableTitle.push(row)
          this.dropCol.push(row)
          row.status = 'Y'
        }
      })
      this.titleData = this.maintableData.slice(0, 3)
      let obj = {}
      obj.mainRow = this.maintableData.slice(3, 6)
      this.mainDatas.push(obj)
      obj = {}
      obj.mainRow = this.maintableData.slice(6, 9)
      this.mainDatas.push(obj)
      obj = {}
      obj.mainRow = this.maintableData.slice(9)
      this.footerDatas.push(obj)

      console.log(JSON.stringify({
        titleData: this.titleData,
        mainDatas: this.mainDatas,
        tableTitle: this.tableTitle,
        footerDatas: this.footerDatas,
      }))
    },
    methods: {
      // 添加行
      addRow () {

      },
      // 图片上传
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      //左边往右边拖动时的事件
      end(e, val){
        console.log(e, val, 'e, val')
      },
      start(e, val){
        console.log(e, val, 'e, val')
      },
      // 添加其他参数
      addParams (arr) {
        let obj = {}
        obj.name = ''
        obj.prop = ''
        obj.id = arr.length + 1
        obj.status = 'N'
        arr.push(obj)
      },
      // 移除主表使用
      deleteItem (arr, row, idx) {
        // arr.splice(idx, 1, null)
        arr.splice(idx, 1)

        let index = this.maintableData.findIndex(it => it.id == row.id)
        if (index != -1) {
          this.maintableData[index].status = 'N'
        }

        console.log(this.mainDataL, 'this.mainDataL==')

      },
      // 添加主表信息使用
      handleAdd (row) {
        this.mainDataL.push(row)
        row.status = 'Y'
      },
      // 表格移除列
      deleteTableItem (row) {
        let idxT = this.tableTitle.findIndex(it => it.id == row.id)
        let idxD = this.dropCol.findIndex(it => it.id == row.id)
        console.log(idxT, idxD,row.id)
        if (idxT != -1) {
          this.tableTitle.splice(idxT, 1)
          this.dropCol.slice(idxD, 1)
        }
        row.status = 'N'
      },
      // 表格添加列
      handleTableAdd (row) {
        this.tableTitle.push(row)
        this.dropCol.push(row)
        row.status = 'Y'
      },

      //列拖拽
      columnDrop() {
        const wrapperTr = document.querySelector('.el-table__header-wrapper tr')
        this.sortable = Sortable.create(wrapperTr, {
          animation: 180,
          delay: 0,
          onEnd: evt => {
            const oldItem = this.dropCol[evt.oldIndex]
            this.dropCol.splice(evt.oldIndex, 1)
            this.dropCol.splice(evt.newIndex, 0, oldItem)
          }
        })
      },

      //行拖拽
      // rowDrop() {
      //   const tbody = document.querySelector('.el-table__body-wrapper tbody')
      //   const _this = this
      //   Sortable.create(tbody, {
      //     onEnd({ newIndex, oldIndex }) {
      //       const currRow = _this.tableData.splice(oldIndex, 1)[0]
      //       _this.tableData.splice(newIndex, 0, currRow)
      //     }
      //   })
      // },
    },

  };
</script>
<style lang="less" scoped>
  .com-dragger {
    width: 100%;
    height: 100%;
    background-color: #fff;
    /*display: flex;*/
    overflow-y: auto;
    .containerLift {
      float: left;
      /*flex: 1;*/
      width: 67%;
      margin-right: 10px;
      padding: 10px;
    }
    .containerRight {
      float: left;
      width: 30%;
      height: 97%;
      overflow: scroll;
    }
  }
  .itxst {
    width: 100%;
    margin: 10px;
    text-align :left;
  }
  .deliveryTitle {
    /*display: flex;*/
    &>div {
      /*flex: 1 1 200px;*/
    }
  }
  .containerLift {
    .dragger-col {
      width: 100%;
      /*display: flex;*/
      flex: 1;
      padding-bottom: 40px;
      border: solid 1px #eee;
      border-radius: 5px;
      position: relative;
      .addCol {
        position: absolute;
        right: 0;
        bottom: 0;
      }
      .draggableBox {
        flex: 1;
        width: 100%;
        height: 40px;
        box-sizing: border-box;
        &>span {
          display: flex;
          &>div {
            flex: 1;
          }
        }

      }
      .deleteBtn {
        display: none;
        position: absolute;
        right: 0px;
      }
      .inputBoox {
        display: flex;
        height: 40px;
        position: relative;
        align-items: center;
        margin: 10px 0 0 10px;
        box-sizing: border-box;
        &>div {
          background-color: #fff;
          border: 1px solid #DCDFE6;
          line-height: 15px;
          height: 15px;
          padding: 10px;
          &:nth-child(1) {
            flex: 2;
          }
          &:nth-child(2) {
            flex: 3;
          }
        }
        &:hover .deleteBtn {
          display: inline;
        }
      }
      .inputBooxNull {

      }
    }
    .tablecol {
      margin-top: 20px;
    }
  }
  .draggableTitle {
    width: 100%;
    height: 60px;
    line-height: 60px;
    span {
      display: flex;
      justify-content: space-between;
      align-content: center;
      &>div {
        min-width: 200px;
      }
    }
    .inputBoox {
      box-sizing: border-box;
      padding: 0 10px;
      position: relative;
      .deleteBtn {
        position: absolute;
        right: -4px;
        top: 40%;
        display: none;
      }
      &>.titleItem {
        min-width: 140px;
        margin: 15px 0;
        padding: 0 20px;
        line-height: 30px;
        height: 30px;
        border: 1px solid #DCDFE6;
      }
      &:hover .deleteBtn {
        display: inline;
      }
    }
  }
  .draggableBox {
    /*max-width: 50%;*/
    min-width: 100px;
    min-height: 50px;
    &>span {
      display: block;
      min-width: 100px;
      min-height: 50px;
    }
    &:nth-child(1), &:nth-child(2){
      margin-right: 20px;
    }
  }
  .item {
    /*padding: 6px 12px;*/
    /*margin: 0px 10px 0px 10px;*/
    border: solid 1px #eee;
    background-color: #f1f1f1;
    text-align: left;
  }
  .item + .item {
    border-top: none;
    margin-top: 6px;
  }

  .item:hover {
    background-color: #fdfdfd;
    cursor: move;
  }
  .item2 {
    /*padding: 6px 12px;*/
    /*margin: 0px 10px 0px 10px;*/
    border: solid 1px #eee;
    text-align: left;
  }
  .item2 + .item2 {
    border-top: none;
    margin-top: 6px;
  }

  .item2:hover {
    outline: solid 1px #ddd;
    cursor: move;
  }
/*  上传图片样式*/
  .avatar-uploader {
    border: 1px dashed #d9d9d9;
    text-align: center;
  }
  .avatar-uploader .el-upload {
    height: 60px;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 20px;
    color: #8c939d;
    line-height: 56px;
    text-align: center;
  }
  .avatar {
    height: 56px;
    display: block;
  }


</style>
