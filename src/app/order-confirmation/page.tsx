import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function OrderConfirmationPage() {
    return (
        <div className="container mx-auto px-4 py-16 flex justify-center items-center">
            <Card className="max-w-lg w-full text-center">
                <CardHeader>
                    <div className="mx-auto bg-green-100 rounded-full p-4 w-fit">
                        <CheckCircle2 className="h-16 w-16 text-green-600" />
                    </div>
                    <CardTitle className="text-3xl font-bold mt-4">Thank You for Your Order!</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p className="text-muted-foreground">
                        Your order has been placed successfully. A confirmation email has been sent to you.
                    </p>
                    <Button asChild>
                        <Link href="/">Continue Shopping</Link>
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}
