import os
from dotenv import load_dotenv
from supabase import Client, create_client

# Read backend/.env and load its values into the environment
load_dotenv()

SUPABASE_URL = os.getenv("SUPABASE_URL", "").strip()
SUPABASE_KEY = os.getenv("SUPABASE_KEY", "").strip()

# Fail fast with a clear message if the secrets are missing
if not SUPABASE_URL or not SUPABASE_KEY:
    raise RuntimeError("Missing SUPABASE_URL or SUPABASE_KEY in backend/.env")

# One shared connection that the rest of the backend imports
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)