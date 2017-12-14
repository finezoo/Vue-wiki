<template>
    <div>
        <el-container
                v-loading.fullscreen.lock="$store.state.isLoading"
                element-loading-text="Loading..."
                element-loading-background="rgba(0, 0, 0, 0.8)">
            <el-header>
                <router-link to="/">
                    <img class="el-nav-logo" :src="wiki.logo" :alt="wiki.name" :title="wiki.name">
                </router-link>
                <el-menu
                        :default-active="activeNavIdx"
                        class="el-menu-right"
                        mode="horizontal"
                        background-color="#545c64"
                        text-color="#fff"
                        active-text-color="#ffd04b">
                    <el-menu-item :index="String(idx)" v-for="(nav, idx) in navs" :key="nav.title">
                        <a :href="nav.path" v-if="nav.externalLink" target="_blank">{{ nav.title }}</a>
                        <router-link :to="nav.path" v-else="">{{ nav.title }}</router-link>
                    </el-menu-item>
                </el-menu>
            </el-header>

            <el-container style="width: 80%; margin: 0 auto;">
                <el-main>
                    <router-view></router-view>
                </el-main>
                <el-aside>
                    <el-card>
                        <div slot="header">
                            <el-row type="flex" justify="center">
                                <el-col :span="12">
                                    <img src="./assets/logo.png" :alt="wiki.name" class="el-aside-logo">
                                </el-col>
                            </el-row>
                            <el-row type="flex" justify="center">
                                <el-col :span="12">
                                    <h2 style="text-align: center">{{ wiki.name }}</h2>
                                </el-col>
                            </el-row>
                        </div>
                        <div class="el-aside-desc el-icon-edit">
                            {{ wiki.description }}
                        </div>
                    </el-card>
                </el-aside>
            </el-container>

            <el-footer>
                Copyright © 2017 Ruter.
            </el-footer>
        </el-container>
    </div>
</template>
<script>
  import config from './config/config'

  export default {
    data() {
      return {
        wiki: config.wiki,
        navs: config.wiki.nav
      };
    },
    computed: {
      activeNavIdx() {
        const nav = this.navs.filter((nav) => nav.path === this.$route.path)
        if (nav.length) {
          return String(this.navs.indexOf(nav[0]))
        } else {
          return ""
        }
      }
    },
    mounted() {

    },
    created() {

    },
    beforeDestroy() {

    },
    methods: {}
  };
</script>
<style>
    body {
        background-color: #f5f7fa;
    }
    .line {
        height: 1px;
        background-color: #e0e6ed;
        margin-bottom: 8px;
    }
    .el-nav-logo {
        height: 60px;
        border-radius: 50%;
        padding: 2px 0;
        float: left;
    }
    .el-container {
        background-color: #f5f7fa;
    }

    .el-header, .el-footer {
        background-color: rgb(84, 92, 100);
        color: #ccc;
        text-align: center;
        line-height: 64px;
        height: 64px !important;
    }

    .el-footer {
        width: 100%;
        position: fixed;
        bottom: 0;
    }

    .el-main {
        color: #333;
        background-color: #f5f7fa;
        margin-bottom: 64px;
        padding: 8px 64px;
        padding-bottom: 32px;
    }

    .el-aside {
        width: 320px !important;
        margin: 80px 32px 0 0;
        background-color: #f5f7fa;
    }

    .el-aside-logo {
        width: 152px;
        border-radius: 50%;
    }

    .el-aside-desc {
        color: #999;
        font-size: 14px;
    }

    .el-menu-right {
        float: right;
    }

    .el-menu--horizontal .el-menu-item {
        height: 64px;
    }

    .el-menu-item > a {
        text-decoration: none;
    }
</style>