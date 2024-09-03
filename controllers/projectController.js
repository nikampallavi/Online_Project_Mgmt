const Project=require('../Models/ProjectModel')

const jwt = require("jsonwebtoken")

const secret = "pallavi"

async function createProject(req, res) {
  const {userId,projectTheme,Reason,Type,Division,Category,Priority,Department,
            start_Date,End_Date,Location,Status} = req.body;
      
    
      if (!userId || !projectTheme ||!start_Date || !End_Date)  {
        return res.status(400).json({ message: 'Required fields are missing' });
      }
      // if (new Date(start_Date) >= new Date(End_Date)) {
      //   return res.status(400).json({ message: 'End date must be after start date' });
      // }
    
      try {
        const newProject = new Project({
          userId,
          projectTheme,
          Reason,
          Type,
          Division,
          Category,
          Priority,
          Department,
          start_Date,
          End_Date,
          Location,
          Status
        });
    
        await newProject.save();
        res.status(201).json({msg:"New Project added successfully",newProject});
      } catch (err) {
        res.status(500).json({ message: 'Error saving project', error: err.message });
      }
}

async function updateData(req, res) {
  try {
      jwt.verify(req.token, secret, async (err, result) => {
          const id = req.params.id

          const {Status} = req.body

          const project = await Project.findByIdAndUpdate(id,{Status}, { new: true })

          return res.json({ data: project })

      })
  } catch (error) {
      return res.json({ error: error })
  }
}

async function getProjectData(req, res) {
  try {

      jwt.verify(req.token, secret, async (err, result) => {
          console.log(result);


          const totalProjects = await Project.find()
          const totalRunning = await Project.find({ Status: "Running" })
          const totalCancelled = await Project.find({ Status: "Cancelled" })
          const totalClosed = await Project.find({ Status: "Closed" })

          // listen closure delay is remaining so please do it during frontend
          const currentDate = new Date()
          const closureDelay = await Project.find({ Status: "Running", End_Date: { $lt: currentDate } })

          return res.status(200).json({ totalProjects: totalProjects.length, totalRunning: totalRunning.length, totalCancelled: totalCancelled.length, totalClosed: totalClosed.length, closureDelay: closureDelay.length })
      })

  } catch (error) {
      return res.status(400).json("Invalid data !")
  }
}



module.exports={createProject,updateData,getProjectData}