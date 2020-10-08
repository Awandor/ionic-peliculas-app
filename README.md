# Peliculas App

Creado > `ionic start peliculas-app tabs`

Levantar el servidor > `ionic serve`

## Tabs



## The MovieDB

https://www.themoviedb.org/

Ya tengo cuenta, mi API key: 27b7a3e5d9594f1e18a0ac5668753fa3

https://developers.themoviedb.org/3/getting-started/introduction


## Creamos un servicio

> `ionic g s services/movies --skipTests=true`

Como vamos a hacer peticiones HTTP necesitamos importar en `app.module` > HttpClientModule

Ahora importamos el `HttpClient` en `movies.service`

Creamos nuestro primer método para obtener los películas

Instalamos moment en la app > `npm install moment --save`

Importamos map en el servicio para manejar los resultados


## Creamos una interface

app > interfaces > `interfaces.ts`

Copiamos todo el resultado de Postman

Aplicamos con el Command Palette > JSON to TS: Convert from Clipboard

Añadimos export a los interface, renombramos los nombres de las interface a nuestro gusto

Aplicamos el tipo a la respuesta del servicio en tab1, pero es mejor aplicarlo en el servicio en el get


## Mostrar películas: pipe.moule y pipe imagen

Vamos a crear un pipe para las imágenes, primero creamos un módulo que agrupe todos nuestros pipes

> `ionic g m pipes`

Ahora creamos el pipe > `ionic g pipe pipes/imagen --skipTests=true`

Al crearlo se importa automáticamente en `pipes.module`, también tenemos que exportarlo para poder usarlo fuera

Para usarlo en tab1 tenemos que importar `PipesModule` en `tab1.module`


## Variables globales dentro de environments

Centralizamos los path a la API en los environments


## Creación de componentes reutilizables

Lo primero es crear un módulo de componentes para agruparlos

> `ionic g m components`

Ahora el primer componente > `ionic g c components/slideshow-backdrop --spec=false`

No sé porque, pero no ha hecho el update de `components.module`, así que lo importo manualmente.

Como lo vamos a usar fuera del alcance del módulo lo exportamos

Necesitamos importar también `IonicModule`, `PipesModule` en `components.module`

Para poder utilizar el componente en tab1 necesitamos importar `ComponentsModule` en `tab1.module`

Ahora creamos otro componente > `ionic g c components/slideshowPoster --spec=false`

Seguimos los pasos del anterior componente


## Mostrar películas populares

En `https://developers.themoviedb.org/3/getting-started/images` > Discover > sort_by

Creamos un nuevos servicio donde aplicamos sort_by

Ahora creamos un nuevo componente que muestre las péliculas por pares > `ionic g c components/slideshowPares --spec=false`

Para presentar las películas por pares en la documentación oficial del Swiper hay estas dos propiedades para configurar el slide: 

slidesPerColumn, slidesPerColumnFill, pero no muestra el orden que queremos así que vamos a crear un pipe que transforme
nuestro arreglo en un arreglo de pares.

> `ionic g pipe pipes/pares --skipTests=true`

Hay que importarlo y exportarlo en `pipes.module`


## Modal con detalles de la película

Creamos un componente para la modal > `ionic g c components/detalle --spec=false`

Importar y exportar el componente en `components.module`

En slideshow-backdrop creamos un método que muestra la modal, para ello necesitamos inyectar en el constructor ModalController

En el detalle recibimos por `@Input()` el id

Ahora vamos a crear un servicio de get detalles de una película por id y otro de get actores

Para el detalle de la película creamos una interface de la respuesta copiandola de postman y añadiendo export

Ahora podemos añadir al servicio del detalle que lo que retorna es de tipo `PeliculaDetalle`

Hacemos lo mismo con el servicio get actores por id.

Para poder cerrar la modal necesitamos inyectar `ModalController`


## Modal con detalles de un actor

Creamos un componente para la modal > `ionic g c components/detalle-actor --spec=false`

Importar y exportar el componente en `components.module`

En `slideshow-poster` del detalle de la película creamos un método que muestra la modal, para ello necesitamos inyectar en el constructor `ModalController`

En el detalle recibimos por `@Input()` el id

Ahora vamos a crear un servicio de get detalles de un actor por id

Para el detalle del actor creamos una interface de la respuesta copiandola de postman y añadiendo export

Ahora podemos añadir al servicio del detalle que lo que retorna es de tipo `ActorDetalle`

Para poder cerrar la modal necesitamos inyectar `ModalController`


## Modal con foto de un actor

Creamos un componente para la modal > `ionic g c components/detalle-actor-foto --spec=false`

Importar y exportar el componente en `components.module`

En la foto del detalle del actor creamos un método que muestra la modal, para ello necesitamos inyectar en el constructor `ModalController`

En el detalle recibimos por `@Input()` la url de la foto


## Pipe Saltos de línea

Creamos un pipe para producir saltos de línea después de cada punto en un texto

> `ionic g pipe pipes/saltos-linea --skipTests=true`

Hay que importarlo y exportarlo en `pipes.module`


## Tab2 Buscador

Creamos el servicio

Importamos `MoviesService` y `ModalController`

Importamos el plugin nativo `Keyboard` para poder cerrar el teclado una vez se muestren resultados

> `ionic cordova plugin add cordova-plugin-ionic-keyboard`

> `npm install @ionic-native/keyboard`


## Storage de Favoritos

Vamos a la Documentación > Guide > Storage

Aunque se puede guardar en el local storage, no es recomendable pues si Android o Ios necesita espacio lo primero que hace es
borrar el local storage.

Este plugin tiene la ventaja de que también funciona en desktop y no hace falta escribir dos códigos

> `ionic cordova plugin add cordova-sqlite-storage`

Y después para usarlo en Typescript

> `npm install --save @ionic/storage`

Este plugin son servicios de Angular que hay que importar a `app.module` con `forRoot()`

Ahora creamos un servicio para guardar datos, creamos un componente de servicios nuevo para separarlo del otro componente de
servicios que se encarga de traer información

> `ionic g s services/localData --skipTests=true`

Después importamos en `local-data.service` `Storage` y lo inyectamos en el constructor


## Cargar noticias guardadas localmente

Lo hacemos de manera diferente, los favoritos de cargan en el constructor del servicio y se almacenan
en el arreglo de favoritos. Ya los tenemos de entrada. 


## Mostrar Favoritos

Cuando vamos a tab3 podemos llamar al servicio y obtener la propiedad
favoritos directamente en el HTML, la inyección del servicio debe de hacerse public para poder acceder a ella desde HTML.

Vamos a utilizar nuestro `slideshow-poster` component en tab3, tenemos que importar ComponentsModule a `tab3.mudule`


## Correr la app en un Android real

Conectar el móvil por USB al ordenador. En el móvil tengo que haber activado que soy un desarrollador. 
Entrar en Opciones para desarrolladores > Depuración por USB > ON

Ahora abrir CMD en la carpeta del proyecto > `ionic cordova run --list`

En GIT Bash no funciona

Tomar nota de `Available android devices`, por ejemplo: Xiaomi Mi A1 (API 28) 5e346adb0504
Anotar 5e346adb0504

> `ionic cordova run android --target=5e346adb0504`

> `ionic cordova run android --target=5e346adb0504 -l` Para autoreload

Esperar a que se cree la carpeta WWW y se pueble de archivos

Esperar a que salga el mensaje: `Run Successful` y termine, es posible que haya que estar viendo la aplicación en el móvil
para que termine.

Es mejor tener Android Studio cerrado pues puede haber problemas con la versión del gradle

Para inspeccionar la app abrir una página en blanco del navegador y abrimos el depurador
Tres puntitos > More Tools > Remote devices

En la parte de la aplicación > Inspect

Ya podemos ver por Consola los mensajes de la app


## Splash screen y App Icon

La imagen para la App Icon debe de ser mínimo 1024 x 1024

La imagen para el Splash debe se ser mínimo 3000 x 3000

Información útil > `https://blog.ionicframework.com/automating-icons-and-splash-screens/`

Las imágenes van en resources > icon.png y splash.png

Una vez las tenemos > `ionic cordova resources`

Hay que tener instalado de forma global con permiso de administrador > `npm i -g cordova-res`

Si solo queremos generar los icons > `ionic cordova resources --icon`

Si solo queremos generar los splash > `ionic cordova resources --splash`

Esto crea versiones de las imágenes para Android e Ios

Para animaciones tenemos ejemplos en `https://loading.io/`

Se puede controlar el comportamiento del splash en `config.xml`

Editamos y añadimos algunas preferencias

<preference name="FadeSplashScreenDuration" value="300" />
<preference name="SplashScreenDelay" value="10000" />
<preference name="AutoHideSplashScreen" value="false" />
<preference name="showSplashScreen" value="true" />
<preference name="fadeSplashScreen" value="true" />

Ponemos la duración del spash a 10 segundos, pero ionic la cerrará en cuanto esté lista la app, para ello verificar en `app.component.ts`
que `initializeApp()` tiene `this.splashScreen.hide()`

Ahora importamos en `app.component.ts` `timer` y lo implementamos.

En `app.component.html` añadimos un div con nuestra animación y en `app.component.scss` controlamos la animación por css

Consultar la documentación de Cordova para entender lo que hacen los diferentes parámetros del splash
`https://cordova.apache.org/docs/en/latest/reference/cordova-plugin-splashscreen/index.html`


## Cambiar color de fondo de los adaptive icons en Android

Create a res/values/colors.xml resource file in your project directory to store the app's color definitions.

<?xml version="1.0" encoding="utf-8"?>
<resources>
    <color name="background">#FF0000</color>
</resources>

In the config.xml, we will add resource-file to copy the colors.xml into the approprate location so that the colors are available during build time.

<platform name="android">
        ...
    <resource-file src="res/icon/android/colors.xml" target="/app/src/main/res/values/colors.xml" />
    <icon density="ldpi" background="@color/background" foreground="res/icon/android/mipmap-ldpi/ic_launcher.png" />
    <icon density="mdpi" background="@color/background" foreground="res/icon/android/mipmap-mdpi/ic_launcher.png" />
    <icon density="hdpi" background="@color/background" foreground="res/icon/android/mipmap-hdpi/ic_launcher.png" />
    <icon density="xhdpi" background="@color/background" foreground="res/icon/android/mipmap-xhdpi/ic_launcher.png" />
    <icon density="xxhdpi" background="@color/background" foreground="res/icon/android/mipmap-xxhdpi/ic_launcher.png" />
    <icon density="xxxhdpi" background="@color/background" foreground="res/icon/android/mipmap-xxxhdpi/ic_launcher.png" />
</platform>



# GENERAR UNA PWA

Partimos de nuestra app de noticias en ionic.

Documentación en `https://ionicframework.com/docs/deployment/progressive-web-app`

Documentación oficial de Google sobre PWA: `https://web.dev/progressive-web-apps/`

Como nuestra aplicación de ionic es básicamente una aplicación de Angular, nos permite utilizar los paquetes
propios de Angular para transformar todo el código en una PWA

> `ng add @angular/pwa`

Esto crea unas configuarciones, unos iconos, service workers, manifest.json

Más documentación `https://web.dev/customize-install/`

Requerimientos del `manifest.webmanifest`

1. a short_name (used on the home screen)
2. a name (used in the banner)
3. a 192x192 png icon (the icon declarations must include a mime type of image/png)
4. a start_url that loads
5. has a service worker registered on your site

Is served over HTTPS (a requirement for using service worker). Meets a site engagement heuristic defined by Chrome (this is regularly being changed).

Starting with Chrome 68 you will need to handle "beforeinstallprompt " event and call prompt() on user gesture to get the Add to Homescreen (A2HS), it won't happen automatically.

> `ionic build --prod`

Esto recrea la carpeta WWW que contendrá el código para ser desplegado como una PWA

Debemos ajustar en `index.html` <meta name="theme-color" content="#1976d2"> y poner el color que queremos #222428 (dark)





## Crear Splash e iconos para PWA

https://itnext.io/pwa-splash-screen-and-icon-generator-a74ebb8a130

https://www.npmjs.com/package/pwa-asset-generator

Instalar como administrador > `npm install --global pwa-asset-generator`


## Desplegar la PWA en un hosting

Debe de ser un hosting con https

Vamos a hacerlo usando Firebase, entramos en nuestra cuenta, añadimos o editamos un proyecto existente.

Vamos a Hosting > Empezar/Get started

Si no tenemos instalado CLI de Firebase > `npm install -g firebase-tools` Hay que abrir CMD como administrador

Para comprobar si lo tenemos instalado > `firebase --version`

Next en Firebase

Después > `firebase login` Nos va a pedir nuestro login de Google

Debemos estar en la raiz del proyecto > `firebase init`

Seleccionamos Hosting space enter

Use an existing project

What do you want to use as your public directory? www

Configure as a single-page app? y

File www/index.html already exists. Overwrite? n

Vamos a Firebase y siguiente

Ahora vamos a desplegar la PWA a Firebase > `firebase deploy`

La dirección es: `https://proyectos-ionic.web.app`

Si hay problemas por haber por ejemplo generado una apk con `ionic cordova build android --prod` que
añade código a www, código que da problemas en Firebase
Hay que correr > `ionic build --prod`

Y después  > `firebase deploy`

Si queremos subir a otro proyecto de Firebase borrar `.firebaserc` y `firebase.json`


# GIT
Añadimos los cambios a GIT> `git add .`
Commit > `git commit -m "Primer commit"`

Si en este punto borro accidentalmente algo puedo recuperarlo con > `git checkout -- .`

Que nos recontruye los archivos tal y como estaban en el último commit.

Enlazamos el repositorio local con un repositorio externo en GitHub donde tenemos cuenta y hemos creado un repositorio
`git remote add origin https://github.com/Awandor/ionic-peliculas-app.git`

Situarnos en la rama master > `git branch -M master`

Subir todos los cambios a la rama master remota > `git push -u origin master`

Para reconstruir en local el código de GitHub nos bajamos el código y ejecutamos `npm install` que instala todas las dependencias


## Tags y Releases

Crear un tag en Github y un Release

> `git tag -a v1.0.0 -m "Versión 1 - Lista para producción"`

> `git tag` muestra los tags

> `git push --tags` > sube los tags al repositorio remoto

En github vamos a Releases > Tags > Add release notes