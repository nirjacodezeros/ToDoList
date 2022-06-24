// require('dotenv').config();
// import app from "./app";
// import { LogHelper } from '../lib/helpers/LogHelper';
// var SocketServerController = require('./socket/index.js')
// let logHelper = new LogHelper();

// const PORT = process.env.PORT;

// global['basedir'] = __dirname.replace("/lib", "");
// global['socket'] = new SocketServerController();
// global['dividendTransfering'] = false;
// global['apiLogs'] = {}
// var http = require('http').Server(app);


// // if (process.env.WEB_MODE == "local") {
// //     startExpress();
// // }
// // else {
// //     const cluster = require('cluster');
// //     const totalCPUs = require('os').cpus().length;
// //     if (cluster.isMaster) {
// //         console.log(`Number of CPUs is ${totalCPUs}`);
// //         console.log(`Master ${process.pid} is running`);

// //         // Fork workers.
// //         for (let i = 0; i < totalCPUs; i++) {
// //             cluster.fork();
// //         }

// //         cluster.on('exit', (worker, code, signal) => {
// //             console.log(`worker ${worker.process.pid} died`);
// //             console.log("Let's fork another worker!");
// //             cluster.fork();
// //         });

// //     }
// //     else {
// //         startExpress();
// //     }
// // }

// function startExpress() {

//     console.log(`Worker ${process.pid} started`);
//     var server = '';
//     server = http.listen(PORT, () => {
//         // console.log("Express server is listening on PORT " + PORT);
//         logHelper.log('Inside TS: Server => Express server is listening on PORT', PORT);
//     });
//     server.keepAliveTimeout = 120 * 1000;

//     {
//         global['socket'].startServer(http);
//     }
// }