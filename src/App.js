import React, {useState} from 'react';
import MaterialTable from 'material-table'

function App() {
  let initialData = [
    {
      name: 'Almond',
      date: '12-20-20'
    },
    {
      name: 'Apple',
      date: '25-04-19'
    },
    {
      name: 'Metapod',
      date: '12-24-20'
    },
    {
      name: 'Cactus',
      date: '17-02-19'
    },
    { 
      name: 'Zodiac',
      date: '20-03-19'
    }
  ]

  let [ data, setData ] = useState(initialData)

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
            { title: 'Date', field: 'date', sorting: false, customSort: sortDate() }
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
                setData([...data, newItem])
                res()
              }, 1000)
            }),
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
            actionsColumnIndex: -1
          }}
        />
      </div>
    </>
  );
}

export default App;
