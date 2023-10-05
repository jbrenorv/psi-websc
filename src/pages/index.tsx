import Head from 'next/head'
import { useState } from 'react';
import { Roboto } from 'next/font/google'
import { useRouter } from 'next/router';

import SearchProductsButton from '@/components/search-product-button';
import InputProduct from '@/components/input-product';
import Center from '@/components/flex/center';
import FlexRow from '@/components/flex/flex-row';
import { Container } from '@mui/material';

const roboto = Roboto({ weight: '400', subsets: ['latin'] });

export default function HomePage() {

  const router = useRouter();

  const [ productName, setProductName ] = useState('');

  const onProductNameChange = (value: string) => setProductName(value);

  const submitForm = (event: any) => {
    event.preventDefault();
    searchProducts();
  }

  const searchProducts = async () => {
    console.log(productName);
    router.push(`/products/${productName}`);
  }

  return (
    <>
      <Head>
        <title>PSI - Websc</title>
        <meta name="description" content="Websc project - PSI" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={roboto.className} style={{ height: '100vh' }}>

        <form onSubmit={submitForm}>
          <Container maxWidth='md'>
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
          </Container>
        </form>
      </main>
    </>
  )
}
