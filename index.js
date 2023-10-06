const Jimp = require('jimp')
const qrcode = require('qrcode')
const fs = require('fs').promises

const cor = "verde"
const nome = "Pedro Henrique Manuel Lopes".toUpperCase()
const cpf = "174.361.092-00"
const id = "09345-001"

async function textOverlay() {
  try {
    const image = await Jimp.read(`./cartoes/${cor}.jpg`)
    const font = await Jimp.loadFont(Jimp.FONT_SANS_64_WHITE)
    image.print(font, 107, 580, nome, 820)
    image.print(font, 107, 949, cpf, 820)
    image.print(font, 107, 1227, id, 820)
    console.log("Cartão gerado!")
    await image.writeAsync(`./cartoes/saida/cartao-${id}.jpg`)
  } catch (error) {
    console.error("Erro ao processar imagem:", error)
  }
}

async function generateQRCode() {
  try {
    const tamanho = 895
    await qrcode.toFile(`./cartoes/saida/qr-${id}.png`, id, {
      width: tamanho,
      height: tamanho,
    })
    console.log('QR Code gerado!')
  } catch (error) {
    console.error("Erro ao gerar QR Code:", error)
  }
}

async function mergeImages() {
  try {
    const fir_img = await Jimp.read(`./cartoes/saida/cartao-${id}.jpg`)
    const sec_img = await Jimp.read(`./cartoes/saida/qr-${id}.png`)
    fir_img.blit(sec_img, 1258, 362)
    await fir_img.writeAsync(`./cartoes/saida/${id}.png`)
    console.log(`${id}.png gerado`)
  } catch (error) {
    console.error("Erro ao mesclar imagens:", error)
  }
}

async function cleanUp() {
  try {
    await fs.unlink(`./cartoes/saida/qr-${id}.png`)
    await fs.unlink(`./cartoes/saida/cartao-${id}.jpg`)
  } catch (error) {
    console.error("Erro ao excluir arquivos:", error)
  }
}

async function main() {
  await textOverlay()
  await generateQRCode()
  await mergeImages()
  await cleanUp()
}

main()
