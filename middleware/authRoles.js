const verifyRoles = (cekRole) => (req, res, next) => {
  if (!req?.role) return res.sendStatus(401);
  if (req.role !== cekRole) return res.sendStatus(401);
  next();
};

export default verifyRoles;
