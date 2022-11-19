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

/* eslint-disable max-len */
export const FaqQuestions = [
  {
    q: 'What is Algodex Mailbox?',
    a: 'Algodex Mailbox is a decentralized web application that allows users to batch send any Algorand Standard Asset (ASA) to other users even if the recipient is not opted into the ASA. Users who have been sent ASAs through Algodex Mailbox can redeem the ASAs via the website.',
  },
  {
    q: 'How does Algodex Mailbox Work?',
    a: 'Algodex Mailbox uses Algorand smart contracts to create an escrow that holds sent Algorand Standard Assets before they are redeemed. The smart contract escrow exists entirely on the Algorand blockchain so nobody, including Algodex Mailbox, can access the escrow except for the sender and recipient.',
  },
  {
    q: 'What Algorand Standard Assets can be sent using Algodex Mailbox?',
    a: 'All Testnet Algorand Standard Assets (ASA) can be sent via Algodex Mailbox. The ability to send Mainnet ASAs will be available upon Algodex Mailbox’s Mainnet launch.',
  },
  {
    q: 'Are there fees for using Algodex Mailbox?',
    a: 'A fee of 0.05 ALGO is applied to the sender of a transaction for each recipient that redeems the Algorand Standard Assets (ASA) received. If the recipient does not redeem the ASAs, the 0.05 ALGO fee will not be applied. In addition, the Algorand network fee applies to all Algorand transactions.',
  },
  {
    q: 'Who can use Algodex Mailbox?',
    a: 'Users from all countries and regions can use Algodex Mailbox.',
  },
  {
    q: 'What if the recipient of a transaction never redeems the Algorand Standard Assets?',
    a: 'The sender of Algorand Standard Assets (ASA) can reclaim any unredeemed ASAs using Algodex Mailbox’s Return Assets feature. Only the ASA sender can return assets to themselves. ASAs that have been redeemed by the recipient cannot be reclaimed by the sender.',
  },

  {
    q: 'Is Algodex Mailbox safe to use?',
    a: 'Using Algodex Mailbox is secure. Using Algorand smart contracts, all order placements and executions are handled entirely on the Algorand blockchain. Funds or Algorand Standard Assets (ASA) are never directly held or processed by Algodex. Once a recipient redeems any ASAs sent to them via Algodex Mailbox, it is not possible for the sender to reverse the transaction.',
  },
  {
    q: 'What Algorand wallets are supported?',
    a: 'Only My Algo Wallet is supported. Support for Pera Wallet, formally Algorand Wallet, is intended to be added in the future.',
  },
  {
    q: 'What’s the difference between Testnet and Mainnet?',
    a: 'In Testnet, all ASAs are priced in Testnet ALGO and have no real value. Testnet can be used by users to test new features and learn about Algodex Mailbox. On Mainnet, ASAs are priced in real ALGO and have real value.',
  },
  {
    q: 'What if I have an issue or suggestion?',
    a: 'You can submit issues or suggestions to our support page.',
  },
  {
    q: 'How do I use Algodex Mailbox?',
    a: 'Learn to use Algodex Mailbox using our',
    guideLink: true,
  },
  {
    q: 'How many recipients can I send to at one time?',
    a: 'As many as you like! Algodex Mailbox allows you to configure a CSV file to specify the recipient(s) of an Algorand Standard Asset (ASA) and what quantity each recipient should receive. Learn how to send ASAs using a configurable CSV file using our',
    guideLink: true,
  },
  {
    q: 'Where can I follow Algodex and keep up with announcements?',
    a: 'You can follow Algodex on the following social media websites',
    socialLink: true,
  },
]
