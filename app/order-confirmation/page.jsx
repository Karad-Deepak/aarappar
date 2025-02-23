// app/order-confirmation/page.jsx
import Nav from "../components/Nav";
export default function OrderConfirmation() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-lightbg text-white">
      <Nav />
      <div className="p-8 bg-darkbg rounded-lg shadow-lg text-center">
        <h1 className="text-3xl font-bold mb-4">Thank you for your order!</h1>
        <p>
          Your order has been submitted successfully. we will connect with you
          shortly
        </p>
      </div>
    </div>
  );
}
