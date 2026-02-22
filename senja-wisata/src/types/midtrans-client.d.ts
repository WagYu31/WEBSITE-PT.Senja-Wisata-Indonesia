declare module "midtrans-client" {
    interface SnapOptions {
        isProduction: boolean;
        serverKey: string;
        clientKey: string;
    }

    interface TransactionDetails {
        order_id: string;
        gross_amount: number;
    }

    interface ItemDetail {
        id: string;
        price: number;
        quantity: number;
        name: string;
    }

    interface CustomerDetails {
        first_name?: string;
        last_name?: string;
        email?: string;
        phone?: string;
    }

    interface SnapParameter {
        transaction_details: TransactionDetails;
        item_details?: ItemDetail[];
        customer_details?: CustomerDetails;
        callbacks?: {
            finish?: string;
        };
    }

    interface SnapResponse {
        token: string;
        redirect_url: string;
    }

    class Snap {
        constructor(options: SnapOptions);
        createTransaction(parameter: SnapParameter): Promise<SnapResponse>;
    }

    export default {
        Snap,
    };
}
