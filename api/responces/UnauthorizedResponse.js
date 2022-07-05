function UnauthorizedResponse(res, message, code = 4) {
  // added comment for checking
  res.status(200); //res.status(401);
  res.json({
    success: false,
    error_code: code,
    message: message,
    data: "",
  });
}
module.exports.UnauthorizedResponse = UnauthorizedResponse;
