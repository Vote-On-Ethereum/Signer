'use strict';

const ethSigner = require('ethjs-signer')
const ethUtil = require('ethjs-util')

let isValidAddress = function (address) {
  return /^0x[0-9a-fA-F]{40}$/i.test(address)
}
let addHexPrefix = function (str) {
  if (typeof str !== 'string') {
    return str
  }
  return ethUtil.isHexPrefixed(str) ? str : '0x' + str
}

module.exports = (rawTx, param) => {
  //Check rawTxd
  if (rawTx === undefined || rawTx === {}) {
    throw("rawTx is undefined or empty")
  }
  if (rawTx.to === undefined) {
    throw("rawTx.to is undefined")
  }
  if (rawTx.data === undefined) {
    throw("rawTx.data is undefined")
  }
  if (rawTx.gasPrice === undefined) {
    throw("rawTx.gasPrice is undefined")
  }
  if (rawTx.nonce === undefined) {
    throw("rawTx.nonce is undefined")
  }

  //Check param
  if (param === undefined || param === {}) {
    throw("param is undefined or empty")
  }
  if (param.contractAddress === undefined) {
    throw("param.contractAddress is undefined")
  }
  if (isValidAddress(param.contractAddress) === false) {
    throw("param.contractAddress is not a valid address")
  }
  if (param.wallet === undefined || param.wallet === {}) {
    throw("param.wallet is undefined or empty")
  }
  if (param.wallet.public === undefined) {
    throw("param.wallet.public is undefined")
  }
  if (isValidAddress(param.wallet.public) === false) {
    throw("param.wallet.public is not a valid address")
  }
  if (param.wallet.private === undefined) {
    throw("param.wallet.private is undefined")
  }
  if (param.wallet.maxGas === undefined) {
    throw("param.wallet.maxGas is undefined")
  }

  //check authorization
  if (rawTx.to !== param.contractAddress) {
    throw("rawTx.to is not same as here")
  }

  //replace rawTx data
  rawTx.from = param.wallet.public
  rawTx.gas = param.wallet.maxGas

  //sign
  const privateKey = addHexPrefix(param.wallet.private)
  let signedTx = ethSigner.sign(rawTx, privateKey)
  return signedTx
}
