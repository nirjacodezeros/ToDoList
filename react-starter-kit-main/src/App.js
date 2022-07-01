import React, {useEffect, useState} from 'react'
import './App.css'

import {useSelector} from 'react-redux'
import {BrowserRouter as Router} from 'react-router-dom'

import {GlobalContext} from './context/globalContext'
import Routes from './routes/Routes'

import {get} from './Utils/AppUtill'
import {AppProvider} from './state/app'
import {LOG_IN} from './action/reducer.types'

const App = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(
    window.localStorage.getItem('token') !== 'null' &&
      window.localStorage.getItem('token'),
  )
  const [userData, setUserData] = useState(
    JSON.parse(window.localStorage.getItem('userData') || '{}'),
  )
  const [appToken, setAppToken] = useState(
    window.localStorage.getItem('token'),
  )

  const setUserInfo = data => {
    setUserData(data)
    window.localStorage.setItem('userData', JSON.stringify(data))
  }
  const setUserToken = data => {
    setAppToken(data)
    window.localStorage.setItem('token', data)
  }

  const {successLabels = []} = useSelector(state => state.apiReducer)
  const {loginData = {}} = useSelector(state => state.authReducer)

  useEffect(() => {
    if (successLabels.includes(LOG_IN)) {
      setUserInfo(get(['user'], loginData))
      setUserToken(get(['jwt'], loginData))
      setIsLoggedIn(true)
    }
  }, [loginData, successLabels])

  return (
    <Router>
      <div className="App">
        <GlobalContext.Provider
          value={{
            isLoggedIn,
            setIsLoggedIn,
            setUserInfo,
            userData,
            appToken,
            setUserToken,
          }}
        >
          <AppProvider>
              <Routes />
          </AppProvider>
        </GlobalContext.Provider>
      </div>
    </Router>
  );
}

export default App;
