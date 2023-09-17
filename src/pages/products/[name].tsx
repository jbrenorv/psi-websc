import * as websc from "@/services/websc/websc";
import { List, ListItem, ListItemText } from "@mui/material";


type ProductsPageProps = {
  products: websc.Product[];
}


export async function getServerSideProps(context: any) {

  const productName = context.params.name;
  const products = await websc.getProducts_PaoDeAcucar(productName);

  return { props: { products } }
}


export default function ProductsPage({ products }: ProductsPageProps) {

  const hasProducts = () => products.length > 0;

  return (
    <>
      {
        !hasProducts()
        ? (<h1>Nenhum produto encontrado</h1>)
        : (

          <List>
            {products.map((product, index) => (
              <ListItem key={index}>
                <ListItemText
                  primary={`price: ${product.price}\tname: ${product.name}`}
                />
              </ListItem>
            ))}
          </List>

        )
      }
    </>
  );
}
