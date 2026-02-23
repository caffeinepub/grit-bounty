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
    originalBounty: string;
    additionalBounties: string;
    viewContributors: string;
    warriors: string;
  };
  addBounty: {
    title: string;
    description: string;
    questTitle: string;
    yourBalance: string;
    amount: string;
    currentPool: string;
    yourContribution: string;
    newPool: string;
    insufficientBalance: string;
    insufficientBalanceWarning: string;
    invalidAmount: string;
    cancel: string;
    confirm: string;
    adding: string;
    success: string;
    error: string;
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
    typeBountyContribution: string;
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
    originalBounty: 'Original Bounty',
    additionalBounties: 'Additional Bounties',
    viewContributors: '{count} contributors',
    warriors: 'warriors',
  },
  addBounty: {
    title: 'Add Bounty',
    description: 'Increase the reward pool to attract more warriors',
    questTitle: 'Quest',
    yourBalance: 'Your Balance',
    amount: 'Bounty Amount (ICP)',
    currentPool: 'Current Pool',
    yourContribution: 'Your Contribution',
    newPool: 'New Pool',
    insufficientBalance: 'Insufficient balance',
    insufficientBalanceWarning: 'Insufficient balance. Please top up your wallet first.',
    invalidAmount: 'Please enter a valid amount',
    cancel: 'Cancel',
    confirm: 'Add Bounty',
    adding: 'Adding...',
    success: 'Bounty added successfully!',
    error: 'Failed to add bounty',
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
    typeBountyContribution: 'Bounty Contribution',
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
    typeConfirmHint: 'Type "CONFIRM" in all caps',
    cancel: 'Cancel',
    confirm: 'Abandon Quest',
    abandoning: 'Abandoning...',
  },
  dailyCheckIn: {
    title: 'Daily Check-In',
    day: 'Day',
    description: 'Record your progress for today',
    firstDayNote: 'This is your first check-in! Upload a photo to track your progress.',
    progress: 'Progress',
    target: 'Target',
    days: 'days',
    statusUpdate: 'Status Update',
    statusPlaceholder: 'How did it go today? Share your progress...',
    photo: 'Photo',
    uploadPhoto: 'Upload Photo',
    photoOptional: 'Optional',
    uploading: 'Uploading',
    submit: 'Submit Check-In',
    submitting: 'Submitting...',
    requireContent: 'Please provide a status update',
    submitSuccess: 'Check-in submitted successfully!',
    submitError: 'Failed to submit check-in',
    fileTooLarge: 'File size must be less than 5MB',
  },
  visualComparison: {
    title: 'Visual Progress',
    day: 'Day',
    totalCheckIns: 'Total Check-Ins',
    timeline: 'Timeline',
    autoGenerated: 'Auto-generated placeholder',
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
    argumentPlaceholder: 'Provide detailed reasoning for your appeal...',
    minCharacters: 'Minimum 100 characters',
    submit: 'Submit Appeal',
    submitting: 'Submitting...',
    argumentTooShort: 'Argument must be at least 100 characters',
    submitSuccess: 'Appeal submitted successfully!',
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
      content: 'Grit Bounty is a decentralized platform that helps you turn aspirations into achievements through financial commitment and community support. Set challenges, lock deposits, and earn rewards by proving your persistence.',
    },
    useCases: {
      title: 'Use Cases',
      intro: 'Grit Bounty supports various personal development goals:',
      lifestyle: 'Lifestyle Habits',
      lifestyleExample: 'Wake up at 5 AM for 100 days, read 30 minutes daily',
      health: 'Health & Wellness',
      healthExample: 'Quit smoking, maintain healthy diet, meditation practice',
      exercise: 'Fitness Goals',
      exerciseExample: 'Run 5km daily, gym 4x per week, yoga practice',
      social: 'Social Challenges',
      socialExample: 'Network with 50 professionals, attend weekly meetups',
      enterprise: 'Enterprise Training',
      enterpriseExample: 'Employee skill development, team building challenges',
      more: 'And More',
      moreExample: 'Any goal that requires consistent daily effort and commitment',
    },
    bountyMechanism: {
      title: 'Bounty Mechanism',
      publishTitle: 'Publish Quest',
      publishContent: 'Publishers create quests with initial reward pools. The bounty is locked in escrow until quest completion.',
      crowdfundTitle: 'Crowdfunding',
      crowdfundContent: 'Community members can add to the reward pool to increase incentives and show support.',
      acceptTitle: 'Accept Challenge',
      acceptContent: 'Warriors accept quests by locking a deposit (2-50% of reward). Complete successfully to earn rewards and reduce future deposit rates.',
      flexibleTitle: 'Flexible Participation',
      flexibleContent: 'Quests can support multiple warriors simultaneously, creating a community of accountability.',
    },
    settlementRules: {
      title: 'Settlement Rules',
      successTitle: 'Successful Completion',
      successContent: 'Warriors who complete all check-ins receive their deposit back plus the reward. Deposit rate decreases by 3% for future quests.',
      unclaimedTitle: 'Unclaimed Rewards',
      unclaimedContent: 'If no warrior accepts within 30 days, publishers can cancel and receive a full refund.',
      defaultTitle: 'Default/Abandonment',
      defaultContent: 'Warriors who abandon quests forfeit their deposit and reset to 50% deposit rate.',
      feesTitle: 'Platform Fees',
      feesSuccessLabel: 'Success',
      feesSuccessContent: '5% platform fee on rewards',
      feesDefaultLabel: 'Default',
      feesDefaultContent: '10% platform fee on forfeited deposits',
    },
    warriorCredit: {
      title: 'Warrior Credit System',
      intro: 'Build trust and reduce costs through consistent success:',
      initialTitle: 'Initial Rate',
      initialContent: 'New warriors start at 50% deposit rate',
      rewardTitle: 'Success Rewards',
      rewardContent: 'Each successful quest reduces deposit rate by 3%',
      capTitle: 'Minimum Rate',
      capContent: 'Deposit rate can go as low as 2% for trusted warriors',
      penaltyTitle: 'Abandonment Penalty',
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
    question: '坚持会让你更强大，还是毫无意义？',
    subtext: '如果"假如"成为现实，你真的会更好吗？',
    enter: '进入',
    subtitle: '将"假如"变为现实',
    tagline: '挑战自己。证明你的毅力。赚取奖励。',
    feature1Title: '设定挑战',
    feature1Desc: '创建测试坚持和承诺的任务',
    feature2Title: '赚取奖励',
    feature2Desc: '完成挑战并赚取 ICP 代币',
    feature3Title: '建立信任',
    feature3Desc: '每次成功任务都会降低你的押金率',
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
    yourQuest: '您的任务',
    addToPot: '增加奖池',
    addToPotDescription: '增加奖励池以吸引更多勇士',
    currentPool: '当前奖池',
    yourContribution: '您的贡献',
    newPool: '新奖池',
    contribute: '贡献',
    contributionSuccess: '贡献添加成功！',
    contributionError: '添加贡献失败',
    originalBounty: '原始赏金',
    additionalBounties: '追加赏金',
    viewContributors: '{count} 位贡献者',
    warriors: '勇士',
  },
  addBounty: {
    title: '增加赏金',
    description: '增加奖励池以吸引更多勇士',
    questTitle: '任务',
    yourBalance: '您的余额',
    amount: '赏金金额 (ICP)',
    currentPool: '当前奖池',
    yourContribution: '您的贡献',
    newPool: '新奖池',
    insufficientBalance: '余额不足',
    insufficientBalanceWarning: '余额不足。请先充值您的钱包。',
    invalidAmount: '请输入有效金额',
    cancel: '取消',
    confirm: '增加赏金',
    adding: '添加中...',
    success: '赏金添加成功！',
    error: '添加赏金失败',
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
    rules: '任务规则和描述',
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
    title: '勇士信用评分',
    depositRate: '当前押金率',
    successfulQuests: '成功任务',
    totalEarned: '总收入',
    totalDeposited: '总押金',
    questsToMinimum: '个任务达到最低率 (2%)',
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
    statusPending: '待定',
    statusCompleted: '已完成',
    statusDisputed: '争议中',
    statusCancelled: '已取消',
  },
  wallet: {
    title: 'ICP 钱包',
    balance: '余额',
    depositAddress: '充值地址',
    depositInfo: '从交易所或其他钱包向此地址发送 ICP 以为您的账户充值',
    withdraw: '提现',
    history: '交易历史',
    withdrawICP: '提现 ICP',
    withdrawDescription: '将 ICP 转移到外部钱包或交易所',
    destinationAddress: '目标地址',
    destinationPlaceholder: '输入 ICP 地址或主体 ID',
    amount: '金额',
    availableBalance: '可用',
    withdrawalAmount: '提现金额',
    transactionFee: '交易费用',
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
    noTransactions: '还没有交易',
    typeDeposit: '充值',
    typeWithdrawal: '提现',
    typeTaskPayment: '任务奖励',
    typeTaskDeduction: '任务押金',
    typeBountyContribution: '赏金贡献',
    statusSuccess: '成功',
    statusPending: '待定',
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
    description: '警告：放弃此任务将导致严重处罚。',
    forfeitAmount: '没收押金',
    depositRateReset: '押金率重置',
    warning: '您的押金将被没收，押金率将重置为50%。此操作无法撤销。',
    typeConfirm: '输入 CONFIRM 以继续',
    typeConfirmHint: '输入"CONFIRM"（全大写）',
    cancel: '取消',
    confirm: '放弃任务',
    abandoning: '放弃中...',
  },
  dailyCheckIn: {
    title: '每日打卡',
    day: '第',
    description: '记录您今天的进度',
    firstDayNote: '这是您的第一次打卡！上传照片以跟踪您的进度。',
    progress: '进度',
    target: '目标',
    days: '天',
    statusUpdate: '状态更新',
    statusPlaceholder: '今天进展如何？分享您的进度...',
    photo: '照片',
    uploadPhoto: '上传照片',
    photoOptional: '可选',
    uploading: '上传中',
    submit: '提交打卡',
    submitting: '提交中...',
    requireContent: '请提供状态更新',
    submitSuccess: '打卡提交成功！',
    submitError: '提交打卡失败',
    fileTooLarge: '文件大小必须小于5MB',
  },
  visualComparison: {
    title: '视觉进度',
    day: '第',
    totalCheckIns: '总打卡次数',
    timeline: '时间线',
    autoGenerated: '自动生成的占位符',
  },
  disputeResolution: {
    title: '争议解决',
    subtitle: '社区驱动的争议解决',
    noDisputes: '没有活跃的争议',
    questTitle: '任务',
    publisher: '发布者',
    warrior: '勇士',
    publisherArgument: '发布者论点',
    warriorArgument: '勇士论点',
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
    yourArgument: '您的论点',
    argumentPlaceholder: '为您的申诉提供详细理由...',
    minCharacters: '最少100个字符',
    submit: '提交申诉',
    submitting: '提交中...',
    argumentTooShort: '论点必须至少100个字符',
    submitSuccess: '申诉提交成功！',
    submitError: '提交申诉失败',
    viewAppeal: '查看申诉',
    yourAppeal: '您的申诉',
    noAppeal: '还没有提交申诉',
  },
  introduction: {
    linkText: '如何运作？',
    title: '欢迎来到 Grit Bounty',
    subtitle: '将"假如"变为现实',
    coreMission: {
      title: '核心使命',
      content: 'Grit Bounty 是一个去中心化平台，通过财务承诺和社区支持帮助您将愿望转化为成就。设定挑战，锁定押金，并通过证明您的坚持来赚取奖励。',
    },
    useCases: {
      title: '使用案例',
      intro: 'Grit Bounty 支持各种个人发展目标：',
      lifestyle: '生活习惯',
      lifestyleExample: '连续100天早上5点起床，每天阅读30分钟',
      health: '健康与保健',
      healthExample: '戒烟，保持健康饮食，冥想练习',
      exercise: '健身目标',
      exerciseExample: '每天跑5公里，每周健身4次，瑜伽练习',
      social: '社交挑战',
      socialExample: '与50位专业人士建立联系，参加每周聚会',
      enterprise: '企业培训',
      enterpriseExample: '员工技能发展，团队建设挑战',
      more: '更多',
      moreExample: '任何需要持续每日努力和承诺的目标',
    },
    bountyMechanism: {
      title: '赏金机制',
      publishTitle: '发布任务',
      publishContent: '发布者创建带有初始奖励池的任务。赏金被锁定在托管中，直到任务完成。',
      crowdfundTitle: '众筹',
      crowdfundContent: '社区成员可以增加奖励池以增加激励并表示支持。',
      acceptTitle: '接受挑战',
      acceptContent: '勇士通过锁定押金（奖励的2-50%）接受任务。成功完成以赚取奖励并降低未来的押金率。',
      flexibleTitle: '灵活参与',
      flexibleContent: '任务可以同时支持多个勇士，创建一个问责社区。',
    },
    settlementRules: {
      title: '结算规则',
      successTitle: '成功完成',
      successContent: '完成所有打卡的勇士将收回押金并获得奖励。未来任务的押金率降低3%。',
      unclaimedTitle: '未领取的奖励',
      unclaimedContent: '如果30天内没有勇士接受，发布者可以取消并获得全额退款。',
      defaultTitle: '违约/放弃',
      defaultContent: '放弃任务的勇士将没收押金并重置为50%的押金率。',
      feesTitle: '平台费用',
      feesSuccessLabel: '成功',
      feesSuccessContent: '奖励的5%平台费用',
      feesDefaultLabel: '违约',
      feesDefaultContent: '没收押金的10%平台费用',
    },
    warriorCredit: {
      title: '勇士信用系统',
      intro: '通过持续成功建立信任并降低成本：',
      initialTitle: '初始率',
      initialContent: '新勇士从50%的押金率开始',
      rewardTitle: '成功奖励',
      rewardContent: '每次成功任务将押金率降低3%',
      capTitle: '最低率',
      capContent: '受信任的勇士的押金率可以低至2%',
      penaltyTitle: '放弃处罚',
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
    question: '堅持會讓你更強大，還是毫無意義？',
    subtext: '如果"假如"成為現實，你真的會更好嗎？',
    enter: '進入',
    subtitle: '將"假如"變為現實',
    tagline: '挑戰自己。證明你的毅力。賺取獎勵。',
    feature1Title: '設定挑戰',
    feature1Desc: '創建測試堅持和承諾的任務',
    feature2Title: '賺取獎勵',
    feature2Desc: '完成挑戰並賺取 ICP 代幣',
    feature3Title: '建立信任',
    feature3Desc: '每次成功任務都會降低你的押金率',
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
    setupDescription: '輸入您的名字開始您的旅程',
    namePlaceholder: '您的名字',
    save: '保存',
    saving: '保存中...',
  },
  nav: {
    bountyBoard: '賞金榜',
    launchMission: '發布任務',
    disputeResolution: '爭議解決',
    personalCenter: '個人中心',
  },
  bountyBoard: {
    title: '賞金榜',
    allQuests: '所有任務',
    noQuests: '暫無任務',
    hype: '熱度',
    contributors: '貢獻者',
    acceptSuccess: '任務接受成功！',
    acceptError: '接受任務失敗',
    yourQuest: '您的任務',
    addToPot: '增加獎池',
    addToPotDescription: '增加獎勵池以吸引更多勇士',
    currentPool: '當前獎池',
    yourContribution: '您的貢獻',
    newPool: '新獎池',
    contribute: '貢獻',
    contributionSuccess: '貢獻添加成功！',
    contributionError: '添加貢獻失敗',
    originalBounty: '原始賞金',
    additionalBounties: '追加賞金',
    viewContributors: '{count} 位貢獻者',
    warriors: '勇士',
  },
  addBounty: {
    title: '增加賞金',
    description: '增加獎勵池以吸引更多勇士',
    questTitle: '任務',
    yourBalance: '您的餘額',
    amount: '賞金金額 (ICP)',
    currentPool: '當前獎池',
    yourContribution: '您的貢獻',
    newPool: '新獎池',
    insufficientBalance: '餘額不足',
    insufficientBalanceWarning: '餘額不足。請先充值您的錢包。',
    invalidAmount: '請輸入有效金額',
    cancel: '取消',
    confirm: '增加賞金',
    adding: '添加中...',
    success: '賞金添加成功！',
    error: '添加賞金失敗',
  },
  difficulty: {
    easy: '簡單',
    medium: '中等',
    hard: '困難',
    extreme: '極難',
    impossible: '不可能',
  },
  deposit: {
    required: '需要押金',
    acceptAndPayDeposit: '接受並支付押金',
    confirmTitle: '確認押金',
    confirmDescription: '鎖定您的押金以接受此任務',
    questTitle: '任務',
    rewardPool: '獎勵池',
    yourDepositRate: '您的押金率',
    depositRequired: '需要押金',
    depositInfo: '您的押金將被鎖定直到任務完成。成功完成以賺取獎勵並降低您的押金率。',
    cancel: '取消',
    confirmAndPay: '確認並支付',
    processing: '處理中...',
    transferFailed: '轉賬失敗',
    totalRewardPool: '總獎勵池',
    warriorsNeeded: '需要勇士',
    perWarriorReward: '每位勇士獎勵',
  },
  publishConfirm: {
    confirmTitle: '確認任務發布',
    confirmDescription: '發布前請查看您的任務詳情。賞金金額將立即鎖定。',
    questTitle: '任務標題',
    questDescription: '描述',
    difficulty: '難度',
    participantCount: '需要參與者',
    rewardPool: '賞金金額',
    yourBalance: '您的餘額',
    lockInfo: '賞金金額將被鎖定在任務合約中，直到完成或取消。如果還沒有勇士接受，您可以取消並獲得全額退款。',
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
    description: '取消此任務並獲得鎖定賞金的全額退款。',
    questTitle: '任務',
    fullRefund: '全額退款',
    refundInfo: '由於還沒有勇士接受此任務，您將獲得全額退款，不扣除任何費用。任務將從賞金榜中移除。',
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
    rules: '任務規則和描述',
    rulesPlaceholder: '描述任務要求和規則...',
    rewardPool: '初始獎勵池 (ICP)',
    rewardHint: '最低 0.0001 ICP',
    difficulty: '難度等級',
    createQuest: '創建任務',
    creating: '創建中...',
    fillAllFields: '請填寫所有字段',
    invalidReward: '請輸入有效的獎勵金額',
    createSuccess: '任務創建成功！',
    createError: '創建任務失敗',
    titleRequired: '任務標題是必需的',
    descriptionTooShort: '描述必須至少20個字符',
    minCharacters: '最少字符數',
    participantCount: '需要勇士數量',
    participantCountPlaceholder: '1-100',
    participantCountHint: '多少勇士可以接受此任務',
    invalidParticipantCount: '參與者數量必須在1到100之間',
  },
  creditScore: {
    title: '勇士信用評分',
    depositRate: '當前押金率',
    successfulQuests: '成功任務',
    totalEarned: '總收入',
    totalDeposited: '總押金',
    questsToMinimum: '個任務達到最低率 (2%)',
    rateDecrease: '每次成功：-3%',
  },
  personalCenter: {
    title: '個人中心',
    subtitle: '跟蹤您的任務和進度',
    acceptedQuests: '已接受任務',
    postedBounties: '已發布賞金',
    noAcceptedQuests: '還沒有接受的任務',
    noPostedBounties: '還沒有發布的賞金',
    progress: '進度',
    status: '狀態',
    reward: '獎勵',
    lockedDeposit: '鎖定押金',
    rewardPool: '獎勵池',
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
    statusPending: '待定',
    statusCompleted: '已完成',
    statusDisputed: '爭議中',
    statusCancelled: '已取消',
  },
  wallet: {
    title: 'ICP 錢包',
    balance: '餘額',
    depositAddress: '充值地址',
    depositInfo: '從交易所或其他錢包向此地址發送 ICP 以為您的賬戶充值',
    withdraw: '提現',
    history: '交易歷史',
    withdrawICP: '提現 ICP',
    withdrawDescription: '將 ICP 轉移到外部錢包或交易所',
    destinationAddress: '目標地址',
    destinationPlaceholder: '輸入 ICP 地址或主體 ID',
    amount: '金額',
    availableBalance: '可用',
    withdrawalAmount: '提現金額',
    transactionFee: '交易費用',
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
    noTransactions: '還沒有交易',
    typeDeposit: '充值',
    typeWithdrawal: '提現',
    typeTaskPayment: '任務獎勵',
    typeTaskDeduction: '任務押金',
    typeBountyContribution: '賞金貢獻',
    statusSuccess: '成功',
    statusPending: '待定',
    statusFailed: '失敗',
    loadingBalance: '加載餘額中...',
    loadingAddress: '加載地址中...',
    addressUnavailable: '地址不可用',
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
    description: '警告：放棄此任務將導致嚴重處罰。',
    forfeitAmount: '沒收押金',
    depositRateReset: '押金率重置',
    warning: '您的押金將被沒收，押金率將重置為50%。此操作無法撤銷。',
    typeConfirm: '輸入 CONFIRM 以繼續',
    typeConfirmHint: '輸入"CONFIRM"（全大寫）',
    cancel: '取消',
    confirm: '放棄任務',
    abandoning: '放棄中...',
  },
  dailyCheckIn: {
    title: '每日打卡',
    day: '第',
    description: '記錄您今天的進度',
    firstDayNote: '這是您的第一次打卡！上傳照片以跟蹤您的進度。',
    progress: '進度',
    target: '目標',
    days: '天',
    statusUpdate: '狀態更新',
    statusPlaceholder: '今天進展如何？分享您的進度...',
    photo: '照片',
    uploadPhoto: '上傳照片',
    photoOptional: '可選',
    uploading: '上傳中',
    submit: '提交打卡',
    submitting: '提交中...',
    requireContent: '請提供狀態更新',
    submitSuccess: '打卡提交成功！',
    submitError: '提交打卡失敗',
    fileTooLarge: '文件大小必須小於5MB',
  },
  visualComparison: {
    title: '視覺進度',
    day: '第',
    totalCheckIns: '總打卡次數',
    timeline: '時間線',
    autoGenerated: '自動生成的佔位符',
  },
  disputeResolution: {
    title: '爭議解決',
    subtitle: '社區驅動的爭議解決',
    noDisputes: '沒有活躍的爭議',
    questTitle: '任務',
    publisher: '發布者',
    warrior: '勇士',
    publisherArgument: '發布者論點',
    warriorArgument: '勇士論點',
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
    yourArgument: '您的論點',
    argumentPlaceholder: '為您的申訴提供詳細理由...',
    minCharacters: '最少100個字符',
    submit: '提交申訴',
    submitting: '提交中...',
    argumentTooShort: '論點必須至少100個字符',
    submitSuccess: '申訴提交成功！',
    submitError: '提交申訴失敗',
    viewAppeal: '查看申訴',
    yourAppeal: '您的申訴',
    noAppeal: '還沒有提交申訴',
  },
  introduction: {
    linkText: '如何運作？',
    title: '歡迎來到 Grit Bounty',
    subtitle: '將"假如"變為現實',
    coreMission: {
      title: '核心使命',
      content: 'Grit Bounty 是一個去中心化平台，通過財務承諾和社區支持幫助您將願望轉化為成就。設定挑戰，鎖定押金，並通過證明您的堅持來賺取獎勵。',
    },
    useCases: {
      title: '使用案例',
      intro: 'Grit Bounty 支持各種個人發展目標：',
      lifestyle: '生活習慣',
      lifestyleExample: '連續100天早上5點起床，每天閱讀30分鐘',
      health: '健康與保健',
      healthExample: '戒煙，保持健康飲食，冥想練習',
      exercise: '健身目標',
      exerciseExample: '每天跑5公里，每週健身4次，瑜伽練習',
      social: '社交挑戰',
      socialExample: '與50位專業人士建立聯繫，參加每週聚會',
      enterprise: '企業培訓',
      enterpriseExample: '員工技能發展，團隊建設挑戰',
      more: '更多',
      moreExample: '任何需要持續每日努力和承諾的目標',
    },
    bountyMechanism: {
      title: '賞金機制',
      publishTitle: '發布任務',
      publishContent: '發布者創建帶有初始獎勵池的任務。賞金被鎖定在託管中，直到任務完成。',
      crowdfundTitle: '眾籌',
      crowdfundContent: '社區成員可以增加獎勵池以增加激勵並表示支持。',
      acceptTitle: '接受挑戰',
      acceptContent: '勇士通過鎖定押金（獎勵的2-50%）接受任務。成功完成以賺取獎勵並降低未來的押金率。',
      flexibleTitle: '靈活參與',
      flexibleContent: '任務可以同時支持多個勇士，創建一個問責社區。',
    },
    settlementRules: {
      title: '結算規則',
      successTitle: '成功完成',
      successContent: '完成所有打卡的勇士將收回押金並獲得獎勵。未來任務的押金率降低3%。',
      unclaimedTitle: '未領取的獎勵',
      unclaimedContent: '如果30天內沒有勇士接受，發布者可以取消並獲得全額退款。',
      defaultTitle: '違約/放棄',
      defaultContent: '放棄任務的勇士將沒收押金並重置為50%的押金率。',
      feesTitle: '平台費用',
      feesSuccessLabel: '成功',
      feesSuccessContent: '獎勵的5%平台費用',
      feesDefaultLabel: '違約',
      feesDefaultContent: '沒收押金的10%平台費用',
    },
    warriorCredit: {
      title: '勇士信用系統',
      intro: '通過持續成功建立信任並降低成本：',
      initialTitle: '初始率',
      initialContent: '新勇士從50%的押金率開始',
      rewardTitle: '成功獎勵',
      rewardContent: '每次成功任務將押金率降低3%',
      capTitle: '最低率',
      capContent: '受信任的勇士的押金率可以低至2%',
      penaltyTitle: '放棄處罰',
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
