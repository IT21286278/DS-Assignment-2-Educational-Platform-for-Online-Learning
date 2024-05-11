import { useEffect, useRef } from "react";

const UploadWidget = ({ onUpload }) => {
  const cloudinaryRef = useRef();
  const widgetRef = useRef();
  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: "diiyul5rg",
        uploadPreset: "eduRookie",
      },
      (error, result) => {
        if (result.event === "success") {
          console.log(result);
          console.log(result.info.url);
          onUpload(result.info.url);
        }
      }
    );
  }, []);

  return (
    <button
      onClick={() => widgetRef.current.open()}
      className="btn btn-primary"
    >
      Upload Image
    </button>
  );
};

export default UploadWidget;
