import { createClient } from "@supabase/supabase-js";

const ANON_PUB_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzM4NTIwMywiZXhwIjoxOTU4OTYxMjAzfQ.ESogNVoP1uN9Thiqbzm19N7t527FwVwCQBPyP2k6Iy4";

const B_URL = "https://uockvcchpzmyylpdrhju.supabase.co";

const client = createClient(B_URL, ANON_PUB_KEY);

async function makeGetRequest(url) {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

async function fetchMessages() {
  result = await client
    .from("messages")
    .select("*")
    .orderBy("created_at", "desc")
    .limit(10)
    .get();

  return result;
}
