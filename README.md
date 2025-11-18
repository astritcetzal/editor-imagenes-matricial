# Editor de Imágenes con Álgebra Matricial
# 📘 Fundamentos de Algebra - Actividad #17. GitHub - Editor de imágenes con álgebra matricial

## 👨‍💻 Información del Estudiante

- **Nombre:** Astrit Airan Cetzal Cetzal
- **Matrícula:** SW2509028
- **Grupo:** 1-C
- **Cuatrimestre:** Primer Cuatrimestre
- **Carrera:** TSU en Desarrollo e Innovación de Software
- **Profesor:** Jorge Javier Pedrozo Romero

**Fundamentos de Álgebra - Unidad III: Álgebra Lineal Aplicada**  
Tecnológico de Software
  
---

## 📋 Descripción del Proyecto

Este repositorio contiene mi solución a la práctica de **Fundamentos de Algebra**, donde implemento funciones en JavaScript para Manipular imágenes PNG aplicando operaciones matriciales del álgebra lineal.

## 🎯 Objetivos Alcanzados

- ✅ Dominar variables y tipos de datos en JavaScript
- ✅ Implementar estructuras condicionales
- ✅ Utilizar bucles y funciones
- ✅ Manipular arrays unidimensionales
- ✅ Trabajar con arrays bidimensionales (matrices)
- ✅ Aplicar control de versiones con Git y GitHub
---
## 📊 Progreso de Ejercicios

### Sección 1: Fundamentos - Conversión Imagen ↔ Matriz (20 puntos)
- [x] 1.1 Cargar imagen pequeña (5 pts) ✅
- [x] 1.2 Guardar matriz como PNG (5 pts) ✅
- [x] 1.3 Extraer canal rojo (5 pts) ✅
- [x] 1.4 Leer dimensiones (5 pts) ✅

**Puntos obtenidos: 20/20**

### Sección 2: Operaciones Básicas (25 puntos)
- [x] 2.1 Aumentar brillo (8 pts) ✅
- [x] 2.2 Negativo de imagen (8 pts) ✅
- [x] 2.3 Blanco y negro (9 pts) ✅

**Puntos obtenidos: 25/25**

### Sección 3: Transformaciones Geométricas (30 puntos)
- [x] 3.1 Efecto espejo (10 pts) ✅
- [x] 3.2 Arriba-abajo (10 pts) ✅
- [x] 3.3 Rotación horaria (10 pts) ✅

**Puntos obtenidos: 30/30**

### Sección 4: Filtros Avanzados (25 puntos)
- [x] 4.1 Blend de dos imágenes (8 pts) ✅
- [x] 4.2 Efecto vintage (9 pts) ✅
- [x] 4.3 Detección simple (8 pts) ✅

**Puntos obtenidos: 25/25**

---

## 📈 Calificación Final

```
┌────────────────────────────────────────┐
│  REPORTE DE CALIFICACIÓN               │
├────────────────────────────────────────┤
│  Puntos obtenidos: 100/100             │
│  Porcentaje: 100%                      │
│  🎓 Calificación: A - Excelente        │
└────────────────────────────────────────┘
```

![Tests](../../actions/workflows/test.yml/badge.svg)


---
## 🚀 Instalación y Uso

### Prerrequisitos
- Node.js (versión 14 o superior)
- Git

### Clonar el repositorio
```bash
git clone https://github.com/TU-USUARIO/editor-imagenes-matricial.git
cd editor-imagenes-matricial
```

### Instalar dependencias
```bash
npm install
```

### Ejecutar tests
```bash
npm test
```

### Ejecutar tests en modo watch
```bash
npm run test:watch
```

### Ver cobertura de código
```bash
npm run test:coverage
```

---

## 📁 Estructura del Proyecto

```
editor-imagenes-matricial/
│
├── generar-imagenes-prueba.js
├── package.json                    # Configuración del proyecto
├── package-lock.json
├── README.md                       # Este archivo
├── .gitignore
│
├── src/
│   ├── ejercicios.js               # ⭐ Archivo principal con mis soluciones
│   ├── ejercicios.test.js          # Tests automatizados (no modificar)
│   ├── matriz.js
│   └── utilidades.js
│
├── imagenes/
│   ├── entrada/        
│   └── salida/       
│
└── .github/
    └── workflows/
              └── test.yml           # Configuración de GitHub Actions

```


---
## 💡 Aprendizajes Clave

### Lo que más me costó
- **Ejercicio 4.2 **: no entendia como aplicar el efecto sepia
- **Ejercicio 4.3 **: me costó hacer esta función porque no entendía como hacer que se detectaran los bordes comparando cada pixel con sus vecinos.
  
### Lo que más me gustó
- **Cargar imagen:** me gustó mucho como al cargar la imagenes se convertian a matriz de pixeles.
- **Recursividad:** me gustó que para hacer que determinadas funciones funcionaran, se llamara a otras funciones.

### Técnicas aplicadas
- Uso de `for` loops para iteraciones
- Arrays dinámicos con `.push()`
- Bucles anidados

---

### Función Favorita: rotar90Grados
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

**Por qué me gusta:**
- Porque se crea una nueva matriz y de ahi se van iterandoo las filas, luego las columnas, para luego utilizar la fórmula para hacer la rotación. En general, esta función fue la que más me gustó mas que nada porque la imagen se rota 90 grados en sentido horario.
---
## Recursos utilizados

- **Guía Estudiantes:** `guias/GUIA_ESTUDIANTES.md`
- **Conceptos Álgebra:** `guias/CONCEPTOS_ALGEBRA.md`
- **Documentación pngjs:** [npmjs.com/package/pngjs](https://www.npmjs.com/package/pngjs)

---
## 📝 Historial de Commits

```bash
# Ver mi historial completo
git log --oneline --graph --decorate
```
---
*Completar ejercicios de la sección 1, ejercicio 1.1
* Ejercicio 13: Detectar bordes comparando cada pixel con sus vecinos
* Ejercicio 12: Aplicar el efecto sepia
* Ejercicio 11: Mezclar imagenes
* Ejercicio 10: Rotar imagen a 90 grados
* Ejercicio 9: Voltear matriz verticalmente
* Ejercicio 8: Voltear matriz horizontalmente
* Ejercicio 7: Convertir a escala de grises
* Ejercicio 5 cooregido | Ejercicio 6: Invertir colores
* Ejercicio 5: Ajustar brillo
* Ejercicio 4: Obtener dimensiones sin cargar toda la imagen    
* Ejercicio 3:Obtener un canal especifico de color
* Ejercicio 2: Convertir matriz a png
* Ejercicio 1: Cargar imagen png y convertir a matriz

---
**Commits destacados:**
- `feat: 
- `docs: Actualizar README con resultados finales`

---

## 🤝 Agradecimientos

- **Profesor Jorge Javier Pedrozo Romero** por la estructura del curso y la práctica
- **Compañeros del Grupo [C]**  Joaquín Uriona por el apoyo
- **Tecnológico de Software** por la formación integral

---

## 📧 Contacto

- **Email Institucional:** [astrit.cetzal@tecdesoftware.edu.mx]
- **GitHub:** [astritcetzal](https://github.com/astritcetzal)

---

## 📄 Licencia

Este proyecto es parte de las actividades académicas del **Tecnológico de Software** y está bajo la licencia MIT.

---

<div align="center">

**⭐ Si te gustó este proyecto, dale una estrella ⭐**

Hecho con 💙 por [Astrit Cetzal] - 2025

</div>


