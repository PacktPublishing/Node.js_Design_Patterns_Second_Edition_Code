"use strict";

const logger = require('./logger_guard_es2015');

const dbLogger = logger('DB');
dbLogger.info('This is an informational message');

const accessLogger = logger('ACCESS');
accessLogger.verbose('This is a verbose message');
