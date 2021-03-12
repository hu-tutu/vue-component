<template>
  <div class="com-dragger">
    <el-upload
      class="upload-demo"
      ref="upload"
      action=""
      accept=".xlsx"
      :on-preview="handlePreview"
      :before-upload="beforeFile"
      :on-remove="handleRemove"
      :file-list="fileList"
      :auto-upload="true">
      <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
      <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
    </el-upload>
  </div>
</template>
<script>
  // npm install --save xlsx  上传excel是解析表格内容  ../utils/excel
  import excel from '../utils/excel'
  export default {
    components: {
    },
    data() {
      return {
        uploadLoading: false,
        tableLoading: false,
        showProgress: false,
        showRemoveFile: false,
        progressPercent: null,
        tableData: [],
        tableTitle: [],
        uploadFile: '',
        fileList: []
      };
    },
    mounted() {

    },
    methods: {
      submitUpload() {
        this.$refs.upload.submit();
      },
      handleRemove(file, fileList) {
        console.log(file, fileList, 'handleRemove');
      },
      beforeFile(file){
        console.log('-------')
        const fileExt = file.name.split('.').pop().toLocaleLowerCase()
        this.uploadFile = file;
        if (fileExt === 'xlsx' || fileExt === 'xls') {
          this.readFile(file)
          this.file = file
        } else {
          this.$Notice.warning({
            title: '文件类型错误',
            desc: '文件：' + file.name + '不是EXCEL文件，请选择后缀为.xlsx或者.xls的EXCEL文件。'
          })
        }
        return false
      },
      handlePreview(file) {
        console.log(file, 'handlePreview');
      },
      // 读取文件
      readFile(file) {
        const reader = new FileReader()
        reader.readAsArrayBuffer(file)
        reader.onloadstart = e => {
          console.log(e)
          this.uploadLoading = true
          this.tableLoading = true
          this.showProgress = true
        }
        reader.onprogress = e => {
          this.progressPercent = Math.round(e.loaded / e.total * 100)
        }
        reader.onerror = e => {
          console.log(e)
          this.$Message.error('文件读取出错')
        }
        reader.onload = e => {
          const data = e.target.result
          const { header, results } = excel.read(data, 'array')
          const tableTitle = header.map(item => { return { title: item, key: item } })
          this.tableData = results  //这里的tableData就是拿到的excel表格中的数据
          this.tableTitle = tableTitle
          this.uploadLoading = false
          this.tableLoading = false
          this.showRemoveFile = true
          console.log(data, this.tableData,this.tableTitle, 'tableData=====')
        }

      },
    },

  };
</script>
<style scoped>


</style>
