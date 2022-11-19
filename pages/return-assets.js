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

/*
 * Copyright Algodex VASP (BVI) Corp., 2022
 * All Rights Reserved.
 */

import React, { useEffect, useMemo, useState } from 'react'
import { defaults } from 'next-i18next.config'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Head from 'next/head'

// MUI Components
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import Container from '@mui/material/Container'

// Custom Components
import Link from '@/components/Nav/Link'
import ReturnAssetForm from '@/components/ReturnAssetForm'
import * as ReturnAssetHelper from '@/lib/return_assets.js'
import useFormattedAddress from '@/hooks/useFormattedAddress'
import { LinearProgressWithLabel } from '@/components/LinearProgressWithLabel'
import useSendAsset from '@/hooks/useSendAsset'

/**
 * Generate Static Properties
 * @param locale
 */
export async function getServerSideProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [...defaults])),
    },
  }
}

/**
 * Send Asset Page
 * @returns {JSX.Element}
 * @constructor
 */
export function ReturnAssetPage() {
  const [loading, setLoading] = useState(false)
  const { progress, status, total, hideProgress, setHideProgress, setStatus } =
    useSendAsset()
  const [senderAddress, setSenderAddress] = useState('')
  const { formattedAddresses, connect } = useFormattedAddress()
  const [assetId, setAssetId] = useState('')
  const [csvTransactions, setCsvTransactions] = useState()
  const [duplicateList, setDuplicateList] = useState([])
  const [actionStatus, setActionStatus] = useState({
    message: '',
    success: false,
  })

  useEffect(() => {
    if (actionStatus.message != '') {
      updateStatusMessage()
    }
  }, [assetId, senderAddress, csvTransactions])

  const { t } = useTranslation('common')

  const updateStatusMessage = (message, status) => {
    setActionStatus({
      message: message || '',
      success: status || false,
    })
  }

  const hasStatusBar = useMemo(() => {
    return typeof status !== 'undefined'
  }, [status])

  const submitForm = async ({ formData }) => {
    console.debug(formData)
    if (senderAddress != '' && assetId != '' && csvTransactions != '') {
      setLoading(true)
      updateStatusMessage()
      const responseData = await ReturnAssetHelper.returnAssetsToSender(
        assetId,
        senderAddress,
        csvTransactions
      )
      // console.debug('responseData', responseData)
      setLoading(false)

      if (responseData?.error == false) {
        const totalAssets = responseData.confirmedTransactions.length
        const sentAssets = responseData.confirmedTransactions.filter(
          (asset) => asset.value.status == 'confirmed'
        ).length
        updateStatusMessage(
          `${sentAssets}/${totalAssets} ${t(
            'transaction(s) returned successfully'
          )}`,
          true
        )
      } else {
        setStatus()
        setHideProgress(true)
        if (
          /PopupOpenError|blocked|Can not open popup window/.test(responseData)
        ) {
          updateStatusMessage(
            t(
              'Please disable your popup blocker (likely in the top-right of your browser window)'
            ),
            false
          )
          return
        }
        updateStatusMessage(
          responseData.body?.message ||
            responseData.message ||
            t('Sorry, an error occurred'),
          false
        )
      }
    }
  }

  return (
    <Container sx={{ margin: 4 }}>
      <Head>
        <title>{`${t('/return-assets')} | ${t('app-title')}`}</title>
      </Head>
      <Typography variant="h5" sx={{ marginBottom: '1rem' }}>
        {t('/return-assets')}
      </Typography>
      <Button variant="contained" onClick={connect}>
        {t('connect-wallet')}
      </Button>
      <ReturnAssetForm
        formattedAddresses={formattedAddresses}
        onSubmit={submitForm}
        actionStatus={actionStatus}
        isLoading={loading}
        setSenderAddress={setSenderAddress}
        setAssetId={setAssetId}
        csvTransactions={csvTransactions}
        setCsvTransactions={setCsvTransactions}
        setDuplicateList={setDuplicateList}
        updateStatusMessage={updateStatusMessage}
        disableButton={
          !(senderAddress && assetId && csvTransactions) ? true : false
        }
      />
      {hasStatusBar && (
        <Grid container spacing={2}>
          <Grid item xs={12} md={12} lg={7} xl={6}>
            <LinearProgressWithLabel
              status={status}
              progress={progress}
              total={total}
              hideProgress={hideProgress}
            />
          </Grid>
        </Grid>
      )}
      {duplicateList.length > 0 && (
        <>
          <Typography
            variant="status-message"
            display="block"
            marginTop="1rem"
            marginBottom="0"
            color={'info.error'}
          >
            Find below the duplicate wallet address
            {duplicateList.length > 1 && 'es'}:
          </Typography>
          <List dense={false}>
            {duplicateList.map((d) => (
              <ListItem key={d} sx={{ paddingBlock: '0' }}>
                <ListItemText
                  primary={d}
                  sx={{ color: 'info.error', marginBlock: '0' }}
                />
              </ListItem>
            ))}
          </List>
        </>
      )}
      <Grid container spacing={2} sx={{ paddingBlock: '2rem' }}>
        <Grid item xs={6} lg={5} className="mr-2">
          <Link
            href="https://docs.algodex.com/algodex-mailbox/mailbox-user-guide"
            target="blanc"
            color="primary.dark"
          >
            {t('view-instructions-link')}
          </Link>
        </Grid>
        <Grid item xs={6} lg={5}>
          <Link href={'/sample.csv'} download color="primary.dark">
            {t('download-csv-example-link')}
          </Link>
        </Grid>
      </Grid>
    </Container>
  )
}

export default ReturnAssetPage
