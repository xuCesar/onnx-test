import React, { useState } from 'react'
import ndarray from 'ndarray';

import Yolo from './components/Yolo'
import './App.css'

const fileToBase64 = (file: File) => {
  if (!file) return ''
  return new Promise((resolve: (value: string) => void, reject: any) => {
    const reader = new FileReader()
    reader.addEventListener('load', ({ target }: any) => {
      resolve(target.result)
    })
    reader.addEventListener('error', (error) => reject(error))
    reader.readAsDataURL(file)
  })
}

function App() {

  const [inputImage, setInputImage] = useState<string>('')

  const mat = ndarray(new Float64Array([1, 0, 0, 1]), [2,2])
  console.log(mat)

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

  const otherHandle = () => {}

  return (
    <div className="App">
      <div className='preview'>
        <img src={inputImage} alt="" />
      </div>
      <div className='output'>
        <Yolo />
      </div>
      <div className='action_bar'>
        <input type='file' onChange={onChange} />
      </div>
    </div>
  )
}

export default App
