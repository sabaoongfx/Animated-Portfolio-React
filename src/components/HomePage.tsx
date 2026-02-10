// Components
import Header from './Header';
import Hero from './Hero';
import Services from './Services';
import Technologies from './Technologies';
import About from './About';
import Clients from './Clients';
import ContactUs from './ContactUs';
import Footer from './Footer';
import MobileBottomNav from './MobileBottomNav';

export default function HomePage() {
  // Ensure right-click context menu is enabled
  const handleContextMenu = (): boolean => {
    // Allow default context menu behavior
    // Remove this handler if you want to customize the context menu
    return true;
  };

  return (
    <div
      className="HomePage"
      onContextMenu={handleContextMenu}
      style={{ userSelect: 'text' }} // Ensure text selection is enabled
    >
      <Header />
      <Hero />
      <Services />
      <Technologies />
      <About />
      <Clients />
      <ContactUs />
      <Footer />
      <MobileBottomNav />
    </div>
  );
}
