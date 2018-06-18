"use strict";

(function() {

  window.cyberSnake = {

    // ----------
    init: function() {
      this.body = $("body");

      this.initScene();
      this.initLights();
      this.initCube();
      this.animateCube();
      this.initPlane();
      this.initKeyboardListeners();
      this.initCamera();
      this.renderScene();
    },

    // ----------
    initScene: function() {
      var self = this;

      this.scene = new THREE.Scene();

      this.renderer = new THREE.WebGLRenderer({ antialias: true });
      this.renderer.setSize(window.innerWidth / 1.1, window.innerHeight / 1.1);
      this.renderer.setPixelRatio(window.devicePixelRatio);

      document.body.appendChild(self.renderer.domElement);

      this.scene.fog = new THREE.FogExp2(0x000000, 0.0011);

      this.gridHelper = new THREE.GridHelper(5, 5);
      this.gridHelper.rotation.x = 1.5;

      this.scene.add(this.gridHelper);

    },

    // ----------
    renderScene: function() {
      this.renderer.render(this.scene, this.camera);
    },

    // ----------
    initLights: function() {
      this.ambientLight = new THREE.AmbientLight(0x000000);
      this.scene.add(this.ambientLight);

      // this.lights = [];
      // this.lights[0] = new THREE.PointLight(0xffffff, 1, 0);
      // this.lights[1] = new THREE.PointLight(0xffffff, 1, 0);
      // this.lights[2] = new THREE.PointLight(0xffffff, 1, 0);

      // this.lights[0].position.set(0, 0, 0);
      // this.lights[1].position.set(100, 200, 100);
      // this.lights[2].position.set(- 100, - 200, - 100);

      // this.scene.add(this.lights[0]);
      // this.scene.add(this.lights[1]);
      // this.scene.add(this.lights[2]);
    },

    // ----------
    initCamera: function() {
      var self = this;

      this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
      this.camera.position.z = 10;

      // this.cameraPivotPoint = this.scene.position;

      // this.camera.lookAt(this.cameraPivotPoint);

      // var controls = new THREE.OrbitControls(this.camera);

      //controls.update() must be called after any manual changes to the camera's transform
      // this.camera.position.set(50, 20, 100);
      // controls.update();

    },

    // ----------
    initKeyboardListeners: function() {
      var self = this;

      this.keyboard = new THREEx.KeyboardState();
      console.log(this.keyboard);

      var isKeyPressed = function() {
        self.keyboard.pressed('left');
        self.keyboard.pressed('right');
        self.keyboard.pressed('up');
        self.keyboard.pressed('down');
        self.keyboard.pressed('z');
        self.keyboard.pressed("x");

        if (self.keyboard.pressed("up")) {
          self.cubeOne.position.y += .1;
          // self.cubeTwo.position.x += .1;
        } else if (self.keyboard.pressed('down')) {
          self.cubeOne.position.y -= .1;
          // self.cubeTwo.position.x -= .1;
        } else if (self.keyboard.pressed("left")) {
          self.cubeOne.position.x -= .1;
          // self.cubeTwo.position.y -= .1;
        } else if (self.keyboard.pressed("right")) {
          self.cubeOne.position.x += .1;
          // self.cubeTwo.position.y += .1;
        } else if (self.keyboard.pressed('z')) {
          self.cubeOne.position.z -= .5;
          // self.cubeTwo.position.z -= .5;
        } else if (self.keyboard.pressed('x')) {
          self.cubeOne.position.z += .5;
          // self.cubeTwo.position.z += .5;
        }
      }

      this.body.on('keydown', function() {
        isKeyPressed();
      });
    },

    // ---------
    initCube: function() {
      var self = this;

      var cubeOneGeometry = new THREE.BoxGeometry(1, 1, 1);
      var cubeOneMaterial = new THREE.MeshBasicMaterial({
        color: 0x00ffff,
        wireframe: true
       });

      // var cubeTwoGeometry = new THREE.BoxGeometry(1, 1, 1);
      // var cubeTwoMaterial = new THREE.MeshBasicMaterial({
      //   color: 0xffffff,
      //   wireframe: true
      // });

      this.cubeOne = new THREE.Mesh(cubeOneGeometry, cubeOneMaterial);
      // this.cubeTwo = new THREE.Mesh(cubeTwoGeometry, cubeTwoMaterial);

      // this.cubeTwo.rotation.x = 1;
      // this.cubeTwo.rotation.y = 1;

      this.scene.add(this.cubeOne);
      // this.scene.add(this.cubeTwo);
    },

    // ----------
    initPlane: function() {
      var self = this;

      var geometry = new THREE.PlaneGeometry(1,1,1);
      var material = new THREE.MeshBasicMaterial({ color: 0x00ffff, side: THREE.DoubleSide});
      self.plane = new THREE.Mesh(geometry, material);
      // self.scene.add(self.plane);
    },

    // ----------
    animateCube: function () {
      var self = this;
      requestAnimationFrame(function() {
        self.animateCube();
      });

      // this.cubeOne.rotation.x += 0.01;
      // this.cubeOne.rotation.y += 0.01;
      this.renderer.render(this.scene, this.camera);

    }

  };

  $(document).ready(function() {
    cyberSnake.init();
  });

})();
