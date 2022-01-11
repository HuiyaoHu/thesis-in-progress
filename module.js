///////////////// -------------IMPORT STATEMENTS----------------------------------------------------- /////////////// 
import * as THREE from 'https://unpkg.com/three@0.119.1/build/three.module.js'; 
import { OrbitControls } from 'https://unpkg.com/three@0.119.1/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'https://unpkg.com/three@0.119.1/examples/jsm/loaders/GLTFLoader.js';

//////////////////// -------------MAIN CODES------------------------------------------------------ /////////////////// 

// ====================================================
// Materials
// ====================================================

// https://htmlcolorcodes.com/
// https://www.w3schools.com/colors/colors_names.asp

var floor_mat_trans = new THREE.MeshLambertMaterial({color: 'burlywood', opacity: 0.2, transparent: true});
var floor_mat_trans_del = new THREE.MeshLambertMaterial({color: 'white', opacity: 0.6, transparent: true});

var wall_mat_trans = new THREE.MeshLambertMaterial({color: 'burlywood', opacity: 0.2, transparent: true});
var wall_mat_trans_del = new THREE.MeshLambertMaterial({color: 'white', opacity: 0.6, transparent: true});

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
//    _ * FLOOR *
// ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾

// DIMENSIONS
var floor_width = 3; var floor_width_half = floor_width/2;
var floor_length = 3;
var floor_thickness = 0.45;

// GEOMETRIES
var floor_geom = new THREE.BoxBufferGeometry( floor_width, floor_length, floor_thickness );
var floor_geom_trans = new THREE.BoxBufferGeometry( floor_width * 1, floor_length* 1, floor_thickness * 1 );
var floor_geom_del = new THREE.BoxBufferGeometry( floor_width * 1.1, floor_length* 1.1, floor_thickness * 1.1 );

// INITIALISATION 
var floors = {};
var floor_pos = null;
var del_floor = false;
var floor_counters = [0, 0, 0];

// _____________________
//    _ * WALL *
// ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾

// DIMENSIONS
var wall_width = 3; var wall_width_half = wall_width / 2;
var wall_height = 3; var wall_height_half = wall_height / 2;
var wall_thickness = 0.10;

// GEOMETRIES
var wall_geom = new THREE.BoxBufferGeometry( wall_width, wall_thickness, wall_height );
var wall_geom_trans = new THREE.BoxBufferGeometry( wall_width * 1, wall_thickness* 2, wall_height * 1 );
var wall_geom_del = new THREE.BoxBufferGeometry( wall_width * 1.1, wall_thickness* 3, wall_height * 1.1 );

// INITIALISATION 
var walls = {};
var wall_pos = null;
var del_wall = false;
var wall_counters = 0;
var wall_rotation = 0;

// _____________________
//    _ * WINDOW01 *
// ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾

// DIMENSIONS
var Window01_width = 3; var Window01_width_half = Window01_width / 2;
var Window01_height = 3; var Window01_height_half = Window01_height / 2;
var Window01_thickness = 0.5;

// GEOMETRIES
var Window01_geom = new THREE.BoxBufferGeometry( Window01_width, Window01_thickness, Window01_height );
var Window01_geom_trans = new THREE.BoxBufferGeometry( Window01_width * 1, Window01_thickness* 1, Window01_height * 1 );
var Window01_geom_del = new THREE.BoxBufferGeometry( Window01_width * 1.1, Window01_thickness* 1.1, Window01_height * 1.1 );

var  Window01_geom = null
// Load a glTF resource
loader.load(
    // resource URL
    'models/window01.gltf',
    // called when the resource is loaded
    function ( gltf ) {
        Window01_geom = gltf.scene;
        Window01_geom.getObjectByName("Glass").material = glass;
        Window01_geom.getObjectByName("WindowFrame").material = aluminium;
        Window01_geom.getObjectByName("WindowSeal").material = rubber;
        Window01_geom.getObjectByName("SIP").material = obs;
        // Window01_geom.rotation.x += Math.PI /2;
        // Window01_geom.matrixAutoUpdate  = true;
        // Window01_geom.getObjectByName("Window01R001").children.material = new THREE.MeshLambertMaterial( {color: 'burlywood'});
        // Window01_geom.getObjectByName("mesh_36").material = new THREE.MeshLambertMaterial( {color: 'burlywood'});
        // console.log(Window01_geom.getObjectByName("mesh_36").material)
        // console.log(Window01_geom.getObjectByProperty(uuid,  "E01E399B-7EDF-4712-8FD5-574EEE30DF2B" ) )
        // console.log(Window01_geom.getObjectByName("Window01R001").children.material)
    },
    // called when loading has errors
    function ( error ) {	
        console.log( 'An error happened' );
    }
);
// Window01_geom.getObjectById("LowpolyBlood_Bake_Blood_0.001").material.color.set( _some_color_ )
// var Window01_geom = gltf.scene.children[4];

// INITIALISATION 
var Window01s = {};
var Window01_pos = null;
var del_Window01 = false;
var Window01_counters = 0;
var Window01_rotation = 0;

// _____________________
//    _ * DOOR01 *
// ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾

// DIMENSIONS
var Door01_width = 3; var Door01_width_half = Door01_width / 2;
var Door01_height = 3; var Door01_height_half = Door01_height / 2;
var Door01_thickness = 0.5;

// GEOMETRIES
var Door01_geom = new THREE.BoxBufferGeometry( Door01_width, Door01_thickness, Door01_height );
var Door01_geom_trans = new THREE.BoxBufferGeometry( Door01_width * 1, Door01_thickness* 1, Door01_height * 1 );
var Door01_geom_del = new THREE.BoxBufferGeometry( Door01_width * 1.1, Door01_thickness* 1.1, Door01_height * 1.1 );

var  Door01_geom = null
// Load a glTF resource
loader.load(
    // resource URL
    'models/Door01.gltf',
    // called when the resource is loaded
    function ( gltf ) {
        Door01_geom = gltf.scene;
        Door01_geom.getObjectByName("Door").material = plywood;
        Door01_geom.getObjectByName("DoorFrame").material = aluminium;
        Door01_geom.getObjectByName("DoorHandle1").material = brass;
        Door01_geom.getObjectByName("DoorHandle2").material = brass;
        Door01_geom.getObjectByName("SIP").material = obs;
    },
    // called when loading has errors
    function ( error ) {	
        console.log( 'An error happened' );
    }
);

// INITIALISATION
var Door01s = {};
var Door01_pos = null;
var del_Door01 = false;
var Door01_counters = 0;
var Door01_rotation = 0;


// ====================================================
// Buttons ★
// ====================================================
// ''''''  ids, index

// IDS
var button_ids = ['button0', 'button1', 'button2', 'button3'];

// INDEX
var button_index = 0;


// ====================================================
// Miscellaneous ★
// ====================================================
// ''''''  camera, ground, mouse, global variables

// CAMERA 
var camera_zoom = 60
var camera_shift_x = 2
var camera_shift_y = -1

// GROUND
var num_cells = 6;
var ground_size = num_cells * wall_width;

// MOUSE
var mouse = new THREE.Vector2();
var mouse_down = new THREE.Vector2();	 

// GLOBAL VARIABLES
    // globally accessible variables that are defined in funciton
var camera, scene, renderer, ground, raycaster, 
    hemi_light, dir_light1, dir_light2, 
    hemi_light_helper, dir_light1_helper, dir_light2_helper, dir_light1ShadowHeper,  
    
    wall_trans, wall_trans_del, 
    floor_trans, floor_trans_del, 
    Window01_trans, Window01_trans_del, 
    Door01_trans, Door01_trans_del;

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

    // camera = new THREE.PerspectiveCamera( 20, window.innerWidth / window.innerHeight, -150, 150 ); //FOV, aspect ratio, near, far of clipping plane
        camera = new THREE.OrthographicCamera( -window.innerWidth/camera_zoom+camera_shift_x, window.innerWidth/camera_zoom+camera_shift_x,  window.innerHeight/camera_zoom+camera_shift_y,  -window.innerHeight/camera_zoom+camera_shift_y, -10000, 10000 ) //( left, right, top, bottom, near, far )
    camera.position.set( 0, 0, 500 );
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
    scene.add( ground );


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
    //    _ * FLOOR *
    // ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
    document.getElementById("button0").addEventListener("click", onClickbutton0);

    floor_trans = new THREE.Mesh( floor_geom_trans, floor_mat_trans );
    scene.add(floor_trans);
    floor_trans_del = new THREE.Mesh( floor_geom_del, floor_mat_trans_del );
    scene.add(floor_trans_del);

    // _____________________
    //    _ * WALL *
    // ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
    document.getElementById("button1").addEventListener("click", onClickbutton1);

    wall_trans = new THREE.Mesh( wall_geom_trans, wall_mat_trans );
        // wall_trans.castShadow = false;
        // wall_trans.receiveShadow = false;
    wall_trans.visible = false;
    scene.add(wall_trans);
    wall_trans_del = new THREE.Mesh( wall_geom_del, wall_mat_trans_del );
        // wall_trans_del.castShadow = false;
        // wall_trans_del.receiveShadow = false;
    wall_trans_del.visible = false;
    scene.add(wall_trans_del);

    // _____________________
    //    _ * WINDOW01 *
    // ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
    document.getElementById("button2").addEventListener("click", onClickbutton2);

    Window01_trans = new THREE.Mesh( Window01_geom_trans, wall_mat_trans );
    Window01_trans.visible = false;
    scene.add(Window01_trans);
    Window01_trans_del = new THREE.Mesh( Window01_geom_del, wall_mat_trans_del );
    Window01_trans_del.visible = false;
    scene.add(Window01_trans_del);

    // _____________________
    //    _ * DOOR01 *
    // ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
    document.getElementById("button3").addEventListener("click", onClickbutton3);

    Door01_trans = new THREE.Mesh( Door01_geom_trans, wall_mat_trans );
    Door01_trans.visible = false;
    scene.add(Door01_trans);
    Door01_trans_del = new THREE.Mesh( Door01_geom_del, wall_mat_trans_del );
    Door01_trans_del.visible = false;
    scene.add(Door01_trans_del);





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
    //    _ * FLOOR *
    // ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
    if (button_index == 0){
        raycaster.setFromCamera( mouse, camera ); // create a ray from the camera and intersect it with objects in the scene
        var isect_objs = Object.values(floors); // get the objects in the scene to check for intersections
        isect_objs.push(ground);
        var intersects = raycaster.intersectObjects( isect_objs ); // returns an array related to the intersection, e.g. 0: {distance, face, faceIdex, object, point, uv, etc}, 1: {etc}
        var isect0 = intersects[ 0 ]; // get the first object that the ray intersects

        if ( intersects.length > 0 ) { // if intersect with an object

            if (isect0.object.name == 'floor') { //if the first object that the ray intersects has the name " "
                var floor_cen = isect0.object.position; // centre of the first object that the ray intersects, e.g. Vector3 {x: -1.5, y: 3, z: 0.25}
                floor_pos = new THREE.Vector3(floor_cen.x, floor_cen.y, floor_cen.z); // update global variable _pos, e.g. Vector3 {x: -1.5, y: 3, z: 0.25}
                
                if (!del_floor) { // if shift button is not pressed, update trans pos and show geom_trans 
                    if (isect0.faceIndex == 0 || isect0.faceIndex == 1) { // right top || right bottom
                        floor_pos.x += floor_width;
                    } else if (isect0.faceIndex == 2 || isect0.faceIndex == 3) { // left top || bottom
                        floor_pos.x -= floor_width;
                    }  else if (isect0.faceIndex == 4 || isect0.faceIndex == 5) { // back right || left
                        floor_pos.y += floor_width;
                    }  else if (isect0.faceIndex == 6 || isect0.faceIndex == 7) { // front left || right
                        floor_pos.y -= floor_width;
                    }  else if (isect0.faceIndex == 8 || isect0.faceIndex == 9) { // top left || right
                        floor_pos.z += wall_height;
                    }  else if (isect0.faceIndex == 10 || isect0.faceIndex == 11) { // bottom left || right
                        floor_pos.z -= wall_height;
                    }
                    floor_trans.position.set(floor_pos.x, floor_pos.y, floor_pos.z);
                    floor_trans_del.visible = false;
                    floor_trans.visible = true;
                }

                else { // if shift button is pressed, show geom_trans_del
                    floor_trans_del.position.set(floor_pos.x, floor_pos.y, floor_pos.z);
                    floor_trans_del.visible = true;
                    floor_trans.visible = false;
                } 

            } else { // if the first object that the ray intersects does not has the name "floor", i.e. intersect with ground
                
                if (!del_floor) { // if shift button is not pressed, update pos and show geom_trans 
                    floor_pos = new THREE.Vector3();
                    if (num_cells % 2 == 1) {// odd number of cells
                        floor_pos.x = Math.round(isect0.point.x / floor_width) * floor_width;
                        floor_pos.y = Math.round(isect0.point.y / floor_width) * floor_width - floor_width_half;
                    } else { // even number of cells
                        floor_pos.x = Math.round((floor_width_half + isect0.point.x) / floor_width) * floor_width - floor_width_half;
                        floor_pos.y = Math.round(isect0.point.y / floor_width) * floor_width ;
                    }
                    floor_pos.z = floor_thickness/2 ; // move floor up to align it with grid
                    floor_trans.position.set(floor_pos.x, floor_pos.y, floor_pos.z);
                    floor_trans_del.visible = false;
                    floor_trans.visible = true;
                }
            }    

        } else { // if shift button is pressed, show nothing 
            floor_trans.visible = false;
            floor_trans_del.visible = false;
            floor_pos = null;
        }
   }

    // _____________________
    //    _ * WALL * ★
    // ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
    if (button_index == 1){
        raycaster.setFromCamera( mouse, camera );
        var isect_objs = Object.values(walls); // get the objects in the scene to check for intersections
        isect_objs = isect_objs.concat(Object.values(Window01s));
        isect_objs = isect_objs.concat(Object.values(Door01s));
        isect_objs.push(ground);
        var intersects = raycaster.intersectObjects( isect_objs );
        var isect0 = intersects[ 0 ];
        
        if ( intersects.length > 0 ) { // if intersect with an object

            if (isect0.object.name == 'wall') { // if the first object that the ray intersects has the name ' '
                var wall_cen = isect0.object.position; // centre of the first object that the ray intersects, e.g. Vector3 {x: -1.5, y: 3, z: 0.25}
                wall_pos = new THREE.Vector3(wall_cen.x, wall_cen.y, wall_cen.z); // update global variable _pos, e.g. Vector3 {x: -1.5, y: 3, z: 0.25}
                wall_rotation = isect0.object.rotation.z;

                if (!del_wall) { // if shift button is not pressed, update trans pos and show geom_trans 
                    if (isect0.faceIndex == 0 || isect0.faceIndex == 1) { // right top || right bottom
                        if (wall_rotation !== 0) {
                            wall_pos.y += wall_width;
                        } else {
                            wall_pos.x += wall_width;
                        }
                    } else if (isect0.faceIndex == 3 || isect0.faceIndex == 2) { // left top || left bottom
                        if (wall_rotation !== 0) {
                            wall_pos.y -= wall_width;
                        } else {
                            wall_pos.x -= wall_width;
                        }
                    } else if (isect0.faceIndex == 6) { // front left
                        if (wall_rotation !== 0) {
                            wall_rotation = 0;
                            wall_pos.x += wall_width_half;
                            wall_pos.y -= wall_width_half;
                        } else {
                            wall_rotation = Math.PI / 2;
                            wall_pos.x -= wall_width_half;
                            wall_pos.y -= wall_width_half;
                        }
                    } else if (isect0.faceIndex == 7) { // front right
                        if (wall_rotation !== 0) {
                            wall_rotation = 0;
                            wall_pos.x += wall_width_half;
                            wall_pos.y += wall_width_half;
                        } else {
                            wall_rotation = Math.PI / 2;
                            wall_pos.x += wall_width_half;
                            wall_pos.y -= wall_width_half;
                        }
                    } else if (isect0.faceIndex == 5) { // back left
                        if (wall_rotation !== 0) {
                            wall_rotation = 0;
                            wall_pos.x -= wall_width_half;
                            wall_pos.y += wall_width_half;
                        } else {
                            wall_rotation = Math.PI / 2;
                            wall_pos.x += wall_width_half;
                            wall_pos.y += wall_width_half;
                        }
                    } else if (isect0.faceIndex == 4) { // back right
                        if (wall_rotation !== 0) {
                            wall_rotation = 0;
                            wall_pos.x -= wall_width_half;
                            wall_pos.y -= wall_width_half;
                        } else {
                            wall_rotation = Math.PI / 2;
                            wall_pos.x -= wall_width_half;
                            wall_pos.y += wall_width_half;
                        }
                    } else if (isect0.faceIndex == 8 || isect0.faceIndex == 9) { // top left || right
                        wall_pos.z += wall_height; 
                    } else if (isect0.faceIndex == 11 || isect0.faceIndex == 12) { // bottom left || right
                        wall_pos.z -= wall_height; 
                    }
                    wall_trans.position.set(wall_pos.x, wall_pos.y, wall_pos.z);
                    wall_trans.rotation.z = wall_rotation;
                    wall_trans_del.visible = false;
                    wall_trans.visible = true;
                }

                else { // if shift button is pressed, show geom_trans_del
                    wall_trans_del.position.set(wall_pos.x, wall_pos.y, wall_pos.z);
                    wall_trans_del.rotation.z = wall_rotation;
                    wall_trans_del.visible = true;
                    wall_trans.visible = false;
                } 
            } 
            
            else if (isect0.object && isect0.object.parent && isect0.object.parent.parent && isect0.object.parent.parent.name == 'Window01') { // if the first object that the ray intersects has the name ' '
                if (!del_wall) { // if shift button is not pressed, update global variable of geom & geom_trans
                    var wall_cen = isect0.object.position;
                    wall_pos = new THREE.Vector3(wall_cen.x, wall_cen.y, wall_cen.z);
                    wall_rotation = isect0.object.rotation.z;
    
                    wall_trans.position.copy(wall_pos);
                    wall_trans.rotation.z = wall_rotation
                    wall_trans_del.visible = false;
                    wall_trans.visible = true;
                }
            }	

            else if (isect0.object && isect0.object.parent && isect0.object.parent.parent && isect0.object.parent.parent.name == 'Door01') { // if the first object that the ray intersects has the name ' '
                if (!del_wall) { // if shift button is not pressed, update global variable of geom & geom_trans
                    var wall_cen = isect0.object.position;
                    wall_pos = new THREE.Vector3(wall_cen.x, wall_cen.y, wall_cen.z);
                    wall_rotation = isect0.object.rotation.z;
    
                    wall_trans.position.copy(wall_pos);
                    wall_trans.rotation.z = wall_rotation
                    wall_trans_del.visible = false;
                    wall_trans.visible = true;
                }
            }				
    
            else { // if the first object that the ray intersects does not have name, i.e. intersect with ground
                if (!del_wall) { // if shift button is not pressed, update pos and show geom_trans
                    wall_pos = new THREE.Vector3();
                    wall_rotation = 0
                    if (num_cells % 2 == 1) { //odd number of cells
                        var ptX = new THREE.Vector3( // wall_pos if wall is horizontal
                            Math.round(isect0.point.x / wall_width) * wall_width,
                            Math.round(isect0.point.y / wall_width) * wall_width,
                            0);
                        var ptY = new THREE.Vector3( // wall_pos if wall is vertical
                            Math.round((wall_width_half + isect0.point.x) / wall_width) * wall_width - wall_width_half,
                            Math.round((wall_width_half + isect0.point.y) / wall_width) * wall_width - wall_width_half,
                            0);
                    } else { // even number of cells
                        var ptX = new THREE.Vector3( // wall_pos if wall is horizontal
                            Math.round((wall_width_half + isect0.point.x) / wall_width) * wall_width - wall_width_half,
                            Math.round((wall_width_half + isect0.point.y) / wall_width) * wall_width - wall_width_half,
                            0);
                        var ptY = new THREE.Vector3( // wall_pos if wall is vertical
                            Math.round(isect0.point.x / wall_width) * wall_width,
                            Math.round(isect0.point.y / wall_width) * wall_width,
                            0);
                    }
                    var distX = ptX.distanceTo(isect0.point); // distance from horizontal wall pos to mouse pointer
                    var distY = ptY.distanceTo(isect0.point); // distance from vertical wall pos to mouse pointer
                    if (distX <= distY) {
                        wall_pos.copy(ptX)
                    } else {
                        wall_pos.copy(ptY)
                        wall_rotation = Math.PI / 2
                    }
                    // console.log('___', isect0.point, ptX, ptY, distX, distY, wall_pos)
                    wall_pos.z = wall_height_half;
                    wall_trans.position.set(wall_pos.x, wall_pos.y, wall_pos.z);
                    wall_trans.rotation.z = wall_rotation
                    wall_trans_del.visible = false;
                    wall_trans.visible = true;
                }
            }

        } else { // if do not intersect with anything, show nothing
            wall_trans.visible = false;
            wall_trans_del.visible = false;
            wall_pos = null;
        }
    }	

    // _____________________
    //    _ * WINDOW01 * ★
    // ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
    if (button_index == 2){
        raycaster.setFromCamera( mouse, camera );
        var isect_objs = Object.values(Window01s); // get the objects in the scene to check for intersections
        isect_objs = isect_objs.concat(Object.values(walls));
        isect_objs = isect_objs.concat(Object.values(Door01s));
        isect_objs.push(ground);
        var intersects = raycaster.intersectObjects( isect_objs );
        var isect0 = intersects[ 0 ];
        // console.log('~~~window~~~isect0~~~', isect0.object) 
        // console.log('~~~window~~~isect0.object.name~~~', isect0.object.name) 
        // console.log('~~~window~~~isect0.object.parent.name~~~', isect0.object.parent.name) 
        // console.log('~~~window~~~isect0.object.parent.parent.name~~~', isect0.object.parent.parent.name) 

        if ( intersects.length > 0 ) { // if intersect with an object

            if (isect0.object && isect0.object.parent && isect0.object.parent.parent && isect0.object.parent.parent.name == 'Window01') { // if the first object that the ray intersects has the name ' '
                var isectObj = isect0.object.parent.parent // centre of the first object that the ray intersects, e.g. Vector3 {x: -1.5, y: 3, z: 0.25}
                var Window01_cen = isectObj.position; // update global variable _pos, e.g. Vector3 {x: -1.5, y: 3, z: 0.25}
                Window01_pos = new THREE.Vector3(Window01_cen.x, Window01_cen.y, Window01_cen.z);
                Window01_rotation = isectObj.rotation.z;

                if (!del_Window01) { 
                    // if shift button is not pressed, do nothing
                }
                else { // if shift button is pressed, show geom_trans_del
                    Window01_trans_del.position.set(Window01_pos.x, Window01_pos.y, Window01_pos.z);
                    Window01_trans_del.rotation.z = Window01_rotation;
                    Window01_trans_del.visible = true;
                    Window01_trans.visible = false;
                }
            } 
            
            else if (isect0.object.name == 'wall') { // if the first object that the ray intersects has the name ' '
                if (!del_Window01) { // if shift button is not pressed, update global variable of geom & geom_trans
                    var Window01_cen = isect0.object.position;
                    Window01_pos = new THREE.Vector3(Window01_cen.x, Window01_cen.y, Window01_cen.z);
                    Window01_rotation = isect0.object.rotation.z;

                    Window01_trans.position.copy(Window01_pos);
                    Window01_trans.rotation.z = Window01_rotation
                    Window01_trans.visible = true;
                    Window01_trans_del.visible = false;
                }
            }

            else if (isect0.object && isect0.object.parent && isect0.object.parent.parent && isect0.object.parent.parent.name == 'Door01') { 
                if (!del_Window01) { // if shift button is not pressed, update global variable of geom & geom_trans
                    var isectObj = isect0.object.parent.parent // centre of the first object that the ray intersects, e.g. Vector3 {x: -1.5, y: 3, z: 0.25}
                    var Window01_cen = isectObj.position; // update global variable _pos, e.g. Vector3 {x: -1.5, y: 3, z: 0.25}
                    Window01_pos = new THREE.Vector3(Window01_cen.x, Window01_cen.y, Window01_cen.z);
                    Window01_rotation = isectObj.rotation.z;

                    Window01_trans.position.copy(Window01_pos);
                    Window01_trans.rotation.z = Window01_rotation
                    Window01_trans.visible = true;
                    Window01_trans_del.visible = false;
                }
            }	

        } else { // if do not intersect with anything, show nothing
            Window01_trans.visible = false;
            Window01_trans_del.visible = false;
            Window01_pos = null;
        }
    }	

    // _____________________
    //    _ * DOOR01 * ★
    // ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
    if (button_index == 3){
        raycaster.setFromCamera( mouse, camera );
        var isect_objs = Object.values(Door01s); 
        isect_objs = isect_objs.concat(Object.values(walls));
        isect_objs = isect_objs.concat(Object.values(Window01s));
        isect_objs.push(ground);
        var intersects = raycaster.intersectObjects( isect_objs );
        var isect0 = intersects[ 0 ];
        
        if ( intersects.length > 0 ) {  // if intersect with an object

            if (isect0.object && isect0.object.parent && isect0.object.parent.parent && isect0.object.parent.parent.name == 'Door01') { // if the first object that the ray intersects has the name ' '
                var isectObj = isect0.object.parent.parent // centre of the first object that the ray intersects, e.g. Vector3 {x: -1.5, y: 3, z: 0.25}
                var Door01_cen = isectObj.position; // update global variable _pos, e.g. Vector3 {x: -1.5, y: 3, z: 0.25}
                Door01_pos = new THREE.Vector3(Door01_cen.x, Door01_cen.y, Door01_cen.z);
                Door01_rotation = isectObj.rotation.z;

                if (!del_Door01) {
                    // if shift button is not pressed, do nothing
                } 
                else { // if shift button is pressed, show geom_trans_del
                    Door01_trans_del.position.set(Door01_pos.x, Door01_pos.y, Door01_pos.z); // show del geom
                    Door01_trans_del.rotation.z = Door01_rotation;
                    Door01_trans_del.visible = true;
                    Door01_trans.visible = false;
                }
            } 
            
            else if (isect0.object.name == 'wall' ) { // if the first object that the ray intersects has the name ' '
                if (!del_Door01) { // if shift button is not pressed, update global variable of geom & geom_trans
                    var Door01_cen = isect0.object.position;
                    Door01_pos = new THREE.Vector3(Door01_cen.x, Door01_cen.y, Door01_cen.z);
                    Door01_rotation = isect0.object.rotation.z;

                    Door01_trans.position.copy(Door01_pos);
                    Door01_trans.rotation.z = Door01_rotation
                    Door01_trans.visible = true;
                    Door01_trans_del.visible = false;
                }
            }

            else if (isect0.object && isect0.object.parent && isect0.object.parent.parent && isect0.object.parent.parent.name == 'Window01') { 
                if (!del_Door01) { // if shift button is not pressed, update global variable of geom & geom_trans
                    var isectObj = isect0.object.parent.parent // centre of the first object that the ray intersects, e.g. Vector3 {x: -1.5, y: 3, z: 0.25}
                    var Door01_cen = isectObj.position; // update global variable _pos, e.g. Vector3 {x: -1.5, y: 3, z: 0.25}
                    Door01_pos = new THREE.Vector3(Door01_cen.x, Door01_cen.y, Door01_cen.z);
                    Door01_rotation = isectObj.rotation.z;

                    Door01_trans.position.copy(Door01_pos);
                    Door01_trans.rotation.z = Door01_rotation
                    Door01_trans.visible = true;
                    Door01_trans_del.visible = false;
                }    
            }

        } else { // if do not intersect with anything, show nothing
            Door01_trans.visible = false;
            Door01_trans_del.visible = false;
            Door01_pos = null;
        }
    }	








   renderer.render( scene, camera ); // render the scene

}


//////////////////// -------------HELPER FUNCTIONS------------------------------------------------------ //////////////////// 


// ====================================================
// { Window, Mouse} 
// ====================================================

// --------------------------------
//    Window Resize
// --------------------------------

function onWindowResize() { // Resize browser window
    // camera.aspect = window.innerWidth / window.innerHeight;
        camera.left = -window.innerWidth/camera_zoom+camera_shift_x;
        camera.right = window.innerWidth/camera_zoom+camera_shift_x;
        camera.top =  window.innerHeight/camera_zoom+camera_shift_y;
        camera.bottom =  -window.innerHeight/camera_zoom+camera_shift_y;
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
    //    _ * FLOOR *
    // ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
    else if (floor_pos != null) { //If not dragging and raycaster.intersectObjects.object.values(floors).position != null, e.g. Vector3 {x: 1.5, y: 3, z: 0}
        var key = floor_pos.x + '_' + floor_pos.y + '_' + floor_pos.z; // create a key that as a string, e.g. 1_-4_0
        if (del_floor && key in floors) { // if shift is pressed and existing key is True, delete floor
            deleteFloor(floors[key]); 
        } else if (!del_floor && floors[key]==undefined) { //if shift is not pressed and there is no exisitng key, add a new floor to the scene and add its key to floors {}
            addFloor(key); 
        }
    }

    // _____________________
    //    _ * WALL * ★
    // ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
    else if (wall_pos != null) {
        var key = wall_pos.x + '_' + wall_pos.y + '_' + wall_pos.z;
        if (del_wall && key in walls) {
            deleteWall(walls[key]); 
        } else if (!del_wall && walls[key]==undefined) {
            addWall(key);
            if (key in Window01s) {
                deleteWindow01(Window01s[key]);
            } else if (key in Door01s) {
                deleteDoor01(Door01s[key]);
            }
        }
    }

    // _____________________
    //    _ * WINDOW01 * ★
    // ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
    else if (Window01_pos != null) {
        var key = Window01_pos.x + '_' + Window01_pos.y + '_' + Window01_pos.z;
        if (del_Window01 && key in Window01s) {
            deleteWindow01(Window01s[key]);  
        } else if (!del_Window01 && Window01s[key]==undefined) {
            addWindow01(key);
            if (key in walls) {
                deleteWall(walls[key]);
            } else if (key in Door01s) {
                deleteDoor01(Door01s[key]);
            }
        }
    }

    // _____________________
    //    _ * DOOR01 * ★
    // ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
    else if (Door01_pos != null) {
        var key = Door01_pos.x + '_' + Door01_pos.y + '_' + Door01_pos.z;
        if (del_Door01 && key in Door01s) {
            deleteDoor01(Door01s[key]);  
        } else if (!del_Door01 && Door01s[key]==undefined) {
            addDoor01(key);
            if (key in walls) {
                deleteWall(walls[key]);
            } else if (key in Window01s) {
                deleteWindow01(Window01s[key]);
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
    //    _ * FLOOR *
    // ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
    if (event.shiftKey) { // if shift is pressed, del_mesh and hide mesh_trans
        del_floor = true;
    } else { // if shift is not pressed, del_mesh is false and hide mesh_trans
        del_floor = false;
    }

    // _____________________
    //    _ * WALL * 
    // ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
    if (event.shiftKey) {
        del_wall = true;
    } else {
        del_wall = false;
    }

    // _____________________
    //    _ * WINDOW01 * 
    // ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
    if (event.shiftKey) {
        del_Window01 = true;
    } else {
        del_Window01 = false;
    }

    // _____________________
    //    _ * DOOR01 * 
    // ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
    if (event.shiftKey) {
        del_Door01 = true;
    } else {
        del_Door01 = false;
    }




}

// ====================================================
// { Button & Scene } ★
// ====================================================
// ''''''  clickbutton, add, delete


// _____________________
//    _ * FLOOR *
// ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾

function onClickbutton0() {
    document.getElementById(button_ids[button_index]).classList.remove("pressed");
    button_index = 0;
    document.getElementById(button_ids[button_index]).classList.add("pressed");
};

function addFloor(key) {

    // Add Mesh
    var floor = new THREE.Mesh(floor_geom, particleboard);
    floor.position.set(floor_pos.x, floor_pos.y, floor_pos.z);
        // floor.castShadow = true;
        // floor.receiveShadow = true;
    scene.add( floor );

    // Add Mesh Properties
    floor.name = "floor"
    floor.button_index = button_index;
    floor.floor_key = key;

    // Update Global Variables, HTML
    floors[key] = floor;
    floor_counters[button_index] += 1; // update the counter on the web page
    document.getElementById(button_ids[button_index]).innerHTML = "Floor: " + floor_counters[button_index];
    // console.log('~~~floor~~~', floor) 
};

function deleteFloor(floor) {
    scene.remove( floor );
    delete floors[ floor.floor_key ];
    floor_counters[floor.button_index] -= 1; 
    document.getElementById(button_ids[floor.button_index]).innerHTML = "Floor:" + floor_counters[floor.button_index];
};


// _____________________
//    _ * WALL * 
// ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾

function onClickbutton1() {
    document.getElementById(button_ids[button_index]).classList.remove("pressed");
    button_index = 1;
    document.getElementById(button_ids[button_index]).classList.add("pressed");
};

function addWall(key) {

    // Add Mesh
    var wall = new THREE.Mesh( wall_geom, obs );
    wall.position.set(wall_pos.x, wall_pos.y, wall_pos.z);
    scene.add( wall );

    // Add Mesh Properties
    wall.name = "wall"
    wall.button_index = 1;
    wall.wall_key = key;

    // Update Global Variables, HTML
    walls[key] = wall;
    wall.rotation.z = wall_rotation;
    wall_counters += 1; 
    document.getElementById(button_ids[wall.button_index]).innerHTML = "Wall: " + wall_counters;
    
    // // get wall corner points
    // const corner_ver_shift_value = new THREE.Vector3(0, 0, wall_height_half);
    // var corner_hor_shift_value = 0;
    // if (wall_rotation == 0) {
    // 	var corner_shift_value = new THREE.Vector3(wall_width_half, 0, 0);
    // } else {
    // 	var corner_shift_value = new THREE.Vector3(0, wall_width_half*(-1), 0);
    // }
    // var wall_left_corner = wall.position.clone().sub(corner_shift_value).sub(corner_ver_shift_value) ;
    // var wall_right_corner = wall.position.clone().add(corner_shift_value).sub(corner_ver_shift_value);
    // wall_pos_list.push(wall_left_corner, wall_right_corner);

    // // Visualise Points
    // var geom = new THREE.BufferGeometry().setFromPoints([wall_left_corner, wall_right_corner]);
    // var matPoints = new THREE.PointsMaterial({size: 10, color: "pink"});
    // var points = new THREE.Points(geom, matPoints);
    // scene.add(points);

    // console.log('____', wall_pos_list)
};

// Delete a wall
function deleteWall(wall) {
    scene.remove( wall );
    delete walls[ wall.wall_key ];
    wall_counters -= 1; 
    document.getElementById(button_ids[wall.button_index]).innerHTML = "Wall: " + wall_counters;
};

// _____________________
//    _ * WINDOW01 * 
// ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾

function onClickbutton2() {
    document.getElementById(button_ids[button_index]).classList.remove("pressed");
    button_index = 2;
    document.getElementById(button_ids[button_index]).classList.add("pressed");
};


function addWindow01(key) {

    // Add Mesh
    var Window01 = Window01_geom.clone();
    Window01.position.set(Window01_pos.x, Window01_pos.y, Window01_pos.z);
    scene.add( Window01 );

    // Add Mesh Properties
    Window01.name = "Window01"
    Window01.button_index = 2;
    Window01.Window01_key = key;

    // Update Global Variables, HTML
    Window01s[key] = Window01;
    Window01.rotation.z = Window01_rotation;
    Window01_counters += 1; 
    document.getElementById(button_ids[Window01.button_index]).innerHTML = "Window01: " + Window01_counters;
};

// Delete a Window01
function deleteWindow01(Window01) {
    scene.remove( Window01 );
    delete Window01s[ Window01.Window01_key ];
    Window01_counters -= 1; 
    document.getElementById(button_ids[Window01.button_index]).innerHTML = "Window01: " + Window01_counters;
};


// _____________________
//    _ * DOOR01 * 
// ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾

function onClickbutton3() {
    document.getElementById(button_ids[button_index]).classList.remove("pressed");
    button_index = 3;
    document.getElementById(button_ids[button_index]).classList.add("pressed");
};

function addDoor01(key) {

    // Add Mesh
    var Door01 = Door01_geom.clone();
    Door01.position.set(Door01_pos.x, Door01_pos.y, Door01_pos.z);
    scene.add( Door01 );
    
    // Add Mesh Properties
    Door01.name = "Door01"
    Door01.button_index = 3;
    Door01.Door01_key = key;

    // Update Global Variables, HTML
    Door01s[key] = Door01;
    Door01.rotation.z = Door01_rotation;
    Door01_counters += 1; 
    document.getElementById(button_ids[Door01.button_index]).innerHTML = "Door01: " + Door01_counters;
};

// Delete a Door01
function deleteDoor01(Door01) {
    scene.remove( Door01 );
    delete Door01s[ Door01.Door01_key ];
    Door01_counters -= 1; 
    document.getElementById(button_ids[Door01.button_index]).innerHTML = "Door01: " + Door01_counters;
};



