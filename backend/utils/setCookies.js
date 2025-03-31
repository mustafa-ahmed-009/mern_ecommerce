const setAuthCookie = (res, token) => {
  const isProduction = process.env.NODE_ENV === 'production';
    res.cookie('token', token, {
      httpOnly: true,
      secure: isProduction, // Set Secure flag only in production (HTTPS)
      sameSite: 'None',     // Necessary for cross-site requests
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
      path: '/',
      domain: isProduction ? 'ecommerce-tt99-backend.vercel.app' : undefined
      
    });
};
module.exports = setAuthCookie