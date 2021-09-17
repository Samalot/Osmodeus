import stonercats from './stonercats.json';
import omnimorphs from './omnimorphs.json';

export interface configTypes {
  name: string,
  slug: string,
  saveName: string,
  assetContractAddress: string,
  floorAddress: string,
  maxOffer: number,
  minOffer: number,
  minProfit: number,
  offerHours: number,
  walletAddress: string,
  totalAssets: number,
  bidIncrement: number,
  assetCrawl: {
    total: number,
    current: number,
    window: number
  },
  ownedAssets: Array<string>,
  savedData: Array<string>
};

const configs : any = {
  stonercats,
  omnimorphs,
};

export const getConfig = (id : string) : configTypes => configs[id];