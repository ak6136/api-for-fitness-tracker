const express = require('express');
const router = express.Router();

// GET /api/activities/:activityId/routines

// GET /api/activities
activitiesRouter.get("/", async (req, res) => {
    try {
      const allActivities = await getAllActivities();
      const activities = allActivities.filter((activity) => {
        if (activity.active) {
          return true;
        }
        if (req.user === req.user.id) {
          return true;
        }
        return false;
      });
  
      res.send({
        activities,
      });
    } catch (error) {}
  });

// POST /api/activities
activityRouter.post("/", requireUser, async (req, res, next) => {
    const { name, description } = req.body;
    console.log(req.user);
    
    const activityData = {
      authorId: req.user.id,
      name: name,
      description: description,
      
    };
    
    try {
      // add authorId, title, content to postData object
      const activity = await createActivity(activityData);
      // this will create the post and the tags for us
      // if the post comes back, res.send({ post });
      res.send({ activity });
      // otherwise, next an appropriate error object
    } catch ({ name, description }) {
      next({ name, description });
    }
  });

// PATCH /api/activities/:activityId
activityRouter.patch("/:activityId", requireUser, async (req, res, next) => {
    const { activityId } = req.params;
    const { name, description } = req.body;
  
    const updateFields = {};
  
    if (name) {
      updateFields.name = name;
    }
  
    if (description) {
      updateFields.description = description;
    }
  
    try {
      const originalActivity = await getActivityById(id);
  
      if (originalActivity.author.id === req.user.id) {
        const updatedActivity = await updateActivity({ id, ...fields });
        res.send({ activity: updatedActivity });
      } else {
        next({
          name: "UnauthorizedUserError",
          message: "You cannot update this activity",
        });
      }
    } catch ({ name, description }) {
      next({ name, description });
    }
  });

module.exports = router;
