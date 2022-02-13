import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const renderEmploymentFilter = props => {
  const {onTriggerEmployment} = props
  return employmentTypesList.map(eachItem => {
    const onTriggeredEmployment = () => {
      onTriggerEmployment(eachItem.employmentTypeId)
    }
    return (
      <li className="filter-list-item" key={eachItem.employmentTypeId}>
        <input
          id={eachItem.employmentTypeId}
          onChange={onTriggeredEmployment}
          type="checkBox"
        />
        <label htmlFor={eachItem.employmentTypeId} className="label">
          {eachItem.label}
        </label>
      </li>
    )
  })
}

const renderSalaryFilter = props => {
  const {onTriggerSalary} = props

  return salaryRangesList.map(eachItem => {
    const onTriggeredSalary = () => {
      onTriggerSalary(eachItem.salaryRangeId)
    }
    return (
      <li className="filter-list-item" key={eachItem.salaryRangeId}>
        <input
          id={eachItem.salaryRangeId}
          onChange={onTriggeredSalary}
          type="radio"
          name="1"
        />
        <label htmlFor={eachItem.salaryRangeId} className="label">
          {eachItem.label}
        </label>
      </li>
    )
  })
}

const FilterGroups = props => (
  <div>
    <h1 className="filter-heading">Type of Employment</h1>
    <ul className="filter-list-container">{renderEmploymentFilter(props)}</ul>
    <hr className="line" />
    <h1 className="filter-heading">Salary Range</h1>
    <ul className="filter-list-container">{renderSalaryFilter(props)}</ul>
  </div>
)

export default FilterGroups
