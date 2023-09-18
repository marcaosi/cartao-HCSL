const Jimp = require('jimp');

async function textOverlay() {
    // Reading image
    const image = await Jimp.read('test.jpg');
    // Defining the text font
    const font = await Jimp.loadFont('./font/montserrat.fnt').then(function (font) {
        image.print(font, 50, 50, "Hello World!");
        image.write("/output/output.jpg");
    });

    // image.print(font, 107, 580, 'Pedro Henrique Manuel Lopes aaaahahahahha', 820);
    // image.print(font, 107, 949, '174.361.092-00', 820);
    // image.print(font, 107, 1227, '09345-001', 820);
    // // Writing image after processing
    // await image.writeAsync('test.jpg');

}
textOverlay();
// console.log("Image is processed succesfully");



