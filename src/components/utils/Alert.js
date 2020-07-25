import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import MuiAlert from '@material-ui/lab/Alert'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}))

const Alert = ({ alerts }) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      {alerts.map((alert) => (
        <MuiAlert key={alert.id} className="text-center" severity={alert.alertType}>
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
