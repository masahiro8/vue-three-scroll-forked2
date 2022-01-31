import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export const Scene = () => {
  let scene;
  let camera;
  let hemiLight;
  let renderer;
  let orbitControls;

  const init = ({ canvasId, width, height }) => {
    scene = new THREE.Scene();
    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setClearColor(0xffff00, 1);
    renderer.setSize(width, height);
    renderer.setPixelRatio(
      window.devicePixelRatio ? window.devicePixelRatio : 1
    );
    document.getElementById(canvasId).appendChild(renderer.domElement);

    //カメラ
    camera = new THREE.PerspectiveCamera(83, width / height, 0.1, 1000);
    camera.position.set(50, 50, 100);
    camera.up.set(0, 0, 1);
    camera.lookAt({ x: 0, y: 0, z: 0 });

    //ライト
    hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 1);
    scene.add(hemiLight);
    hemiLight.color.setHSL(0.6, 1, 0.6);
    hemiLight.groundColor.setHSL(0.095, 1, 0.75);
    hemiLight.position.set(0, 500, 0);

    const axis = new THREE.AxesHelper(200);
    scene.add(axis);
    axis.position.set(0, 0, 0);

    // レンダリング
    const nrender = () => {
      renderer.render(scene, camera);
      requestAnimationFrame(nrender);
    };
    nrender();
  };

  const setOrbitCont = () => {
    orbitControls = new OrbitControls(camera, renderer.domElement);
    orbitControls.enableDamping = true; // 視点操作のイージングをONにする
    orbitControls.dampingFactor = 0.2; // 視点操作のイージングの値
    orbitControls.rotateSpeed = 0.3; // 視点変更の速さ
    orbitControls.noZoom = true; // ズーム禁止
    orbitControls.enableZoom = true;
    orbitControls.noPan = false; // パン操作禁止
    orbitControls.enablePan = false;
  };

  // シーンのObject追加
  const addPoint = ({ radius, segments, position }) => {
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

  return {
    init,
    setOrbitCont,
    addPoint,
  };
};
