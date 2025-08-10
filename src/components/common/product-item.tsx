import Image from "next/image";
import Link from "next/link";

import { productTable, productVariantTable } from "@/db/schema";
import { formatCentsToBRL } from "@/helpers/money";
import { cn } from "@/lib/utils";

interface ProductItemProps {
  product: typeof productTable.$inferSelect & {
    variants: (typeof productVariantTable.$inferSelect)[];
  };
  textContainerClassName?: string;
}

const ProductItem = ({ product, textContainerClassName }: ProductItemProps) => {
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
        sizes="100vw"
        height={0}
        width={0}
        className="h-auto w-full rounded-3xl"
      />
      <div className={cn("flex max-w-[200px] flex-col gap-1", textContainerClassName = "max-w-full")}>
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
