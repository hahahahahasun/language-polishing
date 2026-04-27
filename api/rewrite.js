// api/rewrite.js — Vercel 无服务器函数（使用 DeepSeek API）
import { MODES } from "../config.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { text, modeId } = req.body;

  if (!text || typeof text !== "string") {
    return res.status(400).json({ error: "请提供需要改写的文字" });
  }
  if (text.length > 3000) {
    return res.status(400).json({ error: "文字超过 3000 字限制，请分段提交" });
  }

  const mode = MODES.find((m) => m.id === modeId) || MODES[0];

  try {
    const response = await fetch("https://api.deepseek.com/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.DEEPSEEK_API_KEY}`,
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        max_tokens: 2000,
        messages: [
          { role: "system", content: mode.prompt },
          { role: "user", content: text }
        ],
      }),
    });

    if (!response.ok) {
      const err = await response.json();
      console.error("DeepSeek error:", err);
      return res.status(500).json({ error: "AI 服务暂时不可用，请稍后重试" });
    }

    const data = await response.json();
    const result = data.choices?.[0]?.message?.content || "";
    return res.status(200).json({ result });
  } catch (error) {
    console.error("Server error:", error);
    return res.status(500).json({ error: "服务器错误，请稍后重试" });
  }
}
