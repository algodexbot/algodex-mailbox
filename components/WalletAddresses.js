/*
 * Copyright Algodex VASP (BVI) Corp., 2022
 * All Rights Reserved.
 */

import React, { useCallback, useEffect, useState } from 'react'
import PropTypes from 'prop-types'

//MUI components
import Box from '@mui/material/Box'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import Tooltip from '@mui/material/Tooltip'

// Lib Files
import Helper from '@/lib/helper'

export const WalletAddresses = ({ setWallet, formattedAddresses }) => {
  const [finalAddresses, setFinalAddresses] = useState([])

  useEffect(() => {
    getAddyNames()
  }, [formattedAddresses, getAddyNames])

  const getAddyNames = useCallback(async () => {
    let addresses = []
    for (let address of formattedAddresses) {
      let names = await Helper.getAlgoNamesOrAddress(address, 'getNames')
      addresses.push({
        name: names[0]?.name || null,
        wallet: address,
      })
    }
    setFinalAddresses(addresses)
  }, [formattedAddresses])

  return (
    <Box sx={{ marginTop: finalAddresses.length > 0 ? '1rem' : '0rem' }}>
      <FormControl>
        <RadioGroup
          aria-labelledby="wallet"
          name="wallet"
          onChange={({ target: { value } }) => {
            setWallet(value)
          }}
        >
          {finalAddresses.map((address) => (
            <Tooltip
              placement="top-start"
              key={address.wallet}
              title={address.name ? address.wallet : ''}
            >
              <FormControlLabel
                value={address.wallet}
                control={
                  <Radio color="secondary" data-testid="wallet-radio-input" />
                }
                label={address.name || address.wallet}
              />
            </Tooltip>
          ))}
        </RadioGroup>
      </FormControl>
    </Box>
  )
}

WalletAddresses.propTypes = {
  setWallet: PropTypes.func,
  formattedAddresses: PropTypes.array,
}
export default WalletAddresses
