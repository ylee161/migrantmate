import { Translation } from '../types';

export const hi: Translation = {
  code: 'hi',
  name: 'हिन्दी',
  flag: '🇮🇳',
  content: {
    title: 'हम आपकी कैसे मदद कर सकते हैं?',
    subtitle: 'अपनी समस्या की श्रेणी चुनें',
    description: 'वह श्रेणी चुनें जो आपकी स्थिति का सबसे अच्छा वर्णन करती है। हम सिंगापुर में विदेशी श्रमिकों के लिए मार्गदर्शन और सहायता प्रदान करने के लिए यहां हैं।',
    menuTitle: 'आज आपको यहां क्या लाया?',
    greetings: {
      morning: 'सुप्रभात',
      afternoon: 'शुभ दोपहर',
      evening: 'शुभ संध्या'
    },
    needHelpTitle: 'मदद चाहिए?',
    needHelpDescription: 'आप जिन समस्याओं का सामना कर रहे हैं उनमें सहायता प्राप्त करें',
    activitiesTitle: 'कुछ करने की तलाश में?',
    activitiesDescription: 'गतिविधियों और मनोरंजन विकल्पों की खोज करें',
    chatbotTitle: 'हमारे चैटबॉट से बात करें',
    chatbotDescription: 'अपने प्रश्नों के तुरंत उत्तर प्राप्त करें',
    charitiesTitle: 'धर्मार्थ संस्थाएं और अधिकारी',
    charitiesDescription: 'ऐसे संगठन खोजें जो आपकी मदद कर सकते हैं',
    backButton: 'मेनू पर वापस जाएं',
    clickToGetHelp: 'मदद पाने के लिए क्लिक करें',
    clickToExpand: 'विकल्प देखने के लिए क्लिक करें',
    categories: {
      financial: 'वित्तीय समस्याएं',
      food: 'भोजन समस्याएं',
      housing: 'आवास समस्याएं',
      legal: 'कानूनी विवाद',
      travel: 'घर जाने में परेशानी',
      health: 'स्वास्थ्य समस्याएं'
    },
    helpCategories: {
      financial: {
        salaryIssues: {
          title: 'वेतन मुद्दे',
          description: 'अवैतनिक मजदूरी, विलंबित भुगतान, या वेतन विवाद'
        },
        debtManagement: {
          title: 'ऋण प्रबंधन',
          description: 'ऋण और कर्ज के प्रबंधन में मदद'
        },
        bankingProblems: {
          title: 'बैंकिंग समस्याएं',
          description: 'बैंक खातों, कार्ड, या लेनदेन के साथ समस्याएं'
        },
        remittanceIssues: {
          title: 'प्रेषण मुद्दे',
          description: 'घर पैसे भेजने में समस्याएं'
        },
        budgetingHelp: {
          title: 'बजट सहायता',
          description: 'अपने पैसे को बेहतर तरीके से प्रबंधित करना सीखें'
        },
        emergencyFunds: {
          title: 'आपातकालीन वित्तीय सहायता',
          description: 'आपातकालीन वित्तीय सहायता तक पहुंच'
        }
      },
      food: {
        halalFood: {
          title: 'हलाल भोजन विकल्प',
          description: 'हलाल-प्रमाणित रेस्तरां और किराने की दुकानें खोजें'
        },
        dietaryRestrictions: {
          title: 'आहार प्रतिबंध',
          description: 'शाकाहारी, शाकाहारी, या एलर्जी-अनुकूल भोजन विकल्प'
        },
        foodBanks: {
          title: 'खाद्य बैंक और सहायता',
          description: 'मुफ्त या सब्सिडी वाले खाद्य कार्यक्रमों तक पहुंच'
        },
        affordableGroceries: {
          title: 'किफायती किराना',
          description: 'बजट-अनुकूल सुपरमार्केट और बाजार खोजें'
        },
        cookingFacilities: {
          title: 'खाना पकाने की सुविधाएं',
          description: 'साझा रसोई और खाना पकाने के स्थानों तक पहुंच'
        },
        mealPlanning: {
          title: 'भोजन योजना युक्तियाँ',
          description: 'बजट पर पौष्टिक भोजन की योजना बनाना सीखें'
        }
      },
      housing: {
        rentIssues: {
          title: 'किराया मुद्दे',
          description: 'देर से भुगतान, विवाद, या किराया वृद्धि'
        },
        maintenanceProblems: {
          title: 'रखरखाव समस्याएं',
          description: 'मरम्मत, प्लंबिंग, बिजली, या एसी मुद्दे'
        },
        roommateConflicts: {
          title: 'रूममेट संघर्ष',
          description: 'रूममेट्स के साथ विवाद या साझा रहने के मुद्दे'
        },
        housingSearch: {
          title: 'आवास खोज',
          description: 'किफायती और उपयुक्त आवास खोजें'
        },
        leaseAgreements: {
          title: 'पट्टा समझौते',
          description: 'किराया अनुबंध और किरायेदार अधिकारों को समझना'
        },
        utilitiesSetup: {
          title: 'उपयोगिताओं की स्थापना',
          description: 'पानी, बिजली, और इंटरनेट की स्थापना'
        }
      },
      legal: {
        workPermit: {
          title: 'कार्य परमिट मुद्दे',
          description: 'नवीनीकरण, स्थानांतरण, या कार्य परमिट उल्लंघन'
        },
        employmentContract: {
          title: 'रोजगार अनुबंध',
          description: 'अपने अनुबंध और दायित्वों को समझना'
        },
        workplaceRights: {
          title: 'कार्यस्थल अधिकार',
          description: 'विदेशी कर्मचारी के रूप में अपने अधिकारों को जानें'
        },
        legalAdvice: {
          title: 'कानूनी सलाह',
          description: 'मुफ्त या किफायती कानूनी परामर्श सेवाएं'
        },
        documentTranslation: {
          title: 'दस्तावेज़ अनुवाद',
          description: 'कानूनी दस्तावेजों के लिए अनुवाद सेवाएं'
        }
      },
      travel: {
        flightBooking: {
          title: 'उड़ान बुकिंग',
          description: 'किफायती उड़ानें और यात्रा सौदे खोजें'
        },
        travelDocuments: {
          title: 'यात्रा दस्तावेज़',
          description: 'पासपोर्ट, वीजा, और यात्रा परमिट सहायता'
        },
        leaveApproval: {
          title: 'छुट्टी की मंजूरी',
          description: 'घर की यात्राओं के लिए नियोक्ता से मंजूरी प्राप्त करना'
        },
        travelInsurance: {
          title: 'यात्रा बीमा',
          description: 'किफायती यात्रा बीमा विकल्प'
        },
        emergencyTravel: {
          title: 'आपातकालीन यात्रा',
          description: 'पारिवारिक आपात स्थिति के कारण तत्काल यात्रा'
        }
      },
      health: {
        medicalAppointments: {
          title: 'चिकित्सा नियुक्तियां',
          description: 'डॉक्टरों और विशेषज्ञों के साथ नियुक्तियां बुक करें'
        },
        healthInsurance: {
          title: 'स्वास्थ्य बीमा',
          description: 'अपने चिकित्सा कवरेज और दावों को समझना'
        },
        prescriptions: {
          title: 'नुस्खे',
          description: 'दवाएं और नुस्खे भरना'
        },
        mentalHealth: {
          title: 'मानसिक स्वास्थ्य सहायता',
          description: 'परामर्श और मानसिक कल्याण संसाधन'
        },
        emergencyMedical: {
          title: 'आपातकालीन चिकित्सा देखभाल',
          description: 'तत्काल चिकित्सा ध्यान और आपातकालीन सेवाएं'
        },
        healthCheckups: {
          title: 'स्वास्थ्य जांच',
          description: 'नियमित स्वास्थ्य जांच और निवारक देखभाल'
        }
      }
    },
    activities: {
      title: 'कुछ करने की तलाश में?',
      subtitle: 'अपने समुदाय से जुड़ें और बेहतरीन सौदे खोजें',
      socialActivities: {
        title: 'सामाजिक गतिविधियां',
        description: 'अपने पास के लोगों को खोजें जो गतिविधियों की योजना बना रहे हैं!'
      },
      communityEvents: {
        title: 'सामुदायिक कार्यक्रम',
        description: 'सांस्कृतिक त्योहारों और सामुदायिक सभाओं में शामिल हों'
      },
      discountsNearYou: {
        title: 'आपके पास छूट',
        description: 'पास में खरीदारी, भोजन, और सेवाओं पर बेहतरीन सौदे खोजें'
      },
      foodPlaces: {
        title: 'छूट के साथ भोजन स्थान',
        description: 'विशेष ऑफर के साथ रेस्तरां और हॉकर केंद्र खोजें'
      },
      shoppingPlaces: {
        title: 'छूट के साथ खरीदारी स्थान',
        description: 'बेहतरीन सौदों के साथ बाजार और दुकानें खोजें'
      }
    },
    discounts: {
      pageTitle: 'आपके पास छूट',
      subtitle: 'पास के विशेष सौदों के साथ पैसे बचाएं',
      categories: {
        all: 'सभी छूट',
        food: 'भोजन और भोजन',
        shopping: 'खरीदारी',
        entertainment: 'मनोरंजन',
        services: 'सेवाएं',
        transportation: 'परिवहन'
      },
      labels: {
        distance: 'दूरी',
        validUntil: 'तक मान्य',
        discount: 'छूट',
        terms: 'नियम और शर्तें',
        location: 'स्थान',
        contact: 'संपर्क',
        viewDetails: 'विवरण देखें',
        getDirections: 'दिशा-निर्देश प्राप्त करें',
        refreshLocation: 'स्थान रीफ्रेश करें',
        nearbyDiscounts: 'पास की छूट',
        noDiscounts: 'पास में कोई छूट नहीं मिली',
        loadingLocation: 'आपका स्थान प्राप्त कर रहे हैं...',
        locationError: 'आपका स्थान प्राप्त करने में असमर्थ'
      }
    },
    howItWorks: {
      title: 'यह कैसे काम करता है',
      description: 'मदद पाना सरल और सीधा है',
      steps: [
        'अपनी समस्या की श्रेणी चुनें',
        'विशिष्ट मुद्दे का प्रकार चुनें',
        'व्यक्तिगत मार्गदर्शन और संसाधन प्राप्त करें'
      ]
    },
    footer: 'आपकी भाषा में 24/7 उपलब्ध'
  }
};
