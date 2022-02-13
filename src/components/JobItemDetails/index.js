import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import {BsFillBriefcaseFill} from 'react-icons/bs'
import {MdLocationOn} from 'react-icons/md'
import {AiFillStar} from 'react-icons/ai'
import {FiExternalLink} from 'react-icons/fi'

import Header from '../Header'
import SimilarJobItem from '../SimilarJobItem'
import './index.css'

const jobDetailsApiCall = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobItemDetails extends Component {
  state = {jobDetailsData: {}, jobDetailsApi: jobDetailsApiCall.initial}

  componentDidMount() {
    this.getJobDetailsApi()
  }

  getJobDetails = jobDetails => ({
    companyLogoUrl: jobDetails.company_logo_url,
    companyWebsiteUrl: jobDetails.company_website_url,
    employmentType: jobDetails.employment_type,
    id: jobDetails.id,
    jobDescription: jobDetails.job_description,
    skills: jobDetails.skills.map(eachItem => ({
      imageUrl: eachItem.image_url,
      name: eachItem.name,
    })),
    lifeAtCompany: {
      description: jobDetails.life_at_company.description,
      imageUrl: jobDetails.life_at_company.image_url,
    },
    location: jobDetails.location,
    packagePerAnnum: jobDetails.package_per_annum,
    rating: jobDetails.rating,
  })

  getSimilarJobs = similarJobs => ({
    companyLogoUrl: similarJobs.company_logo_url,
    employmentType: similarJobs.employment_type,
    id: similarJobs.id,
    jobDescription: similarJobs.job_description,
    location: similarJobs.location,
    rating: similarJobs.rating,
    title: similarJobs.title,
  })

  getJobDetailsApi = async () => {
    this.setState({jobDetailsApi: jobDetailsApiCall.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jobDetailsApiUrl = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(jobDetailsApiUrl, options)
    if (response.ok === true) {
      const fetchedData = await response.json()

      const updatedData = {
        jobDetails: this.getJobDetails(fetchedData.job_details),
        similarJobs: fetchedData.similar_jobs.map(eachItem =>
          this.getSimilarJobs(eachItem),
        ),
      }

      this.setState({
        jobDetailsData: updatedData,
        jobDetailsApi: jobDetailsApiCall.success,
      })
    } else {
      this.setState({jobDetailsApi: jobDetailsApiCall.failure})
    }
  }

  onClickRetry = () => {
    this.getJobDetailsApi()
  }

  renderJobDetailsProgressView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderJobDetailsSuccessView = () => {
    const {jobDetailsData} = this.state
    const {jobDetails, similarJobs} = jobDetailsData
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      skills,
      lifeAtCompany,
      location,
      packagePerAnnum,
      rating,
    } = jobDetails

    const {title} = similarJobs[0]
    const {description, imageUrl} = lifeAtCompany

    return (
      <>
        <div className="job-details-card-container">
          <div className="job-item-logo-title-container">
            <img
              className="job-details-logo"
              src={companyLogoUrl}
              alt="job details company logo"
            />
            <div>
              <h1 className="job-details-title">{title}</h1>
              <div className="job-item-rating-container">
                <AiFillStar className="star-icon" />
                <p className="job-item-rating">{rating}</p>
              </div>
            </div>
          </div>
          <div className="location-salary-container">
            <div className="job-item-location-container">
              <MdLocationOn className="job-details-location-icon" />
              <p className="job-details-location">{location}</p>
            </div>
            <div className="job-item-employment-container">
              <BsFillBriefcaseFill className="job-details-location-icon" />
              <p className="job-details-location">{employmentType}</p>
            </div>
            <p className="job-item-package">{packagePerAnnum}</p>
          </div>
          <hr className="line" />
          <div className="description-heading-container">
            <h1 className="job-details-description-heading">Description</h1>
            <div className="website-link-container">
              <a className="visit-link" href={companyWebsiteUrl}>
                Visit
              </a>
              <FiExternalLink className="link-icon" />
            </div>
          </div>
          <p className="job-details-description">{jobDescription}</p>
          <h1 className="job-details-description-heading skill-heading">
            Skills
          </h1>
          <ul className="skills-container">
            {skills.map(eachSkill => (
              <li className="skill-item" key={eachSkill.name}>
                <img
                  className="skill-image"
                  src={eachSkill.imageUrl}
                  alt={eachSkill.name}
                />
                <p className="skill-name">{eachSkill.name}</p>
              </li>
            ))}
          </ul>
          <h1 className="job-details-description-heading skill-heading">
            Life at Company
          </h1>
          <div className="life-at-company-container">
            <p className="life-at-company-description">{description}</p>
            <img
              className="life-at-company-image"
              src={imageUrl}
              alt="life at company"
            />
          </div>
        </div>
        <h1 className="job-details-description-heading skill-heading">
          Similar Jobs
        </h1>
        <ul className="similar-jobs-list-container">
          {similarJobs.map(eachItem => (
            <SimilarJobItem key={eachItem.id} similarJobDetails={eachItem} />
          ))}
        </ul>
      </>
    )
  }

  renderJobDetailsFailureView = () => {
    ;<div className="no-jobs-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1 className="no-jobs-heading">Oops! Something Went Wrong</h1>
      <p className="no-jobs-paragraph">
        We cannot seem to find page you are looking for
      </p>
      <button onClick={this.onClickRetry} className="retry-btn" type="button">
        Retry
      </button>
    </div>
  }

  render() {
    const {jobDetailsApi} = this.state

    switch (jobDetailsApi) {
      case jobDetailsApiCall.success:
        return (
          <>
            <Header />
            <div className="job-details-bg-container">
              {this.renderJobDetailsSuccessView()}
            </div>
          </>
        )
      case jobDetailsApiCall.inProgress:
        return (
          <>
            <Header />
            <div className="job-details-bg-container">
              {this.renderJobDetailsProgressView()}
            </div>
          </>
        )
      case jobDetailsApiCall.failure:
        return (
          <>
            <Header />
            <div className="job-details-bg-container">
              {this.renderJobDetailsFailureView()}
            </div>
          </>
        )
      default:
        return null
    }
  }
}
export default JobItemDetails
