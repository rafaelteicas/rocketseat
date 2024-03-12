import { Card } from '../../components/card'
import { coffees } from '../../data/coffees'
import { Hero } from './components/hero'
import { HomeContainer, ProductsContainer } from './styles'

export function Home() {
  return (
    <HomeContainer>
      <Hero />
      <h2>Nossos cafés</h2>
      <ProductsContainer>
        {coffees.map((coffee) => (
          <Card coffee={coffee} key={coffee.id} />
        ))}
      </ProductsContainer>
    </HomeContainer>
  )
}
