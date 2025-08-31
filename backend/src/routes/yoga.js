const express = require("express");
const router = express.Router();
const YogaClass = require("../models/YogaClass");
const fetchUser = require("../middleware/fetchUser");
const checkRole = require("../middleware/checkRole");
const multer = require("multer");
const path = require("path");
require("dotenv").config();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../../uploads'));
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    },
});
const upload = multer({ storage: storage });

router.get("/getall", async (req, res) => {
    try {
        const yogaClasses = await YogaClass.find();
        res.json({ success: true, yogaClass: yogaClasses });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: "Internal server error",
        });
    }
});

router.post("/add", fetchUser, checkRole("ADMIN"), upload.single("imageFile"), async (req, res) => {
    try {
        const {
            name,
            level,
            instructor,
            organization,
            startTime,
            endTime,
            duration,
            frequency,
            healthCondition,
            style,
            price,
            rating,
            image: imageUrl,
        } = req.body;

        // Log all received fields for debugging
        console.log("Received fields:");
        console.log("name:", name);
        console.log("level:", level);
        console.log("instructor:", instructor);
        console.log("organization:", organization);
        console.log("startTime:", startTime);
        console.log("endTime:", endTime);
        console.log("duration:", duration);
        console.log("frequency:", frequency);
        console.log("healthCondition:", healthCondition);
        console.log("style:", style);
        console.log("price:", price);
        console.log("rating:", rating);
        console.log("imageUrl:", imageUrl);
        console.log("req.file:", req.file);

        // If a file was uploaded, use its path as the image URL
        let image = imageUrl;
        if (req.file) {
            image = `/uploads/${req.file.filename}`;
        }

        const newYogaClass = new YogaClass({
            name,
            level,
            instructor,
            organization,
            startTime,
            endTime,
            duration,
            frequency,
            healthCondition,
            style,
            price,
            rating,
            image,
        });

        const savedYogaClass = await newYogaClass.save();
        console.log("Yoga class added:", savedYogaClass);
        res.status(200).json({ success: true, yogaClass: savedYogaClass });
    } catch (error) {
        console.error("Error in POST /yoga/add:", error);
        res.status(500).json({
            success: false,
            error: error.message || "Internal server error",
        });
    }
});

router.get("/get/:id", async (req, res) => {
    try {
        console.log(req.params.id);

        const yogaClass = await YogaClass.findById(req.params.id);

        if (!yogaClass) {
            res.status(404).json({
                success: false,
                error: "Yoga class not found",
            });
        }

        console.log(yogaClass);

        res.status(200).json({ success: true, yogaClass: yogaClass });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: "Yoga class not found",
        });
    }
});

router.put("/update/:id", fetchUser, checkRole("ADMIN"), async (req, res) => {
    try {
        const updatedYogaClass = await YogaClass.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.json({ success: true, yogaClass: updatedYogaClass });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

router.delete("/delete/:id", fetchUser, checkRole("ADMIN"), async (req, res) => {
    try {
        console.log("DELETE /yoga/delete/:id called");
        console.log("Requested ID:", req.params.id);
        // Check if ID is a valid ObjectId
        if (!req.params.id || req.params.id.length !== 24) {
            console.log("Invalid ID format");
            return res.status(400).json({ success: false, error: "Invalid ID format" });
        }
        const deleted = await YogaClass.findByIdAndDelete(req.params.id);
        if (!deleted) {
            console.log("Yoga class not found for ID:", req.params.id);
            return res.status(404).json({ success: false, error: "Yoga class not found" });
        }
        console.log("Yoga class deleted:", deleted);
        res.json({ success: true, message: "Yoga class deleted" });
    } catch (error) {
        console.error("Error in DELETE /yoga/delete/:id:", error);
        res.status(500).json({ success: false, error: error.message });
    }
});

module.exports = router;


