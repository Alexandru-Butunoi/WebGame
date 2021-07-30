            import * as THREE from './three/build/three.module.js';

			import {PointerLockControls} from './three/examples/jsm/controls/PointerLockControls.js';


			let camera, scene, renderer, controls, world, bodiesList, meshesList;


			let moveForward = false;
			let moveBackward = false;
			let moveLeft = false;
			let moveRight = false;

			let prevTime = performance.now();
			const velocity = new THREE.Vector3();
			const direction = new THREE.Vector3();
		

			init();
		


			function init() {

                

				camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 1000 );
				
                
				scene = new THREE.Scene();
				scene.background = new THREE.Color( "grey" );
                
                
				const light = new THREE.HemisphereLight( 0xeeeeff, 0x777788, 0.75 );
				light.position.set( 0.5, 1, 0.75 );
				scene.add( light );
                
				controls = new PointerLockControls( camera, document.body );
                
				const blocker = document.getElementById( 'blocker' );
				const instructions = document.getElementById( 'instructions' );
                
				instructions.addEventListener( 'click', function () {
                    
                    controls.lock();
                    
				} );
                
				controls.addEventListener( 'lock', function () {
                    
                    instructions.style.display = 'none';
					blocker.style.display = 'none';
                    
				} );
                
				controls.addEventListener( 'unlock', function () {
                    
                    blocker.style.display = 'block';
					instructions.style.display = '';
                    
				} );
                
				scene.add( controls.getObject() );
                
				const onKeyDown = function ( event ) {
                    
                    switch ( event.code ) {
                        
                        case 'ArrowUp':
                            case 'KeyW':
                                moveForward = true;
                                break;
                                
                                case 'ArrowLeft':
                                    case 'KeyA':
                                        moveLeft = true;
                                        break;
                                        
                                        case 'ArrowDown':
                                            case 'KeyS':
                                                moveBackward = true;
                                                break;
                                                
                                                case 'ArrowRight':
                                                    case 'KeyD':
                                                        moveRight = true;
                                                        break;
                                                        
                                                        
                                                    }
                                                    
                                                };
                                                
                                                const onKeyUp = function ( event ) {
                                                    
                                                    switch ( event.code ) {
                                                        
                                                        case 'ArrowUp':
                                                            case 'KeyW':
                                                                moveForward = false;
                                                                break;
                                                                
                                                                case 'ArrowLeft':
                                                                    case 'KeyA':
                                                                        moveLeft = false;
                                                                        break;
                                                                        
                                                                        case 'ArrowDown':
						case 'KeyS':
							moveBackward = false;
							break;

                            case 'ArrowRight':
                                case 'KeyD':
                                    moveRight = false;
                                    break;
                                    
                                }
                                
                            };
                            
                            document.addEventListener( 'keydown', onKeyDown );
                            document.addEventListener( 'keyup', onKeyUp );
                            
                            
                            
                            
                            // objects
                            
                            meshesList = [];
                            
                            const floorGeometry = new THREE.BoxGeometry( 100, 100, 1 );
                            const floorMaterial = new THREE.MeshBasicMaterial( {color: 0x00fff0} );
                            const floorMesh = new THREE.Mesh( floorGeometry, floorMaterial );
                            scene.add( floorMesh );
                            meshesList.push(floorMesh);

                            const box1Geometry = new THREE.BoxGeometry( 10, 2, 20 );
                            const box1Material = new THREE.MeshBasicMaterial( {color: 0xF5460E } );
                            const box1Mesh = new THREE.Mesh( box1Geometry, box1Material );
                            scene.add( box1Mesh );
                            meshesList.push(box1Mesh);

                            const box2Mesh = new THREE.Mesh( box1Geometry, box1Material );
                            scene.add( box2Mesh );
                            meshesList.push(box2Mesh);

                            const box3Mesh = new THREE.Mesh( box1Geometry, box1Material );
                            scene.add( box3Mesh );
                            meshesList.push(box3Mesh);

                            const box4Mesh = new THREE.Mesh( box1Geometry, box1Material );
                            scene.add( box4Mesh );
                            meshesList.push(box4Mesh);
                            
				//

				renderer = new THREE.WebGLRenderer( { antialias: true } );
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth, window.innerHeight );
				document.body.appendChild( renderer.domElement );

				//

				window.addEventListener( 'resize', onWindowResize );

                // CANNON 

                bodiesList = [];

                world = new CANNON.World();
                world.gravity.set(0, -9.82, 0); // m/s²

                const floorBody = new CANNON.Body({
                    mass:0, // kg
                    position: new CANNON.Vec3(0, -5, 0), // m
                    shape: new CANNON.Box(new CANNON.Vec3(50,50,.5))
                    });
                    floorBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1,0,0),(Math.PI /2));
                    world.addBody(floorBody);
                    bodiesList.push(floorBody);


                const box1 = new CANNON.Body({
                    mass:2, // kg
                    position: new CANNON.Vec3(-40, 10, -20), // m
                    shape: new CANNON.Box(new CANNON.Vec3(5,1,10))
                    });
                    box1.quaternion.setFromAxisAngle(new CANNON.Vec3(1,0,0),(Math.PI /2));
                    world.addBody(box1);
                    bodiesList.push(box1);

                const box2 = new CANNON.Body({
                    mass:2, // kg
                    position: new CANNON.Vec3(-40, 20, -10), // m
                    shape: new CANNON.Box(new CANNON.Vec3(5,1,10))
                    });
                    box2.quaternion.setFromAxisAngle(new CANNON.Vec3(1,0,0),(Math.PI /2));
                    world.addBody(box2);
                    bodiesList.push(box2);

                const box3 = new CANNON.Body({
                    mass:2, // kg
                    position: new CANNON.Vec3(-40, 30, 0), // m
                    shape: new CANNON.Box(new CANNON.Vec3(5,1,10))
                    });
                    box3.quaternion.setFromAxisAngle(new CANNON.Vec3(1,0,0),(Math.PI /2));
                    world.addBody(box3);
                    bodiesList.push(box3);

                const box4 = new CANNON.Body({
                    mass:2, // kg
                    position: new CANNON.Vec3(-40, 40, 10), // m
                    shape: new CANNON.Box(new CANNON.Vec3(5,1,10))
                    });
                    box4.quaternion.setFromAxisAngle(new CANNON.Vec3(1,0,0),(Math.PI /3));
                    world.addBody(box4);
                    bodiesList.push(box4);

                    function onWindowResize() {

                        camera.aspect = window.innerWidth / window.innerHeight;
                        camera.updateProjectionMatrix();
        
                        renderer.setSize( window.innerWidth, window.innerHeight );
        
        
                        
                    }
        
                    
        
                    function animate() {
        
                        world.step(1/60);
        
                        requestAnimationFrame( animate );
        
                        const time = performance.now();
        
                        meshesList.forEach((e,i) => {
                            e.position.copy(bodiesList[i].position)
                            e.quaternion.copy(bodiesList[i].quaternion)
                        })

                       
        
                        if ( controls.isLocked === true ) {
        
                           
        
                      
                    
        
                            const delta = ( time - prevTime ) / 1000;
        
                            velocity.x -= velocity.x * 10.0 * delta;
                            velocity.z -= velocity.z * 10.0 * delta;
        
                           
        
                            direction.z = Number( moveForward ) - Number( moveBackward );
                            direction.x = Number( moveRight ) - Number( moveLeft );
                            direction.normalize(); // this ensures consistent movements in all directions
        
                            if ( moveForward || moveBackward ) velocity.z -= direction.z * 400.0 * delta;
                            if ( moveLeft || moveRight ) velocity.x -= direction.x * 400.0 * delta;
        
                          
        
                            controls.moveRight( - velocity.x * delta );
                            controls.moveForward( - velocity.z * delta );
        
                            controls.getObject().position.y += ( velocity.y * delta ); // new behavior
        
                         
        
                        }
        
                        prevTime = time;
        
                        renderer.render( scene, camera );
                        
                       
                    }	
                
                    animate()
			}

            

			
            
            
           