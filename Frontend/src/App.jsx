import { Home } from './sections/Home'
import { SectionAB } from './sections/SectionAB'
import { SectionCD } from './sections/SectionCD'

import { Login } from './sections/Login'

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
  return <Login />
}
