import {BsFillBriefcaseFill} from 'react-icons/bs'
import {MdLocationOn} from 'react-icons/md'
import {AiFillStar} from 'react-icons/ai'

import './index.css'

const SimilarJobItem = props => {
  const {similarJobDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    rating,
    title,
  } = similarJobDetails

  return (
    <li className="similar-job-list-container">
      <div className="job-item-logo-title-container">
        <img
          className="job-item-logo"
          src={companyLogoUrl}
          alt="similar job company logo"
        />
        <div>
          <h1 className="job-item-title">{title}</h1>
          <div className="job-item-rating-container">
            <AiFillStar className="star-icon" />
            <p className="job-item-rating">{rating}</p>
          </div>
        </div>
      </div>
      <h1 className="job-item-description-heading">Description</h1>
      <p className="job-item-description">{jobDescription}</p>
      <div className="location-salary-container">
        <div className="job-item-location-container">
          <MdLocationOn className="location-icon" />
          <p className="job-item-location">{location}</p>
        </div>
        <div className="job-item-employment-container">
          <BsFillBriefcaseFill className="location-icon" />
          <p className="job-item-location">{employmentType}</p>
        </div>
      </div>
    </li>
  )
}
export default SimilarJobItem
