from solana.rpc.api import Client
from solana.system_program import CreateAccountParams, create_account
from solana.transaction import Transaction
from solana.blockhash import Blockhash
from solana.account import Account
from spl.token.client import Token

# 1. 连接到Solana集群（这里我们使用开发网络）
solana_client = Client("https://devnet.solana.com")

# 2. 创建一个新的代币账户，用于存放代币的相关信息
token_account = Account()

# 获取最新的blockhash
recent_blockhash = solana_client.get_recent_blockhash()["result"]["value"]["blockhash"]

# 构建一个创建账户的交易
txn = Transaction(recent_blockhash=Blockhash(recent_blockhash))

lamports = solana_client.get_minimum_balance_for_rent_exemption(610)["result"]["value"]
create_account_params = CreateAccountParams(
    from_pubkey=token_account.public_key(),
    new_account_pubkey=token_account.public_key(),
    lamports=lamports,
    space=610,
    program_id=Token.program_id()
)
txn.add(create_account(create_account_params))

# 3. 使用SPL库创建新的代币
token = Token.create_mint(
    client=solana_client,
    program_id=Token.program_id(),
    mint_authority=token_account.public_key(),
    payer=token_account,
    decimals=2,  # 设置小数点后的位数
    optional_args={"token_mint_name": "BAI", "token_symbol": "BAI"}
)

print(f"Created new token with mint address: {token.pubkey}")
