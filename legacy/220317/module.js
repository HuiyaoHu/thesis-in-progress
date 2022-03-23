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

const checkboxChassis = document.getElementById("checkboxChassis");   
const checkboxNeighbours = document.getElementById("checkboxNeighbour01");   
const checkboxCeiling = document.getElementById("checkboxCeiling");   

// IDS
document.getElementById("buttonVolume").addEventListener("click", onClickbuttonVolume );
document.getElementById("buttonFloor").addEventListener("click",  onClickbuttonFloor);
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
const list_meshMod = ['BoundaryWall', 'PartitionWall', 'Window01', 'Window02', 'Door01', 'Door02', 'Door03', 'Railing01', 'Stairs01'];
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
const matGrid = new THREE.LineBasicMaterial( {color: 0x000000, linewidth: 1} );

// TEXT
const matAttrText = new THREE.LineBasicMaterial( {color: 0x0000ff, linewidth: 1} );
const matText = new THREE.LineBasicMaterial( {color: 0x000000, linewidth: 1} );

// VOLUME
const matVolume = new THREE.MeshStandardMaterial({color: 'blue', opacity: 0.1, transparent: true});
const matVolumeTrans = new THREE.MeshStandardMaterial({color: 'burlywood', opacity: 0.2, transparent: true});
const matVolumeDel = new THREE.MeshStandardMaterial({color: 'white', opacity: 0.6, transparent: true});

const matFloorTrans = new THREE.MeshStandardMaterial({color: 'burlywood', opacity: 0.2, transparent: true});
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


// __________________________
//    	　_ * GRID *
// ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾

// GEOMETRIES
var  objectGrid = null
loader.load( // Load a glTF resource
    'models/Grid.gltf', // resource URL
    function ( gltf ) { // called when the resource is loaded
        objectGrid = gltf.scene;
        // objectGrid.getObjectByName("line").material = matGrid;
        scene.add( objectGrid );
    },
    function ( xhr ) { // called while loading is progressing
		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
	},
    function ( error ) { // called when loading has errors
        console.log( 'An error happened' );
    }
);

    // SCENE GRID
    const gridGround = new THREE.GridHelper( ground_size, num_cells, 0x504F4F, 0x504F4F );
    gridGround.rotation.x = Math.PI / 2;
    gridGround.position.x = 0;
    gridGround.position.y = 0;
    gridGround.position.z = 0; // -floor_thickness/2
    // scene.add( gridGround );
        // var axesHelper = new THREE.AxesHelper( 600 );
        // scene.add( axesHelper )


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
        meshChassis.visible = true;

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
//    	　_ * NEIGHBOUR01 *
// ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾

// GEOMETRIES
var  meshNeighbour01 = null
loader.load( // Load a glTF resource
    'models/Neighbour01.gltf', // resource URL
    function ( gltf ) { // called when the resource is loaded
        meshNeighbour01 = gltf.scene;
        scene.add( meshNeighbour01 );
        meshNeighbour01.visible = false;
        meshNeighbour01.name = "meshNeighbour01";
    },
    function ( xhr ) { // called while loading is progressing
		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
	},
    function ( error ) { // called when loading has errors
        console.log( 'An error happened' );
    }
);

// __________________________
//    	　_ * NEIGHBOUR02 *
// ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾

// GEOMETRIES
var  meshNeighbour02 = null
loader.load( // Load a glTF resource
    'models/Neighbour02.gltf', // resource URL
    function ( gltf ) { // called when the resource is loaded
        meshNeighbour02 = gltf.scene;
        /*
        setOpacity( meshNeighbour02, 0.5 );
        function setOpacity( obj, opacity ) {
          obj.children.forEach((child)=>{
            setOpacity( child, opacity );
          });
          if ( obj.material ) {
            obj.material.opacity = opacity ;
          }
        };

        meshNeighbour02.traverse(function(child) { // returns all children of objects with a matching name.
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

        meshNeighbour02.traverse(function(child) { // returns all children of objects with a matching name.
            child.material = concrete;
        });

        */
        scene.add( meshNeighbour02 );
        meshNeighbour02.visible = false;
        meshNeighbour02.name = "meshNeighbour02";

    },
    function ( xhr ) { // called while loading is progressing
		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
	},
    function ( error ) { // called when loading has errors
        console.log( 'An error happened' );
    }
);


// __________________________
//    	　_ * NEIGHBOUR03 *
// ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾

// GEOMETRIES
var  meshNeighbour03 = null
loader.load( // Load a glTF resource
    'models/Neighbour03.gltf', // resource URL
    function ( gltf ) { // called when the resource is loaded
        meshNeighbour03 = gltf.scene;
        scene.add( meshNeighbour03 );
        meshNeighbour03.visible = false;
        meshNeighbour03.name = "meshNeighbour03";

    },
    function ( xhr ) { // called while loading is progressing
		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
	},
    function ( error ) { // called when loading has errors
        console.log( 'An error happened' );
    }
);

// __________________________
//    	　_ * NEIGHBOUR04 *
// ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾

// GEOMETRIES
var  meshNeighbour04 = null
loader.load( // Load a glTF resource
    'models/Neighbour04.gltf', // resource URL
    function ( gltf ) { // called when the resource is loaded
        meshNeighbour04 = gltf.scene;
        scene.add( meshNeighbour04 );
        meshNeighbour04.visible = false;
        meshNeighbour04.name = "meshNeighbour04";

    },
    function ( xhr ) { // called while loading is progressing
		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
	},
    function ( error ) { // called when loading has errors
        console.log( 'An error happened' );
    }
);


// __________________________
//    	　_ * FLOOR *
// ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾

// DIMENSIONS
const floor_width = 3.5; const floor_width_half = floor_width/2;
const floor_length = 3.5;
const floor_thickness = 0.7; const floor_thickness_half = 0.7/2;

// GEOMETRIES
const geomFloor = new THREE.BoxBufferGeometry( floor_width, floor_length, floor_thickness );
const geomFloorHover = new THREE.BoxBufferGeometry( floor_width * 1, floor_length* 1, floor_thickness * 1 );
const geomFloorDel = new THREE.BoxBufferGeometry( floor_width * 1.1, floor_length* 1.1, floor_thickness * 1.1 );

const meshFloorTrans = new THREE.Mesh( geomFloorHover, matFloorTrans );
meshFloorTrans.visible = false;
const meshFloorDel = new THREE.Mesh( geomFloorDel, matFloorDel );
meshFloorDel.visible = false;

scene.add(meshFloorTrans);
scene.add(meshFloorDel);


// INITIALISATION 
var dictFloor = {};
var pos_meshFloor = null;
var bool_delFloor = false;
var cnt_meshFloor = 0;


// __________________________
//    	　_ * CEILING *
// ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾

// DIMENSIONS
const ceiling_width = 3.5; const ceiling_width_half = ceiling_width/2;
const ceiling_length = 3.5;
const ceiling_thickness = 0.10;
const overlapOffset = 0.001;

// GEOMETRIES
const geomCeiling = new THREE.BoxBufferGeometry( ceiling_width, ceiling_length, ceiling_thickness );
const geomCeilingHover = new THREE.BoxBufferGeometry( ceiling_width * 1, ceiling_length* 1, ceiling_thickness * 1 );
const geomCeilingDel = new THREE.BoxBufferGeometry( ceiling_width * 1.1, ceiling_length* 1.1, ceiling_thickness * 1.01 );

const meshCeilingTrans = new THREE.Mesh( geomCeilingHover, matFloorTrans );
meshCeilingTrans.visible = false;
const meshCeilingDel = new THREE.Mesh( geomCeilingDel, matFloorDel );
meshCeilingDel.visible = false;

scene.add(meshCeilingTrans);
scene.add(meshCeilingDel);

// INITIALISATION 
var dictCeiling = {};
var pos_meshCeiling = null;
var bool_delCeiling = false;
var cnt_meshCeiling = 0;


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
const Door03_width = 3.5; const Door03_width_half = Door03_width / 2;
const Door03_height = 3.5; const Door03_height_half = Door03_height / 2;
const Door03_thickness = 0.5;

const meshDoor03Trans = new THREE.Mesh( geomDoor01Hover, matHybridTrans );
meshDoor03Trans.visible = false;
const meshDoor03Del = new THREE.Mesh( geomDoor01Del, matBdyWallDel );
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
const Stairs01_width = 3.5; const Stairs01_width_half = Stairs01_width / 2;
const Stairs01_height = 3.5; const Stairs01_height_half = Stairs01_height / 2;
const Stairs01_thickness = 0.5;

// GEOMETRIES
const geomStairs01Hover = new THREE.BoxBufferGeometry( Stairs01_width * 1, Stairs01_thickness* 1, Stairs01_height * 1 );
const geomStairs01Del = new THREE.BoxBufferGeometry( Stairs01_width * 1.1, Stairs01_thickness* 1.1, Stairs01_height * 1.1 );

const meshStairs01Trans = new THREE.Mesh( geomStairs01Hover, matHybridTrans );
meshStairs01Trans.visible = false;
const meshStairs01Del = new THREE.Mesh( geomStairs01Del, matBdyWallDel );
meshStairs01Del.visible = false;

scene.add(meshStairs01Trans);
scene.add(meshStairs01Del);


var  meshStairs01 = null
loader.load( // Load a glTF resource
    'models/Stairs01.gltf', // resource URL
    function ( gltf ) { // called when the resource is loaded
        meshStairs01 = gltf.scene;
        meshStairs01.getObjectByName("SIP").material = obs;
        meshStairs01.getObjectByName("Staircase").material = clt;
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
const offsetHeight_AttrLine_fromVerModPos = BdyWall_height_half - floor_thickness;
const offsetHeight_meshPartWall_fromAttrLine = new THREE.Vector3(0, 0, PartWall_height_half - floor_thickness);
const offsetHeight_posVerMod_fromFloorPos = BdyWall_height_half - floor_thickness_half;


const offsetValue_hor_PartWall = new THREE.Vector3( PartWall_width, 0, 0); 
const offsetValue_ver_PartWall = new THREE.Vector3( 0, PartWall_width, 0); 
const offsetValue_hor_BdyWall = new THREE.Vector3( PartWall_width_half, 0, 0); 

const num_div_row_onFloor = floor_width / PartWall_width;
const num_div_onFloor = num_div_row_onFloor * num_div_row_onFloor;

const zpos_AttrLine = floor_thickness;

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
    //    	　_ * CHASSIS *
    // ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
    
    // console.log(checkboxChassis.checked)
    if (checkboxChassis.checked == false){
        if (scene.getObjectByName('Chassis') != undefined) {
            scene.getObjectByName('Chassis').visible = false;
        } else {
            // scene.getObjectByName('Chassis').visible = false; // turn on if index.html starts with checked
        } 
    } 
    else {
        if (scene.getObjectByName('Chassis') != undefined) {
            scene.getObjectByName('Chassis').visible = true; 
        };   
    };

    // __________________________
    //    	　_ * NEIGHBOURS *
    // ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾

    if (checkboxNeighbours.checked == false){
        if (meshNeighbour01 != null) {
            meshNeighbour01.visible=false;
            meshNeighbour02.visible=false;
            meshNeighbour03.visible=false;
            meshNeighbour04.visible=false;
        } else { // turn on if index.html starts with checked
            // meshNeighbour01.visible=false;
            // meshNeighbour02.visible=false;
            // meshNeighbour03.visible=false;
            // meshNeighbour04.visible=false;
        } 
    } 
    else {
        if (meshNeighbour01 != null) {
            meshNeighbour01.visible = true; 
            meshNeighbour02.visible = true; 
            meshNeighbour03.visible = true; 
            meshNeighbour04.visible = true; 
        };   
    };
    // console.log(scene)
    // console.log(meshNeighbour01)

    // __________________________
    //    	　_ * VOLUME *
    // ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
    if ( id_buttonPressed == 'buttonVolume' ) {

        raycaster.setFromCamera( mouse, camera ); // create a ray from the camera and intersect it with objects in the scene
        const list_meshScene = getValueList(dictVolume, 1); // get the meshes in the scene to check for intersections
        list_meshScene.push(ground);
        const list_meshInt = raycaster.intersectObjects( list_meshScene ); // returns an array of cursor-intersected items, e.g. (3) [{…}, {…}, {…}] 
        const meshInt0 = list_meshInt[ 0 ]; // get the first mesh that the cursor intersects e.g. {distance: 29.318, point: Vector3, object: Mesh, face: Face3, faceIndex: 5}

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
                    pos_meshVolume.z = volume_height/2 ; // move volume up to align it with grid
                    meshVolumeTrans.position.set(pos_meshVolume.x, pos_meshVolume.y, pos_meshVolume.z);
                    meshVolumeDel.visible = false;
                    meshVolumeTrans.visible = true;
                }
            }    

        } else { // if do not intersect with anything, show nothing
            meshVolumeTrans.visible = false;
            meshVolumeDel.visible = false;
            pos_meshVolume = null;
        }
   }

    // __________________________
    //    	　_ * FLOOR *
    // ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
    if ( id_buttonPressed == 'buttonFloor' ) {
        raycaster.setFromCamera( mouse, camera ); // create a ray from the camera and intersect it with objects in the scene
        const list_meshScene = Object.values(dictFloor); // get the meshes in the scene to check for intersections
        list_meshScene.push(meshFloorZone);
        const list_meshInt = raycaster.intersectObjects( list_meshScene ); // returns an array of cursor-intersected items, e.g. (3) [{…}, {…}, {…}] 
        const meshInt0 = list_meshInt[ 0 ]; // get the first mesh that the cursor intersects e.g. {distance: 29.318, point: Vector3, object: Mesh, face: Face3, faceIndex: 5}

        if ( list_meshInt.length > 0 ) { // if intersect with any meshes

            if (meshInt0.object.name == 'floor') { //if the first mesh that the cursor intersects has the name " "

                const cen_meshInt0 = meshInt0.object.position; // centre of the first mesh that the cursor intersects, e.g. Vector3 {x: -1.5, y: 3, z: 0.25}
                pos_meshFloor = new THREE.Vector3(cen_meshInt0.x, cen_meshInt0.y, cen_meshInt0.z); // update global variable _pos, e.g. Vector3 {x: -1.5, y: 3, z: 0.25}
                
                if (!bool_delFloor) { // if shift button is not pressed, update trans pos and show geom_trans 
                    // orientHorizMeshToFaceOfIntMesh( meshInt0, pos_meshFloor, meshFloorTrans, meshFloorDel );
                }

                else { // if shift button is pressed, show geom_trans_del
                    meshFloorDel.position.set(pos_meshFloor.x, pos_meshFloor.y, pos_meshFloor.z);
                    meshFloorDel.visible = true;
                    meshFloorTrans.visible = false;
                } 

            } else { // if the first mesh that the cursor intersects does not has the name " ", i.e. intersect with ground
                
                if (!bool_delFloor) { // if shift button is not pressed, update pos and show geom_trans 
                    pos_meshFloor = new THREE.Vector3();
                    if (num_cells % 2 == 1) {// odd number of cells
                        pos_meshFloor.x = Math.round(meshInt0.point.x / floor_width) * floor_width;
                        pos_meshFloor.y = Math.round(meshInt0.point.y / floor_width) * floor_width;
                    } else { // even number of cells
                        pos_meshFloor.x = Math.round((floor_width_half + meshInt0.point.x) / floor_width) * floor_width - floor_width_half;
                        pos_meshFloor.y = Math.round((meshInt0.point.y + floor_width_half) / floor_width) * floor_width - floor_width_half;
                    }
                    pos_meshFloor.z = floor_thickness/2 ; // move meshFloor up to align it with grid
                    meshFloorTrans.position.set(pos_meshFloor.x, pos_meshFloor.y, pos_meshFloor.z);
                    meshFloorDel.visible = false;
                    meshFloorTrans.visible = true;
                }
            }    

        } else { // if do not intersect with anything, show nothing
            meshFloorTrans.visible = false;
            meshFloorDel.visible = false;
            pos_meshFloor = null;
        }
   }

    // __________________________
    //    	　_ * CEILING *
    // ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾

    const list_meshCeiling = Object.values(dictCeiling)
    if (checkboxCeiling.checked == true){
        list_meshCeiling.forEach(function(meshCeiling){
            meshCeiling.visible = true;
        });
    } else {
        list_meshCeiling.forEach(function(meshCeiling){
            meshCeiling.visible = false;
        });
    }

    if ( id_buttonPressed == 'buttonCeiling' ) {
        raycaster.setFromCamera( mouse, camera ); // create a ray from the camera and intersect it with objects in the scene
        const list_meshScene = Object.values(dictCeiling); // get the meshes in the scene to check for intersections
        list_meshScene.push(meshFloorZone);
        const list_meshInt = raycaster.intersectObjects( list_meshScene ); // returns an array of cursor-intersected items, e.g. (3) [{…}, {…}, {…}] 
        const meshInt0 = list_meshInt[ 0 ]; // get the first mesh that the cursor intersects e.g. {distance: 29.318, point: Vector3, object: Mesh, face: Face3, faceIndex: 5}

        if ( list_meshInt.length > 0 ) { // if intersect with any meshes

            if (meshInt0.object.name == 'ceiling') { //if the first mesh that the cursor intersects has the name " "

                const cen_meshInt0 = meshInt0.object.position; // centre of the first mesh that the cursor intersects, e.g. Vector3 {x: -1.5, y: 3, z: 0.25}
                pos_meshCeiling = new THREE.Vector3(cen_meshInt0.x, cen_meshInt0.y, cen_meshInt0.z); // update global variable _pos, e.g. Vector3 {x: -1.5, y: 3, z: 0.25}
                
                if (!bool_delCeiling) { // if shift button is not pressed, show nothing
                    meshCeilingTrans.visible = false;
                    meshCeilingDel.visible = false;
                    pos_meshCeiling = null;
                }

                else { // if shift button is pressed, show geom_trans_del
                    meshCeilingDel.position.set(pos_meshCeiling.x, pos_meshCeiling.y, pos_meshCeiling.z);
                    meshCeilingDel.visible = true;
                    meshCeilingTrans.visible = false;
                } 

            } else { // if the first mesh that the cursor intersects does not has the name " ", i.e. intersect with ground
                
                if (!bool_delCeiling) { // if shift button is not pressed, update pos and show geom_trans 
                    pos_meshCeiling = new THREE.Vector3();
                    if (num_cells % 2 == 1) {// odd number of cells
                        pos_meshCeiling.x = Math.round(meshInt0.point.x / ceiling_width) * ceiling_width;
                        pos_meshCeiling.y = Math.round(meshInt0.point.y / ceiling_width) * ceiling_width;
                    } else { // even number of cells
                        pos_meshCeiling.x = Math.round((ceiling_width_half + meshInt0.point.x) / ceiling_width) * ceiling_width - ceiling_width_half;
                        pos_meshCeiling.y = Math.round((meshInt0.point.y + ceiling_width_half) / ceiling_width) * ceiling_width  - ceiling_width_half;
                    }
                    pos_meshCeiling.z = BdyWall_height - ceiling_thickness/2 - overlapOffset ; // move meshCeiling up to align it with grid
                    meshCeilingTrans.position.set(pos_meshCeiling.x, pos_meshCeiling.y, pos_meshCeiling.z);
                    meshCeilingDel.visible = false;
                    meshCeilingTrans.visible = true;
                }
            }    

        } else { // if do not intersect with anything, show nothing
            meshCeilingTrans.visible = false;
            meshCeilingDel.visible = false;
            pos_meshCeiling = null;
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

    // __________________________
    //    	　_ * PARTITION WALL * ★
    // ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
    if ( id_buttonPressed == 'buttonPartitionWall' ) {
        raycaster.setFromCamera( mouse, camera );
        const list_meshScene = getMeshInScene(); // get the mesh in the scene to check for intersections
        list_meshScene.push(meshFloorZone);
        const list_meshInt = raycaster.intersectObjects( list_meshScene ); // returns an array of intersected items, e.g. (3) [{…}, {…}, {…}] 
        const meshInt0 = list_meshInt[ 0 ]; // get the first mesh that the cursor intersects e.g. {distance: 29.318, point: Vector3, object: Mesh, face: Face3, faceIndex: 5}

        if ( list_meshInt.length > 0 ) { // if intersect with any meshes

            if (meshInt0.object.name == 'PartitionWall') { // if the first mesh that the cursor intersects has the name ' '

                if (!bool_delPartWall) { // if shift button is not pressed, update trans pos and show geom_trans 
                    // orientVertMeshToFaceOfIntMesh( meshInt0, pos_meshPartWall, meshPartWallTrans, meshPartWallDel );
                }
                else { // if shift button is pressed, show geom_trans_del
                    delHoverDisp_PartWall( meshInt0.object );
                } 
            } 
          
            else if (meshInt0.object.name == "floor") { // if the first mesh that the cursor intersects does not have name, i.e. intersect with ground
                
                if (!bool_delPartWall) { // if shift button is not pressed, update pos and show geom_trans
                    addHoverDisp_PartWall_toIntFloor(meshInt0); // check distance from boundary and presense of boundary and non-boundary mesh
                } 
                else { // if shift button is pressed, do nothing
                }
            }

        } else { // if do not intersect with anything, show nothing
            meshPartWallTrans.visible = false;
            meshPartWallDel.visible = false;
            pos_meshPartWall = null;
        }
        
    }	
    
    // __________________________
    //    	　_ * WINDOW01 * ★
    // ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
    if ( id_buttonPressed == 'buttonWindow01' ) {
        raycaster.setFromCamera( mouse, camera );
        const list_meshScene = getMeshInScene(); // get the mesh in the scene to check for intersections
        list_meshScene.push(meshFloorZone);
        const list_meshInt = raycaster.intersectObjects( list_meshScene ); // returns an array of intersected items, e.g. (3) [{…}, {…}, {…}] 
        const meshInt0 = list_meshInt[ 0 ]; // get the first mesh that the cursor intersects e.g. {distance: 29.318, point: Vector3, object: Mesh, face: Face3, faceIndex: 5}
        console.log(meshInt0.object.key)
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
        list_meshScene.push(meshFloorZone);
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

            else if (meshInt0.object.name == 'PartitionWall') { // if the first mesh that the cursor intersects has the name ' '
                if (!bool_delWindow01) { // if shift button is not pressed, update global variable of geom & geom_trans
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
        list_meshScene.push(meshFloorZone);
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

            else if (meshInt0.object.name == 'PartitionWall') { // if the first mesh that the cursor intersects has the name ' '
                if (!bool_delWindow01) { // if shift button is not pressed, update global variable of geom & geom_trans
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
        list_meshScene.push(meshFloorZone);
        const list_meshInt = raycaster.intersectObjects( list_meshScene );
        const meshInt0 = list_meshInt[ 0 ];
        
        reinstate_mods('Window01', 'Window02', 'Door01', 'Door02', 'Door03', 'Railing01', 'Stairs01'); // if do not intersect with anything, show nothing

        if ( list_meshInt.length > 0 ) {  // if intersect with any meshes
            console.log(meshInt0.object.parent.name)
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

            else if (meshInt0.object.name == 'PartitionWall') { // if the first mesh that the cursor intersects has the name ' '
                if (!bool_delWindow01) { // if shift button is not pressed, update global variable of geom & geom_trans
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
        list_meshScene.push(meshFloorZone);
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

            else if (meshInt0.object.name == 'PartitionWall') { // if the first mesh that the cursor intersects has the name ' '
                if (!bool_delWindow01) { // if shift button is not pressed, update global variable of geom & geom_trans
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
        list_meshScene.push(meshFloorZone);
        const list_meshInt = raycaster.intersectObjects( list_meshScene );
        const meshInt0 = list_meshInt[ 0 ];
        
        reinstate_mods('Window01', 'Window02', 'Door01', 'Door02', 'Door03', 'Railing01', 'Stairs01'); // if do not intersect with anything, show nothing
        
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

            else if (meshInt0.object.name == 'PartitionWall') { // if the first mesh that the cursor intersects has the name ' '
                if (!bool_delWindow01) { // if shift button is not pressed, update global variable of geom & geom_trans
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

    // __________________________
    //    	　_ * STAIRS01 * ★
    // ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
    if ( id_buttonPressed == 'buttonStairs01' ) {
        raycaster.setFromCamera( mouse, camera );
        const list_meshScene = getMeshInScene(); // get the mesh in the scene to check for intersections
        list_meshScene.push(meshFloorZone);
        const list_meshInt = raycaster.intersectObjects( list_meshScene );
        const meshInt0 = list_meshInt[ 0 ];
        
        reinstate_mods('Window01', 'Window02', 'Door01', 'Door02', 'Door03', 'Railing01', 'Stairs01'); // if do not intersect with anything, show nothing

        if ( list_meshInt.length > 0 ) {  // if intersect with any meshes

            if (meshInt0.object.parent.name == 'Stairs01') { // if the first mesh that the cursor intersects has the name ' '
                const grpInt = meshInt0.object.parent.parent; // Group { .., name: 'Window01', ..}
                if (!bool_delStairs01) { 
                    // if shift button is not pressed, do nothing
                }
                else { // if shift button is pressed, show geom_trans_del
                    delHoverDisp_Stairs01( grpInt );
                }
            } 
            
            else if (meshInt0.object.name == 'BoundaryWall' ) { // if the first mesh that the cursor intersects has the name ' '
                if (!bool_delStairs01) { // if shift button is not pressed, update global variable of geom & geom_trans
                    replaceHoverDisp_Stairs01( meshInt0.object );
                }
            }

            else if (meshInt0.object.name == 'PartitionWall') { // if the first mesh that the cursor intersects has the name ' '
                if (!bool_delWindow01) { // if shift button is not pressed, update global variable of geom & geom_trans
                    replaceHoverDisp_Stairs01( meshInt0.object );
                }
            }

            else if (meshInt0.object.parent.name == 'Window01') { 
                const grpInt = meshInt0.object.parent.parent; // centre of the first mesh that the cursor intersects, e.g. Vector3 {x: -1.5, y: 3, z: 0.25}
                if (!bool_delStairs01) { // if shift button is not pressed, update global variable of geom & geom_trans
                    replaceHoverDisp_Stairs01( grpInt );
                }
                else { // if shift button is pressed, show geom_trans_del
                    delHoverDisp_Window01( grpInt );
                }
            }

            else if (meshInt0.object.parent.name == 'Window02') { 
                const grpInt = meshInt0.object.parent.parent; // centre of the first mesh that the cursor intersects, e.g. Vector3 {x: -1.5, y: 3, z: 0.25}
                if (!bool_delStairs01) { // if shift button is not pressed, update global variable of geom & geom_trans
                    replaceHoverDisp_Stairs01( grpInt );
                }
                else { // if shift button is pressed, show geom_trans_del
                    delHoverDisp_Window02( grpInt );
                }
            }

            else if (meshInt0.object.parent.name == 'Door01') { 
                const grpInt = meshInt0.object.parent.parent; // centre of the first mesh that the cursor intersects, e.g. Vector3 {x: -1.5, y: 3, z: 0.25}
                if (!bool_delStairs01) { // if shift button is not pressed, update global variable of geom & geom_trans
                    replaceHoverDisp_Stairs01( grpInt );
                }
                else { // if shift button is pressed, show geom_trans_del
                    delHoverDisp_Door01( grpInt );
                }
            }	

            else if (meshInt0.object.parent.name == 'Door02') { 
                const grpInt = meshInt0.object.parent.parent; // centre of the first mesh that the cursor intersects, e.g. Vector3 {x: -1.5, y: 3, z: 0.25}
                if (!bool_delStairs01) { // if shift button is not pressed, update global variable of geom & geom_trans
                    replaceHoverDisp_Stairs01( grpInt );
                }
                else { // if shift button is pressed, show geom_trans_del
                    delHoverDisp_Door02( grpInt );
                }
            }	

            else if (meshInt0.object.parent.name == 'Door03') { 
                const grpInt = meshInt0.object.parent.parent; // centre of the first mesh that the cursor intersects, e.g. Vector3 {x: -1.5, y: 3, z: 0.25}
                if (!bool_delStairs01) { // if shift button is not pressed, update global variable of geom & geom_trans
                    replaceHoverDisp_Stairs01( grpInt );
                }
                else { // if shift button is pressed, show geom_trans_del
                    delHoverDisp_Door03( grpInt );
                }
            }	

            else if (meshInt0.object.parent.name == 'Railing01') { 
                const grpInt = meshInt0.object.parent.parent; // centre of the first mesh that the cursor intersects, e.g. Vector3 {x: -1.5, y: 3, z: 0.25}
                if (!bool_delStairs01) { // if shift button is not pressed, update global variable of geom & geom_trans
                    replaceHoverDisp_Stairs01( grpInt );
                }
                else { // if shift button is pressed, show geom_trans_del
                    delHoverDisp_Railing01( grpInt );
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
    else if (pos_meshVolume != null) { //If not dragging and raycaster.intersectObjects.object.values(dictVolume).position != null, e.g. Vector3 {x: 1.5, y: 3, z: 0}
        const key = keyGen(pos_meshVolume);
        if (bool_delVolume && key in dictVolume) { // if shift is pressed and existing key is True, delete volume
            deleteVolume(dictVolume[key]); // e.g. (2) [Mesh, Mesh]
        } else if (!bool_delVolume && dictVolume[key]==undefined) { //if shift is not pressed and there is no exisitng key, add a new volume to the scene and add its key to dictVolume {}
            addVolume(key); 
        }
    }
    
    // __________________________
    //    	　_ * FLOOR *
    // ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
    else if (pos_meshFloor != null) { //If not dragging and raycaster.intersectObjects.object.values(dictFloor).position != null, e.g. Vector3 {x: 1.5, y: 3, z: 0}
        const key = keyGen(pos_meshFloor);
        if (bool_delFloor && key in dictFloor) { // if shift is pressed and existing key is True, delete meshFloor, meshEnclosure and meshInterior
            deleteFloor(dictFloor[key]); 
            deleteMeshEnclosure(pos_meshFloor);
            deleteInteriorMesh(pos_meshFloor);
            genCeilingEnclosure(pos_meshFloor);
        } else if (!bool_delFloor && dictFloor[key]==undefined) { //if shift is not pressed and there is no exisitng key, add a new meshFloor to the scene and add its key to dictFloor {}
            addFloor(key); 
            genBdyWallEnclosure(pos_meshFloor);
            genCeilingEnclosure(pos_meshFloor);
        }
    }
   
    // __________________________
    //    	　_ * CEILING *
    // ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
    else if (pos_meshCeiling != null) { //If not dragging and raycaster.intersectObjects.object.values(dictCeiling).position != null, e.g. Vector3 {x: 1.5, y: 3, z: 0}
        const key = keyGen(pos_meshCeiling);
        if (bool_delCeiling && key in dictCeiling) { // if shift is pressed and existing key is True, delete meshCeiling
            deleteCeiling(dictCeiling[key]); 
        } else if (!bool_delCeiling && dictCeiling[key]==undefined) { //if shift is not pressed and there is no exisitng key, add a new meshCeiling to the scene and add its key to dictCeiling {}
            addCeiling(key); 
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

    // __________________________
    //    	　_ * PARTITION WALL * 
    // ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
    else if (pos_meshPartWall != null) {
        const key = keyGen(pos_meshPartWall);
        if (bool_delPartWall && key in dictPartWall) { // if shift is pressed and existing key is True, delete mesh
            deletePartWall(dictPartWall[key]); 
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
    else if (pos_grpStairs01 != null) {
        MouseUpDisplay_onHybridMod('Stairs01', pos_grpStairs01, bool_delStairs01, dictStairs01, deleteStairs01, addStairs01);
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
        // scene.add( meshVolume );

    const meshVolumeBase = new THREE.Mesh( geomVolumeBase, matVolume ) ;
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
    const list_CoordOfCorner = getCoordsOfBaseCorners( pos_meshVolume, volume_width,  offsetHeight_AttrLine_fromVolPos);
    list_CoordOfCorner.forEach( updatePoints );
    addAttrLine_purchasedVolBdy(list_CoordOfCorner);

    // UPDATE FLOOR ZONE MESH
    const list_meshVolumeBase = getValueList(dictVolume, 1)
    if ( meshFloorZone != undefined ) {
        scene.remove( meshFloorZone )   
    } 
    meshFloorZone = mergeMeshes(list_meshVolumeBase, matVolume, meshFloorZone, "Floor_Zone");
};

function deleteVolume( values ) {

    scene.remove( values[0], values[1] ); // value[0] is e.g. Mesh {..}
    delete dictVolume[ values[0].volume_key ];
    document.getElementById('buttonVolume').innerHTML = "Volume: " + cnt_meshVolume;
    cnt_meshVolume -= 1; 

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
    const meshFloor = new THREE.Mesh(geomFloor, particleboard);
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

    addAttrLinesOnFloor();
};

function deleteFloor(meshFloor) {
    scene.remove( meshFloor );
    delete dictFloor[ meshFloor.floor_key ];
    cnt_meshFloor -= 1; 
    document.getElementById('buttonFloor').innerHTML = "Floor: " + cnt_meshFloor;
    delAttrLinesOnFloor();
};

function genBdyWallEnclosure( pos_meshFloor ) {
    const list_CoordOfCorner = getCoordsOfBaseCorners( pos_meshFloor, floor_width, offsetHeight_posVerMod_fromFloorPos );//frontleft, frontright, backright, backleft
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

function deleteMeshEnclosure(pos_meshFloor) { // overwrite any existing hybrid module
    const list_CoordOfCorner = getCoordsOfBaseCorners( pos_meshFloor, floor_width, BdyWall_height_half-floor_thickness_half );//frontleft, frontright, backright, backleft
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

            if ( bool_keyExistance ) { // if mesh exists, delete mesh
                ifMatchKey_deleteMesh(key_mesh, 'BoundaryWall', 'Window01', 'Window02', 'Door01', 'Door02', 'Door03', 'Railing01', 'Stairs01'); 
            } else {
                if (bool_keyExistance_partMesh) { // if partition mesh exist, delete
                    ifMatchKey_deleteMesh(key_partMesh, 'PartitionWall', 'Window01', 'Window02', 'Door01', 'Door02', 'Door03', 'Railing01', 'Stairs01'); 
                }
                addBdyWall(key_adjacent_mesh, pos_adjacent_mesh, angle_adjmesh);
            }
            
            // list_pt.push( pt );
        }

    }
}

function genCeilingEnclosure(pos_meshFloor) {
    pos_meshCeiling = new THREE.Vector3(pos_meshFloor.x, pos_meshFloor.y, pos_meshFloor.z - floor_thickness/2 + BdyWall_height - ceiling_thickness/2 - overlapOffset); // update global variable _pos, e.g. Vector3 {x: -1.5, y: 3, z: 0.25}
    const ceiling_key = keyGen(pos_meshCeiling);

    if ( dictCeiling [ceiling_key] == undefined ) {
        addCeiling(ceiling_key);
    } else {
        deleteCeiling(dictCeiling [ ceiling_key ]);
    }

    pos_meshCeiling = null
}

function deleteInteriorMesh(pos_meshFloor) {
    
};

// __________________________
//    	　_ * CEILING * 
// ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾

function addCeiling(key) {

    // ADD MESH
    const meshCeiling = new THREE.Mesh(geomCeiling, matCeilingTrans);
    meshCeiling.position.set(pos_meshCeiling.x, pos_meshCeiling.y, pos_meshCeiling.z);
    scene.add( meshCeiling );

    // ADD MESH PROPERTIES
    meshCeiling.name = "ceiling"
    meshCeiling.ceiling_key = key;

    // UPDATE GLOBAL VARIABLES, HTML
    dictCeiling[key] = meshCeiling;
    cnt_meshCeiling += 1; 
    // document.getElementById('buttonCeiling').innerHTML = "Ceiling: " + cnt_meshCeiling;
    
};


function deleteCeiling(meshCeiling) {
    scene.remove( meshCeiling );
    delete dictCeiling[ meshCeiling.ceiling_key ];
    cnt_meshCeiling -= 1; 
    // document.getElementById('buttonCeiling').innerHTML = "Ceiling: " + cnt_meshCeiling;
};



// __________________________
//    	　_ * BOUNDARY WALL * 
// ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾

function addBdyWall(key, pos, angle) {
    
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
    meshBdyWall.name = "BoundaryWall"
    meshBdyWall.key = key;

    // UPDATE GLOBAL VARIABLES, HTML
    dictBdyWall[key] = meshBdyWall;
    meshBdyWall.rotation.z = angle;
    cnt_meshBdyWall += 1; 
    document.getElementById('buttonBoundaryWall').innerHTML = "Boundary Wall (ignore): " + cnt_meshBdyWall;
    meshBdyWall.matrixAutoUpdate = false;
    meshBdyWall.updateMatrix();
    
    const pos_AttrLine = getPos_AttrLine_atBdy (pos, angle);
    const endPoints = getpos_EndPtsOfAttrLine (pos_AttrLine, angle, BdyWall_width_half);
    addAttr_boundary (pos_AttrLine, endPoints[0],  endPoints[1]);
     
};

// Delete a BdyWall
function deleteBdyWall(meshBdyWall) {
    const pos_AttrLine = getPos_AttrLine_atBdy (meshBdyWall.position, meshBdyWall.rotation.z);
    // dispDotsfromCoords(matAttrDot_Large,[pos_AttrLine])
    // console.log('del', pos_AttrLine)
    // console.log('angle', meshBdyWall.angle)


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
    const meshPartWall = new THREE.Mesh( geomPartWall, obs );

    // const meshPartWall = new THREE.Mesh( geomPartWall, obsLight );
    meshPartWall.position.set(pos.x, pos.y, pos.z);
    scene.add( meshPartWall );


    // ADD MESH PROPERTIES
    meshPartWall.name = "PartitionWall"
    meshPartWall.PartWall_key = key;

    // UPDATE GLOBAL VARIABLES, HTML
    dictPartWall[key] = meshPartWall;
    meshPartWall.rotation.z = angle;
    cnt_meshPartWall += 1; 
    document.getElementById('buttonPartitionWall').innerHTML = "Partition Wall: " + cnt_meshPartWall;
    meshPartWall.matrixAutoUpdate = false;
    meshPartWall.updateMatrix();
    
};

// Delete a PartWall
function deletePartWall(meshPartWall) {
    scene.remove( meshPartWall );
    delete dictPartWall[ meshPartWall.PartWall_key ];
    cnt_meshPartWall -= 1; 
    document.getElementById('buttonPartitionWall').innerHTML = "Partition Wall: " + cnt_meshPartWall;
};

// __________________________
//    	　_ * WINDOW01 * 
// ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾

function addWindow01(key) {

    // ADD MESH
    const Window01 = meshWindow01.clone();
    Window01.position.set(pos_grpWindow01.x, pos_grpWindow01.y, pos_grpWindow01.z);
    scene.add( Window01 );

    // ADD MESH PROPERTIES
    Window01.name = "Window01"
    Window01.Window01_key = key;

    // UPDATE GLOBAL VARIABLES, HTML
    dictWindow01[key] = Window01;
    Window01.rotation.z = angle_grpWindow01;
    cnt_grpWindow01 += 1; 
    document.getElementById('buttonWindow01').innerHTML = "Fixed Window: " + cnt_grpWindow01;
};

// Delete a Window01
function deleteWindow01(Window01) {
    scene.remove( Window01 );
    delete dictWindow01[ Window01.Window01_key ];
    cnt_grpWindow01 -= 1; 
    document.getElementById('buttonWindow01').innerHTML = "Fixed Window: " + cnt_grpWindow01;
};


// __________________________
//    	　_ * WINDOW02 * 
// ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾

function addWindow02(key) {

    // ADD MESH
    const Window02 = grpWindow02.clone();
    Window02.position.set(pos_grpWindow02.x, pos_grpWindow02.y, pos_grpWindow02.z);
    scene.add( Window02 );
    
    // ADD MESH PROPERTIES
    Window02.name = "Window02"
    Window02.Window02_key = key;

    // UPDATE GLOBAL VARIABLES, HTML
    dictWindow02[key] = Window02;
    Window02.rotation.z = angle_grpWindow02;
    cnt_grpWindow02 += 1; 
    document.getElementById('buttonWindow02').innerHTML = "Sliding Window: " + cnt_grpWindow02;
};

// Delete a Window02
function deleteWindow02(Window02) {
    scene.remove( Window02 );
    delete dictWindow02[ Window02.Window02_key ];
    cnt_grpWindow02 -= 1; 
    document.getElementById('buttonWindow02').innerHTML = "Sliding Window: " + cnt_grpWindow02;
};


// __________________________
//    	　_ * DOOR01 * 
// ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾

function addDoor01(key) {

    // ADD MESH
    const Door01 = meshDoor01.clone();
    Door01.position.set(pos_grpDoor01.x, pos_grpDoor01.y, pos_grpDoor01.z);
    scene.add( Door01 );
    
    // ADD MESH PROPERTIES
    Door01.name = "Door01"
    Door01.Door01_key = key;

    // UPDATE GLOBAL VARIABLES, HTML
    dictDoor01[key] = Door01;
    Door01.rotation.z = angle_grpDoor01;
    cnt_grpDoor01 += 1; 
    document.getElementById('buttonDoor01').innerHTML = "Timber Door: " + cnt_grpDoor01;
};

// Delete a Door01
function deleteDoor01(Door01) {
    scene.remove( Door01 );
    delete dictDoor01[ Door01.Door01_key ];
    cnt_grpDoor01 -= 1; 
    document.getElementById('buttonDoor01').innerHTML = "Timber Door: " + cnt_grpDoor01;
};


// __________________________
//    	　_ * DOOR02 * 
// ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾

function addDoor02(key) {

    // ADD MESH
    const Door02 = meshDoor02.clone();
    Door02.position.set(pos_grpDoor02.x, pos_grpDoor02.y, pos_grpDoor02.z);
    scene.add( Door02 );
    
    // ADD MESH PROPERTIES
    Door02.name = "Door02"
    Door02.Door02_key = key;

    // UPDATE GLOBAL VARIABLES, HTML
    dictDoor02[key] = Door02;
    Door02.rotation.z = angle_grpDoor02;
    cnt_grpDoor02 += 1; 
    document.getElementById('buttonDoor02').innerHTML = "Glass Door: " + cnt_grpDoor02;
};

// Delete a Door02
function deleteDoor02(Door02) {
    scene.remove( Door02 );
    delete dictDoor02[ Door02.Door02_key ];
    cnt_grpDoor02 -= 1; 
    document.getElementById('buttonDoor02').innerHTML = "Glass Door: " + cnt_grpDoor02;
};


// __________________________
//    	　_ * DOOR03 * 
// ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾

function addDoor03(key) {

    // ADD MESH
    const Door03 = meshDoor03.clone();
    Door03.position.set(pos_grpDoor03.x, pos_grpDoor03.y, pos_grpDoor03.z);
    scene.add( Door03 );
    
    // ADD MESH PROPERTIES
    Door03.name = "Door03"
    Door03.Door03_key = key;

    // UPDATE GLOBAL VARIABLES, HTML
    dictDoor03[key] = Door03;
    Door03.rotation.z = angle_grpDoor03;
    cnt_grpDoor03 += 1; 
    document.getElementById('buttonDoor03').innerHTML = "Sliding Glass Door: " + cnt_grpDoor03;
};

// Delete a Door03
function deleteDoor03(Door03) {
    scene.remove( Door03 );
    delete dictDoor03[ Door03.Door03_key ];
    cnt_grpDoor03 -= 1; 
    document.getElementById('buttonDoor03').innerHTML = "Sliding Glass Door: " + cnt_grpDoor03;
};


// __________________________
//    	　_ * RAILING01 * 
// ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾

function addRailing01(key) {

    // ADD MESH
    const Railing01 = meshRailing01.clone();
    Railing01.position.set(pos_grpRailing01.x, pos_grpRailing01.y, pos_grpRailing01.z);
    scene.add( Railing01 );
    
    // ADD MESH PROPERTIES
    Railing01.name = "Railing01"
    Railing01.Railing01_key = key;

    // UPDATE GLOBAL VARIABLES, HTML
    dictRailing01[key] = Railing01;
    Railing01.rotation.z = angle_grpRailing01;
    cnt_grpRailing01 += 1; 
    document.getElementById('buttonRailing01').innerHTML = "Railing: " + cnt_grpRailing01;
};

// Delete a Railing01
function deleteRailing01(Railing01) {
    scene.remove( Railing01 );
    delete dictRailing01[ Railing01.Railing01_key ];
    cnt_grpRailing01 -= 1; 
    document.getElementById('buttonRailing01').innerHTML = "Railing: " + cnt_grpRailing01;
};

// __________________________
//    	　_ * STAIRS01 * 
// ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾

function addStairs01(key) {

    // ADD MESH
    const Stairs01 = meshStairs01.clone();

    Stairs01.position.set(pos_grpStairs01.x, pos_grpStairs01.y, pos_grpStairs01.z);
    scene.add( Stairs01 );
    
    // ADD MESH PROPERTIES
    Stairs01.name = "Stairs01"
    Stairs01.Stairs01_key = key;

    // UPDATE GLOBAL VARIABLES, HTML
    dictStairs01[key] = Stairs01;
    Stairs01.rotation.z = angle_grpStairs01;
    Stairs01.scale.multiply(scale_grpStairs01);
    cnt_grpStairs01 += 1; 
    document.getElementById('buttonStairs01').innerHTML = "Stairs: " + cnt_grpStairs01;
};

// Delete a Stairs01
function deleteStairs01(Stairs01) {
    scene.remove( Stairs01 );
    delete dictStairs01[ Stairs01.Stairs01_key ];
    cnt_grpStairs01 -= 1; 
    document.getElementById('buttonStairs01').innerHTML = "Stairs: " + cnt_grpStairs01;
};


//////////////////// -------------HELPER FUNCTIONS------------------------------------------------------ //////////////////// 

// ====================================================
// { Raycaster } 
// ====================================================

// --------------------------------
//    Get Meshes In Scene ★
// --------------------------------

function getMeshInScene() {
    
    var list_meshScene = []; // get the mesh in the scene to check for intersections
    
    // console.log('~~~Object.values(dictBdyWall)~~~', Object.values(dictBdyWall)) // e.g. (2) [Mesh, Mesh] (i.e. 2 BdyWalls in the scene)
    list_meshScene = list_meshScene.concat(Object.values(dictBdyWall));
    list_meshScene = list_meshScene.concat(Object.values(dictPartWall));
    list_meshScene = list_meshScene.concat(Object.values(dictFloor));
    list_meshScene = list_meshScene.concat(Object.values(dictAttrLine)); // (4) [Group, Group, Group, Group]

    // console.log('~~~Object.values(dictWindow01)~~~', Object.values(dictWindow01)) // e.g. (3) [Group, Group, Group] (i.e. 3 windows in the scene)
    Object.values(dictWindow01).forEach(i => { // for each group in the scene
        // console.log('~~~i~~~', i)  // e.g. Group {.., children: [Object3D], ..}
        // console.log('~~~i.children~~~', i.children) // e.g. [Object3D] {0: Object3D, [[Prototype]]: Array(0)}
        // console.log('~~~i.children[0]~~~', i.children[0]) // e.g. Object3D {..}
        // console.log('~~~i.children[0].children~~~', i.children[0].children) // e.g. (4) [Mesh, Mesh, Mesh, Mesh]
        list_meshScene = list_meshScene.concat(i.children[0].children) // concat the its meshes into the list 
    })

    Object.values(dictWindow02).forEach(i => {
        list_meshScene = list_meshScene.concat(i.children[0].children)
    })
    
    // console.log('~~~Object.values(dictDoor01)~~~', Object.values(dictDoor01)) // e.g. (2) [Group, Group] (i.e. 2 doors in the scene)
    Object.values(dictDoor01).forEach(i => {
        list_meshScene = list_meshScene.concat(i.children[0].children)
    })
    // console.log('~~~Object.values(dictDoor02)~~~', Object.values(dictDoor02)) // e.g. (2) [Group, Group] (i.e. 2 doors in the scene)
    Object.values(dictDoor02).forEach(i => {
        list_meshScene = list_meshScene.concat(i.children[0].children)
    })

    Object.values(dictDoor03).forEach(i => {
        list_meshScene = list_meshScene.concat(i.children[0].children)
    })

    Object.values(dictRailing01).forEach(i => {
        list_meshScene = list_meshScene.concat(i.children[0].children)
    })
    
    Object.values(dictStairs01).forEach(i => {
        list_meshScene = list_meshScene.concat(i.children[0].children)
    })




    // console.log('~~~sceneMeshesAll~~~', list_meshScene) // e.g. (12) [Mesh, Mesh, Mesh, Mesh, Mesh, Mesh, Mesh, Mesh, Mesh, Mesh, Mesh, Mesh]
    return list_meshScene
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

function getPos_allAttrLine () {
    const list_key = Object.keys(dictAttrLine)
    const list_pos = []
    list_key.forEach( function (key) {
        const pos = posfromKey( key );
        list_pos.push( pos );
    })
    return list_pos
}

function addHoverDisp_PartWall_toIntFloor(meshInt0) { // check distance from boundary and presense of boundary mesh
    const pos_cursor = meshInt0.point;

    // CHECK CLOSEST ATTRIBUTE LINE
    const list_posAttrLine = getPos_allAttrLine ();
    const pos_closestAttrLine = getClosestPos (pos_cursor, list_posAttrLine); // CAN BE OPTIMISED
    // dispDotsfromCoords ( matDot_Large, [pos_closestDivCen] ); 
        // console.log(pos_closestAttrLine)
    
    // CHECK ATTRIBUTE LINE
    const key_AttrLine = keyGen( pos_closestAttrLine );
    const AttrLine = dictAttrLine[ key_AttrLine ];
    const adjacency = AttrLine.adjacency;
    if (adjacency == 'interior') {

        angle_meshPartWall = AttrLine.angle;
        pos_meshPartWall = pos_closestAttrLine.clone().add(offsetHeight_meshPartWall_fromAttrLine); 
        // console.log(pos_closestAttrLine)

        
        // CHECK MESH PRESENSE
        const key_partMesh = keyGen( pos_meshPartWall );
        const bool_presence_partMesh = dictPartWall[key_partMesh]
        if (bool_presence_partMesh) {
            // do nothing if partMesh exist
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

    meshDoor03Trans.position.copy(pos_grpDoor03);
    meshDoor03Trans.rotation.z = angle_grpDoor03
    meshDoor03Trans.visible = true;
    meshDoor03Del.visible = false;
}

function replaceHoverDisp_Railing01( mesh ) { // copy pos, angle, show meshTrans
    pos_grpRailing01 = new THREE.Vector3(mesh.position.x, mesh.position.y, mesh.position.z);
    angle_grpRailing01 = mesh.rotation.z;

    meshRailing01Trans.position.copy(pos_grpRailing01);
    meshRailing01Trans.rotation.z = angle_grpRailing01
    meshRailing01Trans.visible = true;
    meshRailing01Del.visible = false;
}

function replaceHoverDisp_Stairs01( mesh ) { // copy pos, angle, show meshTrans
    pos_grpStairs01 = new THREE.Vector3(mesh.position.x, mesh.position.y, mesh.position.z);
    angle_grpStairs01 = mesh.rotation.z;

    meshStairs01Trans.position.copy(pos_grpStairs01);
    meshStairs01Trans.rotation.z = angle_grpStairs01
    meshStairs01Trans.visible = true;
    meshStairs01Del.visible = false;
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

    meshStairs01Del.position.copy(pos_grpStairs01);
    meshStairs01Del.rotation.z = angle_grpStairs01;
    meshStairs01Del.visible = true;
    meshStairs01Trans.visible = false;
}

// --------------------------------
//    Reinstate Visibility ★ 
// --------------------------------

function reinstate_mods() { //  no display of trans or del mesh, clear position
    // reinstate_mods('Window01', 'Window02', 'Door01', 'Door02', 'Door03', 'Railing01', 'Stairs01');
    const args = Array.from(arguments) // arguments is an Array-like object, it doesn't have Array's built-in methods
    // if (args.includes('Window01')) {
    //     reinstate_Window01()
    // }
    if (args.includes('Window01')) {
        reinstate_Window01()
    }
    if (args.includes('Window02')) {
        reinstate_Window02()
    }
    if (args.includes('Door01')) {
        reinstate_Door01()
    }
    if (args.includes('Door02')) {
        reinstate_Door02()
    }
    if (args.includes('Door03')) {
        reinstate_Door03()
    }
    if (args.includes('Railing01')) {
        reinstate_Railing01()
    }
    if (args.includes('Stairs01')) {
        reinstate_Stairs01()
    }
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
    meshStairs01Trans.visible = false;
    meshStairs01Del.visible = false;
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
//    Check Key Existance ★
// --------------------------------
const dictAll = [dictAttrLine, dictBdyWall, dictPartWall, dictWindow01, dictWindow02, dictDoor01, dictDoor02, dictDoor03, dictRailing01, dictStairs01]
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
        showHelper("Only wall modules can be placed against the boundaries along neighouring volumes.")
    } else if (AttrLine.adjacency == 'extent') {
        showHelper("Only wall modules can be placed against the boundaries along neighouring volumes.")
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
            // const attrSet = ['', 'boundary'] // replace with attr of 1 lower hierarchy
            // addAttrLineUnit (start_pt, end_pt, matAttrLine, matAttrDot, attrSet);
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
    console.log( angle_meshInt )
    const pos_grpAttrLine = getPos_AttrLine_atBdy (pos_meshInt, angle_meshInt);
    const key_grpAttrLine = keyGen( pos_grpAttrLine );
    const AttrLine = dictAttrLine[key_grpAttrLine]

    return AttrLine
}

function getPos_AttrLine_atBdy (pos_BdyWall, angle_BdyWall) { 
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

// --------------------------------
//    Add/Del AttrLine on Floor
// --------------------------------

function addAttrLinesOnFloor() {
    const list_posOfDivCen = getListofDivCen_fromFloorPos (pos_meshFloor);

    list_posOfDivCen.forEach(function(cen) {
        const list_CoordOfCorner = getCoordsOfBaseCorners( cen, PartWall_width, 0 );

        // console.log(list_posOfDivCen)
        const list = list_CoordOfCorner.slice(0)
        list.push(list[0]);
        for(var i=0; i < list.length - 1; i++){
            const pos_midpoint = calcMidptof2pt (list[i], list[i+1]);
            addAttr_interior (pos_midpoint, list[i], list[i+1]);
            // console.log( 'interior',pos_midpoint );
        } 
    
    })
    // addAttrLineUnit (starting_pt, ending_pt, matAttrLine, matAttrDot, attrSet)
}

function delAttrLinesOnFloor() {
    const list_posOfDivCen = getListofDivCen_fromFloorPos (pos_meshFloor);

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

function getListofDivCen_fromFloorPos (pos_meshFloor) {
    const cen_middle = pos_meshFloor.clone().add(offsetHeight_AttrLine_fromFloorPos);
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
    const list_CoordOfCorner = [ roundPos(base_frontleft_coord, 7), roundPos(base_frontright_coord, 7), roundPos(base_backright_coord, 7), roundPos(base_backleft_coord, 7) ]
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

//////////////////// -------------SPARE FUNCTION------------------------------------------------------ //////////////////// 






/*

// --------------------------------
//       ( - futurework - ) changeGridPos, autoGenBdyWalls 
// --------------------------------

changeGridPos(newHeight);
function changeGridPos(newHeight) {
    gridGround.position.z = newHeight;
}
document.getElementById("radiobuttonFloor").addEventListener("click", changeGridPos(0));
document.getElementById("radiobuttonBoundaryWall").addEventListener("click", changeGridPos(10));

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

function XgenBdyWallEnclosure(pos_meshFloor) { // overwrite any existing hybrid mod

    // LEFT BOUNDARY WALL
    var angle_mesh = Math.PI / 2;
    var pos_mesh = new THREE.Vector3(pos_meshFloor.x - floor_width_half + offsetValue_BdyWall, pos_meshFloor.y, pos_meshFloor.z - floor_thickness/2 + BdyWall_height_half); // update global variable _pos, e.g. Vector3 {x: -1.5, y: 3, z: 0.25}
    var key_mesh = keyGen(pos_mesh);

    var pos_adjacent_mesh = new THREE.Vector3(pos_meshFloor.x - floor_width_half - offsetValue_BdyWall, pos_meshFloor.y, pos_meshFloor.z - floor_thickness/2 + BdyWall_height_half);
    var key_adjacent_mesh = keyGen(pos_adjacent_mesh);
    var bool_keyExistance = getbool_keyExistance(key_adjacent_mesh);

    if ( bool_keyExistance ) { // if adjacent mesh exists, delete adjacent mesh
        ifMatchKey_deleteMesh(key_adjacent_mesh, 'BoundaryWall', 'Window01', 'Window02', 'Door01', 'Door02', 'Door03', 'Railing01', 'Stairs01'); 
    } else {
        addBdyWall(key_mesh, pos_mesh, angle_mesh); // if adjacent mesh does not exist, add mesh
    }


    // RIGHT BOUNDARY WALL
    var angle_mesh = - Math.PI / 2;
    var pos_mesh = new THREE.Vector3(pos_meshFloor.x + floor_width_half - offsetValue_BdyWall, pos_meshFloor.y, pos_meshFloor.z - floor_thickness/2 + BdyWall_height_half); // update global variable _pos, e.g. Vector3 {x: -1.5, y: 3, z: 0.25}
    var key_mesh = keyGen(pos_mesh);

    var pos_adjacent_mesh = new THREE.Vector3(pos_meshFloor.x + floor_width_half + offsetValue_BdyWall, pos_meshFloor.y, pos_meshFloor.z - floor_thickness/2 + BdyWall_height_half);
    var key_adjacent_mesh = keyGen(pos_adjacent_mesh);

    var bool_keyExistance = getbool_keyExistance(key_adjacent_mesh);
    if ( bool_keyExistance ) { // if adjacent mesh exists, delete adjacent mesh
        ifMatchKey_deleteMesh(key_adjacent_mesh, 'BoundaryWall', 'Window01', 'Window02', 'Door01', 'Door02', 'Door03', 'Railing01', 'Stairs01'); 
    } else {
        addBdyWall(key_mesh, pos_mesh, angle_mesh); // if adjacent mesh does not exist, add mesh
    }


    // FRONT BOUNDARY WALL
    var angle_mesh = 0;
    var pos_mesh = new THREE.Vector3(pos_meshFloor.x, pos_meshFloor.y + floor_width_half - offsetValue_BdyWall, pos_meshFloor.z - floor_thickness/2 + BdyWall_height_half); // update global variable _pos, e.g. Vector3 {x: -1.5, y: 3, z: 0.25}
    var key_mesh = keyGen(pos_mesh);

    var pos_adjacent_mesh = new THREE.Vector3(pos_meshFloor.x, pos_meshFloor.y + floor_width_half + offsetValue_BdyWall, pos_meshFloor.z - floor_thickness/2 + BdyWall_height_half);
    var key_adjacent_mesh = keyGen(pos_adjacent_mesh);

    var bool_keyExistance = getbool_keyExistance(key_adjacent_mesh);
    if ( bool_keyExistance ) { // if adjacent mesh exists, delete adjacent mesh
        ifMatchKey_deleteMesh(key_adjacent_mesh, 'BoundaryWall', 'Window01', 'Window02', 'Door01', 'Door02', 'Door03', 'Railing01', 'Stairs01'); 
    } else {
        addBdyWall(key_mesh, pos_mesh, angle_mesh); // if adjacent mesh does not exist, add mesh
    }


    // BACK BOUNDARY WALL
    var angle_mesh = - Math.PI;
    var pos_mesh = new THREE.Vector3(pos_meshFloor.x, pos_meshFloor.y - floor_width_half + offsetValue_BdyWall, pos_meshFloor.z - floor_thickness/2 + BdyWall_height_half); // update global variable _pos, e.g. Vector3 {x: -1.5, y: 3, z: 0.25}
    var key_mesh = keyGen(pos_mesh);
    
    var pos_adjacent_mesh = new THREE.Vector3(pos_meshFloor.x, pos_meshFloor.y - floor_width_half - offsetValue_BdyWall, pos_meshFloor.z - floor_thickness/2 + BdyWall_height_half);
    var key_adjacent_mesh = keyGen(pos_adjacent_mesh);

    var bool_keyExistance = getbool_keyExistance(key_adjacent_mesh);
    if ( bool_keyExistance ) { // if adjacent mesh exists, delete adjacent mesh
        ifMatchKey_deleteMesh(key_adjacent_mesh, 'BoundaryWall', 'Window01', 'Window02', 'Door01', 'Door02', 'Door03', 'Railing01', 'Stairs01'); 
    } else {
        addBdyWall(key_mesh, pos_mesh, angle_mesh); // if adjacent mesh does not exist, add mesh
    }


    // pos_meshBdyWall = null // restore to initialisation state
}

function XdeleteMeshEnclosure(pos_meshFloor) { // overwrite any existing hybrid module

    // LEFT BOUNDARY MESH
    var pos_mesh = new THREE.Vector3(pos_meshFloor.x - floor_width_half + offsetValue_BdyWall, pos_meshFloor.y, pos_meshFloor.z - floor_thickness/2 + BdyWall_height_half); // update global variable _pos, e.g. Vector3 {x: -1.5, y: 3, z: 0.25}
    var key_mesh = keyGen(pos_mesh);

    var angle_adjacent_mesh = - Math.PI / 2;
    var pos_adjacent_mesh = new THREE.Vector3(pos_meshFloor.x - floor_width_half - offsetValue_BdyWall, pos_meshFloor.y, pos_meshFloor.z - floor_thickness/2 + BdyWall_height_half);
    var key_adjacent_mesh = keyGen(pos_adjacent_mesh);
    var bool_keyExistance = getbool_keyExistance(key_mesh);

    var pos_partMesh = new THREE.Vector3(pos_meshFloor.x - floor_width_half, pos_meshFloor.y, pos_meshFloor.z - floor_thickness/2 + BdyWall_height_half);
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
    var pos_mesh = new THREE.Vector3(pos_meshFloor.x + floor_width_half - offsetValue_BdyWall, pos_meshFloor.y, pos_meshFloor.z - floor_thickness/2 + BdyWall_height_half); // update global variable _pos, e.g. Vector3 {x: -1.5, y: 3, z: 0.25}
    var key_mesh = keyGen(pos_mesh);

    var angle_adjacent_mesh = Math.PI / 2;
    var pos_adjacent_mesh = new THREE.Vector3(pos_meshFloor.x + floor_width_half + offsetValue_BdyWall, pos_meshFloor.y, pos_meshFloor.z - floor_thickness/2 + BdyWall_height_half);
    var key_adjacent_mesh = keyGen(pos_adjacent_mesh);
    var bool_keyExistance = getbool_keyExistance(key_mesh);

    var pos_partMesh = new THREE.Vector3(pos_meshFloor.x + floor_width_half, pos_meshFloor.y, pos_meshFloor.z - floor_thickness/2 + BdyWall_height_half);
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
    var pos_mesh = new THREE.Vector3(pos_meshFloor.x, pos_meshFloor.y + floor_width_half - offsetValue_BdyWall, pos_meshFloor.z - floor_thickness/2 + BdyWall_height_half); // update global variable _pos, e.g. Vector3 {x: -1.5, y: 3, z: 0.25}
    var key_mesh = keyGen(pos_mesh);

    var angle_adjacent_mesh = - Math.PI;
    var pos_adjacent_mesh = new THREE.Vector3(pos_meshFloor.x, pos_meshFloor.y + floor_width_half + offsetValue_BdyWall, pos_meshFloor.z - floor_thickness/2 + BdyWall_height_half);
    var key_adjacent_mesh = keyGen(pos_adjacent_mesh);
    var bool_keyExistance = getbool_keyExistance(key_mesh);

    var pos_partMesh = new THREE.Vector3(pos_meshFloor.x, pos_meshFloor.y + floor_width_half, pos_meshFloor.z - floor_thickness/2 + BdyWall_height_half);
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
    var pos_mesh = new THREE.Vector3(pos_meshFloor.x, pos_meshFloor.y - floor_width_half + offsetValue_BdyWall, pos_meshFloor.z - floor_thickness/2 + BdyWall_height_half); // update global variable _pos, e.g. Vector3 {x: -1.5, y: 3, z: 0.25}
    var key_mesh = keyGen(pos_mesh);

    var angle_adjacent_mesh = 0;
    var pos_adjacent_mesh = new THREE.Vector3(pos_meshFloor.x, pos_meshFloor.y - floor_width_half - offsetValue_BdyWall, pos_meshFloor.z - floor_thickness/2 + BdyWall_height_half);
    var key_adjacent_mesh = keyGen(pos_adjacent_mesh);
    var bool_keyExistance = getbool_keyExistance(key_mesh);

    var pos_partMesh = new THREE.Vector3(pos_meshFloor.x, pos_meshFloor.y - floor_width_half, pos_meshFloor.z - floor_thickness/2 + BdyWall_height_half);
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


*/
