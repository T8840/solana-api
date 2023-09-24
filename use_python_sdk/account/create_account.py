from solders.keypair import Keypair
from solders.pubkey import Pubkey

# 创建一个新的Solana账户
keypair = Keypair()
print(type(keypair))
# 打印账户的公钥和私钥

print(f"Private Key: {keypair}")
print(f"Created Keypair with public key: {keypair.pubkey()}")

