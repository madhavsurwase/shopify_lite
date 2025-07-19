"use client";

import { useEffect, useState } from "react";
import { useCart } from "@/hooks/use-cart";
import { getProductRecommendations } from "@/ai/flows/product-recommendations";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { allProducts } from "@/lib/products";
import type { Product } from "@/types";
import Image from "next/image";
import { Button } from "./ui/button";
import { ShoppingCart } from "lucide-react";

export default function Recommendations() {
  const { cartItems, addToCart } = useCart();
  const [recommendations, setRecommendations] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecommendations = async () => {
      if (cartItems.length > 0) {
        setLoading(true);
        try {
          const cartItemNames = cartItems.map((item) => item.name);
          const result = await getProductRecommendations({ cartItems: cartItemNames });
          const recommendedProducts = allProducts.filter(p => result.recommendations.includes(p.name) && !cartItemNames.includes(p.name));
          setRecommendations(recommendedProducts.slice(0, 3)); // Limit to 3 recommendations
        } catch (error) {
          console.error("Failed to fetch recommendations:", error);
          setRecommendations([]);
        } finally {
          setLoading(false);
        }
      } else {
        setRecommendations([]);
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, [cartItems]);
  
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>You Might Also Like</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex items-center space-x-4">
              <Skeleton className="h-16 w-16 rounded-md" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[150px]" />
                <Skeleton className="h-4 w-[100px]" />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }

  if (recommendations.length === 0) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>You Might Also Like</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {recommendations.map((product) => (
          <div key={product.id} className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Image
                src={product.imageUrl}
                alt={product.name}
                width={64}
                height={64}
                className="rounded-md object-cover"
                data-ai-hint="product image"
              />
              <div>
                <p className="font-semibold">{product.name}</p>
                <p className="text-sm text-muted-foreground">{formatPrice(product.price)}</p>
              </div>
            </div>
            <Button size="icon" variant="outline" onClick={() => addToCart(product)}>
                <ShoppingCart className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
