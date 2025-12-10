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

    const prompt = `You are a startup cofounder AI. Given the following idea and description, output a structured startup pack. RESPOND ALL TEXT IN KOREAN. THINK STEP-BY-STEP AND PROVIDE A DETAILED PLAN.

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
      "value": 0,
      "unit": "KRW",
      "description": "Total addressable market size in Korea for this specific startup idea",
      "calculation": "Calculate the actual TAM value based on the startup idea. Show detailed step-by-step calculation using Korean market data that results in the exact TAM value you provide."
    },
    "sam": {
      "value": 0,
      "unit": "KRW",
      "description": "Serviceable Addressable Market - the portion of TAM that can actually be reached with this specific product/service",
      "calculation": "Calculate the actual SAM value based on the startup idea. Show detailed step-by-step calculation that results in the exact SAM value you provide. The calculation must match the SAM value exactly."
    },
    "som": {
      "value": 0,
      "unit": "KRW",
      "description": "Serviceable Obtainable Market - realistic market share for this specific startup in 3-5 years",
      "calculation": "Calculate the actual SOM value based on the startup idea. Show detailed step-by-step calculation that results in the exact SOM value you provide. The calculation must match the SOM value exactly.",
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
  "validation": "Detailed validation plan with timeline. Format:\n\n[1주차-2주차] 초기 검증\n- 구체적 실험/행동\n- 예상 결과\n- 성공 기준\n\n[3주차-4주차] 사용자 피드백 수집\n- 구체적 실험/행동\n- 예상 결과\n- 성공 기준\n\n[1개월-3개월] MVP 테스트\n- 구체적 실험/행동\n- 예상 결과\n- 성공 기준\n\n[3개월-6개월] 초기 트랙션 확보\n- 구체적 실험/행동\n- 예상 결과\n- 성공 기준\n\n주요 리스크:\n- 리스크 1: 설명 및 대응 방안\n- 리스크 2: 설명 및 대응 방안"
}

CRITICAL for marketSize - DO NOT USE EXAMPLE VALUES:
- The example values (1000000000000, 500000000000, 50000000000) are ONLY placeholders
- You MUST calculate actual TAM, SAM, and SOM values based on the specific startup idea provided
- Each startup idea will have DIFFERENT market sizes - calculate them specifically for this idea
- The "value" field must contain the actual calculated number (not the example)
- The "calculation" field must show the step-by-step math that results in EXACTLY that value
- The calculation text and the value MUST match - if calculation says "= ₩425억", then value must be 42500000000
- All values must be in KRW (Korean Won)
- Use realistic Korean market statistics
- TAM should represent the total Korean market opportunity for THIS SPECIFIC startup idea
- SAM calculation MUST be detailed and credible:
  * DO NOT just say "X% of TAM"
  * Break down by demographics (age groups, income levels, urban vs rural) with actual numbers
  * Consider geography (Seoul metro, other cities, accessibility) with percentages
  * Factor in technology adoption rates, infrastructure requirements with actual stats
  * Consider product-market fit (who actually needs/uses this) with filtering percentages
  * Show step-by-step calculation with actual Korean statistics that leads to the exact SAM value
  * MUST end with the final calculation showing how the SAM value was derived
  * Example: "Korean population 51.7M × target age 25-45 (35%) = 18.1M × urban (82%) = 14.8M × smartphone penetration (95%) = 14.1M × target segment (60%) = 8.5M × ₩50,000 avg spending = ₩425억 SAM"
- SOM calculation MUST be detailed and credible:
  * DO NOT just say "X% of SAM"
  * Analyze competitive landscape with actual market shares of competitors
  * Reference similar Korean startups and their actual Year 3-5 market share numbers
  * Consider early-stage constraints with specific impact on achievable share
  * Explain realistic growth timeline with percentages per year (Year 1: X%, Year 3: Y%, Year 5: Z%)
  * Show step-by-step reasoning that leads to the exact SOM value
  * MUST end with the final calculation showing how the SOM value was derived
  * Example: "Market analysis shows 15% available share. Similar startups achieve 0.5-2% by Year 3. Given constraints, realistic target is 1.2%. SAM ₩425억 × 1.2% = ₩51억 SOM"
- Provide detailed calculations in Korean explaining the methodology step-by-step
- Use actual Korean statistics: population demographics, income distribution, urban/rural split, technology adoption rates

IMPORTANT for competitors:
- Provide 3-5 real competitors that operate in the same or similar space
- Include actual website URLs (must be valid URLs starting with http:// or https://)
- Provide clear descriptions of what each competitor does and their business model
- Focus on Korean competitors when possible, but include international ones if relevant
- Make sure URLs are real and accessible

IMPORTANT for xyz hypothesis (CRITICAL: This is for someone JUST STARTING a startup):
- X (Action): Should be a realistic early-stage action (e.g., "launch MVP", "get first 100 users", "run pilot with 5 customers")
  - Use conservative numbers: 10-100 users, 5-20 customers, 1-3 months timeframe
  - NOT: "acquire 10,000 users" or "generate ₩1억 revenue" (too ambitious for starting)
- Y (Target): Should describe a realistic early adopter segment
  - Use small, specific numbers: 50-500 people, 10-50 companies, specific demographics
  - NOT: "all Korean consumers" or "entire market" (too broad for starting)
- Z (Outcome): Should be a realistic early validation metric
  - Use conservative numbers: ₩100만-₩1000만 revenue, 5-20% conversion, 10-50 active users
  - Timeframe: 3-6 months for early validation, 1-2 years for meaningful traction
  - NOT: "₩10억 revenue" or "1 million users" (unrealistic for starting)
- All numbers must reflect EARLY-STAGE startup reality: small, testable, achievable
- Think MVP phase, not scaling phase
- Use appropriate units: KRW for money, 명 for people, % for percentages, 회 for times/frequency
- Make sure the hypothesis is testable and measurable with limited resources

IMPORTANT for validation plan:
- Must include a detailed timeline with specific weeks/months
- Format: [기간] 제목\n- 구체적 action plan\n- 예상 결과\n- 성공 기준
- Timeline should cover: Week 1-2 (initial validation), Week 3-4 (user feedback), Month 1-3 (MVP testing), Month 3-6 (early traction)
- Each phase should have specific, actionable experiments
- Include measurable success criteria for each phase
- List 3-5 key risks with specific mitigation strategies
- All experiments should be low-cost and achievable for early-stage startup
- Focus on validating core assumptions from XYZ hypothesis`;

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

