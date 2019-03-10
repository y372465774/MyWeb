<template>
    <div>
        <div id="mytreeid" class="mytree"> </div>
    </div>
</template>


<script>
import logutil from '@/util/xxxlog'
import xxxTreeContrller from '@/util/xxxTreeController'
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
        drawTree(){
            let tree = window.document.getElementById("mytreeid");
            let myChart = this.$echarts.init(tree);
            //myChart.showLoading();
            let data = {
                iname:'一级xxxxxxxxx\nxxxxxxxxxxx呵呵',
                value: 1,
                children:[
                    {
                        iname:'二级1', 
                        value:2,
                        children:[
                            {iname:'三级1', value: 3},   
                            {iname:'三级2', value: 3}   
                        ]
                    },
                    {
                        iname:'二级2', 
                        value:2
                    }
                ]
            }
            let option = xxxTreeContrller.get_base_option_with_data(data)

            myChart.setOption(option)
            logutil.log(this.$route.params.api)
            myChart.on('contextmenu', (params) => {
                logutil.log(params);
                logutil.log(params.event);
                //params.event.stopPropagation()
                params.event.event.preventDefault()
                //.preventDefault()
            });

            //this.$axios.get('https://segmentfault.com/q/1010000014240072/revision')
            //.then((resp) => {
            //    logutil.log(resp);
            //}).catch( (error) => {
            //    logutil.log(error)
            //})

            
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

