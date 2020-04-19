# Ohana

ORM for SAP HANA for node.js

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

- Use model
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
- findOne()
- create()
- update()
- delete()
- insert()
- insertBatch()