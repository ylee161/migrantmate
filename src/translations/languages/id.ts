import { Translation } from '../types';

export const id: Translation = {
  code: 'id',
  name: 'Bahasa Indonesia',
  flag: '🇮🇩',
  content: {
    title: 'Bagaimana Kami Dapat Membantu Anda?',
    subtitle: 'Pilih Kategori Masalah Anda',
    description: 'Pilih kategori yang paling menggambarkan situasi Anda. Kami di sini untuk memberikan panduan dan dukungan bagi pekerja asing di Singapura.',
    menuTitle: 'Apa yang membawa Anda ke sini hari ini?',
    greetings: {
      morning: 'Selamat Pagi',
      afternoon: 'Selamat Siang',
      evening: 'Selamat Malam'
    },
    needHelpTitle: 'Butuh Bantuan?',
    needHelpDescription: 'Dapatkan bantuan dengan masalah yang Anda hadapi',
    activitiesTitle: 'Mencari kegiatan?',
    activitiesDescription: 'Temukan kegiatan dan pilihan hiburan',
    chatbotTitle: 'Bicara dengan chatbot kami',
    chatbotDescription: 'Dapatkan jawaban instan untuk pertanyaan Anda',
    charitiesTitle: 'Badan Amal & Otoritas',
    charitiesDescription: 'Temukan organisasi yang dapat membantu Anda',
    backButton: 'Kembali ke Menu',
    clickToGetHelp: 'Klik untuk mendapatkan bantuan',
    clickToExpand: 'Klik untuk melihat opsi',
    categories: {
      financial: 'Masalah Keuangan',
      food: 'Masalah Makanan',
      housing: 'Masalah Perumahan',
      legal: 'Sengketa Hukum',
      travel: 'Masalah Perjalanan Pulang',
      health: 'Masalah Kesehatan'
    },
    helpCategories: {
      financial: {
        salaryIssues: {
          title: 'Masalah Gaji',
          description: 'Upah yang belum dibayar, pembayaran tertunda, atau sengketa gaji'
        },
        debtManagement: {
          title: 'Manajemen Utang',
          description: 'Bantuan mengelola pinjaman dan utang'
        },
        bankingProblems: {
          title: 'Masalah Perbankan',
          description: 'Masalah dengan rekening bank, kartu, atau transaksi'
        },
        remittanceIssues: {
          title: 'Masalah Pengiriman Uang',
          description: 'Masalah mengirim uang pulang'
        },
        budgetingHelp: {
          title: 'Bantuan Anggaran',
          description: 'Belajar mengelola uang Anda dengan lebih baik'
        },
        emergencyFunds: {
          title: 'Bantuan Keuangan Darurat',
          description: 'Akses ke bantuan keuangan darurat'
        }
      },
      food: {
        halalFood: {
          title: 'Pilihan Makanan Halal',
          description: 'Temukan restoran dan toko kelontong bersertifikat halal'
        },
        dietaryRestrictions: {
          title: 'Pembatasan Diet',
          description: 'Pilihan makanan vegetarian, vegan, atau ramah alergi'
        },
        foodBanks: {
          title: 'Bank Makanan & Bantuan',
          description: 'Akses ke program makanan gratis atau bersubsidi'
        },
        affordableGroceries: {
          title: 'Bahan Makanan Terjangkau',
          description: 'Temukan supermarket dan pasar yang ramah anggaran'
        },
        cookingFacilities: {
          title: 'Fasilitas Memasak',
          description: 'Akses ke dapur bersama dan ruang memasak'
        },
        mealPlanning: {
          title: 'Tips Perencanaan Makanan',
          description: 'Belajar merencanakan makanan bergizi dengan anggaran'
        }
      },
      housing: {
        rentIssues: {
          title: 'Masalah Sewa',
          description: 'Pembayaran terlambat, sengketa, atau kenaikan sewa'
        },
        maintenanceProblems: {
          title: 'Masalah Pemeliharaan',
          description: 'Perbaikan, pipa, listrik, atau masalah AC'
        },
        roommateConflicts: {
          title: 'Konflik Teman Sekamar',
          description: 'Sengketa dengan teman sekamar atau masalah hidup bersama'
        },
        housingSearch: {
          title: 'Pencarian Perumahan',
          description: 'Temukan akomodasi yang terjangkau dan sesuai'
        },
        leaseAgreements: {
          title: 'Perjanjian Sewa',
          description: 'Memahami kontrak sewa dan hak penyewa'
        },
        utilitiesSetup: {
          title: 'Pengaturan Utilitas',
          description: 'Mengatur air, listrik, dan internet'
        }
      },
      legal: {
        workPermit: {
          title: 'Masalah Izin Kerja',
          description: 'Perpanjangan, transfer, atau pelanggaran izin kerja'
        },
        employmentContract: {
          title: 'Kontrak Kerja',
          description: 'Memahami kontrak dan kewajiban Anda'
        },
        workplaceRights: {
          title: 'Hak di Tempat Kerja',
          description: 'Ketahui hak Anda sebagai pekerja asing'
        },
        legalAdvice: {
          title: 'Nasihat Hukum',
          description: 'Layanan konsultasi hukum gratis atau terjangkau'
        },
        documentTranslation: {
          title: 'Terjemahan Dokumen',
          description: 'Layanan terjemahan untuk dokumen hukum'
        }
      },
      travel: {
        flightBooking: {
          title: 'Pemesanan Penerbangan',
          description: 'Temukan penerbangan dan penawaran perjalanan terjangkau'
        },
        travelDocuments: {
          title: 'Dokumen Perjalanan',
          description: 'Bantuan paspor, visa, dan izin perjalanan'
        },
        leaveApproval: {
          title: 'Persetujuan Cuti',
          description: 'Mendapatkan persetujuan dari pemberi kerja untuk kunjungan pulang'
        },
        travelInsurance: {
          title: 'Asuransi Perjalanan',
          description: 'Pilihan asuransi perjalanan terjangkau'
        },
        emergencyTravel: {
          title: 'Perjalanan Darurat',
          description: 'Perjalanan mendesak karena keadaan darurat keluarga'
        }
      },
      health: {
        medicalAppointments: {
          title: 'Janji Medis',
          description: 'Pesan janji dengan dokter dan spesialis'
        },
        healthInsurance: {
          title: 'Asuransi Kesehatan',
          description: 'Memahami cakupan medis dan klaim Anda'
        },
        prescriptions: {
          title: 'Resep',
          description: 'Mendapatkan obat dan resep'
        },
        mentalHealth: {
          title: 'Dukungan Kesehatan Mental',
          description: 'Konseling dan sumber daya kesejahteraan mental'
        },
        emergencyMedical: {
          title: 'Perawatan Medis Darurat',
          description: 'Perhatian medis mendesak dan layanan darurat'
        },
        healthCheckups: {
          title: 'Pemeriksaan Kesehatan',
          description: 'Pemeriksaan kesehatan rutin dan perawatan pencegahan'
        }
      }
    },
    activities: {
      title: 'Mencari kegiatan?',
      subtitle: 'Terhubung dengan komunitas Anda dan temukan penawaran hebat',
      socialActivities: {
        title: 'Kegiatan Sosial',
        description: 'Temukan orang di dekat Anda yang merencanakan kegiatan!'
      },
      communityEvents: {
        title: 'Acara Komunitas',
        description: 'Bergabung dengan festival budaya dan pertemuan komunitas'
      },
      discountsNearYou: {
        title: 'Diskon di Dekat Anda',
        description: 'Temukan penawaran hebat untuk belanja, makanan, dan layanan di sekitar'
      },
      foodPlaces: {
        title: 'Tempat Makan dengan Diskon',
        description: 'Temukan restoran dan pusat jajanan dengan penawaran khusus'
      },
      shoppingPlaces: {
        title: 'Tempat Belanja dengan Diskon',
        description: 'Temukan pasar dan toko dengan penawaran hebat'
      }
    },
    discounts: {
      pageTitle: 'Diskon di Dekat Anda',
      subtitle: 'Hemat uang dengan penawaran eksklusif di sekitar',
      categories: {
        all: 'Semua Diskon',
        food: 'Makanan & Makan',
        shopping: 'Belanja',
        entertainment: 'Hiburan',
        services: 'Layanan',
        transportation: 'Transportasi'
      },
      labels: {
        distance: 'Jarak',
        validUntil: 'Berlaku Hingga',
        discount: 'Diskon',
        terms: 'Syarat & Ketentuan',
        location: 'Lokasi',
        contact: 'Kontak',
        viewDetails: 'Lihat Detail',
        getDirections: 'Dapatkan Arah',
        refreshLocation: 'Segarkan Lokasi',
        nearbyDiscounts: 'Diskon Terdekat',
        noDiscounts: 'Tidak ada diskon ditemukan di sekitar',
        loadingLocation: 'Mendapatkan lokasi Anda...',
        locationError: 'Tidak dapat mendapatkan lokasi Anda'
      }
    },
    howItWorks: {
      title: 'Cara Kerjanya',
      description: 'Mendapatkan bantuan sederhana dan mudah',
      steps: [
        'Pilih kategori masalah Anda',
        'Pilih jenis masalah spesifik',
        'Dapatkan panduan dan sumber daya yang dipersonalisasi'
      ]
    },
    footer: 'Tersedia 24/7 dalam bahasa Anda'
  }
};
