//http://localhost/Traductor/Index.php
function FatalError(){ 
    error.apply(this, arguments); this.name = "FatalError"; } 
FatalError.prototype = Object.create(Error.prototype);

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
var error ="error";
class Analisis{
    constructor(inpu){
        this.input=inpu;
        this.preanalisis;
        this.actual=0;
        this.matrix = [];
        this.matrixTree = [];   
        this.restricted = ["if","while", "return", "else","int","float"];
        table='';
        //this.isElse=false;
        this.ticket=1;
        this.labelCount=1;
        this.matrixOrder=[];
    }
    print(){
        //alert(this.matrix.length)
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
                    this.actual++;
                    return "";
            }
            else{
                error =  "Abre un parentesis :)";
                throw error;
            }
            
        } catch (e) {
            this.ExecError();
            throw new FatalError("Something went badly wrong!");
        }
    }
    exclosarent(){
        try {
            this.preanalisis = this.input.charAt(this.actual);
            if (closeparent.test(this.preanalisis)) {
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
            this.ExecError();
            throw new FatalError("Something went badly wrong!");
        }
    }

    puntoComa(){
        try{
            this.preanalisis = this.input.charAt(this.actual);
            if (this.preanalisis=";") {
                    this.actual++;
                    return this.preanalisis;
            }
            error = this.input+"  no es una expresion valida, el caracter "+parameter+" es desconocido";
            throw error;
        }   
        catch (e) {
            this.ExecError();
            throw new FatalError("Something went badly wrong!");
        }
    }
    tipo(){
        try{
            let temp = this.input.substring(this.actual,this.actual+3);
            let tems  = this.input.substring(this.actual,this.actual+5);
            if (temp=="int") {
                this.actual+=3;

                return temp;
            }
            else if (tems=="float") {
                this.actual+=5;
                return tems;
            }
            error = "Se produjo un error en el tipo de dato, verifique su declaracion";
            throw error;
        }   
        catch (e) {
            this.ExecError();
            throw new FatalError("Something went badly wrong!");
        }
    }
    end(){
        try{
            let temp  = this.input.substring(this.actual,this.actual+1);
            if (temp=="}") {
                // this.input.replaceAt(this.actual) = ";";
                // alert(this.input[this.actual])
                //this.actual++;
                return temp;
            }
            error = "Se esperava terminar con }";
            throw error
        }   
        catch (e) {
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
            this.ExecError();
            throw new FatalError("Something went badly wrong!");
        }
    }
    endWhile(){
        try{
            let temp  = this.input.substring(this.actual,this.actual+1);
            if (temp=="}") {
                //this.actual+=1;
                return temp;
            }

            error = "Error en el while";
            throw error;
        }   
        catch (e) {
            this.ExecError();
            throw new FatalError("Something went badly wrong!");
        }
    }
    exp_arit(tipo){
        this.preanalisis = this.input.charAt(this.actual);
        if (simbol.test(this.preanalisis)) {
            this.actual++;
            let temp = this.preanalisis;
            let eas=this.expresion_arit(tipo);
            //alert("expresion_arit: "+eas)
            let eam=this.exp_arit(tipo);
            //console.log("exp_arit simbol: "+temp+eam + eas);
            return temp+eam + eas;
        }
        else if(operation.test(this.preanalisis)){
            this.actual++;
            let temp = this.preanalisis;
            let eas=this.expresion_arit(tipo);
            //console.log("tengo mi esxpresio arit: "+eas)
            let eam=this.exp_arit(tipo);
            //console.log("exp_arit operation: eam: "+eam +" temp: "+temp+"eas: "+ eas)
            return eam +temp+ eas ;
        }
        else
            return "";
    }
    expresion_arit(tipo){
        try{
            this.preanalisis = this.input.charAt(this.actual);
            //console.log("que es: "+this.preanalisis)
            let tem;
            if (this.preanalisis=="("){
                //console.log("es un parentesis "+this.preanalisis)
                let op = this.exopparent();
                let ea = this.expresion_arit(tipo);
                return op+ea+this.exclosarent()+this.exp_arit(tipo);
            }
            else if (num.test(this.preanalisis)){
                //console.log("es un numero "+this.preanalisis)
                let n = this.numeros(tipo);
                //alert("estos en numero: ")
                let e = this.exp_arit(tipo);
                if(!this.exist([tipo,n]))
                    this.matrix.push([tipo,n])
                n = n+e;
                e = this.getVal(n);

                var e1 = this.getVal(n.substring(e.length+1,n.length));
                var e2 = n.substring(e.length,e.length+1);
                if (e.length>0 && e2.length>0 && e1.length>0){
                     let var1 = this.getVal(n);
                     let var2 = this.getVal(n.substring(var1.length+1,n.length));
                     this.matrixTree.push(["t"+(this.labelCount),
                     var1,n.substring(var1.length,var1.length+1),var2]);
                     this.matrix.push([tipo,"t"+(this.labelCount)]);
                     this.labelCount++;
                     return "t"+(this.labelCount-1);
                 }
                return n;
            }else
                tem = this.getIsString();
                // console.log(tipo + " "+tem+" " +this.matrix)

                if (this.exist([tipo,tem])){
                    //console.log("es un un id "+this.preanalisis)
                    let id  =  this.identificador();
                    let ea=this.exp_arit(tipo);
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
                         this.matrix.push([tipo,"t"+(this.labelCount)]);
                         this.labelCount++;
                         return "t"+(this.labelCount-1);
                     }
                    return temp;
                }
                if (this.exist(["float",tem])) {
                    error =  tem + " es un tipo de dato float no compatible con int";
                    throw error; 
                }


                if (tem.length==0) {
                    tem = this.input.charAt(this.actual)
                }
                error =  "Expresion aritmetica no valida: "+tem+" no se reconoce como una variable de tipo "+tipo;
                throw error;
        }   
        catch (e) {
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

    asignar(tipo){
        try{
            let ida = this.identificador();
            //alert("Asignar: "+ida)
            if (!this.exist([tipo,ida])) {
               error = "La variable "+ida+" de tipo " + tipo + " no existe";
                throw error;
            }
            this.preanalisis  = this.input.substring(this.actual,this.actual+1);
            if (this.preanalisis=="=") {
                this.actual++;
                let temp = this.preanalisis;
                let ea = this.expresion_arit(tipo);
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
                this.matrix.push([tipo,"t"+(this.labelCount)]);
                //this.labelCount++;
                // console.log("Dimention: "+this.matrixTree.length);
                //alert(ida+temp+ea)
                return ida+temp+ea;
            }
            error = "Se produjo un error al asignar";
            throw error;
        }   
        catch (e) {
            this.ExecError();
            throw new FatalError("Something went badly wrong!");
        }

    }

    bucle_while(){
        try{
            this.preanalisis  = this.input.substring(this.actual,this.actual+5);
            if (this.preanalisis=="while") {
                this.actual+=5;
                let pt = this.preanalisis;
                let op = this.exopparent();
                
                let co = this.comparacion();
                console.log("While is ok")
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
                this.ExecError();
                throw new FatalError("Something went badly wrong!");
                }
        
    }
    numero_real(){
        let ent = this.numero_entero();
        return ent+this.punto()+this.numero_entero();
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
    numeros(tipo){
        try{
            this.preanalisis = this.input.charAt(this.actual);
            let tem  = this.getNumber();
            //alert("numeros: "+tem)
            if (numf.test(tem) && tipo == "int") {
                error = "No se puede asignar un float a int, " + tem + " es un numero real";
                throw error;
            }
            if (numf.test(tem)) {
                return this.numero_real();
            }else
                if (num.test(tem)) {
                    return this.numero_entero();
                }
            error = "No es un numero entero o real";
            throw error;
            }   
            catch (e) {
                this.ExecError();
                throw new FatalError("Something went badly wrong!");
            }
    }

    operador(){
        try{
            this.preanalisis = this.input.charAt(this.actual);
            let temp = this.getIsString();
            if (this.exist(["int",temp]) || this.exist(["float",temp])) {
                temp = this.identificador();
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
                this.actual+=2;
                return act;
            }
            act = this.input.charAt(this.actual);
                if (act=="<"||act==">") {
                    this.actual++;
                    return act;
                }
                error = "Se esparaba un simbolo de condicion";
                throw error;
            }   
            catch (e) {
                this.ExecError();
                throw new FatalError("Something went badly wrong!");
            }
    }

    sig_condicion(){
        let temend  = this.input.substring(this.actual,this.actual+1);
        let temelse  = this.input.substring(this.actual,this.actual+6);
        
        try{
            if(temelse=="}else{"){
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
                    temend = this.end();
                    return temend;

                }
            error = "Error en la siguiente condicion";
            throw error;
        }   
        catch (e) {
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

    condicion(){
        try{
            this.preanalisis = this.input.substring(this.actual,this.actual+2);
            if(this.preanalisis=="if"){
                this.actual+=2;
                let op = this.exopparent();
                let isOtherCondition = true;
                let cp="";
                while (isOtherCondition) {
                    cp += this.comparacion();
                    let idNext = this.input.substring(this.actual,this.actual+2);
                    if (idNext == "&&" || idNext == "||"){
                        isOtherCondition = true;
                        cp+=idNext;
                        this.actual += 2;
                    }
                    else
                        isOtherCondition =false;
                }
                // alert(cp)
                 

                let clp = this.exclosarent();
                this.matrixTree.push("if("+op+cp+clp+") goto L"+this.ticket+";");
                this.ticket++;
                this.matrixTree.push("goto L"+this.ticket+";");
                this.matrixTree.push("L"+(this.ticket-1)+":");
                let temp=this.ticket;
                this.ticket++;
                if (this.input.charAt(this.actual) == "{") {
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
            this.ExecError();
            throw new FatalError("Something went badly wrong!");
        }     
    }


    orden(){
        try{
            let tempif = this.input.substring(this.actual,this.actual+2);
            let tempwhile = this.input.substring(this.actual,this.actual+5);
            let tempint = this.input.substring(this.actual,this.actual+3);            let tempasignar;
            // alert(tempwhile)
            tempasignar = this.getIsString();
            //alert(tempasignar)
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
            }
            if (tempif=="if") {
                let cond = this.condicion();
                
                return cond;
            }else
                if (tempwhile=="while") {
                    //console.log("In the bucle while")
                    return this.bucle_while();
                }
                else if (tempint == "int" || tempwhile=="float") {
                    return this.declaracion();
                }else{
                    error = "El id "+tempasignar + " no esta declarado";
                    throw error;
                }
            
        }   
        catch (e) {
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
        if (tempif=="if"||tempwhile=="while"||this.exist(["int",tempasignar])||this.exist(["float",tempasignar])) {
            return this.orden()+this.puntoComa()+this.sig_ordenes();
        }
        else
            return "";
    }
    ordenes(){
        let or = this.orden();
        let pC = this.puntoComa();
        let SO = this.sig_ordenes();
        this.preanalisis = this.input.charAt(this.actual)
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
            this.ExecError();
            throw new FatalError("Something went badly wrong!");
        }
    }
    sig_lista_variables(tipo){
        this.preanalisis = this.input.charAt(this.actual);
        if (this.preanalisis==","){
            this.actual++;
            return this.preanalisis + this.lista_variables(tipo);
        }    
        else if(!letra.test(this.preanalisis) && this.preanalisis !=";"){
            error = "El caracter "+this.preanalisis + " no es valido como parte de un identificador";
            throw error
        }

        else
            return "";
    }
    lista_variables(t){
        try{
            let ide = this.identificador();
            if (this.exist(["int",ide]) || this.exist(["float",ide])) {
                error = "Redeclaracion del identificador "+ide;
                throw error;
            }else if(this.restrict(ide)){
                error = "Palabra reservada "+ide;
                throw error;
            }else{
                this.matrix.push([t,ide])
            }
            let slv = this.sig_lista_variables(t);
            return ide+slv;
    }   
    catch (e) {
        this.ExecError();
        throw new FatalError("Something went badly wrong!");
    }
    }
    declaracion(){
        let t = this.tipo();
        let lv = this.lista_variables(t);
        return t+lv;
    }

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
            this.preanalisis = this.input.substring(this.actual,this.actual+10);
            if (this.preanalisis=="intmain(){") {
                //alert(this.preanalisis)
                this.actual+=10;
                let g = this.preanalisis;
                this.preanalisis = this.input.charAt(this.actual)
                let fact = this.declaraciones();
                let rest_term = this.ordenes();
                //alert(rest_term)
                let end = this.input.substring(this.actual,this.input.length);
                if (end!="}") {
                    //alert(end);
                    error = "Error en el programa final end";
                    throw error;
                }
                return fact+g+rest_term;
            }
            error = "Inicie el programa con la intruccion int main()";
            throw error;
        }   
        catch (e) {
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
    inpu = text//document.querySelector("#input").value; 
    document.getElementById('tree').value=table3;
    //alert(inpu)
    document.getElementById('out').innerHTML=inpu;
    inpu = inpu.replace(/ /g, ""); 
    inpu = inpu.replace(/\n/g, ""); 
    //alert(inpu)
    let init = new Analisis(inpu);
    init.programa();
    //init.print();
    init.ExecuteTreeCode();
    // document.getElementById('out').innerHTML=table;
    //document.getElementById('tree').innerHTML=table3;
    document.getElementById('output').innerHTML= 
        "<img src='ok.png' alt='' class='notify' width='40px'srcset=''>Programa correcto"//"Programa correcto ;)";//' '+valc;
    // alert(table)
}