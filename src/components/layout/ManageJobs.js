import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
// import { Link } from 'react-router-dom'
import Spinner from '../utils/Spinner'
import { getMyJobs } from '../../actions/myjobs'
import Bids from '../Bids'

const ManageJobs = ({ getMyJobs, myjobs: { loading, myjobs }, user: { _id } }) => {
  useEffect(() => {
    getMyJobs('posted_by', _id)
  }, [])

  return loading && myjobs === null ? (
    <Spinner />
  ) : (
    <>
      {myjobs.map((myjob) => (
        <div key={myjob._id}>
          {JSON.stringify(myjob)}
          <Bids jobId={myjob._id} />
        </div>
      ))}
    </>
  )
}

ManageJobs.propTypes = {
  myjobs: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  getMyJobs: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  myjobs: state.myjobs,
  user: state.auth.user,
})

export default connect(mapStateToProps, { getMyJobs })(ManageJobs)
