module.exports = () => {
    process.on('unhandledRejection', error => {
        console.error('Unhandled Promise Rejection =>'.red.bold, error)
    });

    process.on("uncaughtException", error => {
        console.error('Uncaught Exception =>'.red.bold, error)
    });

    process.on('exit', error => {
        console.error('Exit Code =>'.red.bold, error)
    });

    process.on('multipleResolves', error => {
        console.error('Multiple Resolves =>'.red.bold, error)
    })
};