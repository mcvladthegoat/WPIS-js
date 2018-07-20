let workerIndex = 1, taskIndex = 1;

const w = (level, jobId, name = '-') => { //initWorkersSheet
    workerIndex++;
    return { workerId: workerIndex-1, level, jobId, name };
};

const t = (time, jobId, name) => { //initTasksSheet
    taskIndex++;  return { taskId: taskIndex - 1, time, jobId, name, status: false, report: { workerId: null, realTime: null }};
};

let workersSheet = [
    // auto[id], level, jobId, name
    w(1, 1, 'Илья Разумов'),
    w(1, 1, 'Виктор Осипов'),
    w(1, 1, 'Николай Попов'),
    w(1, 2, 'Александра Наумова'),
    w(2, 2, 'Евгений Жаров'),
    w(1, 1, 'Илья Разумов'),
    w(2, 1, 'Виктор Осипов'),
    w(1, 1, 'Николай Попов'),
    w(1, 2, 'Александра Наумова'),
    w(1, 2, 'Евгений Жаров'),
    w(1, 1, 'Илья Разумов'),
    w(2, 1, 'Виктор Осипов'),
    w(2, 1, 'Николай Попов'),
    w(1, 2, 'Александра Наумова'),
    w(1, 2, 'Евгений Жаров'),
    w(1, 1, 'Илья Разумов'),
    w(1, 1, 'Виктор Осипов'),
    w(1, 1, 'Николай Попов'),
    w(1, 2, 'Александра Наумова'),
    w(1, 2, 'Евгений Жаров'),
];

let tasksSheet = [
    // auto[id], time, jobId, name
    t(2, 1, 'Сгенерировать WDSL для шлюзп'),
    t(1, 1, 'Проверить отказоустойчивость CDN'),
    t(3, 2, 'Нарисовать логотип'),
    t(5, 2, 'Сверстать страницу'),
    t(5, 1, 'Настроить docker-compose'),
    t(6, 1, 'Перевести бизнес-логику на NodeJS'),
    t(2, 2, 'Сделать буклет'),
    t(3, 1, 'Развернуть проект'),
    t(4, 1, 'Отправить на продакшн'),
    t(1, 1, 'Перевести репозиторий на Git Flow'),
    t(1, 1, 'Сгенерировать WDSL для шлюзп'),
    t(1, 1, 'Проверить отказоустойчивость CDN'),
    t(1, 2, 'Нарисовать логотип'),
    t(1, 2, 'Сверстать страницу'),
    t(1, 1, 'Развернуть проект'),
];

let jobs = [
    "Programmer",
    "Designers",
    "Managers",
    "Scientists"
];

export default {
    jobs,
    tasksSheet,
    workersSheet
}