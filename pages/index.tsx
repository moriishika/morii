import type { NextPage } from "next";
import Head from "next/head";
import styled from "styled-components";
import { Avatar } from "../components";
import { useState, useEffect, useRef } from "react";
import * as THREE from "three";
import Stats from "three/examples/jsm/libs/stats.module";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment";
import { DirectionalLight } from "three";
const WelcomeBanner = styled.div`
  height: 100%;
`;

const TitleBanner = styled.h1`
  font-size: 220px;
  margin: 0;
`;

const DescBanner = styled.h3`
  font-size: 73px;
  margin: 0;
  font-weight: 500;
`;

const MoriiHello = styled(TitleBanner)`
  font-size: 98px;
`;
const MoriiCreator = styled(DescBanner)`
  font-size: 45px;
`;

const MoriiLetter = styled.p`
  font-size: 30px;
  letter-spacing: 3.5px;
`;

const MoriiIntroduction = styled(WelcomeBanner)`
  padding: 10%;
  position: relative;
`;

const PageIndicator = styled.div`
  position: absolute;
  text-align: right;
  font-weight: 500;
  font-size: 20px;
  bottom: 20px;
  right: 30px;
  padding-bottom: 5px;

  &:after {
    content: "";
    border-bottom: 2px solid black;
    position: absolute;
    width: 25%;
    height: 2px;
    bottom: 0px;
    right: 0px;
    transition: width 0.6s;
  }

  &:hover:after {
    width: 100%;
    transition: width 0.6s;
  }
`;

const TopAvatar = styled(Avatar)`
  position: absolute;
  top: 20%;
  right: 20%;
`;

const ShikaaName = styled.b`
  &:hover {
    cursor: pointer;
  }
`;

const BooksContainer = styled.div`
  background-color: black;
  width: 100%;
  height: 100vh;
`;

const Home: NextPage = () => {
  const [isHover, setHoverStatus] = useState<Boolean>(false);
  const containerRef = useRef(null);
  useEffect(() => {
    let mixer;

    const clock = new THREE.Clock();
    const container = containerRef;
    const light = new DirectionalLight(0xf403fc);

    // const stats = new Stats();
    // container.current.appendChild(stats.dom);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.outputEncoding = THREE.sRGBEncoding;
    container.current.replaceChild(
      renderer.domElement,
      container.current.children[0]
    );

    const pmremGenerator = new THREE.PMREMGenerator(renderer);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);
    scene.environment = pmremGenerator.fromScene(
      new RoomEnvironment(),
      0.04
    ).texture;

    const camera = new THREE.PerspectiveCamera(
      40,
      window.innerWidth / window.innerHeight,
      1,
      100
    );
    camera.position.set(5, 5, 8);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(0, 0.5, 0);
    controls.update();
    controls.enablePan = false;
    controls.enableDamping = true;
    controls.enableZoom = false;

    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath("js/libs/draco/gltf/");

    const loader = new GLTFLoader();
    loader.setDRACOLoader(dracoLoader);
    loader.load(
      "models/scene.gltf",
      function (gltf) {
        const model = gltf.scene;
        model.position.set(0.5, 0.6, 0);
        model.scale.set(0.02, 0.02, 0.02);
        model.castShadow = true;
        model.receiveShadow = true;
        scene.add(model);

        mixer = new THREE.AnimationMixer(model);

        animate();
      },
      undefined,
      function (e) {
        console.error(e);
      }
    );

    window.onresize = function () {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();

      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    function animate() {
      requestAnimationFrame(animate);

      const delta = clock.getDelta();

      mixer.update(delta);

      controls.update();

      // stats.update();

      
      renderer.render(scene, camera);
    }
  }, []);

  return (
    <>
      <Head>
        <title>Morii</title>
      </Head>
      <WelcomeBanner className="flex flex-column x-center y-center">
        <TitleBanner>Morii.</TitleBanner>
        <DescBanner>A place for you to lean on tired day</DescBanner>
      </WelcomeBanner>
      <MoriiIntroduction className="flex y-center">
        <div>
          <MoriiHello>Hello</MoriiHello>
          <MoriiCreator>
            My name is{" "}
            <ShikaaName
              onMouseEnter={() => setHoverStatus(true)}
              onMouseLeave={() => setHoverStatus(false)}
            >
              Morii Shikaa
            </ShikaaName>
          </MoriiCreator>
          <MoriiLetter>
            The Creator of the forest full of pages <br />
            filled with the outpouring of hearts and thoughts. <br />
            <br />
            The pages that have been provided in this forest are <br />
            intended for everyone who just wants to visit, relax and <br />
            just want to know what&apos;s on the mind of a loner at night.
            <br />
            <br />
            I hope you like this forest and visit this place anew in whatever
            <br />
            condition your heart is in. Nice to know you, hope you like <br />
            this forest and thank you for visiting or even intend <br />
            to come back.
          </MoriiLetter>
        </div>
        {isHover && (
          <div>
            <TopAvatar src="/moriishikaa.png"></TopAvatar>
            <h4>Hai, welcome my name is morii!</h4>
          </div>
        )}
        <PageIndicator>
          warm welcome from <br />
          the forest
        </PageIndicator>
      </MoriiIntroduction>
      <BooksContainer ref={containerRef}>
        <div></div>
      </BooksContainer>
    </>
  );
};

export default Home;
