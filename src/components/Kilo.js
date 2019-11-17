import MaterialTable from "material-table";
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

const useStyles = makeStyles(theme => ({
    button: {
      margin: theme.spacing(1),

    },
    btn: {
        margin: theme.spacing(1),
        float: "right",
    },  
    list: {
        width: 250,
      },
    fullList: {
        width: 'auto',
      },
  }));



export function Expenses() {
    const classes = useStyles();
    const dd = new Date()
    const [draw, setDraw] = React.useState({
        left: false,

      });
    const [state, setState] = React.useState({
        columns: [
          { title: 'Ärende', field: 'arendeid', hidden: false},
          { title: 'Datum', field: 'date', type: 'date'},
          { title: 'Från', field: 'from', hidden: true},
          { title: 'Till', field: 'to' },
          { title: 'Km', field: 'km', type: 'numeric' },
          {
            title: 'Faktureras',
            field: 'faktureras',
            lookup: { 34: 'Ja', 63: 'Nej', 22: 'Kanske' },
          },
        ],
        data: [
          { arendeid: 'I-122313', from: 'KatrineholmKatrineholmKatriKatrineholmKatrineholmKatrineholmKatrineholmKatrineholmKatrineholmneholmKatrineholmKatrineholmKatrineholm', 
          to: "Eskilstuna", km: 120, faktureras: 34, date: dd },
          { arendeid: 'I-122ss3', from: 'Eskilstuna', 
          to: "Västerås", km: 80, faktureras: 34, date: dd },

        ],
      });

      const toggleDrawer = (side, open) => event => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
          return;
        }
        setDraw({ ...draw, [side]: open });
    };

    const sideList = side => (
        <div
          className={classes.list}
          role="presentation"
         // onClick={toggleDrawer(side, false)}
          onKeyDown={toggleDrawer(side, false)}
        >
          <List>
            {state.columns.map((itm, index) => (
              <ListItem button key={index}>
                  
                  <Checkbox checked={!itm.hidden} onChange={(id => handleChange(id,index))} />
                  <label>{itm.title}</label>
              </ListItem>
            ))}
          </List>
          <Divider />
          <Button variant="contained" className={classes.button} onClick={toggleDrawer(side, false)}>Stäng</Button>      
        </div>
      );


      function handleChange(id, item) {
          let oldstate = {...state}
          console.log(oldstate)
          oldstate.columns[item].hidden = !oldstate.columns[item].hidden
          setState(oldstate)
      }
      function ColumnChecks() {
      let checks = (state.columns.map((itm, index) => {
            return (<div>
                
                <Checkbox checked={!itm.hidden} onChange={(id => handleChange(id,index))} />
                
            </div>)
        }));
        return checks
      }
    

    console.log(state.columns);
    return (
        <div style={{ maxWidth: "100%" }}>
        <MaterialTable
            columns={state.columns}
            data={state.data}
            title="Demo"
            localization={{
                toolbar: {
                    nRowsSelected: '{0} rader valda',
                    searchPlaceholder: 'Sök'
                }
            }}
            detailPanel={rowData => {
                return (
                    <div>{rowData.from}</div>
                )
            }}
            options={{
                selection: true,
                grouping: true,
                exportButton: true,
                paging: false,
                showTextRowsSelected: false
              }}
            onSelectionChange={(rows) => console.log(rows)}
            editable={{
                onRowAdd: newData =>
                  new Promise(resolve => {
                    setTimeout(() => {
                      resolve();
                      setState(prevState => {
                        const data = [...prevState.data];
                        data.push(newData);
                        return { ...prevState, data };
                      });
                    }, 600);
                  }),
                onRowUpdate: (newData, oldData) =>
                  new Promise(resolve => {
                    setTimeout(() => {
                      resolve();
                      if (oldData) {
                        setState(prevState => {
                          const data = [...prevState.data];
                          data[data.indexOf(oldData)] = newData;
                          return { ...prevState, data };
                        });
                      }
                    }, 600);
                  }),
                onRowDelete: oldData =>
                  new Promise(resolve => {
                    setTimeout(() => {
                      resolve();
                      setState(prevState => {
                        const data = [...prevState.data];
                        data.splice(data.indexOf(oldData), 1);
                        return { ...prevState, data };
                      });
                    }, 600);
                  }),
              }}
            />
        <Button variant="contained" className={classes.btn}>
            
        Godkänn
      </Button>
      <Button variant="contained" className={classes.btn} onClick={toggleDrawer('left', true)}>Visa kolumner</Button>
      
      <Drawer open={draw.left} onClose={toggleDrawer('left', false)}>
      {sideList('left')}
      </Drawer>
        </div>
    )
}
