import * as yup from 'yup';

export default function validateRut(ref, msg) {
  return yup.string().test({
    name: 'validateRut',
    exclusive: false,
    message: msg || '${reference}-${path} inválido',
    params: {
      reference: ref.path,
    },
    test: function(value) {
      var dv = this.resolve(ref);
      var rut = value;
      if(rut === undefined || dv === undefined){
        return true
      }
      var n = rut.length;
      var mult_1 = 2;
      var mult_2 = 2;
      var verificador = 0;
      if(n < 7){
        return false;
      }
      for(var i = 1; i < 7; i++){ //ojo con condición
        verificador+= parseInt(rut.charAt(n-i))*mult_1;
        mult_1+=1;
    
      }
      for(var j = 7; j < n+1; j++){
        verificador+= parseInt(rut.charAt(n-j))*mult_2;
        mult_2+=1;
      }
      var verificador_adapt = Math.trunc(verificador/11)*11;
      var resultado = verificador-verificador_adapt;
      var digito = 11 - resultado;
      var final  = 0;
      if(digito === 11 ){
        final = 0
      } else if (digito === 10){
        final = 'K'
      } else {
        final = digito;
      }
      
      if (String(final) === dv.toUpperCase()){
        return true; 
      }
      return false;
    },
  });
}