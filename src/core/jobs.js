const matchmakingJobs = require('src/modules/matchmaking/jobs');

const jobs = [
  matchmakingJobs.findMatch,
]

const start = () => jobs.forEach(job => job.start());

const stop = () => jobs.forEach(job => job.stop());

module.exports = {
  start,
  stop,
}
