
function obtenerValorCampo(campo){
    $(campo).css('border-color', 'black');
        texto = $(campo).val();
        valor = parseFloat(texto);
        if(!Number.isNaN(valor))
            if(valor > 0)
                return parseFloat(valor);
        alert("El número ingresado no es válido o es menor a 0");
        $(campo).css('border-color', 'red'); //si el número es NaN pinta de rojo el cuadro
        return -1;
}

function calcularAbono( ){
    //Obtener valores
    monto = obtenerValorCampo("#inpMonto")
    tasa = obtenerValorCampo("#inpTasa");
    pagos = obtenerValorCampo("#inpCantPagos");

    abono = (monto * tasa)/( 1 - (1 + tasa )**( -pagos));
    abono = abono.toFixed(3);
    //console.log(abono)
    $("#inpAbono").text(abono);
    calcularTablaAmortizacion(monto ,tasa ,pagos ,abono);
}


function anadirFilasTabla(periodo,amortizacion,intereses,abono,saldoInsoluto){
    var fila = "<tr> <td> $"+periodo+"</td> <td> $"+amortizacion+"</td> <td> $"+intereses+"</td> <td> $"+abono+"</td> <td> $"+saldoInsoluto+"</td> </tr>";
    $("#tblAmortizacion").append(fila);
}

function calcularTablaAmortizacion(monto ,tasa ,pagos ,abono){
    //agregar primera fila a la matriz 0 0 0 0 saldo insoluto
    periodo = 0;
    amortizacion = 0;
    intereses = 0;
    saldoInsoluto = monto;
    anadirFilasTabla(periodo,amortizacion,intereses,0,saldoInsoluto);
    //calcular valores
    for(i = 1; i <= pagos; i++){
        periodo = i;

        intereses = tasa*saldoInsoluto;
        intereses = intereses.toFixed(3); //aproxima 3 decimales

        amortizacion = abono - intereses;
        amortizacion = amortizacion.toFixed(3);

        saldoInsoluto = saldoInsoluto - amortizacion;
        saldoInsoluto = saldoInsoluto.toFixed(3);

        anadirFilasTabla(periodo,amortizacion,intereses,abono,saldoInsoluto)
    }


}
