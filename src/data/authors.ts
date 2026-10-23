export interface Author {
  slug: string;
  name: string;
  nameEn: string;
  role: string;
  bio: string;
  color: string;
}

export const AUTHORS: Author[] = [
  { slug: 'riya-sharma', name: 'रिया शर्मा', nameEn: 'Riya Sharma', role: 'सीनियर कॉरेस्पॉन्डेंट', bio: 'रिया पॉलिसी, शहर और युवाओं से जुड़े मुद्दों पर लिखती हैं। खाली वक्त में स्ट्रीट फूड और पुरानी किताबें ढूंढती हैं।', color: '#8b0000' },
  { slug: 'aman-verma', name: 'अमन वर्मा', nameEn: 'Aman Verma', role: 'टेक एडिटर', bio: 'अमन को गैजेट्स खोलकर देखने और AI टूल्स को आसान भाषा में समझाने का शौक है। गेमिंग उनका दूसरा प्यार है।', color: '#1546a0' },
  { slug: 'sana-qureshi', name: 'सना कुरैशी', nameEn: 'Sana Qureshi', role: 'लाइफस्टाइल और हेल्थ राइटर', bio: 'सना वेलनेस, रिश्तों और ट्रैवल पर लिखती हैं। उनका मानना है कि अच्छी नींद सबसे सस्ता सुपरफूड है।', color: '#00796b' },
  { slug: 'kabir-mehta', name: 'कबीर मेहता', nameEn: 'Kabir Mehta', role: 'एंटरटेनमेंट और स्पोर्ट्स', bio: 'कबीर फिल्मों, OTT और खेल की दुनिया को कवर करते हैं। हर शुक्रवार नई रिलीज़ देखना उनका नियम है।', color: '#6a1b9a' },
  { slug: 'neha-joshi', name: 'नेहा जोशी', nameEn: 'Neha Joshi', role: 'एक्सप्लेनर और करियर डेस्क', bio: 'नेहा मुश्किल विषयों को आसान बनाती हैं — इकोनॉमी से लेकर क्लाइमेट तक। पहले डेटा, फिर राय।', color: '#4527a0' },
];

export const getAuthor = (slug: string) => AUTHORS.find((a) => a.slug === slug)!;
