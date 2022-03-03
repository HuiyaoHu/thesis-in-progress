///////////////// -------------IMPORT STATEMENTS----------------------------------------------------- /////////////// 
import * as THREE from 'https://unpkg.com/three@0.119.1/build/three.module.js'; 
import { OrbitControls } from 'https://unpkg.com/three@0.119.1/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'https://unpkg.com/three@0.119.1/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'https://unpkg.com/three@0.119.1/examples/jsm/loaders/DRACOLoader'
import { GLTFExporter } from 'https://unpkg.com/three@0.119.1/examples/jsm/exporters/GLTFExporter.js';
import { BufferGeometryUtils } from 'https://unpkg.com/three@0.119.1/examples/jsm/utils/BufferGeometryUtils.js';

//////////////////// -------------MAIN CODES------------------------------------------------------ /////////////////// 

// ====================================================
// Materials
// ====================================================

// https://htmlcolorcodes.com/
// https://www.w3schools.com/colors/colors_names.asp

var matGrid = new THREE.LineBasicMaterial( {color: 0x000000, linewidth: 1} );
var matText = new THREE.LineBasicMaterial( {color: 0x000000, linewidth: 1} );

var matVolume = new THREE.MeshStandardMaterial({color: 'blue', opacity: 0.1, transparent: true});
var matVolumeTrans = new THREE.MeshStandardMaterial({color: 'burlywood', opacity: 0.2, transparent: true});
var matVolumeDel = new THREE.MeshStandardMaterial({color: 'white', opacity: 0.6, transparent: true});

var matFloorTrans = new THREE.MeshStandardMaterial({color: 'burlywood', opacity: 0.2, transparent: true});
var matFloorDel = new THREE.MeshStandardMaterial({color: 'white', opacity: 0.6, transparent: true});

var matCeilingTrans = new THREE.MeshStandardMaterial({color: 0xAB9F82, opacity: 0.9, transparent: true});

var matBdyWallTrans = new THREE.MeshStandardMaterial({color: 'burlywood', opacity: 0.2, transparent: true});
var matBdyWallDel = new THREE.MeshStandardMaterial({color: 'white', opacity: 0.6, transparent: true});

var plaster = new THREE.MeshStandardMaterial({color: 0xe7e6e6});
var concrete = new THREE.MeshStandardMaterial({color: 0xb4b4b4, side: THREE.DoubleSide}) ;
var particleboard  = new THREE.MeshStandardMaterial({color: 0xddd1b4}); //0xD3C8AD, 0xAB9F82, 0xD3C8AD, 0xE5DCC7 //floor
var glass = new THREE.MeshStandardMaterial({color: 'turquoise', opacity: 0.1, transparent: true, side: THREE.DoubleSide});
var obs = new THREE.MeshStandardMaterial({color: 'burlywood', side: THREE.DoubleSide});	
var obsLight = new THREE.MeshStandardMaterial({color: 0xeccda0});
var aluminium = new THREE.MeshStandardMaterial({color: 'gainsboro'});
var rubber = new THREE.MeshStandardMaterial({color: 'black'});
var plywood = new THREE.MeshStandardMaterial({color: 0x424242}); //door
var clt = new THREE.MeshStandardMaterial({color: 'gainsboro'}); //door
var brass = new THREE.MeshStandardMaterial({color: 'gainsboro'}); //darkgoldenrod
var alloy = new THREE.MeshStandardMaterial({color: 'black'});


// ====================================================
// Geometries & Initialisation ★
// ====================================================
// '''''' dimensions, geometries, initialisation

const dracoLoader = new DRACOLoader()
dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.4.3/') // Draco library static hosting

const loader = new GLTFLoader();
loader.setDRACOLoader(dracoLoader) // https://sbcode.net/threejs/loaders-draco/

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
//    	　_ * VOLUME *
// ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾

// DIMENSIONS
var volume_width = 3.5; var volume_width_half = volume_width/2;
var volume_length = 3.5;
var volume_height = 3.5;

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

// __________________________
//    	　_ * FLOOR *
// ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾

// DIMENSIONS
var floor_width = 3.5; var floor_width_half = floor_width/2;
var floor_length = 3.5;
var floor_thickness = 0.7;

// GEOMETRIES
var geomFloor = new THREE.BoxBufferGeometry( floor_width, floor_length, floor_thickness );
var geomFloorHover = new THREE.BoxBufferGeometry( floor_width * 1, floor_length* 1, floor_thickness * 1 );
var geomFloorDel = new THREE.BoxBufferGeometry( floor_width * 1.1, floor_length* 1.1, floor_thickness * 1.1 );

// INITIALISATION 
var dictFloor = {};
var pos_meshFloor = null;
var bool_delFloor = false;
var cnt_meshFloor = 0;

// __________________________
//    	　_ * CEILING *
// ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾

// DIMENSIONS
var ceiling_width = 3.5; var ceiling_width_half = ceiling_width/2;
var ceiling_length = 3.5;
var ceiling_thickness = 0.10;
var overlapOffset = 0.001;

// GEOMETRIES
var geomCeiling = new THREE.BoxBufferGeometry( ceiling_width, ceiling_length, ceiling_thickness );
var geomCeilingHover = new THREE.BoxBufferGeometry( ceiling_width * 1, ceiling_length* 1, ceiling_thickness * 1 );
var geomCeilingDel = new THREE.BoxBufferGeometry( ceiling_width * 1.1, ceiling_length* 1.1, ceiling_thickness * 1.01 );

// INITIALISATION 
var dictCeiling = {};
var pos_meshCeiling = null;
var bool_delCeiling = false;
var cnt_meshCeiling = 0;

// __________________________
//    	　_ * BOUNDARY WALL *
// ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾

// DIMENSIONS
var BdyWall_width = 3.5; var BdyWall_width_half = BdyWall_width / 2;
var BdyWall_height = 3.5; var BdyWall_height_half = BdyWall_height / 2;
var BdyWall_thickness = 0.15;

// GEOMETRIES
var geomBdyWall = new THREE.BoxBufferGeometry( BdyWall_width, BdyWall_thickness, BdyWall_height );
var geomBdyWallHover = new THREE.BoxBufferGeometry( BdyWall_width * 1, BdyWall_thickness* 2, BdyWall_height * 1 );
var geomBdyWallDel = new THREE.BoxBufferGeometry( BdyWall_width * 1.1, BdyWall_thickness* 3, BdyWall_height * 1.1 );
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
var PartWall_width = 3.5; var PartWall_width_half = PartWall_width / 2;
var PartWall_height = 3.5; var PartWall_height_half = PartWall_height / 2;
var PartWall_thickness = 0.15;

// GEOMETRIES
var geomPartWall = new THREE.BoxBufferGeometry( PartWall_width, PartWall_thickness, PartWall_height );
var geomPartWallHover = new THREE.BoxBufferGeometry( PartWall_width * 1, PartWall_thickness* 2, PartWall_height * 1 );
var geomPartWallDel = new THREE.BoxBufferGeometry( PartWall_width * 1.1, PartWall_thickness* 3, PartWall_height * 1.1 );

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
var Window01_width = 3.5; var Window01_width_half = Window01_width / 2;
var Window01_height = 3.5; var Window01_height_half = Window01_height / 2;
var Window01_thickness = 0.5;

// GEOMETRIES
var geomWindow01Hover = new THREE.BoxBufferGeometry( Window01_width * 1, Window01_thickness* 1, Window01_height * 1 );
var geomWindow01Del = new THREE.BoxBufferGeometry( Window01_width * 1.1, Window01_thickness* 1.1, Window01_height * 1.1 );

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
var Window02_width = 3.5; var Window02_width_half = Window02_width / 2;
var Window02_height = 3.5; var Window02_height_half = Window02_height / 2;
var Window02_thickness = 0.5;

// GEOMETRIES
var  grpWindow02 = null
loader.load( // Load a glTF resource
    'models/Window02.gltf', // resource URL
    function ( gltf ) { // called when the resource is loaded
        grpWindow02 = gltf.scene;
        grpWindow02.getObjectByName("SIP").material = obs;
        grpWindow02.getObjectByName("Glass").material = glass;
        grpWindow02.getObjectByName("WindowFrame").material = aluminium;
        grpWindow02.getObjectByName("WindowCasement").material = alloy;
        grpWindow02.getObjectByName("SlidingWindowHandle").material = brass;
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
var Door01_width = 3.5; var Door01_width_half = Door01_width / 2;
var Door01_height = 3.5; var Door01_height_half = Door01_height / 2;
var Door01_thickness = 0.5;

// GEOMETRIES
var geomDoor01Hover = new THREE.BoxBufferGeometry( Door01_width * 1, Door01_thickness* 1, Door01_height * 1 );
var geomDoor01Del = new THREE.BoxBufferGeometry( Door01_width * 1.1, Door01_thickness* 1.1, Door01_height * 1.1 );

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
var Door02_width = 3.5; var Door02_width_half = Door02_width / 2;
var Door02_height = 3.5; var Door02_height_half = Door02_height / 2;
var Door02_thickness = 0.5;

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
var Door03_width = 3.5; var Door03_width_half = Door03_width / 2;
var Door03_height = 3.5; var Door03_height_half = Door03_height / 2;
var Door03_thickness = 0.5;

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
var Railing01_width = 3.5; var Railing01_width_half = Railing01_width / 2;
var Railing01_height = 3.5; var Railing01_height_half = Railing01_height / 2;
var Railing01_thickness = 0.5;

// GEOMETRIES
var geomRailing01Hover = new THREE.BoxBufferGeometry( Railing01_width * 1, Railing01_thickness* 1, Railing01_height * 1 );
var geomRailing01Del = new THREE.BoxBufferGeometry( Railing01_width * 1.1, Railing01_thickness* 1.1, Railing01_height * 1.1 );

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
var Stairs01_width = 3.5; var Stairs01_width_half = Stairs01_width / 2;
var Stairs01_height = 3.5; var Stairs01_height_half = Stairs01_height / 2;
var Stairs01_thickness = 0.5;

// GEOMETRIES
var geomStairs01Hover = new THREE.BoxBufferGeometry( Stairs01_width * 1, Stairs01_thickness* 1, Stairs01_height * 1 );
var geomStairs01Del = new THREE.BoxBufferGeometry( Stairs01_width * 1.1, Stairs01_thickness* 1.1, Stairs01_height * 1.1 );

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


// ====================================================
// Buttons ★
// ====================================================
// ''''''  ids, export

// IDS
var button_ids = ['buttonVolume', 'buttonFloor', 'buttonBoundaryWall', 'buttonPartitionWall', 'buttonWindow01', 'buttonWindow02', 'buttonDoor01', 'buttonDoor02', 'buttonRailing01', 'buttonStairs01'];
const list_meshMod = ['BoundaryWall', 'PartitionWall', 'Window01', 'Window02', 'Door01', 'Door02', 'Door03', 'Railing01', 'Stairs01'];
var id_buttonPressed = 'buttonVolume';

// EXPORT
document.getElementById('export_scene').addEventListener('click', function() {exportGLTF(scene)});

const gltfExporter = new GLTFExporter(); // https://threejs.org/docs/#examples/en/exporters/GLTFExporter
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



// ====================================================
// Miscellaneous ★
// ====================================================
// ''''''  camera, ground, mouse, global variables

var bool_delGrpHybrid = false;

// CAMERA 
var camera_zoom = 60
var camera_shift_x = 2
var camera_shift_y = -1

// RENDERER
var bool_render = false;
var bool_mouseMove = false;
var bool_mouseDown = false;
setInterval(render, 20) // larger number will be faster but jerkier 16 to 17 ms is about 60fps, 33 to 34 is about 30 fps

// GROUND
var num_cells = 4;
var ground_size = num_cells * BdyWall_width;

// MOUSE
var mouse = new THREE.Vector2();
var mouse_down = new THREE.Vector2();	 

// GLOBAL VARIABLES
    // globally accessible variables that are defined in funciton
var container, camera, scene, renderer, ground, raycaster, gridGround, controls,
    
    meshVolumeTrans, meshVolumeDel, meshFloorZone, 
    meshFloorTrans, meshFloorDel, 
    meshCeilingTrans, meshCeilingDel,
    meshBdyWallTrans, meshBdyWallDel, 
    meshPartWallTrans, meshPartWallDel, 
    meshWindow01Trans, meshWindow01Del, 
    meshWindow02Trans, meshWindow02Del,
    meshDoor01Trans, meshDoor01Del,
    meshDoor02Trans, meshDoor02Del,
    meshDoor03Trans, meshDoor03Del,
    meshRailing01Trans, meshRailing01Del,
    meshStairs01Trans, meshStairs01Del;

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

    container = document.getElementById("module");
    
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf5f9fd);
    scene.fog = new THREE.Fog( scene.background, 1, 7000 );

    camera = new THREE.PerspectiveCamera( 25, container.clientWidth / container.clientHeight, 1, 10000  ); //FOV, aspect ratio, near, far of clipping plane
        // camera = new THREE.OrthographicCamera( -window.innerWidth/camera_zoom+camera_shift_x, window.innerWidth/camera_zoom+camera_shift_x,  window.innerHeight/camera_zoom+camera_shift_y,  -window.innerHeight/camera_zoom+camera_shift_y, -10000, 10000 ) //( left, right, top, bottom, near, far )
    camera.position.set( 0, -60, 15 );
    // camera.position.set( -13, -40, 48 );
    camera.up.set( 0, 0, 1 ); //orientation of the camera. if camera. up. set(0,0,1) , it would mean that z-axis is going vertically up in the screen and x and y axes align accordingly.
    camera.lookAt(10,10,10);
    scene.add(camera)
        // var cameraHelper = new THREE.CameraHelper( camera );
        // scene.add( cameraHelper )
    

        //https://medium.com/geekculture/how-to-control-three-js-camera-like-a-pro-a8575a717a2
    
    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setPixelRatio( container.devicePixelRatio ); // Sets device pixel ratio. This is usually used for HiDPI device to prevent bluring output canvas.
    renderer.setSize( container.clientWidth, container.clientHeight ); //Resizes the output canvas to (width, height) with device pixel ratio taken into account, and also sets the viewport to fit that size, starting in (0, 0).
    renderer.shadowMap.enabled = true; // Shadow maps are textures the shadows get drawn into.
    renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap
    container.appendChild( renderer.domElement ); // add render to container


    // --------------------------------
    //    Window, Mouse
    // --------------------------------
    window.addEventListener( 'resize', onWindowResize, false );
    
    controls = new OrbitControls( camera, renderer.domElement );
    controls.target.set(0, 0, 3.5)
    controls.update();

    raycaster = new THREE.Raycaster(); // Raycasting is used for mouse picking (working out what objects in the 3d space the mouse is over) amongst other things.
    document.addEventListener('mousedown', onMouseDown, false);
    document.addEventListener('mouseup', onMouseUp, false);
    document.addEventListener( 'mousemove', onMouseMove, false );


    // --------------------------------
    //    Grid, Ground
    // --------------------------------

    // SCENE GRID
    gridGround = new THREE.GridHelper( ground_size, num_cells, 0x504F4F, 0x504F4F );
    gridGround.rotation.x = Math.PI / 2;
    gridGround.position.x = 0;
    gridGround.position.y = 0;
    gridGround.position.z = 0; // -floor_thickness/2
    // scene.add( gridGround );
        // var axesHelper = new THREE.AxesHelper( 600 );
        // scene.add( axesHelper )

    // GROUND
    var ground_geo = new THREE.PlaneBufferGeometry( ground_size, ground_size); // width, height
    var ground_mat = new THREE.MeshStandardMaterial( { color: 0xffffff } );
        // var ground_mat = new THREE.MeshStandardMaterial( { color: 'white' } )
        // var ground_mat = new THREE.MeshBasicMaterial( {color: 0x0000ffff, side: THREE.DoubleSide} );
        // ground_mat.color.setHSL( 0.095, 1, 0.75);
    ground = new THREE.Mesh( ground_geo, ground_mat );
    ground.position.set(gridGround.position.x, gridGround.position.y, 0);
    ground.visible = false;
    ground.name = "ground"
    scene.add( ground );

    // --------------------------------
    //       ( - futurework - ) changeGridPos, autoGenBdyWalls 
    // --------------------------------

    // changeGridPos(newHeight);
    // function changeGridPos(newHeight) {
    //     gridGround.position.z = newHeight;
    // }
    // document.getElementById("radiobuttonFloor").addEventListener("click", changeGridPos(0));
    // document.getElementById("radiobuttonBoundaryWall").addEventListener("click", changeGridPos(10));
    

    // --------------------------------
    //    Light, Shadow
    // --------------------------------    

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


    // --------------------------------
    //    Button Click, Hover Mesh ★
    // --------------------------------

    // __________________________
    //    	　_ * VOLUME *
    // ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
    document.getElementById("buttonVolume").addEventListener("click", onClickbuttonVolume );
     
    meshVolumeTrans = new THREE.Mesh( geomVolumeHover, matVolumeTrans );
    meshVolumeTrans.visible = false;
    scene.add(meshVolumeTrans);
    meshVolumeDel = new THREE.Mesh( geomVolumeDel, matVolumeDel );
    meshVolumeDel.visible = false;
    scene.add(meshVolumeDel);

    // __________________________
    //    	　_ * FLOOR *
    // ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
    document.getElementById("buttonFloor").addEventListener("click",  onClickbuttonFloor);

    meshFloorTrans = new THREE.Mesh( geomFloorHover, matFloorTrans );
    meshFloorTrans.visible = false;
    scene.add(meshFloorTrans);
    meshFloorDel = new THREE.Mesh( geomFloorDel, matFloorDel );
    meshFloorDel.visible = false;
    scene.add(meshFloorDel);

    // __________________________
    //    	　_ * CEILING *
    // ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
    // document.getElementById("buttonCeiling").addEventListener("click", onClickbuttonCeiling);
    
    meshCeilingTrans = new THREE.Mesh( geomCeilingHover, matFloorTrans );
    meshCeilingTrans.visible = false;
    scene.add(meshCeilingTrans);
    meshCeilingDel = new THREE.Mesh( geomCeilingDel, matFloorDel );
    meshCeilingDel.visible = false;
    scene.add(meshCeilingDel);
    
    // __________________________
    //    	　_ * BOUNDARY WALL *
    // ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
    // document.getElementById("buttonBoundaryWall").addEventListener("click", onClickbuttonBoundaryWall);

    meshBdyWallTrans = new THREE.Mesh( geomBdyWallHover, matBdyWallTrans );
        // meshBdyWallTrans.castShadow = false;
        // meshBdyWallTrans.receiveShadow = false;
    meshBdyWallTrans.visible = false;
    scene.add(meshBdyWallTrans);
    meshBdyWallDel = new THREE.Mesh( geomBdyWallDel, matBdyWallDel );
        // meshBdyWallDel.castShadow = false;
        // meshBdyWallDel.receiveShadow = false;
    meshBdyWallDel.visible = false;
    scene.add(meshBdyWallDel);

    // __________________________
    //    	　_ * PARTITION WALL *
    // ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
    document.getElementById("buttonPartitionWall").addEventListener("click", onClickbuttonPartWall);

    meshPartWallTrans = new THREE.Mesh( geomBdyWallHover, matBdyWallTrans );
    meshPartWallTrans.visible = false;
    scene.add(meshPartWallTrans);
    meshPartWallDel = new THREE.Mesh( geomBdyWallDel, matBdyWallDel );
    meshPartWallDel.visible = false;
    scene.add(meshPartWallDel);

    // __________________________
    //    	　_ * WINDOW01 *
    // ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
    document.getElementById("buttonWindow01").addEventListener("click", onClickbuttonWindow01);

    meshWindow01Trans = new THREE.Mesh( geomWindow01Hover, matBdyWallTrans );
    meshWindow01Trans.visible = false;
    scene.add(meshWindow01Trans);
    meshWindow01Del = new THREE.Mesh( geomWindow01Del, matBdyWallDel );
    meshWindow01Del.visible = false;
    scene.add(meshWindow01Del);

    // __________________________
    //    	　_ * WINDOW02 *
    // ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
    document.getElementById("buttonWindow02").addEventListener("click", onClickbuttonWindow02);

    meshWindow02Trans = new THREE.Mesh( geomWindow01Hover, matBdyWallTrans );
    meshWindow02Trans.visible = false;
    scene.add(meshWindow02Trans);
    meshWindow02Del = new THREE.Mesh( geomWindow01Del, matBdyWallDel );
    meshWindow02Del.visible = false;
    scene.add(meshWindow02Del);
    
    // __________________________
    //    	　_ * DOOR01 *
    // ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
    document.getElementById("buttonDoor01").addEventListener("click", onClickbuttonDoor01);

    meshDoor01Trans = new THREE.Mesh( geomDoor01Hover, matBdyWallTrans );
    meshDoor01Trans.visible = false;
    scene.add(meshDoor01Trans);
    meshDoor01Del = new THREE.Mesh( geomDoor01Del, matBdyWallDel );
    meshDoor01Del.visible = false;
    scene.add(meshDoor01Del);

    // __________________________
    //    	　_ * DOOR02 *
    // ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
    document.getElementById("buttonDoor02").addEventListener("click", onClickbuttonDoor02);

    meshDoor02Trans = new THREE.Mesh( geomDoor01Hover, matBdyWallTrans );
    meshDoor02Trans.visible = false;
    scene.add(meshDoor02Trans);
    meshDoor02Del = new THREE.Mesh( geomDoor01Del, matBdyWallDel );
    meshDoor02Del.visible = false;
    scene.add(meshDoor02Del);

    // __________________________
    //    	　_ * DOOR03 *
    // ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
    document.getElementById("buttonDoor03").addEventListener("click", onClickbuttonDoor03);

    meshDoor03Trans = new THREE.Mesh( geomDoor01Hover, matBdyWallTrans );
    meshDoor03Trans.visible = false;
    scene.add(meshDoor03Trans);
    meshDoor03Del = new THREE.Mesh( geomDoor01Del, matBdyWallDel );
    meshDoor03Del.visible = false;
    scene.add(meshDoor03Del);
    
    // __________________________
    //    	　_ * RAILING01 *
    // ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
    document.getElementById("buttonRailing01").addEventListener("click", onClickbuttonRailing01);

    meshRailing01Trans = new THREE.Mesh( geomRailing01Hover, matBdyWallTrans );
    meshRailing01Trans.visible = false;
    scene.add(meshRailing01Trans);
    meshRailing01Del = new THREE.Mesh( geomRailing01Del, matBdyWallDel );
    meshRailing01Del.visible = false;
    scene.add(meshRailing01Del);

    // __________________________
    //    	　_ * STAIRS01 *
    // ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
    document.getElementById("buttonStairs01").addEventListener("click", onClickbuttonStairs01);

    meshStairs01Trans = new THREE.Mesh( geomStairs01Hover, matBdyWallTrans );
    meshStairs01Trans.visible = false;
    scene.add(meshStairs01Trans);
    meshStairs01Del = new THREE.Mesh( geomStairs01Del, matBdyWallDel );
    meshStairs01Del.visible = false;
    scene.add(meshStairs01Del);







}

// ====================================================
// { Scene Animation Loop } ★
// ====================================================
// ''''''  intersect(y/n), shift press(n/y)

// This will create a loop that causes the renderer to draw the scene every time the screen is refreshed (on a typical screen this means 60 times per second).
function animate() {
    requestAnimationFrame( animate );
    bool_render = true;
    // render();
}

function render() {

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
    
    var checkboxChassis = document.getElementById("checkboxChassis");   
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

    /*
    // __________________________
    //    	　_ * HYBRID MOD *
    // ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾

    if ( bool_delGrpHybrid == true) { // if shift is pressed
        raycaster.setFromCamera( mouse, camera );
        var list_meshScene = getMeshesInGroups(); // get the mesh in the scene to check for intersections
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
    
// __________________________
//    	　_ * NEIGHBOURS *
// ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾

var checkboxNeighbours = document.getElementById("checkboxNeighbour01");   
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
        var list_meshScene = getValueList(dictVolume, 1); // get the meshes in the scene to check for intersections
        list_meshScene.push(ground);
        var list_meshInt = raycaster.intersectObjects( list_meshScene ); // returns an array of cursor-intersected items, e.g. (3) [{…}, {…}, {…}] 
        var meshInt0 = list_meshInt[ 0 ]; // get the first mesh that the cursor intersects e.g. {distance: 29.318, point: Vector3, object: Mesh, face: Face3, faceIndex: 5}

        if ( list_meshInt.length > 0 ) { // if intersect with any meshes

            if (meshInt0.object.name == 'volume_base' ) { //if the first mesh that the cursor intersects has the name " "
                
                if (!bool_delVolume) { // if shift button is not pressed, show nothing
                    meshVolumeTrans.visible = false;
                    meshVolumeDel.visible = false;
                    pos_meshVolume = null;
                }
                else { // if shift button is pressed, show geom_trans_del
                    
                    var cen_meshInt0 = meshInt0.object.position; // centre of the first mesh that the cursor intersects, e.g. Vector3 {x: -1.5, y: 3, z: 0.25}
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
        var list_meshScene = Object.values(dictFloor); // get the meshes in the scene to check for intersections
        list_meshScene.push(meshFloorZone);
        var list_meshInt = raycaster.intersectObjects( list_meshScene ); // returns an array of cursor-intersected items, e.g. (3) [{…}, {…}, {…}] 
        var meshInt0 = list_meshInt[ 0 ]; // get the first mesh that the cursor intersects e.g. {distance: 29.318, point: Vector3, object: Mesh, face: Face3, faceIndex: 5}

        if ( list_meshInt.length > 0 ) { // if intersect with any meshes

            if (meshInt0.object.name == 'floor') { //if the first mesh that the cursor intersects has the name " "

                var cen_meshInt0 = meshInt0.object.position; // centre of the first mesh that the cursor intersects, e.g. Vector3 {x: -1.5, y: 3, z: 0.25}
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

    var checkboxCeiling = document.getElementById("checkboxCeiling");   
    var list_meshCeiling = Object.values(dictCeiling)
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
        var list_meshScene = Object.values(dictCeiling); // get the meshes in the scene to check for intersections
        list_meshScene.push(meshFloorZone);
        var list_meshInt = raycaster.intersectObjects( list_meshScene ); // returns an array of cursor-intersected items, e.g. (3) [{…}, {…}, {…}] 
        var meshInt0 = list_meshInt[ 0 ]; // get the first mesh that the cursor intersects e.g. {distance: 29.318, point: Vector3, object: Mesh, face: Face3, faceIndex: 5}

        if ( list_meshInt.length > 0 ) { // if intersect with any meshes

            if (meshInt0.object.name == 'ceiling') { //if the first mesh that the cursor intersects has the name " "

                var cen_meshInt0 = meshInt0.object.position; // centre of the first mesh that the cursor intersects, e.g. Vector3 {x: -1.5, y: 3, z: 0.25}
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
        var list_meshScene = getMeshesInGroups(); // get the mesh in the scene to check for intersections
        list_meshScene.push(meshFloorZone);
        var list_meshInt = raycaster.intersectObjects( list_meshScene ); // returns an array of intersected items, e.g. (3) [{…}, {…}, {…}] 
        var meshInt0 = list_meshInt[ 0 ]; // get the first mesh that the cursor intersects e.g. {distance: 29.318, point: Vector3, object: Mesh, face: Face3, faceIndex: 5}
        
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
        var list_meshScene = getMeshesInGroups(); // get the mesh in the scene to check for intersections
        list_meshScene.push(meshFloorZone);
        var list_meshInt = raycaster.intersectObjects( list_meshScene ); // returns an array of intersected items, e.g. (3) [{…}, {…}, {…}] 
        var meshInt0 = list_meshInt[ 0 ]; // get the first mesh that the cursor intersects e.g. {distance: 29.318, point: Vector3, object: Mesh, face: Face3, faceIndex: 5}

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
        var list_meshScene = getMeshesInGroups(); // get the mesh in the scene to check for intersections
        list_meshScene.push(meshFloorZone);
        var list_meshInt = raycaster.intersectObjects( list_meshScene ); // returns an array of intersected items, e.g. (3) [{…}, {…}, {…}] 
        var meshInt0 = list_meshInt[ 0 ]; // get the first mesh that the cursor intersects e.g. {distance: 29.318, point: Vector3, object: Mesh, face: Face3, faceIndex: 5}
        
        reinstate_mods('Window01', 'Window02', 'Door01', 'Door02', 'Door03', 'Railing01', 'Stairs01'); // if do not intersect with anything, show nothing
       
        if ( list_meshInt.length > 0 ) { // if intersect with any mesh
            
            if (meshInt0.object.parent.name == 'Window01') { // if the first mesh that the cursor intersects has the name ' '
                var grpInt = meshInt0.object.parent.parent; // Group { .., name: 'Window01', ..}
                if (!bool_delWindow01) { 
                    // if shift button is not pressed, do nothing
                }
                else { // if shift button is pressed, show geom_trans_del
                    delHoverDisp_Window01( grpInt );
                }
            } 
            
            else if (meshInt0.object.name == 'BoundaryWall') { // if the first mesh that the cursor intersects has the name ' '
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
                var grpInt = meshInt0.object.parent.parent; // centre of the first mesh that the cursor intersects, e.g. Vector3 {x: -1.5, y: 3, z: 0.25}
                if (!bool_delWindow01) { // if shift button is not pressed, update global variable of geom & geom_trans
                    replaceHoverDisp_Window01( grpInt );
                }
                else { // if shift button is pressed, show geom_trans_del
                    delHoverDisp_Window02( grpInt );
                }
            }	

            else if (meshInt0.object.parent.name == 'Door01') { 
                var grpInt = meshInt0.object.parent.parent; // centre of the first mesh that the cursor intersects, e.g. Vector3 {x: -1.5, y: 3, z: 0.25}
                if (!bool_delWindow01) { // if shift button is not pressed, update global variable of geom & geom_trans
                    replaceHoverDisp_Window01( grpInt );
                }
                else { // if shift button is pressed, show geom_trans_del
                    delHoverDisp_Door01( grpInt );
                }
            }	

            else if (meshInt0.object.parent.name == 'Door02') { 
                var grpInt = meshInt0.object.parent.parent; // centre of the first mesh that the cursor intersects, e.g. Vector3 {x: -1.5, y: 3, z: 0.25}
                if (!bool_delWindow01) { // if shift button is not pressed, update global variable of geom & geom_trans
                    replaceHoverDisp_Window01( grpInt );
                }
                else { // if shift button is pressed, show geom_trans_del
                    delHoverDisp_Door02( grpInt );
                }
            }	
            
            else if (meshInt0.object.parent.name == 'Door03') { 
                var grpInt = meshInt0.object.parent.parent; // centre of the first mesh that the cursor intersects, e.g. Vector3 {x: -1.5, y: 3, z: 0.25}
                if (!bool_delWindow01) { // if shift button is not pressed, update global variable of geom & geom_trans
                    replaceHoverDisp_Window01( grpInt );
                }
                else { // if shift button is pressed, show geom_trans_del
                    delHoverDisp_Door03( grpInt );
                }
            }	

            else if (meshInt0.object.parent.name == 'Railing01') { 
                var grpInt = meshInt0.object.parent.parent; // centre of the first mesh that the cursor intersects, e.g. Vector3 {x: -1.5, y: 3, z: 0.25}
                if (!bool_delWindow01) { // if shift button is not pressed, update global variable of geom & geom_trans
                    replaceHoverDisp_Window01( grpInt );
                }
                else { // if shift button is pressed, show geom_trans_del
                    delHoverDisp_Railing01( grpInt );
                }
            }	

            else if (meshInt0.object.parent.name == 'Stairs01') { 
                var grpInt = meshInt0.object.parent.parent; // centre of the first mesh that the cursor intersects, e.g. Vector3 {x: -1.5, y: 3, z: 0.25}
                if (!bool_delWindow01) { // if shift button is not pressed, update global variable of geom & geom_trans
                    replaceHoverDisp_Window01( grpInt );
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
        var list_meshScene = getMeshesInGroups(); // get the mesh in the scene to check for intersections
        list_meshScene.push(meshFloorZone);
        var list_meshInt = raycaster.intersectObjects( list_meshScene );
        var meshInt0 = list_meshInt[ 0 ];

        reinstate_mods('Window01', 'Window02', 'Door01', 'Door02', 'Door03', 'Railing01', 'Stairs01'); // if do not intersect with anything, show nothing
        
        if ( list_meshInt.length > 0 ) {  // if intersect with any meshes

            if (meshInt0.object.parent.name == 'Window02') { // if the first mesh that the cursor intersects has the name ' '
                var grpInt = meshInt0.object.parent.parent; // centre of the first mesh that the cursor intersects, e.g. Vector3 {x: -1.5, y: 3, z: 0.25}
                if (!bool_delWindow02) {
                    // if shift button is not pressed, do nothing
                } 
                else { // if shift button is pressed, show geom_trans_del
                    delHoverDisp_Window02( grpInt );
                }
            } 
            
            else if (meshInt0.object.name == 'BoundaryWall' ) { // if the first mesh that the cursor intersects has the name ' '
                if (!bool_delWindow02) { // if shift button is not pressed, update global variable of geom & geom_trans
                    replaceHoverDisp_Window02( meshInt0.object );
                }
            }

            else if (meshInt0.object.name == 'PartitionWall') { // if the first mesh that the cursor intersects has the name ' '
                if (!bool_delWindow01) { // if shift button is not pressed, update global variable of geom & geom_trans
                    replaceHoverDisp_Window02( meshInt0.object );
                }
            }
            
            else if (meshInt0.object.parent.name == 'Window01') { 
                var grpInt = meshInt0.object.parent.parent; // centre of the first mesh that the cursor intersects, e.g. Vector3 {x: -1.5, y: 3, z: 0.25}
                if (!bool_delWindow01) { // if shift button is not pressed, update global variable of geom & geom_trans
                    replaceHoverDisp_Window02( grpInt );
                }
                else { // if shift button is pressed, show geom_trans_del
                    delHoverDisp_Window01( grpInt );
                }
            }

            else if (meshInt0.object.parent.name == 'Door01') { 
                var grpInt = meshInt0.object.parent.parent; // centre of the first mesh that the cursor intersects, e.g. Vector3 {x: -1.5, y: 3, z: 0.25}
                if (!bool_delWindow01) { // if shift button is not pressed, update global variable of geom & geom_trans
                    replaceHoverDisp_Window02( grpInt );
                }
                else { // if shift button is pressed, show geom_trans_del
                    delHoverDisp_Door01( grpInt );
                }
            }

            else if (meshInt0.object.parent.name == 'Door02') { 
                var grpInt = meshInt0.object.parent.parent; // centre of the first mesh that the cursor intersects, e.g. Vector3 {x: -1.5, y: 3, z: 0.25}
                if (!bool_delWindow01) { // if shift button is not pressed, update global variable of geom & geom_trans
                    replaceHoverDisp_Window02( grpInt );
                }
                else { // if shift button is pressed, show geom_trans_del
                    delHoverDisp_Door02( grpInt );
                }
            }

            else if (meshInt0.object.parent.name == 'Door03') { 
                var grpInt = meshInt0.object.parent.parent; // centre of the first mesh that the cursor intersects, e.g. Vector3 {x: -1.5, y: 3, z: 0.25}
                if (!bool_delWindow01) { // if shift button is not pressed, update global variable of geom & geom_trans
                    replaceHoverDisp_Window02( grpInt );
                }
                else { // if shift button is pressed, show geom_trans_del
                    delHoverDisp_Door03( grpInt );
                }
            }

            else if (meshInt0.object.parent.name == 'Railing01') { 
                var grpInt = meshInt0.object.parent.parent; // centre of the first mesh that the cursor intersects, e.g. Vector3 {x: -1.5, y: 3, z: 0.25}
                if (!bool_delWindow01) { // if shift button is not pressed, update global variable of geom & geom_trans
                    replaceHoverDisp_Window02( grpInt );
                }
                else { // if shift button is pressed, show geom_trans_del
                    delHoverDisp_Railing01( grpInt );
                }
            }

            else if (meshInt0.object.parent.name == 'Stairs01') { // if the first mesh that the cursor intersects has the name ' '
                var grpInt = meshInt0.object.parent.parent; // centre of the first mesh that the cursor intersects, e.g. Vector3 {x: -1.5, y: 3, z: 0.25}
                if (!bool_delWindow01) { // if shift button is not pressed, update global variable of geom & geom_trans
                    replaceHoverDisp_Window02( grpInt );
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
        var list_meshScene = getMeshesInGroups(); // get the mesh in the scene to check for intersections
        list_meshScene.push(meshFloorZone);
        var list_meshInt = raycaster.intersectObjects( list_meshScene );
        var meshInt0 = list_meshInt[ 0 ];
        
        reinstate_mods('Window01', 'Window02', 'Door01', 'Door02', 'Door03', 'Railing01', 'Stairs01'); // if do not intersect with anything, show nothing
        
        if ( list_meshInt.length > 0 ) {  // if intersect with any meshes

            if (meshInt0.object.parent.name == 'Door01') { // if the first mesh that the cursor intersects has the name ' '
                var grpInt = meshInt0.object.parent.parent; // Group { .., name: 'Window01', ..}
                if (!bool_delDoor01) { 
                    // if shift button is not pressed, do nothing
                }
                else { // if shift button is pressed, show geom_trans_del
                    delHoverDisp_Door01( grpInt );
                }
            } 
            
            else if (meshInt0.object.name == 'BoundaryWall' ) { // if the first mesh that the cursor intersects has the name ' '
                if (!bool_delDoor01) { // if shift button is not pressed, update global variable of geom & geom_trans
                    replaceHoverDisp_Door01( meshInt0.object );
                }
            }

            else if (meshInt0.object.name == 'PartitionWall') { // if the first mesh that the cursor intersects has the name ' '
                if (!bool_delWindow01) { // if shift button is not pressed, update global variable of geom & geom_trans
                    replaceHoverDisp_Door01( meshInt0.object );
                }
            }
            
            else if (meshInt0.object.parent.name == 'Window01') { 
                var grpInt = meshInt0.object.parent.parent; // centre of the first mesh that the cursor intersects, e.g. Vector3 {x: -1.5, y: 3, z: 0.25}
                if (!bool_delDoor01) { // if shift button is not pressed, update global variable of geom & geom_trans
                    replaceHoverDisp_Door01( grpInt );
                }
                else { // if shift button is pressed, show geom_trans_del
                    delHoverDisp_Window01( grpInt );
                }
            }

            else if (meshInt0.object.parent.name == 'Window02') { 
                var grpInt = meshInt0.object.parent.parent; // centre of the first mesh that the cursor intersects, e.g. Vector3 {x: -1.5, y: 3, z: 0.25}
                if (!bool_delDoor01) { // if shift button is not pressed, update global variable of geom & geom_trans
                    replaceHoverDisp_Door01( grpInt );
                }
                else { // if shift button is pressed, show geom_trans_del
                    delHoverDisp_Window02( grpInt );
                }
            }

            else if (meshInt0.object.parent.name == 'Door02') { 
                var grpInt = meshInt0.object.parent.parent; // centre of the first mesh that the cursor intersects, e.g. Vector3 {x: -1.5, y: 3, z: 0.25}
                if (!bool_delDoor01) { // if shift button is not pressed, update global variable of geom & geom_trans
                    replaceHoverDisp_Door01( grpInt );
                }
                else { // if shift button is pressed, show geom_trans_del
                    delHoverDisp_Door02( grpInt );
                }
            }	

            else if (meshInt0.object.parent.name == 'Door03') { 
                var grpInt = meshInt0.object.parent.parent; // centre of the first mesh that the cursor intersects, e.g. Vector3 {x: -1.5, y: 3, z: 0.25}
                if (!bool_delDoor01) { // if shift button is not pressed, update global variable of geom & geom_trans
                    replaceHoverDisp_Door01( grpInt );
                }
                else { // if shift button is pressed, show geom_trans_del
                    delHoverDisp_Door03( grpInt );
                }
            }	
            
            else if (meshInt0.object.parent.name == 'Railing01') { 
                var grpInt = meshInt0.object.parent.parent; // centre of the first mesh that the cursor intersects, e.g. Vector3 {x: -1.5, y: 3, z: 0.25}
                if (!bool_delDoor01) { // if shift button is not pressed, update global variable of geom & geom_trans
                    replaceHoverDisp_Door01( grpInt );
                }
                else { // if shift button is pressed, show geom_trans_del
                    delHoverDisp_Railing01( grpInt );
                }
            }	

            else if (meshInt0.object.parent.name == 'Stairs01') { 
                var grpInt = meshInt0.object.parent.parent; // centre of the first mesh that the cursor intersects, e.g. Vector3 {x: -1.5, y: 3, z: 0.25}
                if (!bool_delDoor01) { // if shift button is not pressed, update global variable of geom & geom_trans
                    replaceHoverDisp_Door01( grpInt );
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
        var list_meshScene = getMeshesInGroups(); // get the mesh in the scene to check for intersections
        list_meshScene.push(meshFloorZone);
        var list_meshInt = raycaster.intersectObjects( list_meshScene );
        var meshInt0 = list_meshInt[ 0 ];
        
        reinstate_mods('Window01', 'Window02', 'Door01', 'Door02', 'Door03', 'Railing01', 'Stairs01'); // if do not intersect with anything, show nothing

        if ( list_meshInt.length > 0 ) {  // if intersect with any meshes

            if (meshInt0.object.parent.name == 'Door02') { // if the first mesh that the cursor intersects has the name ' '
                var grpInt = meshInt0.object.parent.parent; // Group { .., name: 'Window01', ..}
                if (!bool_delDoor02) { 
                    // if shift button is not pressed, do nothing
                }
                else { // if shift button is pressed, show geom_trans_del
                    delHoverDisp_Door02( grpInt );
                }
            } 
            
            else if (meshInt0.object.name == 'BoundaryWall' ) { // if the first mesh that the cursor intersects has the name ' '
                if (!bool_delDoor02) { // if shift button is not pressed, update global variable of geom & geom_trans
                    replaceHoverDisp_Door02( meshInt0.object );
                }
            }

            else if (meshInt0.object.name == 'PartitionWall') { // if the first mesh that the cursor intersects has the name ' '
                if (!bool_delWindow01) { // if shift button is not pressed, update global variable of geom & geom_trans
                    replaceHoverDisp_Door02( meshInt0.object );
                }
            }
            
            else if (meshInt0.object.parent.name == 'Window01') { 
                var grpInt = meshInt0.object.parent.parent; // centre of the first mesh that the cursor intersects, e.g. Vector3 {x: -1.5, y: 3, z: 0.25}
                if (!bool_delDoor02) { // if shift button is not pressed, update global variable of geom & geom_trans
                    replaceHoverDisp_Door02( grpInt );
                }
                else { // if shift button is pressed, show geom_trans_del
                    delHoverDisp_Window01( grpInt );
                }
            }

            else if (meshInt0.object.parent.name == 'Window02') { 
                var grpInt = meshInt0.object.parent.parent; // centre of the first mesh that the cursor intersects, e.g. Vector3 {x: -1.5, y: 3, z: 0.25}
                if (!bool_delDoor02) { // if shift button is not pressed, update global variable of geom & geom_trans
                    replaceHoverDisp_Door02( grpInt );
                }
                else { // if shift button is pressed, show geom_trans_del
                    delHoverDisp_Window02( grpInt );
                }
            }

            else if (meshInt0.object.parent.name == 'Door01') { 
                var grpInt = meshInt0.object.parent.parent; // centre of the first mesh that the cursor intersects, e.g. Vector3 {x: -1.5, y: 3, z: 0.25}
                if (!bool_delDoor02) { // if shift button is not pressed, update global variable of geom & geom_trans
                    replaceHoverDisp_Door02( grpInt );
                }
                else { // if shift button is pressed, show geom_trans_del
                    delHoverDisp_Door01( grpInt );
                }
            }	

            else if (meshInt0.object.parent.name == 'Door03') { 
                var grpInt = meshInt0.object.parent.parent; // centre of the first mesh that the cursor intersects, e.g. Vector3 {x: -1.5, y: 3, z: 0.25}
                if (!bool_delDoor02) { // if shift button is not pressed, update global variable of geom & geom_trans
                    replaceHoverDisp_Door02( grpInt );
                }
                else { // if shift button is pressed, show geom_trans_del
                    delHoverDisp_Door03( grpInt );
                }
            }	

            else if (meshInt0.object.parent.name == 'Railing01') { 
                var grpInt = meshInt0.object.parent.parent; // centre of the first mesh that the cursor intersects, e.g. Vector3 {x: -1.5, y: 3, z: 0.25}
                if (!bool_delDoor02) { // if shift button is not pressed, update global variable of geom & geom_trans
                    replaceHoverDisp_Door02( grpInt );
                }
                else { // if shift button is pressed, show geom_trans_del
                    delHoverDisp_Railing01( grpInt );
                }
            }	

            else if (meshInt0.object.parent.name == 'Stairs01') { 
                var grpInt = meshInt0.object.parent.parent; // centre of the first mesh that the cursor intersects, e.g. Vector3 {x: -1.5, y: 3, z: 0.25}
                if (!bool_delDoor02) { // if shift button is not pressed, update global variable of geom & geom_trans
                    replaceHoverDisp_Door02( grpInt );
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
        var list_meshScene = getMeshesInGroups(); // get the mesh in the scene to check for intersections
        list_meshScene.push(meshFloorZone);
        var list_meshInt = raycaster.intersectObjects( list_meshScene );
        var meshInt0 = list_meshInt[ 0 ];
        
        reinstate_mods('Window01', 'Window02', 'Door01', 'Door02', 'Door03', 'Railing01', 'Stairs01'); // if do not intersect with anything, show nothing
        
        if ( list_meshInt.length > 0 ) {  // if intersect with any meshes

            if (meshInt0.object.parent.name == 'Door03') { // if the first mesh that the cursor intersects has the name ' '
                var grpInt = meshInt0.object.parent.parent; // Group { .., name: 'Window01', ..}
                if (!bool_delDoor03) { 
                    // if shift button is not pressed, do nothing
                }
                else { // if shift button is pressed, show geom_trans_del
                    delHoverDisp_Door03( grpInt );
                }
            } 
            
            else if (meshInt0.object.name == 'BoundaryWall' ) { // if the first mesh that the cursor intersects has the name ' '
                if (!bool_delDoor03) { // if shift button is not pressed, update global variable of geom & geom_trans
                    replaceHoverDisp_Door03( meshInt0.object );
                }
            }

            else if (meshInt0.object.name == 'PartitionWall') { // if the first mesh that the cursor intersects has the name ' '
                if (!bool_delWindow01) { // if shift button is not pressed, update global variable of geom & geom_trans
                    replaceHoverDisp_Door03( meshInt0.object );
                }
            }
            
            else if (meshInt0.object.parent.name == 'Window01') { 
                var grpInt = meshInt0.object.parent.parent; // centre of the first mesh that the cursor intersects, e.g. Vector3 {x: -1.5, y: 3, z: 0.25}
                if (!bool_delDoor03) { // if shift button is not pressed, update global variable of geom & geom_trans
                    replaceHoverDisp_Door03( grpInt );
                }
                else { // if shift button is pressed, show geom_trans_del
                    delHoverDisp_Window01( grpInt );
                }
            }

            else if (meshInt0.object.parent.name == 'Window02') { 
                var grpInt = meshInt0.object.parent.parent; // centre of the first mesh that the cursor intersects, e.g. Vector3 {x: -1.5, y: 3, z: 0.25}
                if (!bool_delDoor03) { // if shift button is not pressed, update global variable of geom & geom_trans
                    replaceHoverDisp_Door03( grpInt );
                }
                else { // if shift button is pressed, show geom_trans_del
                    delHoverDisp_Window02( grpInt );
                }
            }

            else if (meshInt0.object.parent.name == 'Door01') { 
                var grpInt = meshInt0.object.parent.parent; // centre of the first mesh that the cursor intersects, e.g. Vector3 {x: -1.5, y: 3, z: 0.25}
                if (!bool_delDoor03) { // if shift button is not pressed, update global variable of geom & geom_trans
                    replaceHoverDisp_Door03( grpInt );
                }
                else { // if shift button is pressed, show geom_trans_del
                    delHoverDisp_Door01( grpInt );
                }
            }	

            else if (meshInt0.object.parent.name == 'Door02') { 
                var grpInt = meshInt0.object.parent.parent; // centre of the first mesh that the cursor intersects, e.g. Vector3 {x: -1.5, y: 3, z: 0.25}
                if (!bool_delDoor03) { // if shift button is not pressed, update global variable of geom & geom_trans
                    replaceHoverDisp_Door03( grpInt );
                }
                else { // if shift button is pressed, show geom_trans_del
                    delHoverDisp_Door02( grpInt );
                }
            }	
        
            else if (meshInt0.object.parent.name == 'Railing01') { 
                var grpInt = meshInt0.object.parent.parent; // centre of the first mesh that the cursor intersects, e.g. Vector3 {x: -1.5, y: 3, z: 0.25}
                if (!bool_delDoor03) { // if shift button is not pressed, update global variable of geom & geom_trans
                    replaceHoverDisp_Door03( grpInt );
                }
                else { // if shift button is pressed, show geom_trans_del
                    delHoverDisp_Railing01( grpInt );
                }
            }	

            else if (meshInt0.object.parent.name == 'Stairs01') { 
                var grpInt = meshInt0.object.parent.parent; // centre of the first mesh that the cursor intersects, e.g. Vector3 {x: -1.5, y: 3, z: 0.25}
                if (!bool_delDoor03) { // if shift button is not pressed, update global variable of geom & geom_trans
                    replaceHoverDisp_Door03( grpInt );
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
        var list_meshScene = getMeshesInGroups(); // get the mesh in the scene to check for intersections
        list_meshScene.push(meshFloorZone);
        var list_meshInt = raycaster.intersectObjects( list_meshScene );
        var meshInt0 = list_meshInt[ 0 ];
        
        reinstate_mods('Window01', 'Window02', 'Door01', 'Door02', 'Door03', 'Railing01', 'Stairs01'); // if do not intersect with anything, show nothing
        
        if ( list_meshInt.length > 0 ) {  // if intersect with any meshes

            if (meshInt0.object.parent.name == 'Railing01') { // if the first mesh that the cursor intersects has the name ' '
                var grpInt = meshInt0.object.parent.parent; // Group { .., name: 'Window01', ..}
                if (!bool_delRailing01) { 
                    // if shift button is not pressed, do nothing
                }
                else { // if shift button is pressed, show geom_trans_del
                    delHoverDisp_Railing01( grpInt );
                }
            } 
            
            else if (meshInt0.object.name == 'BoundaryWall' ) { // if the first mesh that the cursor intersects has the name ' '
                if (!bool_delRailing01) { // if shift button is not pressed, update global variable of geom & geom_trans
                    replaceHoverDisp_Railing01( meshInt0.object );
                }
            }

            else if (meshInt0.object.name == 'PartitionWall') { // if the first mesh that the cursor intersects has the name ' '
                if (!bool_delWindow01) { // if shift button is not pressed, update global variable of geom & geom_trans
                    replaceHoverDisp_Railing01( meshInt0.object );
                }
            }

            else if (meshInt0.object.parent.name == 'Window01') { 
                var grpInt = meshInt0.object.parent.parent; // centre of the first mesh that the cursor intersects, e.g. Vector3 {x: -1.5, y: 3, z: 0.25}
                if (!bool_delRailing01) { // if shift button is not pressed, update global variable of geom & geom_trans
                    replaceHoverDisp_Railing01( grpInt );
                }
                else { // if shift button is pressed, show geom_trans_del
                    delHoverDisp_Window01( grpInt );
                }
            }

            else if (meshInt0.object.parent.name == 'Window02') { 
                var grpInt = meshInt0.object.parent.parent; // centre of the first mesh that the cursor intersects, e.g. Vector3 {x: -1.5, y: 3, z: 0.25}
                if (!bool_delRailing01) { // if shift button is not pressed, update global variable of geom & geom_trans
                    replaceHoverDisp_Railing01( grpInt );
                }
                else { // if shift button is pressed, show geom_trans_del
                    delHoverDisp_Window02( grpInt );
                }
            }

            else if (meshInt0.object.parent.name == 'Door01') { 
                var grpInt = meshInt0.object.parent.parent; // centre of the first mesh that the cursor intersects, e.g. Vector3 {x: -1.5, y: 3, z: 0.25}
                if (!bool_delRailing01) { // if shift button is not pressed, update global variable of geom & geom_trans
                    replaceHoverDisp_Railing01( grpInt );
                }
                else { // if shift button is pressed, show geom_trans_del
                    delHoverDisp_Door01( grpInt );
                }
            }	

            else if (meshInt0.object.parent.name == 'Door02') { 
                var grpInt = meshInt0.object.parent.parent; // centre of the first mesh that the cursor intersects, e.g. Vector3 {x: -1.5, y: 3, z: 0.25}
                if (!bool_delRailing01) { // if shift button is not pressed, update global variable of geom & geom_trans
                    replaceHoverDisp_Railing01( grpInt );
                }
                else { // if shift button is pressed, show geom_trans_del
                    delHoverDisp_Door02( grpInt );
                }
            }	

            else if (meshInt0.object.parent.name == 'Door03') { 
                var grpInt = meshInt0.object.parent.parent; // centre of the first mesh that the cursor intersects, e.g. Vector3 {x: -1.5, y: 3, z: 0.25}
                if (!bool_delRailing01) { // if shift button is not pressed, update global variable of geom & geom_trans
                    replaceHoverDisp_Railing01( grpInt );
                }
                else { // if shift button is pressed, show geom_trans_del
                    delHoverDisp_Door03( grpInt );
                }
            }	
        
            else if (meshInt0.object.parent.name == 'Stairs01') { 
                var grpInt = meshInt0.object.parent.parent; // centre of the first mesh that the cursor intersects, e.g. Vector3 {x: -1.5, y: 3, z: 0.25}
                if (!bool_delRailing01) { // if shift button is not pressed, update global variable of geom & geom_trans
                    replaceHoverDisp_Railing01( grpInt );
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
        var list_meshScene = getMeshesInGroups(); // get the mesh in the scene to check for intersections
        list_meshScene.push(meshFloorZone);
        var list_meshInt = raycaster.intersectObjects( list_meshScene );
        var meshInt0 = list_meshInt[ 0 ];
        
        reinstate_mods('Window01', 'Window02', 'Door01', 'Door02', 'Door03', 'Railing01', 'Stairs01'); // if do not intersect with anything, show nothing

        if ( list_meshInt.length > 0 ) {  // if intersect with any meshes

            if (meshInt0.object.parent.name == 'Stairs01') { // if the first mesh that the cursor intersects has the name ' '
                var grpInt = meshInt0.object.parent.parent; // Group { .., name: 'Window01', ..}
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
                var grpInt = meshInt0.object.parent.parent; // centre of the first mesh that the cursor intersects, e.g. Vector3 {x: -1.5, y: 3, z: 0.25}
                if (!bool_delStairs01) { // if shift button is not pressed, update global variable of geom & geom_trans
                    replaceHoverDisp_Stairs01( grpInt );
                }
                else { // if shift button is pressed, show geom_trans_del
                    delHoverDisp_Window01( grpInt );
                }
            }

            else if (meshInt0.object.parent.name == 'Window02') { 
                var grpInt = meshInt0.object.parent.parent; // centre of the first mesh that the cursor intersects, e.g. Vector3 {x: -1.5, y: 3, z: 0.25}
                if (!bool_delStairs01) { // if shift button is not pressed, update global variable of geom & geom_trans
                    replaceHoverDisp_Stairs01( grpInt );
                }
                else { // if shift button is pressed, show geom_trans_del
                    delHoverDisp_Window02( grpInt );
                }
            }

            else if (meshInt0.object.parent.name == 'Door01') { 
                var grpInt = meshInt0.object.parent.parent; // centre of the first mesh that the cursor intersects, e.g. Vector3 {x: -1.5, y: 3, z: 0.25}
                if (!bool_delStairs01) { // if shift button is not pressed, update global variable of geom & geom_trans
                    replaceHoverDisp_Stairs01( grpInt );
                }
                else { // if shift button is pressed, show geom_trans_del
                    delHoverDisp_Door01( grpInt );
                }
            }	

            else if (meshInt0.object.parent.name == 'Door02') { 
                var grpInt = meshInt0.object.parent.parent; // centre of the first mesh that the cursor intersects, e.g. Vector3 {x: -1.5, y: 3, z: 0.25}
                if (!bool_delStairs01) { // if shift button is not pressed, update global variable of geom & geom_trans
                    replaceHoverDisp_Stairs01( grpInt );
                }
                else { // if shift button is pressed, show geom_trans_del
                    delHoverDisp_Door02( grpInt );
                }
            }	

            else if (meshInt0.object.parent.name == 'Door03') { 
                var grpInt = meshInt0.object.parent.parent; // centre of the first mesh that the cursor intersects, e.g. Vector3 {x: -1.5, y: 3, z: 0.25}
                if (!bool_delStairs01) { // if shift button is not pressed, update global variable of geom & geom_trans
                    replaceHoverDisp_Stairs01( grpInt );
                }
                else { // if shift button is pressed, show geom_trans_del
                    delHoverDisp_Door03( grpInt );
                }
            }	

            else if (meshInt0.object.parent.name == 'Railing01') { 
                var grpInt = meshInt0.object.parent.parent; // centre of the first mesh that the cursor intersects, e.g. Vector3 {x: -1.5, y: 3, z: 0.25}
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


//////////////////// -------------SUBSIDIARY FUNCTIONS------------------------------------------------------ //////////////////// 


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
        var key = keyGen(pos_meshVolume);
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
        var key = keyGen(pos_meshFloor);
        if (bool_delFloor && key in dictFloor) { // if shift is pressed and existing key is True, delete meshFloor
            deleteFloor(dictFloor[key]); 
            deleteMeshEnclosure(pos_meshFloor);
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
        var key = keyGen(pos_meshCeiling);
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
        var key = keyGen(pos_meshBdyWall);
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
        var key = keyGen(pos_meshPartWall);

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


// --------------------------------
//    Mouse Move and Shift Key ★
// --------------------------------

function onMouseMove( event ) {
    bool_mouseMove = true;
    event.preventDefault(); // ??? not too sure what this does
    mouse.x = ( (event.pageX - container.offsetLeft) / container.clientWidth ) * 2 - 1;
    mouse.y = - ( (event.pageY - container.offsetTop) / container.clientHeight ) * 2 + 1;

    /*
    // __________________________
    //    	　_ * HYBRID MOD *
    // ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
    if (event.shiftKey) { // if shift is pressed, del_mesh and hide mesh_trans
        bool_delGrpHybrid = true;
        console.log(bool_delGrpHybrid);
    } else { // if shift is not pressed, del_mesh is false and hide mesh_trans
        bool_delGrpHybrid = false;
        console.log(bool_delGrpHybrid);
    }
    */

    // __________________________
    //    	　_ * VOLUME *
    // ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
    if (event.shiftKey) { // if shift is pressed, del_mesh and hide mesh_trans
        bool_delVolume = true;
    } else { // if shift is not pressed, del_mesh is false and hide mesh_trans
        bool_delVolume = false;
    }
    
    // __________________________
    //    	　_ * FLOOR *
    // ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
    if (event.shiftKey) { // if shift is pressed, del_mesh and hide mesh_trans
        bool_delFloor = true;
    } else { // if shift is not pressed, del_mesh is false and hide mesh_trans
        bool_delFloor = false;
    }

    // __________________________
    //    	　_ * CEILING * 
    // ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
    if (event.shiftKey) {
        bool_delCeiling = true;
    } else {
        bool_delCeiling = false;
    }

    // __________________________
    //    	　_ * BOUNDARY WALL * 
    // ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
    if (event.shiftKey) {
        bool_delBdyWall = true;
    } else {
        bool_delBdyWall = false;
    }

    // __________________________
    //    	　_ * PARTITION WALL * 
    // ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
    if (event.shiftKey) {
        bool_delPartWall = true;
    } else {
        bool_delPartWall = false;
    }


    // __________________________
    //    	　_ * WINDOW01 * 
    // ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
    if (event.shiftKey) {
        bool_delWindow01 = true;
    } else {
        bool_delWindow01 = false;
    }

    // __________________________
    //    	　_ * WINDOW02 * 
    // ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
    if (event.shiftKey) {
        bool_delWindow02 = true;
    } else {
        bool_delWindow02 = false;
    }
    
    // __________________________
    //    	　_ * DOOR01 * 
    // ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
    if (event.shiftKey) {
        bool_delDoor01 = true;
    } else {
        bool_delDoor01 = false;
    }

    // __________________________
    //    	　_ * DOOR02 * 
    // ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
    if (event.shiftKey) {
        bool_delDoor02 = true;
    } else {
        bool_delDoor02 = false;
    }

    // __________________________
    //    	　_ * DOOR03 * 
    // ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
    if (event.shiftKey) {
        bool_delDoor03 = true;
    } else {
        bool_delDoor03 = false;
    }

    // __________________________
    //    	　_ * RAILING01 * 
    // ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
    if (event.shiftKey) {
        bool_delRailing01 = true;
    } else {
        bool_delRailing01 = false;
    }

    // __________________________
    //    	　_ * STAIRS01 * 
    // ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
    if (event.shiftKey) {
        bool_delStairs01 = true;
    } else {
        bool_delStairs01 = false;
    }


}


// --------------------------------
//    Buttons ★
// --------------------------------

// __________________________
//    	　_ * VOLUME *
// ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
function onClickbuttonVolume() {
    document.getElementById(id_buttonPressed).classList.remove("pressed");
    id_buttonPressed = 'buttonVolume';
    document.getElementById(id_buttonPressed).classList.add("pressed");
};

// __________________________
//    	　_ * FLOOR *
// ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
function onClickbuttonFloor() {
    document.getElementById(id_buttonPressed).classList.remove("pressed");
    id_buttonPressed = 'buttonFloor';
    document.getElementById(id_buttonPressed).classList.add("pressed");
};

// __________________________
//    	　_ * CEILING * 
// ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
function onClickbuttonCeiling() {
    document.getElementById(id_buttonPressed).classList.remove("pressed");
    id_buttonPressed = 'buttonCeiling';
    document.getElementById(id_buttonPressed).classList.add("pressed");
};

// __________________________
//    	　_ * BOUNDARY WALL * 
// ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
function onClickbuttonBoundaryWall() {
    document.getElementById(id_buttonPressed).classList.remove("pressed");
    id_buttonPressed = 'buttonBoundaryWall';
    document.getElementById(id_buttonPressed).classList.add("pressed");
};

// __________________________
//    	　_ * PARTITION WALL * 
// ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
function onClickbuttonPartWall() {
    document.getElementById(id_buttonPressed).classList.remove("pressed");
    id_buttonPressed = 'buttonPartitionWall';
    document.getElementById(id_buttonPressed).classList.add("pressed");
};

// __________________________
//    	　_ * WINDOW01 * 
// ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
function onClickbuttonWindow01() {
    document.getElementById(id_buttonPressed).classList.remove("pressed");
    id_buttonPressed = 'buttonWindow01';
    document.getElementById(id_buttonPressed).classList.add("pressed");
};

// __________________________
//    	　_ * WINDOW02 * 
// ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
function onClickbuttonWindow02() {
    document.getElementById(id_buttonPressed).classList.remove("pressed");
    id_buttonPressed = 'buttonWindow02';
    document.getElementById(id_buttonPressed).classList.add("pressed");
};

// __________________________
//    	　_ * DOOR01 * 
// ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
function onClickbuttonDoor01() {
    document.getElementById(id_buttonPressed).classList.remove("pressed");
    id_buttonPressed = 'buttonDoor01';
    document.getElementById(id_buttonPressed).classList.add("pressed");
};

// __________________________
//    	　_ * DOOR02 * 
// ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
function onClickbuttonDoor02() {
    document.getElementById(id_buttonPressed).classList.remove("pressed");
    id_buttonPressed = 'buttonDoor02';
    document.getElementById(id_buttonPressed).classList.add("pressed");
};

// __________________________
//    	　_ * DOOR03 * 
// ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
function onClickbuttonDoor03() {
    document.getElementById(id_buttonPressed).classList.remove("pressed");
    id_buttonPressed = 'buttonDoor03';
    document.getElementById(id_buttonPressed).classList.add("pressed");
};

// __________________________
//    	　_ * RAILING01 * 
// ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
function onClickbuttonRailing01() {
    document.getElementById(id_buttonPressed).classList.remove("pressed");
    id_buttonPressed = 'buttonRailing01';
    document.getElementById(id_buttonPressed).classList.add("pressed");
};

// __________________________
//    	　_ * STAIRS01 * 
// ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
function onClickbuttonStairs01() {
    document.getElementById(id_buttonPressed).classList.remove("pressed");
    id_buttonPressed = 'buttonStairs01';
    document.getElementById(id_buttonPressed).classList.add("pressed");
};



// ====================================================
// { Raycaster } 
// ====================================================

// --------------------------------
//    Extract Meshes ★
// --------------------------------

function getMeshesInGroups() {
    
    var list_meshScene = []; // get the mesh in the scene to check for intersections
    
    // console.log('~~~Object.values(dictBdyWall)~~~', Object.values(dictBdyWall)) // e.g. (2) [Mesh, Mesh] (i.e. 2 BdyWalls in the scene)
    list_meshScene = list_meshScene.concat(Object.values(dictBdyWall));

    list_meshScene = list_meshScene.concat(Object.values(dictPartWall));

    list_meshScene = list_meshScene.concat(Object.values(dictFloor));

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
//    Mouse Up Display ★ 
// --------------------------------

function MouseUpDisplay_onHybridMod(name_HybridMesh, pos_HybridMesh, bool_delHybridMesh, dictHybridMesh, deleteHybridMesh, addHybridMesh) { 
    var key = keyGen(pos_HybridMesh);
    if (bool_delHybridMesh && key in dictHybridMesh) { // if shift is pressed and existing key is True, delete mesh and its key
        const bool_posPartWall = (pos_HybridMesh.x % (BdyWall_width/2) + pos_HybridMesh.y % (BdyWall_width/2) == 0);// if the mesh position is on the grid line with no offset, there should be no remainder
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

// --------------------------------
//    Add Hover Display ★ 
// --------------------------------

function addHoverDisp_PartWall(pos, angle){
    meshPartWallTrans.position.copy(pos);
    meshPartWallTrans.rotation.z = angle;
    meshPartWallTrans.visible = true;
    meshPartWallDel.visible = false;
}

function addHoverDisp_PartWall_toIntFloor(meshInt0) { // check distance from boundary and presense of boundary mesh
    var pos_meshInt = meshInt0.object.position;
                    
    // CHECK DISTANCE FROM BOUNDARY ON 4 SIDES

    var pos_leftBdyMesh = new THREE.Vector3(pos_meshInt.x - floor_width_half + offsetValue_BdyWall, pos_meshInt.y, pos_meshInt.z - floor_thickness/2 + BdyWall_height_half);
    var pos_rightBdyMesh = new THREE.Vector3(pos_meshInt.x + floor_width_half - offsetValue_BdyWall, pos_meshInt.y, pos_meshInt.z - floor_thickness/2 + BdyWall_height_half);
    var pos_frontBdyMesh = new THREE.Vector3(pos_meshInt.x, pos_meshInt.y + floor_width_half - offsetValue_BdyWall, pos_meshInt.z - floor_thickness/2 + BdyWall_height_half);
    var pos_backBdyMesh = new THREE.Vector3(pos_meshInt.x, pos_meshInt.y - floor_width_half + offsetValue_BdyWall, pos_meshInt.z - floor_thickness/2 + BdyWall_height_half);

    const dist_leftBdyMesh = pos_leftBdyMesh.distanceTo(meshInt0.point); // distance to mouse pointer
    const dist_rightBdyMesh = pos_rightBdyMesh.distanceTo(meshInt0.point); // distance to mouse pointer
    const dist_frontBdyMesh = pos_frontBdyMesh.distanceTo(meshInt0.point); // distance to mouse pointer
    const dist_backBdyMesh = pos_backBdyMesh.distanceTo(meshInt0.point); // distance to mouse pointer
    const closest_dist_mesh = Math.min(dist_leftBdyMesh, dist_rightBdyMesh, dist_frontBdyMesh, dist_backBdyMesh);


    const angle_hor = 0;
    const angle_ver = Math.PI / 2;

    // IF CLOSEST TO LEFT BOUNDARY
    if (closest_dist_mesh == dist_leftBdyMesh) {
        var key_BdyMesh = keyGen(pos_leftBdyMesh);
        
        var pos_mesh = new THREE.Vector3(pos_meshInt.x - floor_width_half, pos_meshInt.y, pos_meshInt.z - floor_thickness/2 + BdyWall_height_half);
        var key_mesh = keyGen(pos_mesh);
        
        var key_mesh = keyGen(pos_mesh);
        var key_BdyMesh = keyGen(pos_leftBdyMesh);
        var bool_keyExistance = getbool_keyExistance(key_mesh) || getbool_keyExistance(key_BdyMesh) ;
        if ( bool_keyExistance ) { // if mesh exists, do nothing
        } else { // if mesh does not exist, show trans
            pos_meshPartWall = pos_mesh;
            angle_meshPartWall = angle_ver;
            addHoverDisp_PartWall(pos_meshPartWall, angle_meshPartWall);
        }
    }

    // IF CLOSEST TO RIGHT BOUNDARY
    if (closest_dist_mesh == dist_rightBdyMesh) {
        var key_BdyMesh = keyGen(pos_rightBdyMesh);

        var pos_mesh = new THREE.Vector3(pos_meshInt.x + floor_width_half, pos_meshInt.y, pos_meshInt.z - floor_thickness/2 + BdyWall_height_half);
        var key_mesh = keyGen(pos_mesh);

        var bool_keyExistance = getbool_keyExistance(key_mesh) || getbool_keyExistance(key_BdyMesh) ;
        if ( bool_keyExistance ) { // if mesh exists, do nothing
        } else { // if mesh does not exist, show trans
            pos_meshPartWall = pos_mesh;
            angle_meshPartWall = angle_ver;
            addHoverDisp_PartWall(pos_meshPartWall, angle_meshPartWall);
        }
    }

    // IF CLOSEST TO FRONT BOUNDARY
    if (closest_dist_mesh == dist_frontBdyMesh) {
        var key_BdyMesh = keyGen(pos_frontBdyMesh);
        
        var pos_mesh = new THREE.Vector3(pos_meshInt.x, pos_meshInt.y + floor_width_half, pos_meshInt.z - floor_thickness/2 + BdyWall_height_half);
        var key_mesh = keyGen(pos_mesh);

        var bool_keyExistance = getbool_keyExistance(key_mesh) || getbool_keyExistance(key_BdyMesh) ;
        if ( bool_keyExistance ) { // if mesh exists, do nothing
        } else { // if mesh does not exist, show trans
            pos_meshPartWall = pos_mesh;
            angle_meshPartWall = angle_hor;
            addHoverDisp_PartWall(pos_meshPartWall, angle_meshPartWall);
        }
    }
    
    // IF CLOSEST TO BACK BOUNDARY
    if (closest_dist_mesh == dist_backBdyMesh) {
        var key_BdyMesh = keyGen(pos_backBdyMesh);
        
        var pos_mesh = new THREE.Vector3(pos_meshInt.x, pos_meshInt.y - floor_width_half, pos_meshInt.z - floor_thickness/2 + BdyWall_height_half);
        var key_mesh = keyGen(pos_mesh);

        var bool_keyExistance = getbool_keyExistance(key_mesh) || getbool_keyExistance(key_BdyMesh) ;
        if ( bool_keyExistance ) { // if mesh exists, do nothing
        } else { // if mesh does not exist, show trans
            pos_meshPartWall = pos_mesh;
            angle_meshPartWall = angle_hor;
            addHoverDisp_PartWall(pos_meshPartWall, angle_meshPartWall);
        }
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
//    Reinstate ★ 
// --------------------------------

function reinstate_mods() { //  no display of trans or del mesh, clear position
    // reinstate_mods('Window01', 'Window02', 'Door01', 'Door02', 'Door03', 'Railing01', 'Stairs01');
    var args = Array.from(arguments) // arguments is an Array-like object, it doesn't have Array's built-in methods
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
//    Match Key ★
// --------------------------------
function getbool_keyExistance(key_mesh) {
    var bool_keyExistance = dictBdyWall [key_mesh] !==undefined || dictPartWall [key_mesh] !==undefined || dictWindow01 [key_mesh] !==undefined || dictWindow02 [key_mesh] !==undefined || dictDoor01 [key_mesh] !==undefined || dictDoor02 [key_mesh] !==undefined || dictDoor03 [key_mesh] !==undefined || dictRailing01 [key_mesh] !==undefined || dictStairs01 [key_mesh] !==undefined;
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


//////////////////// -------------HELPER FUNCTIONS------------------------------------------------------ //////////////////// 

// ====================================================
// { Mouse Up } ★
// ====================================================
// ''''''  add, delete

// --------------------------------
//    Scene Modifications
// --------------------------------

// __________________________
//    	　_ * VOLUME *
// ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾

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


// __________________________
//    	　_ * FLOOR *
// ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾

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

function genBdyWallEnclosure(pos_meshFloor) {
    const offsetValue_BdyWall = BdyWall_thickness/2 - 0.01

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

function deleteMeshEnclosure(pos_meshFloor) {

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

function genCeilingEnclosure(pos_meshFloor) {
    pos_meshCeiling = new THREE.Vector3(pos_meshFloor.x, pos_meshFloor.y, pos_meshFloor.z - floor_thickness/2 + BdyWall_height - ceiling_thickness/2 - overlapOffset); // update global variable _pos, e.g. Vector3 {x: -1.5, y: 3, z: 0.25}
    var ceiling_key = keyGen(pos_meshCeiling);

    if ( dictCeiling [ceiling_key] == undefined ) {
        addCeiling(ceiling_key);
    } else {
        deleteCeiling(dictCeiling [ ceiling_key ]);
    }

    pos_meshCeiling = null
}

// __________________________
//    	　_ * CEILING * 
// ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾

function addCeiling(key) {

    // ADD MESH
    var meshCeiling = new THREE.Mesh(geomCeiling, matCeilingTrans);
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
    
    const materials = [
        obs,
        concrete,
    ];
    for (let i = 0; i < geomBdyWall.groups.length; i++) {
        geomBdyWall.groups[i].materialIndex = 0; 
    }
    geomBdyWall.groups[2].materialIndex = 1 //[2]outside, [3]inside, [4]top, [5]bottom, [0][1]sides

    var meshBdyWall = new THREE.Mesh( geomBdyWall, materials );
    meshBdyWall.position.set(pos.x, pos.y, pos.z);
    scene.add( meshBdyWall );
    

    // ADD MESH PROPERTIES
    meshBdyWall.name = "BoundaryWall"
    meshBdyWall.BdyWall_key = key;

    // UPDATE GLOBAL VARIABLES, HTML
    dictBdyWall[key] = meshBdyWall;
    meshBdyWall.rotation.z = angle;
    cnt_meshBdyWall += 1; 
    document.getElementById('buttonBoundaryWall').innerHTML = "Boundary Wall (ignore): " + cnt_meshBdyWall;
    meshBdyWall.matrixAutoUpdate = false;
    meshBdyWall.updateMatrix();
    
    // // get BdyWall corner points
    // const corner_ver_shift_value = new THREE.Vector3(0, 0, BdyWall_height_half);
    // var corner_hor_shift_value = 0;
    // if (angle_meshBdyWall == 0) {
    // 	var corner_shift_value = new THREE.Vector3(BdyWall_width_half, 0, 0);
    // } else {
    // 	var corner_shift_value = new THREE.Vector3(0, BdyWall_width_half*(-1), 0);
    // }
    // var BdyWall_left_corner = meshBdyWall.position.clone().sub(corner_shift_value).sub(corner_ver_shift_value) ;
    // var BdyWall_right_corner = meshBdyWall.position.clone().add(corner_shift_value).sub(corner_ver_shift_value);
    // BdyWall_pos_list.push(BdyWall_left_corner, BdyWall_right_corner);

    // // Visualise Points
    // var geom = new THREE.BufferGeometry().setFromPoints([BdyWall_left_corner, BdyWall_right_corner]);
    // var matPoints = new THREE.PointsMaterial({size: 10, color: "pink"});
    // var points = new THREE.Points(geom, matPoints);
    // scene.add(points);

    // console.log('____', BdyWall_pos_list)
};

// Delete a BdyWall
function deleteBdyWall(meshBdyWall) {
    scene.remove( meshBdyWall );
    delete dictBdyWall[ meshBdyWall.BdyWall_key ];
    cnt_meshBdyWall -= 1; 
    document.getElementById('buttonBoundaryWall').innerHTML = "Boundary Wall (ignore): " + cnt_meshBdyWall;
};

// __________________________
//    	　_ * PARTITION WALL * 
// ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾

function addPartWall(key, pos, angle) {
    
    // ADD MESH
    var meshPartWall = new THREE.Mesh( geomPartWall, obsLight );
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
    var Window01 = meshWindow01.clone();
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
    var Window02 = grpWindow02.clone();
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
    var Door01 = meshDoor01.clone();
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
    var Door02 = meshDoor02.clone();
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
    var Door03 = meshDoor03.clone();
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
    var Railing01 = meshRailing01.clone();
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
    var Stairs01 = meshStairs01.clone();

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

// --------------------------------
//    Merge Buffer Geometry
// --------------------------------
function mergeBufferGeometry(list_bufferGeom, mat, meshMerged, meshMergedName) {
    var bufferGeometryMerged = BufferGeometryUtils.mergeBufferGeometries(list_bufferGeom, false); // https://jsfiddle.net/j3dakqmr/
    meshMerged = new THREE.Mesh(bufferGeometryMerged, mat);
    meshMerged.name = meshMergedName
    meshMerged.visible = false;
    scene.add(meshMerged)
    return meshMerged
}


function removeSingleArrayItem(arr, value) {
    var arr_copy = arr.slice(0); // makes a copy of the original array by taking a slice from the element at index 0 to the last element.
    var index = arr_copy.indexOf(value);
    if (index > -1) { // prevent reversed index
        arr_copy.splice(index, 1); // 2nd parameter means remove one item only
    }
    return arr_copy;
  }