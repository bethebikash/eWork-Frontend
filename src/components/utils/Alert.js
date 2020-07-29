import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import MuiAlert from '@material-ui/lab/Alert'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    marginTop: '-1rem',
    position: 'fixed',
    alignItems: 'center',
    display: 'grid',
    justifyItems: 'fit',
    zIndex: '999'
  },
}))

const Alert = ({ alerts }) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      {alerts.map((alert) => (
        <MuiAlert key={alert.id} className="justify-content-center p-2 font-weight-bold" severity={alert.alertType}>
          {alert.msg}
        </MuiAlert>
      ))}
    </div>
  )
}

Alert.propTypes = {
  alerts: PropTypes.array.isRequired,
}

const mapStateToProps = (state) => ({
  alerts: state.alert,
})

export default connect(mapStateToProps)(Alert)
