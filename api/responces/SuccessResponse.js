function SuccessResponse (res,message,data) {
// added comment for checking
    if(data == null){
        data = "";
    }

    res.status(200);
    res.json({
        success: true,
        message:message,
        data:data
    });
}
module.exports.SuccessResponse = SuccessResponse