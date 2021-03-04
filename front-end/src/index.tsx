import React from 'react';
import ReactDOM from 'react-dom';
import '../src/css/index.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';

declare global
{
  interface Window
  {
    displayinfofuncs: Function,
    raminfofuncs: Function,
    avaraminfofuncs: Function,
    computerinfofuncs: Function,
    RefInt: Function,
    RefuInt: Function,
    RegistDll: Function,
    RefChr: Function,
    RefShort: Function,
    PTR: Function,
    PTRu: Function,
    PTRc: Function,
    PTRshort: Function,
    StrBuilder: Function,
    showError : Function,
    boardfuncs: Function,
  }
}

// handleError(funcs.EApiLibInitialize());

// // Get driver version, need call it first to set up
// const nDriverVersion = window.RefInt();
// let version:number=0x10000;
// handleError(funcs.EApiBoardGetValue(version, nDriverVersion));

// console.log("dirver value:",nDriverVersion.deref())

// // Get function switch parameter
// let nFunction = window.RefInt();
// let fuction: number=0x5;
// handleError(funcs.EApiBoardGetValue(fuction, nFunction));

// console.log("function:", nFunction.deref());
ReactDOM.render(<App />, document.getElementById('root'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();