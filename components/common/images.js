import Image from "next/image"

function ImageCont({src, alt, width, height, style}) {
  return (
    <div className={`${style} relative object-contain`} style={{width: width, height: height}}>
        <Image 
            fill
            alt={alt}
            src={src}/>
    </div>
  )
}

export default ImageCont