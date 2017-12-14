<template>
    <div>
        <div v-for="category in categories" :key="category.oid">
            <h2>{{ category.name }}</h2>
            <div class="line"></div>
            <el-row :gutter="32">
                <el-col :span="6" v-for="entry in category.object.entries" :key="entry.oid" v-if="entry.type === 'blob'">
                    <router-link :to="`/content/${category.name}/${entry.oid}`" class="el-router-link">
                        <el-card class="box-card">
                            <div>{{ entry.name.replace(/\.(md|MD)$/, '') }}</div>
                        </el-card>
                    </router-link>
                </el-col>
            </el-row>
        </div>
    </div>
</template>
<script>
  import utils from './utils'

  export default {
    data() {
      return {
        categories: []
      };
    },
    created() {
      utils.getAllRes().then((res) => {
        const data = res.data
        this.categories = data.repository.object.entries.filter((entry) => entry.type === 'tree')
        this.$store.commit('updateLoadingStatus', { isLoading: false })
      })
    },
    methods: {

    }
  };
</script>
<style scoped>
    .el-router-link {
        text-decoration: none;
    }
    .el-col {
        margin-bottom: 8px;
    }
    .box-card {
        border-left: 3px solid rgba(0, 37, 60, 0.84);
        max-height: 64px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
</style>
