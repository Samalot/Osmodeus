import axios from "axios"
import Response from "./Response";
import ResponseType from "./ResponseType";

export const getCollections = (
  contract : string, 
  limit : number = 100, 
  offset : number = 0,
  assetContractAddress: string,
) : Promise<Response> => {
  return axios.get('https://api.opensea.io/api/v1/collections', {
    params: {
      offset,
      limit,
      asset_owner: contract
    }
  })
  .then(response => {
    let data : any;
    response.data.forEach(element => {
      if (
        element.primary_asset_contracts
        && element.primary_asset_contracts.length > 0
        && element.primary_asset_contracts[0].address
        && element.primary_asset_contracts[0].address === assetContractAddress
      ) {
        data = element.stats;
      }
    });

    if (data) {
      return new Response({
        count: data.count,
        floor: data.floor_price,
      }, ResponseType.SUCCSESS, "");
    } else {
      return new Response({}, ResponseType.ERROR, "Collection not found");
    }
  })
  .catch(error => {
    if (error && error.response && error.response.statusText) {
      return new Response({}, ResponseType.ERROR, error.response.statusText);
    }
    return new Response({}, ResponseType.ERROR, error);
  });
};


