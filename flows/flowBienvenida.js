

import pkg from '@bot-whatsapp/bot';
const { createBot, createProvider, createFlow , addKeyword} = pkg;

//import { addKeyword } from '@bot-whatsapp/bot';
import flowpedido from './flowpedido.js';
//import flowreservarmesa from './flowreservarmesa';
//import flowsugerencia from './flowsugerencia';
//import flowPreguntas from './flowPreguntas';





const opcionesMenu = async(opciones) =>{
   // console.log('opciones ', opciones)
    if(opciones=== '1'){
     return 1 ;
    }
    else if(opciones=== '2'){
        return 2 ; 
    }
    else if(opciones === '3' ){
        return 3
    }
    else if(opciones === '4' ){
        return 4
    }
    else {
        return 0 
    }
}

const flowBienvenida = addKeyword(['hola','menu', 'buenas', 'alo'])
.addAnswer(['Hola mi nombre es *parador bot* 🔩 soy el agente',
            'de servicio al cliente automatizado'
])

.addAnswer(['*1)* Gestionar pedidos 📝',
'*2)* Reservacion de mesa ☎',
'*3)* Preguntas Frecuentes ❓',
'*4)* Sugerencias y recomendaciones 📬'
            
],null , null , [flowpedido] )


export default flowBienvenida;


/*
.addAnswer(['*1)* Gestionar pedidos 📝',
'*2)* Reservacion de mesa ☎',
'*3)* Preguntas Frecuentes ❓',
'*4)* Sugerencias y recomendaciones 📬'
            
],
{capture : true}
 , async(ctx , {gotoFlow} ) => {
   const respuesta = await opcionesMenu(ctx.body)
  // console.log('respuesta', respuesta)


    if (respuesta === 1) {
        gotoFlow(flowpedido)
    }
   
    else if (respuesta === 2) {
        gotoFlow(flowreservarmesa)
    }
    else if (respuesta === 3) {
        gotoFlow(flowPreguntas)
    }
    else if (respuesta === 4) {
        gotoFlow(flowsugerencia)
    }
    else if (respuesta === 0) {
        gotoFlow(flowpedido)
    }
}
, [flowpedido] )
*/
