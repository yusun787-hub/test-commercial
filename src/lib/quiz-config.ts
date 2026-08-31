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
      { id: '1b', label: '他会很快进入处理模式，问清楚发生了什么、谁能帮忙、下一步怎么补救，然后拉着你把问题一点点往前推。', archetype: '能扛事推进型' },
      { id: '1d', label: '他第一反应可能是让你别想太多，觉得哭解决不了问题，甚至会流露出你情绪太重、让他有压力的感觉。', archetype: '强势控制型' },
      { id: '1a', label: '他会先停下手里的事，坐到你身边听你把委屈说完，等你情绪慢慢落下来后，再陪你一起想后面怎么处理。', archetype: '稳定照顾型' },
      { id: '1c', label: '他会说一些安慰你的话，也会表现得很心疼，但当你需要他给出明确态度或行动时，他又会把话题轻轻带过去。', archetype: '体面逃避型' },
    ],
  },
  {
    id: 2,
    title: '你们刚吵完架，你还在意这件事。',
    scene: '他更可能怎么处理？',
    options: [
      { id: '2c', label: '他当下会哄你、道歉、说以后注意，但过几天生活回到原样，同样的问题还是会在相似场景里反复出现。', archetype: '体面逃避型' },
      { id: '2a', label: '他会主动把争执重新摊开来说，哪怕过程有点硬，也希望尽快找到问题点，把这次冲突真正修好。', archetype: '能扛事推进型' },
      { id: '2d', label: '他更倾向于讨论谁更有道理、什么才是合理规则，最后希望你理解并适应他的处理方式。', archetype: '现实算计型' },
      { id: '2b', label: '他不会急着逼你立刻和好，会先给你一点安静的空间，等你没那么难受了，再找一个舒服的时间好好聊。', archetype: '稳定照顾型' },
    ],
  },
  {
    id: 3,
    title: '你发现他与异性互动的边界让你不舒服。',
    scene: '他更像是哪种处理方式？',
    options: [
      { id: '3a', label: '他会认真听完你为什么不舒服，并主动说明自己会怎么调整，让你知道这段关系的边界是被重视的。', archetype: '稳定照顾型' },
      { id: '3c', label: '他会说知道了、以后注意，但真正遇到类似场景时，边界还是模糊，让你一次次怀疑自己是不是太敏感。', archetype: '体面逃避型' },
      { id: '3b', label: '他会觉得自己心里有数，不需要每件事都解释清楚，也不太喜欢被追问和被要求交代细节。', archetype: '强势控制型' },
      { id: '3d', label: '他会把你的感受、对方关系、外界评价都放在一起权衡，处理得不一定温柔，但会尽量让局面看起来得体。', archetype: '现实算计型' },
    ],
  },
  {
    id: 4,
    title: '你临时生病，原本约好的安排全被打乱。',
    scene: '他的第一反应更像？',
    options: [
      { id: '4d', label: '他会先对被打乱的计划感到烦躁，可能嘴上说没事，但情绪已经让你觉得自己像是在添麻烦。', archetype: '强势控制型' },
      { id: '4b', label: '他会马上查医院、叫车、买药或重新排当天安排，可能话不多，但每一步都在替你把麻烦接过去。', archetype: '能扛事推进型' },
      { id: '4c', label: '他会说你要好好休息，也会表达关心，但具体要不要陪你、要不要帮忙，往往还需要你开口提醒。', archetype: '体面逃避型' },
      { id: '4a', label: '他会先问你哪里不舒服、要不要喝水或休息，然后主动取消或调整原计划，把照顾你放在第一位。', archetype: '稳定照顾型' },
    ],
  },
  {
    id: 5,
    title: '你想公开你们的关系，比如发朋友圈或见朋友。',
    scene: '他更可能怎么回应？',
    options: [
      { id: '5b', label: '他不会马上拒绝，但会先判断现在公开是否合适、会不会影响别人看法，再决定要用什么方式推进。', archetype: '现实算计型' },
      { id: '5a', label: '他不会让公开这件事变得很沉重，会自然地带你见朋友、回应你的期待，让你感觉自己被大方承认。', archetype: '温柔守护型' },
      { id: '5d', label: '他会觉得公开与否、怎么公开都应该按他的节奏来，如果你催得太急，他反而会觉得你不懂分寸。', archetype: '强势控制型' },
      { id: '5c', label: '他不会明确说不，也会让你觉得还有希望，可每次聊到公开和确认关系时，总会变成再等等、以后再说。', archetype: '温柔但没结果型' },
    ],
  },
  {
    id: 6,
    title: '你表达“我希望你多陪陪我”。',
    scene: '他通常会怎么做？',
    options: [
      { id: '6c', label: '他会用一顿饭、一个礼物或一次突然出现来哄你开心，可这份甜很像烟花，亮过之后长期陪伴还是没有答案。', archetype: '温柔但没结果型' },
      { id: '6d', label: '他会直接看日历、调时间，把见面或陪伴变成固定安排，用行动告诉你这件事可以被解决。', archetype: '能扛事推进型' },
      { id: '6a', label: '他会把你的这句话当成真实需求，而不是情绪抱怨，之后会主动挪出时间，让你感到自己确实被优先考虑。', archetype: '稳定照顾型' },
      { id: '6b', label: '他当下会答应得很真诚，也可能短暂改变几天，但一忙起来又会回到原来的节奏，让你再次落空。', archetype: '体面逃避型' },
    ],
  },
  {
    id: 7,
    title: '你们讨论未来要不要一起生活。',
    scene: '他更像哪种状态？',
    options: [
      { id: '7a', label: '他愿意和你聊住在哪里、钱怎么安排、彼此家人怎么面对，也会给你一个清楚而稳定的未来预期。', archetype: '稳定照顾型' },
      { id: '7d', label: '他会先看双方条件、成本和风险是否匹配，只有判断这件事足够稳妥、划算，才愿意继续往前走。', archetype: '现实算计型' },
      { id: '7c', label: '他描绘未来时很动人，会让你想象很多幸福画面，但一问什么时候开始、怎么推进，他就变得含糊。', archetype: '温柔但没结果型' },
      { id: '7b', label: '他会把共同生活拆成预算、城市、工作节奏和时间表，一边讨论感受，一边推动它变成可执行计划。', archetype: '能扛事推进型' },
    ],
  },
  {
    id: 8,
    title: '你拒绝了他一个不太舒服的要求。',
    scene: '他更可能怎么反应？',
    options: [
      { id: '8d', label: '他会觉得自己的要求并不过分，开始讲道理、举例子、反复劝你，直到你怀疑是不是自己太难相处。', archetype: '强势控制型' },
      { id: '8a', label: '他不会急着反驳你，而是先承认你的不舒服是真实的，再和你一起商量一个双方都能接受的新边界。', archetype: '温柔守护型' },
      { id: '8b', label: '他可能有点失落或不爽，但不会强迫你妥协，而是试着换一种方式满足需求，把事情继续往前推进。', archetype: '能扛事推进型' },
      { id: '8c', label: '他当场会说没关系、随便你，但之后聊天变少、态度变冷，用一种不明说的方式让你感到压力。', archetype: '体面逃避型' },
    ],
  },
  {
    id: 9,
    title: '你在一段时间里状态很低，什么都不想做。',
    scene: '他会如何陪你？',
    options: [
      { id: '9b', label: '他可能不说太多漂亮话，但会记得你没吃饭、帮你留灯、替你挡掉麻烦，让你知道身后一直有人。', archetype: '温柔守护型' },
      { id: '9c', label: '他会认真帮你想办法，也希望你快点好起来，但如果低落持续太久，他会开始焦虑甚至有点不耐烦。', archetype: '能扛事推进型' },
      { id: '9a', label: '他不会急着让你开心起来，而是陪你吃饭、睡觉、处理小事，先把混乱的日子一点点托住。', archetype: '稳定照顾型' },
      { id: '9d', label: '他会提醒你生活还要继续，希望你别一直陷在情绪里，语气可能理性，却让你觉得自己没有被充分理解。', archetype: '现实算计型' },
    ],
  },
  {
    id: 10,
    title: '你们发生误会，需要有人先低头解释。',
    scene: '他更像哪一种？',
    options: [
      { id: '10c', label: '他会保持一种看起来冷静体面的状态，等你先开口破冰，自己不太愿意主动暴露脆弱或低头。', archetype: '体面逃避型' },
      { id: '10b', label: '他会把事实、原因和解决办法讲得很清楚，只是语气容易像开会复盘，让你感觉被处理而不是被哄。', archetype: '能扛事推进型' },
      { id: '10d', label: '他会先判断这件事到底谁更有道理，如果觉得自己没错，就很难为了缓和关系而先退一步。', archetype: '现实算计型' },
      { id: '10a', label: '他愿意先打破沉默，哪怕也有委屈，也会靠近你，把误会从头到尾说清楚，不让隔阂越积越深。', archetype: '温柔守护型' },
    ],
  },
  {
    id: 11,
    title: '他答应你的事没有做到。',
    scene: '后续表现更接近？',
    options: [
      { id: '11a', label: '他会主动承认自己没做到，让你知道不是你的问题，同时给出补救方式和下次避免再发生的办法。', archetype: '稳定照顾型' },
      { id: '11c', label: '他会解释自己为什么没做到，理由也许都成立，但很少真正回应你的失望，最后事情就这样慢慢过去。', archetype: '体面逃避型' },
      { id: '11d', label: '他会觉得你只盯着他没做到的部分，反过来强调自己已经很累、很难，让你不知不觉开始内疚。', archetype: '强势控制型' },
      { id: '11b', label: '他可能不擅长说很软的话，但会立刻去补救结果，尽量把影响降到最低，用行动表达歉意。', archetype: '能扛事推进型' },
    ],
  },
  {
    id: 12,
    title: '你想了解他的过去感情经历。',
    scene: '他更可能如何回应？',
    options: [
      { id: '12d', label: '他会认为过去是他的私事，没必要为了你的安全感交代太多，关系里的信息边界主要由他来决定。', archetype: '强势控制型' },
      { id: '12b', label: '他不怕聊过去，但不会沉浸细节，更愿意告诉你现在的选择是什么，以及以后会怎样把关系经营好。', archetype: '能扛事推进型' },
      { id: '12a', label: '他会坦诚讲清楚重要部分，不刻意隐瞒，也会注意你的反应，尽量让你在了解过去后仍然感到安心。', archetype: '稳定照顾型' },
      { id: '12c', label: '他会用几句话轻轻带过，看起来没有问题，却让你感觉还有很多空白，不知道该不该继续追问。', archetype: '体面逃避型' },
    ],
  },
  {
    id: 13,
    title: '你们因为钱、房子、职业规划聊到现实压力。',
    scene: '他的处理方式更像？',
    options: [
      { id: '13c', label: '他会讲很多以后会好的、我们会有家的，让你短暂安心，但真正需要行动和取舍时，推进总是很少。', archetype: '温柔但没结果型' },
      { id: '13a', label: '他会承认现实压力确实存在，但不会把压力都丢给你，会一边讨论解决办法，一边照顾你的焦虑。', archetype: '稳定照顾型' },
      { id: '13b', label: '他会马上把问题拆成收入、支出、城市、时间节点和可选方案，让模糊的压力变成一张可以执行的清单。', archetype: '能扛事推进型' },
      { id: '13d', label: '他会冷静评估这段关系里的成本、收益和风险，不会只凭感动做决定，也很少让情绪压过现实判断。', archetype: '现实算计型' },
    ],
  },
  {
    id: 14,
    title: '你在朋友面前被开了一个不舒服的玩笑。',
    scene: '他会怎么做？',
    options: [
      { id: '14b', label: '他会很快站出来替你挡掉那个玩笑，哪怕场面有一点僵，也不愿意让你一个人难堪。', archetype: '能扛事推进型' },
      { id: '14d', label: '他会觉得那只是玩笑，不值得破坏气氛，甚至会提醒你在那种场合里别太敏感、要会适应。', archetype: '现实算计型' },
      { id: '14c', label: '他会先顾全场面，把气氛圆过去，等只有你们两个人时再安慰你，但你可能仍觉得他刚才不够坚定。', archetype: '体面逃避型' },
      { id: '14a', label: '他会用不尴尬的方式帮你把场面接住，事后还会问你刚才是不是不舒服，让你感觉自己被看见。', archetype: '温柔守护型' },
    ],
  },
  {
    id: 15,
    title: '你希望他减少某个让你没有安全感的行为。',
    scene: '他更接近哪种反应？',
    options: [
      { id: '15d', label: '他会觉得你的不安全感太多，认为自己已经给够了边界，甚至希望你按照他的标准来理解这段关系。', archetype: '强势控制型' },
      { id: '15c', label: '他当下会答应得很快，让你以为问题解决了，但过一阵子又会松掉，像是这件事从没真正进入他的优先级。', archetype: '体面逃避型' },
      { id: '15a', label: '他会和你一起把边界说清楚，并在之后持续注意自己的行为，让你看到安全感不是只说一次。', archetype: '稳定照顾型' },
      { id: '15b', label: '只要你把具体问题说清楚，他就会马上调整，比如减少某些互动、改变沟通方式，用执行力回应你。', archetype: '能扛事推进型' },
    ],
  },
  {
    id: 16,
    title: '一段关系进入平淡期后。',
    scene: '他的状态更可能是？',
    options: [
      { id: '16a', label: '即使没有最初的热烈，他还是会稳定地关心你的生活，把爱放在接送、吃饭、记得小事这些日常细节里。', archetype: '稳定照顾型' },
      { id: '16b', label: '他会觉得平淡期更需要共同目标，于是主动规划旅行、储蓄、生活安排，让关系继续有方向感。', archetype: '能扛事推进型' },
      { id: '16d', label: '他会在平淡期重新评估这段关系是否还匹配自己的生活目标，如果不够合适，就会慢慢收回投入。', archetype: '现实算计型' },
      { id: '16c', label: '他不再像以前那样主动，热度一点点下降，可当你问是不是变了，他又不愿意给出明确答案。', archetype: '温柔但没结果型' },
    ],
  },
  {
    id: 17,
    title: '你提出一个和他想法不同的重要决定。',
    scene: '他更像哪种沟通方式？',
    options: [
      { id: '17c', label: '他不会正面说不同意，但会变得沉默、拖延、迟迟不给回应，让决定一点点卡在半路。', archetype: '体面逃避型' },
      { id: '17d', label: '他会很相信自己的判断，并试图带着你走他认为正确的路，即使你还没完全准备好。', archetype: '强势控制型' },
      { id: '17b', label: '他会很快指出你的方案哪里可行、哪里有风险，希望尽快把讨论推进到结论，而不是反复拉扯。', archetype: '能扛事推进型' },
      { id: '17a', label: '他会先认真听完你的理由，不急着否定，然后和你一起找一个不委屈任何一方的折中方案。', archetype: '稳定照顾型' },
    ],
  },
  {
    id: 18,
    title: '你们很久没有认真约会了。',
    scene: '他会怎样回应你的期待？',
    options: [
      { id: '18b', label: '他会突然安排一次很有氛围的约会，让你重新心动，但这更像补偿，不一定代表之后会稳定改变。', archetype: '温柔但没结果型' },
      { id: '18a', label: '他会记住你说过很久没约会，然后安排一次不一定盛大、但很贴合你喜好的相处，让你觉得被认真对待。', archetype: '温柔守护型' },
      { id: '18c', label: '他会直接把约会落实到时间、地点和安排上，不让期待只停在嘴上，而是很快变成可以发生的事情。', archetype: '能扛事推进型' },
      { id: '18d', label: '他会觉得关系已经稳定，不必总靠约会和仪式感证明，更多精力应该放在现实生活和长期安排上。', archetype: '现实算计型' },
    ],
  },
  {
    id: 19,
    title: '当你需要他在家人或朋友面前给你明确态度。',
    scene: '他更可能怎么做？',
    options: [
      { id: '19d', label: '他会看现场关系、长辈态度和潜在影响，再决定话说到什么程度，整体处理很现实。', archetype: '现实算计型' },
      { id: '19a', label: '他会在家人或朋友面前自然地把你放在自己这边，不需要你暗示，也能让你感觉自己被承认。', archetype: '温柔守护型' },
      { id: '19c', label: '他会优先维持场面和气，不太愿意在别人面前明确站队，所以你会觉得自己被放在了后面。', archetype: '体面逃避型' },
      { id: '19b', label: '他会主动站出来把误会或压力处理清楚，不让你一个人在众人面前解释、委屈或难堪。', archetype: '能扛事推进型' },
    ],
  },
  {
    id: 20,
    title: '你发现自己在关系里越来越小心翼翼。',
    scene: '最像他的原因是？',
    options: [
      { id: '20a', label: '他不一定做了特别糟糕的事，但总在关键沟通上含糊、拖延，让你长期处在一种等答案的悬空感里。', archetype: '体面逃避型' },
      { id: '20d', label: '你们之间不是恐惧感，而是还在学习怎么表达需求和边界，虽然笨拙，但彼此仍然愿意靠近。', archetype: '稳定照顾型' },
      { id: '20b', label: '他的情绪、节奏和标准都比较强，你越来越习惯先观察他的反应，再决定自己能不能说真实想法。', archetype: '强势控制型' },
      { id: '20c', label: '他太会分析利弊和匹配度，让你常常担心自己是不是不够合适，像在关系里不断接受评估。', archetype: '现实算计型' },
    ],
  },
  {
    id: 21,
    title: '他做了一件让你很心动的小事。',
    scene: '那件事更可能是？',
    options: [
      { id: '21c', label: '他会制造一个让你反复回想的浪漫瞬间，可那之后又变得忽远忽近，让你分不清那到底算不算承诺。', archetype: '温柔但没结果型' },
      { id: '21b', label: '他会在你最慌、最累、最不知道怎么办的时候出现，把最难处理的部分接过去，让你终于能喘口气。', archetype: '能扛事推进型' },
      { id: '21a', label: '他会记得你随口提过的小愿望，在某个普通日子里默默准备好，让你突然意识到自己一直被放在心上。', archetype: '温柔守护型' },
      { id: '21d', label: '他会用一种很直接甚至有点霸道的方式表达选择你，让你心跳加速，也隐隐感觉关系节奏被他带着走。', archetype: '强势控制型' },
    ],
  },
  {
    id: 22,
    title: '你想知道这段关系到底有没有未来。',
    scene: '他的答案更接近？',
    options: [
      { id: '22b', label: '他会把未来拆成一个个阶段目标，比如什么时候见家人、什么时候存钱、什么时候搬近，然后真的开始做。', archetype: '能扛事推进型' },
      { id: '22c', label: '他会反复表达喜欢，也让你感觉有感情，但每次你追问下一步，他都给不出足够明确的安排。', archetype: '温柔但没结果型' },
      { id: '22d', label: '他会先判断双方条件、节奏和利益是否匹配，再决定自己投入多少感情和资源，不会轻易被情绪推着走。', archetype: '现实算计型' },
      { id: '22a', label: '他会给你清楚的承诺，并愿意和你一起处理时间、距离、家人、经济这些现实问题，而不是只说喜欢。', archetype: '稳定照顾型' },
    ],
  },
  {
    id: 23,
    title: '你们意见不合时，他对“输赢”的在意程度。',
    scene: '更像以下哪种？',
    options: [
      { id: '23d', label: '他很难接受事情不按自己的判断发展，所以会持续坚持自己的规则，让你感到讨论空间越来越小。', archetype: '强势控制型' },
      { id: '23c', label: '他表面上不继续争了，甚至看起来很平静，但心里已经开始撤退，用疏远来表达没有说出口的不满。', archetype: '体面逃避型' },
      { id: '23b', label: '他会认真争论结论，甚至显得有点强硬，但当他意识到你受伤时，最终还是愿意为了关系做调整。', archetype: '能扛事推进型' },
      { id: '23a', label: '他更关心这次争执之后你们还能不能靠近，而不是谁说服了谁，所以愿意为了修复关系放低一点姿态。', archetype: '稳定照顾型' },
    ],
  },
  {
    id: 24,
    title: '如果把这段关系拍成电视剧，他最像哪种男主？',
    scene: '凭直觉选一个最贴近的结尾。',
    options: [
      { id: '24a', label: '他不是最会制造戏剧高潮的人，却会在一日三餐、低谷和普通日子里持续出现，像一个长期陪伴者。', archetype: '温柔守护型' },
      { id: '24c', label: '他带来过很多真切心动，也让你舍不得放下，但关系走到关键处时，他始终没有给出一个完整答案。', archetype: '温柔但没结果型' },
      { id: '24b', label: '他可能平时不够细腻，但关键时刻会冲到前面，把压力、麻烦和难题都先挡下来，让你知道他靠得住。', archetype: '能扛事推进型' },
      { id: '24d', label: '他聪明、清醒、有魅力，知道怎么让关系更稳妥地推进，但你也能感觉到他的爱里始终带着权衡。', archetype: '现实算计型' },
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
