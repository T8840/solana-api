from solders.pubkey import Pubkey

program_id = Pubkey.from_string("GVE5VVpxEiTtCYA3Jx2DGg8DDUVWLw5H1E6n547Ug3k3")
pda, bump = Pubkey.find_program_address([b"test"], program_id)
print(f"bump: {bump}; pda: {pda}")