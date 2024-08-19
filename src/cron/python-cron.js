const cron = require('node-cron');
const { exec } = require('child_process');

// Запуск задачи каждый день в 3:00
const execLogger = (error, stdout, stderr) => {
    if (error) {
        console.error(`Ошибка при выполнении скрипта: ${error.message}`);
        return;
    }
    if (stderr) {
        console.error(`stderr: ${stderr}`);
        return;
    }
    console.log(`stdout: ${stdout}`);
}

const initCron = () => {
    cron.schedule('0 3 * * *', () => {
        exec('bash ./python/start.sh', execLogger);
    });
    exec('bash ./python/start.sh', execLogger);
    console.log('Cron job установлен, выполнение каждый день в 3:00.');
}

module.exports = initCron