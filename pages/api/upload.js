import nextConnect, {createRouter} from "next-connect";
import multer from "multer";
// import { promises as fs } from "fs";
// import path from "path";

const upload = multer({
    storage: multer.diskStorage({
        destination: "./public/uploads",
        filename: (req, file, cb) => {
            cb(null, `${Date.now()}-${file.originalname}`)
        },
    }),
});

// const apiRoute = nextConnect({
//     onError(error, req, res) {
//         res.status(501).json({ error: `Something went wrong! ${error.message}` })
//     },
//     onNoMatch(req, res) {
//         res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
//     },
// });

// apiRoute.use(upload.single('file'));

// apiRoute.post(async (req, res) => {
//   const file = req.file;
//   res.status(200).json({ message: 'File uploaded successfully', filePath: `/uploads/${file.filename}` });
// });


const apiRoute = createRouter();
apiRoute.use(upload.single('file'));

apiRoute.post(async (req, res) => {
      const file = req.file;
      res.status(200).json({ message: 'File uploaded successfully', filePath: `/uploads/${file.filename}`, newFileName: file.filename });
    });


export default apiRoute.handler();

export const config = {
  api: {
    bodyParser: false,
  },
};