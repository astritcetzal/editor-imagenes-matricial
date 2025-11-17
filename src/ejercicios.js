// ============================================
// EDITOR DE IMÁGENES CON ÁLGEBRA MATRICIAL
// ============================================
// Nombre del estudiante: Astrit Airan Cetzal Cetzal
// Fecha: 16/11/2025
// Grupo: C

const { PNG } = require('pngjs');
const fs = require('fs');
const path = require('path');

// Importar funciones auxiliares (puedes usarlas)
const {
  crearMatrizVacia,
  validarMatriz,
  obtenerDimensiones,
  limitarValorColor,
  crearPixel,
  copiarMatriz,
  asegurarDirectorio
} = require('./utilidades');

// Importar operaciones matriciales (puedes usarlas)
const {
  sumarMatrices,
  restarMatrices,
  multiplicarPorEscalar,
  multiplicarMatrices,
  transponerMatriz
} = require('./matriz');

// ============================================
// SECCIÓN 1: FUNDAMENTOS (20 puntos)
// Conversión entre imágenes y matrices
// ============================================

/**
 * Ejercicio 1.1: Cargar imagen PNG y convertir a matriz de píxeles (5 puntos)
 * 
 * Una imagen es una matriz donde cada elemento es un pixel con valores RGBA.
 * Debes leer el archivo PNG y crear una matriz donde:
 * - Cada fila representa una fila de píxeles de la imagen
 * - Cada elemento es un objeto: {r: 0-255, g: 0-255, b: 0-255, a: 0-255}
 * 
 * @param {string} rutaImagen - Ruta del archivo PNG
 * @returns {Array<Array<Object>>} - Matriz de píxeles
 * 
 * Pistas:
 * - Usa PNG.sync.read() para leer la imagen
 * - png.width y png.height te dan las dimensiones
 * - png.data es un Buffer con formato [R,G,B,A, R,G,B,A, ...]
 * - El índice en el buffer para el pixel (x,y) es: idx = (width * y + x) * 4
 * 
 * @example
 * const matriz = imagenAMatriz('imagenes/entrada/test_pequeña.png');
 * // matriz[0][0] = {r: 0, g: 0, b: 128, a: 255}
 */
function imagenAMatriz(rutaImagen) {
  // TODO: Implementar la conversión de PNG a matriz
  
  // 1. Leer el archivo PNG
  const buffer = fs.readFileSync(rutaImagen);
  const png = PNG.sync.read(buffer);
  
  // 2. Crear la matriz vacía
  const matriz = [];
  
  // 3. Recorrer cada fila (y) y cada columna (x)
   for (let y = 0; y < png.height; y++) {
    const fila = [];
    for (let x = 0; x < png.width; x++) {
       // 4. Calcular el índice en el buffer
      const idx = (png.width * y + x) << 2; // equivalente a * 4
  //     
  //     // 5. Extraer los valores RGBA
      const pixel = {
        r: png.data[idx],
        g: png.data[idx + 1],
        b: png.data[idx + 2],
        a: png.data[idx + 3]
       };
  //     
       fila.push(pixel);
     }
     matriz.push(fila);
   }
  
  // 6. Retornar la matriz
   return matriz;
  
 // return []; // REEMPLAZAR CON TU CÓDIGO
}

/**
 * Ejercicio 1.2: Convertir matriz de píxeles a imagen PNG (5 puntos)
 * 
 * Proceso inverso: tomar una matriz de píxeles y guardarla como PNG.
 * 
 * @param {Array<Array<Object>>} matriz - Matriz de píxeles {r,g,b,a}
 * @param {string} rutaSalida - Ruta donde guardar el PNG
 * 
 * Pistas:
 * - Usa new PNG({width, height}) para crear la imagen
 * - Recorre la matriz y llena png.data con los valores
 * - Usa PNG.sync.write(png) para generar el buffer
 * - Usa fs.writeFileSync() para guardar el archivo
 * 
 * @example
 * const matriz = imagenAMatriz('entrada.png');
 * matrizAImagen(matriz, 'imagenes/salida/copia.png');
 */
function matrizAImagen(matriz, rutaSalida) {
  // TODO: Implementar la conversión de matriz a PNG
  
  // 1. Validar la matriz
  validarMatriz(matriz);
  
  // 2. Obtener dimensiones
   const dims = obtenerDimensiones(matriz);
  
  // 3. Crear el PNG
   const png = new PNG({
     width: dims.columnas,
     height: dims.filas
   });
  
  // 4. Llenar png.data
   for (let y = 0; y < dims.filas; y++) {
     for (let x = 0; x < dims.columnas; x++) {
       const idx = (dims.columnas * y + x) << 2;
       const pixel = matriz[y][x];
       png.data[idx] = limitarValorColor(pixel.r);
       png.data[idx + 1] = limitarValorColor(pixel.g);
       png.data[idx + 2] = limitarValorColor(pixel.b);
       png.data[idx + 3] = limitarValorColor(pixel.a);
     }
   }
  
  // 5. Asegurar que existe el directorio de salida
   asegurarDirectorio(path.dirname(rutaSalida));
  
  // 6. Guardar el archivo
   const buffer = PNG.sync.write(png);
   fs.writeFileSync(rutaSalida, buffer);
  
}

/**
 * Ejercicio 1.3: Obtener un canal específico de color (5 puntos)
 * 
 * Extrae solo un canal (R, G, o B) de la imagen y crea una imagen en escala de grises
 * donde ese canal es el valor de gris.
 * 
 * @param {Array<Array<Object>>} matriz - Matriz de píxeles
 * @param {string} canal - 'r', 'g', o 'b'
 * @returns {Array<Array<Object>>} - Matriz con solo ese canal
 * 
 * @example
 * const matriz = imagenAMatriz('imagen.png');
 * const soloRojo = obtenerCanal(matriz, 'r');
 * // Si un pixel era {r:200, g:100, b:50, a:255}
 * // Ahora será {r:200, g:200, b:200, a:255} (gris)
 */
function obtenerCanal(matriz, canal) {
  // TODO: Implementar extracción de canal
  
  // 1. Validar parámetros
   if (!['r', 'g', 'b'].includes(canal)) {
     throw new Error("El canal debe ser 'r', 'g', o 'b'");
   }
  
  // 2. Crear matriz resultado
   const resultado = copiarMatriz(matriz);
  
  // 3. Para cada pixel, usar solo el valor del canal seleccionado
   for (let i = 0; i < resultado.length; i++) {
     for (let j = 0; j < resultado[i].length; j++) {
       const valor = matriz[i][j][canal];
      resultado[i][j] = {
         r: valor,
         g: valor,
         b: valor,
         a: matriz[i][j].a
       };
     }
   }
  
  return resultado; 
}

/**
 * Ejercicio 1.4: Obtener dimensiones de una imagen (5 puntos)
 * 
 * @param {string} rutaImagen - Ruta del archivo PNG
 * @returns {Object} - {ancho, alto, totalPixeles}
 * 
 * @example
 * const dims = obtenerDimensionesImagen('test.png');
 * // {ancho: 100, alto: 100, totalPixeles: 10000}
 */
function obtenerDimensionesImagen(rutaImagen) {
  // TODO: Obtener dimensiones sin cargar toda la imagen en memoria
  //Leer solo los primeros bytes del archivo
  const buffer = fs.readFileSync(rutaImagen); 
  const alto= buffer.readUInt32BE(20); //posicion 20 a 23
  const ancho = buffer.readUInt32BE(16); //posicion 16 a 19
  return { ancho, alto, totalPixeles: ancho * alto }; 
  }
// ============================================
// SECCIÓN 2: OPERACIONES BÁSICAS (25 puntos)
// Aplicar álgebra matricial a píxeles
// ============================================

/**
 * Ejercicio 2.1: Ajustar brillo (8 puntos)
 * 
 * El brillo se ajusta multiplicando cada canal RGB por un factor.
 * Esto es una MULTIPLICACIÓN ESCALAR aplicada a cada canal.
 * 
 * @param {Array<Array<Object>>} matriz - Matriz de píxeles
 * @param {number} factor - Factor de brillo (0.5 = más oscuro, 2.0 = más claro)
 * @returns {Array<Array<Object>>} - Matriz con brillo ajustado
 * 
 * Concepto matemático:
 * Si factor = 1.5, entonces:
 * R_nuevo = R_original * 1.5
 * G_nuevo = G_original * 1.5
 * B_nuevo = B_original * 1.5
 * 
 * @example
 * const brillante = ajustarBrillo(matriz, 1.5); // 50% más claro
 * const oscuro = ajustarBrillo(matriz, 0.5);    // 50% más oscuro
 */
function ajustarBrillo(matriz, factor) {
  // TODO: Implementar ajuste de brillo
  
  // 1. Crear matriz resultado
   const resultado = copiarMatriz(matriz);
  
  // 2. Para cada pixel, multiplicar R, G, B por el factor
   for (let i = 0; i < resultado.length; i++) {
     for (let j = 0; j < resultado[i].length; j++) {
       resultado[i][j].r = limitarValorColor(matriz[i][j].r * factor);
       resultado[i][j].g = limitarValorColor(matriz[i][j].g * factor);
       resultado[i][j].b = limitarValorColor(matriz[i][j].b * factor);
       // El canal alpha NO se modifica
     }
  
    }
  return resultado; // REEMPLAZAR
}
/**
 * Ejercicio 2.2: Invertir colores (8 puntos)
 * 
 * Invierte los colores usando la operación: nuevo = 255 - original
 * 
 * @param {Array<Array<Object>>} matriz - Matriz de píxeles
 * @returns {Array<Array<Object>>} - Matriz con colores invertidos
 * 
 * Concepto matemático:
 * R_nuevo = 255 - R_original
 * G_nuevo = 255 - G_original
 * B_nuevo = 255 - B_original
 * 
 * @example
 * const negativo = invertirColores(matriz);
 * // Blanco (255,255,255) → Negro (0,0,0)
 * // Rojo (255,0,0) → Cian (0,255,255)
 */
function invertirColores(matriz) {
  // Crear una copia pra no midificar la matriz original
  const resultado = copiarMatriz(matriz);
  for (let i = 0; i < resultado.length; i++) {
     for (let j = 0; j < resultado[i].length; j++) {
       resultado[i][j].r = limitarValorColor(255 - matriz[i][j].r);
       resultado[i][j].g = limitarValorColor(255 - matriz[i][j].g);
       resultado[i][j].b = limitarValorColor(255 - matriz[i][j].b);
     }
    }
  return resultado; 
}
/**
 * Ejercicio 2.3: Convertir a escala de grises (9 puntos)
 * 
 * Convierte la imagen a escala de grises usando el promedio ponderado:
 * Gris = 0.299*R + 0.587*G + 0.114*B
 * 
 * Estos pesos reflejan la sensibilidad del ojo humano a cada color.
 * 
 * @param {Array<Array<Object>>} matriz - Matriz de píxeles
 * @returns {Array<Array<Object>>} - Matriz en escala de grises
 * 
 * @example
 * const grises = convertirEscalaGrises(matriz);
 */
function convertirEscalaGrises(matriz) {
  // TODO: Implementar conversión a escala de grises

  const resultado = copiarMatriz(matriz);
   for (let i = 0; i < resultado.length; i++) {
     for (let j = 0; j < resultado[i].length; j++) {
       const pixel = matriz [i][j];

      // 1. Calcular el valor de gris
       const gris = limitarValorColor(0.299 * pixel.r + 0.587 * pixel.g + 0.114 * pixel.b);

      // 2. Asignar ese valor a los tres canales
      resultado[i][j].r=gris;
      resultado[i][j].g=gris;
      resultado[i][j].b=gris;
      }
    }
  return resultado;
}

// ============================================
// SECCIÓN 3: TRANSFORMACIONES GEOMÉTRICAS (30 puntos)
// Aplicar operaciones matriciales para transformar
// ============================================

/**
 * Ejercicio 3.1: Voltear horizontal (espejo) (10 puntos)
 * 
 * Voltea la imagen horizontalmente (efecto espejo).
 * Cada fila se invierte: [1,2,3] → [3,2,1]
 * 
 * @param {Array<Array<Object>>} matriz - Matriz de píxeles
 * @returns {Array<Array<Object>>} - Matriz volteada horizontalmente
 * 
 * Concepto matemático:
 * pixel[i][j] → pixel[i][ancho - 1 - j]
 * 
 * @example
 * const espejo = voltearHorizontal(matriz);
 */
function voltearHorizontal(matriz) {
  // TODO: Implementar volteo horizontal
  const resultado = copiarMatriz(matriz);
   for (let i = 0; i < resultado.length; i++) {
     const filaInvertida = [...matriz[i]].reverse().map( pixel =>({
      r: pixel.r,
      g: pixel.g,
      b: pixel.b,
      a: pixel.a
     })
     );
     resultado[i]= filaInvertida;
    }
    
  return resultado; // REEMPLAZAR
}

/**
 * Ejercicio 3.2: Voltear vertical (10 puntos)
 * 
 * Voltea la imagen verticalmente (de arriba hacia abajo).
 * El orden de las filas se invierte.
 * 
 * @param {Array<Array<Object>>} matriz - Matriz de píxeles
 * @returns {Array<Array<Object>>} - Matriz volteada verticalmente
 * 
 * Concepto matemático:
 * pixel[i][j] → pixel[alto - 1 - i][j]
 * 
 * @example
 * const invertido = voltearVertical(matriz);
 */
function voltearVertical(matriz) {
    const resultado = copiarMatriz(matriz);
    const alto = resultado.length;

   for (let i = 0; i < resultado.length; i++) {
      resultado[i]= [...matriz[resultado.length - 1 - i]].map( pixel =>({
      r: pixel.r,
      g: pixel.g,
      b: pixel.b,
      a: pixel.a

   })); 
  }
  return resultado; 
}

/**
 * Ejercicio 3.3: Rotar 90 grados en sentido horario (10 puntos)
 * 
 * Rota la imagen 90° en sentido horario.
 * Esto se logra con: TRANSPONER + VOLTEAR HORIZONTAL
 * 
 * @param {Array<Array<Object>>} matriz - Matriz de píxeles
 * @returns {Array<Array<Object>>} - Matriz rotada 90°
 * 
 * Concepto matemático:
 * 1. Transponer: pixel[i][j] → pixel[j][i]
 * 2. Voltear horizontal: invertir cada fila
 * 
 * Puedes usar transponerMatriz() de matriz.js (¡pero cuidado! trabaja con números, 
 * no con objetos pixel)
 * 
 * @example
 * const rotada = rotar90Grados(matriz);
 */
function rotar90Grados(matriz) {
  // Opción 2: Construir directamente la matriz rotada
  //   nuevoPixel[j][alto - 1 - i] = pixelOriginal[i][j]
  //guarda el tamaño de la matriz
  const m = matriz.length;
  //creamos una nueva matriz de tamaño n x n, inicializada con 0
  const rotar =Array.from({length: m }, () => Array(m).fill(0));
    //iteramos las fila  
  for (let i = 0; i < m;  i++){
      //columnas
      for (let j = 0; j < m; j++){
        //Formula para hacer la rotación
         rotar[j][m - 1 - i] = matriz[i][j];
      }
      }
  // Devolvemos la matriz rotada
  return rotar; 
}

// ============================================
// SECCIÓN 4: FILTROS AVANZADOS (25 puntos)
// Operaciones más complejas
// ============================================

/**
 * Ejercicio 4.1: Mezclar dos imágenes (8 puntos)
 * 
 * Mezcla dos imágenes usando un factor de mezcla.
 * resultado = imagen1 * (1 - factor) + imagen2 * factor
 * 
 * Esto es una COMBINACIÓN LINEAL de matrices.
 * 
 * @param {Array<Array<Object>>} matriz1 - Primera imagen
 * @param {Array<Array<Object>>} matriz2 - Segunda imagen
 * @param {number} factor - Factor de mezcla (0.0 a 1.0)
 *                          0.0 = solo imagen1
 *                          0.5 = 50% de cada una
 *                          1.0 = solo imagen2
 * @returns {Array<Array<Object>>} - Imagen mezclada
 * 
 * @example
 * const mezcla = mezclarImagenes(imagen1, imagen2, 0.5); // 50/50
 */
function mezclarImagenes(matriz1, matriz2, factor) {
  
  // 1. Verificar que tengan las mismas dimensiones
   const dims1 = obtenerDimensiones(matriz1);
   const dims2 = obtenerDimensiones(matriz2);
   if (dims1.filas !== dims2.filas || dims1.columnas !== dims2.columnas) {
     throw new Error('Las imágenes deben tener el mismo tamaño');
   }
  //2. Crear matriz resultado
  const resultado = copiarMatriz(matriz1);
  // 3. Recorrer cada pixel y aplicar la mezcla lineal
  for (let i = 0; i < resultado.length; i++){
    for (let j = 0; j < resultado[i].length; j++){
      const p1 = matriz1[i][j];
      const p2 = matriz2[i][j];
      resultado [i][j]={
        //Se aplica la formula de mezcla lineal
        r: limitarValorColor(p1.r *(1- factor) + p2.r * factor),
        g:limitarValorColor(p1.g *(1- factor) + p2.g * factor),
        b: limitarValorColor(p1.b *(1- factor) + p2.b * factor),
        a: limitarValorColor(p1.a *(1- factor) + p2.a * factor)
      };

    }
  }
  //Devolver la imagen mezclada
  return resultado;
}

/**
 * Ejercicio 4.2: Filtro Sepia (9 puntos)
 * 
 * Aplica el efecto sepia (tono vintage/antiguo).
 * Usa la siguiente transformación matricial:
 * 
 * R_nuevo = 0.393*R + 0.769*G + 0.189*B
 * G_nuevo = 0.349*R + 0.686*G + 0.168*B
 * B_nuevo = 0.272*R + 0.534*G + 0.131*B
 * 
 * @param {Array<Array<Object>>} matriz - Matriz de píxeles
 * @returns {Array<Array<Object>>} - Imagen con efecto sepia
 * 
 * @example
 * const vintage = aplicarSepia(matriz);
 */
function aplicarSepia(matriz) {
  // Copia para no modificar la raiz original
   const resultado = copiarMatriz(matriz);

  // Recorrer fila
  for (let i = 0; i < resultado.length; i++){

    //Recorrer columna
    for (let j = 0; j < resultado[i].length; j++){
      const pixel= matriz[i][j]; //Pixel original
      
        // Formulas de transformación de sepia
        const nuevo_r = limitarValorColor(0.393* pixel.r + 0.769* pixel.g + 0.189* pixel.b);
        const nuevo_g = limitarValorColor(0.349* pixel.r + 0.686* pixel.g + 0.168* pixel.b);
        const nuevo_b = limitarValorColor(0.272* pixel.r + 0.534* pixel.g + 0.131* pixel.b);
      
        //Guardar pixel transformado en la matriz resultado
        resultado[i][j]={
          r: nuevo_r,
          g: nuevo_g,
          b: nuevo_b,
          a: pixel.a //se conserva la transparencia original
        };
    }
  }
  // devolver imagen 
  return resultado; 
}

/**
 * Ejercicio 4.3: Detectar bordes (simplificado) (8 puntos)
 * 
 * Detecta bordes comparando cada pixel con sus vecinos.
 * Si la diferencia es grande, hay un borde.
 * 
 * Este es un operador Sobel simplificado.
 * 
 * @param {Array<Array<Object>>} matriz - Matriz de píxeles
 * @param {number} umbral - Umbral de detección (0-255), default: 50
 * @returns {Array<Array<Object>>} - Imagen de bordes (blanco y negro)
 * 
 * Algoritmo simplificado:
 * 1. Convertir a escala de grises
 * 2. Para cada pixel, calcular diferencia con vecinos
 * 3. Si diferencia > umbral, es borde (blanco), sino negro
 * 
 * @example
 * const bordes = detectarBordes(matriz, 50);
 */
function detectarBordes(matriz, umbral = 50) {
  // TODO: Implementar detección de bordes
  
  // 1. Convertir a escala de grises primero
  const grises = convertirEscalaGrises(matriz);
  // 2. Preparar la matriz resultado (blanco y negro) 
  // Cada pixel será {r, g, b, a} con r=g=b=0 o 255
    const alto =grises.length;
    const ancho = grises[0].length;
    const resultado = Array.from ({length: alto}, () =>
    Array.from({length: ancho}, () => ({r: 0, g:0, b:0, a:255}))
    );
  // 3. Recorrer cada pixel excepto la ultima fila y la útima columna 
  // para poder comparar con derecha y abajo
    for (let i = 0; i< alto - 1; i++){
        for (let j = 0; j < ancho - 1; j++){
          //3.1 obtener intensidad en escala de grises
          // si convertirEscalaGrises devuelve objetos con r=g=b, tomamos 'r'
          const actual = grises[i][j].r;
          const derecha = grises[i][j + 1].r;
          const abajo = grises[i + 1][j].r;

          // 3.2 Diferencias absolutas con vecinos
          const diffDerecha = Math.abs(actual - derecha);
          const diffAbajo = Math.abs(actual - abajo);

          // 3.3 Tomar el maximo para tomar el borde más fuerte
          const diff = Math.max(diffDerecha, diffAbajo);

          // 3.4 Si la diferencia supera al umbral, el borde es blanco
          const esBorde = diff > umbral;
          const valor = esBorde ? 255 : 0;

          // 3.5 Escribir pixel blanco/negro en resultado
          resultado[i][j] = { r: valor, g: valor, b: valor, a: 255};
          
        } 
    }
  return resultado;
}

// ============================================
// NO MODIFICAR - Exportación de funciones
// ============================================
module.exports = {
  // Sección 1: Fundamentos
  imagenAMatriz,
  matrizAImagen,
  obtenerCanal,
  obtenerDimensionesImagen,
  
  // Sección 2: Operaciones Básicas
  ajustarBrillo,
  invertirColores,
  convertirEscalaGrises,
  
  // Sección 3: Transformaciones
  voltearHorizontal,
  voltearVertical,
  rotar90Grados,
  
  // Sección 4: Filtros Avanzados
  mezclarImagenes,
  aplicarSepia,
  detectarBordes
};
