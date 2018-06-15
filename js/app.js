"use strict";

(function() {

  window.cyberSnake = {

    // ----------
    init: function() {
      this.body = $("body");

      this.initScene();
      this.initCamera();
      this.initCube();
      this.animateCube();
      this.initPlane();
      this.initKeyboardListeners();

    },

    // ----------
    initScene: function() {
      var self = this;

      this.scene = new THREE.Scene();
      this.renderer = new THREE.WebGLRenderer();
      this.renderer.setSize(window.innerWidth / 1.4, window.innerHeight / 1.4);
      document.body.appendChild(self.renderer.domElement);
    },

    // ----------
    initCamera: function() {
      var self = this;
      this.cameraPivotPoint = this.scene.position;
      this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      this.camera.position.z = 5;
      this.camera.lookAt(this.cameraPivotPoint);
    },

    // ----------
    initKeyboardListeners: function() {
      var self = this;

      this.keyboard = new THREEx.KeyboardState();
      console.log(this.keyboard);

      var isKeyPressed = function() {
        self.keyboard.pressed('left');
        self.keyboard.pressed('right');

        if (self.keyboard.pressed('left')) {
          console.log(self.camera);
          self.camera.lookAt(self.cameraPivotPoint);

          self.camera.rotation.x += 1;
        } else if (self.keyboard.pressed('right')) {
          self.camera.lookAt(self.cameraPivotPoint);

          self.camera.rotation.x -= 1;
        } else {
          console.log('Please hold down button.');
        }
      }

      this.body.on('keydown', function() {
        isKeyPressed();
      });
    },

    // ----------
    initCube: function() {
      var self = this;

      var geometry = new THREE.BoxGeometry(1, 1, 1);
      var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
      this.cube = new THREE.Mesh(geometry, material);
      this.scene.add(this.cube);
    },

    // ----------
    initPlane: function() {
      var self = this;

      var geometry = new THREE.PlaneGeometry(1,1,1);
      var material = new THREE.MeshBasicMaterial({color: 0xffff00, side: THREE.DoubleSide});
      self.plane = new THREE.Mesh(geometry, material);
      // self.scene.add(self.plane);
    },

    // ----------
    animateCube: function () {
      var self = this;
      requestAnimationFrame(function() {
        self.animateCube();
      });

      this.cube.rotation.x += 0.01;
      this.cube.rotation.y += 0.01;

      this.renderer.render(this.scene, this.camera);
    }

  };

  $(document).ready(function() {
    cyberSnake.init();
  });

})();
