import express from 'express';
import './config.js';
import dataSource from './db/dataSource.js';
import permission from './routes/createPermission.js';
import role from './routes/createRole.js';
import newuser from './routes/createUser.js';
import user from './routes/getUser.js';
import roleUser from './routes/roleToUser.js';
import login from './routes/login.js'

const PORT = 5000;
const app = express();

app.use(express.json());

app.use ('/newPermission', permission);
app.use ('/newRole', role);
app.use ('/newUser', newuser);
app.use ('/user', user);
app.use ('/assign', roleUser);
app.use('/login', login)

app.use((err:any,req:any,res:any,next:any) => {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development'? err: {};
})

app.listen(PORT,()=> {
    console.log(`Server is running on port ${PORT}`);
    dataSource
  .initialize()
  .then(() => {
    console.log("Connected to DB!");
  })
  .catch((err) => {
    console.log(`Failed to connect to DB ${err}`);
  });
});
 
export default app;