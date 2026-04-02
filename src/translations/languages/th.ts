import { Translation } from '../types';

export const th: Translation = {
  code: 'th',
  name: 'ไทย',
  flag: '🇹🇭',
  content: {
    title: 'เราจะช่วยคุณได้อย่างไร?',
    subtitle: 'เลือกหมวดหมู่ปัญหาของคุณ',
    description: 'เลือกหมวดหมู่ที่อธิบายสถานการณ์ของคุณได้ดีที่สุด เราพร้อมให้คำแนะนำและสนับสนุนแรงงานต่างชาติในสิงคโปร์',
    menuTitle: 'วันนี้อะไรพาคุณมาที่นี่?',
    greetings: {
      morning: 'สวัสดีตอนเช้า',
      afternoon: 'สวัสดีตอนบ่าย',
      evening: 'สวัสดีตอนเย็น'
    },
    needHelpTitle: 'ต้องการความช่วยเหลือ?',
    needHelpDescription: 'รับความช่วยเหลือเกี่ยวกับปัญหาที่คุณกำลังเผชิญ',
    activitiesTitle: 'กำลังมองหากิจกรรม?',
    activitiesDescription: 'ค้นพบกิจกรรมและตัวเลือกความบันเทิง',
    chatbotTitle: 'พูดคุยกับแชทบอทของเรา',
    chatbotDescription: 'รับคำตอบทันทีสำหรับคำถามของคุณ',
    charitiesTitle: 'องค์กรการกุศลและหน่วยงาน',
    charitiesDescription: 'ค้นหาองค์กรที่สามารถช่วยเหลือคุณได้',
    backButton: 'กลับไปที่เมนู',
    clickToGetHelp: 'คลิกเพื่อรับความช่วยเหลือ',
    clickToExpand: 'คลิกเพื่อดูตัวเลือก',
    categories: {
      financial: 'ปัญหาทางการเงิน',
      food: 'ปัญหาอาหาร',
      housing: 'ปัญหาที่อยู่อาศัย',
      legal: 'ข้อพิพาททางกฎหมาย',
      travel: 'ปัญหาการเดินทางกลับบ้าน',
      health: 'ปัญหาสุขภาพ'
    },
    helpCategories: {
      financial: {
        salaryIssues: {
          title: 'ปัญหาเงินเดือน',
          description: 'ค่าจ้างที่ไม่ได้รับ การชำระเงินล่าช้า หรือข้อพิพาทเรื่องเงินเดือน'
        },
        debtManagement: {
          title: 'การจัดการหนี้สิน',
          description: 'ความช่วยเหลือในการจัดการเงินกู้และหนี้สิน'
        },
        bankingProblems: {
          title: 'ปัญหาธนาคาร',
          description: 'ปัญหาเกี่ยวกับบัญชีธนาคาร บัตร หรือธุรกรรม'
        },
        remittanceIssues: {
          title: 'ปัญหาการโอนเงิน',
          description: 'ปัญหาในการส่งเงินกลับบ้าน'
        },
        budgetingHelp: {
          title: 'ความช่วยเหลือด้านงบประมาณ',
          description: 'เรียนรู้การจัดการเงินของคุณให้ดีขึ้น'
        },
        emergencyFunds: {
          title: 'ความช่วยเหลือทางการเงินฉุกเฉิน',
          description: 'การเข้าถึงความช่วยเหลือทางการเงินฉุกเฉิน'
        }
      },
      food: {
        halalFood: {
          title: 'ตัวเลือกอาหารฮาลาล',
          description: 'ค้นหาร้านอาหารและร้านขายของชำที่ได้รับการรับรองฮาลาล'
        },
        dietaryRestrictions: {
          title: 'ข้อจำกัดด้านอาหาร',
          description: 'ตัวเลือกอาหารมังสวิรัติ วีแกน หรือเหมาะสำหรับผู้แพ้อาหาร'
        },
        foodBanks: {
          title: 'ธนาคารอาหารและความช่วยเหลือ',
          description: 'การเข้าถึงโปรแกรมอาหารฟรีหรือได้รับการสนับสนุน'
        },
        affordableGroceries: {
          title: 'ของชำราคาไม่แพง',
          description: 'ค้นหาซูเปอร์มาร์เก็ตและตลาดที่เหมาะกับงบประมาณ'
        },
        cookingFacilities: {
          title: 'สิ่งอำนวยความสะดวกในการทำอาหาร',
          description: 'การเข้าถึงครัวและพื้นที่ทำอาหารร่วมกัน'
        },
        mealPlanning: {
          title: 'เคล็ดลับการวางแผนอาหาร',
          description: 'เรียนรู้การวางแผนอาหารที่มีคุณค่าทางโภชนาการภายในงบประมาณ'
        }
      },
      housing: {
        rentIssues: {
          title: 'ปัญหาค่าเช่า',
          description: 'การชำระเงินล่าช้า ข้อพิพาท หรือการเพิ่มค่าเช่า'
        },
        maintenanceProblems: {
          title: 'ปัญหาการบำรุงรักษา',
          description: 'การซ่อมแซม ปัญหาประปา ไฟฟ้า หรือเครื่องปรับอากาศ'
        },
        roommateConflicts: {
          title: 'ความขัดแย้งกับเพื่อนร่วมห้อง',
          description: 'ข้อพิพาทกับเพื่อนร่วมห้องหรือปัญหาการอยู่ร่วมกัน'
        },
        housingSearch: {
          title: 'การค้นหาที่พักอาศัย',
          description: 'ค้นหาที่พักอาศัยที่เหมาะสมและราคาไม่แพง'
        },
        leaseAgreements: {
          title: 'สัญญาเช่า',
          description: 'ทำความเข้าใจสัญญาเช่าและสิทธิของผู้เช่า'
        },
        utilitiesSetup: {
          title: 'การตั้งค่าสาธารณูปโภค',
          description: 'การตั้งค่าน้ำ ไฟฟ้า และอินเทอร์เน็ต'
        }
      },
      legal: {
        workPermit: {
          title: 'ปัญหาใบอนุญาตทำงาน',
          description: 'การต่ออายุ การโอน หรือการละเมิดใบอนุญาตทำงาน'
        },
        employmentContract: {
          title: 'สัญญาจ้างงาน',
          description: 'ทำความเข้าใจสัญญาและภาระผูกพันของคุณ'
        },
        workplaceRights: {
          title: 'สิทธิในสถานที่ทำงาน',
          description: 'รู้จักสิทธิของคุณในฐานะแรงงานต่างชาติ'
        },
        legalAdvice: {
          title: 'คำแนะนำทางกฎหมาย',
          description: 'บริการให้คำปรึกษาทางกฎหมายฟรีหรือราคาไม่แพง'
        },
        documentTranslation: {
          title: 'การแปลเอกสาร',
          description: 'บริการแปลเอกสารทางกฎหมาย'
        }
      },
      travel: {
        flightBooking: {
          title: 'การจองเที่ยวบิน',
          description: 'ค้นหาเที่ยวบินและข้อเสนอการเดินทางราคาไม่แพง'
        },
        travelDocuments: {
          title: 'เอกสารการเดินทาง',
          description: 'ความช่วยเหลือเรื่องหนังสือเดินทาง วีซ่า และใบอนุญาตเดินทาง'
        },
        leaveApproval: {
          title: 'การอนุมัติการลา',
          description: 'การขออนุมัติจากนายจ้างสำหรับการเยี่ยมบ้าน'
        },
        travelInsurance: {
          title: 'ประกันการเดินทาง',
          description: 'ตัวเลือกประกันการเดินทางราคาไม่แพง'
        },
        emergencyTravel: {
          title: 'การเดินทางฉุกเฉิน',
          description: 'การเดินทางเร่งด่วนเนื่องจากเหตุฉุกเฉินในครอบครัว'
        }
      },
      health: {
        medicalAppointments: {
          title: 'การนัดหมายทางการแพทย์',
          description: 'จองนัดหมายกับแพทย์และผู้เชี่ยวชาญ'
        },
        healthInsurance: {
          title: 'ประกันสุขภาพ',
          description: 'ทำความเข้าใจความคุ้มครองทางการแพทย์และการเรียกร้องของคุณ'
        },
        prescriptions: {
          title: 'ใบสั่งยา',
          description: 'การรับยาและใบสั่งยา'
        },
        mentalHealth: {
          title: 'การสนับสนุนสุขภาพจิต',
          description: 'การให้คำปรึกษาและทรัพยากรด้านสุขภาพจิต'
        },
        emergencyMedical: {
          title: 'การดูแลทางการแพทย์ฉุกเฉิน',
          description: 'การดูแลทางการแพทย์เร่งด่วนและบริการฉุกเฉิน'
        },
        healthCheckups: {
          title: 'การตรวจสุขภาพ',
          description: 'การตรวจสุขภาพเป็นประจำและการดูแลเชิงป้องกัน'
        }
      }
    },
    activities: {
      title: 'กำลังมองหากิจกรรม?',
      subtitle: 'เชื่อมต่อกับชุมชนของคุณและค้นพบข้อเสนอที่ยอดเยี่ยม',
      socialActivities: {
        title: 'กิจกรรมทางสังคม',
        description: 'ค้นหาคนใกล้คุณที่กำลังวางแผนกิจกรรม!'
      },
      communityEvents: {
        title: 'กิจกรรมชุมชน',
        description: 'เข้าร่วมเทศกาลวัฒนธรรมและการชุมนุมชุมชน'
      },
      discountsNearYou: {
        title: 'ส่วนลดใกล้คุณ',
        description: 'ค้นหาข้อเสนอที่ยอดเยี่ยมเกี่ยวกับการช้อปปิ้ง อาหาร และบริการใกล้เคียง'
      },
      foodPlaces: {
        title: 'สถานที่อาหารที่มีส่วนลด',
        description: 'ค้นพบร้านอาหารและศูนย์อาหารที่มีข้อเสนอพิเศษ'
      },
      shoppingPlaces: {
        title: 'สถานที่ช้อปปิ้งที่มีส่วนลด',
        description: 'ค้นหาตลาดและร้านค้าที่มีข้อเสนอที่ยอดเยี่ยม'
      }
    },
    discounts: {
      pageTitle: 'ส่วนลดใกล้คุณ',
      subtitle: 'ประหยัดเงินด้วยข้อเสนอพิเศษใกล้เคียง',
      categories: {
        all: 'ส่วนลดทั้งหมด',
        food: 'อาหารและการรับประทานอาหาร',
        shopping: 'การช้อปปิ้ง',
        entertainment: 'ความบันเทิง',
        services: 'บริการ',
        transportation: 'การขนส่ง'
      },
      labels: {
        distance: 'ระยะทาง',
        validUntil: 'ใช้ได้จนถึง',
        discount: 'ส่วนลด',
        terms: 'ข้อกำหนดและเงื่อนไข',
        location: 'สถานที่',
        contact: 'ติดต่อ',
        viewDetails: 'ดูรายละเอียด',
        getDirections: 'รับเส้นทาง',
        refreshLocation: 'รีเฟรชสถานที่',
        nearbyDiscounts: 'ส่วนลดใกล้เคียง',
        noDiscounts: 'ไม่พบส่วนลดใกล้เคียง',
        loadingLocation: 'กำลังรับสถานที่ของคุณ...',
        locationError: 'ไม่สามารถรับสถานที่ของคุณได้'
      }
    },
    howItWorks: {
      title: 'วิธีการทำงาน',
      description: 'การรับความช่วยเหลือเป็นเรื่องง่ายและตรงไปตรงมา',
      steps: [
        'เลือกหมวดหมู่ปัญหาของคุณ',
        'เลือกประเภทปัญหาเฉพาะ',
        'รับคำแนะนำและทรัพยากรที่เป็นส่วนตัว'
      ]
    },
    footer: 'พร้อมให้บริการตลอด 24/7 ในภาษาของคุณ'
  }
};
