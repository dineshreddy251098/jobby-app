import {Link} from 'react-router-dom'
import {Component} from 'react'

import Header from '../Header'
import './index.css'

class Home extends Component {
  onClickFindJobs = () => {
    const {history} = this.props
    history.push('/jobs')
  }

  render() {
    return (
      <div>
        <Header />
        <div className="home-page-bg-container">
          <div className="home-page-container">
            <h1 className="home-page-heading">
              Find The Job That Fits Your Life
            </h1>
            <p className="home-page-description">
              Millions of people are searching for jobs, salary information,
              company reviews. Find the job thats fits your abilities and
              potential.
            </p>
            <Link to="/jobs">
              <button
                onClick={this.onClickFindJobs}
                className="find-jobs-btn"
                type="button"
              >
                Find Jobs
              </button>
            </Link>
          </div>
        </div>
      </div>
    )
  }
}
export default Home
