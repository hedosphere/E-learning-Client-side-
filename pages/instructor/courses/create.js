//
import Resizer from "react-image-file-resizer";
//
import FormControl from "../../../component/forms/courseCreateF";
import { useState } from "react";
import RequireInstructor from "../../../component/route/requireinstructor";
import { toast } from "react-toastify";
import axios from "axios";
import { useRouter } from "next/router";

//
//

const createCourse = () => {
  const route = useRouter();
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState();
  const [values, setValues] = useState({
    name: "",
    description: "",
    category: "",
    paid: true,
    price: 9.99,
    uploading: false,
    imagePreview: "",
    imageName: "Upload Image",
  });

  //

  const handleRemoveImage = async (e) => {
    //
    e.preventDefault();
    // alert("image remove");
    try {
      setLoading(true);
      //
      //
      const { data } = await axios.post("/api/course/remove-image", {
        object: image,
      });
      setImage({});
      setValues({ ...values, imageName: "Upload Image", imagePreview: "" });
      setLoading(false);
    } catch (err) {
      setLoading(false);

      toast.error("Remove Image Error");
    }
  };
  //

  //
  const handleImage = (e) => {
    e.preventDefault();
    try {
      // setLoading(false);
      setLoading(true);

      let img = e.target.files[0];
      setValues({
        ...values,
        imagePreview: window.URL.createObjectURL(img),
        imageName: img.name,
      });
      Resizer.imageFileResizer(
        img, // file, // Is the file of the image which will resized.
        720, // maxWidth, // Is the maxWidth of the resized new image.,
        500, // maxHeight, // Is the maxHeight of the resized new image.
        "jpeg", // compressFormat, // Is the compressFormat of the resized new image.
        100, // quality, // Is the quality of the resized new image.
        0, // rotation, // Is the degree of clockwise rotation to apply to uploaded image.
        // responseUriFunc, // Is the callBack function of the resized new image URI.
        // outputType, // Is the output type of the resized new image.
        // minWidth, // Is the minWidth of the resized new image.
        // minHeight, // Is the minHeight of the resized new image.
        async (uri) => {
          //
          // console.log(uri.name);
          let { data } = await axios.post("/api/course/upload-image", {
            image: uri,
          });

          setImage(data);
          if (data) setLoading(false);
          console.log(data);
        }
      );
      // if (data) setLoading(false);

      toast("image ok");
    } catch (err) {
      toast("erro with image");
      // setValues({ ...values, loading: false });
      console.log(err);
      setLoading(false);
    }
  };

  //
  const handleValues = (p) => {
    setValues({ ...values, [p.target.name]: p.target.value });
  };

  //
  const handleSubmit = async (p) => {
    //
    // const file=
    p.preventDefault();
    // alert(values.name);
    setLoading(true);
    try {
      const { data } = await axios.post("/api/course/create", {
        ...values,
        image,
      });
      console.log(data);
      setLoading(false);
      toast("Greate!, Now you can contineu adding more course");
      route.push("/instructor");
    } catch (err) {
      console.log(err);
      toast(err.response.data);
      setLoading(false);
    }
  };

  return (
    <>
      <RequireInstructor>
        <h1 className="jumbotron bg-danger"> Create Course</h1>
        <div className="p-1">
          {
            <FormControl
              handleSubmit={handleSubmit}
              handleRemoveImage={handleRemoveImage}
              values={values}
              handleImage={handleImage}
              loading={loading}
              setLoading={setLoading}
              setValues={setValues}
              handleValues={handleValues}
            />
          }
        </div>
        <hr />

        <pre>{JSON.stringify(image, null, 4)} </pre>
      </RequireInstructor>
    </>
  );
};

export default createCourse;
