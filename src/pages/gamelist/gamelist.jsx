import React, { useState } from "react"
import { Outlet, Link } from 'react-router-dom'
import { Layout, Menu } from 'antd';
import { MailOutlined, HomeOutlined, UserAddOutlined } from '@ant-design/icons';
const { Sider, Content } = Layout;

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

const items = [
  getItem(<Link to='/home'>首页</Link>, 'home', <HomeOutlined />),
  getItem('小游戏列表', 'gamelist', <MailOutlined />, [
    getItem(<Link to='/linkgame'>连连看</Link>, 'linkgame', null),
    getItem(<Link to='/snake'>贪吃蛇</Link>, 'snake', null),
    getItem(<Link to='/poke'>纸牌</Link>, 'poke', null),
  ]),
  getItem('用户管理', 'menu2', <UserAddOutlined />, [
    getItem(<Link to='/users-manage'>用户管理</Link>, 'users-manage', null),
  ])
];

export default function Gemalist() {
  return (
    <Layout>
      <Sider>
        <Menu
          mode='inline'
          items={items}
        />
      </Sider>
      <Layout>
        <Content>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  )
}