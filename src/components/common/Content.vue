<template>
    <section class="content">
        <el-col :span="24" class="breadcrumb-container crumbs">
            <el-breadcrumb separator="/" class="breadcrumb-inner">
                <el-breadcrumb-item v-for="item in $route.matched" :key="item.path">
                    {{ item.name }}
                </el-breadcrumb-item>
            </el-breadcrumb>
        </el-col>
        <el-col :span="24" class="content-wrapper">

            <transition name="fade" mode="out-in">
                <router-view></router-view>
            </transition>
        </el-col>
    </section>
    
</template>

<script>
export default {
    data() {
            return {

            }
        }
}
</script>
