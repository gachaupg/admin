import { useState } from 'react';
// @mui
import { alpha } from '@mui/material/styles';
import { Box, MenuItem, Stack, IconButton, Popover } from '@mui/material';

// ----------------------------------------------------------------------

const LANGS = [
  {
    value: 'en',
    label: 'English',
    icon: 'data:image/jpeg;base64,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',
  },
  {
    value: 'en',
    label: 'English',
    icon: '/assets/icons/ic_flag_en.svg',
  },
  {
    value: 'de',
    label: 'German',
    icon: '/assets/icons/ic_flag_de.svg',
  },
  {
    value: 'fr',
    label: 'French',
    icon: '/assets/icons/ic_flag_fr.svg',
  },
];

// ----------------------------------------------------------------------

export default function LanguagePopover() {
  const [open, setOpen] = useState(null);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          padding: 0,
          width: 44,
          height: 44,
          ...(open && {
            bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.focusOpacity),
          }),
        }}
      >
        <img src={LANGS[0].icon} alt={LANGS[0].label} />
      </IconButton>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 1,
            mt: 1.5,
            ml: 0.75,
            width: 180,
            '& .MuiMenuItem-root': {
              px: 1,
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        <Stack spacing={0.75}>
          {LANGS.map((option) => (
            <MenuItem key={option.value} selected={option.value === LANGS[0].value} onClick={() => handleClose()}>
              <Box component="img" alt={option.label} src={option.icon} sx={{ width: 28, mr: 2 }} />

              {option.label}
            </MenuItem>
          ))}
        </Stack>
      </Popover>
    </>
  );
}
