// api/rewrite.js — Vercel 无服务器函数（保护 API 密钥）
import { MODES } from "../config.js";

export default async function handler(req, res) {
  // 只允许 POST 请求
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { text, modeId } = req.body;

  // 基本校验
  if (!text || typeof text !== "string") {
    return res.status(400).json({ error: "请提供需要改写的文字" });
  }
  if (text.length > 3000) {
    return res.status(400).json({ error: "文字超过 3000 字限制，请分段提交" });
  }

  const mode = MODES.find((m) => m.id === modeId) || MODES[1];

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 1500,
        system: mode.prompt,
        messages: [{ role: "user", content: text }],
      }),
    });

    if (!response.ok) {
      const err = await response.json();
      console.error("Anthropic error:", err);
      return res.status(500).json({ error: "AI 服务暂时不可用，请稍后重试" });
    }

    const data = await response.json();
    const result = data.content?.[0]?.text || "";
    return res.status(200).json({ result });
  } catch (error) {
    console.error("Server error:", error);
    return res.status(500).json({ error: "服务器错误，请稍后重试" });
  }
}
