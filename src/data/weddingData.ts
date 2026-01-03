import { WeddingInvitation } from '@/types/wedding';

export const weddingData: WeddingInvitation = {
  couple: {
    bride: {
      name: 'Ery',
      fullName: 'Khofifah Ery Nur Aeini, A.Md.Gz',
      photo: '/images/bride.jpg',
      parents: {
        father: 'Bapak Pribadi & Ibu Karsinah (Almh)',
        mother: 'Ibu Supriyani, S.Pd'
      }
    },
    groom: {
      name: 'Ajik',
      fullName: 'Akhmad Lutfiyan Aji, S.T, S.H',
      photo: '/images/groom.jpg',
      parents: {
        father: 'Bapak H. Muhlasin',
        mother: 'Ibu Hj. Zulmartati'
      }
    },
    weddingDate: new Date('2026-01-24'),
    story: 'Ada saat dimana cinta tumbuh menjadi kekuatan, menguatkan dua jiwa ketika yang tak lagi terpisahkan. Hari ini adalah awal kisah itu, menghidupkan yang terbaik dalam diri kami dengan sepenuh hati. Semoga cinta ini untuk memberikan kebahagiaan bagi kami, juga menjadi berkah bagi semua yang mengikutinya.',
    spiritualQuote: 'Dan diantara tanda-tanda kebesaran-Nya ialah diciptakan-Nya untukmu pasangan hidup dari jenismu sendiri supaya kamu mendapat ketenangan hati dan dijadikan-Nya kasih sayang diantara kamu. Sesungguhnya yang demikian itu menjadi tanda-tanda kebesaran-Nya bagi orang-orang yang berfikir',
    timeline: [
      {
        id: 'first-sight',
        phase: 'Bab Pertama',
        title: 'Pertemuan Pertama',
        description: 'Takdir mempertemukan kami di saat yang tak pernah kami duga. Dari senyuman pertama hingga percakapan yang mengalir, kami tahu ada sesuatu yang istimewa di antara kami. Sebuah pertemuan yang sederhana namun berkesan, menjadi awal dari segalanya.',
        date: '2020',
        image: '/images/pre-wedding-images/19.jpg'
      },
      {
        id: 'the-journey',
        phase: 'Bab Kedua',
        title: 'Perjalanan Bersama',
        description: 'Waktu berlalu dan kami semakin mengenal satu sama lain. Setiap momen yang kami lalui bersama, setiap tawa dan air mata, menguatkan ikatan di antara kami. Kami belajar untuk saling memahami, mendukung, dan tumbuh bersama.',
        date: '2021 - 2023',
        image: '/images/pre-wedding-images/20.jpg'
      },
      {
        id: 'love-found',
        phase: 'Bab Ketiga',
        title: 'Cinta Menemukan Tempatnya',
        description: 'Di tengah perjalanan hidup yang penuh tantangan, cinta kami menemukan tempatnya. Kami menyadari bahwa kami adalah dua jiwa yang saling melengkapi. Dengan restu keluarga dan doa orang-orang terkasih, kami memutuskan untuk melanjutkan perjalanan ini bersama.',
        date: '2024',
        image: '/images/pre-wedding-images/1.jpg'
      },
      {
        id: 'forever',
        phase: 'Bab Keempat',
        title: 'Menghitung Hari Menuju Selamanya',
        description: 'Kini kami berdiri di ambang kehidupan baru, siap untuk menjalani komitmen suci pernikahan. Setiap hari yang kami hitung menuju hari bahagia itu adalah pengingat akan cinta yang terus tumbuh. Bersama, kami akan menulis kisah yang lebih indah, penuh cinta, kasih sayang, dan kebahagiaan.',
        date: '2025 - Selamanya',
        image: '/images/pre-wedding-images/2.jpg'
      }
    ]
  },
  events: [
    {
      id: 'akad',
      type: 'akad',
      title: 'Akad Nikah',
      date: new Date('2026-01-19T10:00:00'),
      time: {
        start: '10:00',
        end: '11:00'
      },
      venue: {
        name: 'Ds. Silog, Desa Tlogolalo, Kec. Kaliwungu, Kab. Purworejo',
        address: 'Desa Silog, Kec. Kaliwungu, Kabupaten Purworejo',
        mapUrl: 'https://maps.google.com'
      }
    },
    {
      id: 'resepsi-1',
      type: 'resepsi',
      title: 'Resepsi Pernikahan - Sesi 1',
      date: new Date('2026-01-24T10:00:00'),
      time: {
        start: '10:00',
        end: '12:00'
      },
      venue: {
        name: 'Gedung Ganesha Purworejo',
        address: 'Jl. Kel Sumeron No.62, Kec. Kajen, Kab. Purworejo',
        mapUrl: 'https://maps.google.com'
      }
    },
    {
      id: 'resepsi-2',
      type: 'resepsi',
      title: 'Resepsi Pernikahan - Sesi 2',
      date: new Date('2026-01-24T12:00:00'),
      time: {
        start: '12:00',
        end: '14:00'
      },
      venue: {
        name: 'Gedung Ganesha Purworejo',
        address: 'Jl. Kel Sumeron No.62, Kec. Kajen, Kab. Purworejo',
        mapUrl: 'https://maps.google.com'
      }
    }
  ],
  gifts: {
    bankAccounts: [
      {
        bank: 'Bank Mandiri',
        accountNumber: '1234567890',
        accountName: 'Khofifah Ery'
      },
      {
        bank: 'Bank BCA',
        accountNumber: '0987654321',
        accountName: 'Akhmad Lutfiyan Aji'
      }
    ],
    message: 'Kehadiran dan doa restu Anda adalah hadiah terbesar bagi kami. Namun jika ingin memberikan hadiah, Anda dapat mengirimkannya melalui:'
  },
  guestbookEntries: [],
  musicUrl: '/audio/wedding-song.mp3'
};