
/*
const{ JWT } = require('google-auth-library')
const { GoogleSpreadsheet } = require('google-spreadsheet')
*/

import { JWT } from 'google-auth-library';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import dotenv from 'dotenv';


dotenv.config();

const EMAILSERVICES = process.env.EMAILSERVICES;
const KEYSERVICE = process.env.KEYSERVICE;

console.log('EMAILSERVICES', EMAILSERVICES)
console.log('KEYSERVICE',KEYSERVICE)



const SCOPES = [
  "https://www.googleapis.com/auth/spreadsheets"//,
 , "https://www.googleapis.com/auth/drive.file",
  "https://www.googleapis.com/auth/cloud-platform"
];


//const KEY = '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'
 
 class GoogleSheetService {
  jwtFromEnv = undefined;
  doc = undefined;

  constructor(id = undefined) {
    if (!id) {
      throw new Error("ID_UNDEFINED");
    }

    
const KEY = //KEYSERVICE
'-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDRSTXLIgwX6kUb\nAaAusWUrBGnGYG8D+bBMam3ZPSIRmcXEyu/PVp4TmIX63yQXm+dohnmEpuZ6sHh5\nPmIhwRVAORqADL5HvGsxn5pTkoyU0i0tLiUjjXe1kis2qdo/hQE1aen90w9j8QEI\n9ebX9kLxoSWQ7+QdjqV0MZk8Mz45qa/u6Nsp1HdAx+1hb05j2NJhaQ67p/1obriC\nlrGr47sJTdpP1gva7tnxoUKJ5pcKfEeaWxEH4DfA04pb8PP/LTISvN3u9GN7plQ3\nDdfA1Kxs/1BIk2fEWe8gXGW48FAngezwUoU84MrXUTy/ihIxZi7iyipyT9w8JZeB\ncCSEwdrNAgMBAAECggEAAm2ioPK9YftArGmLN3KtEjmA4kf09P5zdZxRt5DABNhC\ntSygz66l/7A09CfQPjEVSqv7KPdB+vALoplL5i+PuykIDhUXxOYb9rCiLioOVR1P\n+a0GMH1pto+cAYxckRqBj+JLHSJslH16KswMaG3d2C14eoM61r6OKOT41C8vOT5u\nl74fBo8IfI5toFYJRUZuS9gGR1cnNl27NuMNZL3kOrxvo8HBaPX9blQQIs/K1qvI\nf2hUozlMAi8sxMZikdiTh1IWMe7UWHPe5BWZO6hUxPhOFPAwslLoGdPECEP0JMWk\n9nbr58zBjWHuhTH8m0ZpYLbZNCMGDyZ22b2cQM3HeQKBgQD6I+lr77YlGu58S8lA\nucKc50BUT+eFK4SfqNSQ1iP7vJ+vTkfu3IF7ixHt5kDUk988KIkFSNWIyyQR7hHS\nRP72MQhyCdP9TC1Bij1MwLUeeJ/PeSTo4fxznepshaqvYELGP509L6vlABsEsJFB\nrd8Pi/AYFBH0oNLQTXj4iG6j7wKBgQDWMEuqhT4E/N9ON9UvKKN7riq0+o3rIpsw\nenWtoVXXmPJRL64KTa2bbop2AuFmVJpcprwUg8+N3zOpMfX57EtlzCcvbGPoYToA\nPa9gKGaDr5ndCrpNBPkl4l9NWyNJAEgg3Orje4tv051n47VHZyytKt/j2JOe9pXX\nbbd6Fk4BAwKBgQDAhqeAhi4BfSsVzBcIlHFv5qWivyWJYCdh48ZH/CoR9epKOcwv\n0tRuTGnuW4yGkZH+cYyU3qxL717B1iUtXCGJR9AiReI+UUV77nSkAKbm3xzRyYJZ\nJKb0LhVilbb76PE8OXZCw9BgH6asA2Kp1LOc+a5AOiJf0PCxlw+G6yuNTQKBgAsU\nSHWzmrerVOm43aAo2/wD0FW4OCsXiSuCyh+HHueeE7q7WqdRyU8m8qaUE5C1g56T\nSVtOTigqiYORAAZDgMrtOoGre6eDj/p/Nlkk/diF9tGGQojFXxXklcVsl3CpQRHi\nG4xU0auhKJ09HB1ratYyR46Dn28zliCknj8EdFh9AoGBANcQumHxz8vsqzPwtk8P\nfi3vjas6xjfT4uDTUpximqY4QcaZG5M4PQYsA3Ijh1kq6nQjBgurWwxNe+UkU9Bi\nSw87gn21Put7ML0Ih41m4iTshXf43aHFLLj/JdQnfGU+wLXIyNlimRov3ox/Dugi\nRhRJhZLQYNnxUmnhLEB/Dd6Z\n-----END PRIVATE KEY-----\n'


const kwylimpia =  KEY//.replace(/\\/g, "")
//console.log('kwylimpia', kwylimpia)
    this.jwtFromEnv = new JWT({
      email: EMAILSERVICES, // 'pedbot@pedbot.iam.gserviceaccount.com', 
      key: kwylimpia, // KEY.replace(/\\n/g, "\n"),
    
      
      scopes: SCOPES,
    });

    const serviceAccountAuth = new JWT({
      email: EMAILSERVICES ,// 'pedbot@pedbot.iam.gserviceaccount.com', //'kosortosanchez@gmail.com',// '861551596000-u752bhhklttmbdamtjcd4mkgi02qf97d.apps.googleusercontent.com',
      key: KEYSERVICE, // kwylimpia, // KEY.replace(/\\n/g, "\n"),
    
      
      scopes: SCOPES,
    });

     this.doc = new GoogleSpreadsheet(id, serviceAccountAuth);


  }

  /**
   * Recuperar el menu del dia
   * @param {*} dayNumber
   * @returns
   */
  retriveDayMenu = async (dayNumber = 0) => {
    
    try {
      const list = [];
      await this.doc.loadInfo();
      const sheet = this.doc.sheetsByIndex[0]; // the first sheet
      await sheet.loadCells("A1:B80");
      const rows = await sheet.getRows();
   
      for (const a of Array.from(Array(rows.length).keys())) {
        const cellA1 =   sheet.getCell(a + 1, dayNumber - 1) ;
        const cellA2 = sheet.getCell(a + 1, dayNumber);
      //  console.log(cellA1, cellA2)
        list.push([cellA1.value, cellA2.value]);
      }

     // console.log('list',list)
      return list;
    } catch (err) {
      console.log(err);
      return undefined;
    }




  };


  
  /**
   * Recuperar el menu del dia
   * @param {*} dayNumber
   * @returns
   */
  showproducto = async (dayNumber = 0) => {
    
    try {
      const list = [];
      await this.doc.loadInfo();
      const sheet = this.doc.sheetsByIndex[2]; // the first sheet
      await sheet.loadCells("A1:D80");
      const rows = await sheet.getRows();
   // console.log('rows',rows)
      for (const a of Array.from(Array(rows.length).keys())) {
        const cellA1 =   sheet.getCell(a + 1, dayNumber - 1) ;
        const cellA2 = sheet.getCell(a + 1, dayNumber);
        const cellA3 = sheet.getCell(a + 1, dayNumber+1);
        const cellA4 = sheet.getCell(a + 1, dayNumber+2);
      //  console.log(cellA1, cellA2 , cellA3 , cellA4 )
        list.push([cellA1.value, cellA2.value , cellA3.value , cellA4.value ]);
      }

    //  console.log('list',list)
      return list;
    } catch (err) {
      console.log(err);
      return undefined;
    }


  };



  /**
   * Guardar pedido
   * @param {*} data
   */
  saveOrder = async (data = {}) => {
  
      const respuesta = await this.doc.loadInfo();
 

   // console.log('ddataoc',data)
    const sheet = this.doc.sheetsByIndex[1]; // the first sheet

    //console.log('sheet',sheet)

    const order = await sheet.addRow({
      fecha: data.fecha,
      telefonorecbe: data.telefonorecbe,
      local: data.local,
      pedido: data.pedido,
      tipoentrega: data.tipoentrega,
      horario: data.horario,
      tipopago: data.tipopago,
    //  aceptartn: data.observaciones,
      numerortn: data.numerortn,
      telefono: data.telefono,
      total: data.total

    });

    return order
  };


  
  /**
   * Guardar pedido
   * @param {*} data
   */
  saveOrderdetail = async (data = {}) => {
  
    const respuesta = await this.doc.loadInfo();


  console.log('ddataoc',data)
  const sheet = this.doc.sheetsByIndex[3]; // the first sheet

  //console.log('sheet',sheet)

  const order = await sheet.addRow({
    idpedido: data.idpedido,
    cantidad: data.cantidad,
    producto: data.producto,
    precio: data.precio,
    total: data.total

  });

  return order
};

}



export default GoogleSheetService