# profiling

Optimizaciónb de API utilizando Gzip, Winston, Artillery y Node built-in profiler.

Para correr la aplicación ejecutar en consola: "npm run start".

Se utiliza Winston configurando los logs mediante un objeto de configuración (también puede ser una función).

La ruta "/info" retorna datos generales del proceso y utiliza el middleware de compresión de gzip.

La ruta "/bloq?cant=number" retorna un objeto que tiene como claves números al azar entre 0 y 1000, y como 
valor la cantidad de veces que sale cada uno. En caso de no especificar el parámetro, se loggea un error en error.log .

Si se visita una ruta no implementada, se loggea un warning en el archivo warn.log.
Todas las operaciones se loggean en consola. Se implementan errores de servidor.

Para test de performance (tráfico y concurrencia) se utiliza Artillery. Con el servidor corriendo, abrir otra terminal y ejecutar:

artillery quick --count 50 -n 40 http://localhost:8080/bloq?cant=1000 > result_console.txt

Se comparan los test de carga considerando o no los console.log (ver archivos result_console.txt y result_No_console.txt).
Notar que el tiempo se reduce a la mitad. 

Para análisis de rendimiento se utiliza Node built-in profiler, ejecutar:

node --prof server.js

Luego se corre Artillery. Se renombra el archivo Isolate como bloq-v8.log y luego se procesa:

node --prof-process bloq-v8.log > result_v8_console.txt

Lo mismo para el caso sin console.log:

node --prof-process bloq-v8.log > result_v8_No_console.txt

Comparando los summary de ambos archivos, se ve como la versión optimizada sin console.log 
tiene 35% menos de ticks.

