import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ConfigProvider,App as AntApp } from 'antd'
import {Provider}from "react-redux"
import store from './redux/store.js'
createRoot(document.getElementById('root')).render(
  <Provider store={store}>
  <StrictMode>
    <AntApp>
    <ConfigProvider
    theme={{
      components:{
        Button:{
          colorPrimary:"#405138",
          colorPrimaryHover:'#405138',
          borderRadius:"2px"
        }
      },
      token:{
        borderRadius:"2px"
      }
    }}
    >
    <App />
    </ConfigProvider>
    </AntApp>
  </StrictMode>
  </Provider>
)
