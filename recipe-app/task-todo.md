# Tareas por realizar

1. Crear dialogo universar para preguntas comunes como: Deseas eliminar o Terminar Seccion <span style="color:green;">#Done#<span>

		             Solucion -1					     
	    1. Crear componente en la raiz (Dialogo)					     
	    2. Llamarlo donde haga falta mediante MatDialog				     
	    3. Usar el afterClose para recivir true o false				     
	    4. Usar el dato recibido para hacer la validacion				 
											                         
					  Solucion -2					                 
	    1. Lo mismo de arriba pero mediante un servicio				     
											                         

    - Emitir eventos mediante servicios <span style="color:green;">#Done#<span>
						
						Solucion
			1. Crear servicio
			2. Crear variable del timpo EventEmitter<t>
			2.1. Pertenece a @angular/core
			3. Crear un metodo que emita el evento
			4. Ir al componente in el NgInit subscribir el evento
			5. Guardarlo en una variable de tipo "Subscription"
			6. Crear el onDestroy y unsubscribe el evento

2. Crear el formulario para el PUT, tratar de reutilizar el que existe <span style="color:green;">#Done#<span>
    - Modificar el formulario con los HINTS para el usuario <span style="color:green;">#Done#<span>
    - Integrar el formulario con un wysiwyg <span style="color:green;">#Done#<span>
	- Hacer un PATCH <span style="color:green;">#Done#<span>
	- Comentar y arreglar código <span style="color:green;">#Done#<span>
	- Cambiar iconos del stepper <span style="color:green;">#Done#<span>
		
			Necesitas utilizar el CDK de material stepper para modificar los iconos
	- Arreglar la forma de mostrar los ingredientes en el formularios
	- Hacer cambio de imagen <span style="color:red;">#Pending#<span>
	- En la descripcion de la recete poner un overflow Y auto
3. CRUD de los nomencladores  <span style="color:green;">#Done#<span>
	1. Crear un mecanismo para el menu lateral <span style="color:green;">#Done#<span>
4. Mirar nuevo diseño para el ingrediente y steps <span style="color:red;">#Pending#<span>
5. Agregar la fotografia a la lista de ingredientes <span style="color:red;">#Pending#<span>
6. Agregar linea de cargado mediante la libreria <span style="color:green;">#Done#<span>
7. Tratar de buscar la forma de realizar composicion de ingredientes <span style="color:red;">#Pending#<span>
8. Mejorar el menu lateral <span style="color:green;">#Done#<span>
9. Crear las pantallas para los errores comunes <span style="color:red;">#Pending#<span>
10. Realizar los filtros (sencillos) a la lista de las recetas
	1. Crear la opcion buscar
11. Crear un infinity scroll o paginator para la lista de recetas
12. Crear el filtro que cocino hoy
13. Crear la vista mis recetas
14. Crear la modificación de perfil del usuario
15. Lenguaje de la pagina segun seleccion
16. Terminar de arreglar el login y el logout
17. Crear un servicio para buttonSheet no es recomendable al no ser que se utilize para cosas en específico, con pequeñas variaciones -> Intentar buscar una solución general.
18. Aprender animaciones con angular
19. Panel para ususarios
20. Probar las cookies en angular
21. "Optimizar" los detalles <span style="color:green;">#Done#<span>
22. Crear skeleton de la lista



