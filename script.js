

function mostrarDivs() {
  var select = document.getElementById("selectMedida");
  var selectedOption = select.options[select.selectedIndex].value;
  console.log(selectedOption)
  var medida = document.getElementsByClassName("medida");
  for (var i = 0; i < medida.length; i++) {
    if (medida[i].id === selectedOption) {
      medida[i].style.display = "block";
    } else {
      medida[i].style.display = "none";
    }
  }
}