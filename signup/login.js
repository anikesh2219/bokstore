const express = require('express')
const account = require('./mongodb')
const app = express()
app.use(express.json())

// app.get('/login',async (req, res) => {
//      let data = await User.findOne(req.body)
//      res.send(data)
// })

app.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ error: "Username and password are required" });
        }


        const user = await account.findOne({ username });
        if (!user) {
            return res.status(401).json({ error: "Invalid username or password" });
        }


        if (user.password !== password) {
            return res.status(401).json({ error: "Invalid username or password" });
        }

        res.json({ message: "Login successful", userId: user._id, email: user.email });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }

})


app.listen(5000)