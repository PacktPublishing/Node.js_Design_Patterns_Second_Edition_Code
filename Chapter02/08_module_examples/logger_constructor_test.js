"use strict";

const Logger = require('./logger_constructor');

const dbLogger = new Logger('DB');
dbLogger.info('This is an informational message');

const accessLogger = new Logger('ACCESS');
accessLogger.verbose('This is a verbose message');
