import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PortfolioContent from "./PortfolioContent";

export default function PortfolioPage() {
    return (
        <main className="min-h-screen bg-[#0f172a]">
            <Navbar />
            <PortfolioContent />
            <Footer />
        </main>
    );
}
