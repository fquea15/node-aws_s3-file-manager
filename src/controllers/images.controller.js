import { getFileURL, getFiles, uploadFile } from "../services/s3.service.js";

const getImages = async (req, res) => {
  const result = await getFiles();
  return res.status(200).json(result);
};

const postImage = async (req, res) => {
  try {
    const image = req.files?.image;
    const result = await uploadFile(image);
    return res.json(result);
  } catch (error) {
    res.status(500).json({
      error: "Error al suber la imagen",
    });
  }
};

const getImage = async (req, res) => {
  const result = await getFileURL(req.params?.filename);
  return res.status(200).json({
    name: req.params?.filename,
    url: result,
  });
};

export { getImages, postImage, getImage };
