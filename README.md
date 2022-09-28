# 📫 Algodex Mailbox

[![CI](https://github.com/algodex/algodex-mailbox/actions/workflows/ci.yml/badge.svg)](https://github.com/algodex/algodex-mailbox/actions/workflows/ci.yml)
[![Maintainability](https://api.codeclimate.com/v1/badges/2a30c0c3014ebbacadf8/maintainability)](https://codeclimate.com/repos/6243908fbb490c6f2b0019ea/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/2a30c0c3014ebbacadf8/test_coverage)](https://codeclimate.com/repos/6243908fbb490c6f2b0019ea/test_coverage)

This is a decentralized application on the Algorand blockchain to batch send assets to multiple addresses at once, where they are held in escrow and can be redeemed later. It also supports viewing the transaction history and returning unredeemed assets to the sender.

Mailbox is live here on Mainnet: https://mailbox.algodex.com

Documentation can be found here: https://docs.algodex.com/algodex-mailbox/mailbox-user-guide

Telegram: https://t.me/algodex

Discord: https://discord.gg/qS3Q7AqwF6

Support: https://app.algodex.com/support

## Requirements

Node.js version 16 or greater

## Setup

`cp .env.example .env`

Make sure to edit the .env file to use your Algorand indexer and node.

`yarn`

## Running

`yarn dev`
