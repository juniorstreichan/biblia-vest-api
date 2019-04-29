'use strict';

var _app = require('./app');

var _app2 = _interopRequireDefault(_app);

var _dotenvConfig = require('./configs/dotenv-config');

var _dotenvConfig2 = _interopRequireDefault(_dotenvConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _dotenvConfig2.default)();

var port = process.env.PORT || 3334;
_app2.default.listen(port);

console.log('---------------------------------------------------------------------------------------------------------------------\n########  #### ########  ##       ####    ###       ##     ## ########  ######  ########       ###    ########  ####    \n##     ##  ##  ##     ## ##        ##    ## ##      ##     ## ##       ##    ##    ##         ## ##   ##     ##  ##     \n##     ##  ##  ##     ## ##        ##   ##   ##     ##     ## ##       ##          ##        ##   ##  ##     ##  ##     \n########   ##  ########  ##        ##  ##     ##    ##     ## ######    ######     ##       ##     ## ########   ##     \n##     ##  ##  ##     ## ##        ##  #########     ##   ##  ##             ##    ##       ######### ##         ##     \n##     ##  ##  ##     ## ##        ##  ##     ##      ## ##   ##       ##    ##    ##       ##     ## ##         ##     \n########  #### ########  ######## #### ##     ##       ###    ########  ######     ##       ##     ## ##        #### \n---------------------------------------------------------------------------------------------------------------------');

console.log('\uD83D\uDE80\uD83D\uDE80\uD83D\uDE80     SERVER RODANDO NA PORTA ' + port + '      \uD83D\uDE80\uD83D\uDE80\uD83D\uDE80');