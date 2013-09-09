var cuestionario = new cuestionario();
function cuestionario()
{
  this.colegio = "";
  this.edad = null;
  this.sexo = "";
  this.currentQuestion = 0;
  this.orden = [];
  this.instruccionesCreencias = "";
  this.instruccionesActitud = "";
  this.cuestionarioCreencias = [];
  this.cuestionarioActitud = [];
  this.cuestionarioReflexion = [];
  this.respuestasCreencias = [];
  this.respuestasActitud = [];
  this.respuestasReflexion = [];
  this.listaReflexion = new Array("céntimos","minutos","días");
  /*Get y Set*/
  this.getListaReflexion = function () {return this.listaReflexion.shift();};
  this.getPreguntaActitud = function() {return this.cuestionarioActitud.shift();};
  this.getPreguntaCreencias = function() {return this.cuestionarioCreencias.shift();};
  this.getPreguntaReflexion = function() {return this.cuestionarioReflexion.shift();};
  this.getOrden = function() {return this.orden.shift();};
  this.ordenLength = function() {return this.orden.length;};
  this.addCurrentQuestion = function() {this.currentQuestion++;};
  this.getCurrentQuestion = function() {return this.currentQuestion;};
  this.setCurrentQuestion = function(value) {this.currentQuestion = value;};
  this.getColegio = function() {return this.colegio;};
  this.getEdad = function() {return this.edad;};
  this.getSexo = function() {return this.sexo;};
  this.getInstruccionesCreencias = function() {return this.instruccionesCreencias;};
  this.getInstruccionesActitud = function() {return this.instruccionesActitud;};
  this.setColegio = function(colegio) {this.colegio = colegio;};
  this.setEdad = function(edad) {this.edad = edad;};
  this.setSexo = function(sexo) {this.sexo = sexo;};
  this.setInstruccionesCreencias = function(texto) {this.instruccionesCreencias = texto;};
  this.setInstruccionesActitud = function(texto) {this.setInstruccionesActitud = texto;};
  this.setCuestionarioCreencias = function(lista){
    for(var i=0;i<lista.length;i++)
    {
      this.cuestionarioCreencias.push(lista[i]);
    }
  };
  this.setCuestionarioActitud = function(lista){
    for(var i=0;i<lista.length;i++)
    {
      this.cuestionarioActitud.push(lista[i]);
    }
  };
  this.setCuestionarioReflexion = function(lista){
    for(var i=0;i<lista.length;i++)
    {
      this.cuestionarioReflexion.push(lista[i]);
    }
  };
  this.init = function(balanceo) {
    if(balanceo === 1 || balanceo === 4 || balanceo === 7 || balanceo === 10) {
      this.orden.push('R-PBS');
      this.orden.push('AC');
      this.orden.push('CRT');
    } else if(balanceo === 2 || balanceo === 5 || balanceo === 8 || balanceo === 11) {
      this.orden.push('AC');
      this.orden.push('CRT');
      this.orden.push('R-PBS');
    } else {
      this.orden.push('CRT');
      this.orden.push('AC');
      this.orden.push('R-PBS');
    }
    /*Cargo las listas de preguntas*/
    this.setCuestionarioCreencias(preguntasCreencias());
    this.setCuestionarioReflexion(preguntasReflexion());
    this.setCuestionarioActitud(preguntasActitud());
  };
}
function question(pregunta)
{
  this.pregunta = pregunta;
  this.respuesta = "";
  /*Get y set*/
  this.getPregunta = function() {return this.pregunta;};
  this.getRespuesta = function() {return this.respuesta;};
  this.setPregunta = function(pregunta) {this.pregunta = pregunta;};
  this.setRespuesta = function(respuesta) {this.respuesta = respuesta;};
}
function preguntasCreencias()
{
  var preguntas = [];
  /*Crear preguntas cuestionario*/
  preguntas.push('El alma continúa existiendo cuando el cuerpo muere.');
  preguntas.push('Algunas personas son capaces de hacer levitar (subir o mover) objetos con su fuerza mental.');
  preguntas.push('La Magia Negra realmente existe.');
  preguntas.push('Los gatos negros traen mala suerte.');
  preguntas.push('La mente o alma pueden dejar el cuerpo y viajar (viajes astrales).');
  preguntas.push('El abominable hombre de las nieves del Tibet existe.');
  preguntas.push('La Astrología es una forma fiable de predecir el futuro.');
  preguntas.push('El Diablo existe.');
  preguntas.push('La Psicoquinesis (mover objetos con la mente) es un fenómeno real.');
  preguntas.push('Las brujas existen.');
  preguntas.push('Si rompes un espejo, te traerá mala suerte.');
  preguntas.push('Durante determinados estados, tales como el sueño o los trances, el espíritu puede abandonar el cuerpo.');
  preguntas.push('El monstruo del Lago Ness de Escocia existe.');
  preguntas.push('El horóscopo puede predecir el futuro de una persona.');
  preguntas.push('Crees en Dios.');
  preguntas.push('Los pensamientos de las personas pueden influenciar el movimiento de objetos físicos.');
  preguntas.push('Por medio de encantamientos o fórmulas pueden realizarse hechizos a las personas.');
  preguntas.push('El número 13 da mala suerte.');
  preguntas.push('La reencarnación es cierta.');
  preguntas.push('Existe vida en otros planetas.');
  preguntas.push('Algunas personas pueden adivinar el futuro.');
  preguntas.push('Hay un Cielo y un Infierno.');
  preguntas.push('La lectura de la mente NO es posible.');
  preguntas.push('Existen casos reales de brujería.');
  preguntas.push('Es posible comunicarse con los muertos.');
  preguntas.push('Algunas personas tienen una habilidad inexplicable para predecir lo que va a ocurrir.');
  preguntas.push('Nos visitan seres extraterrestres.');
  preguntas.push('El <i>mal de ojo</i> es un fenómeno real.');
  preguntas.push('Los fantasmas existen.');
  preguntas.push('Hay casos de avistamientos OVNIS que son reales.');
  return preguntas;
}
function preguntasActitud()
{
  var preguntas = [];
  /*Preguntas del cuestionario*/
  preguntas.push('Tenemos un mundo mejor para vivir gracias a la ciencia.');
  preguntas.push('A nadie le gusta la ciencia.');
  preguntas.push('La ciencia ayuda a ahorrar tiempo y esfuerzo.');
  preguntas.push('La ciencia es muy dificil de aprender.');
  preguntas.push('Las enfermedades pueden curarse gracias a la ciencia.');
  preguntas.push('Cuanto mayor conocimiento científico existe, más preocupaciones hay para nuestro mundo.');
  preguntas.push('La ciencia no es aburrida.');
  preguntas.push('La ciencia ayuda a la gente en todos los sitios.');
  preguntas.push('La ciencia es sensata.');
  preguntas.push('Me siento mal sólo de pensar en la ciencia.');
  preguntas.push('La curiosidad es lo esencial de la ciencia.');
  preguntas.push('La gente vive más saludablemente gracias a la ciencia.');
  preguntas.push('La ciencia no puede resolver los problemas energéticos.');
  preguntas.push('Para destacar en ciencia hay que ser muy inteligente.');
  preguntas.push('Los alumnos estudian ciencia porque se les obliga.');
  preguntas.push('La ciencia es el camino para conocer el mundo en el que vivimos.');
  preguntas.push('La ciencia estimula la curiosidad.');
  preguntas.push('No hay nada mejor que trabajar en ciencia.');
  preguntas.push('La ciencia es algo realmente valioso.');
  preguntas.push('Conocer la Luna y los planetas a través de la ciencia nos ayuda aquí en la Tierra.');
  preguntas.push('En las clases de ciencia no hay actividad.');
  preguntas.push('La peor materia escolar es la ciencia.');
  preguntas.push('La ciencia debería ser eliminada de las escuelas.');
  preguntas.push('La gente tiene una vida más larga gracias a la ciencia.');
  preguntas.push('Los alumnos en clase de ciencia son como robots.');
  preguntas.push('La ciencia desanima la curiosidad.');
  preguntas.push('La ciencia nos ayuda a pensar mejor.');
  preguntas.push('Estudiar ciencia es una pesadilla.');
  preguntas.push('La gente sería mejor estudiante si no tuviera ciencia.');
  preguntas.push('La ciencia no tiene mucho sentido para gente que no son científicos.');
  preguntas.push('La ciencia nos ayuda a evitar catástrofes.');
  preguntas.push('Un futuro mejor depende de la ciencia.');
  preguntas.push('La ciencia nos enseña a prepararnos para el futuro.');
  preguntas.push('La ciencia es un riesgo para la salud.');
  preguntas.push('La vida sería monótona sin ciencia.');
  preguntas.push('No deberíamos haber enviado gente a la Luna.');
  preguntas.push('La ciencia es completamente aburrida.');
  preguntas.push('La ciencia es una excusa para juguetear.');
  preguntas.push('La ciencia es detestable.');
  preguntas.push('La ciencia es extremadamente útil.');
  preguntas.push('La ciencia es necesaria para todos.');
  preguntas.push('Estudiando ciencia se satisface la curiosidad.');
  preguntas.push('La ciencia no tiene utilidad.');
  preguntas.push('La ciencia nos enseña a aceptar muchas opiniones diferentes.');
  preguntas.push('La ciencia nos defiende de la superstición.');
  preguntas.push('Apreciar las ideas nuevas es valioso en ciencia.');
  preguntas.push('Una vez aceptado, el conocimiento científico no puede ser cambiado.');
  preguntas.push('La ciencia es una superstición.');
  preguntas.push('La ciencia parece ser muy interesante.');
  preguntas.push('Estudiar ciencia sirve a la gente, incluso cuando deja la escuela.');
  return preguntas;
}
function preguntasReflexion()
{
  var preguntas = [];
  preguntas.push('Una raqueta y una pelota cuestan 1.10€ en total. Si la raqueta cuesta 1.00€ más que la pelota. ¿Cuánto cuesta la pelota?');
  preguntas.push('Si 5 máquinas tardan 5 minutos en fabricar 5 objetos, ¿Cuánto tiempo tardarán 100 máquinas en fabricar 100 objetos?');
  preguntas.push('En un lago flota una capa de hojas de nenúfar. Cada día, esta capa duplica su tamaño. Si hacen falta 48 días para que la capa cubra todo el lago, ¿Cuántos días harán falta para que la capa cubra la mitad del lago?');
  return preguntas;
}
function instruccionesCreencias()
{
  /*En función del balanceo, hay que añadirlo*/
  var info = "Cuestionario " + testNumber();
  var texto = "Vas a leer una serie de afirmaciones. Marca el número que, según tu criterio, " +
  "mejor indique en cuánto estás de acuerdo o desacuerdo con cada afirmación. No existen respuestas " +
  "correctas o incorrectas. Sólo se pretende tener una muestra de tus creencias y actitudes. El " +
  "cuestionario es anónimo, así que por favor, te rogamos seas sincero/a en tus respuestas. " +
  "Te rogamos que, en lo posible, intentes evitar el punto medio (4 = indiferente). Muchas gracias.";
  return new Array(info,texto);
}
function instruccionesActitud(orden)
{
  /*En función del balanceo, hay que añadirlo*/
  var info = "Cuestionario " + testNumber();
  var texto = "Este instrumento está diseñado para valorar tus actitudes hacia la ciencia. No existen " +
  "respuestas correctas o incorrectas sino que sólo se desea conocer tu opinión sincera sobre cada " +
  "frase. Por favor, lee atentamente cada frase y marca la letra que corresponde a " +
  "tus propios sentimientos sobre la frase, valorada con las siguientes categorías:<br>" +
  "AT = Acuerdo total<br>A = Acuerdo<br>I = Indecisión<br>D = Desacuerdo<br>DT = Desacuerdo total";
  return new Array(info,texto);
}
function instruccionesReflexion (argument) {
  var info = "Cuestionario " + testNumber();
  var texto = "A continuación te haremos tres preguntas.";
  return new Array(info,texto);
}
function validar()
{
  var respuesta = document.getElementById("respuestaReflexion").value;
  if (respuesta === "")
  {
    alert("No ha respondido a la pregunta. Para poder continuar debe responder.");
  }
  /*else if(isNaN(respuesta))
  {
    alert("Solo se pueden introducir números.");
    document.forms["reflexion"]["respuestaReflexion"].value = "";
  }*/ else {
    /*Se puede guardar la respuesta*/
    saveCrtResponse();
  }

}
function testNumber() {
  var orden = cuestionario.ordenLength();
  if(orden === 2) {
    return '1';
  } else if(orden === 1) {
    return '2';
  } else if(orden === 0) {
    return '3';
  }
}
function cuestionarios () {
  if(cuestionario.ordenLength() === 0){
    //Hay que mirar si vamos a la pantalla de enviar datos o a los ensayos
    var balanceo = experiment.getBalance();
    if(balanceo <= 3 || (balanceo >= 7 && balanceo <= 9)){
      /*Guardar datos*/
      postScreen('send');
    }else {
      //Instrucciones ensayos.
      document.getElementById('experiment_name_header').innerHTML = 'Tarea de Medicinas';
      currentInstructions();
    }
  } else {
    var tipo = cuestionario.getOrden();
    var texto;
    /*Ocultar boton back*/
    hideVisibility(new Array('button_back'));
    if(tipo === 'AC'){
      texto = instruccionesActitud();
      document.getElementById('button_continue').setAttribute('onclick','cuestionarioAc()');
      /*Inyectar texto*/
      document.getElementById('encabezado').innerHTML = texto[0];
      document.getElementById('information_span').innerHTML = texto[1];
    } else if(tipo === 'R-PBS'){
      texto = instruccionesCreencias();
      document.getElementById('button_continue').setAttribute('onclick','cuestionarioRpbs()');
      /*Inyectar texto*/
      document.getElementById('encabezado').innerHTML = texto[0];
      document.getElementById('information_span').innerHTML = texto[1];
    } else if(tipo === 'CRT'){
      //CRT
      texto = instruccionesReflexion();
      document.getElementById('encabezado').innerHTML = texto[0];
      document.getElementById('information_span').innerHTML = texto[1];
      document.getElementById('button_continue').setAttribute('onclick','cuestionarioCrt()');
      //cuestionarioCrt();
      //document.getElementById('button_continue').setAttribute('onclick','validar()');
    }
    /*Quitar foco de los botones*/
    document.getElementById('button_back').blur();
    document.getElementById('button_continue').blur();
    /*Inyectar texto
    document.getElementById('encabezado').innerHTML = texto[0];
    document.getElementById('information_span').innerHTML = texto[1];
    */
  }
}
function cuestionarioAc () {
  //body49
  if(cuestionario.cuestionarioActitud.length === 0){
    cuestionarios();
  } else {
    var content = 'AT = Acuerdo total, A = Acuerdo, I = Indecisión, D = Desacuerdo, ' +
    'DT = Desacuerdo total<br><br>' +
    '<form name="actitud" class="formulario">' +
    '<span id="preguntaActitud"><strong>' + cuestionario.getPreguntaActitud() + '</strong></span><br>' +
    '<input type="radio" name="respActitud" value="AT" onclick="activarBoton()">AT' +
    '<input type="radio" name="respActitud" value="A" onclick="activarBoton()">A' +
    '<input type="radio" name="respActitud" value="I" onclick="activarBoton()">I' +
    '<input type="radio" name="respActitud" value="D" onclick="activarBoton()">D' +
    '<input type="radio" name="respActitud" value="DT" onclick="activarBoton()">DT' +
    '</form>';
    document.getElementById('information_span').innerHTML = content;
    /*onclick*/
    removeFocus(new Array('button_continue'));
    disabledButtons(new Array('button_continue'));
    document.getElementById('button_continue').setAttribute('onclick','saveAcResponse()');
  }
}
function activarBoton () {
  enabledButtons(new Array('button_continue'));
}
function saveAcResponse() {
  var elementos = document.getElementsByName('respActitud');
  for (var i = 0;i < elementos.length;i++){
    if(elementos[i].checked) {
      cuestionario.respuestasActitud.push(elementos[i].value);
    }
  }
  cuestionarioAc();
}
function cuestionarioRpbs () {
  // body...29
  if(cuestionario.cuestionarioCreencias.length === 0){
    cuestionarios();
  } else {
    var content = '1 = Totalmente en desacuerdo, 2 = Moderadamente en desacuerdo, 3 = Algo en desacuerdo, ' +
    '4 = Indiferente, 5 = Algo de acuerdo, 6 = Moderadamente de acuerdo, 7 = Totalmente de acuerdo<br><br>' +
    '<form name="creencias" class="formulario">' +
    '<span id="preguntaCreencias"><strong>' + cuestionario.getPreguntaCreencias() + '</strong></span><br>' +
    '<input type="radio" name="respCreencias" value="1" onclick="activarBoton()">1' +
    '<input type="radio" name="respCreencias" value="2" onclick="activarBoton()">2' +
    '<input type="radio" name="respCreencias" value="3" onclick="activarBoton()">3' +
    '<input type="radio" name="respCreencias" value="4" onclick="activarBoton()">4' +
    '<input type="radio" name="respCreencias" value="5" onclick="activarBoton()">5' +
    '<input type="radio" name="respCreencias" value="6" onclick="activarBoton()">6' +
    '<input type="radio" name="respCreencias" value="7" onclick="activarBoton()">7' +
    '</form>';
    document.getElementById('information_span').innerHTML = content;
    /*onclick*/
    removeFocus(new Array('button_continue'));
    disabledButtons(new Array('button_continue'));
    document.getElementById('button_continue').setAttribute('onclick','saveRpbsResponse()');
  }
}
function saveRpbsResponse () {
  // body...
  var elementos = document.getElementsByName('respCreencias');
  for (var i = 0;i < elementos.length;i++){
    if(elementos[i].checked) {
      cuestionario.respuestasCreencias.push(elementos[i].value);
    }
  }
  cuestionarioRpbs();
}
function cuestionarioCrt () {
  // body...
  if(cuestionario.cuestionarioReflexion.length === 0) {
    cuestionarios();
  } else {
    var content = '<form name="reflexion" class="formulario"  method="get" target="_blank"  enctype="application/x-www-form-urlencoded">' +
        '<span id="preguntaReflexion"><strong>' + cuestionario.getPreguntaReflexion() + '</strong></span>' +
        '<input id="respuestaReflexion" type="text" onkeyup="activarBoton()">' +
        '<span id="textoRespuesta"><strong>' + cuestionario.getListaReflexion() +'</strong>.</span>' +
        '<br><p>Indica tu respuesta en el espacio en blanco.</p>' +
        '</form>';
    document.getElementById('information_span').innerHTML = content;
    document.getElementById('button_continue').setAttribute('onclick','validar()');
    /*onclick*/
    removeFocus(new Array('button_continue'));
    disabledButtons(new Array('button_continue'));
  }
}
function saveCrtResponse() {
  cuestionario.respuestasReflexion.push(document.forms["reflexion"]["respuestaReflexion"].value);
  cuestionarioCrt();
}