const concurrently = require('concurrently');

try {
    console.log("E2E Tests");
    const tasks = ['cd .. && cd serverless && npm run start:ci:e2e', 'yarn && npm run test:e2e:headless'];
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
