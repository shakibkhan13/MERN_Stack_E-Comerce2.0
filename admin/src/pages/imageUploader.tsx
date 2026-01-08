import React, { useEffect, useState } from 'react'


interface ImageUploadProps{
    value: string;
    onChange: (base64: string) => void; 
    disable?: boolean; 
}

const imageUploader = ({ value, onChange, disable }: ImageUploadProps) => {
    
    const [preview, setPreview] = useState<string | null>(null); 


    useEffect(() => {
      if (Value) {
        setPreview(value)
      }
    }, [value])

  return (
    <div>
      
    </div>
  )
}

export default imageUploader
