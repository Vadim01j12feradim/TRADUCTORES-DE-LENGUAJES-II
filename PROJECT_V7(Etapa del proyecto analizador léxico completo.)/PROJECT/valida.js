//http://localhost/Traductor/Index.php
function FatalError(){ 
    error.apply(this, arguments); this.name = "FatalError"; } 
FatalError.prototype = Object.create(Error.prototype);

String.prototype.replaceAt = function(index, replacement) {
    if (index >= this.length) {
        return this.valueOf();
    }
 
    return this.substring(0, index) + replacement + this.substring(index + 1);
}
//#region lista y nodos
class Node {
    constructor(value,medium, next) {
      this.medium =medium
      this.value = value;
      this.next = next;  
    }
  }
  
  class LinkedList {
    constructor() {
      this.head = null;
    }
    
    insertNode(value,medium) {
      const newNode = new Node(value,medium, null);
      if (this.head === null) {
        this.head = newNode;
      } else {
        let current = this.head;
        while (current.next) {
          current = current.next;
        }
        current.next = newNode;
      }
    }
  
    print(){
      let current = this.head;
      //#region capture dataset
        let NODES = []
        let EDGES = [
            // { from: 1, to: 3 },
            // { from: 1, to: 2 },
            // { from: 2, to: 4 },
            // { from: 2, to: 5 },
            // { from: 3, to: 3 }
          ]
        let i = 0;
        //let fahterOld=0;
          while (current) {
            console.log(current.value+","+current.medium+"->");
            if (current.medium=="") {
                if (NODES.length==0) {
                    NODES.push({ id: i, label: "E" })
                    NODES.push({ id: i+1, label: current.value})
                    EDGES.push({ from: i, to: i+1 })
                }else{
                NODES.push({ id: i, label: current.value})
                EDGES.push({ from: i, to: i-1 })
                }i+=2
            }else if(NODES.length==0){
            NODES.push({ id: i, label: "E" })
            NODES.push({ id: i+1, label: current.value})
            EDGES.push({ from: i, to: i+1 })
            NODES.push({ id: i+2, label: current.medium})
            EDGES.push({ from: i+2, to: i })
            NODES.push({ id: i+3, label: "E" })
            EDGES.push({ from: i+3, to: i })
            i+=4
            }else if (NODES.length>0 && current.medium!="") {
                NODES.push({ id: i, label: current.value})
                EDGES.push({ from: i, to: i-1 })
                NODES.push({ id: i+1, label: current.medium})
                EDGES.push({ from: i+1, to: i-1 })
                NODES.push({ id: i+2, label: "E" })
                EDGES.push({ from: i+2, to: i-1 })
                i+=3
            }
            current = current.next;
          }
      //#endregion
            // create an array with nodes
            var nodes = new vis.DataSet(
                NODES
            //     [
            //     { id: 1, label: "Node 1" },
            //     { id: 2, label: "Node 2" },
            //     { id: 3, label: "Node 3" },
            //     { id: 4, label: "Node 4" },
            //     { id: 5, label: "Node 5" },
            //   ]
              );
        
              // create an array with edges
              
              var edges = new vis.DataSet(EDGES);
        
              // create a network
              var container = document.getElementById("mynetwork");
              var data = {
                nodes: nodes,
                edges: edges,
              };
              var options = {};
              var network = new vis.Network(container, data, options);

    }
  
    deleteNode(value) {
      if (this.head.value === value) {
        this.head = this.head.next;
      } else {
        let current = this.head;
        while (current.next) {
          if (current.next.value === value) {
            current.next = current.next.next;
            return;
          }
          current = current.next;
        }
      }
    }
  
    findNode(value) {
      let current = this.head;
      while (current) {
        if (current.value === value) {
          return current;
        }
        current = current.next;
      }
      return null;
    }
  }
  
//   const linkedList = new LinkedList();
//   linkedList.insertNode(12);
//   linkedList.insertNode(99);
//   linkedList.insertNode(37);
//   linkedList.print();
//   console.log(linkedList.findNode(37));
  //#endregion
const num =  /\d/i;
const numf =  /\d\.\d/i;
const operation =  /\*|\//i;
const simbol = /\+|\-/i
const leng = /^$/i;
const openparent =  /[(]/i;
const closeparent =  /[)]/i;
const letra =  /[a-z]|[A-Z]/i;
var table='';
var table3='';
var tableLexico = '';
var tableLR = '';
var tableSintactico = ''
var tableSintacticoR = ''
var matrixLR = []
function generateLR(){
//#region Matrix

    /*0*/matrixLR.push(['','','','','d5','','','','','','','','','','','','','','','','','','','r2','1','2','3','4','','6','','','','','','','','','','','','','','','','']);
    //alert("Value "+matrixLR[0].length)
    /*1*/matrixLR.push(['','','','','','','','','','','','','','','','','','','','','','','','r0','','','','','','','','','','','','','','','','','','','','','','']);
    /*2*/matrixLR.push(['','','','','','','','','','','','','','','','','','','','','','','','r1','','','','','','','','','','','','','','','','','','','','','','']);
    //alert("Value "+matrixLR[2].length)
    /*3*/matrixLR.push(['','','','','d5','','','','','','','','','','','','','','','','','','','r2','','7','3','4','','6','','','','','','','','','','','','','','','','']);
    
    /*4*/matrixLR.push(['','','','','r4','','','','','','','','','','','','','','','','','','','r4','','','','','','','','','','','','','','','','','','','','','','']);
    //alert("Value "+matrixLR[4].length)
    /*5*/matrixLR.push(['d8','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','']);
    //alert("Value "+matrixLR[5].length)

    /*6*/matrixLR.push(['','','','','r5','','','','','','','','','','','','','','','','','','','r5','','','','','','','','','','','','','','','','','','','','','','']);
    //alert("Value "+matrixLR[6].length)
    /*7*/matrixLR.push(['','','','','','','','','','','','','','','','','','','','','','','','r3','','','','','','','','','','','','','','','','','','','','','','']);
    /*8*/matrixLR.push(['','','','','','','','','','','','','r7','d10','d11','','','','','','','','','','','','','','9','','','','','','','','','','','','','','','','','']);
    /*9*/matrixLR.push(['','','','','','','','','','','','','d12','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','']);
    /*10*/matrixLR.push(['d13',,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,'']);
    //alert("Value "+matrixLR[10].length)
    /*11*/matrixLR.push([,,,,'d15',,,,,,,,,,,'r10',,,,,,,,,,,,,,,'14',,,,,,,,,,,,,,,'']);
    //alert("Value "+matrixLR[11].length)
    /*12*/matrixLR.push(['r6',,,,'r6',,,,,,,,,,,,,'r6',,'r6','r6','r6',,'r6',,,,,,,,,,,,,,,,,,,,,,'']);
    /*13*/matrixLR.push([,,,,,,,,,,,,'r7','d10',,,,,,,,,,,,,,,'16',,,,,,,,,,,,,,,,,'']);
    /*14*/matrixLR.push([,,,,,,,,,,,,,,,'d17',,,,,,,,,,,,,,,,,,,,,,,,,,,,,,'']);
    /*15*/matrixLR.push(['d18',,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,'']);
    /*16*/matrixLR.push([,,,,,,,,,,,,'r8',,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,'']);
    /*17*/matrixLR.push([,,,,,,,,,,,,,,,,'d20',,,,,,,,,,,,,,,,'19',,,,,,,,,,,,,'']);
    /*18*/matrixLR.push([,,,,,,,,,,,,,'d22',,'r12',,,,,,,,,,,,,,,,'21',,,,,,,,,,,,,,'']);
    /*19*/matrixLR.push([,,,,'r9',,,,,,,,,,,,,,,,,,,'r9',,,,,,,,,,,,,,,,,,,,,,'']);
    /*20*/matrixLR.push(['d27',,,,'d5',,,,,,,,,,,,,'r15',,'d28','d29','d30',,,,,,'25',,,,,,'23','24',,'26',,,,,,,'31',,'']);
    /*21*/matrixLR.push([,,,,,,,,,,,,,,,'r11',,,,,,,,,,,,,,,,,,,,,,,,,,,,,,'']);
    /*22*/matrixLR.push([,,,,'d32',,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,'']);
    /*23*/matrixLR.push([,,,,,,,,,,,,,,,,,'d33',,,,,,,,,,,,,,,,,,,,,,,,,,,,'']);
    /*24*/matrixLR.push(['d27',,,,'d5',,,,,,,,,,,,,'r15',,'d28','d29','d30',,,,,,'25',,,,,,'34','24',,'26',,,,,,,'31',,'']);
    /*25*/matrixLR.push(['r17',,,,'r17',,,,,,,,,,,,,'r17',,'r17','r17','r17',,,,,,,,,,,,,,,,,,,,,,,,'']);
    /*26*/matrixLR.push(['r18',,,,'r18',,,,,,,,,,,,,'r18',,'r18','r18','r18',,,,,,,,,,,,,,,,,,,,,,,,'']);
    /*27*/matrixLR.push([,,,,,,,,,,,,,,'d36',,,,'d35',,,,,,,,,,,,,,,,,,,,,,,,,,,'']);
    /*28*/matrixLR.push([,,,,,,,,,,,,,,'d37',,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,'']);
    /*29*/matrixLR.push([,,,,,,,,,,,,,,'d38',,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,'']);
    /*30*/matrixLR.push(['d46','d47','d48','d49',,'d42',,,,,'d43',,'r29',,'d41',,,,,,,,,,,,,,,,,,,,,,,,,'39',,,'44','45',,'40']);
    /*31*/matrixLR.push([,,,,,,,,,,,,'d50',,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,'']);
    /*32*/matrixLR.push(['d51',,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,'']);
    /*33*/matrixLR.push([,,,,'r14',,,,,,,,,,,,,,,,,,,'r14',,,,,,,,,,,,,,,,,,,,,,'']);
    /*34*/matrixLR.push([,,,,,,,,,,,,,,,,,'r16',,,,,,,,,,,,,,,,,,,,,,,,,,,,'']);
    /*35*/matrixLR.push(['d46','d47','d48','d49',,'d42',,,,,'d43',,,,'d41',,,,,,,,,,,,,,,,,,,,,,,,,,,,'44','45',,'52']);
    /*36*/matrixLR.push(['d46','d47','d48','d49',,'d42',,,,,'d43',,,,'d41','r31',,,,,,,,,,,,,,,,,,,,,,,,,'53',,'44','45',,'54']);
    /*37*/matrixLR.push(['d46','d47','d48','d49',,'d42',,,,,'d43',,,,'d41',,,,,,,,,,,,,,,,,,,,,,,,,,,,'44','45',,'55']);
    /*38*/matrixLR.push(['d46','d47','d48','d49',,'d42',,,,,'d43',,,,'d41',,,,,,,,,,,,,,,,,,,,,,,,,,,,'44','45',,'56']);
    /*39*/matrixLR.push([,,,,,,,,,,,,'d57',,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,'']);
    /*40*/matrixLR.push([,,,,,'d59','d58','d60','d63','d62',,'d61','r30',,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,'']);
    /*41*/matrixLR.push(['d46','d47','d48','d49',,'d42',,,,,'d43',,,,'d41',,,,,,,,,,,,,,,,,,,,,,,,,,,,'44','45',,'64']);
    /*42*/matrixLR.push(['d46','d47','d48','d49',,'d42',,,,,'d43',,,,'d41',,,,,,,,,,,,,,,,,,,,,,,,,,,,'44','45',,'65']);
    /*43*/matrixLR.push(['d46','d47','d48','d49',,'d42',,,,,'d43',,,,'d41',,,,,,,,,,,,,,,,,,,,,,,,,,,,'44','45',,'66']);
    /*44*/matrixLR.push([,,,,,'r52','r52','r52','r52','r52',,'r52','r52','r52',,'r52',,,,,,,,,,,,,,,,,,,,,,,,,,,,,,'']);
    /*45*/matrixLR.push(['',,,,,'r35','r35','r35','r35','r35',,'r35','r35','r35',,'r35',,,,,,,,,,,,,,,,,,,,,,,,,,,,,,'']);
    /*46*/matrixLR.push([,,,,,'r36','r36','r36','r36','r36',,'r36','r36','r36','d36','r36',,,,,,,,,,,,,,,,,,,,,,,,,,,,,,'']);
    /*47*/matrixLR.push([,,,,,'r37','r37','r37','r37','r37',,'r37','r37','r37',,'r37',,,,,,,,,,,,,,,,,,,,,,,,,,,,,,'']);
    /*48*/matrixLR.push([,,,,,'r38','r38','r38','r38','r38',,'r38','r38','r38',,'r38',,,,,,,,,,,,,,,,,,,,,,,,,,,,,,'']);
    /*49*/matrixLR.push([,,,,,'r39','r39','r39','r39','r39',,'r39','r39','r39',,'r39',,,,,,,,,,,,,,,,,,,,,,,,,,,,,,'']);
    /*50*/matrixLR.push(['r25',,,,'r25',,,,,,,,,,,,,'r25',,'r25','r25','r25','r25',,,,,,,,,,,,,,,,,,,,,,,'']);
    /*51*/matrixLR.push([,,,,,,,,,,,,,'d22',,'r12',,,,,,,,,,,,,,,,'67',,,,,,,,,,,,,,'']);
    /*52*/matrixLR.push([,,,,,'d59','d58','d60','d63','d62',,'d61','d68',,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,'']);
    /*53*/matrixLR.push([,,,,,,,,,,,,,,,'d69',,,,,,,,,,,,,,,,,,,,,,,,,,,,,,'']);
    /*54*/matrixLR.push([,,,,,'d59','d58','d60','d63','d62',,'d61',,'d71',,'r33',,,,,,,,,,,,,,,,,,,,,,,,,,'70',,,,'']);
    /*55*/matrixLR.push([,,,,,'d59','d58','d60','d63','d62',,'d61',,,,'d72',,,,,,,,,,,,,,,,,,,,,,,,,,,,,,'']);
    /*56*/matrixLR.push([,,,,,'d59','d58','d60','d63','d62',,'d61',,,,'d73',,,,,,,,,,,,,,,,,,,,,,,,,,,,,,'']);
    /*57*/matrixLR.push(['r24',,,,'r24',,,,,,,,,,,,,'r24',,'r24','r24','r24','r24',,,,,,,,,,,,,,,,,,,,,,,'']);
    /*58*/matrixLR.push(['d46','d47','d48','d49',,'d42',,,,,'d43',,,,'d41',,,,,,,,,,,,,,,,,,,,,,,,,,,,'44','45',,'74']);
    /*59*/matrixLR.push(['d46','d47','d48','d49',,'d42',,,,,'d43',,,,'d41',,,,,,,,,,,,,,,,,,,,,,,,,,,,'44','45',,'75']);
    /*60*/matrixLR.push(['d46','d47','d48','d49',,'d42',,,,,'d43',,,,'d41',,,,,,,,,,,,,,,,,,,,,,,,,,,,'44','45',,'76']);
    /*61*/matrixLR.push(['d46','d47','d48','d49',,'d42',,,,,'d43',,,,'d41',,,,,,,,,,,,,,,,,,,,,,,,,,,,'44','45',,'77']);
    /*62*/matrixLR.push(['d46','d47','d48','d49',,'d42',,,,,'d43',,,,'d41',,,,,,,,,,,,,,,,,,,,,,,,,,,,'44','45',,'78']);
    /*63*/matrixLR.push(['d46','d47','d48','d49',,'d42',,,,,'d43',,,,'d41',,,,,,,,,,,,,,,,,,,,,,,,,,,,'44','45',,'79']);
    /*64*/matrixLR.push([,,,,,'d59','d58','d60','d63','d62',,'d61',,,,'d80',,,,,,,,,,,,,,,,,,,,,,,,,,,,,,'']);
    /*65*/matrixLR.push([,,,,,'r44','r44','r44','r44','r44',,'r44','r44','r44',,'r44',,,,,,,,,,,,,,,,,,,,,,,,,,,,,,'']);
    /*66*/matrixLR.push([,,,,,'r45','r45','r45','r45','r45',,'r45','r45','r45',,'r45',,,,,,,,,,,,,,,,,,,,,,,,,,,,,,'']);
    /*67*/matrixLR.push([,,,,,,,,,,,,,,,'r13',,,,,,,,,,,,,,,,,,,,,,,,,,,,,,'']);
    /*68*/matrixLR.push(['r21',,,,'r21',,,,,,,,,,,,,'r21',,'r21','r21','r21','r21',,,,,,,,,,,,,,,,,,,,,,,'']);
    /*69*/matrixLR.push([,,,,,'r40','r40','r40','r40','r40',,'r40','r40','r40',,'r40',,,,,,,,,,,,,,,,,,,,,,,,,,,,,,'']);
    /*70*/matrixLR.push([,,,,,,,,,,,,,,,'r32',,,,,,,,,,,,,,,,,,,,,,,,,,,,,,'']);
    /*71*/matrixLR.push(['d46','d47','d48','d49',,'d42',,,,,'d43',,,,'d41',,,,,,,,,,,,,,,,,,,,,,,,,,,,'44','45',,'81']);
    /*72*/matrixLR.push(['d27',,,,,,,,,,,,,,,,'d85',,,'d28','d29','d30',,,,,,,,,,,,,,,'83',,'84',,,,,'31','82','']);
    /*73*/matrixLR.push([,,,,,,,,,,,,,,,,'d85',,,,,,,,,,,,,,,,,,,,,,'86',,,,,,,'']);
    /*74*/matrixLR.push([,,,,,'r46','r46','r46','r46','r46',,'r46','r46','r46',,'r46',,,,,,,,,,,,,,,,,,,,,,,,,,,,,,'']);
    /*75*/matrixLR.push([,,,,,'r47','d58','r47','r47','r47',,'r47','r47','r47',,'r47',,,,,,,,,,,,,,,,,,,,,,,,,,,,,,'']);
    /*76*/matrixLR.push([,,,,,'d59','d58','r48','r48','r48',,'r48','r48','r48',,'r48',,,,,,,,,,,,,,,,,,,,,,,,,,,,,,'']);
    /*77*/matrixLR.push([,,,,,'d59','d58','d60','r49','r49',,'r49','r49','r49',,'r49',,,,,,,,,,,,,,,,,,,,,,,,,,,,,,'']);
    /*78*/matrixLR.push([,,,,,'d59','d58','d60','r50','r50',,'d61','r50','r50',,'r50',,,,,,,,,,,,,,,,,,,,,,,,,,,,,,'']);
    /*79*/matrixLR.push([,,,,,'d59','d58','d60','r51','d62',,'d61','r51','r51',,'r51',,,,,,,,,,,,,,,,,,,,,,,,,,,,,,'']);
    /*80*/matrixLR.push([,,,,,'r43','r43','r43','r43','r43',,'r43','r43','r43',,'r43',,,,,,,,,,,,,,,,,,,,,,,,,,,,,,'']);
    /*81*/matrixLR.push([,,,,,'d59','d58','d60','d63','d62',,'d61',,'d71',,'r33',,,,,,,,,,,,,,,,,,,,,,,,,,'87',,,,'']);
    /*82*/matrixLR.push(['r26',,,,'r26',,,,,,,,,,,,,'r26',,'r26','r26','r26','d89',,,,,,,,,,,,,,,'88',,,,,,,,'']);
    /*83*/matrixLR.push(['r41',,,,'r41',,,,,,,,,,,,,'r41',,'r41','r41','r41','r41',,,,,,,,,,,,,,,,,,,,,,,'']);
    /*84*/matrixLR.push(['r42',,,,'r42',,,,,,,,,,,,,'r42',,'r42','r42','r42','r42',,,,,,,,,,,,,,,,,,,,,,,'']);
    /*85*/matrixLR.push(['d27',,,,,,,,,,,,,,,,,'r19',,'d28','d29','d30',,,,,,,,,,,,,,'90','91',,,,,,,'31',,'']);
    /*86*/matrixLR.push(['r23',,,,'r23',,,,,,,,,,,,,'r23',,'r23','r23','r23','r23',,,,,,,,,,,,,,,,,,,,,,,'']);
    /*87*/matrixLR.push([,,,,,,,,,,,,,,,'r34',,,,,,,,,,,,,,,,,,,,,,,,,,,,,,'']);
    /*88*/matrixLR.push(['r22',,,,'r22',,,,,,,,,,,,,'r22',,'r22','r22','r22','r22',,,,,,,,,,,,,,,,,,,,,,,'']);
    /*89*/matrixLR.push(['d27',,,,,,,,,,,,,,,,'d85',,,'d28','d29','d30',,,,,,,,,,,,,,,'83',,'84',,,,,'31','92','']);
    /*90*/matrixLR.push([,,,,,,,,,,,,,,,,,'d93',,,,,,,,,,,,,,,,,,,,,,,,,,,,'']);
    /*91*/matrixLR.push(['d27',,,,,,,,,,,,,,,,,'r19',,'d28','d29','d30',,,,,,,,,,,,,,'94','91',,,,,,,'31',,'']);
    /*92*/matrixLR.push(['r27',,,,'r27',,,,,,,,,,,,,'r27',,'r27','r27','r27',,,,,,,,,,,,,,,,,,,,,,,,'']);
    /*93*/matrixLR.push(['r28',,,,'r28',,,,,,,,,,,,,'r28',,'r28','r28','r28','r28',,,,,,,,,,,,,,,,,,,,,,,'']);
    /*94*/matrixLR.push([,,,,,,,,,,,,,,,,,'r20',,,,,,,,,,,,,,,,,,,,,,,,,,,,'']);
    //#region comprobe table
    /*
    console.log('-------------------------------------------------------------------------------')
    let i=0;
    let stringRv = ''
    while (i<matrixLR.length) {
        if (matrixLR[i].length == 46)
            stringRv = "----->ok"
        else 
            stringRv = "-------------------->Error"
        console.log(i+": "+matrixLR[i].length+stringRv)
        i++
    }
    console.log('-------------------------------------------------------------------------------')
    */
    //#endregion
    
//#endregion
    //console.log(matrixLR)
    //#region CREATE TABLE LR
    let info = ['identificador','entero','real','cadena','tipo',
    'opSuma','opMul','opRelac','opOr','opAnd','opNot','opIgualdad',';',",",'(',')','{','}','=',
    'if','while','return','else','$','programa','Definiciones','Definicion','DefVar','ListaVar',
    'DefFunc','Parametros','ListaParam','BloqFunc','DefLocales','DefLocal','Sentencias','Sentencia',
    'Otro','Bloque','ValorRegresa','Argumentos','ListaArgumentos','Termino','LlamadaFunc','SentenciaBloque','Expresion']
    let i=0
    let j=0
    tableLR = '<table id="lr">'
    tableLR += '<tr class="rowlr"><th class="void"></th>'
    while (i<info.length) {
        tableLR += '<th class="rowlr">'+i+'</th>'
        i++
    }
    tableLR +='</tr>'
    i=0
    tableLR +='<tr class="rowlrid"><th class="rowlr"></th>'
    while (i<info.length) {
        tableLR += '<th class="rowlrid">'+info[i]+'</th>'
        i++
    }
    tableLR +='</tr>'
    i=0
    while (i<matrixLR.length) {
        j=0
        tableLR += '<tr class="rowlr">'+'<th class="rowlr">'+i+'</th>'
        let temp = ''
        while (j<info.length) {
            if (matrixLR[i][j] == undefined) {
                temp = ''
            }else
                temp = matrixLR[i][j]
            tableLR += '<th class="rowlr">'+temp+'</th>'
            j++
        }
        tableLR +='</tr>'
        i++
    }
    tableLR += '</table>'
    //#endregion
}

generateLR();
document.getElementById('lr').innerHTML=tableLR

////////////////////////THIS Y GENERATE GRAMATIC ANALSISI
//#region Nodes declarations
class R7{

}
class R7{
    
}
//#endregion



class Gramatic{
    constructor(arrayLexico){
        this.arrayLexico = arrayLexico
        this.matrixLR = matrixLR
        this.ER = []
        this.PR = []
    }
    getInputString(array){
        let alam = ''
        let i = 0
        while (i<array.length) {
            alam += array[i][1]
            i++
        }
        return alam
    }
    getInputStringR(array){
        let alam = ''
        let i = 0
        while (i<array.length) {
            alam += array[i][2]
            i++
        }
        return alam
    }
    dropCom(arr){
        let str = ''
        let i=0
        while (i < arr.length) {
            str += arr[i]     
            i++
        }
        return str;
    }
   getNum(){
    let arr = []
    let i=0;
    while (i<this.arrayLexico.length) {
        //console.log(this.arrayLexico[i][1])
        arr.push(this.arrayLexico[i][1])
        i++
    }
    return arr
   }
   executePop(pila,param,value,valueR){
    let i=0;
    while (i<param) {
        this.PR.pop()
        pila.pop()
        i++
    }
    let y = pila[pila.length-1]
    let newCoordenada = matrixLR[y][value]
    this.PR.push(valueR)
    this.PR.push(newCoordenada)
    pila.push(value)
    pila.push(newCoordenada)
   }
   getString(){
    let i=0;
    let ret = []
    while (i<this.arrayLexico.length) {
        ret.push(this.arrayLexico[i][2])
        i++
    }
    return ret
   }
   asignReality(coordenada){
        tableSintacticoR +='<tr class="rowlr"><th class="rowlr">'+this.dropCom(this.PR)+
                    '</th><th class="rowlr">'+this.dropCom(this.ER) + '</th><th class="rowlr">'+
                    coordenada+'</th></tr>'
   }
    executeSum(){
        //#region Declarate of the vars
        let pila = []
        let entrada = this.getNum()
        entrada.push(23)
        pila.push(23)
        pila.push(0)
        let salida = []
        let i = 0;//borar
        tableSintactico+='<table id="lr">'+
            '<tr class="sintact"><th class="sintact">Pila</th><th class="sintact">Entrada</th>'+
            '<th class="sintact">Salida'+'</th></tr>'
            //let j=0
            tableSintacticoR+='<table id="outrf">'+
            '<tr class="LRTytle"><th class="LRTytle">Pila</th><th class="LRTytle">Entrada</th>'+
            '<th class="LRTytle">Salida'+'</th></tr>'
        //#endregion
        this.PR.push("$")
        this.PR.push("0")
        this.ER = this.getString()
        this.ER.push("$")
        while (true) {
            let y = pila[pila.length-1]
            //let yR = this.PR[this.PR.length-1]
            let x = entrada[0]
            let xR = this.ER[0]
            let coordenada = matrixLR[y][x]


            tableSintactico +='<tr class="rowlr"><th class="rowlr">'+pila+
                            '</th><th class="rowlr">'+ entrada + '</th><th class="rowlr">'+
                            coordenada+'</th></tr>'
            //console.log("Pila: "+pila)
            //console.log("Entrada: "+entrada)
            //console.log(x+','+y+":"+coordenada) 
            if (coordenada == undefined) {
                alert("Error")
                throw new FatalError("Error en la tabla");
            }else

            switch (coordenada.charAt(0)) {
                //#region Reductions
                case 'r':
                    switch (coordenada) {
                        case "r0":
                            tableSintacticoR +='<tr class="rowlr"><th class="rowlr">'+this.dropCom(this.PR)+
                            '</th><th class="rowlr">'+this.dropCom(this.ER) + '</th><th class="rowlr">'+
                            coordenada+'</th></tr>'
                            console.log("Programa correcto")
                            return
                        case 'r1':
                            coordenada = 'R1 <h><</h>programa> ::= <h><</h>Definiciones> '
                            this.asignReality(coordenada)
                            this.executePop(pila,2,24,'<h><</h>programa>')
                            break;
                        case 'r2':
                            coordenada = 'R2 <h><</h>Definiciones> ::= /\e'
                            this.asignReality(coordenada)
                            this.executePop(pila,0,25,'<h><</h>Definiciones>')
                            break;
                        case 'r3':
                            coordenada = 'R3 <h><</h>Definiciones> ::= <h><</h>Definicion> <h><</h>Definiciones>'
                            this.asignReality(coordenada)
                            this.executePop(pila,4,25,'<h><</h>Definiciones>')
                            break;
                        case 'r4':
                            coordenada = 'R4 <h><</h>Definicion> ::= <h><</h>DefVar>'
                            this.asignReality(coordenada)
                            this.executePop(pila,2,26,'<h><</h>Definicion> ')
                            break;
                        case 'r5':
                            coordenada = 'R5 <h><</h>Definicion> ::= <h><</h>DefFunc> '
                            this.asignReality(coordenada)
                            this.executePop(pila,2,26,'<h><</h>Definicion> ')
                            break;
                        case 'r6':
                            coordenada = 'R6 <h><</h>DefVar> ::= tipo identificador <h><</h>ListaVar> ;'
                            this.asignReality(coordenada)
                            this.executePop(pila,8,27,'<h><</h>DefVar>')
                            break;
                        case 'r7':
                            coordenada = 'R7 <h><</h>ListaVar> ::= /\e '
                            this.asignReality(coordenada)
                            this.executePop(pila,0,28,'<h><</h>ListaVar>')
                            break;
                        case 'r8':
                            coordenada = 'R8 <h><</h>ListaVar> ::= , identificador <h><</h>ListaVar>'
                            this.asignReality(coordenada)
                            this.executePop(pila,6,28,'<h><</h>ListaVar>')
                            break;
                        case 'r9':
                            coordenada = 'R9 <h><</h>DefFunc> ::= tipo identificador ( <h><</h>Parametros> ) <h><</h>BloqFunc>'
                            this.asignReality(coordenada)
                            this.executePop(pila,12,29,'<h><</h>DefFunc>')
                            break;
                        case 'r10':
                            coordenada = 'R10 <h><</h>Parametros> ::= /\e'
                            this.asignReality(coordenada)
                            this.executePop(pila,0,30,'<h><</h>Parametros> ')
                            break;
                        case 'r11':
                            coordenada = 'R11 <h><</h>Parametros> ::= tipo identificador <h><</h>ListaParam>'
                            this.asignReality(coordenada)
                            this.executePop(pila,6,30,'<h><</h>Parametros>')
                            break;
                        case 'r12':
                            coordenada = 'R12 <h><</h>ListaParam> ::= /\e '
                            this.asignReality(coordenada)
                            this.executePop(pila,0,31,'<h><</h>ListaParam>')
                            break;
                        case 'r13':
                            coordenada = 'R13 <h><</h>ListaParam> ::= , tipo identificador <h><</h>ListaParam>'
                            this.asignReality(coordenada)
                            this.executePop(pila,8,31,'<h><</h>ListaParam>')
                            break; 
                        case 'r14':
                            coordenada = 'R14 <h><</h>BloqFunc> ::= { <h><</h>DefLocales> } '
                            this.asignReality(coordenada)
                            this.executePop(pila,6,32,'<h><</h>BloqFunc>')
                            break; 
                        case 'r15':
                            coordenada = 'R15 <h><</h>DefLocales> ::= /\e'
                            this.asignReality(coordenada)
                            this.executePop(pila,0,33,'<h><</h>DefLocales>')
                            break;
                        case 'r16':
                            coordenada = 'R16 <h><</h>DefLocales> ::= <h><</h>DefLocal> <h><</h>DefLocales>'
                            this.asignReality(coordenada)
                            this.executePop(pila,4,33,'<h><</h>DefLocales> ')
                            break;
                        case 'r17':
                            coordenada = 'R17 <h><</h>DefLocal> ::= <h><</h>DefVar>'
                            this.asignReality(coordenada)
                            this.executePop(pila,2,34,'<h><</h>DefLocal>')
                            break;
                        case 'r18':
                            coordenada = 'R18 <h><</h>DefLocal> ::= <h><</h>Sentencia>'
                            this.asignReality(coordenada)
                            this.executePop(pila,2,34,'<h><</h>DefLocal>')
                            break; 
                        case 'r19':
                            coordenada = 'R19 <h><</h>Sentencias> ::= /\e'
                            this.asignReality(coordenada)
                            this.executePop(pila,0,35,'<h><</h>Sentencias>')
                            break;
                        case 'r20':
                            coordenada = 'R20 <h><</h>Sentencias> ::= <h><</h>Sentencia> <h><</h>Sentencias>'
                            this.asignReality(coordenada)
                            this.executePop(pila,4,35,'<h><</h>Sentencias>')
                            break;
                        case 'r21':
                            coordenada = 'R21 <h><</h>Sentencia> ::= identificador = <h><</h>Expresion> ;'
                            this.asignReality(coordenada)
                            this.executePop(pila,8,36,'<h><</h>Sentencia>')
                            break;
                        case 'r22':
                            coordenada = 'R22 <h><</h>Sentencia> ::= if ( <h><</h>Expresion> ) <h><</h>SentenciaBloque> <h><</h>Otro>'
                            this.asignReality(coordenada)
                            this.executePop(pila,12,36,'<h><</h>Sentencia>')
                            break;
                        case 'r23':
                            coordenada = 'R23 <h><</h>Sentencia> ::= while ( <h><</h>Expresion> ) <h><</h>Bloque> '
                            this.asignReality(coordenada)
                            this.executePop(pila,10,30,'<h><</h>Sentencia> ')
                            break;
                        case 'r24':
                            coordenada = 'R24 <h><</h>Sentencia> ::= return <h><</h>ValorRegresa> ;'
                            this.asignReality(coordenada)
                            this.executePop(pila,6,36,'<h><</h>Sentencia>')
                            break;
                        case 'r25':
                            coordenada = 'R25 <h><</h>Sentencia> ::= <h><</h>LlamadaFunc> ;'
                            this.asignReality(coordenada)
                            this.executePop(pila,4,36,'<h><</h>Sentencia>')
                            break;
                        case 'r26':
                            coordenada = 'R26 <h><</h>Otro> ::= /\e'
                            this.asignReality(coordenada)
                            this.executePop(pila,0,37,'<h><</h>Otro> ')
                            break;
                        case 'r27':
                            coordenada = 'R27 <h><</h>Otro> ::= else <h><</h>SentenciaBloque> '
                            this.asignReality(coordenada)
                            this.executePop(pila,4,37,'<h><</h>Otro> ')
                            break;
                        case 'r28':
                            coordenada = 'R28 <h><</h>Bloque> ::= { <h><</h>Sentencias> } '
                            this.asignReality(coordenada)
                            this.executePop(pila,6,38,'<h><</h>Bloque>')
                            break;
                        case 'r29':
                            coordenada = 'R29 <h><</h>ValorRegresa> ::= /\e'
                            this.asignReality(coordenada)
                            this.executePop(pila,0,39,'<h><</h>ValorRegresa>')
                            break;
                        case 'r30':
                            coordenada = 'R30 <h><</h>ValorRegresa> ::= <h><</h>Expresion>'
                            this.asignReality(coordenada)
                            this.executePop(pila,2,39,'<h><</h>ValorRegresa>')
                            break;
                        case 'r31':
                            coordenada = 'R31 <h><</h>Argumentos> ::= /\e '
                            this.asignReality(coordenada)
                            this.executePop(pila,0,40,'<h><</h>Argumentos> ')
                            break;
                        case 'r32':
                            coordenada = 'R32 <h><</h>Argumentos> ::= <h><</h>Expresion> <h><</h>ListaArgumentos>'
                            this.asignReality(coordenada)
                            this.executePop(pila,4,40,'<h><</h>Argumentos>')
                            break;
                        case 'r33':
                            coordenada = 'R33 <h><</h>ListaArgumentos> ::= /\e'
                            this.asignReality(coordenada)
                            this.executePop(pila,0,41,'<h><</h>ListaArgumentos>')
                            break;
                        case 'r34':
                            coordenada = 'R34 <h><</h>ListaArgumentos> ::= , <h><</h>Expresion> <h><</h>ListaArgumentos>'
                            this.asignReality(coordenada)
                            this.executePop(pila,6,41,'<h><</h>ListaArgumentos>')
                            break;
                        case 'r35':
                            coordenada = 'R35 <h><</h>Termino> ::= <h><</h>LlamadaFunc>'
                            this.asignReality(coordenada)
                            this.executePop(pila,2,42,'<h><</h>Termino>')
                            break;
                        case 'r36':
                            coordenada = 'R36 <h><</h>Termino> ::= identificador '
                            this.asignReality(coordenada)
                            this.executePop(pila,2,42,'<h><</h>Termino>')
                            break;
                        case 'r37':
                            coordenada = 'R37 <h><</h>Termino> ::= entero '
                            this.asignReality(coordenada)
                            this.executePop(pila,2,42,'<h><</h>Termino>')
                            break;
                        case 'r38':
                            coordenada = 'R38 <h><</h>Termino> ::= real'
                            this.asignReality(coordenada)
                            this.executePop(pila,2,42,'<h><</h>Termino>')    
                        break;
                        case 'r39':
                            coordenada = 'R39 <h><</h>Termino> ::= cadena'
                            this.asignReality(coordenada)
                            this.executePop(pila,2,42,'<h><</h>Termino>')
                            break;
                        case 'r40':
                            coordenada = 'R40 <h><</h>LlamadaFunc> ::= identificador ( <h><</h>Argumentos> )'
                            this.asignReality(coordenada)
                            this.executePop(pila,8,43,'<h><</h>LlamadaFunc>')
                            break;
                        case 'r41':
                            coordenada = 'R41 <h><</h>SentenciaBloque> ::= <h><</h>Sentencia>'
                            this.asignReality(coordenada)
                            this.executePop(pila,2,44,'<h><</h>SentenciaBloque>')
                            break;
                        case 'r42':
                            coordenada = 'R42 <h><</h>SentenciaBloque> ::= <h><</h>Bloque> '
                            this.asignReality(coordenada)
                            this.executePop(pila,2,44,'<h><</h>SentenciaBloque>')
                            break;
                        case 'r43':
                            coordenada = 'R43 <h><</h>Expresion> ::= ( <h><</h>Expresion> )'
                            this.asignReality(coordenada)
                            this.executePop(pila,6,45,'<h><</h>Expresion>')
                            break;
                        case 'r44':
                            coordenada = 'R44 <h><</h>Expresion> ::= opSuma <h><</h>Expresion>'
                            this.asignReality(coordenada)
                            this.executePop(pila,4,45)
                            break;
                        case 'r45':
                            coordenada = 'R45 <h><</h>Expresion> ::= opNot <h><</h>Expresion>'
                            this.asignReality(coordenada)
                            this.executePop(pila,4,45,'<h><</h>Expresion>')
                            break;
                        case 'r46':
                            coordenada = 'R46 <h><</h>Expresion> ::= <h><</h>Expresion> opMul <h><</h>Expresion>'
                            this.asignReality(coordenada)
                            this.executePop(pila,6,45,'<h><</h>Expresion>')
                            break;
                        case 'r47':
                            coordenada = 'R47 <h><</h>Expresion> ::= <h><</h>Expresion> opSuma <h><</h>Expresion> '
                            this.asignReality(coordenada)
                            this.executePop(pila,6,45,'<h><</h>Expresion>')
                            break;
                        case 'r48':
                            coordenada = 'R48 <h><</h>Expresion> ::= <h><</h>Expresion> opRelac <h><</h>Expresion>'
                            this.asignReality(coordenada)
                            this.executePop(pila,6,45,'<h><</h>Expresion> ')
                            break;
                        case 'r49':
                            coordenada = 'R49 <h><</h>Expresion> ::= <h><</h>Expresion> opIgualdad <h><</h>Expresion> '
                            this.asignReality(coordenada)
                            this.executePop(pila,6,45,'<h><</h>Expresion>')
                            break;
                        case 'r50':
                            coordenada = 'R50 <h><</h>Expresion> ::= <h><</h>Expresion> opAnd <h><</h>Expresion> '
                            this.asignReality(coordenada)
                            this.executePop(pila,6,45,'<h><</h>Expresion>')
                            break;
                        case 'r51':
                            coordenada = 'R51 <h><</h>Expresion> ::= <h><</h>Expresion> opOr <h><</h>Expresion> '
                            this.asignReality(coordenada)
                            this.executePop(pila,6,45,'<h><</h>Expresion> ')
                            break;
                        case 'r52':
                            coordenada = 'R52 <h><</h>Expresion> ::= <h><</h>Termino> '
                            this.asignReality(coordenada)
                            this.executePop(pila,2,45,'<h><</h>Expresion>')
                            break;
                        default:
                            break;
                    }
                    break;
                //#endregion
                case 'd':
                    tableSintacticoR +='<tr class="rowlr"><th class="rowlr">'+this.dropCom(this.PR)+
                            '</th><th class="rowlr">'+this.dropCom(this.ER) + '</th><th class="rowlr">'+
                            coordenada+'</th></tr>'
                    let numE = coordenada.substring(1,coordenada.length)
                    this.PR.push(xR)
                    pila.push(x)
                    this.PR.push(numE)
                    pila.push(numE)
                    this.ER.shift()
                    entrada.shift()
                    console.log(coordenada)
                    break;
                default:
                    // if (!num.test(coordenada.charAt(0))) {//
                    //     console.log("Error")
                    //     return
                    // }
                    console.log("Error")

                    break;
            }
            
            i++
            salida.push(coordenada)
            if (i==100) {
                break;
            }

        }
        //console.log(this.arrayLexico)
    }
    }
//////////
var error ="error";
class Analisis{
    constructor(inpu){
        this.pointCReplace = false;
        this.input=inpu;
        this.preanalisis;
        this.actual=0;
        this.matrix = [];
        this.matrixTree = [];   
        this.restricted = ["if","while", "return", "else","int","float","void","string"];
        table='';
        //this.isElse=false;
        this.ticket=1;
        this.lexico = [];
        this.labelCount=1;
        this.matrixOrder=[];
    }
    executeLexico(){
        // this.lexico.push(["tipo",4,"int"])
        //console.log("lexico execution")
        //alert(this.lexico)
        tableLexico = '<table class="default">'+
        '<tr class="row"><th>Simbolo</th><th>Tipo</th><th>Valor</th></tr>'
        let nr=this.lexico.length/3;
        //alert(nr)
        let temp = nr
        for (let i = 0; i < this.lexico.length; i++) {
                tableLexico += '<tr><td>' + this.lexico[i][0]
                +'</td><td>'+this.lexico[i][1]+'</td>'
                +'<td>'+ this.lexico[i][2]+'</td>'
                +'</tr>';
                nr--
                if (nr<=0) {
                    nr=temp;
                    tableLexico += '<table class="default">'+
        '<tr class="row"><th>Simbolo</th><th>Tipo</th><th>Valor</th></tr>'
                }
        }
        tableLexico += '</table>'
    }
    print(){
        //alert(this.matrix)
        for (let i = 0; i < this.matrix.length; i++) {
            if (this.matrix[i][0].length==3 || this.matrix[i][0].length==5){
                table += '<div class="row">' +i
                +'<div class="div">'+this.matrix[i][0]+'</div>'
                +'<div class="void">'+ this.matrix[i][1]+'</div>'
                +'</div>';
            }
            else
                if (operation.test(this.matrix[i][0])||simbol.test(this.matrix[i][0])){
                    //alert("table")
                    table += '<div class="row">'+i
                    +'<div class="div">'+this.matrix[i][0]+'</div>'
                    +'<div class="div">'+this.matrix[i][1]+'</div>'
                    +'<div class="div">'+ this.matrix[i][2]+'</div>'
                    +'</div>';
                }
        }
    }
    ExecuteTreeCode(){
        // console.log(this.matrixTree)
        for (let i = 0; i < this.matrixTree.length; i++) {
            //alert(this.matrixTree[i])
            //console.log()
            let t = this.isTicket(this.matrixTree[i])
            //alert(this.matrixTree[i]+" "+t)
            if (t) {
                table3 += '<div class="row">' +this.matrixTree[i]+'</div>';
            }
            else
            if (this.matrixTree[i].length==4){
            //if(this.matrixTree[i][0]!="L"){
                table3 += '<div class="row">' +this.matrixTree[i][0]+" = "+
                this.matrixTree[i][1]+this.matrixTree[i][2]+this.matrixTree[i][3]
                +';</div>';
            }
            else
            table3 += '<div class="row">' +this.matrixTree[i]+'</div>';
        }
    }
    isTicket(param){
        if(Array.isArray(param))
            return false;
        if(param.charAt(0)!="L")
            return false;
        for (let i = 1; i < param.length-1; i++) {
            if(!num.test(param.charAt(i)))
                return false;
        }
        if (param.charAt(param.length-1)!=":") {
            return false;
        }
        //alert(param+" is true")
        return true;
    }

    exist(param){
        for (let i = 0; i < this.matrix.length; i++) {
            if ((""+this.matrix[i])==(""+param)) {
                return true;
            }
        }
        return false;
    }

    index(param){
        for (let i = 0; i < this.matrix.length; i++) {
            if ((""+this.matrix[i])==(""+param)) {
                return i;
            }
        }
    }

    restrict(param){
        for (let i = 0; i < this.restricted.length; i++) {
            if ((""+this.restricted[i])==(""+param)) {
                return true;
            }
        }
        return false;
    }
    //Second part
    exopparent(){
        try {
            this.preanalisis = this.input.charAt(this.actual);
            if (openparent.test(this.preanalisis)) {
                    this.lexico.push(["(",14,"("])
                    //console.log("(")
                    this.actual++;
                    return "";
            }
            else{
                error =  "Abre un parentesis :)";
                throw error;
            }
            
        } catch (e) {
            //alert("error en exopparent()")
            this.ExecError();
            throw new FatalError("Something went badly wrong!");
        }
    }
    exclosarent(){
        try {
            this.preanalisis = this.input.charAt(this.actual);
            if (closeparent.test(this.preanalisis)) {
                    this.lexico.push([")",15,")"])
                    //console.log(")");
                    this.actual++;
                    return "";
            }
            else{
                error = "Cierra un parentesis ;)";
                throw error;
            }
            
        } catch (e) {
            this.ExecError();
            throw new FatalError("Something went badly wrong!");
        }
    }
    coincidir(parameter) {
        try{
        if (num.test(parameter)||simbol.test(parameter)||operation.test(parameter)||
            openparent.test(parameter)||parameter==";"||closeparent.test(parameter)||leng.test(parameter)) {
            return true;
        }
        error = this.input+"  no es una expresion valida, el caracter "+parameter+" es desconocido";
        throw error;
        }   
        catch (e) {
            //alert("error en coincidr")
            this.ExecError();
            throw new FatalError("Something went badly wrong!");
        }
    }

    puntoComa(){
        try{
            this.preanalisis = this.input.charAt(this.actual);
            if (this.preanalisis == ";") {
                    if(!this.pointCReplace){
                        this.lexico.push([";",12,";"])
                        //console.log(";")
                    }else{
                        this.pointCReplace = false;
                        this.preanalisis = "}"
                    }
                        
                    
                    this.actual++;
                    return this.preanalisis;
            }
            error = this.input+"  no es una expresion valida, el caracter "+parameter+" es desconocido";
            throw error;
        }   
        catch (e) {
            //alert("error en puntoComa "+this.input.charAt(this.actual))
            this.ExecError();
            throw new FatalError("Something went badly wrong!");
        }
    }
    tipo(){
        try{
            let temp = this.input.substring(this.actual,this.actual+3);
            let tems  = this.input.substring(this.actual,this.actual+5);
            let tempString = this.input.substring(this.actual,this.actual+6);
            if (tempString=="string") {
                this.lexico.push(["tipo",4,"string"])
                this.actual += 6;
                return tempString
            } else
            if (temp=="int") {
                this.lexico.push(["tipo",4,"int"])
                //console.log("int")
                this.actual+=3;

                return temp;
            }
            else if (tems=="float") {
                this.lexico.push(["tipo",4,"float"])
                //console.log("float")
                this.actual+=5;
                return tems;
            }
            error = "Se produjo un error en el tipo de dato, verifique su declaracion";
            throw error;
        }   
        catch (e) {
            //alert("error en tipo")
            this.ExecError();
            throw new FatalError("Something went badly wrong!");
        }
    }
    end(){
        try{
            
            let temp  = this.input.substring(this.actual,this.actual+1);
            if (temp=="}") {
                //console.log("} simple")
                // this.input.replaceAt(this.actual) = ";";
                // alert(this.input[this.actual])
                //this.actual++;
                return temp;
            }
            error = "Se esperava terminar con }";
            throw error
        }   
        catch (e) {
            //alert("error en end")
            this.ExecError();
            throw new FatalError("Something went badly wrong!");
        }
    }
    punto(){
        try{
            this.preanalisis = this.input.charAt(this.actual);
            if (this.preanalisis==".") {
                this.actual++;
                return this.preanalisis;
            }
            error = "Se esperava un .";
            throw error;
        }   
        catch (e) {
            //alert("error en punto")
            this.ExecError();
            throw new FatalError("Something went badly wrong!");
        }
    }
    endWhile(){
        try{
            let temp  = this.input.substring(this.actual,this.actual+1);
            if (temp=="}") {
                //this.actual+=1;
                this.lexico.push(["}",17,"}"])
                //console.log("}")
                return temp;
            }

            error = "Cierra el parentesis del bucle while";
            throw error;
        }   
        catch (e) {
            //alert("error en endWhile")
            this.ExecError();
            throw new FatalError("Something went badly wrong!");
        }
    }
    exp_arit(){
        this.preanalisis = this.input.charAt(this.actual);
        if (simbol.test(this.preanalisis)) {
            //alert("Simbol")
            this.lexico.push(["opSuma",5,this.preanalisis])
            //console.log(this.preanalisis)
            this.actual++;
            let temp = this.preanalisis;
            let eas=this.expresion_arit();
            //alert("expresion_arit: "+eas)
            let eam=this.exp_arit();
            //console.log("exp_arit simbol: "+temp+eam + eas);
            return temp+eam + eas;
        }
        else if(operation.test(this.preanalisis)){
            this.actual++;
            this.lexico.push(["opMul",6,this.preanalisis])
            //console.log(this.preanalisis)
            let temp = this.preanalisis;
            let eas=this.expresion_arit();
            //console.log("tengo mi esxpresio arit: "+eas)
            let eam=this.exp_arit();
            //console.log("exp_arit operation: eam: "+eam +" temp: "+temp+"eas: "+ eas)
            return eam +temp+ eas ;
        }
        else
            return "";
    }
    expresion_arit(){
        try{
            this.preanalisis = this.input.charAt(this.actual);
            //alert("expresion aritmetica")
            //console.log("que es: "+this.preanalisis)
            // if (tipo == "string") {
                if (this.preanalisis=="'" || this.preanalisis=='"') {
                let token = "error"
                if (this.preanalisis == "'") {
                    token = "'"
                }else if (this.preanalisis == "\"") {
                    token = "\""
                }
                if (token == "error") {
                    error =  this.preanalisis + " no es un ' ni \" asigne un string de esta manera";
                    throw error; 
                }
                this.actual++
                let returnCad = ""
                while(this.input.charAt(this.actual)!=token){
                    returnCad += this.input.charAt(this.actual)
                    this.actual++
                    if (this.actual == (this.input.length-1)) {
                        error =  "cierra la cadena con " + token;
                        throw error;
                    }
                }
                this.lexico.push(["string",25,returnCad])
                this.actual++
                return returnCad
            }
            let tem;
            if (this.preanalisis=="("){
                //console.log("es un parentesis "+this.preanalisis)
                let op = this.exopparent();
                let ea = this.expresion_arit();
                return op+ea+this.exclosarent()+this.exp_arit();
            }
            else if (num.test(this.preanalisis)){
                //console.log("es un numero "+this.preanalisis)
                let n = this.numeros();
                //alert("estos en numero: ")
                let e = this.exp_arit();
                // if(!numf.test(n) && tipo == "float")
                //         tipo = "int"
                // if(!this.exist([tipo,n])){
                    
                //     this.matrix.push([tipo,n])
                // }
                    
                n = n+e;
                e = this.getVal(n);

                var e1 = this.getVal(n.substring(e.length+1,n.length));
                var e2 = n.substring(e.length,e.length+1);
                if (e.length>0 && e2.length>0 && e1.length>0){
                     let var1 = this.getVal(n);
                     let var2 = this.getVal(n.substring(var1.length+1,n.length));
                     this.matrixTree.push(["t"+(this.labelCount),
                     var1,n.substring(var1.length,var1.length+1),var2]);
                     //this.matrix.push([tipo,"t"+(this.labelCount)]);
                     this.labelCount++;
                     return "t"+(this.labelCount-1);
                 }
                return n;
            }else
                tem = this.getIsString();
                // console.log(tipo + " "+tem+" " +this.matrix)

                if (tem.length>0/*this.exist([tipo,tem])*/){
                    //console.log("es un un id "+this.preanalisis)
                    
                    let id  =  this.identificador();
                    
                    this.lexico.push(["identificador",0,id])
                    //console.log(id)
                    let ea=this.exp_arit();
                    //alert("id")
                    //alert("sali de mi expresion"+ea)
                    let temp = id+ea;
                    id = this.getIdSimbol(id);
                    ea = id+ea;
                    var e0 = this.getVal(ea);
                    var e1 = this.getVal(ea.substring(e0.length+1,ea.length));
                    var e2 = ea.substring(e0.length,e0.length+1);
                    //alert(e0+e2+e1+" my temp"+temp)
                    if (e0.length>0 && e1.length>0 && e2.length>0){
                         let var1 = this.getVal(temp);
                         let var2 = this.getVal(temp.substring(var1.length+1,temp.length));
                         this.matrixTree.push(["t"+(this.labelCount),
                         var1,temp.substring(var1.length,var1.length+1),var2]);
                         //this.matrix.push([tipo,"t"+(this.labelCount)]);
                         this.labelCount++;
                         return "t"+(this.labelCount-1);
                     }
                    return temp;
                }
                /*if (this.exist(["float",tem])) {
                    error =  tem + " es un tipo de dato float no compatible con int";
                    throw error; 
                }*/


                if (tem.length==0) {
                    tem = this.input.charAt(this.actual)
                }
                error =  "Expresion aritmetica no valida: "+tem+" no se reconoce como una variable de tipo "+tipo;
                throw error;
        }   
        catch (e) {
            //alert("error en expresion_arit")
            this.ExecError();
            throw new FatalError("Something went badly wrong!");
        }
    }
    getVal(input){
        let temp = 0;
        let ret="";
        for (let i = temp; i < input.length; i++) {
             if(num.test(input.charAt(i))||letra.test(input.charAt(i))||input.charAt(i)==".")
                ret+=input.charAt(i);
            else return ret;
        }
        return ret;
    }


    getIdSimbol(param){
        let id=0;
        for (id = 0; id < this.matrix.length; id++) {
            if (this.matrix[id][1]==param) {
                return id;
            }
        }
        return param;
    }

    asignar(){
        try{
            let ida = this.identificador();
            this.lexico.push(["identificador",0,ida])
            //console.log(ida)
            //alert("Asignar: "+ida)
            // if (!this.exist([tipo,ida])) {
            //    error = "La variable "+ida+" de tipo " + tipo + " no existe";
            //     throw error;
            // }
            this.preanalisis  = this.input.substring(this.actual,this.actual+1);
            if (this.preanalisis=="=") {
                
                //console.log("=")
                this.lexico.push(["=",18,"="])
                this.actual++;
                let temp = this.preanalisis;
                
                let ea = this.expresion_arit();
                //alert("Equal")
                //alert("sali: "+ida)
                //console.log("Asignar: "+ida+" "+temp+" "+ea);
                //alert(ea)

                let t1 = this.getVal(ea);
                let s = ea.substring(t1.length,t1.length+1)
                //alert("ea: "+ea+" s: "+s)
                let t2 = this.getVal(ea.substring(t1.length+1,ea.length));
                //alert("t1: "+t1+" S: "+s+" t2: "+t2);
                this.matrixTree.push([ida,t1,
                     s,t2]);
                //this.matrix.push([tipo,"t"+(this.labelCount)]);
                //this.labelCount++;
                // console.log("Dimention: "+this.matrixTree.length);
                //alert(ida+temp+ea)
                return ida+temp+ea;
            }
            error = "Se produjo un error al asignar";
            throw error;
        }   
        catch (e) {
            //alert("error en asignar")
            this.ExecError();
            throw new FatalError("Something went badly wrong!");
        }

    }

    bucle_while(){
        try{
            this.preanalisis  = this.input.substring(this.actual,this.actual+5);
            if (this.preanalisis=="while") {
                //console.log("while")
                this.lexico.push(["while",20,"while"])
                this.actual+=5;
                let pt = this.preanalisis;
                let op = this.exopparent();
                let co = this.contitionsAll()
                //let co = this.comparacion();
                
                //onsole.log("While is ok")
                let ex = this.exclosarent();
                
                //console.log("While is ok")
                this.matrixTree.push("L"+this.ticket+":");
                let temp = this.ticket;
                this.ticket++;
                this.matrixTree.push("if("+co+") goto L"+this.ticket+";");
                this.ticket++;
                let temp2 = this.ticket;
                this.matrixTree.push("goto L"+this.ticket+";");
                this.matrixTree.push("L"+(this.ticket-1)+":");
                
                let keyOpen = this.input.charAt(this.actual);
                if(keyOpen !="{"){
                    error = "Habra una llave para: while("+op+co+ex+")";
                    throw error;
                }
                this.lexico.push(["{",16,"{"])
                //console.log("{")
                this.actual++;
                let or = this.ordenes();
                
                let en = this.endWhile();
                // console.log("pt: "+pt+" op: "+op+" co: "+co+" ex: "+
                //             ex+" or: "+or+" en: "+en)
                this.matrixTree.push("goto L"+temp+";")
                this.matrixTree.push("L"+temp2+":")

                return pt+op+co+ex+or
                    +en;
            }
            error = "Se esperava un while";
            throw error;
                    }   
            catch (e) {
                //alert("error en bucle_while")
                this.ExecError();
                throw new FatalError("Something went badly wrong!");
                }
        
    }
    numero_real(){
        let ent = this.numero_entero();
        let p = this.punto()+this.numero_entero();
        return ent+p;
    }
    numero_entero(){
        try{
            this.preanalisis = this.input.charAt(this.actual);
            if (num.test(this.preanalisis)) {
                let temp = this.input.charAt(this.actual+1);
                this.actual++;
                if (num.test(temp)) {
                        return this.preanalisis+this.numero_entero();
                    }
                else
                    return this.preanalisis;
                
            }
            error = "Error en numero entero";
            throw error;
        }   
        catch (e) {
            //alert("error en numero_entero")
            this.ExecError();
            throw new FatalError("Something went badly wrong!");
        }
    }
    getNumber(){
        let i = this.actual;
        let temp="";
        //alert("obteniendo numero: "+this.input.charAt(this.actual))
        while(num.test(this.input.charAt(i))||this.input.charAt(i)=="."){
            temp+=this.input.charAt(i);
            i++;
        }
        return temp;
    }
    numeros(){
        try{
            this.preanalisis = this.input.charAt(this.actual);
            let tem  = this.getNumber();
            //alert("numeros: "+tem)
            // if (numf.test(tem) && tipo == "int") {
            //     error = "No se puede asignar un float a int, " + tem + " es un numero real";
            //     throw error;
            // }
            if (numf.test(tem)) {
                let p = this.numero_real();
                this.lexico.push(["real",2,p])
                //console.log(p)
                return p;
            }else
                if (num.test(tem)) {
                    let p = this.numero_entero();
                    this.lexico.push(["entero",1,p])
                    //console.log(p)
                    return p;
                }
            error = "No es un numero entero o real";
            throw error;
            }   
            catch (e) {
                //alert("error en numeros")
                this.ExecError();
                throw new FatalError("Something went badly wrong!");
            }
    }

    operador(){
        try{
            this.preanalisis = this.input.charAt(this.actual);
            let temp = this.getIsString();
            if (temp.length>0/*this.exist(["int",temp]) || this.exist(["float",temp])*/) {
                temp = this.identificador();
                this.lexico.push(["identificador",0,temp])
                //console.log(temp)
                return temp;
            }
            else
                if (num.test(this.preanalisis)) { 
                    return this.numeros();
                }
                error = "Se esperava un identificador o un numero";
                throw error
            }   
            catch (e) {
                //alert("error en operador")
                this.ExecError();
                throw new FatalError("Something went badly wrong!");
                //this.isElse=false; went badly wrong!");
            }
        
    }

    comparacion(){
        let op = this.operador();
        let cp = this.condicion_op();
        let o = this.operador();
        return op+cp+o;
    }
    condicion_op(){
        try{
            let act = this.input.substring(this.actual,this.actual+2);
            if (act=="<="||act==">="||act=="!="||act=="==") {
                if (act=="<="||act==">=") {
                    this.lexico.push(["opRelac",7,act])
                    // console.log(act)
                }else{
                    this.lexico.push(["opIgualdad",11,act])
                    //console.log(act)
                }
                    
                
                this.actual+=2;
                return act;
            }
            act = this.input.charAt(this.actual);
                if (act=="<"||act==">") {
                    this.lexico.push(["opRelac",7,act])
                    //console.log(act)
                    this.actual++;
                    return act;
                }
                error = "Se esparaba un simbolo de condicion";
                throw error;
            }   
            catch (e) {
                //alert("error en condicion_op")
                this.ExecError();
                throw new FatalError("Something went badly wrong!");
            }
    }

    sig_condicion(){
        let temend  = this.input.substring(this.actual,this.actual+1);
        let temelse  = this.input.substring(this.actual,this.actual+6);
        
        try{
            if(temelse=="}else{"){
                    this.lexico.push(["}",17,"}"])
                    this.lexico.push(["else",22,"else"])
                    this.lexico.push(["{",16,"{"])
                    //console.log("}else{")
                    //alert("else ok")
                    //this.matrixTree.push("goto L"+(this.ticket+2)+";");
                    //this.matrixTree.push("L"+
                    //this.isElse=false;(this.ticket+1)+":");
                    //this.ticket++;
                    //this.isElse=true;
                    //alert(this.isElse)
                    this.actual+=6;
                    return temelse + this.ordenes()+this.end();
                
            }
            else
                if (temend=="}"){
                    this.lexico.push(["}",17,"}"])
                    

                    temend = this.end();
                    //console.log("}")
                    return temend;

                }
            error = "Error en la siguiente condicion";
            throw error;
        }   
        catch (e) {
            //alert("error en sig_condicion")
            this.ExecError();
            throw new FatalError("Something went badly wrong!");
        }
    }
    // reOrder(param){
    //     let matrixTemp=[];
    //     for (let i = this.matrixTree.length-1; i >=0; i--) {
    //         matrixTemp.push(this.matrixTree[i]);
    //         this.matrixTree.pop();
    //     }
    //     this.matrixTree.push(param+this.ticket+";");
    //     this.ticket++;
    //     this.matrixTree.push("goto L"+this.ticket+";");
    //     this.matrixTree.push("L"+(this.ticket-1)+":");
    //     for (let i = matrixTemp.length-1; i >=0; i--) {
    //         this.matrixTree.push(matrixTemp[i]);
    //         matrixTemp.pop();
    //     }
    //     let t1=0;
    //     if (this.isElse){
    //         this.isElse=false;
    //         t1=1;
    //     }

    //     this.matrixTree.push("L"+(this.ticket+t1)+":");
    //     this.ticket++;

    // }
    contitionsAll(){
        let isOtherCondition = true;
        let cp="";
        while (isOtherCondition) {
            cp += this.comparacion();
            let idNext = this.input.substring(this.actual,this.actual+2);
            if (idNext == "&&" || idNext == "||"){
                if (idNext == "&&") {
                    this.lexico.push(["opAnd",9,idNext])
                    //console.log(idNext)
                }else{
                    this.lexico.push(["opOr",8,idNext])
                    //console.log(idNext)
                }
                isOtherCondition = true;
                cp+=idNext;
                this.actual += 2;
            }
            else
                isOtherCondition =false;
        }
        return cp;
    }
    condicion(){
        try{
            this.preanalisis = this.input.substring(this.actual,this.actual+2);
            if(this.preanalisis=="if"){
                this.lexico.push(["if",19,"if"])
                //console.log("if")
                this.actual+=2;
                let op = this.exopparent();
                let cp =this.contitionsAll()
                // let isOtherCondition = true;
                // let cp="";
                // while (isOtherCondition) {
                //     cp += this.comparacion();
                //     let idNext = this.input.substring(this.actual,this.actual+2);
                //     if (idNext == "&&" || idNext == "||"){
                //         isOtherCondition = true;
                //         cp+=idNext;
                //         this.actual += 2;
                //     }
                //     else
                //         isOtherCondition =false;
                // }
                // alert(cp)
                 

                let clp = this.exclosarent();
                this.matrixTree.push("if("+op+cp+clp+") goto L"+this.ticket+";");
                this.ticket++;
                this.matrixTree.push("goto L"+this.ticket+";");
                this.matrixTree.push("L"+(this.ticket-1)+":");
                let temp=this.ticket;
                this.ticket++;
                if (this.input.charAt(this.actual) == "{") {
                    this.lexico.push(["{",16,"{"])
                    //console.log("{")
                    this.actual ++;
                }else{
                    error = "Se esperaba un {";
                    throw error;
                }
                let ord = this.ordenes();
                //this.isElse=false;
                //alert(this.isElse)
                //this.ticket++;
                
                
                this.preanalisis = this.input.charAt(this.actual);
                //alert(this.input.substring(this.actual,(this.actual+4)))
                let endTicket=-1;
                if(this.input.substring(this.actual,(this.actual+4))=="}else"){
                    endTicket=(temp+1);
                    this.matrixTree.push("goto L"+(temp+1)+";");
                    this.matrixTree.push("L"+temp+":");
                }
                let sc = this.sig_condicion(); 
                if (endTicket!=-1) {
                    this.matrixTree.push("L"+endTicket+":");
                }
                else{
                    this.matrixTree.push("L"+temp+":");
                }
                //alert()
                //this.reOrder("if("+op+cp+clp+") goto L");
                //this.matrixTree.push("if("+op+cp+clp+") goto L"+this.matrixTree.length);
                //console.log("if("+op+cp+clp+") goto L"+this.matrixTree.length)//+ord+sc)
                // console.log(op+cp+clp+ord+sc)
                // console.log("if("+op+cp+clp+") goto L")
                return op+cp+clp+ord+sc;
            }
            error = "Se esperava una condicion";
            throw error;
        }   
        catch (e) {
            //alert("error en condicion")
            this.ExecError();
            throw new FatalError("Something went badly wrong!");
        }     
    }


    orden(){
        try{
            let tempif = this.input.substring(this.actual,this.actual+2);
            let tempwhile = this.input.substring(this.actual,this.actual+5);
            let tempint = this.input.substring(this.actual,this.actual+3);      
            let returnVal = this.input.substring(this.actual,this.actual+6);  

            let tempasignar;
            // alert(tempwhile)
            tempasignar = this.getIsString();
            //alert(tempasignar)
            //alert(tempasignar)
            /*
            if (this.exist(["string",tempasignar])) {
                let as = this.asignar("string");
                //alert("Orden asignacion: "+as);
                this.preanalisis = this.input.charAt(this.actual);
                return as;
            }
            if (this.exist(["float",tempasignar])) {
                let as = this.asignar("float");
                
                //alert("Orden asignacion: "+as);
                this.preanalisis = this.input.charAt(this.actual);
                return as;
            }else if(this.exist(["int",tempasignar])){
                
                let as = this.asignar("int");
                //alert("Orden asignacion: "+as);
                this.preanalisis = this.input.charAt(this.actual);
                return as;
            }*/
            if (tempif=="if") {
                let cond = this.condicion();
                this.input = this.input.replaceAt(this.actual, ';');
                this.pointCReplace = true;
                //console.log("sali del if: "+this.input.charAt(this.actual))
                return cond;
            }else
                if (tempwhile=="while") {
                    //console.log("In the bucle while")
                   //console.log("In the while")
                   let bW = this.bucle_while();
                   this.input = this.input.replaceAt(this.actual, ';');
                   this.pointCReplace = true;
                    //console.log("sali del while: "+this.input.charAt(this.actual))
                    return bW;
                }
                else if (tempint == "int" || tempwhile=="float" || returnVal == "string") {
                    // console.log("orden() declaration")
                    let dec = this.declaracion();
                    //alert("sali de la declaracion")
                    return dec
                }else if(returnVal == "return"){
                    this.actual += 6;
                    this.lexico.push(["return",21,"return"])
                    let isTipe = "float";
                    if(this.exist(["int",this.getIsString()]))
                        isTipe = "int";
                    //console.log("return")
                    let t1 = this.expresion_arit();
                    //alert(t1)

                    return  t1;
                }else if (tempasignar.length>0) {
                    
                    let as = this.asignar();
                    //alert("asignar")
                    this.preanalisis = this.input.charAt(this.actual);
                    return as;
                }
                
                else{
                    error = "El id "+tempasignar + " no esta declarado";
                    throw error;
                }
            
        }   
        catch (e) {
            //alert("error en orden")
            this.ExecError();
            throw new FatalError("Something went badly wrong!");
            }
    }
    getIsString(){
        let temp = this.actual;
        let ret="";
        for (let i = temp; i < this.input.length; i++) {
             if(num.test(this.input.charAt(i))||letra.test(this.input.charAt(i)))
                ret+=this.input.charAt(i);
            else return ret;
        }
        return ret;
    }
    sig_ordenes(){
        
        let tempif = this.input.substring(this.actual,this.actual+2);
        let tempwhile = this.input.substring(this.actual,this.actual+5);
        let tempasignar = this.getIsString();
        let tempReturn = this.input.substring(this.actual,this.actual+6);
        let isInt = this.input.substring(this.actual,this.actual+3);
        //alert("Siguientes ordenes")
        // alert("orden: "+tempif)
        if (tempReturn =="return" || tempif=="if"||tempwhile=="while"
            || tempasignar.length>0//this.exist(["int",tempasignar])||this.exist(["float",tempasignar])|| this.exist(["string",tempasignar])
            ||tempwhile == "float"|| isInt == "int" || tempReturn == "string" ) {
            //console.log("Orden por: " + tempwhile)
            //console.log(this.matrix)
            
            let o = this.orden()
            //alert("Sigorden")
            let p = this.puntoComa()
            let s = this.sig_ordenes();
            
            return o+p+s//this.orden()+this.puntoComa()+this.sig_ordenes();
        }
        else
            return "";
    }
    ordenes(){

        let or = this.orden();
        //alert(or)
        let pC = this.puntoComa();
        
        
        let SO = this.sig_ordenes();
        //alert("ok ordenes")
        this.preanalisis = this.input.charAt(this.actual)
        //console.log("Error")

        return or+pC+SO;
    }
    resto_letras(){
        try{
            this.preanalisis = this.input.charAt(this.actual);
            if(letra.test(this.preanalisis)||num.test(this.preanalisis)){
                let temporal = this.input.charAt(this.actual+1);
                this.actual++;
                if(letra.test(temporal)||num.test(temporal)){
                    return this.preanalisis + this.resto_letras();
                }
                return this.preanalisis;
            }
            error = "Error en el identificador a continuacion de: "+this.preanalisis;
            throw error;
        }   
        catch (e) {
            //alert("error en resto_letras")
            this.ExecError();
            throw new FatalError("Something went badly wrong!");
        }
    }
    identificador(){
        try{

            this.preanalisis = this.input.charAt(this.actual);
            //alert("identficador: "+this.input.substring(this.actual,this.input.length))
            if (letra.test(this.preanalisis)) {
                
                let temporal = this.input.charAt(this.actual+1);
                this.actual++;
                if(letra.test(temporal)||num.test(temporal)){
                    let temp = this.preanalisis;
                    let rl = this.resto_letras();
                    return temp + rl;
                }
                return this.preanalisis;
            }
            error = "El identificador deve comenzar con una letra y se encontro un "+this.preanalisis;
            throw error;
        }   
        catch (e) {
            //alert("error en identificador")
            this.ExecError();
            throw new FatalError("Something went badly wrong!");
        }
    }
    sig_lista_variables(){
        this.preanalisis = this.input.charAt(this.actual);
        if (this.preanalisis==","){
            this.lexico.push([",",13,","])
            //console.log(",")
            this.actual++;
            return this.preanalisis + this.lista_variables();
        }
        else if(!letra.test(this.preanalisis) && this.preanalisis !=";"){
            error = "El caracter "+this.preanalisis + " no es valido como parte de un identificador";
            throw error
        }

        else
            return "";
    }
    lista_variables(){
        try{
            let ide = this.identificador();
            /*if (this.exist(["int",ide]) || this.exist(["float",ide]) || this.exist(["string",ide])) {
                error = "Redeclaracion del identificador "+ide;
                throw error;
            }else*/ if(this.restrict(ide)){
                error = "Palabra reservada "+ide;
                throw error;
            }else{
                this.lexico.push(["identificador",0,ide])
                //console.log(ide)
                //this.matrix.push([t,ide])
            }
            let slv = this.sig_lista_variables();
            return ide+slv;
    }   
    catch (e) {
        //alert("error en lista variables")
        this.ExecError();
        throw new FatalError("Something went badly wrong!");
    }
    }
    declaracion(){
        let t = this.tipo();
        let temp = this.getIsString();
        if (letra.test(temp.charAt(0)) && 
        this.input.charAt(this.actual+temp.length)=="("){
            
            this.lexico.push(["identificador",0,temp])
            this.lexico.push(["(",14,"("])

            this.actual = this.actual+temp.length+1;
            if (!this.input.charAt(this.actual)==")")
                this.lista_variables(t)
            this.exclosarent();
            
            if (this.input.charAt(this.actual)=="{") {
                this.lexico.push(["{",16,"{"])
                this.actual++
                
                this.ordenes()
                //alert("ok ordenes")
                
                
            }else{
                this.ExecError();
                throw new FatalError("Abre una llave para la funcion");
            }
            
            let i = this.end()
            this.pointCReplace = true;
            this.lexico.push(["}",17,"}"])
            
            this.input = this.input.replaceAt(this.actual, ';');
            //alert(this.input.charAt(this.actual))
            //alert(this.input.substring(this.actual,this.actual+1))

            return i
        }else{
        let lv = this.lista_variables(t);
        return t+lv;
    }}

    sig_declaraciones(){
        let temp = this.input.substring(this.actual,this.actual+3);
        let tems  = this.input.substring(this.actual,this.actual+5);
        if (temp=="int" || tems=="float") 
            return this.declaracion()+this.puntoComa()+this.sig_declaraciones();
        else
            return "";
    }
    declaraciones(){
        
        let de = this.declaracion();
        let pc = this.puntoComa();
        let sd = this.sig_declaraciones();
        return de+pc+sd;
    }
    programa(){
        try{
            //this.preanalisis = this.input.substring(this.actual,this.actual+10);
            //if (this.preanalisis=="intmain(){") {
                //alert(this.preanalisis)
                //this.actual+=10;
                //let g = this.preanalisis;
                //this.preanalisis = this.input.charAt(this.actual)
                //let fact = this.declaraciones();
                let rest_term = this.ordenes();
                //alert(rest_term)
                //alert(rest_term)
                //let end = this.input.substring(this.actual,this.input.length);
                
                // if (end!="}") {
                //     //alert(end);
                //     error = "Error en el programa final end";
                //     throw error;
                // }
                
                //return fact+g+rest_term;
                return rest_term;
            //}
            //error = "Inicie el programa con la intruccion int main()";
            //throw error;
        }   
        catch (e) {
            //alert("error en programa")
            this.ExecError();
            throw new FatalError("Something went badly wrong!");
    }

    }
    ExecError(){
        document.getElementById('output').innerHTML= 
    "<img src='fall.png' alt='' class='notify' width='40px'srcset=''>"+error;//"Programa correcto ;)";//' '+valc;
  
    }
}
let text
async function loadFile(file) {
    table3="";
    document.getElementById('output').innerHTML= "";
    text = await file.text();
    document.getElementById('out').textContent = text;
  }
const validar = () =>{
    document.getElementById('lr').innerHTML=tableLR
    inpu = text//document.querySelector("#input").value; 
    document.getElementById('tree').value=table3;
    //alert(inpu)
    document.getElementById('out').innerHTML=inpu;
    //inpu = inpu.replace(/ /g, ""); 
    //inpu = inpu.replace(/\n/g, ""); 
    let position = 0;
    let cad = 0;
    while (position < inpu.length) {
        let character = inpu.charAt(position)
        
        if (cad ==0 ) {
            if((character == " ") || ( character == "\n")){
                inpu = inpu.replaceAt(position, '');
                position--
            }
                
        }
        //console.log(character)
        if (character == "'") {
                //console.log("Comilla simple "+ inpu.substring(position, inpu.length))
                if (cad == 0) {
                    //console.log("comienza comilla simple: "+inpu.substring(position, inpu.length))
                    
                    cad = 1;
                }else
                if (cad == 1) {
                    //console.log("termina comilla simple")
                    cad = 0;
                }
            }
            else if (character == "\"") {
                if (cad == 0) {
                    //console.log("comienza comilla doble")
                    cad = 2;
                }else
                if (cad == 2) {
                    //console.log("termina comilla doble")
                    cad = 0;
                }
            }
            position++
    }
    //alert(inpu)
    
    //alert(inpu)
    //alert(inpu)
    let init = new Analisis(inpu);
    init.programa();
    //init.print();
    //init.ExecuteTreeCode();
    init.executeLexico();
    let gramatic = new Gramatic(init.lexico)
    gramatic.executeSum();
    document.getElementById('outputlr').innerHTML= tableSintactico; //table;
    document.getElementById('outrf').innerHTML= tableSintacticoR; //table;
    
    document.getElementById('tree').innerHTML=tableLexico;
    document.getElementById('output').innerHTML= 
        "<img src='ok.png' alt='' class='notify' width='40px'srcset=''>Programa correcto"//"Programa correcto ;)";//' '+valc;
    // alert(table)
}