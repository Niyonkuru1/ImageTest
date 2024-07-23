/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unknown-property */
/* eslint-disable react/prop-types */
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";

const DraftForm = () => {
  const initialData = {
    busName: "",
  };

  //   const LinkToTheImageUrl =
  //     "cloudinary://872527953879337:eq-dIp3wzWtPsjpfQpI3QNu78ys@andela-hodal";
  //   const LinkToTheImageUrl = import.meta.env.VITE_IMAGE_URL;
  //   console.log(LinkToTheImageUrl);

  const packFiles = (files) => {
    const data = new FormData();
    [...files].forEach((file) => {
      data.append(`file_name`, file);
    });

    return data;
  };

  const saveImageToCloudinary = async (formData) => {
    const result = await axios.post(
      //   `${LinkToTheImageUrl}/multiple_images-upload`,
      `http://localhost:2000/multiple_images-upload`,
      formData
    );

    return result.data;
  };
  const onSubmit = async (values, { resetForm }) => {
    // To
    // console.log("Inside submit func");
    // console.log(values);
    const formData = packFiles(values.arrayOfImages);

    const dataSaved = saveImageToCloudinary(formData);
   
      await dataSaved;
    
      console.log("After saving the image to cldnry");
      console.log(dataSaved);
      

    resetForm({});
  };

  const validate = Yup.object({
    busName: Yup.string().required("Title is Required, can not be empty"),
  });

  const formik = useFormik({
    initialValues: initialData,
    onSubmit: onSubmit,
    validationSchema: validate,
  });

  return (
    <div
      className="w-screen h-screen flex justify-center items-center absolute bg-black bg-opacity-50"
      data-testid="new-form"
    >
      <div className="w-5/6 sm:w-3/5 h-3/5 sm:h-4/5 md:w-3/5 lg:h-4/5 md:h-4/5 lg:w-2/6 xl:w-1/3 xl:h-4/5 bg-white rounded-md pt-2 md:pt-9 lg:pt-0 box-border">
        {/* <div className="w-5/6 sm:w-3/5 h-2/5 sm:h-3/5 md:w-3/5 lg:h-3/5 md:h-2/5 lg:w-2/6 xl:w-1/3 xl:h-3/5 bg-white rounded-md pt-2 md:pt-9 lg:pt-0 box-border"> */}
        <div className="sm:px-4 px-3">
          <div className="mb-2 font-bold border-b-2 border-solid text-center border-darkBluePhant w-[80%] pt-4">
            Create a New Post
          </div>
        </div>
        <form
          encType="multipart/form-data"
          onSubmit={formik.handleSubmit}
          role="form"
        >
          <div className="flex flex-col pb-1 sm:px-4 px-3">
            <label for="name" className=" my-2 md:my-0  md:py-3 lg:py-2">
              Title of the post
            </label>
            <input
              onChange={formik.handleChange}
              value={formik.values.busName}
              onBlur={formik.handleBlur}
              name="busName"
              id="busName"
              data-testid="name"
              type="text"
              placeholder="Enter the title"
              className="h-8 rounded-sm bg-[#F4F4F4] text-black pl-3"
            />
            {/* conditional rendering of the error message for validating the name input field */}
            {formik.touched.busName && formik.errors.busName ? (
              <div className="text-errorText">{formik.errors.busName}</div>
            ) : null}
          </div>

          <div className="flex flex-col pb-0 sm:px-4 px-3 md:my-5 lg:my-0">
            <label htmlFor="email" className="my-2 md:my-0 md:py-2 lg:py-2">
              Add Photos to this country
            </label>
            <input
              onChange={(e) =>
                formik.setFieldValue("arrayOfImages", e.currentTarget.files)
              }
              name="arrayOfImages"
              data-testid="arrayOfImages"
              type="file"
              required
              multiple
              className="w-full text-sm text-gray-900 pl-2 h-[75%] rounded-md"
            ></input>
          </div>
          <div className="bg-gray-200 px-4 py-2 mt-4 sm:mt-8 md:mt-5 lg:mt-9 rounded-b-md text-left flex">
            <button className="py-2 px-4 bg-gray-500 text-white rounded hover:bg-gray-600 mr-2">
              Back
            </button>
            <button
              type="submit"
              className="py-2 px-4 bg-green-600 text-white rounded hover:bg-green-700 mr-2"
            >
              Save Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DraftForm;
