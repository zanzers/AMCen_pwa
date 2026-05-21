import HerosSection from "../sections/Herosectios";
import Navbar from "../components/Navbar";


export default function Home(){
    return (
        <main className="bg-[#F0EFEC] min-h-screen">
            <Navbar />

            <HerosSection />

        </main>
    );
}