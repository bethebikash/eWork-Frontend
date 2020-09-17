import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Spinner from '../utils/Spinner'
import { getMyWorks } from '../../actions/myworks'
import { setJob } from '../../actions/jobs'
import { Card, Grid, Button } from '@material-ui/core'
import { Edit, Delete, CloudDownload } from '@material-ui/icons'
import { Link } from 'react-router-dom'

const MyWork = ({ getMyWorks, myworks: { loading, myworks }, user: { _id } }) => {
  useEffect(() => {
    getMyWorks('taken_by', _id)
  }, [])

  return loading && myworks === null ? (
    <Spinner />
  ) : (
    <>
      {myworks === [] && (
        <Card className="p-3 my-4 shadow">
          <div className="d-flex justify-content-center">
            <span className="font-weight-bold text-danger">
              Either you haven't bid for any job OR your bid has not accepted.
            </span>
          </div>
        </Card>
      )}

      {myworks.map((mywork) => (
        <div key={mywork._id}>
          <Card className="p-3 my-4 shadow">
            <div className="d-flex justify-content-end">
              <Link to="job/edit">
                <Edit
                  className="text-info"
                  onClick={(e) => {
                    setJob(mywork)
                  }}
                />
              </Link>
              <Link>
                <Delete
                  onClick={(e) => {
                    alert('delete function')
                  }}
                  className="text-danger"
                />
              </Link>
            </div>
            <Grid container>
              <Grid sm={6} xs={12} item>
                <h2 className="text-color font-weight-bold">{mywork.title}</h2>
                <p>{mywork.description}</p>
              </Grid>
              <Grid sm={6} xs={12} item>
                <p>
                  Price: <span className="font-weight-bold text-color">Rs.{mywork.price}</span>
                </p>
                {!mywork.taken_by ? (
                  <p>The job is still not taken</p>
                ) : (
                  <p>
                    This task is taken by{' '}
                    <span className="text-primary">{mywork.taken_by.name}</span>
                  </p>
                )}
                {mywork.file === '' ? (
                  <p>Task is not completed yet.</p>
                ) : (
                  <p>
                    Task is completed.{' '}
                    <Button
                      variant="contained"
                      color="secondary"
                      size="small"
                      startIcon={<CloudDownload />}
                    >
                      Upload a File
                    </Button>
                  </p>
                )}
              </Grid>
            </Grid>
            <hr />
          </Card>
        </div>
      ))}
    </>
  )
}

MyWork.propTypes = {
  myworks: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  getMyWorks: PropTypes.func.isRequired,
  setJob: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  myworks: state.myworks,
  user: state.auth.user,
})

export default connect(mapStateToProps, { getMyWorks, setJob })(MyWork)
