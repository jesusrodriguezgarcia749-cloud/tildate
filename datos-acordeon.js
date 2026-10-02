/* =====================================================================
   TÍLDATE · MI ACORDEÓN DE TILDES — Banco de palabras revisado
   Método del Mtro. Jesús Rodríguez García (EST17)

   FORMATO: cada palabra va BIEN ESCRITA (con su tilde, si la lleva)
   y separada en sílabas con guiones.  Ej.  'ca-mión'
   El motor calcula solo: sílaba tónica, tipo de palabra, regla que
   aplica y si la palabra "rompe la regla" (hiato acentual).

   Para agregar palabras, solo escríbelas en la lista que corresponda.
   ===================================================================== */
const DB_ACORDEON = {

  agudas: [
    /* con tilde: terminan en N, S o vocal */
    'ca-mión','can-ción','ca-fé','so-fá','pa-pá','jar-dín','a-vión','ra-tón',
    'co-ra-zón','ja-más','a-de-más','in-glés','bal-cón','sar-tén','co-li-brí',
    'be-bé','ta-bú','des-pués','lec-ción','a-quí','sa-lió','co-mió',
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
    'mú-si-ca','te-lé-fo-no','quí-mi-ca','nú-me-ro','pá-ja-ro','mé-di-co',
    'pú-bli-co','lám-pa-ra','pi-rá-mi-de','mur-cié-la-go','sá-ba-do',
    'miér-co-les','brú-ju-la','plá-ta-no','rá-pi-do','cá-ma-ra','ú-ni-co',
    'sí-la-ba','pá-gi-na','re-lám-pa-go','es-tó-ma-go','há-bi-to',
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
    'dí-a','rí-o','tí-a','frí-o','ma-íz','ra-íz','ba-úl','re-ír','o-ír',
    'le-í-do','o-í-do','ca-í-da','grú-a','ac-tú-a','re-ú-ne','po-li-cí-a',
    'ba-te-rí-a','pa-na-de-rí-a','pro-hí-be','bú-ho',
    /* hiatos que SÍ cumplen la regla (para comparar) */
    'pa-ís','le-ón','po-e-ta','ca-er','te-a-tro','a-é-re-o','pe-or','ma-es-tro'
  ]
};
