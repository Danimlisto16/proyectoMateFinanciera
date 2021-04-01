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
    total=parseFloat(abono);
    
    periodo = 1;
    capitalizacion = abono;
    intereses = parseFloat(capitalizacion*tasa).toFixed(2);
    total_intereses=parseFloat(intereses);
    saldoInsoluto = parseFloat(capitalizacion) + parseFloat(intereses);
    saldoInsoluto = parseFloat(saldoInsoluto).toFixed(2);
    anadirFilasTabla(periodo,capitalizacion,intereses,abono,saldoInsoluto);

    //calcular valores
    for(i = 2; i <= pagos; i++){
        periodo = i; 
        capitalizacion = parseFloat(abono) + parseFloat(saldoInsoluto);
        
        intereses = capitalizacion*tasa;
        
        saldoInsoluto = parseFloat(capitalizacion) + parseFloat(intereses);
        
        intereses = intereses.toFixed(2); //aproxima 3 decimales
        saldoInsoluto = saldoInsoluto.toFixed(2);
        capitalizacion = parseFloat(capitalizacion).toFixed(2);
        total+=parseFloat(abono);
        total_intereses+=parseFloat(intereses);
        anadirFilasTabla(periodo,capitalizacion,intereses,abono,saldoInsoluto)
    }

    var fila = "<tr> <td> <strong>Total</strong> </td> <td> </td> <td><strong> $"+total_intereses.toFixed(2)+" </strong> </td> <td> <strong> $"+total.toFixed(2)+" </strong> </td> <td> </td> </tr>";
    $("#tblAmortizacion").append(fila);


}
