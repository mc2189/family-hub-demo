import { NextResponse } from "next/server";
import { getSafeBankingStatus } from "@/lib/integrations/banking-guard";

export async function GET() {
  return NextResponse.json({
    ok: true,
    banking: getSafeBankingStatus(),
  });
}
