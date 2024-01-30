const estados = {
    "AGUASCALIENTES": "AGS",
    "BAJA CALIFORNIA": "BC",
    "BAJA CALIFORNIA SUR": "BCS",
    "CAMPECHE": "CAM",
    "CHIAPAS": "CHIS",
    "CHIHUAHUA": "CHIH",
    "COAHUILA": "COAH",
    "COLIMA": "COL",
    "DURANGO": "DGO",
    "ESTADO DE MÉXICO": "MEX",
    "GUANAJUATO": "GTO",
    "GUERRERO": "GRO",
    "HIDALGO": "HGO",
    "JALISCO": "JAL",
    "MICHOACÁN": "MICH",
    "MORELOS": "MOR",
    "NAYARIT": "NAY",
    "NUEVO LEÓN": "NL",
    "OAXACA": "OAX",
    "PUEBLA": "PUE",
    "QUERÉTARO": "QRO",
    "QUINTANA ROO": "QR",
    "SAN LUIS POTOSÍ": "SLP",
    "SINALOA": "SIN",
    "SONORA": "SON",
    "TABASCO": "TAB",
    "TAMAULIPAS": "TAMPS",
    "TLAXCALA": "TLAX",
    "VERACRUZ": "VER",
    "YUCATÁN": "YUC",
    "ZACATECAS": "ZAC"
  }
  

export function calcularCURP(apellidoPaterno, apellidoMaterno, nombre, fechaNacimiento, sexo, lugarNacimiento) {
    // Obtener iniciales y primera vocal del apellido paterno
    const inicialApellidoPaterno = apellidoPaterno.substring(0, 1);
    const primeraVocalApellidoPaterno = obtenerPrimeraVocal(apellidoPaterno);

    // Obtener inicial del apellido materno
    const inicialApellidoMaterno = apellidoMaterno.substring(0, 1);

    // Obtener inicial del nombre principal
    const inicialNombre = nombre.substring(0, 1);

    // Obtener fecha de nacimiento en formato YYMMDD
    const anio = fechaNacimiento.getFullYear().toString().substring(2, 4);
    const mes = agregarCero(fechaNacimiento.getMonth() + 1);
    const dia = agregarCero(fechaNacimiento.getDate());
    const fechaNacimientoFormato = anio + mes + dia;

    // Obtener sexo
    const sexoAbreviado = (sexo === 'H' ? 'H' : 'M');

    // Obtener abreviatura del lugar de nacimiento
    // const lugarNacimientoAbreviado = lugarNacimiento.substring(0, 2).toUpperCase();
    const lugarNacimientoAbreviado = (lugarNacimiento.toUpperCase() in estados ? estados[lugarNacimiento.toUpperCase()].substring(0,2) : 'ERROR');

    // Obtener primera consonante no inicial del apellido paterno, materno y nombre
    const primeraConsonantePaternoNoInicial = obtenerPrimeraConsonanteNoInicial(apellidoPaterno);
    const primeraConsonanteMaternoNoInicial = obtenerPrimeraConsonanteNoInicial(apellidoMaterno);
    const primeraConsonanteNombreNoInicial = obtenerPrimeraConsonanteNoInicial(nombre);
    const homoclave = String.fromCharCode(64 + Math.floor(Math.random() * 26) + 1) +  Math.floor(Math.random()*9);

    // Concatenar todo para formar el CURP
    const curp = inicialApellidoPaterno + primeraVocalApellidoPaterno +
                 inicialApellidoMaterno + inicialNombre +
                 fechaNacimientoFormato + sexoAbreviado +
                 lugarNacimientoAbreviado +
                 primeraConsonantePaternoNoInicial +
                 primeraConsonanteMaternoNoInicial +
                 primeraConsonanteNombreNoInicial +
                 homoclave;

    return curp.toUpperCase();
}

function obtenerPrimeraVocal(palabra) {
    // Implementación simple para obtener la primera vocal de una palabra
    const vocales = ["A", "E", "I", "O", "U"];
    for (let letra of palabra.toUpperCase()) {
        if (vocales.includes(letra)) {
            return letra;
        }
    }
    return "X"; // En caso de que no se encuentre ninguna vocal
}

function agregarCero(numero) {
    // Agregar cero al principio si el número es menor que 10
    return numero < 10 ? "0" + numero : numero.toString();
}

function obtenerPrimeraConsonanteNoInicial(palabra) {
    // Obtener primera consonante no inicial de una palabra
    const consonantes = "BCDFGHJKLMNPQRSTVWXYZ";
    for (let i = 1; i < palabra.length; i++) {
        const letra = palabra[i].toUpperCase();
        if (consonantes.includes(letra)) {
            return letra;
        }
    }
    return "X"; // En caso de que no se encuentre ninguna consonante no inicial
}

// Ejemplo de uso
const apellidoPaterno = "Rizo";
const apellidoMaterno = "Gomez";
const nombre = "Cristian Alexander";
const fechaNacimiento = new Date("2004-02-13");
const sexo = "H"; // Hombre
const lugarNacimiento = "Guanajuato";



// const curpGenerado = calcularCURP(apellidoPaterno, apellidoMaterno, nombre, fechaNacimiento, sexo, lugarNacimiento);
// console.log(curpGenerado); 
// console.log("RIGC040213HGTZMRA3")
