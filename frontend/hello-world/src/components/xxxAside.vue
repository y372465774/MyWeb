<template>
    <el-aside width="300px" style="background-color: rgb(238, 241, 246)">
        <el-menu>
            <el-menu-item  class="el-button el-button--info is-plain mitem">
                <router-link to="/"> RebuildSlaveDBInstance</router-link>
            </el-menu-item>
            <el-menu-item  class="el-button mitem el-button--info is-plain" style="margin-left:0px;">
                <router-link :to="{name: 'link', params:{api:msg} }" a> MofifyClassCode</router-link>
            </el-menu-item>
        </el-menu>
    </el-aside>       
</template>

<script>
export default {
    data() {
        return {
            msg:"MofifyClassCode"
        }
    },
}
</script>

<style scoped>
    .mitem {
        height:40px;
        width: 100%;
        /*line-height: 40px;*/
        margin: 5px 0; 
    }
</style>
