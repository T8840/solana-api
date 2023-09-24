if __package__ is None or __package__ == "":
    # 将模块的路径修改为一个包路径
    from os.path import dirname, abspath
    import sys
    sys.path.insert(0, dirname(dirname(abspath(__file__))))

    # 使用相对导入
    from config import private_wallet, receiver_address
else:
    from .config import private_wallet, receiver_address




from solana.rpc.api import Client
from solana.account import Account
from solana.transaction import TransactionInstruction, Transaction
from solana.blockhash import Blockhash
from solana.system_program import TransferParams, transfer

from demo_fastapi.config import private_wallet, receiver_address


solana_client = Client("https://api.devnet.solana.com")

def deduct_tokens(receiver_address: str, amount: int) -> bool:
    # 加载或生成账户的密钥对（这可以是你的服务账户或一个中间账户）
    payer = Account(private_wallet)

    # 获取最新的blockhash
    recent_blockhash = solana_client.get_recent_blockhash()["result"]["value"]["blockhash"]
    
    # 创建转账指令
    transfer_params = TransferParams(
        from_pubkey=payer.public_key(), to_pubkey=receiver_address, lamports=amount
    )
    transfer_instruction = transfer(transfer_params)

    # 创建并签署交易
    txn = Transaction(
        recent_blockhash=Blockhash(recent_blockhash),
        instructions=[transfer_instruction],
    )
    txn.sign(payer)

    # 发送交易并确认
    tx_signature = solana_client.send_transaction(txn)["result"]
    confirmation = solana_client.confirm_transaction(tx_signature)
    
    return confirmation["result"]["value"]["status"]["Ok"] is not None


if __name__ =="__main__":
    deduct_tokens(receiver_address,1* 10**9)