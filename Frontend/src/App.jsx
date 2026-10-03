import { Home } from './sections/Home'
import { SectionAB } from './sections/SectionAB'
import { SectionCD } from './sections/SectionCD'

import { Register } from './sections/Register'

export function Lobby() {
  return (
    <>
    <Home />
    <SectionAB />
    <SectionCD />
    </>
  )
}

export function Registration() {
  return <Register />
}
