const setAuthCookie = (res, token) => {
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // HTTPS only in production
      sameSite: 'strict', // Protection against CSRF
      maxAge:7 * 24 * 60 * 60 * 1000, // Convert days to ms
      path: '/',
    });
};
module.exports = setAuthCookie