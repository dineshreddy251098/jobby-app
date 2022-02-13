import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

import {Component} from 'react'

import './index.css'

class LoginForm extends Component {
  state = {usernameInput: '', passwordInput: '', error: false, errorMsg: ''}

  onChangeUsername = event => {
    this.setState({usernameInput: event.target.value})
  }

  onChangePassword = event => {
    this.setState({passwordInput: event.target.value})
  }

  onSuccessLogin = JwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', JwtToken, {expires: 30})
    history.replace('/')
  }

  onFailureLogin = error => {
    this.setState({error: true, errorMsg: error.error_msg})
  }

  onSubmitUserCredentials = async event => {
    event.preventDefault()
    const {usernameInput, passwordInput} = this.state
    const userDetails = {
      username: usernameInput,
      password: passwordInput,
    }
    const loginApiUrl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(loginApiUrl, options)
    const fetchedData = await response.json()
    if (response.ok === true) {
      const JwtToken = fetchedData.jwt_token
      this.onSuccessLogin(JwtToken)
    } else {
      this.onFailureLogin(fetchedData)
    }
  }

  renderUsernameInput = () => {
    const {usernameInput} = this.state
    return (
      <div className="login-input-container">
        <label className="login-label" htmlFor="username">
          USERNAME
        </label>
        <input
          className="login-input"
          value={usernameInput}
          onChange={this.onChangeUsername}
          placeholder="Username"
          id="username"
          type="text"
        />
      </div>
    )
  }

  renderPasswordInput = () => {
    const {passwordInput} = this.state
    return (
      <div className="login-input-container">
        <label className="login-label" htmlFor="password">
          PASSWORD
        </label>
        <input
          className="login-input"
          value={passwordInput}
          onChange={this.onChangePassword}
          placeholder="Password"
          id="password"
          type="password"
        />
      </div>
    )
  }

  render() {
    const {error, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-bg-container">
        <div className="login-responsive-container">
          <form onSubmit={this.onSubmitUserCredentials}>
            <img
              className="login-website-logo"
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
            />
            {this.renderUsernameInput()}
            {this.renderPasswordInput()}
            <button className="login-btn" type="submit">
              Login
            </button>
            {error === true && <p className="error-msg">*{errorMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}
export default LoginForm
