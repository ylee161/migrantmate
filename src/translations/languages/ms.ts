import { Translation } from '../types';

export const ms: Translation = {
  code: 'ms',
  name: 'Bahasa Melayu',
  flag: '🇲🇾',
  content: {
    title: 'Bagaimana Kami Boleh Membantu Anda?',
    subtitle: 'Pilih Kategori Masalah Anda',
    description: 'Pilih kategori yang paling sesuai dengan situasi anda. Kami di sini untuk memberikan panduan dan sokongan kepada pekerja asing di Singapura.',
    menuTitle: 'Apa yang membawa anda ke sini hari ini?',
    greetings: {
      morning: 'Selamat Pagi',
      afternoon: 'Selamat Petang',
      evening: 'Selamat Malam'
    },
    needHelpTitle: 'Perlukan Bantuan?',
    needHelpDescription: 'Dapatkan bantuan dengan masalah yang anda hadapi',
    activitiesTitle: 'Mencari aktiviti?',
    activitiesDescription: 'Temui aktiviti dan pilihan hiburan',
    chatbotTitle: 'Bercakap dengan chatbot kami',
    chatbotDescription: 'Dapatkan jawapan segera untuk soalan anda',
    charitiesTitle: 'Badan Amal & Pihak Berkuasa',
    charitiesDescription: 'Cari organisasi yang boleh membantu anda',
    backButton: 'Kembali ke Menu',
    clickToGetHelp: 'Klik untuk mendapatkan bantuan',
    clickToExpand: 'Klik untuk melihat pilihan',
    categories: {
      financial: 'Masalah Kewangan',
      food: 'Masalah Makanan',
      housing: 'Masalah Perumahan',
      legal: 'Pertikaian Undang-undang',
      travel: 'Masalah Perjalanan Pulang',
      health: 'Masalah Kesihatan'
    },
    helpCategories: {
      financial: {
        salaryIssues: {
          title: 'Isu Gaji',
          description: 'Gaji tidak dibayar, pembayaran tertangguh, atau pertikaian gaji'
        },
        debtManagement: {
          title: 'Pengurusan Hutang',
          description: 'Bantuan menguruskan pinjaman dan hutang'
        },
        bankingProblems: {
          title: 'Masalah Perbankan',
          description: 'Isu dengan akaun bank, kad, atau transaksi'
        },
        remittanceIssues: {
          title: 'Isu Kiriman Wang',
          description: 'Masalah menghantar wang pulang'
        },
        budgetingHelp: {
          title: 'Bantuan Belanjawan',
          description: 'Belajar menguruskan wang anda dengan lebih baik'
        },
        emergencyFunds: {
          title: 'Bantuan Kewangan Kecemasan',
          description: 'Akses kepada bantuan kewangan kecemasan'
        }
      },
      food: {
        halalFood: {
          title: 'Pilihan Makanan Halal',
          description: 'Cari restoran dan kedai runcit yang diperakui halal'
        },
        dietaryRestrictions: {
          title: 'Sekatan Pemakanan',
          description: 'Pilihan makanan vegetarian, vegan, atau mesra alahan'
        },
        foodBanks: {
          title: 'Bank Makanan & Bantuan',
          description: 'Akses kepada program makanan percuma atau bersubsidi'
        },
        affordableGroceries: {
          title: 'Barangan Runcit Mampu Milik',
          description: 'Cari pasar raya dan pasar yang mesra bajet'
        },
        cookingFacilities: {
          title: 'Kemudahan Memasak',
          description: 'Akses kepada dapur berkongsi dan ruang memasak'
        },
        mealPlanning: {
          title: 'Petua Perancangan Makanan',
          description: 'Belajar merancang makanan berkhasiat dengan bajet'
        }
      },
      housing: {
        rentIssues: {
          title: 'Isu Sewa',
          description: 'Pembayaran lewat, pertikaian, atau kenaikan sewa'
        },
        maintenanceProblems: {
          title: 'Masalah Penyelenggaraan',
          description: 'Pembaikan, paip, elektrik, atau isu penghawa dingin'
        },
        roommateConflicts: {
          title: 'Konflik Rakan Sebilik',
          description: 'Pertikaian dengan rakan sebilik atau isu kehidupan berkongsi'
        },
        housingSearch: {
          title: 'Pencarian Perumahan',
          description: 'Cari penginapan yang mampu milik dan sesuai'
        },
        leaseAgreements: {
          title: 'Perjanjian Pajakan',
          description: 'Memahami kontrak sewa dan hak penyewa'
        },
        utilitiesSetup: {
          title: 'Persediaan Utiliti',
          description: 'Menyediakan air, elektrik, dan internet'
        }
      },
      legal: {
        workPermit: {
          title: 'Isu Permit Kerja',
          description: 'Pembaharuan, pemindahan, atau pelanggaran permit kerja'
        },
        employmentContract: {
          title: 'Kontrak Pekerjaan',
          description: 'Memahami kontrak dan kewajipan anda'
        },
        workplaceRights: {
          title: 'Hak Tempat Kerja',
          description: 'Ketahui hak anda sebagai pekerja asing'
        },
        legalAdvice: {
          title: 'Nasihat Undang-undang',
          description: 'Perkhidmatan perundingan undang-undang percuma atau mampu milik'
        },
        documentTranslation: {
          title: 'Terjemahan Dokumen',
          description: 'Perkhidmatan terjemahan untuk dokumen undang-undang'
        }
      },
      travel: {
        flightBooking: {
          title: 'Tempahan Penerbangan',
          description: 'Cari penerbangan mampu milik dan tawaran perjalanan'
        },
        travelDocuments: {
          title: 'Dokumen Perjalanan',
          description: 'Bantuan pasport, visa, dan permit perjalanan'
        },
        leaveApproval: {
          title: 'Kelulusan Cuti',
          description: 'Mendapat kelulusan dari majikan untuk lawatan pulang'
        },
        travelInsurance: {
          title: 'Insurans Perjalanan',
          description: 'Pilihan insurans perjalanan mampu milik'
        },
        emergencyTravel: {
          title: 'Perjalanan Kecemasan',
          description: 'Perjalanan mendesak kerana kecemasan keluarga'
        }
      },
      health: {
        medicalAppointments: {
          title: 'Temujanji Perubatan',
          description: 'Tempah temujanji dengan doktor dan pakar'
        },
        healthInsurance: {
          title: 'Insurans Kesihatan',
          description: 'Memahami perlindungan perubatan dan tuntutan anda'
        },
        prescriptions: {
          title: 'Preskripsi',
          description: 'Mendapatkan ubat dan preskripsi diisi'
        },
        mentalHealth: {
          title: 'Sokongan Kesihatan Mental',
          description: 'Kaunseling dan sumber kesejahteraan mental'
        },
        emergencyMedical: {
          title: 'Penjagaan Perubatan Kecemasan',
          description: 'Perhatian perubatan mendesak dan perkhidmatan kecemasan'
        },
        healthCheckups: {
          title: 'Pemeriksaan Kesihatan',
          description: 'Saringan kesihatan berkala dan penjagaan pencegahan'
        }
      }
    },
    activities: {
      title: 'Mencari aktiviti?',
      subtitle: 'Berhubung dengan komuniti anda dan temui tawaran hebat',
      socialActivities: {
        title: 'Aktiviti Sosial',
        description: 'Cari orang berhampiran anda yang merancang aktiviti!'
      },
      communityEvents: {
        title: 'Acara Komuniti',
        description: 'Sertai perayaan budaya dan perhimpunan komuniti'
      },
      discountsNearYou: {
        title: 'Diskaun Berhampiran Anda',
        description: 'Cari tawaran hebat untuk membeli-belah, makanan, dan perkhidmatan berdekatan'
      },
      foodPlaces: {
        title: 'Tempat Makanan dengan Diskaun',
        description: 'Temui restoran dan pusat penjaja dengan tawaran istimewa'
      },
      shoppingPlaces: {
        title: 'Tempat Membeli-belah dengan Diskaun',
        description: 'Cari pasar dan kedai dengan tawaran hebat'
      }
    },
    discounts: {
      pageTitle: 'Diskaun Berhampiran Anda',
      subtitle: 'Jimat wang dengan tawaran eksklusif berdekatan',
      categories: {
        all: 'Semua Diskaun',
        food: 'Makanan & Makan',
        shopping: 'Membeli-belah',
        entertainment: 'Hiburan',
        services: 'Perkhidmatan',
        transportation: 'Pengangkutan'
      },
      labels: {
        distance: 'Jarak',
        validUntil: 'Sah Sehingga',
        discount: 'Diskaun',
        terms: 'Terma & Syarat',
        location: 'Lokasi',
        contact: 'Hubungi',
        viewDetails: 'Lihat Butiran',
        getDirections: 'Dapatkan Arah',
        refreshLocation: 'Segarkan Lokasi',
        nearbyDiscounts: 'Diskaun Berdekatan',
        noDiscounts: 'Tiada diskaun dijumpai berdekatan',
        loadingLocation: 'Mendapatkan lokasi anda...',
        locationError: 'Tidak dapat mendapatkan lokasi anda'
      }
    },
    howItWorks: {
      title: 'Bagaimana Ia Berfungsi',
      description: 'Mendapatkan bantuan adalah mudah dan jelas',
      steps: [
        'Pilih kategori masalah anda',
        'Pilih jenis isu tertentu',
        'Dapatkan panduan dan sumber yang diperibadikan'
      ]
    },
    footer: 'Tersedia 24/7 dalam bahasa anda'
  }
};
