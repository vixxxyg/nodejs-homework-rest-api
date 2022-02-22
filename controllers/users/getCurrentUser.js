const getCurrentUser = async (req, res, next) => {
  const { email, subscription } = req.user;
  res.json({
    user: {
      email,
      subscription,
    },
  });
};

module.exports = getCurrentUser;
