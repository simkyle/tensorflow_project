import * as THREE from 'three'
import { flattenFacialLandMarkArray, createBufferAttribute } from './utils/faceMesh'
import WebcamCanvas from './utils/WebcamCanvas'
import ThreeSetUp from './utils/sceneSetUp'
import faceLandMark from './faceLandmark'
import PointCloud from './pointCloud'

class FacePointCloud {
    threeSetUp: ThreeSetUp
    setUpElements: ThreeSetUpElements
    webcamCanvas: WebcamCanvas
    pointCloud: PointCloud
    faceMeshDetector: faceLandMark

    constructor() {
        this.threeSetUp = new ThreeSetUp()
        this.setUpElements = this.threeSetUp.getSetUp()
        this.webcamCanvas = new WebcamCanvas()
        this.faceMeshDetector = new faceLandMark()
        this.pointCloud = new PointCloud()
    }

    async bindFaceDataToPointCloud() {
        const keypoints = await this.faceMeshDetector.detectFace(this.webcamCanvas.canvas)
        const flatData = flattenFacialLandMarkArray(keypoints)
        const facePositions = createBufferAttribute(flatData)
        this.pointCloud.updateProperty(facePositions, 'position')
    }

    async initWork() {
        const { camera, scene, renderer } = this.setUpElements
        camera.position.z = 3
        camera.position.y = 1
        camera.lookAt(0, 0, 0)
        const orbitControlsUpdate = this.threeSetUp.applyOrbitControls()

        const gridHelper = new THREE.GridHelper(10, 10)
        scene.add(gridHelper)
        scene.add(this.pointCloud.cloud)

        await this.faceMeshDetector.loadDetector()

        const animate = () => {
            requestAnimationFrame(animate)
            if (this.webcamCanvas.receivingStreem) this.bindFaceDataToPointCloud()
            this.webcamCanvas.updateFromWebCam()

            orbitControlsUpdate()
            renderer.render(scene, camera)
        }

        animate()
    }
}

new FacePointCloud().initWork()
