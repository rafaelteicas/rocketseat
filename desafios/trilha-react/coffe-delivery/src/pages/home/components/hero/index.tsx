import {
  HeroBackground,
  HeroContainer,
  HeroTextContainer,
  ItemContainer,
  Items,
} from './styles'
import imagem from '../../../../assets/images/imagem.png'
import { Coffee, Package, ShoppingCart, Timer } from 'phosphor-react'

export function Hero() {
  return (
    <HeroContainer>
      <HeroTextContainer>
        <h1>Encontre o café perfeito para qualquer hora do dia</h1>
        <p>
          Com o Coffee Delivery você recebe seu café onde estiver, a qualquer
          hora
        </p>
        <Items>
          <ItemContainer spanColor="yellow-dark">
            <span>
              <ShoppingCart weight="fill" fill="white" />
            </span>
            <p>Compra simples e segura</p>
          </ItemContainer>
          <ItemContainer spanColor="yellow">
            <span>
              <Timer weight="fill" fill="white" />
            </span>
            <p>Entrega rápida e rastreada</p>
          </ItemContainer>
          <ItemContainer spanColor="base-text">
            <span>
              <Package weight="fill" fill="white" />
            </span>
            <p>Embalagem mantém o café intacto</p>
          </ItemContainer>
          <ItemContainer>
            <span>
              <Coffee weight="fill" fill="white" />
            </span>
            <p>O café chega fresquinho até você</p>
          </ItemContainer>
        </Items>
      </HeroTextContainer>
      <img src={imagem} alt="" />
      <HeroBackground>
        <img className="hero-bg" src={'/images/background.svg'} alt="" />
      </HeroBackground>
    </HeroContainer>
  )
}
