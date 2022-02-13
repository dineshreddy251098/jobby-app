import {Component} from 'react'
import Cookies from 'js-cookie'
import {BsSearch} from 'react-icons/bs'
import Loader from 'react-loader-spinner'

import './index.css'
import Header from '../Header'
import Profile from '../Profile'
import FilterGroups from '../FilterGroups'
import JobItem from '../JobItem'

const jobsApiCall = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Jobs extends Component {
  state = {
    jobsApiStatus: jobsApiCall.initial,
    jobsData: {},
    search: '',
    minPackage: '',
    employmentType: [],
  }

  componentDidMount() {
    this.getJobsData()
  }

  getJobsData = async () => {
    this.setState({jobsApiStatus: jobsApiCall.inProgress})
    const {search, minPackage, employmentType} = this.state
    const stringifyEmployment = employmentType.join(',')
    const jobsApiUrl = `https://apis.ccbp.in/jobs?employment_type=${stringifyEmployment}&minimum_package=${minPackage}&search=${search}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(jobsApiUrl, options)
    if (response.ok === true) {
      const fetchedData = await response.json()
      const {jobs, total} = fetchedData
      const updatedData = jobs.map(eachItem => ({
        companyLogoUrl: eachItem.company_logo_url,
        employmentType: eachItem.employment_type,
        id: eachItem.id,
        jobDescription: eachItem.job_description,
        location: eachItem.location,
        packagePerAnnum: eachItem.package_per_annum,
        rating: eachItem.rating,
        title: eachItem.title,
      }))
      this.setState({
        jobsData: {jobs: updatedData, total},
        jobsApiStatus: jobsApiCall.success,
      })
    } else {
      this.setState({jobsApiStatus: jobsApiCall.failure})
    }
  }

  onClickRetry = () => {
    this.getJobsData()
  }

  onChangeSearch = event => {
    this.setState({search: event.target.value})
  }

  onSearchInput = () => {
    const {search} = this.state
    this.setState({search}, this.getJobsData)
  }

  onTriggerEmployment = id => {
    const {employmentType} = this.state

    this.setState(prevState => {
      if (prevState.employmentType.includes(id)) {
        return {
          employmentType: prevState.employmentType.filter(
            eachItem => eachItem !== id,
          ),
        }
      }
      return {employmentType: [...employmentType, id]}
    }, this.getJobsData)
  }

  onTriggerSalary = id => {
    this.setState({minPackage: id}, this.getJobsData)
  }

  renderJobsInProgressView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderJobs = () => {
    const {jobsData} = this.state
    const {jobs} = jobsData

    return (
      <ul className="jobs-un-order-list-container">
        {jobs.map(eachItem => (
          <JobItem key={eachItem.id} jobDetails={eachItem} />
        ))}
      </ul>
    )
  }

  renderNoJobsView = () => (
    <div className="no-jobs-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
      />
      <h1 className="no-jobs-heading">No Jobs Found</h1>
      <p className="no-jobs-paragraph">
        We could not find any jobs. Try other filters
      </p>
    </div>
  )

  renderJobsSuccessView = () => {
    const {jobsData} = this.state
    const {total} = jobsData

    if (total === 0) {
      return <>{this.renderNoJobsView()}</>
    }
    return <>{this.renderJobs()}</>
  }

  renderJobsFailureView = () => (
    <div className="no-jobs-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1 className="no-jobs-heading">Oops! Something Went Wrong</h1>
      <p className="no-jobs-paragraph">
        We cannot seem to find the page you are looking for
      </p>
      <button onClick={this.onClickRetry} className="retry-btn" type="button">
        Retry
      </button>
    </div>
  )

  renderJobsList = () => {
    const {jobsApiStatus} = this.state
    switch (jobsApiStatus) {
      case jobsApiCall.success:
        return <>{this.renderJobsSuccessView()}</>
      case jobsApiCall.inProgress:
        return <>{this.renderJobsInProgressView()}</>
      case jobsApiCall.failure:
        return <>{this.renderJobsFailureView()}</>
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="jobs-bg-container">
          <div className="jobs-profile-container">
            <Profile />
            <FilterGroups
              onTriggerSalary={this.onTriggerSalary}
              onTriggerEmployment={this.onTriggerEmployment}
            />
          </div>
          <div className="jobs-search-container">
            <div className="search-container">
              <input
                onChange={this.onChangeSearch}
                placeholder="Search"
                className="search-input"
                type="search"
              />
              <button
                className="search-btn"
                type="button"
                testid="searchButton"
                onClick={this.onSearchInput}
              >
                <BsSearch className="search-icon" />
              </button>
            </div>
            <div className="profile-filter-container-sm">
              <Profile />
              <FilterGroups
                onTriggerSalary={this.onTriggerSalary}
                onTriggerEmployment={this.onTriggerEmployment}
              />
            </div>
            {this.renderJobsList()}
          </div>
        </div>
      </>
    )
  }
}
export default Jobs
