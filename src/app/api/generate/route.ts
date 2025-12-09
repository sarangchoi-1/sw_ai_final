import { openai } from '@/lib/openai';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { idea, description } = await request.json();

    if (!idea || !description) {
      return NextResponse.json(
        { error: 'Idea and description are required' },
        { status: 400 }
      );
    }

    const prompt = `You are a startup cofounder AI. Given the following idea and description, output a structured startup pack. RESPOND ALL TEXT IN KOREAN.

IMPORTANT: All market size calculations (TAM, SAM, SOM) MUST be based on the KOREAN market only. Use realistic Korean market data, population (51.7M), GDP, and industry-specific statistics.

Idea: ${idea}

Description: ${description}

Respond strictly in the following JSON format:

{
  "bm": {
    "valueProposition": "What unique value does this startup provide to customers?",
    "revenueStreams": "How will the startup make money? (e.g., subscription, commission, ads)",
    "customerSegments": "Who are the target customers?",
    "channels": "How will customers be reached? (e.g., website, app stores, partnerships)",
    "keyPartners": "Who are the key partners or suppliers?",
    "keyActivities": "What are the most important activities to make this work?",
    "keyResources": "What key resources are needed? (e.g., technology, team, capital)",
    "costStructure": "What are the main costs? (e.g., development, marketing, operations)"
  },
  "marketSize": {
    "tam": {
      "value": 1000000000000,
      "unit": "KRW",
      "description": "Total addressable market size in Korea (e.g., total Korean market for this industry)",
      "calculation": "Detailed calculation based on Korean market data (e.g., Korean population × average spending × market penetration)"
    },
    "sam": {
      "value": 500000000000,
      "unit": "KRW",
      "description": "Serviceable addressable market in Korea (realistically reachable portion of TAM)",
      "calculation": "Detailed calculation showing how SAM is derived from TAM (e.g., TAM × addressable percentage based on demographics, geography, etc.)"
    },
    "som": {
      "value": 50000000000,
      "unit": "KRW",
      "description": "Serviceable obtainable market in Korea (realistic market share goal)",
      "calculation": "Detailed calculation showing realistic market share goal (e.g., SAM × target market share percentage)",
      "timeframe": "Year 3-5"
    }
  },
  "mvp": "Simple MVP plan. Include a mockup-style layout using text.",
  "competitors": [
    {
      "name": "Competitor Name",
      "url": "https://www.example.com",
      "description": "Brief description of what this competitor does and how they operate"
    }
  ],
  "xyz": {
    "x": {
      "action": "실행할 구체적 행동 (예: 'AI 기능이 포함된 프리미엄-프리미엄 SaaS 출시')",
      "metric": "측정 지표 (예: '월간 활성 사용자', '전환율', '매출')",
      "value": 10000,
      "unit": "명"
    },
    "y": {
      "target": "대상 고객 설명 (예: '국내 스타트업 및 소상공인')",
      "metric": "대상 규모 지표 (예: '잠재 고객 수')",
      "value": 50000,
      "unit": "명"
    },
    "z": {
      "outcome": "기대 효과 (예: '지속 가능한 성장과 제품-시장 적합성 확보')",
      "metric": "측정 지표 (예: '월 반복 매출', '고객 유지율', '시장 점유율')",
      "value": 1000000000,
      "unit": "KRW",
      "timeframe": "1~2년"
    }
  },
  "validation": "List early validation experiments"
}

IMPORTANT for marketSize:
- All values must be in KRW (Korean Won)
- Use realistic Korean market statistics
- TAM should represent the total Korean market opportunity
- SAM should be a realistic subset of TAM (typically 20-50% of TAM)
- SOM should be a realistic market share goal (typically 1-10% of SAM for early stage)
- Provide detailed calculations in Korean explaining the methodology
- Consider Korean demographics, GDP, and industry-specific data

IMPORTANT for competitors:
- Provide 3-5 real competitors that operate in the same or similar space
- Include actual website URLs (must be valid URLs starting with http:// or https://)
- Provide clear descriptions of what each competitor does and their business model
- Focus on Korean competitors when possible, but include international ones if relevant
- Make sure URLs are real and accessible

IMPORTANT for xyz hypothesis:
- X should describe a specific, measurable action with credible numbers
- Y should describe the target audience with realistic market size numbers (based on Korean market)
- Z should describe the expected outcome with measurable metrics and credible numbers
- All numbers must be realistic and based on Korean market context
- Use appropriate units: KRW for money, 명 for people, % for percentages, 회 for times/frequency
- Include timeframe for Z outcome when relevant
- Make sure the hypothesis is testable and measurable`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content:
            'You are a startup cofounder AI assistant. Always respond with valid JSON only, no additional text.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      response_format: { type: 'json_object' },
      temperature: 0.7,
    });

    const content = completion.choices[0]?.message?.content;

    if (!content) {
      return NextResponse.json(
        { error: 'No response from AI' },
        { status: 500 }
      );
    }

    const startupPack = JSON.parse(content);

    return NextResponse.json(startupPack);
  } catch (error) {
    console.error('Error generating startup pack:', error);
    return NextResponse.json(
      { error: 'Failed to generate startup pack' },
      { status: 500 }
    );
  }
}

