/*FLUJO DEL PROGRAMA*/
function experimentFlow(state) {
  switch(state){
    case 0:
      /*Se para el reloj*/
      clearInterval(experiment.getIdTimeInstructions());
      /*Ocultar pantalla de instrucciones y mostrar la de ensayos*/
      hideDisplay(new Array('screen'));
      showDisplay(new Array('experiment'));
      /*Se inicializan los arrays sequenceYes y sequenceNo*/
      experiment.loadSequenceYes();
      experiment.loadSequenceNo();
      setTimeout("preResponse()", 1000);
      //preResponse();
    break;
    case 1:
      /*Se quita el foco del botón y se oculta.
      Se oculta el texto y la imagen del panel3.
      Se oculta la imagen del panel3*/
      document.getElementById('button_nextTrial').blur();
      hideVisibility(new Array('text_panel2','text_panel3','img_panel2','img_panel3','button_nextTrial'));
      /*Ponemos imagen panel 2 en blanco para que cargue mejor la imagen*/   
      document.getElementById('img_panel2').src = "";
      /*Se incrementa el número de ensayos*/
      experiment.addCurrentTrial();
      //if(experiment.getCurrentTrial() === 3){
      if(experiment.getCurrentTrial() === experiment.getNumberOfTrialsPerPhase()){
        experiment.addCurrentPhase();
        experiment.setCurrentTrial(0);
        if(experiment.getCurrentPhase() === 1){
          batatrimQuestion();
        }else if(experiment.getCurrentPhase() === 2) {
          dugetilQuestion();
        }
        /*Pantalla con la pregunta*/
      } else{
        /*Siguiente ensayo*/
        preResponse();
      }
    break;
    case 2:
      /*Se ha respondido a la pregunta del Batatrim*/
      /*Se oculta el div question*/
      hideDisplay(new Array('question'));
      /*Guardamos el valor de la respuesta*/
      experiment.responsesSlider.push(experiment.getResponse());
      /*Vamos a la pantalla de instrucciones de Dugetil*/
      var texto = dugetilInstructionsScreen();
      /*Quitar foco de los botones*/
      document.getElementById('button_back').blur();
      document.getElementById('button_continue').blur();
      /*Inyectar texto*/
      document.getElementById('encabezado').innerHTML = texto[0];
      document.getElementById('information_span').innerHTML = texto[1];
      /*Botón continuar evento onclick*/
      document.getElementById('button_continue').setAttribute('onclick','experimentFlow(0)');
    break;
    case 3:
      /*Se oculta el div question*/
      hideDisplay(new Array('question'));
      /*Guardamos el valor de la respuesta*/
      experiment.responsesSlider.push(experiment.getResponse());
      /*Se ha respondido a la pregunta de Dugetil hay dos opciones:
      ir a la pantalla de guardar datos o ir al cuestionario*/
      var balanceo = experiment.getBalance();
      if(balanceo <= 3 || (balanceo >= 7 && balanceo <= 9)){
        /*Cuestionario*/
        document.getElementById('experiment_name_header').innerHTML = 'Cuestionario';
        cuestionarios();
      }else {
        /*Guardar datos*/
        postScreen('send');
      }
    break;
  }
}
function preResponse(){
  /*Mostrar contenido panel1*/
  document.getElementById('text_panel1').innerHTML = experiment.suffer[experiment.getCurrentPhase()];
  document.getElementById('img_panel1').src = experiment.img[experiment.getCurrentPhase()];
  /*Mostrar contenido panel2*/
  document.getElementById('text_panel2').innerHTML = experiment.message[experiment.getCurrentPhase()];
  /*Asignamos valores a las variables*/
  experiment.activeKey = true;
  experiment.pressedKey = false;
  showVisibility(['img_panel1','text_panel1','text_panel2']);
  /*Tiempo de espera*/
  setTimeout('saveResponse()',3000);
}
function postResponse(textResponse,imgResponse,textOutcome,imgOutcome){
  /*Insertar texto*/
  document.getElementById('text_panel2').innerHTML = textResponse;
  document.getElementById('text_panel3').innerHTML = textOutcome;
  /*Insertar imágenes*/
  document.getElementById('img_panel2').src = imgResponse;
  document.getElementById('img_panel3').src = imgOutcome;
  /*Ocultar texto e imagen panel superior*/
  hideVisibility(new Array('text_panel1','img_panel1'));
  /*Mostrar imagen panel2, texto panel 3, imagen panel 3 y botón*/
  showVisibility(['img_panel2','text_panel3','img_panel3','button_nextTrial']);
}
function batatrimQuestion(){
  hideDisplay(new Array('experiment'));
  showDisplay(new Array('screen','question'));
  var questionAndSlider = '<strong>¿Hasta qué punto crees que el Batatrim es efectivo para curar las ' +
  'crisis del síndrome de Lindsay?</strong><br/>0: Nada efectivo.<br/>50: Moderadamente ' +
  'efectivo.<br/>100: Perfectamente efectivo.';
  document.html.style.backgroundColor = "transparent";
  document.getElementById('button_continue').setAttribute('onclick','experimentFlow(2)');
  var encabezado = 'Opninión';
  var info = 'Haz click en la escala móvil de arriba y verás que aparece un cursor. ' +
  'Puedes arrastrar este cursor a cualquier punto de la escala. Una vez estés contento/a con ' +
  'tu respuesta, haz click en el botón de continuar.';
  document.getElementById('information_span').innerHTML = questionAndSlider;
  document.getElementById('encabezado').innerHTML = encabezado;
  document.getElementById('question').innerHTML = sliderHtml();
  document.getElementById('loc_question_info').innerHTML = info;
  createSlider();
  hideVisibility(new Array('button_continue','button_back'));
  hideDisplay(new Array('loc_value_slide'));
  document.getElementById('knob').style.background = "#CCC";
}
function dugetilQuestion(){
  hideDisplay(new Array('experiment'));
  showDisplay(new Array('screen','question'));
  var questionAndSlider = '<strong>¿Hasta qu&eacute; punto crees que el Dugetil es efectivo para ' +
  'curar las crisis del síndrome de Hamkaoman?</strong><br/>0: Nada efectivo.<br/>50: Moderadamente ' +
  'efectivo.<br/>100: Perfectamente efectivo.';
  document.html.style.backgroundColor = "transparent";
  document.getElementById('button_continue').setAttribute('onclick','experimentFlow(3)');
  var encabezado = 'Opninión';
  var info = 'Haz click en la escala móvil de arriba y verás que aparece un cursor. ' +
  'Puedes arrastrar este cursor a cualquier punto de la escala. Una vez estés contento/a con ' +
  'tu respuesta, haz click en el botón de continuar.';
  document.getElementById('information_span').innerHTML = questionAndSlider;
  document.getElementById('encabezado').innerHTML = encabezado;
  document.getElementById('question').innerHTML = sliderHtml();
  document.getElementById('loc_question_info').innerHTML = info;
  createSlider();
  hideVisibility(new Array('button_continue','button_back'));
  hideDisplay(new Array('loc_value_slide'));
  document.getElementById('knob').style.background = "#CCC";  
}
function init() {
  experiment.init();
  var balanceo = experiment.getBalance();
  cuestionario.init(balanceo);
  if((balanceo <= 3) || (balanceo >= 7 && balanceo <= 9) ) {
    /*Secuencia primero ensayos luego encuesta*/
    currentInstructions();
  } else {
    /*Cambiar texto del encabezado*/
    document.getElementById('experiment_name_header').innerHTML = 'Cuestionario';
    /*Secuencia primero encuesta luego ensayos*/
    cuestionarios();
  }
}
function preScreens(screen) {
  switch(screen)
  {
    case 'configure':
      availableResolution();
      var texto = configureScreen();
      hideVisibility(new Array('button_back'));
      /*Asignar evento onclick*/
      document.getElementById('button_continue').setAttribute('onclick','storeConfiguration()');
      break;
    case 'init':
      var texto = initScreen();
      /*ocultar botón*/
      hideVisibility(new Array('button_back'));
      /*Asignar evento onclick*/
      document.getElementById('button_continue').setAttribute('onclick','preScreens("ethic")');
      /*Cambiar estilo, por si retroceden.*/
      document.getElementById("information_article").style.textAlign = "center";
      break;
    case 'ethic':
      var texto = ethicScreen();
      /*Cambiar estilo*/
      document.getElementById("information_article").style.textAlign = "justify";
      /*Buttons*/
      showVisibility(new Array('button_back'));
      /*Asignar evento onclick*/
      document.getElementById('button_continue').setAttribute('onclick','init()');
      document.getElementById('button_back').setAttribute('onclick','preScreens("init")');
      break;
  }
  /*Quitar foco de los botones*/
  document.getElementById('button_back').blur();
  document.getElementById('button_continue').blur();
  /*Inyectar texto*/
  document.getElementById('encabezado').innerHTML = texto[0];
  document.getElementById('information_span').innerHTML = texto[1];
}
function postScreen(screen) {
  switch(screen)
  {
    case 'send':
      var texto = sendScreen();
      /*Atento, hay que ver si viene de pasar ensayos o el test*/
      /*Eliminar del árbol DOM el elemento question*/
      var list=document.getElementById("information_article");
      list.removeChild(list.childNodes[2]);
      hideDisplay(new Array('question'));
      document.getElementById('button_continue').innerHTML = 'Enviar';
      document.getElementById('button_back').innerHTML = 'Cancelar';
      document.getElementById('button_continue').setAttribute('onclick','saveData();postScreen("end")');
      showVisibility(new Array('button_back'));
      document.getElementById('button_back').setAttribute('onclick','postScreen("end")');
      /*Esto es de prueba hay que ponerlo justo cuando ejecuta las fases*/
      clearInterval(experiment.getIdTimeInstructions());
      break;
    case 'end':
      var texto = endScreen();
      /*Insertar texto en los botones*/
      document.getElementById('button_back').innerHTML = 'Explicación';
      document.getElementById('button_continue').innerHTML = 'Referencias';
      /*Ocultar botón explicaciones*/
      hideVisibility(['button_back']);
      /*Asignar valor onclick*/
      document.getElementById('button_continue').setAttribute('onclick','postScreen("references")');
      //document.getElementById('button_back').setAttribute('onclick','postScreen("explanation")');
      break;
    case 'references':
      var texto = referencesScreen();
      hideVisibility(new Array('button_continue'));
      //showVisibility(new Array('button_back'));
      //document.getElementById('button_back').setAttribute('onclick','postScreen("explanation")');
      break;
    case 'explanation':
      var texto = explanationScreen();
      hideVisibility(new Array('button_back'));
      showVisibility(new Array('button_continue'));
      document.getElementById('button_continue').setAttribute('onclick','postScreen("references")');
      break;
  }
  /*Quitar foco de los botones*/
  document.getElementById('button_back').blur();
  document.getElementById('button_continue').blur();
  /*Inyectar texto*/
  document.getElementById('encabezado').innerHTML = texto[0];
  document.getElementById('information_span').innerHTML = texto[1];
}
/*FIN DEL FLUJO DEL PROGRAMA*/
/*FUNCIONES DE UTILIDAD*/
//Handler to capture when the user presses a key
/*Función encargada de capturar que teclas presionadas*/
function captureKeyPress(event) 
{
  if (!document.all)
  { // Netscape/Firefox/Opera
    var keyChar = event.which;
  }
  else
  { // IE
    var keyChar = window.event.keyCode;
  }
  /*var evento = event || window.event;
  var keyChar = evento.charCode || evento.keyCode;*/
  if(experiment.activeKey === true)
  {
    if(keyChar === 32)
    {
      experiment.pressedKey = true;
    }
  }
}
document.onkeypress = captureKeyPress;
function availableResolution() {
  var width = screen.availWidth;
  var height = screen.availHeight;
  var resolution = String(Math.round(height*0.67)) + 'px';
  document.getElementById('information_article').style.height = resolution;
  if(experiment.getLanguage() === "es")
  {
    alert("Para correr el experimento en pantalla completa pulsa la tecla F11."); 
  }
  else if(experiment.getLanguage() === "en")
  {
    alert("To run the experiment in full screen press F11.")
  }
}
function randomGroup() {
  experiment.setGroup(Math.floor((Math.random()*experiment.getGroupLimit())+1));
}
function randomBalance() {
  experiment.setBalance(Math.floor((Math.random()*experiment.getBalanceNumber())+1));
}
function fisherYates (myArray) {
  var i = myArray.length, j, tempi, tempj;
  if ( i === 0 ) return false;
  while ( --i ) {
     j = Math.floor( Math.random() * ( i + 1 ) );
     tempi = myArray[i];
     tempj = myArray[j];
     myArray[i] = tempj;
     myArray[j] = tempi;
   }
}
/*
 * Dectect browser 
 */
function browserDetect()
{
  if(navigator.userAgent.toLowerCase().indexOf('chrome') !=-1)
  {
    return 'Chrome';
  }
  if (navigator.userAgent.indexOf('MSIE') !=-1) 
  {
        return 'Internet Explorer';
  }
  if (navigator.userAgent.indexOf('Firefox') !=-1) 
  {
        return 'Firefox';
  }
  if (navigator.userAgent.indexOf('Safari') !=-1)
  {
    return 'Safari';
  }
  else
  {
    return 'Navegador desconocido';
  }
}
/*Functions that show and hide the references on init screen*/
function showReferences() {
  var texto = referencesScreen();
  document.getElementById('references').innerHTML = texto[1];
  showVisibility(new Array("references","btnClose"));
}
function hideAndShowReferences() {
  elemento = document.getElementById('references');
  if(elemento.style.visibility === 'visible') {
    hideVisibility(new Array("references"));
  } else {
    var texto = referencesScreen();
    document.getElementById('references').innerHTML = texto[1];
    showVisibility(new Array("references"));
  }
}
/*Función que inserta el copyright en un párrafo*/
function insertCopyright() {
  var copy = '&copy;' + insertDevelopers() + experiment.getYear() + '. Estás ' +
  'autorizado a utilizar este programa con fines de investigación ' +
  'o docencia, con o sin modificaciones, con la única condición de ' +
  'que cites a los autores, el nombre del programa y la página web ' +
  'donde puede descargarse. Se prohibe expresamente la publicación ' +
  'de este programa en otros sitios o medios, así como cualquier ' +
  'utilización comercial del mismo sin el permiso explícito de los ' +
  'autores.';
  return copy;
}
/*Función que inserta los desarrolladores en un párrafo*/
function insertDevelopers() {
  var longitud = experiment.developers.length;
  var cadena = new String();
  if(longitud === 1) {
    cadena = experiment.developers[0] + " ";
  } else {
    for(var i=0;i<longitud;i++) {
      if(i < longitud-2) {
        cadena = cadena + experiment.developers[i] + ", ";
      } else if(i < longitud-1) {
        cadena = cadena + experiment.developers[i];
      } else {
        if(experiment.getLanguage() === "es")
        {
          cadena = cadena + " y " + experiment.developers[i] + " ";
        }
        else if(experiment.getLanguage() === "en")
        {
          cadena = cadena + " and " + experiment.developers[i] + " ";
        }
      }
    }
  }
  return cadena;
}
/*Función que guarda el colegio, edad y sexo seleccionado por el experimentador*/
function storeConfiguration() {
  experiment.setSex(document.input.sexo.options[document.input.sexo.selectedIndex].value);
  var age = document.forms["input"]["edad"].value;
  var school = document.forms["input"]["colegio"].value;
  if((age === null || age === "") && (school === null || school ==="")) {
    alert('Introduzca el colegio, la edad y el sexo.');
    return;
  }
  if(age === null || age === "") {
    alert("Introduzca la edad.");
    return;
  } else if(isNaN(age)){
    alert("En el campo edad solo se pueden introducir digitos.")
    return;
  }
  experiment.setAge(parseInt(age));
  if(school === null || school ==="") {
    alert("Introduzca el colegio.");
    return;
  }
  experiment.setSchool(school);
  /*añadido*/
  var balanceo = document.forms["input"]["balanceo"].value;
  experiment.setBalance(parseInt(balanceo));
  preScreens("init");
}
/**************************************************************************
***************************************************************************
************************Experiment Functions*******************************
***************************************************************************
**************************************************************************/
/*Information about style.visibility and style.display*/
/*Hiding an element can be done by setting the display property to "none" or
the visibility property to "hidden". However, notice that these two methods
produce different results:
visibility:hidden hides an element, but it will still take up the same space
as before. The element will be hidden, but still affect the layout.
display:none hides an element, and it will not take up any space. The element
will be hidden, and the page will be displayed as if the element is not there*/
/*Hide and show elements*/
function hideVisibility(elementsList) {
  for (var i=0;i<elementsList.length;i++) {
    document.getElementById(elementsList[i]).style.visibility = "hidden";
  }
}
function showVisibility(elementsList) {
  for (var i=0;i<elementsList.length;i++) {
    document.getElementById(elementsList[i]).style.visibility = "visible";
  }
}
/*Hide and show messages*/
function hideDisplay(elementsList) {
  for (var i=0;i<elementsList.length;i++) {
    document.getElementById(elementsList[i]).style.display = "none";
  }
}
function showDisplay(elementsList) {
  for (var i=0;i<elementsList.length;i++) {
    document.getElementById(elementsList[i]).style.display = "block";
  }
}
/*Insert text*/
function injectText(idList,textList) {
  for (var i=0;i<idList.length;i++) {
    document.getElementById(idList[i]).innerHTML = textList[i];
  }
}
/*Insert images*/
function insertImages(idList,sourceList) {
  for (var i=0;i<idList.length;i++) {
    document.getElementById(idList[i]).source = sourceList[i];
  }
}
/*Focus remove*/
function removeFocus(idList) {
  for(var i=0;i<idList.length;i++) {
    document.getElementById(idList[i]).blur();
  }
}
/*activar desactivar botones*/
function enabledButtons(idList)
{
  for(var i=0;i<idList.length;i++) {
    var button = document.getElementById(idList[i]);
    button.disabled = false;
  }
}
function disabledButtons(idList)
{
  for(var i=0;i<idList.length;i++) {
    var button = document.getElementById(idList[i]);
    button.disabled = true;
  }
}
/*Create slider*/
function sliderHtml() {
  var code = '<div id="containerTable"><table id="sliderTable"><tr>' +
  '<td class="cell_value_left"><strong><span class="loc_min_value" id="loc_min_value">0</span></strong></td>' +
  '<td class="cslider_middle"><strong><span id="loc_middle_value" class="loc_middle_value"></span></strong></td>' +
  '<td class="cell_value_right"><strong><span class="loc_max_value" id="loc_max_value">100</span></strong></td></tr>'  +
  '<tr><td class="cell_value_left"></td><td class="cslider">' +
  '<div id="slider" class="slider"><div id="knob" class="knob"></div></div>' +
  '</td><td class="cell_value_right"></td></tr></table></div>' +
  '<div class="valueSlide"><p id="loc_value_slide" class="loc_value_slide"></p>' +
  '<p><span class="loc_question_info" id="loc_question_info"></span></p></div>';
  return code;
}
function createSlider() {
  jQuery.noConflict();
  var slider = $('slider');
  new Slider(slider, slider.getElement('.knob'), {
    range: [0,100],
    steps: 100,
    onChange: function(value){
      document.getElementById('knob').style.background = "blue";
      if(experiment.getLanguage() === "en")
        document.getElementById('loc_value_slide').innerHTML = 'Response: ' + value;
      else
        document.getElementById('loc_value_slide').innerHTML = 'Respuesta: ' + value;
      showVisibility(new Array('button_continue'));
      showDisplay(new Array('loc_value_slide'));
      experiment.setResponse(value);
    }
  });
}
/************************************************************************************************
*************************************************************************************************
*************************************************************************************************/
function sendEmail(data) {
    if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    } else { // code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.open("POST", "Datasent.asp", true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send("data="+data);
}
function stringDate() {
  var fecha = new Date();
  return(String(fecha.getDate() + "/" + (fecha.getMonth()+1) + "/" + fecha.getFullYear() +
  "-" + fecha.getHours() + ":" + fecha.getMinutes() + ":" + fecha.getSeconds()));
}
function sendBrowser(data) {
  "use strict";
  if(typeof(Storage)!=="undefined") {
    // Yes! localStorage and sessionStorage support!
    var id = "";
    id = experiment.getCode() + stringDate();
    localStorage.setItem(id,data);
  } else {
    // Sorry! No web storage support..
    alert("Sorry! No web storage support..");
  }
}
function saveData() {
  var i;
  var data = new String();
  var fecha = new Date();
  var navegador = browserDetect();
  var listYes = experiment.countYesResponse();
  data = navegador + "," + fecha.getDate() + "/" + (fecha.getMonth()+1) + "/" + 
  fecha.getFullYear() + "," + fecha.getHours() + ":" + fecha.getMinutes() + ":" + 
  fecha.getSeconds() + "," + experiment.getId() + "," + experiment.getBalance() + "," +
  experiment.getSchool() + "," + experiment.getSex() + "," + experiment.getAge() + ",";
  /*Orden en tarea de contingencias*/
  if(experiment.contingency[0] === 'nula'){
    data = data + '1,' + experiment.responsesSlider[0] + ',' + experiment.responsesSlider[1] + ',' +
    listYes[0] + ',' + listYes[1] + ',';
    /*Secuencia de ensayos contingencia nula*/
    for(i = 0;i < experiment.phases[0].length;i++){
      data = data + experiment.phases[0][i].getType() + ',';
    }
    data = data + ",";
    /*Secuencia de ensayos contingencia positiva*/
    for(i = 0;i < experiment.phases[1].length;i++){
      data = data + experiment.phases[1][i].getType() + ',';
    }
  }else{
    data = data + '2,' + experiment.responsesSlider[1] + ',' + experiment.responsesSlider[0] + ',' +
    listYes[0] + ',' + listYes[1] + ',';
    /*Secuencia de ensayos contingencia nula*/
    for(i = 0;i < experiment.phases[1].length;i++){
      data = data + experiment.phases[1][i].getType() + ',';
    }
    data = data + ",";
    /*Secuencia de ensayos contingencia positiva*/
    for(i = 0;i < experiment.phases[0].length;i++){
      data = data + experiment.phases[0][i].getType() + ',';
    }
  }
  /*Guardar datos cuestionarios*/
  for (i = 0; i < cuestionario.respuestasCreencias.length; i++) {
    data = data + cuestionario.respuestasCreencias[i] + ",";
  }
  for (i = 0; i < cuestionario.respuestasActitud.length; i++) {
    data = data + cuestionario.respuestasActitud[i] + ",";
  }
  for (i = 0; i < cuestionario.respuestasReflexion.length; i++) {
    data = data + cuestionario.respuestasReflexion[i] + ",";
  }
  /*Enviar datos*/
  if(experiment.getMode() === "online") {
    sendEmail(String(data));
  } else {
    sendBrowser(String(data));
  }
}
/*FIN DE FUNCIONES DE UTILIDAD*/