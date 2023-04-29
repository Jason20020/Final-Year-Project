const wd = require('wd');
const { config } = require('./appium-config');

const driver = wd.promiseChainRemote(config);

describe('Expo App E2E Test', () => {
  before(async () => {
    await driver.init(config);
  });

  after(async () => {
    await driver.quit();
  });

  it('should have the Expo app home screen', async () => {
    const element = process.env.APPIUM_PLATFORM === 'ios' ? 'Expo Home' : 'App';
    await driver.waitForElementByAccessibilityId(element, 200000);
  });

});