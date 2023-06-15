

const convercao = {
  categorias: ['comprimento', 'peso', 'temperatura' ],
  unidades: {
    comprimento: ['metros', 'centimetros', 'polegadas' ],
    peso: ['quilogramas', 'gramas', 'libras'],
    temperatura: ['celsius', 'fahrenheit', 'kelvin'],
  },
  fatores: {
    comprimento: {
      metros: 1 ,
      centimetros: 100, 
      polegadas:  39.3701
    },
    peso:{
      quilograma: 1,
      gramas: 1000,
      libras: 2.20462
    },
    temperatura:{
      celsius: {
        fahrenheit: function(valor){
          return (valor * 9/5) + 32 
        },
        kelvin: function(valor){
          return valor + 273.15 
        },
        celsius: function(valor){
          return valor 
        }
      },
      fahrenheit:{
        celsius: function(valor){
          return (valor - 32) * 5/9
        },
        kelvin: function(valor){
          return (valor + 459.67) * 5/9
        },
        fahrenheit: function(valor){
          return valor
        }
      },
      kelvin:{
        celsius: function(valor){
          return valor - 273.15
        },
        kelvin: function(valor){
          return valor
        },
        fahrenheit: function(valor){
          return (valor * 9/5) - 459.67
        }
      }
    }
  }
}



var categorias = document.getElementById('categorias')

for (let i = 0; i < convercao.categorias.length; i++) {
  var option = document.createElement('option')
  option.textContent = convercao.categorias[i] 
  categorias.appendChild(option)
}

function atualizarUnidades(){
  var categoria = document.getElementById('categorias').value
  var unidades = convercao.unidades[categoria]
  var origem = document.getElementById('origem')
  var destino = document.getElementById('destino')
  origem.innerHTML = '' 
  destino.innerHTML = ''

  for (let i = 0; i < unidades.length; i++) {
    var option = document.createElement('option')
    option.textContent = unidades[i] 
    origem.appendChild(option)

    option = document.createElement('option')
    option.textContent = unidades[i] 
    destino.appendChild(option)
  }
}

function converter(){
  var origem = document.getElementById('origem').value
  var destino = document.getElementById('destino').value
  var valor = document.getElementById('valor').value
  var categoria = document.getElementById('categorias').value

  var resultado 

  switch (categoria) {
    case 'comprimento':

      var valorEmMetros = valor / convercao.fatores.comprimento[origem]
      resultado = valorEmMetros * convercao.fatores.comprimento[destino]
      
      break;

    case 'peso':

      var valorEmGramas = valor / convercao.fatores.comprimento[origem]
      resultado = valorEmGramas * convercao.fatores.comprimento[destino]
        
      break;

    case 'temperatura':
      resultado = convercao.fatores.temperatura[origem][destino](valor)
      break;
  
  }

  alert(resultado)

  return false
}

