// Nesta seção, o objeto convercao é definido para armazenar as categorias de conversão, unidades disponíveis e fatores de conversão. 
const convercao = {

  // Lista das categorias disponíveis em forma array .
  categorias: ['comprimento', 'peso', 'temperatura' ],

   // Unidades disponíveis para cada categoria. Unidade é um objeto que contem as categorias e nelas temos arrays com suas unidades de medidas.
  unidades: {
    comprimento: ['metros', 'centimetros', 'polegadas' ],
    peso: ['quilograma', 'gramas', 'libras'],
    temperatura: ['celsius', 'fahrenheit', 'kelvin'],
  },

  // Fatores é um objeto de conversão para cada categoria e unidade. As unidades são definidas como propriedades dentro das categorias, e seus valores são os fatores de conversão.
  fatores: {

    // Foi criado um objeto comprimento onde temos chave e valor, usamos metro como referencia de valor para os outros.
    comprimento: {
      metros: 1 ,
      centimetros: 100, 
      polegadas:  39.3701
    },

    //Foi criado um objeto peso com chave e valor onde usamos o quilograma como referencia para os demas.
    peso:{
      quilograma: 1,
      gramas: 1000,
      libras: 2.20462
    },

    // Temos objeto temperatura que é composto por três sub-objetos: celsius, fahrenheit e kelvin. Cada sub-objeto representa uma escala de temperatura e contém as funções necessárias para converter valores entre as escalas.
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


// Esse trecho de código desempenha a função de atualizar as opções disponíveis em um elemento select
function atualizarCategorias(){

    // começa obtendo a referência ao elemento select com o id "categorias" e armazenando-o na variável categorias.
    var categorias = document.getElementById('categorias')

    // Em seguida, é realizado um loop sobre o array convercao.categorias para percorrer cada categoria presente nesse array.
    for (let i = 0; i < convercao.categorias.length; i++) {

        // Dentro do loop, para cada categoria, é criado um novo elemento option, que representa uma opção em um elemento select.
        var option = document.createElement('option')

        // Em seguida, é definido o texto exibido para a opção, utilizando textContent, onde convercao.categorias[i] representa o valor da categoria atual no loop.
        option.textContent = convercao.categorias[i] 

        // O elemento option criado é então anexado ao elemento select (representado pela variável categorias) usando appendChild. Isso adiciona a opção ao conjunto de opções disponíveis no elemento select.
        categorias.appendChild(option)
    }

  // Após percorrer todas as categorias e adicionar as opções correspondentes, o código busca o elemento com o id "selecione" usando document.getElementById('selecione') e armazena-o na variável selecione.
  var selecione = document.getElementById('selecione')

  // Em seguida, é utilizado o método setAttribute para definir o atributo "disabled" como "true" para o elemento selecione, fazendo com que ele fique desativado ou inacessível para interações do usuário
  selecione.setAttribute("disabled", "true")
}

//A função atualizarOrigem() atualiza as opções disponíveis no elemento origem com base na categoria selecionada no elemento categorias. 
function atualizarOrigem(){

  // Essa linha obtém o valor selecionado no elemento com o id 'categorias' e o armazena na variável categoria.
  var categoria = document.getElementById('categorias').value

  // Essa linha obtém as unidades correspondentes à categoria selecionada da variável convercao.unidades e retorna um array e as armazena na variável unidades.
  var unidades = convercao.unidades[categoria]

  // Essa linha obtém a referência ao elemento com o id 'origem' e a armazena na variável origem.
  var origem = document.getElementById('origem')

  // Essa linha obtém a referência ao elemento com o id 'destino' e a armazena na variável destino.
  var destino = document.getElementById('destino')

  // Essa linha define o conteúdo HTML do elemento destino, substituindo-o por uma opção inicial '--selecione'. Assim toda vez que a categoria for escolhida novamente ele vai resetar o destino, Assim como p origem.
  destino.innerHTML = '<option>--selecione</option>'
  origem.innerHTML = '' 
  
  // Essa linha cria um novo elemento de opção para ser adicionado ao elemento origem.
  var option = document.createElement('option')

  // Essa linha define o texto do elemento de opção como "--selecione".
  option.textContent = "--selecione"

  // Essa linha define o atributo "disabled" como "true" para desativar a opção "--selecione".
  option.setAttribute("disabled", "true")

  // Essa linha define o atributo "selected" como "true" para selecionar a opção "--selecione" por padrão.
  option.setAttribute("selected", "true")

  // Essa linha adiciona o elemento de opção criado anteriormente ao elemento origem.
  origem.appendChild(option)

  //Utiliza um loop for para iterar sobre as unidades disponíveis na variável unidades e popular os option.
  for (let i = 0; i < unidades.length; i++) {

     // Cria um novo elemento de opção para cada unidade.
      var option = document.createElement('option')

      // Define o texto do elemento de opção como a unidade atual.
      option.textContent = unidades[i] 

      // Adiciona o elemento de opção ao elemento origem.
      origem.appendChild(option)
  }
}

// a função atualizarDestino() atualiza as opções disponíveis no elemento destino com base na categoria selecionada no elemento categorias e na unidade selecionada no elemento origem. 
function atualizarDestino(){

  // Essa linha obtém o valor selecionado no elemento com o id 'categorias' e o armazena na variável categoria.
  var categoria = document.getElementById('categorias').value

  // Essa linha obtém as unidades correspondentes à categoria selecionada da variável convercao.unidades e as armazena na variável unidades.
  var unidades = convercao.unidades[categoria]

  // Essa linha obtém a referência ao elemento com o id 'destino' e a armazena na variável destino.
  var destino = document.getElementById('destino')

  // Essa linha limpa o conteúdo HTML do elemento destino.
  destino.innerHTML = ''

  // O próximo trecho de código utiliza um loop for para iterar sobre as unidades disponíveis na variável unidades.
  for (let i = 0; i < unidades.length; i++){

      // Esta linha verifica se a unidade atual não é igual à unidade selecionada no elemento com o id 'origem'. Isso evita que a unidade de origem seja repetida na lista de unidades de destino.
      if(unidades[i] != document.getElementById('origem').value){

        // Essa linha cria um novo elemento de opção para ser adicionado ao elemento destino.
        option = document.createElement('option')

        // Essa linha define o texto do elemento de opção como a unidade atual.
        option.textContent = unidades[i] 

        // Essa linha adiciona o elemento de opção criado anteriormente ao elemento destino.
        destino.appendChild(option)
    }
  }
}

// a função converter(event) é acionada quando ocorre o evento de conversão. Ela obtém os valores selecionados nos elementos do formulário, realiza os cálculos de conversão de acordo com a categoria selecionada e exibe o resultado no elemento resultadoConversao.
function converter(event){

  // Essa linha evita que o comportamento padrão do evento seja executado. No caso, previne o envio do formulário quando o evento de conversão for acionado.
  event.preventDefault()

  // Essa linha obtém o valor selecionado no elemento com o id 'categorias' e o armazena na variável categoria.
  var categoria = document.getElementById('categorias').value

  // Essa linha obtém o valor selecionado no elemento com o id 'origem' e o armazena na variável origem.
  var origem = document.getElementById('origem').value

  // Essa linha obtém o valor selecionado no elemento com o id 'destino' e o armazena na variável destino.
  var destino = document.getElementById('destino').value

  // Essa linha obtém o valor numérico inserido no elemento com o id 'valor' e o converte para um número inteiro utilizando a função parseInt(). O valor é armazenado na variável valor.
  var valor = parseInt(document.getElementById('valor').value)

  //Essa linha verifica se o valor que estamos recebendo é realmente um number, com a logica de que qualquer coisa diferente de number ele retorna um alert.
  if (!valor) {
    alert("Preencha o campo 'Valor' antes de converter.");
    return;
  }

  // Essa linha declara a variável resultado sem atribuir um valor a ela no momento.
  var resultado 

  // O próximo trecho de código verifica se todas as seleções de categoria, origem e destino foram feitas corretamente. Se alguma delas for igual a '--selecione', a execução é interrompida e exibe um alerta solicitando a seleção de todos os campos.
  if(categoria != '--selecione' && origem != '--selecione' && destino != '--selecione'){

    // Dentro do bloco switch, com base na categoria selecionada, são realizados os cálculos de conversão de acordo com as unidades de origem e destino.
    switch (categoria) {

        // Este é o caso em que a categoria selecionada é 'comprimento'. Ele executa o seguinte código:
        case 'comprimento':
  
        // Calcula o valor convertido para metros dividindo o valor inserido pelo fator de conversão correspondente à unidade de origem.
          var valorEmMetros = valor / convercao.fatores.comprimento[origem]

          // Calcula o valor convertido para a unidade de destino multiplicando o valor em metros pelo fator de conversão correspondente à unidade de destino.
          resultado = valorEmMetros * convercao.fatores.comprimento[destino]
  
          // Encerra o bloco case 'comprimento'.
          break
  
        // Este é o caso em que a categoria selecionada é 'peso'. Ele executa a mesma lógica usada em comprimento só que aqui ele utiliza das unidades da categoria peso.
        case 'peso':
  
          var valorEmGramas = valor / convercao.fatores.peso[origem]
          resultado = valorEmGramas * convercao.fatores.peso[destino]
          
          break
  
        // Este é o caso em que a categoria selecionada é 'temperatura'. Ele executa o seguinte código:
        case 'temperatura':

        // Chama a função de conversão apropriada da tabela convercao.fatores.temperatura passando o valor inserido como argumento. O resultado é atribuído à variável resultado.
          resultado = convercao.fatores.temperatura[origem][destino](valor)

          // Em seguida, há uma série de condicionais if...else if para verificar a unidade de destino e formatar o resultado de acordo.
          if(destino == 'celsius'){
            resultado = `${resultado.toFixed(1)}°C`
          } else if(destino == 'fahrenheit'){
            resultado = `${resultado.toFixed(1)}°F`
          } else if(destino == 'kelvin'){
            resultado = `${resultado.toFixed(1)}°k`
          }
          break

        default: 
    
    }
  
    // Essa linha obtém a referência ao elemento com o id 'resultadoConversao' e a armazena na variável resultadoConversao.
    var resultadoConversao = document.getElementById('resultadoConversao')

    // Essa linha define o valor do elemento resultadoConversao como o valor convertido armazenado na variável resultado.
    resultadoConversao.value = `${resultado}`
  } else {

      // Caso alguma das seleções esteja incompleta, é exibido um alerta solicitando que todos os campos sejam selecionados.
      alert("selecione todos os campos!!!")
  }

}

// Resumindo, o código define eventos e ouvintes para os elementos HTML
// Esta linha de código busca o elemento HTML com o id "botao" e o atribui à variável botao.
var botao = document.getElementById("botao")

// A função addEventListener é usada para adicionar um evento de clique ao botão. Quando o botão é clicado, a função converter será executada.
botao.addEventListener('click', converter)

// A função addEventListener é usada novamente, desta vez para adicionar um evento de mudança ao elemento com o id "categorias". Quando ocorre uma mudança na opção selecionada no elemento "categorias", a função atualizarOrigem será chamada.
categorias.addEventListener('change', atualizarOrigem)

// Mais uma vez, a função addEventListener é usada para adicionar um evento de mudança ao elemento com o id "origem". Quando ocorre uma mudança na opção selecionada no elemento "origem", a função atualizarDestino será chamada.
origem.addEventListener('change', atualizarDestino)

// Esta linha de código chama a função atualizarCategorias para inicializar as categorias no momento do carregamento da página. Essa função é responsável por preencher as opções no elemento "categorias" com base nos dados disponíveis.
atualizarCategorias()