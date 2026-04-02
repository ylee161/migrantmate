import { Translation } from '../types';

export const zh: Translation = {
  code: 'zh',
  name: '中文',
  flag: '🇨🇳',
  content: {
    title: '我们如何帮助您？',
    subtitle: '选择您的问题类别',
    description: '选择最能描述您情况的类别。我们在这里为新加坡的外籍劳工提供指导和支持。',
    menuTitle: '今天是什么带您来到这里？',
    greetings: {
      morning: '早上好',
      afternoon: '下午好',
      evening: '晚上好'
    },
    needHelpTitle: '需要帮助？',
    needHelpDescription: '获取您面临问题的帮助',
    activitiesTitle: '寻找活动？',
    activitiesDescription: '发现活动和娱乐选项',
    chatbotTitle: '与我们的聊天机器人交谈',
    chatbotDescription: '立即获得您问题的答案',
    charitiesTitle: '慈善机构和当局',
    charitiesDescription: '找到可以帮助您的组织',
    backButton: '返回菜单',
    clickToGetHelp: '点击获取帮助',
    clickToExpand: '点击查看选项',
    categories: {
      financial: '财务问题',
      food: '食物问题',
      housing: '住房问题',
      legal: '法律纠纷',
      travel: '回家旅行问题',
      health: '健康问题'
    },
    helpCategories: {
      financial: {
        salaryIssues: {
          title: '工资问题',
          description: '未付工资、延迟付款或工资纠纷'
        },
        debtManagement: {
          title: '债务管理',
          description: '帮助管理贷款和债务'
        },
        bankingProblems: {
          title: '银行问题',
          description: '银行账户、卡或交易问题'
        },
        remittanceIssues: {
          title: '汇款问题',
          description: '汇款回家的问题'
        },
        budgetingHelp: {
          title: '预算帮助',
          description: '学习更好地管理您的钱'
        },
        emergencyFunds: {
          title: '紧急财务援助',
          description: '获得紧急财务援助'
        }
      },
      food: {
        halalFood: {
          title: '清真食品选项',
          description: '查找清真认证的餐厅和杂货店'
        },
        dietaryRestrictions: {
          title: '饮食限制',
          description: '素食、纯素或过敏友好的食物选项'
        },
        foodBanks: {
          title: '食品银行和援助',
          description: '获得免费或补贴的食品计划'
        },
        affordableGroceries: {
          title: '实惠的杂货店',
          description: '查找预算友好的超市和市场'
        },
        cookingFacilities: {
          title: '烹饪设施',
          description: '使用共享厨房和烹饪空间'
        },
        mealPlanning: {
          title: '膳食计划提示',
          description: '学习在预算内计划营养餐'
        }
      },
      housing: {
        rentIssues: {
          title: '租金问题',
          description: '延迟付款、纠纷或租金上涨'
        },
        maintenanceProblems: {
          title: '维护问题',
          description: '维修、管道、电气或空调问题'
        },
        roommateConflicts: {
          title: '室友冲突',
          description: '与室友的纠纷或共享生活问题'
        },
        housingSearch: {
          title: '住房搜索',
          description: '查找实惠且合适的住宿'
        },
        leaseAgreements: {
          title: '租赁协议',
          description: '了解租赁合同和租户权利'
        },
        utilitiesSetup: {
          title: '公用事业设置',
          description: '设置水、电和互联网'
        }
      },
      legal: {
        workPermit: {
          title: '工作许可问题',
          description: '续签、转移或工作许可违规'
        },
        employmentContract: {
          title: '雇佣合同',
          description: '了解您的合同和义务'
        },
        workplaceRights: {
          title: '工作场所权利',
          description: '了解您作为外籍工人的权利'
        },
        legalAdvice: {
          title: '法律咨询',
          description: '免费或实惠的法律咨询服务'
        },
        documentTranslation: {
          title: '文件翻译',
          description: '法律文件的翻译服务'
        }
      },
      travel: {
        flightBooking: {
          title: '航班预订',
          description: '查找实惠的航班和旅行优惠'
        },
        travelDocuments: {
          title: '旅行文件',
          description: '护照、签证和旅行许可协助'
        },
        leaveApproval: {
          title: '请假批准',
          description: '获得雇主批准回家探亲'
        },
        travelInsurance: {
          title: '旅行保险',
          description: '实惠的旅行保险选项'
        },
        emergencyTravel: {
          title: '紧急旅行',
          description: '因家庭紧急情况的紧急旅行'
        }
      },
      health: {
        medicalAppointments: {
          title: '医疗预约',
          description: '预约医生和专科医生'
        },
        healthInsurance: {
          title: '健康保险',
          description: '了解您的医疗保险和索赔'
        },
        prescriptions: {
          title: '处方',
          description: '获取药物和处方'
        },
        mentalHealth: {
          title: '心理健康支持',
          description: '咨询和心理健康资源'
        },
        emergencyMedical: {
          title: '紧急医疗护理',
          description: '紧急医疗关注和急诊服务'
        },
        healthCheckups: {
          title: '健康检查',
          description: '定期健康筛查和预防护理'
        }
      }
    },
    activities: {
      title: '寻找活动？',
      subtitle: '与您的社区联系并发现优惠',
      socialActivities: {
        title: '社交活动',
        description: '找到您附近正在计划活动的人！'
      },
      communityEvents: {
        title: '社区活动',
        description: '参加文化节日和社区聚会'
      },
      discountsNearYou: {
        title: '您附近的折扣',
        description: '在附近找到购物、食品和服务的优惠'
      },
      foodPlaces: {
        title: '有折扣的餐饮场所',
        description: '发现有特别优惠的餐厅和小贩中心'
      },
      shoppingPlaces: {
        title: '有折扣的购物场所',
        description: '找到有优惠的市场和商店'
      }
    },
    discounts: {
      pageTitle: '您附近的折扣',
      subtitle: '通过附近的独家优惠省钱',
      categories: {
        all: '所有折扣',
        food: '食品和餐饮',
        shopping: '购物',
        entertainment: '娱乐',
        services: '服务',
        transportation: '交通'
      },
      labels: {
        distance: '距离',
        validUntil: '有效期至',
        discount: '折扣',
        terms: '条款和条件',
        location: '位置',
        contact: '联系方式',
        viewDetails: '查看详情',
        getDirections: '获取路线',
        refreshLocation: '刷新位置',
        nearbyDiscounts: '附近的折扣',
        noDiscounts: '附近未找到折扣',
        loadingLocation: '正在获取您的位置...',
        locationError: '无法获取您的位置'
      }
    },
    howItWorks: {
      title: '如何运作',
      description: '获得帮助简单直接',
      steps: [
        '选择您的问题类别',
        '选择具体问题类型',
        '获得个性化指导和资源'
      ]
    },
    footer: '24/7 提供您的语言服务'
  }
};
