const { PrismaClient } = require("@prisma/client");
const prisma = require("../utills/db");
const path = require('path');
const fs = require('fs');

function getUploadsPath() {
    // For production (VPS)
    if (process.env.NODE_ENV === 'staging' || process.env.NODE_ENV === 'production') {
        return '/var/www/calligadh_dev/frontend-staging/public'; // Absolute path on VPS
    }
    // For local development
    return path.join(__dirname, '../public');
}

async function uploadMainImage(req, res) {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({ message: "Nema otpremljenih fajlova" });
    }

    const uploadedFile = req.files.uploadedFile;
    const uploadsDir = getUploadsPath();

    // Ensure directory exists
    if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir, { recursive: true });
    }

    const filePath = path.join(uploadsDir, uploadedFile.name);

    uploadedFile.mv(filePath, (err) => {
        if (err) {
            console.error('Upload error:', err);
            return res.status(500).json({ 
                message: "Greška pri otpremanju fajla",
                error: err.message 
            });
        }

        res.status(200).json({
            success: true,
            filename: uploadedFile.name,
            path: `/uploads/${uploadedFile.name}`,
            message: "Fajl je uspešno otpremljen"
        });
    });
}

module.exports = {
    uploadMainImage
};