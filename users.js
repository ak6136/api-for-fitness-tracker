const express = require('express');
const router = express.Router();

// POST /api/users/login
usersRouter.post("/login", async (req, res, next) => {
    const { username, password } = req.body;
  
    // request must have both
    if (!username || !password) {
      next({
        name: "MissingCredentialsError",
        message: "Invalid login credentials",
      });
    }
  
    try {
      const user = await getUserByUsername(username);
      // console.log(user);
  
      if (user && user.password == password) {
        // create token & return to user
        const { JWT_SECRET } = process.env;
        const token = jwt.sign({ id: user.id }, JWT_SECRET);
        res.send({ message: "you're logged in!", token, userid: user.id });
      } else {
        next({
          name: "IncorrectCredentialsError",
          message: "Username or password is incorrect",
        });
      }
    } catch (error) {
      console.log("success false");
      console.log(error);
      next(error);
    }
  });

// POST /api/users/register

// GET /api/users/me

// GET /api/users/:username/routines

module.exports = router;
