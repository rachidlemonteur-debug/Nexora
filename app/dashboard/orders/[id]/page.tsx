import { OrderDetails } from "./order-details";

export default async function OrderPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  return <OrderDetails orderId={resolvedParams.id} />;
}
