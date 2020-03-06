import React, {useState} from 'react';
import MaterialTable from 'material-table'
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers'

import moment from 'moment'
import MomentUtils from '@date-io/moment'

function App() {

  let initialData = [
    {
      id: 1,
      name: 'Almond',
      date: ['12-20-18', '10-20-20']
    },
    {
      id: 2,
      name: 'Apple',
      date: ['25-04-19']
    },
    {
      id: 3,
      name: 'Metapod',
      date: ['12-24-20']
    },
    {
      id: 4,
      name: 'Cactus',
      date: ['17-02-19']
    },
    { 
      id: 5,
      name: 'Zodiac',
      date: ['20-03-19']
    },
    {
      id: 6,
      name: 'Monster',
      date: ['21-03-19']
    }
  ]

  let splitData = (initialData) => {
    let newarray = []

    initialData.forEach(x => {  
      x.date.length > 1 ? 
      x.date.map(y => 
          y === x.date[0] ? 
          newarray = [...newarray, {id: x.id, name: x.name, date: y}] :
          newarray = [...newarray, {id: new Date().valueOf(), date: y, parentId: x.id}])
      : 
      newarray = [...newarray, {...x, date: x.date[0]}]
    })

    return newarray
  }

  let [ data, setData ] = useState(splitData(initialData))
  let [ selectedDate, handleDateChange ] = useState(new Date())

  // Enforces sort on date
  let sortDate = () => {
    let a = data.sort(function(a, b){
      var aa = a.date.split('-').reverse().join(),
          bb = b.date.split('-').reverse().join();
      return aa < bb ? -1 : (aa > bb ? 1 : 0);
    })
    return a
  }

  return (
    <>
      <div style={{ maxWidth: '100%' }}>
        <MaterialTable
          columns={[
            { title: 'Name', field: 'name', sorting: false },
            { title: 'Date', field: 'date', sorting: false,
            editComponent: () => (
              <MuiPickersUtilsProvider utils={MomentUtils}>
                <DatePicker
                  disablePast
                  variant="inline"
                  format='DD-MM-YY'
                  margin="normal"
                  id="date-picker"
                  value={selectedDate}
                  onChange={handleDateChange}
                />
              </MuiPickersUtilsProvider>
            )
              }
          ]}
          data={data}
          title='My Table'
          // actions={[
          //   {
          //     icon: 'add',
          //     tooltip: 'Add Item',
          //     isFreeAction: true,
          //     onClick: (e) => console.log('Add')
          //   },
          //   {
          //     icon: 'edit',
          //     tooltip: 'Edit Item',
          //     onClick: (e, row) => console.log(row)
          //   }
          // ]}
          editable={{
            onRowAdd: newItem => new Promise((res, rej) => {
              setTimeout(() => {
                let temp = {...newItem, date: moment(selectedDate).format('DD-MM-YY')}
                setData([...data, {id: new Date().valueOf(), ...temp}])
                res()
              }, 1000)
            }),
            //onRowDelete: (item) => Promise.resolve(console.log(item))
            onRowDelete: oldItem => new Promise((res, rej) => {
              setTimeout(() => {
                let i = data.indexOf(oldItem)
                let temp = data
                temp.splice(i, 1)
                setData([...temp])
                res()
              }, 1000)
            })
          }}
          options={{
            actionsColumnIndex: -1,
            paging: false,
            draggable: false
          }}
          parentChildData={(row, rows) => rows.find(a => a.id === row.parentId)}
        />
      </div>
    </>
  );
}

export default App;
