import React from 'react'

const UploadContext = React.createContext({
  isUploading: false,
  isCamera: false,
  isOpenModal: false,
  error: null,
  isAnimation: false,
  video: null,
  result: null,
  imageId: '',
  progress: 0,
  setProgress: 0,
  setIsCamera: v => v,
  setUploading: v => v,
  setOpenModal: v => v,
  setError: v => v,
  setResult: v => v,
  setImageId: v => v,
  handleFileUpload: (_: any, b?: boolean) =>  b,
  setVideo: (_: HTMLVideoElement) =>  _,
})

export default UploadContext
