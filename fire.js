//array linear
const firePixelsArray = []

//variaveis que vao definir o tamanho do fogo
let fireWidth = 60
let fireHeight = 40
let debug = false
const fireColorsPalette = [{"r":7,"g":7,"b":7},{"r":31,"g":7,"b":7},{"r":47,"g":15,"b":7},{"r":71,"g":15,"b":7},{"r":87,"g":23,"b":7},{"r":103,"g":31,"b":7},{"r":119,"g":31,"b":7},{"r":143,"g":39,"b":7},{"r":159,"g":47,"b":7},{"r":175,"g":63,"b":7},{"r":191,"g":71,"b":7},{"r":199,"g":71,"b":7},{"r":223,"g":79,"b":7},{"r":223,"g":87,"b":7},{"r":223,"g":87,"b":7},{"r":215,"g":95,"b":7},{"r":215,"g":95,"b":7},{"r":215,"g":103,"b":15},{"r":207,"g":111,"b":15},{"r":207,"g":119,"b":15},{"r":207,"g":127,"b":15},{"r":207,"g":135,"b":23},{"r":199,"g":135,"b":23},{"r":199,"g":143,"b":23},{"r":199,"g":151,"b":31},{"r":191,"g":159,"b":31},{"r":191,"g":159,"b":31},{"r":191,"g":167,"b":39},{"r":191,"g":167,"b":39},{"r":191,"g":175,"b":47},{"r":183,"g":175,"b":47},{"r":183,"g":183,"b":47},{"r":183,"g":183,"b":55},{"r":207,"g":207,"b":111},{"r":223,"g":223,"b":159},{"r":239,"g":239,"b":199},{"r":255,"g":255,"b":255}]

//função de inicialização
function start(){
    
    createFireDataStructure()
    createFireSource()

    setInterval(calculateFirePropagation, 50)

}

function createFireDataStructure(){
    const numberOfPixels = fireWidth * fireHeight

    for(let i = 0; i < numberOfPixels; i++){
        firePixelsArray[i] = 0;
    }

}

function calculateFirePropagation(){
    //navegar por todos os pixels
    for (let column = 0; column < fireWidth; column++) {
        for (let row = 0; row < fireHeight; row++) {
            const pixelIndex = column + (fireWidth * row)
            
            updateFireIntensityPerPixel(pixelIndex)
        }
        
    }
    renderFire()
}

//vai olhar para o pixel de baixo e calcular o valor
function updateFireIntensityPerPixel(currentPixelIndex){
    const belowPixelIndex = currentPixelIndex + fireWidth

    //se o pixel de baixo for mior que a função do cavas. Função, não faça nada.
    if (belowPixelIndex >= fireWidth * fireHeight) {
        return
    }

    //a variavel 'decay' é o valor do declínio do fogo, do desconto de intensidade do fogo 
    const decay = Math.floor(Math.random() * 3)
    const belowPixelFireIntensity = firePixelsArray[belowPixelIndex]
    //se a subtração for maior ou igual a zero, atibui o valor da variável/ se nâo coloca como zero  
    const newFireIntensity = belowPixelFireIntensity - decay >= 0 ? belowPixelFireIntensity - decay : 0

    firePixelsArray[currentPixelIndex - decay] = newFireIntensity
}

function renderFire(){
    let html = '<table cellpadding=0 cellspacing=0>'

    //para cada pixel do fogo vai ser criada um table row
    for (let row = 0; row < fireHeight; row++){
        html += '<tr>'
        //para cada largua do fogo vai ser criada uma tabel data
        for (let column = 0; column < fireWidth; column++) {
            const pixelIndex = column + (fireWidth * row)
            const fireIntensity = firePixelsArray[pixelIndex]
            const color = fireColorsPalette[fireIntensity]
            const colorString = `${color.r},${color.g},${color.b}`

            if (debug === true) {
                html += '<td class="td">'
                html += `<div class="pixel-index">${pixelIndex}</div>`
                html += fireIntensity
                html += '</td>' 
            }else{
                html += `<td class="pixel" style="background-color: rgb(${colorString})">`
                html += '</td>'
            }


        }

        html += '</tr>' 
    }

    html += '</table>'

    document.querySelector('#fireCanvas').innerHTML = html
}

//função que craia a fonte de fogo
function createFireSource(){
    for (let column = 0; column <= fireWidth; column++) {
        const overflowPixelIndex = fireWidth * fireHeight
        const pixelIndex = (overflowPixelIndex - fireWidth) + column

        firePixelsArray[pixelIndex] = 36
        
    }
}
function destroyFireSource() {
    for (let column = 0; column <= fireWidth; column++) {
      const overflowPixelIndex = fireWidth * fireHeight
      const pixelIndex = (overflowPixelIndex - fireWidth) + column  //find last pixel of the colunm
  
      firePixelsArray[pixelIndex] = 0  // increment zero in each of the indices of our array
    }			       	     // this means: 0 fire fireIntensity
  }
  
  function increaseFireSource() {
    for (let column = 0; column <= fireWidth; column++) {
      const overflowPixelIndex = fireWidth * fireHeight  // all the pixels of the fire
      const pixelIndex = (overflowPixelIndex - fireWidth) + column  //find last pixel of the colunm
      const currentFireIntensity = firePixelsArray[pixelIndex]
  
      // increases the pixel according to its intensity
      if (currentFireIntensity < 36) {
        const increase = Math.floor(Math.random() * 14)
        const newFireIntensity =
          currentFireIntensity + increase >= 36 ? 36 : currentFireIntensity + increase
  
        firePixelsArray[pixelIndex] = newFireIntensity
      }
    }
  }
  
  function decreaseFireSource() {
    for (let column = 0; column <= fireWidth; column++) {
      const overflowPixelIndex = fireWidth * fireHeight  // all the pixels of the fire
      const pixelIndex = (overflowPixelIndex - fireWidth) + column  //find last pixel of the colunm
      const currentFireIntensity = firePixelsArray[pixelIndex]
  
      // increases the pixel according to its intensity
      if (currentFireIntensity > 0) {
        const decay = Math.floor(Math.random() * 14)  // fire intensity discount
        const newFireIntensity =
          currentFireIntensity - decay >= 0 ? currentFireIntensity - decay : 0
  
        // takes the new intensity value with discount and throws this value into the pixel that we are iterating
        firePixelsArray[pixelIndex] = newFireIntensity
      }
    }
  }
  
  function toggleDebugMode() {
    if (debug === false) {
      fireWidth = 25
      fireHeight = 17
      debug = true
    } else {
      fireWidth = 60
      fireHeight = 40
      debug = false
    }
  
    createFireDataStructure()
    createFireSource()
  }
  
  start()