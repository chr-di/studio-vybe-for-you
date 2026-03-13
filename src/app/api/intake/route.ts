import { NextRequest, NextResponse } from 'next/server';

const N8N_WEBHOOK = 'https://n8n.dian.solutions/webhook/nz8Ft7MMGiwmnonS/webhook/studio-vybe-intake';

export async function POST(req: NextRequest) {
  let body: Record<string, unknown> = {};

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ success: false, error: 'Invalid JSON' }, { status: 400 });
  }

  // Always return success to the user — never let a backend failure show as a form error
  // Forward to n8n in the background (fire-and-forget)
  forwardToN8n(body);

  // Log to server console — visible in Coolify container logs as a fallback record
  console.log('[INTAKE]', JSON.stringify({
    ts: new Date().toISOString(),
    email: body.email,
    name: body.name,
    form: body.form || 'apply',
    source: body.source || 'form',
    budget: body.budget,
    siteGoal: body.siteGoal,
    vibe: body.vibe,
  }));

  return NextResponse.json({ success: true, message: 'Thank you! We will be in touch soon.' });
}

async function forwardToN8n(body: Record<string, unknown>) {
  try {
    const res = await fetch(N8N_WEBHOOK, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      console.warn('[INTAKE] n8n forward failed:', res.status, await res.text().catch(() => ''));
    } else {
      console.log('[INTAKE] n8n forward OK');
    }
  } catch (err) {
    console.warn('[INTAKE] n8n forward error:', err instanceof Error ? err.message : String(err));
  }
}
