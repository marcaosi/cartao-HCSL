const Jimp = require('jimp');

const nome = "Pedro Henrique Manuel Lopes"
const cpf = "174.361.092-00"
const id = "09345-001"

async function textOverlay() {
    // Reading image
    const image = await Jimp.read('./cartoes/1.jpg');
    // Defining the text font
    const font = await Jimp.loadFont(Jimp.FONT_SANS_64_WHITE);
    image.print(font, 107, 580, nome, 820);
    image.print(font, 107, 949, cpf, 820);
    image.print(font, 107, 1227, id, 820);
    // Writing image after processing
    await image.writeAsync('./cartoes/output/test.jpg');
}

textOverlay();
console.log("Cartão gerado!");

var QRCode = require('qrcode')
const fs = require("fs");

QRCode.toDataURL(id, function (err, url) {
    console.log(url)
    var urlCorreta = url.replace("data:image/png;base64,", "")
    const buffer = Buffer.from(urlCorreta, "base64");
    fs.writeFileSync("qr-code.png", buffer);
})
