const admitmiddleware = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Forbidden cannot access" });
  }
  next();
};

export default admitmiddleware;
