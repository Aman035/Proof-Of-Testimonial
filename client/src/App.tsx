import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Navbar } from './components'
import { Home, Products, NotFound } from './pages'

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  )
}

export default App
