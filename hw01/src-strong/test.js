import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';


            // 設置場景背景為透明的

            const renderer = new THREE.WebGLRenderer( { antialias: true ,alpha: true} );
            renderer.setPixelRatio( window.devicePixelRatio );
            renderer.setSize( window.innerWidth, window.innerHeight );
            renderer.outputEncoding = THREE.sRGBEncoding;

            document.body.appendChild(renderer.domElement);

            const scene = new THREE.Scene();
            
            const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
            
            
            renderer.setSize( window.innerWidth, window.innerHeight );
            document.body.appendChild( renderer.domElement );
            
            const geometry = new THREE.BoxGeometry( 1, 1, 1 );
            const material = new THREE.MeshBasicMaterial( { color: 0x00ffff } );
            const cube = new THREE.Mesh( geometry, material );

            const geometry1 = new THREE.CapsuleGeometry( 1, 1, 32, 64 );
            const material1 = new THREE.MeshBasicMaterial( {color: 0x00ff00} ); 
            const capsule = new THREE.Mesh( geometry1, material1); 

            capsule.position.set(-5,0,0);

            const loader = new GLTFLoader().setPath('');

            const light = new THREE.PointLight(0xffffff, 20000)//打光源否則材質黑漆漆看不到
            light.position.set( 50, 50, 50 );
            scene.add( light );

            var gltfModel;
            loader.load('sushi_restaurant_kit_100_models.glb', function ( gltf ) {
                gltf.scene.position.set(-1,-1,1.5);
                gltf.scene.scale.set(0.15,0.15,0.15);
                gltf.scene.rotation.set(0,0,0);
                gltfModel = gltf.scene;
                console.log(gltfModel);
                scene.add( gltfModel );
            }, undefined, function ( error ) {

                console.error( error );

            } );
            
            camera.position.z = 5;
            
            function animate() {
                requestAnimationFrame( animate );
            
                cube.rotation.x += 0.00;
                cube.rotation.y += 0.01;

                capsule.rotation.x += 0.01;
                capsule.rotation.y += 0.01;

                //if (gltfModel) gltfModel.rotation.x -= 0.01;
                if (gltfModel) gltfModel.rotation.y += 0.01;
                //if (gltfModel)
                
                renderer.render( scene, camera );
            }
            
            animate();

d3.select("#div1")
            .append("table")
            .append("tr")
            .selectAll("td")
            .data([10,9,8,7,6,5,4,3,2,1,0])
            .enter()
            .append("td")
            .text(function (d, i) {
                if (i <= 10 || isNaN(d)) {
                    return d;
                }
            })
            // img
            .attr("class", function (d, i) { 
                if (d == 10) return "excellent-kid"; 
                else if (d >= 7 ) return "good-kid"; 
                else if (d >= 2 ) return "fair-kid"; 
                else return "poor-kid";})
            .append("img")
            .attr("src", function (d, i) { 
                if (d == 10) return "1.gif";
                else if (d == 9) return "2.gif";
                else if (d == 8) return "3.gif";
                else if (d == 7) return "4.gif";
                else if (d == 6) return "5.gif";
                else if (d == 5) return "6.gif";
                else if (d == 4) return "7.gif";
                else if (d == 3) return "8.gif";
                else if (d == 2) return "9.gif";
                else if (d == 1) return "10.gif";
                else if (d == 0) return "11.gif";
                else return "../svg10/00.svg"; })
            .attr("x", "0")
            .attr("y", "0")
            .attr("width",  function(d, i) { return (i + 1) * 60; })
            .attr("height", function(d, i) { return (i + 1) * 60; });
        
            
        d3.csv('../csv/data.csv').then((data) => {
            //console.log(data)
            const rawData = d3.csvFormat(data)
            //console.log(rawData)
            const parsedCSV = d3.csvParseRows(rawData)
            console.log(d3.csvParseRows(rawData))
            var container = d3.select("#div2")
                .append("table")
                .selectAll("tr")
                .data(parsedCSV)
                .enter()
                .append("tr")
                .selectAll("td")
                .data(function (d) { return d; }).enter()
                .append("td")
                .html(function (d, i) {
                    if ( i == 4 && d != 'GitHub 帳號' ) {
                        return '<a href="https://' + d + '.github.io/vis2023f/" target="_blank"><img src="https://' + d + '.github.io/vis2023f/hw00/me.jpg"></a>' + '<hr><a href="https://github.com/' + d + '/vis2023f/" target="_blank">' + d + '</a>';
                    }
                    else if ( i == 0 || i == 2 || isNaN(d)) {
                        return d;
                    }
                })
                .filter(function (d, i) { return (i > 2 && !isNaN(d) && d != ""); })
                .attr("class", function (d, i) { 
                 if (d == 10) return "excellent-kid"; 
                 else if (d >= 7 ) return "good-kid"; 
                 else if (d >= 2 ) return "fair-kid"; 
                 else return "poor-kid";})
                .append("img")
                .attr("src", function (d, i) {
                    if (d == 10) 
                        return "1.gif";
                    else if (d == 9) 
                        return "2.gif";
                    else if (d == 8) 
                        return "3.gif";
                    else if (d == 7) 
                        return "4.gif";
                    else if (d == 6) 
                        return "5.gif";
                    else if (d == 5) 
                        return "6.gif";
                    else if (d == 4) 
                        return "7.gif";
                    else if (d == 3) 
                        return "8.gif";
                    else if (d == 2) 
                        return "9.gif";
                    else if (d == 1) 
                        return "10.gif";
                    else if (d == 0) 
                        return "11.gif";
                    else 
                        return "../svg10/00.svg";
                })
                .attr("width", 50)
                .attr("height", 50)
            })



////////////////////////////////////////////////////////////////////////////////////////////////THREE.js部分
            
