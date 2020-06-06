import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";
import EventBus from "./eventBus";

const eventBus = new EventBus();

let money = {
  amount: 10000
};

// 管家
const guanjia = {
  init: () => {
    eventBus.on("需要消费", data => {
      money.amount -= data;
      console.log(money.amount);
      render();
    });
  }
};
guanjia.init();

// 组件
function GrandFather(props) {
  return (
    <div className="block">
      爷爷： <span>{props.money}</span>
      <br />
      <Father1 money={props.money} />
      <Father2 money={props.money} />
    </div>
  );
}

function Father1(props) {
  return (
    <div className="father">
      爸爸1： <span>{props.money}</span>
      <Child1 money={props.money} />
      <Child2 money={props.money} />
    </div>
  );
}

function Father2(props) {
  return (
    <div className="father">
      爸爸2： <span>{props.money}</span>
      <Child3 money={props.money} />
      <Child4 money={props.money} />
    </div>
  );
}

function Child1(props) {
  return (
    <div className="child">
      儿子1：<span>{props.money}</span>
    </div>
  );
}

function Child2(props) {
  return (
    <div className="child">
      儿子2：<span>{props.money}</span>
      <button
        onClick={() => {
          eventBus.emit("需要消费", 100);
        }}
      >
        消费100
      </button>
    </div>
  );
}

function Child3(props) {
  return (
    <div className="child">
      儿子3：<span>{props.money}</span>
      <button
        onClick={() => {
          eventBus.emit("需要消费", 200);
        }}
      >
        消费200
      </button>
    </div>
  );
}

function Child4(props) {
  return (
    <div className="child">
      儿子4：<span>{props.money}</span>
    </div>
  );
}

// App
export default function App() {
  return (
    <div className="App">
      <GrandFather money={money.amount} />
    </div>
  );
}

const rootElement = document.getElementById("root");

// render
function render() {
  ReactDOM.render(<App />, rootElement);
}

render();
