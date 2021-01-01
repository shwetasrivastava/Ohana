<p align="center">
  <a href="https://github.com/shwetasrivastava/Ohana">
    <img alt="Ohana - SAP HANA ORM for Node.js" src="https://user-images.githubusercontent.com/5300686/79893777-2acc2d80-8422-11ea-8f4a-4b8d1f620501.png" />
  </a>
</p>

NOTE: Ohana is a work in progress and this README will update as progress is made

<a href="https://www.npmjs.com/package/ohana-node-orm">
    <img src="https://img.shields.io/npm/v/ohana-node-orm" alt="Version">
</a>

 <a href="https://www.npmjs.com/package/ohana-node-orm">
    <img src="https://img.shields.io/npm/dw/ohana-node-orm" alt="Total Downloads">
</a>

 <a href="https://www.npmjs.com/package/ohana-node-orm">
    <img src="https://img.shields.io/npm/l/ohana-node-orm" alt="License">
  </a>

 
### How to use it?
- Install from npm
```
    npm install ohana-node-orm
```

- Setup the connection
```
const {connection} = require('ohana-node-orm');

const connectionParams = {
    host: process.env.SAP_HDB_URL,
    port: process.env.SAP_HDB_PORT,
    user: process.env.SAP_HDB_UID,
    password: process.env.SAP_HDB_PASSWORD,
    dbname: process.env.SAP_HDB_DBNAME
}

connection.connect(connectionParams)
.then((success) => {
    console.log('Connected');
})
.catch((error) => {
    console.log('Error', error);
})
```

- Create a Model
```
const {ohana} = require('ohana-node-orm');

const user = new ohana('users'); // new ohana('table_name');

module.exports = user;
```

- Use model in your controller
```
const users = await user.find();
```

### Supported operations

- find(column_name, conditions)
- findOne(column_name,conditions)
- insert(data)
- destroy(conditions)
- batchInsert(data)
- update(conditions, values)
- updateOrCreate(conditions, values)
- avg(column_name, conditions)
- count(column_name, conditions)
- destroy(conditions)
- findOneOrCreate(conditions, values)
- max(column_name, conditions)
- min(column_name, conditions)
- raw(statement)
- sum(column_name, conditions)

### Available methods
- find(column_names,condition) 
````
  - find with coulmn name and condition ,with parameters as array & objects repectively
    const results = await users.find(["USER_ID","EMAIL_ID"],{"CITY":"Benagaluru","SUB-AREA":"MG ROAD"});

  -  find all the records with column name specified in an array
     const results = await users.find(["USER_ID","EMAIL_ID","CITY"]);               

  -  find records with condition passed in an object
     const results = await users.find({"CITY": "Bengaluru"})

  -  find all the records with no condition
     const results = await users.find()


````
- findOne(column_name,conditions) - returns first & one matched record
````
  - findOne with column_name amd conditions  
    const results = await user.findOne(["USER_ID"],{
        ‘USER_ID’: 101,
        ‘STATUS’: 2
    }); 

  - findOne with conditions  
    const results = await user.findOne({
        ‘USER_ID’: 101,
        ‘STATUS’: 2
    }); 

  - findOne without passing any param
    const results = await user.findOne(); 


````
- update(conditions, values) 
````
    const results = await user.update({
        ‘USER_ID’: 101,
        ‘STATUS’: 2
    },
    {
        ‘mobile_no’: “xxxx-xxx-xxx”
    });
````

````
- updateOrCreate(conditions,values)
````
   const results = await demo.updateOrCreate({
            'NAME': 'Nawel'
        },
        {   
            'ID': 8,
            'CITY': 'Perth',
            'COUNTRY': 'Australia'
        });
````
- destroy(conditions)
````
    const results = await user.destroy({
        'USER_ID': 101
    });
````
- insert(data) 
````
    const results = await user.insert({
        'ID': 14,
        'NAME': 'Karen'
    });
````
- insertBatch(data)
````
    const results = await demo.batchInsert([
            {
                'ID': 14,
                'NAME': 'Karen'
            },{
                'ID': 15,
                'NAME': 'Bill'
            }
    ]);
````
