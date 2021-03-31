function calcularAbonoCap( ){
    monto = obtenerValorCampo("#inpMonto")
    tasa = obtenerValorCampo("#inpTasaEfectiva");
    pagos = obtenerValorCampo("#inpCantPagos");

    abono = (monto * tasa)/(( (1 + tasa )**( pagos) - 1)* (1 + tasa));;
    abono = abono.toFixed(2);
    //console.log(abono)
    
    $("#tblAmortizacion").empty();
    $("#inpAbono").val(abono);
    calcularTablaCapitalizacion(monto ,tasa ,pagos ,abono);
}



function calcularTablaCapitalizacion(monto ,tasa ,pagos ,abono){
    //agregar primera fila a la matriz 0 0 0 0 monto ganado
    periodo = 1;
    amortizacion = abono;
    intereses = parseFloat(amortizacion*tasa).toFixed(2);
    saldoInsoluto = parseFloat(amortizacion) + parseFloat(intereses);
    saldoInsoluto = parseFloat(saldoInsoluto).toFixed(2);
    anadirFilasTabla(periodo,amortizacion,intereses,abono,saldoInsoluto);

    //calcular valores
    for(i = 2; i <= pagos; i++){
        periodo = i; 
        amortizacion = parseFloat(abono) + parseFloat(saldoInsoluto);
        
        intereses = amortizacion*tasa;
        
        saldoInsoluto = parseFloat(amortizacion) + parseFloat(intereses);
        
        intereses = intereses.toFixed(2); //aproxima 3 decimales
        saldoInsoluto = saldoInsoluto.toFixed(2);
        amortizacion = parseFloat(amortizacion).toFixed(2);
        
        anadirFilasTabla(periodo,amortizacion,intereses,abono,saldoInsoluto)
    }


}
