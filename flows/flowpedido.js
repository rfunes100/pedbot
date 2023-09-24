

import pkg from '@bot-whatsapp/bot';
const { createBot, createProvider, createFlow , addKeyword} = pkg;
import  GoogleSheetService   from '../service/hoja.js'
import dotenv from 'dotenv';


dotenv.config();


const IDSPREEDSHEET = process.env.IDSPREEDSHEET;
//console.log('IDSPREEDSHEET',IDSPREEDSHEET)


const googelSheet = new GoogleSheetService(
    IDSPREEDSHEET // "1oS-8d-Hwmszi4Z_3jAmQNGbNwY1QUgIcLvV-2MtBoBA"
  );




// clave de api
// AIzaSyBN6XkKgVg8Q-bJGhJeJPD_Uwfg-B4-NBY


// id cliente oauth
// 861551596000-u752bhhklttmbdamtjcd4mkgi02qf97d.apps.googleusercontent.com
// secreto del cliente oauth
// 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


let encapedido = {}
let encadetalle = []
let encadata = ''
let usuario = {}
let PRODUCTO_PRESELECCIONADO = [];
let GLOBAL_STATEPRODUCTO = [];
let GLOBAL_PRODUCTOSELECCIONADO = [];

let GLOBAL_STATE = [];




const flowconrnt = addKeyword(['1','2']) 
.addAnswer(['Ingrese su RNT por favor sin guiones ni espacios',
            'si no desea agregar rtn escriba na',
            
]
,{capture : true}  
, async(ctx , {gotoFlow , flowDynamic,  state  } ) => {
 //   encapedido[ctx.from]. aceptartn= ctx.body
    state.update({numerortn:ctx.body})

   // console.log(ctx.body, 'ingreso a factura rtn')
    const currentState = state.getMyState();
//console.log(currentState)
let fecha = new Date()
 let nopedido =  fecha.getFullYear().toString()+ '-'+
 fecha.getMonth().toString()+ '-' + fecha.getDate().toString()+'-'+ fecha.getHours().toString()+'-'
 +fecha.getMinutes()+ fecha.getSeconds()

 
   
      
     await  flowDynamic([`Se agregó el pedido exitosamente orden # *${nopedido.toString()}*` ])
    // console.log('encadetalle.toString()',encadetalle)

    
      
        let total = 0 
        const concatenatedMessageb = encadetalle.map( (producto, index) => {
         //   console.log('producto', producto);
            

            if ((index + 1) % 4 === 0) {
                total += parseFloat(producto)
                return 'LPS '+ producto + '\n';
              } else {
                return producto;
              }
           
          }).join(' ');

     
          const encadata = encadetalle.map( (producto, index) => {
               console.log('producto', producto);
               
   
               if ((index + 1) % 4 === 0) {
                   
                   return  producto + ','+ nopedido.toString() +'_';
                 } else {
                   return producto;
                 }
              
             }).join(',');

   
       // console.log('encadata',encadata)
      //  console.log(concatenatedMessage.toString())

     await flowDynamic([,` resumen de su pedido \n  ${concatenatedMessageb.toString()} *Total A Pagar LPS*: *${total.toString()}*`  ])


     await googelSheet.saveOrder({
        fecha: new Date(),//.now(),//.toLocaleDateString(),//.toDateString(),
        telefonorecbe: currentState.telefonorecbe,
        telefono: ctx.from,
        pedido: nopedido,
        local: currentState.local,
        tipoentrega:currentState.tipoentrega,
        horario: currentState.horario,
        tipopago: currentState.tipopago,
        numerortn: currentState.numerortn ,
        total: total.toString()
      });


     let idpedido = ''
     let idcantidad = ''   
     let idnombrepro = ''  
     let idtotal = ''
     let idprecio = ''
     let contador = 0 
     
     const arregloCaracteres = encadata.split('_');

for (const caracter of arregloCaracteres) {
 // console.log(caracter);
  contador = 0 
 
  

  const arreglodetalle = caracter.split(',');
  console.log('arreglodetalle',arreglodetalle);
  for (const caracterdeta of arreglodetalle) {
    console.log('caracterdeta',caracterdeta.toString());

   
    if(contador == 0)
    {
        idcantidad = caracterdeta
    }
    else if (contador == 1)
    {
        idnombrepro = caracterdeta
    }  
    else if (contador == 2)
    {
        idprecio = caracterdeta
    }   
    else if (contador == 3)
    {
        idtotal = caracterdeta
    }
    else 
    {
        idpedido = caracterdeta
    }

  

    console.log('contador',contador)
    contador++
    if( idcantidad.trim()  === ''   )
    {
        contador = 0
    }


  }
 
  console.log('idcantidad',idcantidad)
  if(contador !== 0  )
   {

    console.log('contador es 0 no debe entrar aqui',contador)
  await googelSheet.saveOrderdetail({
    idpedido: nopedido,//.now(),//.toLocaleDateString(),//.toDateString(),
    cantidad: idcantidad,
    producto: idnombrepro ,
    precio: idprecio,
    total: idtotal
  });

    }
    contador = 0 
    encadetalle  =[]

    
}


    }
   // ,[flowrnt]
    
   
)
.addAnswer(['Es correcto su pedido? ', 
            'si su orden es correcta ingrese 1',
            'si su orden esta incorrecta ingrese 2',
            '',
            '*1) SI*',
            '*1) NO*'
        ]
 ,{capture : true} 
 , async(ctx  ) => {

  

   // console.log('usuario', usuario)
   // console.log('encapedido', encapedido)
    
    }
  
  
) 



const flowprodcfactura = addKeyword(
    ['2']                                     
)
.addAnswer( ['Desea hacer su pago con su tarjeta bancaria 💳 o en efectivo 💵 ?',
             '*1) Tarjeta*',
             '*2) Efectivo*' ]
,{capture : true}  
, async( ctx ,{state }   ) => {
    state.update({tipopago:ctx.body})

   // encapedido[ctx.from].tipopago = ctx.body
     //   console.log(ctx.body, 'forma de pago')
       // gotoFlow( flowconrnt)
    }
    ,[flowconrnt] 
               
)
.addAnswer(['Ingrese su RNT por favor sin guiones ni espacios',
            'si no desea agregar rtn escriba na',
            
]
,{capture : true}  
, async(ctx , {gotoFlow , flowDynamic , state} ) => {
    state.update({numerortn:ctx.body})
 //   encapedido[ctx.from]. aceptartn= ctx.body
  //  console.log(ctx.body, 'ingreso a factura rtn')
    }
   // ,[flowrnt]
    
)





const flowordenamas = addKeyword(
                                    ['1','2','3','4','5','6','7','8'
                                    , '9','10','11','12', '13', '14','15','16','17','18','19','20']                                     
                                ) 

.addAnswer(['Gracias por ordenar su primer producto',
           'Dese Agregar mas productos escriba agregar',
           '*1) Si*',
           '*2) NO*']
,{capture : true}  
, async(ctx ,{gotoFlow ,endFlow }  ) => {
    

    console.log('ctx', ctx.body)
    if(ctx.body === '1'){
        gotoFlow(flowdetalle)

    }

  
    
    }
    , [flowprodcfactura]          
)



const flowprodcant = addKeyword(
                                  ['1','2','3','4','5','6','7','8'
                                  , '9','10','11','12', '13', '14','15','16','17','18','19','20']                                     
                             )
.addAnswer('Cuantos Productos desea ordenar'
,{capture : true} 
, async(ctx , {flowDynamic , state}   ) => {
   // console.log('ctx', ctx.body)
    state.update({cantproducto:ctx.body})
    const currentStateprod = state.getMyState();


   // console.log('cantidad ordenar', PRODUCTO_PRESELECCIONADO)
    const productosplit = PRODUCTO_PRESELECCIONADO[0].toString().split(',')
    encadetalle.push( currentStateprod.cantproducto, productosplit[2], productosplit[3] , (productosplit[3] * currentStateprod.cantproducto  ))
    state.update({cantproducto: ''})
   // console.log('encadetalle', encadetalle)
    //console.log(productosplit , productosplit[0] )

    }
    ,[flowordenamas]
)


const flowselectproducto = addKeyword(
    ['1','2','3','4','5','6','7','8'
    , '9','10','11','12', '13', '14','15','16','17','18','19','20']                                     
)
.addAnswer('Escriba el producto que desea seleccionar'
,{capture : true} 
, async(ctx , {flowDynamic , state}  ) => {

    

    state.update({producto: ctx.body})
    const currentStateprod = state.getMyState();

   // console.log('currentStateprod',currentStateprod)

    PRODUCTO_PRESELECCIONADO = PRODUCTO_PRESELECCIONADO.filter(producto => producto[0].toString() ===  currentStateprod.producto.toString()  );
 //console.log('PRODUCTO_PRESELECCIONADO de producto',PRODUCTO_PRESELECCIONADO)

 await  flowDynamic(PRODUCTO_PRESELECCIONADO);
    

}
,[flowprodcant]
)



const flowdetallecantidad = addKeyword(
                                            ['1','2','3','4','5','6','7','8'
                                            , '9','10','11','12', '13', '14','15','16','17','18','19','20']                                     
                                      )
.addAnswer(['Escrba el numero de producto que desea ordernar']
,{capture : false} 
, async(ctx , {flowDynamic , state}  ) => {
    
    //console.log(' producto', ctx.body)
    const currentState = state.getMyState();
   // console.log('currentState',currentState)

    const getProducto = await googelSheet.showproducto(1)//.retriveDayMenu(1);
 //console.log('getProducto' ,getProducto)
     // Filtrar productos por idcategoria
  const productosFiltrados = getProducto.filter(producto => producto[1].toString() ===  currentState.categoria.toString()  /*1*/);
  PRODUCTO_PRESELECCIONADO = getProducto.filter(producto => producto[1].toString() ===  currentState.categoria.toString()  /*1*/);
  
  state.update({categoria: ''})
 
   // console.log('getProducto',productosFiltrados)
    for (const producto of productosFiltrados) {
     //   console.log('producto',producto)
        GLOBAL_STATEPRODUCTO.push(producto);
        
      }


      const concatenatedMessage = GLOBAL_STATEPRODUCTO.map(producto => `*${producto[0].toString()}*) *${producto[2].toString()}* *${producto[3].toString()}*`).join('\n');
      GLOBAL_STATEPRODUCTO=  [];
        flowDynamic(concatenatedMessage);
     
    }
    ,[flowselectproducto]
)


const flowdetalle = addKeyword(
                              ['1','2','3','4','5','6','7','8'
                              , '9','10','11','12', '13', '14','15','16','17','18','19','20']
                             )
                       

// se debe mandar la imagen del menu combos y bebidas
.addAnswer(['Espere un momento generando menu']
,{capture : false}
, async(ctx , {flowDynamic , state} ) => {
   // console.log(' flowdetalle', ctx.body)
    const getCategoria= await googelSheet.retriveDayMenu(1);
    //console.log('getCategoria',getCategoria)
    for (const categoria of getCategoria) {
      //  console.log('categoria',categoria)
        GLOBAL_STATE.push(categoria);
       // await flowDynamic( `*${categoria[0].toString()}*) *${categoria[1].toString()}*` );
      }

    
      const concatenatedMessage = GLOBAL_STATE.map(categoria => `*${categoria[0].toString()}*) *${categoria[1].toString()}*`).join('\n');
      await flowDynamic(concatenatedMessage);
      GLOBAL_STATE = [];
      state.update({categoria:ctx.body})
      
    }
  // ,[flowdetallecantidad]
)
.addAnswer(['Escriba el numero de categoria que desea']
,{capture : true} 
, async(ctx , {flowDynamic , state}  ) => {
    state.update({categoria: ctx.body})

    //console.log(' producto', ctx.body)
    const currentState = state.getMyState();
   // console.log('currentState',currentState)

    const getProducto = await googelSheet.showproducto(1)//.retriveDayMenu(1);
 //console.log('getProducto' ,getProducto)
     // Filtrar productos por idcategoria
  const productosFiltrados = getProducto.filter(producto => producto[1].toString() ===  currentState.categoria.toString()  /*1*/);
  PRODUCTO_PRESELECCIONADO = getProducto.filter(producto => producto[1].toString() ===  currentState.categoria.toString()  /*1*/);
  
 // state.update({categoria: ''})
 
   // console.log('getProducto',productosFiltrados)
    for (const producto of productosFiltrados) {
     //   console.log('producto',producto)
        GLOBAL_STATEPRODUCTO.push(producto);
        
      }

      const concatenatedMessage = GLOBAL_STATEPRODUCTO.map(producto => `*${producto[0].toString()}*) *${producto[2].toString()}* *${producto[3].toString()}*`).join('\n');
      GLOBAL_STATEPRODUCTO=  [];
       await flowDynamic(concatenatedMessage);
     


       //await flowDynamic('Escrba el numero de producto que desea ordernar');


    }
    ,[flowselectproducto]
)

.addAction(async (_, { flowDynamic, gotoFlow }) => {
    
    state.update({categoria:ctx.body})

    await gotoFlow(flowselectproducto) 
})








 const flowpedido = addKeyword('1' )
.addAnswer('Bienvenido servicio a *domicilio* o *recogerlo* en una de nuestras sucursales' )

.addAnswer(['*1) Domicilio*',
'*2) Pickup*',
 '*3) Regresar al*' ],
 {capture : true}
 , async(ctx, { state }   ) => {
    state.update({tipoentrega:ctx.body})

    encapedido[ctx.from] = {
        tipoentrega: ctx.body,
        telefonorecbe: "", 
        local: "",
        horario: "",
        tipopago: "", 
        aceptartn: "",
        numerortn: ""


    
     }

     


  
/*
     await googelSheet.saveOrder({
        fecha: new Date().toDateString(),
        telefono: ctx.from,
        pedido: 1,
        nombre: 'rigoberto',
        observaciones: 'pechuga frita',
      });*/
   // await Addpedido()

 })

 .addAnswer(['Cual es su nombre completo']
,{capture : true}
, async(ctx  ) => {
    usuario[ctx.from] = {
        numero: ctx.from,
        nombre: ctx.body
     //   telefonorecbe: ""
    
     }

 }
   
    )

 
.addAnswer(['Cual es el numero de 📱 de la persona que recibira el pedido? favor escribirlo sin guiones y espacios',
' *Ejemplo: 98802020*']
,{capture : true}
, async(ctx, {state }  ) => {
    state.update({telefonorecbe:ctx.body})
    //encapedido[ctx.from].telefonorecbe = ctx.body

 }
   
    )

.addAnswer(['Elija la sucursal donde recogera su pedido',
'*1) Principal*']
,{capture : true}
, async(ctx , {state } ) => {
    state.update({local:ctx.body})
   // encapedido[ctx.from].local = ctx.body

    }
)
.addAnswer('se muestra el menu acontinuacion', {
    media: 'https://i.imgur.com/ZzOQwRD.png'
    
})
.addAnswer('se muestra el menu acontinuacion', {
    media:
    'https://i.imgur.com/F7zT3mI.png'

})



.addAnswer(['Nuestro horario de atencion es de 9:00 AM  a 8:00 PM 🕘',
            'A que horas desea pasar por su pedido?']
,{capture : true}
, async(ctx , {state , gotoFlow, flowDynamic } ) => {
    state.update({horario:ctx.body})

   // <a href="https://ibb.co/dJwCrZL"><img src="https://i.ibb.co/Vpcnt6Q/Whats-App-Image-2023-09-22-at-2-03-05-PM.jpg" alt="Whats-App-Image-2023-09-22-at-2-03-05-PM" border="0" /></a>



    }
    //, []
    ,[flowdetalle]
)
/*
.addAction(async (_, { flowDynamic, gotoFlow }) => {
  return gotoFlow(flowdetalle) 
})
*/


export default flowpedido