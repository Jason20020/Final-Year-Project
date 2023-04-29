const { join } = require('path');

const androidConfig = {
  platformName: 'Android',
  deviceName: 'Android Emulator',
  appPackage: 'host.exp.exponent',
  appActivity: '.MainActivity',
  automationName: 'UiAutomator2',
};

const iosConfig = {
  platformName: 'iOS',
  deviceName: 'iPhone Simulator',
  app: 'Exponent.app',
  automationName: 'XCUITest',
};

const config = process.env.APPIUM_PLATFORM === 'ios' ? iosConfig : androidConfig;

exports.config = {
  specs: [join(process.cwd(), 'e2e', '*.spec.js')],
  ...config,
  host: '127.0.0.1',
  port: 4723,
  logLevel: 'trace',
  waitforTimeout: 30000,
  connectionRetryTimeout: 90000,
  connectionRetryCount: 3,
};