import { cn } from "@/lib/utils";

const ProductPrice = ({ value, currency }: { value: number; currency: string }) => {
    const sign = value < 0 ? "-" : "";
    const [integerPart, decimalPart] = Math.abs(value).toFixed(2).split(".");

    return (
        <p className={cn("inline-flex items-baseline text-2xl font-bold tracking-tight tabular-nums")}>
            <span className="mr-1 text-sm font-medium text-muted-foreground">{sign}{currency}</span>
            <span>{integerPart}</span>
            <span className="text-sm text-muted-foreground">.{decimalPart}</span>
        </p>
    );
};

export default ProductPrice;