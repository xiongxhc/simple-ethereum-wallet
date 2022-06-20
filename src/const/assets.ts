export enum assetNames {
  USDT = "USDT",
  USDC = "USDC",
  WBTC = "WBTC",
}

export const assets = [
  {
    name: assetNames.USDT,
    contractAddress: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
    dp: 6,
  },
  {
    name: assetNames.USDC,
    contractAddress: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
    dp: 6,
  },
  {
    name: assetNames.WBTC,
    contractAddress: "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599",
    dp: 8,
  },
];
