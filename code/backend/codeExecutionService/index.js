const Docker = require('dockerode');

class Language {
    /** @type Docker.ExecCreateOptions */ compileOption = null;
    /** @type Docker.ExecCreateOptions */ runOption = null;
    /** @type Docker.ContainerCreateOptions */ languageConfig = null;
}

class DockerContainer {
    /** @type Docker */ docker = null;
    /** @type Docker.Container */ container = null;
    /** @type Language */ language = null;

    constructor(language) {
        this.language = language;
        this.docker = new Docker();
    }

    async createContainer() {
        try {
            this.container = await this.docker.createContainer(this.language.languageConfig);
            return true;
        } catch (error) {
            console.log('Đã xảy ra lỗi khi tạo container:', error);
            return false;
        }
    }

    async startContainer() {
        try {
            await this.container.start();
            return true;
        } catch (error) {
            console.log('Đã xảy ra lỗi khi khởi động container:', error);
            return false;
        }
    }

    /**
     * @param {Docker.Exec} exec 
     */
    async handleEndCommand(exec, beginTime) {
        console.log("Thời gian thực thi của lệnh : " + (Date.now() - beginTime) + "ms");
        let  abortControler = new AbortController();
        let inspectInfo = await exec.inspect({abortSignal : abortControler.signal});
    }

    async executeCommand(cmd, isInspect = false) {
        try {
            const exec = await this.container.exec(cmd);
            const stream = await exec.start({hijack : true, stdin : true});
            let beginTime = Date.now();
            if (isInspect) {
                stream.on('finish', () => this.handleEndCommand(exec, beginTime))
            }
            this.container.modem.demuxStream(stream, process.stdout, process.stderr);
        } catch (error) {
            console.log('Đã xảy ra lỗi khi thực thi lệnh trong container:', error);
        }
    }

    async compile() {
        const { container, language } = this;
        const compileOption = language.compileOption;

        try {
            await this.executeCommand(compileOption, false);
        } catch (error) {
            console.log('Đã xảy ra lỗi khi thực thi lệnh compile trong container:', error);
        }
    }

    async run() {
        const { container, language } = this;
        const runOption = language.runOption;

        try {
            await this.executeCommand(runOption, true);
        } catch (error) {
            console.log('Đã xảy ra lỗi khi thực thi lệnh run trong container:', error);
        }
    }
}

async function Test() {
    const language = new Language();
    language.compileOption = {
        Cmd: ['g++', 'A.cpp', '-o', 'A', '-std=c++14'],
        AttachStdout: true,
        AttachStderr: true
    };

    language.runOption = {
        Cmd: ['./A'],
        AttachStdout: true,
        AttachStderr: true
    };

    language.languageConfig = {
        Image: 'gcc',
        Tty: true,
        HostConfig: {
            Binds: [`${__dirname}:/source`],
            Memory: 256 * 1024 * 1024,
            CpuPeriod : 10000,
            CpuQuota : 1000000
        },
        WorkingDir: '/source'
    };

    const dockerContainer = new DockerContainer(language);
    const containerCreated = await dockerContainer.createContainer();

    if (containerCreated) {
        const containerStarted = await dockerContainer.startContainer();

        if (containerStarted) {
            await dockerContainer.compile();
            await dockerContainer.run();
        }
    }
}

Promise.all([
    Test(),
])
