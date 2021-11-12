import axios from "axios";

export const getHttp = async (path: string) => {
  const response = await axios.get(path, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response?.data;
};
