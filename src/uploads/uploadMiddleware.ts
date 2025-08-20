import { Request } from 'express'
import multer, { FileFilterCallback } from 'multer'
import { ValidationError } from 'utils/customError'
const storage = multer.diskStorage({
  destination:(req,file,cb) => cb(null,'src/uploads'),
  filename:(req,file,cb)=> cb(null,Date.now()+ '-' + file.originalname)
})

const fileFilter = (req:Request,file:Express.Multer.File,cb:FileFilterCallback) => {
  const allowedTypes = ['image/jpeg','image/png','application/pdf']
  if(!allowedTypes.includes(file.mimetype)){
      return cb(new ValidationError('Invalid File Type'));
  }
  cb(null,true)
}

export const upload = multer({
  storage,fileFilter,limits : {fileSize:5 * 1024 * 1024}
})