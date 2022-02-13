import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

import {AiFillHome} from 'react-icons/ai'
import {BsBriefcaseFill} from 'react-icons/bs'
import {FiLogOut} from 'react-icons/fi'

import './index.css'

const Header = props => {
  const {history} = props
  const triggerLogout = () => {
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <div className="header-container">
      <div className="nav-container-lg">
        <Link to="/">
          <img
            className="header-website-icon"
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
          />
        </Link>
        <ul className="selection-container">
          <li>
            <Link className="link" to="/">
              <p className="header-option">Home</p>
            </Link>
          </li>
          <li>
            <Link className="link" to="/jobs">
              <p className="header-option">Jobs</p>
            </Link>
          </li>
        </ul>
        <button onClick={triggerLogout} className="header-logout" type="button">
          Logout
        </button>
      </div>
      <div className="nav-container-sm">
        <img
          className="header-website-icon"
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
        />
        <ul className="header-icons-container">
          <li>
            <Link to="/">
              <AiFillHome className="icons-sm" />
            </Link>
          </li>
          <li>
            <Link to="/jobs">
              <BsBriefcaseFill className="icons-sm" />
            </Link>
          </li>
          <li>
            <button
              className="logout-icon-btn"
              onClick={triggerLogout}
              type="button"
            >
              <FiLogOut className="icons-sm" />
            </button>
          </li>
        </ul>
      </div>
    </div>
  )
}
export default withRouter(Header)
