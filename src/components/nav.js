import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';


  const useStyles = makeStyles(theme => ({
    button: {
      margin: theme.spacing(1),
    },
  }));
  
const navitems = {"Home": "/", "About": "/about", "Coding": "/coding"}

 export function Navs() {
  const classes = useStyles();
  const navs =  Object.keys(navitems).map((item, index) => {
        return (<Button variant="contained" className={classes.button}>{item}</Button>
        )
    })
    return navs;
  }