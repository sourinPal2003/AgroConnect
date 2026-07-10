const roleCheck = (allowedRoles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ error: "User not authenticated" });
        }

        if (!allowedRoles.includes(req.user.role)) {
            return res.status(403).json({ error: "Access denied. Insufficient permissions" });
        }    

        if (!req.user.isVerified) {
            return res.status(403).json({ error: "Access denied. User is not verified" });
        }

        next();
    };
};

module.exports = roleCheck;
