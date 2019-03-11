<template>
    <div>
        <div id="mytreeid" class="mytree"> </div>
        <el-menu id="rightMenu" style="width: 200px;">
            <el-menu-item >添加子元素</el-menu-item>
            <el-menu-item>修改名称</el-menu-item>
            <el-menu-item>添加备注</el-menu-item>
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
            uqid:2,
            children:[
                {iname:'三级1', uqid: 11},   
                {iname:'三级2', uqid: 12}   
            ]
        },
        {
            iname:'二级2', 
            uqid:2
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
                rightMenu.style.position = 'absolute';
                rightMenu.style.top = y + 'px';
                rightMenu.style.left = x + 'px';
                rightMenu.style.zIndex = 999999;
            }
            let myChart = this.getMyChart();
            myChart.on('contextmenu', (params) => {
                logutil.log(local_data);
                logutil.log(params.data);
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
</style>

