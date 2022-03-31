import React from 'react';
import { useFlutterwave, closePaymentModal } from 'flutterwave-react-v3';
import "./style.css"

// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

export default function FlutterwaveHook(prop) {
  const config = {
    public_key: 'FLWPUBK-b73d166127557d9fc24d219eb9ac96e2-X',
    tx_ref: prop.id + Date.now(),
    amount: Number(prop.amount) + 4,
    currency: prop.currency,
    payment_options: 'card,mobilemoney,ussd,banktransfer,barter,mpesa',
    customer: {
      email: prop.email,
      phonenumber: prop.phone,
      name: prop.username,
    },
    customizations: {
      title: 'Clyp Pay',
      description: 'Funding Clyp account',
      logo: 'https://clyp-solutio.herokuapp.com/uploads/clyp.png',
    },
  };

  const handleFlutterPayment = useFlutterwave(config);

  return (
    <div className="App">
      <button className="btn btn-pay btn-warning form-control"
        onClick={() => {

          handleFlutterPayment({
            callback: (response) => {
              prop.submit(response)
              //  console.log(response);
              closePaymentModal() // this will close the modal programmatically
            },
            onClose: () => { },
          });

        }}
      >
        <p className="btn-text">Send {prop.currency} {prop.amount} </p>
      </button>

    </div>
  );
}