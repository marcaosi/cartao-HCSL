const Jimp = require('jimp')
const qrcode = require('qrcode')
const fs = require('fs').promises



async function textOverlay(nome, cpf, tipo, id) {
  try {
    const image = await Jimp.read(`./cartoes/${tipo}.jpg`)
    const font = await Jimp.loadFont(Jimp.FONT_SANS_64_WHITE)
    const filename = `./cartoes/saida/cartao-${id}.jpg`

    image.print(font, 107, 580, nome, 820)
    image.print(font, 107, 949, cpf, 820)
    image.print(font, 107, 1227, id, 820)

    await image.writeAsync(filename)

    return filename
  } catch (error) {
    throw new Error(`Falha ao gerar a imagem base: nome: ${nome}, tipo: ${tipo}`)
  }
}

async function generateQRCode(id) {
  try {
    const tamanho = 895
    const filename = `./cartoes/saida/qr-${id}.png`

    qrcode.toFile(filename, id, {
      width: tamanho,
      height: tamanho,
    })
    
    return filename
  } catch (error) {
    throw new Error(`Erro ao gerar QR Code: ${id}`)
  }
}

async function mergeImages(baseImage, qrcodeImage, id) {
  try {
    const fir_img = await Jimp.read(baseImage)
    const sec_img = await Jimp.read(qrcodeImage)
    const filename = `./cartoes/saida/${id}.png`

    fir_img.blit(sec_img, 1258, 362)
    
    await fir_img.writeAsync(filename)

    return filename
  } catch (error) {
    throw new Error(`Erro ao mesclar imagens: ${baseImage}, ${qrcodeImage} => ${id}`)
  }
}

async function cleanUp(filename) {
  try {
    await fs.unlink(filename)
  } catch (error) {
    console.error(`Erro ao excluir arquivo: ${filename}`)
  }
}

async function main() {

  const tipo = 0
  const nome = "Pedro Henrique Manuel Lopes".toUpperCase()
  const cpf = "174.361.092-00"
  const id = "09345-001"

  let cor = "verde"

  if(tipo == 1){
    cor = "verde-agua"
  }else if(tipo == 2){
    cor = "azul"
  }

  // const { cor, nome, cpf, id} = req.body

  const baseImage = await textOverlay(nome, cpf, cor, id)
  const qrcodeImage = await generateQRCode(id)
  const cartao = await mergeImages(baseImage, qrcodeImage, id)
  await cleanUp(baseImage)
  await cleanUp(qrcodeImage)
}

main()
