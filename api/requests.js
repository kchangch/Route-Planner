import axios from "axios";

const authenticatedSharedRequest = axios.create();
const API_KEY =
  "An-M9Xapv_1uHmLvgNXgpT35zIQW3Awc3IFwKW-widjHmzJB10nE8U1I1D404pzV";
const baseURL = "http://dev.virtualearth.net/REST/v1/Routes";

authenticatedSharedRequest.interceptors.request.use(
  async (config) => {
    config.headers["authorization"] = `Bearer ${API_KEY}`;
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

const getDistanceMatrix = async (origins, destinations) => {
  const parameters = {
    origins: origins.toString(),
    destinations: destinations.toString(),
    key: API_KEY,
  };
  const response = await axios
    .get(`https://dev.virtualearth.net/REST/v1/Routes/DistanceMatrix`, {
      params: parameters,
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
          key: API_KEY,
        },
      }
    )
    .then((response) => {
      return response.data;
    });

  return response;
};

export { getDistanceMatrix, getCoords };
