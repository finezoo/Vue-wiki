let config = {
  repository: {
    name: 'Repository-Name',
    owner: 'Repository-Owner',
    branch: 'master',
    resource: 'path/to/resource'
  },
  accessToken: 'Your-Github-Access-Token',
  wiki: {
    name: 'Wiki',
    logo: require('../assets/logo.png'),
    description: 'The Knowledge Wiki.',
    nav: [
      {
        title: 'Home',
        path: '/',
        externalLink: false
      },
      {
        title: 'Blog',
        path: 'http://blog.ruterly.com',
        externalLink: true
      }
    ]
  }
};
export default config;