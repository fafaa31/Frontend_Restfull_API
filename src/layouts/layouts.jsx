import { Navbar } from "."

export function Layouts({ children }) {
  return (
    <>
      <Navbar />
      {children}
    </>
  )
}