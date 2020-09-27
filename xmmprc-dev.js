const demoCard = require('./rc.demo.js')
module.exports = {
  domain: '',
  username: '',
  password: '',
  loginUrl: '/baas-login/open/pwdLogin',
  cardUrl: '/open/smallapp/cardManager/quickCreate',
  mpUrl: '/open/smallapp/appManager/quickCreate',
  cardList: [
    ...demoCard
  ],
  mpList: []
}
