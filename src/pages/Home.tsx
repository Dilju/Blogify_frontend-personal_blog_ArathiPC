
import React from "react";
import Home  from "../featuers/Home/components/Home";
const HomePage: React.FC = () => {
    return (
        <div className="min-h-screen flex flex-col">
          
            <main className="flex-grow container mx-auto px-4 py-8">
                <h2 className="text-2xl font-bold mb-4">Welcome to Minimalist Blog</h2>
                <p className="text-gray-700">
                   <Home/>

                </p>
            </main>
         
        </div>
    );
}   ;
export default HomePage;