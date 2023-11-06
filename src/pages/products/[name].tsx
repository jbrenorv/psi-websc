import Center from "@/components/flex/center";
import * as websc from "@/services/websc/websc";
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import {
  Avatar,
  Box,
  Container,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Typography
} from "@mui/material";


type ProductsPageProps = {
  products: websc.Product[];
  total: string;
}


export async function getServerSideProps(context: any) {

  const productNames = context.params.name.split('_');
  const products = await websc.getProducts_PaoDeAcucar(productNames);

  let total = 0.0;
  try {
    for (const product of products) {
      total += (Number(product.price.match(/\d+/g)?.join('').replaceAll(',', '.')) ?? 0.0);
    }
  } catch {}

  return { props: { products, total: `R$ ${total / 100.0}` } }
}


export default function ProductsPage({ products, total }: ProductsPageProps) {

  const hasProducts = () => products.length > 0;

  return (
    <>
      {
        !hasProducts()
        ? (<Center><h1>Nenhum produto encontrado</h1></Center>)
        : (

          <Container maxWidth='sm'>
            <div>
              <Typography
                variant="h5"
                textAlign='center'
                sx={{ py: '32px', fontWeight: 'bold' }}
              >
                Supermercado Pão de Açucar
              </Typography>

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
                      >
                        <ListItemAvatar>
                          <Avatar>
                            <ProductionQuantityLimitsIcon />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={product.name}
                          secondary={product.price}
                          sx={{ wordWrap: "break-word" }}
                        />
                      </ListItem>
                    ))
                  }
                </List>
              </Paper>

              <Container maxWidth="sm">
                <Box sx={{
                  bgcolor: '#cfe8fc',
                  p: '16px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  borderRadius: '8px'
                }}>
                  <Typography sx={{ fontWeight: 'bold' }}>Total</Typography>
                  <Typography>{total}</Typography>
                </Box>
              </Container>

            </div>
          </Container>

        )
      }
    </>
  );
}
