import axios from 'axios'
import config from '../config/config'


let QueryAll = `{
  repository(name: "${config.repository.name}", owner: "${config.repository.owner}") {
    id
    name
    object(expression: "${config.repository.branch}:${config.repository.resource}") {
      ... on Tree {
        entries {
          oid
          name
          type
          object {
            ... on Tree {
              entries {
                oid
                name
                type
              }
            }
          }
        }
      }
    }
  }
}`

let QueryContent = (strings, oid) => {
  return `{
    repository(name: "${config.repository.name}", owner: "${config.repository.owner}") {
      id
      name
      object(oid: "${oid}") {
        ... on Blob {
          oid
          text
        }
      }
    }
  }`.replace(/\n/g, '')
}

let util = {}

util.setTitle = (title) => {
  document.title = `${title} - ${config.wiki.name}`
}

util.ajax = axios.create({
  baseURL: 'https://api.github.com',
  headers: { Authorization: `token ${config.accessToken}` }
});

util.getAllRes = () => {
  return util.ajax.post('/graphql', JSON.stringify({ query: QueryAll.replace(/\n/g, '') })).then((res) => res.data)
}

util.getContent = (oid) => {
  console.log(QueryContent`${oid}`)
  return util.ajax.post('/graphql', JSON.stringify({ query: QueryContent`${oid}` })).then((res) => res.data)
}

export default util;
