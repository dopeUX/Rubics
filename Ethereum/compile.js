const path = require('path');
const solc = require('solc');
const fs = require('fs-extra');

const buildPath = path.resolve(__dirname, 'build');
fs.removeSync(buildPath);
const campaignPath = path.resolve(__dirname, 'contracts', 'Rubics.sol');
const source = fs.readFileSync(campaignPath, 'utf8');

var input = {
  language: 'Solidity',
  sources: {
    'Rubics': {
      content: source
    },
    // 'CampaignFactory' :{
    //     content: source
    // }
  },
  settings: {
    outputSelection: {
      '*': {
        '*': ['*']
      }
    }
  }
};
// contractFiles.forEach(function(contract) {
//     if (!contract.endsWith('.sol')) contract += '.sol';
//     const contractPath = __dirname + contract;
//     input.sources[contract] = {content: null};
//     input.sources[contract].content = fs.readFileSync(contractPath, 'UTF-8');
//   });

function findImports(_path) {
  if (_path[0] === '.') {
    return {
      contents: fs.readFileSync(path.join(__dirname, _path)).toString()
    }
  } else {
    return {
      contents: fs.readFileSync(path.join(__dirname, 'node_modules', _path)).toString()
    }
  }
}


const output = JSON.parse(solc.compile(JSON.stringify(input), { import: findImports })).contracts.Rubics;

fs.ensureDirSync(buildPath);

for (let contract in output) {
  console.log(contract)
  fs.outputJsonSync(
    path.resolve(buildPath, contract + '.json'),
    output[contract]
  );
}


