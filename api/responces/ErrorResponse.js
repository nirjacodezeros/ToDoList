function ErrorResponse (res,message,data)  {
    // added comment for checking
    if(data == null){
        data = "";
    }

    res.status(200);
    res.json({
        success: false,
        message:message,
        data:data
    });
}
module.exports.ErrorResponse = ErrorResponse