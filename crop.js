const sharp = require('sharp'); sharp('public/assets/screenshots/desktop-full.png').extract({ left: 0, top: 0, width: 1200, height: 630 }).toFile('app/opengraph-image.png');
