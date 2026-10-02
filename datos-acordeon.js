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
  /* última sílaba fuerte · 139 palabras */
  agudas: [
    'ca-mión','can-ción','ca-fé','so-fá','bo-tón','jar-dín','a-vión','ra-tón','co-ra-zón',
    'ja-más','a-de-más','bal-cón','sar-tén','co-li-brí','te-lón','ta-bú','des-pués','lec-ción',
    'a-quí','sa-lió','co-mió','re-loj','pa-pel','a-zul','ciu-dad','fe-liz','ver-dad','co-mer',
    'can-tar','a-mor','ca-ra-col','na-riz','a-ni-mal','se-ñor','es-pa-ñol','ca-lor','pa-red',
    'tam-bor','mo-tor','a-cor-de-ón','a-ten-ción','e-mo-ción','na-ción','pan-ta-lón','ca-jón',
    'ja-bón','al-go-dón','ma-ra-tón','ba-lón','ti-bu-rón','es-ca-lón','me-lón','ca-ñón',
    'del-fín','ma-le-tín','cal-ce-tín','jaz-mín','bo-le-tín','pin-güín','ja-po-nés','fran-cés',
    'in-te-rés','por-tu-gués','de-trás','a-trás','bam-bú','ma-ní','me-nú','pu-ré','co-rrió',
    'vi-vió','be-bió','a-pren-dió','dur-mió','su-bió','per-dió','cre-ció','re-ci-bió',
    'de-ci-dió','a-llí','a-cá','cin-tu-rón','hos-pi-tal','ca-pi-tal','cris-tal','pas-tel',
    'ho-tel','a-bril','ba-rril','pe-re-jil','lu-gar','sal-tar','co-rrer','dor-mir','es-cri-bir',
    'a-pren-der','mu-jer','co-lor','do-lor','sa-bor','va-lor','pin-tor','doc-tor','tem-blor',
    'a-mis-tad','li-ber-tad','sa-lud','ju-ven-tud','ca-paz','an-ti-faz','dis-fraz','ve-loz',
    'fe-roz','a-rroz','lom-briz','ac-triz','bon-dad','u-ni-dad','ca-li-dad','com-pás',
    'au-to-bús','vol-cán','hu-ra-cán','ta-pón','sa-lón','ta-zón','bas-tón','ver-sión','mi-sión',
    're-gión','re-li-gión','di-rec-ción','con-fu-sión','in-for-ma-ción','e-du-ca-ción',
    'ca-pi-tán','a-le-mán','cha-pu-lín','co-mal'
  ],

  /* penúltima sílaba fuerte · 129 palabras */
  graves: [
    'ár-bol','lá-piz','a-zú-car','fá-cil','di-fí-cil','cár-cel','cés-ped','ál-bum','mó-vil',
    'ú-til','dó-cil','ca-dá-ver','fút-bol','ám-bar','al-mí-bar','dé-bil','há-bil','lí-der',
    'ná-car','me-sa','ca-sa','pu-pi-tre','za-pa-to','ca-mi-sa','ven-ta-na','jo-ven','e-xa-men',
    'cri-sis','pe-rro','ca-lle','pla-ya','gui-ta-rra','lu-nes','que-so','mar-tes','or-den',
    'es-cue-la','á-gil','frá-gil','por-tá-til','ver-sá-til','fér-til','es-té-ril','fó-sil',
    'tú-nel','ca-rác-ter','cón-dor','án-gel','a-pós-tol','ca-ní-bal','hués-ped','dó-lar',
    'lá-ser','cá-liz','tó-rax','ó-nix','fé-nix','crá-ter','sué-ter','fé-mur','már-tir',
    'már-mol','cua-der-no','mo-chi-la','li-bre-ta','ti-je-ras','ho-ri-zon-te','mon-ta-ña',
    'pla-ne-ta','a-mi-go','fa-mi-lia','ca-rro','bi-ci-cle-ta','pa-ra-guas','o-ri-gen',
    'i-ma-gen','vo-lu-men','re-su-men','cri-men','mar-gen','jue-ves','vier-nes','pe-lo-ta',
    'glo-bo','pa-ya-so','tor-ti-lla','fri-jo-les','ta-cos','sal-sa','lla-ve','ma-es-tra',
    'co-ci-na','ca-ra-me-lo','ga-lle-ta','man-za-na','na-ran-ja','e-le-fan-te','ji-ra-fa',
    'ca-ba-llo','ma-ri-po-sa','cu-le-bra','tor-tu-ga','con-ser-je','cam-pa-na','ma-le-ta',
    'ca-mio-ne-ta','per-so-na','ca-be-za','ro-di-lla','o-re-ja','es-pal-da','pin-tu-ra',
    'cul-tu-ra','cien-cia','his-to-ria','lec-tu-ra','es-cri-tu-ra','a-ven-tu-ra','nu-be',
    'llu-via','tor-men-ta','sel-va','de-sier-to','is-la','la-gu-na','ve-ra-no','in-vier-no',
    'o-to-ño','pri-ma-ve-ra'
  ],

  /* antepenúltima sílaba fuerte (siempre con tilde) · 86 palabras */
  esdrujulas: [
    'mú-si-ca','te-lé-fo-no','quí-mi-ca','lá-gri-ma','pá-ja-ro','bó-ve-da','pe-lí-cu-la',
    'lám-pa-ra','pi-rá-mi-de','mur-cié-la-go','sá-ba-do','miér-co-les','brú-ju-la','plá-ta-no',
    'rá-pi-do','cá-ma-ra','ú-ni-co','sí-la-ba','mé-to-do','re-lám-pa-go','es-tó-ma-go',
    'án-gu-lo','lá-pi-ces','jó-ve-nes','e-xá-me-nes','ár-bo-les','ma-te-má-ti-cas','cás-ca-ra',
    'gló-bu-lo','es-pí-ri-tu','ve-hí-cu-lo','mú-si-co','tí-mi-do','pá-li-do','mi-cró-fo-no',
    'ló-gi-co','quí-mi-co','fí-si-ca','his-tó-ri-co','mag-né-ti-co','e-léc-tri-co',
    'sim-pá-ti-co','fan-tás-ti-co','plás-ti-co','cré-di-to','pró-xi-mo','tí-pi-co','ú-ti-les',
    'rá-fa-ga','mé-ri-to','a-rit-mé-ti-ca','bió-lo-go','a-ná-li-sis','sín-te-sis','dí-ga-me',
    'cóm-pra-lo','guár-da-lo','es-crí-be-lo','á-gui-la','tór-to-la','só-li-do','ví-bo-ra',
    'ce-rá-mi-ca','ki-ló-me-tro','cen-tí-me-tro','ter-mó-me-tro','pé-ta-lo','jí-ca-ra',
    'pe-rió-di-co','clá-si-co','ma-mí-fe-ro','hé-ro-e','ma-te-má-ti-co','bo-tá-ni-ca',
    'me-cá-ni-co','a-tó-mi-co','ca-rá-tu-la','tó-xi-co','sú-bi-to','ín-di-ce','pár-pa-do',
    'có-di-go','pó-li-za','a-cús-ti-ca','có-mi-ca','dé-ca-da'
  ],

  /* antes de la antepenúltima (siempre con tilde) · 41 palabras */
  sobresdrujulas: [
    'dí-ga-me-lo','dí-ga-se-lo','ex-plí-ca-me-lo','cóm-pra-se-lo','cuén-ta-me-lo',
    're-gá-la-se-lo','prés-ta-me-lo','có-me-te-lo','guár-da-me-lo','de-vuél-ve-me-lo',
    'llé-va-te-lo','en-tré-ga-se-lo','es-crí-be-me-lo','mués-tra-me-lo','a-pún-ta-te-lo',
    'mán-da-me-lo','pá-sa-me-lo','trá-e-me-lo','lé-e-me-lo','có-me-te-la','bé-be-te-lo',
    'pí-de-se-lo','dí-ga-se-la','llé-va-se-lo','quí-ta-te-lo','a-cér-ca-me-lo','en-sé-ña-me-lo',
    're-pí-te-me-lo','ex-plí-ca-nos-lo','a-ví-sa-me-lo','cuí-da-me-lo','guár-da-se-lo',
    'cán-ta-se-la','di-bú-ja-me-lo','es-cú-cha-me-lo','bús-ca-me-lo','fír-ma-me-lo',
    're-gá-la-me-lo','lá-va-te-las','pín-ta-me-lo','a-rré-gla-me-lo'
  ],

  /* vocales en sílabas distintas; muchas rompen la regla · 78 palabras */
  hiatos: [
    'dí-a','son-rí-e','tí-a','ma-íz','ra-íz','ba-úl','re-ír','o-ír','le-í-do','o-í-do',
    'ca-í-da','grú-a','ac-tú-a','re-ú-ne','po-li-cí-a','ba-te-rí-a','pa-na-de-rí-a','pro-hí-be',
    'bú-ho','pa-ís','le-ón','po-e-ta','ca-er','te-a-tro','a-é-re-o','pe-or','ma-es-tro',
    'e-ner-gí-a','a-le-grí-a','ge-o-gra-fí-a','bio-lo-gí-a','al-cal-dí-a','ca-fe-te-rí-a',
    'za-pa-te-rí-a','pa-pe-le-rí-a','li-bre-rí-a','pas-te-le-rí-a','tor-ti-lle-rí-a','frí-a',
    'ha-bí-a','de-cí-a','vi-ví-a','co-mí-a','a-ta-úd','ba-hí-a','pú-a','ca-í-do','le-ís-te',
    'o-í-mos','e-va-lú-a','gra-dú-a','tra-ve-sí-a','me-lo-dí-a','ar-mo-ní-a','fan-ta-sí-a',
    'po-e-sí-a','ca-no-a','i-de-a','ca-ca-o','pe-le-ar','cre-er','le-er','tra-er','o-cé-a-no',
    'a-hí','re-í-mos','son-re-ír','o-í-a','le-í-a','tra-í-a','ca-í-a','ma-ní-a','tí-o','mí-o',
    'sa-bi-du-rí-a','cor-te-sí-a','bu-jí-a','a-ú-lla'
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
    frases:['Me hice dos ___ con el papel.','El niño fue muy ___ con la visita.'] },
  { formas:[['nú-me-ro','una cantidad o cifra'],['nu-me-ro','yo le pongo números (ahora)'],['nu-me-ró','él o ella le puso números (antes)']],
    frases:['Mi ___ favorito es el siete.','Antes de entregar, ___ las páginas de mi trabajo.','La maestra ___ las preguntas del examen.'] },
  { formas:[['mé-di-co','el doctor'],['me-di-co','yo le doy medicina (ahora)'],['me-di-có','él o ella le dio medicina (antes)']],
    frases:['El ___ me revisó la garganta.','Cuando mi perro se enferma, yo lo ___ con cuidado.','La veterinaria ___ al gato toda la semana.'] },
  { formas:[['há-bi-to','una costumbre'],['ha-bi-to','yo vivo en un lugar (ahora)'],['ha-bi-tó','él o ella vivió en un lugar (antes)']],
    frases:['Leer antes de dormir es un buen ___.','Desde niño ___ en esta colonia.','Un pueblo maya ___ esta región hace siglos.'] },
  { formas:[['cír-cu-lo','una figura redonda'],['cir-cu-lo','yo encierro algo en un círculo (ahora)'],['cir-cu-ló','él o ella pasó de un lugar a otro (antes)']],
    frases:['Dibuja un ___ en tu cuaderno.','Siempre ___ las palabras que no entiendo.','El rumor ___ por toda la escuela.'] },
  { formas:[['es-tí-mu-lo','algo que anima a actuar'],['es-ti-mu-lo','yo animo a alguien (ahora)'],['es-ti-mu-ló','él o ella animó a alguien (antes)']],
    frases:['El diploma fue un ___ para seguir estudiando.','Con aplausos ___ a mis compañeros.','El maestro ___ al grupo con un reto.'] },
  { formas:[['ar-tí-cu-lo','un texto o un producto'],['ar-ti-cu-lo','yo pronuncio con claridad (ahora)'],['ar-ti-cu-ló','él o ella pronunció con claridad (antes)']],
    frases:['Leí un ___ sobre los volcanes.','Cuando expongo, ___ bien cada palabra.','El locutor ___ muy despacio el anuncio.'] },
  { formas:[['ár-bi-tro','el juez del partido'],['ar-bi-tro','yo dirijo el partido (ahora)'],['ar-bi-tró','él o ella dirigió el partido (antes)']],
    frases:['El ___ marcó un penal.','Los sábados ___ los partidos de la liga infantil.','Mi tío ___ la final del torneo.'] },
  { formas:[['lí-qui-do','que fluye, como el agua'],['li-qui-do','yo pago lo que debo (ahora)'],['li-qui-dó','él o ella pagó lo que debía (antes)']],
    frases:['El agua es un ___.','Hoy ___ la cuenta de la papelería.','Mi papá ___ la deuda del carro.'] },
  { formas:[['pa-cí-fi-co','tranquilo, sin violencia'],['pa-ci-fi-co','yo calmo una pelea (ahora)'],['pa-ci-fi-có','él o ella calmó una pelea (antes)']],
    frases:['Mi perro es muy ___.','Cuando mis hermanos pelean, yo los ___.','La maestra ___ a los dos equipos.'] },
  { formas:[['fá-bri-ca','el lugar donde se hacen productos'],['fa-bri-ca','él o ella hace o produce algo']],
    frases:['Mi tío trabaja en una ___ de galletas.','Esa empresa ___ zapatos.'] },
  { formas:[['prác-ti-ca','un ejercicio para aprender'],['prac-ti-ca','él o ella ensaya o entrena']],
    frases:['Mañana tenemos ___ de laboratorio.','Mi hermana ___ natación los martes.'] },
  { formas:[['plá-ti-ca','una conversación'],['pla-ti-ca','él o ella conversa']],
    frases:['Tuvimos una ___ sobre el cuidado del agua.','Mi abuelo ___ historias de cuando era niño.'] },
  { formas:[['ba-ño','el cuarto para asearse'],['ba-ñó','él o ella se lavó el cuerpo (antes)']],
    frases:['El ___ está al fondo del pasillo.','Mi hermanito se ___ antes de dormir.'] },
  { formas:[['ca-mi-no','la vía por donde se va'],['ca-mi-nó','él o ella anduvo a pie (antes)']],
    frases:['Tomamos el ___ más corto a la playa.','Luis ___ hasta la tienda.'] },
  { formas:[['tra-ba-jo','una tarea o un empleo'],['tra-ba-jó','él o ella hizo una tarea (antes)']],
    frases:['Entregué mi ___ de Ciencias.','Mi mamá ___ todo el sábado.'] },
  { formas:[['re-ga-lo','algo que se obsequia'],['re-ga-ló','él o ella obsequió algo (antes)']],
    frases:['Me dieron un ___ de cumpleaños.','Mi tía me ___ una bicicleta.'] },
  { formas:[['can-to','la acción de cantar'],['can-tó','él o ella cantó (antes)']],
    frases:['El ___ de los pájaros me despierta.','El coro ___ el himno en la ceremonia.'] },
  { formas:[['pa-se-o','una salida para divertirse'],['pa-se-ó','él o ella salió a pasear (antes)']],
    frases:['El domingo fuimos de ___ a Champotón.','Mi abuela ___ por el parque.'] },
  { formas:[['ma-re-o','la sensación de que todo da vueltas'],['ma-re-ó','él o ella se sintió mareado (antes)']],
    frases:['El viaje en lancha me dio ___.','Mi primo se ___ en la montaña rusa.'] },
  { formas:[['a-bra-zo','la acción de rodear con los brazos'],['a-bra-zó','él o ella dio un abrazo (antes)']],
    frases:['Le di un ___ a mi abuelo.','Mi mamá me ___ al llegar.'] },
  { formas:[['di-bu-jo','una imagen hecha a mano'],['di-bu-jó','él o ella hizo un dibujo (antes)']],
    frases:['Pegué mi ___ en el periódico mural.','Ana ___ un jaguar en su libreta.'] },
  { formas:[['ha-cia','en dirección a'],['ha-cí-a','del verbo hacer (antes)']],
    frases:['Caminamos ___ el mercado.','Mi abuela ___ tortillas a mano.'] },
  { formas:[['sa-bia','que tiene mucho conocimiento'],['sa-bí-a','del verbo saber (antes)']],
    frases:['Mi bisabuela era una mujer muy ___.','Yo no ___ que hoy había examen.'] },
  { formas:[['se-ria','que no se ríe, formal'],['se-rí-a','del verbo ser (algo que podría pasar)']],
    frases:['La directora puso una cara muy ___.','___ genial ganar el torneo.'] },
  { formas:[['con-ti-nua','que no se detiene (en femenino)'],['con-ti-nú-a','él o ella sigue']],
    frases:['Escuchamos una música ___ toda la tarde.','La lluvia ___ desde la mañana.'] }
];

/* =====================================================================
   TILDE DIACRÍTICA
   con = forma con tilde, sin = forma sin tilde.
   Cada frase indica cuál va: 'con' o 'sin'. ___ marca el hueco.
   ===================================================================== */
const DB_DIACRITICA = [
  { con:'tú', sin:'tu', conSig:'pronombre: la persona (tú cantas)', sinSig:'posesivo: lo que es tuyo (tu casa)',
    frases:[['___ eres el siguiente en pasar.','con'],['¿Ya trajiste ___ cuaderno?','sin'],['¿Vienes ___ al partido?','con'],['___ letra es muy clara.','sin'],['¿Ya hiciste ___ tarea?','sin'],['Gracias a ___, ganamos el partido.','con'],['___ hermano juega muy bien.','sin']] },
  { con:'él', sin:'el', conSig:'pronombre: un hombre o un niño (él juega)', sinSig:'artículo: va antes de un sustantivo (el balón)',
    frases:[['Ese regalo es para ___.','con'],['___ autobús llegó tarde.','sin'],['Mi primo dice que ___ ganó la carrera.','con'],['Dejé ___ libro en la mesa.','sin'],['Llegó ___ maestro de Educación Física.','sin'],['Dile a ___ que lo espero.','con'],['___ trajo los refrescos.','con']] },
  { con:'mí', sin:'mi', conSig:'pronombre, después de una preposición (para mí)', sinSig:'posesivo o nota musical (mi casa)',
    frases:[['¿Esta carta es para ___?','con'],['___ mamá trabaja en un hospital.','sin'],['A ___ me gustan los tacos.','con'],['Olvidé ___ mochila en el salón.','sin'],['___ perro se llama Canelo.','sin'],['Eso no es para ___.','con'],['Toca la nota ___ en la flauta.','sin']] },
  { con:'sí', sin:'si', conSig:'afirmación (sí quiero)', sinSig:'condición (si llueve, no salgo)',
    frases:[['___ estudias, vas a aprobar.','sin'],['Le pregunté y me dijo que ___.','con'],['No sé ___ podré ir mañana.','sin'],['¡Claro que ___ voy a la excursión!','con'],['Dijo que ___ va al viaje.','con'],['___ terminas temprano, salimos a jugar.','sin'],['Ella ___ sabe la respuesta.','con']] },
  { con:'más', sin:'mas', conSig:'cantidad (más agua)', sinSig:'significa «pero» (casi no se usa)',
    frases:[['Quiero ___ agua, por favor.','con'],['Corrí ___ rápido que ayer.','con'],['Lo intentó, ___ no pudo lograrlo.','sin'],['Necesito ___ tiempo para terminar.','con'],['Quería ir, ___ no tenía permiso.','sin'],['Este examen fue ___ fácil.','con']] },
  { con:'té', sin:'te', conSig:'la bebida (un té caliente)', sinSig:'pronombre (te quiero)',
    frases:[['Mi abuela prepara ___ de canela.','con'],['¿___ ayudo con la tarea?','sin'],['___ espero a la salida.','sin'],['Me tomé un ___ de manzanilla.','con'],['___ llamo en la tarde.','sin'],['El ___ verde se hace con hojas.','con'],['¿___ gusta el helado?','sin']] },
  { con:'dé', sin:'de', conSig:'del verbo dar (que me dé)', sinSig:'preposición (la casa de Ana)',
    frases:[['Pídele que te ___ la hoja.','con'],['La mochila ___ Luis es azul.','sin'],['Ojalá el maestro nos ___ más tiempo.','con'],['Tengo un vaso ___ agua.','sin'],['Espero que me ___ permiso.','con'],['Es una mesa ___ madera.','sin'],['Dile que te ___ el cambio.','con']] },
  { con:'sé', sin:'se', conSig:'del verbo saber (yo sé)', sinSig:'pronombre (se fue)',
    frases:[['Yo ___ la respuesta.','con'],['El gato ___ subió al árbol.','sin'],['No ___ dónde dejé mis llaves.','con'],['Mi tío ___ compró un carro.','sin'],['___ me olvidó la tarea.','sin'],['¡Ya ___ cómo resolverlo!','con'],['Ana ___ lavó las manos.','sin']] },
  { con:'qué', sin:'que', conSig:'pregunta o exclamación (¿qué haces?)', sinSig:'une dos ideas (dijo que vendría)',
    frases:[['¿___ hora es?','con'],['Me dijo ___ llegaría tarde.','sin'],['¡___ bonito día!','con'],['No sé ___ hacer con este problema.','con'],['El libro ___ me prestaste es increíble.','sin'],['¿___ comiste hoy?','con'],['Quiero ___ vengas a mi fiesta.','sin'],['¡___ calor hace!','con']] },
  { con:'cómo', sin:'como', conSig:'pregunta por la manera (¿cómo estás?)', sinSig:'compara o es del verbo comer (como pan)',
    frases:[['¿___ te llamas?','con'],['Tengo hambre, por eso ___ mucho.','sin'],['Explícame ___ resolviste el ejercicio.','con'],['Corre ___ el viento.','sin'],['¿___ llegaste a la escuela?','con'],['Es tan alto ___ su papá.','sin'],['No sé ___ se llama.','con']] },
  { con:'dónde', sin:'donde', conSig:'pregunta por el lugar (¿dónde estás?)', sinSig:'señala un lugar, sin preguntar (vivo donde empieza el camino)',
    frases:[['¿___ está mi lápiz?','con'],['Vivo ___ empieza la carretera.','sin'],['No recuerdo ___ dejé mi suéter.','con'],['La tienda ___ compramos el pan ya cerró.','sin'],['¿De ___ eres?','con'],['Esa es la casa ___ nací.','sin'],['Dime ___ nos vemos.','con']] },
  { con:'cuándo', sin:'cuando', conSig:'pregunta por el tiempo (¿cuándo llegas?)', sinSig:'señala un momento, sin preguntar (cuando llegues, avísame)',
    frases:[['¿___ es tu cumpleaños?','con'],['___ termine la clase, salimos al patio.','sin'],['Avísame ___ llegues a tu casa.','sin'],['Pregúntale ___ es el examen.','con'],['¿___ vienes a visitarnos?','con'],['Me pongo feliz ___ llueve.','sin'],['No sé ___ regresa.','con']] },
  { con:'aún', sin:'aun', conSig:'significa «todavía» (aún no llega)', sinSig:'significa «incluso» (aun así)',
    frases:[['___ no termino mi tarea.','con'],['Fue a la escuela ___ estando enfermo.','sin'],['¿___ tienes hambre?','con'],['Todos vinieron, ___ los de tercero.','sin']] },
  { con:'quién', sin:'quien', conSig:'pregunta por una persona (¿quién vino?)', sinSig:'se refiere a alguien, sin preguntar (fue él quien llamó)',
    frases:[['¿___ ganó el partido?','con'],['Fue Ana ___ encontró las llaves.','sin'],['No sé ___ trajo el pastel.','con'],['El niño con ___ hablé es mi primo.','sin']] },
  { con:'cuál', sin:'cual', conSig:'pregunta por una opción (¿cuál quieres?)', sinSig:'se refiere a algo, sin preguntar (la razón por la cual)',
    frases:[['¿___ es tu color favorito?','con'],['Esa es la razón por la ___ llegué tarde.','sin'],['Elige ___ te gusta más.','con'],['El parque en el ___ jugamos es enorme.','sin']] },
  { con:'cuánto', sin:'cuanto', conSig:'pregunta o exclama una cantidad (¿cuánto cuesta?)', sinSig:'cantidad sin preguntar (come cuanto quieras)',
    frases:[['¿___ cuesta el cuaderno?','con'],['¡___ te extrañé!','con'],['Come ___ quieras.','sin'],['___ más estudio, más aprendo.','sin']] }
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
    texto:'Él siempre llega temprano a la escuela. Antes de entrar, saluda al conserje, revisa su mochila y se asegura de traer su lápiz, su cuaderno y su botella de agua. ¡Qué buen hábito!' },
  { titulo:'La feria de San Román',
    texto:'En septiembre se celebra la feria de San Román. Hay juegos mecánicos, música y puestos de comida típica. Mi hermano subió a la rueda de la fortuna y desde arriba miró todo el barrio. Al final compramos dulces de coco.' },
  { titulo:'El huracán',
    texto:'Cuando se acercó el huracán, en la radio dijeron que había que guardar agua y comida. Mi papá aseguró las ventanas y mi mamá revisó la lámpara de pilas. Por suerte, el fenómeno pasó lejos de la costa.' },
  { titulo:'La tortuga carey',
    texto:'Cada año, la tortuga carey llega a las playas de Campeche para poner sus huevos. Los voluntarios cuidan los nidos día y noche. Cuando nacen las crías, caminan solas hacia el océano. Es un espectáculo único.' },
  { titulo:'El examen de Biología',
    texto:'Mañana tengo examen de Biología y todavía no termino de estudiar. Repasé los órganos del cuerpo humano y la función del corazón. Mi compañero me prestó sus apuntes, que están muy limpios.' },
  { titulo:'Mi gato Pepín',
    texto:'Mi gato se llama Pepín. Es muy travieso: ayer saltó al sillón y tiró un florero. Después se escondió debajo de la cama. ¡Qué susto nos dio cuando lo encontramos!' },
  { titulo:'El club de lectura',
    texto:'Los miércoles nos reunimos en la biblioteca para leer. Esta semana elegimos una novela de misterio. Cada quien lee un capítulo y después platicamos sobre lo que pasó. A mí me encanta adivinar quién es el culpable.' },
  { titulo:'Agua de chaya',
    texto:'Para preparar agua de chaya necesitas hojas frescas, limón, azúcar y agua fría. Primero lava bien las hojas. Después licúa todo y sírvelo con hielo. Es una bebida típica de la península.' },
  { titulo:'La gran final',
    texto:'El sábado jugamos la final de fútbol. Íbamos perdiendo, pero en el último minuto Mariana anotó un gol increíble. Todos gritamos de emoción y el árbitro pitó el final.' },
  { titulo:'Carta a la abuela',
    texto:'Querida abuela: te escribo para contarte que ya aprendí a usar las tildes. Mi maestro dice que mejoré mucho. ¿Cuándo vienes a visitarnos? Te extraño y te mando un abrazo. Tu nieta, Sofía.' },
  { titulo:'Los volcanes',
    texto:'Un volcán es una abertura en la corteza terrestre por donde sale el magma. Cuando el magma llega a la superficie se llama lava. En México hay volcanes famosos, como el Popocatépetl.' },
  { titulo:'Mi exposición',
    texto:'Hoy me tocó exponer frente al grupo. Al principio sentí nervios, pero respiré profundo y hablé despacio. Usé imágenes y un esquema que hice en cartulina. Al final, mis compañeros aplaudieron.' },
  { titulo:'Ahorro de energía',
    texto:'Apaga la luz cuando salgas de una habitación y desconecta el televisor si nadie lo está viendo. También es útil aprovechar la luz del sol. Así cuidamos el planeta y ahorramos dinero.' }
];
