import PropTypes from 'prop-types';
// @mui
import { Box, Card, Link, Typography, Stack, Rating } from '@mui/material';
import { styled } from '@mui/material/styles';
// utils
import { fCurrency } from '../../../utils/formatNumber';
// components
import Label from '../../../components/label';
import { ColorPreview } from '../../../components/color-utils';

// ----------------------------------------------------------------------

const StyledProductImg = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
});

// ----------------------------------------------------------------------

ShopProductCard.propTypes = {
  product: PropTypes.object,
};
const excerpt = (str) => {
  if (str.length > 20) {
    str = str.substring(0, 15) + " .";
  }
  return str;
};
export default function ShopProductCard({ product }) {
  const { name, image,desc, price, colors, task, brand } = product;

  return (
    <Card>
      <Box sx={{ pt: '100%', position: 'relative' }}>
       
        <StyledProductImg alt={name} src={product.image?.url} />
      </Box>

      <Stack spacing={2} sx={{ p: 3 }}>
        <Link color="inherit" underline="hover">
          <Typography variant="subtitle2" noWrap>
            {excerpt(name) }
          </Typography>
        </Link>

        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <ColorPreview colors={colors} />
          <Typography variant="subtitle1">
            <Typography
              // component="span"
              // variant="body1"
              sx={{
                // color: 'text.disabled',
                // textDecoration: 'line-through',
              }}
            >
              {brand}
            </Typography>
            &nbsp;
            {fCurrency(price)}
          </Typography>
          <Typography>
            {excerpt(desc)}
          </Typography>
        </Stack>
        <Rating value={task}/>

      </Stack>
    </Card>
  );
}
