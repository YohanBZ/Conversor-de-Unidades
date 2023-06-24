const convercao = {
  categorias: ['comprimento', 'peso', 'temperatura' ],
  unidades: {
    comprimento: ['metros', 'centimetros', 'polegadas' ],
    peso: ['quilograma', 'gramas', 'libras'],
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

var selecione = document.getElementById('selecione')
selecione.setAttribute("disabled", "true");

function atualizarOrigem(){
  var categoria = document.getElementById('categorias').value
  var unidades = convercao.unidades[categoria]
  var origem = document.getElementById('origem')
  var destino = document.getElementById('destino')
  destino.innerHTML = '<option>--selecione</option>'
  origem.innerHTML = '' 
  
  var option = document.createElement('option')
  option.textContent = "--selecione"
  option.setAttribute("disabled", "true")
  option.setAttribute("selected", "true")
  origem.appendChild(option)

  for (let i = 0; i < unidades.length; i++) {
    var option = document.createElement('option')
    option.textContent = unidades[i] 
    origem.appendChild(option)
  }
}

function atualizarDestino(){
  var categoria = document.getElementById('categorias').value
  var unidades = convercao.unidades[categoria]
  var destino = document.getElementById('destino')
  destino.innerHTML = ''

  for (let i = 0; i < unidades.length; i++){
    if(unidades[i] != document.getElementById('origem').value){
      option = document.createElement('option')
      option.textContent = unidades[i] 
      destino.appendChild(option)
    }
  }
}

var resultadoConversao = document.getElementById('resultadoConversao');

function converter(){
  var categoria = document.getElementById('categorias').value
  var origem = document.getElementById('origem').value
  var destino = document.getElementById('destino').value
  var valor = parseInt(document.getElementById('valor').value)
  var resultado 

  if(categoria != '--selecione' && origem != '--selecione' && destino != '--selecione'){

    switch (categoria) {
      case 'comprimento':
  
        var valorEmMetros = valor / convercao.fatores.comprimento[origem]
        resultado = valorEmMetros * convercao.fatores.comprimento[destino]
  
        break
  
      case 'peso':
  
        var valorEmGramas = valor / convercao.fatores.peso[origem]
        resultado = valorEmGramas * convercao.fatores.peso[destino]
          
        break
  
      case 'temperatura':
        resultado = convercao.fatores.temperatura[origem][destino](valor)
        if(destino == 'celsius'){
          resultado = `${resultado.toFixed(1)}°C`
        } else if(destino == 'fahrenheit'){
          resultado = `${resultado.toFixed(1)}°F`
        } else if(destino == 'kelvin'){
          resultado = `${resultado.toFixed(1)}°k`
        }
        break
    
    }
  
    resultadoConversao.value = `${resultado}`;
  } else {
    alert("selecione todos os campos!!!")
  }

  return false
}

