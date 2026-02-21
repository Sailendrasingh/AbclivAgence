const fs = require('fs');
const { PNG } = require('pngjs');

const imgPath = 'C:\\Users\\sbour\\.gemini\\antigravity\\brain\\27a772f2-825b-4e62-ac70-ddf71fabe56f\\.system_generated\\click_feedback\\click_feedback_1771697240111.png';

fs.createReadStream(imgPath)
    .pipe(new PNG())
    .on('parsed', function () {
        let purpleCount = 0;
        let orangeCount = 0;

        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                let idx = (this.width * y + x) << 2;
                let r = this.data[idx];
                let g = this.data[idx + 1];
                let b = this.data[idx + 2];

                // #5e5cd0 is roughly rgb(94, 92, 208)
                if (Math.abs(r - 94) < 10 && Math.abs(g - 92) < 10 && Math.abs(b - 208) < 10) {
                    purpleCount++;
                }

                // #ff8000 or #f9b115 is mostly red/green, low blue
                if (r > 200 && g > 100 && g < 200 && b < 100) {
                    orangeCount++;
                }
            }
        }
        console.log("Purple px:", purpleCount, "Orange px:", orangeCount);
    });
