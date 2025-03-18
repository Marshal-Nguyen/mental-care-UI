import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { gsap } from "gsap";
import "../../styles/Web/StackGame.css";

const StackGame = () => {
  const containerRef = useRef(null);
  const gameRef = useRef(null);
  const scoreRef = useRef(null);
  const instructionsRef = useRef(null);
  const [gameState, setGameState] = useState("loading");
  const [score, setScore] = useState(0);
  const gameInstanceRef = useRef(null);

  useEffect(() => {
    // Initialize game
    gameInstanceRef.current = new Game(
      containerRef.current,
      gameRef.current,
      scoreRef.current,
      instructionsRef.current,
      setGameState,
      setScore
    );

    // Event listeners
    const handleKeyDown = (e) => {
      if (e.keyCode === 32) gameInstanceRef.current.onAction();
    };

    const handleClick = () => {
      gameInstanceRef.current.onAction();
    };

    const handleTouchStart = (e) => {
      e.preventDefault();
      gameInstanceRef.current.onAction();
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("click", handleClick);
    document.addEventListener("touchstart", handleTouchStart);

    // Cleanup
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("click", handleClick);
      document.removeEventListener("touchstart", handleTouchStart);
    };
  }, []);

  return (
    <div id="container" ref={containerRef} className={gameState}>
      <div id="game" ref={gameRef}></div>
      <div id="score" ref={scoreRef}>
        {score}
      </div>
      <div id="instructions" ref={instructionsRef}>
        Click (or press the spacebar) to place the block
      </div>
      <div className="game-over">
        <h2>Game Over</h2>
        <p>You did great, you're the best.</p>
        <p>Click or spacebar to start again</p>
      </div>
      <div className="game-ready">
        <div id="start-button">Start</div>
        <div></div>
      </div>
    </div>
  );
};

// Stage class
class Stage {
  constructor(container) {
    this.container = container;

    // renderer
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: false,
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setClearColor("#D0CBC7", 1);
    this.container.appendChild(this.renderer.domElement);

    // scene
    this.scene = new THREE.Scene();

    // camera
    let aspect = window.innerWidth / window.innerHeight;
    let d = 20;
    this.camera = new THREE.OrthographicCamera(
      -d * aspect,
      d * aspect,
      d,
      -d,
      -100,
      1000
    );
    this.camera.position.x = 2;
    this.camera.position.y = 2;
    this.camera.position.z = 2;
    this.camera.lookAt(new THREE.Vector3(0, 0, 0));

    //light
    this.light = new THREE.DirectionalLight(0xffffff, 0.5);
    this.light.position.set(0, 499, 0);
    this.scene.add(this.light);
    this.softLight = new THREE.AmbientLight(0xffffff, 0.4);
    this.scene.add(this.softLight);

    window.addEventListener("resize", () => this.onResize());
    this.onResize();
  }

  render() {
    this.renderer.render(this.scene, this.camera);
  }

  add(elem) {
    this.scene.add(elem);
  }

  remove(elem) {
    this.scene.remove(elem);
  }

  setCamera(y, speed = 0.3) {
    gsap.to(this.camera.position, {
      y: y + 4,
      duration: speed,
      ease: "power1.inOut",
    });
    gsap.to(this.camera.lookAt, {
      y: y,
      duration: speed,
      ease: "power1.inOut",
    });
  }

  onResize() {
    let viewSize = 30;
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.camera.left = window.innerWidth / -viewSize;
    this.camera.right = window.innerWidth / viewSize;
    this.camera.top = window.innerHeight / viewSize;
    this.camera.bottom = window.innerHeight / -viewSize;
    this.camera.updateProjectionMatrix();
  }
}

// Block class
class Block {
  constructor(block) {
    // states
    this.STATES = { ACTIVE: "active", STOPPED: "stopped", MISSED: "missed" };
    this.MOVE_AMOUNT = 12;

    // set dimensions and position
    this.dimension = { width: 0, height: 0, depth: 0 };
    this.position = { x: 0, y: 0, z: 0 };
    this.targetBlock = block;
    this.index = (this.targetBlock ? this.targetBlock.index : 0) + 1;
    this.workingPlane = this.index % 2 ? "x" : "z";
    this.workingDimension = this.index % 2 ? "width" : "depth";

    // set dimensions from target block or defaults
    this.dimension.width = this.targetBlock
      ? this.targetBlock.dimension.width
      : 10;
    this.dimension.height = this.targetBlock
      ? this.targetBlock.dimension.height
      : 2;
    this.dimension.depth = this.targetBlock
      ? this.targetBlock.dimension.depth
      : 10;
    this.position.x = this.targetBlock ? this.targetBlock.position.x : 0;
    this.position.y = this.dimension.height * this.index;
    this.position.z = this.targetBlock ? this.targetBlock.position.z : 0;
    this.colorOffset = this.targetBlock
      ? this.targetBlock.colorOffset
      : Math.round(Math.random() * 100);

    // set color
    if (!this.targetBlock) {
      this.color = 0x333344;
    } else {
      let offset = this.index + this.colorOffset;
      var r = Math.sin(0.3 * offset) * 55 + 200;
      var g = Math.sin(0.3 * offset + 2) * 55 + 200;
      var b = Math.sin(0.3 * offset + 4) * 55 + 200;
      this.color = new THREE.Color(r / 255, g / 255, b / 255);
    }

    // state
    this.state = this.index > 1 ? this.STATES.ACTIVE : this.STATES.STOPPED;

    // set direction
    this.speed = -0.1 - this.index * 0.005;
    if (this.speed < -4) this.speed = -4;
    this.direction = this.speed;

    // create block
    let geometry = new THREE.BoxGeometry(
      this.dimension.width,
      this.dimension.height,
      this.dimension.depth
    );
    let matrix = new THREE.Matrix4().makeTranslation(
      this.dimension.width / 2,
      this.dimension.height / 2,
      this.dimension.depth / 2
    );
    geometry.applyMatrix4(matrix);

    this.material = new THREE.MeshToonMaterial({
      color: this.color,
      flatShading: true,
    });

    this.mesh = new THREE.Mesh(geometry, this.material);
    this.mesh.position.set(
      this.position.x,
      this.position.y + (this.state == this.STATES.ACTIVE ? 0 : 0),
      this.position.z
    );

    if (this.state == this.STATES.ACTIVE) {
      this.position[this.workingPlane] =
        Math.random() > 0.5 ? -this.MOVE_AMOUNT : this.MOVE_AMOUNT;
    }
  }

  reverseDirection() {
    this.direction = this.direction > 0 ? this.speed : Math.abs(this.speed);
  }

  place() {
    this.state = this.STATES.STOPPED;

    let overlap =
      this.targetBlock.dimension[this.workingDimension] -
      Math.abs(
        this.position[this.workingPlane] -
          this.targetBlock.position[this.workingPlane]
      );

    let blocksToReturn = {
      plane: this.workingPlane,
      direction: this.direction,
    };

    if (this.dimension[this.workingDimension] - overlap < 0.3) {
      overlap = this.dimension[this.workingDimension];
      blocksToReturn.bonus = true;
      this.position.x = this.targetBlock.position.x;
      this.position.z = this.targetBlock.position.z;
      this.dimension.width = this.targetBlock.dimension.width;
      this.dimension.depth = this.targetBlock.dimension.depth;
    }

    if (overlap > 0) {
      let choppedDimensions = {
        width: this.dimension.width,
        height: this.dimension.height,
        depth: this.dimension.depth,
      };

      choppedDimensions[this.workingDimension] -= overlap;
      this.dimension[this.workingDimension] = overlap;

      let placedGeometry = new THREE.BoxGeometry(
        this.dimension.width,
        this.dimension.height,
        this.dimension.depth
      );

      let placedMatrix = new THREE.Matrix4().makeTranslation(
        this.dimension.width / 2,
        this.dimension.height / 2,
        this.dimension.depth / 2
      );

      placedGeometry.applyMatrix4(placedMatrix);

      let placedMesh = new THREE.Mesh(placedGeometry, this.material);

      let choppedGeometry = new THREE.BoxGeometry(
        choppedDimensions.width,
        choppedDimensions.height,
        choppedDimensions.depth
      );

      let choppedMatrix = new THREE.Matrix4().makeTranslation(
        choppedDimensions.width / 2,
        choppedDimensions.height / 2,
        choppedDimensions.depth / 2
      );

      choppedGeometry.applyMatrix4(choppedMatrix);

      let choppedMesh = new THREE.Mesh(choppedGeometry, this.material);

      let choppedPosition = {
        x: this.position.x,
        y: this.position.y,
        z: this.position.z,
      };

      if (
        this.position[this.workingPlane] <
        this.targetBlock.position[this.workingPlane]
      ) {
        this.position[this.workingPlane] =
          this.targetBlock.position[this.workingPlane];
      } else {
        choppedPosition[this.workingPlane] += overlap;
      }

      placedMesh.position.set(
        this.position.x,
        this.position.y,
        this.position.z
      );
      choppedMesh.position.set(
        choppedPosition.x,
        choppedPosition.y,
        choppedPosition.z
      );

      blocksToReturn.placed = placedMesh;
      if (!blocksToReturn.bonus) blocksToReturn.chopped = choppedMesh;
    } else {
      this.state = this.STATES.MISSED;
    }

    this.dimension[this.workingDimension] = overlap;
    return blocksToReturn;
  }

  tick() {
    if (this.state == this.STATES.ACTIVE) {
      let value = this.position[this.workingPlane];
      if (value > this.MOVE_AMOUNT || value < -this.MOVE_AMOUNT) {
        this.reverseDirection();
      }
      this.position[this.workingPlane] += this.direction;
      this.mesh.position[this.workingPlane] = this.position[this.workingPlane];
    }
  }
}

// Game class
class Game {
  constructor(
    container,
    gameElement,
    scoreElement,
    instructionsElement,
    setGameState,
    setScore
  ) {
    this.STATES = {
      LOADING: "loading",
      PLAYING: "playing",
      READY: "ready",
      ENDED: "ended",
      RESETTING: "resetting",
    };

    this.blocks = [];
    this.state = this.STATES.LOADING;
    this.stage = new Stage(gameElement);

    this.mainContainer = container;
    this.scoreContainer = scoreElement;
    this.instructions = instructionsElement;
    this.setGameState = setGameState;
    this.setScore = setScore;

    this.newBlocks = new THREE.Group();
    this.placedBlocks = new THREE.Group();
    this.choppedBlocks = new THREE.Group();

    this.stage.add(this.newBlocks);
    this.stage.add(this.placedBlocks);
    this.stage.add(this.choppedBlocks);

    this.addBlock();
    this.updateState(this.STATES.READY);
    this.tick();
  }

  updateState(newState) {
    this.state = newState;
    this.setGameState(newState);
  }

  onAction() {
    switch (this.state) {
      case this.STATES.READY:
        this.startGame();
        break;
      case this.STATES.PLAYING:
        this.placeBlock();
        break;
      case this.STATES.ENDED:
        this.restartGame();
        break;
    }
  }

  startGame() {
    if (this.state != this.STATES.PLAYING) {
      this.setScore(0);
      this.updateState(this.STATES.PLAYING);
      this.addBlock();
    }
  }

  restartGame() {
    this.updateState(this.STATES.RESETTING);

    let oldBlocks = this.placedBlocks.children;
    let removeSpeed = 0.2;
    let delayAmount = 0.02;

    for (let i = 0; i < oldBlocks.length; i++) {
      gsap.to(oldBlocks[i].scale, {
        x: 0,
        y: 0,
        z: 0,
        duration: removeSpeed,
        delay: (oldBlocks.length - i) * delayAmount,
        ease: "power1.in",
        onComplete: () => this.placedBlocks.remove(oldBlocks[i]),
      });

      gsap.to(oldBlocks[i].rotation, {
        y: 0.5,
        duration: removeSpeed,
        delay: (oldBlocks.length - i) * delayAmount,
        ease: "power1.in",
      });
    }

    let cameraMoveSpeed = removeSpeed * 2 + oldBlocks.length * delayAmount;
    this.stage.setCamera(2, cameraMoveSpeed);

    let countdown = { value: this.blocks.length - 1 };
    gsap.to(countdown, {
      value: 0,
      duration: cameraMoveSpeed,
      onUpdate: () => {
        this.setScore(Math.round(countdown.value));
      },
    });

    this.blocks = this.blocks.slice(0, 1);

    setTimeout(() => {
      this.startGame();
    }, cameraMoveSpeed * 1000);
  }

  placeBlock() {
    let currentBlock = this.blocks[this.blocks.length - 1];
    let newBlocks = currentBlock.place();
    this.newBlocks.remove(currentBlock.mesh);

    if (newBlocks.placed) {
      this.placedBlocks.add(newBlocks.placed);
    }

    if (newBlocks.chopped) {
      this.choppedBlocks.add(newBlocks.chopped);

      let positionParams = {
        y: currentBlock.position.y - 30,
        ease: "power1.in",
        duration: 1,
        onComplete: () => this.choppedBlocks.remove(newBlocks.chopped),
      };

      let rotateRandomness = 10;
      let rotationParams = {
        duration: 1,
        delay: 0.05,
        x:
          newBlocks.plane == "z"
            ? Math.random() * rotateRandomness - rotateRandomness / 2
            : 0.1,
        z:
          newBlocks.plane == "x"
            ? Math.random() * rotateRandomness - rotateRandomness / 2
            : 0.1,
        y: Math.random() * 0.1,
      };

      if (
        newBlocks.chopped.position[newBlocks.plane] >
        newBlocks.placed.position[newBlocks.plane]
      ) {
        positionParams[newBlocks.plane] =
          newBlocks.chopped.position[newBlocks.plane] +
          40 * Math.abs(newBlocks.direction);
      } else {
        positionParams[newBlocks.plane] =
          newBlocks.chopped.position[newBlocks.plane] -
          40 * Math.abs(newBlocks.direction);
      }

      gsap.to(newBlocks.chopped.position, positionParams);
      gsap.to(newBlocks.chopped.rotation, rotationParams);
    }

    this.addBlock();
  }

  addBlock() {
    let lastBlock = this.blocks[this.blocks.length - 1];

    if (lastBlock && lastBlock.state == lastBlock.STATES.MISSED) {
      return this.endGame();
    }

    this.setScore(this.blocks.length - 1);

    let newKidOnTheBlock = new Block(lastBlock);
    this.newBlocks.add(newKidOnTheBlock.mesh);
    this.blocks.push(newKidOnTheBlock);
    this.stage.setCamera(this.blocks.length * 2);

    if (this.blocks.length >= 5) {
      this.instructions.classList.add("hide");
    }
  }

  endGame() {
    this.updateState(this.STATES.ENDED);
  }

  tick() {
    if (this.blocks.length) {
      this.blocks[this.blocks.length - 1].tick();
    }
    this.stage.render();
    requestAnimationFrame(() => this.tick());
  }
}

export default StackGame;
