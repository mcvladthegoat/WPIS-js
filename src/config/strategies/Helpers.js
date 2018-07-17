export default {
    isProjectDone: (_tasksSheet) =>
        _tasksSheet.every(task => task.status),

    isFinished: (time, expectedTime, level) => (time >= expectedTime / level),
    getFloat: (realTime) => (Math.round(realTime * 100) / 100).toString()
};