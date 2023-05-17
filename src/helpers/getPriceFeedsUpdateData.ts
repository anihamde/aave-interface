// import { EvmPriceServiceConnection } from '@pythnetwork/pyth-evm-js';

// async function getPriceFeedsUpdateData(assets: string[]) {
//   const connection = new EvmPriceServiceConnection('https://xc-testnet.pyth.network/api', {
//     logger: console,
//   });

//   const priceIDs: string[] = [];
//   for (let i = 0; i < assets.length; i++) {
//     priceIDs.push(await aaveOracle.getSourceOfAsset(assets[i]));
//   }

//   const updateData = await connection.getPriceFeedsUpdateData(priceIDs);

//   return updateData;
// }
