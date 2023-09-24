from solders.hash import Hash
from solders.keypair import Keypair
from solders.message import MessageV0
from solders.system_program import TransferParams, transfer
from solders.transaction import VersionedTransaction
def tx_demo():
    b58_string = "4DEMtHriKr4or1HE4GmD3wvqhyGk7uGNrmwmeEp7qMrScX7Rm7AUYgaZ3t1VVhvXsZQxdRDiw9w9duAd9eP7vPpZ"  # let's pretend this account actually has SOL to send
    sender  = Keypair.from_base58_string(b58_string)
    sender_pubkey = "EfXFKEe2BBnYEmLUps7te9EfsMHbM1Bbj5cdtpxJdY9B"
    receiver_pubkey = "GVE5VVpxEiTtCYA3Jx2DGg8DDUVWLw5H1E6n547Ug3k3"
    ix = transfer(
        TransferParams(
            from_pubkey=sender_pubkey, to_pubkey=receiver_pubkey, lamports=1_000_000
        )
    )
    blockhash = Hash.default()  # replace with a real blockhash using getLatestBlockhash
    msg = MessageV0.try_compile(
        payer=sender_pubkey,
        instructions=[ix],
        address_lookup_table_accounts=[],
        recent_blockhash=blockhash,
    )
    tx = VersionedTransaction(msg, [sender])

def tx_demo2():
    sender = Keypair()  # let's pretend this account actually has SOL to send
    receiver = Keypair()
    ix = transfer(
        TransferParams(
            from_pubkey=sender.pubkey(), to_pubkey=receiver.pubkey(), lamports=1_000_000
        )
    )
    blockhash = Hash.default()  # replace with a real blockhash using getLatestBlockhash
    msg = MessageV0.try_compile(
        payer=sender.pubkey(),
        instructions=[ix],
        address_lookup_table_accounts=[],
        recent_blockhash=blockhash,
    )
    tx = VersionedTransaction(msg, [sender])
    print(tx)