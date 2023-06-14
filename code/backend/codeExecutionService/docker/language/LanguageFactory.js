const BaseLanguage = require('./_base');
const { CPPLanguage } = require('./CPP');
const { GOLanguage } = require('./GO');

class Language extends BaseLanguage {
}

Language.SUPPORTED = {
  CPP: 'cpp',
  GO: 'go'
};

Language.create = function (type, runningPath) {
  switch (type) {
    case Language.SUPPORTED.CPP:
      return new CPPLanguage(runningPath);

    case Language.SUPPORTED.GO:
      return new GOLanguage(runningPath);

    default:
      return null;
  }
};

module.exports = Language;

