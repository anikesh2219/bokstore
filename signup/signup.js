const express = require('express')
const account = require('./mongodb')
const app = express()

app.use(express.json())

// app.post('/', async (req, res) => {
//     const { username, email, password } = req.body;

//     // Basic validation
//     if (!username || !email || !password) {
//       return res.status(400).json({ msg: 'Please enter all fields' });
//     }

//     try {
//       // Check for existing user
//       let user = await User.findOne({ username });
//       if (user) {
//         return res.status(400).json({ msg: 'User name already exists' });
//       }

//       // Create new user
//       user = new User({ username, email, password });

//       // Save user to database
//       await user.save();

//       res.status(201).json({ msg: 'User registered successfully' });
//     } catch (err) {
//       res.status(500).json({ msg: 'Server error' });
//     }
//   });

app.post('/create', async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }

  let user = await account.findOne({ username });
  if (user) {
    return res.status(400).json({ msg: 'User name already exists' });

  } else {
    let user = await account.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User email already exists' });
    }
  }
  let data = new account(req.body)
  let result = await data.save()
  res.send(result)
})

app.listen(5000)