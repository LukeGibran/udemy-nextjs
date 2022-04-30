import styles from '../styles/Home.module.css';
import fs from 'fs/promises';
import path from 'path';

import Link from 'next/link';

function Home(props) {
  const { products } = props;
  console.log(products);
  return (
    <div className={styles.container}>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <Link href={`/${product.id}`}>{product.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export async function getStaticProps() {
  // SSG - Server Side Generated
  const filePath = path.join(process.cwd(), 'dummy-backend.json');
  const jsonData = await fs.readFile(filePath);

  const data = JSON.parse(jsonData);

  return {
    props: {
      products: data.products,
    },
    revalidate: 120, // ISR - Incremental Static Generation
    // notFound: true - Set to 404 purposely
    // redirect: { - Redirect to a certain page
    //   destination: '/no-data'
    // }
  };
}

export default Home;
