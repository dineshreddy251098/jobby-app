import Header from '../Header'

import './index.css'

const NotFound = () => (
  <div>
    <Header />
    <div className="not-found-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="not found"
      />
      <h1 className="not-found-heading">Page Not Found</h1>
      <p className="not-found-paragraph">
        we`re sorry, the page you requested could not be found
      </p>
    </div>
  </div>
)
export default NotFound
