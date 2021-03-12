<template>

<!-- npm install --save x-data-spreadsheet x-data-spreadsheet/src/locale/zh-cn
      谷歌插件，实现在线制作表格
      安装插件：x-data-spreadsheet 插件     x-data-spreadsheet/src/locale/zh-cn  中文包
 -->
  <div id="x-spreadsheet-demo"></div>
</template>
<script>
  import Spreadsheet from 'x-data-spreadsheet';
  import zhCN from 'x-data-spreadsheet/src/locale/zh-cn';
  export default {
    data() {
      return {
        options:{
          mode: 'edit',
          showToolbar: true,
          titleBar: [
            "undo", "colors", "decoration", "align", "lock", "clear",
            "rows", "columns",
          ],
          showGrid: true,
          showContextmenu: true,
          view: {
            /*宽高，因为我是自定义的所以-----*/
            /*height: () => document.documentElement.clientHeight - 300,
            width: () => document.documentElement.clientWidth - 300,*/
            height: () => document.documentElement.clientHeight - 100,
            width: () => document.documentElement.clientWidth - 250,
          },
          formats: [],
          fonts: [],
          border: [],
          formula: [],
          underline: [],
          row: {
            len: 100,
            height: 25,
          },

          col: {
            len: 26,
            width: 100,
            indexWidth: 60,
            minWidth: 60,
          },
          /*freeze: 'C3',*/
          style: {
            bgcolor: '#ffffff',
            align: 'left',
            valign: 'middle',
            textwrap: false,
            textDecoration: 'normal',
            strikethrough: false,
            color: '#0a0a0a',
            font: {
              name: 'Helvetica',
              size: 10,
              bold: false,
              italic: false,
            },
          },
        },
        /*数组*/
        optionss:[{
          name:'aaaa',
          /*freeze: 'C3',*/
          styles: [
            // {
            //   /*小框背景色*/
            //   bgcolor: '#f4f5f8',
            //   textwrap: true,
            //   color: '#900b09',
            //   border: {
            //     top: ['thin', '#0366d6'],
            //     bottom: ['thin', '#0366d6'],
            //     right: ['thin', '#0366d6'],
            //     left: ['thin', '#0366d6'],
            //   },
            // },{
            //   /*小框背景色*/
            //   bgcolor: '#000000',
            //   textwrap: true,
            //   color: '#000000',
            //   border: {
            //     top: ['thin', '#000000'],
            //     bottom: ['thin', '#000000'],
            //     right: ['thin', '#000000'],
            //     left: ['thin', '#000000'],
            //   },
            // },
          ],
          /*合并单元格*/
          merges: [
            // 'C3:E4',
          ],
          rows: {
            0: {cells: {
                0:  {text: '序号',  prop: 'index',},
                1:  {text: '公司名称1',  prop: 'name1',},
                2:  {text: '公司名称2',  prop: 'name2',},
                3:  {text: '公司名称3',  prop: 'name3',},
                4:  {text: '公司名称4',  prop: 'name4',},
                5:  {text: '公司名称5',  prop: 'name5',},
                6:  {text: '公司名称6',  prop: 'name6',},
                7:  {text: '公司名称7',  prop: 'name7',},
                8:  {text: '公司名称8',  prop: 'name8',},
                9:  {text: '公司名称9',  prop: 'name9',},
              }},


















            /*第1行*/
            // 1: {
            //   cells: {
            //     /*第0列 2列*/
            //     0: { text: 'testingtesttestetst', prop: 'name' },
            //     2: { text: 'testing' },
            //   },
            // },
            // 2: {
            //   cells: {
            //     0: { text: 'render', style: 0 },
            //     1: { text: 'Hello' },
            //     2: { text: 'haha', merge: [1, 2] },
            //   }
            // },
            // 8: {
            //   cells: {
            //     8: { text: 'border test', style: 0 },
            //   }
            // }
          },
        },{
          name:'aaaa',
          /*freeze: 'C3',*/
          styles: [
            {
              /*小框背景色*/
              bgcolor: '#f4f5f8',
              textwrap: true,
              color: '#900b09',
              border: {
                top: ['thin', '#0366d6'],
                bottom: ['thin', '#0366d6'],
                right: ['thin', '#0366d6'],
                left: ['thin', '#0366d6'],
              },
            },{
              /*小框背景色*/
              bgcolor: '#000000',
              textwrap: true,
              color: '#000000',
              border: {
                top: ['thin', '#000000'],
                bottom: ['thin', '#000000'],
                right: ['thin', '#000000'],
                left: ['thin', '#000000'],
              },
            },
          ],
          /*合并单元格*/
          merges: [
            'C3:E4',
          ],
          rows: {
            /*第1行*/
            1: {
              cells: {
                /*第0列 2列*/
                0: { text: 'testingtesttestetst' },
                2: { text: 'testing' },
              },
            },
            2: {
              cells: {
                0: { text: 'render', style: 0 },
                1: { text: 'Hello' },
                2: { text: 'haha', merge: [1, 2] },
              }
            },
            8: {
              cells: {
                8: { text: 'border test', style: 0 },
              }
            }
          },
        }]
      }
    },
    methods: {
    },
    mounted(){
      /*中文*/
      Spreadsheet.locale('zh-cn', zhCN);
      let instance = new Spreadsheet('#x-spreadsheet-demo', this.options)
      instance.loadData(this.optionss).change((data) => {
        // console.log(data)
        console.log(JSON.stringify(data))
      });

    }
  }
</script>

<style>
</style>
