/* =====================================================================
   TÍLDATE · MI ACORDEÓN DE TILDES — Banco de palabras revisado
   Método del Mtro. Jesús Rodríguez García (EST17)

   FORMATO: cada palabra va BIEN ESCRITA (con su tilde, si la lleva)
   y separada en sílabas con guiones.  Ej.  'ca-mión'
   El motor calcula solo: sílaba tónica, tipo de palabra, regla que
   aplica y si la palabra "rompe la regla" (hiato acentual).

   Para agregar palabras, solo escríbelas en la lista que corresponda.
   IMPORTANTE: evita palabras que sin tilde formen OTRA palabra
   (papá/papa, público/publico, río/rio…). Esas van en DB_CAMBIA,
   donde la frase da el contexto.
   ===================================================================== */
const DB_ACORDEON = {

  agudas: [
    /* con tilde: terminan en N, S o vocal */
    'ca-mión','can-ción','ca-fé','so-fá','bo-tón','jar-dín','a-vión','ra-tón',
    'co-ra-zón','ja-más','a-de-más','in-glés','bal-cón','sar-tén','co-li-brí',
    'te-lón','ta-bú','des-pués','lec-ción','a-quí','sa-lió','co-mió',
    /* sin tilde: NO terminan en N, S ni vocal */
    're-loj','pa-pel','a-zul','ciu-dad','fe-liz','ver-dad','co-mer','can-tar',
    'a-mor','ca-ra-col','na-riz','a-ni-mal','se-ñor','es-pa-ñol','ca-lor',
    'pa-red','tam-bor','mo-tor'
  ],

  graves: [
    /* con tilde: NO terminan en N, S ni vocal */
    'ár-bol','lá-piz','a-zú-car','fá-cil','di-fí-cil','cár-cel','cés-ped',
    'ál-bum','mó-vil','ú-til','dó-cil','ca-dá-ver','fút-bol','ám-bar',
    'al-mí-bar','dé-bil','há-bil','lí-der','ná-car',
    /* sin tilde: terminan en N, S o vocal */
    'me-sa','ca-sa','li-bro','za-pa-to','ca-mi-sa','ven-ta-na','jo-ven',
    'e-xa-men','cri-sis','pe-rro','ca-lle','pla-ya','gui-ta-rra','lu-nes',
    'que-so','mar-tes','or-den','es-cue-la'
  ],

  esdrujulas: [
    'mú-si-ca','te-lé-fo-no','quí-mi-ca','lá-gri-ma','pá-ja-ro','bó-ve-da',
    'pe-lí-cu-la','lám-pa-ra','pi-rá-mi-de','mur-cié-la-go','sá-ba-do',
    'miér-co-les','brú-ju-la','plá-ta-no','rá-pi-do','cá-ma-ra','ú-ni-co',
    'sí-la-ba','mé-to-do','re-lám-pa-go','es-tó-ma-go','án-gu-lo',
    'lá-pi-ces','jó-ve-nes','e-xá-me-nes','ár-bo-les','ma-te-má-ti-cas'
  ],

  sobresdrujulas: [
    'dí-ga-me-lo','dí-ga-se-lo','ex-plí-ca-me-lo','cóm-pra-se-lo',
    'cuén-ta-me-lo','re-gá-la-se-lo','prés-ta-me-lo','có-me-te-lo',
    'guár-da-me-lo','de-vuél-ve-me-lo','llé-va-te-lo','en-tré-ga-se-lo',
    'es-crí-be-me-lo','mués-tra-me-lo','a-pún-ta-te-lo'
  ],

  hiatos: [
    /* rompen la regla: la vocal débil (i, u) suena fuerte y lleva tilde */
    'dí-a','son-rí-e','tí-a','frí-o','ma-íz','ra-íz','ba-úl','re-ír','o-ír',
    'le-í-do','o-í-do','ca-í-da','grú-a','ac-tú-a','re-ú-ne','po-li-cí-a',
    'ba-te-rí-a','pa-na-de-rí-a','pro-hí-be','bú-ho',
    /* hiatos que SÍ cumplen la regla (para comparar) */
    'pa-ís','le-ón','po-e-ta','ca-er','te-a-tro','a-é-re-o','pe-or','ma-es-tro'
  ]
};

/* =====================================================================
   LA TILDE CAMBIA EL SIGNIFICADO
   Cada grupo: formas [palabra separada en sílabas, significado]
   y una frase por forma (en el mismo orden). ___ marca el hueco.
   ===================================================================== */
const DB_CAMBIA = [
  { formas:[['tér-mi-no','el final o límite de algo'],['ter-mi-no','yo lo acabo (ahora)'],['ter-mi-nó','él o ella lo acabó (antes)']],
    frases:['El ___ del partido llegó muy rápido.','Siempre ___ la tarea antes de cenar.','Mi hermana ___ el libro anoche.'] },
  { formas:[['prác-ti-co','que sirve o es útil'],['prac-ti-co','yo hago práctica (ahora)'],['prac-ti-có','él o ella hizo práctica (antes)']],
    frases:['Este cuaderno es muy ___ para la escuela.','Todos los días ___ con mi guitarra.','Ayer Ana ___ su discurso frente al espejo.'] },
  { formas:[['pú-bli-co','las personas que ven algo, o lo que es para todos'],['pu-bli-co','yo doy a conocer algo (ahora)'],['pu-bli-có','él o ella dio a conocer algo (antes)']],
    frases:['El ___ aplaudió al terminar la obra.','Cada semana ___ un video en mi canal.','El periódico ___ la noticia ayer.'] },
  { formas:[['cál-cu-lo','una operación matemática'],['cal-cu-lo','yo saco la cuenta (ahora)'],['cal-cu-ló','él o ella sacó la cuenta (antes)']],
    frases:['Hice el ___ del área en mi libreta.','Con la calculadora ___ el total.','La maestra ___ el promedio del grupo.'] },
  { formas:[['á-ni-mo','las ganas o el buen humor'],['a-ni-mo','yo doy apoyo (ahora)'],['a-ni-mó','él o ella dio apoyo (antes)']],
    frases:['Hoy amanecí con mucho ___.','Desde la tribuna ___ a mi equipo.','El entrenador ___ a los jugadores en el medio tiempo.'] },
  { formas:[['tí-tu-lo','el nombre de un libro o un diploma'],['ti-tu-lo','yo le pongo nombre (ahora)'],['ti-tu-ló','él o ella le puso nombre (antes)']],
    frases:['Escribe el ___ con letra grande.','Siempre ___ mis dibujos antes de entregarlos.','El autor ___ su novela «El viaje».'] },
  { formas:[['lí-mi-te','la orilla o el final de algo'],['li-mi-te','que yo ponga un tope'],['li-mi-té','yo puse un tope (antes)']],
    frases:['El río marca el ___ entre los dos terrenos.','Mi mamá me pide que ___ el tiempo en el celular.','Ayer ___ mis horas de videojuegos.'] },
  { formas:[['crí-ti-co','quien opina o juzga algo'],['cri-ti-co','yo hablo mal de algo (ahora)'],['cri-ti-có','él o ella habló mal de algo (antes)']],
    frases:['El ___ de cine escribió una reseña.','Yo no ___ a mis compañeros: mejor los ayudo.','El vecino ___ el ruido de la fiesta.'] },
  { formas:[['de-pó-si-to','un lugar donde se guarda algo'],['de-po-si-to','yo guardo o meto dinero (ahora)'],['de-po-si-tó','él o ella guardó o metió dinero (antes)']],
    frases:['Llenaron el ___ de agua.','Cada quincena ___ mis ahorros en el banco.','Mi tía ___ el dinero en su cuenta.'] },
  { formas:[['cé-le-bre','famoso'],['ce-le-bre','que yo festeje'],['ce-le-bré','yo festejé (antes)']],
    frases:['Frida Kahlo es una pintora ___.','Mi abuela quiere que ___ mi cumpleaños con ella.','El sábado ___ mi cumpleaños con mis primos.'] },
  { formas:[['con-ti-nuo','que no se detiene'],['con-ti-nú-o','yo sigo (ahora)'],['con-ti-nuó','él o ella siguió (antes)']],
    frases:['Se escuchaba un ruido ___ toda la noche.','Después del descanso, ___ con la lectura.','La lluvia ___ hasta la madrugada.'] },
  { formas:[['pa-pa','el tubérculo que se come'],['pa-pá','el padre']],
    frases:['Puse una ___ a cocer.','Mi ___ me lleva a la escuela.'] },
  { formas:[['sá-ba-na','la tela que cubre la cama'],['sa-ba-na','una llanura con pasto']],
    frases:['Cambié la ___ de mi cama.','Las jirafas viven en la ___ africana.'] },
  { formas:[['es-ta','señala algo cercano (esta mochila)'],['es-tá','del verbo estar']],
    frases:['___ mochila es nueva.','Mi perro ___ dormido en el patio.'] },
  { formas:[['se-cre-ta-ria','la persona que trabaja en una oficina'],['se-cre-ta-rí-a','la oficina o dependencia']],
    frases:['La ___ de la dirección nos dio los horarios.','Fui a la ___ de Educación por mi certificado.'] },
  { formas:[['cor-tes','plural de corte'],['cor-tés','amable, educado']],
    frases:['Me hice dos ___ con el papel.','El niño fue muy ___ con la visita.'] }
];

/* =====================================================================
   TILDE DIACRÍTICA
   con = forma con tilde, sin = forma sin tilde.
   Cada frase indica cuál va: 'con' o 'sin'. ___ marca el hueco.
   ===================================================================== */
const DB_DIACRITICA = [
  { con:'tú', sin:'tu', conSig:'pronombre: la persona (tú cantas)', sinSig:'posesivo: lo que es tuyo (tu casa)',
    frases:[['___ eres el siguiente en pasar.','con'],['¿Ya trajiste ___ cuaderno?','sin'],['¿Vienes ___ al partido?','con'],['___ letra es muy clara.','sin']] },
  { con:'él', sin:'el', conSig:'pronombre: un hombre o un niño (él juega)', sinSig:'artículo: va antes de un sustantivo (el balón)',
    frases:[['Ese regalo es para ___.','con'],['___ autobús llegó tarde.','sin'],['Mi primo dice que ___ ganó la carrera.','con'],['Dejé ___ libro en la mesa.','sin']] },
  { con:'mí', sin:'mi', conSig:'pronombre, después de una preposición (para mí)', sinSig:'posesivo o nota musical (mi casa)',
    frases:[['¿Esta carta es para ___?','con'],['___ mamá trabaja en un hospital.','sin'],['A ___ me gustan los tacos.','con'],['Olvidé ___ mochila en el salón.','sin']] },
  { con:'sí', sin:'si', conSig:'afirmación (sí quiero)', sinSig:'condición (si llueve, no salgo)',
    frases:[['___ estudias, vas a aprobar.','sin'],['Le pregunté y me dijo que ___.','con'],['No sé ___ podré ir mañana.','sin'],['¡Claro que ___ voy a la excursión!','con']] },
  { con:'más', sin:'mas', conSig:'cantidad (más agua)', sinSig:'significa «pero» (casi no se usa)',
    frases:[['Quiero ___ agua, por favor.','con'],['Corrí ___ rápido que ayer.','con'],['Lo intentó, ___ no pudo lograrlo.','sin']] },
  { con:'té', sin:'te', conSig:'la bebida (un té caliente)', sinSig:'pronombre (te quiero)',
    frases:[['Mi abuela prepara ___ de canela.','con'],['¿___ ayudo con la tarea?','sin'],['___ espero a la salida.','sin'],['Me tomé un ___ de manzanilla.','con']] },
  { con:'dé', sin:'de', conSig:'del verbo dar (que me dé)', sinSig:'preposición (la casa de Ana)',
    frases:[['Pídele que te ___ la hoja.','con'],['La mochila ___ Luis es azul.','sin'],['Ojalá el maestro nos ___ más tiempo.','con'],['Tengo un vaso ___ agua.','sin']] },
  { con:'sé', sin:'se', conSig:'del verbo saber (yo sé)', sinSig:'pronombre (se fue)',
    frases:[['Yo ___ la respuesta.','con'],['El gato ___ subió al árbol.','sin'],['No ___ dónde dejé mis llaves.','con'],['Mi tío ___ compró un carro.','sin']] },
  { con:'qué', sin:'que', conSig:'pregunta o exclamación (¿qué haces?)', sinSig:'une dos ideas (dijo que vendría)',
    frases:[['¿___ hora es?','con'],['Me dijo ___ llegaría tarde.','sin'],['¡___ bonito día!','con'],['No sé ___ hacer con este problema.','con'],['El libro ___ me prestaste es increíble.','sin']] },
  { con:'cómo', sin:'como', conSig:'pregunta por la manera (¿cómo estás?)', sinSig:'compara o es del verbo comer (como pan)',
    frases:[['¿___ te llamas?','con'],['Tengo hambre, por eso ___ mucho.','sin'],['Explícame ___ resolviste el ejercicio.','con'],['Corre ___ el viento.','sin']] },
  { con:'dónde', sin:'donde', conSig:'pregunta por el lugar (¿dónde estás?)', sinSig:'señala un lugar, sin preguntar (vivo donde empieza el camino)',
    frases:[['¿___ está mi lápiz?','con'],['Vivo ___ empieza la carretera.','sin'],['No recuerdo ___ dejé mi suéter.','con'],['La tienda ___ compramos el pan ya cerró.','sin']] },
  { con:'cuándo', sin:'cuando', conSig:'pregunta por el tiempo (¿cuándo llegas?)', sinSig:'señala un momento, sin preguntar (cuando llegues, avísame)',
    frases:[['¿___ es tu cumpleaños?','con'],['___ termine la clase, salimos al patio.','sin'],['Avísame ___ llegues a tu casa.','sin'],['Pregúntale ___ es el examen.','con']] }
];

/* =====================================================================
   DETECTIVE DE TILDES
   Escribe cada texto BIEN ACENTUADO. El juego le quita todas las
   tildes y el alumno debe encontrar dónde iban.
   ===================================================================== */
const DB_DETECTIVE = [
  { titulo:'Paseo por el malecón',
    texto:'El sábado fuimos al malecón de Campeche. Mi papá compró un helado de limón y mi mamá tomó muchas fotografías del atardecer. Después caminamos hasta el baluarte y escuchamos la música de una banda.' },
  { titulo:'La clase de Matemáticas',
    texto:'Ayer en la clase de Matemáticas el maestro explicó cómo se calcula el área de un triángulo. Yo no entendí al principio, pero mi compañera me ayudó con un ejemplo fácil y al final resolví todos los ejercicios.' },
  { titulo:'¿Qué harías tú?',
    texto:'¿Qué harías si encontraras un teléfono en la calle? Lo más honesto es buscar a su dueño. Tú puedes llevarlo a la dirección de la escuela o pedirle ayuda a un policía.' },
  { titulo:'El café de la abuela',
    texto:'Mi abuela dice que el café de olla sabe mejor en diciembre. Lo prepara con canela y piloncillo, y siempre nos sirve una taza después de la cena. A mí me gusta más el chocolate. También prepara tamales de chaya.' },
  { titulo:'El murciélago',
    texto:'El murciélago es un animal nocturno. Aunque mucha gente le tiene miedo, ayuda a controlar los insectos y a polinizar algunas plantas, como el agave. Los científicos estudian cómo se orienta en la oscuridad. Sin él, el ecosistema perdería su equilibrio.' },
  { titulo:'El día del examen',
    texto:'Cuando llegó el día del examen, Luis estaba nervioso. Repasó sus apuntes, respiró profundo y escribió su nombre. Al terminar, la maestra le dijo: «Sé que te esforzaste mucho». Luis sonrió.' },
  { titulo:'Edzná',
    texto:'La pirámide de Edzná es una joya de la cultura maya. Los mayas observaban el Sol y las estrellas con mucha precisión, y crearon un calendario más exacto que el de los europeos de su época.' },
  { titulo:'Un buen hábito',
    texto:'Él siempre llega temprano a la escuela. Antes de entrar, saluda al conserje, revisa su mochila y se asegura de traer su lápiz, su cuaderno y su botella de agua. ¡Qué buen hábito!' }
];
