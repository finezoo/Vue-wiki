<template>
    <div>
        <el-breadcrumb separator="/">
            <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
            <el-breadcrumb-item>{{ $route.params.category }}</el-breadcrumb-item>
            <el-breadcrumb-item>{{ title }}</el-breadcrumb-item>
        </el-breadcrumb>
        <h2 class="el-icon-tickets">{{ title }}</h2>
        <div class="line"></div>
        <span class="el-icon-date time" v-if="datetime">{{ datetime }}</span>
        <el-tag v-for="(tag, idx) in tags" :key="idx" v-if="tag">{{ tag.trim() }}</el-tag>
        <div class="line"></div>
        <div class="marked-content" v-html="markedContent"></div>
    </div>
</template>
<script>
  import utils from './utils'
  import marked from 'marked'
  import 'highlight.js/styles/solarized-dark.css'

  marked.setOptions({
    sanitize: true,
    highlight: (code) => {
      return require('highlight.js').highlightAuto(code).value;
    }
  })

  export default {
    data() {
      return {
        title: '这里是标题',
        datetime: '',
        tags: [],
        rawContent: ''
      };
    },
    computed: {
      markedContent() {
        return marked(this.rawContent)
      }
    },
    watch: {
      title(val) {
        utils.setTitle(val)
      }
    },
    created() {
      utils.getContent(this.$route.params.oid).then((res) => {
        const data = res.data
        const rawContent = data.repository.object.text
        this.parseContent(rawContent)
        this.$store.commit('updateLoadingStatus', { isLoading: false })
      })
    },
    methods: {
      parseContent(rawContent) {
        const titleReg = /title:.*"(.+)"/
        const datetimeReg = /date:\s*(.+)/
        const tagReg = /tag:\s*(.+)/
        let frontMatter = ''
        if (rawContent.startsWith('---\n')) {
          frontMatter = rawContent.split('---\n')[1]
        } else {
          frontMatter = rawContent.split('---\n')[0]
        }
        const title = frontMatter.match(titleReg)[1]
        const datetime = frontMatter.match(datetimeReg) ? frontMatter.match(datetimeReg)[1] : ''
        const tags = frontMatter.match(tagReg) ? frontMatter.match(tagReg)[1] : ''

        this.title = title
        this.datetime = datetime
        this.tags = tags.split(',')
        this.rawContent = rawContent.split(frontMatter)[1].replace(/-{3}\n/, '')
      }
    }
  };
</script>
<style>
    .el-breadcrumb {
        margin: 32px 0;
    }

    .time {
        font-size: 13px;
        color: #999;
        margin: 0 16px 0 8px;
    }

    .el-tag {
        margin-right: 8px;
        margin-bottom: 8px;
    }

    .marked-content pre {
        display: block;
        overflow-x: auto;
        padding: 0.5em;
        background: #002b36;
        color: #839496;
        border-radius: 5px;
    }

    .marked-content p > code, .marked-content li > code {
        padding: 2px 4px;
        color: #d14;
        background-color: #f7f7f9;
        border: 1px solid #e1e1e8;
        white-space: nowrap;
        border-radius: 3px;
    }
    .marked-content blockquote {
        border-left: 6px solid #ccc;
        padding-left: 8px;
        margin-left: 0;
    }
    .marked-content a {
        color: #409eff;
        text-decoration: none;
    }
</style>
