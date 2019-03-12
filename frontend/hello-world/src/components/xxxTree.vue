<template>
    <div>
        <!-- <el-button type="success" round style="float:left;" v-on:click="synMind" >同步</el-button> -->
        <el-row>
            <el-button type="primary" v-on:click="synMind" style="float:left;">主要按钮</el-button>
        </el-row>
        <div id="mytreeid" class="mytree"> </div>
        <el-menu id="rightMenu" style="width: 150px; display: none;">
            <el-menu-item v-on:click="addItem" class="myitem">添加子元素</el-menu-item>
            <el-menu-item v-on:click="moifyItem" class="myitem">修改内容</el-menu-item>
            <el-menu-item v-on:click="addMark" class="myitem">添加备注</el-menu-item>
        </el-menu>
    </div>
</template>
<script>
import logutil from '@/util/xxxlog'
import xxxTreeContrller from '@/util/xxxTreeController'

let local_data = {
    iname:'一级xxxxxxxxx\nxxxxxxxxxxx呵呵',
    uqid: 1,
    children:[
        {
            iname:'二级1', 
            uqid:21,
            children:[
                {iname:'三级1', uqid: 211},   
                {iname:'三级2', uqid: 212}   
            ]
        },
        {
            iname:'二级2', 
            uqid:22
        }
    ]
}

function treeVisitor(root, target_uqid){
    if (root.uqid == target_uqid){
        return root;
    }
    if (root.children){
        let len = root.children.length
        for(let i = 0 ; i < len; ++i){
            let target = treeVisitor(root.children[i], target_uqid); 
            if(target) return target;
        }
    }
    return null;
}
let scope = {}

let disappearMenu =  () => {
    let rightMenu = window.document.getElementById("rightMenu")
    rightMenu.style.display = 'none';
}

export default {
    name: 'xxxTree',
    data(){
        return {
            msg: "tree"
        }
    },
    mounted() {
        this.drawTree();
    },
    methods:{
        addItem(event){
            disappearMenu();
            logutil.log(scope.current_data);
            let pointer = treeVisitor(local_data, scope.current_data.uqid);
            if(!pointer.children){
                pointer.children = [];
            }
            let nw = Date.now();
            pointer.children.push({iname:nw, uqid: nw});
            logutil.log(pointer, local_data, nw);
            this.refreshTree();
        },
        moifyItem(){
            disappearMenu();
            let pointer = treeVisitor(local_data, scope.current_data.uqid);
            this.$prompt('内容输入', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                //inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
                //inputErrorMessage: '邮箱格式不正确'
            }).then(({ value }) => {
                pointer.iname = value;
                this.refreshTree();
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '取消输入'
                });       
            });
        },
        addMark(){
            disappearMenu();
        },
        synMind(){
            alert("同步成功");
        },
        setMyChart(){
            let tree = window.document.getElementById("mytreeid");
            let myChart = this.$echarts.init(tree);
            scope.myChart = myChart;
        },
        getMyChart(){
            return scope.myChart;
        },
        addEventHanderForEChart(){
            let eventHandler = (data, event) => {
                scope.current_data = data;
                display_menu(event);
            }
            let display_menu = (event) => {
                logutil.log(event)
                let x = event.offsetX + 300;
                let y = event.offsetY
                let rightMenu = window.document.getElementById("rightMenu")
                rightMenu.style.display = 'block';
                rightMenu.style.position = 'absolute';
                rightMenu.style.top = y + 'px';
                rightMenu.style.left = 30+ x + 'px';
                rightMenu.style.zIndex = 999999;
            }
            let myChart = this.getMyChart();
            myChart.on('contextmenu', (params) => {
                //logutil.log(local_data);
                //logutil.log(params.data);
                params.event.event.preventDefault()
                if (params.componentType === 'series') {
                    if(params.seriesType == 'tree'){
                        eventHandler(params.data, params.event);
                    }
                }
            });
        },
        drawTree(){
            logutil.log(this.$route.params.api);
            local_data.iname = this.$route.params.api;
            this.setMyChart();
            this.addEventHanderForEChart();
            this.refreshTree();

            //this.$axios.get('https://segmentfault.com/q/1010000014240072/revision')
            //.then((resp) => {
            //    logutil.log(resp);
            //}).catch( (error) => {
            //    logutil.log(error)
            //})

        },
        refreshTree(){
            let myChart = this.getMyChart();
            let option = xxxTreeContrller.get_base_option_with_data(local_data)
            myChart.setOption(option)
        }
    }
}
</script>

<style scoped>
   .mytree {
       width: 1500px;
       height: 800px;
   } 
   .myitem{
       height: 40px;
       line-height: 40px;
   }
</style>

