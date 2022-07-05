function InternalServerErrorResponse (res, message, code = 2) {
    // added comment for checking
    res.status(200); //res.status(401);
    res.json({
        success: false,
        error_code: code,
        message: message,
        data: ""
    });

};
module.exports.InternalServerErrorResponse = InternalServerErrorResponse