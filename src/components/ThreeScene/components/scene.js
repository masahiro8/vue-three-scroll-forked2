import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// eslint-disable-next-line
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { rotationToRadian } from "../../../util/rotationToRadian";

// import modelDataUrl from "../../data_2.0.0.glb";

export const Scene = () => {
  let scene;

  // Orbitカメラ
  let camera;

  // スプラインカメラ
  let splineCamera;
  let cameraHelper;

  // 注視点
  let targetObject;

  let moveProgress = 0;

  let renderer;
  let orbitControls;

  let lookAtObjects = [];

  // OrbitControl使用フラグ
  let isOrbit = false;

  const CameraAnim = {
    parent: null,
    curve: null,
    tubeGeometry: null,
    normal: new THREE.Vector3(),
    position: new THREE.Vector3(),
    binormal: new THREE.Vector3(),
    direction: new THREE.Vector3(),
    lookAt: new THREE.Vector3(),
  };

  const TargetAnim = {
    parent: null,
    curve: null,
    tubeGeometry: null,
    normal: new THREE.Vector3(),
    position: new THREE.Vector3(),
    binormal: new THREE.Vector3(),
    direction: new THREE.Vector3(),
    lookAt: new THREE.Vector3(),
  };

  /**
   * @description シーンの初期化
   * @param {int,int,int}
   */
  const init = ({
    canvasId,
    width,
    height,
    cameraPosition,
    targetPosition,
  }) => {
    scene = new THREE.Scene();
    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.gammaOutput = true;
    renderer.setClearColor(0xffff00, 1);
    renderer.setSize(width, height);
    renderer.setPixelRatio(
      window.devicePixelRatio ? window.devicePixelRatio : 1
    );
    document.getElementById(canvasId).appendChild(renderer.domElement);

    //カメラ
    camera = new THREE.PerspectiveCamera(84, width / height, 0.01, 1000);
    camera.position.set(cameraPosition.x, cameraPosition.y, cameraPosition.z);
    camera.lookAt({
      x: targetPosition.x,
      y: targetPosition.y,
      z: targetPosition.z,
    });
    camera.up.set(0, 1, 0);
    camera.up = new THREE.Vector3(0, 1, 0);
    scene.add(camera);

    //アニメーションカメラ
    CameraAnim.parent = new THREE.Object3D();
    scene.add(CameraAnim.parent);

    splineCamera = new THREE.PerspectiveCamera(84, width / height, 0.01, 1000);
    splineCamera.lookAt({
      x: targetPosition.x,
      y: targetPosition.y,
      z: targetPosition.z,
    });
    CameraAnim.parent.add(splineCamera);
    cameraHelper = new THREE.CameraHelper(splineCamera);
    scene.add(cameraHelper);

    // 注視オブジェクト
    TargetAnim.parent = new THREE.Object3D();
    scene.add(TargetAnim.parent);
    const geometry = new THREE.SphereGeometry(0.5, 16, 16);
    const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    targetObject = new THREE.Mesh(geometry, material);
    TargetAnim.parent.add(targetObject);
    scene.add(targetObject);

    // カメラの注視点
    lookAtObjects.push(targetObject);

    //ライト
    const light = new THREE.AmbientLight(0xffffff, 1.0);
    scene.background = new THREE.Color(0x202020);
    scene.add(light);

    const axis = new THREE.AxesHelper(200);
    scene.add(axis);
    axis.position.set(0, 0, 0);

    console.log("init");
  };

  /**
   * @description ブラウザのスクロール量 three.js側に渡す
   * @param {float} move
   */
  const setMoveProgress = (move) => {
    moveProgress = move;
  };

  /**
   * @description カメラのアニメーション用のパスを作成してカメラに座標を設定
   * @param {float} t
   */
  const setObjectAnimPathFromTube = (t, target, anim) => {
    anim.tubeGeometry.parameters.path.getPointAt(t, anim.position);
    anim.position.multiplyScalar(1.0);
    const segments = anim.tubeGeometry.tangents.length;
    const pickt = t * segments;
    const pick = Math.floor(pickt);
    const pickNext = (pick + 1) % segments;
    anim.binormal.subVectors(
      anim.tubeGeometry.binormals[pickNext],
      anim.tubeGeometry.binormals[pick]
    );
    anim.binormal
      .multiplyScalar(pickt - pick)
      .add(anim.tubeGeometry.binormals[pick]);
    anim.tubeGeometry.parameters.path.getTangentAt(t, anim.direction);
    // const offset = 0;
    // CameraAnim.normal.copy(anim.binormal).cross(new THREE.Vector3(0, 1, 0));
    CameraAnim.normal.copy(anim.binormal).cross(anim.direction);
    // CameraAnim.normal.copy(anim.binormal);
    // anim.position.add(anim.normal.clone().multiplyScalar(offset));
    target.position.copy(anim.position);
    anim.tubeGeometry.parameters.path.getPointAt(
      (t + 30 / anim.tubeGeometry.parameters.path.getLength()) % 1,
      anim.lookAt
    );
  };

  /**
   * @description レンダリング
   */
  const render = () => {
    const t = moveProgress;

    //パスの座標を取り出す
    if (CameraAnim.tubeGeometry) {
      // Tubeからカメラ移動座標を取り出す
      setObjectAnimPathFromTube(t, splineCamera, CameraAnim);

      // 注視オブジェクト
      const lookatPosition = lookAtObjects[0].position;

      // CameraAnim.lookAt.multiplyScalar(2);
      CameraAnim.lookAt.copy(lookatPosition).add(CameraAnim.direction);

      splineCamera.matrix.lookAt(
        splineCamera.position,
        CameraAnim.lookAt,
        CameraAnim.normal
      );
      splineCamera.quaternion.setFromRotationMatrix(splineCamera.matrix);
      cameraHelper.update();
    }

    //パスの座標を取り出す
    if (TargetAnim.tubeGeometry) {
      // Tubeからカメラ移動座標を取り出す
      setObjectAnimPathFromTube(t, targetObject, TargetAnim);
      targetObject.matrix.lookAt(
        targetObject.position,
        TargetAnim.lookAt,
        TargetAnim.normal
      );
      targetObject.quaternion.setFromRotationMatrix(targetObject.matrix);
    }
    // splineCamera.up.set(0, 0, 1);

    if (isOrbit) {
      renderer.render(scene, camera);
    } else {
      renderer.render(scene, splineCamera);
    }
  };

  const animate = () => {
    requestAnimationFrame(animate);
    render();
  };

  // OrbitControl 未使用
  const setOrbitCont = () => {
    isOrbit = true;
    orbitControls = new OrbitControls(camera, renderer.domElement);
    orbitControls.enableDamping = true; // 視点操作のイージングをONにする
    orbitControls.dampingFactor = 0.2; // 視点操作のイージングの値
    orbitControls.rotateSpeed = 0.3; // 視点変更の速さ
    orbitControls.noZoom = true; // ズーム禁止
    orbitControls.enableZoom = true;
    orbitControls.noPan = false; // パン操作禁止
    orbitControls.enablePan = false;
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

  //シーンのObject追加
  const addObject = ({ radius, segments, position }) => {
    const geometry = new THREE.CircleGeometry(radius, segments);
    const material = new THREE.LineBasicMaterial({ color: 0xff0000 });
    const circle = new THREE.LineLoop(geometry, material);
    scene.add(circle);

    const mesh = new THREE.Mesh(
      new THREE.CylinderGeometry(10, 10, 1, 32),
      new THREE.MeshPhongMaterial({
        color: 0x00ff7f,
      })
    );

    let obj = new THREE.Object3D();
    obj.add(mesh);
    obj.visible = true;
    obj.position.set(position.x, position.y, position.z);
    scene.add(obj);
    camera.lookAt(position);
  };

  // カメラのパスとカーブを作成
  const setCameraPositions = (positions) => {
    let vecPositions = positions.map((point) => {
      return new THREE.Vector3(point.x, point.y, point.z);
    });

    CameraAnim.curve = new THREE.CatmullRomCurve3(vecPositions, false); // 閉じるフラグ

    const points = CameraAnim.curve.getPoints(50);
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.LineBasicMaterial({
      color: 0xff0000,
      transparent: true,
      opacity: 0.3,
    });

    const curveObject = new THREE.Line(geometry, material);
    curveObject.position.set(0.0, 0.0, 0.0);
    CameraAnim.parent.add(curveObject);

    CameraAnim.tubeGeometry = new THREE.TubeGeometry(
      CameraAnim.curve,
      100,
      2,
      1,
      false //カーブを閉じない
    );
    const mesh = new THREE.Mesh(CameraAnim.tubeGeometry, material);
    CameraAnim.parent.add(mesh);
  };

  // 注視点のパスとカーブを作成
  const setTargetPositions = (positions) => {
    let vecPositions = positions.map((point) => {
      return new THREE.Vector3(point.x, point.y, point.z);
    });

    TargetAnim.curve = new THREE.CatmullRomCurve3(vecPositions, false); // 閉じるフラグ

    const points = TargetAnim.curve.getPoints(50);
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.LineBasicMaterial({
      color: 0xff0000,
      transparent: true,
      opacity: 1.0,
    });

    const curveObject = new THREE.Line(geometry, material);
    curveObject.position.set(0.0, 0.0, 0.0);
    TargetAnim.parent.add(curveObject);

    TargetAnim.tubeGeometry = new THREE.TubeGeometry(
      TargetAnim.curve,
      100,
      2,
      1,
      false //カーブを閉じない
    );
    const mesh = new THREE.Mesh(TargetAnim.tubeGeometry, material);
    TargetAnim.parent.add(mesh);
  };

  return {
    //シーンを初期化
    init,
    //アニメーション開始
    animate,
    //Orbit Controlを設定
    setOrbitCont,
    //対象オブジェクトを追加
    addObject,
    //
    addGLTF,
    // カメラの移動パスの作成
    setCameraPositions,
    // カメラの注視点移動パスの作成
    setTargetPositions,
    // スクロール量を設定
    setMoveProgress,
  };
};
