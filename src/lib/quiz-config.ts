import type { QuizQuestion, RoleSummary } from './types';

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
];

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
];

export const pageMeta = {
  title: '看看你的另一半是电视剧里的谁',
  subtitle: '15 道剧情题，测出他的关系原型与电视剧角色结果。',
};