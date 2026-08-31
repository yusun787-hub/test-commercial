import type { Archetype, QuizQuestion, RoleSummary } from './types';

export const roleHighlights: RoleSummary[] = [
  {
    id: 'gu-tingye',
    name: '顾廷烨',
    source: '《知否》',
    archetype: '能扛事推进型',
    title: '关键时刻会顶上的推进派',
    tags: ['靠谱', '会扛事', '现实感强'],
    oneLiner: '嘴不一定甜，但真出事时他会站出来。',
    riskHint: '容易用解决问题替代情绪安抚。',
  },
  {
    id: 'chen-junsheng',
    name: '陈俊生',
    source: '《我的前半生》',
    archetype: '体面逃避型',
    title: '看上去温和，关键处却会退的人',
    tags: ['体面', '摇摆', '掉线'],
    oneLiner: '不是大坏人，但会慢慢把人耗累。',
    riskHint: '愧疚不等于真正担当。',
  },
  {
    id: 'xie-zhiyao',
    name: '谢之遥',
    source: '《去有风的地方》',
    archetype: '稳定照顾型',
    title: '适合长期相处的稳定派',
    tags: ['稳定', '松弛', '有边界'],
    oneLiner: '不刺激，但会让人慢慢安稳下来。',
    riskHint: '太克制时会显得不够上头。',
  },
  {
    id: 'he-yichen',
    name: '何以琛',
    source: '《何以笙箫默》',
    archetype: '温柔守护型',
    title: '外冷内热、长期守候的守护派',
    tags: ['专一', '克制', '守护感'],
    oneLiner: '表达不多，但会把你放进很长远的计划里。',
    riskHint: '太能忍时，也会让误会被拖得很久。',
  },
  {
    id: 'li-xun',
    name: '李峋',
    source: '《点燃我，温暖你》',
    archetype: '强势控制型',
    title: '很有吸引力，也很有压迫感的主导派',
    tags: ['强势', '锋利', '上头'],
    oneLiner: '他会带你冲，但也容易让关系围着他的节奏转。',
    riskHint: '吸引力很强，但需要警惕控制感和情绪压迫。',
  },
  {
    id: 'fan-xian',
    name: '范闲',
    source: '《庆余年》',
    archetype: '现实算计型',
    title: '清醒权衡、会算账也会护短的现实派',
    tags: ['聪明', '权衡', '现实'],
    oneLiner: '他懂浪漫，也懂局势，爱里常常带着判断。',
    riskHint: '太会权衡时，容易让人觉得自己只是局中一环。',
  },
  {
    id: 'li-daqi',
    name: '李大齐',
    source: '《粉红女郎》',
    archetype: '温柔但没结果型',
    title: '让人心软，却不一定能走到底的温柔派',
    tags: ['温柔', '暧昧', '不确定'],
    oneLiner: '他会给你很多柔软瞬间，但未必给得出明确未来。',
    riskHint: '别把一时温柔误认成长期承诺。',
  },
];

export const archetypeProfiles: Record<Archetype, {
  loveView: string;
  analysis: string;
  partnerView: string;
  exploration: string;
  dimensions: { label: string; value: number; roleAvg: number; description: string }[];
}> = {
  稳定照顾型: {
    loveView: '他习惯先让关系回到安全区，再一起解决问题。爱的方式不一定轰轰烈烈，但会体现在稳定回应、尊重边界和持续陪伴里。',
    analysis: '你的选择集中在情绪承接、边界透明和稳定行动上，说明你更容易被“让人安心”的相处方式打动。',
    partnerView: 'TA 的恋爱观偏长期主义：少一点戏剧化，多一点真实生活里的照顾和可靠。',
    exploration: '如果想继续验证，可以观察 TA 在压力、冲突和异性边界里的连续表现。',
    dimensions: [
      { label: '情绪价值', value: 9, roleAvg: 8, description: '能接住情绪，也愿意给出具体安抚。' },
      { label: '责任感', value: 8, roleAvg: 8, description: '对承诺和生活安排有持续行动。' },
      { label: '边界感', value: 9, roleAvg: 8, description: '关系边界清楚，会主动降低误会。' },
      { label: '稳定性', value: 9, roleAvg: 9, description: '情绪和关系节奏都比较稳定。' },
      { label: '浪漫感', value: 6, roleAvg: 6, description: '浪漫不夸张，但细节里有温度。' },
      { label: '现实感', value: 7, roleAvg: 7, description: '能兼顾感受与现实安排。' },
    ],
  },
  能扛事推进型: {
    loveView: '他爱一个人的方式偏行动派：遇事先站出来，把问题拆开、往前推。缺点是有时太快进入解决模式，忘了你此刻更需要被理解。',
    analysis: '你的答案更偏向“关键时刻是否靠得住”，你看重担当、执行力和冲突后的修复能力。',
    partnerView: 'TA 的恋爱观是一起过日子、一起打仗，安全感来自行动而不是甜言蜜语。',
    exploration: '建议留意他是否能在解决问题之外，也愿意停下来听你的感受。',
    dimensions: [
      { label: '情绪价值', value: 6, roleAvg: 6, description: '会关心你，但常常用方案代替安慰。' },
      { label: '责任感', value: 9, roleAvg: 9, description: '关键问题上有承担，不容易把你丢下。' },
      { label: '边界感', value: 7, roleAvg: 7, description: '原则感较强，但表达方式可能偏硬。' },
      { label: '稳定性', value: 8, roleAvg: 8, description: '遇到外部压力时更愿意处理而不是逃避。' },
      { label: '浪漫感', value: 5, roleAvg: 5, description: '仪式感不是强项，更偏实际付出。' },
      { label: '现实感', value: 9, roleAvg: 9, description: '目标、资源和后果都会纳入判断。' },
    ],
  },
  温柔守护型: {
    loveView: '他把喜欢藏在长期陪伴里，不一定高调，却会记得你的习惯、替你留位置，也愿意在你需要时默默出现。',
    analysis: '你的选择更看重专一、耐心和细水长流的守护感，说明你对关系里的“被放在心上”非常敏感。',
    partnerView: 'TA 的恋爱观偏深情和克制：不轻易开始，但开始后会很认真。',
    exploration: '需要确认的是，克制背后是成熟，还是不擅长沟通导致的距离感。',
    dimensions: [
      { label: '情绪价值', value: 8, roleAvg: 8, description: '安慰方式温和，不会轻易否定你的感受。' },
      { label: '责任感', value: 8, roleAvg: 8, description: '愿意长期投入，也珍惜承诺。' },
      { label: '边界感', value: 8, roleAvg: 8, description: '对亲密关系有明确忠诚感。' },
      { label: '稳定性', value: 8, roleAvg: 8, description: '关系节奏稳定，但有时表达偏慢。' },
      { label: '浪漫感', value: 7, roleAvg: 7, description: '浪漫更像暗线，藏在细节和记忆里。' },
      { label: '现实感', value: 6, roleAvg: 6, description: '现实安排会考虑，但不完全压过感情。' },
    ],
  },
  温柔但没结果型: {
    loveView: '他会给你很多被喜欢的瞬间，但当关系需要确定答案、承担成本时，又容易停在暧昧和犹豫里。',
    analysis: '你的答案里出现了较多“有感受但无推进”的信号，说明这段关系可能好嗑，但不一定好落地。',
    partnerView: 'TA 的恋爱观重感觉、重当下，也可能害怕承诺改变现有生活。',
    exploration: '下一步最该看的不是他温不温柔，而是他是否愿意把你放进明确计划。',
    dimensions: [
      { label: '情绪价值', value: 7, roleAvg: 7, description: '会提供温柔回应，但稳定性不足。' },
      { label: '责任感', value: 4, roleAvg: 4, description: '遇到承诺和现实推进时容易迟疑。' },
      { label: '边界感', value: 5, roleAvg: 5, description: '关系边界有时暧昧，不够清晰。' },
      { label: '稳定性', value: 4, roleAvg: 4, description: '热度和行动容易随环境变化。' },
      { label: '浪漫感', value: 8, roleAvg: 8, description: '很会制造让人心动的瞬间。' },
      { label: '现实感', value: 4, roleAvg: 4, description: '对长期问题的处理偏弱。' },
    ],
  },
  体面逃避型: {
    loveView: '他习惯用解决问题的方式回应你的情绪，表面体面周全，但在需要真正暴露脆弱或承担冲突时，更倾向于退一步维护秩序。',
    analysis: '你的答案较多指向“表面温和、关键处掉线”，这类关系容易让人说不出大错，却长期感到疲惫。',
    partnerView: 'TA 的恋爱观偏体面和低冲突：能维持关系外壳，但不一定愿意处理深层问题。',
    exploration: '建议重点观察冲突后的复盘质量，以及同类问题是否反复发生。',
    dimensions: [
      { label: '情绪价值', value: 4, roleAvg: 5, description: '不太会主动提供情绪支持，多用道理回应你的感受。' },
      { label: '责任感', value: 6, roleAvg: 6, description: '事业上有担当，但在关系细节中容易掉线。' },
      { label: '边界感', value: 3, roleAvg: 4, description: '与外界关系暧昧，给人不够明确的距离信号。' },
      { label: '稳定性', value: 5, roleAvg: 5, description: '情绪整体平稳，但压力大时可能选择回避。' },
      { label: '浪漫感', value: 7, roleAvg: 6, description: '偶尔会制造仪式感，但持续性一般。' },
      { label: '现实感', value: 8, roleAvg: 7, description: '对生活规划清晰，做事讲效率和体面。' },
    ],
  },
  强势控制型: {
    loveView: '他存在感强、决策快，也可能让你短时间很上头。但当他的节奏压过你的感受，关系就容易从保护感变成控制感。',
    analysis: '你的答案集中在主导、压制和高吸引力信号上，说明这段关系可能强烈，但也需要更高的边界意识。',
    partnerView: 'TA 的恋爱观偏掌控和占有：爱你，也希望关系按他的方式运行。',
    exploration: '建议认真区分“有主见”和“不尊重”，尤其看他是否允许你说不。',
    dimensions: [
      { label: '情绪价值', value: 3, roleAvg: 3, description: '不太习惯承接情绪，更容易给判断。' },
      { label: '责任感', value: 7, roleAvg: 7, description: '会承担，但常带着强主导。' },
      { label: '边界感', value: 3, roleAvg: 3, description: '容易以爱之名越过你的边界。' },
      { label: '稳定性', value: 5, roleAvg: 5, description: '情绪强度高，稳定性取决于掌控感。' },
      { label: '浪漫感', value: 8, roleAvg: 8, description: '上头感很强，戏剧张力高。' },
      { label: '现实感', value: 7, roleAvg: 7, description: '判断现实，但也容易把你纳入他的计划。' },
    ],
  },
  现实算计型: {
    loveView: '他很清醒，会把感情放进现实局势里判断。优点是成熟、有规划，风险是你可能分不清自己是被爱着，还是被安排着。',
    analysis: '你的选择明显偏向权衡、资源、体面和收益判断，说明这类关系里理性成分会很重。',
    partnerView: 'TA 的恋爱观偏现实主义：喜欢是真的，但选择也要合算、可控、能落地。',
    exploration: '建议观察他在利益冲突时，是优先保护关系，还是优先保护自己的最优解。',
    dimensions: [
      { label: '情绪价值', value: 5, roleAvg: 5, description: '会照顾感受，但不会让感受压过判断。' },
      { label: '责任感', value: 7, roleAvg: 7, description: '承担建立在成本可控和目标明确之上。' },
      { label: '边界感', value: 6, roleAvg: 6, description: '边界感较强，但也会服务于现实目标。' },
      { label: '稳定性', value: 7, roleAvg: 7, description: '外部稳定性不错，内在温度需要确认。' },
      { label: '浪漫感', value: 5, roleAvg: 5, description: '浪漫会有，但常被现实安排包裹。' },
      { label: '现实感', value: 9, roleAvg: 9, description: '擅长权衡局势、资源和未来收益。' },
    ],
  },
};

export const sampleQuestions: QuizQuestion[] = [
  {
    id: 1,
    title: '你工作上遇到大挫折，晚上忍不住想哭。',
    scene: '他更可能怎么反应？',
    options: [
      { id: '1a', label: '先接住情绪，陪你缓下来，再聊后面怎么办', archetype: '稳定照顾型' },
      { id: '1b', label: '马上帮你拆问题、列方案、推动解决', archetype: '能扛事推进型' },
      { id: '1c', label: '会安慰，但聊到关键处容易闪躲', archetype: '体面逃避型' },
      { id: '1d', label: '第一反应是你别想太多，甚至嫌你情绪麻烦', archetype: '强势控制型' },
    ],
  },
  {
    id: 2,
    title: '你们刚吵完架，你还在意这件事。',
    scene: '他更可能怎么处理？',
    options: [
      { id: '2a', label: '愿意复盘并推动修复，不让问题拖着', archetype: '能扛事推进型' },
      { id: '2b', label: '先给你空间，等情绪下去后再好好聊', archetype: '稳定照顾型' },
      { id: '2c', label: '看似哄住了，但几天后又恢复原样', archetype: '体面逃避型' },
      { id: '2d', label: '会把话题拉回秩序和规则，让你适应他的方式', archetype: '现实算计型' },
    ],
  },
  {
    id: 3,
    title: '你发现他与异性互动的边界让你不舒服。',
    scene: '他更像是哪种处理方式？',
    options: [
      { id: '3a', label: '认真听你的不安，主动给出更清楚的边界', archetype: '稳定照顾型' },
      { id: '3b', label: '觉得自己能掌控局面，不太愿意解释', archetype: '强势控制型' },
      { id: '3c', label: '嘴上说会改，但总在类似地方反复掉线', archetype: '体面逃避型' },
      { id: '3d', label: '会权衡体面、关系、外界眼光，处理得很现实', archetype: '现实算计型' },
    ],
  },
  {
    id: 4,
    title: '你临时生病，原本约好的安排全被打乱。',
    scene: '他的第一反应更像？',
    options: [
      { id: '4a', label: '先确认你是否难受，主动调整安排照顾你', archetype: '稳定照顾型' },
      { id: '4b', label: '迅速安排挂号、交通和后续事项', archetype: '能扛事推进型' },
      { id: '4c', label: '嘴上关心，但实际行动需要你提醒', archetype: '体面逃避型' },
      { id: '4d', label: '会担心计划被破坏，情绪先上来', archetype: '强势控制型' },
    ],
  },
  {
    id: 5,
    title: '你想公开你们的关系，比如发朋友圈或见朋友。',
    scene: '他更可能怎么回应？',
    options: [
      { id: '5a', label: '自然配合，也愿意让你进入他的生活圈', archetype: '温柔守护型' },
      { id: '5b', label: '会考虑时机、影响和外界评价后再决定', archetype: '现实算计型' },
      { id: '5c', label: '不拒绝你，但总说再等等、以后再说', archetype: '温柔但没结果型' },
      { id: '5d', label: '认为公开方式应该由他来定，不太接受你的节奏', archetype: '强势控制型' },
    ],
  },
  {
    id: 6,
    title: '你表达“我希望你多陪陪我”。',
    scene: '他通常会怎么做？',
    options: [
      { id: '6a', label: '认真调整时间，让你感到自己被放在心上', archetype: '稳定照顾型' },
      { id: '6b', label: '会答应，但忙起来又慢慢恢复原样', archetype: '体面逃避型' },
      { id: '6c', label: '用一次很浪漫的补偿哄你，但长期安排不明确', archetype: '温柔但没结果型' },
      { id: '6d', label: '直接协调日程，把陪伴变成固定安排', archetype: '能扛事推进型' },
    ],
  },
  {
    id: 7,
    title: '你们讨论未来要不要一起生活。',
    scene: '他更像哪种状态？',
    options: [
      { id: '7a', label: '愿意聊现实细节，也会给你稳定预期', archetype: '稳定照顾型' },
      { id: '7b', label: '会列预算、城市、工作节奏，把问题往落地推', archetype: '能扛事推进型' },
      { id: '7c', label: '讲得很美好，但一到具体时间就含糊', archetype: '温柔但没结果型' },
      { id: '7d', label: '更关注条件是否成熟、选择是否划算', archetype: '现实算计型' },
    ],
  },
  {
    id: 8,
    title: '你拒绝了他一个不太舒服的要求。',
    scene: '他更可能怎么反应？',
    options: [
      { id: '8a', label: '尊重你的不舒服，愿意重新商量边界', archetype: '温柔守护型' },
      { id: '8b', label: '不高兴，但还是会试着找到替代方案', archetype: '能扛事推进型' },
      { id: '8c', label: '表面没事，之后却开始冷处理', archetype: '体面逃避型' },
      { id: '8d', label: '觉得你不够配合，试图说服你接受他的安排', archetype: '强势控制型' },
    ],
  },
  {
    id: 9,
    title: '你在一段时间里状态很低，什么都不想做。',
    scene: '他会如何陪你？',
    options: [
      { id: '9a', label: '不催你振作，先陪你把日子过稳一点', archetype: '稳定照顾型' },
      { id: '9b', label: '默默做很多小事，让你知道他一直在', archetype: '温柔守护型' },
      { id: '9c', label: '努力给建议，但对长期低落会有点不耐烦', archetype: '能扛事推进型' },
      { id: '9d', label: '会劝你别沉浸情绪，希望你尽快恢复正常', archetype: '现实算计型' },
    ],
  },
  {
    id: 10,
    title: '你们发生误会，需要有人先低头解释。',
    scene: '他更像哪一种？',
    options: [
      { id: '10a', label: '愿意先靠近，把误会说清楚', archetype: '温柔守护型' },
      { id: '10b', label: '会把事情讲明白，但语气可能偏硬', archetype: '能扛事推进型' },
      { id: '10c', label: '等你先开口，自己尽量保持体面', archetype: '体面逃避型' },
      { id: '10d', label: '会判断谁更占理，不太愿意轻易让步', archetype: '现实算计型' },
    ],
  },
  {
    id: 11,
    title: '他答应你的事没有做到。',
    scene: '后续表现更接近？',
    options: [
      { id: '11a', label: '主动道歉，并给出补救和下次避免的方法', archetype: '稳定照顾型' },
      { id: '11b', label: '立刻处理结果，尽量把损失补回来', archetype: '能扛事推进型' },
      { id: '11c', label: '会解释很多客观原因，让事情慢慢过去', archetype: '体面逃避型' },
      { id: '11d', label: '觉得你太计较，反过来强调他的难处', archetype: '强势控制型' },
    ],
  },
  {
    id: 12,
    title: '你想了解他的过去感情经历。',
    scene: '他更可能如何回应？',
    options: [
      { id: '12a', label: '能坦诚讲重点，也照顾你的安全感', archetype: '稳定照顾型' },
      { id: '12b', label: '不逃避，但会把重点放在现在如何向前', archetype: '能扛事推进型' },
      { id: '12c', label: '轻描淡写带过，让你不好继续问', archetype: '体面逃避型' },
      { id: '12d', label: '觉得过去没必要交代，边界由他决定', archetype: '强势控制型' },
    ],
  },
  {
    id: 13,
    title: '你们因为钱、房子、职业规划聊到现实压力。',
    scene: '他的处理方式更像？',
    options: [
      { id: '13a', label: '愿意一起面对压力，也照顾你的情绪', archetype: '稳定照顾型' },
      { id: '13b', label: '快速拆目标、算资源、定计划', archetype: '能扛事推进型' },
      { id: '13c', label: '讲很多未来愿景，但具体推进比较少', archetype: '温柔但没结果型' },
      { id: '13d', label: '会非常清醒地衡量投入产出和风险', archetype: '现实算计型' },
    ],
  },
  {
    id: 14,
    title: '你在朋友面前被开了一个不舒服的玩笑。',
    scene: '他会怎么做？',
    options: [
      { id: '14a', label: '当场温和解围，事后也会确认你的感受', archetype: '温柔守护型' },
      { id: '14b', label: '直接站出来挡回去，不让你尴尬', archetype: '能扛事推进型' },
      { id: '14c', label: '怕场面难看，先打圆场，之后再安慰你', archetype: '体面逃避型' },
      { id: '14d', label: '觉得没必要小题大做，提醒你适应场合', archetype: '现实算计型' },
    ],
  },
  {
    id: 15,
    title: '你希望他减少某个让你没有安全感的行为。',
    scene: '他更接近哪种反应？',
    options: [
      { id: '15a', label: '愿意一起约定边界，并持续做到', archetype: '稳定照顾型' },
      { id: '15b', label: '如果问题明确，他会立刻调整执行', archetype: '能扛事推进型' },
      { id: '15c', label: '当下答应得很好，但后续很难坚持', archetype: '体面逃避型' },
      { id: '15d', label: '认为你管太多，希望按他的标准来', archetype: '强势控制型' },
    ],
  },
  {
    id: 16,
    title: '一段关系进入平淡期后。',
    scene: '他的状态更可能是？',
    options: [
      { id: '16a', label: '依旧稳定投入，把爱放在日常细节里', archetype: '稳定照顾型' },
      { id: '16b', label: '会主动规划共同目标，让关系继续往前', archetype: '能扛事推进型' },
      { id: '16c', label: '热度下降明显，但又不愿意说清楚', archetype: '温柔但没结果型' },
      { id: '16d', label: '更关注关系是否还符合他的现实目标', archetype: '现实算计型' },
    ],
  },
  {
    id: 17,
    title: '你提出一个和他想法不同的重要决定。',
    scene: '他更像哪种沟通方式？',
    options: [
      { id: '17a', label: '认真听完，再一起找双方都舒服的方案', archetype: '稳定照顾型' },
      { id: '17b', label: '快速指出利弊，希望尽快形成结论', archetype: '能扛事推进型' },
      { id: '17c', label: '不直接反对，但会用沉默拖慢决定', archetype: '体面逃避型' },
      { id: '17d', label: '会强势推进自己认为正确的选择', archetype: '强势控制型' },
    ],
  },
  {
    id: 18,
    title: '你们很久没有认真约会了。',
    scene: '他会怎样回应你的期待？',
    options: [
      { id: '18a', label: '记住你的期待，安排一次舒服的相处', archetype: '温柔守护型' },
      { id: '18b', label: '会做一次很有感觉的浪漫补偿', archetype: '温柔但没结果型' },
      { id: '18c', label: '把约会变成计划，直接订时间地点', archetype: '能扛事推进型' },
      { id: '18d', label: '觉得都在一起了，形式感没那么重要', archetype: '现实算计型' },
    ],
  },
  {
    id: 19,
    title: '当你需要他在家人或朋友面前给你明确态度。',
    scene: '他更可能怎么做？',
    options: [
      { id: '19a', label: '自然维护你，让你感到被承认', archetype: '温柔守护型' },
      { id: '19b', label: '站出来把问题处理清楚，不让你独自面对', archetype: '能扛事推进型' },
      { id: '19c', label: '尽量维持和气，不太愿意正面表态', archetype: '体面逃避型' },
      { id: '19d', label: '会根据场合和利益关系决定怎么说', archetype: '现实算计型' },
    ],
  },
  {
    id: 20,
    title: '你发现自己在关系里越来越小心翼翼。',
    scene: '最像他的原因是？',
    options: [
      { id: '20a', label: '他不是坏，但总回避关键沟通，让你悬着', archetype: '体面逃避型' },
      { id: '20b', label: '他情绪和标准很强，你怕触碰到他的边界', archetype: '强势控制型' },
      { id: '20c', label: '他太理性，让你担心自己不够“合适”', archetype: '现实算计型' },
      { id: '20d', label: '其实不是怕他，只是你们都还在学习表达', archetype: '稳定照顾型' },
    ],
  },
  {
    id: 21,
    title: '他做了一件让你很心动的小事。',
    scene: '那件事更可能是？',
    options: [
      { id: '21a', label: '记得你随口说过的话，并默默准备好', archetype: '温柔守护型' },
      { id: '21b', label: '在你最需要时出现，把麻烦接过去', archetype: '能扛事推进型' },
      { id: '21c', label: '制造了一个很浪漫的瞬间，但之后又忽远忽近', archetype: '温柔但没结果型' },
      { id: '21d', label: '用一种很强势的方式让你感觉被选择', archetype: '强势控制型' },
    ],
  },
  {
    id: 22,
    title: '你想知道这段关系到底有没有未来。',
    scene: '他的答案更接近？',
    options: [
      { id: '22a', label: '给出清晰承诺，也愿意一起推进现实问题', archetype: '稳定照顾型' },
      { id: '22b', label: '把未来拆成阶段目标，并开始行动', archetype: '能扛事推进型' },
      { id: '22c', label: '说很喜欢你，但总缺少明确下一步', archetype: '温柔但没结果型' },
      { id: '22d', label: '会先看条件是否匹配，再决定投入多少', archetype: '现实算计型' },
    ],
  },
  {
    id: 23,
    title: '你们意见不合时，他对“输赢”的在意程度。',
    scene: '更像以下哪种？',
    options: [
      { id: '23a', label: '更在意关系有没有被修复，而不是谁赢', archetype: '稳定照顾型' },
      { id: '23b', label: '会争结论，但最终愿意为关系调整', archetype: '能扛事推进型' },
      { id: '23c', label: '表面不争，但心里会撤退和疏远', archetype: '体面逃避型' },
      { id: '23d', label: '很难接受失控，会坚持自己的规则', archetype: '强势控制型' },
    ],
  },
  {
    id: 24,
    title: '如果把这段关系拍成电视剧，他最像哪种男主？',
    scene: '凭直觉选一个最贴近的结尾。',
    options: [
      { id: '24a', label: '不喧哗，但一直在你身边的长期陪伴者', archetype: '温柔守护型' },
      { id: '24b', label: '关键时刻冲到前面，替你撑住局面的人', archetype: '能扛事推进型' },
      { id: '24c', label: '让你心动很多次，却始终没给完整答案的人', archetype: '温柔但没结果型' },
      { id: '24d', label: '聪明清醒、有魅力，但爱里也带着权衡的人', archetype: '现实算计型' },
    ],
  },
];

export function calculateQuizResult(selectedMap: Record<number, string>) {
  const scores = roleHighlights.reduce<Record<Archetype, number>>((acc, role) => {
    acc[role.archetype] = 0;
    return acc;
  }, {} as Record<Archetype, number>);

  sampleQuestions.forEach((question) => {
    const selectedId = selectedMap[question.id];
    const selectedOption = question.options.find((option) => option.id === selectedId);
    if (selectedOption) {
      scores[selectedOption.archetype] += 1;
    }
  });

  const sortedArchetypes = Object.entries(scores).sort((a, b) => b[1] - a[1]) as [Archetype, number][];
  const [topArchetype, topScore] = sortedArchetypes[0];
  const role = roleHighlights.find((item) => item.archetype === topArchetype) ?? roleHighlights[0];
  const answeredCount = Object.keys(selectedMap).length;
  const similarity = Math.min(96, Math.max(68, Math.round((topScore / Math.max(answeredCount, 1)) * 100)));

  return {
    role,
    profile: archetypeProfiles[role.archetype],
    similarity,
    answeredCount,
    scores,
  };
}

export const pageMeta = {
  title: '看看你的另一半是电视剧里的谁',
  subtitle: '24 道剧情题，测出他的关系原型与电视剧角色结果。',
};
