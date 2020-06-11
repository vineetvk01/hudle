import log4js from 'log4js';
// import { IS_PRODUCTION } from '../constants';

const Logger = (identifier) => {
  const logger = log4js.getLogger(identifier);
  logger.level = false ? 'info' : 'debug';
  return logger;
};

export default Logger;