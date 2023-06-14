const BaseLanguage = require('./_base.js');

class CPPLanguage extends BaseLanguage {
    setCompileOption() {
        this.compileOption = {
            Cmd: [
                'g++',
                "-static",
                "-std=c++14",
                "-fno-optimize-sibling-calls",
                "-fno-strict-aliasing",
                "-DONLINE_JUDGE",
                "-lm",
                "-s",
                "-std=c++14",
                "-Warray-bounds",
                "-O2",
                this.baseFileName,
                "-o",
                "A"
            ],
            AttachStdout: true,
            AttachStderr: true
        }
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
            Image: 'gcc',
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
    CPPLanguage: CPPLanguage
}

