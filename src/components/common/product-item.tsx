import Image from "next/image";
import Link from "next/link";

import { productTable, productVariantTable } from "@/db/schema";
import { formatCentsToBRL } from "@/helpers/money";

interface ProductItemProps {
  product: typeof productTable.$inferSelect & {
    variants: (typeof productVariantTable.$inferSelect)[];
  };
}

const ProductItem = ({ product }: ProductItemProps) => {
  // Garantir que existe pelo menos uma variante
  const firstVariant = product.variants?.[0];
  if (!firstVariant) {
    return null; // ou exibir algo como "Produto indisponível"
  }

  // Limpar URL se vier com {}
  let imageUrl = "";
  if (typeof firstVariant.imageUrl === "string") {
    imageUrl = firstVariant.imageUrl
      .replace(/^{|}$/g, "") // remove { }
      .replace(/^"|"$/g, ""); // remove aspas extras
  }

  return (
    <Link href={`/produto/${product.id}`} className="flex flex-col gap-4">
      <Image
        src={imageUrl}
        alt={`${product.name} - ${firstVariant.name}`}
        width={200}
        height={200}
        className="rounded-3xl object-cover"
      />
      <div className="flex max-w-[200px] flex-col gap-1">
        <p className="truncate text-sm font-medium">{product.name}</p>
        <p className="text-muted-foreground truncate text-xs font-medium">
          {product.description}
        </p>
        <p className="truncate text-sm font-semibold">
          {formatCentsToBRL(firstVariant.priceInCents)}
        </p>
      </div>
    </Link>
  );
};

export default ProductItem;
