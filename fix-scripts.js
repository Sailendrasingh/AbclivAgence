const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'scripts');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.ts'));

for (const file of files) {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    // Fix: console.log('... \n'); replacing single quotes with backticks or removing the newline
    // For unescaped quotes like `l'état`, if the string is wrapped in '', it breaks. We will change top level single quotes in console.log/error to backticks.

    content = content.replace(/console\.log\('([^]*?)'\);/g, (match, p1) => {
        return 'console.log(`' + p1 + '`);';
    });
    content = content.replace(/console\.error\('([^]*?)'\);/g, (match, p1) => {
        return 'console.error(`' + p1 + '`);';
    });

    fs.writeFileSync(filePath, content, 'utf8');
}
console.log('Fixed scripts');
