
    let unidades = ["cero", "uno", "dos" ,"tres" ,"cuatro" ,"cinco" ,
    "seis" ,"siete" ,"ocho" ,"nueve"];
    let especiales = ["diez","once", "doce","trece","catorce", "quince", 
    "diezciseis", "diecisiete", "dieciocho", "diecinueve"];
    let decenas = ["veinte", "treinta","cuarenta","cincuenta", "sesenta",
    "setenta", "ochenta", "noventa"];
    let centenas = ["ciento", "docientos","trecientos","cuatrocientos", "quinientos",
    "seicientos", "setecientos", "ochocientos", "novecientos"];
    let mmillon = ["millòn","billón", "trillón","cuatrillón","quintillón","sextillón","septillón",
    "octillón","nonillón", "decillón", "undecillón", "duodecillón", "tredecillón", "cuatordecillón", 
    "quindecillón", "sexdecillón", "septendecillón", "octodecillón", "novendecillón", "vigintillón"];
    let mmillones = ["millones", "billones", "trillones","cuatrillones","quintillones","sextillones","septillones",
    "octillones","nonillones", "decillones", "undecillones", "duodecillones", "tredecillones", "cuatordecillones", 
    "quindecillones", "sexdecillones", "septendecillones", "octodecillones", "novendecillones", "vigintillones"];
    //
    

    function udc(num) {
        let unid = num % 10;
        num = num/10;
        let dec = num%10;
        num = num/10;
        let cent = num%10;
        let um = num/10;
        return {
            unid:parseInt(unid),
            dec:parseInt(dec),
            cent:parseInt(cent),
            um:parseInt(um)
        }
    }    

    
    function convertUnidad(unid) {
        let response;
        response = unidades[unid];
        return response;
    }

    function convertDecena(dec,unid,millones=false) {
        let response;
        if(unid == 0){
            response = decenas[dec-2];                
        }else{
            if (dec>=3 ) {
                if (millones && unid==1) {
                    response = decenas[dec-2]+ "y un";
                }else{
                    response = decenas[dec-2]+ " y " + unidades[unid];
                }
            }else{
                
                if (millones && unid==1) {
                    response = "veintiún";
                }else{
                    response = "veinti" + unidades[unid];
                }
            }
            
        }
        return response;
    }
    
    function convertCentena(num,millones=false) {
        
        num =parseInt(num)
        let response = '';
        const {unid,dec,cent} = udc(num);

        if(num>=0 && num<10)
            response = convertUnidad(num);         
        else if(num<20)
                response = especiales[num-10];        
        else if(num<100){
            response = convertDecena(dec,unid,millones)
        }else {
        
            if (num == 100) {
                    response = 'cien';
            }else if(num %100 == 0) {
                    response = centenas[cent-1];
            }else{
                if (dec==0) {
                    response = centenas[cent-1]+ ' '+ convertUnidad(unid);
                }else if(dec==1){ 
                    response = centenas[cent-1]+ ' '+ especiales[unid];
                }else{
                    response = centenas[cent-1]+ ' '+ convertDecena(dec,unid,millones);
                }
                
            }
        }     
        
        return response;
    }

    
  
    function convertStringToVector(a) {
        
        var entrada = a.split('').reverse();
        var salida = [];
        var aux = '';
        
        var paginador = Math.ceil(entrada.length / 3);
    
        for(let i = 0; i < paginador; i++) {
            for(let j = 0; j < 3; j++) {
        
                if(entrada[j + (i*3)] != undefined) {
                    aux += entrada[j + (i*3)];
                }
            }
            salida.push(aux);
            aux = '';
        
        
        }
    return (salida.join('.').split("").reverse().join('').split('.'))
  
    }

    function numberToWords(number){
        
        let vector = convertStringToVector(number);
       
        let resul = '';   
            switch (vector.length) {
                case 1:
                    resul = (convertCentena(number))
                break;
                case 2:
                    //UM validations
                    if (vector[1]==="000") {
                        if (parseInt(vector[0])==1) {
                                resul = (' mil ');
                        }else{
                                resul = (convertCentena(vector[0])+ ' mil ');
                        }
                    
                    }else{
                        if (parseInt(vector[0])==1) {
                            resul = (' mil '+ convertCentena(vector[1]))
                        }else{
                            resul = (convertCentena(vector[0])+ ' mil '+ convertCentena(vector[1]))
                        }
                    }
                    
                break;
        
            default:
                let complete = [];
                vector.reverse();
            
                for(let i = 0; i < vector.length; i++) {
                    for (let j = i+1; j < i+2; j++) {
                        
                         if (i%2 == 1) {
                            if (parseInt(vector[i])==1) {
                                complete.unshift(' mil ')
                            }else if (parseInt(vector[i])>1){
                                complete.unshift(convertCentena(vector[i],true)+' mil ') 
                            }
                             
                         }else{
                             if (i==0 && parseInt(vector[i])!=0) {
                                 complete.unshift(convertCentena(vector[i]))
                             }else{
                                
                                 if (parseInt(vector[i])==1) {
                                     complete.unshift('un '+ mmillon[(i/2)-1])
                                 }else if (parseInt(vector[i])>1){
                                     complete.unshift(convertCentena(vector[i],true)+' '+ mmillones[(i/2)-1])
                                 }else if (parseInt(vector[i])==0 && parseInt(vector[j])!=0) {
                                         complete.unshift(mmillones[(i/2)-1]) 
                                 }
                                 
                             }
                         }
                    }
                }
                
                resul = (complete.toString().replace(',',' '))
                break;
            }
        return resul;
    }

    function number_to_words(number) {
        
        if (parseFloat(number) <= Math.pow(10, 120)) {
        
            number = number.split('.')
            if (number.length > 1) {
                return numberToWords(number[0]) + ' con  ' + numberToWords(number[1])   
            }else{
                return numberToWords(number[0])   
            }
        
            
        }else{
            return 'Numero supera a 10^120'
        }
    }

                   
    export default number_to_words;
 




    
