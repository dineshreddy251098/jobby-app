import {withRouter} from 'react-router-dom'

import {BsFillBriefcaseFill} from 'react-icons/bs'
import {MdLocationOn} from 'react-icons/md'
import {AiFillStar} from 'react-icons/ai'

import './index.css'

const JobItem = props => {
  const {jobDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = jobDetails

  const onClickedJobItem = () => {
    const {history} = props
    history.push(`/jobs/${id}`)
  }

  return (
    <li className="job-item-list-container">
      <button onClick={onClickedJobItem} className="job-item-btn" type="button">
        <div className="job-item-logo-title-container">
          <img
            className="job-item-logo"
            src={companyLogoUrl}
            alt="company logo"
          />
          <div>
            <h1 className="job-item-title">{title}</h1>
            <div className="job-item-rating-container">
              <AiFillStar className="star-icon" />
              <p className="job-item-rating">{rating}</p>
            </div>
          </div>
        </div>
        <div className="location-salary-container">
          <div className="job-item-location-container">
            <MdLocationOn className="location-icon" />
            <p className="job-item-location">{location}</p>
          </div>
          <div className="job-item-employment-container">
            <BsFillBriefcaseFill className="location-icon" />
            <p className="job-item-location">{employmentType}</p>
          </div>
          <p className="job-item-package">{packagePerAnnum}</p>
        </div>
        <hr className="line" />
        <p className="job-item-description-heading">Description</p>
        <p className="job-item-description">{jobDescription}</p>
      </button>
    </li>
  )
}
export default withRouter(JobItem)
