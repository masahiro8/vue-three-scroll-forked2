import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// eslint-disable-next-line
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { rotationToRadian } from "../../../util/rotationToRadian";

export const Scene = () => {
  let scene, mainCamera, renderer, controls, animationMixer;
  let duration = 10;
  let moveProgress = 0;

  // Orbit設定
  const orbitConfig = {
    enableDamping: true,
    dampingFactor: 0.25,
    enableZoom: true,
  };

  /**
   * @description シーンの初期化
   * @param {int,int,int}
   */
  const init = async ({ modelUrl, canvasId, width, height }) => {
    //シーン
    scene = new THREE.Scene();
    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.gammaOutput = true;
    renderer.setClearColor(0xffff00, 1);
    renderer.setSize(width, height);
    renderer.setPixelRatio(
      window.devicePixelRatio ? window.devicePixelRatio : 1
    );
    document.getElementById(canvasId).appendChild(renderer.domElement);

    //ライト
    const light = new THREE.AmbientLight(0xffffff, 1.0);
    scene.background = new THREE.Color(0x747373);
    scene.add(light);

    //ヘルパー
    const axis = new THREE.AxesHelper(200);
    scene.add(axis);
    axis.position.set(0, 0, 0);

    // データロード
    const { model, animations, camera, mixer } = await loadGLTF(modelUrl);

    // モデルをセット
    if (model) {
      model.position.set(0, -1, 0);
      scene.add(model);
    }

    //カメラ無ければセット
    if (!camera) {
      mainCamera = new THREE.PerspectiveCamera(
        70,
        window.innerWidth / window.innerHeight,
        0.1,
        500
      );
      mainCamera.position.set(1, 1, 1);
      mainCamera.lookAt(new THREE.Vector3(0, 0, 0));

      // Orbit
      controls = new OrbitControls(mainCamera, renderer.domElement);
      controls.enableDamping = orbitConfig.enableDamping;
      controls.dampingFactor = orbitConfig.dampingFactor;
      controls.enableZoom = orbitConfig.enableZoom;
    } else {
      mainCamera = camera;
      mainCamera.aspect = window.innerWidth / window.innerHeight;
      mainCamera.updateProjectionMatrix();
    }

    //アニメーションセット
    if (mixer) {
      animationMixer = mixer;
      animationMixer.stopAllAction();
      for (let i = 0; i < animations.length; i++) {
        let action = animationMixer.clipAction(animations[i]);
        action.play();
      }

      // カメラの時間を取得
      const cameraClip = animations.find((item) =>
        item.name.match(/^Action.*/g)
      );
      if (cameraClip) {
        duration = cameraClip.duration;
      }
    }

    animate();
  };

  /**
   * @description ブラウザのスクロール量 three.js側に渡す
   * @param {float} move
   */
  const setMoveProgress = (move) => {
    moveProgress = move;
  };

  /**
   * @description レンダリング
   */
  const render = () => {
    const t = moveProgress * duration;
    renderer.render(scene, mainCamera);
    if (animationMixer) {
      //ミキサー経過時間をセット
      animationMixer.setTime(t);
      //0秒再生
      animationMixer.update(0);
    }
  };

  const animate = () => {
    requestAnimationFrame(animate);
    render();
  };

  //GLTFの追加
  const addGLTF = (url) => {
    const gltfLoader = new GLTFLoader();
    gltfLoader.load(url, function (data) {
      const gltf = data;
      const object = gltf.scene;
      object.position.set(0, 0, 0);
      object.rotation.set(rotationToRadian(0), 0, 0);
      scene.add(object);
    });
  };

  const loadGLTF = (url) => {
    return new Promise((resolve) => {
      const gltfLoader = new GLTFLoader();
      gltfLoader.load(
        url,
        (gltf) => {
          //モデルロード
          const model = gltf.scene;
          model.position.set(0, 0, 0);

          let animations;
          let camera;
          let mixer;

          //アニメーションがあればロード
          if (gltf.animations) {
            animations = gltf.animations;
          }

          //カメラあればロード
          if (gltf.cameras[0]) {
            // カメラ一つを想定
            camera = gltf.cameras[0];
          }

          //複数ある場合はミキサー
          if (animations && animations.length) {
            mixer = new THREE.AnimationMixer(gltf.scene);
          }

          resolve({ model, animations, camera, mixer });
        },
        () => {}
      );
    });
  };

  return {
    //シーンを初期化
    init,
    //
    addGLTF,
    // スクロール量を設定
    setMoveProgress,
  };
};
