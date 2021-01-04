
<template>
  <div class="com-tree">
    <el-tree
      ref="comTree"
      :data="treeData"
      node-key="id"
      default-expand-all>
      <div class="custom-tree-node" slot-scope="{ node, data }">
        <span >{{ node.label }}</span>
        <span style="margin-left: 10px">
          <slot name="buttonSlot" :row="node" :data="data"></slot>
          <span style="margin-left: 10px" v-if="queryInfo.isMove">
            <a
              class="el-icon-top"
              @click.stop="handleMove(data, node, 'up')">
            </a>
            <a
              class="el-icon-bottom"
              @click.stop="handleMove(data, node, 'down')">
            </a>
          </span>
        </span>
      </div>
    </el-tree>
  </div>
</template>

<script>
export default {
  name: 'comTree',
  props: {
    queryInfo: Object,
    treeData: Array, // 数据
  },
  data () {
    return {
      total: 1000,
      pageSize: 10,
      current: 1
    }
  },
  methods: {
    // 上下移动
    handleMove(data, node, dropType) {
      // console.log(data.id, node.data.id)
        let pchildNodes = this.$refs.comTree.getNode(node.data.id).parent.childNodes;
        let currentId = {};

        for (let i = 0; i < pchildNodes.length; i++) {
          if (pchildNodes[i].data.id == node.data.id) {
            currentId=i;
          }
        }
      let upid
      if (dropType == 'up') {
        if(currentId == 0){
          this.$message({
            message: '处于顶端，不能继续上移',
            type: 'warning'
          });
          return
        }
        upid = currentId-1;
      } else {
        if(currentId == pchildNodes.length - 1){
          this.$message({
            message: '处于底端，不能继续下移',
            type: 'warning'
          });
          return
        }
        upid = currentId + 1;
      }
      let param = {};
      param.id1 = node.data.id;//当前节点id
      param.id2 =pchildNodes[upid].data.id;//上/下一个节点id
      this.$emit('tree-move', param)
    },
  }
}
</script>

<style scoped lang="scss">
  .custom-tree-node {
    width: 100%;
  }
  .custom-tree-node>span:first-child {
    float: left;
  }
  .custom-tree-node>span:last-child {
    float: right;
    span {
      a {
        color: #6C57FF;
      }
      a:hover {
        color: #DF396C
      }
    }
  }
</style>
