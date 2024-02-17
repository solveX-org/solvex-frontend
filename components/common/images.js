import Image from "next/image"

function ImageCont({src, alt, width, height, style, imagestyle}) {
  return (
    <div className={`relative object-contain ${style}`} style={{width: width,  height: height}}>
        <Image 
            fill
            className={imagestyle}
            alt={alt}
            src={src}/>
    </div>
  )
}

export default ImageCont

// ?below is the format for the details from this Component,
// where src refers to the source of the Image in the database, 
// alt refers to the alt Text, 
// width and height refers to the width and height of the containing element which is the width the final image will assume, 
// note that the aspect ratio of the image is not retained and work accordingly, 
// style refers to any additional the image is to carry and should come in the form {height: '2rem', width, 4rem}
{/* <ImageCont
  src={} 
  alt={} 
  width={} 
  height={} 
  style={}/> */}