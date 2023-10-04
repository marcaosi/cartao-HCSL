const Jimp = require('jimp');

const cor = "verde"
let nome = "Pedro Henrique Manuel Lopes".toUpperCase()
const cpf = "174.361.092-00"
const id = "09345-001"

async function textOverlay() {
  const image = await Jimp.read(`./cartoes/${cor}.jpg`);
  const font = await Jimp.loadFont(Jimp.FONT_SANS_64_WHITE);
  image.print(font, 107, 580, nome, 820);
  image.print(font, 107, 949, cpf, 820);
  image.print(font, 107, 1227, id, 820);
  await image.writeAsync(`./cartoes/saida/cartao-${id}.jpg`);
}

textOverlay();
console.log("Cartão gerado!");

const qrcode = require('qrcode');
const dados = id;
const tamanho = 895;

qrcode.toFile(`./cartoes/saida/qr-${id}.png`, dados, {
  width: tamanho,
  height: tamanho,
}, function (err) {
  if (err) throw err;
  console.log('QR Code gerado!');
});




// teste de overlay de imagens


Jimp.read(`./cartoes/saida/cartao-${id}.jpg`, (err, fir_img) => {
  if(err) {
      console.log(err);
  } else {
      Jimp.read(`./cartoes/saida/qr-${id}.png`, (err, sec_img) => {
          if(err) {
              console.log(err);
          } else {
              fir_img.blit(sec_img, 1258, 362);
              fir_img.write(`${id}.png`);
          }
      })
  }
});