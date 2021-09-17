import axios from "axios"
import Response from "./Response";
import ResponseType from "./ResponseType";

export const getAssetOrders = (
  id : number, 
  side : number, 
  assetContractAddress: string,
  order_by: string,
) : Promise<Response> => {
  return axios.get('https://api.opensea.io/wyvern/v1/orders', {
    params: {
      bundled: false,
      include_bundled: false,
      include_invalid: false,
      limit: 1,
      offset: 0,
      order_direction: 'desc',
      order_by: order_by,
      side: side,
      asset_contract_address: assetContractAddress,
      token_id: id
    }
  })
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


