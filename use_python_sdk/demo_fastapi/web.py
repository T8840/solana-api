from fastapi import FastAPI, HTTPException
from solana.rpc.api import Client
from .config import receiver_address

app = FastAPI()
solana_client = Client("https://api.devnet.solana.com")  # 你可以根据需要更换网络URL

TOKEN_THRESHOLD = 1  # 设置100BAI为阈值

def check_balance_and_deduct(address: str):
    # 这里只检查余额，真实应用还需要处理扣款的逻辑
    balance_info = solana_client.get_token_account_balance(address)
    balance = int(balance_info["result"]["value"]["amount"])
    
    if balance >= TOKEN_THRESHOLD:
        receiver = receiver_address
        if deduct_tokens(receiver, TOKEN_THRESHOLD * 10**9):  # 乘以10^9是因为Solana的基本单位是lamports
            return True
    return False

@app.post("/chat/")
async def chat(address: str):  # 这里使用了一个简单的地址字符串参数，你可能需要一个更复杂的请求模型
    if not check_balance_and_deduct(address):
        raise HTTPException(status_code=400, detail="Insufficient BAI tokens")
    
    # 你的/chat接口的其他逻辑
    return {"message": "Chat successful!"}

# 主函数启动服务
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
