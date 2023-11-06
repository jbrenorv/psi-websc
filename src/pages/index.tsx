import * as React from 'react';
import Head from 'next/head'
import { Roboto } from 'next/font/google'
import { useRouter } from 'next/router';

import SearchProductsButton from '@/components/search-product-button';
import InputProduct from '@/components/input-product';
import Center from '@/components/flex/center';
import FlexRow from '@/components/flex/flex-row';
import { Avatar, Button, Container, IconButton, List, ListItem, ListItemAvatar, ListItemText, Paper, Snackbar } from '@mui/material';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import DeleteIcon from '@mui/icons-material/Delete';
import { Alert } from '@/components/alert';

const roboto = Roboto({ weight: '400', subsets: ['latin'] });

export default function HomePage() {

  const router = useRouter();

  const [ productName, setProductName ] = React.useState('');
  const [ products, setProducts ] = React.useState<string[]>([]);
  const [ snackbar, setSnackbar ] = React.useState({
    open: false,
    message: "",
  });

  const onProductNameChange = (value: string) => {
    if (value.endsWith('_')) return;
    setProductName(value);
  }

  const submitForm = (event: any) => {
    event.preventDefault();
    searchProducts();
  }

  const searchProducts = async () => {
    const productNames = products.join('_');
    router.push(`/products/${productNames}`);
  }

  const addProduct = (event: any) => {
    event.preventDefault();
    if (!productName) return;
    if (products.includes(productName)) {
      showSnackbar(`${productName} já foi adicionado.`);
      return;
    }
    setProducts([...products, productName]);
    setProductName('');
  }

  const removeProduct = (product: string) => {
    const newProducts = products.filter(p => p !== product);
    setProducts(newProducts);
  }

  const closeSnackbar = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnackbar({open: false, message: ''});
  };

  const showSnackbar = (message: string) => {
    setSnackbar({open: true, message});
  }

  const hasProducts = () => products.length > 0;

  return (
    <>
      <Head>
        <title>PSI - Websc</title>
        <meta name="description" content="Websc project - PSI" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={roboto.className} style={{ height: '100vh' }}>

        <form onSubmit={addProduct}>
          <Container maxWidth='sm'>
            <Center>
              <h1>Crie sua lista de compras!</h1>
              <FlexRow>
                <InputProduct
                  value={productName}
                  onChange={onProductNameChange}
                />
                <SearchProductsButton />
              </FlexRow>
            </Center>

            {hasProducts() &&
              <div>
                <Paper
                  sx={{
                    maxHeight: '75vh',
                    overflow: 'auto',
                    my: '16px'
                  }}
                >
                  <List dense>
                    {
                      products.map((product, index) => (
                        <ListItem
                          key={index}
                          secondaryAction={
                            <IconButton
                              edge="end"
                              aria-label="delete"
                              onClick={() => removeProduct(product)}
                            >
                              <DeleteIcon />
                            </IconButton>
                          }
                        >
                          <ListItemAvatar>
                            <Avatar>
                              <ProductionQuantityLimitsIcon />
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText
                            primary={product}
                            sx={{ wordWrap: "break-word" }}
                          />
                        </ListItem>
                      ))
                    }
                  </List>
                </Paper>
                <Button
                  fullWidth
                  variant="contained"
                  onClick={submitForm}
                >
                  Buscar
                </Button>
              </div>
            }
          </Container>
        </form>

        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={closeSnackbar}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert onClose={closeSnackbar} severity="warning" sx={{ width: '100%' }}>
            {snackbar.message}
          </Alert>
        </Snackbar>
      </main>
    </>
  )
}
