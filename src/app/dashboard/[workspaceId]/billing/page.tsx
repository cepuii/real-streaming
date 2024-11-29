import { getPaymentInfo } from "@/actions/user";

type Props = {};

const BillingPage = async (props: Props) => {
  const payment = await getPaymentInfo();
  //WIP: payment history and payment method
  return (
    <div className="bg-[#1d1d1d] flex flex-col gap-y-8 p-5 rounded-xl">
      <div>
        <h2 className="text-2xl">Current Plan</h2>
        <p className="text-[#9d9d9d]">Your payment history</p>
      </div>
      <div>
        <h2 className="text-2xl">
          ${payment?.data?.subscription?.plan === "PRO" ? "99" : "0"}/Month
        </h2>
        <p className="text-[#9d9d9d]">
          {payment?.data?.subscription?.plan} subscription
        </p>
      </div>
    </div>
  );
};

export default BillingPage;
