import Button from "@mui/material/Button";
import AddIcon from '@mui/icons-material/Add';

export default function SearchProductsButton() {

  return (
    <Button
      variant="contained"
      endIcon={<AddIcon />}
      sx={{ ml: '16px', px: '24px' }}
      type="submit"
    >
      Adicionar
    </Button>
  );
}
