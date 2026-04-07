import { Level, GeneratedData } from '../types';

const translitMap: { [key: string]: string } = {
  'а': 'a', 'б': 'b', 'в': 'v', 'г': 'h', 'ґ': 'g', 'д': 'd', 'е': 'e', 'є': 'ye', 'ж': 'zh', 'з': 'z',
  'и': 'y', 'і': 'i', 'ї': 'yi', 'й': 'y', 'к': 'k', 'л': 'l', 'м': 'm', 'н': 'n', 'о': 'o', 'п': 'p',
  'р': 'r', 'с': 's', 'т': 't', 'у': 'u', 'ф': 'f', 'х': 'kh', 'ц': 'ts', 'ч': 'ch', 'ш': 'sh', 'щ': 'shch',
  'ь': '', 'ю': 'yu', 'я': 'ya',
  'А': 'A', 'Б': 'B', 'В': 'V', 'Г': 'H', 'Ґ': 'G', 'Д': 'D', 'Е': 'E', 'Є': 'Ye', 'Ж': 'Zh', 'З': 'Z',
  'И': 'Y', 'І': 'I', 'Ї': 'Yi', 'Й': 'Y', 'К': 'K', 'Л': 'L', 'М': 'M', 'Н': 'N', 'О': 'O', 'П': 'P',
  'Р': 'R', 'С': 'S', 'Т': 'T', 'У': 'U', 'Ф': 'F', 'Х': 'Kh', 'Ц': 'Ts', 'Ч': 'Ch', 'Ш': 'Sh', 'Щ': 'Shch',
  'Ь': '', 'Ю': 'Yu', 'Я': 'Ya'
};

function transliterate(text: string): string {
  return text.split('').map(char => translitMap[char] || char).join('');
}

const maleFirstNamesUA = [
  'Олександр', 'Андрій', 'Дмитро', 'Сергій', 'Іван', 'Василь', 'Микола', 'Петро', 'Юрій', 'Володимир',
  'Степан', 'Михайло', 'Ярослав', 'Анатолій', 'Віктор', 'Олег', 'Павло', 'Антон', 'Максим', 'Денис',
  'Артем', 'Роман', 'Богдан', 'Тарас', 'Назар', 'Владислав', 'Данило', 'Євген', 'Ігор', 'Костянтин',
  'Леонід', 'Марк', 'Матвій', 'Ростислав', 'Станіслав', 'Тимофій', 'Валентин', 'Григорій', 'Олексій', 'Руслан'
];

const femaleFirstNamesUA = [
  'Марія', 'Олена', 'Тетяна', 'Наталія', 'Оксана', 'Юлія', 'Світлана', 'Ірина', 'Ольга', 'Галина',
  'Надія', 'Любов', 'Валентина', 'Людмила', 'Ніна', 'Лариса', 'Тамара', 'Раїса', 'Ганна', 'Зоя',
  'Євгенія', 'Марина', 'Олександра', 'Вікторія', 'Алла', 'Анастасія', 'Анна', 'Богдана', 'Вероніка', 'Дарина',
  'Діана', 'Єлизавета', 'Злата', 'Катерина', 'Крістіна', 'Ксенія', 'Маргарита', 'Мирослава', 'Софія', 'Христина'
];

const maleLastNamesUA = [
  'Шевченко', 'Коваленко', 'Бондаренко', 'Ткаченко', 'Кравченко', 'Марченко', 'Лисенко', 'Мороз',
  'Савченко', 'Петренко', 'Ковальчук', 'Мельник', 'Шевчук', 'Поліщук', 'Ткачук', 'Козак',
  'Павленко', 'Мазур', 'Кравчук', 'Олійник', 'Гончар', 'Зайцев', 'Клименко', 'Павлюк', 'Кузьменко',
  'Пономаренко', 'Василенко', 'Левченко', 'Харченко', 'Сидоренко', 'Карпенко', 'Гаврилюк', 'Мельничук',
  'Дяченко', 'Коваль', 'Коломієць', 'Яковенко', 'Онищенко', 'Степаненко', 'Романенко', 'Бойко', 'Денисенко',
  'Власенко', 'Дорошенко', 'Лук\'яненко', 'Бабенко', 'Сорока', 'Білоус', 'Костюк', 'Савчук',
  'Руденко', 'Терещенко', 'Щербак', 'Кушнір', 'Хоменко', 'Даниленко', 'Приходько', 'Колесник', 'Гончаренко',
  'Дмитренко', 'Мартинюк', 'Андрущенко', 'Кириченко', 'Гриценко', 'Остапенко', 'Пащенко', 'Бережний', 'Кулик',
  'Нестеренко', 'Герасименко', 'Прокопенко', 'Авраменко', 'Федоренко', 'Тищенко', 'Литвиненко',
  'Савенко', 'Дзюба', 'Кононенко', 'Мироненко', 'Пилипенко', 'Чумак', 'Яценко', 'Гордієнко', 'Слюсар',
  'Ковальський', 'Ярошенко', 'Омельченко', 'Бондар', 'Кучер', 'Грищенко', 'Король', 'Мельниченко', 'Стеценко',
  'Іванов', 'Петров', 'Сидоров', 'Смирнов', 'Кузнецов', 'Попов', 'Васильєв', 'Соколов', 'Михайлов', 'Новіков',
  'Федоров', 'Морозов', 'Волков', 'Алексєєв', 'Лебедєв', 'Семенов', 'Єгоров', 'Павлов', 'Козлов', 'Степанов',
  'Ніколаєв', 'Орлов', 'Андрєєв', 'Макаров', 'Нікітін', 'Захаров', 'Соловйов', 'Борисов', 'Яковлєв',
  'Григор\'єв', 'Романов', 'Воробйов', 'Сергєєв', 'Кузьмін', 'Фролов', 'Олександров', 'Дмитрієв', 'Корольов', 'Пономарьов',
  'Антоненко', 'Барабаш', 'Безпалько', 'Білик', 'Вакуленко', 'Гавриш', 'Гнатюк', 'Головко', 'Гончарук', 'Данилюк',
  'Довженко', 'Захарченко', 'Іваненко', 'Іванчук', 'Кирилюк', 'Литвин', 'Макаренко', 'Назаренко', 'Панченко', 'Пахомов',
  'Романюк', 'Семенюк', 'Федорчук', 'Цимбалюк', 'Чайка', 'Черненко', 'Швець', 'Юрченко', 'Яремчук'
];

function getFemaleLastNameUA(lastName: string): string {
  if (lastName.endsWith('ов')) return lastName + 'а';
  if (lastName.endsWith('єв')) return lastName + 'а';
  if (lastName.endsWith('ев')) return lastName + 'а';
  if (lastName.endsWith('ин')) return lastName + 'а';
  if (lastName.endsWith('ін')) return lastName + 'а';
  if (lastName.endsWith('їн')) return lastName + 'а';
  if (lastName.endsWith('ий')) return lastName.slice(0, -2) + 'а';
  if (lastName.endsWith('ій')) return lastName.slice(0, -2) + 'а';
  if (lastName.endsWith('ський')) return lastName.slice(0, -2) + 'а';
  if (lastName.endsWith('цький')) return lastName.slice(0, -2) + 'а';
  if (lastName.endsWith('ёв')) return lastName.slice(0, -1) + 'а';
  if (lastName.endsWith('ый')) return lastName.slice(0, -2) + 'ая';
  return lastName;
}

const maleFirstNamesINT = ['John', 'Michael', 'Robert', 'William', 'James', 'Hans', 'Piotr', 'Krzysztof', 'Thomas', 'David', 'Pierre', 'Marco', 'Carlos', 'Erik', 'Lars'];
const femaleFirstNamesINT = ['Emma', 'Sophia', 'Olivia', 'Ava', 'Isabella', 'Helga', 'Agnieszka', 'Kasia', 'Sarah', 'Laura', 'Marie', 'Giulia', 'Elena', 'Astrid', 'Ingrid'];

const lastNamesINT = [
  'Johnson', 'Smith', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez',
  'Müller', 'Schmidt', 'Nowak', 'Kowalski', 'Wiśniewski', 'Wójcik', 'Taylor', 'Anderson', 'Wilson', 'Moore',
  'White', 'Harris', 'Martin', 'Thompson', 'Jackson', 'Lopez', 'Lee', 'Gonzalez', 'Harris', 'Clark',
  'Lewis', 'Robinson', 'Walker', 'Young', 'Allen', 'King', 'Wright', 'Scott', 'Torres', 'Nguyen',
  'Hill', 'Flores', 'Green', 'Adams', 'Nelson', 'Baker', 'Hall', 'Rivera', 'Campbell', 'Mitchell'
];

function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomElement<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateId() {
  return Math.random().toString(36).substring(2, 10).toUpperCase();
}

function formatDate(date: Date, level: Level): string {
  if (level === 'easy') {
    return date.toISOString().split('T')[0];
  }
  if (level === 'medium') {
    const formats = [
      (d: Date) => d.toISOString().split('T')[0],
      (d: Date) => `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`,
    ];
    return getRandomElement(formats)(date);
  }
  const hardFormats = [
    (d: Date) => d.toISOString().split('T')[0],
    (d: Date) => `${d.getDate()}-${d.getMonth() + 1}-${d.getFullYear()}`,
    (d: Date) => d.toDateString(),
    (d: Date) => `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear().toString().slice(-2)}`,
  ];
  return getRandomElement(hardFormats)(date);
}

export function generateData(level: Level): GeneratedData {
  const startDate = new Date('2026-01-01T00:00:00Z');
  const endDateEasy = new Date('2026-03-31T23:59:59Z');
  const now = new Date();
  
  const effectiveNow = level === 'easy' ? endDateEasy : now;
  
  const rows: any[] = [];
  let userCount = 0;

  if (level === 'easy') {
    userCount = 1000;
  } else if (level === 'medium') {
    userCount = 6000;
  } else {
    userCount = 20000;
  }

  const headers = level === 'easy' 
    ? ['ID_Користувача', 'Ім\'я', 'Прізвище', 'Email', 'Телефон', 'Дата_Реєстрації', 'Остання_Активність', 'Дата_Покупки', 'Сума_Покупки', 'Статус_Активності']
    : ['User_ID', 'First_Name', 'Last_Name', 'Email', 'Phone', 'Registration_Date', 'Last_Activity_Date', 'Last_Purchase_Date', 'Total_Spent', 'Status', 'Channel', 'Age', 'Gender', 'Rating'];
  
  if (level === 'hard') {
    headers.push('Product_Name', 'Subscription_Type', 'Trial_Used', 'Device_Type', 'Country', 'Session_Count');
  } else if (level === 'medium') {
    headers.push('Product_Name');
  }

  const channels = ['Google Ads', 'Facebook Ads', 'YouTube', 'Organic', 'Unknown', 'Instagram', 'TikTok'];
  const countries = [
    { 
      name: 'Ukraine', 
      code: '+380', 
      operators: ['50', '66', '95', '99', '67', '68', '96', '97', '98', '63', '73', '93'],
      domains: ['ukr.net', 'gmail.com', 'outlook.com'] 
    },
    { 
      name: 'USA', 
      code: '+1', 
      operators: ['212', '310', '415', '646', '718', '305', '312', '202', '617'],
      domains: ['gmail.com', 'icloud.com', 'me.com', 'yahoo.com'] 
    },
    { 
      name: 'Poland', 
      code: '+48', 
      operators: ['50', '51', '60', '66', '69', '72', '73', '78', '79', '88'],
      domains: ['wp.pl', 'onet.pl', 'gmail.com', 'o2.pl'] 
    },
    { 
      name: 'Germany', 
      code: '+49', 
      operators: ['151', '152', '157', '160', '162', '170', '171', '172', '175'],
      domains: ['web.de', 'gmx.de', 'gmail.com', 't-online.de'] 
    },
    { 
      name: 'UK', 
      code: '+44', 
      operators: ['74', '75', '77', '78', '79'],
      domains: ['btinternet.com', 'sky.com', 'gmail.com', 'virginmedia.com'] 
    }
  ];

  const usedSurnames = new Set<string>();
  const usedEmails = new Set<string>();

  for (let i = 0; i < userCount; i++) {
    let country = countries[0];
    if (level === 'hard') {
      country = getRandomElement(countries);
    }

    const regTime = getRandomInt(startDate.getTime(), effectiveNow.getTime());
    const regDate = new Date(regTime);
    
    let age = getRandomInt(18, 45);
    if (Math.random() > 0.7) age = getRandomInt(46, 60);
    if (Math.random() > 0.9) age = getRandomInt(61, 80);

    let gender = '';
    const genderRand = Math.random();
    if (genderRand < 0.8) {
      gender = Math.random() > 0.5 ? 'Male' : 'Female';
    } else if (genderRand < 0.92) {
      gender = 'Other';
    } else {
      gender = '';
    }

    let firstName = '';
    let lastName = '';

    const isMale = gender === 'Male' || (gender === '' && Math.random() > 0.5) || (gender === 'Other' && Math.random() > 0.5);

    if (level === 'easy') {
      firstName = isMale ? getRandomElement(maleFirstNamesUA) : getRandomElement(femaleFirstNamesUA);
      lastName = getRandomElement(maleLastNamesUA);
      if (!isMale) lastName = getFemaleLastNameUA(lastName);
      
      let attempts = 0;
      while (usedSurnames.has(lastName) && attempts < 500) {
        lastName = getRandomElement(maleLastNamesUA);
        if (!isMale) lastName = getFemaleLastNameUA(lastName);
        attempts++;
      }
      usedSurnames.add(lastName);
    } else if (level === 'medium') {
      const isForeignStyle = Math.random() > 0.85;
      if (isForeignStyle) {
        firstName = isMale ? getRandomElement(maleFirstNamesUA) : getRandomElement(femaleFirstNamesUA);
        lastName = getRandomElement(lastNamesINT);
        country = getRandomElement(countries.slice(1));
      } else {
        firstName = isMale ? getRandomElement(maleFirstNamesUA) : getRandomElement(femaleFirstNamesUA);
        lastName = getRandomElement(maleLastNamesUA);
        if (!isMale) lastName = getFemaleLastNameUA(lastName);
      }
      
      let attempts = 0;
      while (usedSurnames.has(lastName) && attempts < 500) {
        if (isForeignStyle) {
          lastName = getRandomElement(lastNamesINT);
        } else {
          lastName = getRandomElement(maleLastNamesUA);
          if (!isMale) lastName = getFemaleLastNameUA(lastName);
        }
        attempts++;
      }
      usedSurnames.add(lastName);
    } else {
      const isUA = country.name === 'Ukraine';
      if (isUA) {
        firstName = isMale ? getRandomElement(maleFirstNamesUA) : getRandomElement(femaleFirstNamesUA);
        lastName = getRandomElement(maleLastNamesUA);
        if (!isMale) lastName = getFemaleLastNameUA(lastName);
      } else {
        firstName = isMale ? getRandomElement(maleFirstNamesINT) : getRandomElement(femaleFirstNamesINT);
        lastName = getRandomElement(lastNamesINT);
      }

      if (Math.random() > 0.05) {
        let attempts = 0;
        while (usedSurnames.has(lastName) && attempts < 500) {
          if (isUA) {
            lastName = getRandomElement(maleLastNamesUA);
            if (!isMale) lastName = getFemaleLastNameUA(lastName);
          } else {
            lastName = getRandomElement(lastNamesINT);
          }
          attempts++;
        }
      }
      usedSurnames.add(lastName);
    }

    const rawFirstName = firstName;
    const rawLastName = lastName;

    if (level !== 'easy') {
      const styleRand = Math.random();
      if (styleRand > 0.95) {
        firstName = firstName.toUpperCase();
        lastName = lastName.toUpperCase();
      } else if (styleRand > 0.9) {
        firstName = firstName.toLowerCase();
        lastName = lastName.toLowerCase();
      } else if (styleRand > 0.85) {
        firstName = `${firstName.charAt(0)}.`;
      }
    }

    const emailFirstName = transliterate(rawFirstName.replace(/[\s.]/g, '').toLowerCase());
    const emailLastName = transliterate(rawLastName.replace(/[\s.]/g, '').toLowerCase());
    
    const emailPatterns = [
      () => `${emailFirstName}.${emailLastName}`,
      () => `${emailLastName}.${emailFirstName}`,
      () => `${emailFirstName.charAt(0)}${emailLastName}`,
      () => `${emailFirstName}${emailLastName.charAt(0)}`,
      () => `${emailLastName}${getRandomInt(1970, 2010)}`,
      () => `user_${getRandomInt(1000, 9999)}`,
      () => `pro_analyst_${getRandomInt(1, 100)}`,
      () => `${emailFirstName}_${getRandomInt(10, 99)}`,
    ];
    
    let emailPrefix = getRandomElement(emailPatterns)();
    let email = `${emailPrefix}@${getRandomElement(country.domains)}`;
    
    let emailAttempts = 0;
    while (usedEmails.has(email) && emailAttempts < 50) {
      emailPrefix = getRandomElement(emailPatterns)();
      email = `${emailPrefix}@${getRandomElement(country.domains)}`;
      emailAttempts++;
    }
    
    email = email.replace(/[^a-zA-Z0-9.@_-]/g, '');
    email = email.replace(/\s/g, '');
    usedEmails.add(email);
    
    const operator = getRandomElement(country.operators);
    const subscriber = getRandomInt(1000000, 9999999);
    let phone = `${country.code}${operator}${subscriber}`;

    if (level !== 'easy' && country.name === 'Ukraine') {
      const formats = [
        (p: string) => p,
        (p: string) => p.replace('+380', '0'),
        (p: string) => p.replace(/(\d{3})(\d{2})(\d{3})(\d{2})(\d{2})/, '$1 ($2) $3-$4-$5'),
        (p: string) => p.replace('+380', '80'),
      ];
      phone = getRandomElement(formats)(phone);
    }

    const channel = getRandomElement(channels);

    if (level === 'easy') {
      const rand = Math.random();
      let purchaseCount = 0;
      if (rand < 0.3) purchaseCount = 0; 
      else if (rand < 0.7) purchaseCount = 1; 
      else if (rand < 0.9) purchaseCount = 2; 
      else purchaseCount = getRandomInt(3, 5);

      let latestPurchaseTime = regTime;
      const purchases: { date: Date, amount: string }[] = [];

      for (let p = 0; p < purchaseCount; p++) {
        const pTime = getRandomInt(regTime, effectiveNow.getTime());
        if (pTime > latestPurchaseTime) latestPurchaseTime = pTime;
        purchases.push({
          date: new Date(pTime),
          amount: (Math.random() * 200 + 10).toFixed(2)
        });
      }

      const lastActivityTime = getRandomInt(latestPurchaseTime, effectiveNow.getTime());
      const lastActivityDate = new Date(lastActivityTime);
      
      const daysSinceActivity = (effectiveNow.getTime() - lastActivityTime) / (1000 * 60 * 60 * 24);
      const status = (purchaseCount > 0 && daysSinceActivity <= 30) ? 'Активний' : 'Неактивний';

      const baseUser = {
        'ID_Користувача': generateId(),
        'Ім\'я': firstName,
        'Прізвище': lastName,
        'Email': email,
        'Телефон': phone,
        'Дата_Реєстрації': formatDate(regDate, level),
        'Остання_Активність': formatDate(lastActivityDate, level),
        'Статус_Активності': status,
      };

      if (purchaseCount === 0) {
        rows.push({
          ...baseUser,
          'Дата_Покупки': '',
          'Сума_Покупки': ''
        });
      } else {
        purchases.forEach(p => {
          rows.push({
            ...baseUser,
            'Дата_Покупки': formatDate(p.date, level),
            'Сума_Покупки': p.amount
          });
        });
      }
    } else {
      let product = getRandomElement(['Product 1', 'Product 2']);
      if (level === 'hard') {
        product = getRandomElement(['Free App A', 'Free App B', 'SaaS Pro X', 'SaaS Pro Y']);
      }

      let subType = 'None';
      let trialUsed = product.includes('SaaS') ? 'Yes' : 'No';
      let totalSpent = 0;
      let latestEventTime = regTime;
      let sessionCount = getRandomInt(1, 10);

      if (level === 'hard') {
        if (product.startsWith('Free')) {
          const subRand = Math.random();
          if (subRand > 0.6) {
            subType = getRandomElement(['Premium Monthly', 'Premium 6-Months', 'Premium Annual']);
            const multiplier = subType.includes('Annual') ? 12 : subType.includes('6-Months') ? 6 : 1;
            totalSpent = multiplier * 9.99;
            sessionCount = getRandomInt(50, 500);
            latestEventTime = getRandomInt(regTime, effectiveNow.getTime());
          } else {
            subType = 'Free';
            totalSpent = 0;
            sessionCount = getRandomInt(1, 20);
            latestEventTime = getRandomInt(regTime, Math.min(effectiveNow.getTime(), regTime + 14 * 24 * 60 * 60 * 1000));
          }
        } else {
          const converted = Math.random() > 0.4;
          trialUsed = 'Yes';
          if (converted) {
            subType = getRandomElement(['Monthly Subscription', '6-Months Subscription', 'Annual Subscription']);
            const multiplier = subType.includes('Annual') ? 12 : subType.includes('6-Months') ? 6 : 1;
            totalSpent = multiplier * 29.99;
            sessionCount = getRandomInt(100, 1000);
            latestEventTime = getRandomInt(regTime + 7 * 24 * 60 * 60 * 1000, effectiveNow.getTime());
          } else {
            subType = 'Trial Expired';
            totalSpent = 0;
            sessionCount = getRandomInt(1, 15);
            latestEventTime = regTime + getRandomInt(1, 7) * 24 * 60 * 60 * 1000;
            if (latestEventTime > effectiveNow.getTime()) latestEventTime = effectiveNow.getTime();
          }
        }
      } else {
        const purchaseCount = Math.random() > 0.5 ? getRandomInt(1, 3) : 0;
        if (purchaseCount > 0) {
          totalSpent = purchaseCount * getRandomInt(20, 100);
          latestEventTime = getRandomInt(regTime, effectiveNow.getTime());
          sessionCount = getRandomInt(20, 100);
        } else {
          latestEventTime = getRandomInt(regTime, Math.min(effectiveNow.getTime(), regTime + 30 * 24 * 60 * 60 * 1000));
          sessionCount = getRandomInt(1, 10);
        }
      }

      const lastActivityTime = getRandomInt(latestEventTime, effectiveNow.getTime());
      const lastActivityDate = new Date(lastActivityTime);
      const daysSinceActivity = (effectiveNow.getTime() - lastActivityTime) / (1000 * 60 * 60 * 24);
      
      let rating = getRandomInt(1, 3);
      if (totalSpent > 0 && daysSinceActivity <= 30) rating = getRandomInt(4, 5);
      else if (totalSpent > 0) rating = getRandomInt(3, 4);

      const status = (daysSinceActivity <= 30) ? 'Active' : 'Inactive';

      let device = getRandomElement(['iOS', 'Android', 'Web', 'Desktop']);
      if (level === 'hard' && country.name === 'USA') {
        device = Math.random() > 0.2 ? getRandomElement(['iOS', 'Desktop']) : getRandomElement(['Android', 'Web']);
      }

      const row: any = {
        User_ID: generateId(),
        First_Name: firstName,
        Last_Name: lastName,
        Email: email,
        Phone: phone,
        Registration_Date: formatDate(regDate, level),
        Last_Activity_Date: formatDate(lastActivityDate, level),
        Last_Purchase_Date: totalSpent > 0 ? formatDate(new Date(latestEventTime), level) : '',
        Total_Spent: totalSpent.toFixed(2),
        Status: status,
        Channel: channel,
        Age: age,
        Gender: gender,
        Rating: rating,
      };

      if (level === 'medium') {
        row.Product_Name = product;
      }

      if (level === 'hard') {
        row.Product_Name = product;
        row.Subscription_Type = subType;
        row.Trial_Used = trialUsed;
        row.Device_Type = device;
        row.Country = country.name;
        row.Session_Count = sessionCount;
      }
      rows.push(row);
    }
  }

  if (level === 'easy') {
    for (let i = rows.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [rows[i], rows[j]] = [rows[j], rows[i]];
    }
  }

  return { headers, rows };
}
