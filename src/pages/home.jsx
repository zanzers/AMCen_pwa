import HerosSection from "../sections/Herosectios";
import Navbar from "../components/ui/Navbar";


export default function Home(){
    return (
        <main className="bg-[#F0EFEC] min-h-screen">
            <Navbar />

            <HerosSection />

        </main>
    );
}