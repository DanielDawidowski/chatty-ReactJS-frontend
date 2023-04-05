import { updatePostItem } from "@redux/reducers/post/post.reducer";

export class ImageUtils {
  static validateFile(file) {
    const validImageTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif"];
    return file && validImageTypes.indexOf(file.type) > -1;
  }

  static checkFileSize(file, type) {
    let fileError = "";
    const isValid = ImageUtils.validateFile(file, type);
    if (!isValid) {
      fileError = `File ${file.name} not accepted`;
    }
    if (file.size > 50000000) {
      // 50 MB
      fileError = "File is too large.";
    }
    return fileError;
  }

  static checkFile(file, type) {
    if (!ImageUtils.validateFile(file, type)) {
      return window.alert(`File ${file.name} not accepted`);
    }
    if (ImageUtils.checkFileSize(file, type)) {
      return window.alert(ImageUtils.checkFileSize(file, type));
    }
  }

  static async addFileToRedux(event, post, setSelectedImage, dispatch, type) {
    const file = event.target.files[0];
    ImageUtils.checkFile(file, type);
    setSelectedImage(file);
    dispatch(
      updatePostItem({
        image: type === "image" ? URL.createObjectURL(file) : "",
        // video: type === "video" ? URL.createObjectURL(file) : "",
        gifUrl: "",
        imgId: "",
        imgVersion: "",
        // videoId: "",
        // videoVersion: "",
        post
      })
    );
  }
}
