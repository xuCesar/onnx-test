import React, { useEffect } from 'react'
import { Tensor } from 'onnxjs'

declare type YoloProps = {
  ctx: CanvasRenderingContext2D
}

const Yolo: React.FC<YoloProps> = (props: YoloProps) => {

  const { ctx } = props

  const handleCtxpreprocess = () => {
    console.log('%c 🍅 ctx: ', 'font-size:20px;background-color: #FFDD4D;color:#fff;', ctx);
  }

  useEffect(() => {
    
    handleCtxpreprocess()

  }, [handleCtxpreprocess])

  return (
    <div className='yolo'>
      {/* <canvas /> */}
    </div>
  )
}

export default Yolo