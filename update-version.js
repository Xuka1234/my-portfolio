#!/usr/bin/env node

/**
 * Script để tự động cập nhật version cho CSS và JS files
 * Chạy: node update-version.js
 */

const fs = require('fs');
const path = require('path');

// Generate random version string (8 characters)
function generateVersion() {
    return Math.random().toString(36).substring(2, 10);
}

// Update index.html with new versions
function updateVersions() {
    const indexPath = path.join(__dirname, 'index.html');
    let content = fs.readFileSync(indexPath, 'utf8');
    
    // Generate new versions
    const cssVersion = generateVersion();
    const jsVersion = generateVersion();
    
    // Update CSS version
    content = content.replace(
        /styles\.css\?v=[a-z0-9]+/g,
        `styles.css?v=${cssVersion}`
    );
    
    // Update JS version
    content = content.replace(
        /script\.js\?v=[a-z0-9]+/g,
        `script.js?v=${jsVersion}`
    );
    
    // Write back to file
    fs.writeFileSync(indexPath, content, 'utf8');
    
    console.log('✅ Versions updated successfully!');
    console.log(`🎨 CSS version: ${cssVersion}`);
    console.log(`⚡ JS version: ${jsVersion}`);
    console.log('');
    console.log('🚀 Files ready for deployment with cache busting!');
}

// Run the update
updateVersions();