const express = require('express');
const path = require('path');
const OpenAI = require('openai').default;

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(express.static('.'));

const openai = new OpenAI({
  apiKey: process.env.AI_INTEGRATIONS_OPENAI_API_KEY,
  baseURL: process.env.AI_INTEGRATIONS_OPENAI_BASE_URL,
});

const BRAND_CONTEXT = `
You are a content writer for Dobar Ventures LLC, a modern holding and venture studio.

Brand Identity:
- Dobar Ventures builds durable, human-centered systems where technology quietly does its job
- Focus areas: Healthcare IT, Operational tools/micro-SaaS, Property ventures, Systems that reduce friction and burnout
- Sits between traditional holding company and builder studio

Brand Personality:
- Calm, not loud
- Competent, not clever
- Human, not hype
- Ethical, not extractive

Tone Rules:
- Short paragraphs
- Clear verbs
- No hype language
- No empty promises

Words to AVOID: "Disrupting", "Revolutionary", "Next-gen", "Unprecedented"
Words to PREFER: "We build", "We operate", "We focus on", "Designed for real use"

"Dobar" means "good" in Croatian - implies good systems, good faith, good work done well.
`;

app.post('/api/generate-content', async (req, res) => {
  try {
    const { section, currentContent } = req.body;
    
    let prompt = '';
    switch(section) {
      case 'hero':
        prompt = 'Write a compelling hero tagline (max 8 words) and a 2-sentence subtext for Dobar Ventures homepage. Return as JSON with "tagline" and "subtext" keys.';
        break;
      case 'what-we-do':
        prompt = 'Write content for "What We Do" section. Include a brief intro paragraph (2-3 sentences) and 4 bullet points for focus areas. Return as JSON with "intro" and "bullets" (array) keys.';
        break;
      case 'how-we-work':
        prompt = 'Write content for "How We Work" section. Include a brief intro paragraph (2-3 sentences) and 4 bullet points about approach. Return as JSON with "intro" and "bullets" (array) keys.';
        break;
      case 'current-focus':
        prompt = 'Write content for "Current Focus" section. Include 3-4 current project areas as bullet points. Return as JSON with "bullets" (array) key.';
        break;
      default:
        return res.status(400).json({ error: 'Invalid section' });
    }

    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: BRAND_CONTEXT },
        { role: 'user', content: prompt }
      ],
      response_format: { type: 'json_object' },
      max_tokens: 500,
    });

    const content = JSON.parse(response.choices[0].message.content);
    res.json(content);
  } catch (error) {
    console.error('Error generating content:', error);
    res.status(500).json({ error: 'Failed to generate content' });
  }
});

app.post('/api/generate-all', async (req, res) => {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: BRAND_CONTEXT },
        { role: 'user', content: `Generate all website content for Dobar Ventures. Return as JSON with these keys:
- hero: { tagline: string (max 8 words), subtext: string (2 sentences) }
- whatWeDo: { intro: string (2-3 sentences), bullets: string[] (4 items) }
- howWeWork: { intro: string (2-3 sentences), bullets: string[] (4 items) }
- currentFocus: { bullets: string[] (3-4 items) }` }
      ],
      response_format: { type: 'json_object' },
      max_tokens: 1000,
    });

    const content = JSON.parse(response.choices[0].message.content);
    res.json(content);
  } catch (error) {
    console.error('Error generating content:', error);
    res.status(500).json({ error: 'Failed to generate content' });
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
});
