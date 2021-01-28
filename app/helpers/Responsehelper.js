const { req } = require('pino-std-serializers');
const responseCode = require('./Responsecode'); //Resonse code

class Responsehelper {

    /**
     * @DESC : Return Response JSON
     * @prams:  String / Int / array
     * @return json results
     */

    out(req, res, statusCode, resultData = false) {

        switch (statusCode) {

            case responseCode.HTTP_UNAUTHORIZED:
                res.status(statusCode).json({
                    message: 'Unauthorized user'
                });
                break;

            case responseCode.HTTP_INTERNAL_SERVER_ERROR:
                logger.error({ ERROR_MESSAGE: resultData.message, ERROR: resultData.stack, requestPayload: { BODY: req.body || "", PARAMS: req.params || "", QUERYSTRING: req.query || "" } });
                res.status(statusCode).json({
                    message: 'Internal server error Or Invalid data'
                });
                break;

            case responseCode.HTTP_NOT_FOUND:

                res.status(statusCode).json({
                    message: 'data not found.'
                });
                break;

            case responseCode.HTTP_BAD_REQUEST:

                res.status(statusCode).json({
                    message: 'Required fields missing',
                    fields: resultData
                });
                break;

            case responseCode.HTTP_BAD_GATEWAY:

                res.status(statusCode).json({
                    message: 'Bad Gateway.'
                });
                break;

            case responseCode.HTTP_MULTIPLE_CHOICES:

                res.status(statusCode).json({
                    message: resultData
                });
                break;

            case responseCode.HTTP_OK:
                const result = {
                    status: true,
                    message: "success.!",
                    data: resultData || {}
                }
                logger.info({ requestPayload: { BODY: req.body || "", PARAMS: req.params || "", QUERYSTRING: req.query || "" } });
                res.status(statusCode).json(result);
                break;

            default:

                if (typeof resultData === 'object' && resultData && (resultData.message || resultData.data)) { /*with data or messgae */
                    res.status(statusCode).json(resultData);

                } else if (typeof resultData === 'object' && resultData) {
                    res.status(statusCode).json({
                        data: resultData
                    });

                } else {
                    res.status(statusCode).json({
                        message: resultData != null ? resultData : 'success'
                    });

                }
        }


    }

     /**
     * @DESC : triggering a joi error response
     * @params : String / Int /Array
     * @return : array/object
     */
    joierrors(req, res, err) {
        let error = err.details.reduce((prev, curr) => {
            prev[curr.path[0]] = curr.message.replace(/"/g, "");
            return prev;
        }, {});
        let message = "Invalid request !please enter valid input data.";
        let status = responseCode.HTTP_UNPROCESSABLE_ENTITY;

        return res.status(status).json({
            status,
            message,
            error
        });
    }
}




Responsehelper = new Responsehelper();
module.exports = Responsehelper;