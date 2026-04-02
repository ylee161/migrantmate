import { Translation } from '../types';

export const tl: Translation = {
  code: 'tl',
  name: 'Tagalog',
  flag: '🇵🇭',
  content: {
    title: 'Paano Kami Makakatulong sa Iyo?',
    subtitle: 'Piliin ang Kategorya ng Iyong Problema',
    description: 'Pumili ng kategorya na pinakamahusay na naglalarawan sa iyong sitwasyon. Nandito kami upang magbigay ng gabay at suporta para sa mga dayuhang manggagawa sa Singapore.',
    menuTitle: 'Ano ang nagdala sa iyo dito ngayon?',
    greetings: {
      morning: 'Magandang Umaga',
      afternoon: 'Magandang Hapon',
      evening: 'Magandang Gabi'
    },
    needHelpTitle: 'Kailangan ng Tulong?',
    needHelpDescription: 'Kumuha ng tulong sa mga problemang iyong kinakaharap',
    activitiesTitle: 'Naghahanap ng mga aktibidad?',
    activitiesDescription: 'Tuklasin ang mga aktibidad at opsyon sa entertainment',
    chatbotTitle: 'Makipag-usap sa aming chatbot',
    chatbotDescription: 'Kumuha ng agarang sagot sa iyong mga tanong',
    charitiesTitle: 'Mga Charity at Awtoridad',
    charitiesDescription: 'Maghanap ng mga organisasyong makakatulong sa iyo',
    backButton: 'Bumalik sa Menu',
    clickToGetHelp: 'I-click para makakuha ng tulong',
    clickToExpand: 'I-click upang makita ang mga opsyon',
    categories: {
      financial: 'Mga Problemang Pinansyal',
      food: 'Mga Problemang Pagkain',
      housing: 'Mga Problemang Pabahay',
      legal: 'Mga Legal na Alitan',
      travel: 'Problema sa Paguwi',
      health: 'Mga Problemang Kalusugan'
    },
    helpCategories: {
      financial: {
        salaryIssues: {
          title: 'Mga Isyu sa Sahod',
          description: 'Hindi nabayarang sahod, naantalang pagbabayad, o alitan sa sahod'
        },
        debtManagement: {
          title: 'Pamamahala ng Utang',
          description: 'Tulong sa pamamahala ng mga pautang at utang'
        },
        bankingProblems: {
          title: 'Mga Problema sa Bangko',
          description: 'Mga isyu sa mga bank account, card, o transaksyon'
        },
        remittanceIssues: {
          title: 'Mga Isyu sa Remittance',
          description: 'Mga problema sa pagpapadala ng pera pauwi'
        },
        budgetingHelp: {
          title: 'Tulong sa Budgeting',
          description: 'Matuto na mas mahusay na pamahalaan ang iyong pera'
        },
        emergencyFunds: {
          title: 'Tulong Pinansyal sa Emergency',
          description: 'Access sa emergency financial assistance'
        }
      },
      food: {
        halalFood: {
          title: 'Mga Opsyon ng Halal na Pagkain',
          description: 'Maghanap ng mga halal-certified na restaurant at grocery'
        },
        dietaryRestrictions: {
          title: 'Mga Paghihigpit sa Pagkain',
          description: 'Vegetarian, vegan, o allergy-friendly na opsyon sa pagkain'
        },
        foodBanks: {
          title: 'Mga Food Bank at Tulong',
          description: 'Access sa libreng o subsidized na food programs'
        },
        affordableGroceries: {
          title: 'Abot-kayang Grocery',
          description: 'Maghanap ng budget-friendly na supermarket at palengke'
        },
        cookingFacilities: {
          title: 'Mga Pasilidad sa Pagluluto',
          description: 'Access sa shared kitchen at cooking spaces'
        },
        mealPlanning: {
          title: 'Mga Tip sa Meal Planning',
          description: 'Matuto na mag-plano ng masustansyang pagkain sa budget'
        }
      },
      housing: {
        rentIssues: {
          title: 'Mga Isyu sa Renta',
          description: 'Naantalang pagbabayad, alitan, o pagtaas ng renta'
        },
        maintenanceProblems: {
          title: 'Mga Problema sa Maintenance',
          description: 'Mga repair, plumbing, electrical, o AC issues'
        },
        roommateConflicts: {
          title: 'Mga Alitan sa Roommate',
          description: 'Mga alitan sa roommate o shared living issues'
        },
        housingSearch: {
          title: 'Paghahanap ng Pabahay',
          description: 'Maghanap ng abot-kaya at angkop na tirahan'
        },
        leaseAgreements: {
          title: 'Mga Lease Agreement',
          description: 'Pag-unawa sa rental contract at karapatan ng tenant'
        },
        utilitiesSetup: {
          title: 'Setup ng Utilities',
          description: 'Pag-setup ng tubig, kuryente, at internet'
        }
      },
      legal: {
        workPermit: {
          title: 'Mga Isyu sa Work Permit',
          description: 'Renewal, transfer, o paglabag sa work permit'
        },
        employmentContract: {
          title: 'Employment Contract',
          description: 'Pag-unawa sa iyong kontrata at mga obligasyon'
        },
        workplaceRights: {
          title: 'Mga Karapatan sa Workplace',
          description: 'Alamin ang iyong mga karapatan bilang dayuhang manggagawa'
        },
        legalAdvice: {
          title: 'Legal na Payo',
          description: 'Libreng o abot-kayang legal consultation services'
        },
        documentTranslation: {
          title: 'Pagsasalin ng Dokumento',
          description: 'Mga serbisyo sa pagsasalin para sa legal na dokumento'
        }
      },
      travel: {
        flightBooking: {
          title: 'Pag-book ng Flight',
          description: 'Maghanap ng abot-kayang flight at travel deals'
        },
        travelDocuments: {
          title: 'Mga Dokumento sa Paglalakbay',
          description: 'Tulong sa passport, visa, at travel permit'
        },
        leaveApproval: {
          title: 'Pag-apruba ng Leave',
          description: 'Pagkuha ng approval mula sa employer para sa home visits'
        },
        travelInsurance: {
          title: 'Travel Insurance',
          description: 'Abot-kayang travel insurance options'
        },
        emergencyTravel: {
          title: 'Emergency Travel',
          description: 'Urgent na paglalakbay dahil sa family emergencies'
        }
      },
      health: {
        medicalAppointments: {
          title: 'Mga Medical Appointment',
          description: 'Mag-book ng appointment sa mga doktor at specialist'
        },
        healthInsurance: {
          title: 'Health Insurance',
          description: 'Pag-unawa sa iyong medical coverage at claims'
        },
        prescriptions: {
          title: 'Mga Reseta',
          description: 'Pagkuha ng mga gamot at pagpuno ng reseta'
        },
        mentalHealth: {
          title: 'Suporta sa Mental Health',
          description: 'Counseling at mental wellness resources'
        },
        emergencyMedical: {
          title: 'Emergency Medical Care',
          description: 'Urgent na medical attention at emergency services'
        },
        healthCheckups: {
          title: 'Mga Health Checkup',
          description: 'Regular na health screening at preventive care'
        }
      }
    },
    activities: {
      title: 'Naghahanap ng mga aktibidad?',
      subtitle: 'Makipag-ugnayan sa iyong komunidad at tuklasin ang mga magagandang deal',
      socialActivities: {
        title: 'Mga Social Activity',
        description: 'Maghanap ng mga tao malapit sa iyo na nagpaplano ng mga aktibidad!'
      },
      communityEvents: {
        title: 'Mga Community Event',
        description: 'Sumali sa mga cultural festival at community gathering'
      },
      discountsNearYou: {
        title: 'Mga Diskwento Malapit sa Iyo',
        description: 'Maghanap ng magagandang deal sa shopping, pagkain, at serbisyo malapit'
      },
      foodPlaces: {
        title: 'Mga Lugar ng Pagkain na may Diskwento',
        description: 'Tuklasin ang mga restaurant at hawker center na may special offers'
      },
      shoppingPlaces: {
        title: 'Mga Lugar ng Shopping na may Diskwento',
        description: 'Maghanap ng mga palengke at tindahan na may magagandang deal'
      }
    },
    discounts: {
      pageTitle: 'Mga Diskwento Malapit sa Iyo',
      subtitle: 'Makatipid ng pera sa eksklusibong deal malapit',
      categories: {
        all: 'Lahat ng Diskwento',
        food: 'Pagkain at Kainan',
        shopping: 'Shopping',
        entertainment: 'Entertainment',
        services: 'Mga Serbisyo',
        transportation: 'Transportasyon'
      },
      labels: {
        distance: 'Distansya',
        validUntil: 'Valid Hanggang',
        discount: 'Diskwento',
        terms: 'Mga Tuntunin at Kondisyon',
        location: 'Lokasyon',
        contact: 'Makipag-ugnayan',
        viewDetails: 'Tingnan ang Detalye',
        getDirections: 'Kumuha ng Direksyon',
        refreshLocation: 'I-refresh ang Lokasyon',
        nearbyDiscounts: 'Mga Diskwento Malapit',
        noDiscounts: 'Walang nahanap na diskwento malapit',
        loadingLocation: 'Kinukuha ang iyong lokasyon...',
        locationError: 'Hindi makuha ang iyong lokasyon'
      }
    },
    howItWorks: {
      title: 'Paano Ito Gumagana',
      description: 'Ang pagkuha ng tulong ay simple at direkta',
      steps: [
        'Piliin ang kategorya ng iyong problema',
        'Pumili ng specific na uri ng isyu',
        'Kumuha ng personalized na gabay at resources'
      ]
    },
    footer: 'Available 24/7 sa iyong wika'
  }
};
