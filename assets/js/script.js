/* CALCULADORA */

/* Variables */  //x ej:
let primerValor;     // 2
let operacion;       // +
let segundoValor;    // 3
//           resultado: 5
let finished = false;

/* Funciones para modificar temporalmente #resultado */
function agregarNum(n) {
  if (finished) {
    borrarTodo();
    finished = false;
  }
  let valorParcial = document.getElementById('resultado').innerHTML;
  if (valorParcial === '0') {
    valorParcial = n;
  } else if (valorParcial.length < 14) {
    valorParcial += n;
  }
  document.getElementById('resultado').innerHTML = valorParcial;
}

/* Funciones para guardar valor */
function guardarValor(signo) {
  finished = false;
  primerValor = +(document.getElementById('resultado').innerHTML);
  operacion = signo;
  document.getElementById('parcial').innerHTML = primerValor + " " + operacion;  
  document.getElementById('resultado').innerHTML = '0';
}

function guardarSegValor() {
  segundoValor = +(document.getElementById('resultado').innerHTML);
  document.getElementById('parcial').innerHTML = (primerValor + " " + operacion + " " + segundoValor + " =");
}

/* Funciones para redondear correctamente resultado */
Number.prototype.round = function(n) {
  const d = Math.pow(10, n);
  return Math.round((this + Number.EPSILON) * d) / d;
}

function countComa(s) {
  let newArray = s.split('.');
  return newArray[0].length;
}


/* Funcion para calcular resultado */
function calcular() {
  guardarSegValor();
  let resultado;
  if (operacion === '+') {
    resultado = primerValor + segundoValor;
  } else if (operacion === '-') {
    resultado = primerValor - segundoValor;
  } else if (operacion === '*') {
    resultado = primerValor * segundoValor;
  } else if (operacion === '/') {
    if (segundoValor !== 0) {
      resultado = primerValor / segundoValor;
    } else {
      document.getElementById('resultado').innerHTML = 'No se puede dividir por 0'
    }
  };
  if (resultado) {
    finished = true;
    const reString = resultado.toString();
    if(reString.length > 14) {
      resultado = resultado.round(14-(countComa(reString)));
    }
    document.getElementById('resultado').innerHTML = resultado;
  }
}

/* Funciones para borrar números */
function borrarParteInf() {
  document.getElementById('resultado').innerHTML = '0';
}

function borrarTodo() {
  document.getElementById('parcial').innerHTML = '';
  borrarParteInf();
}