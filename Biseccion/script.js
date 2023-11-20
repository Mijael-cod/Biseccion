function calcularRaiz() {
    // Obtener la función desde el campo de entrada
    const funcionInput = document.getElementById('function').value;
    const xiInput = document.getElementById('xi').value;
    const xsInput = document.getElementById('xs').value;
    const errorInput = document.getElementById('error').value;

    // Verificar si algún campo está vacío
    if (!funcionInput || !xiInput || !xsInput || !errorInput) {
        document.getElementById('resultado').innerHTML = '<p class="text-danger">¡Debe ingresar todos los datos!</p>';
        return;
    }

    const funcionParseada = parseFunction(funcionInput);
    const poli = new Function('x', `return ${funcionParseada};`);

    // Resto de la función...
    let xi = parseFloat(xiInput);
    let xs = parseFloat(xsInput);
    let error = parseFloat(errorInput);

    let tabla = [];
    let tramo = xs - xi;

    let fxi = poli(xi);
    let fxs = poli(xs);
    let i = 1;

    // Construir la tabla
    let resultadoHTML = '<div class="table-responsive">';
    resultadoHTML += '<table class="table table-bordered table-striped">';
    resultadoHTML += '<thead><tr><th>i</th><th>xi</th><th>xs</th><th>xa</th><th>f(xi)</th><th>f(xa)</th><th>f(xs)</th><th>tramo</th></tr></thead>';
    resultadoHTML += '<tbody>';

    while (tramo > error) {
        let xa = (xi + xs) / 2;
        let fxa = poli(xa);
        tabla.push([i, xi.toFixed(4), xs.toFixed(4), xa.toFixed(4), fxi.toFixed(4), fxa.toFixed(4), fxs.toFixed(4), tramo.toFixed(4)]);
        i++;

        let cambia = Math.sign(fxi) * Math.sign(fxa);
        if (cambia < 0) {
            xs = xa;
            fxs = fxa;
        } else {
            xi = xa;
            fxi = fxa;
        }
        tramo = xs - xi;
    }

    let raiz = (xi + xs) / 2;

    // Construir la tabla HTML
    let n = tabla.length;
    for (let i = 0; i < n; i++) {
        let fila = tabla[i];
        resultadoHTML += '<tr>';
        for (let j = 0; j < fila.length; j++) {
            resultadoHTML += `<td>${fila[j]}</td>`;
        }
        resultadoHTML += '</tr>';
    }

    resultadoHTML += '</tbody></table>';
    resultadoHTML += `<p>Raíz: ${raiz.toFixed(12)}</p></div>`;

    // Mostrar la tabla en el elemento con ID 'resultado'
    document.getElementById('resultado').innerHTML = resultadoHTML;
}


function parseFunction(input) {
    // Reemplazar ^ con Math.pow
    input = input.replace(/\^/g, '**');

    // Reemplazar expresiones como x^2 con Math.pow(x, 2)
    input = input.replace(/(\d*)x\^(\d*)/g, 'Math.pow(x, $2)');

    // Reemplazar expresiones como 2x con 2*x
    input = input.replace(/(\d+)x/g, '$1*x');

    // Agregar Math. a funciones matemáticas que puedan estar presentes
    input = input.replace(/sin\(/g, 'Math.sin(');
    input = input.replace(/cos\(/g, 'Math.cos(');
    input = input.replace(/tan\(/g, 'Math.tan(');
    input = input.replace(/sqrt\(/g, 'Math.sqrt(');
    input = input.replace(/exp\(/g, 'Math.exp(');
    input = input.replace(/log\(/g, 'Math.log(');

    return input;
}

function limpiarCeldas() {
    // Limpiar el contenido de las celdas del formulario
    document.getElementById('function').value = '';
    document.getElementById('xi').value = '';
    document.getElementById('xs').value = '';
    document.getElementById('error').value = '';
    document.getElementById('resultado').innerHTML = '';
}