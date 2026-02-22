import { Language } from '../types';

type TranslationKeys = {
  splash: {
    title: string;
    subtitle: string;
    enter: string;
  };
  tabs: {
    bountyBoard: string;
    launchMission: string;
    personalCenter: string;
    disputeResolution: string;
  };
  bountyBoard: {
    title: string;
    noQuests: string;
    hype: string;
    acceptChallenge: string;
    accepting: string;
    acceptSuccess: string;
    acceptError: string;
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
    createSuccess: string;
    createError: string;
    fillAllFields: string;
    invalidReward: string;
  };
  personalCenter: {
    title: string;
    subtitle: string;
    acceptedQuests: string;
    postedBounties: string;
    progress: string;
    reward: string;
    noAcceptedQuests: string;
    noPostedBounties: string;
  };
  difficulty: {
    easy: string;
    medium: string;
    hard: string;
    extreme: string;
    impossible: string;
  };
  creditScore: {
    title: string;
    depositRate: string;
    successfulQuests: string;
    progressToMinimum: string;
    questsRemaining: string;
    minimumReached: string;
    totalEarned: string;
    totalDeposited: string;
    highDepositWarning: string;
  };
  deposit: {
    confirmTitle: string;
    confirmDescription: string;
    questTitle: string;
    rewardPool: string;
    yourDepositRate: string;
    depositRequired: string;
    required: string;
    depositInfo: string;
    cancel: string;
    processing: string;
    confirmAndPay: string;
    acceptAndPayDeposit: string;
    transferFailed: string;
  };
  dispute: {
    title: string;
    subtitle: string;
    noDisputes: string;
    noDisputesDescription: string;
    firstAppeal: string;
    secondAppeal: string;
    thirdAppeal: string;
    timeRemaining: string;
    publisherArgument: string;
    warriorArgument: string;
    currentVotes: string;
    weightedVoting: string;
    supportPublisher: string;
    supportWarrior: string;
    votingInfo: string;
    votePublisher: string;
    voteWarrior: string;
  };
  appeal: {
    title: string;
    firstTier: string;
    secondTier: string;
    thirdTier: string;
    yourArgument: string;
    argumentPlaceholder: string;
    charactersMinimum: string;
    submissionInfo: string;
    submitAppeal: string;
    submitting: string;
    submitSuccess: string;
    submitError: string;
    submitted: string;
    submittedDescription: string;
    viewerOnly: string;
    submittedAppeals: string;
    publisher: string;
    warrior: string;
    noSubmissionsYet: string;
  };
};

export const translations: Record<Language, TranslationKeys> = {
  [Language.English]: {
    splash: {
      title: 'GRIT BOUNTY',
      subtitle: 'Will persistence make you stronger, or is it just meaningless? If "What If" became reality, would you truly be superior?',
      enter: 'ENTER',
    },
    tabs: {
      bountyBoard: 'Bounty Board',
      launchMission: 'Launch Mission',
      personalCenter: 'Personal Center',
      disputeResolution: 'Dispute Resolution',
    },
    bountyBoard: {
      title: 'Active Bounties',
      noQuests: 'No active quests for this difficulty level',
      hype: 'Hype',
      acceptChallenge: 'Accept Challenge',
      accepting: 'Accepting...',
      acceptSuccess: 'Quest accepted successfully!',
      acceptError: 'Failed to accept quest',
    },
    launchMission: {
      title: 'Launch New Mission',
      subtitle: 'Create a new quest and set the challenge',
      questTitle: 'Quest Title',
      titlePlaceholder: 'Enter a compelling quest title...',
      rules: 'Quest Rules & Description',
      rulesPlaceholder: 'Describe the quest objectives, rules, and success criteria...',
      rewardPool: 'Initial Reward Pool (ICP)',
      rewardHint: 'Amount in ICP tokens',
      difficulty: 'Difficulty Level',
      createQuest: 'Create Quest',
      creating: 'Creating...',
      createSuccess: 'Quest created successfully!',
      createError: 'Failed to create quest',
      fillAllFields: 'Please fill in all fields',
      invalidReward: 'Please enter a valid reward amount',
    },
    personalCenter: {
      title: 'Personal Center',
      subtitle: 'Track your quests and progress',
      acceptedQuests: 'My Accepted Quests',
      postedBounties: 'My Posted Bounties',
      progress: 'Progress',
      reward: 'Reward',
      noAcceptedQuests: "You haven't accepted any quests yet",
      noPostedBounties: "You haven't posted any bounties yet",
    },
    difficulty: {
      easy: 'Easy',
      medium: 'Medium',
      hard: 'Hard',
      extreme: 'Extreme',
      impossible: 'Impossible',
    },
    creditScore: {
      title: 'Credit Score & Deposit Rate',
      depositRate: 'Current Deposit Rate',
      successfulQuests: 'Successful Quests',
      progressToMinimum: 'Progress to Minimum',
      questsRemaining: 'quests remaining',
      minimumReached: 'Minimum reached!',
      totalEarned: 'Total Earned',
      totalDeposited: 'Total Deposited',
      highDepositWarning: 'Complete more quests to reduce your deposit rate and unlock better opportunities!',
    },
    deposit: {
      confirmTitle: 'Confirm Deposit Payment',
      confirmDescription: 'Review the deposit details before accepting this quest',
      questTitle: 'Quest Title',
      rewardPool: 'Reward Pool',
      yourDepositRate: 'Your Deposit Rate',
      depositRequired: 'Deposit Required',
      required: 'Deposit Required',
      depositInfo: 'Your deposit will be locked until quest completion. Upon successful completion, you will receive the full bounty pool plus your deposit back.',
      cancel: 'Cancel',
      processing: 'Processing...',
      confirmAndPay: 'Confirm & Pay Deposit',
      acceptAndPayDeposit: 'Accept & Pay Deposit',
      transferFailed: 'Deposit transfer failed',
    },
    dispute: {
      title: 'Dispute Resolution',
      subtitle: 'Community-driven justice for quest disputes',
      noDisputes: 'No Active Disputes',
      noDisputesDescription: 'All quests are proceeding smoothly. Check back if any disputes arise.',
      firstAppeal: 'First Appeal',
      secondAppeal: 'Second Appeal',
      thirdAppeal: 'Final Appeal',
      timeRemaining: 'Time Remaining',
      publisherArgument: "Publisher's Argument",
      warriorArgument: "Warrior's Argument",
      currentVotes: 'Current Votes',
      weightedVoting: 'Weighted voting: Publisher 30%, Admin 15%, Community 55%',
      supportPublisher: 'Support Publisher',
      supportWarrior: 'Support Warrior',
      votingInfo: 'Your vote is weighted based on your role. Voting closes when either side reaches >50% total weight.',
      votePublisher: 'Vote for Publisher',
      voteWarrior: 'Vote for Warrior',
    },
    appeal: {
      title: 'Submit Appeal',
      firstTier: 'First Appeal',
      secondTier: 'Second Appeal',
      thirdTier: 'Final Appeal',
      yourArgument: 'Your Argument',
      argumentPlaceholder: 'Provide detailed reasoning for your position. Include evidence, context, and why you believe your side is correct...',
      charactersMinimum: 'characters minimum',
      submissionInfo: 'Your appeal will be visible to all voters. Be clear, factual, and respectful.',
      submitAppeal: 'Submit Appeal',
      submitting: 'Submitting...',
      submitSuccess: 'Appeal submitted successfully!',
      submitError: 'Failed to submit appeal',
      submitted: 'Appeal Submitted',
      submittedDescription: 'Your appeal has been recorded and is now visible to voters.',
      viewerOnly: 'You can only view appeals as a community member',
      submittedAppeals: 'Submitted Appeals',
      publisher: 'Publisher',
      warrior: 'Warrior',
      noSubmissionsYet: 'No appeals submitted yet',
    },
  },
  [Language.SimplifiedChinese]: {
    splash: {
      title: '毅力赏金',
      subtitle: '坚持会让你更强大，还是毫无意义？如果"假如"成为现实，你真的会更优秀吗？',
      enter: '进入',
    },
    tabs: {
      bountyBoard: '赏金榜',
      launchMission: '发布任务',
      personalCenter: '个人中心',
      disputeResolution: '争议解决',
    },
    bountyBoard: {
      title: '活跃赏金',
      noQuests: '此难度级别暂无活跃任务',
      hype: '热度',
      acceptChallenge: '接受挑战',
      accepting: '接受中...',
      acceptSuccess: '任务接受成功！',
      acceptError: '接受任务失败',
    },
    launchMission: {
      title: '发布新任务',
      subtitle: '创建新任务并设置挑战',
      questTitle: '任务标题',
      titlePlaceholder: '输入引人注目的任务标题...',
      rules: '任务规则与描述',
      rulesPlaceholder: '描述任务目标、规则和成功标准...',
      rewardPool: '初始奖池 (ICP)',
      rewardHint: 'ICP 代币数量',
      difficulty: '难度等级',
      createQuest: '创建任务',
      creating: '创建中...',
      createSuccess: '任务创建成功！',
      createError: '创建任务失败',
      fillAllFields: '请填写所有字段',
      invalidReward: '请输入有效的奖励金额',
    },
    personalCenter: {
      title: '个人中心',
      subtitle: '追踪你的任务和进度',
      acceptedQuests: '我接受的任务',
      postedBounties: '我发布的赏金',
      progress: '进度',
      reward: '奖励',
      noAcceptedQuests: '你还没有接受任何任务',
      noPostedBounties: '你还没有发布任何赏金',
    },
    difficulty: {
      easy: '简单',
      medium: '中等',
      hard: '困难',
      extreme: '极限',
      impossible: '不可能',
    },
    creditScore: {
      title: '信用评分与押金率',
      depositRate: '当前押金率',
      successfulQuests: '成功任务',
      progressToMinimum: '到最低押金的进度',
      questsRemaining: '个任务剩余',
      minimumReached: '已达到最低押金！',
      totalEarned: '总收入',
      totalDeposited: '总押金',
      highDepositWarning: '完成更多任务以降低押金率，解锁更好的机会！',
    },
    deposit: {
      confirmTitle: '确认押金支付',
      confirmDescription: '在接受此任务前查看押金详情',
      questTitle: '任务标题',
      rewardPool: '奖池',
      yourDepositRate: '你的押金率',
      depositRequired: '所需押金',
      required: '所需押金',
      depositInfo: '你的押金将被锁定直到任务完成。成功完成后，你将获得全部奖池加上押金返还。',
      cancel: '取消',
      processing: '处理中...',
      confirmAndPay: '确认并支付押金',
      acceptAndPayDeposit: '接受并支付押金',
      transferFailed: '押金转账失败',
    },
    dispute: {
      title: '争议解决',
      subtitle: '社区驱动的任务争议公正裁决',
      noDisputes: '无活跃争议',
      noDisputesDescription: '所有任务进展顺利。如有争议产生请回来查看。',
      firstAppeal: '一次申诉',
      secondAppeal: '二次申诉',
      thirdAppeal: '最终申诉',
      timeRemaining: '剩余时间',
      publisherArgument: '发布者论据',
      warriorArgument: '勇士论据',
      currentVotes: '当前投票',
      weightedVoting: '加权投票：发布者30%，管理员15%，社区55%',
      supportPublisher: '支持发布者',
      supportWarrior: '支持勇士',
      votingInfo: '你的投票根据角色加权。当任一方达到>50%总权重时投票结束。',
      votePublisher: '投票给发布者',
      voteWarrior: '投票给勇士',
    },
    appeal: {
      title: '提交申诉',
      firstTier: '一次申诉',
      secondTier: '二次申诉',
      thirdTier: '最终申诉',
      yourArgument: '你的论据',
      argumentPlaceholder: '提供详细的立场理由。包括证据、背景以及为什么你认为你的立场是正确的...',
      charactersMinimum: '字符最少',
      submissionInfo: '你的申诉将对所有投票者可见。请清晰、真实、尊重。',
      submitAppeal: '提交申诉',
      submitting: '提交中...',
      submitSuccess: '申诉提交成功！',
      submitError: '提交申诉失败',
      submitted: '申诉已提交',
      submittedDescription: '你的申诉已记录并对投票者可见。',
      viewerOnly: '你只能作为社区成员查看申诉',
      submittedAppeals: '已提交的申诉',
      publisher: '发布者',
      warrior: '勇士',
      noSubmissionsYet: '尚未提交申诉',
    },
  },
  [Language.Spanish]: {
    splash: {
      title: 'RECOMPENSA DE DETERMINACIÓN',
      subtitle: '¿La persistencia te hará más fuerte o es simplemente sin sentido? Si "Y si" se hiciera realidad, ¿serías realmente superior?',
      enter: 'ENTRAR',
    },
    tabs: {
      bountyBoard: 'Tablero de Recompensas',
      launchMission: 'Lanzar Misión',
      personalCenter: 'Centro Personal',
      disputeResolution: 'Resolución de Disputas',
    },
    bountyBoard: {
      title: 'Recompensas Activas',
      noQuests: 'No hay misiones activas para este nivel de dificultad',
      hype: 'Expectación',
      acceptChallenge: 'Aceptar Desafío',
      accepting: 'Aceptando...',
      acceptSuccess: '¡Misión aceptada con éxito!',
      acceptError: 'Error al aceptar la misión',
    },
    launchMission: {
      title: 'Lanzar Nueva Misión',
      subtitle: 'Crea una nueva misión y establece el desafío',
      questTitle: 'Título de la Misión',
      titlePlaceholder: 'Ingresa un título atractivo para la misión...',
      rules: 'Reglas y Descripción de la Misión',
      rulesPlaceholder: 'Describe los objetivos, reglas y criterios de éxito de la misión...',
      rewardPool: 'Fondo de Recompensa Inicial (ICP)',
      rewardHint: 'Cantidad en tokens ICP',
      difficulty: 'Nivel de Dificultad',
      createQuest: 'Crear Misión',
      creating: 'Creando...',
      createSuccess: '¡Misión creada con éxito!',
      createError: 'Error al crear la misión',
      fillAllFields: 'Por favor completa todos los campos',
      invalidReward: 'Por favor ingresa una cantidad de recompensa válida',
    },
    personalCenter: {
      title: 'Centro Personal',
      subtitle: 'Rastrea tus misiones y progreso',
      acceptedQuests: 'Mis Misiones Aceptadas',
      postedBounties: 'Mis Recompensas Publicadas',
      progress: 'Progreso',
      reward: 'Recompensa',
      noAcceptedQuests: 'Aún no has aceptado ninguna misión',
      noPostedBounties: 'Aún no has publicado ninguna recompensa',
    },
    difficulty: {
      easy: 'Fácil',
      medium: 'Medio',
      hard: 'Difícil',
      extreme: 'Extremo',
      impossible: 'Imposible',
    },
    creditScore: {
      title: 'Puntuación de Crédito y Tasa de Depósito',
      depositRate: 'Tasa de Depósito Actual',
      successfulQuests: 'Misiones Exitosas',
      progressToMinimum: 'Progreso al Mínimo',
      questsRemaining: 'misiones restantes',
      minimumReached: '¡Mínimo alcanzado!',
      totalEarned: 'Total Ganado',
      totalDeposited: 'Total Depositado',
      highDepositWarning: '¡Completa más misiones para reducir tu tasa de depósito y desbloquear mejores oportunidades!',
    },
    deposit: {
      confirmTitle: 'Confirmar Pago de Depósito',
      confirmDescription: 'Revisa los detalles del depósito antes de aceptar esta misión',
      questTitle: 'Título de la Misión',
      rewardPool: 'Fondo de Recompensa',
      yourDepositRate: 'Tu Tasa de Depósito',
      depositRequired: 'Depósito Requerido',
      required: 'Depósito Requerido',
      depositInfo: 'Tu depósito estará bloqueado hasta la finalización de la misión. Al completarla con éxito, recibirás el fondo completo más tu depósito de vuelta.',
      cancel: 'Cancelar',
      processing: 'Procesando...',
      confirmAndPay: 'Confirmar y Pagar Depósito',
      acceptAndPayDeposit: 'Aceptar y Pagar Depósito',
      transferFailed: 'Transferencia de depósito fallida',
    },
    dispute: {
      title: 'Resolución de Disputas',
      subtitle: 'Justicia impulsada por la comunidad para disputas de misiones',
      noDisputes: 'Sin Disputas Activas',
      noDisputesDescription: 'Todas las misiones están progresando sin problemas. Vuelve si surge alguna disputa.',
      firstAppeal: 'Primera Apelación',
      secondAppeal: 'Segunda Apelación',
      thirdAppeal: 'Apelación Final',
      timeRemaining: 'Tiempo Restante',
      publisherArgument: 'Argumento del Publicador',
      warriorArgument: 'Argumento del Guerrero',
      currentVotes: 'Votos Actuales',
      weightedVoting: 'Votación ponderada: Publicador 30%, Admin 15%, Comunidad 55%',
      supportPublisher: 'Apoyar al Publicador',
      supportWarrior: 'Apoyar al Guerrero',
      votingInfo: 'Tu voto está ponderado según tu rol. La votación cierra cuando cualquier lado alcanza >50% del peso total.',
      votePublisher: 'Votar por el Publicador',
      voteWarrior: 'Votar por el Guerrero',
    },
    appeal: {
      title: 'Enviar Apelación',
      firstTier: 'Primera Apelación',
      secondTier: 'Segunda Apelación',
      thirdTier: 'Apelación Final',
      yourArgument: 'Tu Argumento',
      argumentPlaceholder: 'Proporciona un razonamiento detallado de tu posición. Incluye evidencia, contexto y por qué crees que tu lado es correcto...',
      charactersMinimum: 'caracteres mínimo',
      submissionInfo: 'Tu apelación será visible para todos los votantes. Sé claro, factual y respetuoso.',
      submitAppeal: 'Enviar Apelación',
      submitting: 'Enviando...',
      submitSuccess: '¡Apelación enviada con éxito!',
      submitError: 'Error al enviar la apelación',
      submitted: 'Apelación Enviada',
      submittedDescription: 'Tu apelación ha sido registrada y ahora es visible para los votantes.',
      viewerOnly: 'Solo puedes ver apelaciones como miembro de la comunidad',
      submittedAppeals: 'Apelaciones Enviadas',
      publisher: 'Publicador',
      warrior: 'Guerrero',
      noSubmissionsYet: 'Aún no se han enviado apelaciones',
    },
  },
  [Language.French]: {
    splash: {
      title: 'PRIME DE DÉTERMINATION',
      subtitle: 'La persévérance vous rendra-t-elle plus fort, ou est-ce simplement sans signification ? Si "Et si" devenait réalité, seriez-vous vraiment supérieur ?',
      enter: 'ENTRER',
    },
    tabs: {
      bountyBoard: 'Tableau des Primes',
      launchMission: 'Lancer une Mission',
      personalCenter: 'Centre Personnel',
      disputeResolution: 'Résolution des Litiges',
    },
    bountyBoard: {
      title: 'Primes Actives',
      noQuests: 'Aucune quête active pour ce niveau de difficulté',
      hype: 'Engouement',
      acceptChallenge: 'Accepter le Défi',
      accepting: 'Acceptation...',
      acceptSuccess: 'Quête acceptée avec succès !',
      acceptError: 'Échec de l\'acceptation de la quête',
    },
    launchMission: {
      title: 'Lancer une Nouvelle Mission',
      subtitle: 'Créez une nouvelle quête et définissez le défi',
      questTitle: 'Titre de la Quête',
      titlePlaceholder: 'Entrez un titre de quête convaincant...',
      rules: 'Règles et Description de la Quête',
      rulesPlaceholder: 'Décrivez les objectifs, les règles et les critères de réussite de la quête...',
      rewardPool: 'Cagnotte de Récompense Initiale (ICP)',
      rewardHint: 'Montant en jetons ICP',
      difficulty: 'Niveau de Difficulté',
      createQuest: 'Créer une Quête',
      creating: 'Création...',
      createSuccess: 'Quête créée avec succès !',
      createError: 'Échec de la création de la quête',
      fillAllFields: 'Veuillez remplir tous les champs',
      invalidReward: 'Veuillez entrer un montant de récompense valide',
    },
    personalCenter: {
      title: 'Centre Personnel',
      subtitle: 'Suivez vos quêtes et votre progression',
      acceptedQuests: 'Mes Quêtes Acceptées',
      postedBounties: 'Mes Primes Publiées',
      progress: 'Progression',
      reward: 'Récompense',
      noAcceptedQuests: 'Vous n\'avez accepté aucune quête pour le moment',
      noPostedBounties: 'Vous n\'avez publié aucune prime pour le moment',
    },
    difficulty: {
      easy: 'Facile',
      medium: 'Moyen',
      hard: 'Difficile',
      extreme: 'Extrême',
      impossible: 'Impossible',
    },
    creditScore: {
      title: 'Score de Crédit et Taux de Dépôt',
      depositRate: 'Taux de Dépôt Actuel',
      successfulQuests: 'Quêtes Réussies',
      progressToMinimum: 'Progression vers le Minimum',
      questsRemaining: 'quêtes restantes',
      minimumReached: 'Minimum atteint !',
      totalEarned: 'Total Gagné',
      totalDeposited: 'Total Déposé',
      highDepositWarning: 'Complétez plus de quêtes pour réduire votre taux de dépôt et débloquer de meilleures opportunités !',
    },
    deposit: {
      confirmTitle: 'Confirmer le Paiement du Dépôt',
      confirmDescription: 'Examinez les détails du dépôt avant d\'accepter cette quête',
      questTitle: 'Titre de la Quête',
      rewardPool: 'Cagnotte de Récompense',
      yourDepositRate: 'Votre Taux de Dépôt',
      depositRequired: 'Dépôt Requis',
      required: 'Dépôt Requis',
      depositInfo: 'Votre dépôt sera bloqué jusqu\'à l\'achèvement de la quête. En cas de réussite, vous recevrez la cagnotte complète plus votre dépôt.',
      cancel: 'Annuler',
      processing: 'Traitement...',
      confirmAndPay: 'Confirmer et Payer le Dépôt',
      acceptAndPayDeposit: 'Accepter et Payer le Dépôt',
      transferFailed: 'Échec du transfert du dépôt',
    },
    dispute: {
      title: 'Résolution des Litiges',
      subtitle: 'Justice communautaire pour les litiges de quêtes',
      noDisputes: 'Aucun Litige Actif',
      noDisputesDescription: 'Toutes les quêtes se déroulent sans problème. Revenez si des litiges surviennent.',
      firstAppeal: 'Premier Appel',
      secondAppeal: 'Deuxième Appel',
      thirdAppeal: 'Appel Final',
      timeRemaining: 'Temps Restant',
      publisherArgument: 'Argument de l\'Éditeur',
      warriorArgument: 'Argument du Guerrier',
      currentVotes: 'Votes Actuels',
      weightedVoting: 'Vote pondéré : Éditeur 30%, Admin 15%, Communauté 55%',
      supportPublisher: 'Soutenir l\'Éditeur',
      supportWarrior: 'Soutenir le Guerrier',
      votingInfo: 'Votre vote est pondéré en fonction de votre rôle. Le vote se termine lorsqu\'un côté atteint >50% du poids total.',
      votePublisher: 'Voter pour l\'Éditeur',
      voteWarrior: 'Voter pour le Guerrier',
    },
    appeal: {
      title: 'Soumettre un Appel',
      firstTier: 'Premier Appel',
      secondTier: 'Deuxième Appel',
      thirdTier: 'Appel Final',
      yourArgument: 'Votre Argument',
      argumentPlaceholder: 'Fournissez un raisonnement détaillé pour votre position. Incluez des preuves, du contexte et pourquoi vous pensez que votre côté est correct...',
      charactersMinimum: 'caractères minimum',
      submissionInfo: 'Votre appel sera visible par tous les votants. Soyez clair, factuel et respectueux.',
      submitAppeal: 'Soumettre l\'Appel',
      submitting: 'Soumission...',
      submitSuccess: 'Appel soumis avec succès !',
      submitError: 'Échec de la soumission de l\'appel',
      submitted: 'Appel Soumis',
      submittedDescription: 'Votre appel a été enregistré et est maintenant visible par les votants.',
      viewerOnly: 'Vous ne pouvez que voir les appels en tant que membre de la communauté',
      submittedAppeals: 'Appels Soumis',
      publisher: 'Éditeur',
      warrior: 'Guerrier',
      noSubmissionsYet: 'Aucun appel soumis pour le moment',
    },
  },
  [Language.Japanese]: {
    splash: {
      title: 'グリット・バウンティ',
      subtitle: '粘り強さはあなたを強くするのか、それとも無意味なのか？「もしも」が現実になったら、あなたは本当に優れているのか？',
      enter: '入る',
    },
    tabs: {
      bountyBoard: '賞金ボード',
      launchMission: 'ミッション開始',
      personalCenter: 'パーソナルセンター',
      disputeResolution: '紛争解決',
    },
    bountyBoard: {
      title: 'アクティブな賞金',
      noQuests: 'この難易度レベルのアクティブなクエストはありません',
      hype: '注目度',
      acceptChallenge: 'チャレンジを受ける',
      accepting: '受付中...',
      acceptSuccess: 'クエストを受け付けました！',
      acceptError: 'クエストの受付に失敗しました',
    },
    launchMission: {
      title: '新しいミッションを開始',
      subtitle: '新しいクエストを作成してチャレンジを設定',
      questTitle: 'クエストタイトル',
      titlePlaceholder: '魅力的なクエストタイトルを入力...',
      rules: 'クエストルールと説明',
      rulesPlaceholder: 'クエストの目標、ルール、成功基準を説明...',
      rewardPool: '初期報酬プール (ICP)',
      rewardHint: 'ICPトークンの量',
      difficulty: '難易度レベル',
      createQuest: 'クエストを作成',
      creating: '作成中...',
      createSuccess: 'クエストが作成されました！',
      createError: 'クエストの作成に失敗しました',
      fillAllFields: 'すべてのフィールドを入力してください',
      invalidReward: '有効な報酬額を入力してください',
    },
    personalCenter: {
      title: 'パーソナルセンター',
      subtitle: 'クエストと進捗を追跡',
      acceptedQuests: '受け付けたクエスト',
      postedBounties: '投稿した賞金',
      progress: '進捗',
      reward: '報酬',
      noAcceptedQuests: 'まだクエストを受け付けていません',
      noPostedBounties: 'まだ賞金を投稿していません',
    },
    difficulty: {
      easy: '簡単',
      medium: '中級',
      hard: '難しい',
      extreme: '極限',
      impossible: '不可能',
    },
    creditScore: {
      title: 'クレジットスコアと預金率',
      depositRate: '現在の預金率',
      successfulQuests: '成功したクエスト',
      progressToMinimum: '最小値への進捗',
      questsRemaining: 'クエスト残り',
      minimumReached: '最小値に到達！',
      totalEarned: '総獲得額',
      totalDeposited: '総預金額',
      highDepositWarning: 'より多くのクエストを完了して預金率を下げ、より良い機会を解放しましょう！',
    },
    deposit: {
      confirmTitle: '預金支払いの確認',
      confirmDescription: 'このクエストを受け付ける前に預金の詳細を確認',
      questTitle: 'クエストタイトル',
      rewardPool: '報酬プール',
      yourDepositRate: 'あなたの預金率',
      depositRequired: '必要な預金',
      required: '必要な預金',
      depositInfo: 'あなたの預金はクエスト完了までロックされます。成功すると、全額の報酬プールと預金が返還されます。',
      cancel: 'キャンセル',
      processing: '処理中...',
      confirmAndPay: '確認して預金を支払う',
      acceptAndPayDeposit: '受け付けて預金を支払う',
      transferFailed: '預金の転送に失敗しました',
    },
    dispute: {
      title: '紛争解決',
      subtitle: 'クエスト紛争のためのコミュニティ主導の正義',
      noDisputes: 'アクティブな紛争なし',
      noDisputesDescription: 'すべてのクエストが順調に進んでいます。紛争が発生した場合は戻ってきてください。',
      firstAppeal: '第一審',
      secondAppeal: '第二審',
      thirdAppeal: '最終審',
      timeRemaining: '残り時間',
      publisherArgument: '発行者の主張',
      warriorArgument: '戦士の主張',
      currentVotes: '現在の投票',
      weightedVoting: '加重投票：発行者30%、管理者15%、コミュニティ55%',
      supportPublisher: '発行者を支持',
      supportWarrior: '戦士を支持',
      votingInfo: 'あなたの投票は役割に基づいて加重されます。いずれかの側が総重量の>50%に達すると投票が終了します。',
      votePublisher: '発行者に投票',
      voteWarrior: '戦士に投票',
    },
    appeal: {
      title: '上訴を提出',
      firstTier: '第一審',
      secondTier: '第二審',
      thirdTier: '最終審',
      yourArgument: 'あなたの主張',
      argumentPlaceholder: 'あなたの立場の詳細な理由を提供してください。証拠、背景、そしてなぜあなたの側が正しいと信じるかを含めてください...',
      charactersMinimum: '文字最小',
      submissionInfo: 'あなたの上訴はすべての投票者に表示されます。明確で、事実に基づき、敬意を持ってください。',
      submitAppeal: '上訴を提出',
      submitting: '提出中...',
      submitSuccess: '上訴が提出されました！',
      submitError: '上訴の提出に失敗しました',
      submitted: '上訴が提出されました',
      submittedDescription: 'あなたの上訴が記録され、投票者に表示されています。',
      viewerOnly: 'コミュニティメンバーとして上訴を表示することしかできません',
      submittedAppeals: '提出された上訴',
      publisher: '発行者',
      warrior: '戦士',
      noSubmissionsYet: 'まだ上訴が提出されていません',
    },
  },
  [Language.Korean]: {
    splash: {
      title: '그릿 바운티',
      subtitle: '끈기가 당신을 더 강하게 만들까요, 아니면 무의미할까요? "만약"이 현실이 된다면, 당신은 정말 우월할까요?',
      enter: '입장',
    },
    tabs: {
      bountyBoard: '현상금 게시판',
      launchMission: '미션 시작',
      personalCenter: '개인 센터',
      disputeResolution: '분쟁 해결',
    },
    bountyBoard: {
      title: '활성 현상금',
      noQuests: '이 난이도 레벨에 활성 퀘스트가 없습니다',
      hype: '관심도',
      acceptChallenge: '도전 수락',
      accepting: '수락 중...',
      acceptSuccess: '퀘스트가 성공적으로 수락되었습니다!',
      acceptError: '퀘스트 수락 실패',
    },
    launchMission: {
      title: '새 미션 시작',
      subtitle: '새 퀘스트를 만들고 도전을 설정하세요',
      questTitle: '퀘스트 제목',
      titlePlaceholder: '매력적인 퀘스트 제목을 입력하세요...',
      rules: '퀘스트 규칙 및 설명',
      rulesPlaceholder: '퀘스트 목표, 규칙 및 성공 기준을 설명하세요...',
      rewardPool: '초기 보상 풀 (ICP)',
      rewardHint: 'ICP 토큰 양',
      difficulty: '난이도 레벨',
      createQuest: '퀘스트 생성',
      creating: '생성 중...',
      createSuccess: '퀘스트가 성공적으로 생성되었습니다!',
      createError: '퀘스트 생성 실패',
      fillAllFields: '모든 필드를 입력하세요',
      invalidReward: '유효한 보상 금액을 입력하세요',
    },
    personalCenter: {
      title: '개인 센터',
      subtitle: '퀘스트와 진행 상황 추적',
      acceptedQuests: '수락한 퀘스트',
      postedBounties: '게시한 현상금',
      progress: '진행',
      reward: '보상',
      noAcceptedQuests: '아직 퀘스트를 수락하지 않았습니다',
      noPostedBounties: '아직 현상금을 게시하지 않았습니다',
    },
    difficulty: {
      easy: '쉬움',
      medium: '중간',
      hard: '어려움',
      extreme: '극한',
      impossible: '불가능',
    },
    creditScore: {
      title: '신용 점수 및 보증금 비율',
      depositRate: '현재 보증금 비율',
      successfulQuests: '성공한 퀘스트',
      progressToMinimum: '최소값까지의 진행',
      questsRemaining: '퀘스트 남음',
      minimumReached: '최소값 도달!',
      totalEarned: '총 수익',
      totalDeposited: '총 보증금',
      highDepositWarning: '더 많은 퀘스트를 완료하여 보증금 비율을 낮추고 더 나은 기회를 잠금 해제하세요!',
    },
    deposit: {
      confirmTitle: '보증금 지불 확인',
      confirmDescription: '이 퀘스트를 수락하기 전에 보증금 세부 정보를 검토하세요',
      questTitle: '퀘스트 제목',
      rewardPool: '보상 풀',
      yourDepositRate: '귀하의 보증금 비율',
      depositRequired: '필요한 보증금',
      required: '필요한 보증금',
      depositInfo: '귀하의 보증금은 퀘스트 완료까지 잠깁니다. 성공적으로 완료하면 전체 보상 풀과 보증금을 돌려받습니다.',
      cancel: '취소',
      processing: '처리 중...',
      confirmAndPay: '확인 및 보증금 지불',
      acceptAndPayDeposit: '수락 및 보증금 지불',
      transferFailed: '보증금 전송 실패',
    },
    dispute: {
      title: '분쟁 해결',
      subtitle: '퀘스트 분쟁을 위한 커뮤니티 주도 정의',
      noDisputes: '활성 분쟁 없음',
      noDisputesDescription: '모든 퀘스트가 순조롭게 진행되고 있습니다. 분쟁이 발생하면 다시 확인하세요.',
      firstAppeal: '1차 항소',
      secondAppeal: '2차 항소',
      thirdAppeal: '최종 항소',
      timeRemaining: '남은 시간',
      publisherArgument: '게시자의 주장',
      warriorArgument: '전사의 주장',
      currentVotes: '현재 투표',
      weightedVoting: '가중 투표: 게시자 30%, 관리자 15%, 커뮤니티 55%',
      supportPublisher: '게시자 지지',
      supportWarrior: '전사 지지',
      votingInfo: '귀하의 투표는 역할에 따라 가중됩니다. 어느 한 쪽이 총 가중치의 >50%에 도달하면 투표가 종료됩니다.',
      votePublisher: '게시자에게 투표',
      voteWarrior: '전사에게 투표',
    },
    appeal: {
      title: '항소 제출',
      firstTier: '1차 항소',
      secondTier: '2차 항소',
      thirdTier: '최종 항소',
      yourArgument: '귀하의 주장',
      argumentPlaceholder: '귀하의 입장에 대한 자세한 이유를 제공하세요. 증거, 맥락 및 귀하의 입장이 옳다고 믿는 이유를 포함하세요...',
      charactersMinimum: '최소 문자',
      submissionInfo: '귀하의 항소는 모든 투표자에게 표시됩니다. 명확하고 사실적이며 존중하세요.',
      submitAppeal: '항소 제출',
      submitting: '제출 중...',
      submitSuccess: '항소가 성공적으로 제출되었습니다!',
      submitError: '항소 제출 실패',
      submitted: '항소 제출됨',
      submittedDescription: '귀하의 항소가 기록되었으며 이제 투표자에게 표시됩니다.',
      viewerOnly: '커뮤니티 회원으로서 항소만 볼 수 있습니다',
      submittedAppeals: '제출된 항소',
      publisher: '게시자',
      warrior: '전사',
      noSubmissionsYet: '아직 항소가 제출되지 않았습니다',
    },
  },
};
