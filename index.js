const core = require('@actions/core');
const sign = require('./sign');


async function run() {
  try {
    /// Get inputs.
    core.info('Getting input variables...');
    const path = core.getInput('path');
    const user = core.getInput('user');
    const message = core.getInput('message');

    /// Sign profile.
    core.info(`Signing under \"${user}\", with message \"${message}\"...`);
    await sign(path, user, message);

    /// Complete action.
    core.info((new Date()).toTimeString());
    core.setOutput('time', new Date().toTimeString());
  } 
  catch (error) {
    /// Log the error.
    core.setFailed(error.message);
  }
}

run();
