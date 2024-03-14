export interface CoffeeType {
  id: number
  badges: string[]
  title: string
  subtitle: string
  image: string
  price: number
}
export const coffees: CoffeeType[] = [
  {
    id: 1,
    image: '/images/coffees/expresso.png',
    title: 'Expresso Tradicional',
    subtitle: 'O tradicional café feito com água quente e grãos moídos',
    badges: ['tradicional'],
    price: 12.89,
  },
  {
    id: 2,
    image: '/images/coffees/americano.png',
    title: 'Expresso Americano',
    subtitle: 'Expresso diluído, menos intenso que o tradicional',
    price: 5.89,
    badges: ['tradicional'],
  },
  {
    id: 3,
    image: '/images/coffees/cremoso.png',
    title: 'Expresso Cremoso',
    subtitle: 'Café expresso tradicional com espuma cremosa',
    price: 12.99,
    badges: ['tradicional'],
  },
  {
    id: 4,
    image: '/images/coffees/gelado.png',
    title: 'Expresso Gelado',
    subtitle: 'Bebida preparada com café expresso e cubos de gelo',
    price: 9.99,
    badges: ['tradicional', 'gelado'],
  },
  {
    id: 5,
    price: 13,
    image: '/images/coffees/leite.png',
    title: 'Café com Leite',
    subtitle: 'Meio a meio de expresso tradicional com leite vaporizado',
    badges: ['tradicional', 'com leite'],
  },
  {
    id: 5,
    price: 16,
    image: '/images/coffees/latte.png',
    title: 'Latte',
    subtitle: 'Uma dose de café expresso com o dobro de leite e espuma cremosa',
    badges: ['tradicional', 'com leite'],
  },
  {
    id: 6,
    image: '/images/coffees/capuccino.png',
    title: 'Capuccino',
    subtitle: 'Bebida com canela feita de doses iguais de café, leite e espuma',
    price: 21,
    badges: ['tradicional', 'com leite'],
  },
  {
    id: 7,
    image: '/images/coffees/macchiato.png',
    title: 'Macchiato',
    subtitle: 'Café expresso misturado com um pouco de leite quente e espuma',
    price: 12,
    badges: ['tradicional', 'com leite'],
  },
  {
    id: 8,
    image: '/images/coffees/mochaccino.png',
    title: 'Mocaccino',
    subtitle: 'Café expresso com calda de chocolate, pouco leite e espuma',
    price: 9.99,
    badges: ['tradicional', 'com leite'],
  },
  {
    id: 9,
    image: '/images/coffees/chocolate.png',
    title: 'Chocolate Quente',
    subtitle: 'Bebida feita com chocolate dissolvido no leite quente e café',
    price: 11,
    badges: ['tradicional', 'com leite'],
  },
  {
    id: 10,
    image: '/images/coffees/cubano.png',
    title: 'Cubano',
    subtitle: 'Drink gelado de café expresso com rum, creme de leite e hortelã',
    price: 20.99,
    badges: ['tradicional', 'alcoólico', 'gelado'],
  },
  {
    id: 11,
    image: '/images/coffees/havaiano.png',
    title: 'Havaiano',
    subtitle: 'Bebida  adocicada preparada com café e leite de coco',
    price: 11.9,
    badges: ['tradicional', 'alcoólico', 'gelado'],
  },
  {
    id: 12,
    image: '/images/coffees/arabe.png',
    title: 'Árabe',
    subtitle: 'Bebida preparada com grãos de café árabe e especiarias',
    price: 10,
    badges: ['especial'],
  },
  {
    id: 13,
    image: '/images/coffees/irlandes.png',
    title: 'Irlandês',
    subtitle: 'Bebida a base de café, uísque irlandês, açúcar e chantilly',
    price: 10,
    badges: ['especial', 'alcoólico'],
  },
]
