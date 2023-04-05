import { useRef } from "react";
import { useSelector } from "react-redux";
import photo from "@assets/images/photo.png";
import gif from "@assets/images/gif.png";
import feeling from "@assets/images/feeling.png";
import Input from "@components/input/Input";
import useDetectOutsideClick from "@hooks/useDetectOutsideClick";
import Feelings from "@components/feelings/Feelings";

function ModalBoxSelection() {
  const { feelingsIsOpen } = useSelector((state) => state.modal);
  // const { post } = useSelector((state) => state.post);
  const feelingsRef = useRef(null);
  const fileInputRef = useRef();
  const [toggleFeelings, setToggleFeelings] = useDetectOutsideClick(feelingsRef, feelingsIsOpen);
  // const dispatch = useDispatch();

  const fileInputClicked = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    console.log(event.target.files[0]);
  };

  return (
    <>
      {toggleFeelings && (
        <div ref={feelingsRef}>
          <Feelings />
        </div>
      )}
      <div className="modal-box-selection" data-testid="modal-box-selection">
        <ul className="post-form-list" data-testid="list-item">
          <li className="post-form-list-item image-select" onClick={fileInputClicked}>
            <Input
              name="image"
              type="file"
              className="file-input"
              ref={fileInputRef}
              onClick={() => {
                if (fileInputRef.current) {
                  fileInputRef.current.value = null;
                }
              }}
              handleChange={handleFileChange}
            />
            <img src={photo} alt="" /> Photo
          </li>
          <li className="post-form-list-item">
            <img src={gif} alt="" /> Gif
          </li>
          <li className="post-form-list-item" onClick={() => setToggleFeelings(!toggleFeelings)}>
            <img src={feeling} alt="" /> Feeling
          </li>
        </ul>
      </div>
    </>
  );
}

export default ModalBoxSelection;
