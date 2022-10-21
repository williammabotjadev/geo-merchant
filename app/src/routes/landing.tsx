import React from 'react'

import { useHistory } from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles'

import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Link from '@material-ui/core/Link'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import logoImage from '../img/geo-merchant-logo.png'
import bgImage from '../img/landing.png'

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  title: {
    textAlign: 'center',
  },
}))

const Landing: React.FunctionComponent = () => {
  const classes = useStyles()

  const history = useHistory()

  const signIn = () => {
    history.push('/signin')
  }

  const signUp = () => {
    history.push('/signup')
  }

  return (
    <Grid style={{
      backgroundImage: `url(${bgImage})`,
      backgroundBlendMode: "multiply",
      top: 0,
      left: 0,
      position: "relative",
      width: "100%",
      height: "100%",
    }}>
      <Grid className={classes.root} container direction="column" justify="center" alignItems="center">
        <Box m={2}>
          <img src={logoImage} width={224} height={224} alt="logo" />
        </Box>
        <Box m={2}>
        
            <Grid container direction="row" justify="center" alignItems="center">
              <Box mr={3}>
                <ShoppingCartIcon fontSize="large" />
              </Box>
              <Typography className={classes.title} variant="h3">
                Geo Enabled Retail Insights
              </Typography>
            </Grid>
          
        </Box>
        <Box style={{
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '40px',
          margin: '20px'
        }}>
          <Button onClick={signIn} variant="contained" color="primary" style={{
            margin: '40px',
            padding: '20px',
            width: '200px',
            height: '100px'
          }}>
            SIGN IN
          </Button>
          <Button onClick={signUp} variant="contained" color="primary" style={{
            margin: '40px',
            padding: '20px',
            width: '200px',
            height: '100px',
            backgroundColor: 'green'
          }}>
            GET STARTED
          </Button>
        </Box>
      </Grid>
    </Grid>
  )
}

export default Landing
