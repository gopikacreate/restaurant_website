// src/app/order/success/page.js
// The page Stripe sends people back to after paying: /order/success?order_id=5
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import OrderStatus from "@/components/OrderStatus";

export default async function SuccessPage({ searchParams }) {
  const { order_id } = await searchParams; // the ?order_id= part of the address

  return (
    <>
      <Header />
      <main className="px-5 py-12 md:py-20">
        <OrderStatus orderId={order_id} />
      </main>
      <Footer />
    </>
  );
}