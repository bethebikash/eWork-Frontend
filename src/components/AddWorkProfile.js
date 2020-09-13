import React, { useState, useEffect } from 'react'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import Work from '@material-ui/icons/Work'
import Typography from '@material-ui/core/Typography'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import Input from '@material-ui/core/Input'
import Container from '@material-ui/core/Container'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { FormControl, Select, MenuItem, InputLabel, Chip, Grid, TextField } from '@material-ui/core'
import { getSkills } from '../actions/skills'
import { getTechnologies } from '../actions/technologies'
import Spinner from './utils/Spinner'
import { addWorkProfile } from '../actions/workProfile'
import { Card, Row, Col } from 'react-bootstrap'
import { setToggleAWP, setToggleWP } from '../actions/toggle'

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
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

function getStyles(items, item, theme) {
  return {
    fontWeight:
      item.indexOf(items) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  }
}

const AddWorkProfile = ({
  addWorkProfile,
  skillArray,
  techArray,
  loadSkill,
  loadTechnologies,
  getSkills,
  getTechnologies,
  userId,
  setToggleAWP,
  setToggleWP,
}) => {
  const classes = useStyles()
  const theme = useTheme()

  useEffect(() => {
    getSkills()
    getTechnologies()
  }, [])

  const [skills, setSkills] = useState([])
  const [technologies, setTechnologies] = useState([])
  const [rate, setRate] = useState('')

  const [error, setError] = useState()

  const handleChangeSkill = (event) => {
    setSkills(event.target.value)
    setError('')
  }

  const handleChangeTechnology = (event) => {
    setTechnologies(event.target.value)
    setError('')
  }

  const handleChangeRate = (event) => {
    setRate(event.target.value)
    setError('')
  }

  const onAddSubmit = (e) => {
    e.preventDefault()
    if (skills.length === 0) {
      setError('skillNull')
    } else if (skills.length < 3) {
      setError('minSkill')
    } else if (technologies.length === 0) {
      setError('techNull')
    } else if (technologies.length < 3) {
      setError('minTech')
    } else if (!rate) {
      setError('rateNull')
    } else if (isNaN(rate)) {
      setError('rateNum')
    } else {
      const newSkills = skills.map((sk) => sk._id)
      const newTech = technologies.map((tech) => tech._id)
      const belongs_to = userId
      addWorkProfile(newSkills, newTech, rate, belongs_to)
    }
  }

  return (
    <Row className="py-3">
      <Col>
        <Card className="bg-white border-0 shadow">
          <Card.Header className="bg-white border-0">
            <Row>
              <Col md={12} className="d-flex justify-content-between">
                <h3 className="mb-0">Add Work Profile</h3>
                <Button
                  onClick={() => (setToggleWP(true), setToggleAWP(false))}
                  variant="contained"
                  size="small"
                  color="secondary"
                >
                  ← Back
                </Button>
              </Col>
            </Row>
          </Card.Header>
          <Card.Body>
            <Container component="main" maxWidth="md">
              <CssBaseline />
              {!loadSkill && !loadTechnologies ? (
                <>
                  <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                      <Work />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                      Add Work Profile
                    </Typography>
                    <form className={classes.form} noValidate onSubmit={onAddSubmit}>
                      <FormControl fullWidth className={classes.formControl}>
                        <InputLabel id="skill-mutiple-chip-label">Skills</InputLabel>
                        <Select
                          labelId="skill-mutiple-chip-label"
                          id="skill-mutiple-chip"
                          multiple
                          value={skills}
                          onChange={handleChangeSkill}
                          input={<Input id="skill-select-multiple-chip" />}
                          renderValue={(selected) => (
                            <div className={classes.chips}>
                              {selected.map((value) => (
                                <Chip key={value._id} label={value.skill} />
                              ))}
                            </div>
                          )}
                          MenuProps={MenuProps}
                        >
                          {skillArray.map((skillArr) => (
                            <MenuItem
                              key={skillArr._id}
                              value={skillArr}
                              style={getStyles(skillArr, skillArr.skill, theme)}
                            >
                              {skillArr.skill}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                      {error === 'skillNull' && (
                        <span className="text-danger font-weight-bold">skills are required</span>
                      )}
                      {error === 'minSkill' && (
                        <span className="text-danger font-weight-bold">
                          minimum 3 skills are required
                        </span>
                      )}

                      <FormControl fullWidth className={classes.formControl}>
                        <InputLabel id="tech-mutiple-chip-label">Technologies</InputLabel>
                        <Select
                          labelId="tech-mutiple-chip-label"
                          id="tech-mutiple-chip"
                          multiple
                          value={technologies}
                          onChange={handleChangeTechnology}
                          input={<Input id="tech-select-multiple-chip" />}
                          renderValue={(selected) => (
                            <div className={classes.chips}>
                              {selected.map((value) => (
                                <Chip key={value._id} label={value.technology} />
                              ))}
                            </div>
                          )}
                          MenuProps={MenuProps}
                        >
                          {techArray.map((techArr) => (
                            <MenuItem
                              key={techArr._id}
                              value={techArr}
                              style={getStyles(techArr, techArr.technology, theme)}
                            >
                              {techArr.technology}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                      {error === 'techNull' && (
                        <span className="text-danger font-weight-bold">
                          technologies are required
                        </span>
                      )}
                      {error === 'minTech' && (
                        <span className="text-danger font-weight-bold">
                          minimum 3 technologies are required
                        </span>
                      )}

                      <Grid item xs={12} md={12}>
                        <TextField
                          className="mt-3"
                          autoComplete="rate"
                          name="rat"
                          e
                          value={rate}
                          onChange={handleChangeRate}
                          variant="outlined"
                          fullWidth
                          id="rate"
                          size="small"
                          label="Rate (per task in Rs)"
                        />
                        {error === 'rateNull' && (
                          <span className="text-danger font-weight-bold">rate is required</span>
                        )}
                        {error === 'rateNum' && (
                          <span className="text-danger font-weight-bold">
                            provide a rate in number
                          </span>
                        )}
                      </Grid>

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
              ) : (
                <Spinner />
              )}
            </Container>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  )
}

AddWorkProfile.propTypes = {
  getSkills: PropTypes.func.isRequired,
  getTechnologies: PropTypes.func.isRequired,
  addWorkProfile: PropTypes.func.isRequired,
  skillArray: PropTypes.array,
  technArray: PropTypes.array,
  loadSkill: PropTypes.bool.isRequired,
  loadTechnologies: PropTypes.bool.isRequired,
  userId: PropTypes.string.isRequired,
  setToggleAWP: PropTypes.func.isRequired,
  setToggleWP: PropTypes.func.isRequired,
}

const mapStateProps = (state) => ({
  skillArray: state.skills.skills,
  techArray: state.technologies.technologies,
  loadSkill: state.skills.loading,
  loadTechnologies: state.technologies.loading,
  userId: state.auth.user._id,
})

export default connect(mapStateProps, {
  getSkills,
  getTechnologies,
  addWorkProfile,
  setToggleAWP,
  setToggleWP,
})(AddWorkProfile)
