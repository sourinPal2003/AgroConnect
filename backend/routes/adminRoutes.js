const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const roleCheck = require("../middleware/roleCheck");
const {
    getAllUsers,
    verifyUser,
    createCrop,
    getAllCrops,
    deleteCrop,
    getVerifiedInspectors
} = require("../controllers/adminController");

// Get all users
router.get("/users", auth, roleCheck(["admin"]), getAllUsers);

// Verify/Unverify user
router.put("/users/:userId/verify", auth, roleCheck(["admin"]), verifyUser);

// Create crop
router.post("/crops", auth, roleCheck(["admin"]), createCrop);

// Get all crops
router.get("/crops", getAllCrops);

// Delete crop
router.delete("/crops/:cropId", auth, roleCheck(["admin"]), deleteCrop);
// Get all verified inspectors
router.get(
    "/verified-inspectors",
    auth,
    roleCheck(["admin"]),
    getVerifiedInspectors
);

module.exports = router;
