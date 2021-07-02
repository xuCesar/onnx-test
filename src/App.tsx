import React, { useState } from 'react'
// import ndarray from 'ndarray';
// import Yolo from './components/Yolo'
import { imageLoader } from './utils'
import image_01 from './assets/1.png'
import './App.css'

const cv = window.cv || {}

function App() {
  const [inputImage, setInputImage] = useState<string>('')
  // const nd = ndarray(new Float64Array([1, 0, 0, 1]), [2,2])
  // console.log(nd)

  const onChange = async (e: any) => {
    const { files } = e.target

    if (files && files[0]) {
      // const url = await fileToBase64(files[0])
      const url = URL.createObjectURL(files[0])
      url && setInputImage(url)
    }

    // other logic handle
    otherHandle()
  }

  const face2 = (image: { rows: any; cols: any; type: () => any; }, value1: number | null | undefined, value2: number | null | undefined) => {
      let dst = new cv.Mat();
      if(value1 == null || value1 == undefined)	value1 = 3;//磨皮系数
      if(value2 == null || value2 == undefined)	value2 = 1;//细节系数 0.5 - 2
  
      var dx = value1 * 5;//双边滤波参数
      var fc = value1 * 12.5;//参数
      var p = 0.1;//透明度
  
      let temp1 = new cv.Mat(), temp2 = new cv.Mat(), temp3 = new cv.Mat(), temp4 = new cv.Mat();
  
      cv.cvtColor(image, image, cv.COLOR_RGBA2RGB, 0);
  
      cv.bilateralFilter(image, temp1, dx, fc, fc);//bilateralFilter(Src)
  
      let temp22 = new cv.Mat();
      cv.subtract(temp1, image, temp22);//bilateralFilter(Src) - Src
  
      cv.add(temp22, new cv.Mat(image.rows, image.cols, image.type(), new cv.Scalar(128, 128, 128, 128)), temp2);//bilateralFilter(Src) - Src + 128
  
      cv.GaussianBlur(temp2, temp3, new cv.Size(2 * value2 - 1, 2 * value2 - 1), 0, 0);
      //2 * GuassBlur(bilateralFilter(Src) - Src + 128) - 1
  
      let temp44 = new cv.Mat();
      temp3.convertTo(temp44, temp3.type(), 2, -255);
      //2 * GuassBlur(bilateralFilter(Src) - Src + 128) - 256
  
      cv.add(image, temp44, temp4);
      cv.addWeighted(image, p, temp4, 1-p, 0.0, dst);
      //Src * (100 - Opacity)
      
      cv.add(dst, new cv.Mat(image.rows, image.cols, image.type(), new cv.Scalar(10, 10, 10, 0)), dst);
      //(Src * (100 - Opacity) + (Src + 2 * GuassBlur(bilateralFilter(Src) - Src + 128) - 256) * Opacity) /100
  
      return dst;
  }

  const onClick = async () => {

    setInputImage(image_01)

    const img = await imageLoader(image_01)
    if (img) {
      console.log('%c 🍒 cv: ', 'font-size:20px;background-color: #2EAFB0;color:#fff;', cv);
      let mat = cv.imread(img)
      console.log('%c 🍒 mat: ', 'font-size:20px;background-color: #E41A6A;color:#fff;', mat);
      mat = face2(mat, 4, 3);
      console.log('%c 🥖 mat: ', 'font-size:20px;background-color: #42b983;color:#fff;', mat);
      cv.imshow('canvasOutput', mat);
      mat.delete();
    }
  }

  return (
    <div className="App">
      <div className='imageBox'>
        <section>
          <h2>Input image</h2>
          <div className='preview'>
            <img src={inputImage} alt="" />
          </div>
        </section>
        <hr />
        <section>
          <h2>Output image</h2>
          <div className="inputoutput">
            <canvas id="canvasOutput" ></canvas>
          </div>
        </section>
      </div>

      <button onClick={onClick}>处理图片</button>
    </div>
  )
}

export default App

