import AppError from '../utils/exceptions/AppError.js';
import multer from 'multer';
import sharp from 'sharp';
const multerStorage = multer.memoryStorage();
const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
        cb(null, true);
    }
    else {
        cb(new AppError('Not an image! Please upload only images', 400));
    }
};
const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter,
});
export const uploadUserPhoto = upload.single('photo');
export const resizeUserPhoto = (req, res, next) => {
    if (!req.file)
        return next();
    req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`;
    sharp(req.file.buffer)
        .resize(500, 500)
        .toFormat('jpeg')
        .jpeg({ quality: 90 })
        .toFile(`public/img/users/${req.file.filename}`);
    next();
};
//# sourceMappingURL=PhotoController.js.map