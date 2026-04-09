import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PortfolioContent from "./PortfolioContent";

export default function PortfolioPage() {
    return (
        <main className="min-h-screen bg-[#080d1a]">
            <Navbar />
            <PortfolioContent />
            <Footer />
        </main>
    );
}
