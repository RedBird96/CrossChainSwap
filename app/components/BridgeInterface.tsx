import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { useTransfers } from "../hooks/useTransfers";
import { useTransferStore } from "../hooks/useTransferStore";
import { fetchBridgeFee } from "../lib/axelar";
import { AxelarQueryAPIFeeResponse, EvmChain } from "@axelar-network/axelarjs-sdk";
import TransactionList from "./TransactionList";
import { toBigNumber } from "../utils/math";
import { ethers } from "ethers";
import { ExtractedTransfer } from "../utils/types";
import { TX_LIMIT_SIZE } from "../utils/constants";

// Sub-component: Loading Spinner
const Spinner = () => (
    <div className="flex justify-center py-8">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
    </div>
);

// Wrap the main content in a client component
const BridgeContent = () => {
    const [fee, setFee] = useState<string | AxelarQueryAPIFeeResponse>();
    const { fetchTransfers } = useTransfers();
    const searchParams = useSearchParams();
    const { transfers, total, params } = useTransferStore();

    // Auto-refresh every 30 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            if (searchParams) {
                fetchTransfers(searchParams);
            }
        }, 10000);

        return () => clearInterval(interval);
    }, [params, fetchTransfers]);

    useEffect(() => {
        const loadAxelarData = async() => {
            const transferFee = await fetchBridgeFee(EvmChain.ETHEREUM, EvmChain.POLYGON, 'USDC');
            setFee(ethers.utils.formatUnits(toBigNumber(transferFee), 6));
        }
        loadAxelarData();
    }, []);

    let data:ExtractedTransfer[] = [];

    try {
        data = transfers.map(t => ({
            type: t.type,
            amount: t.send?.amount,
            destination_chain: t.send?.destination_chain,
            source_chain: t.send?.source_chain,
            txhash: t.send?.txhash,
            created_at: t.send?.created_at,
            status: t.send?.status,
            sender_address: t.send?.sender_address,
            recipient_address: t.send?.recipient_address
        })).filter((e): e is ExtractedTransfer => 
            !!e.amount &&
            !!e.destination_chain &&
            !!e.source_chain &&
            !!e.txhash &&
            !!e.created_at &&
            !!e.status &&
            !!e.sender_address &&
            !!e.recipient_address
        );
    } catch(err) {}
    
    return (
        <>
            {!data || data.length == 0 ? <Spinner /> :
                <TransactionList 
                    data={data}
                    fee={fee}
                    total={total}
                />
            }
        </>
    );
};

export default function BridgeInterface() {
    return (
        <Suspense fallback={<Spinner />}>
            <BridgeContent />
        </Suspense>
    );
}