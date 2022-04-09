///////////////// -------------IMPORT STATEMENTS----------------------------------------------------- /////////////// 
import * as THREE from 'https://unpkg.com/three@0.119.1/build/three.module.js'; 
import { OrbitControls } from 'https://unpkg.com/three@0.119.1/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'https://unpkg.com/three@0.119.1/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'https://unpkg.com/three@0.119.1/examples/jsm/loaders/DRACOLoader'
import { GLTFExporter } from 'https://unpkg.com/three@0.119.1/examples/jsm/exporters/GLTFExporter.js';
import { BufferGeometryUtils } from 'https://unpkg.com/three@0.119.1/examples/jsm/utils/BufferGeometryUtils.js';

//////////////////// -------------MAIN CODES------------------------------------------------------ /////////////////// 

// ====================================================
// HTML ★
// ====================================================
const container = document.getElementById("centre_panel");
window.addEventListener( 'resize', onWindowResize, false );
document.addEventListener('mousedown', onMouseDown, false);
document.addEventListener('mouseup', onMouseUp, false);
document.addEventListener( 'mousemove', onMouseMove, false );

const checkboxCeiling = document.getElementById("checkboxCeiling");   

// IDS
document.getElementById("buttonVolume").addEventListener("click", onClickbuttonVolume );
document.getElementById("buttonFloor").addEventListener("click",  onClickbuttonFloor);
document.getElementById("buttonFloorFrac").addEventListener("click",  onClickbuttonFloorFrac);

    // document.getElementById("buttonCeiling").addEventListener("click", onClickbuttonCeiling);
    // document.getElementById("buttonBoundaryWall").addEventListener("click", onClickbuttonBoundaryWall);
document.getElementById("buttonPartitionWall").addEventListener("click", onClickbuttonPartWall);
document.getElementById("buttonWindow01").addEventListener("click", onClickbuttonWindow01);
document.getElementById("buttonWindow02").addEventListener("click", onClickbuttonWindow02);
document.getElementById("buttonDoor01").addEventListener("click", onClickbuttonDoor01);
document.getElementById("buttonDoor02").addEventListener("click", onClickbuttonDoor02);
document.getElementById("buttonDoor03").addEventListener("click", onClickbuttonDoor03);
document.getElementById("buttonRailing01").addEventListener("click", onClickbuttonRailing01);
document.getElementById("buttonStairs01").addEventListener("click", onClickbuttonStairs01);
document.getElementById('export_scene').addEventListener('click', function() {exportGLTF(scene)});

const button_ids = ['buttonVolume', 'buttonFloor', 'buttonBoundaryWall', 'buttonPartitionWall', 'buttonWindow01', 'buttonWindow02', 'buttonDoor01', 'buttonDoor02', 'buttonRailing01', 'buttonStairs01'];
const list_meshMod = ['BoundaryWall', 'OpeningWall', 'PartitionWall', 'Window01', 'Window02', 'Door01', 'Door02', 'Door03', 'Railing01', 'Stairs01'];
var id_buttonPressed = 'buttonVolume';



// ====================================================
// 3JS Initialisation ★
// ====================================================

// SCENE
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xf5f9fd);
scene.fog = new THREE.Fog( scene.background, 1, 7000 );

// LIGHT

// HEMISPHERE LIGHT
var hemi_light = new THREE.HemisphereLight( 0xffffff, 0xb4b4b4, 1 ); //  skyColor, groundColor, intensity
hemi_light.position.set( 0, 0, 10 );
hemi_light.up.set( 0, 0, 0 );
scene.add( hemi_light );
    // hemi_light_helper = new THREE.HemisphereLightHelper( hemi_light, 1 );
    // scene.add( hemi_light_helper );

// DIRECTIONAL LIGHT 1
var dir_light1 = new THREE.DirectionalLight( 0xffffff, 0.2 ); // colour, intensity
dir_light1.position.set( 0, -7, 0 );
    // dir_light1.position.multiplyScalar( 1 );
scene.add( dir_light1 );
    // var dir_light1_helper = new THREE.DirectionalLightHelper( dir_light1, 1, 0xFF0000 );
    // scene.add( dir_light1_helper );

// DIRECTIONAL LIGHT 2
var dir_light2 = new THREE.DirectionalLight( 0xffffff, 0.2 ); // colour, intensity
dir_light2.position.set( 0, 7, 0 );
scene.add( dir_light2 );
    // var dir_light2_helper = new THREE.DirectionalLightHelper( dir_light2, 1, 0xFF0000 );
    // scene.add( dir_light2_helper ); 

// SHADOWS
    // ground.receiveShadow = true;
    // dir_light1.castShadow = true;
    // dir_light1.shadow.mapSize.width = 2048; dir_light1.shadow.mapSize.height = 2048;
    // dir_light1.shadow.camera.near = 1; dir_light1.shadow.camera.far = 3000; dir_light1.shadow.camera.left = -500; dir_light1.shadow.camera.bottom = -500; dir_light1.shadow.camera.top = 500; dir_light1.shadow.camera.right = 500;
    // dir_light1ShadowHeper = new THREE.CameraHelper( dir_light1.shadow.camera );
    // scene.add( dir_light1ShadowHeper );




// RENDER
const renderer = new THREE.WebGLRenderer( { antialias: true } );
renderer.setPixelRatio( container.devicePixelRatio ); // Sets device pixel ratio. This is usually used for HiDPI device to prevent bluring output canvas.
renderer.setSize( container.clientWidth, container.clientHeight ); //Resizes the output canvas to (width, height) with device pixel ratio taken into account, and also sets the viewport to fit that size, starting in (0, 0).
renderer.shadowMap.enabled = true; // Shadow maps are textures the shadows get drawn into.
renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap
container.appendChild( renderer.domElement ); // add render to container
setInterval(render, 20) // larger number will be faster but jerkier 16 to 17 ms is about 60fps, 33 to 34 is about 30 fps




// CAMERA
const camera_zoom = 60; const camera_shift_x = 2; const camera_shift_y = -1; 
const camera = new THREE.PerspectiveCamera( 25, container.clientWidth / container.clientHeight, 1, 10000  ); //FOV, aspect ratio, near, far of clipping plane
    // camera = new THREE.OrthographicCamera( -window.innerWidth/camera_zoom+camera_shift_x, window.innerWidth/camera_zoom+camera_shift_x,  window.innerHeight/camera_zoom+camera_shift_y,  -window.innerHeight/camera_zoom+camera_shift_y, -10000, 10000 ) //( left, right, top, bottom, near, far )
camera.position.set( 0, -60, 15 ); //( -13, -40, 48 )
camera.up.set( 0, 0, 1 ); //orientation of the camera. if camera. up. set(0,0,1) , it would mean that z-axis is going vertically up in the screen and x and y axes align accordingly.
camera.lookAt(10,10,10);
scene.add(camera)
    // var cameraHelper = new THREE.CameraHelper( camera );
    // scene.add( cameraHelper )
    // https://medium.com/geekculture/how-to-control-three-js-camera-like-a-pro-a8575a717a2

// ORBIT CONTROL
const controls = new OrbitControls( camera, renderer.domElement );
controls.target.set(0, 0, 3.5)
controls.update();

// MOUSE
var mouse = new THREE.Vector2();
var mouse_down = new THREE.Vector2();
var bool_render = false;
var bool_mouseMove = false;
var bool_mouseDown = false;






// RAYCASTER
const raycaster = new THREE.Raycaster(); // Raycasting is used for mouse picking (working out what objects in the 3d space the mouse is over) amongst other things.

// LOADERS
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.4.3/'); // Draco library static hosting
const loader = new GLTFLoader();
loader.setDRACOLoader(dracoLoader); // https://sbcode.net/threejs/loaders-draco/
const fontloader = new THREE.FontLoader();
var displayFont = new Promise(resolve => {
    fontloader.load('https://unpkg.com/three@0.119.1/examples/fonts/helvetiker_regular.typeface.json', loadedFont => resolve(loadedFont))
});
displayFont = await displayFont;


// EXPORTER
const gltfExporter = new GLTFExporter(); // https://threejs.org/docs/#examples/en/exporters/GLTFExporter



// ====================================================
// Materials
// ====================================================

// https://htmlcolorcodes.com/
// https://www.w3schools.com/colors/colors_names.asp


// POINT
const matAttrDot = new THREE.PointsMaterial( { size: 1, color: "pink"} );
const matAttrDot_Large = new THREE.PointsMaterial( { size: 2, color: "pink"} );
const matDot_Large = new THREE.PointsMaterial( { size: 1, color: "red"} );

// LINE
const matInvisibleLine = new THREE.LineBasicMaterial( {color: 0x000000, linewidth: 1, opacity: 0, transparent: true} );
const matDashedMajorLine = new THREE.LineDashedMaterial( { color: 0x0000ff, linewidth: 500, scale: 2, dashSize: 0.1, gapSize: 0.2 } );
const matDashedLine = new THREE.LineDashedMaterial( { color: 0x499eff, linewidth: 1, scale: 3, dashSize: 0.1, gapSize: 0.3} );
const matAttrLine = new THREE.LineBasicMaterial( { color: 0x0000ff } );
const matStairsLine = new THREE.LineBasicMaterial( {color: 0x0000ff, linewidth: 2} );

// TEXT
const matAttrText = new THREE.LineBasicMaterial( {color: 0x0000ff, linewidth: 1} );
const matText = new THREE.LineBasicMaterial( {color: 0x000000, linewidth: 1} );

// VOLUME
const matVolume = new THREE.MeshStandardMaterial({color: 'blue', opacity: 0.06, transparent: true});
const matVolumeTrans = new THREE.MeshStandardMaterial({color: 'burlywood', opacity: 0.4, transparent: true});
const matVolumeDel = new THREE.MeshStandardMaterial({color: 'white', opacity: 0.6, transparent: true});

const matFloorTrans = new THREE.MeshStandardMaterial({color: 'burlywood', opacity: 0.4, transparent: true});
const matFloorDel = new THREE.MeshStandardMaterial({color: 'white', opacity: 0.6, transparent: true});

const matCeilingTrans = new THREE.MeshStandardMaterial({color: 0xAB9F82, opacity: 0.9, transparent: true});

const matHybridTrans = new THREE.MeshStandardMaterial({color: 'green', opacity: 0.2, transparent: true});
const matBdyWallTrans = new THREE.MeshStandardMaterial({color: 'burlywood', opacity: 0.5, transparent: true});
const matBdyWallDel = new THREE.MeshStandardMaterial({color: 'red', opacity: 0.2, transparent: true});

const plaster = new THREE.MeshStandardMaterial({color: 0xe7e6e6});
const concrete = new THREE.MeshStandardMaterial({color: 0xb4b4b4, side: THREE.DoubleSide}) ;
const particleboard  = new THREE.MeshStandardMaterial({color: 0xddd1b4}); //0xD3C8AD, 0xAB9F82, 0xD3C8AD, 0xE5DCC7 //floor
const glass = new THREE.MeshStandardMaterial({color: 'turquoise', opacity: 0.1, transparent: true, side: THREE.DoubleSide});
const obs = new THREE.MeshStandardMaterial({color: 'burlywood', side: THREE.DoubleSide});	
const obsLight = new THREE.MeshStandardMaterial({color: 0xeccda0});
const aluminium = new THREE.MeshStandardMaterial({color: 'gainsboro'});
const rubber = new THREE.MeshStandardMaterial({color: 'black'});
const plywood = new THREE.MeshStandardMaterial({color: 0x424242}); //door
const clt = new THREE.MeshStandardMaterial({color: 'gainsboro'}); //door
const brass = new THREE.MeshStandardMaterial({color: 'gainsboro'}); //darkgoldenrod
const alloy = new THREE.MeshStandardMaterial({color: 'black'});

    // const ground_mat = new THREE.MeshStandardMaterial( { color: 'white' } )
    // const ground_mat = new THREE.MeshBasicMaterial( {color: 0x0000ffff, side: THREE.DoubleSide} );




// ====================================================
// Geometries ★
// ====================================================
// '''''' dimensions, geometries, initialisation


// __________________________
//    	　_ * VOLUME *
// ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾

// DIMENSIONS
const volume_width = 3.5; const volume_width_half = volume_width/2;
const volume_length = 3.5;
const volume_height = 3.5; const volume_height_half = 3.5/2;


// GEOMETRIES
const geomVolume = new THREE.BoxBufferGeometry( volume_width, volume_length, volume_height );
const geomVolumeBase = new THREE.PlaneGeometry( volume_width, volume_width); // width, height
const geomVolumeHover = new THREE.BoxBufferGeometry( volume_width, volume_length, volume_height );
const geomVolumeDel = new THREE.BoxBufferGeometry( volume_width * 1.1, volume_length* 1.1, volume_height * 1.1 );

const meshVolumeTrans = new THREE.Mesh( geomVolumeHover, matVolumeTrans );
meshVolumeTrans.visible = false;
const meshVolumeDel = new THREE.Mesh( geomVolumeDel, matVolumeDel );
meshVolumeDel.visible = false;
scene.add(meshVolumeTrans);
scene.add(meshVolumeDel);


// INITIALISATION 
var dictVolume = {}; // each key carries 2 value items: meshVolume, meshVolumeBase. i.e. (2) [Mesh, Mesh]
var dictPoints = {}; // each key carries 2 value items: point coordinates, point meshes. i.e. (2) [Vector3, Points]
var pos_meshVolume = null;
var bool_delVolume = false;
var cnt_meshVolume = 0;


// __________________________
//    	　_ * GROUND *
// ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾

const num_cells = 4; 
const ground_size = num_cells * volume_width;
const ground_geo = new THREE.PlaneBufferGeometry( ground_size, ground_size); // width, height
const ground = new THREE.Mesh( ground_geo, aluminium );
ground.position.set(0, 0, 0);
ground.visible = false;
ground.name = "ground"
scene.add( ground );

var groundHeight = 0
var storeyNum = 1

// __________________________
//    	　_ * GRID *
// ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
const dictGrid = {}

// GRID 1
var  Grid01 = null
loader.load( // Load a glTF resource
    'models/Grid01.gltf', // resource URL
    function ( gltf ) { // called when the resource is loaded
        Grid01 = gltf.scene;
        // Grid01.getObjectByName("line").material = matGrid;
        scene.add( Grid01 );
        dictGrid[1] = Grid01;
        Grid01.storey = storeyNum;
        Grid01.visibility = true;
    },
    function ( xhr ) { // called while loading is progressing
		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
	},
    function ( error ) { // called when loading has errors
        console.log( 'An error happened' );
    }
);

// GRID 2
var  Grid02 = null
loader.load( // Load a glTF resource
    'models/Grid02.gltf', // resource URL
    function ( gltf ) { // called when the resource is loaded
        Grid02 = gltf.scene;
        // Grid02.getObjectByName("line").material = matGrid;
        scene.add( Grid02 );
        dictGrid[2] = Grid02;
        Grid02.storey = storeyNum;
        Grid02.visibility = false;
    },
    function ( xhr ) { // called while loading is progressing
		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
	},
    function ( error ) { // called when loading has errors
        console.log( 'An error happened' );
    }
);

// GRID 3
var  Grid03 = null
loader.load( // Load a glTF resource
    'models/Grid03.gltf', // resource URL
    function ( gltf ) { // called when the resource is loaded
        Grid03 = gltf.scene;
        // Grid03.getObjectByName("line").material = matGrid;
        scene.add( Grid03 );
        dictGrid[3] = Grid03;
        Grid03.storey = storeyNum;
        Grid03.visibility = false;
    },
    function ( xhr ) { // called while loading is progressing
		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
	},
    function ( error ) { // called when loading has errors
        console.log( 'An error happened' );
    }
);

// GRID 4
var  Grid04 = null
loader.load( // Load a glTF resource
    'models/Grid04.gltf', // resource URL
    function ( gltf ) { // called when the resource is loaded
        Grid04 = gltf.scene;
        // Grid04.getObjectByName("line").material = matGrid;
        scene.add( Grid04 );
        dictGrid[4] = Grid04;
        Grid04.storey = storeyNum;
        Grid04.visibility = false;
    },
    function ( xhr ) { // called while loading is progressing
		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
	},
    function ( error ) { // called when loading has errors
        console.log( 'An error happened' );
    }
);


    /*

    // SCENE GRID
    const gridGround = new THREE.GridHelper( ground_size, num_cells, 0x504F4F, 0x504F4F );
    gridGround.rotation.x = Math.PI / 2;
    gridGround.position.x = 0;
    gridGround.position.y = 0;
    gridGround.position.z = ground.position.z; // -floor_thickness/2
    scene.add( gridGround );
        // var axesHelper = new THREE.AxesHelper( 600 );
        // scene.add( axesHelper )

    */

// __________________________
//    	　_ * CHASSIS *
// ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾

// GEOMETRIES
var  meshChassis = null
loader.load( // Load a glTF resource
    'models/Chassis.gltf', // resource URL
    function ( gltf ) { // called when the resource is loaded
        meshChassis = gltf.scene;
        meshChassis.getObjectByName("Frame").material = plaster;
        meshChassis.getObjectByName("Corridors").material = concrete;
        meshChassis.getObjectByName("Cores").material = plaster;
        meshChassis.getObjectByName("Texts").material = matText;
        scene.add( meshChassis );
        meshChassis.visible = false;
        /*
        meshChassis.traverse(function(child) { // returns all children of objects with a matching name.
            if (child.name === "ChassisUnit") {
              child.material = aluminium;
            }
        });
        */
    },
    function ( xhr ) { // called while loading is progressing
		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
	},
    function ( error ) { // called when loading has errors
        console.log( 'An error happened' );
    }
);

 
// __________________________
//    	　_ * NEIGHBOURS *
// ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾

const GrpMeshNeighbours = new THREE.Group();

//    	　_ * NEIGHBOUR01 *
// ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾

// GEOMETRIES
var  Neighbour01 = null
loader.load( // Load a glTF resource
    'models/Neighbour01.gltf', // resource URL
    function ( gltf ) { // called when the resource is loaded
        Neighbour01 = gltf.scene;
        Neighbour01.name = "Neighbour01";
        // scene.add( Neighbour01 );
        // Neighbour01.visible = false;
        addNeighbourtoGroup(Neighbour01);
    },
    function ( xhr ) { // called while loading is progressing
		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
	},
    function ( error ) { // called when loading has errors
        console.log( 'An error happened' );
    }
);

//    	　_ * NEIGHBOUR02 *
// ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾

// GEOMETRIES
var  Neighbour02 = null
loader.load( // Load a glTF resource
    'models/Neighbour02.gltf', // resource URL
    function ( gltf ) { // called when the resource is loaded
        Neighbour02 = gltf.scene;
        Neighbour02.name = "Neighbour02";
        // scene.add( Neighbour02 );
        // Neighbour02.visible = false;
        addNeighbourtoGroup(Neighbour02)    
        /*
        setOpacity( Neighbour02, 0.5 );
        function setOpacity( obj, opacity ) {
          obj.children.forEach((child)=>{
            setOpacity( child, opacity );
          });
          if ( obj.material ) {
            obj.material.opacity = opacity ;
          }
        };

        Neighbour02.traverse(function(child) { // returns all children of objects with a matching name.
            setOpacity( child, 0.1 );
            function setOpacity( obj, opacity ) {
              obj.children.forEach((child)=>{
                setOpacity( child, opacity );
              });
              if ( obj.material ) {
                obj.material.opacity = opacity ;
              }
            }; 
        });

        Neighbour02.traverse(function(child) { // returns all children of objects with a matching name.
            child.material = concrete;
        });

        */
    },
    function ( xhr ) { // called while loading is progressing
		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
	},
    function ( error ) { // called when loading has errors
        console.log( 'An error happened' );
    }
);


//    	　_ * NEIGHBOUR03 *
// ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾

// GEOMETRIES
var  Neighbour03 = null
loader.load( // Load a glTF resource
    'models/Neighbour03.gltf', // resource URL
    function ( gltf ) { // called when the resource is loaded
        Neighbour03 = gltf.scene;
        Neighbour03.name = "Neighbour03";
        // scene.add( Neighbour03 );
        // Neighbour03.visible = false;
        addNeighbourtoGroup(Neighbour03);
    },
    function ( xhr ) { // called while loading is progressing
		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
	},
    function ( error ) { // called when loading has errors
        console.log( 'An error happened' );
    }
);

//    	　_ * NEIGHBOUR04 *
// ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾

// GEOMETRIES
var  Neighbour04 = null
loader.load( // Load a glTF resource
    'models/Neighbour04.gltf', // resource URL
    function ( gltf ) { // called when the resource is loaded
        Neighbour04 = gltf.scene;
        Neighbour04.name = "Neighbour04";
        // scene.add( Neighbour04 );
        // Neighbour04.visible = false;
        addNeighbourtoGroup(Neighbour04);
    },
    function ( xhr ) { // called while loading is progressing
		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
	},
    function ( error ) { // called when loading has errors
        console.log( 'An error happened' );
    }
);

GrpMeshNeighbours.name = "GrpMeshNeighbours"
scene.add(GrpMeshNeighbours)
GrpMeshNeighbours.visible = false;

// __________________________
//    	　_ * FLOOR *
// ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾

//    	　_ * FLOOR GROUP *
// ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾

// DIMENSIONS
const floor_width = 3.5; const floor_width_half = floor_width/2;
const floor_length = 3.5;
const floor_thickness = 0.7; const floor_thickness_half = floor_thickness/2;

// GEOMETRIES
const geomFloor = new THREE.BoxBufferGeometry( floor_width, floor_length, floor_thickness );

const geomFloorHover = new THREE.BoxBufferGeometry( floor_width * 1, floor_length* 1, floor_thickness * 1 );
const meshFloorTrans = new THREE.Mesh( geomFloorHover, matFloorTrans );
meshFloorTrans.visible = false;
scene.add(meshFloorTrans);

const geomFloorDel = new THREE.BoxBufferGeometry( floor_width * 1.1, floor_length* 1.1, floor_thickness * 1.1 );
const meshFloorDel = new THREE.Mesh( geomFloorDel, matFloorDel );
meshFloorDel.visible = false;
scene.add(meshFloorDel);

// INITIALISATION 
var dictFloor = {};
var pos_grpFloor = null;
var bool_delFloor = false;
var cnt_grpFloor = 0;


//    	　_ * FLOOR FRACTION *
// ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾

// DIMENSIONS
const FloorFrac_width = truncNumTo3dp(floor_width/3); const FloorFrac_width_half = FloorFrac_width/2;
const FloorFrac_length = truncNumTo3dp(floor_length/3);

// GEOMETRIES
const geomFloorFrac = new THREE.BoxBufferGeometry( FloorFrac_width, FloorFrac_length, floor_thickness );
const meshFloorFrac = new THREE.Mesh(geomFloorFrac, particleboard);

const geomFloorFracHover = new THREE.BoxBufferGeometry( FloorFrac_width * 1, FloorFrac_length* 1, floor_thickness * 1 );
const meshFloorFracTrans = new THREE.Mesh( geomFloorFracHover, matFloorTrans );
meshFloorFracTrans.visible = false;
scene.add(meshFloorFracTrans);

const geomFloorFracDel = new THREE.BoxBufferGeometry( FloorFrac_width * 1.1, FloorFrac_length* 1.1, floor_thickness * 1.1 );
const meshFloorFracDel = new THREE.Mesh( geomFloorFracDel, matFloorDel );
meshFloorFracDel.visible = false;
scene.add(meshFloorFracDel);

// INITIALISATION 
var dictFloorFrac = {};
var pos_FloorFrac = null;
var bool_delFloorFrac = false;


// __________________________
//    	　_ * CEILING *
// ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾

// DIMENSIONS
const ceiling_width = floor_width; const ceiling_width_half = ceiling_width/2;
const ceiling_length = floor_length;
const ceiling_thickness = 0.10; const ceiling_thickness_half = ceiling_thickness/2;
const overlapOffset = 0.001;

// GEOMETRIES
const geomCeiling = new THREE.BoxBufferGeometry( ceiling_width, ceiling_length, ceiling_thickness );

const geomCeilingHover = new THREE.BoxBufferGeometry( ceiling_width * 1, ceiling_length* 1, ceiling_thickness * 1 );
const meshCeilingTrans = new THREE.Mesh( geomCeilingHover, matFloorTrans );
meshCeilingTrans.visible = false;
scene.add(meshCeilingTrans);

const geomCeilingDel = new THREE.BoxBufferGeometry( ceiling_width * 1.1, ceiling_length* 1.1, ceiling_thickness * 1.01 );
const meshCeilingDel = new THREE.Mesh( geomCeilingDel, matFloorDel );
meshCeilingDel.visible = false;
scene.add(meshCeilingDel);

// INITIALISATION 
var dictCeiling = {};
var pos_grpCeiling = null;
var bool_delCeiling = false;
var cnt_grpCeiling = 0;

//    	　_ * CEILING FRACTION *
// ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾

// DIMENSIONS
const CeilingFrac_width = truncNumTo3dp(ceiling_width/3); const CeilingFrac_width_half = CeilingFrac_width/2;
const CeilingFrac_length = truncNumTo3dp(ceiling_length/3);

// GEOMETRIES
const geomCeilingFrac = new THREE.BoxBufferGeometry( CeilingFrac_width, CeilingFrac_length, ceiling_thickness );
const meshCeilingFrac = new THREE.Mesh(geomCeilingFrac, obs);

const geomCeilingFracHover = new THREE.BoxBufferGeometry( CeilingFrac_width * 1, CeilingFrac_length* 1, ceiling_thickness * 1 );
const meshCeilingFracTrans = new THREE.Mesh( geomCeilingFracHover, matFloorTrans );
meshCeilingFracTrans.visible = false;
scene.add(meshCeilingFracTrans);

const geomCeilingFracDel = new THREE.BoxBufferGeometry( CeilingFrac_width * 1.1, CeilingFrac_length* 1.1, ceiling_thickness * 1.1 );
const meshCeilingFracDel = new THREE.Mesh( geomCeilingFracDel, matFloorDel );
meshCeilingFracDel.visible = false;
scene.add(meshCeilingFracDel);

// INITIALISATION 
var dictCeilingFrac = {};
var pos_CeilingFrac = null;
var bool_delCeilingFrac = false;



// __________________________
//    	　_ * BOUNDARY WALL *
// ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾

// DIMENSIONS
const BdyWall_width = round((3.5/3),7); const BdyWall_width_half = BdyWall_width / 2;
const BdyWall_height = 3.5; const BdyWall_height_half = BdyWall_height / 2;
const BdyWall_thickness = 0.15;

// GEOMETRIES
const geomBdyWall = new THREE.BoxBufferGeometry( BdyWall_width, BdyWall_thickness, BdyWall_height );
const geomBdyWallHover = new THREE.BoxBufferGeometry( BdyWall_width * 1, BdyWall_thickness* 2, BdyWall_height * 1 );
const geomBdyWallDel = new THREE.BoxBufferGeometry( BdyWall_width * 1.1, BdyWall_thickness* 3, BdyWall_height * 1.1 );
const meshBdyWallTrans = new THREE.Mesh( geomBdyWallHover, matBdyWallTrans );
meshBdyWallTrans.visible = false;
    // meshBdyWallTrans.castShadow = false;
    // meshBdyWallTrans.receiveShadow = false;
const meshBdyWallDel = new THREE.Mesh( geomBdyWallDel, matBdyWallDel );
meshBdyWallDel.visible = false;
    // meshBdyWallDel.castShadow = false;
    // meshBdyWallDel.receiveShadow = false;
scene.add(meshBdyWallTrans);
scene.add(meshBdyWallDel);

const offsetValue_BdyWall = BdyWall_thickness/2 - 0.01;


// INITIALISATION 
var dictBdyWall = {};
var pos_meshBdyWall = null;
var bool_delBdyWall = false;
var cnt_meshBdyWall = 0;
var angle_meshBdyWall = 0;

// __________________________
//    	　_ * OPENING WALL *
// ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾

var dictOpeningWall = {};
const tol_betweenOpeningtoBdyMesh = 0.13 // tolerance
const tol_betweenOpeningtoPartMesh = 0.07 // tolerance


// __________________________
//    	　_ * PARTITION WALL *
// ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾

// DIMENSIONS
const PartWall_height = 3.5; const PartWall_height_half = PartWall_height / 2;
const PartWall_width = BdyWall_width; const PartWall_width_half = PartWall_width / 2;
const PartWall_thickness = 0.15;

// GEOMETRIES
const geomPartWall = new THREE.BoxBufferGeometry( PartWall_width, PartWall_thickness, PartWall_height );
const geomPartWallHover = new THREE.BoxBufferGeometry( PartWall_width * 1, PartWall_thickness* 2, PartWall_height * 1 );
const geomPartWallDel = new THREE.BoxBufferGeometry( PartWall_width * 1.1, PartWall_thickness* 3, PartWall_height * 1.1 );

const meshPartWallTrans = new THREE.Mesh( geomPartWallHover, matBdyWallTrans );
meshPartWallTrans.visible = false;
const meshPartWallDel = new THREE.Mesh( geomPartWallDel, matBdyWallDel );
meshPartWallDel.visible = false;

scene.add(meshPartWallTrans);
scene.add(meshPartWallDel);

// INITIALISATION 
var dictPartWall = {};
var pos_meshPartWall = null;
var bool_delPartWall = false;
var cnt_meshPartWall = 0;
var angle_meshPartWall = 0;


// __________________________
//    	　_ * WINDOW01 *
// ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾

// DIMENSIONS
const Window01_width = 3.5; const Window01_width_half = Window01_width / 2;
const Window01_height = 3.5; const Window01_height_half = Window01_height / 2;
const Window01_thickness = 0.5;

// GEOMETRIES
const geomWindow01Hover = geomBdyWallHover;
const geomWindow01Del = geomBdyWallDel;
const meshWindow01Trans = new THREE.Mesh( geomWindow01Hover, matHybridTrans );
meshWindow01Trans.visible = false;
const meshWindow01Del = new THREE.Mesh( geomWindow01Del, matBdyWallDel );
meshWindow01Del.visible = false;

scene.add(meshWindow01Trans);
scene.add(meshWindow01Del);


var  meshWindow01 = null
loader.load( // Load a glTF resource
    'models/Window01.gltf', // resource URL
    function ( gltf ) { // called when the resource is loaded
        meshWindow01 = gltf.scene;
        meshWindow01.getObjectByName("Glass").material = glass;
        meshWindow01.getObjectByName("WindowFrame").material = aluminium;
        meshWindow01.getObjectByName("WindowSeal").material = rubber;
        meshWindow01.getObjectByName("SIP").material = obs;
        // var meshWindow01 = gltf.scene.children[4];
        // meshWindow01.getObjectByName("Window01R001").children.material = new THREE.MeshStandardMaterial( {color: 'burlywood'});
        // meshWindow01.getObjectById("LowpolyBlood_Bake_Blood_0.001").material.color.set( _some_color_ )
        // console.log(meshWindow01.getObjectByName("mesh_36").material)
        // console.log(meshWindow01.getObjectByProperty(uuid,  "E01E399B-7EDF-4712-8FD5-574EEE30DF2B" ) )
        // console.log(meshWindow01.getObjectByName("Window01R001").children.material)
},
    function ( xhr ) { // called while loading is progressing
		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
	},
    function ( error ) { // called when loading has errors
        console.log( 'An error happened' );
    }
);

// INITIALISATION 
var dictWindow01 = {};
var pos_grpWindow01 = null;
var bool_delWindow01 = false;
var cnt_grpWindow01 = 0;
var angle_grpWindow01 = 0;


// __________________________
//    	　_ * WINDOW02 *
// ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾

// DIMENSIONS
const Window02_width = 3.5; const Window02_width_half = Window02_width / 2;
const Window02_height = 3.5; const Window02_height_half = Window02_height / 2;
const Window02_thickness = 0.5;

const meshWindow02Trans = new THREE.Mesh( geomWindow01Hover, matHybridTrans );
meshWindow02Trans.visible = false;
const meshWindow02Del = new THREE.Mesh( geomWindow01Del, matBdyWallDel );
meshWindow02Del.visible = false;

scene.add(meshWindow02Trans);
scene.add(meshWindow02Del);

// GEOMETRIES
var  grpWindow02 = null
loader.load( // Load a glTF resource
    'models/Window02.gltf', // resource URL
    function ( gltf ) { // called when the resource is loaded
        grpWindow02 = gltf.scene;
        grpWindow02.getObjectByName("SIP").material = obs;
        grpWindow02.getObjectByName("Glass").material = glass;
        grpWindow02.getObjectByName("WindowFrame").material = aluminium;
        grpWindow02.getObjectByName("WindowCasement").material = aluminium;
        grpWindow02.getObjectByName("WindowHandle").material = brass;
    },
    function ( xhr ) { // called while loading is progressing
		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
	},
    function ( error ) { // called when loading has errors
        console.log( 'An error happened' );
    }
);

// INITIALISATION
var dictWindow02 = {};
var pos_grpWindow02 = null;
var bool_delWindow02 = false;
var cnt_grpWindow02 = 0;
var angle_grpWindow02 = 0;


// __________________________
//    	　_ * DOOR01 *
// ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾

// DIMENSIONS
const Door01_width = 3.5; const Door01_width_half = Door01_width / 2;
const Door01_height = 3.5; const Door01_height_half = Door01_height / 2;
const Door01_thickness = 0.5;

// GEOMETRIES
const geomDoor01Hover = geomBdyWallHover;
const geomDoor01Del = geomBdyWallDel;

const meshDoor01Trans = new THREE.Mesh( geomDoor01Hover, matHybridTrans );
meshDoor01Trans.visible = false;
const meshDoor01Del = new THREE.Mesh( geomDoor01Del, matBdyWallDel );
meshDoor01Del.visible = false;

scene.add(meshDoor01Trans);
scene.add(meshDoor01Del);


var  meshDoor01 = null
loader.load( // Load a glTF resource
    'models/Door01.gltf', // resource URL
    function ( gltf ) { // called when the resource is loaded
        meshDoor01 = gltf.scene;
        meshDoor01.getObjectByName("Door").material = plywood;
        meshDoor01.getObjectByName("DoorFrame").material = clt;
        meshDoor01.getObjectByName("DoorHandle").material = brass;
        meshDoor01.getObjectByName("SIP").material = obs;
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


// __________________________
//    	　_ * DOOR02 *
// ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾

// DIMENSIONS
const Door02_width = 3.5; const Door02_width_half = Door02_width / 2;
const Door02_height = 3.5; const Door02_height_half = Door02_height / 2;
const Door02_thickness = 0.5;

const meshDoor02Trans = new THREE.Mesh( geomDoor01Hover, matHybridTrans );
meshDoor02Trans.visible = false;
const meshDoor02Del = new THREE.Mesh( geomDoor01Del, matBdyWallDel );
meshDoor02Del.visible = false;

scene.add(meshDoor02Trans);
scene.add(meshDoor02Del);

// GEOMETRIES
var  meshDoor02 = null
loader.load( // Load a glTF resource
    'models/Door02.gltf', // resource URL
    function ( gltf ) { // called when the resource is loaded
        meshDoor02 = gltf.scene;
        meshDoor02.getObjectByName("SIP").material = obs;
        meshDoor02.getObjectByName("Glass").material = glass;
        meshDoor02.getObjectByName("Door").material = plywood;
        meshDoor02.getObjectByName("DoorFrame").material = clt;
        meshDoor02.getObjectByName("DoorHandle").material = brass;
    },
    function ( xhr ) { // called while loading is progressing
		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
	},
    function ( error ) { // called when loading has errors
        console.log( 'An error happened' );
    }
);

// INITIALISATION
var dictDoor02 = {};
var pos_grpDoor02 = null;
var bool_delDoor02 = false;
var cnt_grpDoor02 = 0;
var angle_grpDoor02 = 0;


// __________________________
//    	　_ * DOOR03 *
// ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾

// DIMENSIONS
const Door03_width = PartWall_width*3; const Door03_width_half = Door03_width / 2;
const Door03_height = 3.5; const Door03_height_half = Door03_height / 2;
const Door03_thickness = 0.5;

const geomDoor03Hover = new THREE.BoxBufferGeometry( Door03_width * 1, BdyWall_thickness* 2, BdyWall_height * 1 );
const geomDoor03Del = new THREE.BoxBufferGeometry( Door03_width * 1.1, BdyWall_thickness* 3, BdyWall_height * 1.1 );

const meshDoor03Trans = new THREE.Mesh( geomDoor03Hover, matHybridTrans );
meshDoor03Trans.visible = false;
const meshDoor03Del = new THREE.Mesh( geomDoor03Del, matBdyWallDel );
meshDoor03Del.visible = false;

scene.add(meshDoor03Trans);
scene.add(meshDoor03Del);

// GEOMETRIES
var  meshDoor03 = null
loader.load( // Load a glTF resource
    'models/Door03.gltf', // resource URL
    function ( gltf ) { // called when the resource is loaded
        meshDoor03 = gltf.scene;
        meshDoor03.getObjectByName("SIP").material = obs;
        meshDoor03.getObjectByName("Glass").material = glass;
        meshDoor03.getObjectByName("WindowFrame").material = aluminium;
        meshDoor03.getObjectByName("WindowCasement").material = alloy;
        meshDoor03.getObjectByName("SlidingDoorHandle").material = brass;
    },
    function ( xhr ) { // called while loading is progressing
		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
	},
    function ( error ) { // called when loading has errors
        console.log( 'An error happened' );
    }
);

// INITIALISATION
var dictDoor03 = {};
var pos_grpDoor03 = null;
var bool_delDoor03 = false;
var cnt_grpDoor03 = 0;
var angle_grpDoor03 = 0;


// __________________________
//    	　_ * RAILING01 *
// ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾

// DIMENSIONS
const Railing01_width = 3.5; const Railing01_width_half = Railing01_width / 2;
const Railing01_height = 3.5; const Railing01_height_half = Railing01_height / 2;
const Railing01_thickness = 0.5;

// GEOMETRIES
const geomRailing01Hover = geomBdyWallHover
const geomRailing01Del = geomBdyWallDel
const meshRailing01Trans = new THREE.Mesh( geomRailing01Hover, matHybridTrans );
meshRailing01Trans.visible = false;
const meshRailing01Del = new THREE.Mesh( geomRailing01Del, matBdyWallDel );
meshRailing01Del.visible = false;

scene.add(meshRailing01Trans);
scene.add(meshRailing01Del);


var  meshRailing01 = null
loader.load( // Load a glTF resource
    'models/Railing01.gltf', // resource URL
    function ( gltf ) { // called when the resource is loaded
        meshRailing01 = gltf.scene;
        meshRailing01.getObjectByName("SIP").material = obs;
        meshRailing01.getObjectByName("Railing").material = alloy;
    },
    function ( xhr ) { // called while loading is progressing
		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
	},
    function ( error ) { // called when loading has errors
        console.log( 'An error happened' );
    }
);

// INITIALISATION
var dictRailing01 = {};
var pos_grpRailing01 = null;
var bool_delRailing01 = false;
var cnt_grpRailing01 = 0;
var angle_grpRailing01 = 0;


// __________________________
//    	　_ * STAIRS01 *
// ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾

// DIMENSIONS
const Stairs01_width = truncNumTo3dp(3.5/3*2); const Stairs01_width_half = Stairs01_width / 2; //0.583
const Stairs01_height = volume_height+floor_thickness; const Stairs01_height_half = Stairs01_height / 2;
const Stairs01_thickness = Stairs01_width; const Stairs01_thickness_half = Stairs01_thickness / 2; 

// GEOMETRIES
const pt_axis = dispDotsfromCoords(matAttrDot, [ new THREE.Vector3(0,0,0)] )

const geomStairs01Hover = new THREE.BoxBufferGeometry( Stairs01_width * 1, Stairs01_thickness* 1, Stairs01_height * 1 );
const meshStairs01Trans = new THREE.Mesh( geomStairs01Hover, matHybridTrans );
meshStairs01Trans.position.set( -Stairs01_width_half+ floor_width/6, Stairs01_thickness_half- floor_width/6, Stairs01_height_half );

const points = [];
points.push( new THREE.Vector3( floor_width/6, 0.05, 0 ) );
points.push( new THREE.Vector3( -1, 0.05, 1.9 ) );
points.push( new THREE.Vector3( -1, floor_width_half-0.5, 2.3 ) );
points.push( new THREE.Vector3( floor_width/6, floor_width_half-0.5, (volume_height+floor_thickness) ) ); //3.5+0.7 = 4.2
const geometry = new THREE.BufferGeometry().setFromPoints( points );
const testLine = new THREE.Line( geometry, matStairsLine );

const GrpStairs01Trans = new THREE.Group();
GrpStairs01Trans.add( meshStairs01Trans, pt_axis, testLine );
scene.add(GrpStairs01Trans)
GrpStairs01Trans.visible = false;

// const geomStairs01Del = new THREE.BoxBufferGeometry( Stairs01_width * 1.1, Stairs01_thickness* 3, Stairs01_height * 1.1 );
const meshStairs01Del = new THREE.Mesh( geomStairs01Hover, matBdyWallDel );
meshStairs01Del.position.set( -Stairs01_width_half+ floor_width/6, Stairs01_thickness_half- floor_width/6, Stairs01_height_half );
const GrpStairs01Del = new THREE.Group();
GrpStairs01Del.add( meshStairs01Del, pt_axis );

scene.add(GrpStairs01Del)
GrpStairs01Del.visible = false;



var  meshStairs01 = null
loader.load( // Load a glTF resource
    'models/Stairs01.gltf', // resource URL
    function ( gltf ) { // called when the resource is loaded
        meshStairs01 = gltf.scene;
        meshStairs01.getObjectByName("Riser").material = clt;
        meshStairs01.getObjectByName("Tread").material = obsLight;
        meshStairs01.getObjectByName("Baluster").material = alloy;
    },
    function ( xhr ) { // called while loading is progressing
		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
	},
    function ( error ) { // called when loading has errors
        console.log( 'An error happened' );
    }
);

// INITIALISATION
var dictStairs01 = {};
var pos_grpStairs01 = null;
var bool_delStairs01 = false;
var cnt_grpStairs01 = 0;
var angle_grpStairs01 = 0;
var scale_grpStairs01 = new THREE.Vector3(-1, 1, 1)


// __________________________
//    	　_ * ATTRIBUTE LINES *
// ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾

// GEOMETRIES
const offsetHeight_AttrLine_fromFloorPos = new THREE.Vector3( 0, 0, floor_thickness_half);
const offsetHeight_AttrLine_fromVolPos = -volume_height_half + floor_thickness;
const offsetHeight_meshPartWall_fromAttrLine = new THREE.Vector3(0, 0, PartWall_height_half - floor_thickness);
const offsetHeight_posVerMod_fromFloorPos = BdyWall_height_half - floor_thickness_half;
const offsetHeight_posVerMod_fromAttLine = BdyWall_height_half - floor_thickness;


const offsetValue_hor_PartWall = new THREE.Vector3( PartWall_width, 0, 0); 
const offsetValue_ver_PartWall = new THREE.Vector3( 0, PartWall_width, 0); 
const offsetValue_hor_BdyWall = new THREE.Vector3( PartWall_width_half, 0, 0); 

const num_div_row_onFloor = floor_width / PartWall_width;
const num_div_onFloor = num_div_row_onFloor * num_div_row_onFloor;

var zpos_AttrLine = floor_thickness + groundHeight;

const hideAttrLine = false; // false: hide, true: show
const offsetHeight_AttrLineDisp_AttrLine = new THREE.Vector3( 0, 0, 0.01);

// INITIALISATION
var dictAttrLine = {};
var dictTextMesh = {};
var pos_grpAttrLine = null;
var bool_delAttrLine = false;
var cnt_grpAttrLine = 0;
var angle_grpAttrLine = 0;

// GEOMETRIES
const top_left_corner = new THREE.Vector3( -volume_width*2, volume_width*2, floor_thickness );
    // dispDotsfromCoords (matAttrDot_Large, [top_left_corner]); // Display Starting Point
/*
posaddAttrLine_availBdy ( // Add Attribute line
    top_left_corner,
    ['R', 'corridor'],
    ['R', 'corridor'],
    ['R', 'corridor'],
    ['R', 'corridor'],

    ['D', 'neighbour'],
    ['D', 'neighbour'],
    ['D', 'neighbour'],
    ['D', 'neighbour'],
    
    ['L', 'buildingedge'],
    ['L', 'buildingedge'],
    ['L', 'buildingedge'],
    ['L', 'buildingedge'],

    ['U', 'neighbour'],
    ['U', 'neighbour'],
    ['U', 'neighbour'],
    ['U', 'neighbour'],
);
*/

// __________________________
//    	　_ * TEST *
// ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
/*
loader.load( // Load a glTF resource
    'models_usabilitytesting/4_nienzhen_ceilingless.gltf', // resource URL
    function ( gltf ) { // called when the resource is loaded
        scene.add( gltf.scene );
    },
    function ( xhr ) { // called while loading is progressing
		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
	},
    function ( error ) { // called when loading has errors
        console.log( 'An error happened' );
    }
);
*/


// EXECUTE FUNCTIONS
const dictAll = [dictVolume, dictAttrLine, dictTextMesh, dictFloor, dictBdyWall, dictOpeningWall, dictPartWall, dictWindow01, dictWindow02, dictDoor01, dictDoor02, dictDoor03, dictRailing01, dictStairs01];
    // dictGrid, , dictCeiling
const list_dictInterior = [dictOpeningWall, dictPartWall, dictWindow01, dictWindow02, dictDoor01, dictDoor02, dictDoor03, dictRailing01, dictStairs01];
const list_dictVertSIP = [dictBdyWall, dictOpeningWall, dictPartWall, dictAttrLine];
const list_dictHybrid = [dictWindow01, dictWindow02, dictDoor01, dictDoor02, dictDoor03, dictRailing01, dictStairs01];

const list_Bdy = [ dictBdyWall, dictWindow01, dictWindow02, dictDoor01, dictDoor02, dictDoor03, dictRailing01 ]
const list_Part = [ dictPartWall, dictWindow01, dictWindow02, dictDoor01, dictDoor02, dictDoor03, dictRailing01 ]

const list_dictVert = [dictBdyWall, dictPartWall, dictOpeningWall, dictWindow01, dictWindow02, dictDoor01, dictDoor02, dictDoor03, dictRailing01]

const tol_01 = 0.01 // spacing between 2 vertical mesh = tol_01 + PartWall_width

var meshFloorZone;
animate();


//////////////////// -------------MAIN FUNCTIONS------------------------------------------------------ //////////////////// 

// ====================================================
// { Scene Animation Loop } ★
// ====================================================
// ''''''  Display of Hover and Del geometries

// This will create a loop that causes the renderer to draw the scene every time the screen is refreshed (on a typical screen this means 60 times per second).
function animate() {
    requestAnimationFrame( animate );
    bool_render = true;
    // render();
}

function render() {
    changeGroundHeight();
    toggleDisp_Grid();
    eyeIconStoreyTgl();

    hideHelper();
    if (!bool_render ) { return;}
    bool_render = false;
    bool_mouseDown = false;
    bool_mouseMove = false;

    if (bool_mouseDown) {
        renderer.render( scene, camera ); // render the scene
        return;
    }

    if (bool_mouseMove) {
        renderer.render( scene, camera ); // render the scene
        return;
    }

    // __________________________
    //    	　_ * VOLUME *
    // ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
    if ( id_buttonPressed == 'buttonVolume' ) {

        raycaster.setFromCamera( mouse, camera ); // create a ray from the camera and intersect it with objects in the scene
        var list_meshScene = []; // get the meshes in the scene to check for intersections
        Object.values(dictVolume).forEach(i => {
            if (i.storey == storeyNum) {
                list_meshScene = list_meshScene.concat(i.children[1])
            }
        })
        list_meshScene.push(ground);
        const list_meshInt = raycaster.intersectObjects( list_meshScene ); // returns an array of cursor-intersected items, e.g. (3) [{…}, {…}, {…}] 
        const meshInt0 = list_meshInt[ 0 ]; // get the first mesh that the cursor intersects e.g. {distance: 29.318, point: Vector3, object: Mesh, face: Face3, faceIndex: 5}

        reinstate_mods('volume','floor'); // if do not intersect with anything, show nothing
        
        if ( list_meshInt.length > 0 ) { // if intersect with any meshes

            if (meshInt0.object.name == 'volume_base' ) { //if the first mesh that the cursor intersects has the name " "
                
                if (!bool_delVolume) { // if shift button is not pressed, show nothing
                    meshVolumeTrans.visible = false;
                    meshVolumeDel.visible = false;
                    pos_meshVolume = null;
                }
                else { // if shift button is pressed, show geom_trans_del
                    const cen_meshInt0 = meshInt0.object.position; // centre of the first mesh that the cursor intersects, e.g. Vector3 {x: -1.5, y: 3, z: 0.25}
                    pos_meshVolume = new THREE.Vector3(cen_meshInt0.x, cen_meshInt0.y, cen_meshInt0.z + volume_height/2); // update global variable _pos, e.g. Vector3 {x: -1.5, y: 3, z: 0.25}
    
                    meshVolumeDel.position.set(pos_meshVolume.x, pos_meshVolume.y, pos_meshVolume.z);
                    meshVolumeDel.visible = true;
                    meshVolumeTrans.visible = false;
                } 

            } 
            
            else if (meshInt0.object.name == 'ground') { //if the first mesh that the cursor intersects does not has the name " ", i.e. intersect with ground
                
                if (!bool_delVolume) { // if shift button is not pressed, update pos and show geom_trans 
                    pos_meshVolume = new THREE.Vector3();
                    if (num_cells % 2 == 1) {// odd number of cells
                        pos_meshVolume.x = Math.round(meshInt0.point.x / volume_width) * volume_width;
                        pos_meshVolume.y = Math.round((meshInt0.point.y) / volume_width ) * volume_width;
                    } else { // even number of cells
                        pos_meshVolume.x = Math.round((meshInt0.point.x + volume_width_half) / volume_width) * volume_width - volume_width_half;
                        pos_meshVolume.y = Math.round((meshInt0.point.y + volume_width_half) / volume_width) * volume_width - volume_width_half;
                    }
                    pos_meshVolume.z = groundHeight + volume_height/2 ; // move volume up to align it with grid
                    meshVolumeTrans.position.set(pos_meshVolume.x, pos_meshVolume.y, pos_meshVolume.z);
                    meshVolumeDel.visible = false;
                    meshVolumeTrans.visible = true;
                }
            }    

        } 
   }
   // __________________________
    //    	　_ * FLOOR *
    // ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
    if ( id_buttonPressed == 'buttonFloor' ) {
        raycaster.setFromCamera( mouse, camera ); // create a ray from the camera and intersect it with objects in the scene
        const list_meshScene = getMeshInScene(); // get the meshes in the scene to check for intersections
        pushMergedFloorMesh (list_meshScene);
        const list_meshInt = raycaster.intersectObjects( list_meshScene ); // returns an array of cursor-intersected items, e.g. (3) [{…}, {…}, {…}] 
        const meshInt0 = list_meshInt[ 0 ]; // get the first mesh that the cursor intersects e.g. {distance: 29.318, point: Vector3, object: Mesh, face: Face3, faceIndex: 5}

        reinstate_mods('volume', 'floor', 'floor_fraction'); // if do not intersect with anything, show nothing

        if ( list_meshInt.length > 0 ) { // if intersect with any meshes

            const pos_mouse = meshInt0.point;
            const bool_meshIntIsOnCurrentStorey = (groundHeight - volume_height_half) < pos_mouse.z && pos_mouse.z <= (groundHeight + volume_height_half)
                // console.log( groundHeight - volume_height_half, groundHeight + volume_height_half )
             
            // if (bool_meshIntIsOnCurrentStorey) { // if intersected on 'Floor_Zone' on the current storey


                if (meshInt0.object.parent.name == 'floor') { //if the first mesh that the cursor intersects has the name " "
                    // const cen_meshInt0 = meshInt0.object.position; // centre of the first mesh that the cursor intersects, e.g. Vector3 {x: -1.5, y: 3, z: 0.25}
                    // pos_grpFloor = new THREE.Vector3(cen_meshInt0.x, cen_meshInt0.y, cen_meshInt0.z); // update global variable _pos, e.g. Vector3 {x: -1.5, y: 3, z: 0.25}
                    pos_grpFloor = posfromKey( meshInt0.object.parent.key );
                    // console.log(meshInt0.object, pos_grpFloor)
                    if (!bool_delFloor) { // if shift button is not pressed, update trans pos and show geom_trans 
                        // orientHorizMeshToFaceOfIntMesh( meshInt0, pos_grpFloor, meshFloorTrans, meshFloorDel );
                    }

                    else { // if shift button is pressed, show geom_trans_del
                        meshFloorDel.position.set(pos_grpFloor.x, pos_grpFloor.y, pos_grpFloor.z);
                        meshFloorDel.visible = true;
                        meshFloorTrans.visible = false;
                    } 

                } else if ( meshInt0.object.name == 'Floor_Zone' ) { //if the first mesh that the cursor intersects does not has the name " ", i.e. intersect with ground

                    if (!bool_delFloor) {//if shift button is not pressed, update pos and show geom_trans

                            pos_grpFloor = getPos_grpFloor_MathGrid ( pos_mouse ); // gives pos_grpFloor
                            const key = keyGen(pos_grpFloor);

                            if ( dictFloor[key]==undefined ) { // if groupFloor key does not exist, add Floor Frac

                                meshFloorTrans.position.set(pos_grpFloor.x, pos_grpFloor.y, pos_grpFloor.z);
                                meshFloorDel.visible = false;
                                meshFloorTrans.visible = true;

                            }
                    }
                } 

            // }
   

        } 
   }


    // __________________________
    //    	　_ * FLOOR FRACTION *
    // ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
    if ( id_buttonPressed == 'buttonFloorFrac' ) {
        raycaster.setFromCamera( mouse, camera ); // create a ray from the camera and intersect it with objects in the scene
        const list_meshScene = getMeshInScene(); // get the meshes in the scene to check for intersections
        pushMergedFloorMesh (list_meshScene);
        const list_meshInt = raycaster.intersectObjects( list_meshScene ); // returns an array of cursor-intersected items, e.g. (3) [{…}, {…}, {…}] 
        const meshInt0 = list_meshInt[ 0 ]; // get the first mesh that the cursor intersects e.g. {distance: 29.318, point: Vector3, object: Mesh, face: Face3, faceIndex: 5}
        
        reinstate_mods('floor_fraction', 'floor', 'ceiling_fraction', 'ceiling'); // if do not intersect with anything, show nothing

        if ( list_meshInt.length > 0 ) { // if intersect with any meshes

            if (meshInt0.object.name == 'floor_fraction') { //if the first mesh that the cursor intersects has the name " "

                if (bool_delFloorFrac) { 
                    // if shift button is not pressed, do nothing 
                }

                else { // if shift button is pressed, show geom_trans_del
                    addHoverDisp_FloorOpening(meshInt0);
                } 

            } 
            
            else if ( meshInt0.object.name == 'Floor_Zone' ) { //if the first mesh that the cursor intersects has the name " "

                if (bool_delFloorFrac) { // if shift button is not pressed, update pos and show geom_trans 
                    addDelDisp_FloorOpening(meshInt0);
                }
            }    

        } 
   }
  

    // __________________________
    //    	　_ * PARTITION WALL * ★
    // ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
    if ( id_buttonPressed == 'buttonPartitionWall' ) {
        const list_meshInt = getListofMeshInt();
        const meshInt0 = list_meshInt[ 0 ]; // get the first mesh that the cursor intersects e.g. {distance: 29.318, point: Vector3, object: Mesh, face: Face3, faceIndex: 5}
        const bool_meshInt0IsOnCurrentStorey =  (list_meshInt, meshInt0);

        reinstate_mods('PartitionWall'); // if do not intersect with anything, show nothing

        // if ( bool_meshInt0IsOnCurrentStorey ) { // if intersect with any meshes
        if ( list_meshInt.length > 0 ) { // if intersect with any meshes


            if (meshInt0.object.name == 'PartitionWall') { // if the first mesh that the cursor intersects has the name ' '

                if (!bool_delPartWall) { // if shift button is not pressed, update trans pos and show geom_trans 
                    // orientVertMeshToFaceOfIntMesh( meshInt0, pos_meshPartWall, meshPartWallTrans, meshPartWallDel );
                }
                else { // if shift button is pressed, show geom_trans_del
                    delHoverDisp_PartWall( meshInt0.object );
                } 
            } 

            else if (meshInt0.object.name == 'OpeningWall') { // if the first mesh that the cursor intersects has the name ' '

                if (!bool_delPartWall) { // if shift button is not pressed, update trans pos and show geom_trans 
                    // orientVertMeshToFaceOfIntMesh( meshInt0, pos_meshPartWall, meshPartWallTrans, meshPartWallDel );
                }
                else { // if shift button is pressed, show geom_trans_del
                    delHoverDisp_PartWall( meshInt0.object );
                } 
            } 
          
            else if (meshInt0.object.parent.name == "floor") { // if the first mesh that the cursor intersects does not have name, i.e. intersect with ground
                
                if (!bool_delPartWall) { // if shift button is not pressed, update pos and show geom_trans
                    addHoverDisp_PartWall_toIntFloor(meshInt0); // check distance from boundary and presense of boundary and non-boundary mesh
                } 
                else { // if shift button is pressed, do nothing
                }
            }

        } 
    }	

    // __________________________
    //    	　_ * STAIRS01 * ★
    // ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
    if ( id_buttonPressed == 'buttonStairs01' ) {
        raycaster.setFromCamera( mouse, camera );
        const list_meshScene = getMeshInScene(); // get the mesh in the scene to check for intersections
        pushMergedFloorMesh (list_meshScene);
        const list_meshInt = raycaster.intersectObjects( list_meshScene );
        const meshInt0 = list_meshInt[ 0 ];
        
        reinstate_mods('Stairs01', 'volume', 'floor_fraction', 'floor', 'ceiling_fraction', 'ceiling'); // if do not intersect with anything, show nothing

        if ( list_meshInt.length > 0 ) {  // if intersect with any meshes

            if (meshInt0.object.parent.name == 'Stair01') { // if the first mesh that the cursor intersects has the name ' '

                if (!bool_delPartWall) { // if shift button is not pressed, update trans pos and show geom_trans 
                    // orientVertMeshToFaceOfIntMesh( meshInt0, pos_meshPartWall, meshPartWallTrans, meshPartWallDel );
                }
                else { // if shift button is pressed, show geom_trans_del
                    const grpInt = meshInt0.object.parent.parent; // centre of the first mesh that the cursor intersects, e.g. Vector3 {x: -1.5, y: 3, z: 0.25}
                    delHoverDisp_Stairs01( grpInt );
                } 
            } 

            else if (meshInt0.object.parent.name == "floor") { // if the first mesh that the cursor intersects has the name ' '
                
                if (!bool_delPartWall) { // if shift button is not pressed, update pos and show geom_trans
                    addHoverDisp_Stairs01_toIntFloor (meshInt0);
                } 
                else { // if shift button is pressed, do nothing
                }
               
            }          

            else if ( meshInt0.object.name == 'Floor_Zone' ) { //if the first mesh that the cursor intersects has the name " "

                if (!bool_delPartWall) { // if shift button is not pressed, update pos and show geom_trans
                    addHoverDisp_Stairs01_toIntFloorZone (meshInt0);
                } 
                else { // if shift button is pressed, do nothing
                }
                
            }

        } 
    }	
    
    // __________________________
    //    	　_ * WINDOW01 * ★
    // ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
    if ( id_buttonPressed == 'buttonWindow01' ) {
        raycaster.setFromCamera( mouse, camera );
        const list_meshScene = getMeshInScene(); // get the mesh in the scene to check for intersections
        pushMergedFloorMesh (list_meshScene);
        const list_meshInt = raycaster.intersectObjects( list_meshScene ); // returns an array of intersected items, e.g. (3) [{…}, {…}, {…}] 
        const meshInt0 = list_meshInt[ 0 ]; // get the first mesh that the cursor intersects e.g. {distance: 29.318, point: Vector3, object: Mesh, face: Face3, faceIndex: 5}

        reinstate_mods('Window01', 'Window02', 'Door01', 'Door02', 'Door03', 'Railing01', 'Stairs01'); // if do not intersect with anything, show nothing
       
        if ( list_meshInt.length > 0 ) { // if intersect with any mesh
  
            if (meshInt0.object.parent.name == 'Window01') { // if the first mesh that the cursor intersects has the name ' '
                const grpInt = meshInt0.object.parent.parent; // Group { .., name: 'Window01', ..}
                if (!bool_delWindow01) { 
                    // if shift button is not pressed, do nothing
                }
                else { // if shift button is pressed, show geom_trans_del
                    delHoverDisp_Window01( grpInt );
                }
            } 
            
            else if (meshInt0.object.name == 'BoundaryWall') { // if the first mesh that the cursor intersects has the name ' '
                if (!bool_delWindow01) { // if shift button is not pressed, update global variable of geom & geom_trans
                    const meshInt = meshInt0.object
                    dispHelperAndReplaceHover_wallModRule (replaceHoverDisp_Window01, meshInt);
                }
            }

            else if (meshInt0.object.name == 'OpeningWall') { // if the first mesh that the cursor intersects has the name ' '
                if (!bool_delWindow01) { // if shift button is not pressed, update global variable of geom & geom_trans
                    replaceHoverDisp_Window01( meshInt0.object );
                }
            }

            else if (meshInt0.object.name == 'PartitionWall') { // if the first mesh that the cursor intersects has the name ' '
                if (!bool_delWindow01) { // if shift button is not pressed, update global variable of geom & geom_trans
                    replaceHoverDisp_Window01( meshInt0.object );
                }
            }

            else if (meshInt0.object.parent.name == 'Window02') { 
                const grpInt = meshInt0.object.parent.parent; // centre of the first mesh that the cursor intersects, e.g. Vector3 {x: -1.5, y: 3, z: 0.25}
                if (!bool_delWindow01) { // if shift button is not pressed, update global variable of geom & geom_trans
                    replaceHoverDisp_Window01( grpInt );
                }
                else { // if shift button is pressed, show geom_trans_del
                    delHoverDisp_Window02( grpInt );
                }
            }	

            else if (meshInt0.object.parent.name == 'Door01') { 
                const grpInt = meshInt0.object.parent.parent; // centre of the first mesh that the cursor intersects, e.g. Vector3 {x: -1.5, y: 3, z: 0.25}
                if (!bool_delWindow01) { // if shift button is not pressed, update global variable of geom & geom_trans
                    replaceHoverDisp_Window01( grpInt );
                }
                else { // if shift button is pressed, show geom_trans_del
                    delHoverDisp_Door01( grpInt );
                }
            }	

            else if (meshInt0.object.parent.name == 'Door02') { 
                const grpInt = meshInt0.object.parent.parent; // centre of the first mesh that the cursor intersects, e.g. Vector3 {x: -1.5, y: 3, z: 0.25}
                if (!bool_delWindow01) { // if shift button is not pressed, update global variable of geom & geom_trans
                    replaceHoverDisp_Window01( grpInt );
                }
                else { // if shift button is pressed, show geom_trans_del
                    delHoverDisp_Door02( grpInt );
                }
            }	
            
            else if (meshInt0.object.parent.name == 'Door03') { 
                const grpInt = meshInt0.object.parent.parent; // centre of the first mesh that the cursor intersects, e.g. Vector3 {x: -1.5, y: 3, z: 0.25}
                if (!bool_delWindow01) { // if shift button is not pressed, update global variable of geom & geom_trans
                    replaceHoverDisp_Window01( grpInt );
                }
                else { // if shift button is pressed, show geom_trans_del
                    delHoverDisp_Door03( grpInt );
                }
            }	

            else if (meshInt0.object.parent.name == 'Railing01') { 
                const grpInt = meshInt0.object.parent.parent; // centre of the first mesh that the cursor intersects, e.g. Vector3 {x: -1.5, y: 3, z: 0.25}
                if (!bool_delWindow01) { // if shift button is not pressed, update global variable of geom & geom_trans
                    replaceHoverDisp_Window01( grpInt );
                }
                else { // if shift button is pressed, show geom_trans_del
                    delHoverDisp_Railing01( grpInt );
                }
            }	

            else if (meshInt0.object.parent.name == 'Stairs01') { 
                const grpInt = meshInt0.object.parent.parent; // centre of the first mesh that the cursor intersects, e.g. Vector3 {x: -1.5, y: 3, z: 0.25}
                if (!bool_delWindow01) { // if shift button is not pressed, update global variable of geom & geom_trans
                    dispHelperAndReplaceHover_wallModRule (replaceHoverDisp_Window01, grpInt)
                }
                else { // if shift button is pressed, show geom_trans_del
                    delHoverDisp_Stairs01( grpInt );
                }
            }	

        } 
    }

    // __________________________
    //    	　_ * WINDOW02 * ★
    // ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
    if ( id_buttonPressed == 'buttonWindow02' ) {
        raycaster.setFromCamera( mouse, camera );
        const list_meshScene = getMeshInScene(); // get the mesh in the scene to check for intersections
        pushMergedFloorMesh (list_meshScene);
        const list_meshInt = raycaster.intersectObjects( list_meshScene );
        const meshInt0 = list_meshInt[ 0 ];

        reinstate_mods('Window01', 'Window02', 'Door01', 'Door02', 'Door03', 'Railing01', 'Stairs01'); // if do not intersect with anything, show nothing
        
        if ( list_meshInt.length > 0 ) {  // if intersect with any meshes

            if (meshInt0.object.parent.name == 'Window02') { // if the first mesh that the cursor intersects has the name ' '
                const grpInt = meshInt0.object.parent.parent; // centre of the first mesh that the cursor intersects, e.g. Vector3 {x: -1.5, y: 3, z: 0.25}
                if (!bool_delWindow02) {
                    // if shift button is not pressed, do nothing
                } 
                else { // if shift button is pressed, show geom_trans_del
                    delHoverDisp_Window02( grpInt );
                }
            } 
            
            else if (meshInt0.object.name == 'BoundaryWall' ) { // if the first mesh that the cursor intersects has the name ' '
                if (!bool_delWindow02) { // if shift button is not pressed, update global variable of geom & geom_trans
                    const meshInt = meshInt0.object
                    dispHelperAndReplaceHover_wallModRule (replaceHoverDisp_Window02, meshInt);
                }
            }

            else if (meshInt0.object.name == 'OpeningWall' ) { // if the first mesh that the cursor intersects has the name ' '
                if (!bool_delWindow02) { // if shift button is not pressed, update global variable of geom & geom_trans
                    replaceHoverDisp_Window02( meshInt0.object );
                }
            }

            else if (meshInt0.object.name == 'PartitionWall') { // if the first mesh that the cursor intersects has the name ' '
                if (!bool_delWindow02) { // if shift button is not pressed, update global variable of geom & geom_trans
                    replaceHoverDisp_Window02( meshInt0.object );
                }
            }
            
            else if (meshInt0.object.parent.name == 'Window01') { 
                const grpInt = meshInt0.object.parent.parent; // centre of the first mesh that the cursor intersects, e.g. Vector3 {x: -1.5, y: 3, z: 0.25}
                if (!bool_delWindow01) { // if shift button is not pressed, update global variable of geom & geom_trans
                    replaceHoverDisp_Window02( grpInt );
                }
                else { // if shift button is pressed, show geom_trans_del
                    delHoverDisp_Window01( grpInt );
                }
            }

            else if (meshInt0.object.parent.name == 'Door01') { 
                const grpInt = meshInt0.object.parent.parent; // centre of the first mesh that the cursor intersects, e.g. Vector3 {x: -1.5, y: 3, z: 0.25}
                if (!bool_delWindow01) { // if shift button is not pressed, update global variable of geom & geom_trans
                    replaceHoverDisp_Window02( grpInt );
                }
                else { // if shift button is pressed, show geom_trans_del
                    delHoverDisp_Door01( grpInt );
                }
            }

            else if (meshInt0.object.parent.name == 'Door02') { 
                const grpInt = meshInt0.object.parent.parent; // centre of the first mesh that the cursor intersects, e.g. Vector3 {x: -1.5, y: 3, z: 0.25}
                if (!bool_delWindow01) { // if shift button is not pressed, update global variable of geom & geom_trans
                    replaceHoverDisp_Window02( grpInt );
                }
                else { // if shift button is pressed, show geom_trans_del
                    delHoverDisp_Door02( grpInt );
                }
            }

            else if (meshInt0.object.parent.name == 'Door03') { 
                const grpInt = meshInt0.object.parent.parent; // centre of the first mesh that the cursor intersects, e.g. Vector3 {x: -1.5, y: 3, z: 0.25}
                if (!bool_delWindow01) { // if shift button is not pressed, update global variable of geom & geom_trans
                    replaceHoverDisp_Window02( grpInt );
                }
                else { // if shift button is pressed, show geom_trans_del
                    delHoverDisp_Door03( grpInt );
                }
            }

            else if (meshInt0.object.parent.name == 'Railing01') { 
                const grpInt = meshInt0.object.parent.parent; // centre of the first mesh that the cursor intersects, e.g. Vector3 {x: -1.5, y: 3, z: 0.25}
                if (!bool_delWindow01) { // if shift button is not pressed, update global variable of geom & geom_trans
                    replaceHoverDisp_Window02( grpInt );
                }
                else { // if shift button is pressed, show geom_trans_del
                    delHoverDisp_Railing01( grpInt );
                }
            }

            else if (meshInt0.object.parent.name == 'Stairs01') { // if the first mesh that the cursor intersects has the name ' '
                const grpInt = meshInt0.object.parent.parent; // centre of the first mesh that the cursor intersects, e.g. Vector3 {x: -1.5, y: 3, z: 0.25}
                if (!bool_delWindow01) { // if shift button is not pressed, update global variable of geom & geom_trans
                    dispHelperAndReplaceHover_wallModRule (replaceHoverDisp_Window02, grpInt)
                }
                else { // if shift button is pressed, show geom_trans_del
                    delHoverDisp_Stairs01( grpInt );
                }
            }				
           


        } 
    }	
    
    // __________________________
    //    	　_ * DOOR01 * ★
    // ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
    if ( id_buttonPressed == 'buttonDoor01' ) {
        raycaster.setFromCamera( mouse, camera );
        const list_meshScene = getMeshInScene(); // get the mesh in the scene to check for intersections
        pushMergedFloorMesh (list_meshScene);
        const list_meshInt = raycaster.intersectObjects( list_meshScene );
        const meshInt0 = list_meshInt[ 0 ];
        
        reinstate_mods('Window01', 'Window02', 'Door01', 'Door02', 'Door03', 'Railing01', 'Stairs01'); // if do not intersect with anything, show nothing
        
        if ( list_meshInt.length > 0 ) {  // if intersect with any meshes

            if (meshInt0.object.parent.name == 'Door01') { // if the first mesh that the cursor intersects has the name ' '
                const grpInt = meshInt0.object.parent.parent; // Group { .., name: 'Window01', ..}
                if (!bool_delDoor01) { 
                    // if shift button is not pressed, do nothing
                }
                else { // if shift button is pressed, show geom_trans_del
                    delHoverDisp_Door01( grpInt );
                }
            } 

            else if (meshInt0.object.name == 'BoundaryWall' ) { // if the first mesh that the cursor intersects has the name ' '
                if (!bool_delDoor01) { // if shift button is not pressed, update global variable of geom & geom_trans
                    dispHelperAndReplaceHover_doorModRule ( replaceHoverDisp_Door01, meshInt0.object );
                }
            }

            else if (meshInt0.object.name == 'OpeningWall' ) { // if the first mesh that the cursor intersects has the name ' '
                if (!bool_delDoor01) { // if shift button is not pressed, update global variable of geom & geom_trans
                    replaceHoverDisp_Door01( meshInt0.object );
                }
            }

            else if (meshInt0.object.name == 'PartitionWall') { // if the first mesh that the cursor intersects has the name ' '
                if (!bool_delDoor01) { // if shift button is not pressed, update global variable of geom & geom_trans
                    replaceHoverDisp_Door01( meshInt0.object );
                }
            }
            
            else if (meshInt0.object.parent.name == 'Window01') { 
                const grpInt = meshInt0.object.parent.parent; // centre of the first mesh that the cursor intersects, e.g. Vector3 {x: -1.5, y: 3, z: 0.25}
                if (!bool_delDoor01) { // if shift button is not pressed, update global variable of geom & geom_trans
                    dispHelperAndReplaceHover_doorModRule ( replaceHoverDisp_Door01, grpInt );
                }
                else { // if shift button is pressed, show geom_trans_del
                    delHoverDisp_Window01( grpInt );
                }
            }

            else if (meshInt0.object.parent.name == 'Window02') { 
                const grpInt = meshInt0.object.parent.parent; // centre of the first mesh that the cursor intersects, e.g. Vector3 {x: -1.5, y: 3, z: 0.25}
                if (!bool_delDoor01) { // if shift button is not pressed, update global variable of geom & geom_trans
                    dispHelperAndReplaceHover_doorModRule ( replaceHoverDisp_Door01, grpInt );
                }
                else { // if shift button is pressed, show geom_trans_del
                    delHoverDisp_Window02( grpInt );
                }
            }

            else if (meshInt0.object.parent.name == 'Door02') { 
                const grpInt = meshInt0.object.parent.parent; // centre of the first mesh that the cursor intersects, e.g. Vector3 {x: -1.5, y: 3, z: 0.25}
                if (!bool_delDoor01) { // if shift button is not pressed, update global variable of geom & geom_trans
                    replaceHoverDisp_Door01( grpInt );
                }
                else { // if shift button is pressed, show geom_trans_del
                    delHoverDisp_Door02( grpInt );
                }
            }	

            else if (meshInt0.object.parent.name == 'Door03') { 
                const grpInt = meshInt0.object.parent.parent; // centre of the first mesh that the cursor intersects, e.g. Vector3 {x: -1.5, y: 3, z: 0.25}
                if (!bool_delDoor01) { // if shift button is not pressed, update global variable of geom & geom_trans
                    replaceHoverDisp_Door01( grpInt );
                }
                else { // if shift button is pressed, show geom_trans_del
                    delHoverDisp_Door03( grpInt );
                }
            }	
            
            else if (meshInt0.object.parent.name == 'Railing01') { 
                const grpInt = meshInt0.object.parent.parent; // centre of the first mesh that the cursor intersects, e.g. Vector3 {x: -1.5, y: 3, z: 0.25}
                if (!bool_delDoor01) { // if shift button is not pressed, update global variable of geom & geom_trans
                    dispHelperAndReplaceHover_doorModRule ( replaceHoverDisp_Door01, grpInt );
                }
                else { // if shift button is pressed, show geom_trans_del
                    delHoverDisp_Railing01( grpInt );
                }
            }	

            else if (meshInt0.object.parent.name == 'Stairs01') { 
                const grpInt = meshInt0.object.parent.parent; // centre of the first mesh that the cursor intersects, e.g. Vector3 {x: -1.5, y: 3, z: 0.25}
                if (!bool_delDoor01) { // if shift button is not pressed, update global variable of geom & geom_trans
                    dispHelperAndReplaceHover_doorModRule ( replaceHoverDisp_Door01, grpInt );
                }
                else { // if shift button is pressed, show geom_trans_del
                    delHoverDisp_Stairs01( grpInt );
                }
            }	






        } 
    }	

    // __________________________
    //    	　_ * DOOR02 * ★
    // ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
    if ( id_buttonPressed == 'buttonDoor02' ) {
        raycaster.setFromCamera( mouse, camera );
        const list_meshScene = getMeshInScene(); // get the mesh in the scene to check for intersections
        pushMergedFloorMesh (list_meshScene);
        const list_meshInt = raycaster.intersectObjects( list_meshScene );
        const meshInt0 = list_meshInt[ 0 ];
        
        reinstate_mods('Window01', 'Window02', 'Door01', 'Door02', 'Door03', 'Railing01', 'Stairs01'); // if do not intersect with anything, show nothing

        if ( list_meshInt.length > 0 ) {  // if intersect with any meshes
            
            if (meshInt0.object.parent.name == 'Door02') { // if the first mesh that the cursor intersects has the name ' '
                const grpInt = meshInt0.object.parent.parent; // Group { .., name: 'Window01', ..}
                if (!bool_delDoor02) { 
                    // if shift button is not pressed, do nothing
                }
                else { // if shift button is pressed, show geom_trans_del
                    delHoverDisp_Door02( grpInt );
                }
            } 
            
            else if (meshInt0.object.name == 'BoundaryWall' ) { // if the first mesh that the cursor intersects has the name ' '
                if (!bool_delDoor02) { // if shift button is not pressed, update global variable of geom & geom_trans
                    dispHelperAndReplaceHover_doorModRule ( replaceHoverDisp_Door02, meshInt0.object );
                }
            }

            else if (meshInt0.object.name == 'OpeningWall' ) { // if the first mesh that the cursor intersects has the name ' '
                if (!bool_delDoor02) { // if shift button is not pressed, update global variable of geom & geom_trans
                    replaceHoverDisp_Door02( meshInt0.object );
                }
            }

            else if (meshInt0.object.name == 'PartitionWall') { // if the first mesh that the cursor intersects has the name ' '
                if (!bool_delDoor02) { // if shift button is not pressed, update global variable of geom & geom_trans
                    replaceHoverDisp_Door02( meshInt0.object );
                }
            }
            
            else if (meshInt0.object.parent.name == 'Window01') { 
                const grpInt = meshInt0.object.parent.parent; // centre of the first mesh that the cursor intersects, e.g. Vector3 {x: -1.5, y: 3, z: 0.25}
                if (!bool_delDoor02) { // if shift button is not pressed, update global variable of geom & geom_trans
                    dispHelperAndReplaceHover_doorModRule ( replaceHoverDisp_Door02, grpInt );
                }
                else { // if shift button is pressed, show geom_trans_del
                    delHoverDisp_Window01( grpInt );
                }
            }

            else if (meshInt0.object.parent.name == 'Window02') { 
                const grpInt = meshInt0.object.parent.parent; // centre of the first mesh that the cursor intersects, e.g. Vector3 {x: -1.5, y: 3, z: 0.25}
                if (!bool_delDoor02) { // if shift button is not pressed, update global variable of geom & geom_trans
                    dispHelperAndReplaceHover_doorModRule ( replaceHoverDisp_Door02, grpInt );
                }
                else { // if shift button is pressed, show geom_trans_del
                    delHoverDisp_Window02( grpInt );
                }
            }

            else if (meshInt0.object.parent.name == 'Door01') { 
                const grpInt = meshInt0.object.parent.parent; // centre of the first mesh that the cursor intersects, e.g. Vector3 {x: -1.5, y: 3, z: 0.25}
                if (!bool_delDoor02) { // if shift button is not pressed, update global variable of geom & geom_trans
                    replaceHoverDisp_Door02( grpInt );
                }
                else { // if shift button is pressed, show geom_trans_del
                    delHoverDisp_Door01( grpInt );
                }
            }	

            else if (meshInt0.object.parent.name == 'Door03') { 
                const grpInt = meshInt0.object.parent.parent; // centre of the first mesh that the cursor intersects, e.g. Vector3 {x: -1.5, y: 3, z: 0.25}
                if (!bool_delDoor02) { // if shift button is not pressed, update global variable of geom & geom_trans
                    replaceHoverDisp_Door02( grpInt );
                }
                else { // if shift button is pressed, show geom_trans_del
                    delHoverDisp_Door03( grpInt );
                }
            }	

            else if (meshInt0.object.parent.name == 'Railing01') { 
                const grpInt = meshInt0.object.parent.parent; // centre of the first mesh that the cursor intersects, e.g. Vector3 {x: -1.5, y: 3, z: 0.25}
                if (!bool_delDoor02) { // if shift button is not pressed, update global variable of geom & geom_trans
                    dispHelperAndReplaceHover_doorModRule ( replaceHoverDisp_Door02, grpInt );
                }
                else { // if shift button is pressed, show geom_trans_del
                    delHoverDisp_Railing01( grpInt );
                }
            }	

            else if (meshInt0.object.parent.name == 'Stairs01') { 
                const grpInt = meshInt0.object.parent.parent; // centre of the first mesh that the cursor intersects, e.g. Vector3 {x: -1.5, y: 3, z: 0.25}
                if (!bool_delDoor02) { // if shift button is not pressed, update global variable of geom & geom_trans
                    dispHelperAndReplaceHover_doorModRule ( replaceHoverDisp_Door02, grpInt );
                }
                else { // if shift button is pressed, show geom_trans_del
                    delHoverDisp_Stairs01( grpInt );
                }
            }	
            

        } 
    }	

    // __________________________
    //    	　_ * DOOR03 * ★
    // ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
    if ( id_buttonPressed == 'buttonDoor03' ) {
        raycaster.setFromCamera( mouse, camera );
        const list_meshScene = getMeshInScene(); // get the mesh in the scene to check for intersections
        pushMergedFloorMesh (list_meshScene);
        const list_meshInt = raycaster.intersectObjects( list_meshScene );
        const meshInt0 = list_meshInt[ 0 ];
        
        reinstate_mods('Window01', 'Window02', 'Door01', 'Door02', 'Door03', 'Railing01', 'Stairs01'); // if do not intersect with anything, show nothing
        
        if ( list_meshInt.length > 0 ) {  // if intersect with any meshes

            if (meshInt0.object.parent.name == 'Door03') { // if the first mesh that the cursor intersects has the name ' '
                const grpInt = meshInt0.object.parent.parent; // Group { .., name: 'Window01', ..}
                if (!bool_delDoor03) { 
                    // if shift button is not pressed, do nothing
                }
                else { // if shift button is pressed, show geom_trans_del
                    delHoverDisp_Door03( grpInt );
                }
            } 
            
            else if (meshInt0.object.name == 'BoundaryWall' ) { // if the first mesh that the cursor intersects has the name ' '
                if (!bool_delDoor03) { // if shift button is not pressed, update global variable of geom & geom_trans
                    dispHelperAndReplaceHover_doorModRule ( replaceHoverDisp_Door03, meshInt0.object );
                }
            }

            else if (meshInt0.object.name == 'OpeningWall' ) { // if the first mesh that the cursor intersects has the name ' '
                if (!bool_delDoor03) { // if shift button is not pressed, update global variable of geom & geom_trans
                    replaceHoverDisp_Door03( meshInt0.object );
                }
            }
            
            else if (meshInt0.object.name == 'PartitionWall') { // if the first mesh that the cursor intersects has the name ' '
                if (!bool_delDoor03) { // if shift button is not pressed, update global variable of geom & geom_trans
                    replaceHoverDisp_Door03( meshInt0.object );
                }
            }
            
            else if (meshInt0.object.parent.name == 'Window01') { 
                const grpInt = meshInt0.object.parent.parent; // centre of the first mesh that the cursor intersects, e.g. Vector3 {x: -1.5, y: 3, z: 0.25}
                if (!bool_delDoor03) { // if shift button is not pressed, update global variable of geom & geom_trans
                    dispHelperAndReplaceHover_doorModRule ( replaceHoverDisp_Door03, grpInt );
                }
                else { // if shift button is pressed, show geom_trans_del
                    delHoverDisp_Window01( grpInt );
                }
            }

            else if (meshInt0.object.parent.name == 'Window02') { 
                const grpInt = meshInt0.object.parent.parent; // centre of the first mesh that the cursor intersects, e.g. Vector3 {x: -1.5, y: 3, z: 0.25}
                if (!bool_delDoor03) { // if shift button is not pressed, update global variable of geom & geom_trans
                    dispHelperAndReplaceHover_doorModRule ( replaceHoverDisp_Door03, grpInt );
                }
                else { // if shift button is pressed, show geom_trans_del
                    delHoverDisp_Window02( grpInt );
                }
            }

            else if (meshInt0.object.parent.name == 'Door01') { 
                const grpInt = meshInt0.object.parent.parent; // centre of the first mesh that the cursor intersects, e.g. Vector3 {x: -1.5, y: 3, z: 0.25}
                if (!bool_delDoor03) { // if shift button is not pressed, update global variable of geom & geom_trans
                    replaceHoverDisp_Door03( grpInt );
                }
                else { // if shift button is pressed, show geom_trans_del
                    delHoverDisp_Door01( grpInt );
                }
            }	

            else if (meshInt0.object.parent.name == 'Door02') { 
                const grpInt = meshInt0.object.parent.parent; // centre of the first mesh that the cursor intersects, e.g. Vector3 {x: -1.5, y: 3, z: 0.25}
                if (!bool_delDoor03) { // if shift button is not pressed, update global variable of geom & geom_trans
                    replaceHoverDisp_Door03( grpInt );
                }
                else { // if shift button is pressed, show geom_trans_del
                    delHoverDisp_Door02( grpInt );
                }
            }	
        
            else if (meshInt0.object.parent.name == 'Railing01') { 
                const grpInt = meshInt0.object.parent.parent; // centre of the first mesh that the cursor intersects, e.g. Vector3 {x: -1.5, y: 3, z: 0.25}
                if (!bool_delDoor03) { // if shift button is not pressed, update global variable of geom & geom_trans
                    dispHelperAndReplaceHover_doorModRule ( replaceHoverDisp_Door03, grpInt );
                }
                else { // if shift button is pressed, show geom_trans_del
                    delHoverDisp_Railing01( grpInt );
                }
            }	

            else if (meshInt0.object.parent.name == 'Stairs01') { 
                const grpInt = meshInt0.object.parent.parent; // centre of the first mesh that the cursor intersects, e.g. Vector3 {x: -1.5, y: 3, z: 0.25}
                if (!bool_delDoor03) { // if shift button is not pressed, update global variable of geom & geom_trans
                    dispHelperAndReplaceHover_doorModRule ( replaceHoverDisp_Door03, grpInt );
                }
                else { // if shift button is pressed, show geom_trans_del
                    delHoverDisp_Stairs01( grpInt );
                }
            }	




        } else { // if do not intersect with anything, show nothing
            meshDoor03Trans.visible = false;
            meshDoor03Del.visible = false;
            pos_grpDoor03 = null;
        }
    }	
    
    // __________________________
    //    	　_ * RAILING01 * ★
    // ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
    if ( id_buttonPressed == 'buttonRailing01' ) {
        raycaster.setFromCamera( mouse, camera );
        const list_meshScene = getMeshInScene(); // get the mesh in the scene to check for intersections
        pushMergedFloorMesh (list_meshScene);
        const list_meshInt = raycaster.intersectObjects( list_meshScene );
        const meshInt0 = list_meshInt[ 0 ];
        
        reinstate_mods('Window01', 'Window02', 'Door01', 'Door02', 'Door03', 'Railing01'); // if do not intersect with anything, show nothing
        
        if ( list_meshInt.length > 0 ) {  // if intersect with any meshes

            if (meshInt0.object.parent.name == 'Railing01') { // if the first mesh that the cursor intersects has the name ' '
                const grpInt = meshInt0.object.parent.parent; // Group { .., name: 'Window01', ..}
                if (!bool_delRailing01) { 
                    // if shift button is not pressed, do nothing
                }
                else { // if shift button is pressed, show geom_trans_del
                    delHoverDisp_Railing01( grpInt );
                }
            } 
            
            else if (meshInt0.object.name == 'BoundaryWall' ) { // if the first mesh that the cursor intersects has the name ' '
                if (!bool_delRailing01) { // if shift button is not pressed, update global variable of geom & geom_trans
                    const meshInt = meshInt0.object
                    dispHelperAndReplaceHover_wallModRule (replaceHoverDisp_Railing01, meshInt);
                }
            }

            else if (meshInt0.object.name == 'OpeningWall') { // if the first mesh that the cursor intersects has the name ' '
                if (!bool_delRailing01) { // if shift button is not pressed, update global variable of geom & geom_trans
                    replaceHoverDisp_Railing01( meshInt0.object );
                }
            }
            
            else if (meshInt0.object.name == 'PartitionWall') { // if the first mesh that the cursor intersects has the name ' '
                if (!bool_delRailing01) { // if shift button is not pressed, update global variable of geom & geom_trans
                    replaceHoverDisp_Railing01( meshInt0.object );
                }
            }

            else if (meshInt0.object.parent.name == 'Window01') { 
                const grpInt = meshInt0.object.parent.parent; // centre of the first mesh that the cursor intersects, e.g. Vector3 {x: -1.5, y: 3, z: 0.25}
                if (!bool_delRailing01) { // if shift button is not pressed, update global variable of geom & geom_trans
                    replaceHoverDisp_Railing01( grpInt );
                }
                else { // if shift button is pressed, show geom_trans_del
                    delHoverDisp_Window01( grpInt );
                }
            }

            else if (meshInt0.object.parent.name == 'Window02') { 
                const grpInt = meshInt0.object.parent.parent; // centre of the first mesh that the cursor intersects, e.g. Vector3 {x: -1.5, y: 3, z: 0.25}
                if (!bool_delRailing01) { // if shift button is not pressed, update global variable of geom & geom_trans
                    replaceHoverDisp_Railing01( grpInt );
                }
                else { // if shift button is pressed, show geom_trans_del
                    delHoverDisp_Window02( grpInt );
                }
            }

            else if (meshInt0.object.parent.name == 'Door01') { 
                const grpInt = meshInt0.object.parent.parent; // centre of the first mesh that the cursor intersects, e.g. Vector3 {x: -1.5, y: 3, z: 0.25}
                if (!bool_delRailing01) { // if shift button is not pressed, update global variable of geom & geom_trans
                    replaceHoverDisp_Railing01( grpInt );
                }
                else { // if shift button is pressed, show geom_trans_del
                    delHoverDisp_Door01( grpInt );
                }
            }	

            else if (meshInt0.object.parent.name == 'Door02') { 
                const grpInt = meshInt0.object.parent.parent; // centre of the first mesh that the cursor intersects, e.g. Vector3 {x: -1.5, y: 3, z: 0.25}
                if (!bool_delRailing01) { // if shift button is not pressed, update global variable of geom & geom_trans
                    replaceHoverDisp_Railing01( grpInt );
                }
                else { // if shift button is pressed, show geom_trans_del
                    delHoverDisp_Door02( grpInt );
                }
            }	

            else if (meshInt0.object.parent.name == 'Door03') { 
                const grpInt = meshInt0.object.parent.parent; // centre of the first mesh that the cursor intersects, e.g. Vector3 {x: -1.5, y: 3, z: 0.25}
                if (!bool_delRailing01) { // if shift button is not pressed, update global variable of geom & geom_trans
                    replaceHoverDisp_Railing01( grpInt );
                }
                else { // if shift button is pressed, show geom_trans_del
                    delHoverDisp_Door03( grpInt );
                }
            }	
        
            else if (meshInt0.object.parent.name == 'Stairs01') { 
                const grpInt = meshInt0.object.parent.parent; // centre of the first mesh that the cursor intersects, e.g. Vector3 {x: -1.5, y: 3, z: 0.25}
                if (!bool_delRailing01) { // if shift button is not pressed, update global variable of geom & geom_trans
                    dispHelperAndReplaceHover_wallModRule (replaceHoverDisp_Railing01, grpInt)
                }
                else { // if shift button is pressed, show geom_trans_del
                    delHoverDisp_Stairs01( grpInt );
                }
            }	




        } 
    }	










   renderer.render( scene, camera ); // render the scene

}




// ====================================================
// { Event Handling } 
// ====================================================

// --------------------------------
//    Window Resize
// --------------------------------

function onWindowResize() { // Resize browser window
    const w = window.innerWidth - 440; // minus width of css parts
    const h = window.innerHeight - 50; // minus height of css parts
    camera.aspect = w / h;
    // camera.aspect = container.clientWidth / container.clientHeight;
        // camera.left = -container.innerWidth/camera_zoom+camera_shift_x;
        // camera.right = container.innerWidth/camera_zoom+camera_shift_x;
        // camera.top =  container.innerHeight/camera_zoom+camera_shift_y;
        // camera.bottom =  -container.innerHeight/camera_zoom+camera_shift_y;
    camera.updateProjectionMatrix();
    // renderer.setSize( container.clientWidth, container.clientHeight);
    renderer.setSize( w, h);
    renderer.render(scene, camera);
}

// --------------------------------
//    Buttons ★
// --------------------------------

//    	　_ * VOLUME *
// ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
function onClickbuttonVolume() {
    document.getElementById(id_buttonPressed).classList.remove("pressed");
    id_buttonPressed = 'buttonVolume';
    document.getElementById(id_buttonPressed).classList.add("pressed");
};

//    	　_ * FLOOR *
// ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
function onClickbuttonFloor() {
    document.getElementById(id_buttonPressed).classList.remove("pressed");
    id_buttonPressed = 'buttonFloor';
    document.getElementById(id_buttonPressed).classList.add("pressed");
};

//    	　_ * FLOOR FRACTION *
// ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
function onClickbuttonFloorFrac() {
    document.getElementById(id_buttonPressed).classList.remove("pressed");
    id_buttonPressed = 'buttonFloorFrac';
    document.getElementById(id_buttonPressed).classList.add("pressed");
};


//    	　_ * CEILING * 
// ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
function onClickbuttonCeiling() {
    document.getElementById(id_buttonPressed).classList.remove("pressed");
    id_buttonPressed = 'buttonCeiling';
    document.getElementById(id_buttonPressed).classList.add("pressed");
};

//    	　_ * BOUNDARY WALL * 
// ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
function onClickbuttonBoundaryWall() {
    document.getElementById(id_buttonPressed).classList.remove("pressed");
    id_buttonPressed = 'buttonBoundaryWall';
    document.getElementById(id_buttonPressed).classList.add("pressed");
};

//    	　_ * PARTITION WALL * 
// ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
function onClickbuttonPartWall() {
    document.getElementById(id_buttonPressed).classList.remove("pressed");
    id_buttonPressed = 'buttonPartitionWall';
    document.getElementById(id_buttonPressed).classList.add("pressed");
};

//    	　_ * WINDOW01 * 
// ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
function onClickbuttonWindow01() {
    document.getElementById(id_buttonPressed).classList.remove("pressed");
    id_buttonPressed = 'buttonWindow01';
    document.getElementById(id_buttonPressed).classList.add("pressed");
};

//    	　_ * WINDOW02 * 
// ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
function onClickbuttonWindow02() {
    document.getElementById(id_buttonPressed).classList.remove("pressed");
    id_buttonPressed = 'buttonWindow02';
    document.getElementById(id_buttonPressed).classList.add("pressed");
};

//    	　_ * DOOR01 * 
// ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
function onClickbuttonDoor01() {
    document.getElementById(id_buttonPressed).classList.remove("pressed");
    id_buttonPressed = 'buttonDoor01';
    document.getElementById(id_buttonPressed).classList.add("pressed");
};

//    	　_ * DOOR02 * 
// ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
function onClickbuttonDoor02() {
    document.getElementById(id_buttonPressed).classList.remove("pressed");
    id_buttonPressed = 'buttonDoor02';
    document.getElementById(id_buttonPressed).classList.add("pressed");
};

//    	　_ * DOOR03 * 
// ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
function onClickbuttonDoor03() {
    document.getElementById(id_buttonPressed).classList.remove("pressed");
    id_buttonPressed = 'buttonDoor03';
    document.getElementById(id_buttonPressed).classList.add("pressed");
};

//    	　_ * RAILING01 * 
// ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
function onClickbuttonRailing01() {
    document.getElementById(id_buttonPressed).classList.remove("pressed");
    id_buttonPressed = 'buttonRailing01';
    document.getElementById(id_buttonPressed).classList.add("pressed");
};

//    	　_ * STAIRS01 * 
// ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
function onClickbuttonStairs01() {
    document.getElementById(id_buttonPressed).classList.remove("pressed");
    id_buttonPressed = 'buttonStairs01';
    document.getElementById(id_buttonPressed).classList.add("pressed");
};


// --------------------------------
//    Mouse Move and Shift Key ★
// --------------------------------

function onMouseMove( event ) {
    bool_mouseMove = true;
    event.preventDefault(); // ??? not too sure what this does
    mouse.x = ( (event.pageX - container.offsetLeft) / container.clientWidth ) * 2 - 1;
    mouse.y = - ( (event.pageY - container.offsetTop) / container.clientHeight ) * 2 + 1;

    //    	　_ * VOLUME *
    // ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
    if (event.shiftKey) { // if shift is pressed, del_mesh and hide mesh_trans
        bool_delVolume = true;
    } else { // if shift is not pressed, del_mesh is false and hide mesh_trans
        bool_delVolume = false;
    }
    
    //    	　_ * FLOOR *
    // ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
    if (event.shiftKey) { // if shift is pressed, del_mesh and hide mesh_trans
        bool_delFloor = true;
    } else { // if shift is not pressed, del_mesh is false and hide mesh_trans
        bool_delFloor = false;
    }

    //    	　_ * FLOOR FRACTION *
    // ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
    if (event.shiftKey) { // if shift is pressed, del_mesh and hide mesh_trans
        bool_delFloorFrac = true;
    } else { // if shift is not pressed, del_mesh is false and hide mesh_trans
        bool_delFloorFrac = false;
    }

    //    	　_ * CEILING * 
    // ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
    if (event.shiftKey) {
        bool_delCeiling = true;
    } else {
        bool_delCeiling = false;
    }

    //    	　_ * BOUNDARY WALL * 
    // ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
    if (event.shiftKey) {
        bool_delBdyWall = true;
    } else {
        bool_delBdyWall = false;
    }

    //    	　_ * PARTITION WALL * 
    // ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
    if (event.shiftKey) {
        bool_delPartWall = true;
    } else {
        bool_delPartWall = false;
    }

    //    	　_ * WINDOW01 * 
    // ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
    if (event.shiftKey) {
        bool_delWindow01 = true;
    } else {
        bool_delWindow01 = false;
    }

    //    	　_ * WINDOW02 * 
    // ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
    if (event.shiftKey) {
        bool_delWindow02 = true;
    } else {
        bool_delWindow02 = false;
    }
    
    //    	　_ * DOOR01 * 
    // ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
    if (event.shiftKey) {
        bool_delDoor01 = true;
    } else {
        bool_delDoor01 = false;
    }

    //    	　_ * DOOR02 * 
    // ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
    if (event.shiftKey) {
        bool_delDoor02 = true;
    } else {
        bool_delDoor02 = false;
    }

    //    	　_ * DOOR03 * 
    // ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
    if (event.shiftKey) {
        bool_delDoor03 = true;
    } else {
        bool_delDoor03 = false;
    }

    //    	　_ * RAILING01 * 
    // ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
    if (event.shiftKey) {
        bool_delRailing01 = true;
    } else {
        bool_delRailing01 = false;
    }

    //    	　_ * STAIRS01 * 
    // ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
    if (event.shiftKey) {
        bool_delStairs01 = true;
    } else {
        bool_delStairs01 = false;
    }


}

// --------------------------------
//    Mouse Down
// --------------------------------

function onMouseDown(event) { // Mouse down: store the cursor (X, Y) coordinate on browser window as values between 0 and 1; centre is (0,0), corners are (+/-1, +/-1)
    bool_mouseDown = true;
    mouse_down.x = event.clientX; 
    mouse_down.y = event.clientY;
    // mouse_down.x = event.clientX - container.offset.left; 
    // mouse_down.y = event.clientY - container.offset.top;
}

// --------------------------------
//    Mouse Up ★
// --------------------------------

function onMouseUp(event) { // Mouse up: do nothing, create mesh or delete mesh
    bool_mouseDown = false;
    if ((mouse_down.x !== event.clientX) || (mouse_down.y !== event.clientY)) {
        return; // if we are dragging, return nothing
    }

    // __________________________
    //    	　_ * VOLUME *
    // ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
    if (pos_meshVolume != null) { //If not dragging and raycaster.intersectObjects.object.values(dictVolume).position != null, e.g. Vector3 {x: 1.5, y: 3, z: 0}
        const key = keyGen(pos_meshVolume);
        if (bool_delVolume && key in dictVolume) { // if shift is pressed and existing key is True, delete volume
            deleteVolume(dictVolume[key]); // e.g. (2) [Mesh, Mesh]
            
            // TRIGGER FLOOR DELETE SCRIPT
            pos_grpFloor = new THREE.Vector3( pos_meshVolume.x, pos_meshVolume.y, groundHeight+floor_thickness_half ) ; 
            bool_delFloor = true; 
            
        } else if (!bool_delVolume && dictVolume[key]==undefined) { //if shift is not pressed and there is no exisitng key, add a new volume to the scene and add its key to dictVolume {}
            addVolume(key); 
        }
    }
    
    // __________________________
    //    	　_ * FLOOR *
    // ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
    if (pos_grpFloor != null &&pos_FloorFrac ==null) { //If not dragging and raycaster.intersectObjects.object.values(dictFloor).position != null, e.g. Vector3 {x: 1.5, y: 3, z: 0}
        const key = keyGen(pos_grpFloor);
        if (bool_delFloor && key in dictFloor) { // if shift is pressed and existing key is True, delete meshFloor, meshEnclosure and meshInterior
            deleteFloor(dictFloor[key]); 
            deleteMeshEnclosure(pos_grpFloor);
            deleteAllInteriorMesh(pos_grpFloor);
            genCeilingEnclosure(pos_grpFloor);
        } else if (!bool_delFloor && dictFloor[key]==undefined) { //if shift is not pressed and there is no exisitng key, add a new meshFloor to the scene and add its key to dictFloor {}
            addFloor(key); 
            genBdyWallEnclosure(pos_grpFloor);
            genCeilingEnclosure(pos_grpFloor);
        }
    }
   
    // __________________________
    //    	　_ * STAIRS *
    // ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
    else if (pos_grpStairs01 != null) { //If not dragging and raycaster.intersectObjects.object.values(dictCeiling).position != null, e.g. Vector3 {x: 1.5, y: 3, z: 0}
        const key = keyGen(pos_grpStairs01);
        if (bool_delStairs01 &&key in dictStairs01) { // if shift is not pressed and existing key is True, delete meshCeiling
            addFloorFrac_deleteStairs(dictStairs01[key]);
            deleteStairs01(dictStairs01[key]); 


        } else if (!bool_delStairs01 && dictStairs01[key]==undefined) { //if shift is pressed and there is no exisitng key, add a new meshCeiling to the scene and add its key to dictCeiling {}
            addStairs01(key); 
            deleteFloorFrac_addStairs(key)

        }
    }

    // __________________________
    //    	　_ * FLOOR FRACTION *
    // ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
    else if (pos_FloorFrac != null) { //If not dragging and raycaster.intersectObjects.object.values(dictCeiling).position != null, e.g. Vector3 {x: 1.5, y: 3, z: 0}
        const key = keyGen(pos_FloorFrac);
        pos_CeilingFrac = new THREE.Vector3(pos_FloorFrac.x, pos_FloorFrac.y, truncNumTo3dp(groundHeight - ceiling_thickness_half - overlapOffset) ); // update global variable _pos, e.g. Vector3 {x: -1.5, y: 3, z: 0.25}
        const key_CeilingFrac = keyGen(pos_CeilingFrac);

        if (!bool_delFloorFrac &&key in dictFloorFrac) { // if shift is not pressed and existing key is True, delete meshCeiling
            deleteFloorFrac(dictFloorFrac[key]); 
            if (key_CeilingFrac in dictCeilingFrac) { deleteCeilingFrac(dictCeilingFrac[key_CeilingFrac]); } // if there is ceiling below the floor, delete
            genFloorOpeningWallEnclosure(pos_FloorFrac);

        } else if (bool_delFloorFrac && dictFloorFrac[key]==undefined) { //if shift is pressed and there is no exisitng key, add a new meshCeiling to the scene and add its key to dictCeiling {}
            addFloorFrac(key); 
            pos_grpCeiling = new THREE.Vector3( pos_grpFloor.x, pos_grpFloor.y, truncNumTo3dp(groundHeight - ceiling_thickness_half - overlapOffset) )
            const key_Ceiling = keyGen( pos_grpCeiling );
            storeyNum -=1; if ( key_Ceiling in dictCeiling ) { addCeilingFrac(key_CeilingFrac) }; storeyNum +=1; // if there is ceiling key, add
            delFloorOpeningMeshEnclosure(pos_FloorFrac);
        }

    }

    /*
    // __________________________
    //    	　_ * CEILING *
    // ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
    else if (pos_grpCeiling != null) { //If not dragging and raycaster.intersectObjects.object.values(dictCeiling).position != null, e.g. Vector3 {x: 1.5, y: 3, z: 0}
        const key = keyGen(pos_grpCeiling);
        if (bool_delCeiling && key in dictCeiling) { // if shift is pressed and existing key is True, delete meshCeiling
            deleteCeiling(dictCeiling[key]); 
        } else if (!bool_delCeiling && dictCeiling[key]==undefined) { //if shift is not pressed and there is no exisitng key, add a new meshCeiling to the scene and add its key to dictCeiling {}
            addCeiling(key); 
        }
    }
    

    //    	　_ * CEILING FRACTION *
    // ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
    else if (pos_CeilingFrac != null) { //If not dragging and raycaster.intersectObjects.object.values(dictCeiling).position != null, e.g. Vector3 {x: 1.5, y: 3, z: 0}
        const key = keyGen(pos_CeilingFrac);
        if (bool_delCeilingFrac &&key in dictCeilingFrac) { // if shift is pressed and existing key is True, delete meshCeiling
            deleteCeilingFrac(dictCeilingFrac[key]); 
        } else if (!bool_delCeilingFrac && dictCeilingFrac[key]==undefined) { //if shift is not pressed and there is no exisitng key, add a new meshCeiling to the scene and add its key to dictCeiling {}
            addCeilingFrac(key); 
        }
    }

    // __________________________
    //    	　_ * BOUNDARY WALL * 
    // ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
    else if (pos_meshBdyWall != null) {
        const key = keyGen(pos_meshBdyWall);
        if (bool_delBdyWall && key in dictBdyWall) { // if shift is pressed and existing key is True, delete mesh
            deleteBdyWall(dictBdyWall[key]); 
        } else if (!bool_delBdyWall && dictBdyWall[key]==undefined) { //if shift is not pressed and there is no exisitng key, add a new mesh
            addBdyWall(key, pos_meshBdyWall, angle_meshBdyWall);
        }
    }
*/
    // __________________________
    //    	　_ * PARTITION WALL * 
    // ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
    else if (pos_meshPartWall != null) {
        const key = keyGen(pos_meshPartWall);
        if (bool_delPartWall && key in dictPartWall) { // if shift is pressed and existing key is True, delete mesh
            deletePartWall(dictPartWall[key]); 
        } else if (bool_delPartWall && key in dictOpeningWall) {
            deleteOpeningWall(dictOpeningWall[key]);
        } else if (!bool_delPartWall && dictPartWall[key]==undefined) { //if shift is not pressed and there is no exisitng key, add a new mesh
            addPartWall(key, pos_meshPartWall, angle_meshPartWall);
        } 
    }

    // __________________________
    //    	　_ * HYBRID MOD * ★
    // ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
    else if (pos_grpWindow01 != null) {
        MouseUpDisplay_onHybridMod('Window01', pos_grpWindow01, bool_delWindow01, dictWindow01, deleteWindow01, addWindow01);
    }
    else if (pos_grpWindow02 != null) {
        MouseUpDisplay_onHybridMod('Window02', pos_grpWindow02, bool_delWindow02, dictWindow02, deleteWindow02, addWindow02);
    }
    else if (pos_grpDoor01 != null) {
        MouseUpDisplay_onHybridMod('Door01', pos_grpDoor01, bool_delDoor01, dictDoor01, deleteDoor01, addDoor01);
    }
    else if (pos_grpDoor02 != null) {
        MouseUpDisplay_onHybridMod('Door02', pos_grpDoor02, bool_delDoor02, dictDoor02, deleteDoor02, addDoor02);
    }
    else if (pos_grpDoor03 != null) {
        MouseUpDisplay_onHybridMod('Door03', pos_grpDoor03, bool_delDoor03, dictDoor03, deleteDoor03, addDoor03);
    }
    else if (pos_grpRailing01 != null) {
        MouseUpDisplay_onHybridMod('Railing01', pos_grpRailing01, bool_delRailing01, dictRailing01, deleteRailing01, addRailing01);
    }
    
}

//////////////////// -------------SUBSIDIARY FUNCTIONS------------------------------------------------------ //////////////////// 

// ====================================================
// { Module Operations } ★
// ====================================================
// ''''''  add/del mesh and attributes

// __________________________
//    	　_ * VOLUME *
// ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾

function addVolume(key) {

    // ADD MESH
    const meshVolume = new THREE.Mesh(geomVolume, matVolumeTrans);
    meshVolume.position.set(pos_meshVolume.x, pos_meshVolume.y, pos_meshVolume.z);

    const meshVolumeBase = new THREE.Mesh( geomVolumeBase, matVolume ) ;
    meshVolumeBase.position.set(pos_meshVolume.x, pos_meshVolume.y, groundHeight);
    scene.add( meshVolumeBase );

    const grpVolume = new THREE.Group();
    grpVolume.add(meshVolume, meshVolumeBase)
    meshVolume.visible = false

    // UPDATE GLOBAL VARIABLES, HTML
    dictVolume[key] = grpVolume;
    cnt_meshVolume += 1; // update the counter on the web page
    document.getElementById('buttonVolume').innerHTML = "Volume: " + cnt_meshVolume; 

    // UPDATE POINTS IN SCENE
    const list_CoordOfCorner = getCoordsOfBaseCorners( pos_meshVolume, volume_width,  offsetHeight_AttrLine_fromVolPos);
    list_CoordOfCorner.forEach( updatePoints );
    addAttrLine_purchasedVolBdy(list_CoordOfCorner);

    
    // grpVolume.add(meshFloorZone)
    scene.add(grpVolume)

    // ADD MESH PROPERTIES
    meshVolume.name = "volume_cube"
    meshVolume.storey = storeyNum;

    meshVolumeBase.name = "volume_base"
    meshVolumeBase.storey = storeyNum;
    
    grpVolume.name = "volume"
    grpVolume.key = key;
    grpVolume.storey = storeyNum;

    // UPDATE FLOOR ZONE MESH
    const list_meshVolumeBase = getChildList(getValueList(dictVolume), 1)
    if ( meshFloorZone != undefined ) {
        scene.remove( meshFloorZone )   
        meshFloorZone.parent = scene
    }  
    meshFloorZone = mergeMeshes(list_meshVolumeBase, matVolume, meshFloorZone, "Floor_Zone");
    
};

function deleteVolume( grpVolume ) {

    scene.remove( grpVolume ); // value[0] is e.g. Mesh {..}
    delete dictVolume[ grpVolume.key ];
    cnt_meshVolume -= 1; 
    document.getElementById('buttonVolume').innerHTML = "Volume: " + cnt_meshVolume;

    // UPDATE POINTS IN SCENE
    const list_CoordOfCorner = getCoordsOfBaseCorners( pos_meshVolume, volume_width, offsetHeight_AttrLine_fromVolPos );
    list_CoordOfCorner.forEach( updatePoints );

    deleteAttrLine_purchasedVolBdy (list_CoordOfCorner);
};

function updatePoints(coord) { // add or remove points in the scene
    const key = keyGen(coord) // generate key for each corner point
    if ( dictPoints [key] == undefined ) { // if key does not exists
        const geomPoint = new THREE.BufferGeometry().setFromPoints([coord]);
        const matPoint = new THREE.PointsMaterial({size: 0.8, color: "pink"});
        const point = new THREE.Points(geomPoint, matPoint);
        // scene.add(point);
        dictPoints[key] = [coord, point]; // add new key-value pair to dict
    } 
    else { // if key exists
        // scene.remove( dictPoints [key][1] );
        delete dictPoints [key]
    }
}




// __________________________
//    	　_ * FLOOR *
// ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾



function addFloor(key) {

    // ADD MESH
    const grpFloor = new THREE.Group();
    const list_posOfDivCen = getListofDivCen_fromFloorPos (pos_grpFloor);
    list_posOfDivCen.forEach(function(cen) {
        const mesh = meshFloorFrac.clone();
        mesh.position.set( cen.x, cen.y, cen.z-floor_thickness_half );

        // ADD MESH PROPERTIES
        mesh.name = "floor_fraction";
        grpFloor.add(mesh);

        const key = keyGen(mesh.position);
        mesh.key = key;
        dictFloorFrac[key] = mesh;
        /*
        const index = list_posOfDivCen.indexOf(cen)
        const gridKey = key+"_"+String(index)
        mesh.key = gridKey;
        dictFloor[gridKey] = mesh;
        */
        // console.log(Object.keys( dictFloor ))
    })
    scene.add( grpFloor );

    // ADD MESH PROPERTIES
    grpFloor.name = "floor"
    grpFloor.key = key;
    const vol_id = calcVolumeID (pos_grpFloor)
    grpFloor.volume_id = vol_id;
    grpFloor.storey = storeyNum;

    // UPDATE GLOBAL VARIABLES, HTML
    dictFloor[key] = grpFloor;
    cnt_grpFloor += 1; // update the counter on the web page
    document.getElementById('buttonFloor').innerHTML = "Floor: " + cnt_grpFloor;

    addAttrLinesOnFloor();
};

function deleteFloor(grpFloor) {
    scene.remove( grpFloor );
    delete dictFloor[ grpFloor.key ];
    cnt_grpFloor -= 1; 
    document.getElementById('buttonFloor').innerHTML = "Floor: " + cnt_grpFloor;
    delAttrLinesOnFloor();

    // DELETE KEY FROM DICTFLOORFRAC
    const children = grpFloor.children
    children.forEach( function(child){
        const key = getKeyByValue(dictFloorFrac, child);
        delete dictFloorFrac[ key ];
    })
};

function genBdyWallEnclosure( pos_grpFloor ) {
    const list_CoordOfCorner = getCoordsOfBaseCorners( pos_grpFloor, floor_width, offsetHeight_posVerMod_fromFloorPos );//frontleft, frontright, backright, backleft
    const list = list_CoordOfCorner.slice(0)
    list.push(list[0]);

    for(var i=0; i < list.length-1; i++){
        // CLOCKWISE MULTIPLIERS
        const arrDir_x = [1,0,-1,0]; const arrDir_y = arrDir_x.slice(0).reverse();
        const multp_angle = [0,-1,2,1];
        const offsetDir_x = [0,-1,0,1]; 
        const offsetDir_y = [-1,0,1,0]; 
        const adjoffsetDir_x = [0,1,0,-1];
        const adjoffsetDir_y = [1,0,-1,0];

        // CREATE STARTING POS OF ARRAY
        const pos_corner = list[i]; // at boundary
        const pos_arrstart = pos_corner.clone().add(new THREE.Vector3( PartWall_width_half*arrDir_x[i], PartWall_width_half*arrDir_y[i], 0)); // at boundary
            // dispDotsfromCoords ( matDot_Large, [pos_arrstart] )
            // console.log(dictBdyWall)

        // CREATE ARRAY OF POS USING INCREMNENT BY FACTOR OF J
        for(var j=0; j < num_div_row_onFloor; j++){
            const pos_arr = pos_arrstart.clone().add(new THREE.Vector3( PartWall_width*j*arrDir_x[i], PartWall_width*j*arrDir_y[i], 0)); // at boundary
            const pos_arr_rounded = roundPos(pos_arr, 3) // at boundary, Javascript limitation: giving infinite decimal when the value is not infinite (see BdyWall_width)
            const pos_mesh = pos_arr_rounded.clone().add(new THREE.Vector3( offsetValue_BdyWall*arrDir_y[i], offsetValue_BdyWall*offsetDir_y[i], 0 ) ) // offset from boundary
            const key_mesh = keyGen(pos_mesh);
            const angle_mesh = Math.PI / 2 *multp_angle[i];

            const pos_adjacent_mesh = pos_arr_rounded.clone().add(new THREE.Vector3( offsetValue_BdyWall*adjoffsetDir_x[i], offsetValue_BdyWall*adjoffsetDir_y[i], 0 ) );
            const key_adjacent_mesh = keyGen(pos_adjacent_mesh);
                // dispDotsfromCoords ( matDot_Large, [pos_arr_rounded] )  
                // console.log(pos_adjacent_mesh)
           
            const bool_keyExistance = getbool_keyExistance(key_adjacent_mesh);
            if ( bool_keyExistance ) { // if adjacent mesh exists, delete adjacent mesh
                ifMatchKey_deleteMesh(key_adjacent_mesh, 'BoundaryWall', 'Window01', 'Window02', 'Door01', 'Door02', 'Door03', 'Railing01', 'Stairs01'); 
                const pos_centre = new THREE.Vector3( pos_arr_rounded.x, pos_arr_rounded.y, zpos_AttrLine);
                const endpoints = getpos_EndPtsOfAttrLine (pos_centre, angle_mesh, BdyWall_width_half);
                // dispDotsfromCoords ( matDot_Large, [pos_centre] )
                addAttr_interior (pos_centre, endpoints[0], endpoints[1], matDashedMajorLine);
            } else {
                addBdyWall(key_mesh, pos_mesh, angle_mesh); // if adjacent mesh does not exist, add meshs
            }
                    
        }
   }
}

function deleteMeshEnclosure(pos_grpFloor) { // overwrite any existing hybrid module
    const list_CoordOfCorner = getCoordsOfBaseCorners( pos_grpFloor, floor_width, BdyWall_height_half-floor_thickness_half );//frontleft, frontright, backright, backleft
    const list = list_CoordOfCorner.slice(0)
    list.push(list[0]);
    // console.log( Object.keys(dictBdyWall) )
    // console.log( Object.keys(dictPartWall) )

    for(var i=0; i < list.length-1; i++){
        // CLOCKWISE MULTIPLIERS
        const arrDir_x = [1,0,-1,0]; const arrDir_y = arrDir_x.slice(0).reverse();
        const multp_angle_adj = [2,1,0,-1]; // [0,-1,2,1]
        const offsetDir_x = [0,-1,0,1]; 
        const offsetDir_y = [-1,0,1,0]; 
        const adjoffsetDir_x = [0,1,0,-1];
        const adjoffsetDir_y = [1,0,-1,0];

        // CREATE STARTING POS OF ARRAY
        const pos_corner = list[i]; // at boundary
        const pos_arrstart = pos_corner.clone().add(new THREE.Vector3( PartWall_width_half*arrDir_x[i], PartWall_width_half*arrDir_y[i], 0)); // at boundary
            // dispDotsfromCoords ( matDot_Large, [pos_arrstart] )
            // console.log(dictBdyWall)

        // CREATE ARRAY OF POS USING INCREMNENT BY FACTOR OF J
        // const list_pt = []; // to be overwritten
        for(var j=0; j < num_div_row_onFloor; j++){
            const pos_arr = pos_arrstart.clone().add(new THREE.Vector3( PartWall_width*j*arrDir_x[i], PartWall_width*j*arrDir_y[i], 0)); // at boundary
            const pos_arr_rounded = roundPos(pos_arr, 3); // at boundary, Javascript limitation: giving infinite decimal when the value is not infinite (see BdyWall_width)
            const pos_mesh = pos_arr_rounded.clone().add(new THREE.Vector3( offsetValue_BdyWall*arrDir_y[i], offsetValue_BdyWall*offsetDir_y[i], 0 ) ) // offset from boundary
            const key_mesh = keyGen(pos_mesh);
            const bool_keyExistance = getbool_keyExistance(key_mesh);

            const pos_partMesh = pos_arr_rounded;
            const key_partMesh = keyGen(pos_partMesh);
            const bool_keyExistance_partMesh = getbool_keyExistance(key_partMesh);

            const pos_adjacent_mesh = pos_arr_rounded.clone().add(new THREE.Vector3( offsetValue_BdyWall*adjoffsetDir_x[i], offsetValue_BdyWall*adjoffsetDir_y[i], 0 ) );
            const key_adjacent_mesh = keyGen(pos_adjacent_mesh);
            const angle_adjmesh = Math.PI / 2 *multp_angle_adj[i];
            
            // console.log( key_mesh,  key_adjacent_mesh)
            if ( bool_keyExistance ) { // if mesh exists, delete mesh
                ifMatchKey_deleteMesh(key_mesh, 'BoundaryWall', 'Window01', 'Window02', 'Door01', 'Door02', 'Door03', 'Railing01', 'Stairs01'); 
            } else {
                if (bool_keyExistance_partMesh) { // if partition mesh exist, delete
                    ifMatchKey_deleteMesh(key_partMesh, 'OpeningWall', 'PartitionWall', 'Window01', 'Window02', 'Door01', 'Door02', 'Door03', 'Railing01', 'Stairs01'); 
                }
                addBdyWall(key_adjacent_mesh, pos_adjacent_mesh, angle_adjmesh);
            }
            
            // list_pt.push( pt );
        }

    }
}

// var ceiling_height = truncNumTo3dp(groundHeight + BdyWall_height - ceiling_thickness_half - overlapOffset) // unusable as groundheight variable do not update
function genCeilingEnclosure(pos_grpFloor) {
    pos_grpCeiling = new THREE.Vector3(pos_grpFloor.x, pos_grpFloor.y, truncNumTo3dp(groundHeight + BdyWall_height - ceiling_thickness_half - overlapOffset)); // update global variable _pos, e.g. Vector3 {x: -1.5, y: 3, z: 0.25}
    const ceiling_key = keyGen(pos_grpCeiling);
    if ( dictCeiling [ceiling_key] == undefined ) {
        addCeiling(ceiling_key);
    } else {
        deleteCeiling(dictCeiling [ ceiling_key ]);
    }

    pos_grpCeiling = null;
}

// __________________________
//    	　_ * FLOOR FRACTION *
// ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾

function addFloorFrac(key) {

    // ADD MESH
    const mesh = meshFloorFrac.clone();
    mesh.position.set(pos_FloorFrac.x, pos_FloorFrac.y, pos_FloorFrac.z);
    scene.add( mesh );
    
    // ADD MESH PROPERTIES
    mesh.name = "floor_fraction"
    mesh.key = key;
    mesh.storey = storeyNum;

    const vol_id = calcVolumeID (mesh.position);
    mesh.volume_id = vol_id;

    // UPDATE GLOBAL VARIABLES, HTML
    dictFloorFrac[key] = mesh;

    // ADD MESH TO DICTFLOOR
    const key_parent = keyGen(pos_grpFloor);
    const grp_FloorFrac = dictFloor[key_parent] // Group {uuid: ...}
    grp_FloorFrac.add(mesh) // since key is alw in dictFloor, add child to value(parent)
}

function deleteFloorFrac( mesh ) {
    scene.remove( mesh );
    delete dictFloorFrac[ mesh.key ];

    // DELETE MESH FROM DICTFLOOR
    getValueList(dictFloor).forEach( function(grp_FloorFrac){ // Group {uuid:...}
        const list_FloorFrac = grp_FloorFrac.children; // (9) [Mesh, Mesh, Mesh, Mesh, Mesh, Mesh, Mesh, Mesh, Mesh]
        const FloorFrac = list_FloorFrac.find(element => element === mesh);
        if (FloorFrac !== undefined) {
            grp_FloorFrac.remove( FloorFrac );
        }
    }) 
}

function genFloorOpeningWallEnclosure(pos_FloorFrac) {
    const list_CoordOfCorner = getCoordsOfBaseCorners( pos_FloorFrac, FloorFrac_width, offsetHeight_posVerMod_fromFloorPos );//frontleft, frontright, backright, backleft
    const list = list_CoordOfCorner.slice(0)
    list.push(list[0]);

    // CLOCKWISE MULTIPLIERS
    const multp_angle = [2,1,0,-1]; // Front, Right, Back, Left
    const offsetDir_x    = [ 0, 1, 0,-1]; 
    const offsetDir_y    = [ 1, 0,-1, 0]; // [-1, 0, 1, 0]
    const adjoffsetDir_x = [ 0,-1, 0, 1]; // [ 0, 1, 0,-1]
    const adjoffsetDir_y = [-1, 0, 1, 0]; // [ 1, 0,-1, 0]

    for(var i=0; i < list.length - 1; i++){

        const pos_centre = calcMidptof2pt (list[i], list[i+1]);

        const pos_mesh = truncPosTo2dp(pos_centre.clone().add(new THREE.Vector3( offsetValue_BdyWall*offsetDir_x[i], offsetValue_BdyWall*offsetDir_y[i], 0 ) ) ) // offset from boundary
        const key_mesh = keyGen(pos_mesh);
        const angle_mesh = Math.PI / 2 *multp_angle[i]

        const pos_adjacent_mesh = truncPosTo2dp(pos_centre.clone().add(new THREE.Vector3( offsetValue_BdyWall*adjoffsetDir_x[i], offsetValue_BdyWall*adjoffsetDir_y[i], 0 ) ) );
        const key_adjacent_mesh = keyGen( pos_adjacent_mesh )
            // dispDotsfromCoords( matAttrDot_Large, [pos_mesh] )
            // console.log( pos_mesh, pos_adjacent_mesh )
        const bool_keyExistance = getbool_keyExistance(key_adjacent_mesh);
        if ( bool_keyExistance ) { // if adjacent mesh exists, delete adjacent mesh
            ifMatchKey_deleteMesh(key_adjacent_mesh, 'OpeningWall', 'Window01', 'Window02', 'Door01', 'Door02', 'Door03', 'Railing01', 'Stairs01'); 

            // const pos_AttrLine = getClosestAttrLinePos(pos_centre, pos_grpFloor);
            // const endPoints = getpos_EndPtsOfAttrLine (pos_AttrLine, angle_mesh, BdyWall_width_half);
                // console.log( key_AttrLine in dictAttrLine )
                // dispDotsfromCoords ( matDot_Large, [pos_centre] )
            // addAttr_opening (pos_AttrLine, endPoints[0], endPoints[1]);
        } else {
            // DO NOT ADD WHEN THERE IS A BDY MESH IN THE WAY
            var list_posBdy = []; 
            list_Bdy.forEach( function(dict){
                Object.values(dict).forEach(i => {
                    if ( i.storey == storeyNum ){
                        list_posBdy = list_posBdy.concat(i.position) // console.log(i.children) // e.g. (9) [Mesh, Mesh, Mesh, Mesh..]
                    }
                })
            })
            const closest_Bdypos = getClosestPos(pos_mesh, list_posBdy );
            const dist_toBdyPosClosest = pos_mesh.distanceTo(closest_Bdypos);
            if (dist_toBdyPosClosest > tol_betweenOpeningtoBdyMesh) {
                addOpeningWall(key_mesh, pos_mesh, angle_mesh, false); // if adjacent mesh does not exist, add meshs
            }
            // console.log(key_mesh, Object.keys(dictPartWall))

            // DELETE PART MESH WHEN IT IS IN THE WAY
            var list_posPart = [];
            list_Part.forEach( function(dict){
                Object.values(dict).forEach(i => {
                    if ( i.storey == storeyNum ){
                        list_posPart = list_posPart.concat(i.position) // console.log(i.children) // e.g. (9) [Mesh, Mesh, Mesh, Mesh..]
                    }
                })
            })
            const closest_Partpos = getClosestPos(pos_mesh, list_posPart );
            const dist_toPartPosClosest = pos_mesh.distanceTo(closest_Partpos);
            if (dist_toPartPosClosest < tol_betweenOpeningtoPartMesh) {
                addOpeningWall(key_mesh, pos_mesh, angle_mesh, false); // if adjacent mesh does not exist, add meshs
                const key_partMesh = keyGen( closest_Partpos );
                ifMatchKey_deleteMesh(key_partMesh, 'OpeningWall', 'Window01', 'Window02', 'Door01', 'Door02', 'Door03', 'Railing01', 'Stairs01'); 
            }
            // getValueList(dictBdyWall).forEach(function(mesh){list_pos.push( mesh.position ) });
            // if ()
            
            // const pos_AttrLine = getClosestAttrLinePos(pos_centre, pos_grpFloor);
            // const endPoints = getpos_EndPtsOfAttrLine (pos_AttrLine, angle_mesh, BdyWall_width_half);
                // dispDotsfromCoords(matAttrDot_Large, endPoints)
            // addAttr_opening (pos_AttrLine, endPoints[0],  endPoints[1]);
        }

    } 
}

function delFloorOpeningMeshEnclosure(pos_FloorFrac) {
    const list_CoordOfCorner = getCoordsOfBaseCorners( pos_FloorFrac, FloorFrac_width, offsetHeight_posVerMod_fromFloorPos );//frontleft, frontright, backright, backleft
    const list = list_CoordOfCorner.slice(0)
    list.push(list[0]);

    // CLOCKWISE MULTIPLIERS
    const multp_angle = [2,1,0,-1]; // Front, Right, Back, Left
    const offsetDir_x    = [ 0, 1, 0,-1]; 
    const offsetDir_y    = [ 1, 0,-1, 0]; // [-1, 0, 1, 0]
    const adjoffsetDir_x = [ 0,-1, 0, 1]; // [ 0, 1, 0,-1]
    const adjoffsetDir_y = [-1, 0, 1, 0]; // [ 1, 0,-1, 0]

    for(var i=0; i < list.length - 1; i++){

        const pos_centre = calcMidptof2pt (list[i], list[i+1]);

        const pos_mesh = truncPosTo2dp(pos_centre.clone().add(new THREE.Vector3( offsetValue_BdyWall*offsetDir_x[i], offsetValue_BdyWall*offsetDir_y[i], 0 ) ) ) // offset from boundary
        const key_mesh = keyGen(pos_mesh);
        const bool_keyExistance = getbool_keyExistance(key_mesh);

        const pos_adjacent_mesh = truncPosTo2dp(pos_centre.clone().add(new THREE.Vector3( offsetValue_BdyWall*adjoffsetDir_x[i], offsetValue_BdyWall*adjoffsetDir_y[i], 0 ) ) );
        const key_adjacent_mesh = keyGen( pos_adjacent_mesh )
        const angle_adjmesh = Math.PI / 2 *multp_angle[i]
            // dispDotsfromCoords( matAttrDot_Large, [pos_mesh] )
            // console.log( pos_mesh, pos_adjacent_mesh )
        if ( bool_keyExistance ) { // if adjacent mesh exists, delete adjacent mesh
            ifMatchKey_deleteMesh(key_mesh, 'OpeningWall', 'Window01', 'Window02', 'Door01', 'Door02', 'Door03', 'Railing01', 'Stairs01'); 
        } else {
            const list_pos = [];
            getValueList(dictBdyWall).forEach(function(mesh){list_pos.push( mesh.position ) });
            const closest_pos = getClosestPos(pos_mesh, list_pos );
            const dist_toPosClosest = pos_mesh.distanceTo(closest_pos);
            if (dist_toPosClosest > tol_betweenOpeningtoBdyMesh) {
                addOpeningWall(key_adjacent_mesh, pos_adjacent_mesh, angle_adjmesh, false); // if adjacent mesh does not exist, add meshs
            }
            
            // const pos_AttrLine = getClosestAttrLinePos(pos_centre, pos_grpFloor);
            // const endPoints = getpos_EndPtsOfAttrLine (pos_AttrLine, angle_mesh, BdyWall_width_half);
                // dispDotsfromCoords(matAttrDot_Large, endPoints)
            // addAttr_opening (pos_AttrLine, endPoints[0],  endPoints[1]);
        }

    } 
}

function getClosestAttrLinePos(pos, pos_grpFloor) { // combat stack overflow issue
    const list_posOfDivCen = getListofDivCen_fromFloorPos (pos_grpFloor);
    const list_AttrLinesOnFloor = []
    list_posOfDivCen.forEach(function(cen) {
            // console.log( '1 grid' );
            // dispDotsfromCoords(matAttrDot_Large,[cen])
        const list_CoordOfCorner = getCoordsOfBaseCorners( cen, PartWall_width, 0 );
        // console.log(list_posOfDivCen)
        const list = list_CoordOfCorner.slice(0)
        list.push(list[0]);
        for(var i=0; i < list.length - 1; i++){
            const pos_midpoint = calcMidptof2pt (list[i], list[i+1]);
            list_AttrLinesOnFloor.push(pos_midpoint)
        } 
    }) 
    const pos_AttrLine = getClosestPos(pos, list_AttrLinesOnFloor)
    if (pos_AttrLine.distanceTo(pos) < 1.1) {
        return pos_AttrLine
    } else {
        return pos
    }
}


// __________________________
//    	　_ * CEILING * 
// ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾

function addCeiling(key) {

    // ADD MESH
    const grpCeiling = new THREE.Group();
    const list_posOfDivCen = getListofDivCen_fromFloorPos (pos_grpCeiling);
    list_posOfDivCen.forEach(function(cen) {
        const mesh = meshCeilingFrac.clone();
        mesh.position.set( cen.x, cen.y, truncNumTo3dp(cen.z-floor_thickness_half) );

        // ADD MESH PROPERTIES
        mesh.name = "ceiling_fraction";
        grpCeiling.add(mesh);

        const key = keyGen(mesh.position);
        mesh.key = key;
        dictCeilingFrac[key] = mesh;
    })
    scene.add( grpCeiling );
    
    // ADD MESH PROPERTIES
    grpCeiling.name = "ceiling"
    grpCeiling.key = key;
    // const vol_id = calcVolumeID (pos_grpCeiling)
    // grpCeiling.volume_id = vol_id;
    grpCeiling.storey = storeyNum;

    // UPDATE GLOBAL VARIABLES, HTML
    dictCeiling[key] = grpCeiling;
    cnt_grpCeiling += 1; 
    // document.getElementById('buttonCeiling').innerHTML = "Ceiling: " + cnt_grpCeiling;

    /*
    // ADD MESH
    const meshCeiling = new THREE.Mesh(geomCeiling, particleboard);
    meshCeiling.position.set(pos_grpCeiling.x, pos_grpCeiling.y, pos_grpCeiling.z);
    scene.add( meshCeiling );

    // ADD MESH PROPERTIES
    meshCeiling.name = "ceiling"
    meshCeiling.ceiling_key = key;
    meshCeiling.storey = storeyNum;
    meshCeiling.visible = false
    */
};


function deleteCeiling(grpCeiling) {
    scene.remove( grpCeiling );
    delete dictCeiling[ grpCeiling.key ];
    cnt_grpCeiling -= 1; 
    // document.getElementById('buttonCeiling').innerHTML = "Ceiling: " + cnt_grpCeiling;
};

//    	　_ * CEILING FRACTION *
// ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾

function addCeilingFrac(key) {

    // ADD MESH
    const mesh = meshCeilingFrac.clone();
    mesh.position.set(pos_CeilingFrac.x, pos_CeilingFrac.y, pos_CeilingFrac.z);
    scene.add( mesh );
    
    // ADD MESH PROPERTIES
    mesh.name = "ceiling_fraction"
    mesh.key = key;
    mesh.storey = storeyNum;
    // console.log(storeyNum)

    const vol_id = calcVolumeID (mesh.position);
    mesh.volume_id = vol_id;

    // UPDATE GLOBAL VARIABLES, HTML
    dictCeilingFrac[key] = mesh;

    // ADD MESH TO DICTCeiling
    const key_parent = keyGen(pos_grpCeiling);
    // console.log(key_parent, dictCeiling)
    const grp_CeilingFrac = dictCeiling[key_parent] // Group {uuid: ...}
    grp_CeilingFrac.add(mesh) // since key is alw in dictCeiling, add child to value(parent)
}

function deleteCeilingFrac( mesh ) {
    scene.remove( mesh );
    delete dictCeilingFrac[ mesh.key ];

    // DELETE MESH FROM DICTFLOOR
    getValueList(dictCeiling).forEach( function(grp_CeilingFrac){ // Group {uuid:...}
        const list_CeilingFrac = grp_CeilingFrac.children; // (9) [Mesh, Mesh, Mesh, Mesh, Mesh, Mesh, Mesh, Mesh, Mesh]
        const CeilingFrac = list_CeilingFrac.find(element => element === mesh);
        if (CeilingFrac !== undefined) {
            grp_CeilingFrac.remove( CeilingFrac );
        }
    }) 
}

// __________________________
//    	　_ * OPENING WALL * 
// ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾

function addOpeningWall(key, pos, angle, DefaultAttr = true) {
    
    // ADD MESH
    /*
    const materials = [
        obs,
        concrete,
    ];
    for (let i = 0; i < geomBdyWall.groups.length; i++) {
        geomBdyWall.groups[i].materialIndex = 0; 
    }
    geomBdyWall.groups[2].materialIndex = 1 //[2]outside, [3]inside, [4]top, [5]bottom, [0][1]sides

    const mesh = new THREE.Mesh( geomBdyWall, materials );
    */
    const mesh = new THREE.Mesh( geomBdyWall, obs );
    mesh.position.set(pos.x, pos.y, pos.z);
    scene.add( mesh );

    // ADD MESH PROPERTIES
    mesh.name = "OpeningWall";
    mesh.key = key;
    mesh.storey = storeyNum;
    const vol_id = calcVolumeID (pos);
    mesh.volume_id = vol_id;



    // UPDATE GLOBAL VARIABLES, HTML
    dictOpeningWall[key] = mesh;
    mesh.rotation.z = angle;
    cnt_meshBdyWall += 1; 
    document.getElementById('buttonBoundaryWall').innerHTML = "Boundary Wall (ignore): " + cnt_meshBdyWall;
    mesh.matrixAutoUpdate = false;
    mesh.updateMatrix();
    
    if (DefaultAttr) {
        const pos_AttrLine = getPos_AttrLine_atBdy (pos, angle);
        // dispDotsfromCoords( matAttrDot_Large, [pos_AttrLine])
        const endPoints = getpos_EndPtsOfAttrLine (pos_AttrLine, angle, BdyWall_width_half);
        addAttr_boundary (pos_AttrLine, endPoints[0],  endPoints[1]);
    }
};

// Delete a BdyWall
function deleteOpeningWall(mesh) {
    // const pos_AttrLine = getPos_AttrLine_atBdy (mesh.position, mesh.rotation.z);
    scene.remove( mesh );
    delete dictOpeningWall[ mesh.key ];
    cnt_meshBdyWall -= 1; 
    document.getElementById('buttonBoundaryWall').innerHTML = "Boundary Wall (ignore): " + cnt_meshBdyWall;
    
    // const endPoints = getpos_EndPtsOfAttrLine (pos_AttrLine, meshBdyWall.rotation.z, BdyWall_width_half);
    // delAttr_boundary(pos_AttrLine, endPoints[0], endPoints[1])

};


// __________________________
//    	　_ * BOUNDARY WALL * 
// ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾

function addBdyWall(key, pos, angle, DefaultAttr = true) {
    
    // ADD MESH
    /*
    const materials = [
        obs,
        concrete,
    ];
    for (let i = 0; i < geomBdyWall.groups.length; i++) {
        geomBdyWall.groups[i].materialIndex = 0; 
    }
    geomBdyWall.groups[2].materialIndex = 1 //[2]outside, [3]inside, [4]top, [5]bottom, [0][1]sides

    const meshBdyWall = new THREE.Mesh( geomBdyWall, materials );
    */
    const meshBdyWall = new THREE.Mesh( geomBdyWall, obs );
    meshBdyWall.position.set(pos.x, pos.y, pos.z);
    scene.add( meshBdyWall );

    // ADD MESH PROPERTIES
    meshBdyWall.name = "BoundaryWall";
    meshBdyWall.key = key;
    meshBdyWall.storey = storeyNum;


    // UPDATE GLOBAL VARIABLES, HTML
    dictBdyWall[key] = meshBdyWall;
    meshBdyWall.rotation.z = angle;
    cnt_meshBdyWall += 1; 
    document.getElementById('buttonBoundaryWall').innerHTML = "Boundary Wall (ignore): " + cnt_meshBdyWall;
    meshBdyWall.matrixAutoUpdate = false;
    meshBdyWall.updateMatrix();
    
    if (DefaultAttr) {
        const pos_AttrLine = getPos_AttrLine_atBdy (pos, angle);
        // dispDotsfromCoords( matAttrDot_Large, [pos_AttrLine])
        const endPoints = getpos_EndPtsOfAttrLine (pos_AttrLine, angle, BdyWall_width_half);
        addAttr_boundary (pos_AttrLine, endPoints[0],  endPoints[1]);
    }
};

// Delete a BdyWall
function deleteBdyWall(meshBdyWall) {
    const pos_AttrLine = getPos_AttrLine_atBdy (meshBdyWall.position, meshBdyWall.rotation.z);
    scene.remove( meshBdyWall );
    delete dictBdyWall[ meshBdyWall.key ];
    cnt_meshBdyWall -= 1; 
    document.getElementById('buttonBoundaryWall').innerHTML = "Boundary Wall (ignore): " + cnt_meshBdyWall;
    
    const endPoints = getpos_EndPtsOfAttrLine (pos_AttrLine, meshBdyWall.rotation.z, BdyWall_width_half);
    delAttr_boundary(pos_AttrLine, endPoints[0], endPoints[1])

};

// __________________________
//    	　_ * PARTITION WALL * 
// ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾

function addPartWall(key, pos, angle) {
    
    // ADD MESH
    const mesh = new THREE.Mesh( geomPartWall, obs );

    // const mesh = new THREE.Mesh( geomPartWall, obsLight );
    mesh.position.set(pos.x, pos.y, pos.z);
    scene.add( mesh );


    // ADD MESH PROPERTIES
    mesh.name = "PartitionWall"
    mesh.key = key;
    mesh.storey = storeyNum;


    const vol_id = calcVolumeID (pos);
    mesh.volume_id = vol_id;

    // UPDATE GLOBAL VARIABLES, HTML
    dictPartWall[key] = mesh;
    mesh.rotation.z = angle;
    cnt_meshPartWall += 1; 
    document.getElementById('buttonPartitionWall').innerHTML = "Partition Wall: " + cnt_meshPartWall;
    mesh.matrixAutoUpdate = false;
    mesh.updateMatrix();

    // ADD ATTRIBUTE
    const pos_AttrLine = getPos_AttrLine_atBdy (pos, angle);
    const endPoints = getpos_EndPtsOfAttrLine (pos_AttrLine, angle, BdyWall_width_half);
    addAttr_boundary (pos_AttrLine, endPoints[0],  endPoints[1]);
};



// Delete a PartWall
function deletePartWall(mesh) {
    scene.remove( mesh );
    delete dictPartWall[ mesh.key ];
    cnt_meshPartWall -= 1; 
    document.getElementById('buttonPartitionWall').innerHTML = "Partition Wall: " + cnt_meshPartWall;
};

function deletePartMesh( mesh ) {
    scene.remove( mesh );

} 

// __________________________
//    	　_ * WINDOW01 * 
// ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾

function addWindow01(key) {

    // ADD MESH
    const mesh = meshWindow01.clone();
    mesh.position.set(pos_grpWindow01.x, pos_grpWindow01.y, pos_grpWindow01.z);
    scene.add( mesh );

    // ADD MESH PROPERTIES
    mesh.name = "Window01"
    mesh.key = key;
    mesh.storey = storeyNum;

    const vol_id = calcVolumeID (mesh.position);
    mesh.volume_id = vol_id;

    // UPDATE GLOBAL VARIABLES, HTML
    dictWindow01[key] = mesh;
    mesh.rotation.z = angle_grpWindow01;
    cnt_grpWindow01 += 1; 
    document.getElementById('buttonWindow01').innerHTML = "Fixed Window: " + cnt_grpWindow01;
};

// Delete a Window01
function deleteWindow01(mesh) {
    scene.remove( mesh );
    delete dictWindow01[ mesh.key ];
    cnt_grpWindow01 -= 1; 
    document.getElementById('buttonWindow01').innerHTML = "Fixed Window: " + cnt_grpWindow01;
};


// __________________________
//    	　_ * WINDOW02 * 
// ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾

function addWindow02(key) {

    // ADD MESH
    const mesh = grpWindow02.clone();
    mesh.position.set(pos_grpWindow02.x, pos_grpWindow02.y, pos_grpWindow02.z);
    scene.add( mesh );
    
    // ADD MESH PROPERTIES
    mesh.name = "Window02"
    mesh.key = key;
    mesh.storey = storeyNum;

    const vol_id = calcVolumeID (mesh.position);
    mesh.volume_id = vol_id;

    // UPDATE GLOBAL VARIABLES, HTML
    dictWindow02[key] = mesh;
    mesh.rotation.z = angle_grpWindow02;
    cnt_grpWindow02 += 1; 
    document.getElementById('buttonWindow02').innerHTML = "Sliding Window: " + cnt_grpWindow02;
};

// Delete a Window02
function deleteWindow02(mesh) {
    scene.remove( mesh );
    delete dictWindow02[ mesh.key ];
    cnt_grpWindow02 -= 1; 
    document.getElementById('buttonWindow02').innerHTML = "Sliding Window: " + cnt_grpWindow02;
};


// __________________________
//    	　_ * DOOR01 * 
// ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾

function addDoor01(key) {

    // ADD MESH
    const mesh = meshDoor01.clone();
    mesh.position.set(pos_grpDoor01.x, pos_grpDoor01.y, pos_grpDoor01.z);
    scene.add( mesh );
    
    // ADD MESH PROPERTIES
    mesh.name = "Door01"
    mesh.key = key;
    mesh.storey = storeyNum;

    const vol_id = calcVolumeID (mesh.position);
    mesh.volume_id = vol_id;

    // UPDATE GLOBAL VARIABLES, HTML
    dictDoor01[key] = mesh;
    mesh.rotation.z = angle_grpDoor01;
    cnt_grpDoor01 += 1; 
    document.getElementById('buttonDoor01').innerHTML = "Timber Door: " + cnt_grpDoor01;
};

// Delete a Door01
function deleteDoor01(mesh) {
    scene.remove( mesh );
    delete dictDoor01[ mesh.key ];
    cnt_grpDoor01 -= 1; 
    document.getElementById('buttonDoor01').innerHTML = "Timber Door: " + cnt_grpDoor01;
};


// __________________________
//    	　_ * DOOR02 * 
// ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾

function addDoor02(key) {

    // ADD MESH
    const mesh = meshDoor02.clone();
    mesh.position.set(pos_grpDoor02.x, pos_grpDoor02.y, pos_grpDoor02.z);
    scene.add( mesh );
    
    // ADD MESH PROPERTIES
    mesh.name = "Door02"
    mesh.key = key;
    mesh.storey = storeyNum;

    const vol_id = calcVolumeID (mesh.position);
    mesh.volume_id = vol_id;

    // UPDATE GLOBAL VARIABLES, HTML
    dictDoor02[key] = mesh;
    mesh.rotation.z = angle_grpDoor02;
    cnt_grpDoor02 += 1; 
    document.getElementById('buttonDoor02').innerHTML = "Glass Door: " + cnt_grpDoor02;
};

// Delete a Door02
function deleteDoor02(mesh) {
    scene.remove( mesh );
    delete dictDoor02[ mesh.key ];
    cnt_grpDoor02 -= 1; 
    document.getElementById('buttonDoor02').innerHTML = "Glass Door: " + cnt_grpDoor02;
};


// __________________________
//    	　_ * DOOR03 * 
// ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾

function addDoor03(key) {

    // ADD MESH
    const mesh = meshDoor03.clone();
    mesh.position.set(pos_grpDoor03.x, pos_grpDoor03.y, pos_grpDoor03.z);
    scene.add( mesh );
    
    // ADD MESH PROPERTIES
    mesh.name = "Door03"
    mesh.key = key;
    mesh.storey = storeyNum;

    const vol_id = calcVolumeID (mesh.position);
    mesh.volume_id = vol_id;

    // UPDATE GLOBAL VARIABLES, HTML
    dictDoor03[key] = mesh;
    mesh.rotation.z = angle_grpDoor03;
    cnt_grpDoor03 += 1; 
    document.getElementById('buttonDoor03').innerHTML = "Sliding Glass Door: " + cnt_grpDoor03;
};

// Delete a Door03
function deleteDoor03(mesh) {
    scene.remove( mesh );
    delete dictDoor03[ mesh.key ];
    cnt_grpDoor03 -= 1; 
    document.getElementById('buttonDoor03').innerHTML = "Sliding Glass Door: " + cnt_grpDoor03;
};


// __________________________
//    	　_ * RAILING01 * 
// ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾

function addRailing01(key) {

    // ADD MESH
    const mesh = meshRailing01.clone();
    mesh.position.set(pos_grpRailing01.x, pos_grpRailing01.y, pos_grpRailing01.z);
    scene.add( mesh );
    
    // ADD MESH PROPERTIES
    mesh.name = "Railing01"
    mesh.key = key;
    mesh.storey = storeyNum;

    const vol_id = calcVolumeID (mesh.position);
    mesh.volume_id = vol_id;

    // UPDATE GLOBAL VARIABLES, HTML
    dictRailing01[key] = mesh;
    mesh.rotation.z = angle_grpRailing01;
    cnt_grpRailing01 += 1; 
    document.getElementById('buttonRailing01').innerHTML = "Railing: " + cnt_grpRailing01;
};

// Delete a Railing01
function deleteRailing01(mesh) {
    scene.remove( mesh );
    delete dictRailing01[ mesh.key ];
    cnt_grpRailing01 -= 1; 
    document.getElementById('buttonRailing01').innerHTML = "Railing: " + cnt_grpRailing01;
};

// __________________________
//    	　_ * STAIRS01 * 
// ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾

function addStairs01(key) {

    // ADD MESH
    const mesh = meshStairs01.clone();
    mesh.position.set(pos_grpStairs01.x, pos_grpStairs01.y, pos_grpStairs01.z);
    scene.add( mesh );
    
    // ADD MESH PROPERTIES
    mesh.name = "Stairs01"
    mesh.key = key;
    mesh.storey = storeyNum;

    const vol_id = calcVolumeID (mesh.position);
    mesh.volume_id = vol_id;

    // UPDATE GLOBAL VARIABLES, HTML
    const index = angle_grpStairs01 / (-Math.PI/2);
    const list_CoordofArrPts = findOccupiedPosByStairs(index, pos_grpStairs01); 
    list_CoordofArrPts.forEach(function(pos){//4 points
        const sub_key = keyGen(pos);
        dictStairs01[sub_key] = mesh;
    })

    mesh.rotation.z = angle_grpStairs01;
    mesh.scale.multiply(scale_grpStairs01);
    cnt_grpStairs01 += 1; 
    document.getElementById('buttonStairs01').innerHTML = "Stairs: " + cnt_grpStairs01;
};

function deleteFloorFrac_addStairs(key){
    const index = angle_grpStairs01 / (-Math.PI/2);
    const list_CoordofArrPts = findOccupiedPosByStairs(index, pos_grpStairs01);
        // dispDotsfromCoords( matAttrDot_Large, list_CoordofArrPts )

    // TOLERANCE
    list_CoordofArrPts.forEach( function(pt){
        const pt_extrap_ceiling = pt.clone().add(new THREE.Vector3(0,0,BdyWall_height-floor_thickness+floor_thickness_half))
        var list_posFloorFrac = [];
            Object.keys(dictFloorFrac).forEach(i => {
                if ( dictFloorFrac[i].parent.storey == storeyNum+1 ){
                    const pos = posfromKey( i );
                    list_posFloorFrac.push(pos);
                }
            })
            // console.log(list_posFloorFrac)

        const closest_pos = getClosestPos(pt_extrap_ceiling, list_posFloorFrac );
        const dist_toPosClosest = pt_extrap_ceiling.distanceTo(closest_pos);
        const tol_betweenArrPttoDictPt = 0.1
        if (dist_toPosClosest < tol_betweenArrPttoDictPt) {
            const pos_CeilFrac = new THREE.Vector3(closest_pos.x, closest_pos.y, truncNumTo3dp(groundHeight + BdyWall_height - ceiling_thickness_half - overlapOffset) ); // update global variable _pos, e.g. Vector3 {x: -1.5, y: 3, z: 0.25}
            const key_CeilingFrac = keyGen(pos_CeilFrac);
                // console.log(key_CeilingFrac, dictCeilingFrac)
            deleteCeilingFrac(dictCeilingFrac[key_CeilingFrac])

            const key_FloorFrac = keyGen(closest_pos)
            deleteFloorFrac(dictFloorFrac[key_FloorFrac]); 
            storeyNum +=1
            genFloorOpeningWallEnclosure(closest_pos);
            storeyNum -=1
        }
    })
    // console.log(list_CoordofArrPts)
    // console.log(dictFloorFrac) 

}


// Delete a Stairs01
function deleteStairs01(mesh) {
    scene.remove( mesh );

    const index = mesh.rotation.z / (-Math.PI/2);
    const list_CoordofArrPts = findOccupiedPosByStairs(index, pos_grpStairs01);
    list_CoordofArrPts.forEach(function(pos){//4 points
        const sub_key = keyGen(pos);
        delete dictStairs01[ sub_key ]; 
    })
    cnt_grpStairs01 -= 1; 
    document.getElementById('buttonStairs01').innerHTML = "Stairs: " + cnt_grpStairs01;
};

function addFloorFrac_deleteStairs(mesh) {
    const index = mesh.rotation.z / (-Math.PI/2);
    const list_CoordofArrPts = findOccupiedPosByStairs(index, pos_grpStairs01);
        // console.log(dictFloorFrac)

    // TOLERANCE
    list_CoordofArrPts.forEach( function(pt){
        groundHeight += volume_height; 
        const pt_extrap_Floor = pt.clone();
        pt_extrap_Floor.z = groundHeight + floor_thickness_half;
        pos_grpFloor = getPos_grpFloor_MathGrid ( pt_extrap_Floor ); // gives pos_grpFloor

        const list_posOfDivCen = getListofDivCen_fromFloorPos (pos_grpFloor); // getPos_FloorFrac_MathGrid ( pos ) do not work due to rounding issues
        pos_FloorFrac = getClosestPos (pt_extrap_Floor, list_posOfDivCen);
        pos_FloorFrac.z = groundHeight + floor_thickness_half;
            // console.log(pt_extrap_Floor,pos_grpFloor,pos_FloorFrac)

        storeyNum +=1
        const key_FloorFrac = keyGen(pos_FloorFrac)
        addFloorFrac(key_FloorFrac); 
        delFloorOpeningMeshEnclosure(pos_FloorFrac);
        storeyNum -=1
        groundHeight -=volume_height

        pos_grpCeiling = new THREE.Vector3( pos_grpFloor.x, pos_grpFloor.y, truncNumTo3dp(groundHeight + volume_height - ceiling_thickness_half - overlapOffset) )
        const key_Ceiling = keyGen( pos_grpCeiling );
        pos_CeilingFrac = new THREE.Vector3(pos_FloorFrac.x, pos_FloorFrac.y, truncNumTo3dp(groundHeight + volume_height - ceiling_thickness_half - overlapOffset) ); // update global variable _pos, e.g. Vector3 {x: -1.5, y: 3, z: 0.25}
        const key_CeilingFrac = keyGen(pos_CeilingFrac);
        addCeilingFrac(key_CeilingFrac) 

    })

}


//////////////////// -------------HELPER FUNCTIONS------------------------------------------------------ //////////////////// 

// ====================================================
// { Display } 
// ====================================================

// --------------------------------
//    Toggle Storey Height
// --------------------------------

function changeGroundHeight() { // update storeyNum, groundHeight and grid display
    const radioButtons = document.querySelectorAll('input[name="storeyNum"]');
    for (const radioButton of radioButtons) {
        if (radioButton.checked) {
            // console.log(parseInt(radioButton.value), typeof(parseInt(radioButton.value)))
            storeyNum = parseInt(radioButton.value);
            break; // Since only one radio button in a radio group can be checked at a time, the loop is terminated immediately by the break statement.
        }
    }
    groundHeight = (storeyNum-1)*volume_height;
    zpos_AttrLine = floor_thickness + groundHeight;
    ground.position.z = groundHeight;    

}

// --------------------------------
//    Toggle Grid Display
// --------------------------------


function toggleDisp_Grid(){
    for (var i = 1; i <= Object.keys(dictGrid).length; i++) {
        if (i==storeyNum) {
            dictGrid[i].visible = true;
                dictGrid[i].position.z = ground.position.z;
        } else {
            dictGrid[i].visible = false;
        }
    }
}

// --------------------------------
//    Toggle Storey and Ceiling Display
// --------------------------------

function eyeIconStoreyTgl(){ // https://www.csestack.org/hide-show-password-eye-icon-html-javascript/
    const eyeIcons = document.getElementsByClassName("fa-eye"); // HTMLCollection;  
    for (const eyeIcon of eyeIcons) { // cannot interate through a collection using forEach
        const value = eyeIcon.getAttribute('value');
        if (value == storeyNum) { // working storey
            eyeIcon.classList.remove('fa-eye-slash'); // eye
            toggleDisp_Storey(value, true); // show storey
            toggleDisp_Ceiling (value, false); // hide ceiling
        } 
        else if (value > storeyNum) { // higher storey
            eyeIcon.classList.add('fa-eye-slash'); // eye-slash
            toggleDisp_Storey(value, false); // hide storey
            toggleDisp_Ceiling (value, false); // hide ceiling
        } 
        else if (value < storeyNum) { // higher storey
            const classlist = eyeIcon.classList[2]; // undefined or fa-eye-slash; eyeIcon.classList = DOMTokenList(3) ['fa-solid', 'fa-eye', 'fa-eye-slash', value: 'fa-solid fa-eye fa-eye-slash']
            const bool_eyeSlash = classlist== "fa-eye-slash";

            if (bool_eyeSlash) { // eye slash
                toggleDisp_Storey(value, false); // hide storey
                toggleDisp_Ceiling (value, false); // hide ceiling
                eyeIcon.addEventListener('click', function () { // eye when click
                    eyeIcon.classList.remove('fa-eye-slash');
                });
            }
            else { // eye
                toggleDisp_Storey(value, true); // show storey
                toggleDisp_Ceiling (value, true); // show ceiling
                eyeIcon.addEventListener('click', function () { // eye-slash when click
                    eyeIcon.classList.add('fa-eye-slash');
                });
            }
        }
        
    }
}

function toggleDisp_Storey(eyeIcon_value, bool) { // i.e. 'Storey1', 'Storey2'
    dictAll.forEach( function(dict){
        const list_mesh = getValueList(dict); // [Mesh]
        list_mesh.forEach( function(mesh) {
            if (typeof(mesh.storey)!="undefined") {
                const bool_idMatch = String(mesh.storey)==eyeIcon_value;
                // console.log(bool_idMatch)
                if ( bool_idMatch ) { // if id match, delete
                    mesh.visible = bool; // toggle a boolean in JavaScript: !true = false, !false = true
                }
            }
        } );

    } );
};

function toggleDisp_Ceiling (storeylvl, bool_visibility) {
    const list_meshCeiling = Object.values(dictCeiling)
    list_meshCeiling.forEach(function(meshCeiling){
        if (meshCeiling.storey == storeylvl){
            meshCeiling.visible = bool_visibility; // if on the storey, hide ceiling
        } 
    });
}

// --------------------------------
//    Toggle Object Display
// --------------------------------

eyeIconObjectTgl();

function eyeIconObjectTgl(){ // https://www.csestack.org/hide-show-password-eye-icon-html-javascript/
    const eyeIcons = document.getElementsByClassName("fa-eye"); // HTMLCollection;  

    for (const eyeIcon of eyeIcons) { // cannot interate through a collection using forEach
        eyeIcon.addEventListener('click', function () { // when clicked
            const id = eyeIcon.id;
            if (id !== "") { // if id exist, i.e. not an emptry string
                toggleDisp_Object(id);
                eyeIcon.classList.toggle('fa-eye-slash'); // toggle the eye slash icon. 
            }
        });
    }
}
function toggleDisp_Object(eyeIcon_id) { // i.e. 'Chassis', 'GrpMeshNeighbours'
        scene.getObjectByName(eyeIcon_id).visible = !scene.getObjectByName(eyeIcon_id).visible;
};

function addNeighbourtoGroup(mesh) {
    const fullmesh = mesh.getObjectByName(mesh.name+"gltf")
    GrpMeshNeighbours.add( fullmesh ) // Object3D { children: (36) [Object3D, Object3D...]}
}


// ====================================================
// { Raycaster } 
// ====================================================

// --------------------------------
//    Get Meshes Intersected ★
// --------------------------------
function getListofMeshInt() {
    raycaster.setFromCamera( mouse, camera ); // create a ray from the camera and intersect it with objects in the scene
    const list_meshScene = getMeshInScene(); // get the meshes in the scene to check for intersections
    pushMergedFloorMesh (list_meshScene);
    const list_meshInt = raycaster.intersectObjects( list_meshScene ); // returns an array of cursor-intersected items, e.g. (3) [{…}, {…}, {…}] 
    return list_meshInt
}
function checkIfMeshInt0IsOnCurrentStorey(list_meshInt, meshInt0) {
    if ( list_meshInt.length > 0) { // if intersect with any meshes
        const pos_mouse = meshInt0.point;
        const bool_meshInt0IsOnCurrentStorey = (groundHeight - volume_height_half) < pos_mouse.z && pos_mouse.z <= (groundHeight + volume_height_half) // if intersected on 'Floor_Zone' on the current storey
        // console.log(bool_meshInt0IsOnCurrentStorey, pos_mouse.z, (groundHeight + volume_height_half), meshInt0.object)

        return bool_meshInt0IsOnCurrentStorey
    } else {
        return false
    }
}

// --------------------------------
//    Get Meshes In Scene ★
// --------------------------------
function pushMergedFloorMesh (list_meshScene) {
    if (dictMergedMesh[storeyNum] !== undefined) {
        list_meshScene.push(dictMergedMesh[storeyNum]);
    }
}

function getMeshInScene() {
    
    var list_meshScene = []; // get the mesh in the scene to check for intersections

    list_dictVertSIP.forEach( function(dict){
        Object.values(dict).forEach(i => {
            if ( i.storey == storeyNum ){
                list_meshScene = list_meshScene.concat(i) // console.log(i.children) // e.g. (9) [Mesh, Mesh, Mesh, Mesh..]
            }
        })
    })

    Object.values(dictFloor).forEach(i => {
        if ( i.storey == storeyNum ){
            list_meshScene = list_meshScene.concat(i.children) // console.log(i.children) // e.g. (9) [Mesh, Mesh, Mesh, Mesh..]
        }
    })

    list_dictHybrid.forEach( function(dict){
        // console.log('~~~Object.values(dictWindow01)~~~', Object.values(dictWindow01)) // e.g. (3) [Group, Group, Group] (i.e. 3 windows in the scene)
        Object.values(dict).forEach(i => { // for each group in the scene
            // console.log('~~~i~~~', i) // e.g. Group {..,name: 'Window01', children: [Object3D], .....}
            // console.log('~~~i.children[0]~~~', i.children[0]) // e.g. Object3D {..}
            // console.log('~~~i.children~~~', i.children) // e.g. [Object3D] {0: Object3D, [[Prototype]]: Array(0)}
            // console.log('~~~i.children[0].children~~~', i.children[0].children) // e.g. (4) [Mesh, Mesh, Mesh, Mesh]
            if ( i.storey == storeyNum ){
                list_meshScene = list_meshScene.concat(i.children[0].children) // concat the its meshes into the list 
            }
        })
    })

    // console.log('~~~sceneMeshesAll~~~', list_meshScene) // e.g. (12) [Mesh, Mesh, Mesh, Mesh, Mesh, Mesh, Mesh, Mesh, Mesh, Mesh, Mesh, Mesh]
    return list_meshScene
}

// --------------------------------
//    Add FloorOpening Del Display  
// --------------------------------
function addHoverDisp_FloorOpening(meshInt0){
    const cen_meshInt0 = meshInt0.object.position; // centre of the first mesh that the cursor intersects, e.g. Vector3 {x: -1.5, y: 3, z: 0.25}
    pos_FloorFrac = new THREE.Vector3(cen_meshInt0.x, cen_meshInt0.y, cen_meshInt0.z); // update global variable _pos, e.g. Vector3 {x: -1.5, y: 3, z: 0.25}
    
    pos_grpFloor = getPos_grpFloor_MathGrid ( pos_FloorFrac ); // gives pos_grpFloor

    const pos_volumeBelow = pos_grpFloor.clone().add(new THREE.Vector3(0,0, -floor_thickness_half - volume_height_half  ) )
    const key_volumeBelow = keyGen(pos_volumeBelow);
    if (key_volumeBelow in dictVolume) { // show geom_trans_del only if there is volume below
        meshFloorFracDel.position.set(pos_FloorFrac.x, pos_FloorFrac.y, pos_FloorFrac.z);
        meshFloorFracDel.visible = true;
        meshFloorFracTrans.visible = false;
    } else {
        showHelper('Cannot create floor opening without a purchased volume below.')
    }

}

// --------------------------------
//    Add FloorOpening Hover Display  
// --------------------------------
function addDelDisp_FloorOpening(meshInt0){
    const pos_mouse = meshInt0.point;
    pos_grpFloor = getPos_grpFloor_MathGrid ( pos_mouse ); // gives pos_grpFloor
    const list_posOfDivCen = getListofDivCen_fromFloorPos (pos_grpFloor); // getPos_FloorFrac_MathGrid ( pos ) do not work due to rounding issues
    const key_grpFloor = keyGen(pos_grpFloor);

    if ( key_grpFloor in dictFloor ) { // if groupFloor key exist, add Floor Frac
        pos_FloorFrac = getClosestPos (pos_mouse, list_posOfDivCen);
        pos_FloorFrac.z = groundHeight + floor_thickness_half;

        meshFloorFracTrans.position.set(pos_FloorFrac.x, pos_FloorFrac.y, pos_FloorFrac.z);
        meshFloorFracDel.visible = false;
        meshFloorFracTrans.visible = true;
    }

}

// --------------------------------
//    Add Stairs Hover Display ★ 
// --------------------------------

function addHoverDisp_Stairs01(pos, angle){
    GrpStairs01Trans.position.copy(pos);
    GrpStairs01Trans.rotation.z = angle;
    GrpStairs01Trans.visible = true;
    // GrpStairs01Del.visible = false;
}

function addHoverDisp_Stairs01_toIntFloorZone (meshInt0) {

    // GET POSITION (CLOSEST MINOR GRID CENTER POINTS) 
    const pos_mouse = meshInt0.point;
    const pos_Floor = getPos_grpFloor_MathGrid ( pos_mouse ); // gives pos_grpFloor
    const list_posOfDivCen = getListofDivCen_fromFloorPos (pos_Floor); // getPos_FloorFrac_MathGrid ( pos ) do not work due to rounding issues
    const key_grpFloor = keyGen(pos_Floor);

    var pos_cen_closest = null; // to be replaced
    if ( key_grpFloor in dictFloor ) { // if groupFloor key exist, add Floor Frac
        pos_cen_closest = getClosestPos (pos_mouse, list_posOfDivCen);
        pos_cen_closest.z = groundHeight + floor_thickness;
    }
        // console.log( pos_cen_closest )

    // ---copy from function addHoverDisp_Stairs01_toIntFloor --- //

    // GET CLOSEST MINOR GRID HOVER POINTS
    const list_CoordOfCorner = getCoordsOfBaseCorners( pos_cen_closest, PartWall_width, 0 ); // 4 corner grid points to the centre point, [frontleft, frontright, backright, backleft]
    const list = list_CoordOfCorner.slice(0); list.push(list[0]); // add first corner into the list again to allow a full for loop

    const list_hover = []; // to be overwritten; list of corner points that are end points of 2 attrlines 
    const list_interior = []; // to be overwritten; list of all corner points of interior attrlines with no repetitions 
    for(var i=0; i < list.length - 1; i++){ // loop through all the corner points
        const pos_midpoint = calcMidptof2pt (list[i], list[i+1]); // position of attribute lines

        const key = keyGen(pos_midpoint) // keys of attribute lines 
        const bool_Attr_interior = dictAttrLine[ key ].adjacency == "interior" // check value of adjacency

        if ( bool_Attr_interior ) {
            [list[i], list[i+1]].forEach(function( point ) {
                if ( list_interior.includes(point) ) {
                    list_hover.push(point)
                } else {
                    list_interior.push(point)
                }
            })
        }
    } 
    const pos_hover_closest = getClosestPos (meshInt0.point, list_hover); // closest hover point
    
    // SET ROTATION
    const index = list_CoordOfCorner.indexOf(pos_hover_closest); // [frontleft, frontright, backright, backleft]
        // console.log( index, angle_grpStairs01 )
    const bool_availabilityForStairs = checkAvailabilityForStairs(index, pos_cen_closest)
    if (bool_availabilityForStairs) {
        pos_grpStairs01 = pos_cen_closest;
        angle_grpStairs01 = (-Math.PI/2)*index; //  [0, -90, -180, -360]
        addHoverDisp_Stairs01(pos_grpStairs01, angle_grpStairs01)
    }

}


function addHoverDisp_Stairs01_toIntFloor (meshInt0) {

    // GET CLOSEST MINOR GRID CENTER POINTS
    const cen_meshInt0 = meshInt0.object.position; // centre of the first mesh that the cursor intersects, e.g. Vector3 {x: -1.5, y: 3, z: 0.25}
    const list_posOfDivCen = getListofDivCen_fromFloorPos (cen_meshInt0); // 9 center points
    const pos_cen_closest = getClosestPos (meshInt0.point, list_posOfDivCen) // closest center point
        // console.log( pos_cen_closest )
        
    // GET CLOSEST MINOR GRID HOVER POINTS
    const list_CoordOfCorner = getCoordsOfBaseCorners( pos_cen_closest, PartWall_width, 0 ); // 4 corner grid points to the centre point, [frontleft, frontright, backright, backleft]
    const list = list_CoordOfCorner.slice(0); list.push(list[0]); // add first corner into the list again to allow a full for loop

    const list_hover = []; // to be overwritten; list of corner points that are end points of 2 attrlines 
    const list_interior = []; // to be overwritten; list of all corner points of interior attrlines with no repetitions 
    for(var i=0; i < list.length - 1; i++){ // loop through all the corner points
        const pos_midpoint = calcMidptof2pt (list[i], list[i+1]); // position of attribute lines

        const key = keyGen(pos_midpoint) // keys of attribute lines 
        const bool_Attr_interior = dictAttrLine[ key ].adjacency == "interior" // check value of adjacency

        if ( bool_Attr_interior ) {
            [list[i], list[i+1]].forEach(function( point ) {
                if ( list_interior.includes(point) ) {
                    list_hover.push(point)
                } else {
                    list_interior.push(point)
                }
            })
        }
    } 
    const pos_hover_closest = getClosestPos (meshInt0.point, list_hover); // closest hover point
    
    // SET ROTATION
    const index = list_CoordOfCorner.indexOf(pos_hover_closest); // [frontleft, frontright, backright, backleft]
        // console.log( index, angle_grpStairs01 )
    const bool_availabilityForStairs = checkAvailabilityForStairs(index, pos_cen_closest)
    if (bool_availabilityForStairs) {
        pos_grpStairs01 = pos_cen_closest;
        angle_grpStairs01 = (-Math.PI/2)*index; //  [0, -90, -180, -360]
        addHoverDisp_Stairs01(pos_grpStairs01, angle_grpStairs01)
    }

    // if (i==0){break}
    // dispDotsfromCoords(matAttrDot, [pos_midpoint]);

}

function checkAvailabilityForStairs(index, pos) {
    var bool_keyExistance = true;

    const list_CoordofArrPts = findOccupiedPosByStairs(index, pos); // (4) [Vector3, Vector3, Vector3, Vector3]
    
    // TOLERANCE
    list_CoordofArrPts.forEach( function(pt){
        // CHECK IF FLOOR ABOVE EXIST
        groundHeight += volume_height; //getPos_grpFloor_MathGrid uses ground height
        const pt_extrap_Floor = pt.clone();
        pt_extrap_Floor.z = groundHeight + floor_thickness_half;
        const pos_FloorAbove = getPos_grpFloor_MathGrid ( pt_extrap_Floor ); // gives pos_grpFloor
        const key_FloorAbove = keyGen( pos_FloorAbove );
        groundHeight -=volume_height;

        if (key_FloorAbove in dictFloor) { // if floor above exist, check if there is already stairs present
            var list_posStairs = [];
            if (Object.keys(dictStairs01).length > 0) {
    
                Object.keys(dictStairs01).forEach(i => {
                    if ( dictStairs01[i].storey == storeyNum ){
                        const pos = posfromKey( i );
                        list_posStairs.push(pos);
                    }
                })
            }
                // console.log( list_posStairs )
            const closest_pos = getClosestPos(pt, list_posStairs );
            const dist_toPosClosest = pt.distanceTo(closest_pos);
            const tol_betweenArrPttoDictPt = 0.1
            if (dist_toPosClosest < tol_betweenArrPttoDictPt) {
                bool_keyExistance = false;
            }
        } else { // if floor above does not exist, do not show hover
            bool_keyExistance = false;
            showHelper("Stairs modules can only be placed when there is an upper floor.")
        }




    })
    // console.log(bool_keyExistance)

    return bool_keyExistance
}

function findOccupiedPosByStairs(index, pos) {
    const x_multp = [-1, 0, 0,-1]; // multipliers
    const y_multp = [ 1, 1, 0, 0];
    
    var list_CoordofArrPts = [] //4 points
    if (index==0) {
        const arr_startpt = pos.clone().add(new THREE.Vector3( -PartWall_width, PartWall_width, 0));
        list_CoordofArrPts = getPointArr( 4, 2, arr_startpt, PartWall_width )
        // dispDotsfromCoords(matAttrDot_Large, list_CoordofArrPts)
    } else if (index==1) {
        const arr_startpt = pos.clone().add(new THREE.Vector3( 0, PartWall_width, 0));
        list_CoordofArrPts = getPointArr( 4, 2, arr_startpt, PartWall_width )
        // dispDotsfromCoords(matAttrDot_Large, list_CoordofArrPts)
    } else if (index==2) {
        const arr_startpt = pos.clone().add(new THREE.Vector3( 0, 0, 0));
        list_CoordofArrPts = getPointArr( 4, 2, arr_startpt, PartWall_width )
        // dispDotsfromCoords(matAttrDot_Large, list_CoordofArrPts)
    } else if (index==3) {
        const arr_startpt = pos.clone().add(new THREE.Vector3( -PartWall_width, 0, 0));
        list_CoordofArrPts = getPointArr( 4, 2, arr_startpt, PartWall_width )
        // dispDotsfromCoords(matAttrDot_Large, list_CoordofArrPts)
    }
    return list_CoordofArrPts
}


// --------------------------------
//    Add PartWall Hover Display ★ 
// --------------------------------

function addHoverDisp_PartWall(pos, angle){
    meshPartWallTrans.position.copy(pos);
    meshPartWallTrans.rotation.z = angle;
    meshPartWallTrans.visible = true;
    meshPartWallDel.visible = false;
}

function addHoverDisp_PartWall_toIntFloor(meshInt0) { // check distance from boundary and presense of boundary mesh
    // console.log(  Object.keys(dictAttrLine).length  )
    // console.log( Object.keys(dictPartWall)  )
    const pos_cursor = meshInt0.point;

    // CHECK CLOSEST ATTRIBUTE LINE
    const list_posAttrLine = getPos_allAttrLine ();
    const pos_closestAttrLine = getClosestPos (pos_cursor, list_posAttrLine); // CAN BE OPTIMISED
    // dispDotsfromCoords ( matDot_Large, [pos_closestDivCen] ); 
        // console.log(pos_closestAttrLine)
    
    // CHECK ATTRIBUTE LINEdictAttrLine
    const key_AttrLine = keyGen( pos_closestAttrLine );
    const AttrLine = dictAttrLine[ key_AttrLine ];
    const adjacency = AttrLine.adjacency;
    if (adjacency == 'interior') {

        angle_meshPartWall = AttrLine.angle;
        pos_meshPartWall = new THREE.Vector3( pos_closestAttrLine.x, pos_closestAttrLine.y, groundHeight+PartWall_height_half); 
            // console.log(pos_closestAttrLine)
        
        // CHECK MESH PRESENSE
        const key_partMesh = keyGen( pos_meshPartWall );
            // console.log(key_partMesh)
        const bool_presence_partMesh = getbool_keyExistance(key_partMesh);
            // console.log(bool_presence_partMesh)
        if (bool_presence_partMesh) {
            // reinstate_mods('PartitionWall');
        } else {
            addHoverDisp_PartWall(pos_meshPartWall, angle_meshPartWall);
        }
        // console.log(pos_closestAttrLine, offsetHeight_meshPartWall_fromAttrLine)

    }
}



// --------------------------------
//    Replace Hover Display ★ 
// --------------------------------

function replaceHoverDisp_Window01( mesh ) { // copy pos, angle, show meshTrans
    pos_grpWindow01 = new THREE.Vector3(mesh.position.x, mesh.position.y, mesh.position.z);
    angle_grpWindow01 = mesh.rotation.z;

    meshWindow01Trans.position.copy(pos_grpWindow01);
    meshWindow01Trans.rotation.z = angle_grpWindow01
    meshWindow01Trans.visible = true;
    meshWindow01Del.visible = false;
}

function replaceHoverDisp_Window02( mesh ) { // copy pos, angle, show meshTrans
    pos_grpWindow02 = new THREE.Vector3(mesh.position.x, mesh.position.y, mesh.position.z);
    angle_grpWindow02 = mesh.rotation.z;

    meshWindow02Trans.position.copy(pos_grpWindow02);
    meshWindow02Trans.rotation.z = angle_grpWindow02
    meshWindow02Trans.visible = true;
    meshWindow02Del.visible = false;
}

function replaceHoverDisp_Door01( mesh ) { // copy pos, angle, show meshTrans
    pos_grpDoor01 = new THREE.Vector3(mesh.position.x, mesh.position.y, mesh.position.z);
    angle_grpDoor01 = mesh.rotation.z;

    meshDoor01Trans.position.copy(pos_grpDoor01);
    meshDoor01Trans.rotation.z = angle_grpDoor01
    meshDoor01Trans.visible = true;
    meshDoor01Del.visible = false;
}

function replaceHoverDisp_Door02( mesh ) { // copy pos, angle, show meshTrans
    pos_grpDoor02 = new THREE.Vector3(mesh.position.x, mesh.position.y, mesh.position.z);
    angle_grpDoor02 = mesh.rotation.z;

    meshDoor02Trans.position.copy(pos_grpDoor02);
    meshDoor02Trans.rotation.z = angle_grpDoor02
    meshDoor02Trans.visible = true;
    meshDoor02Del.visible = false;
}

function replaceHoverDisp_Door03( mesh ) { // copy pos, angle, show meshTrans
    pos_grpDoor03 = new THREE.Vector3(mesh.position.x, mesh.position.y, mesh.position.z);
    angle_grpDoor03 = mesh.rotation.z;

    const bool_PresenceOf2AdjacentMeshes = checkPresenceOf2AdjacentMeshes(pos_grpDoor03, angle_grpDoor03)
    if (bool_PresenceOf2AdjacentMeshes) {
        meshDoor03Trans.position.copy(pos_grpDoor03);
        meshDoor03Trans.rotation.z = angle_grpDoor03
        meshDoor03Trans.visible = true;
        meshDoor03Del.visible = false;
    }

}
function checkPresenceOf2AdjacentMeshes( pos, angle ) {
    var bool_PresenceOf2AdjacentMeshes = false;
    if (angle == 0 || angle == Math.PI || angle == -Math.PI){ // if mesh is horizontal
        const pos_leftMesh = pos.clone().add(new THREE.Vector3(-PartWall_width, 0 ,0) );
        const bool_PresenceofLeftMesh = checkPresenceofMesh(list_dictVert, pos_leftMesh, tol_01);

        const pos_rightMesh = pos.clone().add(new THREE.Vector3(PartWall_width, 0 ,0) );
        const bool_PresenceofRightMesh = checkPresenceofMesh(list_dictVert, pos_rightMesh, tol_01);

        bool_PresenceOf2AdjacentMeshes = bool_PresenceofLeftMesh && bool_PresenceofRightMesh

    } else { // if mesh is vertical
        const pos_topMesh = pos.clone().add(new THREE.Vector3(0, PartWall_width ,0) );
        const bool_PresenceofTopMesh = checkPresenceofMesh(list_dictVert, pos_topMesh, tol_01);

        const pos_bottomMesh = pos.clone().add(new THREE.Vector3(0, -PartWall_width ,0) );
        const bool_PresenceofBottomMesh = checkPresenceofMesh(list_dictVert, pos_bottomMesh, tol_01);

        bool_PresenceOf2AdjacentMeshes = bool_PresenceofTopMesh && bool_PresenceofBottomMesh
    }

    return bool_PresenceOf2AdjacentMeshes
}
function checkPresenceofMesh(list_dict, pos_mesh, tolerance ){ // e.g (list_dictVert, pos_meshPartWall)
    var list_pos = []; 
    list_dict.forEach( function(dict){
        Object.values(dict).forEach(i => {
            if ( i.storey == storeyNum ){
                list_pos = list_pos.concat(i.position) // console.log(i.children) // e.g. (9) [Mesh, Mesh, Mesh, Mesh..]
            }
        })
    })
    const closest_pos = getClosestPos(pos_mesh, list_pos );
    const dist_toClosestPos = pos_mesh.distanceTo(closest_pos);
    const bool_PresenceofMesh = (dist_toClosestPos <= tolerance);
        // console.log(bool_PresenceofMesh, dist_toClosestPos, closest_pos )
    return bool_PresenceofMesh
}


function replaceHoverDisp_Railing01( mesh ) { // copy pos, angle, show meshTrans
    pos_grpRailing01 = new THREE.Vector3(mesh.position.x, mesh.position.y, mesh.position.z);
    angle_grpRailing01 = mesh.rotation.z;

    meshRailing01Trans.position.copy(pos_grpRailing01);
    meshRailing01Trans.rotation.z = angle_grpRailing01
    meshRailing01Trans.visible = true;
    meshRailing01Del.visible = false;
}




// --------------------------------
//    Delete Hover Display ★ 
// --------------------------------

function delHoverDisp_BdyWall( mesh ) { // copy pos, angle, show meshTrans
    pos_meshBdyWall = new THREE.Vector3(mesh.position.x, mesh.position.y, mesh.position.z); // centre of the first mesh that the cursor intersects, e.g. Vector3 {x: -1.5, y: 3, z: 0.25}
    angle_meshBdyWall = mesh.rotation.z;

    meshBdyWallDel.position.copy(pos_meshBdyWall);
    meshBdyWallDel.rotation.z = angle_meshBdyWall;
    meshBdyWallDel.visible = true;
    meshBdyWallTrans.visible = false;
}

function delHoverDisp_PartWall( mesh ) { // copy pos, angle, show meshTrans
    pos_meshPartWall = new THREE.Vector3(mesh.position.x, mesh.position.y, mesh.position.z); // centre of the first mesh that the cursor intersects, e.g. Vector3 {x: -1.5, y: 3, z: 0.25}
    angle_meshPartWall = mesh.rotation.z;

    meshPartWallDel.position.copy(pos_meshPartWall);
    meshPartWallDel.rotation.z = angle_meshPartWall;
    meshPartWallDel.visible = true;
    meshPartWallTrans.visible = false;
}

function delHoverDisp_Window01( mesh ) { // copy pos, angle, show meshTrans
    pos_grpWindow01 = new THREE.Vector3(mesh.position.x, mesh.position.y, mesh.position.z); // centre of the first mesh that the cursor intersects, e.g. Vector3 {x: -1.5, y: 3, z: 0.25}
    angle_grpWindow01 = mesh.rotation.z;

    meshWindow01Del.position.copy(pos_grpWindow01);
    meshWindow01Del.rotation.z = angle_grpWindow01;
    meshWindow01Del.visible = true;
    meshWindow01Trans.visible = false;
}


function delHoverDisp_Window02( mesh ) { // copy pos, angle, show meshTrans
    pos_grpWindow02 = new THREE.Vector3(mesh.position.x, mesh.position.y, mesh.position.z); // centre of the first mesh that the cursor intersects, e.g. Vector3 {x: -1.5, y: 3, z: 0.25}
    angle_grpWindow02 = mesh.rotation.z;

    meshWindow02Del.position.copy(pos_grpWindow02);
    meshWindow02Del.rotation.z = angle_grpWindow02;
    meshWindow02Del.visible = true;
    meshWindow02Trans.visible = false;
}

function delHoverDisp_Door01( mesh ) { // copy pos, angle, show meshTrans
    pos_grpDoor01 = new THREE.Vector3(mesh.position.x, mesh.position.y, mesh.position.z);
    angle_grpDoor01 = mesh.rotation.z;

    meshDoor01Del.position.copy(pos_grpDoor01);
    meshDoor01Del.rotation.z = angle_grpDoor01;
    meshDoor01Del.visible = true;
    meshDoor01Trans.visible = false;
}

function delHoverDisp_Door02( mesh ) { // copy pos, angle, show meshTrans
    pos_grpDoor02 = new THREE.Vector3(mesh.position.x, mesh.position.y, mesh.position.z);
    angle_grpDoor02 = mesh.rotation.z;

    meshDoor02Del.position.copy(pos_grpDoor02);
    meshDoor02Del.rotation.z = angle_grpDoor02;
    meshDoor02Del.visible = true;
    meshDoor02Trans.visible = false;
}

function delHoverDisp_Door03( mesh ) { // copy pos, angle, show meshTrans
    pos_grpDoor03 = new THREE.Vector3(mesh.position.x, mesh.position.y, mesh.position.z);
    angle_grpDoor03 = mesh.rotation.z;

    meshDoor03Del.position.copy(pos_grpDoor03);
    meshDoor03Del.rotation.z = angle_grpDoor03;
    meshDoor03Del.visible = true;
    meshDoor03Trans.visible = false;
}

function delHoverDisp_Railing01( mesh ) { // copy pos, angle, show meshTrans
    pos_grpRailing01 = new THREE.Vector3(mesh.position.x, mesh.position.y, mesh.position.z);
    angle_grpRailing01 = mesh.rotation.z;

    meshRailing01Del.position.copy(pos_grpRailing01);
    meshRailing01Del.rotation.z = angle_grpRailing01;
    meshRailing01Del.visible = true;
    meshRailing01Trans.visible = false;
}

function delHoverDisp_Stairs01( mesh ) { // copy pos, angle, show meshTrans
    pos_grpStairs01 = new THREE.Vector3(mesh.position.x, mesh.position.y, mesh.position.z);
    angle_grpStairs01 = mesh.rotation.z;

    GrpStairs01Del.position.copy(pos_grpStairs01);
    GrpStairs01Del.rotation.z = angle_grpStairs01;
    GrpStairs01Del.visible = true;
    GrpStairs01Trans.visible = false;
}

// --------------------------------
//    Reinstate Visibility ★ 
// --------------------------------

function reinstate_mods() { //  no display of trans or del mesh, clear position
    // reinstate_mods('Window01', 'Window02', 'Door01', 'Door02', 'Door03', 'Railing01', 'Stairs01');
    const args = Array.from(arguments) // arguments is an Array-like object, it doesn't have Array's built-in methods
    if (args.includes('floor')) { reinstate_floor() };
    if (args.includes('floor_fraction')) { reinstate_floorfrac() };
    if (args.includes('ceiling')) { reinstate_ceiling() };
    if (args.includes('ceiling_fraction')) { reinstate_ceilingfrac() };

    if (args.includes('volume')) { reinstate_volume() };
    if (args.includes('PartitionWall')) { reinstate_PartWall() };
    if (args.includes('Window01')) { reinstate_Window01() };
    if (args.includes('Window02')) { reinstate_Window02() };
    if (args.includes('Door01')) { reinstate_Door01() };
    if (args.includes('Door02')) { reinstate_Door02() };
    if (args.includes('Door03')) { reinstate_Door03() };
    if (args.includes('Railing01')) {  reinstate_Railing01() };
    if (args.includes('Stairs01')) { reinstate_Stairs01() };
}
function reinstate_volume() {
    meshVolumeTrans.visible = false;
    meshVolumeDel.visible = false;
    pos_meshVolume = null;
}
function reinstate_floor() {
    meshFloorTrans.visible = false;
    meshFloorDel.visible = false;
    pos_grpFloor = null;
}
function reinstate_floorfrac() {
    meshFloorFracTrans.visible = false;
    meshFloorFracDel.visible = false;
    pos_FloorFrac = null;
}
function reinstate_ceiling () {
    meshCeilingTrans.visible = false;
    meshCeilingDel.visible = false;
    pos_grpCeiling = null;
}
function reinstate_ceilingfrac () {
    meshCeilingFracTrans.visible = false;
    meshCeilingFracDel.visible = false;
    pos_CeilingFrac = null;
}
function reinstate_PartWall() {
    meshPartWallTrans.visible = false;
    meshPartWallDel.visible = false;
    pos_meshPartWall = null;
}
function reinstate_Window01() {
    meshWindow01Trans.visible = false;
    meshWindow01Del.visible = false;
    pos_grpWindow01 = null;
}
function reinstate_Window02() {
    meshWindow02Trans.visible = false;
    meshWindow02Del.visible = false;
    pos_grpWindow02 = null;
}
function reinstate_Door01() {
    meshDoor01Trans.visible = false;
    meshDoor01Del.visible = false;
    pos_grpDoor01 = null;
}
function reinstate_Door02() {
    meshDoor02Trans.visible = false;
    meshDoor02Del.visible = false;
    pos_grpDoor02 = null;
}
function reinstate_Door03() {
    meshDoor03Trans.visible = false;
    meshDoor03Del.visible = false;
    pos_grpDoor03 = null;
}
function reinstate_Railing01() {
    meshRailing01Trans.visible = false;
    meshRailing01Del.visible = false;
    pos_grpRailing01 = null;
}
function reinstate_Stairs01() {
    GrpStairs01Trans.visible = false;
    GrpStairs01Del.visible = false;
    pos_grpStairs01 = null;
}

// --------------------------------
//    Mouse Up Display ★ 
// --------------------------------

function MouseUpDisplay_onHybridMod(name_HybridMesh, pos_HybridMesh, bool_delHybridMesh, dictHybridMesh, deleteHybridMesh, addHybridMesh) { 
    const key = keyGen(pos_HybridMesh);
    if (bool_delHybridMesh && key in dictHybridMesh) { // if shift is pressed and existing key is True, delete mesh and its key
        const bool_posPartWall = (pos_HybridMesh.x % BdyWall_width_half + pos_HybridMesh.y % BdyWall_width_half == 0);// if the mesh position is on the grid line with no offset, there should be no remainder
        if (bool_posPartWall) { // if pos is for partition wall
            addPartWall(key, pos_HybridMesh, dictHybridMesh[key].rotation.z);
        } else {
            addBdyWall(key, dictHybridMesh[key].position, dictHybridMesh[key].rotation.z); 
        }
        deleteHybridMesh(dictHybridMesh[key]);
    } else if (!bool_delHybridMesh && dictHybridMesh[key]==undefined) { //if shift is not pressed and there is no exisitng key, add a new mesh to the scene and add its key to dict
        addHybridMesh(key);
        const list_meshMod_spliced = removeSingleArrayItem(list_meshMod, name_HybridMesh); // e.g. ['BoundaryWall', 'PartitionWall', 'Window02', 'Door01', 'Door02', 'Door03', 'Railing01', 'Stairs01']
        ifMatchKey_deleteMesh.apply(this, [key, list_meshMod_spliced].flat()); // .apply: Passing an array as function parameters in JavaScript. e.g. 0_-5.25_1.75 BoundaryWall PartitionWall Window01 Window02 Door01 Door03 Railing01 Stairs01
    }
}

function getPos_grpFloor_MathGrid ( pos ) {
    const pos_Floor = new THREE.Vector3();
    if (num_cells % 2 == 1) {// odd number of cells
        pos_Floor.x = Math.round(pos.x / floor_width) * floor_width;
        pos_Floor.y = Math.round(pos.y / floor_width) * floor_width;
    } else { // even number of cells
        pos_Floor.x = Math.round((floor_width_half + pos.x) / floor_width) * floor_width - floor_width_half;
        pos_Floor.y = Math.round((pos.y + floor_width_half) / floor_width) * floor_width - floor_width_half;
    }
    pos_Floor.z = groundHeight + floor_thickness/2 ; // move meshFloor up to align it with grid
    return pos_Floor
}

// ====================================================
// { Keys and Dictionary } 
// ====================================================

// --------------------------------
//    Key Generation
// --------------------------------
function keyGen(mod_pos) { // mod_pos was generated through Scene Animation Loop 
    const key = mod_pos.x + '_' + mod_pos.y + '_' + mod_pos.z; // create a key that as a string, e.g. 1_-4_0. 
    return key
}

// --------------------------------
//    Position from Key
// --------------------------------
function posfromKey( key ){
    const list = key.split( '_' )
    const pos = new THREE.Vector3(Number(list[0]), Number(list[1]), Number(list[2]))
    return pos
}

// --------------------------------
//    Get Key of Value
// --------------------------------
function getKeyByValue(dict, value) {
    return Object.keys(dict).find(key => dict[key] === value);
}

/* incomplete
function getbool_valueExistance(Value) {
    var bool_valueExistance = false;
    const list_values = getValueList(dictFloorFrac, valueIndex)
    // for (var i = 0; i < dictAll.length; i++) {
    //     bool_keyExistance = bool_keyExistance || dictAll[i][key_mesh] !=undefined ;
    // }
    return bool_valueExistance
}
*/

// --------------------------------
//    All Values From Dictionary
// --------------------------------
function getValueList(dict, valueIndex) {
    const list_key = Object.keys(dict);
    var list_value = []
    list_key.forEach(function(key){
        if (Object.prototype.toString.call(dict[key]) === '[object Array]') { // if each value is an array e.g. key: [a, b]
            list_value.push(dict[key][valueIndex]);
        } else { // if each value is not an array e.g. key: a
            list_value.push(dict[key])
        }
    });
    return list_value
}

// --------------------------------
//    All Values From List of Groups
// --------------------------------
function getChildList(list_grp, index=0) {
    var list_child = []
    list_grp.forEach(function(grp){
        const child = grp.children[index]
        list_child.push(child);
    });
    return list_child
}



// --------------------------------
//    Check Key Existance ★
// --------------------------------
function getbool_keyExistance(key_mesh) {
    var bool_keyExistance = false;
    for (var i = 0; i < dictAll.length; i++) {
        bool_keyExistance = bool_keyExistance || dictAll[i][key_mesh] !=undefined ;
    }
    return bool_keyExistance
}


// --------------------------------
//    Match Key to Delete Mesh ★
// --------------------------------

function ifMatchKey_deleteMesh(key, ...args) { // Perform action to value (delete mesh) if it has the matching key
    // ifMatchKey_deleteMesh(keys, 'BoundaryWall', 'PartitionWall', 'Window01', 'Window02', 'Door01', 'Door02', 'Door03', 'Railing01', 'Stairs01');
    var args = Array.from(arguments) // arguments is an Array-like object, it doesn't have Array's built-in methods
    if (args.includes('BoundaryWall')) {
        ifMatchKey_deleteBdyWall(key)
    }
    if (args.includes('OpeningWall')) {
        ifMatchKey_deleteOpeningWall(key)
    }
    if (args.includes('PartitionWall')) {
        ifMatchKey_deletePartWall(key)
    }
    if (args.includes('Window01')) {
        ifMatchKey_deleteWindow01(key)
    }
    if (args.includes('Window02')) {
        ifMatchKey_deleteWindow02(key)
    }
    if (args.includes('Door01')) {
        ifMatchKey_deleteDoor01(key)
    }
    if (args.includes('Door02')) {
        ifMatchKey_deleteDoor02(key)
    }
    if (args.includes('Door03')) {
        ifMatchKey_deleteDoor03(key)
    }
    if (args.includes('Railing01')) {
        ifMatchKey_deleteRailing01(key)
    }
    if (args.includes('Stairs01')) {
        ifMatchKey_deleteStairs01(key)
    }

}

function ifMatchKey_deleteBdyWall(key) {
    if (key in dictBdyWall) {
        deleteBdyWall(dictBdyWall[key])
    }
}
function ifMatchKey_deleteOpeningWall(key) {
    if (key in dictOpeningWall) {
        deleteOpeningWall(dictOpeningWall[key])
    }
}

function ifMatchKey_deletePartWall(key) {
    if (key in dictPartWall) {
        deletePartWall(dictPartWall[key])
    }
}
function ifMatchKey_deleteWindow01(key) {
    if (key in dictWindow01) {
        deleteWindow01(dictWindow01[key])
    }
}
function ifMatchKey_deleteWindow02(key) {
    if (key in dictWindow02) {
        deleteWindow02(dictWindow02[key])
    }
}
function ifMatchKey_deleteDoor01(key) {
    if (key in dictDoor01) {
        deleteDoor01(dictDoor01[key])
    }
}
function ifMatchKey_deleteDoor02(key) {
    if (key in dictDoor02) {
        deleteDoor02(dictDoor02[key])
    }
}
function ifMatchKey_deleteDoor03(key) {
    if (key in dictDoor03) {
        deleteDoor03(dictDoor03[key])
    }
}
function ifMatchKey_deleteRailing01(key) {
    if (key in dictRailing01) {
        deleteRailing01(dictRailing01[key])
    }
}
function ifMatchKey_deleteStairs01(key) {
    if (key in dictStairs01) {
        deleteStairs01(dictStairs01[key])
    }
}

// ====================================================
// { Helper and Rules } 
// ====================================================

// --------------------------------
//    Wall Module Rule
// --------------------------------

function dispHelperAndReplaceHover_wallModRule (func_replaceHoverDisp, grpInt) {
    const AttrLine = getAttriLine_atBdyMesh( grpInt );
    if (AttrLine != undefined) { // if boundary-positioned attribute line exist
        dispHelperAndReplaceHover_wallModRule_adjCheck ( func_replaceHoverDisp, AttrLine, grpInt );
    } else { // if boundary-positioned attribute line do not exist
        func_replaceHoverDisp( grpInt );
    }
}

function dispHelperAndReplaceHover_wallModRule_adjCheck (func_replaceHoverDisp, AttrLine, meshtoReplace) {
    // var list_args = Array.from(arguments);
    // const args_adjacency = list_args.slice(3) // remove the first 3 parameters
    if (AttrLine.adjacency == 'neighbour') { // check attribute
        showHelper("Only wall modules are allowed along the boundaries against neighbours. To place a hybrid module, please purchase the adjacent volume.")
    } else if (AttrLine.adjacency == 'extent') {
        showHelper("Only wall modules are allowed along the boundaries against neighbours. Please purchase the adjacent volume, please purchase the adjacent volume.")
    } else {
        func_replaceHoverDisp( meshtoReplace );
    }
}

// --------------------------------
//    Door Module Rule
// --------------------------------

function dispHelperAndReplaceHover_doorModRule (func_replaceHoverDisp, grpInt) {
    const AttrLine = getAttriLine_atBdyMesh( grpInt );
    if (AttrLine != undefined) { // if boundary-positioned attribute line exist
        dispHelperAndReplaceHover_doorModRule_adjCheck ( func_replaceHoverDisp, AttrLine, grpInt );
    } else { // if boundary-positioned attribute line do not exist
        func_replaceHoverDisp( grpInt );
    }
}

function dispHelperAndReplaceHover_doorModRule_adjCheck (func_replaceHoverDisp, AttrLine, meshtoReplace) {

    if (AttrLine.adjacency !== 'corridor') { // check attribute
        showHelper("Door modules on the boundary walls can only be placed along the corridor.")
    } else {
        func_replaceHoverDisp( meshtoReplace );
    }
}


// ====================================================
// { Attributes } 
// ====================================================

/*
Hierachy (lowest to highest)

'interior'
'boundary'
'extent'
'corridor', 'neighbour', 'buildingedge', 'neighbour'

*/

// --------------------------------
//    interior
// --------------------------------

function addAttr_interior (pos, start_pt, end_pt, mat = matDashedLine) { // edit below to customise display appearance
    const key = keyGen(pos)
    const bool_keyExistance = getbool_keyExistance(key);
    if ( bool_keyExistance ) { // if key already exist
    } // Do nothing. Interior cannot overwrite any other attributes
    else { // if key does not exist
        const attrSet = ['', 'interior']; 
        addAttrLineUnit (start_pt, end_pt, mat, matAttrDot, attrSet);
    }
    // console.log(key)
}

function delAttr_interior (pos, start_pt, end_pt) { // edit below to customise display appearance
    const key = keyGen(pos)
    const bool_keyExistance = getbool_keyExistance(key);
    if ( bool_keyExistance ) { // if key already exist
        const AttrLine = dictAttrLine[key];
        const adjacency = AttrLine.adjacency;
        // console.log(AttrLine.adjacency)
        // OVERWRITE
        if (adjacency == 'interior')  {
            deleteAttrLineUnit (pos);
        } // Do nothing. Interior cannot overwrite any other attributes
    }
        else { // if key does not exist
        // const attrSet = ['', 'interior']; 
        // addAttrLineUnit (start_pt, end_pt, matAttrLine, matAttrDot, attrSet);
    }
}

// --------------------------------
//    Opening
// --------------------------------

function addAttr_opening (pos, start_pt, end_pt) { // edit below to customise display appearance

    const key = keyGen(pos);
    const bool_keyExistance = getbool_keyExistance(key);
    if ( bool_keyExistance ) { // if key already exist
        const AttrLine = dictAttrLine[key];
        const adjacency = AttrLine.adjacency;
        // OVERWRITE
        if (adjacency == 'interior') {
            deleteAttrLineUnit (pos);
            const attrSet = ['', 'opening'];
            addAttrLineUnit (start_pt, end_pt, matAttrLine, matAttrDot, attrSet, hideAttrLine);
        }
        /*
        if (adjacency == 'opening')  {
            deleteAttrLineUnit (pos);
            const attrSet = ['', 'interior']; // replace with attr of 1 lower hierarchy
            addAttrLineUnit (start_pt, end_pt, matDashedLine, matAttrDot, attrSet, hideAttrLine);
        } else 
        */
    } else { // if key does not exist
        const attrSet = ['', 'opening']
        addAttrLineUnit (start_pt, end_pt, matAttrLine, matAttrDot, attrSet);
    }
}

// --------------------------------
//    boundary
// --------------------------------

function addAttr_boundary (pos, start_pt, end_pt) { // edit below to customise display appearance

    const key = keyGen(pos);
    const bool_keyExistance = getbool_keyExistance(key);
    if ( bool_keyExistance ) { // if key already exist
        const AttrLine = dictAttrLine[key];
        const adjacency = AttrLine.adjacency;
        // OVERWRITE
        if (adjacency == 'boundary')  {
            deleteAttrLineUnit (pos);
            const attrSet = ['', 'interior']; // replace with attr of 1 lower hierarchy
            addAttrLineUnit (start_pt, end_pt, matDashedLine, matAttrDot, attrSet, hideAttrLine);
        } else if (adjacency == 'interior') {
            deleteAttrLineUnit (pos);
            const attrSet = ['', 'boundary'];
            addAttrLineUnit (start_pt, end_pt, matAttrLine, matAttrDot, attrSet, hideAttrLine);
        }
    } else { // if key does not exist
        const attrSet = ['', 'boundary']
        addAttrLineUnit (start_pt, end_pt, matAttrLine, matAttrDot, attrSet, hideAttrLine);
    }
}

function delAttr_boundary (pos, start_pt, end_pt) { // edit below to customise display appearance
    const key = keyGen(pos)
    const bool_keyExistance = getbool_keyExistance(key);
    if ( bool_keyExistance ) { // if key already exist
        const AttrLine = dictAttrLine[key];
        const adjacency = AttrLine.adjacency;
        if (adjacency == 'boundary' )  {
            deleteAttrLineUnit (pos);

            // const attrSet = ['', 'interior'];
            // addAttrLineUnit (start_pt, end_pt, matDashedLine, matAttrDot, attrSet);
        } // Do nothing if adjacency == 'corridor' or 'buildingedge' or 'neighbour'
        // else if (adjacency == 'interior') {
        //     deleteAttrLineUnit (pos_midpoint);
        //     const attrSet = ['', 'extent'];
        //     addAttrLineUnit (list[i], list[i+1], matAttrLine, matAttrDot, attrSet);
        // }
    } else { // if key does not exist
        // const attrSet = ['', 'boundary']
        // addAttrLineUnit (start_pt, end_pt, matAttrLine, matAttrDot, attrSet);
    }
}

// --------------------------------
//    extent
// --------------------------------

function addAttr_extent (pos, start_pt, end_pt) { // edit below to customise display appearance
    const key = keyGen(pos);
    const bool_keyExistance = getbool_keyExistance(key);
    if ( bool_keyExistance ) { // if key already exist
        const AttrLine = dictAttrLine[key];
        const adjacency = AttrLine.adjacency;
        // OVERWRITE
        if (adjacency == 'extent')  {
            deleteAttrLineUnit (pos);
            const bool_BdyWallSittingOnExtentAttr = checkBdyWallPresenseOnExtentAttrLine(pos, AttrLine)
            if (bool_BdyWallSittingOnExtentAttr) {
                const attrSet = ['', 'boundary'];
                addAttrLineUnit (start_pt, end_pt, matAttrLine, matAttrDot, attrSet, hideAttrLine);
            }

        } // Do nothing if adjacency == 'corridor' or 'buildingedge' or 'neighbour'
    } else { // if key does not exist
        const attrSet = ['', 'extent']
        addAttrLineUnit (start_pt, end_pt, matInvisibleLine, matAttrDot, attrSet, hideAttrLine);
    }
}

function delAttr_extent (pos, start_pt, end_pt) { // edit below to customise display appearance
    const key = keyGen(pos)
    const bool_keyExistance = getbool_keyExistance(key);
    if ( bool_keyExistance ) { // if key already exist
        const AttrLine = dictAttrLine[key];
        const adjacency = AttrLine.adjacency;
        if (adjacency == 'extent' )  {
            deleteAttrLineUnit (pos);
        } // Do nothing if adjacency == 'corridor' or 'buildingedge' or 'neighbour'
        // else if (adjacency == 'interior') {
        //     deleteAttrLineUnit (pos_midpoint);
        //     const attrSet = ['', 'extent'];
        //     addAttrLineUnit (list[i], list[i+1], matAttrLine, matAttrDot, attrSet);
        // }
    } else { // if key does not exist
        const attrSet = ['', 'extent']
        addAttrLineUnit (start_pt, end_pt, matAttrLine, matAttrDot, attrSet, hideAttrLine);
    }
}

// ====================================================
// { Attribute Line } 
// ====================================================

// --------------------------------
//    Get Positions of All AttrLine
// --------------------------------

function getPos_allAttrLine () {
    const list_key = Object.keys(dictAttrLine)
    const list_pos = []
    list_key.forEach( function (key) {
        // console.log(key)
        const pos = posfromKey( key );
        list_pos.push( pos );
    })
    return list_pos
}

// --------------------------------
//    Get End Points of AttrLine
// --------------------------------

function getpos_EndPtsOfAttrLine (pos, angle, len_half) {
    const dir = checkDirofMesh ( angle );
    const endPoints = [];
    if (dir == "front/back") {
        const starting_pt = new THREE.Vector3 ( (pos.x - len_half), pos.y, zpos_AttrLine );
        const ending_pt   = new THREE.Vector3 ( (pos.x + len_half), pos.y, zpos_AttrLine );
        endPoints.push( starting_pt,ending_pt )
    } else {
        const starting_pt = new THREE.Vector3 ( pos.x, (pos.y - len_half), zpos_AttrLine );
        const ending_pt   = new THREE.Vector3 ( pos.x, (pos.y + len_half), zpos_AttrLine );
        endPoints.push( starting_pt,ending_pt )
    }
    return endPoints
}

// --------------------------------
//    Get AttrLine at Bdy
// --------------------------------

function getAttriLine_atBdyMesh( meshBdyWall ) {
    const pos_meshInt = meshBdyWall.position;
    const angle_meshInt = meshBdyWall.rotation.z;
    const pos_grpAttrLine = getPos_AttrLine_atBdy (pos_meshInt, angle_meshInt);
    const key_grpAttrLine = keyGen( pos_grpAttrLine );
    const AttrLine = dictAttrLine[key_grpAttrLine]

    return AttrLine
}

function getPos_AttrLine_atBdy (pos_BdyWall, angle_BdyWall) { 
    // console.log(zpos_AttrLine)
    var pos_intAttrLine = null; // to be overwritten
    if (angle_BdyWall == Math.PI / 2 ) { // left boundary wall
        pos_intAttrLine = new THREE.Vector3 ( (pos_BdyWall.x - offsetValue_BdyWall) , pos_BdyWall.y, zpos_AttrLine );
    } else if ( angle_BdyWall == - Math.PI / 2 ) { // right boundary wall
        pos_intAttrLine = new THREE.Vector3 ( (pos_BdyWall.x + offsetValue_BdyWall) , pos_BdyWall.y, zpos_AttrLine );
    } else if ( angle_BdyWall == 0 ) { // front boundary wall
        pos_intAttrLine = new THREE.Vector3 ( pos_BdyWall.x, (pos_BdyWall.y + offsetValue_BdyWall), zpos_AttrLine );
    } else { // back boundary wall
        pos_intAttrLine = new THREE.Vector3 ( pos_BdyWall.x, (pos_BdyWall.y - offsetValue_BdyWall), zpos_AttrLine );
    }
    // console.log('pos_intAttrLine',pos_intAttrLine)
    pos_intAttrLine = roundPos(pos_intAttrLine,3)
    // dispDotsfromCoords(matAttrDot, [pos_intAttrLine])
    // console.log('getPos_AttrLine_atBdy', pos_intAttrLine)
    return pos_intAttrLine
}

function getPos_ (){
    

}

// --------------------------------
//    Get BdyWall at AttrLine
// --------------------------------

function checkBdyWallPresenseOnExtentAttrLine(pos, AttrLine) {
    var bool_BdyWallSittingOnExtentAttr = false;
    if ( AttrLine.angle == 0 ){ // addition along Y axis
        const pos_BdyWall_possibility1 = pos.clone().add( new THREE.Vector3(0,  offsetValue_BdyWall, offsetHeight_posVerMod_fromAttLine) );
        const key_BdyWall_possibility1 = keyGen (pos_BdyWall_possibility1)
        const pos_BdyWall_possibility2 = pos.clone().add( new THREE.Vector3(0, -offsetValue_BdyWall, offsetHeight_posVerMod_fromAttLine) );
        const key_BdyWall_possibility2 = keyGen (pos_BdyWall_possibility2)
        bool_BdyWallSittingOnExtentAttr = (key_BdyWall_possibility1 in dictBdyWall) || (key_BdyWall_possibility2 in dictBdyWall )
        // console.log(groundHeight+offsetHeight_posVerMod_fromAttLine, offsetHeight_posVerMod_fromAttLine)
        // dispDotsfromCoords( matAttrDot, [pos_BdyWall_possibility1, pos_BdyWall_possibility2] )
    } else {// addition along X axis
        const pos_BdyWall_possibility1 = pos.clone().add( new THREE.Vector3( offsetValue_BdyWall, 0, offsetHeight_posVerMod_fromAttLine) );
        const key_BdyWall_possibility1 = keyGen (pos_BdyWall_possibility1)
        const pos_BdyWall_possibility2 = pos.clone().add( new THREE.Vector3(-offsetValue_BdyWall, 0, offsetHeight_posVerMod_fromAttLine) );
        const key_BdyWall_possibility2 = keyGen (pos_BdyWall_possibility2)
        bool_BdyWallSittingOnExtentAttr = (key_BdyWall_possibility1 in dictBdyWall) || (key_BdyWall_possibility2 in dictBdyWall )
    }
    return bool_BdyWallSittingOnExtentAttr
}

// --------------------------------
//    Add/Del AttrLine on Floor
// --------------------------------

function addAttrLinesOnFloor() {
        // console.log(  Object.keys(dictAttrLine).length  )
    const list_posOfDivCen = getListofDivCen_fromFloorPos (pos_grpFloor);
        // list_posOfDivCen = list_posOfDivCen.slice(0,2)

    list_posOfDivCen.forEach(function(cen) {
            // console.log( '1 grid' );
            // dispDotsfromCoords(matAttrDot_Large,[cen])
        const list_CoordOfCorner = getCoordsOfBaseCorners( cen, PartWall_width, 0 );
        // console.log(list_posOfDivCen)
        const list = list_CoordOfCorner.slice(0)
        list.push(list[0]);
        for(var i=0; i < list.length - 1; i++){
            const pos_midpoint = calcMidptof2pt (list[i], list[i+1]);
            // console.log(pos_midpoint, list[i],list[i+1])
            addAttr_interior (pos_midpoint, list[i], list[i+1]);
        } 
    })
        // console.log(  Object.keys(dictAttrLine).length  )
}



function delAttrLinesOnFloor() {
    const list_posOfDivCen = getListofDivCen_fromFloorPos (pos_grpFloor);

    list_posOfDivCen.forEach(function(cen) {
        const list_CoordOfCorner = getCoordsOfBaseCorners( cen, PartWall_width, 0 );
        const list = list_CoordOfCorner.slice(0)
        list.push(list[0]);
        for(var i=0; i < list.length - 1; i++){
            const pos_midpoint = calcMidptof2pt (list[i], list[i+1]);
            delAttr_interior (pos_midpoint, list[i], list[i+1]);
        } 
    })
}

function getListofDivCen_fromFloorPos (pos_grpFloor) {
    const cen_middle = pos_grpFloor.clone().add(offsetHeight_AttrLine_fromFloorPos);
    const cen_starting = cen_middle.clone().sub(offsetValue_hor_PartWall).add(offsetValue_ver_PartWall);
    const list_posOfDivCen = getPointArr( num_div_onFloor, num_div_row_onFloor, cen_starting, PartWall_width );
    // console.log(offsetValue_hor_PartWall)

    return list_posOfDivCen
}

// --------------------------------
//    Add/Del AttrLine on Volume
// --------------------------------

function addAttrLine_purchasedVolBdy (list_CoordOfCorner) { // "extent"
    const list = list_CoordOfCorner.slice(0)
    list.push(list[0]);
    for(var i=0; i < list.length - 1; i++){
        // CLOCKWISE MULTIPLIERS
        const arrDir_x = [1,0,-1,0]; const arrDir_y = arrDir_x.slice(0).reverse();
        
        // CREATE LINEAR ARRAYS
        const pos_corner = list[i]; // at boundary
        const list_pt = arrLinearPoints ( num_div_row_onFloor+1, pos_corner, PartWall_width*arrDir_x[i], PartWall_width*arrDir_y[i] )// CREATE ARRAY OF POS USING INCREMNENT BY FACTOR OF J

        /*
        const list_pt = []; // to be overwritten
        for(var j=0; j < num_div_row_onFloor+1; j++){
            const pos_arr = pos_corner.clone().add(new THREE.Vector3( PartWall_width*j*arrDir_x[i], PartWall_width*j*arrDir_y[i], 0)); // at boundary
            list_pt.push( pos_arr );
                // dispDotsfromCoords ( matDot_Large, [pos_arr] )
        }
        */

        // CREATE ATTRIBUTE LINES
        for(var k=0; k < list_pt.length-1; k++){
            const pos_midpoint = calcMidptof2pt (list_pt[k], list_pt[k+1]);
            addAttr_extent (pos_midpoint, list_pt[k], list_pt[k+1])
            // const pos_BdyWall = calcMidptof2pt(list_pt[k], list_pt[k+1])
            // const key_BdyWall = keyGen(pos_BdyWall);
            // addBdyWall(key_BdyWall, pos_BdyWall, 0)
        }
    } 
}


function deleteAttrLine_purchasedVolBdy (list_CoordOfCorner) {
    const list = list_CoordOfCorner.slice(0)
    list.push(list[0]);
    for(var i=0; i < list.length - 1; i++){
        // CLOCKWISE MULTIPLIERS
        const arrDir_x = [1,0,-1,0]; const arrDir_y = arrDir_x.slice(0).reverse();
        
        // CREATE LINEAR ARRAYS
        const pos_corner = list[i]; // at boundary
        const list_pt = arrLinearPoints ( num_div_row_onFloor+1, pos_corner, PartWall_width*arrDir_x[i], PartWall_width*arrDir_y[i] )// CREATE ARRAY OF POS USING INCREMNENT BY FACTOR OF J
        // const list_pt = []; // to be overwritten
        // for(var j=0; j < num_div_row_onFloor+1; j++){
            // const pos_arr = pos_corner.clone().add(new THREE.Vector3( j*PartWall_width*arrDir_x[i], j*PartWall_width*arrDir_y[i], 0)); // at boundary
            // list_pt.push( pos_arr );
                // dispDotsfromCoords ( matDot_Large, [pos_arr] )
        // }

        // CREATE ATTRIBUTE LINES
        for(var k=0; k < list_pt.length-1; k++){
            const pos_midpoint = calcMidptof2pt (list_pt[k], list_pt[k+1]);

            delAttr_extent (pos_midpoint, list_pt[k], list_pt[k+1]);
            // const pos_BdyWall = calcMidptof2pt(list_pt[k], list_pt[k+1])
            // const key_BdyWall = keyGen(pos_BdyWall);
            // addBdyWall(key_BdyWall, pos_BdyWall, 0)
        }
    } 
}

// --------------------------------
//    Add/Del Attribute Line Unit 
// --------------------------------

function addAttrLineUnit (starting_pt, ending_pt, matAttrLine, matAttrDot, attrSet, bool_disAttrLine = true) {
    const points = [];
    points.push( starting_pt );
    points.push( ending_pt );
    const geometry = new THREE.BufferGeometry().setFromPoints( points );
    
    const line = new THREE.Line( geometry, matAttrLine );
    const AttrLineUnit = new THREE.Group();
    AttrLineUnit.add( line );

    const AttrLineDisp = line.clone();
    AttrLineDisp.position.add(offsetHeight_AttrLineDisp_AttrLine);
    if (bool_disAttrLine) {
        AttrLineDisp.name = "disp_attribute_line";
        AttrLineDisp.computeLineDistances();  // call this method, when you work with dashed lines
        AttrLineUnit.add( AttrLineDisp );
        scene.add(AttrLineUnit);
    
        // console.log( AttrLineUnit )
    };
        
    // Add Text
    const pos_midpoint = calcMidptof2pt(starting_pt, ending_pt);
    const pos_text = textPosFromPos ( pos_midpoint );
    const textDisp_attr = String( attrSet );
    displayText (textDisp_attr, pos_text); // toggle for display

    // UPDATE GLOBAL VARIABLES
    const key = keyGen( pos_midpoint );
    dictAttrLine[key] = AttrLineUnit;

    // Adding Attributes
    AttrLineUnit.name = "attribute_line";
    AttrLineUnit.storey = storeyNum;
    AttrLineUnit.adjacency = attrSet[1];
    AttrLineUnit.key = key;
    if ( starting_pt.x == ending_pt.x ) { // VERT
        AttrLineUnit.angle = Math.PI/2;
    } else { // HORIZ
        AttrLineUnit.angle = 0;
    }

    return AttrLineUnit
}

function deleteAttrLineUnit (pos_AttrLine) {

    const key_AttrLine = keyGen( pos_AttrLine );
    // console.log( dictAttrLine[key_AttrLine]);
    scene.remove( dictAttrLine[key_AttrLine] );
    delete dictAttrLine[ key_AttrLine ];

    const textpos = textPosFromPos (pos_AttrLine)
    const key_text = keyGen( textpos )
    const textmesh = dictTextMesh[key_text]
    scene.remove( textmesh );

    delete dictTextMesh[ key_text ];
    // console.log(Object.keys(dictTextMesh).length )
    // const AttrLine = dictAttrLine[key_AttrLine]

}

// --------------------------------
//    Draw Available Space Line 
// --------------------------------

function posaddAttrLine_availBdy (first_pt, ...args) { // 'RRR DDD LLL UUUU'
    var start_pt = first_pt; // to be overwritten 
    var AttrLine = null; // to be overwritten

    const list_attrSet = Array.from(arguments); // e.g. list_attrSet = [ first_pt, ['R', 'corridor'], ['D', 'corridor'] ]
    list_attrSet.shift(); // return array with the first item removed

    list_attrSet.forEach ( function(attrSet) { // e.g. attrSet = ['R', 'corridor']

        [start_pt, AttrLine] = drawCmd_AttrLines ( start_pt, attrSet ); // input: start_point, command; output: next start_point, added line with dots to the scene

    } )
}

function drawCmd_AttrLines (start_pt, attrSet) { // based on command, execute function accordingly
    // DIRECTION MULTIPLIERS
    const dir = attrSet[0]
    var arrDir_x = null; // to be overwritten
    var arrDir_y = null; // to be overwritten
        if (dir == 'R') { arrDir_x = 1; arrDir_y = 0; };
        if (dir == 'D') { arrDir_x = 0; arrDir_y =-1; };
        if (dir == 'L') { arrDir_x =-1; arrDir_y = 0; };
        if (dir == 'U') { arrDir_x = 0; arrDir_y = 1; };
        // const arrDir_x = [1,0,-1,0]; const arrDir_y = arrDir_x.slice(0).reverse();
        // dispDotsfromCoords ( matDot_Large, [start_pt] )
    
    // CREATE LINEAR ARRAYS
    const list_pt = arrLinearPoints ( num_div_row_onFloor+1, start_pt, PartWall_width*arrDir_x, PartWall_width*arrDir_y )// CREATE ARRAY OF POS USING INCREMNENT BY FACTOR OF J
    start_pt = list_pt[list_pt.length-1]
        // dispDotsfromCoords ( matDot_Large, list_pt )
    
    // CREATE ATTRIBUTE LINES
    var AttrLine = null; // to be overwritten
    for(var k=0; k < list_pt.length-1; k++){
        // const pos_midpoint = calcMidptof2pt (list_pt[k], list_pt[k+1]);
        AttrLine = addAttrLineUnit (list_pt[k], list_pt[k+1], matInvisibleLine, matAttrDot, attrSet, hideAttrLine);
    }

    return [start_pt, AttrLine]
}



// ====================================================
// { Text Display and Pos } 
// ====================================================

function textPosFromPos ( pos ) {
    const pos_text = new THREE.Vector3 ( (pos.x - 0.2), (pos.y -0.05 ), (pos.z + 0.1))
    const pos_text_rounded = roundPos(pos_text,3);
    // console.log(pos_text_rounded)
    return pos_text_rounded
}

function displayText (string, pos, size = 0.1) {
    const textgeometry = new THREE.TextGeometry(string, {
    font: displayFont,
    size: size,
    height: 0,
    });
    const textMesh = new THREE.Mesh(textgeometry, matAttrText);
    textMesh.position.copy(pos);
    scene.add(textMesh);
    textMesh.storey = storeyNum;

    // UPDATE GLOBAL VARIABLES
    const key_textMesh = keyGen(pos);
    dictTextMesh[key_textMesh] = textMesh;
}






//////////////////// -------------PRIMITIVE FUNCTIONS------------------------------------------------------ //////////////////// 

// ====================================================
// { Maths } 
// ====================================================

// --------------------------------
//    Round Decimal Points
// --------------------------------

function roundPos (pos, dp){ //mostly 3, with a few 7
    const rounded_pos = new THREE.Vector3( round(pos.x, dp), round(pos.y, dp), round(pos.z, dp));
    return rounded_pos
}


function truncNumTo3dp(num) {
	const exp = new RegExp(/^-?\d+(?:\.\d{0,3})?/);
    const trunc = Number(num.toString().match(exp)[0])
    return trunc
}
function truncPosTo3dp(pos) {
    const trunc_pos = new THREE.Vector3( truncNumTo3dp(pos.x), truncNumTo3dp(pos.y), truncNumTo3dp(pos.z));
    return trunc_pos
}

function truncNumTo2dp(num) {
	const exp = new RegExp(/^-?\d+(?:\.\d{0,2})?/);
    const trunc = Number(num.toString().match(exp)[0])
    return trunc
}
function truncPosTo2dp(pos) {
    const trunc_pos = new THREE.Vector3( truncNumTo2dp(pos.x), truncNumTo2dp(pos.y), truncNumTo2dp(pos.z));
    return trunc_pos
}

function round(num, dp) {
    const num_rounded = Number( num.toFixed(dp) );
        // const num_rounded = Math.round(num * (10**dp)) / (10**dp)
        // console.log(num_rounded)
    return num_rounded
}


// --------------------------------
//    Get Midpoint of 2 Points
// --------------------------------

function calcMidptof2pt (starting_pt, ending_pt) {
    const pos_midpoint = starting_pt.clone().add(ending_pt).divideScalar(2)
    const pos_midpoint_rounded = roundPos(pos_midpoint, 3)
    // console.log(pos_midpoint_rounded)
    return pos_midpoint_rounded
}

// --------------------------------
//    Get Closest Position
// --------------------------------

function getClosestPos (MainPos, list_pos) {
    var pos_closest = new THREE.Vector3(10,10,10); // to be overwritten; it is not a random far away position
    list_pos.forEach( function(pos) {
        const dist_toPos = pos.distanceTo( MainPos );
        const dist_toPosClosest = pos_closest.distanceTo( MainPos );
        if (dist_toPos < dist_toPosClosest) {
            pos_closest = pos;
        }
    })
    return pos_closest
}

// --------------------------------
//    Check Horiz / Vert
// --------------------------------

function checkDirofMesh ( angle ) {
    if ( angle == 0 || angle == Math.PI || angle == - Math.PI ) { // meshInt facing left or right
        return("front/back");
    } else { // meshInt facing front or back
        return("left/right");
    }
}

// --------------------------------
//    Get 4 Corners Coords
// --------------------------------

function getCoordsOfBaseCorners( cen, baseLen, vertOffset ) { // of a volume cube
    const base_frontleft_coord = new THREE.Vector3( cen.x - baseLen/2, cen.y + baseLen/2, cen.z + vertOffset );
    const base_frontright_coord = new THREE.Vector3( cen.x + baseLen/2, cen.y + baseLen/2, cen.z + vertOffset );
    const base_backright_coord = new THREE.Vector3( cen.x + baseLen/2, cen.y - baseLen/2, cen.z + vertOffset );
    const base_backleft_coord = new THREE.Vector3( cen.x - baseLen/2, cen.y - baseLen/2, cen.z + vertOffset );
    const list_CoordOfCorner = [ truncPosTo3dp(base_frontleft_coord), truncPosTo3dp(base_frontright_coord), truncPosTo3dp(base_backright_coord), truncPosTo3dp(base_backleft_coord) ]
    // console.log([base_frontleft_coord, base_frontright_coord, base_backright_coord, base_backleft_coord])
    // console.log(list_CoordOfCorner)
    return list_CoordOfCorner
}

// --------------------------------
//    Create Point Array
// --------------------------------

function getPointArr( num_pt, num_rows, starting_pt, spacing ){ // starting_pt is the top left pt
    const list_CoordofPts = []
    for (let i = 0; i < num_pt; i++) {
        const remainder = i % num_rows;
        const quotient = Math.floor( i/num_rows );
        const pt = starting_pt.clone().add(new THREE.Vector3( spacing*remainder, -spacing*quotient, 0));
        const pt_rounded = roundPos (pt, 3);
        list_CoordofPts.push(pt_rounded);
        // console.log(pt, pt_rounded)
            // console.log(remainder, quotient)
            // dispDotsfromCoords ( matDot_Large, [pt])
    }
    return list_CoordofPts
}

function arrLinearPoints ( num_pt, start_pt, translation_x, translation_y ) {
    // CREATE ARRAY OF POS USING INCREMNENT BY FACTOR OF J
    const list_pt = []; // to be overwritten
    for(var j=0; j < num_pt; j++){
        const pos_arr = start_pt.clone().add(new THREE.Vector3( j*translation_x, j*translation_y, 0)); // at boundary
        list_pt.push( pos_arr );
            // dispDotsfromCoords ( matDot_Large, [pos_arr] )
    }
    return list_pt
}

// ====================================================
// { Volume ID } 
// ====================================================

// --------------------------------
//    Storey ID
// --------------------------------





// --------------------------------
//    Volume ID
// --------------------------------

function deleteAllInteriorMesh(pos_grpFloor) {
    const vol_id = calcVolumeID (pos_grpFloor)
    list_dictInterior.forEach( function(dict){
        const list_mesh = getValueList(dict); // [Mesh]
            // console.log( list_mesh );
        list_mesh.forEach( function(mesh) {
            const bool_idMatch =  String(mesh.volume_id)==String(vol_id) // array cannot be compared, only their values or the string version of themselves can
                // console.log( mesh.volume_id, vol_id, bool_idMatch )
            if ( bool_idMatch ) { // if id match, delete
                    // console.log( mesh )
                ifMatchKey_deleteMesh(mesh.key, 'OpeningWall', 'PartitionWall', 'Window01', 'Window02', 'Door01', 'Door02', 'Door03', 'Railing01', 'Stairs01');
            }
        } );

    } );
};

function calcVolumeID (pos) { // pos_interiorMesh
    const id_values = []
    const list_coord = [pos.x, pos.y]
    list_coord.forEach( function( coord ){ 
        var quotient = null;
        if (coord > 0) { 
            var quotient = Math.floor(coord/volume_width_half);
        } else {
            var quotient = Math.ceil(coord/volume_width_half);
        }
        const remainder = Math.abs( coord % volume_width ); 
        // console.log(quotient, remainder)
        if ( remainder >= volume_width_half) { // absolute value make sure remainder is always a positive value
            const id_value = quotient;
            id_values.push(id_value);
        } else {
            if (coord > 0) {
                const id_value = quotient + 1;
                id_values.push(id_value);
            } else {
                const id_value = quotient - 1;
                id_values.push(id_value);
            }           
        }
    }) 
    id_values.push(storeyNum)
    // console.log(id_values)
    return id_values // e.g. [1,1,1]; [3,1,2]
}



// ====================================================
// { Display } 
// ====================================================


// --------------------------------
//    Point Display
// --------------------------------

function dispDotsfromCoords ( material, list_coord ) {
    const dotGeometry = new THREE.Geometry();
    list_coord.forEach( function(coord){
        dotGeometry.vertices.push( coord );
    } ) 
    const dot = new THREE.Points( dotGeometry, material );
    scene.add( dot );
    return dot
}





function removeSingleArrayItem(arr, value) {
    var arr_copy = arr.slice(0); // makes a copy of the original array by taking a slice from the element at index 0 to the last element.
    const index = arr_copy.indexOf(value);
    if (index > -1) { // prevent reversed index
        arr_copy.splice(index, 1); // 2nd parameter means remove one item only
    }
    return arr_copy;
}

// --------------------------------
//    Toggle Helpers
// --------------------------------

function showHelper(string) {
    const helper = document.getElementById('helper');
    helper.innerHTML = string;
    helper.style.visibility = "visible";
}
function hideHelper() {
    const helper = document.getElementById('helper');
    helper.style.visibility = "hidden";
}



// --------------------------------
// { 3JS Export } ★
// --------------------------------

function exportGLTF(scene) {

    const options = {
        trs: true,
        onlyVisible: true,
        truncateDrawRange: true,
        binary: false,
        // maxTextureSize: Number(document.getElementById('option_maxsize').value) || Infinity // To prevent NaN value
    };
    
    const sceneForExport = new THREE.Scene();
    for (const sceneChild of scene.children) {
        if ((sceneChild.type !=='Mesh' &&sceneChild.type !=='Group') || sceneChild.name === "volume_base") {
            continue; //The continue statement terminates execution of the statements in the current iteration of the current or labeled loop, and continues execution of the loop with the next iteration.
        };
        sceneForExport.children.push(sceneChild) // adds one or more elements to the end of an array
    }
    
    gltfExporter.parse(
        // console.log(sceneForExport.children)
        sceneForExport, 
        function(result) {
            if (result instanceof ArrayBuffer) {
                saveArrayBuffer(result, 'scene.glb');
            } else {
                const output = JSON.stringify(result, null, 2);
                saveString(output, 'scene.gltf');
            }
        }, 
        options
    );
}
function saveArrayBuffer(buffer, filename) {
    save(new Blob([buffer], { type: 'application/octet-stream' }), filename);
}      
function saveString(text, filename) {
    save(new Blob([text], { type: 'text/plain' }), filename);
}
function save(blob, filename) {
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
}
const link = document.createElement('a');
link.style.display = 'none';
document.body.appendChild(link); 

var dictMergedMesh = {};
// --------------------------------
//    Merge Meshes
// --------------------------------
function mergeMeshes(list_mesh, mat, meshMerged, meshMergedName) { // meshMerge is a previous created variable, e.g. var meshFloorZone (a global variable carrying undefined value)
    var geomMerged = new THREE.Geometry();
    list_mesh.forEach( 
        function(mesh) {
            if (mesh.storey === storeyNum){
                mesh.updateMatrix(); // as needed
                geomMerged.merge(mesh.geometry, mesh.matrix);
                meshMerged = new THREE.Mesh(geomMerged, mat);
            }
        }
    )
    scene.add(meshMerged)
    meshMerged.name = meshMergedName;
    meshMerged.visible = false;
    meshMerged.storey = storeyNum;

    dictMergedMesh[storeyNum] = meshMerged;


    return meshMerged
}
//////////////////// -------------SPARE FUNCTION------------------------------------------------------ //////////////////// 


/*
// --------------------------------
//    Draw Line From Command
// --------------------------------

// draw_AttributeLine (top_left_corner, 'RRR DD LLL UU'); 
function draw_lines (first_pt, str) { // 'RRR DDD LLL UUUU'
    var start_pt = first_pt
    for (var i = 0; i < str.length; i++) {
        var dir = str.charAt(i);

        if (dir == 'R') {
            start_pt = drawAttrLineRight (start_pt);
        };
        if (dir == 'D') {
            start_pt = drawAttrLineDown (start_pt);
        };
        if (dir == 'L') {
            start_pt = drawAttrLineLeft (start_pt);
        };
        if (dir == 'U') {
            start_pt = drawAttrLineUp (start_pt);
        };
        // ignore if dir == ' '
    }
}
function drawAttrLineRight (start_pt, attrSet) {
    const end_pt = start_pt.clone().add( new THREE.Vector3( volume_width, 0, 0 ) );
    const AttrLine = addAttrLineUnit (start_pt, end_pt, matAttrLine, matAttrDot, attrSet);
    return [end_pt, AttrLine]
}
function drawAttrLineDown (start_pt, attrSet) {
    const end_pt = start_pt.clone().add( new THREE.Vector3( 0, -volume_width, 0 ) );
    const AttrLine = addAttrLineUnit (start_pt, end_pt, matAttrLine, matAttrDot, attrSet);
    return [end_pt, AttrLine]
}
function drawAttrLineLeft (start_pt, attrSet) {
    const end_pt = start_pt.clone().add( new THREE.Vector3( -volume_width, 0, 0 ) );
    const AttrLine = addAttrLineUnit (start_pt, end_pt, matAttrLine, matAttrDot, attrSet);
    return [end_pt, AttrLine]
}
function drawAttrLineUp (start_pt, attrSet) {
    const end_pt = start_pt.clone().add( new THREE.Vector3( 0, volume_width, 0 ) );
    const AttrLine = addAttrLineUnit (start_pt, end_pt, matAttrLine, matAttrDot, attrSet);
    return [end_pt, AttrLine]
}

// --------------------------------
//    Add/Del AttrLine to Bdy Wall
// --------------------------------

function XaddAttrLine_BdyWall (pos, angle, meshBdyWall) {
    const pos_AttrLine = getPos_AttrLine_atBdy (pos, angle);
    const AttrLine = getAttriLine_atBdyMesh( meshBdyWall ); 
    const adjacency = AttrLine.adjacency;
    if (adjacency == 'interior')  {
        deleteAttrLineUnit (pos_AttrLine);

        const dir = checkDirofMesh ( angle );
        var starting_pt = null;
        var ending_pt = null;
        if (dir == "front/back") {
            starting_pt = new THREE.Vector3 ( (pos_AttrLine.x - volume_width_half) , pos_AttrLine.y, pos_AttrLine.z );
            ending_pt = new THREE.Vector3 ( (pos_AttrLine.x + volume_width_half) , pos_AttrLine.y, pos_AttrLine.z );
        } else {
            starting_pt = new THREE.Vector3 ( pos_AttrLine.x, (pos_AttrLine.y - volume_width_half), pos_AttrLine.z );
            ending_pt = new THREE.Vector3 ( pos_AttrLine.x , (pos_AttrLine.y + volume_width_half), pos_AttrLine.z );
        }

        const attrSet = ['', 'boundary']
        addAttrLineUnit (starting_pt, ending_pt, matAttrLine, matAttrDot, attrSet)

    } // Do nothing if adjacency == 'corridor' or 'buildingedge' or 'neighbour'
}

function XSdeleteAttrLine_BdyWall (meshBdyWall) {
    const angle = meshBdyWall.rotation.z;
    const pos_AttrLine = getPos_AttrLine_atBdy (meshBdyWall.position, angle);

    const AttrLine = getAttriLine_atBdyMesh( meshBdyWall ); 
    const adjacency = AttrLine.adjacency;
    if (adjacency == 'boundary' )  {
        deleteAttrLineUnit (pos_AttrLine);
        
        const dir = checkDirofMesh ( angle );
        var starting_pt = null;
        var ending_pt = null;
        if (dir == "front/back") {
            starting_pt = new THREE.Vector3 ( (pos_AttrLine.x - volume_width_half) , pos_AttrLine.y, pos_AttrLine.z );
            ending_pt = new THREE.Vector3 ( (pos_AttrLine.x + volume_width_half) , pos_AttrLine.y, pos_AttrLine.z );
        } else {
            starting_pt = new THREE.Vector3 ( pos_AttrLine.x, (pos_AttrLine.y - volume_width_half), pos_AttrLine.z );
            ending_pt = new THREE.Vector3 ( pos_AttrLine.x , (pos_AttrLine.y + volume_width_half), pos_AttrLine.z );
        }
        
        const attrSet = ['', 'interior']
        addAttrLineUnit (starting_pt, ending_pt, matAttrLine, matAttrDot, attrSet)
    } // Do nothing if adjacency == 'corridor' or 'buildingedge' or 'neighbour'
}

// --------------------------------
//    Add/Del Bdy Wall to Floor
// --------------------------------

function XgenBdyWallEnclosure(pos_grpFloor) { // overwrite any existing hybrid mod

    // LEFT BOUNDARY WALL
    var angle_mesh = Math.PI / 2;
    var pos_mesh = new THREE.Vector3(pos_grpFloor.x - floor_width_half + offsetValue_BdyWall, pos_grpFloor.y, pos_grpFloor.z - floor_thickness/2 + BdyWall_height_half); // update global variable _pos, e.g. Vector3 {x: -1.5, y: 3, z: 0.25}
    var key_mesh = keyGen(pos_mesh);

    var pos_adjacent_mesh = new THREE.Vector3(pos_grpFloor.x - floor_width_half - offsetValue_BdyWall, pos_grpFloor.y, pos_grpFloor.z - floor_thickness/2 + BdyWall_height_half);
    var key_adjacent_mesh = keyGen(pos_adjacent_mesh);
    var bool_keyExistance = getbool_keyExistance(key_adjacent_mesh);

    if ( bool_keyExistance ) { // if adjacent mesh exists, delete adjacent mesh
        ifMatchKey_deleteMesh(key_adjacent_mesh, 'BoundaryWall', 'Window01', 'Window02', 'Door01', 'Door02', 'Door03', 'Railing01', 'Stairs01'); 
    } else {
        addBdyWall(key_mesh, pos_mesh, angle_mesh); // if adjacent mesh does not exist, add mesh
    }


    // RIGHT BOUNDARY WALL
    var angle_mesh = - Math.PI / 2;
    var pos_mesh = new THREE.Vector3(pos_grpFloor.x + floor_width_half - offsetValue_BdyWall, pos_grpFloor.y, pos_grpFloor.z - floor_thickness/2 + BdyWall_height_half); // update global variable _pos, e.g. Vector3 {x: -1.5, y: 3, z: 0.25}
    var key_mesh = keyGen(pos_mesh);

    var pos_adjacent_mesh = new THREE.Vector3(pos_grpFloor.x + floor_width_half + offsetValue_BdyWall, pos_grpFloor.y, pos_grpFloor.z - floor_thickness/2 + BdyWall_height_half);
    var key_adjacent_mesh = keyGen(pos_adjacent_mesh);

    var bool_keyExistance = getbool_keyExistance(key_adjacent_mesh);
    if ( bool_keyExistance ) { // if adjacent mesh exists, delete adjacent mesh
        ifMatchKey_deleteMesh(key_adjacent_mesh, 'BoundaryWall', 'Window01', 'Window02', 'Door01', 'Door02', 'Door03', 'Railing01', 'Stairs01'); 
    } else {
        addBdyWall(key_mesh, pos_mesh, angle_mesh); // if adjacent mesh does not exist, add mesh
    }


    // FRONT BOUNDARY WALL
    var angle_mesh = 0;
    var pos_mesh = new THREE.Vector3(pos_grpFloor.x, pos_grpFloor.y + floor_width_half - offsetValue_BdyWall, pos_grpFloor.z - floor_thickness/2 + BdyWall_height_half); // update global variable _pos, e.g. Vector3 {x: -1.5, y: 3, z: 0.25}
    var key_mesh = keyGen(pos_mesh);

    var pos_adjacent_mesh = new THREE.Vector3(pos_grpFloor.x, pos_grpFloor.y + floor_width_half + offsetValue_BdyWall, pos_grpFloor.z - floor_thickness/2 + BdyWall_height_half);
    var key_adjacent_mesh = keyGen(pos_adjacent_mesh);

    var bool_keyExistance = getbool_keyExistance(key_adjacent_mesh);
    if ( bool_keyExistance ) { // if adjacent mesh exists, delete adjacent mesh
        ifMatchKey_deleteMesh(key_adjacent_mesh, 'BoundaryWall', 'Window01', 'Window02', 'Door01', 'Door02', 'Door03', 'Railing01', 'Stairs01'); 
    } else {
        addBdyWall(key_mesh, pos_mesh, angle_mesh); // if adjacent mesh does not exist, add mesh
    }


    // BACK BOUNDARY WALL
    var angle_mesh = - Math.PI;
    var pos_mesh = new THREE.Vector3(pos_grpFloor.x, pos_grpFloor.y - floor_width_half + offsetValue_BdyWall, pos_grpFloor.z - floor_thickness/2 + BdyWall_height_half); // update global variable _pos, e.g. Vector3 {x: -1.5, y: 3, z: 0.25}
    var key_mesh = keyGen(pos_mesh);
    
    var pos_adjacent_mesh = new THREE.Vector3(pos_grpFloor.x, pos_grpFloor.y - floor_width_half - offsetValue_BdyWall, pos_grpFloor.z - floor_thickness/2 + BdyWall_height_half);
    var key_adjacent_mesh = keyGen(pos_adjacent_mesh);

    var bool_keyExistance = getbool_keyExistance(key_adjacent_mesh);
    if ( bool_keyExistance ) { // if adjacent mesh exists, delete adjacent mesh
        ifMatchKey_deleteMesh(key_adjacent_mesh, 'BoundaryWall', 'Window01', 'Window02', 'Door01', 'Door02', 'Door03', 'Railing01', 'Stairs01'); 
    } else {
        addBdyWall(key_mesh, pos_mesh, angle_mesh); // if adjacent mesh does not exist, add mesh
    }


    // pos_meshBdyWall = null // restore to initialisation state
}

function XdeleteMeshEnclosure(pos_grpFloor) { // overwrite any existing hybrid module

    // LEFT BOUNDARY MESH
    var pos_mesh = new THREE.Vector3(pos_grpFloor.x - floor_width_half + offsetValue_BdyWall, pos_grpFloor.y, pos_grpFloor.z - floor_thickness/2 + BdyWall_height_half); // update global variable _pos, e.g. Vector3 {x: -1.5, y: 3, z: 0.25}
    var key_mesh = keyGen(pos_mesh);

    var angle_adjacent_mesh = - Math.PI / 2;
    var pos_adjacent_mesh = new THREE.Vector3(pos_grpFloor.x - floor_width_half - offsetValue_BdyWall, pos_grpFloor.y, pos_grpFloor.z - floor_thickness/2 + BdyWall_height_half);
    var key_adjacent_mesh = keyGen(pos_adjacent_mesh);
    var bool_keyExistance = getbool_keyExistance(key_mesh);

    var pos_partMesh = new THREE.Vector3(pos_grpFloor.x - floor_width_half, pos_grpFloor.y, pos_grpFloor.z - floor_thickness/2 + BdyWall_height_half);
    var key_partMesh = keyGen(pos_partMesh);
    var bool_keyExistance_partMesh = getbool_keyExistance(key_partMesh);

    if ( bool_keyExistance ) { // if mesh exists, delete
        ifMatchKey_deleteMesh(key_mesh, 'BoundaryWall', 'Window01', 'Window02', 'Door01', 'Door02', 'Door03', 'Railing01', 'Stairs01');
    } else { // if mesh does not exist, add adjacent mesh
        if (bool_keyExistance_partMesh) { // if partition mesh exist, delete
            ifMatchKey_deleteMesh(key_partMesh, 'PartitionWall', 'Window01', 'Window02', 'Door01', 'Door02', 'Door03', 'Railing01', 'Stairs01'); 
        }
        addBdyWall(key_adjacent_mesh, pos_adjacent_mesh, angle_adjacent_mesh);
    }

    // RIGHT BOUNDARY WALL
    var pos_mesh = new THREE.Vector3(pos_grpFloor.x + floor_width_half - offsetValue_BdyWall, pos_grpFloor.y, pos_grpFloor.z - floor_thickness/2 + BdyWall_height_half); // update global variable _pos, e.g. Vector3 {x: -1.5, y: 3, z: 0.25}
    var key_mesh = keyGen(pos_mesh);

    var angle_adjacent_mesh = Math.PI / 2;
    var pos_adjacent_mesh = new THREE.Vector3(pos_grpFloor.x + floor_width_half + offsetValue_BdyWall, pos_grpFloor.y, pos_grpFloor.z - floor_thickness/2 + BdyWall_height_half);
    var key_adjacent_mesh = keyGen(pos_adjacent_mesh);
    var bool_keyExistance = getbool_keyExistance(key_mesh);

    var pos_partMesh = new THREE.Vector3(pos_grpFloor.x + floor_width_half, pos_grpFloor.y, pos_grpFloor.z - floor_thickness/2 + BdyWall_height_half);
    var key_partMesh = keyGen(pos_partMesh);
    var bool_keyExistance_partMesh = getbool_keyExistance(key_partMesh);

    if ( bool_keyExistance ) { // if mesh exists, delete
        ifMatchKey_deleteMesh(key_mesh, 'BoundaryWall', 'Window01', 'Window02', 'Door01', 'Door02', 'Door03', 'Railing01', 'Stairs01');
    } else { // if mesh does not exist, add adjacent mesh
        if (bool_keyExistance_partMesh) { // if partition mesh exist, delete
            ifMatchKey_deleteMesh(key_partMesh, 'PartitionWall', 'Window01', 'Window02', 'Door01', 'Door02', 'Door03', 'Railing01', 'Stairs01'); 
        }
        addBdyWall(key_adjacent_mesh, pos_adjacent_mesh, angle_adjacent_mesh);
    }

    // FRONT BOUNDARY WALL
    var pos_mesh = new THREE.Vector3(pos_grpFloor.x, pos_grpFloor.y + floor_width_half - offsetValue_BdyWall, pos_grpFloor.z - floor_thickness/2 + BdyWall_height_half); // update global variable _pos, e.g. Vector3 {x: -1.5, y: 3, z: 0.25}
    var key_mesh = keyGen(pos_mesh);

    var angle_adjacent_mesh = - Math.PI;
    var pos_adjacent_mesh = new THREE.Vector3(pos_grpFloor.x, pos_grpFloor.y + floor_width_half + offsetValue_BdyWall, pos_grpFloor.z - floor_thickness/2 + BdyWall_height_half);
    var key_adjacent_mesh = keyGen(pos_adjacent_mesh);
    var bool_keyExistance = getbool_keyExistance(key_mesh);

    var pos_partMesh = new THREE.Vector3(pos_grpFloor.x, pos_grpFloor.y + floor_width_half, pos_grpFloor.z - floor_thickness/2 + BdyWall_height_half);
    var key_partMesh = keyGen(pos_partMesh);
    var bool_keyExistance_partMesh = getbool_keyExistance(key_partMesh);

    if ( bool_keyExistance ) { // if mesh exists, delete
        ifMatchKey_deleteMesh(key_mesh, 'BoundaryWall', 'Window01', 'Window02', 'Door01', 'Door02', 'Door03', 'Railing01', 'Stairs01');
    } else { // if mesh does not exist, add adjacent mesh
        if (bool_keyExistance_partMesh) { // if partition mesh exist, delete
            ifMatchKey_deleteMesh(key_partMesh, 'PartitionWall', 'Window01', 'Window02', 'Door01', 'Door02', 'Door03', 'Railing01', 'Stairs01'); 
        }
        addBdyWall(key_adjacent_mesh, pos_adjacent_mesh, angle_adjacent_mesh);
    }

    // BACK BOUNDARY WALL
    var pos_mesh = new THREE.Vector3(pos_grpFloor.x, pos_grpFloor.y - floor_width_half + offsetValue_BdyWall, pos_grpFloor.z - floor_thickness/2 + BdyWall_height_half); // update global variable _pos, e.g. Vector3 {x: -1.5, y: 3, z: 0.25}
    var key_mesh = keyGen(pos_mesh);

    var angle_adjacent_mesh = 0;
    var pos_adjacent_mesh = new THREE.Vector3(pos_grpFloor.x, pos_grpFloor.y - floor_width_half - offsetValue_BdyWall, pos_grpFloor.z - floor_thickness/2 + BdyWall_height_half);
    var key_adjacent_mesh = keyGen(pos_adjacent_mesh);
    var bool_keyExistance = getbool_keyExistance(key_mesh);

    var pos_partMesh = new THREE.Vector3(pos_grpFloor.x, pos_grpFloor.y - floor_width_half, pos_grpFloor.z - floor_thickness/2 + BdyWall_height_half);
    var key_partMesh = keyGen(pos_partMesh);
    var bool_keyExistance_partMesh = getbool_keyExistance(key_partMesh);

    if ( bool_keyExistance ) { // if mesh exists, delete
        ifMatchKey_deleteMesh(key_mesh, 'BoundaryWall', 'Window01', 'Window02', 'Door01', 'Door02', 'Door03', 'Railing01', 'Stairs01');
    } else { // if mesh does not exist, add adjacent mesh
        if (bool_keyExistance_partMesh) { // if partition mesh exist, delete
            ifMatchKey_deleteMesh(key_partMesh, 'PartitionWall', 'Window01', 'Window02', 'Door01', 'Door02', 'Door03', 'Railing01', 'Stairs01'); 
        }
        addBdyWall(key_adjacent_mesh, pos_adjacent_mesh, angle_adjacent_mesh);
    }
}

// --------------------------------
//    addHoverDisp PartWall toIntFloor 
// --------------------------------

function xaddHoverDisp_PartWall_toIntFloor(meshInt0) { // check distance from boundary and presense of boundary mesh
    const pos_meshInt = meshInt0.object.position;
                    
    // CHECK DISTANCE FROM BOUNDARY ON 4 SIDES

    const pos_leftBdyMesh = new THREE.Vector3(pos_meshInt.x - floor_width_half + offsetValue_BdyWall, pos_meshInt.y, pos_meshInt.z - floor_thickness/2 + BdyWall_height_half);
    const pos_rightBdyMesh = new THREE.Vector3(pos_meshInt.x + floor_width_half - offsetValue_BdyWall, pos_meshInt.y, pos_meshInt.z - floor_thickness/2 + BdyWall_height_half);
    const pos_frontBdyMesh = new THREE.Vector3(pos_meshInt.x, pos_meshInt.y + floor_width_half - offsetValue_BdyWall, pos_meshInt.z - floor_thickness/2 + BdyWall_height_half);
    const pos_backBdyMesh = new THREE.Vector3(pos_meshInt.x, pos_meshInt.y - floor_width_half + offsetValue_BdyWall, pos_meshInt.z - floor_thickness/2 + BdyWall_height_half);

    const dist_leftBdyMesh = pos_leftBdyMesh.distanceTo(meshInt0.point); // distance to mouse pointer
    const dist_rightBdyMesh = pos_rightBdyMesh.distanceTo(meshInt0.point); // distance to mouse pointer
    const dist_frontBdyMesh = pos_frontBdyMesh.distanceTo(meshInt0.point); // distance to mouse pointer
    const dist_backBdyMesh = pos_backBdyMesh.distanceTo(meshInt0.point); // distance to mouse pointer
    const closest_dist_mesh = Math.min(dist_leftBdyMesh, dist_rightBdyMesh, dist_frontBdyMesh, dist_backBdyMesh);


    const angle_hor = 0;
    const angle_ver = Math.PI / 2;

    // IF CLOSEST TO LEFT BOUNDARY
    if (closest_dist_mesh == dist_leftBdyMesh) {
        const key_BdyMesh = keyGen(pos_leftBdyMesh);
        
        const pos_mesh = new THREE.Vector3(pos_meshInt.x - floor_width_half, pos_meshInt.y, pos_meshInt.z - floor_thickness/2 + BdyWall_height_half);
        const key_mesh = keyGen(pos_mesh);
        
        const bool_keyExistance = getbool_keyExistance(key_mesh) || getbool_keyExistance(key_BdyMesh) ;
        if ( bool_keyExistance ) { // if mesh exists, do nothing
        } else { // if mesh does not exist, show trans
            pos_meshPartWall = pos_mesh;
            angle_meshPartWall = angle_ver;
            addHoverDisp_PartWall(pos_meshPartWall, angle_meshPartWall);
        }
    }

    // IF CLOSEST TO RIGHT BOUNDARY
    if (closest_dist_mesh == dist_rightBdyMesh) {
        const key_BdyMesh = keyGen(pos_rightBdyMesh);

        const pos_mesh = new THREE.Vector3(pos_meshInt.x + floor_width_half, pos_meshInt.y, pos_meshInt.z - floor_thickness/2 + BdyWall_height_half);
        const key_mesh = keyGen(pos_mesh);

        const bool_keyExistance = getbool_keyExistance(key_mesh) || getbool_keyExistance(key_BdyMesh) ;
        if ( bool_keyExistance ) { // if mesh exists, do nothing
        } else { // if mesh does not exist, show trans
            pos_meshPartWall = pos_mesh;
            angle_meshPartWall = angle_ver;
            addHoverDisp_PartWall(pos_meshPartWall, angle_meshPartWall);
        }
    }

    // IF CLOSEST TO FRONT BOUNDARY
    if (closest_dist_mesh == dist_frontBdyMesh) {
        const key_BdyMesh = keyGen(pos_frontBdyMesh);
        
        const pos_mesh = new THREE.Vector3(pos_meshInt.x, pos_meshInt.y + floor_width_half, pos_meshInt.z - floor_thickness/2 + BdyWall_height_half);
        const key_mesh = keyGen(pos_mesh);

        const bool_keyExistance = getbool_keyExistance(key_mesh) || getbool_keyExistance(key_BdyMesh) ;
        if ( bool_keyExistance ) { // if mesh exists, do nothing
        } else { // if mesh does not exist, show trans
            pos_meshPartWall = pos_mesh;
            angle_meshPartWall = angle_hor;
            addHoverDisp_PartWall(pos_meshPartWall, angle_meshPartWall);
        }
    }
    
    // IF CLOSEST TO BACK BOUNDARY
    if (closest_dist_mesh == dist_backBdyMesh) {
        const key_BdyMesh = keyGen(pos_backBdyMesh);
        
        const pos_mesh = new THREE.Vector3(pos_meshInt.x, pos_meshInt.y - floor_width_half, pos_meshInt.z - floor_thickness/2 + BdyWall_height_half);
        const key_mesh = keyGen(pos_mesh);

        const bool_keyExistance = getbool_keyExistance(key_mesh) || getbool_keyExistance(key_BdyMesh) ;
        if ( bool_keyExistance ) { // if mesh exists, do nothing
        } else { // if mesh does not exist, show trans
            pos_meshPartWall = pos_mesh;
            angle_meshPartWall = angle_hor;
            addHoverDisp_PartWall(pos_meshPartWall, angle_meshPartWall);
        }
    }
}

// --------------------------------
//    Orient Meshes 
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
        pos.z += BdyWall_height;
    }  else if (meshInt0.faceIndex == 10 || meshInt0.faceIndex == 11) { // bottom left || right
        pos.z -= BdyWall_height;
    }
    meshHorizHover.position.set(pos.x, pos.y, pos.z);
    meshHorizDel.visible = false;
    meshHorizHover.visible = true;

}

function orientVertMeshToFaceOfIntMesh( meshInt0, pos, meshVertHover, meshVertDel ) { // create different oriented position depending on the face of mesh intersected, show meshHover and allow adding of mesh
    
    if (meshInt0.faceIndex == 0 || meshInt0.faceIndex == 1) { // right top || right bottom
        if (angle_meshBdyWall !== 0) {
            pos.y += BdyWall_width;
        } else {
            pos.x += BdyWall_width;
        }
    } else if (meshInt0.faceIndex == 3 || meshInt0.faceIndex == 2) { // left top || left bottom
        if (angle_meshBdyWall !== 0) {
            pos.y -= BdyWall_width;
        } else {
            pos.x -= BdyWall_width;
        }
    } else if (meshInt0.faceIndex == 6) { // front left
        if (angle_meshBdyWall !== 0) {
            angle_meshBdyWall = 0;
            pos.x += BdyWall_width_half;
            pos.y -= BdyWall_width_half;
        } else {
            angle_meshBdyWall = Math.PI / 2;
            pos.x -= BdyWall_width_half;
            pos.y -= BdyWall_width_half;
        }
    } else if (meshInt0.faceIndex == 7) { // front right
        if (angle_meshBdyWall !== 0) {
            angle_meshBdyWall = 0;
            pos.x += BdyWall_width_half;
            pos.y += BdyWall_width_half;
        } else {
            angle_meshBdyWall = Math.PI / 2;
            pos.x += BdyWall_width_half;
            pos.y -= BdyWall_width_half;
        }
    } else if (meshInt0.faceIndex == 5) { // back left
        if (angle_meshBdyWall !== 0) {
            angle_meshBdyWall = 0;
            pos.x -= BdyWall_width_half;
            pos.y += BdyWall_width_half;
        } else {
            angle_meshBdyWall = Math.PI / 2;
            pos.x += BdyWall_width_half;
            pos.y += BdyWall_width_half;
        }
    } else if (meshInt0.faceIndex == 4) { // back right
        if (angle_meshBdyWall !== 0) {
            angle_meshBdyWall = 0;
            pos.x -= BdyWall_width_half;
            pos.y -= BdyWall_width_half;
        } else {
            angle_meshBdyWall = Math.PI / 2;
            pos.x -= BdyWall_width_half;
            pos.y += BdyWall_width_half;
        }
    } else if (meshInt0.faceIndex == 8 || meshInt0.faceIndex == 9) { // top left || right
        pos.z += BdyWall_height; 
    } else if (meshInt0.faceIndex == 11 || meshInt0.faceIndex == 12) { // bottom left || right
        pos.z -= BdyWall_height; 
    }
    meshVertHover.position.set(pos.x, pos.y, pos.z);
    meshVertHover.rotation.z = angle_meshBdyWall;
    meshVertDel.visible = false;
    meshVertHover.visible = true;

}

// --------------------------------
//    Merge Buffer Geometry
// --------------------------------
function mergeBufferGeometry(list_bufferGeom, mat, meshMerged, meshMergedName) {
    const bufferGeometryMerged = BufferGeometryUtils.mergeBufferGeometries(list_bufferGeom, false); // https://jsfiddle.net/j3dakqmr/
    meshMerged = new THREE.Mesh(bufferGeometryMerged, mat);
    meshMerged.name = meshMergedName
    meshMerged.visible = false;
    scene.add(meshMerged)
    return meshMerged
}

// --------------------------------
//    Merge Buffer Geometry
// --------------------------------

function getPos_FloorFrac_MathGrid ( pos ) {
    pos_FloorFrac = new THREE.Vector3();
    if (num_cells % 2 == 1) {// odd number of cells
        pos_FloorFrac.x = Math.round(pos.x / FloorFrac_width) * FloorFrac_width;
        pos_FloorFrac.y = Math.round(pos.y / FloorFrac_width) * FloorFrac_width;
    } else { // even number of cells
        pos_FloorFrac.x = Math.round((FloorFrac_width_half + pos.x) / FloorFrac_width) * FloorFrac_width - FloorFrac_width_half;
        pos_FloorFrac.y = Math.round((pos.y + FloorFrac_width_half) / FloorFrac_width) * FloorFrac_width - FloorFrac_width_half;
    }
    pos_FloorFrac.z = groundHeight + floor_thickness/2 ; // move meshFloor up to align it with grid
    pos_FloorFrac = roundPos(pos_FloorFrac, 3)
}

// __________________________
//    	　_ * HYBRID MOD *
// ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾

if ( bool_delGrpHybrid == true) { // if shift is pressed
    raycaster.setFromCamera( mouse, camera );
    var list_meshScene = getMeshInScene(); // get the mesh in the scene to check for intersections
    var list_meshInt = raycaster.intersectObjects( list_meshScene ); // returns an array of intersected items, e.g. (3) [{…}, {…}, {…}] 
    var meshInt0 = list_meshInt[ 0 ]; // get the first mesh that the cursor intersects e.g. {distance: 29.318, point: Vector3, object: Mesh, face: Face3, faceIndex: 5}

    if ( list_meshInt.length > 0 ) { // if intersect with any mesh
        var name = "'" +meshInt0.object.parent.name + "'";
        console.log(name, list_grpHyrid, name in list_grpHyrid)
        // console.log(list_grpHyrid)
        if (("'" +meshInt0.object.parent.name + "'") in list_grpHyrid) {
            var grpInt = meshInt0.object.parent.parent; // Group { .., name: 'Window01', ..}
            var cen_grpInt = grpInt.position; // centre of the first mesh that the cursor intersects, e.g. Vector3 {x: -1.5, y: 3, z: 0.25}
            pos_grpHybrid = new THREE.Vector3(cen_grpInt.x, cen_grpInt.y, cen_grpInt.z); // update global variable _pos, e.g. Vector3 {x: -1.5, y: 3, z: 0.25}
            angle_grpHybrid = grpInt.rotation.z;
            // console.log(meshInt0)
            // console.log(pos_grpHybrid)
            // console.log(angle_grpHybrid)
        }
    }

}




    // __________________________
    //    	　_ * CEILING *
    // ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾

    if ( id_buttonPressed == 'buttonCeiling' ) {
        raycaster.setFromCamera( mouse, camera ); // create a ray from the camera and intersect it with objects in the scene
        const list_meshScene = Object.values(dictCeiling); // get the meshes in the scene to check for intersections
        list_meshScene.push(meshFloorZone);
        const list_meshInt = raycaster.intersectObjects( list_meshScene ); // returns an array of cursor-intersected items, e.g. (3) [{…}, {…}, {…}] 
        const meshInt0 = list_meshInt[ 0 ]; // get the first mesh that the cursor intersects e.g. {distance: 29.318, point: Vector3, object: Mesh, face: Face3, faceIndex: 5}

        if ( list_meshInt.length > 0 ) { // if intersect with any meshes

            if (meshInt0.object.name == 'ceiling') { //if the first mesh that the cursor intersects has the name " "

                const cen_meshInt0 = meshInt0.object.position; // centre of the first mesh that the cursor intersects, e.g. Vector3 {x: -1.5, y: 3, z: 0.25}
                pos_grpCeiling = new THREE.Vector3(cen_meshInt0.x, cen_meshInt0.y, cen_meshInt0.z); // update global variable _pos, e.g. Vector3 {x: -1.5, y: 3, z: 0.25}
                
                if (!bool_delCeiling) { // if shift button is not pressed, show nothing
                    meshCeilingTrans.visible = false;
                    meshCeilingDel.visible = false;
                    pos_grpCeiling = null;
                }

                else { // if shift button is pressed, show geom_trans_del
                    meshCeilingDel.position.set(pos_grpCeiling.x, pos_grpCeiling.y, pos_grpCeiling.z);
                    meshCeilingDel.visible = true;
                    meshCeilingTrans.visible = false;
                } 

            } else { // if the first mesh that the cursor intersects does not has the name " ", i.e. intersect with ground
                
                if (!bool_delCeiling) { // if shift button is not pressed, update pos and show geom_trans 
                    pos_grpCeiling = new THREE.Vector3();
                    if (num_cells % 2 == 1) {// odd number of cells
                        pos_grpCeiling.x = Math.round(meshInt0.point.x / ceiling_width) * ceiling_width;
                        pos_grpCeiling.y = Math.round(meshInt0.point.y / ceiling_width) * ceiling_width;
                    } else { // even number of cells
                        pos_grpCeiling.x = Math.round((ceiling_width_half + meshInt0.point.x) / ceiling_width) * ceiling_width - ceiling_width_half;
                        pos_grpCeiling.y = Math.round((meshInt0.point.y + ceiling_width_half) / ceiling_width) * ceiling_width  - ceiling_width_half;
                    }
                    pos_grpCeiling.z = truncNumTo3dp(groundHeight + BdyWall_height - ceiling_thickness_half - overlapOffset) ; // move meshCeiling up to align it with grid
                    meshCeilingTrans.position.set(pos_grpCeiling.x, pos_grpCeiling.y, pos_grpCeiling.z);
                    meshCeilingDel.visible = false;
                    meshCeilingTrans.visible = true;
                }
            }    

        } else { // if do not intersect with anything, show nothing
            meshCeilingTrans.visible = false;
            meshCeilingDel.visible = false;
            pos_grpCeiling = null;
        }
   }

    // __________________________
    //    	　_ * BOUNDARY WALL * ★
    // ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
    if ( id_buttonPressed == 'buttonBoundaryWall' ) {
        raycaster.setFromCamera( mouse, camera );
        const list_meshScene = getMeshInScene(); // get the mesh in the scene to check for intersections
        list_meshScene.push(meshFloorZone);
        const list_meshInt = raycaster.intersectObjects( list_meshScene ); // returns an array of intersected items, e.g. (3) [{…}, {…}, {…}] 
        const meshInt0 = list_meshInt[ 0 ]; // get the first mesh that the cursor intersects e.g. {distance: 29.318, point: Vector3, object: Mesh, face: Face3, faceIndex: 5}
        
        if ( list_meshInt.length > 0 ) { // if intersect with any meshes

            if (meshInt0.object.name == 'BoundaryWall') { // if the first mesh that the cursor intersects has the name ' '
                if (!bool_delBdyWall) { // if shift button is not pressed, update trans pos and show geom_trans 
                    // orientVertMeshToFaceOfIntMesh( meshInt0, pos_meshBdyWall, meshBdyWallTrans, meshBdyWallDel );
                }
                else { // if shift button is pressed, show geom_trans_del
                    // delHoverDisp_BdyWall( meshInt0.object )
                } 
            } 
            
        } else { // if do not intersect with anything, show nothing
            meshBdyWallTrans.visible = false;
            meshBdyWallDel.visible = false;
            pos_meshBdyWall = null;
        }
        // console.log('~~pos_meshBdyWall~~', pos_meshBdyWall)
    }	

    

*/
