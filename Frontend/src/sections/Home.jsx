import { Navigation } from './components/Navigation'
import { Top } from './components/top'

export function Home() {
  return (
    <div className="size-full bg-[url('/federico-bottos-LJEsEIzcRRA-unsplash.jpg')] bg-no-repeat bg-center bg-cover flex flex-col">
        <Navigation />
        <Top />
    </div>
  )
}