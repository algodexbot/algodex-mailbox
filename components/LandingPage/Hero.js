import React, { useState } from 'react'
import Image from 'next/image'
import Link from '../Nav/Link'
import { useTranslation } from 'next-i18next'

// MUI Components
import AppBar from '@mui/material/AppBar'
import Grid from '@mui/material/Grid'
import Container from '@mui/material/Container'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'

// Icons
import LightbulbIcon from '@mui/icons-material/Lightbulb'
import LiveHelpIcon from '@mui/icons-material/LiveHelp'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'

// Hooks
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'

// Algodex
import Drawer from '../Nav/Drawer'
import DefaultToolbar from '@/components/Nav/Toolbar'


const styles = {
  hero: {
    minHeight: '100vh',
    background: 'url("/Space-Background.png") no-repeat',
    position: 'relative',
    backgroundSize: 'cover',
    overflow: 'hidden',
    '&::after': {
      position: 'absolute',
      background: 'url("/Airwave.png") no-repeat',
      pointerEvents: 'none',
      backgroundSize: 'cover',
      top: '60px',
      bottom: '0',
      width: '100%',
      height: '100%',
      content: '""',
      '@media (min-width: 780px) and (max-width: 1000px)': {
        top: '90px',
      },
      '@media (max-width: 350px)': {
        display: 'none',
      },
    },
    '@media (max-width: 780px)': {
      background: 'none',
      '&::after': {
        background: 'url("/Airwave-sm.png") no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'bottom',
        top: '17%',
      },
    },
  },
  heroCard: {
    backgroundColor: 'accent.main',
    padding: '0.68rem',
    marginTop: '7vh',
  },
  border: {
    border: '0.3rem solid #1a202c',
    padding: '1.5rem',
  },
}
export const Hero = () => {
  const { t } = useTranslation('common')
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const [openDrawer, setOpenDrawer] = useState(false)
  const toggleDrawer = () => {
    setOpenDrawer(!openDrawer)
  }
  const links = [
    {
      to: '/#user-guide',
      icon: <LightbulbIcon />,
      primary: t('user-guide'),
    },
    {
      to: '/#faq',
      icon: <LiveHelpIcon />,
      primary: t('faq'),
    },
    {
      to: 'https://about.algodex.com/support/',
      icon: <HelpOutlineIcon />,
      primary: t('support'),
    },
  ]
  return (
    <Box sx={styles.hero}>
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <DefaultToolbar
          isMobile={isMobile}
          isDashboard={false}
          toggleDrawer={toggleDrawer}
        />
        {/* Mobile side Drawer */}
        <Drawer
          open={openDrawer}
          width={'80%'}
          links={links}
          toggleDrawer={toggleDrawer}
        />
      </AppBar>
      {/* Display the other part of the hero component */}
      <Container>
        <Grid container spacing={2} sx={{ marginBlock: '2rem' }}>
          <Grid item xs={12} md={8} lg={7} xl={6}>
            <Box sx={styles.heroCard}>
              <Box sx={styles.border}>
                <Image
                  src="/algodex-logo.svg"
                  alt="Algodex Logo"
                  width="300"
                  height="50"
                />
                <Typography variant="h3">Mailbox</Typography>
                <Image
                  src="/Powered-by-Algorand.png"
                  alt="Powered by Algorand"
                  width="150"
                  height="20"
                />
                <p>
                  Algodex Mailbox is a decentralized web application that allows
                  users to send Algorand Standard Assets even if recipients
                  haven’t opted into the asset yet. <br /> <br />
                  Useful when sending to one wallet or thousands. <br /> <br />
                  <strong>Try on testnet Now:</strong>
                </p>
                <Link href="/send-assets">
                  <Button
                    variant="outlined"
                    sx={{
                      color: (theme) => theme.palette.primary.contrastText,
                      borderColor: (theme) =>
                        theme.palette.primary.contrastText,
                    }}
                  >
                    LAUNCH ON TESTNET
                  </Button>
                </Link>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}
