//  获取GitHub数据 
const getGitWare = require('./iweb/getgitware')

const CronJob = require('cron').CronJob;
// cron定时执行 秒 分 时 日 月 周,
const job = new CronJob('00 00 00 * * *', function () {
    // npm install cron
    // 每天的凌晨00：00：00执行一次
    //  job.start();
    getGitWare.getware()

});
// 执行
direct = () => {
    job.start();
}
module.exports = {
    direct
}