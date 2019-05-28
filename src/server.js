import cluster from 'cluster';
import mongoose from 'mongoose';
import os from 'os';
import 'regenerator-runtime/runtime';
import App from './app';
import dotenvConfig from './configs/dotenv-config';
import logger from './tools/logger';

function init() {
  dotenvConfig();
  mongoose.connect(process.env.DATABASE_CONNECTION, {
    useNewUrlParser: true,
    useCreateIndex: true,
  });

  const port = process.env.PORT || 3334;
  App.listen(port);
  logger.info(`\n---------------------------------------------------------------------------------------------------------------------
########  #### ########  ##       ####    ###       ##     ## ########  ######  ########       ###    ########  ####    
##     ##  ##  ##     ## ##        ##    ## ##      ##     ## ##       ##    ##    ##         ## ##   ##     ##  ##     
##     ##  ##  ##     ## ##        ##   ##   ##     ##     ## ##       ##          ##        ##   ##  ##     ##  ##     
########   ##  ########  ##        ##  ##     ##    ##     ## ######    ######     ##       ##     ## ########   ##     
##     ##  ##  ##     ## ##        ##  #########     ##   ##  ##             ##    ##       ######### ##         ##     
##     ##  ##  ##     ## ##        ##  ##     ##      ## ##   ##       ##    ##    ##       ##     ## ##         ##     
########  #### ########  ######## #### ##     ##       ###    ########  ######     ##       ##     ## ##        #### 
---------------------------------------------------------------------------------------------------------------------
🚀🚀🚀     SERVER RODANDO NA PORTA ${port} PROCCESS ${process.pid}      🚀🚀🚀`);
}

if (process.env.NODE_ENV !== 'dev') {
  if (!cluster.isMaster) {
    init();
  } else {
    for (let i = 0; i < os.cpus().length; i += 1) {
      cluster.fork();
    }
  }
} else {
  init();
}
