interface range {
    from: number
    to: number
}

type ScreenRange = {
    height: range
    width: range
}

interface vector {
    x: number
    y: number
    z: number
}
interface vector2 {
    x: number
    y: number
}

interface axises {
    [key: string]: number
}

interface TwoDimensions {
    x: number
    y: number
}

interface eyePos {
    left: TwoDimensions
    right: TwoDimensions
}

interface rotationReturn {
    radian: number
    angle: number
}

interface FaceLandmarkBox {
    height: number
    width: number
    xMax: number
    xMin: number
    yMax: number
    yMin: number
}

interface FaceLandmark {
    keypoints: vector[]
    box: FaceLandmarkBox
}

interface Sizes {
    height: number
    width: number
}

interface ThreeSetUpElements {
    camera: THREE.PerspectiveCamera
    scene: THREE.Scene
    renderer: THREE.WebGLRenderer
    sizes: Sizes
}
