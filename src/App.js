import React from 'react';
import MaterialTable from 'material-table'

function App() {
  let data = [
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
        />
      </div>
    </>
  );
}

export default App;
