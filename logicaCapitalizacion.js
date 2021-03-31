function calcularAbonoCap( ){
    monto = obtenerValorCampo("#inpMonto")
    tasa = obtenerValorCampo("#inpTasaEfectiva");
    pagos = obtenerValorCampo("#inpCantPagos");

    abono = (monto * tasa)/( (1 + tasa )**( pagos) - 1)*(1+tasa);
    abono = abono.toFixed(3);
    //console.log(abono)
    
    $("#tblAmortizacion").empty();
    $("#inpAbono").val(abono);
    calcularTablaCapitalizacion(monto ,tasa ,pagos ,abono);
}



function calcularTablaCapitalizacion(monto ,tasa ,pagos ,abono){
    //agregar primera fila a la matriz 0 0 0 0 monto ganado
    periodo = 1;
    amortizacion = abono;
    intereses = amortizacion*tasa;
    saldoInsoluto = amortizacion + intereses;
    anadirFilasTabla(periodo,amortizacion,intereses,abono,saldoInsoluto);

    //calcular valores
    for(i = 2; i <= pagos; i++){
        periodo = i; 
        amortizacion = saldoInsoluto + abono;
        
        intereses = tasa * amortizacion;
        
        saldoInsoluto = parseFloat(amortizacion) + parseFloat(intereses);
        
        intereses = intereses.toFixed(3); //aproxima 3 decimales
        saldoInsoluto = saldoInsoluto.toFixed(3);
        amortizacion = parseFloat(amortizacion).toFixed(3);
        
        anadirFilasTabla(periodo,amortizacion,intereses,abono,saldoInsoluto)
    }


}
