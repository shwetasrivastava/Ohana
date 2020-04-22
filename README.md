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
- Create
- Read
- Update
- Delete

### Available methods
- find() 
````
    const results = await user.find();
````

- findOne(conditions) 
````
    const results = await user.findOne({
        ‘USER_ID’: 101,
        ‘STATUS’: 2
    });
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
- delete(conditions)
````
    const results = await user.delete({
        ‘USER_ID’: 101
    });
````
- insert(data) 
````
    const results = await user.insert({
        ‘USER_ID’: 101,
        'USER_NAME': "abc",
        'PASSWORD': "xxxxxxxx",
        ‘EMAIL’: 'abc@gmail.com',
        'ADDRESS': 'A-4,Block-6, Street-9,Hagen-astric'
    });
````
- insertBatch(data)
````
    const results = await user.insertBatch([{
        ‘USER_ID’: 101,
        'USER_NAME': "abc",
        'PASSWORD': "xxxxxxxx",
        ‘EMAIL’: 'abc@gmail.com',
        'ADDRESS': 'A-4,Block-6, Street-9,Hagen-astric'
        },
        {       
        ‘USER_ID’: 102,
        'USER_NAME': "abc2",
        'PASSWORD': "xxxxxxxx",
        ‘EMAIL’: 'abc2@gmail.com',
        'ADDRESS': 'A-4,Block-7, Street-10,Hagen'
        }]);
````
