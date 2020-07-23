import React, { useState, useEffect } from 'react'
import { Link, Redirect } from 'react-router-dom'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import Box from '@material-ui/core/Box'
import Work from '@material-ui/icons/Work'
import Typography from '@material-ui/core/Typography'
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import Container from '@material-ui/core/Container'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { FormControl, Select, MenuItem, InputLabel, Chip } from '@material-ui/core'
import { getSkills } from '../actions/skills'
import { getTechnologies } from '../actions/technologies'
import Spinner from './utils/Spinner'

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: '98%',
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
}))

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
}

function getStyles(skills, skill, theme) {
  return {
    fontWeight:
      skill.indexOf(skills) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  }
}

const AddWorkProfile = ({
  addWorkProfile,
  skillArray,
  technologyArray,
  loadSkill,
  loadTechnologies,
  getSkills,
  getTechnologies
}) => {
  const classes = useStyles()
  const theme = useTheme()

  useEffect(() => {
    getSkills()
    getTechnologies()
  }, [])

  const [skills, setSkills] = useState([])
  const [technologies, setTechnologies] = useState([])

  const [error, setError] = useState()

  const handleChangeSkill = (event) => {
    setSkills(event.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault()
    if (!skills) {
      setError('skillNull')
    } else if (!technologies) {
      setError('techNull')
    } else {
      addWorkProfile({ skills, technologies })
    }
  }

  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      {loadSkill && loadTechnologies ? (
        <Spinner />
      ) : (
        <>
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <Work />
            </Avatar>
            <Typography component="h1" variant="h5">
              Add Work Profile
            </Typography>
            <form className={classes.form} validate onSubmit={onSubmit}>
              <FormControl fullWidth className={classes.formControl}>
                <InputLabel id="demo-mutiple-chip-label">Skills</InputLabel>
                <Select
                  labelId="demo-mutiple-chip-label"
                  id="demo-mutiple-chip"
                  multiple 
                  value={skillArray.map((skillArr) => {return (skillArr._id)})}
                  onChange={handleChangeSkill}
                  input={<Input id="select-multiple-chip" />}
                  renderValue={(selected) => (
                    <div className={classes.chips}>
                      {selected.map((value) => (
                        <Chip key={value} label={value} className={classes.chip} />
                      ))}
                    </div>
                  )}
                  MenuProps={MenuProps}
                >
                  {skillArray.map((skillArr) => (
                    <MenuItem key={skillArr._id} value={skillArr._id} style={getStyles(skillArr, skillArr.skill, theme)}>
                      {skillArr.skill}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              {error === 'skillNull' && (
                <span className="text-danger font-weight-bold">skills are required</span>
              )}

              <Button
                type="submit"
                fullWidth
                size="medium"
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Submit
              </Button>
            </form>
          </div>
        </>
      )}
    </Container>
  )
}

AddWorkProfile.propTypes = {
  getSkills: PropTypes.func.isRequired,
  getTechnologies: PropTypes.func.isRequired,
  addWorkProfile: PropTypes.func.isRequired,
  skillArray: PropTypes.array.isRequired,
  technologyArray: PropTypes.array.isRequired,
  loadSkill: PropTypes.bool.isRequired,
  loadTechnologies: PropTypes.bool.isRequired,
}

const mapStateProps = (state) => ({
  skillArray: state.skills.skills,
  technologyArray: state.technologies.technologies,
  loadSkill: state.skills.loading,
  loadTechnologies: state.technologies.loading,
})

export default connect(mapStateProps, { getSkills, getTechnologies })(AddWorkProfile)
