var experiment = new experiment();
/*Objects: Experiment,trial,question*/
function experiment() {
  this.code = "x132a";
  this.experimentName = "Tarea de Medicinas";
  this.year = "2013";
  this.developers = new Array("Tomás de la Vega","Itxaso Barbería","Fernando Blanco","Helena Matute");
  /*mode value(online,offline)*/
  this.mode = "online";
  /*Lenguaje por defecto del experimento, se puede cambiar en función del grupo.*/
  this.language = "es";
  /*Identificador de sujeto*/
  this.id = null;
  /*Número de Balanceos*/
  this.balanceNumber = 12;
  /*Balanceo*/
  this.balance = null;
  /*Datos a recoger*/
  this.sex = null;
  this.age = null;
  this.school = null;
  /*******************/
  this.pressedKey = false;
  this.activeKey = false;
  this.currentTrial = 0;
  this.idTimeInstructions = 0;
  this.timeInstructions = 0;
  this.response = 0;
  /*Lista de fases con sus respectivos ensayos.Fase 1 Batatrim, Fase 2 Dugetil*/
  this.phases = [[],[]];
  this.numberOfTrialsPerPhase = [40,40];
  this.currentPhase = 0;
  this.contingency = [];
  this.responsesSlider = [];
  /*Array de 8 elementos con probabilidad alta de outcome*/
  this.sequenceYes = new Array(8);
  /*Array de 8 elementos con probabilidad alta de no outcome*/ 
  this.sequenceNo = new Array(8);
  /*Textos flujo de ensayos*/
  this.suffer = new Array("Este paciente sufre una crisis del síndrome de Lindsay.",
    "Este paciente sufre una crisis del síndrome de Hamkaoman.");
  this.img = new Array("pictures/lindsay.gif","pictures/hamkaoman.gif","pictures/health.gif");
  this.message = new Array('<strong>¡Puedes administrar el Batatrim ahora!</strong><br/>(Pulsando la barra espaciadora)',
    '<strong>¡Puedes administrar el Dugetil ahora!</strong><br/>(Pulsando la barra espaciadora)');
  this.result = new Array("El paciente <span style=\"color:red;\"><strong>no</strong></span> ha superado la crisis.","El paciente <span style=\"color:green;\"><strong>s&iacute;</strong></span> ha superado la crisis.");
  this.yesMedicine = [{img:"pictures/batatrim.gif",
  text:"Has administrado el Batatrim."},
  {img:"pictures/dugetil.gif",
  text:"Has administrado el Dugetil."}];
  this.noMedicine = [{img:"pictures/batatrim-no.gif",
  text:"No has administrado el Batatrim."},
  {img:"pictures/dugetil-no.gif",
  text:"No has administrado el Dugetil."}];
  /*Métodos*/
  this.generateId = function(){var id = Math.floor((Math.random()*1000000)+1);this.setId(id);};
  this.getId = function(){return this.id;};
  this.getCode = function(){return this.code;};
  this.getExperimentName = function(){return this.experimentName;};
  this.getYear = function(){return this.year;};
  this.getMode = function(){return this.mode;};
  this.getBalance = function(){return this.balance;};
  this.getBalanceNumber = function(){return this.balanceNumber;};
  this.getSchool = function() {return this.school;};
  this.getSex = function(){return this.sex;};
  this.getAge = function(){return this.age;};
  this.getLanguage = function() {return this.language;};
  this.getCurrentTrial = function(){return this.currentTrial;};
  this.getCurrentPhase = function(){return this.currentPhase;};
  this.getCurrentContigency = function(){return this.contingency[this.currentPhase];};
  this.getTimeInstructions = function(){return this.timeInstructions;};
  this.getIdTimeInstructions = function(){return this.idTimeInstructions;};
  this.getNumberOfTrialsPerPhase = function(){return this.numberOfTrialsPerPhase[this.currentPhase];};
  this.getResponse = function(){return this.response;};
  /*Set*/
  this.setId = function(id){this.id = id;};
  this.setCode = function(code){this.code = code;};
  this.setExperimentName = function(name){this.experimentName = name;};
  this.setYear = function(year){this.year = year;};
  this.setMode = function(mode){this.mode = mode;};
  this.setBalance = function(balance){this.balance = balance;};
  this.setBalanceNumber = function(limit){this.BalanceLimit = limit;};
  this.setSex = function(sex){this.sex = sex;};
  this.setAge = function(age){this.age = age;};
  this.setSchool = function(school) {this.school = school;};
  this.setLanguage = function(language){this.language = language;};
  this.setTimeInstructions = function(seconds){this.timeInstructions = seconds;};
  this.setIdTimeInstructions = function(id){this.idTimeInstructions = id;};
  this.setCurrentTrial = function(currentTrial){this.currentTrial = currentTrial;};
  this.setCurrentPhase = function(currentPhase){this.currentPhase = currentPhase;};
  this.setResponse = function(value){this.response = value;};
  /*other functions*/
  this.addTrial = function(response,outcome){
    this.phases[this.currentPhase].push(new trial(response,outcome));
  };
  this.addCurrentTrial = function(){this.currentTrial++;};
  this.addCurrentPhase = function() {this.currentPhase++;};
  this.addCurrentQuestion = function(){this.currentQuestion++;};
  this.addTimeInstructions = function(){this.timeInstructions++;};
  /*Función que configura el experimento*/
  this.init = function() {
    this.generateId();
    if(this.mode === 'online') {
      //this.balance = Math.floor((Math.random()*experiment.getBalanceNumber())+1);
    } else {
      /*Hay que agregar en la pantalla de inicio una opción de balanceo.
      Ahora lo voy a usar para hacer pruebas*/
      //this.balance = 1;
    }
    if(this.balance < 7) {
      this.contingency.push('nula');
      this.contingency.push('positiva');
    } else {
      this.contingency.push('positiva');
      this.contingency.push('nula');
    }
  };
  this.loadSequenceYes = function(){this.sequenceYes = generateSequence(8,6,2);};
  this.loadSequenceNo = function(){
    if(this.getCurrentContigency() === 'nula'){
      this.sequenceNo = generateSequence(8,6,2);
    } else{
      this.sequenceNo = generateSequence(8,1,7);
    }
  };
  this.countYesResponse = function(){
    var cont1 = 0;
    var cont2 = 0;
    for(var i = 0;i<experiment.phases[0].length;i++){
        if(experiment.phases[0][i].response === 1){
          cont1++;
        }
    }
    for(var i = 0;i<experiment.phases[1].length;i++){
      if(experiment.phases[1][i].response === 1){
        cont2++;
      }
    }
    if(experiment.contingency[0] === 'nula'){
      return new Array(cont1,cont2);
    }else{
      return new Array(cont2,cont1);
    }
  };
}
function trial(response,outcome) {
  this.outcome = outcome;
  this.response = response;
  this.getOutcome = function(){return this.outcome;};
  this.getResponse = function(){return this.response;};
  this.setOutcome = function(type){this.outcome = outcome;};
  this.setResponse = function(response){this.response = response;};
  this.getType = function(){
    if(this.response === 1 && this.outcome === 1)
      return 'a';
    else if(this.response === 1 && outcome === 0)
      return 'b';
    else if(this.response === 0 && this.outcome === 1)
      return 'c';
    else if(this.response === 0 && this.outcome === 0)
      return 'd';
    else
      return 'f';
  };
}
function question(text,response){
  this.question = text;
  this.response = response;
  this.getQuestion = function(){return this.question;};
  this.getResponse = function(){return this.response;};
  this.setQuestion = function(question){this.question = question;};
  this.setResponse = function(response){this.response = response;};
}
/******************************************************************
*******************************************************************
******************************************************************/
function saveResponse(){
  var response = 0;
  var textResponse;
  var imgResponse;
  var textOutcome;
  var imgOutcome;
  var outcome;
  if(experiment.pressedKey === true){
    response = 1;
    if(experiment.sequenceYes.length === 0){
      experiment.loadSequenceYes();
    }
    outcome = experiment.sequenceYes.shift();
    textResponse = experiment.yesMedicine[experiment.currentPhase].text;
    imgResponse = experiment.yesMedicine[experiment.currentPhase].img;
  } else{
    if(experiment.sequenceNo.length === 0){
      experiment.loadSequenceNo();
    }
    outcome = experiment.sequenceNo.shift();
    textResponse = experiment.noMedicine[experiment.currentPhase].text;
    imgResponse = experiment.noMedicine[experiment.currentPhase].img;
  }
  experiment.addTrial(response,outcome);
  textOutcome = experiment.result[outcome];
  if(outcome === 1){
    imgOutcome = experiment.img[2];
  } else{
    imgOutcome = experiment.img[experiment.currentPhase];
  }
  experiment.pressedKey = false;
  experiment.activeKey = false;
  postResponse(textResponse,imgResponse,textOutcome,imgOutcome);
}
function generateSequence(total,number_outcomes,number_no_outcomes)
{
  var sequence = new Array(total);
  for(var i=0;i<total;i++)
  {
    if(i < number_outcomes)
      sequence[i] = 1;
    else
      sequence[i] = 0;
  }
  fisherYates(sequence);
  return (sequence);
}
/*Pantallas*/
function configureScreen() {
  var encabezado = "Configuración del experimento";
  var texto = '<form name="input">' +
  '<strong>Colegio</strong>:<input type="text" id="colegio" name="colegio"/>' +
  '<strong>Edad</strong>:<input id="edad" name="edad" maxlength="2"/>' +
  '<strong>Sexo</strong>:<select name="sexo"><option value="masculino">Hombre</option>' +
  '<option value="femenino">Mujer</option></select>' +
  '<strong>Balanceo</strong>:<input id="balanceo" name="balanceo" maxlength="2"/>' +
  '</form>' +
  '<p id="warning_message"></p>';
  return new Array(encabezado,texto);
}
function initScreen() {
  //var encabezado = experiment.getExperimentName();
  var encabezado = "";
  var texto = '(Software para psicologia Experimental)<br>' +
  'Versión 1.0, Español, ' + experiment.getYear() + '<br>' +
  '<a href="#">http://www.labpsico.com</a><br>' +
  '<a href="#" onclick="hideAndShowReferences()">Créditos, Copyright y Artículos en los ' +
  'que se describe este programa</a>' +
  '<p id="references"></p>';
  return new Array(encabezado,texto);
}
function ethicScreen() {
  document.getElementById('experiment_name_header').innerHTML = experiment.getExperimentName();
  var encabezado = "TU PARTICIPACIÓN ES VOLUNTARIA Y ANÓNIMA";
  var texto = 'Antes de nada queremos agradecer tu participación ' +
  'en este experimento, ya que sin la colaboración de personas ' +
  'como tú no sería posible esta investigación.<br>Debes saber ' +
  'que en esta tarea no hay respuestas buenas ni malas. Lo que ' +
  'queremos estudiar son los mecanismos psicológicos básicos que ' +
  'se dan en todas las personas. Para ello, necesitamos que, si '+
  'deseas participar, lo hagas con el mayor interés. No tienes que ' +
  'identificarte, y los datos que nos aportes se unirán a los ' +
  'del total del grupo y serán analizados estadísticamente. Tu ' +
  'participación es voluntaria y anónima.<br>Si tras haber leído ' +
  'el mensaje deseas continuar, pulsa en el botón \'Continuar\'.';
  return new Array(encabezado,texto);
}
function currentInstructions() {
  if(experiment.getCurrentPhase() === 0){
    var texto = batatrimInstructionsScreen();
  } else {
    var texto = dugetilInstructionsScreen();
  }
  /*Asignar evento onclick al botón continuar*/
  document.getElementById('button_continue').setAttribute('onclick','experimentFlow(0)');
  /*ocultar botón*/
  hideVisibility(new Array('button_back'));
  /*Quitar foco de los botones*/
  document.getElementById('button_back').blur();
  document.getElementById('button_continue').blur();
  /*Inyectar texto*/
  document.getElementById('encabezado').innerHTML = texto[0];
  document.getElementById('information_span').innerHTML = texto[1];
  /*Activar reloj*/
  experiment.setIdTimeInstructions(setInterval(function(){experiment.addTimeInstructions()},1000));
}
function batatrimInstructionsScreen() {
  var encabezado = "Instrucciones";
  var texto = 'Imagina que eres un médico que trabaja en el laboratorio de investigación ' +
  'de una universidad. Eres especialista en una enfermedad muy rara y peligrosa llamada ' +
  '"Síndrome de Lindsay", que hay que tratar muy rápido en urgencias. Las crisis que ' +
  'provoca esta enfermedad podrían curarse inmediatamente con una medicina llamada ' +
  '"Batatrim", pero esta medicina aún está en fase experimental, por lo que todavía ' +
  'no se ha comprobado claramente su efectividad.<br><br>' +
  'A continuación, te vamos a presentar una serie de fichas médicas de pacientes que ' +
  'están sufriendo una crisis del Síndrome de Lindsay. En cada ficha verás un paciente ' +
  'y se te dará la oportunidad de administrarle o no el Batatrim.<br/><br/>El procedimiento ' +
  'será el siguiente: para cada nuevo paciente dispondrás de 3 segundos durante los cuales ' +
  'debes decidir si quieres administrar el Batatrim (<strong>presionando la barra espaciadora ' +
  'una única vez</strong>) o no administrarlo (<strong>en tal caso no debes hacer nada</strong>). ' +
  'Durante este tiempo aparecerá un mensaje en la pantalla diciendo "¡Puedes administrar el ' +
  'Batatrim ahora!". Pasados los 3 segundos te informaremos de si efectivamente el paciente ' +
  'superó las crisis. A continuación observarás el siguiente paciente.<br/><br/>Intenta ' +
  'averiguar hasta qu&eacute; punto es efectivo el Batatrim. Cuando hayas observado a un ' +
  'buen número de pacientes te haremos una pregunta.';
  return new Array(encabezado,texto);
}
function dugetilInstructionsScreen() {
  var encabezado = "Instrucciones";
  var texto = 'Ya has terminado de estudiar el Batatrim y su influencia en el Síndrome de Lindsay. ' +
  'Muchas gracias por tu colaboración.<br>Ahora te vamos a pedir que evalúes una segunda medicina ' +
  'en relación a otra enfermedad totalmente distinta llamada "Síndrome de Hamkaoman", que ' +
  'también es muy rara y peligrosa y que hay que tratar muy rápido en urgencias. De nuevo, ' +
  'las crisis que provoca esta enfermedad podrían curarse inmediatamente con esta medicina ' +
  'llamada "Dugetil", pero la medicina aún está en fase experimental, por lo que todavía no se ' +
  'ha comprobado claramente su efectividad.<br><br>' +
  'Tal y como hemos hecho en la fase anterior, te vamos a presentar una serie de fichas médicas ' +
  'de pacientes, que en este caso están sufriendo una crisis del Síndrome de Hamkaoman. En cada ' +
  'ficha verás un paciente y se te dará la oportunidad de administrarle o no el Dugetil. ' +
  'A continuación observarás si efectivamente el paciente superó la crisis. Intenta averiguar ' +
  'hasta qué punto es efectivo el Dugetil. Cuando hayas observado a un buen número de pacientes ' +
  'te haremos una pregunta.';
  return new Array(encabezado,texto);
}
function sendScreen() {
  var encabezado = "Enviar datos";
  var texto = 'A continuación podrás enviar los resultados para ' +
  'que se incluyan en nuestro estudio, los datos que nos aportes se ' +
  'unirán a los del grupo y serán analizados estadísticamente. ' +
  'Para hacerlo haz click en el botón "Enviar". Si por alguna razón ' +
  'no deseas enviarnóslos haz click en el botón "Cancelar".';
  return new Array(encabezado,texto);
}
function endScreen() {
  var encabezado = experiment.getCode();
  var texto = 'Gracias por participar. Para ver las ' +
  'referencias del experimento haz click en el botón "Referencias".';
  return new Array(encabezado,texto);
}
function referencesScreen() {
  var encabezado = 'Referencias';
  var texto = 'Software de psicología experimental.<br>' +
  'Versión 1.0, Español, ' + experiment.getYear() + '.<br>' +
  'http://www.labpsico.com</a><br>' + insertCopyright();
  /*'<a href="http://www.labpsico.com" target="_blank">' +
  'http://www.labpsico.com</a><br>' + insertCopyright();*/
  return new Array(encabezado,texto);
}
function explanationScreen() {
  var encabezado = 'Explicación';
  var texto = 'Antes de nada queremos darte las gracias por tu colaboración en ' +
  'este experimento. Nuestra labor de investigación sería imposible ' +
  'si no fuera por la participación voluntaria de personas como tú ' +
  'que deciden dedicarnos parte de su tiempo. Suponemos que ahora ' +
  'que has terminado el experimento te gustaria recibir una explicación ' +
  'sobre lo que tratabamos de estudiar.<br> En este experimento ...<br>' +
  'Para saber más:<br>Si estás interesado en saber más acerca de la ' +
  'psicología del aprendizaje, te recomendamos que consultes alguno ' +
  'de los libros de texto, como por ejemplo, Domjan, M. (2003). ' +
  'Principios de aprendizaje y conducta. (5ª Edición). Madrid: ' +
  'Thomsom-Paraninfo.<br>' + insertCopyright();
  return new Array(encabezado,texto);
}