import express from 'express'
import bodyParser from 'body-parser'
import jwt from 'jsonwebtoken'
import cors from 'cors'
import mockUsers from './data/users.js';

const app = express()
const port = 3000

const corsOptions ={
   origin:'*',
   credentials:true,
   optionSuccessStatus:200,
}
app.use(cors(corsOptions))

const generateAccessToken = (username, password) => {
  return jwt.sign(`${username}${password}`, 'ec$&2+nt6o=z%b4=8z+$c0!m$#8(^w)&4nu08su9ydx&-wk(7w');
}

app.use(bodyParser.json())

app.post('/login', (req, res) => {
  const username = req.body['username'];
  const password = req.body['password'];
  const user = mockUsers.find(u => u.username === username && u.password === password);
  if (user) {
    const accessToken = generateAccessToken(username, password);
    res.json({accessToken})
  }
  else {
    res.status(401).send('Unauthorized')
  }
})

const rules = {"periodChanges":[{"date":7,"sum":10000,"description":"Аванс"},{"date":25,"sum":50000,"description":"Зарплата"},{"date":1,"sum":-20000,"description":"Аренда"}],"dailyExpenses":[{"sum":-500,"description":"Еда"}]}

app.get('/getRules', (_, res) => {
  console.log('sending')
  res.send(rules)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})