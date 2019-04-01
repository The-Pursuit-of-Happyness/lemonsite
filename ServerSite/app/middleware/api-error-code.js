const md5 = require('md5');

module.exports = function(config, app) {

    return async (ctx, next) => {
        try {
            await next();
        } catch (e) {
            if (e.code) {
                ctx.body = {
                    code: e.code,
                    message: e.message
                };
            } else {
                throw e;
            }
        }

    }
}
