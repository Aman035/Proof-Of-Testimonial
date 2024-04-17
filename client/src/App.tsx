import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom'
import { Footer, Navbar } from './components'
import {
  Home,
  Products,
  NotFound,
  HowItWorks,
  Profile,
  EditProfile,
  AddProduct,
  Product,
} from './pages'
import { useEffect } from 'react'
import '@rainbow-me/rainbowkit/styles.css'
import { getDefaultConfig, RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { WagmiProvider } from 'wagmi'
import { neonDevnet } from 'wagmi/chains'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'

const config = getDefaultConfig({
  appName: 'Proof Of Testimonial',
  projectId: '7569cfee6ec721ba9f5c5e8df5d2e4c6',
  chains: [neonDevnet],
})
const queryClient = new QueryClient()

const ScrollToTop = () => {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null // This component does not render anything
}

const App = () => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <Router>
            <ScrollToTop /> {/* Place ScrollToTop inside Router */}
            <Navbar />
            <div className="flex flex-col min-h-screen">
              <div className="flex-grow">
                <Routes>
                  {' '}
                  {/* Main content grows to take available space */}
                  <Route path="/" element={<Home />} />
                  <Route path="/product/:attestationId" element={<Product />} />
                  <Route path="/products" element={<Products />} />
                  <Route path="/add-product" element={<AddProduct />} />
                  <Route path="/edit-profile" element={<EditProfile />} />
                  <Route path="/profile/:address" element={<Profile />} />
                  <Route path="/how-it-works" element={<HowItWorks />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </div>
              <Footer />
            </div>
          </Router>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}

export default App
