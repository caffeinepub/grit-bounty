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
  wallet: {
    title: string;
    balance: string;
    depositAddress: string;
    depositInfo: string;
    withdraw: string;
    history: string;
    withdrawICP: string;
    withdrawDescription: string;
    destinationAddress: string;
    destinationPlaceholder: string;
    amount: string;
    availableBalance: string;
    withdrawalAmount: string;
    transactionFee: string;
    netAmount: string;
    cancel: string;
    continue: string;
    confirmWithdrawal: string;
    confirmWithdrawalDescription: string;
    withdrawalWarning: string;
    recipientReceives: string;
    back: string;
    confirmWithdraw: string;
    processing: string;
    transactionHistory: string;
    noTransactions: string;
    typeDeposit: string;
    typeWithdrawal: string;
    typeTaskPayment: string;
    typeTaskDeduction: string;
    statusSuccess: string;
    statusPending: string;
    statusFailed: string;
    loadingBalance: string;
    loadingAddress: string;
    addressUnavailable: string;
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
  wallet: {
    title: 'ICP Wallet',
    balance: 'Balance',
    depositAddress: 'Deposit Address',
    depositInfo: 'Send ICP to this address from exchanges or other wallets to fund your account',
    withdraw: 'Withdraw',
    history: 'Transaction History',
    withdrawICP: 'Withdraw ICP',
    withdrawDescription: 'Transfer ICP to an external wallet or exchange',
    destinationAddress: 'Destination Address',
    destinationPlaceholder: 'Enter ICP address or principal ID',
    amount: 'Amount',
    availableBalance: 'Available',
    withdrawalAmount: 'Withdrawal Amount',
    transactionFee: 'Transaction Fee',
    netAmount: 'Net Amount',
    cancel: 'Cancel',
    continue: 'Continue',
    confirmWithdrawal: 'Confirm Withdrawal',
    confirmWithdrawalDescription: 'Please review the withdrawal details carefully',
    withdrawalWarning: 'This transaction cannot be reversed. Please verify the destination address.',
    recipientReceives: 'Recipient Receives',
    back: 'Back',
    confirmWithdraw: 'Confirm Withdrawal',
    processing: 'Processing...',
    transactionHistory: 'Transaction History',
    noTransactions: 'No transactions yet',
    typeDeposit: 'Deposit',
    typeWithdrawal: 'Withdrawal',
    typeTaskPayment: 'Quest Reward',
    typeTaskDeduction: 'Quest Deposit',
    statusSuccess: 'Success',
    statusPending: 'Pending',
    statusFailed: 'Failed',
    loadingBalance: 'Loading balance...',
    loadingAddress: 'Loading address...',
    addressUnavailable: 'Address unavailable',
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
      intro: 'Build trust through successful quest completion',
      initialTitle: 'Initial Rate',
      initialContent: 'New warriors start with a 50% deposit rate',
      rewardTitle: 'Earn Trust',
      rewardContent: 'Each successful quest reduces your deposit rate by 3%',
      capTitle: 'Minimum Rate',
      capContent: 'Deposit rate can be reduced to as low as 2%',
      penaltyTitle: 'Abandonment Penalty',
      penaltyContent: 'Abandoning a quest resets your deposit rate back to 50%',
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
  ...englishTranslations,
  splash: {
    question: '坚持会让你变强，还是毫无意义？',
    subtext: '如果"假如"成为现实，你真的会更好吗？',
    enter: '进入',
    subtitle: '将"假如"变为现实',
    tagline: '挑战自己。证明你的毅力。赚取奖励。',
    feature1Title: '设定挑战',
    feature1Desc: '创建测试坚持和承诺的任务',
    feature2Title: '赚取奖励',
    feature2Desc: '完成挑战并赚取ICP代币',
    feature3Title: '建立信任',
    feature3Desc: '每次成功任务降低你的押金率',
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
    setupDescription: '输入您的名字开始您的旅程',
    namePlaceholder: '您的名字',
    save: '保存',
    saving: '保存中...',
  },
  nav: {
    bountyBoard: '赏金榜',
    launchMission: '发布任务',
    disputeResolution: '争议解决',
    personalCenter: '个人中心',
  },
  bountyBoard: {
    title: '赏金榜',
    allQuests: '所有任务',
    noQuests: '暂无任务',
    hype: '热度',
    contributors: '贡献者',
    acceptSuccess: '任务接受成功！',
    acceptError: '接受任务失败',
    yourQuest: '你的任务',
    addToPot: '增加奖池',
    addToPotDescription: '增加奖励池以吸引更多勇士',
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
    extreme: '极难',
    impossible: '不可能',
  },
  deposit: {
    required: '需要押金',
    acceptAndPayDeposit: '接受并支付押金',
    confirmTitle: '确认押金',
    confirmDescription: '锁定您的押金以接受此任务',
    questTitle: '任务',
    rewardPool: '奖励池',
    yourDepositRate: '您的押金率',
    depositRequired: '需要押金',
    depositInfo: '您的押金将被锁定直到任务完成。成功完成以赚取奖励并降低您的押金率。',
    cancel: '取消',
    confirmAndPay: '确认并支付',
    processing: '处理中...',
    transferFailed: '转账失败',
    totalRewardPool: '总奖励池',
    warriorsNeeded: '需要勇士',
    perWarriorReward: '每位勇士奖励',
  },
  publishConfirm: {
    confirmTitle: '确认任务发布',
    confirmDescription: '发布前请查看您的任务详情。赏金金额将立即锁定。',
    questTitle: '任务标题',
    questDescription: '描述',
    difficulty: '难度',
    participantCount: '需要参与者',
    rewardPool: '赏金金额',
    yourBalance: '您的余额',
    lockInfo: '赏金金额将被锁定在任务合约中，直到完成或取消。如果还没有勇士接受，您可以取消并获得全额退款。',
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
    description: '取消此任务并获得锁定赏金的全额退款。',
    questTitle: '任务',
    fullRefund: '全额退款',
    refundInfo: '由于还没有勇士接受此任务，您将获得全额退款，不扣除任何费用。任务将从赏金榜中移除。',
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
    rewardPool: '初始奖励池 (ICP)',
    rewardHint: '最低 0.0001 ICP',
    difficulty: '难度等级',
    createQuest: '创建任务',
    creating: '创建中...',
    fillAllFields: '请填写所有字段',
    invalidReward: '请输入有效的奖励金额',
    createSuccess: '任务创建成功！',
    createError: '创建任务失败',
    titleRequired: '任务标题是必需的',
    descriptionTooShort: '描述必须至少20个字符',
    minCharacters: '最少字符数',
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
    questsToMinimum: '任务达到最低率 (2%)',
    rateDecrease: '每次成功：-3%',
  },
  personalCenter: {
    title: '个人中心',
    subtitle: '跟踪您的任务和进度',
    acceptedQuests: '已接受任务',
    postedBounties: '已发布赏金',
    noAcceptedQuests: '还没有接受的任务',
    noPostedBounties: '还没有发布的赏金',
    progress: '进度',
    status: '状态',
    reward: '奖励',
    lockedDeposit: '锁定押金',
    rewardPool: '奖励池',
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
    statusPending: '待审核',
    statusCompleted: '已完成',
    statusDisputed: '争议中',
    statusCancelled: '已取消',
  },
  wallet: {
    title: 'ICP钱包',
    balance: '余额',
    depositAddress: '充值地址',
    depositInfo: '从交易所或其他钱包向此地址发送ICP以充值您的账户',
    withdraw: '提现',
    history: '交易历史',
    withdrawICP: '提现ICP',
    withdrawDescription: '将ICP转账到外部钱包或交易所',
    destinationAddress: '目标地址',
    destinationPlaceholder: '输入ICP地址或主体ID',
    amount: '金额',
    availableBalance: '可用',
    withdrawalAmount: '提现金额',
    transactionFee: '交易手续费',
    netAmount: '净金额',
    cancel: '取消',
    continue: '继续',
    confirmWithdrawal: '确认提现',
    confirmWithdrawalDescription: '请仔细查看提现详情',
    withdrawalWarning: '此交易无法撤销。请验证目标地址。',
    recipientReceives: '接收方收到',
    back: '返回',
    confirmWithdraw: '确认提现',
    processing: '处理中...',
    transactionHistory: '交易历史',
    noTransactions: '暂无交易',
    typeDeposit: '充值',
    typeWithdrawal: '提现',
    typeTaskPayment: '任务奖励',
    typeTaskDeduction: '任务押金',
    statusSuccess: '成功',
    statusPending: '待处理',
    statusFailed: '失败',
    loadingBalance: '加载余额中...',
    loadingAddress: '加载地址中...',
    addressUnavailable: '地址不可用',
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
    forfeitAmount: '没收押金',
    depositRateReset: '押金率重置',
    warning: '您的押金将被没收，押金率将重置为50%。此操作无法撤销。',
    typeConfirm: '输入CONFIRM继续',
    typeConfirmHint: '准确输入"CONFIRM"',
    cancel: '取消',
    confirm: '放弃任务',
    abandoning: '放弃中...',
  },
  dailyCheckIn: {
    title: '每日打卡',
    day: '第',
    description: '记录今天的进度',
    firstDayNote: '这是您的第一次打卡！拍张照片来跟踪您的转变。',
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
    noDisputes: '没有活跃的争议',
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
    argumentTooShort: '论据必须至少100个字符',
    submitSuccess: '申诉提交成功',
    submitError: '提交申诉失败',
    viewAppeal: '查看申诉',
    yourAppeal: '您的申诉',
    noAppeal: '还没有提交申诉',
  },
  introduction: {
    linkText: '如何运作？',
    title: '欢迎来到Grit Bounty',
    subtitle: '将"假如"变为现实',
    coreMission: {
      title: '核心使命',
      content: 'Grit Bounty是一个基于区块链的习惯养成平台，将"假如"的遗憾转化为可行的挑战。为持续的习惯设定赏金，吸引勇士完成它们，并证明坚持确实让你更强大。',
    },
    useCases: {
      title: '使用场景',
      intro: 'Grit Bounty支持各种挑战场景：',
      lifestyle: '生活习惯',
      lifestyleExample: '连续100天早上5点起床',
      health: '健康目标',
      healthExample: '30天只吃蔬菜',
      exercise: '健身挑战',
      exerciseExample: '60天每天跑5公里',
      social: '社交实验',
      socialExample: '90天不使用社交媒体',
      enterprise: '企业培训',
      enterpriseExample: '团队发展的每日技能练习',
      more: '更多',
      moreExample: '任何您能想象的持续习惯或挑战',
    },
    bountyMechanism: {
      title: '赏金机制',
      publishTitle: '发布赏金',
      publishContent: '设定带有奖励池和难度的任务。赏金在发布时立即锁定。',
      crowdfundTitle: '众筹',
      crowdfundContent: '其他人可以增加奖励池以提高吸引力',
      acceptTitle: '接受任务',
      acceptContent: '勇士支付押金（基于信用分）以接受挑战',
      flexibleTitle: '灵活参与者',
      flexibleContent: '支持1-100名勇士同时接受同一任务',
    },
    settlementRules: {
      title: '结算规则',
      successTitle: '成功',
      successContent: '勇士完成所有打卡并获得奖励+押金退款',
      unclaimedTitle: '未认领',
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
      intro: '通过成功完成任务建立信任',
      initialTitle: '初始率',
      initialContent: '新勇士从50%的押金率开始',
      rewardTitle: '赚取信任',
      rewardContent: '每次成功任务将您的押金率降低3%',
      capTitle: '最低率',
      capContent: '押金率可以降低至2%',
      penaltyTitle: '放弃惩罚',
      penaltyContent: '放弃任务将您的押金率重置回50%',
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
  ...simplifiedChineseTranslations,
  language: {
    select: '選擇您的語言',
    english: 'English',
    chinese: '繁體中文',
    spanish: 'Español',
    french: 'Français',
    japanese: '日本語',
    korean: '한국어',
  },
  splash: {
    question: '堅持會讓你變強，還是毫無意義？',
    subtext: '如果"假如"成為現實，你真的會更好嗎？',
    enter: '進入',
    subtitle: '將"假如"變為現實',
    tagline: '挑戰自己。證明你的毅力。賺取獎勵。',
    feature1Title: '設定挑戰',
    feature1Desc: '創建測試堅持和承諾的任務',
    feature2Title: '賺取獎勵',
    feature2Desc: '完成挑戰並賺取ICP代幣',
    feature3Title: '建立信任',
    feature3Desc: '每次成功任務降低你的押金率',
  },
  wallet: {
    ...simplifiedChineseTranslations.wallet,
    title: 'ICP錢包',
    balance: '餘額',
    depositAddress: '充值地址',
    depositInfo: '從交易所或其他錢包向此地址發送ICP以充值您的賬戶',
    withdraw: '提現',
    history: '交易歷史',
    withdrawICP: '提現ICP',
    withdrawDescription: '將ICP轉賬到外部錢包或交易所',
    destinationAddress: '目標地址',
    destinationPlaceholder: '輸入ICP地址或主體ID',
    amount: '金額',
    availableBalance: '可用',
    withdrawalAmount: '提現金額',
    transactionFee: '交易手續費',
    netAmount: '淨金額',
    cancel: '取消',
    continue: '繼續',
    confirmWithdrawal: '確認提現',
    confirmWithdrawalDescription: '請仔細查看提現詳情',
    withdrawalWarning: '此交易無法撤銷。請驗證目標地址。',
    recipientReceives: '接收方收到',
    back: '返回',
    confirmWithdraw: '確認提現',
    processing: '處理中...',
    transactionHistory: '交易歷史',
    noTransactions: '暫無交易',
    typeDeposit: '充值',
    typeWithdrawal: '提現',
    typeTaskPayment: '任務獎勵',
    typeTaskDeduction: '任務押金',
    statusSuccess: '成功',
    statusPending: '待處理',
    statusFailed: '失敗',
    loadingBalance: '加載餘額中...',
    loadingAddress: '加載地址中...',
    addressUnavailable: '地址不可用',
  },
};

export const translations: Record<Language, TranslationStructure> = {
  [Language.English]: englishTranslations,
  [Language.SimplifiedChinese]: simplifiedChineseTranslations,
  [Language.TraditionalChinese]: traditionalChineseTranslations,
};
