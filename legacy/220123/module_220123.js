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

var matVolume = new THREE.MeshLambertMaterial({color: 'blue', opacity: 0.2, transparent: true});
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
// Geometries & Initialisation ???
// ====================================================
// '''''' dimensions, geometries, initialisation
var loader = new GLTFLoader();

// _____________________
//    _ * VOLUME *
// ???????????????????????????????????????????????????????????????

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
var volumes = {};
var volume_pos = null;
var del_volume = false;
var volume_counters = 0;

// _____________________
//    _ * FLOOR *
// ???????????????????????????????????????????????????????????????

// DIMENSIONS
var floor_width = 3; var floor_width_half = floor_width/2;
var floor_length = 3;
var floor_thickness = 0.45;

// GEOMETRIES
var geomFloor = new THREE.BoxBufferGeometry( floor_width, floor_length, floor_thickness );
var geomFloorHover = new THREE.BoxBufferGeometry( floor_width * 1, floor_length* 1, floor_thickness * 1 );
var geomFloorDel = new THREE.BoxBufferGeometry( floor_width * 1.1, floor_length* 1.1, floor_thickness * 1.1 );

// INITIALISATION 
var floors = {};
var floor_pos = null;
var del_floor = false;
var floor_counters = 0;

// _____________________
//    _ * WALL *
// ???????????????????????????????????????????????????????????????

// DIMENSIONS
var wall_width = 3; var wall_width_half = wall_width / 2;
var wall_height = 3; var wall_height_half = wall_height / 2;
var wall_thickness = 0.10;

// GEOMETRIES
var geomWall = new THREE.BoxBufferGeometry( wall_width, wall_thickness, wall_height );
var geomWallHover = new THREE.BoxBufferGeometry( wall_width * 1, wall_thickness* 2, wall_height * 1 );
var geomWallDel = new THREE.BoxBufferGeometry( wall_width * 1.1, wall_thickness* 3, wall_height * 1.1 );

// INITIALISATION 
var walls = {};
var wall_pos = null;
var del_wall = false;
var wall_counters = 0;
var wall_rotation = 0;

// _____________________
//    _ * WINDOW01 *
// ???????????????????????????????????????????????????????????????

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
var Window01s = {};
var Window01_pos = null;
var del_Window01 = false;
var Window01_counters = 0;
var Window01_rotation = 0;

// _____________________
//    _ * DOOR01 *
// ???????????????????????????????????????????????????????????????

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
var Door01s = {};
var Door01_pos = null;
var del_Door01 = false;
var Door01_counters = 0;
var Door01_rotation = 0;


// ====================================================
// Buttons ???
// ====================================================
// ''''''  ids

// IDS
var button_ids = ['buttonVolume', 'buttonFloor', 'buttonWall', 'buttonWindow01', 'buttonDoor01'];
var button_id = 'buttonVolume';



// ====================================================
// Miscellaneous ???
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

// VOLUME
var dictVolume = {}; // each key carries 2 value items: point coordinates and point meshes. i.e. (2) [Vector3, Points]
console.log('~~~coordinatesList~~~', dictVolume);

// GLOBAL VARIABLES
    // globally accessible variables that are defined in funciton
var camera, scene, renderer, ground, raycaster, 
    hemi_light, dir_light1, dir_light2, 
    hemi_light_helper, dir_light1_helper, dir_light2_helper, dir_light1ShadowHeper,  
    
    volume_trans, volume_trans_del, meshFloorZone, 
    floor_trans, floor_trans_del, 
    wall_trans, wall_trans_del, 
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
    
    // _____________________
    //    _ * VOLUME UNIT *
    // ???????????????????????????????????????????????????????????????


    // EVEN GRID
    /*var coordinatesList = [
        new THREE.Vector3(-volUnit_width, 0-volUnit_width_half, 0), // ubottom left, only y direction need to adjust for even
        new THREE.Vector3(volUnit_width, 0-volUnit_width_half, 0), // bottom right
        new THREE.Vector3(volUnit_width, volUnit_length+volUnit_width_half, 0), //top right
        new THREE.Vector3(-volUnit_width, volUnit_length+volUnit_width_half, 0), // top left
      ];

    // Visualise Points
    var geomPoints = new THREE.BufferGeometry().setFromPoints(coordinatesList);
    var matPoints = new THREE.PointsMaterial({size: 1, color: "pink"});
    var points = new THREE.Points(geom, matPoints);
    scene.add(points);
      
      
      // shape
      var shape = new THREE.Shape(coordinatesList);

    //   var geomShape = new THREE.ShapeBufferGeometry(new THREE.Shape(coordinatesList));
    //   var matShape = new THREE.MeshBasicMaterial({color:"blue"});

      const extrudeSettings = {
        // steps: 2,
        depth: 0,
        bevelEnabled: false,
        // bevelThickness: 0,
        // bevelSize: 0,
        // bevelOffset: 0,
        // bevelSegments: 1
    };
    
    const geometry = new THREE.ExtrudeBufferGeometry( shape, extrudeSettings );
    var volUnit_mat_trans = new THREE.MeshLambertMaterial({color: 'burlywood', opacity: 0.1, transparent: true});
    ground = new THREE.Mesh( geometry, volUnit_mat_trans ) ;
    scene.add( ground );
    */

    var coordinatesList1 = [
        new THREE.Vector3(-4, -2, 0), // ubottom left, only y direction need to adjust for even
        new THREE.Vector3(4, -2, 0), // bottom right
        new THREE.Vector3(4, 8, 0), //top right
        new THREE.Vector3(-4, 8, 0), // top left
    ];


    var volUnit_mat_trans = new THREE.MeshLambertMaterial({color: 'burlywood'});

    // shape
    var shape1 = new THREE.ShapeBufferGeometry(new THREE.Shape(coordinatesList1));

    var coordinatesList2 = [
        new THREE.Vector3(-4, 8, 0), // top left, only y direction need to adjust for even
        new THREE.Vector3(4, 8, 0), // top right
        new THREE.Vector3(4, -10, 0), // b right
        new THREE.Vector3(-4, -10, 0), // b left
    ];
    
    var shape2 = new THREE.ShapeBufferGeometry(new THREE.Shape(coordinatesList2));
    shape1=BufferGeometryUtils.mergeBufferGeometries([shape1, shape2])
    // ground = new THREE.Mesh( shape1, volUnit_mat_trans );

    // scene.add( ground );

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
    //    Button Click, Hover Mesh ???
    // --------------------------------

    // _____________________
    //    _ * VOLUME *
    // ???????????????????????????????????????????????????????????????
    document.getElementById("buttonVolume").addEventListener("click", onClickbuttonVolume );
     
    volume_trans = new THREE.Mesh( geomVolumeHover, matVolumeTrans );
    volume_trans.visible = false;
    scene.add(volume_trans);
    volume_trans_del = new THREE.Mesh( geomVolumeDel, matVolumeDel );
    volume_trans_del.visible = false;
    scene.add(volume_trans_del);

    // _____________________
    //    _ * FLOOR *
    // ???????????????????????????????????????????????????????????????
    document.getElementById("buttonFloor").addEventListener("click",  onClickbuttonFloor);

    floor_trans = new THREE.Mesh( geomFloorHover, matFloorTrans );
    floor_trans.visible = false;
    scene.add(floor_trans);
    floor_trans_del = new THREE.Mesh( geomFloorDel, matFloorDel );
    floor_trans_del.visible = false;
    scene.add(floor_trans_del);
    

    // _____________________
    //    _ * WALL *
    // ???????????????????????????????????????????????????????????????
    document.getElementById("buttonWall").addEventListener("click", onClickbuttonWall);

    wall_trans = new THREE.Mesh( geomWallHover, matWallTrans );
        // wall_trans.castShadow = false;
        // wall_trans.receiveShadow = false;
    wall_trans.visible = false;
    scene.add(wall_trans);
    wall_trans_del = new THREE.Mesh( geomWallDel, matWallDel );
        // wall_trans_del.castShadow = false;
        // wall_trans_del.receiveShadow = false;
    wall_trans_del.visible = false;
    scene.add(wall_trans_del);

    // _____________________
    //    _ * WINDOW01 *
    // ???????????????????????????????????????????????????????????????
    document.getElementById("buttonWindow01").addEventListener("click", onClickbuttonWindow01);

    Window01_trans = new THREE.Mesh( geomWindow01Hover, matWallTrans );
    Window01_trans.visible = false;
    scene.add(Window01_trans);
    Window01_trans_del = new THREE.Mesh( geomWindow01Del, matWallDel );
    Window01_trans_del.visible = false;
    scene.add(Window01_trans_del);

    // _____________________
    //    _ * DOOR01 *
    // ???????????????????????????????????????????????????????????????
    document.getElementById("buttonDoor01").addEventListener("click", onClickbuttonDoor01);

    Door01_trans = new THREE.Mesh( geomDoor01Hover, matWallTrans );
    Door01_trans.visible = false;
    scene.add(Door01_trans);
    Door01_trans_del = new THREE.Mesh( geomDoor01Del, matWallDel );
    Door01_trans_del.visible = false;
    scene.add(Door01_trans_del);



}

// ====================================================
// { Scene Animation Loop } ???
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
    // ???????????????????????????????????????????????????????????????
    if ( button_id == 'buttonVolume' ) {

        raycaster.setFromCamera( mouse, camera ); // create a ray from the camera and intersect it with objects in the scene
        var sceneMeshes = getValues(volumes, 0); // get the meshes in the scene to check for intersections
        sceneMeshes.push(ground);
        var intMeshes = raycaster.intersectObjects( sceneMeshes ); // returns an array of cursor-intersected items, e.g. (3)??[{???}, {???}, {???}] 
        var intMesh0 = intMeshes[ 0 ]; // get the first mesh that the cursor intersects e.g. {distance: 29.318, point: Vector3, object: Mesh, face: Face3, faceIndex: 5}

        if ( intMeshes.length > 0 ) { // if intersect with any meshes

            if (intMesh0.object.name == 'volume') { //if the first mesh that the cursor intersects has the name " "
                
                if (!del_volume) { 
                    // if shift button is not pressed, do nothing
                }               
                else { // if shift button is pressed, show geom_trans_del
                    var intMesh0_cen = intMesh0.object.position; // centre of the first mesh that the cursor intersects, e.g. Vector3??{x: -1.5, y: 3, z: 0.25}
                    volume_pos = new THREE.Vector3(intMesh0_cen.x, intMesh0_cen.y, intMesh0_cen.z); // update global variable _pos, e.g. Vector3??{x: -1.5, y: 3, z: 0.25}
        
                    volume_trans_del.position.set(volume_pos.x, volume_pos.y, volume_pos.z);
                    volume_trans_del.visible = true;
                    volume_trans.visible = false;
                } 

            } else { // if the first mesh that the cursor intersects does not has the name " ", i.e. intersect with ground
                
                if (!del_volume) { // if shift button is not pressed, update pos and show geom_trans 
                    volume_pos = new THREE.Vector3();
                    if (num_cells % 2 == 1) {// odd number of cells
                        volume_pos.x = Math.round(intMesh0.point.x / volume_width) * volume_width;
                        volume_pos.y = Math.round((intMesh0.point.y + volume_width_half) / volume_width ) * volume_width - volume_width_half;
                    } else { // even number of cells
                        volume_pos.x = Math.round((intMesh0.point.x + volume_width_half) / volume_width) * volume_width - volume_width_half;
                        volume_pos.y = Math.round(intMesh0.point.y / volume_width) * volume_width ;
                    }
                    volume_pos.z = volume_height/2 ; // move volume up to align it with grid
                    volume_trans.position.set(volume_pos.x, volume_pos.y, volume_pos.z);
                    volume_trans_del.visible = false;
                    volume_trans.visible = true;
                }
            }    

        } else { // if do not intersect with anything, show nothing
            volume_trans.visible = false;
            volume_trans_del.visible = false;
            volume_pos = null;
        }
   }

    // _____________________
    //    _ * FLOOR *
    // ???????????????????????????????????????????????????????????????
    if ( button_id == 'buttonFloor' ) {
        raycaster.setFromCamera( mouse, camera ); // create a ray from the camera and intersect it with objects in the scene
        var sceneMeshes = Object.values(floors); // get the meshes in the scene to check for intersections
        sceneMeshes.push(meshFloorZone);
        var intMeshes = raycaster.intersectObjects( sceneMeshes ); // returns an array of cursor-intersected items, e.g. (3)??[{???}, {???}, {???}] 
        var intMesh0 = intMeshes[ 0 ]; // get the first mesh that the cursor intersects e.g. {distance: 29.318, point: Vector3, object: Mesh, face: Face3, faceIndex: 5}

        if ( intMeshes.length > 0 ) { // if intersect with any meshes

            if (intMesh0.object.name == 'floor') { //if the first mesh that the cursor intersects has the name " "

                var intMesh0_cen = intMesh0.object.position; // centre of the first mesh that the cursor intersects, e.g. Vector3??{x: -1.5, y: 3, z: 0.25}
                floor_pos = new THREE.Vector3(intMesh0_cen.x, intMesh0_cen.y, intMesh0_cen.z); // update global variable _pos, e.g. Vector3??{x: -1.5, y: 3, z: 0.25}
                
                if (!del_floor) { // if shift button is not pressed, update trans pos and show geom_trans 
                    // if (intMesh0.faceIndex == 0 || intMesh0.faceIndex == 1) { // right top || right bottom
                    //     floor_pos.x += floor_width;
                    // } else if (intMesh0.faceIndex == 2 || intMesh0.faceIndex == 3) { // left top || bottom
                    //     floor_pos.x -= floor_width;
                    // }  else if (intMesh0.faceIndex == 4 || intMesh0.faceIndex == 5) { // back right || left
                    //     floor_pos.y += floor_width;
                    // }  else if (intMesh0.faceIndex == 6 || intMesh0.faceIndex == 7) { // front left || right
                    //     floor_pos.y -= floor_width;
                    // }  else if (intMesh0.faceIndex == 8 || intMesh0.faceIndex == 9) { // top left || right
                    //     floor_pos.z += wall_height;
                    // }  else if (intMesh0.faceIndex == 10 || intMesh0.faceIndex == 11) { // bottom left || right
                    //     floor_pos.z -= wall_height;
                    // }
                    // floor_trans.position.set(floor_pos.x, floor_pos.y, floor_pos.z);
                    // floor_trans_del.visible = false;
                    // floor_trans.visible = true;
                }

                else { // if shift button is pressed, show geom_trans_del
                    floor_trans_del.position.set(floor_pos.x, floor_pos.y, floor_pos.z);
                    floor_trans_del.visible = true;
                    floor_trans.visible = false;
                } 

            } else { // if the first mesh that the cursor intersects does not has the name " ", i.e. intersect with ground
                
                if (!del_floor) { // if shift button is not pressed, update pos and show geom_trans 
                    floor_pos = new THREE.Vector3();
                    if (num_cells % 2 == 1) {// odd number of cells
                        floor_pos.x = Math.round(intMesh0.point.x / floor_width) * floor_width;
                        floor_pos.y = Math.round((intMesh0.point.y + floor_width_half) / floor_width) * floor_width - floor_width_half;
                    } else { // even number of cells
                        floor_pos.x = Math.round((floor_width_half + intMesh0.point.x) / floor_width) * floor_width - floor_width_half;
                        floor_pos.y = Math.round(intMesh0.point.y / floor_width) * floor_width ;
                    }
                    floor_pos.z = floor_thickness/2 ; // move floor up to align it with grid
                    floor_trans.position.set(floor_pos.x, floor_pos.y, floor_pos.z);
                    floor_trans_del.visible = false;
                    floor_trans.visible = true;
                }
            }    

        } else { // if do not intersect with anything, show nothing
            floor_trans.visible = false;
            floor_trans_del.visible = false;
            floor_pos = null;
        }
   }

    // _____________________
    //    _ * WALL * ???
    // ???????????????????????????????????????????????????????????????
    if ( button_id == 'buttonWall' ) {
        raycaster.setFromCamera( mouse, camera );
        var sceneMeshes = getMeshesInGroups(); // get the mesh in the scene to check for intersections
        sceneMeshes.push(meshFloorZone);
        var intMeshes = raycaster.intersectObjects( sceneMeshes ); // returns an array of intersected items, e.g. (3)??[{???}, {???}, {???}] 
        var intMesh0 = intMeshes[ 0 ]; // get the first mesh that the cursor intersects e.g. {distance: 29.318, point: Vector3, object: Mesh, face: Face3, faceIndex: 5}
        
        if ( intMeshes.length > 0 ) { // if intersect with any meshes

            if (intMesh0.object.name == 'wall') { // if the first mesh that the cursor intersects has the name ' '
                var intMesh0_cen = intMesh0.object.position; // centre of the first mesh that the cursor intersects, e.g. Vector3??{x: -1.5, y: 3, z: 0.25}
                wall_pos = new THREE.Vector3(intMesh0_cen.x, intMesh0_cen.y, intMesh0_cen.z); // update global variable _pos, e.g. Vector3??{x: -1.5, y: 3, z: 0.25}
                wall_rotation = intMesh0.object.rotation.z;

                if (!del_wall) { // if shift button is not pressed, update trans pos and show geom_trans 
                    // if (intMesh0.faceIndex == 0 || intMesh0.faceIndex == 1) { // right top || right bottom
                    //     if (wall_rotation !== 0) {
                    //         wall_pos.y += wall_width;
                    //     } else {
                    //         wall_pos.x += wall_width;
                    //     }
                    // } else if (intMesh0.faceIndex == 3 || intMesh0.faceIndex == 2) { // left top || left bottom
                    //     if (wall_rotation !== 0) {
                    //         wall_pos.y -= wall_width;
                    //     } else {
                    //         wall_pos.x -= wall_width;
                    //     }
                    // } else if (intMesh0.faceIndex == 6) { // front left
                    //     if (wall_rotation !== 0) {
                    //         wall_rotation = 0;
                    //         wall_pos.x += wall_width_half;
                    //         wall_pos.y -= wall_width_half;
                    //     } else {
                    //         wall_rotation = Math.PI / 2;
                    //         wall_pos.x -= wall_width_half;
                    //         wall_pos.y -= wall_width_half;
                    //     }
                    // } else if (intMesh0.faceIndex == 7) { // front right
                    //     if (wall_rotation !== 0) {
                    //         wall_rotation = 0;
                    //         wall_pos.x += wall_width_half;
                    //         wall_pos.y += wall_width_half;
                    //     } else {
                    //         wall_rotation = Math.PI / 2;
                    //         wall_pos.x += wall_width_half;
                    //         wall_pos.y -= wall_width_half;
                    //     }
                    // } else if (intMesh0.faceIndex == 5) { // back left
                    //     if (wall_rotation !== 0) {
                    //         wall_rotation = 0;
                    //         wall_pos.x -= wall_width_half;
                    //         wall_pos.y += wall_width_half;
                    //     } else {
                    //         wall_rotation = Math.PI / 2;
                    //         wall_pos.x += wall_width_half;
                    //         wall_pos.y += wall_width_half;
                    //     }
                    // } else if (intMesh0.faceIndex == 4) { // back right
                    //     if (wall_rotation !== 0) {
                    //         wall_rotation = 0;
                    //         wall_pos.x -= wall_width_half;
                    //         wall_pos.y -= wall_width_half;
                    //     } else {
                    //         wall_rotation = Math.PI / 2;
                    //         wall_pos.x -= wall_width_half;
                    //         wall_pos.y += wall_width_half;
                    //     }
                    // } else if (intMesh0.faceIndex == 8 || intMesh0.faceIndex == 9) { // top left || right
                    //     wall_pos.z += wall_height; 
                    // } else if (intMesh0.faceIndex == 11 || intMesh0.faceIndex == 12) { // bottom left || right
                    //     wall_pos.z -= wall_height; 
                    // }
                    // wall_trans.position.set(wall_pos.x, wall_pos.y, wall_pos.z);
                    // wall_trans.rotation.z = wall_rotation;
                    // wall_trans_del.visible = false;
                    // wall_trans.visible = true;
                }

                else { // if shift button is pressed, show geom_trans_del
                    wall_trans_del.position.set(wall_pos.x, wall_pos.y, wall_pos.z);
                    wall_trans_del.rotation.z = wall_rotation;
                    wall_trans_del.visible = true;
                    wall_trans.visible = false;
                } 
            } 
            
            else if (intMesh0.object.parent.name == 'Window01') { // if the first mesh that the cursor intersects has the name ' '
                if (!del_wall) { // if shift button is not pressed, update global variable of geom & geom_trans
                    var intGrp = intMesh0.object.parent.parent; // Group??{ .., name: 'Window01', ..}
                    var intGrp_cen = intGrp.position; // centre of the first mesh that the cursor intersects, e.g. Vector3??{x: -1.5, y: 3, z: 0.25}
                    wall_pos = new THREE.Vector3(intGrp_cen.x, intGrp_cen.y, intGrp_cen.z);
                    wall_rotation = intGrp.rotation.z;
    
                    wall_trans.position.copy(wall_pos);
                    wall_trans.rotation.z = wall_rotation
                    wall_trans_del.visible = false;
                    wall_trans.visible = true;
                }
            }	

            else if (intMesh0.object.parent.name == 'Door01') { // if the first mesh that the cursor intersects has the name ' '
                if (!del_wall) { // if shift button is not pressed, update global variable of geom & geom_trans
                    var intGrp = intMesh0.object.parent.parent; // Group??{ .., name: 'Window01', ..}
                    var intGrp_cen = intGrp.position; // centre of the first mesh that the cursor intersects, e.g. Vector3??{x: -1.5, y: 3, z: 0.25}
                    wall_pos = new THREE.Vector3(intGrp_cen.x, intGrp_cen.y, intGrp_cen.z);
                    wall_rotation = intGrp.rotation.z;
    
                    wall_trans.position.copy(wall_pos);
                    wall_trans.rotation.z = wall_rotation
                    wall_trans_del.visible = false;
                    wall_trans.visible = true;
                }
            }				
    
            else { // if the first mesh that the cursor intersects does not have name, i.e. intersect with ground
                if (!del_wall) { // if shift button is not pressed, update pos and show geom_trans
                    wall_pos = new THREE.Vector3();
                    wall_rotation = 0
                    if (num_cells % 2 == 1) { //odd number of cells
                        var ptX = new THREE.Vector3( // wall_pos if wall is horizontal
                            Math.round(intMesh0.point.x / wall_width) * wall_width,
                            Math.round(intMesh0.point.y / wall_width) * wall_width,
                            0);
                        var ptY = new THREE.Vector3( // wall_pos if wall is vertical
                            Math.round((wall_width_half + intMesh0.point.x) / wall_width) * wall_width - wall_width_half,
                            Math.round((wall_width_half + intMesh0.point.y) / wall_width) * wall_width - wall_width_half,
                            0);
                    } else { // even number of cells
                        var ptX = new THREE.Vector3( // wall_pos if wall is horizontal
                            Math.round((wall_width_half + intMesh0.point.x) / wall_width) * wall_width - wall_width_half,
                            Math.round((wall_width_half + intMesh0.point.y) / wall_width) * wall_width - wall_width_half,
                            0);
                        var ptY = new THREE.Vector3( // wall_pos if wall is vertical
                            Math.round(intMesh0.point.x / wall_width) * wall_width,
                            Math.round(intMesh0.point.y / wall_width) * wall_width,
                            0);
                    }
                    var distX = ptX.distanceTo(intMesh0.point); // distance from horizontal wall pos to mouse pointer
                    var distY = ptY.distanceTo(intMesh0.point); // distance from vertical wall pos to mouse pointer
                    if (distX <= distY) {
                        wall_pos.copy(ptX)
                    } else {
                        wall_pos.copy(ptY)
                        wall_rotation = Math.PI / 2
                    }
                    // console.log('___', intMesh0.point, ptX, ptY, distX, distY, wall_pos)
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
    //    _ * WINDOW01 * ???
    // ???????????????????????????????????????????????????????????????
    if ( button_id == 'buttonWindow01' ) {
        raycaster.setFromCamera( mouse, camera );
        var sceneMeshes = getMeshesInGroups(); // get the mesh in the scene to check for intersections
        sceneMeshes.push(meshFloorZone);
        var intMeshes = raycaster.intersectObjects( sceneMeshes ); // returns an array of intersected items, e.g. (3)??[{???}, {???}, {???}] 
        var intMesh0 = intMeshes[ 0 ]; // get the first mesh that the cursor intersects e.g. {distance: 29.318, point: Vector3, object: Mesh, face: Face3, faceIndex: 5}

        if ( intMeshes.length > 0 ) { // if intersect with any mesh

            if (intMesh0.object.parent.name == 'Window01') { // if the first mesh that the cursor intersects has the name ' '
                // console.log('~~~window~~~intMesh0.object~~~', intMesh0.object) // Mesh??{.., name: 'Glass', ..}
                // console.log('~~~window~~~intMesh0.object.parent~~~', intMesh0.object.parent) // Object3D??{.., name: 'Window01', ..}
                var intGrp = intMesh0.object.parent.parent; // Group??{ .., name: 'Window01', ..}
                var intGrp_cen = intGrp.position; // centre of the first mesh that the cursor intersects, e.g. Vector3??{x: -1.5, y: 3, z: 0.25}
                Window01_pos = new THREE.Vector3(intGrp_cen.x, intGrp_cen.y, intGrp_cen.z); // update global variable _pos, e.g. Vector3??{x: -1.5, y: 3, z: 0.25}
                Window01_rotation = intGrp.rotation.z;

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
            
            else if (intMesh0.object.name == 'wall') { // if the first mesh that the cursor intersects has the name ' '
                if (!del_Window01) { // if shift button is not pressed, update global variable of geom & geom_trans
                    var intMesh0_cen = intMesh0.object.position;
                    Window01_pos = new THREE.Vector3(intMesh0_cen.x, intMesh0_cen.y, intMesh0_cen.z);
                    Window01_rotation = intMesh0.object.rotation.z;

                    Window01_trans.position.copy(Window01_pos);
                    Window01_trans.rotation.z = Window01_rotation
                    Window01_trans.visible = true;
                    Window01_trans_del.visible = false;
                }
            }

            else if (intMesh0.object.parent.name == 'Door01') { 
                if (!del_Window01) { // if shift button is not pressed, update global variable of geom & geom_trans
                    var intGrp = intMesh0.object.parent.parent; // centre of the first mesh that the cursor intersects, e.g. Vector3??{x: -1.5, y: 3, z: 0.25}
                    var intGrp_cen = intGrp.position; // update global variable _pos, e.g. Vector3??{x: -1.5, y: 3, z: 0.25}
                    Window01_pos = new THREE.Vector3(intGrp_cen.x, intGrp_cen.y, intGrp_cen.z);
                    Window01_rotation = intGrp.rotation.z;

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
    //    _ * DOOR01 * ???
    // ???????????????????????????????????????????????????????????????
    if ( button_id == 'buttonDoor01' ) {
        raycaster.setFromCamera( mouse, camera );
        var sceneMeshes = getMeshesInGroups(); // get the mesh in the scene to check for intersections
        sceneMeshes.push(meshFloorZone);
        var intMeshes = raycaster.intersectObjects( sceneMeshes );
        var intMesh0 = intMeshes[ 0 ];
        
        if ( intMeshes.length > 0 ) {  // if intersect with any meshes

            if (intMesh0.object.parent.name == 'Door01') { // if the first mesh that the cursor intersects has the name ' '
                var intGrp = intMesh0.object.parent.parent // centre of the first mesh that the cursor intersects, e.g. Vector3??{x: -1.5, y: 3, z: 0.25}
                var intGrp_cen = intGrp.position; // update global variable _pos, e.g. Vector3??{x: -1.5, y: 3, z: 0.25}
                Door01_pos = new THREE.Vector3(intGrp_cen.x, intGrp_cen.y, intGrp_cen.z);
                Door01_rotation = intGrp.rotation.z;

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
            
            else if (intMesh0.object.name == 'wall' ) { // if the first mesh that the cursor intersects has the name ' '
                if (!del_Door01) { // if shift button is not pressed, update global variable of geom & geom_trans
                    var intMesh0_cen = intMesh0.object.position;
                    Door01_pos = new THREE.Vector3(intMesh0_cen.x, intMesh0_cen.y, intMesh0_cen.z);
                    Door01_rotation = intMesh0.object.rotation.z;

                    Door01_trans.position.copy(Door01_pos);
                    Door01_trans.rotation.z = Door01_rotation
                    Door01_trans.visible = true;
                    Door01_trans_del.visible = false;
                }
            }

            else if (intMesh0.object.parent.name == 'Window01') { 
                if (!del_Door01) { // if shift button is not pressed, update global variable of geom & geom_trans
                    var intGrp = intMesh0.object.parent.parent // centre of the first mesh that the cursor intersects, e.g. Vector3??{x: -1.5, y: 3, z: 0.25}
                    var intGrp_cen = intGrp.position; // update global variable _pos, e.g. Vector3??{x: -1.5, y: 3, z: 0.25}
                    Door01_pos = new THREE.Vector3(intGrp_cen.x, intGrp_cen.y, intGrp_cen.z);
                    Door01_rotation = intGrp.rotation.z;

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
//    Mouse Up ???
// --------------------------------

function onMouseUp(event) { // Mouse up: do nothing, create mesh or delete mesh
    if ((mouse_down.x !== event.clientX) || (mouse_down.y !== event.clientY)) {
        return; // if we are dragging, return nothing
    }
    
    // _____________________
    //    _ * VOLUME *
    // ???????????????????????????????????????????????????????????????
    else if (volume_pos != null) { //If not dragging and raycaster.intersectObjects.object.values(volumes).position != null, e.g. Vector3??{x: 1.5, y: 3, z: 0}
        var key = keyGen(volume_pos);
        if (del_volume && key in volumes) { // if shift is pressed and existing key is True, delete volume
            deleteVolume(volumes[key]); // e.g. (2)??[Mesh, Mesh]
        } else if (!del_volume && volumes[key]==undefined) { //if shift is not pressed and there is no exisitng key, add a new volume to the scene and add its key to volumes {}
            addVolume(key); 
        }
    }
    
    // _____________________
    //    _ * FLOOR *
    // ???????????????????????????????????????????????????????????????
    else if (floor_pos != null) { //If not dragging and raycaster.intersectObjects.object.values(floors).position != null, e.g. Vector3??{x: 1.5, y: 3, z: 0}
        var key = keyGen(floor_pos);
        if (del_floor && key in floors) { // if shift is pressed and existing key is True, delete floor
            deleteFloor(floors[key]); 
        } else if (!del_floor && floors[key]==undefined) { //if shift is not pressed and there is no exisitng key, add a new floor to the scene and add its key to floors {}
            addFloor(key); 
        }
        addWallEnclosure(floor_pos);
    }

    // _____________________
    //    _ * WALL * ???
    // ???????????????????????????????????????????????????????????????
    else if (wall_pos != null) {
        var key = keyGen(wall_pos);
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
    //    _ * WINDOW01 * ???
    // ???????????????????????????????????????????????????????????????
    else if (Window01_pos != null) {
        var key = keyGen(Window01_pos);
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
    //    _ * DOOR01 * ???
    // ???????????????????????????????????????????????????????????????
    else if (Door01_pos != null) {
        var key = keyGen(Door01_pos);
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
//    Mouse Move and Shift Key ???
// --------------------------------

function onMouseMove( event ) {
    event.preventDefault(); // ??? not too sure what this does
    mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1; 
    mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

    // _____________________
    //    _ * VOLUME *
    // ???????????????????????????????????????????????????????????????
    if (event.shiftKey) { // if shift is pressed, del_mesh and hide mesh_trans
        del_volume = true;
    } else { // if shift is not pressed, del_mesh is false and hide mesh_trans
        del_volume = false;
    }
    
    // _____________________
    //    _ * FLOOR *
    // ???????????????????????????????????????????????????????????????
    if (event.shiftKey) { // if shift is pressed, del_mesh and hide mesh_trans
        del_floor = true;
    } else { // if shift is not pressed, del_mesh is false and hide mesh_trans
        del_floor = false;
    }

    // _____________________
    //    _ * WALL * 
    // ???????????????????????????????????????????????????????????????
    if (event.shiftKey) {
        del_wall = true;
    } else {
        del_wall = false;
    }

    // _____________________
    //    _ * WINDOW01 * 
    // ???????????????????????????????????????????????????????????????
    if (event.shiftKey) {
        del_Window01 = true;
    } else {
        del_Window01 = false;
    }

    // _____________________
    //    _ * DOOR01 * 
    // ???????????????????????????????????????????????????????????????
    if (event.shiftKey) {
        del_Door01 = true;
    } else {
        del_Door01 = false;
    }




}


// --------------------------------
//    Buttons ???
// --------------------------------

// _____________________
//    _ * VOLUME *
// ???????????????????????????????????????????????????????????????
function onClickbuttonVolume() {
    document.getElementById(button_id).classList.remove("pressed");
    button_id = 'buttonVolume';
    document.getElementById(button_id).classList.add("pressed");
};

// _____________________
//    _ * FLOOR *
// ???????????????????????????????????????????????????????????????
function onClickbuttonFloor() {
    document.getElementById(button_id).classList.remove("pressed");
    button_id = 'buttonFloor';
    document.getElementById(button_id).classList.add("pressed");
};

// _____________________
//    _ * WALL * 
// ???????????????????????????????????????????????????????????????
function onClickbuttonWall() {
    document.getElementById(button_id).classList.remove("pressed");
    button_id = 'buttonWall';
    document.getElementById(button_id).classList.add("pressed");
};

// _____________________
//    _ * WINDOW01 * 
// ???????????????????????????????????????????????????????????????
function onClickbuttonWindow01() {
    document.getElementById(button_id).classList.remove("pressed");
    button_id = 'buttonWindow01';
    document.getElementById(button_id).classList.add("pressed");
};

// _____________________
//    _ * DOOR01 * 
// ???????????????????????????????????????????????????????????????
function onClickbuttonDoor01() {
    document.getElementById(button_id).classList.remove("pressed");
    button_id = 'buttonDoor01';
    document.getElementById(button_id).classList.add("pressed");
};



// ====================================================
// { Raycaster } 
// ====================================================

// --------------------------------
//    Extract Mesh ???
// --------------------------------

function getMeshesInGroups() {
    
    var sceneMeshes = []; // get the mesh in the scene to check for intersections
    
    // console.log('~~~Object.values(walls)~~~', Object.values(walls)) // e.g. (2)??[Mesh, Mesh] (i.e. 2 walls in the scene)
    sceneMeshes = sceneMeshes.concat(Object.values(walls));

    // console.log('~~~Object.values(Window01s)~~~', Object.values(Window01s)) // e.g. (3)??[Group, Group, Group] (i.e. 3 windows in the scene)
    Object.values(Window01s).forEach(i => { // for each group in the scene
        // console.log('~~~i~~~', i)  // e.g. Group??{.., children: [Object3D], ..}
        // console.log('~~~i.children~~~', i.children) // e.g. [Object3D] {0: Object3D, [[Prototype]]: Array(0)}
        // console.log('~~~i.children[0]~~~', i.children[0]) // e.g. Object3D {..}
        // console.log('~~~i.children[0].children~~~', i.children[0].children) // e.g. (4)??[Mesh, Mesh, Mesh, Mesh]
        sceneMeshes = sceneMeshes.concat(i.children[0].children) // concat the its meshes into the list 
    })

    // console.log('~~~Object.values(Door01s)~~~', Object.values(Door01s)) // e.g. (2)??[Group, Group] (i.e. 2 doors in the scene)
    Object.values(Door01s).forEach(i => {
        sceneMeshes = sceneMeshes.concat(i.children[0].children)
    })






    // console.log('~~~sceneMeshesAll~~~', sceneMeshes) // e.g. (12)??[Mesh, Mesh, Mesh, Mesh, Mesh, Mesh, Mesh, Mesh, Mesh, Mesh, Mesh, Mesh]
    return sceneMeshes
}



//////////////////// -------------HELPER FUNCTIONS------------------------------------------------------ //////////////////// 

// ====================================================
// { Mouse Up } ???
// ====================================================
// ''''''  add, delete

// --------------------------------
//    Key Generation
// --------------------------------
function keyGen(mod_pos) { // mod_pos was generated through Scene Animation Loop 
    var key = mod_pos.x + '_' + mod_pos.y + '_' + mod_pos.z; // create a key that as a string, e.g. 1_-4_0. 
    return key
}

// --------------------------------
//   Scene Modifications
// --------------------------------

    // --------------------------------
    //       ( - futurework - ) changeGridPos, autoGenWalls 
    // --------------------------------

// _____________________
//    _ * VOLUME *
// ???????????????????????????????????????????????????????????????
function addVolume(key) {

    // Add Mesh
    var meshVolume = new THREE.Mesh(geomVolume, matVolumeTrans);
    meshVolume.position.set(volume_pos.x, volume_pos.y, volume_pos.z);
    // scene.add( meshVolume );

    var meshVolumeBase = new THREE.Mesh( geomVolumeBase, matVolume ) ;
    meshVolumeBase.position.set(volume_pos.x, volume_pos.y, 0);
    // scene.add( meshVolumeBase );

    // Add Mesh Properties
    meshVolume.name = "volume"
    meshVolumeBase.name = "volume base"
    meshVolume.volume_key = key;

    // Update Global Variables, HTML
    volumes[key] = [meshVolume, meshVolumeBase];
    volume_counters += 1; // update the counter on the web page
    document.getElementById('buttonVolume').innerHTML = "Volume: " + volume_counters;

    // console.log('~~~meshVolume~~~', meshVolume);
    // console.log('~~~meshVolume~~~', meshVolume.geometry.attributes.position.array);
     
    // var top_frontleft_coord = new THREE.Vector3( volume_pos.x - volume_width_half, volume_pos.y + volume_width_half, volume_pos.z + volume_width_half );
    // addCoord(top_frontleft_coord);

    // var top_frontright_coord = new THREE.Vector3( volume_pos.x + volume_width_half, volume_pos.y + volume_width_half, volume_pos.z + volume_width_half );
    // addCoord(top_frontright_coord);

    // var top_backleft_coord = new THREE.Vector3( volume_pos.x - volume_width_half, volume_pos.y - volume_width_half, volume_pos.z + volume_width_half );
    // addCoord(top_backleft_coord);

    // var top_backright_coord = new THREE.Vector3( volume_pos.x + volume_width_half, volume_pos.y - volume_width_half, volume_pos.z + volume_width_half );
    // addCoord(top_backright_coord);

    // console.log('~~~dictVolume~~~', dictVolume);

    // var values = getValues(dictVolume, 0)
    // console.log('~~~values~~~', values);

    // var shape = new THREE.Shape(values);
    // console.log('~~~shape~~~', shape);
    // var geomShape = new THREE.ShapeBufferGeometry(shape);
    // // var matShape = new THREE.MeshBasicMaterial({color:"blue"});
    // var floorZone = new THREE.Mesh( geomShape, matVolumeTrans ) ;
    // scene.add( floorZone );

    var base_frontleft_coord = new THREE.Vector3( volume_pos.x - volume_width_half, volume_pos.y + volume_width_half, volume_pos.z - volume_width_half );
    var base_frontright_coord = new THREE.Vector3( volume_pos.x + volume_width_half, volume_pos.y + volume_width_half, volume_pos.z - volume_width_half );
    var base_backright_coord = new THREE.Vector3( volume_pos.x + volume_width_half, volume_pos.y - volume_width_half, volume_pos.z - volume_width_half );
    var base_backleft_coord = new THREE.Vector3( volume_pos.x - volume_width_half, volume_pos.y - volume_width_half, volume_pos.z - volume_width_half );
    var listVolumeCoords = [ base_frontleft_coord, base_frontright_coord, base_backright_coord, base_backleft_coord ]
    listVolumeCoords.forEach( addCoord )
    // var geomVolume = new THREE.ShapeBufferGeometry(new THREE.Shape(listVolumeCoords));

    // console.log('~~~volumes~~~', volumes);
    // var keys = Object.keys(volumes);
    // var values = []
    // console.log('~~~keys~~~', keys);
    // keys.forEach(function(key){
    //     values.push(volumes[key][1]);
    // });
    // console.log('~~~values~~~', values);
    
    var list_meshVolumeBase = getValues(volumes, 1)
    var singleGeometry = new THREE.Geometry();
    // var singleMesh = new THREE.Mesh();



    if ( meshFloorZone != undefined ) {
        scene.remove( meshFloorZone )   
    } 
    console.log('~~~meshFloorZone~~~', meshFloorZone);
    mergeMesh(list_meshVolumeBase);
    function mergeMesh(list_meshVolumeBase) {
        list_meshVolumeBase.forEach( 
            function(meshVolumeBase) {
                meshVolumeBase.updateMatrix(); // as needed
                singleGeometry.merge(meshVolumeBase.geometry, meshVolumeBase.matrix);
                meshFloorZone = new THREE.Mesh(singleGeometry, matVolume);
            }
        )
        scene.add(meshFloorZone)

    }
    // scene.add(singleMesh)
    // console.log('~~~geomFloorZone~~~', geomFloorZone);

    // var list_meshVolumeBase = getValues(volumes, 1)
    // console.log('~~~list_meshVolumeBase~~~', list_meshVolumeBase);
    // if ( list_meshVolumeBase.length > 0 ) {
    //     var geomFloorZone = BufferGeometryUtils.mergeBufferGeometries( list_meshVolumeBase )
    // //     meshFloorZone = new THREE.Mesh( geomFloorZone, matVolume );
    // //     meshFloorZone.position.set(volume_pos.x, volume_pos.y, 0);
    // //     // console.log('~~~meshFloorZone~~~', meshFloorZone);
    // //     // if ( meshFloorZone != undefined ) {
    // //     //     scene.remove( meshFloorZone )
    // //     // }
    // //     // console.log('~~~meshFloorZone~~~', meshFloorZone);
    // //     // // meshFloorZone.name = "floor zone"
    // //     // console.log('~~~meshFloorZone~~~', meshFloorZone);
    // //     // console.log('~~~mesh~~~', meshFloorZone);
    // //     scene.add( meshFloorZone ); 
    // }
    // console.log('~~~meshFloorZone~~~', meshFloorZone);


};




function addCoord(coord) {
    var key = keyGen(coord)
    // console.log('~~~dictVolume [key] ==undefined~~~', dictVolume [key] == undefined);

    if ( dictVolume [key] == undefined ) {
        var geomPoint = new THREE.BufferGeometry().setFromPoints([coord]);
        var matPoint = new THREE.PointsMaterial({size: 1, color: "pink"});
        var point = new THREE.Points(geomPoint, matPoint);
        scene.add(point);
        dictVolume[key] = [coord, point];

    } else {
        scene.remove( dictVolume [key][1] );
        delete dictVolume [key]

    }
}

function getValues(dictionary, valueIndex) {
    var keys = Object.keys(dictionary);
    var values = []
    keys.forEach(function(key){
        values.push(dictionary[key][valueIndex]);
    });
    return values
}



function deleteVolume( values ) {
    scene.remove( values[0] ); // value[0] is e.g. Mesh??{..}
    delete volumes[ values.volume_key ];
    volume_counters -= 1; 
    document.getElementById('buttonVolume').innerHTML = "Volume:" + volume_counters;
};


// _____________________
//    _ * FLOOR *
// ???????????????????????????????????????????????????????????????

function addFloor(key) {

    // Add Mesh
    var floor = new THREE.Mesh(geomFloor, particleboard);
    floor.position.set(floor_pos.x, floor_pos.y, floor_pos.z);
        // floor.castShadow = true;
        // floor.receiveShadow = true;
    scene.add( floor );

    // Add Mesh Properties
    floor.name = "floor"
    floor.floor_key = key;

    // Update Global Variables, HTML
    floors[key] = floor;
    floor_counters += 1; // update the counter on the web page
    document.getElementById('buttonFloor').innerHTML = "Floor: " + floor_counters;
    // console.log('~~~floor~~~', floor) 
};

function deleteFloor(floor) {
    scene.remove( floor );
    delete floors[ floor.floor_key ];
    floor_counters -= 1; 
    document.getElementById('buttonFloor').innerHTML = "Floor:" + floor_counters;
};

function addWallEnclosure(floor_pos) {

    // LEFT WALL
    wall_rotation = Math.PI / 2;
    wall_pos = new THREE.Vector3(floor_pos.x - floor_width_half, floor_pos.y, floor_pos.z - floor_thickness/2 + wall_height_half); // update global variable _pos, e.g. Vector3??{x: -1.5, y: 3, z: 0.25}
    var wall_key = keyGen(wall_pos);

    if ( walls [wall_key] == undefined ) {
        addWall(wall_key);
    } else {
        deleteWall(walls [ wall_key ]);
    }


    // RIGHT WALL
    wall_rotation = - Math.PI / 2;
    wall_pos = new THREE.Vector3(floor_pos.x + floor_width_half, floor_pos.y, floor_pos.z - floor_thickness/2 + wall_height_half); // update global variable _pos, e.g. Vector3??{x: -1.5, y: 3, z: 0.25}
    var wall_key = keyGen(wall_pos);

    if ( walls [wall_key] == undefined ) {
        addWall(wall_key);
    } else {
        deleteWall(walls [ wall_key ]);
    }


    // FRONT WALL
    wall_rotation = 0;
    wall_pos = new THREE.Vector3(floor_pos.x, floor_pos.y + floor_width_half, floor_pos.z - floor_thickness/2 + wall_height_half); // update global variable _pos, e.g. Vector3??{x: -1.5, y: 3, z: 0.25}
    var wall_key = keyGen(wall_pos);

    if ( walls [wall_key] == undefined ) {
        addWall(wall_key);
    } else {
        deleteWall(walls [ wall_key ]);
    }


    // BACK WALL
    wall_rotation = - Math.PI;
    wall_pos = new THREE.Vector3(floor_pos.x, floor_pos.y - floor_width_half, floor_pos.z - floor_thickness/2 + wall_height_half); // update global variable _pos, e.g. Vector3??{x: -1.5, y: 3, z: 0.25}
    var wall_key = keyGen(wall_pos);

    if ( walls [wall_key] == undefined ) {
        addWall(wall_key);
    } else {
        deleteWall(walls [ wall_key ]);
    }


    wall_pos = null // restore to initialisation state

}


// _____________________
//    _ * WALL * 
// ???????????????????????????????????????????????????????????????

function addWall(key) {

    // Add Mesh
    var wall = new THREE.Mesh( geomWall, obs );
    wall.position.set(wall_pos.x, wall_pos.y, wall_pos.z);
    scene.add( wall );

    // Add Mesh Properties
    wall.name = "wall"
    wall.wall_key = key;

    // Update Global Variables, HTML
    walls[key] = wall;
    wall.rotation.z = wall_rotation;
    wall_counters += 1; 
    document.getElementById('buttonWall').innerHTML = "Wall: " + wall_counters;
    
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
    document.getElementById('buttonWall').innerHTML = "Wall: " + wall_counters;
};

// _____________________
//    _ * WINDOW01 * 
// ???????????????????????????????????????????????????????????????

function addWindow01(key) {

    // Add Mesh
    var Window01 = geomWindow01.clone();
    Window01.position.set(Window01_pos.x, Window01_pos.y, Window01_pos.z);
    scene.add( Window01 );

    // Add Mesh Properties
    Window01.name = "Window01"
    Window01.Window01_key = key;

    // Update Global Variables, HTML
    Window01s[key] = Window01;
    Window01.rotation.z = Window01_rotation;
    Window01_counters += 1; 
    document.getElementById('buttonWindow01').innerHTML = "Window01: " + Window01_counters;
};

// Delete a Window01
function deleteWindow01(Window01) {
    scene.remove( Window01 );
    delete Window01s[ Window01.Window01_key ];
    Window01_counters -= 1; 
    document.getElementById('buttonWindow01').innerHTML = "Window01: " + Window01_counters;
};


// _____________________
//    _ * DOOR01 * 
// ???????????????????????????????????????????????????????????????

function addDoor01(key) {

    // Add Mesh
    var Door01 = geomDoor01.clone();
    Door01.position.set(Door01_pos.x, Door01_pos.y, Door01_pos.z);
    scene.add( Door01 );
    
    // Add Mesh Properties
    Door01.name = "Door01"
    Door01.Door01_key = key;

    // Update Global Variables, HTML
    Door01s[key] = Door01;
    Door01.rotation.z = Door01_rotation;
    Door01_counters += 1; 
    document.getElementById('buttonDoor01').innerHTML = "Door01: " + Door01_counters;
};

// Delete a Door01
function deleteDoor01(Door01) {
    scene.remove( Door01 );
    delete Door01s[ Door01.Door01_key ];
    Door01_counters -= 1; 
    document.getElementById('buttonDoor01').innerHTML = "Door01: " + Door01_counters;
};

