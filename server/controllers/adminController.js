const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const db = require("../config/database");

dotenv.config();

// Controller to authenticate and log in an admin
exports.loginAdmin = (req, res) => {
    const { password } = req.body;
    // console.log(password);
    const query = "SELECT * FROM admin"; // Assuming there is only one admin, adjust the query based on your database structure

    db.query(query, (error, results) => {
        if (error) {
            console.log(error);
            res.status(400).json({
                message: "Error logging in",
            });
        }
        if (results.length > 0) {
            const admin = results[0];
            const token = jwt.sign(
                {
                    adminId: admin.id,
                    adminPassword: admin.password,
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: "1h",
                }
            );
            res.status(200).json({
                message: "Admin logged in successfully",
                admin: {
                    adminId: admin.id,
                    adminPassword: admin.password,
                    token: token,
                },
            });
        }
    });
};
