import axios from "axios";

const instance = axios.create({
  baseURL: 'http://localhost:3005',
  headers: { 'Content-Type': 'application/json' }
});

const loginUrl = '/users/login'
const registerUrl = '/users/register'
const getUsersUrl = '/users/getusers'
const modifyUserUrl = '/users/modifyuser'

// 添加请求拦截器
instance.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  console.log(config);
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么
  return response;
}, function (error) {
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
  return Promise.reject(error);
});

const $login = async (usr, pwd) => {
  const res = await instance.post(loginUrl, {
    username: usr,
    password: pwd,
  })
  return res;
}

const $register = async (usr, nickName, pwd, email) => {
  const res = await instance.post(registerUrl, {
    username: usr,
    password: pwd,
    nickName: nickName,
    email,
  })
  return res;
}

const $getUsers = async (page = 1, pageSize = 10) => {
  const res = await instance.get(getUsersUrl, {
    params: {
      page,
      pageSize
    }
  });
  return res;
}

const $modifyUser = async (params) => {
  const res = await instance.post(modifyUserUrl, {
    ...params
  })
  return res;
}

export { $login, $register, $getUsers, $modifyUser }