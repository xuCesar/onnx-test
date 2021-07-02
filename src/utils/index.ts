export const fileToBase64 = (file: File) => {
  if (!file) return false
  return new Promise((resolve: (value: string) => void, reject: any) => {
    const reader = new FileReader()
    reader.addEventListener('load', ({ target }: any) => {
      resolve(target.result)
    })
    reader.addEventListener('error', (error) => reject(error))
    reader.readAsDataURL(file)
  })
}

export const imageLoader = (src: string) => {
  if (!src) return false
  return new Promise((resolve: (value: string) => void, reject: any) => {
    const image = new Image()
    image.addEventListener('load', ({ target }: any) => {
      resolve(target)
    })
    image.addEventListener('error', (error) => reject(error))
    image.src = src
  })
}