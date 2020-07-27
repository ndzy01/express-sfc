const isDev = false;
module.exports = {
  isDev,
  mysql: {
    host: '172.27.0.17', // 数据库所在的服务器的域名或者IP地址
    user: 'root', // 登录数据库的账号
    password: 'ndzy@2020DB', // 登录数据库的密码
    database: 'ndzy', // 数据库名称
    port: 3306
  }
};
