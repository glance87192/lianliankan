import React, { useState } from "react";
import { Layout, Button, Form, Input, notification } from 'antd';
import './login.scss'
import { $login, $register } from '../../api/request'
import { SmileOutlined } from '@ant-design/icons';

const { Header, Footer, Content } = Layout;

export default function Login() {
  const [api, contextHolder] = notification.useNotification();
  const [status, setStatus] = useState(true)
  const openNotification = () => {
    api.open({
      message: '注册成功！',
      description:
        '请前往登录界面进行登录。',
      icon: (
        <SmileOutlined
          style={{
            color: '#108ee9',
          }}
        />
      ),
    });
  };
  const onLoginFinish = async (values) => {
    console.log('Success:', values);
    const { username, password } = values;
    const { data, status, data: { msg } } = await $login(username, password);
    console.log(data);
    if (status === 200 && msg === 'success') {
      console.log('登录成功');
    } else {
      console.log('登录失败');
    }
  };
  const onLoginFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  const onRegisFinish = async (values) => {
    console.log('Success:', values);
    const { username, password, nickName } = values;
    const { data, status, data: { msg } } = await $register(username, nickName, password);
    console.log(data);
    if (status === 200 && msg === 'success') {
      openNotification();
      console.log('注册成功');
    } else {
      console.log('注册失败');
    }
  };
  const onRegisFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  const handleStatusChange = (e) => {
    status === true ? console.log('login -> register') : console.log('register -> login');
    setStatus(!status);
  };
  return (
    <Layout>
      {contextHolder}
      <Header>登录连连看</Header>
      <Content>
        {status === true ? <LoginForm actions={{ onLoginFinish, onLoginFinishFailed, handleStatusChange }} /> : <RegisterForm actions={{ onRegisFinish, onRegisFinishFailed, handleStatusChange }} />}
      </Content>
      <Footer>footer</Footer>
    </Layout>
  )
}

function LoginForm(props) {
  const { onLoginFinish, onLoginFinishFailed, handleStatusChange } = props.actions;
  return (
    <Form
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      style={{
        maxWidth: 400,
      }}
      onFinish={onLoginFinish}
      onFinishFailed={onLoginFinishFailed}
    >
      <Form.Item
        label="用户名"
        name="username"
        rules={[
          {
            required: true,
            message: 'Please input your username!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="密码"
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          登录
        </Button>
        <Button type='link' onClick={handleStatusChange}>没有账号？去注册</Button>
      </Form.Item>
    </Form>
  )
}


function RegisterForm(props) {
  const { onRegisFinish, onRegisFinishFailed, handleStatusChange } = props.actions;
  return (
    <Form
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      style={{
        maxWidth: 400,
      }}
      onFinish={onRegisFinish}
      onFinishFailed={onRegisFinishFailed}
    >
      <Form.Item
        label="用户名"
        name="username"
        rules={[
          {
            required: true,
            message: 'Please input your username!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="昵称"
        name="nickName"
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="密码"
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          注册
        </Button>
        <Button type='link' onClick={handleStatusChange}>已又账号？去登录</Button>
      </Form.Item>
    </Form>
  )
}