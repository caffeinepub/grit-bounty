import { Language } from '../types';

type TranslationStructure = {
  splash: {
    question: string;
    subtext: string;
    enter: string;
    subtitle: string;
    tagline: string;
    feature1Title: string;
    feature1Desc: string;
    feature2Title: string;
    feature2Desc: string;
    feature3Title: string;
    feature3Desc: string;
  };
  language: {
    select: string;
    english: string;
    chinese: string;
    spanish: string;
    french: string;
    japanese: string;
    korean: string;
  };
  auth: {
    login: string;
    logout: string;
    loggingIn: string;
  };
  profile: {
    setupTitle: string;
    setupDescription: string;
    namePlaceholder: string;
    save: string;
    saving: string;
  };
  nav: {
    bountyBoard: string;
    launchMission: string;
    disputeResolution: string;
    personalCenter: string;
  };
  bountyBoard: {
    title: string;
    allQuests: string;
    noQuests: string;
    hype: string;
    contributors: string;
    acceptSuccess: string;
    acceptError: string;
    yourQuest: string;
    addToPot: string;
    addToPotDescription: string;
    currentPool: string;
    yourContribution: string;
    newPool: string;
    contribute: string;
    contributionSuccess: string;
    contributionError: string;
  };
  difficulty: {
    easy: string;
    medium: string;
    hard: string;
    extreme: string;
    impossible: string;
  };
  deposit: {
    required: string;
    acceptAndPayDeposit: string;
    confirmTitle: string;
    confirmDescription: string;
    questTitle: string;
    rewardPool: string;
    yourDepositRate: string;
    depositRequired: string;
    depositInfo: string;
    cancel: string;
    confirmAndPay: string;
    processing: string;
    transferFailed: string;
    totalRewardPool: string;
    warriorsNeeded: string;
    perWarriorReward: string;
  };
  publishConfirm: {
    confirmTitle: string;
    confirmDescription: string;
    questTitle: string;
    questDescription: string;
    difficulty: string;
    participantCount: string;
    rewardPool: string;
    yourBalance: string;
    lockInfo: string;
    insufficientBalance: string;
    required: string;
    available: string;
    cancel: string;
    confirmAndPublish: string;
    publishing: string;
    publishFailed: string;
    checkingBalance: string;
  };
  cancelQuest: {
    title: string;
    description: string;
    questTitle: string;
    fullRefund: string;
    refundInfo: string;
    back: string;
    confirmCancel: string;
    cancelling: string;
    cancelError: string;
  };
  launchMission: {
    title: string;
    subtitle: string;
    questTitle: string;
    titlePlaceholder: string;
    rules: string;
    rulesPlaceholder: string;
    rewardPool: string;
    rewardHint: string;
    difficulty: string;
    createQuest: string;
    creating: string;
    fillAllFields: string;
    invalidReward: string;
    createSuccess: string;
    createError: string;
    titleRequired: string;
    descriptionTooShort: string;
    minCharacters: string;
    participantCount: string;
    participantCountPlaceholder: string;
    participantCountHint: string;
    invalidParticipantCount: string;
  };
  creditScore: {
    title: string;
    depositRate: string;
    successfulQuests: string;
    totalEarned: string;
    totalDeposited: string;
    questsToMinimum: string;
    rateDecrease: string;
  };
  personalCenter: {
    title: string;
    subtitle: string;
    acceptedQuests: string;
    postedBounties: string;
    noAcceptedQuests: string;
    noPostedBounties: string;
    progress: string;
    status: string;
    reward: string;
    lockedDeposit: string;
    rewardPool: string;
    hypeCount: string;
    warrior: string;
    checkIn: string;
    viewProgress: string;
    deleteQuest: string;
    exitQuest: string;
    abandonQuest: string;
    cancelQuest: string;
    statusActive: string;
    statusInProgress: string;
    statusPending: string;
    statusCompleted: string;
    statusDisputed: string;
    statusCancelled: string;
  };
  deleteQuest: {
    title: string;
    description: string;
    warning: string;
    cancel: string;
    confirm: string;
    deleting: string;
  };
  exitQuest: {
    title: string;
    description: string;
    yourContribution: string;
    crowdfunding: string;
    contributors: string;
    refundInfo: string;
    cancel: string;
    confirm: string;
    exiting: string;
  };
  abandonQuest: {
    title: string;
    description: string;
    forfeitAmount: string;
    depositRateReset: string;
    warning: string;
    typeConfirm: string;
    typeConfirmHint: string;
    cancel: string;
    confirm: string;
    abandoning: string;
  };
  dailyCheckIn: {
    title: string;
    day: string;
    description: string;
    firstDayNote: string;
    progress: string;
    target: string;
    days: string;
    statusUpdate: string;
    statusPlaceholder: string;
    photo: string;
    uploadPhoto: string;
    photoOptional: string;
    uploading: string;
    submit: string;
    submitting: string;
    requireContent: string;
    submitSuccess: string;
    submitError: string;
    fileTooLarge: string;
  };
  visualComparison: {
    title: string;
    day: string;
    totalCheckIns: string;
    timeline: string;
    autoGenerated: string;
  };
  disputeResolution: {
    title: string;
    subtitle: string;
    noDisputes: string;
    questTitle: string;
    publisher: string;
    warrior: string;
    publisherArgument: string;
    warriorArgument: string;
    voteDistribution: string;
    publisherVotes: string;
    adminVotes: string;
    communityVotes: string;
    voteForPublisher: string;
    voteForWarrior: string;
    votingClosed: string;
  };
  appealSubmission: {
    title: string;
    description: string;
    yourArgument: string;
    argumentPlaceholder: string;
    minCharacters: string;
    submit: string;
    submitting: string;
    argumentTooShort: string;
    submitSuccess: string;
    submitError: string;
    viewAppeal: string;
    yourAppeal: string;
    noAppeal: string;
  };
  introduction: {
    linkText: string;
    title: string;
    subtitle: string;
    coreMission: {
      title: string;
      content: string;
    };
    useCases: {
      title: string;
      intro: string;
      lifestyle: string;
      lifestyleExample: string;
      health: string;
      healthExample: string;
      exercise: string;
      exerciseExample: string;
      social: string;
      socialExample: string;
      enterprise: string;
      enterpriseExample: string;
      more: string;
      moreExample: string;
    };
    bountyMechanism: {
      title: string;
      publishTitle: string;
      publishContent: string;
      crowdfundTitle: string;
      crowdfundContent: string;
      acceptTitle: string;
      acceptContent: string;
      flexibleTitle: string;
      flexibleContent: string;
    };
    settlementRules: {
      title: string;
      successTitle: string;
      successContent: string;
      unclaimedTitle: string;
      unclaimedContent: string;
      defaultTitle: string;
      defaultContent: string;
      feesTitle: string;
      feesSuccessLabel: string;
      feesSuccessContent: string;
      feesDefaultLabel: string;
      feesDefaultContent: string;
    };
    warriorCredit: {
      title: string;
      intro: string;
      initialTitle: string;
      initialContent: string;
      rewardTitle: string;
      rewardContent: string;
      capTitle: string;
      capContent: string;
      penaltyTitle: string;
      penaltyContent: string;
    };
  };
  footer: {
    builtWith: string;
    love: string;
    using: string;
  };
};

// Base English translations
const englishTranslations: TranslationStructure = {
  splash: {
    question: 'Will persistence make you stronger, or is it meaningless?',
    subtext: 'If "what if" became reality, would you truly be better?',
    enter: 'ENTER',
    subtitle: 'Turn "What If" Into Reality',
    tagline: 'Challenge yourself. Prove your grit. Earn rewards.',
    feature1Title: 'Set Challenges',
    feature1Desc: 'Create quests that test persistence and commitment',
    feature2Title: 'Earn Rewards',
    feature2Desc: 'Complete challenges and earn ICP tokens',
    feature3Title: 'Build Trust',
    feature3Desc: 'Lower your deposit rate with each successful quest',
  },
  language: {
    select: 'Select Your Language',
    english: 'English',
    chinese: 'Chinese',
    spanish: 'Spanish',
    french: 'French',
    japanese: 'Japanese',
    korean: 'Korean',
  },
  auth: {
    login: 'Login',
    logout: 'Logout',
    loggingIn: 'Logging in...',
  },
  profile: {
    setupTitle: 'Welcome, Warrior',
    setupDescription: 'Enter your name to begin your journey',
    namePlaceholder: 'Your name',
    save: 'Save',
    saving: 'Saving...',
  },
  nav: {
    bountyBoard: 'Bounty Board',
    launchMission: 'Launch Mission',
    disputeResolution: 'Dispute Resolution',
    personalCenter: 'Personal Center',
  },
  bountyBoard: {
    title: 'Bounty Board',
    allQuests: 'All Quests',
    noQuests: 'No quests available',
    hype: 'Hype',
    contributors: 'contributors',
    acceptSuccess: 'Quest accepted successfully!',
    acceptError: 'Failed to accept quest',
    yourQuest: 'Your Quest',
    addToPot: 'Add to Pot',
    addToPotDescription: 'Increase the reward pool to attract more warriors',
    currentPool: 'Current Pool',
    yourContribution: 'Your Contribution',
    newPool: 'New Pool',
    contribute: 'Contribute',
    contributionSuccess: 'Contribution added successfully!',
    contributionError: 'Failed to add contribution',
  },
  difficulty: {
    easy: 'Easy',
    medium: 'Medium',
    hard: 'Hard',
    extreme: 'Extreme',
    impossible: 'Impossible',
  },
  deposit: {
    required: 'Deposit Required',
    acceptAndPayDeposit: 'Accept & Pay Deposit',
    confirmTitle: 'Confirm Deposit',
    confirmDescription: 'Lock your deposit to accept this quest',
    questTitle: 'Quest',
    rewardPool: 'Reward Pool',
    yourDepositRate: 'Your Deposit Rate',
    depositRequired: 'Deposit Required',
    depositInfo: 'Your deposit will be locked until quest completion. Complete successfully to earn rewards and reduce your deposit rate.',
    cancel: 'Cancel',
    confirmAndPay: 'Confirm & Pay',
    processing: 'Processing...',
    transferFailed: 'Transfer failed',
    totalRewardPool: 'Total Reward Pool',
    warriorsNeeded: 'Warriors Needed',
    perWarriorReward: 'Per Warrior Reward',
  },
  publishConfirm: {
    confirmTitle: 'Confirm Quest Publication',
    confirmDescription: 'Review your quest details before publishing. The bounty amount will be locked immediately.',
    questTitle: 'Quest Title',
    questDescription: 'Description',
    difficulty: 'Difficulty',
    participantCount: 'Participants Needed',
    rewardPool: 'Bounty Amount',
    yourBalance: 'Your Balance',
    lockInfo: 'The bounty amount will be locked in the quest contract until completion or cancellation. You can cancel and receive a full refund if no warrior has accepted yet.',
    insufficientBalance: 'Insufficient balance.',
    required: 'Required',
    available: 'Available',
    cancel: 'Cancel',
    confirmAndPublish: 'Confirm & Publish',
    publishing: 'Publishing...',
    publishFailed: 'Failed to publish quest',
    checkingBalance: 'Checking balance...',
  },
  cancelQuest: {
    title: 'Cancel Quest',
    description: 'Cancel this quest and receive a full refund of your locked bounty.',
    questTitle: 'Quest',
    fullRefund: 'Full Refund',
    refundInfo: 'Since no warrior has accepted this quest yet, you will receive a full refund with no fees deducted. The quest will be removed from the bounty board.',
    back: 'Back',
    confirmCancel: 'Confirm Cancellation',
    cancelling: 'Cancelling...',
    cancelError: 'Failed to cancel quest',
  },
  launchMission: {
    title: 'Launch Mission',
    subtitle: 'Create a new quest and set the challenge',
    questTitle: 'Quest Title',
    titlePlaceholder: 'e.g., Wake up at 5 AM for 100 days',
    rules: 'Quest Rules & Description',
    rulesPlaceholder: 'Describe the quest requirements and rules...',
    rewardPool: 'Initial Reward Pool (ICP)',
    rewardHint: 'Minimum 0.0001 ICP',
    difficulty: 'Difficulty Level',
    createQuest: 'Create Quest',
    creating: 'Creating...',
    fillAllFields: 'Please fill in all fields',
    invalidReward: 'Please enter a valid reward amount',
    createSuccess: 'Quest created successfully!',
    createError: 'Failed to create quest',
    titleRequired: 'Quest title is required',
    descriptionTooShort: 'Description must be at least 20 characters',
    minCharacters: 'characters minimum',
    participantCount: 'Number of Warriors Needed',
    participantCountPlaceholder: '1-100',
    participantCountHint: 'How many warriors can accept this quest',
    invalidParticipantCount: 'Participant count must be between 1 and 100',
  },
  creditScore: {
    title: 'Warrior Credit Score',
    depositRate: 'Current Deposit Rate',
    successfulQuests: 'Successful Quests',
    totalEarned: 'Total Earned',
    totalDeposited: 'Total Deposited',
    questsToMinimum: 'quests to minimum rate (2%)',
    rateDecrease: 'Each success: -3%',
  },
  personalCenter: {
    title: 'Personal Center',
    subtitle: 'Track your quests and progress',
    acceptedQuests: 'Accepted Quests',
    postedBounties: 'Posted Bounties',
    noAcceptedQuests: 'No accepted quests yet',
    noPostedBounties: 'No posted bounties yet',
    progress: 'Progress',
    status: 'Status',
    reward: 'Reward',
    lockedDeposit: 'Locked Deposit',
    rewardPool: 'Reward Pool',
    hypeCount: 'Hype Count',
    warrior: 'Warrior',
    checkIn: 'Check In',
    viewProgress: 'View Progress',
    deleteQuest: 'Delete',
    exitQuest: 'Exit',
    abandonQuest: 'Abandon Quest',
    cancelQuest: 'Cancel Quest',
    statusActive: 'Active',
    statusInProgress: 'In Progress',
    statusPending: 'Pending',
    statusCompleted: 'Completed',
    statusDisputed: 'Disputed',
    statusCancelled: 'Cancelled',
  },
  deleteQuest: {
    title: 'Delete Quest',
    description: 'Are you sure you want to permanently delete this quest?',
    warning: 'This action cannot be undone. The quest will be permanently removed.',
    cancel: 'Cancel',
    confirm: 'Delete Quest',
    deleting: 'Deleting...',
  },
  exitQuest: {
    title: 'Exit Quest',
    description: 'You are about to exit this quest and receive a refund of your initial contribution.',
    yourContribution: 'Your Contribution',
    crowdfunding: 'Crowdfunding',
    contributors: 'contributors',
    refundInfo: 'You will receive a full refund of your initial contribution. Crowdfunding contributions will remain in the pool.',
    cancel: 'Cancel',
    confirm: 'Exit Quest',
    exiting: 'Exiting...',
  },
  abandonQuest: {
    title: 'Abandon Quest',
    description: 'Warning: Abandoning this quest will result in serious penalties.',
    forfeitAmount: 'Deposit to Forfeit',
    depositRateReset: 'Deposit Rate Reset',
    warning: 'Your deposit will be forfeited and your deposit rate will reset to 50%. This action cannot be undone.',
    typeConfirm: 'Type CONFIRM to proceed',
    typeConfirmHint: 'Type "CONFIRM" exactly',
    cancel: 'Cancel',
    confirm: 'Abandon Quest',
    abandoning: 'Abandoning...',
  },
  dailyCheckIn: {
    title: 'Daily Check-In',
    day: 'Day',
    description: 'Record your progress for today',
    firstDayNote: 'This is your first check-in! Take a photo to track your transformation.',
    progress: 'Progress',
    target: 'Target',
    days: 'days',
    statusUpdate: 'Status Update',
    statusPlaceholder: 'How did today go? Share your thoughts...',
    photo: 'Photo',
    uploadPhoto: 'Upload Photo',
    photoOptional: 'Optional but recommended for Day 1',
    uploading: 'Uploading',
    submit: 'Submit Check-In',
    submitting: 'Submitting...',
    requireContent: 'Please provide a status update or photo',
    submitSuccess: 'Check-in submitted successfully!',
    submitError: 'Failed to submit check-in',
    fileTooLarge: 'File is too large. Maximum size is 5MB.',
  },
  visualComparison: {
    title: 'Visual Progress',
    day: 'Day',
    totalCheckIns: 'Total Check-Ins',
    timeline: 'Timeline',
    autoGenerated: 'Auto-generated',
  },
  disputeResolution: {
    title: 'Dispute Resolution',
    subtitle: 'Community-driven dispute resolution',
    noDisputes: 'No active disputes',
    questTitle: 'Quest',
    publisher: 'Publisher',
    warrior: 'Warrior',
    publisherArgument: 'Publisher Argument',
    warriorArgument: 'Warrior Argument',
    voteDistribution: 'Vote Distribution',
    publisherVotes: 'Publisher',
    adminVotes: 'Admin',
    communityVotes: 'Community',
    voteForPublisher: 'Vote for Publisher',
    voteForWarrior: 'Vote for Warrior',
    votingClosed: 'Voting Closed',
  },
  appealSubmission: {
    title: 'Submit Appeal',
    description: 'Explain why you believe the quest outcome should be disputed',
    yourArgument: 'Your Argument',
    argumentPlaceholder: 'Provide detailed evidence and reasoning...',
    minCharacters: 'Minimum 100 characters',
    submit: 'Submit Appeal',
    submitting: 'Submitting...',
    argumentTooShort: 'Argument must be at least 100 characters',
    submitSuccess: 'Appeal submitted successfully',
    submitError: 'Failed to submit appeal',
    viewAppeal: 'View Appeal',
    yourAppeal: 'Your Appeal',
    noAppeal: 'No appeal submitted yet',
  },
  introduction: {
    linkText: 'How it works?',
    title: 'Welcome to Grit Bounty',
    subtitle: 'Turn "What If" Into Reality',
    coreMission: {
      title: 'Core Mission',
      content: 'Grit Bounty is a blockchain-based habit formation platform that transforms "what if" regrets into actionable challenges. Set bounties for persistent habits, attract warriors to complete them, and prove that persistence truly makes you stronger.',
    },
    useCases: {
      title: 'Use Cases',
      intro: 'Grit Bounty supports various challenge scenarios:',
      lifestyle: 'Lifestyle Habits',
      lifestyleExample: 'Wake up at 5 AM for 100 consecutive days',
      health: 'Health Goals',
      healthExample: 'Only eat vegetables for 30 days',
      exercise: 'Fitness Challenges',
      exerciseExample: 'Run 5km every day for 60 days',
      social: 'Social Experiments',
      socialExample: 'No social media for 90 days',
      enterprise: 'Enterprise Training',
      enterpriseExample: 'Daily skill practice for team development',
      more: 'And More',
      moreExample: 'Any persistent habit or challenge you can imagine',
    },
    bountyMechanism: {
      title: 'Bounty Mechanism',
      publishTitle: 'Publish Bounty',
      publishContent: 'Set a quest with reward pool and difficulty. The bounty is locked immediately upon publication.',
      crowdfundTitle: 'Crowdfunding',
      crowdfundContent: 'Others can add to the reward pool to increase attractiveness',
      acceptTitle: 'Accept Quest',
      acceptContent: 'Warriors pay a deposit (based on credit score) to accept the challenge',
      flexibleTitle: 'Flexible Participants',
      flexibleContent: 'Support 1-100 warriors accepting the same quest simultaneously',
    },
    settlementRules: {
      title: 'Settlement Rules',
      successTitle: 'Success',
      successContent: 'Warrior completes all check-ins and receives reward + deposit refund',
      unclaimedTitle: 'Unclaimed',
      unclaimedContent: 'If no warrior accepts, publisher can cancel and receive full refund',
      defaultTitle: 'Default',
      defaultContent: 'Warrior abandons quest, forfeits deposit, and credit score resets to 50%',
      feesTitle: 'Platform Fees',
      feesSuccessLabel: 'Success',
      feesSuccessContent: '6% platform fee on rewards',
      feesDefaultLabel: 'Default',
      feesDefaultContent: '10% platform fee on forfeited deposits',
    },
    warriorCredit: {
      title: 'Warrior Credit System',
      intro: 'Build trust through successful completions:',
      initialTitle: 'Initial Rate',
      initialContent: 'New warriors start at 50% deposit rate',
      rewardTitle: 'Reward',
      rewardContent: 'Each successful quest reduces deposit rate by 3%',
      capTitle: 'Minimum',
      capContent: 'Deposit rate can go as low as 2%',
      penaltyTitle: 'Penalty',
      penaltyContent: 'Abandoning a quest resets deposit rate to 50%',
    },
  },
  footer: {
    builtWith: 'Built with',
    love: 'love',
    using: 'using',
  },
};

// Simplified Chinese translations
const simplifiedChineseTranslations: TranslationStructure = {
  splash: {
    question: '坚持会让你变强，还是毫无意义？',
    subtext: '如果"当初"成为现实，你真的会更好吗？',
    enter: '进入',
    subtitle: '将"如果当初"变为现实',
    tagline: '挑战自己。证明毅力。赢取奖励。',
    feature1Title: '设定挑战',
    feature1Desc: '创建测试坚持和承诺的任务',
    feature2Title: '赚取奖励',
    feature2Desc: '完成挑战并赚取 ICP 代币',
    feature3Title: '建立信任',
    feature3Desc: '每次成功任务降低押金率',
  },
  language: {
    select: '选择您的语言',
    english: 'English',
    chinese: '简体中文',
    spanish: 'Español',
    french: 'Français',
    japanese: '日本語',
    korean: '한국어',
  },
  auth: {
    login: '登录',
    logout: '登出',
    loggingIn: '登录中...',
  },
  profile: {
    setupTitle: '欢迎，勇士',
    setupDescription: '输入您的名字开始旅程',
    namePlaceholder: '您的名字',
    save: '保存',
    saving: '保存中...',
  },
  nav: {
    bountyBoard: '悬赏榜',
    launchMission: '发布任务',
    disputeResolution: '争议解决',
    personalCenter: '个人中心',
  },
  bountyBoard: {
    title: '悬赏榜',
    allQuests: '全部任务',
    noQuests: '暂无任务',
    hype: '热度',
    contributors: '贡献者',
    acceptSuccess: '任务接受成功！',
    acceptError: '接受任务失败',
    yourQuest: '您的任务',
    addToPot: '加入奖池',
    addToPotDescription: '增加奖池以吸引更多勇士',
    currentPool: '当前奖池',
    yourContribution: '您的贡献',
    newPool: '新奖池',
    contribute: '贡献',
    contributionSuccess: '贡献添加成功！',
    contributionError: '添加贡献失败',
  },
  difficulty: {
    easy: '简单',
    medium: '中等',
    hard: '困难',
    extreme: '极限',
    impossible: '不可能',
  },
  deposit: {
    required: '需要押金',
    acceptAndPayDeposit: '接受并支付押金',
    confirmTitle: '确认押金',
    confirmDescription: '锁定您的押金以接受此任务',
    questTitle: '任务',
    rewardPool: '奖池',
    yourDepositRate: '您的押金率',
    depositRequired: '需要押金',
    depositInfo: '您的押金将被锁定直到任务完成。成功完成以赚取奖励并降低押金率。',
    cancel: '取消',
    confirmAndPay: '确认并支付',
    processing: '处理中...',
    transferFailed: '转账失败',
    totalRewardPool: '总奖池',
    warriorsNeeded: '需要勇士',
    perWarriorReward: '每位勇士奖励',
  },
  publishConfirm: {
    confirmTitle: '确认任务发布',
    confirmDescription: '发布前请检查任务详情。悬赏金额将立即锁定。',
    questTitle: '任务标题',
    questDescription: '描述',
    difficulty: '难度',
    participantCount: '需要参与者',
    rewardPool: '悬赏金额',
    yourBalance: '您的余额',
    lockInfo: '悬赏金额将锁定在任务合约中，直到完成或取消。如果还没有勇士接受，您可以取消并获得全额退款。',
    insufficientBalance: '余额不足。',
    required: '需要',
    available: '可用',
    cancel: '取消',
    confirmAndPublish: '确认并发布',
    publishing: '发布中...',
    publishFailed: '发布任务失败',
    checkingBalance: '检查余额中...',
  },
  cancelQuest: {
    title: '取消任务',
    description: '取消此任务并获得锁定悬赏的全额退款。',
    questTitle: '任务',
    fullRefund: '全额退款',
    refundInfo: '由于还没有勇士接受此任务，您将获得全额退款，不收取任何费用。任务将从悬赏榜中移除。',
    back: '返回',
    confirmCancel: '确认取消',
    cancelling: '取消中...',
    cancelError: '取消任务失败',
  },
  launchMission: {
    title: '发布任务',
    subtitle: '创建新任务并设定挑战',
    questTitle: '任务标题',
    titlePlaceholder: '例如：连续100天早上5点起床',
    rules: '任务规则与描述',
    rulesPlaceholder: '描述任务要求和规则...',
    rewardPool: '初始奖池 (ICP)',
    rewardHint: '最低 0.0001 ICP',
    difficulty: '难度等级',
    createQuest: '创建任务',
    creating: '创建中...',
    fillAllFields: '请填写所有字段',
    invalidReward: '请输入有效的奖励金额',
    createSuccess: '任务创建成功！',
    createError: '创建任务失败',
    titleRequired: '任务标题必填',
    descriptionTooShort: '描述至少需要20个字符',
    minCharacters: '最少字符',
    participantCount: '需要勇士数量',
    participantCountPlaceholder: '1-100',
    participantCountHint: '多少勇士可以接受此任务',
    invalidParticipantCount: '参与者数量必须在1到100之间',
  },
  creditScore: {
    title: '勇士信用分',
    depositRate: '当前押金率',
    successfulQuests: '成功任务',
    totalEarned: '总收入',
    totalDeposited: '总押金',
    questsToMinimum: '个任务达到最低率 (2%)',
    rateDecrease: '每次成功：-3%',
  },
  personalCenter: {
    title: '个人中心',
    subtitle: '追踪您的任务和进度',
    acceptedQuests: '已接受任务',
    postedBounties: '已发布悬赏',
    noAcceptedQuests: '暂无已接受任务',
    noPostedBounties: '暂无已发布悬赏',
    progress: '进度',
    status: '状态',
    reward: '奖励',
    lockedDeposit: '锁定押金',
    rewardPool: '奖池',
    hypeCount: '热度',
    warrior: '勇士',
    checkIn: '打卡',
    viewProgress: '查看进度',
    deleteQuest: '删除',
    exitQuest: '退出',
    abandonQuest: '放弃任务',
    cancelQuest: '取消任务',
    statusActive: '活跃',
    statusInProgress: '进行中',
    statusPending: '待验证',
    statusCompleted: '已完成',
    statusDisputed: '争议中',
    statusCancelled: '已取消',
  },
  deleteQuest: {
    title: '删除任务',
    description: '您确定要永久删除此任务吗？',
    warning: '此操作无法撤销。任务将被永久删除。',
    cancel: '取消',
    confirm: '删除任务',
    deleting: '删除中...',
  },
  exitQuest: {
    title: '退出任务',
    description: '您即将退出此任务并获得初始贡献的退款。',
    yourContribution: '您的贡献',
    crowdfunding: '众筹',
    contributors: '贡献者',
    refundInfo: '您将获得初始贡献的全额退款。众筹贡献将保留在奖池中。',
    cancel: '取消',
    confirm: '退出任务',
    exiting: '退出中...',
  },
  abandonQuest: {
    title: '放弃任务',
    description: '警告：放弃此任务将导致严重惩罚。',
    forfeitAmount: '将被没收的押金',
    depositRateReset: '押金率重置',
    warning: '您的押金将被没收，押金率将重置为50%。此操作无法撤销。',
    typeConfirm: '输入 CONFIRM 继续',
    typeConfirmHint: '准确输入 "CONFIRM"',
    cancel: '取消',
    confirm: '放弃任务',
    abandoning: '放弃中...',
  },
  dailyCheckIn: {
    title: '每日打卡',
    day: '第',
    description: '记录今天的进度',
    firstDayNote: '这是您的第一次打卡！拍张照片记录您的转变。',
    progress: '进度',
    target: '目标',
    days: '天',
    statusUpdate: '状态更新',
    statusPlaceholder: '今天怎么样？分享您的想法...',
    photo: '照片',
    uploadPhoto: '上传照片',
    photoOptional: '可选但建议第1天上传',
    uploading: '上传中',
    submit: '提交打卡',
    submitting: '提交中...',
    requireContent: '请提供状态更新或照片',
    submitSuccess: '打卡提交成功！',
    submitError: '提交打卡失败',
    fileTooLarge: '文件太大。最大大小为5MB。',
  },
  visualComparison: {
    title: '视觉进度',
    day: '第',
    totalCheckIns: '总打卡次数',
    timeline: '时间线',
    autoGenerated: '自动生成',
  },
  disputeResolution: {
    title: '争议解决',
    subtitle: '社区驱动的争议解决',
    noDisputes: '暂无活跃争议',
    questTitle: '任务',
    publisher: '发布者',
    warrior: '勇士',
    publisherArgument: '发布者论据',
    warriorArgument: '勇士论据',
    voteDistribution: '投票分布',
    publisherVotes: '发布者',
    adminVotes: '管理员',
    communityVotes: '社区',
    voteForPublisher: '投票给发布者',
    voteForWarrior: '投票给勇士',
    votingClosed: '投票已关闭',
  },
  appealSubmission: {
    title: '提交申诉',
    description: '解释为什么您认为任务结果应该被争议',
    yourArgument: '您的论据',
    argumentPlaceholder: '提供详细的证据和理由...',
    minCharacters: '最少100个字符',
    submit: '提交申诉',
    submitting: '提交中...',
    argumentTooShort: '论据至少需要100个字符',
    submitSuccess: '申诉提交成功',
    submitError: '提交申诉失败',
    viewAppeal: '查看申诉',
    yourAppeal: '您的申诉',
    noAppeal: '尚未提交申诉',
  },
  introduction: {
    linkText: '如何运作？',
    title: '欢迎来到 Grit Bounty',
    subtitle: '将"如果当初"变为现实',
    coreMission: {
      title: '核心使命',
      content: 'Grit Bounty 是一个基于区块链的习惯养成平台，将"如果当初"的遗憾转化为可行的挑战。为持续性习惯设置悬赏，吸引勇士完成它们，并证明坚持确实能让你变得更强。',
    },
    useCases: {
      title: '使用场景',
      intro: 'Grit Bounty 支持各种挑战场景：',
      lifestyle: '生活习惯',
      lifestyleExample: '连续100天早上5点起床',
      health: '健康目标',
      healthExample: '30天只吃蔬菜',
      exercise: '健身挑战',
      exerciseExample: '连续60天每天跑5公里',
      social: '社交实验',
      socialExample: '90天不使用社交媒体',
      enterprise: '企业培训',
      enterpriseExample: '团队发展的每日技能练习',
      more: '更多',
      moreExample: '任何您能想象的持续性习惯或挑战',
    },
    bountyMechanism: {
      title: '悬赏机制',
      publishTitle: '发布悬赏',
      publishContent: '设置带有奖池和难度的任务。悬赏在发布时立即锁定。',
      crowdfundTitle: '众筹',
      crowdfundContent: '其他人可以增加奖池以提高吸引力',
      acceptTitle: '接受任务',
      acceptContent: '勇士支付押金（基于信用分）接受挑战',
      flexibleTitle: '灵活参与者',
      flexibleContent: '支持1-100名勇士同时接受同一任务',
    },
    settlementRules: {
      title: '结算规则',
      successTitle: '成功',
      successContent: '勇士完成所有打卡并获得奖励+押金退款',
      unclaimedTitle: '无人认领',
      unclaimedContent: '如果没有勇士接受，发布者可以取消并获得全额退款',
      defaultTitle: '违约',
      defaultContent: '勇士放弃任务，没收押金，信用分重置为50%',
      feesTitle: '平台费用',
      feesSuccessLabel: '成功',
      feesSuccessContent: '奖励的6%平台费',
      feesDefaultLabel: '违约',
      feesDefaultContent: '没收押金的10%平台费',
    },
    warriorCredit: {
      title: '勇士信用系统',
      intro: '通过成功完成建立信任：',
      initialTitle: '初始率',
      initialContent: '新勇士从50%押金率开始',
      rewardTitle: '奖励',
      rewardContent: '每次成功任务降低押金率3%',
      capTitle: '最低',
      capContent: '押金率最低可达2%',
      penaltyTitle: '惩罚',
      penaltyContent: '放弃任务将押金率重置为50%',
    },
  },
  footer: {
    builtWith: '用',
    love: '爱',
    using: '构建，使用',
  },
};

// Traditional Chinese translations
const traditionalChineseTranslations: TranslationStructure = {
  splash: {
    question: '堅持會讓你變強，還是毫無意義？',
    subtext: '如果"當初"成為現實，你真的會更好嗎？',
    enter: '進入',
    subtitle: '將"如果當初"變為現實',
    tagline: '挑戰自己。證明毅力。贏取獎勵。',
    feature1Title: '設定挑戰',
    feature1Desc: '創建測試堅持和承諾的任務',
    feature2Title: '賺取獎勵',
    feature2Desc: '完成挑戰並賺取 ICP 代幣',
    feature3Title: '建立信任',
    feature3Desc: '每次成功任務降低押金率',
  },
  language: {
    select: '選擇您的語言',
    english: 'English',
    chinese: '繁體中文',
    spanish: 'Español',
    french: 'Français',
    japanese: '日本語',
    korean: '한국어',
  },
  auth: {
    login: '登入',
    logout: '登出',
    loggingIn: '登入中...',
  },
  profile: {
    setupTitle: '歡迎，勇士',
    setupDescription: '輸入您的名字開始旅程',
    namePlaceholder: '您的名字',
    save: '保存',
    saving: '保存中...',
  },
  nav: {
    bountyBoard: '懸賞榜',
    launchMission: '發布任務',
    disputeResolution: '爭議解決',
    personalCenter: '個人中心',
  },
  bountyBoard: {
    title: '懸賞榜',
    allQuests: '全部任務',
    noQuests: '暫無任務',
    hype: '熱度',
    contributors: '貢獻者',
    acceptSuccess: '任務接受成功！',
    acceptError: '接受任務失敗',
    yourQuest: '您的任務',
    addToPot: '加入獎池',
    addToPotDescription: '增加獎池以吸引更多勇士',
    currentPool: '當前獎池',
    yourContribution: '您的貢獻',
    newPool: '新獎池',
    contribute: '貢獻',
    contributionSuccess: '貢獻添加成功！',
    contributionError: '添加貢獻失敗',
  },
  difficulty: {
    easy: '簡單',
    medium: '中等',
    hard: '困難',
    extreme: '極限',
    impossible: '不可能',
  },
  deposit: {
    required: '需要押金',
    acceptAndPayDeposit: '接受並支付押金',
    confirmTitle: '確認押金',
    confirmDescription: '鎖定您的押金以接受此任務',
    questTitle: '任務',
    rewardPool: '獎池',
    yourDepositRate: '您的押金率',
    depositRequired: '需要押金',
    depositInfo: '您的押金將被鎖定直到任務完成。成功完成以賺取獎勵並降低押金率。',
    cancel: '取消',
    confirmAndPay: '確認並支付',
    processing: '處理中...',
    transferFailed: '轉賬失敗',
    totalRewardPool: '總獎池',
    warriorsNeeded: '需要勇士',
    perWarriorReward: '每位勇士獎勵',
  },
  publishConfirm: {
    confirmTitle: '確認任務發布',
    confirmDescription: '發布前請檢查任務詳情。懸賞金額將立即鎖定。',
    questTitle: '任務標題',
    questDescription: '描述',
    difficulty: '難度',
    participantCount: '需要參與者',
    rewardPool: '懸賞金額',
    yourBalance: '您的餘額',
    lockInfo: '懸賞金額將鎖定在任務合約中，直到完成或取消。如果還沒有勇士接受，您可以取消並獲得全額退款。',
    insufficientBalance: '餘額不足。',
    required: '需要',
    available: '可用',
    cancel: '取消',
    confirmAndPublish: '確認並發布',
    publishing: '發布中...',
    publishFailed: '發布任務失敗',
    checkingBalance: '檢查餘額中...',
  },
  cancelQuest: {
    title: '取消任務',
    description: '取消此任務並獲得鎖定懸賞的全額退款。',
    questTitle: '任務',
    fullRefund: '全額退款',
    refundInfo: '由於還沒有勇士接受此任務，您將獲得全額退款，不收取任何費用。任務將從懸賞榜中移除。',
    back: '返回',
    confirmCancel: '確認取消',
    cancelling: '取消中...',
    cancelError: '取消任務失敗',
  },
  launchMission: {
    title: '發布任務',
    subtitle: '創建新任務並設定挑戰',
    questTitle: '任務標題',
    titlePlaceholder: '例如：連續100天早上5點起床',
    rules: '任務規則與描述',
    rulesPlaceholder: '描述任務要求和規則...',
    rewardPool: '初始獎池 (ICP)',
    rewardHint: '最低 0.0001 ICP',
    difficulty: '難度等級',
    createQuest: '創建任務',
    creating: '創建中...',
    fillAllFields: '請填寫所有字段',
    invalidReward: '請輸入有效的獎勵金額',
    createSuccess: '任務創建成功！',
    createError: '創建任務失敗',
    titleRequired: '任務標題必填',
    descriptionTooShort: '描述至少需要20個字符',
    minCharacters: '最少字符',
    participantCount: '需要勇士數量',
    participantCountPlaceholder: '1-100',
    participantCountHint: '多少勇士可以接受此任務',
    invalidParticipantCount: '參與者數量必須在1到100之間',
  },
  creditScore: {
    title: '勇士信用分',
    depositRate: '當前押金率',
    successfulQuests: '成功任務',
    totalEarned: '總收入',
    totalDeposited: '總押金',
    questsToMinimum: '個任務達到最低率 (2%)',
    rateDecrease: '每次成功：-3%',
  },
  personalCenter: {
    title: '個人中心',
    subtitle: '追蹤您的任務和進度',
    acceptedQuests: '已接受任務',
    postedBounties: '已發布懸賞',
    noAcceptedQuests: '暫無已接受任務',
    noPostedBounties: '暫無已發布懸賞',
    progress: '進度',
    status: '狀態',
    reward: '獎勵',
    lockedDeposit: '鎖定押金',
    rewardPool: '獎池',
    hypeCount: '熱度',
    warrior: '勇士',
    checkIn: '打卡',
    viewProgress: '查看進度',
    deleteQuest: '刪除',
    exitQuest: '退出',
    abandonQuest: '放棄任務',
    cancelQuest: '取消任務',
    statusActive: '活躍',
    statusInProgress: '進行中',
    statusPending: '待驗證',
    statusCompleted: '已完成',
    statusDisputed: '爭議中',
    statusCancelled: '已取消',
  },
  deleteQuest: {
    title: '刪除任務',
    description: '您確定要永久刪除此任務嗎？',
    warning: '此操作無法撤銷。任務將被永久刪除。',
    cancel: '取消',
    confirm: '刪除任務',
    deleting: '刪除中...',
  },
  exitQuest: {
    title: '退出任務',
    description: '您即將退出此任務並獲得初始貢獻的退款。',
    yourContribution: '您的貢獻',
    crowdfunding: '眾籌',
    contributors: '貢獻者',
    refundInfo: '您將獲得初始貢獻的全額退款。眾籌貢獻將保留在獎池中。',
    cancel: '取消',
    confirm: '退出任務',
    exiting: '退出中...',
  },
  abandonQuest: {
    title: '放棄任務',
    description: '警告：放棄此任務將導致嚴重懲罰。',
    forfeitAmount: '將被沒收的押金',
    depositRateReset: '押金率重置',
    warning: '您的押金將被沒收，押金率將重置為50%。此操作無法撤銷。',
    typeConfirm: '輸入 CONFIRM 繼續',
    typeConfirmHint: '準確輸入 "CONFIRM"',
    cancel: '取消',
    confirm: '放棄任務',
    abandoning: '放棄中...',
  },
  dailyCheckIn: {
    title: '每日打卡',
    day: '第',
    description: '記錄今天的進度',
    firstDayNote: '這是您的第一次打卡！拍張照片記錄您的轉變。',
    progress: '進度',
    target: '目標',
    days: '天',
    statusUpdate: '狀態更新',
    statusPlaceholder: '今天怎麼樣？分享您的想法...',
    photo: '照片',
    uploadPhoto: '上傳照片',
    photoOptional: '可選但建議第1天上傳',
    uploading: '上傳中',
    submit: '提交打卡',
    submitting: '提交中...',
    requireContent: '請提供狀態更新或照片',
    submitSuccess: '打卡提交成功！',
    submitError: '提交打卡失敗',
    fileTooLarge: '文件太大。最大大小為5MB。',
  },
  visualComparison: {
    title: '視覺進度',
    day: '第',
    totalCheckIns: '總打卡次數',
    timeline: '時間線',
    autoGenerated: '自動生成',
  },
  disputeResolution: {
    title: '爭議解決',
    subtitle: '社區驅動的爭議解決',
    noDisputes: '暫無活躍爭議',
    questTitle: '任務',
    publisher: '發布者',
    warrior: '勇士',
    publisherArgument: '發布者論據',
    warriorArgument: '勇士論據',
    voteDistribution: '投票分佈',
    publisherVotes: '發布者',
    adminVotes: '管理員',
    communityVotes: '社區',
    voteForPublisher: '投票給發布者',
    voteForWarrior: '投票給勇士',
    votingClosed: '投票已關閉',
  },
  appealSubmission: {
    title: '提交申訴',
    description: '解釋為什麼您認為任務結果應該被爭議',
    yourArgument: '您的論據',
    argumentPlaceholder: '提供詳細的證據和理由...',
    minCharacters: '最少100個字符',
    submit: '提交申訴',
    submitting: '提交中...',
    argumentTooShort: '論據至少需要100個字符',
    submitSuccess: '申訴提交成功',
    submitError: '提交申訴失敗',
    viewAppeal: '查看申訴',
    yourAppeal: '您的申訴',
    noAppeal: '尚未提交申訴',
  },
  introduction: {
    linkText: '如何運作？',
    title: '歡迎來到 Grit Bounty',
    subtitle: '將"如果當初"變為現實',
    coreMission: {
      title: '核心使命',
      content: 'Grit Bounty 是一個基於區塊鏈的習慣養成平台，將"如果當初"的遺憾轉化為可行的挑戰。為持續性習慣設置懸賞，吸引勇士完成它們，並證明堅持確實能讓你變得更強。',
    },
    useCases: {
      title: '使用場景',
      intro: 'Grit Bounty 支持各種挑戰場景：',
      lifestyle: '生活習慣',
      lifestyleExample: '連續100天早上5點起床',
      health: '健康目標',
      healthExample: '30天只吃蔬菜',
      exercise: '健身挑戰',
      exerciseExample: '連續60天每天跑5公里',
      social: '社交實驗',
      socialExample: '90天不使用社交媒體',
      enterprise: '企業培訓',
      enterpriseExample: '團隊發展的每日技能練習',
      more: '更多',
      moreExample: '任何您能想像的持續性習慣或挑戰',
    },
    bountyMechanism: {
      title: '懸賞機制',
      publishTitle: '發布懸賞',
      publishContent: '設置帶有獎池和難度的任務。懸賞在發布時立即鎖定。',
      crowdfundTitle: '眾籌',
      crowdfundContent: '其他人可以增加獎池以提高吸引力',
      acceptTitle: '接受任務',
      acceptContent: '勇士支付押金（基於信用分）接受挑戰',
      flexibleTitle: '靈活參與者',
      flexibleContent: '支持1-100名勇士同時接受同一任務',
    },
    settlementRules: {
      title: '結算規則',
      successTitle: '成功',
      successContent: '勇士完成所有打卡並獲得獎勵+押金退款',
      unclaimedTitle: '無人認領',
      unclaimedContent: '如果沒有勇士接受，發布者可以取消並獲得全額退款',
      defaultTitle: '違約',
      defaultContent: '勇士放棄任務，沒收押金，信用分重置為50%',
      feesTitle: '平台費用',
      feesSuccessLabel: '成功',
      feesSuccessContent: '獎勵的6%平台費',
      feesDefaultLabel: '違約',
      feesDefaultContent: '沒收押金的10%平台費',
    },
    warriorCredit: {
      title: '勇士信用系統',
      intro: '通過成功完成建立信任：',
      initialTitle: '初始率',
      initialContent: '新勇士從50%押金率開始',
      rewardTitle: '獎勵',
      rewardContent: '每次成功任務降低押金率3%',
      capTitle: '最低',
      capContent: '押金率最低可達2%',
      penaltyTitle: '懲罰',
      penaltyContent: '放棄任務將押金率重置為50%',
    },
  },
  footer: {
    builtWith: '用',
    love: '愛',
    using: '構建，使用',
  },
};

export const translations: Record<Language, TranslationStructure> = {
  [Language.English]: englishTranslations,
  [Language.SimplifiedChinese]: simplifiedChineseTranslations,
  [Language.TraditionalChinese]: traditionalChineseTranslations,
};
