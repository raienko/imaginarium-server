const cron = require('node-cron');
const jobIntervals = require('src/utils/jobIntervals');
const findMatches = require('src/flows/findMatches');

const jobs = [
  cron.schedule(jobIntervals.minute, findMatches, { scheduled: false }),
]

const start = () => jobs.forEach(job => job.start());

const stop = () => jobs.forEach(job => job.stop());

module.exports = {
  start,
  stop,
}
