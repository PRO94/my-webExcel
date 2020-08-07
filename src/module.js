console.log('module.ts works');

async function start() {
    return await Promise.resolve('async working')
}

start().then(console.log)