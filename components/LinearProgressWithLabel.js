import React from 'react'
import LinearProgress from '@mui/material/LinearProgress'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import PropTypes from 'prop-types'

export const LinearProgressWithLabel = (props) => {
  const { status, progress, total, hideProgress } = props
  console.log({ status, progress, total, hideProgress })
  return (
    <>
      {!hideProgress && (
        <>
          <Typography variant="p" fontWeight={500} marginTop="1rem">
            {status}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ width: '100%', mr: 1 }}>
              <LinearProgress
                variant="determinate"
                color={'progress'}
                value={(progress * 100) / (total === 0 ? 1 : total)}
              />
            </Box>
            <Box sx={{ minWidth: 35 }}>
              <Typography variant="body2" color="text.secondary">{`${Math.round(
                (progress * 100) / (total === 0 ? 1 : total)
              )}/100`}</Typography>
            </Box>
          </Box>
        </>
      )}
    </>
  )
}

LinearProgressWithLabel.propTypes = {
  status: PropTypes.string,
  progress: PropTypes.number,
  total: PropTypes.number,
  hideProgress: PropTypes.bool,
}
