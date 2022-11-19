/* 
 * Algodex Mailbox 
 * Copyright (C) 2022 Algodex VASP (BVI) Corp.
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.

 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */


////////////////////////////////////////////////
// Alexander Trefonas                         //
// Copyright Algodex VASP (BVI) Corp., 2022   //
// All Rights Reserved.                       //
////////////////////////////////////////////////

// TODO: add new transaction to send note to receiver
const escrowTemplate = {

  getTealTemplate : function () {

    return `
#pragma version 5

/////////////////////////////////
// CHECKS THAT APPLY TO ALL TXNS
////////////////////////////////

global MinTxnFee
global MinTxnFee
+
store 7 //store 2x fee

global GroupSize
int 4
<=
assert

txn Fee
load 7 //fee must be less or equal to 2x the minimum
<=
assert

txn Sender // escrow address
addr <senderAddr>
!=
assert
txn Sender // escrow address
addr <receiverAddr>
!=
assert
txn Sender // escrow address
addr <feeReceiverAddr>
!=
assert

int 0
store 9

checkAllTxns: // This is basically a for loop that checks all transactions
load 9
gtxns RekeyTo
global ZeroAddress
==
assert
load 9
gtxns AssetSender
global ZeroAddress
==
assert
load 9
int 1
+
store 9
load 9
global GroupSize
<
bnz checkAllTxns


global GroupSize
int 2
==
bnz redeemFunds

global GroupSize
int 3
==
bnz fundWithoutNote

// FUND WITH NOTE
// TXN 0 - FUNDER TO ESCROW: pay algo minimum balance into escrow
// TXN 1 - ESCROW TO ESCROW: asset opt-in
// TXN 2 - FUNDER TO ESCROW: asset transfer
// TXN 3 - ESCROW TO RECIPIENT: 0 amount pay. Note to receiver that the escrow was funded

global GroupSize
int 4
==
gtxn 0 Fee
global MinTxnFee
==
&&
gtxn 1 Fee
global MinTxnFee
==
&&
gtxn 2 Fee
load 7 // 2x fee to pay for txn 3
==
&&
gtxn 3 Fee
int 0 // paid by txn 2 fee
==
&&
gtxn 0 Sender
addr <senderAddr> // sender address for this escrow
==
&&
gtxn 1 Sender
txn Sender
== // from escrow
&&
gtxn 2 Sender
addr <senderAddr> // sender address for this escrow
==
&&
gtxn 3 Sender
txn Sender
== // from escrow
&&
gtxn 0 Amount
int 250000
==
&&
gtxn 1 AssetAmount
int 0
==
&&
gtxn 2 AssetAmount
int 1
>=
&&
gtxn 3 Amount
int 0
==
&&
gtxn 0 CloseRemainderTo
global ZeroAddress
==
&&
gtxn 1 AssetCloseTo
global ZeroAddress
==
&&
gtxn 2 AssetCloseTo
global ZeroAddress
==
&&
gtxn 3 CloseRemainderTo
global ZeroAddress
==
&&
gtxn 0 Receiver
txn Sender //Escrow
==
&&
gtxn 1 AssetReceiver
txn Sender //Escrow
==
&&
gtxn 2 AssetReceiver
txn Sender //Escrow
==
&&
gtxn 3 Receiver
addr <receiverAddr> // receiver address for this escrow
==
&&
gtxn 0 TypeEnum
int pay
==
&&
gtxn 1 TypeEnum
int axfer
==
&&
gtxn 2 TypeEnum
int axfer
==
&&
gtxn 3 TypeEnum
int pay
==
&&
gtxn 1 XferAsset
int <assetId> // asset id to fund
==
&&
gtxn 2 XferAsset
int <assetId> // asset id to fund
==
&&
assert

int 1
return

fundWithoutNote:
// FUND WITHOUT NOTE
// TXN 0 - FUNDER TO ESCROW: pay algo minimum balance into escrow
// TXN 1 - ESCROW TO ESCROW: asset opt-in
// TXN 2 - FUNDER TO ESCROW: asset transfer

global GroupSize
int 3
==
gtxn 0 Fee
global MinTxnFee
==
&&
gtxn 1 Fee
global MinTxnFee
==
&&
gtxn 2 Fee
global MinTxnFee
==
&&
gtxn 0 Sender
addr <senderAddr> // sender address for this escrow
==
&&
gtxn 1 Sender
txn Sender
== // from escrow
&&
gtxn 2 Sender
addr <senderAddr> // sender address for this escrow
==
&&
gtxn 0 Amount
int 250000
==
&&
gtxn 1 AssetAmount
int 0
==
&&
gtxn 2 AssetAmount
int 1
>=
&&
gtxn 0 CloseRemainderTo
global ZeroAddress
==
&&
gtxn 1 AssetCloseTo
global ZeroAddress
==
&&
gtxn 2 AssetCloseTo
global ZeroAddress
==
&&
gtxn 0 Receiver
txn Sender //Escrow
==
&&
gtxn 1 AssetReceiver
txn Sender //Escrow
==
&&
gtxn 2 AssetReceiver
txn Sender //Escrow
==
&&
gtxn 0 TypeEnum
int pay
==
&&
gtxn 1 TypeEnum
int axfer
==
&&
gtxn 2 TypeEnum
int axfer
==
&&
gtxn 1 XferAsset
int <assetId> // asset id to fund
==
&&
gtxn 2 XferAsset
int <assetId> // asset id to fund
==
&&
bz returnToSender

int 1
return

returnToSender:
// RETURN TO SENDER
// TXN 0 - ESCROW TO RECIPIENT: close out asset
// TXN 1 - ESCROW TO RECIPIENT: close out algos
// TXN 2 - SENDER TO SENDER: 0 send for proof of sender 

global GroupSize
int 3
==
gtxn 0 Fee
global MinTxnFee
==
&&
gtxn 1 Fee
global MinTxnFee
==
&&
gtxn 2 Fee
global MinTxnFee
==
&&
gtxn 0 Sender
txn Sender
==
&&
gtxn 1 Sender
txn Sender
==
&&
gtxn 2 Sender
addr <senderAddr> // sender address
==
&&
gtxn 0 AssetAmount
int 0
==
&&
gtxn 1 Amount
int 0
==
&&
gtxn 2 Amount
int 0
==
&&
gtxn 0 AssetCloseTo
addr <senderAddr> // sender address
==
&&
gtxn 1 CloseRemainderTo
addr <senderAddr> // sender address
==
&&
gtxn 2 CloseRemainderTo
global ZeroAddress
==
&&
gtxn 0 AssetReceiver
addr <senderAddr> // sender address
==
&&
gtxn 1 Receiver
addr <senderAddr> // sender address
==
&&
gtxn 2 Receiver
addr <senderAddr> 
==
&&
gtxn 0 TypeEnum
int axfer
==
&&
gtxn 1 TypeEnum
int pay
==
&&
gtxn 2 TypeEnum
int pay
==
&&
gtxn 0 XferAsset
int <assetId> // asset id to fund
==
&&
assert

int 1
return


redeemFunds:

// REDEEM
// TXN 0 - ESCROW TO RECIPIENT: close out asset
// TXN 1 - ESCROW TO RECIPIENT: close out algos

global GroupSize
int 2
==
txn Fee
global MinTxnFee
==
&&
gtxn 0 Sender
txn Sender
==
&&
gtxn 1 Sender
txn Sender
==
&&
gtxn 0 AssetAmount
int 0
==
&&
gtxn 1 Amount
int 50000 // .05 algos
==
&&
gtxn 0 AssetCloseTo
addr <receiverAddr> // receiver address for this escrow
==
&&
gtxn 1 CloseRemainderTo
addr <senderAddr> // sender address for this escrow
==
&&
gtxn 0 AssetReceiver
addr <receiverAddr> // receiver address for this escrow
==
&&
gtxn 1 Receiver
addr <feeReceiverAddr> // fee receiver address for this escrow
==
&&
gtxn 0 TypeEnum
int axfer
==
&&
gtxn 1 TypeEnum
int pay
==
&&
gtxn 0 XferAsset
int <assetId> // asset id to fund
==
&&
bz notRedeem

int 1
return

notRedeem:

// ADD MORE FUNDS
// TXN 0 - FUNDER TO ESCROW: asset transfer
// TXN 1 - ESCROW TO RECIPIENT: 0 amount pay. Note to receiver that the escrow was funded

global GroupSize
int 2
==
gtxn 0 Fee
load 7 // 2x fee to pay for txn 3
==
&&
gtxn 1 Fee
int 0 // paid by txn 2 fee
==
&&
gtxn 0 Sender
addr <senderAddr> // sender address
==
&&
gtxn 1 Sender
txn Sender
== // from escrow
&&
gtxn 0 AssetAmount
int 1
>=
&&
gtxn 1 Amount
int 0
==
&&
gtxn 0 AssetCloseTo
global ZeroAddress
==
&&
gtxn 1 CloseRemainderTo
global ZeroAddress
==
&&
gtxn 0 AssetReceiver
txn Sender //Escrow
==
&&
gtxn 1 Receiver
addr <receiverAddr> // receiver address for this escrow
==
&&
gtxn 0 TypeEnum
int axfer
==
&&
gtxn 1 TypeEnum
int pay
==
&&
gtxn 0 XferAsset
int <assetId> // asset id to fund
==
&&
assert

int 1
return

`
  }

}

module.exports = escrowTemplate
