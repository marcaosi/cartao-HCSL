const Jimp = require('jimp');

async function textOverlay() {
    // Reading image
    const image = await Jimp.read('test.png');
    // Defining the text font
    const font = await Jimp.loadFont(Jimp.FONT_SANS_64_WHITE);
    image.print(font, 107, 580, 'Pedro Henrique Manuel Lopes aaaahahahahha', 820);
    image.print(font, 107, 949, '174.361.092-00', 820);
    image.print(font, 107, 1227, '09345-001', 820);
    // Writing image after processing
    await image.writeAsync('test.png');

}
textOverlay();
console.log("Image is processed succesfully");



