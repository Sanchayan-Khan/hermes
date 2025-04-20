import React from "react";
import { useLoadingContext } from "@/components/loading-provider";
import { useRouter } from "next/navigation";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
  href,
}) => {
  const { setIsLoading } = useLoadingContext();
  const router = useRouter();

  const handleNavigation = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }
    setIsLoading(true);
    router.push(href);
  };

  return (
    <button
      onClick={handleNavigation}
      className="relative p-6 transition-all bg-[#1e1916]/60 border border-amber-700/30 rounded-lg shadow-md hover:shadow-amber-700/10 group hover:-translate-y-1 backdrop-blur-sm text-left"
    >
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-400 to-amber-600 rounded-t-lg transform scale-x-0 origin-left transition-transform group-hover:scale-x-100"></div>
      <div className="p-3 mb-4 bg-amber-800/50 rounded-full w-fit shadow-inner group-hover:bg-amber-700/70 transition-colors">
        {icon}
      </div>
      <h3 className="mb-2 text-xl font-medium text-amber-200 font-display tracking-wide">
        {title}
      </h3>
      <p className="text-amber-300/80 font-handwriting">{description}</p>
    </button>
  );
};

export default FeatureCard;
