import axios from "axios"
import Response from "./Response";
import ResponseType from "./ResponseType";

export const getAsset = (
  id : number, 
  assetContractAddress: string,
) : Promise<Response> => {
  return axios.get(`https://api.opensea.io/api/v1/asset/${assetContractAddress}/${id}/`)
  .then(response => {
    return new Response(response.data, ResponseType.SUCCSESS, "");
  })
  .catch(error => {
    if (error && error.response && error.response.statusText) {
      return new Response({}, ResponseType.ERROR, error.response.statusText);
    }
    return new Response({}, ResponseType.ERROR, error);
  });
};
