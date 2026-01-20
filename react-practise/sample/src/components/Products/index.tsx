import useFetch from "../../hooks/useFetch";
import { PRODUCT_API_URL } from "../../constants"; 
import { IProduct } from "../../types";
import { createContext, useContext, useMemo, useState } from "react";
import styles from './index.module.css';


type SortOrder = "asc" | "desc";

type ProductsCtxValue = {
  sortOrder: SortOrder;
  setSortOrder: (s: SortOrder) => void;
  url: string;
  productList: IProduct[] | null;
  loading: boolean;
  error: string | null;
};

const ProductContext  = createContext<ProductsCtxValue | null>(null);

function useProductsCtx() {
  const ctx = useContext(ProductContext);
  if (!ctx) throw new Error("Products compound components must be used inside <Products.Root>");
  return ctx;
}

function Root({children}:{children: React.ReactNode}){
    const [sortOrder, setSortOrder] = useState<SortOrder>("asc");
    const url  = useMemo(() => {
        return `${PRODUCT_API_URL}?sort=${sortOrder}`;
    },[sortOrder]);
    const { data, loading, error } = useFetch<IProduct[]>(url);
    const value: ProductsCtxValue = {
        sortOrder,
        setSortOrder,
        url,
        productList: data,
        loading,
        error
    }
    return <ProductContext.Provider value={value}>
        {children}
    </ProductContext.Provider>
}

function SortDropDown() {
    const { sortOrder, setSortOrder } = useProductsCtx();
    return (
        <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value as SortOrder)}>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
        </select>
    );
}

function GridView() {
    const { productList, loading, error } = useProductsCtx();
    
    if (loading) {
        return <div className={styles.loading}>Loading products...</div>;
    }
    
    if (error) {
        return <div className={styles.error}>Error: {error}</div>;
    }
    
    if (!productList || productList.length === 0) {
        return <div className={styles.empty}>No products found</div>;
    }
    
    return (
        <div className={styles.container}>
            <h2 className={styles.sectionTitle}>Products ({productList.length})</h2>
            <div className={styles.grid}>
                {productList.map(item => (
                    <div key={item.id} className={styles.card}>
                        <div className={styles.imageWrapper}>
                            <img 
                                src={item.image} 
                                alt={item.title}
                                className={styles.productImage}
                            />
                        </div>
                        <div className={styles.cardContent}>
                            <h3 className={styles.title}>{item.title}</h3>
                            <p className={styles.category}>{item.category}</p>
                            <p className={styles.description}>{item.description}</p>
                            <div className={styles.cardFooter}>
                                <span className={styles.price}>${item.price.toFixed(2)}</span>
                                <span className={styles.rating}>
                                    {typeof item.rating === 'string' ? item.rating : item.rating.rate} ⭐
                                </span>
                            </div>
                            {item.stock > 0 ? (
                                <span className={styles.inStock}>In Stock ({item.stock})</span>
                            ) : (
                                <span className={styles.outOfStock}>Out of Stock</span>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export const Products = {
    Root,
    SortDropDown,
    GridView
};