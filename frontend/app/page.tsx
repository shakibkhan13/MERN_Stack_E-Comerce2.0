import Container from "@/components/common/Container";
import Banner from "@/components/Home/Banner";
import Brands from "@/components/Home/Brand";
import CategorySection from "@/components/Home/CategorySection";
import ProductList from "@/components/Home/ProductList";
import { fetchData } from "@/lib/api";
import { Brand } from "@/types/type";


export default async function Home() {
  
  const brands = await fetchData<Brand[]>("/brands")

  return (
    <div>
      <Container
        className="min-h-screen flex py-7 gap-4"
      >
        <CategorySection />
        <div
          className='flex-1'
        >
          <Banner />
          <ProductList />
          <Brands brands={brands} />
        </div>
      </Container>
    </div>

  )

}