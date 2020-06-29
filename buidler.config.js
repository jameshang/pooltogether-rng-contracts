const {TASK_COMPILE_GET_COMPILER_INPUT} = require('@nomiclabs/buidler/builtin-tasks/task-names');

task(TASK_COMPILE_GET_COMPILER_INPUT).setAction(async (_, __, runSuper) => {
  const input = await runSuper();
  input.settings.metadata.useLiteralContent = false;
  return input;
})

usePlugin('@nomiclabs/buidler-waffle');
usePlugin('buidler-gas-reporter');
usePlugin('solidity-coverage');
usePlugin('@nomiclabs/buidler-etherscan');
usePlugin('buidler-deploy');

module.exports = {
  solc: {
    version: '0.6.6',
    optimizer: {
      enabled: true,
      runs: 200
    },
    evmVersion: 'istanbul'
  },
  paths: {
    artifacts: './build',
    deploy: './deploy',
    deployments: './deployments'
  },
  networks: {
    buidlerevm: {
      blockGasLimit: 200000000,
      allowUnlimitedContractSize: true
    },
    coverage: {
      url: 'http://127.0.0.1:8555',
      blockGasLimit: 200000000,
      allowUnlimitedContractSize: true
    },
    local: {
      url: 'http://127.0.0.1:' + process.env.LOCAL_BUIDLEREVM_PORT || '8545',
      blockGasLimit: 200000000
    }
  },
  gasReporter: {
    currency: 'USD',
    gasPrice: 1,
    enabled: (process.env.REPORT_GAS) ? true : false
  },
  namedAccounts: {
    deployer: {
      default: 0, // local; Account 1
      1: '0x1337c0d31337c0D31337C0d31337c0d31337C0d3', // mainnet
      3: '0x1337c0d31337c0D31337C0d31337c0d31337C0d3', // ropsten
      42: '0x1337c0d31337c0D31337C0d31337c0d31337C0d3', // kovan
    },

    vrfCoordinator: {
      default: 10, // local; Account 11
      1: '0x1337c0d31337c0D31337C0d31337c0d31337C0d3', // mainnet
      3: '0xf720CF1B963e0e7bE9F58fd471EFa67e7bF00cfb', // ropsten
      42: '0xc1031337fe8E75Cf25CAe9828F3BF734d83732e4', // kovan
    },
    linkToken: {
      default: 0,
      1: '0x514910771AF9Ca656af840dff83E8264EcF986CA', // mainnet
      3: '0x20fE562d797A42Dcb3399062AE9546cd06f63280', // ropsten
      42: '0xa36085F69e2889c224210F603D836748e7dC0088', // kovan
    }
  }
};