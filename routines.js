const express = require('express');
const router = express.Router();

// GET /api/routines
routinesRouter.get("/", async (req, res) => {
    try {
      const allPosts = await getAllPosts();
      const posts = allPosts.filter((post) => {
        if (post.active) {
          return true;
        }
        if (req.user && post.author.id === req.user.id) {
          return true;
        }
        return false;
      });
  
      res.send({
        posts,
      });
    } catch (error) {}
  });
// POST /api/routines
activityRouter.post("/", requireUser, async (req, res, next) => {
    const { name, description } = req.body;
    console.log(req.user);
    
    const routineData = {
      authorId: req.user.id,
      name: name,
      description: description,
      
    };
    
    try {
      // add authorId, title, content to postData object
      const routine = await createRoutine(routineData);
      // this will create the post and the tags for us
      // if the post comes back, res.send({ post });
      res.send({ routine });
      // otherwise, next an appropriate error object
    } catch ({ name, description }) {
      next({ name, description });
    }
  });
// PATCH /api/routines/:routineId

// DELETE /api/routines/:routineId

// POST /api/routines/:routineId/activities

module.exports = router;
