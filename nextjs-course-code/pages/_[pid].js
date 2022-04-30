import fs from 'fs/promises';

import path from 'path';
function ProductDetailPage({ loadedProduct }) {
  if (!loadedProduct) {
    return <p>Loading ...</p>;
  }
  return (
    <>
      <h1>{loadedProduct.title}</h1>
      <p>{loadedProduct.description}</p>
    </>
  );
}

export async function getStaticProps(context) {
  const { params } = context;

  const productId = params.pid;

  const data = await getData();

  const product = data.products.find((product) => product.id === productId);

  if (!product) {
    return { notFound: true };
  }

  return {
    props: {
      loadedProduct: product,
    },
  };
}

async function getData() {
  const filePath = path.join(process.cwd(), 'dummy-backend.json');
  const jsonData = await fs.readFile(filePath);

  const data = JSON.parse(jsonData);

  return data;
}

export async function getStaticPaths() {
  const data = await getData();
  const ids = data.products.map((product) => product.id);

  const params = ids.map((id) => ({ params: { pid: id } }));
  return {
    // paths: [
    // {
    //   params: {
    //     pid: 'p1',
    //   },
    // },
    // {
    //   params: {
    //     pid: 'p2',
    //   },
    // },
    // {
    //   params: {
    //     pid: 'p3',
    //   },
    // },
    // ],
    paths: params,
    // fallback: false,
    fallback: true, //-> Needs Loading check
    // fallback: 'blocking' // -> Doesn't need to check for loading, does it for us
  };
}

export default ProductDetailPage;
