import CheckoutForm from "@/components/checkout-form";
import CartSummary from "@/components/cart-summary";

export default function CheckoutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
            <h1 className="text-3xl font-bold">Checkout</h1>
            <p className="text-muted-foreground">Please fill in your details to complete the purchase.</p>
        </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <CheckoutForm />
        </div>
        <div className="lg:sticky lg:top-24 self-start">
          <CartSummary isCheckout={true} />
        </div>
      </div>
    </div>
  );
}
