export type Archetype =
  | '稳定照顾型'
  | '能扛事推进型'
  | '温柔守护型'
  | '温柔但没结果型'
  | '体面逃避型'
  | '强势控制型'
  | '现实算计型';

export interface RoleSummary {
  id: string;
  name: string;
  source: string;
  archetype: Archetype;
  title: string;
  tags: string[];
  oneLiner: string;
  riskHint: string;
  partnerView: string;
  iconicQuote: string;
}

export interface QuestionOption {
  id: string;
  label: string;
  archetype: Archetype;
}

export interface QuizQuestion {
  id: number;
  title: string;
  scene: string;
  options: QuestionOption[];
}