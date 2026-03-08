import Link from "next/link";
import { Product } from "@/data/products";
import { Package } from "lucide-react";

interface ProductCardProps {
  product: Product;
  linkToDetail?: boolean;
}

const ProductCard = ({ product, linkToDetail }: ProductCardProps) => {
  const cta = linkToDetail ? (
    <span className="block w-full text-center bg-secondary text-secondary-foreground py-3 text-[11px] font-black uppercase tracking-widest mt-auto">
      View details
    </span>
  ) : (
    <a
      href="#signup"
      className="block w-full text-center bg-secondary text-secondary-foreground py-3 text-[11px] font-black uppercase tracking-widest hover:opacity-90 transition-opacity mt-auto"
    >
      Enquire Now
    </a>
  );

  const card = (
    <div className="group bg-card border border-foreground/5 hover:shadow-xl transition-all duration-500 h-full flex flex-col">
      <div className="p-5 pb-2">
        <div className="relative mr-2 mb-2">
          <div className="absolute bottom-[-8px] right-[-8px] w-full h-full border border-primary/20" />
          <div className="relative aspect-square overflow-hidden bg-muted shadow-md">
            {product.image ? (
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-muted-foreground" aria-hidden>
                <Package size={48} />
              </div>
            )}
            <div className="absolute top-3 left-3">
              <span className="bg-secondary text-secondary-foreground text-[9px] font-black uppercase tracking-widest px-3 py-1.5">
                {product.brand}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="p-5 flex-1 flex flex-col">
        <p className="text-[10px] font-bold uppercase tracking-widest text-primary mb-2">
          {product.category}
        </p>
        <h3 className="font-bold text-sm text-foreground mb-3 leading-snug">
          {product.name}
        </h3>
        <div className="flex items-center gap-2 text-[11px] text-muted-foreground font-medium mb-4">
          <Package size={12} />
          <span>{product.unit}</span>
          <span className="text-foreground/20">|</span>
          <span>Min: {product.minOrder}</span>
        </div>
        {cta}
      </div>
    </div>
  );

  if (linkToDetail) {
    return (
      <Link href={`/products/${product.id}`} className="block h-full">
        {card}
      </Link>
    );
  }
  return card;
};

export default ProductCard;
