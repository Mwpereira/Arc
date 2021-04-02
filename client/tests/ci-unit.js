const concurrently = require('concurrently');

try {
    console.log("Unit Tests");
    const tasks = ['cd .. && cd serverless && npm run start:ci:unit','npm run test:unit'];
    return concurrently(tasks, {
        prefix: 'name',
        killOthers: ['failure', 'success'],
        successCondition: 'last'
    }).then(
        () => ({
            success: true
        })
    ).catch((e) => ({
        success: false,
        error: `failure: ${e}`
    }));
} catch (error) {
    console.log(error.message);
}
