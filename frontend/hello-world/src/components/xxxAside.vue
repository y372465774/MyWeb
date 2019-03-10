<template>
    <el-aside width="300px" style="background-color: rgb(238, 241, 246)">
        <el-menu>
            <el-menu-item  class="mitem">
                <router-link to="/"> toIndex</router-link>
            </el-menu-item>
            <el-menu-item  class="mitem">
                <router-link :to="{name: 'link', params:{api:msg} }" a> toTree</router-link>
            </el-menu-item>
        </el-menu>
    </el-aside>       
</template>

<script>
export default {
    data() {
        return {
            msg:"xxx-aside"
        }
    },
}
</script>

<style scoped>
    .mitem {
        background-color: aqua;
        height:40px;
        line-height: 40px;
        margin: 5px 0;
    }
</style>
