import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

let mixer;
let clips;
let lastAnimationLoop = 0;

// Die Abmessungen des Renderers
const rendererWidth = window.innerWidth;
const rendererHeight = 800;
// Die Grundkomponenten
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, rendererWidth / rendererHeight, 0.1, 1000 );
const renderer = new THREE.WebGLRenderer();

// stellt die Größe der "Leinwand" ein
renderer.setSize( rendererWidth, rendererHeight );
// übergibt die Funktion, die für neue Frames eingesetzt werden soll (siehe Definition der Funktion animate() weiter unten)
renderer.setAnimationLoop( animate );
// hängt die Leinwand auf der HTML-Seite ein.
document.body.appendChild( renderer.domElement );

// Initiiert die Steuerung, die es ermöglicht, die Kamera zu drehen
const controls = new OrbitControls( camera, renderer.domElement );

// fügt ein Point Light hinzu mit einer blauen Farbe (0x81d4fa = Hexadezimal-Code für Farbe) mit Stärke von 10
const light = new THREE.PointLight(0xf2f2f2, 3);
light.position.set(1,1,1);
scene.add(light);

// fügt Ambient Light ein, mit weißer Farbe und Stärke von 3
const ambientLight = new THREE.AmbientLight(0xffffff, 3);
scene.add(ambientLight);

// Setzt Kamera nach vorne (Z-Achse)
camera.position.z = 5;

// Aktualisiert die Steuerung. Muss einfach immer passieren, wenn die Kamera verändert wurde.
controls.update();

// lädt ein 3D-Model, das im gleichen Ordner wie die Script-Datei liegt 
loadModel(scene, 'animation.glb');

function animate(time) {

	controls.update();

    lastAnimationLoop = lastAnimationLoop === 0 ? time : lastAnimationLoop;
    const delta = time - lastAnimationLoop;
    lastAnimationLoop = time;
    
    if (mixer) {
        mixer.update(delta / 1000)
    }

    // rendert ein neues Bild
	renderer.render( scene, camera );

}

// Funktion zum importieren von GLTF-3D-Modellen
function loadModel(scene, filepath) {
    const loader = new GLTFLoader();

    // lädt die Datei und führt die Funktion aus sobald fertig geladen wurde
    loader.load( filepath, function ( gltf ) {
        // holt das erste Objekt aus der Szene
        const object = gltf.scene.children[0];
        // holt Animationen aus der Szene
        clips = gltf.animations;
        // fügt Animationen aus Blender dem Animationssystem von Threejs hinzu.
        mixer = new THREE.AnimationMixer(object);
        scene.add( gltf.scene );

    }, undefined, function ( error ) {
        // gibt den Fehler aus, falls es beim Laden des Modells Probleme gab.
        console.error( error );
    } );
}

// ab hier müssen Sie tätig werden

function bouncePlayer() {
    // 'Bounce' ist der Name, den Sie in Blender für die Animation vergeben haben
    const clip = THREE.AnimationClip.findByName( clips, 'bounce' );
    const action = mixer.clipAction( clip );
    // wenn Animation bereits gelaufen ist, muss sie zurückgesetzt werden
    action.reset();
    // Animation soll nur einmal laufen
    action.loop = THREE.LoopOnce;
    // Animation soll doppelt so schnell laufen
    action.timeScale = 2;
    // spielt die Animation
    action.play();
}

function bouncePlayerRight() {
    const clip = THREE.AnimationClip.findByName( clips, 'right' );
    const action = mixer.clipAction( clip );
    action.reset();
    action.loop = THREE.LoopOnce;
    action.timeScale = 2;
    action.play();
}

const bounceButton = document.querySelector("#bounce");
bounceButton.addEventListener("click", function () {
    bouncePlayer();
})

const bounceRightButton = document.querySelector("#right");
bounceRightButton.addEventListener("click", function () {
    bouncePlayerRight();
})

function bouncePlayerleft() {
    // 'Bounce' ist der Name, den Sie in Blender für die Animation vergeben haben
    const clip = THREE.AnimationClip.findByName( clips, 'left' );
    const action = mixer.clipAction( clip );
    // wenn Animation bereits gelaufen ist, muss sie zurückgesetzt werden
    action.reset();
    // Animation soll nur einmal laufen
    action.loop = THREE.LoopOnce;
    // Animation soll doppelt so schnell laufen
    action.timeScale = 2;
    // spielt die Animation
    action.play();
}

const bounceleftButton = document.querySelector("#left");
bounceleftButton.addEventListener("click", function () {
    bouncePlayerleft();
})

function bouncePlayerback() {
    // 'Bounce' ist der Name, den Sie in Blender für die Animation vergeben haben
    const clip = THREE.AnimationClip.findByName( clips, 'back' );
    const action = mixer.clipAction( clip );
    // wenn Animation bereits gelaufen ist, muss sie zurückgesetzt werden
    action.reset();
    // Animation soll nur einmal laufen
    action.loop = THREE.LoopOnce;
    // Animation soll doppelt so schnell laufen
    action.timeScale = 2;
    // spielt die Animation
    action.play();
}

const bouncebackButton = document.querySelector("#back");
bouncebackButton.addEventListener("click", function () {
    bouncePlayerback();
})

function bouncePlayerfront() {
    // 'Bounce' ist der Name, den Sie in Blender für die Animation vergeben haben
    const clip = THREE.AnimationClip.findByName( clips, 'front' );
    const action = mixer.clipAction( clip );
    // wenn Animation bereits gelaufen ist, muss sie zurückgesetzt werden
    action.reset();
    // Animation soll nur einmal laufen
    action.loop = THREE.LoopOnce;
    // Animation soll doppelt so schnell laufen
    action.timeScale = 2;
    // spielt die Animation
    action.play();
}

const bouncefrontButton = document.querySelector("#front");
bouncefrontButton.addEventListener("click", function () {
    bouncePlayerfront();
})

