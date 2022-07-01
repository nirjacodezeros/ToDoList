import React, {useContext, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {  Nav} from 'react-bootstrap';
import {useHistory} from 'react-router-dom'
import {logoutUser} from '../action/auth.action'
import {GlobalContext} from '../context/globalContext'
import {LOGOUT} from '../action/reducer.types'

const Header = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const {successLabels = []} = useSelector(state => state.apiReducer)
    const {
        setUserInfo,
        setUserToken,
        setIsLoggedIn,
      } = useContext(GlobalContext)

    const logout = () => {
        dispatch(logoutUser())
    }

    useEffect(() => {
        if (successLabels.includes(LOGOUT)) {
            setUserInfo('')
            setUserToken('')
            setIsLoggedIn(false)
        }
    }, [setUserInfo, setUserToken, successLabels])

    return (
        <Nav variant="tabs" defaultActiveKey="/home">
      <Nav.Item>
        <Nav.Link onClick={() => history.push('/heat-map')}>Heat Map</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link onClick={() => history.push('/cluster-map')}>Cluster Map</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link onClick={logout}>logout</Nav.Link>
      </Nav.Item>
    </Nav>
        // <div>
        //     {isLogin && <a onClick={logout}>Logout</a>}
        // </div>
    )
}

export default Header
