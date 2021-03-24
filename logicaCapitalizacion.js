function calcularAbonoCap( ){
    monto = obtenerValorCampo("#inpMonto")
    tasa = obtenerValorCampo("#inpTasa");
    pagos = obtenerValorCampo("#inpCantPagos");

    abono = (monto * tasa)/( (1 + tasa )**( pagos) - 1);
    abono = abono.toFixed(3);
    //console.log(abono)
    $("#inpAbono").text(abono);
    $("#tblAmortizacion").empty();
    calcularTablaCapitalizacion(monto ,tasa ,pagos ,abono);
}


function calcularTablaCapitalizacion(monto ,tasa ,pagos ,abono){
    //agregar primera fila a la matriz 0 0 0 0 monto ganado
    periodo = 1;
    amortizacion = 0;
    intereses = 0;
    saldoInsoluto = abono;
    anadirFilasTabla(periodo,amortizacion,intereses,abono,saldoInsoluto);

    //calcular valores
    for(i = 2; i <= pagos; i++){
        periodo = i; 
        amortizacion = saldoInsoluto;
        amortizacion = parseFloat(amortizacion).toFixed(3);
        intereses = tasa*amortizacion;
        
        saldoInsoluto = parseFloat(amortizacion) + parseFloat(intereses) + parseFloat(abono);
        intereses = intereses.toFixed(3); //aproxima 3 decimales
        saldoInsoluto = saldoInsoluto.toFixed(3);
        
        anadirFilasTabla(periodo,amortizacion,intereses,abono,saldoInsoluto)
    }


}
