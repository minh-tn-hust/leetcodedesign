const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const PROTO_PATH = 'proto/app.proto';

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  arrays: true,
});

const ProblemManageService =
    grpc.loadPackageDefinition(packageDefinition).ProblemManageService;

const RPC_PORT = process.env.RPC_AUTH_PORT || 50051;
const ServiceHost = process.env.RPC_AUTH_HOST || 'localhost';

const client = new ProblemManageService(
    ServiceHost + ':' +RPC_PORT,
    grpc.credentials.createInsecure(),
);

module.exports = client;

