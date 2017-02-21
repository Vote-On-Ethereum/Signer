# Signer
Sign a transaction with a given wallet and contract address.

It will also verify that the transaction data is for the defined contract address.

## Install

```
npm install
```

### Example

```
'use strict';

const Signer = require('signer')

let contractAddress = "0xd89208fd82.........cbf55eba2d",
let wallet = {
	"public": "0x0E1AA9a6f82..........dBeAafE2b22Dc",
	"private": "81353e..........ac98da06b44",
	"maxGas": 3000000
}
let rawTx = {
	"data": "0x9ef120.....................0000000000000000000000000000000000000000000000000000000000000000",
	"gasPrice": "0x4A817C800",
	"nonce": "0x0f",
	"to": "0xd89208fd82.........cbf55eba2d"
}

try {
	let signedTx = Signer(rawTx, {
	 	"contractAddress": contractAddress,
	 	"wallet": wallet
	})
	console.log(signedTx)
}
catch(error) {
	console.log("error", error)
}

```