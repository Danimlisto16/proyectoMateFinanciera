
function obtenerValorCampo(campo){
    $(campo).css('border-color', 'black');
        texto = $(campo).val();
        valor = parseFloat(texto);
        if(!Number.isNaN(valor))
            if(valor > 0)
                return parseFloat(valor);
        //alert("El número ingresado no es válido o es menor a 0");
        $(campo).css('border-color', 'red'); //si el número es NaN pinta de rojo el cuadro
        return -1;
}


function validarCampo(campo){
    valor = obtenerValorCampo(campo);
}

function convertirTasa(){
    tasa = obtenerValorCampo("#inpTasa")
    if( tasa != -1 ){
        if(tasa > 0 && tasa <= 1 ){
            
            tasaEfectiva = tasa/12;
            tasaEfectiva = tasaEfectiva.toFixed(3)
            $("#inpTasaEfectiva").val(tasaEfectiva);
        }else{
            $("#inpTasa").css('border-color', 'red'); //si el número es NaN pinta de rojo el cuadro
        }
    }else{
        $("#inpTasaEfectiva").val(0);
    }
}


function mostrarAbono(){

}



function calcularAbono( ){
    //Obtener valores
    monto = obtenerValorCampo("#inpMonto");
    tasa = obtenerValorCampo("#inpTasaEfectiva");
    pagos = obtenerValorCampo("#inpCantPagos");

    if(monto != -1 && tasa != -1 && pagos != -1){
        if ($("#tipo_tabla2").is(':checked')) {
            abono = (monto * tasa)/( 1 - (1 + tasa )**( -pagos));
            abono = abono.toFixed(3);
            //console.log(abono)
            $("#tblAmortizacion").empty();
            $("#inpAbono").val(abono);
            $("#lblSaldoMonto").text("Monto");
            calcularTablaAmortizacion(monto ,tasa ,pagos ,abono);    
            
        }else 
            if($("#tipo_tabla1").is(':checked')){
                $("#lblSaldoMonto").text("Saldo insoluto");
                calcularAbonoCap( );
            }
    }else{
        alert("Por favor corrige los datos marcados en rojo antes de calcular");
        $("#tblAmortizacion").empty(); //limpiar tabla
    } 
}


function anadirFilasTabla(periodo,amortizacion,intereses,abono,saldoInsoluto){
    //intereses = intereses.toFixed(3); //aproxima 3 decimales
    //amortizacion = amortizacion.toFixed(3);
    //saldoInsoluto = saldoInsoluto.toFixed(3);
    var fila = "<tr> <td> "+periodo+"</td> <td> $"+amortizacion+"</td> <td> $"+intereses+"</td> <td> $"+abono+"</td> <td> $"+saldoInsoluto+"</td> </tr>";
    $("#tblAmortizacion").append(fila);
}

function limpiarDatos(campo){
    texto = $(campo).val("");
}

function limparTodo(){
    limpiarDatos("#inpMonto");
    $("#inpMonto").css('border-color', 'black');

    limpiarDatos("#inpTasa");
    $("#inpTasa").css('border-color', 'black');

    limpiarDatos("#inpTasaEfectiva");
    //$("#inpTasaEfectiva").css('border-color', 'black');

    limpiarDatos("#inpAbono");
    $("#inpAbono").css('border-color', 'black');

    limpiarDatos("#inpCantPagos");
    $("#inpCantPagos").css('border-color', 'black');
    //limpiarDatos("#lblAbono");
    $("#tblAmortizacion").empty(); //limpiar tabla
}

function calcularTablaAmortizacion(monto ,tasa ,pagos ,abono){
    //agregar primera fila a la matriz 0 0 0 0 saldo insoluto
    var cantidadFilas = $("#tblAmortizacion > tr").length;
    if(cantidadFilas == 0){
        periodo = 0;
        amortizacion = 0;
        intereses = 0;
        saldoInsoluto = monto;
        anadirFilasTabla(periodo,amortizacion,intereses,0,saldoInsoluto);
        //calcular valores
        for(i = 1; i <= pagos; i++){
            periodo = i;
            intereses = tasa*saldoInsoluto;           
            amortizacion = abono - intereses;            
            saldoInsoluto = saldoInsoluto - amortizacion; 

            intereses = intereses.toFixed(3); //aproxima 3 decimales
            saldoInsoluto = saldoInsoluto.toFixed(3);
            amortizacion = amortizacion.toFixed(3);  

            anadirFilasTabla(periodo,amortizacion,intereses,abono,saldoInsoluto);
        }
            
    }else{
        alert("La tabla contiene valores, limpia la tabla para un nuevo cálculo");
    }
    
    


}
