import type { Archetype, RoleSummary } from './types';

type RolePsychologyProfile = {
  roleCue: string;
  attraction: string;
  desire: string;
  rejection: string;
  loveLanguage: string;
  attachmentSignal: string;
};

export type ThoughtModule = {
  title: string;
  body: string;
};

const archetypeLens: Record<Archetype, string> = {
  稳定照顾型: '稳定照顾型的核心是可预期、可依赖、可长期投入，容易激活安全型依恋里“我可以放心靠近”的感受。',
  能扛事推进型: '能扛事推进型的核心是行动、承担和问题解决，容易让人把“关键时刻不掉线”理解成关系安全感。',
  温柔守护型: '温柔守护型的核心是耐心、体贴和持续守候，常让人感到自己被细致地看见、被轻柔地接住。',
  温柔但没结果型: '温柔但没结果型的核心是高情绪浓度与低承诺确定性并存，很容易制造心动，也容易制造悬而未决。',
  体面逃避型: '体面逃避型的核心是表面温和、冲突回避和责任延迟，短期舒服，长期容易消耗真实亲密。',
  强势控制型: '强势控制型的核心是高吸引力、高主导和高占有，容易带来强烈被选择感，也容易压缩自我空间。',
  现实算计型: '现实算计型的核心是清醒、权衡和目标导向，能提供秩序感，却也会让感情带上被评估的压力。',
};

const rolePsychologyProfiles: Record<string, RolePsychologyProfile> = {
  'mei-changsu': { roleCue: '梅长苏式的隐忍、布局和冷静守护', attraction: '你会被他把风险提前算好、把情绪藏在行动背后的方式打动', desire: '你真正想要的是一个既有谋略又愿意把你纳入未来的人', rejection: '你不能接受的是他把所有真相都独自承担，让亲密关系变成隔岸相望', loveLanguage: '服务行动与高质量陪伴', attachmentSignal: '冷静可靠的安全基地' },
  'guo-junwang': { roleCue: '果郡王式的克制深情、分寸感和精神共鸣', attraction: '你会被他在边界内仍然坚定靠近的温柔打动', desire: '你真正想要的是被尊重、被懂得，也被温柔而明确地选择', rejection: '你不能接受的是爱始终停在含蓄与遗憾里，没有现实出口', loveLanguage: '肯定言语与高质量陪伴', attachmentSignal: '温柔但谨慎的靠近' },
  'wen-shichu': { roleCue: '温实初式的细致照料、温和陪伴和不敢越界', attraction: '你会被他把喜欢藏进照顾里的稳定善意打动', desire: '你真正想要的是照料之外的主动确认，而不是永远被温柔守候', rejection: '你不能接受的是他用照顾替代选择，关键时刻仍旧犹豫', loveLanguage: '服务行动与细节照顾', attachmentSignal: '温柔却不够确定的守候' },
  'jiang-defu': { roleCue: '江德福式的烟火气、责任感和笨拙护短', attraction: '你会被他嘴上直、行动稳，能把家撑起来的朴素可靠打动', desire: '你真正想要的是能一起过日子、扛生活、也愿意学着理解你的人', rejection: '你不能接受的是他只负责现实，却忽略你的细腻情绪和表达需求', loveLanguage: '服务行动与生活照料', attachmentSignal: '扎实接地气的长期依靠' },
  'feng-teng': { roleCue: '封腾式的强势偏爱、资源倾斜和霸道确认', attraction: '你会被他毫不遮掩的偏爱和“只看见你”的强烈确定感打动', desire: '你真正想要的是被坚定选择，同时保留自己的节奏和主体性', rejection: '你不能接受的是偏爱变成占有，浪漫变成对你生活的全面接管', loveLanguage: '礼物馈赠与强势服务行动', attachmentSignal: '高浓度、强宣告的被选择感' },
  'chen-yu': { roleCue: '陈屿式的踏实沉默、生活责任和冲突回避', attraction: '你会被他不花哨但真实存在的生活稳定感打动', desire: '你真正想要的是踏实之外的表达、回应和共同修复', rejection: '你不能接受的是一遇到情绪议题就沉默，把关系变成一个人的自言自语', loveLanguage: '服务行动与日常照料', attachmentSignal: '安静但需要被唤醒的可靠' },
  yongzheng: { roleCue: '雍正式的高标准、秩序感和权力式偏爱', attraction: '你会被他给予位置、资源和认可时的强烈价值感打动', desire: '你真正想要的是被看重，但不是被审视；被保护，但不是被规训', rejection: '你不能接受的是亲密关系变成考核，你总要证明自己配得上他的爱', loveLanguage: '资源投入与身份确认', attachmentSignal: '高压但强保护的秩序感' },
  'xiao-feng': { roleCue: '萧峰式的豪情、重义和顶天立地的承担', attraction: '你会被他面对风雨从不后退、第一时间挡在你前面的气魄打动', desire: '你真正想要的是可以依靠的英雄感，同时也希望他把小家的感受放进选择里', rejection: '你不能接受的是他总为大义牺牲亲密，让你在关系里被迫懂事', loveLanguage: '服务行动与保护性陪伴', attachmentSignal: '强大可靠的外部屏障' },
  'li-chengyin': { roleCue: '李承鄞式的炽烈深情、权衡和危险吸引', attraction: '你会被他复杂而强烈的目光打动，像被卷进一场无法轻易抽身的命运感', desire: '你真正想要的是深情与承诺并存，而不是只有高强度心动', rejection: '你不能接受的是他把爱放在算计之后，让你分不清自己是被爱还是被利用', loveLanguage: '强烈关注与戏剧性陪伴', attachmentSignal: '高激情但高不确定的拉扯' },
  'gu-tingye': { roleCue: '顾廷烨式的现实担当、破局能力和粗粝保护', attraction: '你会被他关键时刻站出来、把复杂局面扛住的能力打动', desire: '你真正想要的是有人兜底，也有人愿意在情绪上慢下来听你说', rejection: '你不能接受的是他只会解决事情，却把你的委屈当成小问题', loveLanguage: '服务行动与问题解决', attachmentSignal: '风雨里能顶上的现实安全感' },
  'qi-heng': { roleCue: '齐衡式的干净心动、体面顾虑和遗憾感', attraction: '你会被他真诚、克制、像少年月光一样的喜欢打动', desire: '你真正想要的是温柔之外的选择力，是他能为你跨出那一步', rejection: '你不能接受的是他一直不舍，却一直没有办法真正承担关系后果', loveLanguage: '肯定言语与纯粹关注', attachmentSignal: '真心明显但承诺不足的心动' },
  'he-hongwen': { roleCue: '贺弘文式的温和尊重、慢节奏和善意守护', attraction: '你会被他不逼迫、不冒进、愿意认真听你说话的温柔打动', desire: '你真正想要的是被尊重地靠近，也希望这份温和能在现实里站稳', rejection: '你不能接受的是他太慢、太软，在外部压力面前缺少推进力', loveLanguage: '高质量陪伴与情绪倾听', attachmentSignal: '低压舒适的安全靠近' },
  'sheng-zhangbai': { roleCue: '盛长柏式的原则、秩序和长期责任', attraction: '你会被他稳定、端正、边界清楚的长期可靠打动', desire: '你真正想要的是有规则感的亲密，既不混乱，也不失温度', rejection: '你不能接受的是他只讲道理和秩序，却忘了亲密也需要柔软表达', loveLanguage: '责任承担与长期规划', attachmentSignal: '有边界的稳定基地' },
  'liang-han': { roleCue: '梁晗式的会哄、会热闹，也会回避后果', attraction: '你会被他轻松会哄、让当下气氛变甜的能力打动', desire: '你真正想要的是甜蜜之后能落到行动闭环的确定关系', rejection: '你不能接受的是他说得漂亮却不处理问题，让你反复替他找借口', loveLanguage: '肯定言语与轻松陪伴', attachmentSignal: '短期愉悦但稳定性不足的吸引' },
  'dongfang-qingcang': { roleCue: '东方青苍式的极致偏爱、强大守护和霸道主导', attraction: '你会被他把你放在世界之前、为你对抗一切的强烈偏爱打动', desire: '你真正想要的是被极致选择，同时你的意愿也被认真询问', rejection: '你不能接受的是保护变成控制，他用爱替你决定所有事情', loveLanguage: '保护性行动与强烈专注', attachmentSignal: '高能量、高占有的激情安全感' },
  'fan-xian': { roleCue: '范闲式的聪明松弛、护短和快速破局', attraction: '你会被他用玩笑化解压力、转身又把难题办妥的反差打动', desire: '你真正想要的是轻松有趣，也能在关键问题上并肩作战', rejection: '你不能接受的是他总把沉重藏在玩笑里，让你进不了他的真实压力层', loveLanguage: '幽默陪伴与服务行动', attachmentSignal: '聪明鲜活的并肩感' },
  'wang-kuan': { roleCue: '王宽式的坦荡、原则和明亮偏爱', attraction: '你会被他不暧昧、不遮掩、把偏爱放到阳光下的端正感打动', desire: '你真正想要的是清楚、体面、稳定且经得起旁人审视的选择', rejection: '你不能接受的是原则变成刻板，让关系缺少弹性和情绪流动', loveLanguage: '肯定言语与明确承诺', attachmentSignal: '明亮坦荡的安全确认' },
  yongqi: { roleCue: '永琪式的热血、敢选和少年担当', attraction: '你会被他不顾阻力也愿意牵着你往前走的热烈打动', desire: '你真正想要的是被勇敢选择，也要有一起面对长期现实的方案', rejection: '你不能接受的是只靠冲动推进，激情过后没有稳定安排', loveLanguage: '行动证明与公开选择', attachmentSignal: '热血直接的被坚定选择' },
  'er-kang': { roleCue: '福尔康式的浓烈表达、忠诚守护和情绪投入', attraction: '你会被他把你当成唯一、在众人面前替你说话的坚定打动', desire: '你真正想要的是高情绪回应，也希望他尊重你的独立判断', rejection: '你不能接受的是爱太满、太急，最后变成替你决定和情绪压迫', loveLanguage: '肯定言语与高频陪伴', attachmentSignal: '高回应、高浓度的唯一感' },
  'li-daren': { roleCue: '李大仁式的长期陪伴、理解和慢热守候', attraction: '你会被他一直在、一直懂、一直记得你的日常细节打动', desire: '你真正想要的是朋友式默契升级成明确亲密，而不是永远差一步', rejection: '你不能接受的是关系停在舒适区，谁都不说破，最后错过窗口期', loveLanguage: '高质量陪伴与细节记忆', attachmentSignal: '低压稳定的常驻安全感' },
  'xie-zhiyao': { roleCue: '谢之遥式的松弛接纳、生活建设和阳光务实', attraction: '你会被他把你带回真实生活、让你重新舒展的能力打动', desire: '你真正想要的是能一起创造日常质感，也能接住你疲惫的人', rejection: '你不能接受的是他太安于自己的生活半径，而忽略你对远方和变化的需求', loveLanguage: '高质量陪伴与生活共创', attachmentSignal: '松弛有根的生活安全感' },
  'meng-dan': { roleCue: '蒙丹式的热烈奔赴、诗意命运感和现实薄弱', attraction: '你会被他不顾一切奔向你的戏剧性真心打动', desire: '你真正想要的是心动之外的落地，是有人能把浪漫变成明天的计划', rejection: '你不能接受的是永远停在私奔和眼泪里，没人承担现实后果', loveLanguage: '激情表达与浪漫陪伴', attachmentSignal: '高心动但低落地的命运感' },
};

const defaultPsychologyProfile: RolePsychologyProfile = {
  roleCue: '这个角色身上的关系特质',
  attraction: '你会被他身上鲜明而稳定的关系信号打动',
  desire: '你真正想要的是被理解、被选择，也被长期稳定地对待',
  rejection: '你不能接受的是关系里长期缺少回应、尊重和确定性',
  loveLanguage: '高质量陪伴与服务行动',
  attachmentSignal: '可依赖的亲密信号',
};

export function getRoleThoughtModules(role: RoleSummary): ThoughtModule[] {
  const profile = rolePsychologyProfiles[role.id] ?? defaultPsychologyProfile;
  const archetype = archetypeLens[role.archetype];
  const roleName = `${role.source}里的「${role.name}」`;

  return [
    {
      title: '你最容易被什么打动',
      body: `你最容易被${roleName}身上的“${profile.roleCue}”打动。放到依恋理论里看，这不是简单的颜值或剧情滤镜，而是你在寻找一种能稳定回应内在需求的依恋信号：${profile.attachmentSignal}。${archetype}当你看到他用${profile.loveLanguage}表达在乎时，很容易把这种外部行为理解成“我被放在心上”。斯滕伯格爱情三角论里，亲密、激情、承诺三者并不总是平均出现；这个角色最先触发你的，往往是其中最亮的一角。${profile.attraction}这里也有投射效应：你会把自己期待中的理想关系投到他身上，把他的一个动作、一句承诺、一次保护，放大成“如果和这样的人在一起，我会很安心”。所以你被打动的不是单个桥段，而是他让你看见了一种关系可能性：有人懂你的脆弱，也愿意用自己的方式靠近你。`,
    },
    {
      title: '你实际想要的是什么',
      body: `你实际想要的，并不只是${role.name}这种人带来的心动，而是心动背后更稳定的关系结构。用斯滕伯格爱情三角论来说，你期待的不只是激情，也不是只有亲密陪伴，而是希望亲密、激情和承诺能形成一个相对完整的三角：既有被吸引的张力，也有被理解的深度，更有能落到现实里的选择。${profile.desire}从 Five Love Languages 看，你尤其容易被“${profile.loveLanguage}”说服，因为这种表达方式会让爱从抽象口号变成可感知的证据。依恋理论里，这接近安全型依恋对关系的期待：我可以靠近你，也不用担心靠近之后被忽视、被控制或被丢下。你想要的是一种个性化的确定感——他保留自己的角色魅力，但愿意为了关系调整节奏；他有自己的光，也能让你在这段关系里成为一个被认真对待的人。`,
    },
    {
      title: '你其实不能接受的是什么',
      body: `你真正不能接受的，通常不是${role.name}的缺点本身，而是这些缺点持续触发你的不安全感。依恋理论会把这种反应解释为“依恋系统被激活”：当对方长期不回应、过度控制、回避承诺或让你猜测，你会从欣赏迅速进入警觉。${profile.rejection}投射效应在这里也会反向发生：一开始你可能把他的魅力投射成理想伴侣，后来却会把每一次失望都理解为“我是不是不够重要”。从斯滕伯格爱情三角论看，如果这段关系只有激情没有承诺，或只有现实安排没有亲密，你都会感到失衡；Five Love Languages 也提醒我们，如果他表达爱的语言和你需要接收的语言长期错位，你会越来越难被安抚。你不能接受的是关系只保留他的角色魅力，却没有给你基本的尊重、清晰边界和稳定回应。你要的不是完美男主，而是一个在现实关系里真正愿意和你共同修正的人。`,
    },
  ];
}
