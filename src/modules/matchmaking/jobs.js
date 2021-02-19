const cron = require('node-cron');
const jobIntervals = require('src/utils/jobIntervals');
const matchmakingService = require('./');

module.exports = {
  findMatch: cron.schedule(jobIntervals.halfMinute, matchmakingService.findMatches, { scheduled: false }),
}
