/**
 * @author Juan Eneque
 * @version 1.0
 */


// Variables globales
let a_integrantes = []; // integrantes ingresados
let o_nro_integrante = new Object(); // diccionario nro: integrante
let aux_nro_integrante = []; // array de nros random generados

let hay_temas = false;
let a_temas = []; // temas ingresados
let o_nro_tema = new Object(); // diccionario nro: tema
let aux_nro_tema = []; // array de nros random generados

let nro_grupos = 0;

/**
 * Obtiene los datos ingresados. 
 * Estos son: número de grupos, integrantes y opcionalmente temas de cada grupo.
 */
function getData() {
    let temas = $('#temas').val();
    let integrantes = $('#integrantes').val();
    let nro_grup = $('#nro_grupos').val();
    a_temas = temas.split(',');
    a_integrantes = integrantes.split(',');
    nro_grupos = parseInt(nro_grup);
}

/**
 * Verifica si un numero existe dentro de un determinado array.
 * @param {...number} nro - Número random generado
 * @param {Object[]} array - Array donde se buscará el número
 */
function findItem(nro, array) {
    let existe = false;
    array.forEach(aux_nro => {
        if (nro === aux_nro) {
            existe = true;
        }
    });
    return existe;
}

/**
 * Ordena los elementos de forma aleatoria.
 * @param {Object[]} array - array que contiene los datos ingresados
 * @param {Object} object - diccionario que contendrá los nuevos elementos
 * @param {Object[]} aux_array - array auxliar para evitar repeticiones
 */
function sortElements(array, object, aux_array) {
    let nro_items = array.length;
    let actual = 0, i = 0;
    while (i !== nro_items) {
        actual = Math.floor(Math.random() * nro_items);
        if (!findItem(actual, aux_array)) {
            object[i] = array[actual];
            aux_array.push(actual);
            i++;
        }
    }
}

function showCreatedGroups() {
    let div_resultados = $('#resultados');
    let i = 0, id_grupo = 0;
    let integrantes, tope;
    integrantes = parseInt((a_integrantes.length + 1) / nro_grupos);
    tope = integrantes;
    div_resultados.empty();
    while (id_grupo !== nro_grupos) {
        div_resultados.append("<div id='div_grupo_" + id_grupo + "' class='div_resultado'><p><b>GRUPO " + (id_grupo + 1) + "</b></p>");
        let id = "#div_grupo_" + id_grupo;
        let div_grupo = $(id);
        if (hay_temas) {
            div_grupo.append('<p><b>"' + o_nro_tema[id_grupo] + '"</b></p>');
        }
        while (i !== tope) {
            div_grupo.append(o_nro_integrante[i] + "<br>");
            i++;
        }
        div_resultados.append("</div>");
        id_grupo++;
        tope = tope + integrantes;
        if (id_grupo === nro_grupos - 1) {
            tope = a_integrantes.length;
        }
    }
}

/**
 * Funcion principal.
 */
function initMakeGroups() {
    // Iniciando variables globales
    a_integrantes = [];
    o_nro_integrante = new Object();
    aux_nro_integrante = [];

    a_temas = [];
    o_nro_tema = new Object();
    aux_nro_tema = [];

    nro_grupos = 0;

    getData();
    sortElements(a_integrantes, o_nro_integrante, aux_nro_integrante);
    if (hay_temas) {
        sortElements(a_temas, o_nro_tema, aux_nro_tema);
    }
    showCreatedGroups();
}

function validData() {
    let temas = $('#temas').val();
    let integrantes = $('#integrantes').val();
    let nro_grup = $('#nro_grupos').val();

    let n_integrantes = integrantes.split(',');
    let temas_split = temas.split(',');
    
    if (integrantes === "" || nro_grup === "") {
        alert("Debe ingresar como minimo el número de grupos y los integrantes");
    } else {
        if (n_integrantes.length < parseInt(nro_grup)) {
            alert("La cantidad minima de integrantes debe ser igual al número de grupos que desea formar");
        } else {
            if (temas === "") {
                initMakeGroups();
            } else {
                if (temas_split.length === parseInt(nro_grup)) {
                    hay_temas = true;
                    initMakeGroups();
                }
                else
                    alert("La cantidad de temas debe ser igual al número de grupos");
            }
        }
    }
}

//
/*function buscar(nro) {
    let existe  = false;
    aux_nro_integrante.forEach(aux_nro => {
        if(nro === aux_nro){
            existe = true;
        }
    });
    return existe;
}

function sortIntegrantes(integrantes){
    let nro_integrantes = integrantes.length;
    let actual = 0, i = 0;
    while (i !== nro_integrantes) {
        actual = Math.floor(Math.random() * nro_integrantes);
        if(!buscar(actual)){
            o_nro_integrante[i] = integrantes[actual];
            aux_nro_integrante.push(actual);
            i++;
        }
    }
}

// Crear grupos con input: numero de integrantes por grupo
function showCreatedGroups() {
    let i = 0, id_grupo = 1;
    let fin = 0;
    fin = integrantes_por_grupo;
    while(i !== a_integrantes.length){
        console.log("GRUPO "  + id_grupo);
        while(i !== fin){
            console.log(" - " + o_nro_integrante[i]);
            i++;
        }
        fin = fin + integrantes_por_grupo;
        if(fin > a_integrantes.length){
            fin = a_integrantes.length;
        }
        id_grupo++;
    }
}*/