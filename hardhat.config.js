require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.18",
  paths: {
    artifacts: './src/artifacts',
  },
  networks: {
    hardhat: {
      chainId: 1337
    },
    alchemy: {
      url: "https://eth-mainnet.g.alchemy.com/v2/GYofHyZu3PYbWHJSzYLf2yoiH8_DuklB",
      accounts: [`0x071591a6119363260cd1549a770416997f612bd06eda2a34b421935813ac6aa6`]
    }
  }
};
