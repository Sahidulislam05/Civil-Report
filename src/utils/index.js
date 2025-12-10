import axios from "axios";

export const imageUpload = async (imageData) => {
  try {
    const formData = new FormData();
    formData.append("image", imageData);

    const { data } = await axios.post(
      `https://api.imgbb.com/1/upload?key=${
        import.meta.env.VITE_IMGBB_API_KEY
      }`,
      formData
    );

    console.log("IMGBB Response:", data);

    if (data?.success) {
      return data.data.display_url;
    } else {
      throw new Error("Image upload failed");
    }
  } catch (err) {
    console.error("Image Upload Error:", err);
    throw err;
  }
};

export const saveUser = async (userData) => {
  const { data } = await axios.post(
    `${import.meta.env.VITE_API_URL}/user`,
    userData
  );
  return data;
};
