'use strict';

const EthereumTx = require('ethereumjs-tx')
const ethUtil = require('ethereumjs-util')

module.exports = (rawTx, param) => {
  // Check rawTxd
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
  if (ethUtil.isValidAddress(param.contractAddress) === false) {
    throw("param.contractAddress is not a valid address")
  }
  if (param.wallet === undefined || param.wallet === {}) {
    throw("param.wallet is undefined or empty")
  }
  if (param.wallet.public === undefined) {
    throw("param.wallet.public is undefined")
  }
  if (ethUtil.isValidAddress(param.wallet.public) === false) {
    throw("param.wallet.public is not a valid address")
  }
  if (param.wallet.private === undefined) {
    throw("param.wallet.private is undefined")
  }
  if (param.wallet.maxGas === undefined) {
    throw("param.wallet.maxGas is undefined")
  }
  const privateKey = ethUtil.toBuffer(ethUtil.addHexPrefix(param.wallet.private))
  if (ethUtil.isValidPrivate(privateKey) === false) {
    throw("param.wallet.private is not a valid private key")
  }
  const publicKey = ethUtil.bufferToHex(ethUtil.privateToAddress(privateKey))
  if (param.wallet.public !== publicKey) {
    throw("param.wallet.public is does not match the private key")
  }

  //check authorization
  if (rawTx.to !== param.contractAddress) {
    throw("rawTx.to is not same as contractAddress")
  }


  //replace rawTx data
  rawTx.from = param.wallet.public
  rawTx.gas = param.wallet.maxGas

  //sign
  const tx = new EthereumTx(rawTx)
  tx.sign(privateKey)

  //validate
  let error = tx.validate(true)
  if (error.length > 0) {
    throw error
  }

  const serializedTx = ethUtil.bufferToHex(tx.serialize())
  return serializedTx
}
