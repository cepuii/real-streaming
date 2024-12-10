import { Button } from "@/components/ui/button";
import { useSubscription } from "@/hooks/useSubscription";
import Loader from "../loader";

type Props = {};

const PaymentButton = (props: Props) => {
  const { onSubscribe, isProcessing } = useSubscription();

  return (
    <Button className="text-sm w-full mt-2" onClick={onSubscribe}>
      <Loader color="#000" state={isProcessing}>
        Upgrade
      </Loader>
    </Button>
  );
};

export default PaymentButton;
