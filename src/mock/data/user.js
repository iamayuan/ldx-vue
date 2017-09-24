import Mock from 'mockjs';
const LoginUsers = [
  {
    id: 1,
    username: 'admin',
    password: '123456',
    avatar: 'https://raw.githubusercontent.com/taylorchen709/markdown-images/master/vueadmin/user.png',
    name: '超级管理员'
  },
  {
    id: 1,
    username: 'superadmin',
    password: '1234567',
    avatar: 'https://raw.githubusercontent.com/taylorchen709/markdown-images/master/vueadmin/user.png',
    name: '超级超级管理员'
  }
];

const Users = [];

for (let i = 0; i < 86; i++) {
  //axios将mock数据改为用api数据的url获取真实数据呢
  Users.push(Mock.mock({
    id: Mock.Random.guid(),//ff8080815e51a476015e51a47c630004
    code: Mock.mock('@zip'),//0031
    name: Mock.Random.cname(),//随机生成一个中文名字 电小二管理
    addr: Mock.mock('@county(true)'),//随机生成一个地址
    'age|18-60': 1,//随机生成一个数字 大小在18到60
    birth: Mock.Random.date(),//随机生成一个日期
    sex: Mock.Random.integer(0, 1)
  }));
}

export { LoginUsers, Users };
