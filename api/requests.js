import axios from "axios";
import config from "../config";

const authenticatedSharedRequest = axios.create();
const baseURL = "http://dev.virtualearth.net/REST/v1/Routes";

authenticatedSharedRequest.interceptors.request.use(
  async (config) => {
    config.headers["authorization"] = `Bearer ${config.API_KEY}`;
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

const getDistanceMatrix = async (origins) => {
  const body = {
    origins: origins,
    travelMode: "driving",
  };
  const headers = {
    "Content-Length": "450",
    "Content-Type": "application / json",
  };
  const response = await axios
    .post(`https://dev.virtualearth.net/REST/v1/Routes/DistanceMatrix`, body, {
      headers: headers,
      params: {
        key: config.API_KEY,
      },
    })
    .then((response) => {
      return response.data;
    });

  return response;
};

const getCoords = async (location) => {
  console.log(location);
  const response = await axios
    .get(
      `https://dev.virtualearth.net/REST/v1/Locations/${location
        .trim()
        .replace(" ", "%")}`,
      {
        params: {
          key: config.API_KEY,
        },
      }
    )
    .then((response) => {
      return response.data;
    });

  return response;
};

export { getDistanceMatrix, getCoords };
