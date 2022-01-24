///////////////// -------------IMPORT STATEMENTS----------------------------------------------------- /////////////// 
import * as THREE from 'https://unpkg.com/three@0.119.1/build/three.module.js'; 
import { OrbitControls } from 'https://unpkg.com/three@0.119.1/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'https://unpkg.com/three@0.119.1/examples/jsm/loaders/GLTFLoader.js';
import { BufferGeometryUtils } from 'https://unpkg.com/three@0.119.1/examples/jsm/utils/BufferGeometryUtils.js';

//////////////////// -------------MAIN CODES------------------------------------------------------ /////////////////// 

// ====================================================
// Materials
// ====================================================

// https://htmlcolorcodes.com/
// https://www.w3schools.com/colors/colors_names.asp

var matVolume = new THREE.MeshLambertMaterial({color: 'blue', opacity: 0.1, transparent: true});
var matVolumeTrans = new THREE.MeshLambertMaterial({color: 'burlywood', opacity: 0.2, transparent: true});
var matVolumeDel = new THREE.MeshLambertMaterial({color: 'white', opacity: 0.6, transparent: true});

var matFloorTrans = new THREE.MeshLambertMaterial({color: 'burlywood', opacity: 0.2, transparent: true});
var matFloorDel = new THREE.MeshLambertMaterial({color: 'white', opacity: 0.6, transparent: true});

var matWallTrans = new THREE.MeshLambertMaterial({color: 'burlywood', opacity: 0.2, transparent: true});
var matWallDel = new THREE.MeshLambertMaterial({color: 'white', opacity: 0.6, transparent: true});

var particleboard  = new THREE.MeshLambertMaterial({color: 0xD3C8AD}); //0xAB9F82, 0xD3C8AD, 0xE5DCC7 //floor
var glass = new THREE.MeshLambertMaterial({color: 'turquoise', opacity: 0.2, transparent: true});
var obs = new THREE.MeshLambertMaterial({color: 'burlywood'});		
var aluminium = new THREE.MeshLambertMaterial({color: 'gainsboro'});
var rubber = new THREE.MeshLambertMaterial({color: 'black'});
var plywood = new THREE.MeshLambertMaterial({color: 'sienna'}); //door
var brass = new THREE.MeshLambertMaterial({color: 'gainsboro'}); //darkgoldenrod


// ====================================================
// Geometries & Initialisation ★
// ====================================================
// '''''' dimensions, geometries, initialisation
var loader = new GLTFLoader();

// _____________________
//    _ * VOLUME *
// ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾

// DIMENSIONS
var volume_width = 3; var volume_width_half = volume_width/2;
var volume_length = 3;
var volume_height = 3;

// GEOMETRIES
var geomVolume = new THREE.BoxBufferGeometry( volume_width, volume_length, volume_height );
var geomVolumeBase = new THREE.PlaneGeometry( volume_width, volume_width); // width, height
var geomVolumeHover = new THREE.BoxBufferGeometry( volume_width, volume_length, volume_height );
var geomVolumeDel = new THREE.BoxBufferGeometry( volume_width * 1.1, volume_length* 1.1, volume_height * 1.1 );

// INITIALISATION 
var dictVolume = {}; // each key carries 2 value items: meshVolume, meshVolumeBase. i.e. (2) [Mesh, Mesh]
var dictPoints = {}; // each key carries 2 value items: point coordinates, point meshes. i.e. (2) [Vector3, Points]
var pos_meshVolume = null;
var bool_delVolume = false;
var cnt_meshVolume = 0;

// _____________________
//    _ * FLOOR *
// ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾

// DIMENSIONS
var floor_width = 3; var floor_width_half = floor_width/2;
var floor_length = 3;
var floor_thickness = 0.45;

// GEOMETRIES
var geomFloor = new THREE.BoxBufferGeometry( floor_width, floor_length, floor_thickness );
var geomFloorHover = new THREE.BoxBufferGeometry( floor_width * 1, floor_length* 1, floor_thickness * 1 );
var geomFloorDel = new THREE.BoxBufferGeometry( floor_width * 1.1, floor_length* 1.1, floor_thickness * 1.1 );

// INITIALISATION 
var dictFloor = {};
var pos_meshFloor = null;
var bool_delFloor = false;
var cnt_meshFloor = 0;

// _____________________
//    _ * WALL *
// ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾

// DIMENSIONS
var wall_width = 3; var wall_width_half = wall_width / 2;
var wall_height = 3; var wall_height_half = wall_height / 2;
var wall_thickness = 0.10;

// GEOMETRIES
var geomWall = new THREE.BoxBufferGeometry( wall_width, wall_thickness, wall_height );
var geomWallHover = new THREE.BoxBufferGeometry( wall_width * 1, wall_thickness* 2, wall_height * 1 );
var geomWallDel = new THREE.BoxBufferGeometry( wall_width * 1.1, wall_thickness* 3, wall_height * 1.1 );

// INITIALISATION 
var dictWall = {};
var pos_meshWall = null;
var bool_delWall = false;
var cnt_meshWall = 0;
var angle_meshWall = 0;

// _____________________
//    _ * WINDOW01 *
// ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾

// DIMENSIONS
var Window01_width = 3; var Window01_width_half = Window01_width / 2;
var Window01_height = 3; var Window01_height_half = Window01_height / 2;
var Window01_thickness = 0.5;

// GEOMETRIES
var geomWindow01Hover = new THREE.BoxBufferGeometry( Window01_width * 1, Window01_thickness* 1, Window01_height * 1 );
var geomWindow01Del = new THREE.BoxBufferGeometry( Window01_width * 1.1, Window01_thickness* 1.1, Window01_height * 1.1 );

var  geomWindow01 = null
loader.load( // Load a glTF resource
    'models_220113/Window01.gltf', // resource URL
    function ( gltf ) { // called when the resource is loaded
        geomWindow01 = gltf.scene;
        geomWindow01.getObjectByName("Glass").material = glass;
        geomWindow01.getObjectByName("WindowFrame").material = aluminium;
        geomWindow01.getObjectByName("WindowSeal").material = rubber;
        geomWindow01.getObjectByName("SIP").material = obs;
        // geomWindow01.rotation.x += Math.PI /2;
        // geomWindow01.matrixAutoUpdate  = true;
        // geomWindow01.getObjectByName("Window01R001").children.material = new THREE.MeshLambertMaterial( {color: 'burlywood'});
        // geomWindow01.getObjectByName("mesh_36").material = new THREE.MeshLambertMaterial( {color: 'burlywood'});
        // console.log(geomWindow01.getObjectByName("mesh_36").material)
        // console.log(geomWindow01.getObjectByProperty(uuid,  "E01E399B-7EDF-4712-8FD5-574EEE30DF2B" ) )
        // console.log(geomWindow01.getObjectByName("Window01R001").children.material)
    },
    function ( xhr ) { // called while loading is progressing
		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
	},
    function ( error ) { // called when loading has errors
        console.log( 'An error happened' );
    }
);
// geomWindow01.getObjectById("LowpolyBlood_Bake_Blood_0.001").material.color.set( _some_color_ )
// var geomWindow01 = gltf.scene.children[4];

// INITIALISATION 
var dictWindow01 = {};
var pos_grpWindow01 = null;
var bool_delWindow01 = false;
var cnt_grpWindow01 = 0;
var angle_grpWindow01 = 0;

// _____________________
//    _ * DOOR01 *
// ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾

// DIMENSIONS
var Door01_width = 3; var Door01_width_half = Door01_width / 2;
var Door01_height = 3; var Door01_height_half = Door01_height / 2;
var Door01_thickness = 0.5;

// GEOMETRIES
var geomDoor01Hover = new THREE.BoxBufferGeometry( Door01_width * 1, Door01_thickness* 1, Door01_height * 1 );
var geomDoor01Del = new THREE.BoxBufferGeometry( Door01_width * 1.1, Door01_thickness* 1.1, Door01_height * 1.1 );

var  geomDoor01 = null
loader.load( // Load a glTF resource
    'models_220113/Door01.gltf', // resource URL
    function ( gltf ) { // called when the resource is loaded
        geomDoor01 = gltf.scene;
        geomDoor01.getObjectByName("Door").material = plywood;
        geomDoor01.getObjectByName("DoorFrame").material = aluminium;
        geomDoor01.getObjectByName("DoorHandle1").material = brass;
        geomDoor01.getObjectByName("DoorHandle2").material = brass;
        geomDoor01.getObjectByName("SIP").material = obs;
    },
    function ( xhr ) { // called while loading is progressing
		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
	},
    function ( error ) { // called when loading has errors
        console.log( 'An error happened' );
    }
);

// INITIALISATION
var dictDoor01 = {};
var pos_grpDoor01 = null;
var bool_delDoor01 = false;
var cnt_grpDoor01 = 0;
var angle_grpDoor01 = 0;


// ====================================================
// Buttons ★
// ====================================================
// ''''''  ids

// IDS
var button_ids = ['buttonVolume', 'buttonFloor', 'buttonWall', 'buttonWindow01', 'buttonDoor01'];
var button_id = 'buttonVolume';



// ====================================================
// Miscellaneous ★
// ====================================================
// ''''''  camera, ground, mouse, global variables

// CAMERA 
var camera_zoom = 60
var camera_shift_x = 2
var camera_shift_y = -1

// GROUND
var num_cells = 7;
var ground_size = num_cells * wall_width;

// MOUSE
var mouse = new THREE.Vector2();
var mouse_down = new THREE.Vector2();	 

// GLOBAL VARIABLES
    // globally accessible variables that are defined in funciton
var camera, scene, renderer, ground, raycaster, 
    hemi_light, dir_light1, dir_light2, 
    hemi_light_helper, dir_light1_helper, dir_light2_helper, dir_light1ShadowHeper,  
    
    meshVolumeHover, meshVolumeDel, meshFloorZone, 
    meshFloorHover, meshFloorDel, 
    meshWallHover, meshWallDel, 
    meshWindow01Trans, meshWindow01Del, 
    meshDoor01Trans, meshDoor01Del;

// EXECUTE FUNCTIONS
creatingScene();
animate();




//////////////////// -------------MAIN FUNCTIONS------------------------------------------------------ //////////////////// 

// ====================================================
// { Scene Creation }
// ====================================================

// To actually be able to display anything with three.js, we need three things: scene, camera and renderer, so that we can render the scene with camera.

function creatingScene() {

    // --------------------------------
    //    Camera, Scene, Renderer
    // --------------------------------

    scene = new THREE.Scene();
    scene.background = new THREE.Color().setHSL( 0.6, 0, 1 );
    scene.fog = new THREE.Fog( scene.background, 1, 7000 );

    camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 1000 ); //FOV, aspect ratio, near, far of clipping plane
        // camera = new THREE.OrthographicCamera( -window.innerWidth/camera_zoom+camera_shift_x, window.innerWidth/camera_zoom+camera_shift_x,  window.innerHeight/camera_zoom+camera_shift_y,  -window.innerHeight/camera_zoom+camera_shift_y, -10000, 10000 ) //( left, right, top, bottom, near, far )
    camera.position.set( 0, 0, 30 );
    camera.up.set( 0, 0, 1 ); //orientation of the camera. if camera. up. set(0,0,1) , it would mean that z-axis is going vertically up in the screen and x and y axes align accordingly.
        // var cameraHelper = new THREE.CameraHelper( camera );
        // scene.add( cameraHelper )

    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setPixelRatio( window.devicePixelRatio ); // Sets device pixel ratio. This is usually used for HiDPI device to prevent bluring output canvas.
    renderer.setSize( window.innerWidth, window.innerHeight ); //Resizes the output canvas to (width, height) with device pixel ratio taken into account, and also sets the viewport to fit that size, starting in (0, 0).
    renderer.shadowMap.enabled = true; // Shadow maps are textures the shadows get drawn into.
    renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap
    document.body.appendChild( renderer.domElement );


    // --------------------------------
    //    Window, Mouse
    // --------------------------------
    window.addEventListener( 'resize', onWindowResize, false );
    
    var controls = new OrbitControls( camera, renderer.domElement );
    raycaster = new THREE.Raycaster(); // Raycasting is used for mouse picking (working out what objects in the 3d space the mouse is over) amongst other things.
    document.addEventListener('mousedown', onMouseDown, false);
    document.addEventListener('mouseup', onMouseUp, false);
    document.addEventListener( 'mousemove', onMouseMove, false );


    // --------------------------------
    //    Grid, Ground
    // --------------------------------

    // SCENE GRID
    var gridGround = new THREE.GridHelper( ground_size, num_cells, 0x504F4F, 0x504F4F );
    gridGround.rotation.x = Math.PI / 2;
    gridGround.position.x = 0;
    gridGround.position.y = -wall_width/2;
    gridGround.position.z = 0; // -floor_thickness/2
    scene.add( gridGround );
        // var axesHelper = new THREE.AxesHelper( 600 );
        // scene.add( axesHelper )

    // GROUND
    var ground_geo = new THREE.PlaneBufferGeometry( ground_size, ground_size); // width, height
    var ground_mat = new THREE.MeshLambertMaterial( { color: 0xffffff } );
        // var ground_mat = new THREE.MeshStandardMaterial( { color: 'white' } )
        // var ground_mat = new THREE.MeshBasicMaterial( {color: 0x0000ffff, side: THREE.DoubleSide} );
        // ground_mat.color.setHSL( 0.095, 1, 0.75);
    ground = new THREE.Mesh( ground_geo, ground_mat );
    ground.position.set(gridGround.position.x, gridGround.position.y, 0);
    ground.visible = false;
    ground.name = "ground"
    scene.add( ground );

    // --------------------------------
    //       ( - futurework - ) changeGridPos, autoGenWalls 
    // --------------------------------

    // changeGridPos(newHeight);
    // function changeGridPos(newHeight) {
    //     gridGround.position.z = newHeight;
    // }
    // document.getElementById("radiobuttonFloor").addEventListener("click", changeGridPos(0));
    // document.getElementById("radiobuttonWall").addEventListener("click", changeGridPos(10));
    

    // --------------------------------
    //    Light, Shadow
    // --------------------------------

    // HEMISPHERE LIGHT
    hemi_light = new THREE.HemisphereLight( 0xffffff, 0x3D3D3D, 1.15 ); //  skyColor, groundColor, intensity
    hemi_light.position.set( 0, 0, 10 );
    hemi_light.up.set( 0, 0, 0 );
    scene.add( hemi_light );
        // hemi_light_helper = new THREE.HemisphereLightHelper( hemi_light, 1 );
        // scene.add( hemi_light_helper );

    // DIRECTIONAL LIGHT 1
    dir_light1 = new THREE.DirectionalLight( 0xffffff, 0.3 ); // colour, intensity
    dir_light1.position.set( -5, -2, 0 );
        // dir_light1.position.multiplyScalar( 1 );
    scene.add( dir_light1 );
        // dir_light1_helper = new THREE.DirectionalLightHelper( dir_light1, 1, 0xFF0000 );
        // scene.add( dir_light1_helper );

    // DIRECTIONAL LIGHT 2
    dir_light2 = new THREE.DirectionalLight( 0xffffff, 0.3 ); // colour, intensity
    dir_light2.position.set( 5, 2, 0 );
    scene.add( dir_light2 );
        // dir_light2_helper = new THREE.DirectionalLightHelper( dir_light2, 1, 0xFF0000 );
        // scene.add( dir_light2_helper );
 
    // SHADOWS
        // ground.receiveShadow = true;
        // dir_light1.castShadow = true;
        // dir_light1.shadow.mapSize.width = 2048; dir_light1.shadow.mapSize.height = 2048;
        // dir_light1.shadow.camera.near = 1; dir_light1.shadow.camera.far = 3000; dir_light1.shadow.camera.left = -500; dir_light1.shadow.camera.bottom = -500; dir_light1.shadow.camera.top = 500; dir_light1.shadow.camera.right = 500;
        // dir_light1ShadowHeper = new THREE.CameraHelper( dir_light1.shadow.camera );
        // scene.add( dir_light1ShadowHeper );


    // --------------------------------
    //    Button Click, Hover Mesh ★
    // --------------------------------

    // _____________________
    //    _ * VOLUME *
    // ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
    document.getElementById("buttonVolume").addEventListener("click", onClickbuttonVolume );
     
    meshVolumeHover = new THREE.Mesh( geomVolumeHover, matVolumeTrans );
    meshVolumeHover.visible = false;
    scene.add(meshVolumeHover);
    meshVolumeDel = new THREE.Mesh( geomVolumeDel, matVolumeDel );
    meshVolumeDel.visible = false;
    scene.add(meshVolumeDel);

    // _____________________
    //    _ * FLOOR *
    // ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
    document.getElementById("buttonFloor").addEventListener("click",  onClickbuttonFloor);

    meshFloorHover = new THREE.Mesh( geomFloorHover, matFloorTrans );
    meshFloorHover.visible = false;
    scene.add(meshFloorHover);
    meshFloorDel = new THREE.Mesh( geomFloorDel, matFloorDel );
    meshFloorDel.visible = false;
    scene.add(meshFloorDel);
    

    // _____________________
    //    _ * WALL *
    // ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
    document.getElementById("buttonWall").addEventListener("click", onClickbuttonWall);

    meshWallHover = new THREE.Mesh( geomWallHover, matWallTrans );
        // meshWallHover.castShadow = false;
        // meshWallHover.receiveShadow = false;
    meshWallHover.visible = false;
    scene.add(meshWallHover);
    meshWallDel = new THREE.Mesh( geomWallDel, matWallDel );
        // meshWallDel.castShadow = false;
        // meshWallDel.receiveShadow = false;
    meshWallDel.visible = false;
    scene.add(meshWallDel);

    // _____________________
    //    _ * WINDOW01 *
    // ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
    document.getElementById("buttonWindow01").addEventListener("click", onClickbuttonWindow01);

    meshWindow01Trans = new THREE.Mesh( geomWindow01Hover, matWallTrans );
    meshWindow01Trans.visible = false;
    scene.add(meshWindow01Trans);
    meshWindow01Del = new THREE.Mesh( geomWindow01Del, matWallDel );
    meshWindow01Del.visible = false;
    scene.add(meshWindow01Del);

    // _____________________
    //    _ * DOOR01 *
    // ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
    document.getElementById("buttonDoor01").addEventListener("click", onClickbuttonDoor01);

    meshDoor01Trans = new THREE.Mesh( geomDoor01Hover, matWallTrans );
    meshDoor01Trans.visible = false;
    scene.add(meshDoor01Trans);
    meshDoor01Del = new THREE.Mesh( geomDoor01Del, matWallDel );
    meshDoor01Del.visible = false;
    scene.add(meshDoor01Del);



}

// ====================================================
// { Scene Animation Loop } ★
// ====================================================
// ''''''  intersect(y/n), shift press(n/y)

// This will create a loop that causes the renderer to draw the scene every time the screen is refreshed (on a typical screen this means 60 times per second).

function animate() {
    requestAnimationFrame( animate );
    render();
}

function render() {

    // _____________________
    //    _ * VOLUME *
    // ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
    if ( button_id == 'buttonVolume' ) {

        raycaster.setFromCamera( mouse, camera ); // create a ray from the camera and intersect it with objects in the scene
        var list_meshScene = getValueList(dictVolume, 1); // get the meshes in the scene to check for intersections
        list_meshScene.push(ground);
        var list_meshInt = raycaster.intersectObjects( list_meshScene ); // returns an array of cursor-intersected items, e.g. (3) [{…}, {…}, {…}] 
        var meshInt0 = list_meshInt[ 0 ]; // get the first mesh that the cursor intersects e.g. {distance: 29.318, point: Vector3, object: Mesh, face: Face3, faceIndex: 5}

        if ( list_meshInt.length > 0 ) { // if intersect with any meshes

            if (meshInt0.object.name == 'volume_base' ) { //if the first mesh that the cursor intersects has the name " "
                
                if (!bool_delVolume) { // if shift button is not pressed, show nothing
                    meshVolumeHover.visible = false;
                    meshVolumeDel.visible = false;
                    pos_meshVolume = null;
                }
                else { // if shift button is pressed, show geom_trans_del
                    
                    var cen_meshInt0 = meshInt0.object.position; // centre of the first mesh that the cursor intersects, e.g. Vector3 {x: -1.5, y: 3, z: 0.25}
                    pos_meshVolume = new THREE.Vector3(cen_meshInt0.x, cen_meshInt0.y, cen_meshInt0.z + volume_height/2); // update global variable _pos, e.g. Vector3 {x: -1.5, y: 3, z: 0.25}
    
                    meshVolumeDel.position.set(pos_meshVolume.x, pos_meshVolume.y, pos_meshVolume.z);
                    meshVolumeDel.visible = true;
                    meshVolumeHover.visible = false;
                } 

            } 
            
            else if (meshInt0.object.name == 'ground') { //if the first mesh that the cursor intersects does not has the name " ", i.e. intersect with ground
                
                if (!bool_delVolume) { // if shift button is not pressed, update pos and show geom_trans 
                    pos_meshVolume = new THREE.Vector3();
                    if (num_cells % 2 == 1) {// odd number of cells
                        pos_meshVolume.x = Math.round(meshInt0.point.x / volume_width) * volume_width;
                        pos_meshVolume.y = Math.round((meshInt0.point.y + volume_width_half) / volume_width ) * volume_width - volume_width_half;
                    } else { // even number of cells
                        pos_meshVolume.x = Math.round((meshInt0.point.x + volume_width_half) / volume_width) * volume_width - volume_width_half;
                        pos_meshVolume.y = Math.round(meshInt0.point.y / volume_width) * volume_width ;
                    }
                    pos_meshVolume.z = volume_height/2 ; // move volume up to align it with grid
                    meshVolumeHover.position.set(pos_meshVolume.x, pos_meshVolume.y, pos_meshVolume.z);
                    meshVolumeDel.visible = false;
                    meshVolumeHover.visible = true;
                }
            }    

        } else { // if do not intersect with anything, show nothing
            meshVolumeHover.visible = false;
            meshVolumeDel.visible = false;
            pos_meshVolume = null;
        }
   }

    // _____________________
    //    _ * FLOOR *
    // ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
    if ( button_id == 'buttonFloor' ) {
        raycaster.setFromCamera( mouse, camera ); // create a ray from the camera and intersect it with objects in the scene
        var list_meshScene = Object.values(dictFloor); // get the meshes in the scene to check for intersections
        list_meshScene.push(meshFloorZone);
        var list_meshInt = raycaster.intersectObjects( list_meshScene ); // returns an array of cursor-intersected items, e.g. (3) [{…}, {…}, {…}] 
        var meshInt0 = list_meshInt[ 0 ]; // get the first mesh that the cursor intersects e.g. {distance: 29.318, point: Vector3, object: Mesh, face: Face3, faceIndex: 5}

        if ( list_meshInt.length > 0 ) { // if intersect with any meshes

            if (meshInt0.object.name == 'floor') { //if the first mesh that the cursor intersects has the name " "

                var cen_meshInt0 = meshInt0.object.position; // centre of the first mesh that the cursor intersects, e.g. Vector3 {x: -1.5, y: 3, z: 0.25}
                pos_meshFloor = new THREE.Vector3(cen_meshInt0.x, cen_meshInt0.y, cen_meshInt0.z); // update global variable _pos, e.g. Vector3 {x: -1.5, y: 3, z: 0.25}
                
                if (!bool_delFloor) { // if shift button is not pressed, update trans pos and show geom_trans 
                    // orientHorizMeshToFaceOfIntMesh( meshInt0, pos_meshFloor, meshFloorHover, meshFloorDel );
                }

                else { // if shift button is pressed, show geom_trans_del
                    meshFloorDel.position.set(pos_meshFloor.x, pos_meshFloor.y, pos_meshFloor.z);
                    meshFloorDel.visible = true;
                    meshFloorHover.visible = false;
                } 

            } else { // if the first mesh that the cursor intersects does not has the name " ", i.e. intersect with ground
                
                if (!bool_delFloor) { // if shift button is not pressed, update pos and show geom_trans 
                    pos_meshFloor = new THREE.Vector3();
                    if (num_cells % 2 == 1) {// odd number of cells
                        pos_meshFloor.x = Math.round(meshInt0.point.x / floor_width) * floor_width;
                        pos_meshFloor.y = Math.round((meshInt0.point.y + floor_width_half) / floor_width) * floor_width - floor_width_half;
                    } else { // even number of cells
                        pos_meshFloor.x = Math.round((floor_width_half + meshInt0.point.x) / floor_width) * floor_width - floor_width_half;
                        pos_meshFloor.y = Math.round(meshInt0.point.y / floor_width) * floor_width ;
                    }
                    pos_meshFloor.z = floor_thickness/2 ; // move meshFloor up to align it with grid
                    meshFloorHover.position.set(pos_meshFloor.x, pos_meshFloor.y, pos_meshFloor.z);
                    meshFloorDel.visible = false;
                    meshFloorHover.visible = true;
                }
            }    

        } else { // if do not intersect with anything, show nothing
            meshFloorHover.visible = false;
            meshFloorDel.visible = false;
            pos_meshFloor = null;
        }
   }

    // _____________________
    //    _ * WALL * ★
    // ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
    if ( button_id == 'buttonWall' ) {
        raycaster.setFromCamera( mouse, camera );
        var list_meshScene = getMeshesInGroups(); // get the mesh in the scene to check for intersections
        list_meshScene.push(meshFloorZone);
        var list_meshInt = raycaster.intersectObjects( list_meshScene ); // returns an array of intersected items, e.g. (3) [{…}, {…}, {…}] 
        var meshInt0 = list_meshInt[ 0 ]; // get the first mesh that the cursor intersects e.g. {distance: 29.318, point: Vector3, object: Mesh, face: Face3, faceIndex: 5}
        
        if ( list_meshInt.length > 0 ) { // if intersect with any meshes

            if (meshInt0.object.name == 'wall') { // if the first mesh that the cursor intersects has the name ' '
                var cen_meshInt0 = meshInt0.object.position; // centre of the first mesh that the cursor intersects, e.g. Vector3 {x: -1.5, y: 3, z: 0.25}
                pos_meshWall = new THREE.Vector3(cen_meshInt0.x, cen_meshInt0.y, cen_meshInt0.z); // update global variable _pos, e.g. Vector3 {x: -1.5, y: 3, z: 0.25}
                angle_meshWall = meshInt0.object.rotation.z;

                if (!bool_delWall) { // if shift button is not pressed, update trans pos and show geom_trans 
                    // orientVertMeshToFaceOfIntMesh( meshInt0, pos_meshWall, meshWallHover, meshWallDel );
                }

                else { // if shift button is pressed, show geom_trans_del
                    meshWallDel.position.set(pos_meshWall.x, pos_meshWall.y, pos_meshWall.z);
                    meshWallDel.rotation.z = angle_meshWall;
                    meshWallDel.visible = true;
                    meshWallHover.visible = false;
                } 
            } 
            
            else if (meshInt0.object.parent.name == 'Window01') { // if the first mesh that the cursor intersects has the name ' '
                if (!bool_delWall) { // if shift button is not pressed, update global variable of geom & geom_trans
                    var grpInt = meshInt0.object.parent.parent; // Group { .., name: 'Window01', ..}
                    var cen_grpInt = grpInt.position; // centre of the first mesh that the cursor intersects, e.g. Vector3 {x: -1.5, y: 3, z: 0.25}
                    pos_meshWall = new THREE.Vector3(cen_grpInt.x, cen_grpInt.y, cen_grpInt.z);
                    angle_meshWall = grpInt.rotation.z;
    
                    meshWallHover.position.copy(pos_meshWall);
                    meshWallHover.rotation.z = angle_meshWall
                    meshWallDel.visible = false;
                    meshWallHover.visible = true;
                }
            }	

            else if (meshInt0.object.parent.name == 'Door01') { // if the first mesh that the cursor intersects has the name ' '
                if (!bool_delWall) { // if shift button is not pressed, update global variable of geom & geom_trans
                    var grpInt = meshInt0.object.parent.parent; // Group { .., name: 'Window01', ..}
                    var cen_grpInt = grpInt.position; // centre of the first mesh that the cursor intersects, e.g. Vector3 {x: -1.5, y: 3, z: 0.25}
                    pos_meshWall = new THREE.Vector3(cen_grpInt.x, cen_grpInt.y, cen_grpInt.z);
                    angle_meshWall = grpInt.rotation.z;
    
                    meshWallHover.position.copy(pos_meshWall);
                    meshWallHover.rotation.z = angle_meshWall
                    meshWallDel.visible = false;
                    meshWallHover.visible = true;
                }
            }				
    
            else { // if the first mesh that the cursor intersects does not have name, i.e. intersect with ground
                if (!bool_delWall) { // if shift button is not pressed, update pos and show geom_trans
                    pos_meshWall = new THREE.Vector3();
                    angle_meshWall = 0
                    if (num_cells % 2 == 1) { //odd number of cells
                        var ptX = new THREE.Vector3( // pos_meshWall if wall is horizontal
                            Math.round(meshInt0.point.x / wall_width) * wall_width,
                            Math.round(meshInt0.point.y / wall_width) * wall_width,
                            0);
                        var ptY = new THREE.Vector3( // pos_meshWall if wall is vertical
                            Math.round((wall_width_half + meshInt0.point.x) / wall_width) * wall_width - wall_width_half,
                            Math.round((wall_width_half + meshInt0.point.y) / wall_width) * wall_width - wall_width_half,
                            0);
                    } else { // even number of cells
                        var ptX = new THREE.Vector3( // pos_meshWall if wall is horizontal
                            Math.round((wall_width_half + meshInt0.point.x) / wall_width) * wall_width - wall_width_half,
                            Math.round((wall_width_half + meshInt0.point.y) / wall_width) * wall_width - wall_width_half,
                            0);
                        var ptY = new THREE.Vector3( // pos_meshWall if wall is vertical
                            Math.round(meshInt0.point.x / wall_width) * wall_width,
                            Math.round(meshInt0.point.y / wall_width) * wall_width,
                            0);
                    }
                    var distX = ptX.distanceTo(meshInt0.point); // distance from horizontal wall pos to mouse pointer
                    var distY = ptY.distanceTo(meshInt0.point); // distance from vertical wall pos to mouse pointer
                    if (distX <= distY) {
                        pos_meshWall.copy(ptX)
                    } else {
                        pos_meshWall.copy(ptY)
                        angle_meshWall = Math.PI / 2
                    }
                    // console.log('___', meshInt0.point, ptX, ptY, distX, distY, pos_meshWall)
                    pos_meshWall.z = wall_height_half;
                    meshWallHover.position.set(pos_meshWall.x, pos_meshWall.y, pos_meshWall.z);
                    meshWallHover.rotation.z = angle_meshWall
                    meshWallDel.visible = false;
                    meshWallHover.visible = true;
                }
            }

        } else { // if do not intersect with anything, show nothing
            meshWallHover.visible = false;
            meshWallDel.visible = false;
            pos_meshWall = null;
        }
    }	

    // _____________________
    //    _ * WINDOW01 * ★
    // ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
    if ( button_id == 'buttonWindow01' ) {
        raycaster.setFromCamera( mouse, camera );
        var list_meshScene = getMeshesInGroups(); // get the mesh in the scene to check for intersections
        list_meshScene.push(meshFloorZone);
        var list_meshInt = raycaster.intersectObjects( list_meshScene ); // returns an array of intersected items, e.g. (3) [{…}, {…}, {…}] 
        var meshInt0 = list_meshInt[ 0 ]; // get the first mesh that the cursor intersects e.g. {distance: 29.318, point: Vector3, object: Mesh, face: Face3, faceIndex: 5}
 
       if ( list_meshInt.length > 0 ) { // if intersect with any mesh

            if (meshInt0.object.parent.name == 'Window01') { // if the first mesh that the cursor intersects has the name ' '
                // console.log('~~~window~~~meshInt0.object~~~', meshInt0.object) // Mesh {.., name: 'Glass', ..}
                // console.log('~~~window~~~meshInt0.object.parent~~~', meshInt0.object.parent) // Object3D {.., name: 'Window01', ..}
                var grpInt = meshInt0.object.parent.parent; // Group { .., name: 'Window01', ..}
                var cen_grpInt = grpInt.position; // centre of the first mesh that the cursor intersects, e.g. Vector3 {x: -1.5, y: 3, z: 0.25}
                pos_grpWindow01 = new THREE.Vector3(cen_grpInt.x, cen_grpInt.y, cen_grpInt.z); // update global variable _pos, e.g. Vector3 {x: -1.5, y: 3, z: 0.25}
                angle_grpWindow01 = grpInt.rotation.z;

                if (!bool_delWindow01) { 
                    // if shift button is not pressed, do nothing
                }
                else { // if shift button is pressed, show geom_trans_del
                    meshWindow01Del.position.set(pos_grpWindow01.x, pos_grpWindow01.y, pos_grpWindow01.z);
                    meshWindow01Del.rotation.z = angle_grpWindow01;
                    meshWindow01Del.visible = true;
                    meshWindow01Trans.visible = false;
                }
            } 
            
            else if (meshInt0.object.name == 'wall') { // if the first mesh that the cursor intersects has the name ' '
                if (!bool_delWindow01) { // if shift button is not pressed, update global variable of geom & geom_trans
                    var cen_meshInt0 = meshInt0.object.position;
                    pos_grpWindow01 = new THREE.Vector3(cen_meshInt0.x, cen_meshInt0.y, cen_meshInt0.z);
                    angle_grpWindow01 = meshInt0.object.rotation.z;

                    meshWindow01Trans.position.copy(pos_grpWindow01);
                    meshWindow01Trans.rotation.z = angle_grpWindow01
                    meshWindow01Trans.visible = true;
                    meshWindow01Del.visible = false;
                }
            }

            else if (meshInt0.object.parent.name == 'Door01') { 
                if (!bool_delWindow01) { // if shift button is not pressed, update global variable of geom & geom_trans
                    var grpInt = meshInt0.object.parent.parent; // centre of the first mesh that the cursor intersects, e.g. Vector3 {x: -1.5, y: 3, z: 0.25}
                    var cen_grpInt = grpInt.position; // update global variable _pos, e.g. Vector3 {x: -1.5, y: 3, z: 0.25}
                    pos_grpWindow01 = new THREE.Vector3(cen_grpInt.x, cen_grpInt.y, cen_grpInt.z);
                    angle_grpWindow01 = grpInt.rotation.z;

                    meshWindow01Trans.position.copy(pos_grpWindow01);
                    meshWindow01Trans.rotation.z = angle_grpWindow01
                    meshWindow01Trans.visible = true;
                    meshWindow01Del.visible = false;
                }
            }	

        } else { // if do not intersect with anything, show nothing
            meshWindow01Trans.visible = false;
            meshWindow01Del.visible = false;
            pos_grpWindow01 = null;
        }
    }	

    // _____________________
    //    _ * DOOR01 * ★
    // ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
    if ( button_id == 'buttonDoor01' ) {
        raycaster.setFromCamera( mouse, camera );
        var list_meshScene = getMeshesInGroups(); // get the mesh in the scene to check for intersections
        list_meshScene.push(meshFloorZone);
        var list_meshInt = raycaster.intersectObjects( list_meshScene );
        var meshInt0 = list_meshInt[ 0 ];
        
        if ( list_meshInt.length > 0 ) {  // if intersect with any meshes

            if (meshInt0.object.parent.name == 'Door01') { // if the first mesh that the cursor intersects has the name ' '
                var grpInt = meshInt0.object.parent.parent // centre of the first mesh that the cursor intersects, e.g. Vector3 {x: -1.5, y: 3, z: 0.25}
                var cen_grpInt = grpInt.position; // update global variable _pos, e.g. Vector3 {x: -1.5, y: 3, z: 0.25}
                pos_grpDoor01 = new THREE.Vector3(cen_grpInt.x, cen_grpInt.y, cen_grpInt.z);
                angle_grpDoor01 = grpInt.rotation.z;

                if (!bool_delDoor01) {
                    // if shift button is not pressed, do nothing
                } 
                else { // if shift button is pressed, show geom_trans_del
                    meshDoor01Del.position.set(pos_grpDoor01.x, pos_grpDoor01.y, pos_grpDoor01.z); // show del geom
                    meshDoor01Del.rotation.z = angle_grpDoor01;
                    meshDoor01Del.visible = true;
                    meshDoor01Trans.visible = false;
                }
            } 
            
            else if (meshInt0.object.name == 'wall' ) { // if the first mesh that the cursor intersects has the name ' '
                if (!bool_delDoor01) { // if shift button is not pressed, update global variable of geom & geom_trans
                    var cen_meshInt0 = meshInt0.object.position;
                    pos_grpDoor01 = new THREE.Vector3(cen_meshInt0.x, cen_meshInt0.y, cen_meshInt0.z);
                    angle_grpDoor01 = meshInt0.object.rotation.z;

                    meshDoor01Trans.position.copy(pos_grpDoor01);
                    meshDoor01Trans.rotation.z = angle_grpDoor01
                    meshDoor01Trans.visible = true;
                    meshDoor01Del.visible = false;
                }
            }

            else if (meshInt0.object.parent.name == 'Window01') { 
                if (!bool_delDoor01) { // if shift button is not pressed, update global variable of geom & geom_trans
                    var grpInt = meshInt0.object.parent.parent // centre of the first mesh that the cursor intersects, e.g. Vector3 {x: -1.5, y: 3, z: 0.25}
                    var cen_grpInt = grpInt.position; // update global variable _pos, e.g. Vector3 {x: -1.5, y: 3, z: 0.25}
                    pos_grpDoor01 = new THREE.Vector3(cen_grpInt.x, cen_grpInt.y, cen_grpInt.z);
                    angle_grpDoor01 = grpInt.rotation.z;

                    meshDoor01Trans.position.copy(pos_grpDoor01);
                    meshDoor01Trans.rotation.z = angle_grpDoor01
                    meshDoor01Trans.visible = true;
                    meshDoor01Del.visible = false;
                }    
            }

        } else { // if do not intersect with anything, show nothing
            meshDoor01Trans.visible = false;
            meshDoor01Del.visible = false;
            pos_grpDoor01 = null;
        }
    }	








   renderer.render( scene, camera ); // render the scene

}


//////////////////// -------------SUBSIDIARY FUNCTIONS------------------------------------------------------ //////////////////// 


// ====================================================
// { EventListener } 
// ====================================================

// --------------------------------
//    Window Resize
// --------------------------------

function onWindowResize() { // Resize browser window
    camera.aspect = window.innerWidth / window.innerHeight;
        // camera.left = -window.innerWidth/camera_zoom+camera_shift_x;
        // camera.right = window.innerWidth/camera_zoom+camera_shift_x;
        // camera.top =  window.innerHeight/camera_zoom+camera_shift_y;
        // camera.bottom =  -window.innerHeight/camera_zoom+camera_shift_y;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight);
}

// --------------------------------
//    Mouse Down
// --------------------------------

function onMouseDown(event) { // Mouse down: store the cursor (X, Y) coordinate on browser window as values between 0 and 1; centre is (0,0), corners are (+/-1, +/-1)
    mouse_down.x = event.clientX; 
    mouse_down.y = event.clientY
}

// --------------------------------
//    Mouse Up ★
// --------------------------------

function onMouseUp(event) { // Mouse up: do nothing, create mesh or delete mesh
    if ((mouse_down.x !== event.clientX) || (mouse_down.y !== event.clientY)) {
        return; // if we are dragging, return nothing
    }

    // _____________________
    //    _ * VOLUME *
    // ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
    else if (pos_meshVolume != null) { //If not dragging and raycaster.intersectObjects.object.values(dictVolume).position != null, e.g. Vector3 {x: 1.5, y: 3, z: 0}
        var key = keyGen(pos_meshVolume);
        if (bool_delVolume && key in dictVolume) { // if shift is pressed and existing key is True, delete volume
            deleteVolume(dictVolume[key]); // e.g. (2) [Mesh, Mesh]
        } else if (!bool_delVolume && dictVolume[key]==undefined) { //if shift is not pressed and there is no exisitng key, add a new volume to the scene and add its key to dictVolume {}
            addVolume(key); 
        }
    }
    
    // _____________________
    //    _ * FLOOR *
    // ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
    else if (pos_meshFloor != null) { //If not dragging and raycaster.intersectObjects.object.values(dictFloor).position != null, e.g. Vector3 {x: 1.5, y: 3, z: 0}
        var key = keyGen(pos_meshFloor);
        if (bool_delFloor && key in dictFloor) { // if shift is pressed and existing key is True, delete meshFloor
            deleteFloor(dictFloor[key]); 
            genWallEnclosure(pos_meshFloor);
        } else if (!bool_delFloor && dictFloor[key]==undefined) { //if shift is not pressed and there is no exisitng key, add a new meshFloor to the scene and add its key to dictFloor {}
            addFloor(key); 
            genWallEnclosure(pos_meshFloor);
        }
    }

    // _____________________
    //    _ * WALL * ★
    // ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
    else if (pos_meshWall != null) {
        var key = keyGen(pos_meshWall);
        if (bool_delWall && key in dictWall) {
            deleteWall(dictWall[key]); 
        } else if (!bool_delWall && dictWall[key]==undefined) {
            addWall(key);
            if (key in dictWindow01) {
                deleteWindow01(dictWindow01[key]);
            } else if (key in dictDoor01) {
                deleteDoor01(dictDoor01[key]);
            }
        }
    }

    // _____________________
    //    _ * WINDOW01 * ★
    // ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
    else if (pos_grpWindow01 != null) {
        var key = keyGen(pos_grpWindow01);
        if (bool_delWindow01 && key in dictWindow01) {
            deleteWindow01(dictWindow01[key]);  
        } else if (!bool_delWindow01 && dictWindow01[key]==undefined) {
            addWindow01(key);
            if (key in dictWall) {
                deleteWall(dictWall[key]);
            } else if (key in dictDoor01) {
                deleteDoor01(dictDoor01[key]);
            }
        }
    }

    // _____________________
    //    _ * DOOR01 * ★
    // ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
    else if (pos_grpDoor01 != null) {
        var key = keyGen(pos_grpDoor01);
        if (bool_delDoor01 && key in dictDoor01) {
            deleteDoor01(dictDoor01[key]);  
        } else if (!bool_delDoor01 && dictDoor01[key]==undefined) {
            addDoor01(key);
            if (key in dictWall) {
                deleteWall(dictWall[key]);
            } else if (key in dictWindow01) {
                deleteWindow01(dictWindow01[key]);
            }   
        }
    }


    
}


// --------------------------------
//    Mouse Move and Shift Key ★
// --------------------------------

function onMouseMove( event ) {
    event.preventDefault(); // ??? not too sure what this does
    mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1; 
    mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

    // _____________________
    //    _ * VOLUME *
    // ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
    if (event.shiftKey) { // if shift is pressed, del_mesh and hide mesh_trans
        bool_delVolume = true;
    } else { // if shift is not pressed, del_mesh is false and hide mesh_trans
        bool_delVolume = false;
    }
    
    // _____________________
    //    _ * FLOOR *
    // ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
    if (event.shiftKey) { // if shift is pressed, del_mesh and hide mesh_trans
        bool_delFloor = true;
    } else { // if shift is not pressed, del_mesh is false and hide mesh_trans
        bool_delFloor = false;
    }

    // _____________________
    //    _ * WALL * 
    // ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
    if (event.shiftKey) {
        bool_delWall = true;
    } else {
        bool_delWall = false;
    }

    // _____________________
    //    _ * WINDOW01 * 
    // ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
    if (event.shiftKey) {
        bool_delWindow01 = true;
    } else {
        bool_delWindow01 = false;
    }

    // _____________________
    //    _ * DOOR01 * 
    // ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
    if (event.shiftKey) {
        bool_delDoor01 = true;
    } else {
        bool_delDoor01 = false;
    }




}


// --------------------------------
//    Buttons ★
// --------------------------------

// _____________________
//    _ * VOLUME *
// ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
function onClickbuttonVolume() {
    document.getElementById(button_id).classList.remove("pressed");
    button_id = 'buttonVolume';
    document.getElementById(button_id).classList.add("pressed");
};

// _____________________
//    _ * FLOOR *
// ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
function onClickbuttonFloor() {
    document.getElementById(button_id).classList.remove("pressed");
    button_id = 'buttonFloor';
    document.getElementById(button_id).classList.add("pressed");
};

// _____________________
//    _ * WALL * 
// ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
function onClickbuttonWall() {
    document.getElementById(button_id).classList.remove("pressed");
    button_id = 'buttonWall';
    document.getElementById(button_id).classList.add("pressed");
};

// _____________________
//    _ * WINDOW01 * 
// ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
function onClickbuttonWindow01() {
    document.getElementById(button_id).classList.remove("pressed");
    button_id = 'buttonWindow01';
    document.getElementById(button_id).classList.add("pressed");
};

// _____________________
//    _ * DOOR01 * 
// ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
function onClickbuttonDoor01() {
    document.getElementById(button_id).classList.remove("pressed");
    button_id = 'buttonDoor01';
    document.getElementById(button_id).classList.add("pressed");
};



// ====================================================
// { Raycaster } 
// ====================================================

// --------------------------------
//    Extract Meshes ★
// --------------------------------

function getMeshesInGroups() {
    
    var list_meshScene = []; // get the mesh in the scene to check for intersections
    
    // console.log('~~~Object.values(dictWall)~~~', Object.values(dictWall)) // e.g. (2) [Mesh, Mesh] (i.e. 2 walls in the scene)
    list_meshScene = list_meshScene.concat(Object.values(dictWall));

    // console.log('~~~Object.values(dictWindow01)~~~', Object.values(dictWindow01)) // e.g. (3) [Group, Group, Group] (i.e. 3 windows in the scene)
    Object.values(dictWindow01).forEach(i => { // for each group in the scene
        // console.log('~~~i~~~', i)  // e.g. Group {.., children: [Object3D], ..}
        // console.log('~~~i.children~~~', i.children) // e.g. [Object3D] {0: Object3D, [[Prototype]]: Array(0)}
        // console.log('~~~i.children[0]~~~', i.children[0]) // e.g. Object3D {..}
        // console.log('~~~i.children[0].children~~~', i.children[0].children) // e.g. (4) [Mesh, Mesh, Mesh, Mesh]
        list_meshScene = list_meshScene.concat(i.children[0].children) // concat the its meshes into the list 
    })

    // console.log('~~~Object.values(dictDoor01)~~~', Object.values(dictDoor01)) // e.g. (2) [Group, Group] (i.e. 2 doors in the scene)
    Object.values(dictDoor01).forEach(i => {
        list_meshScene = list_meshScene.concat(i.children[0].children)
    })






    // console.log('~~~sceneMeshesAll~~~', list_meshScene) // e.g. (12) [Mesh, Mesh, Mesh, Mesh, Mesh, Mesh, Mesh, Mesh, Mesh, Mesh, Mesh, Mesh]
    return list_meshScene
}

// --------------------------------
//    Orient Meshes ★
// --------------------------------

function orientHorizMeshToFaceOfIntMesh( meshInt0, pos, meshHorizHover, meshHorizDel ) { // create different oriented position depending on the face of mesh intersected, show meshHover and allow adding of mesh

    if (meshInt0.faceIndex == 0 || meshInt0.faceIndex == 1) { // right top || right bottom
        pos.x += floor_width;
    } else if (meshInt0.faceIndex == 2 || meshInt0.faceIndex == 3) { // left top || bottom
        pos.x -= floor_width;
    }  else if (meshInt0.faceIndex == 4 || meshInt0.faceIndex == 5) { // back right || left
        pos.y += floor_width;
    }  else if (meshInt0.faceIndex == 6 || meshInt0.faceIndex == 7) { // front left || right
        pos.y -= floor_width;
    }  else if (meshInt0.faceIndex == 8 || meshInt0.faceIndex == 9) { // top left || right
        pos.z += wall_height;
    }  else if (meshInt0.faceIndex == 10 || meshInt0.faceIndex == 11) { // bottom left || right
        pos.z -= wall_height;
    }
    meshHorizHover.position.set(pos.x, pos.y, pos.z);
    meshHorizDel.visible = false;
    meshHorizHover.visible = true;

}

function orientVertMeshToFaceOfIntMesh( meshInt0, pos, meshVertHover, meshVertDel ) { // create different oriented position depending on the face of mesh intersected, show meshHover and allow adding of mesh
    
    if (meshInt0.faceIndex == 0 || meshInt0.faceIndex == 1) { // right top || right bottom
        if (angle_meshWall !== 0) {
            pos.y += wall_width;
        } else {
            pos.x += wall_width;
        }
    } else if (meshInt0.faceIndex == 3 || meshInt0.faceIndex == 2) { // left top || left bottom
        if (angle_meshWall !== 0) {
            pos.y -= wall_width;
        } else {
            pos.x -= wall_width;
        }
    } else if (meshInt0.faceIndex == 6) { // front left
        if (angle_meshWall !== 0) {
            angle_meshWall = 0;
            pos.x += wall_width_half;
            pos.y -= wall_width_half;
        } else {
            angle_meshWall = Math.PI / 2;
            pos.x -= wall_width_half;
            pos.y -= wall_width_half;
        }
    } else if (meshInt0.faceIndex == 7) { // front right
        if (angle_meshWall !== 0) {
            angle_meshWall = 0;
            pos.x += wall_width_half;
            pos.y += wall_width_half;
        } else {
            angle_meshWall = Math.PI / 2;
            pos.x += wall_width_half;
            pos.y -= wall_width_half;
        }
    } else if (meshInt0.faceIndex == 5) { // back left
        if (angle_meshWall !== 0) {
            angle_meshWall = 0;
            pos.x -= wall_width_half;
            pos.y += wall_width_half;
        } else {
            angle_meshWall = Math.PI / 2;
            pos.x += wall_width_half;
            pos.y += wall_width_half;
        }
    } else if (meshInt0.faceIndex == 4) { // back right
        if (angle_meshWall !== 0) {
            angle_meshWall = 0;
            pos.x -= wall_width_half;
            pos.y -= wall_width_half;
        } else {
            angle_meshWall = Math.PI / 2;
            pos.x -= wall_width_half;
            pos.y += wall_width_half;
        }
    } else if (meshInt0.faceIndex == 8 || meshInt0.faceIndex == 9) { // top left || right
        pos.z += wall_height; 
    } else if (meshInt0.faceIndex == 11 || meshInt0.faceIndex == 12) { // bottom left || right
        pos.z -= wall_height; 
    }
    meshVertHover.position.set(pos.x, pos.y, pos.z);
    meshVertHover.rotation.z = angle_meshWall;
    meshVertDel.visible = false;
    meshVertHover.visible = true;

}



//////////////////// -------------HELPER FUNCTIONS------------------------------------------------------ //////////////////// 

// ====================================================
// { Mouse Up } ★
// ====================================================
// ''''''  add, delete



// --------------------------------
//    Scene Modifications
// --------------------------------

// _____________________
//    _ * VOLUME *
// ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾

function addVolume(key) {

    // ADD MESH
    var meshVolume = new THREE.Mesh(geomVolume, matVolumeTrans);
    meshVolume.position.set(pos_meshVolume.x, pos_meshVolume.y, pos_meshVolume.z);
        // scene.add( meshVolume );

    var meshVolumeBase = new THREE.Mesh( geomVolumeBase, matVolume ) ;
    meshVolumeBase.position.set(pos_meshVolume.x, pos_meshVolume.y, 0);
    scene.add( meshVolumeBase );

    // ADD MESH PROPERTIES
    meshVolume.name = "volume"
    meshVolumeBase.name = "volume_base"
    meshVolume.volume_key = key;

    // UPDATE GLOBAL VARIABLES, HTML
    dictVolume[key] = [meshVolume, meshVolumeBase];
    cnt_meshVolume += 1; // update the counter on the web page
    document.getElementById('buttonVolume').innerHTML = "Volume: " + cnt_meshVolume;

    // UPDATE POINTS IN SCENE
    var list_CoordOfCorner = findCoordsOfBaseCorners( pos_meshVolume );
    list_CoordOfCorner.forEach( updatePoints )

    // UPDATE FLOOR ZONE MESH
    var list_meshVolumeBase = getValueList(dictVolume, 1)
    if ( meshFloorZone != undefined ) {
        scene.remove( meshFloorZone )   
    } 
    meshFloorZone = mergeMeshes(list_meshVolumeBase, matVolume, meshFloorZone, "Floor_Zone");

};

function findCoordsOfBaseCorners( pos ) {
    var base_frontleft_coord = new THREE.Vector3( pos.x - volume_width_half, pos.y + volume_width_half, pos.z - volume_width_half );
    var base_frontright_coord = new THREE.Vector3( pos.x + volume_width_half, pos.y + volume_width_half, pos.z - volume_width_half );
    var base_backright_coord = new THREE.Vector3( pos.x + volume_width_half, pos.y - volume_width_half, pos.z - volume_width_half );
    var base_backleft_coord = new THREE.Vector3( pos.x - volume_width_half, pos.y - volume_width_half, pos.z - volume_width_half );
    var list_CoordOfCorner = [ base_frontleft_coord, base_frontright_coord, base_backright_coord, base_backleft_coord ]
    return list_CoordOfCorner
}

function updatePoints(coord) { // add or remove points in the scene
    var key = keyGen(coord) // generate key for each corner point
    if ( dictPoints [key] == undefined ) { // if key does not exists
        var geomPoint = new THREE.BufferGeometry().setFromPoints([coord]);
        var matPoint = new THREE.PointsMaterial({size: 0.8, color: "pink"});
        var point = new THREE.Points(geomPoint, matPoint);
        scene.add(point);
        dictPoints[key] = [coord, point]; // add new key-value pair to dict
    } 
    else { // if key exists
        scene.remove( dictPoints [key][1] );
        delete dictPoints [key]
    }
}



function deleteVolume( values ) {

    scene.remove( values[1] ); // value[0] is e.g. Mesh {..}
    scene.remove( )
    delete dictVolume[ values.volume_key ];
    cnt_meshVolume -= 1; 
    document.getElementById('buttonVolume').innerHTML = "Volume:" + cnt_meshVolume;

    // UPDATE POINTS IN SCENE
    var list_CoordOfCorner = findCoordsOfBaseCorners( pos_meshVolume );
    list_CoordOfCorner.forEach( updatePoints )
};


// _____________________
//    _ * FLOOR *
// ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾

function addFloor(key) {

    // ADD MESH
    var meshFloor = new THREE.Mesh(geomFloor, particleboard);
    meshFloor.position.set(pos_meshFloor.x, pos_meshFloor.y, pos_meshFloor.z);
        // meshFloor.castShadow = true;
        // meshFloor.receiveShadow = true;
    scene.add( meshFloor );

    // ADD MESH PROPERTIES
    meshFloor.name = "floor"
    meshFloor.floor_key = key;

    // UPDATE GLOBAL VARIABLES, HTML
    dictFloor[key] = meshFloor;
    cnt_meshFloor += 1; // update the counter on the web page
    document.getElementById('buttonFloor').innerHTML = "Floor: " + cnt_meshFloor;
    // console.log('~~~meshFloor~~~', meshFloor) 
};

function deleteFloor(meshFloor) {
    scene.remove( meshFloor );
    delete dictFloor[ meshFloor.floor_key ];
    cnt_meshFloor -= 1; 
    document.getElementById('buttonFloor').innerHTML = "Floor: " + cnt_meshFloor;
};

function genWallEnclosure(pos_meshFloor) {

    // LEFT WALL
    angle_meshWall = Math.PI / 2;
    pos_meshWall = new THREE.Vector3(pos_meshFloor.x - floor_width_half, pos_meshFloor.y, pos_meshFloor.z - floor_thickness/2 + wall_height_half); // update global variable _pos, e.g. Vector3 {x: -1.5, y: 3, z: 0.25}
    var wall_key = keyGen(pos_meshWall);

    if ( dictWall [wall_key] == undefined ) {
        addWall(wall_key);
    } else {
        deleteWall(dictWall [ wall_key ]);
    }


    // RIGHT WALL
    angle_meshWall = - Math.PI / 2;
    pos_meshWall = new THREE.Vector3(pos_meshFloor.x + floor_width_half, pos_meshFloor.y, pos_meshFloor.z - floor_thickness/2 + wall_height_half); // update global variable _pos, e.g. Vector3 {x: -1.5, y: 3, z: 0.25}
    var wall_key = keyGen(pos_meshWall);

    if ( dictWall [wall_key] == undefined ) {
        addWall(wall_key);
    } else {
        deleteWall(dictWall [ wall_key ]);
    }


    // FRONT WALL
    angle_meshWall = 0;
    pos_meshWall = new THREE.Vector3(pos_meshFloor.x, pos_meshFloor.y + floor_width_half, pos_meshFloor.z - floor_thickness/2 + wall_height_half); // update global variable _pos, e.g. Vector3 {x: -1.5, y: 3, z: 0.25}
    var wall_key = keyGen(pos_meshWall);

    if ( dictWall [wall_key] == undefined ) {
        addWall(wall_key);
    } else {
        deleteWall(dictWall [ wall_key ]);
    }


    // BACK WALL
    angle_meshWall = - Math.PI;
    pos_meshWall = new THREE.Vector3(pos_meshFloor.x, pos_meshFloor.y - floor_width_half, pos_meshFloor.z - floor_thickness/2 + wall_height_half); // update global variable _pos, e.g. Vector3 {x: -1.5, y: 3, z: 0.25}
    var wall_key = keyGen(pos_meshWall);

    if ( dictWall [wall_key] == undefined ) {
        addWall(wall_key);
    } else {
        deleteWall(dictWall [ wall_key ]);
    }


    pos_meshWall = null // restore to initialisation state

}


// _____________________
//    _ * WALL * 
// ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾

function addWall(key) {

    // ADD MESH
    var meshWall = new THREE.Mesh( geomWall, obs );
    meshWall.position.set(pos_meshWall.x, pos_meshWall.y, pos_meshWall.z);
    scene.add( meshWall );

    // ADD MESH PROPERTIES
    meshWall.name = "wall"
    meshWall.wall_key = key;

    // UPDATE GLOBAL VARIABLES, HTML
    dictWall[key] = meshWall;
    meshWall.rotation.z = angle_meshWall;
    cnt_meshWall += 1; 
    document.getElementById('buttonWall').innerHTML = "Wall: " + cnt_meshWall;
    
    // // get wall corner points
    // const corner_ver_shift_value = new THREE.Vector3(0, 0, wall_height_half);
    // var corner_hor_shift_value = 0;
    // if (angle_meshWall == 0) {
    // 	var corner_shift_value = new THREE.Vector3(wall_width_half, 0, 0);
    // } else {
    // 	var corner_shift_value = new THREE.Vector3(0, wall_width_half*(-1), 0);
    // }
    // var wall_left_corner = meshWall.position.clone().sub(corner_shift_value).sub(corner_ver_shift_value) ;
    // var wall_right_corner = meshWall.position.clone().add(corner_shift_value).sub(corner_ver_shift_value);
    // wall_pos_list.push(wall_left_corner, wall_right_corner);

    // // Visualise Points
    // var geom = new THREE.BufferGeometry().setFromPoints([wall_left_corner, wall_right_corner]);
    // var matPoints = new THREE.PointsMaterial({size: 10, color: "pink"});
    // var points = new THREE.Points(geom, matPoints);
    // scene.add(points);

    // console.log('____', wall_pos_list)
};

// Delete a wall
function deleteWall(meshWall) {
    scene.remove( meshWall );
    delete dictWall[ meshWall.wall_key ];
    cnt_meshWall -= 1; 
    document.getElementById('buttonWall').innerHTML = "Wall: " + cnt_meshWall;
};

// _____________________
//    _ * WINDOW01 * 
// ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾

function addWindow01(key) {

    // ADD MESH
    var Window01 = geomWindow01.clone();
    Window01.position.set(pos_grpWindow01.x, pos_grpWindow01.y, pos_grpWindow01.z);
    scene.add( Window01 );

    // ADD MESH PROPERTIES
    Window01.name = "Window01"
    Window01.Window01_key = key;

    // UPDATE GLOBAL VARIABLES, HTML
    dictWindow01[key] = Window01;
    Window01.rotation.z = angle_grpWindow01;
    cnt_grpWindow01 += 1; 
    document.getElementById('buttonWindow01').innerHTML = "Window01: " + cnt_grpWindow01;
};

// Delete a Window01
function deleteWindow01(Window01) {
    scene.remove( Window01 );
    delete dictWindow01[ Window01.Window01_key ];
    cnt_grpWindow01 -= 1; 
    document.getElementById('buttonWindow01').innerHTML = "Window01: " + cnt_grpWindow01;
};


// _____________________
//    _ * DOOR01 * 
// ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾

function addDoor01(key) {

    // ADD MESH
    var Door01 = geomDoor01.clone();
    Door01.position.set(pos_grpDoor01.x, pos_grpDoor01.y, pos_grpDoor01.z);
    scene.add( Door01 );
    
    // ADD MESH PROPERTIES
    Door01.name = "Door01"
    Door01.Door01_key = key;

    // UPDATE GLOBAL VARIABLES, HTML
    dictDoor01[key] = Door01;
    Door01.rotation.z = angle_grpDoor01;
    cnt_grpDoor01 += 1; 
    document.getElementById('buttonDoor01').innerHTML = "Door01: " + cnt_grpDoor01;
};

// Delete a Door01
function deleteDoor01(Door01) {
    scene.remove( Door01 );
    delete dictDoor01[ Door01.Door01_key ];
    cnt_grpDoor01 -= 1; 
    document.getElementById('buttonDoor01').innerHTML = "Door01: " + cnt_grpDoor01;
};


//////////////////// -------------PRIMITIVE FUNCTIONS------------------------------------------------------ //////////////////// 

// --------------------------------
//    Key Generation
// --------------------------------
function keyGen(mod_pos) { // mod_pos was generated through Scene Animation Loop 
    var key = mod_pos.x + '_' + mod_pos.y + '_' + mod_pos.z; // create a key that as a string, e.g. 1_-4_0. 
    return key
}

// --------------------------------
//    Values From Dictionary
// --------------------------------
function getValueList(dict, valueIndex) {
    var list_key = Object.keys(dict);
    var list_value = []
    list_key.forEach(function(key){
        list_value.push(dict[key][valueIndex]);
    });
    return list_value
}

// --------------------------------
//    Merge Meshes
// --------------------------------
function mergeMeshes(list_mesh, mat, meshMerged, meshMergedName) { // meshMerge is a previous created variable, e.g. var meshFloorZone (a global variable carrying undefined value)
    var geomMerged = new THREE.Geometry();
    list_mesh.forEach( 
        function(mesh) {
            mesh.updateMatrix(); // as needed
            geomMerged.merge(mesh.geometry, mesh.matrix);
            meshMerged = new THREE.Mesh(geomMerged, mat);
        }
    )
    meshMerged.name = meshMergedName
    meshMerged.visible = false;
    scene.add(meshMerged)
    return meshMerged
}
