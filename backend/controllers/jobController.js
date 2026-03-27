import Job from "../models/Job.js";
import User from "../models/User.js";
import Application from "../models/Application.js";
import SavedJob from "../models/SavedJob.js";

//@desc  Only for Employer create job

export const createJob = async (req, res) => {
  try {
    if (req.user.role !== "employer") {
      return res.status(403).json({ message: "Only employers can post jobs" });
    }
    const job = await Job.create({ ...req.body, company: req.user._id });
    res.status(201).json({ job });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getJobs = async (req, res) => {
  const {
    keyword,
    location,
    category,
    type,
    minSalary,
    maxSalary,
    page = 1,
    limit = 10,
  } = req.query;

  const query = {
    isClosed: false,
    ...(keyword && { title: { $regex: keyword, $options: "i" } }),
    ...(location && { location: { $regex: location, $options: "i" } }),
    ...(category && { category }),
    ...(type && { type }),
  };

  if (minSalary || maxSalary) {
    query.salaryMax = {};
    if (minSalary) query.salaryMax.$gte = Number(minSalary);
    if (maxSalary) query.salaryMax.$lte = Number(maxSalary);
  }

  try {
    const skip = (page - 1) * limit;

    const jobs = await Job.find(query)
      .skip(skip)
      .limit(Number(limit))
      .populate("company", "name companyName companyLogo")
      .lean();

    const userId = req.user?._id;

    if (userId) {
      const savedJobs = await SavedJob.find({ jobseeker: userId }).select(
        "job",
      );
      const savedJobIds = savedJobs.map((s) => String(s.job));

      const applications = await Application.find({ applicant: userId }).select(
        "job status",
      );
      const appliedJobsStatusMap = {};

      applications.forEach((app) => {
        appliedJobsStatusMap[String(app.job)] = app.status;
      });

      const jobWithExtras = jobs.map((job) => {
        const jobIdStr = String(job._id);
        return {
          ...job,
          isSaved: savedJobIds.includes(jobIdStr),
          applicationStatus: appliedJobsStatusMap[jobIdStr] || null,
        };
      });

      return res.json({
        success: true,
        count: jobWithExtras.length,
        data: jobWithExtras,
      });
    }

    res.json({
      success: true,
      count: jobs.length,
      data: jobs,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// @desc Get jobs for users
export const getJobsEmployer = async (req, res) => {
  try {
    const userId = req.user._id;

    if (req.user.role !== "employer") {
      return res.status(403).json({ message: "Access denied" });
    }

    const jobs = await Job.find({ company: userId })
      .populate("company", "name companyName companyLogo")
      .lean();

    const jobsWithApplicationCounts = await Promise.all(
      jobs.map(async (job) => {
        const applicationCount = await Application.countDocuments({
          job: job._id,
        });

        return {
          ...job,
          applicationCount,
        };
      })
    );

    res.json({
      success: true,
      count: jobsWithApplicationCounts.length,
      data: jobsWithApplicationCounts
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


//@desc get single JOb by id
export const getJobById = async (req, res) => {
  try {
      const {userId} = req.query;

      const job = await Job.findById(req.params.id).populate(
        "company",
        "name companyName companyLogo"
      );

      if(!job){
        return res.status(404).json({message:"Job not found"});
      }
      let applicationStatus = null;

      if(userId){
        const application = await Application.findOne({
            job:job._id,
            applicant:userId,
        }).select("status");
        if(application){
            applicationStatus = application.status;
        }
      }
      res.json({
        ...job.toObject(),
        applicationStatus,
      });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// update job (E)
export const updateJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if(!job) return res.status(404).json({message:"Job not found"});

    if(job.company.toString()!== req.user._id.toString()){
        return res
        .status(403)
        .json({message:"Not authorized to update this job"});
    }
    Object.assign(job,req.body);
    const updated = await job.save();
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// delete job (E)
export const deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if(!job) return res.status(404).json({message:"Job not found"});

    if(job.company.toString()!==req.user._id.toString()){
      return res
      .status(403)
      .json({messaghe:"Job deleted successfully"});
    }
    await job.deleteOne();
    res.json({message:"Job deleted successfully"});

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
//
export const toggleCloseJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if(!job) return res.status(404).json({message:"Job not found"});

    if(job.company.toString()!== req.user._id.toString()){
      return res.status(403)
      .json({message:"Not authorized to close this job"});
    }
    job.isClosed = !job.isClosed;
    await job.save();
    res.json({message:"Job marked as closed"});
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
