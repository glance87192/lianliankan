import React, { useEffect, useState } from "react";
import { Layout, Space } from 'antd';
import { Content, Header } from "antd/es/layout/layout";
import './linkgame.scss'

export default function Linkgame() {
  const gameArr = ['L', 'E', 'E', 'O', 'I', 'C', 'H', 'M', 'O', 'D', 'M', 'A', 'N', 'P', 'K', 'A', 'G', 'G', 'J', 'P', 'J', 'B', 'G', 'K', 'A', 'B', 'B', 'F', 'I', 'P', 'J', 'I', 'K', 'L', 'A', 'M', 'N', 'E', 'C', 'O', 'N', 'D', 'D', 'L', 'G', 'B', 'K', 'F', 'C', 'J', 'F', 'N', 'H', 'L', 'I', 'C', 'O', 'D', 'F', 'M', 'P', 'H', 'E', 'H']
  let procArr = [...gameArr]
  const gameMode = 8
  const gameMatrix = reshape(gameArr, gameMode)
  const [lastSelected, setLastSelected] = useState(null)
  const handleSelect = (e, index, item) => {
    if(e.target===lastSelected){
      return;
    }
    console.log(lastSelected);
    if(!lastSelected){
      setLastSelected(e.target)
      e.target.className = 'game-matrix-square-selected'
    }else{
      if(lastSelected.innerText===item){
        e.target.className = 'game-matrix-square-hidden'
        lastSelected.className = 'game-matrix-square-hidden'
        setLastSelected(null)
      }else{
        lastSelected.className='game-matrix-square'
        setLastSelected(null)
      }
    }
    console.log(index,item, 'index,item');
  }
  return (
    <Space>
      <Layout>
        <Header className="game-title">连连看</Header>
        <Content className="game-container">
          <div>模式选择</div>
          <div>目前选中<span>{lastSelected?.innerText}</span></div>
          <div className="game-matrix">
            {gameMatrix.map((row, row_idx) => (<div className="game-matrix-row" key={row_idx}>{row.map((col, col_idx) => (<div className="game-matrix-square" key={col_idx} onClick={(e) => handleSelect(e, gameMode * row_idx + col_idx, col)}>{col}</div>))}</div>))}
          </div>
        </Content>
      </Layout>
    </Space>
  )
}

function reshape(arr, cols = 8) {
  let newArr = [];
  let num = Math.ceil(arr.length / cols);
  for (let i = 0; i < num; i++) {
    newArr.push(arr.slice(i * cols, i * cols + cols))
  }
  return newArr
}