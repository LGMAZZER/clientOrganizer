import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const processoId = req.params.id;
        const uploadPath = `public/uploads/processo_${processoId}`;
        
        // Cria o diretório se não existir
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }
         
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        const uniqueName = `${uuidv4()}${path.extname(file.originalname)}`;
        cb(null, uniqueName);
    }
});

export const upload = multer({ 
    storage,
    limits: { fileSize: 500 * 1024 * 1024 }, 
    fileFilter: (req, file, cb) => {
        
        const allowed = ['.pdf', '.doc', '.docx', '.jpg', '.png'];
        const ext = path.extname(file.originalname).toLowerCase();
        if (allowed.includes(ext)) {
            cb(null, true);
        } else {
            cb(new Error('Tipo de arquivo não permitido'));
        }
    }
});