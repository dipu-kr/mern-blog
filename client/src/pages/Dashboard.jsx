import React, { useEffect, useState, useRef } from "react";
import toast, { Toaster } from "react-hot-toast";
import { axiosInstance2 } from "../constant/baseUrl";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const [img, setImg] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const imgRef = useRef(null);
  const handleImage = () => {
    imgRef.current.click();
  };

  const handleBlogImg = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 3 * 1024 * 1024) {
        toast.error("Image size is more than 3 MB");
        setImg(file);
      } else {
        setImg(file);
      }
    }
  };

  const handleBlogApi = async () => {
    e.preventDefault();
    if (title.trim() === "") {
      toast.error("Title is required");
    } else if (description.trim() === "") {
      toast.error("Description is required");
    } else if (img?.size > 3 * 1024 * 1024) {
      toast.error("Image size is more than 3 MB");
    } else {
      setLoading(true);
      const req = {
        userId: currentUser?._id,
        title: title,
        description: description,
      };

      try {
        const formDataToSend = new FormData();
        Object.keys(req).forEach((key) => {
          formDataToSend.append(key, req[key]);
        });

        formDataToSend.append("photo", img);
        const response = await axiosInstance2.post(
          "/blog-post",
          formDataToSend
        );
        console.log(response);
      } catch (error) {
        toast.error("Error :", error?.message);
        setLoading(false);
      }
    }
  };

  const resetFileInputs = () => {
    document.getElementById("uploadImg").value = null;
  };

  return (
    <div className="w-full min-h-screen">
      <div className="w-full">
        <div className="flex justify-center items-center flex-col py-6 px-4">
          <div className="w-[500px] h-[250px] mt-5 flex justify-center items-center rounded border-2 border-dotted border-gray-400 dark:border-gray-700">
            <p className="capitalize text-gray-400 dark:text-gray-600">
              No image uploaded
            </p>
          </div>
          <div className="w-[500px] my-5">
            <input
              type="file"
              accept="image/*"
              ref={imgRef}
              id="uploadImg"
              onChange={handleBlogImg}
              className="hidden"
            />
            <button
              type="button"
              onClick={handleImage}
              className="w-full uppercase py-3 px-2 rounded border-2 border-gray-300 dark:border-gray-700 text-gray-400 dark:text-gray-600"
            >
              upload Image
            </button>
          </div>
          <div className="w-[500px]">
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="bg-transparent w-full focus:border-indigo-300 py-3 px-2 rounded border-2 border-gray-300 dark:border-gray-700 text-gray-400 dark:text-gray-600 outline-none"
            />
          </div>
          <div className="w-[500px] py-5">
            <textarea
              rows="8"
              cols="50"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description..."
              className="bg-transparent resize-none w-full focus:border-indigo-300 py-1 px-2 rounded border-2 border-gray-300 dark:border-gray-700 text-gray-400 dark:text-gray-600 outline-none"
            />
          </div>
          <div className="w-[500px]">
            <button onClick={handleBlogApi} className="w-full border">
              Post
            </button>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default Dashboard;
