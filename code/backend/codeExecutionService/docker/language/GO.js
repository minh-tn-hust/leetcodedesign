
const BaseLanguage = require('./_base.js');

class GOLanguage extends BaseLanguage {
    setCompileOption() {
        this.compileOption = {
            Cmd: ['go', 'build', '-o', 'A', this.baseFileName],
            AttachStdout: true,
            AttachStdin: true,
            AttachStderr: true
        };
    }

    setRunOption() {
        this.runOption = {
            Cmd: ['./A'],
            AttachStdout: true,
            AttachStdin: true,
            AttachStderr: true
        }
    }

    setLanguageConfig() {
        this.languageConfig = {
            Image: 'golang',
            Tty: true,
            HostConfig: {
                Binds: [`${this.baseDirectory}:/source`],
                Memory: 256 * 1024 * 1024,
                CpuPeriod: 100000,
                CpuQuota: 100000
            },
            WorkingDir: '/source',
            OpenStdin: true,
            AttachStdin: true,
        }
    }
}

module.exports = {
    GOLanguage: GOLanguage
}

