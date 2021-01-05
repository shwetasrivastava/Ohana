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
    npm i ohana-node-orm
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

or

while using this pacakge at SAP WEB IDE provide the connection params as below:-

const connectionParams = {
    host: host,
    port: port,
    user: user,
    password: password,
    currentSchema: schema // Here
};

The parameters are same except while using at SAP WEB IDE we provide currentSchema: schema
```

- Create a Model
```
const {ohana} = require('ohana-node-orm');

const user = new ohana('users'); // new ohana('table_name');

module.exports = user;
```

- Use model in your controller with the choice of your function
```
eg. We are using "user" model with find() on it 

const users = await user.find();

```

### Supported operations

- find(column_name, conditions)
- findOne(column_name,conditions)
- update(conditions, values)
- updateOrCreate(conditions, values)
- destroy(conditions)
- insert(data)
- batchInsert(data)
- avg(column_name, conditions)
- count(column_name, conditions)
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
- update(conditions, values)  - update based on conditions and values to be updated
````
    const results = await user.update({
        ‘USER_ID’: 101,
        ‘STATUS’: 2
    },
    {
        ‘mobile_no’: “xxxx-xxx-xxx”
    });
````

- updateOrCreate(conditions,values) - update based on conditions with values , if repective data  with
  conditions does not exist then a new data will be created based on conditions and values.
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
- destroy(conditions) - delete the data based on the conditions.
````
    const results = await user.destroy({
        'USER_ID': 101
    });
````
- insert(data) - insert a new data based on the data
````
    const results = await user.insert({
        'ID': 14,
        'NAME': 'Karen'
    });
````
- batchInsert(data) - insert multiple records in one go , pass data as array
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
- avg(column_name, conditions) - returns average of the column_name provided, based on conditions        (optional).
````
        const results = await demo.avg(
           'ID', {
               'NAME': 'Shweta'
           }
        );
````
- count(column_name, conditions) - returns the count of the column , based on conditions(optional).
````
        const results = await demo.count(
           'ID', {
               'NAME': 'Shweta'
           }
        );
````
- findOneOrCreate(conditions, values) - returns the data if it finds it based on conditions , if not then it shall create a new entry with conditions and values.  
````
     const results = await demo.findOneOrCreate(
          {
            'NAME': 'Retri',
               
           },{
            'ID': 21,
            'CITY': 'Pune',
            'COUNTRY': 'India',
            'COUNTRY CODE': 91
           }
        );
````
- max(column_name, conditions) - return the maximum of the column name; based on conditions (optional).
````
    const results = await demo.max(
        'ID',
        {
            'CITY': 'Perth'   
        }
    );
````
- min(column_name, conditions)- return the maximum of the column name; based on conditions (optional).
````
    const results = await demo.min(
        'ID',
        {
            'CITY': 'Perth'   
        }
    );
````
- raw(statement) - run any sql statement with raw, pass the raw SQL statement. 
````
    const results = await demo.raw(
         'SELECT * FROM "SSRIVA"."DEMO.TABLE::TEST.DB";'
    );
````
- sum(column_name, conditions) - return the sum of the column name; based on the conditions (optional).

````
    const results = await demo.sum(
        'ID',
        {
            'NAME': 'Shweta'
        }
    );
````


