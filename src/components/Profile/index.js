import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import './index.css'

const profileApiCall = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Profile extends Component {
  state = {profileApiStatus: profileApiCall.initial, profileDetails: {}}

  componentDidMount() {
    this.getProfileApi()
  }

  getProfileApi = async () => {
    this.setState({profileApiStatus: profileApiCall.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const profileApi = 'https://apis.ccbp.in/profile'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(profileApi, options)
    const fetchedData = await response.json()
    if (response.ok === true) {
      const profileDetails = fetchedData.profile_details
      const updatedData = {
        name: profileDetails.name,
        profileImageUrl: profileDetails.profile_image_url,
        shortBio: profileDetails.short_bio,
      }
      this.setState({
        profileDetails: updatedData,
        profileApiStatus: profileApiCall.success,
      })
    } else {
      this.setState({profileApiStatus: profileApiCall.failure})
    }
  }

  onClickedRetry = () => {
    this.getProfileApi()
  }

  profileFailureView = () => (
    <div className="profile-failure-container">
      <button onClick={this.onClickedRetry} className="retry-btn" type="button">
        Retry
      </button>
    </div>
  )

  profileSuccessView = () => {
    const {profileDetails} = this.state
    const {name, profileImageUrl, shortBio} = profileDetails

    return (
      <div className="profile-card-container">
        <img src={profileImageUrl} alt="profile" />
        <h1 className="profile-name">{name}</h1>
        <p className="profile-bio">{shortBio}</p>
      </div>
    )
  }

  profileInProgressView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderProfileOnApiCall = () => {
    const {profileApiStatus} = this.state
    switch (profileApiStatus) {
      case profileApiCall.success:
        return <>{this.profileSuccessView()}</>
      case profileApiCall.failure:
        return <>{this.profileFailureView()}</>
      case profileApiCall.inProgress:
        return <>{this.profileInProgressView()}</>
      default:
        return null
    }
  }

  render() {
    return (
      <div className="profile-container">
        {this.renderProfileOnApiCall()}
        <hr className="line" />
      </div>
    )
  }
}
export default Profile
