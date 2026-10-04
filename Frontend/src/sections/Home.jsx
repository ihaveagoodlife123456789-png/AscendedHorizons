import { Navigation } from './components/Navigation'
import { Top } from './components/top'

export function Home() {
  return (
    <div className="size-full bg-[url('/urban-vintage-78A265wPiO4-unsplash.jpg')] bg-no-repeat bg-center bg-cover flex flex-col">
        <Navigation />
        <Top />
    </div>
  )
}