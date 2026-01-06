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
      fullName: 'Akhmad Lutfiyan Aji, S.T.,S.H',
      photo: '/images/groom.jpg',
      parents: {
        father: 'Bapak H. Muhlasin, S.Pd.,M.Pd ',
        mother: 'Ibu Hj. Zulinartati, S.Pd'
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
        start: '08:00 WIB',
        end: 'Selesai'
      },
      venue: {
        name: 'Dsn. Silegi, Desa Tlogobulu, Kec. Kaligesing, Kab. Purworejo',
        address: 'Dsn. Silegi, Desa Tlogobulu, Kec. Kaligesing, Kab. Purworejo',
        mapUrl: 'https://maps.google.com',
        coordinates: {
          lat: -7.7000,
          lng: 110.1100
        }
      }
    },
    {
      id: 'resepsi-1',
      type: 'resepsi',
      title: 'Ngunduh Mantu',
      date: new Date('2026-01-24T10:00:00'),
      time: {
        start: '10:00',
        end: '14:00 WIB'
      },
      venue: {
        name: 'Gedung Ganesha Purworejo',
        address: 'JL. Kol Sugiono No.62, Kepatihan, Purworejo',
        mapUrl: 'https://maps.app.goo.gl/DpDQwQRAfNjuNgin9',
        coordinates: {
          lat: -7.7097322,
          lng: 110.0143547
        }
      }
    },
    
  ],
  gifts: {
    bankAccounts: [
      {
        bank: 'Bank BRI',
        accountNumber: '007801063270504',
        accountName: 'Akhmad Lutfiyan Aji'
      },
      {
        bank: 'Bank BCA',
        accountNumber: '2350620691',
        accountName: 'Khofifah Ery Nur Aeini'
      }
    ],
    message: 'Doa restu Anda merupakan karunia yang sangat berarti bagi kami. Dan jika memberi adalah ungkapan tanda kasih Anda, Anda dapat memberi kado secara cashless.'
  },
  guestbookEntries: [],
  musicUrl: '/sound/muara.mp3'
};