const Alexa = require('ask-sdk-core');

var persistenceAdapter = getPersistenceAdapter();
const i18n = require('i18next');
const sprintf = require('i18next-sprintf-postprocessor');

const info = require('./comidas');

const estadoComidas= require('./documentAPL');

const DOCUMENT_ID = estadoComidas.DOCUMENT_ID;
const DOCUMENT_IDBienvenida = estadoComidas.DOCUMENT_IDBienvenida;
const DOCUMENT_ID2 = estadoComidas.DOCUMENT_ID2;
const DOCUMENT_ID3 = estadoComidas.DOCUMENT_ID3;
const DOCUMENT_ID4 = estadoComidas.DOCUMENT_ID4;
const DOCUMENT_ID5 = estadoComidas.DOCUMENT_ID5;
const DOCUMENT_ID6 = estadoComidas.DOCUMENT_ID6;
const DOCUMENT_IDVeracruz = estadoComidas.DOCUMENT_IDVeracruz;
const DOCUMENT_IDHidalgo = estadoComidas.DOCUMENT_IDHidalgo;
const DOCUMENT_IDGuerrero = estadoComidas.DOCUMENT_IDGuerrero;
const DOCUMENT_IDOaxaca = estadoComidas.DOCUMENT_IDOaxaca;
const DOCUMENT_IDPuebla = estadoComidas.DOCUMENT_IDPuebla;
const datasource2 = estadoComidas.datasource2;
const datasource3 = estadoComidas.datasource3;
const datasource4 = estadoComidas.datasource4;
const datasource5 = estadoComidas.datasource5;
const datasource6 = estadoComidas.datasource6;

const  datasourceVeracruz = estadoComidas.datasourceVeracruz;
const  datasourceHidalgo = estadoComidas.datasourceHidalgo;
const  datasourceGuerrero = estadoComidas.datasourceGuerrero;
const  datasourceOaxaca = estadoComidas.datasourceOaxaca;
const  datasourcePuebla = estadoComidas.datasourcePuebla;
//REGIONES
const DOCUMENT_IDHUASTECA = estadoComidas.DOCUMENT_IDHUASTECA;
const  datasourceHUASTECA = estadoComidas.datasourceHUASTECA;
const DOCUMENT_IDOCCIDENTE = estadoComidas.DOCUMENT_IDOCCIDENTE;
const  datasourceOCCIDENTE = estadoComidas.datasourceOCCIDENTE;
const DOCUMENT_IDNORTE = estadoComidas.DOCUMENT_IDNORTE;
const  datasourceNORTE = estadoComidas.datasourceNORTE;
const DOCUMENT_IDSURESTE = estadoComidas.DOCUMENT_IDSURESTE;
const datasourceSURESTE = estadoComidas.datasourceSURESTE;
//REGIONES INGLES
const DOCUMENT_IDhuasteca = estadoComidas.DOCUMENT_IDhuasteca;
const  datasourcehuasteca = estadoComidas.datasourcehuasteca;
const DOCUMENT_IDoccidente = estadoComidas.DOCUMENT_IDoccidente;
const  datasourceoccidente = estadoComidas.datasourceoccidente;
const DOCUMENT_IDnorte = estadoComidas.DOCUMENT_IDnorte;
const  datasourcenorte = estadoComidas.datasourcenorte;
const DOCUMENT_IDsureste = estadoComidas.DOCUMENT_IDsureste;
const  datasourcesureste = estadoComidas.datasourcesureste;

const DOCUMENT_IDCancelar = estadoComidas.DOCUMENT_IDCancelar;
const  datasourceCancelar = estadoComidas.datasourceCancelar;
const DOCUMENT_IDCANCELAR = estadoComidas.DOCUMENT_IDCANCELAR;
const  datasourceCANCELAR = estadoComidas.datasourceCANCELAR;
const DOCUMENT_IDAyuda = estadoComidas.DOCUMENT_IDAyuda;
const  datasourceAyuda = estadoComidas.datasourceAyuda;
const DOCUMENT_IDAYUDA = estadoComidas.DOCUMENT_IDAYUDA;
const  datasourceAYUDA = estadoComidas.datasourceAYUDA;
const createDirectivePayload = estadoComidas.createDirectivePayload;

function getPersistenceAdapter() {
    function isAlexaHosted() {
        return process.env.S3_PERSISTENCE_BUCKET ? true : false;
    }
    const tableName = 'comidas_mexicanas_table';
    if(isAlexaHosted()) {
        const {S3PersistenceAdapter} = require('ask-sdk-s3-persistence-adapter');
        return new S3PersistenceAdapter({ 
            bucketName: process.env.S3_PERSISTENCE_BUCKET
        });
    } else {
        const {DynamoDbPersistenceAdapter} = require('ask-sdk-dynamodb-persistence-adapter');
        return new DynamoDbPersistenceAdapter({ 
            tableName: tableName,
            createTable: true
        });
    }
} 
const estadosComidasFoods = {
    
    oaxaca: [
    {
      en: 'Mole negro: It is one of the most emblematic and recognized dishes of Oaxaca. It is considered the main dish of the region and one of the most complex and flavorful moles in Mexican cuisine.',
      es: 'Mole negro: Es uno de los platos más emblemáticos y reconocidos de Oaxaca. Es considerado el platillo principal de la región y uno de los moles más complejos y sabrosos de la gastronomía mexicana.',
      
    }
  ],
  hidalgo: [
    {
      es: 'Pastes: Es considerado el platillo típico de Pachuca de Soto y Mineral del Monte. Los ingredientes del paste tradicional, deben estar crudos al momento de ser envueltos en la masa, sus ingredientes son papa, cebolla, carne picada, pimienta, chile y sal; actualmente existen diferentes tipos de rellenos.',
      en: 'Pastes: It is considered the typical dish of Pachuca de Soto and Mineral del Monte. The ingredients of the traditional paste must be raw at the time of being wrapped in the dough. Its ingredients are potato, onion, minced meat, pepper, chili, and salt. Currently, there are different types of fillings.'
    }
  ],
      puebla: [
        {
         es: "Chiles en nogada: Este platillo esencialmente consiste en un chile poblano relleno de carne de res y puerco, mezclados con fruta: plátano, manzana, pera, durazno y bañados con una salsa de nuez.",
         en: "Chiles en nogada: This dish essentially consists of a poblano chili filled with beef and pork, mixed with fruits such as banana, apple, pear, peach, and topped with a walnut sauce."
        }
      ],
      veracruz: [
        {
           es:"Pescado a la veracruzana: El pescado a la veracruzana es un plato típico de la gastronomía de Veracruz, originario de la región de Sotavento. La salsa está hecha de cebolla, ajo, tomate, jalapeños, aceitunas y hierbas, y el pescado se hornea con la salsa hasta que esté tierno.",
           en: "Pescado a la veracruzana: Veracruz style fish is a typical dish in Veracruz cuisine, originating from the Sotavento region. The sauce is made with onion, garlic, tomato, jalapeños, olives, and herbs. The fish is baked with the sauce until tender."
        }
      ],
      guerrero: [
        {
           es:"Pozole verde: Preparado con tomates verdes, epazote y pepita de calabaza, se dice que proviene del estado de Guerrero, y en algunos casos se agrega chicharrón de puerco y aguacate para acompañar.",
           en: "Pozole verde: Prepared with green tomatoes, epazote, and pumpkin seeds, it is said to originate from the state of Guerrero. In some cases, pork rinds and avocado are added as toppings."
        }
      ],
      yucatan: [
        {
          es:"Cochinita pibil: Es un guiso correspondiente a la gastronomía de Yucatán, basado en carne de cerdo adobada en achiote, envuelta en hoja de plátano y cocida dentro de un horno de tierra.",
          en: "Cochinita pibil: It is a traditional dish in Yucatan cuisine, made with pork marinated in achiote, wrapped in banana leaves, and cooked in an underground oven."
        }
      ]
};

const regionComidasFoods = {
    
    huasteca: [
    {
      en: 'Zacahuil: The zacahuil is a traditional tamale from the Huasteca region of the states of Hidalgo, Puebla, Querétaro, San Luis Potosí, Tamaulipas and Veracruz, it is made of corn dough, dried chili peppers, lard and pork or pork. ',
      es: 'Zacahuil: El zacahuil es un tamal tradicional de la región huasteca de los estados de Hidalgo, Puebla, Querétaro, San Luis Potosí, Tamaulipas y Veracruz,está hecho de masa de maíz, chiles secos, manteca y carne de cerdo o puerco.',
      
    }
  ],
  occidente: [
    {
      es: 'Pozole rojo: Este pozole tiene entre sus ingredientes el chile ancho y el chile guajillo, asimismo, puede ser con carne de cerdo o pollo, incluso hay quienes agregan pavo..',
      en: 'Pozole rojo: This pozole has among its ingredients ancho chile and guajillo chile, likewise, it can be with pork or chicken, and some even add turkey.',
    }
    ],
    norte: [
    {
      es: 'barbacoa: La barbacoa es un estilo de comida  que consiste en preparar la comida, fundamentalmente carnes, a la parrilla al calor de un fuego o lumbre.',
      en: 'barbacoa: Barbecue is a style of food that consists of preparing food, mainly meat, on the grill in the heat of a fire or fire..',
    }
    ],
    sureste: [
    {
      es: 'cochinita pibil: La cochinita pibil es la joya de la gastronomía maya.Su preparación tradicional consiste en marinar primero la carne de cerdo en un zumo de cítricos muy ácido, concretamente de naranjas amargas.',
      en: 'cochinita pibil: The cochinita pibil is the jewel of Mayan gastronomy. Its traditional preparation consists of first marinating the pork in a very acidic citrus juice, specifically bitter oranges.',
    }
    ]
};

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        const {attributesManager} = handlerInput;
        const sessionAttributes = attributesManager.getSessionAttributes();
        const requestAttributes = attributesManager.getRequestAttributes();
   
        const name = sessionAttributes['nombre'];
        let speechText = requestAttributes.t('WELCOME');
        if(name !== null || name !== ''){
            speechText = requestAttributes.t('WELCOME_MSJE',name)
            //speechText = 'Bienvenido ' + nombre +', Quieres volver a ver la información sobre las comidas tipicas solo tienes que decir comida tipica del estado de "hidalgo" o comida tipica de la región"huasteca"';
        }
        
        let language =  "en";
        
        // Obtienes el idioma 
        const request = handlerInput.requestEnvelope.request;
        const userLocale = request.locale;
        if (userLocale.startsWith('es')) {
            language = 'español';
        } else if (userLocale.startsWith('en')) {
            language = 'inglés';
        }
        
        if (language === "español" ){
            if (Alexa.getSupportedInterfaces(handlerInput.requestEnvelope)['Alexa.Presentation.APL']) {
              const aplDirective = createDirectivePayload(DOCUMENT_ID);
              handlerInput.responseBuilder.addDirective(aplDirective);
            }
        } else if (language === "inglés" ) {
            if (Alexa.getSupportedInterfaces(handlerInput.requestEnvelope)['Alexa.Presentation.APL']) {
              const aplDirective = createDirectivePayload(DOCUMENT_IDBienvenida);
              handlerInput.responseBuilder.addDirective(aplDirective);
            }
        }
        
    return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .getResponse();
    }
};

const EstadoComidasIntentHandler = {
  
    canHandle(handlerInput){
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
        && Alexa.getIntentName(handlerInput.requestEnvelope) === 'EstadoComidasIntent';
    },
      handle(handlerInput) {
    const { attributesManager } = handlerInput;
    const requestAttributes = attributesManager.getRequestAttributes();
    const sessionAttributes = attributesManager.getSessionAttributes();
    const { estado } = handlerInput.requestEnvelope.request.intent.slots;
    const { comida } = handlerInput.requestEnvelope.request.intent.slots;
    let language =  "en";
    let response
      
    //Obtienes el idioma 
    const request = handlerInput.requestEnvelope.request;
    const userLocale = request.locale;
    if (userLocale.startsWith('es')) {
        language = 'español';
    } else if (userLocale.startsWith('en')) {
        language = 'inglés';
    }

  if (estado && estadosComidasFoods[estado.value]) {
    const estadoValue = estado.value.toLowerCase();

    if (language === "español" && estadosComidasFoods[estadoValue]) {
      const comidasEstado = estadosComidasFoods[estadoValue];
      const randomIndex = Math.floor(Math.random() * comidasEstado.length);
      response = comidasEstado[randomIndex].es; // Obtiene la traducción en español
      
      switch (estado.value) {
      case "oaxaca":
        if (Alexa.getSupportedInterfaces(handlerInput.requestEnvelope)['Alexa.Presentation.APL']) {
          const aplDirective = createDirectivePayload(DOCUMENT_ID2, datasource2);
          handlerInput.responseBuilder.addDirective(aplDirective);
        }
        break;
      case "hidalgo":
        if (Alexa.getSupportedInterfaces(handlerInput.requestEnvelope)['Alexa.Presentation.APL']) {
          const aplDirective = createDirectivePayload(DOCUMENT_ID3, datasource3);
          handlerInput.responseBuilder.addDirective(aplDirective);
        }
        break;
      case "puebla":
        if (Alexa.getSupportedInterfaces(handlerInput.requestEnvelope)['Alexa.Presentation.APL']) {
          const aplDirective = createDirectivePayload(DOCUMENT_ID4, datasource4);
          handlerInput.responseBuilder.addDirective(aplDirective);
        }
        break;
      case "veracruz":
        if (Alexa.getSupportedInterfaces(handlerInput.requestEnvelope)['Alexa.Presentation.APL']) {
          const aplDirective = createDirectivePayload(DOCUMENT_ID5, datasource5);
          handlerInput.responseBuilder.addDirective(aplDirective);
        }
        break;
      case "guerrero":
        if (Alexa.getSupportedInterfaces(handlerInput.requestEnvelope)['Alexa.Presentation.APL']) {
          const aplDirective = createDirectivePayload(DOCUMENT_ID6, datasource6);
          handlerInput.responseBuilder.addDirective(aplDirective);
        }
        break;
        }
    
    } else if (language === "inglés" && estadosComidasFoods[estadoValue]) {
      const comidasEstado = estadosComidasFoods[estadoValue];
      const randomIndex = Math.floor(Math.random() * comidasEstado.length);
       response = comidasEstado[randomIndex].en; // Obtiene la traducción en inglés
      
      switch (estado.value) {
      case "oaxaca":
        if (Alexa.getSupportedInterfaces(handlerInput.requestEnvelope)['Alexa.Presentation.APL']) {
          const aplDirective = createDirectivePayload(DOCUMENT_IDOaxaca, datasourceOaxaca);
          handlerInput.responseBuilder.addDirective(aplDirective);
        }
        break;
      case "hidalgo":
        if (Alexa.getSupportedInterfaces(handlerInput.requestEnvelope)['Alexa.Presentation.APL']) {
          const aplDirective = createDirectivePayload(DOCUMENT_IDHidalgo, datasourceHidalgo);
          handlerInput.responseBuilder.addDirective(aplDirective);
        }
        break;
      case "puebla":
        if (Alexa.getSupportedInterfaces(handlerInput.requestEnvelope)['Alexa.Presentation.APL']) {
          const aplDirective = createDirectivePayload(DOCUMENT_IDPuebla, datasourcePuebla);
          handlerInput.responseBuilder.addDirective(aplDirective);
        }
        break;
      case "veracruz":
        if (Alexa.getSupportedInterfaces(handlerInput.requestEnvelope)['Alexa.Presentation.APL']) {
          const aplDirective = createDirectivePayload(DOCUMENT_IDVeracruz, datasourceVeracruz);
          handlerInput.responseBuilder.addDirective(aplDirective);
        }
        break;
      case "guerrero":
        if (Alexa.getSupportedInterfaces(handlerInput.requestEnvelope)['Alexa.Presentation.APL']) {
          const aplDirective = createDirectivePayload(DOCUMENT_IDGuerrero, datasourceGuerrero);
          handlerInput.responseBuilder.addDirective(aplDirective);
        }
        break;
        }

    }
            return handlerInput.responseBuilder
            .speak(response)
            .reprompt(response)
            .getResponse();
        
        }
    }

};

const RegionComidasIntentHandler = {
  
    canHandle(handlerInput){
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
        && Alexa.getIntentName(handlerInput.requestEnvelope) === 'RegionComidasIntent';
    },
      handle(handlerInput) {
    const { region } = handlerInput.requestEnvelope.request.intent.slots;
    let language =  "en";
    let response;
      
     //Obtienes el idioma 
    const request = handlerInput.requestEnvelope.request;
    const userLocale = request.locale;
    if (userLocale.startsWith('es')) {
        language = 'español';
    } else if (userLocale.startsWith('en')) {
        language = 'inglés';
    }

  if (region && regionComidasFoods[region.value]) {
    const regionValue = region.value.toLowerCase();

    if (language === "español" && regionComidasFoods[regionValue]) {
      const comidasRegion = regionComidasFoods[regionValue];
      const randomIndex = Math.floor(Math.random() * comidasRegion.length);
      response = comidasRegion[randomIndex].es; // Obtiene la traducción en español
      
      switch (region.value) {
      case "huasteca":
        if (Alexa.getSupportedInterfaces(handlerInput.requestEnvelope)['Alexa.Presentation.APL']) {
          const aplDirective = createDirectivePayload(DOCUMENT_IDHUASTECA, datasourceHUASTECA);
          handlerInput.responseBuilder.addDirective(aplDirective);
        }
        break;
        case "occidente":
        if (Alexa.getSupportedInterfaces(handlerInput.requestEnvelope)['Alexa.Presentation.APL']) {
          const aplDirective = createDirectivePayload(DOCUMENT_IDOCCIDENTE, datasourceOCCIDENTE);
          handlerInput.responseBuilder.addDirective(aplDirective);
        }
        break;
        case "norte":
        if (Alexa.getSupportedInterfaces(handlerInput.requestEnvelope)['Alexa.Presentation.APL']) {
          const aplDirective = createDirectivePayload(DOCUMENT_IDNORTE, datasourceNORTE);
          handlerInput.responseBuilder.addDirective(aplDirective);
        }
        break;
        case "sureste":
        if (Alexa.getSupportedInterfaces(handlerInput.requestEnvelope)['Alexa.Presentation.APL']) {
          const aplDirective = createDirectivePayload(DOCUMENT_IDSURESTE, datasourceSURESTE);
          handlerInput.responseBuilder.addDirective(aplDirective);
        }
        break;
      }
    } else if (language === "inglés" && regionComidasFoods[regionValue]) {
      const comidasRegion = regionComidasFoods[regionValue];
      const randomIndex = Math.floor(Math.random() * comidasRegion.length);
      response = comidasRegion[randomIndex].en; // Obtiene la traducción en inglés
      
      switch (region.value) {
      case "huasteca":
        if (Alexa.getSupportedInterfaces(handlerInput.requestEnvelope)['Alexa.Presentation.APL']) {
          const aplDirective = createDirectivePayload(DOCUMENT_IDhuasteca, datasourcehuasteca);
          handlerInput.responseBuilder.addDirective(aplDirective);
        }
        break;
         case "occidente":
        if (Alexa.getSupportedInterfaces(handlerInput.requestEnvelope)['Alexa.Presentation.APL']) {
          const aplDirective = createDirectivePayload(DOCUMENT_IDoccidente, datasourceoccidente);
          handlerInput.responseBuilder.addDirective(aplDirective);
        }
        break;
        case "norte":
        if (Alexa.getSupportedInterfaces(handlerInput.requestEnvelope)['Alexa.Presentation.APL']) {
          const aplDirective = createDirectivePayload(DOCUMENT_IDnorte, datasourcenorte);
          handlerInput.responseBuilder.addDirective(aplDirective);
        }
        break;
        case "sureste":
        if (Alexa.getSupportedInterfaces(handlerInput.requestEnvelope)['Alexa.Presentation.APL']) {
          const aplDirective = createDirectivePayload(DOCUMENT_IDsureste, datasourcesureste);
          handlerInput.responseBuilder.addDirective(aplDirective);
        }
      }
    }
  }
  return handlerInput.responseBuilder
    .speak(response)
    .reprompt(response)
    .getResponse();
    }
};


const NombreIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'NombreIntent';
    },
    handle(handlerInput) {
        const {attributesManager} = handlerInput;
        const sessionAttributes = attributesManager.getSessionAttributes();
        const intent = handlerInput.requestEnvelope.request.intent;
        
        const name = intent.slots.nombre.value;
        //Aqui se guarda el nombre
        sessionAttributes['nombre'] = name;
        let speakOutput = 'Hola ' + name + ', si quieres saber alguna información de alguna comida típica de algun estado región de México,solo tiene que decir comida tipica del estado de "hidalgo" o comida tipica de la región"huasteca"';
        
        if(name === null || name === ''){
            speakOutput = 'Ingresa tu nombre, puedes agregarlo diciendo "mi nombre es"'
        }
        
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .withShouldEndSession(false)
            .getResponse();
    }
};
const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const {attributesManager} = handlerInput;
        const sessionAttributes = attributesManager.getSessionAttributes();
        const requestAttributes = attributesManager.getRequestAttributes();
        
        let name = sessionAttributes['nombre'];
        if(name === '' || name === null){
            name = '';
        }
        
        const  speechText = requestAttributes.t('AYUDA', name);
        
        
        let language =  "en";
        let response;
        
        // Obtienes el idioma 
        const request = handlerInput.requestEnvelope.request;
        const userLocale = request.locale;
        if (userLocale.startsWith('es')) {
            language = 'español';
        } else if (userLocale.startsWith('en')) {
            language = 'inglés';
        }
        
        if (language === "español" ){
            if (Alexa.getSupportedInterfaces(handlerInput.requestEnvelope)['Alexa.Presentation.APL']) {
              const aplDirective = createDirectivePayload(DOCUMENT_IDAyuda,datasourceAyuda);
              handlerInput.responseBuilder.addDirective(aplDirective);
            }
        } else if (language === "inglés" ) {
            if (Alexa.getSupportedInterfaces(handlerInput.requestEnvelope)['Alexa.Presentation.APL']) {
              const aplDirective = createDirectivePayload(DOCUMENT_IDAYUDA,datasourceAYUDA);
              handlerInput.responseBuilder.addDirective(aplDirective);
            }
        }
        
        
      

        return handlerInput.responseBuilder
            .speak(speechText)
            .getResponse();
    }
};

const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
                || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const {attributesManager} = handlerInput;
        const sessionAttributes = attributesManager.getSessionAttributes();
        const requestAttributes = attributesManager.getRequestAttributes();
        
        let name = sessionAttributes['nombre'];
        if(name === '' || name === null){
            name = '';
        }
        
        const  speechText = requestAttributes.t('CANCELAR', name);
        
        
        let language =  "en";
        let response;
        
        // Obtienes el idioma 
        const request = handlerInput.requestEnvelope.request;
        const userLocale = request.locale;
        if (userLocale.startsWith('es')) {
            language = 'español';
        } else if (userLocale.startsWith('en')) {
            language = 'inglés';
        }
        
        if (language === "español" ){
            if (Alexa.getSupportedInterfaces(handlerInput.requestEnvelope)['Alexa.Presentation.APL']) {
              const aplDirective = createDirectivePayload(DOCUMENT_IDCancelar,datasourceCancelar);
              handlerInput.responseBuilder.addDirective(aplDirective);
            }
        } else if (language === "inglés" ) {
            if (Alexa.getSupportedInterfaces(handlerInput.requestEnvelope)['Alexa.Presentation.APL']) {
              const aplDirective = createDirectivePayload(DOCUMENT_IDCANCELAR,datasourceCANCELAR);
              handlerInput.responseBuilder.addDirective(aplDirective);
            }
        }
        
        
      

        return handlerInput.responseBuilder
            .speak(speechText)
            .getResponse();
    }
};

const FallbackIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.FallbackIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'Sorry, I don\'t know about that. Please try again.';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        console.log(`~~~~ Session ended: ${JSON.stringify(handlerInput.requestEnvelope)}`);
        return handlerInput.responseBuilder.getResponse();
    }
};

const IntentReflectorHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest';
    },
    handle(handlerInput) {
        const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
        const speakOutput = `You just triggered ${intentName}`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};

const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        const speakOutput = 'Sorry, I had trouble doing what you asked. Please try again.';
        console.log(`~~~~ Error handled: ${JSON.stringify(error)}`);

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

// FUNCIONES PARA TRADUCIR
const LoggingRequestInterceptor = {
    process(handlerInput) {
        console.log(`Incoming request: ${JSON.stringify(handlerInput.requestEnvelope.request)}`);
    }
};

const LoggingResponseInterceptor = {
    process(handlerInput, response) {
      console.log(`Outgoing response: ${JSON.stringify(response)}`);
    }
};

const LocalizationInterceptor = {
  process(handlerInput) {
    const localizationClient = i18n.use(sprintf).init({
      lng: handlerInput.requestEnvelope.request.locale,
      fallbackLng: 'en',
      overloadTranslationOptionHandler: sprintf.overloadTranslationOptionHandler,
      resources: info,estadosComidasFoods,
      returnObjects: true
    });

const attributes = handlerInput.attributesManager.getRequestAttributes();
    attributes.t = function (...args) {
      return localizationClient.t(...args);
    }
  }
}

//FUNCIONES PARA VERIFICAR Y GUARDAR DATOS DE LA SESIÓN
const LoadAttributesRequestInterceptor = {
    async process(handlerInput) {
        if(handlerInput.requestEnvelope.session['new']){
            const {attributesManager} = handlerInput;
            const persistentAttributes = await attributesManager.getPersistentAttributes() || {};
            handlerInput.attributesManager.setSessionAttributes(persistentAttributes);
        }
    }
};

const SaveAttributesResponseInterceptor = {
    async process(handlerInput, response) {
        const {attributesManager} = handlerInput;
        const sessionAttributes = attributesManager.getSessionAttributes();
        const shouldEndSession = (typeof response.shouldEndSession === "undefined" ? true : response.shouldEndSession);
        if(shouldEndSession || handlerInput.requestEnvelope.request.type === 'SessionEndedRequest') {        
            attributesManager.setPersistentAttributes(sessionAttributes);
            await attributesManager.savePersistentAttributes();
        }
    }
};

exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        EstadoComidasIntentHandler,
        RegionComidasIntentHandler,
        NombreIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        FallbackIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler)
    .addErrorHandlers(
        ErrorHandler)
    .addRequestInterceptors(
        LocalizationInterceptor,
        LoggingRequestInterceptor,
        LoadAttributesRequestInterceptor)
    .addResponseInterceptors(
        LoggingResponseInterceptor,
        SaveAttributesResponseInterceptor)
        .withPersistenceAdapter(persistenceAdapter)
    .withCustomUserAgent('sample/hello-world/v1.2')
    .lambda();