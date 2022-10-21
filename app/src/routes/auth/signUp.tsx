import React, { useState, useContext } from 'react'

import { useHistory } from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'

import { useValidEmail, useValidPassword, useValidUsername } from '../../hooks/useAuthHooks'
import { Email, Password, Username } from '../../components/authComponents'

import { AuthContext } from '../../contexts/authContext'

import bgImage from '../../img/bruno.jpg'

const useStyles = makeStyles({
  root: {
    height: '100vh',
  },
})

const SignUp: React.FunctionComponent<{}> = () => {
  const classes = useStyles()

  const { email, setEmail, emailIsValid } = useValidEmail('')
  const { password, setPassword, passwordIsValid } = useValidPassword('')
  const { username, setUsername, usernameIsValid } = useValidUsername('')
  const [error, setError] = useState('')
  const [created, setCreated] = useState(false)

  const {
    password: passwordConfirm,
    setPassword: setPasswordConfirm,
    passwordIsValid: passwordConfirmIsValid,
  } = useValidPassword('')

  const isValid =
    !emailIsValid ||
    email.length === 0 ||
    !usernameIsValid ||
    username.length === 0 ||
    !passwordIsValid ||
    password.length === 0 ||
    !passwordConfirmIsValid ||
    passwordConfirm.length === 0

  const history = useHistory()

  const authContext = useContext(AuthContext)

  const signInClicked = async () => {
    try {
      await authContext.signUpWithEmail(username, email, password)
      setCreated(true)
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message)
      }
    }
  }

  const signUp = (
    <>
    <Box component="div" style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      flexDirection: 'row',
      width: '100%',
     
    }}>
      <Box component="div" style={{
        width: "50%",
        padding: '20px'
      }}>
      <Box width="100%" style={{
        width: "384px",
      }}>
        <Email emailIsValid={emailIsValid} setEmail={setEmail} />
      </Box>
      <br />
      <Box width="100%" style={{
        width: "384px",
      }}>
        <Username usernameIsValid={usernameIsValid} setUsername={setUsername} />
      </Box>
      <br />
      <Box width="100%" style={{
        width: "384px",
      }}>
        <Password label="Password" passwordIsValid={passwordIsValid} setPassword={setPassword} />
      </Box>
      <br />
      <Box width="100%" style={{
        width: "384px",
      }}>
        <Password label="Confirm Password" passwordIsValid={passwordConfirmIsValid} setPassword={setPasswordConfirm} />
      </Box>
      <br />
      <Box mt={2}>
        <Typography color="error" variant="body2">
          {error}
        </Typography>
      </Box>

      {/* Buttons */}
      <Box mt={2} style={{
        padding: "20px"
      }}>
        <Grid container direction="row" justify="center">
          <Box m={1}>
            <Button onClick={() => history.goBack()} color="secondary" variant="contained">
              Cancel
            </Button>
          </Box>
          <Box m={1}>
            <Button disabled={isValid} color="primary" variant="contained" onClick={signInClicked}>
              Sign Up
            </Button>
          </Box>
        </Grid>
      </Box>
      </Box>
      <Box style={{
        width: "50%",
      }}>
        
        </Box>
    </Box>
    </>
  )

  const accountCreated = (
    <>
      <Typography variant="h5">{`Created ${username} account`}</Typography>
      <Typography variant="h6">{`Verfiy Code sent to ${email}`}</Typography>

      <Box m={4}>
        <Button onClick={() => history.push('/verify')} color="primary" variant="contained">
          Send Code
        </Button>
      </Box>
    </>
  )

  return (
    <Grid className={classes.root} container direction="row" justify="flex-start" alignItems="flex-start" style={{
      backgroundImage: `url(${bgImage})`,
    }}>
      <Grid xs={11} sm={6} lg={4} container direction="row" justify="flex-start" alignItems="flex-start" item>
        <Paper style={{ width: '100%', padding: 16 }}>
          <Grid container direction="column" justify="flex-start" alignItems="flex-start">
            {/* Title */}
            <Box m={3}>
              <Grid container direction="row" justify="flex-start" alignItems="flex-start">
                <Typography variant="h3">Sign Up</Typography>
              </Grid>
            </Box>

            {!created ? signUp : accountCreated}
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  )
}

export default SignUp
