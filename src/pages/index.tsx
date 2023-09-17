import Head from 'next/head'
import { Roboto } from 'next/font/google'
import SearchProductsButton from '@/components/search-product-button';
import { useState } from 'react';
import InputProduct from '@/components/input-product';
import { useRouter } from 'next/router';

const roboto = Roboto({ weight: '400', subsets: ['latin'] });

export default function HomePage() {

  const router = useRouter();

  const [ productName, setProductName ] = useState('');

  const onProductNameChange = (value: string) => setProductName(value);

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
      <main className={roboto.className}>
        <h1>Crie sua lista de compras!</h1>

        <div>
          <InputProduct
            value={productName}
            onChange={onProductNameChange}
          />
          <SearchProductsButton onClick={searchProducts} />
        </div>
      </main>
    </>
  )
}
