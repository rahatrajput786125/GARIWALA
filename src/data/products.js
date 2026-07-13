const allProducts = [
  {
    id: 'toyota-corolla',
    name: 'Toyota Corolla',
    model: 'ZRE172-AEXNKW',
    category: 'Cars',
    type: 'Sedan',
    inStock: true,
    image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=900&q=80&fit=crop',
    overview: 'The Toyota Corolla is the world\'s best-selling car, trusted by millions for its legendary reliability, fuel efficiency, and low cost of ownership. Built for Pakistan\'s diverse road conditions, it delivers a refined driving experience with modern safety features.',
    specs: ['Engine: 1.8L VVT-i', 'Power: 140 HP', 'Transmission: CVT', 'Drive: FWD'],
    specGroups: [
      {
        label: 'Engine',
        items: [
          { label: 'Type', value: '1.8L 4-cylinder VVT-i Petrol' },
          { label: 'Displacement (cc)', value: '1,798' },
          { label: 'Max Power (hp/rpm)', value: '140 / 6,400' },
          { label: 'Max Torque (N.m/rpm)', value: '173 / 4,000' },
          { label: 'Fuel System', value: 'Multi-point injection' },
        ],
      },
      {
        label: 'Transmission',
        items: [
          { label: 'Type', value: 'CVT Automatic' },
          { label: 'Drive', value: 'Front Wheel Drive (FWD)' },
        ],
      },
      {
        label: 'Suspension',
        items: [
          { label: 'Front', value: 'MacPherson strut' },
          { label: 'Rear', value: 'Torsion beam' },
        ],
      },
      {
        label: 'Brakes',
        items: [
          { label: 'Front', value: 'Ventilated disc' },
          { label: 'Rear', value: 'Drum' },
        ],
      },
      {
        label: 'Tyres',
        items: [{ label: 'Size', value: '195/65R15' }],
      },
      {
        label: 'Dimensions',
        items: [
          { label: 'Overall Length (mm)', value: '4,620' },
          { label: 'Overall Width (mm)', value: '1,775' },
          { label: 'Wheelbase (mm)', value: '2,700' },
        ],
      },
      {
        label: 'Capacity',
        items: [
          { label: 'Seating', value: '5 persons' },
          { label: 'Boot Capacity (L)', value: '470' },
          { label: 'Fuel Tank (L)', value: '50' },
        ],
      },
      {
        label: 'Performance',
        items: [
          { label: 'Fuel Economy (km/l)', value: '15' },
          { label: '0–100 km/h (sec)', value: '9.2' },
        ],
      },
      {
        label: 'Warranty',
        items: [{ label: 'Coverage', value: '3 years / 100,000 km' }],
      },
    ],
    images: [
      'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=1200&q=80&fit=crop',
      'https://images.unsplash.com/photo-1623869675781-80aa31012a5a?w=1200&q=80&fit=crop',
      'https://images.unsplash.com/photo-1590362891991-f776e747a588?w=1200&q=80&fit=crop',
      'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=1200&q=80&fit=crop',
      'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=1200&q=80&fit=crop',
      'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=1200&q=80&fit=crop',
    ],
  },
  {
    id: 'honda-civic',
    name: 'Honda Civic',
    model: 'FC1-GNKH',
    category: 'Cars',
    type: 'Sedan',
    inStock: true,
    image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=900&q=80&fit=crop',
    overview: 'The Honda Civic combines sporty styling with turbocharged performance and advanced driver assistance technology. Its VTEC Turbo engine delivers an exhilarating drive while maintaining excellent fuel economy for daily commuting.',
    specs: ['Engine: 1.5L VTEC Turbo', 'Power: 174 HP', 'Transmission: CVT', 'Drive: FWD'],
    specGroups: [
      {
        label: 'Engine',
        items: [
          { label: 'Type', value: '1.5L 4-cylinder VTEC Turbo' },
          { label: 'Displacement (cc)', value: '1,498' },
          { label: 'Max Power (hp/rpm)', value: '174 / 5,500' },
          { label: 'Max Torque (N.m/rpm)', value: '220 / 1,700–5,500' },
          { label: 'Fuel System', value: 'Direct injection' },
        ],
      },
      {
        label: 'Transmission',
        items: [
          { label: 'Type', value: 'CVT Automatic' },
          { label: 'Drive', value: 'Front Wheel Drive (FWD)' },
        ],
      },
      {
        label: 'Suspension',
        items: [
          { label: 'Front', value: 'MacPherson strut' },
          { label: 'Rear', value: 'Multi-link independent' },
        ],
      },
      {
        label: 'Brakes',
        items: [
          { label: 'Front', value: 'Ventilated disc' },
          { label: 'Rear', value: 'Solid disc' },
        ],
      },
      {
        label: 'Tyres',
        items: [{ label: 'Size', value: '235/40R18' }],
      },
      {
        label: 'Dimensions',
        items: [
          { label: 'Overall Length (mm)', value: '4,674' },
          { label: 'Overall Width (mm)', value: '1,802' },
          { label: 'Wheelbase (mm)', value: '2,735' },
        ],
      },
      {
        label: 'Capacity',
        items: [
          { label: 'Seating', value: '5 persons' },
          { label: 'Boot Capacity (L)', value: '519' },
          { label: 'Fuel Tank (L)', value: '47' },
        ],
      },
      {
        label: 'Performance',
        items: [
          { label: 'Fuel Economy (km/l)', value: '14' },
          { label: '0–100 km/h (sec)', value: '7.8' },
        ],
      },
      {
        label: 'Warranty',
        items: [{ label: 'Coverage', value: '3 years / 100,000 km' }],
      },
    ],
    images: [
      'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=1200&q=80&fit=crop',
      'https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=1200&q=80&fit=crop',
      'https://images.unsplash.com/photo-1590362891991-f776e747a588?w=1200&q=80&fit=crop',
      'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=1200&q=80&fit=crop',
      'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=1200&q=80&fit=crop',
      'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=1200&q=80&fit=crop',
    ],
  },
  {
    id: 'bmw-3-series',
    name: 'BMW 3 Series',
    model: 'G20-330i',
    category: 'Cars',
    type: 'Executive Sedan',
    inStock: true,
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=900&q=80&fit=crop',
    overview: 'The BMW 3 Series defines the executive sports sedan segment with its perfect 50:50 weight distribution, TwinPower Turbo engine, and driver-focused cockpit. It delivers an unmatched blend of performance, luxury, and cutting-edge technology.',
    specs: ['Engine: 2.0L TwinPower Turbo', 'Power: 255 HP', 'Transmission: 8-speed Steptronic', 'Drive: RWD'],
    specGroups: [
      {
        label: 'Engine',
        items: [
          { label: 'Type', value: '2.0L 4-cylinder TwinPower Turbo' },
          { label: 'Displacement (cc)', value: '1,998' },
          { label: 'Max Power (hp/rpm)', value: '255 / 5,000' },
          { label: 'Max Torque (N.m/rpm)', value: '400 / 1,550–4,400' },
          { label: 'Fuel System', value: 'High-precision direct injection' },
        ],
      },
      {
        label: 'Transmission',
        items: [
          { label: 'Type', value: '8-speed Steptronic Automatic' },
          { label: 'Drive', value: 'Rear Wheel Drive (RWD)' },
        ],
      },
      {
        label: 'Suspension',
        items: [
          { label: 'Front', value: 'Double-joint spring strut' },
          { label: 'Rear', value: '5-link independent' },
        ],
      },
      {
        label: 'Brakes',
        items: [
          { label: 'Front', value: 'Ventilated disc, 348 mm' },
          { label: 'Rear', value: 'Ventilated disc, 345 mm' },
        ],
      },
      {
        label: 'Tyres',
        items: [{ label: 'Size', value: '225/45R18 front, 255/40R18 rear' }],
      },
      {
        label: 'Dimensions',
        items: [
          { label: 'Overall Length (mm)', value: '4,709' },
          { label: 'Overall Width (mm)', value: '1,827' },
          { label: 'Wheelbase (mm)', value: '2,851' },
        ],
      },
      {
        label: 'Capacity',
        items: [
          { label: 'Seating', value: '5 persons' },
          { label: 'Boot Capacity (L)', value: '480' },
          { label: 'Fuel Tank (L)', value: '59' },
        ],
      },
      {
        label: 'Performance',
        items: [
          { label: 'Fuel Economy (km/l)', value: '13' },
          { label: '0–100 km/h (sec)', value: '5.8' },
        ],
      },
      {
        label: 'Warranty',
        items: [{ label: 'Coverage', value: '3 years / unlimited km' }],
      },
    ],
    images: [
      'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=1200&q=80&fit=crop',
      'https://images.unsplash.com/photo-1617531653332-bd46c16f4d68?w=1200&q=80&fit=crop',
      'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=1200&q=80&fit=crop',
      'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=1200&q=80&fit=crop',
      'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=1200&q=80&fit=crop',
      'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=1200&q=80&fit=crop',
    ],
  },
  {
    id: 'mercedes-c-class',
    name: 'Mercedes-Benz C-Class',
    model: 'W206-C200',
    category: 'Cars',
    type: 'Luxury Sedan',
    inStock: true,
    image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=900&q=80&fit=crop',
    overview: 'The Mercedes-Benz C-Class sets the benchmark for luxury sedans with its opulent MBUX infotainment system, handcrafted interior, and advanced driving assistance. The 2.0L EQ Boost engine seamlessly blends performance with efficiency.',
    specs: ['Engine: 2.0L EQ Boost', 'Power: 204 HP', 'Transmission: 9G-Tronic', 'Drive: RWD'],
    specGroups: [
      {
        label: 'Engine',
        items: [
          { label: 'Type', value: '2.0L 4-cylinder EQ Boost Petrol' },
          { label: 'Displacement (cc)', value: '1,999' },
          { label: 'Max Power (hp/rpm)', value: '204 / 5,800' },
          { label: 'Max Torque (N.m/rpm)', value: '300 / 1,800–4,000' },
          { label: 'Fuel System', value: 'Direct injection + ISG' },
        ],
      },
      {
        label: 'Transmission',
        items: [
          { label: 'Type', value: '9G-Tronic 9-speed Automatic' },
          { label: 'Drive', value: 'Rear Wheel Drive (RWD)' },
        ],
      },
      {
        label: 'Suspension',
        items: [
          { label: 'Front', value: '4-link independent' },
          { label: 'Rear', value: 'Multi-link independent' },
        ],
      },
      {
        label: 'Brakes',
        items: [
          { label: 'Front', value: 'Ventilated disc, 360 mm' },
          { label: 'Rear', value: 'Ventilated disc, 300 mm' },
        ],
      },
      {
        label: 'Tyres',
        items: [{ label: 'Size', value: '225/50R17 front, 245/45R17 rear' }],
      },
      {
        label: 'Dimensions',
        items: [
          { label: 'Overall Length (mm)', value: '4,751' },
          { label: 'Overall Width (mm)', value: '1,820' },
          { label: 'Wheelbase (mm)', value: '2,865' },
        ],
      },
      {
        label: 'Capacity',
        items: [
          { label: 'Seating', value: '5 persons' },
          { label: 'Boot Capacity (L)', value: '455' },
          { label: 'Fuel Tank (L)', value: '66' },
        ],
      },
      {
        label: 'Performance',
        items: [
          { label: 'Fuel Economy (km/l)', value: '14' },
          { label: '0–100 km/h (sec)', value: '7.3' },
        ],
      },
      {
        label: 'Warranty',
        items: [{ label: 'Coverage', value: '3 years / unlimited km' }],
      },
    ],
    images: [
      'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=1200&q=80&fit=crop',
      'https://images.unsplash.com/photo-1617531653332-bd46c16f4d68?w=1200&q=80&fit=crop',
      'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=1200&q=80&fit=crop',
      'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=1200&q=80&fit=crop',
      'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=1200&q=80&fit=crop',
      'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=1200&q=80&fit=crop',
    ],
  },
  {
    id: 'audi-a4',
    name: 'Audi A4',
    model: 'B9-40TFSI',
    category: 'Cars',
    type: 'Premium Sedan',
    inStock: true,
    image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=900&q=80&fit=crop',
    overview: 'The Audi A4 combines Quattro all-wheel drive with a refined 2.0 TFSI engine and Audi\'s signature Virtual Cockpit. Its progressive design, premium MMI infotainment, and driver assistance systems make it the choice for discerning professionals.',
    specs: ['Engine: 2.0L TFSI', 'Power: 190 HP', 'Transmission: 7-speed S tronic', 'Drive: Quattro AWD'],
    specGroups: [
      {
        label: 'Engine',
        items: [
          { label: 'Type', value: '2.0L 4-cylinder TFSI Petrol' },
          { label: 'Displacement (cc)', value: '1,984' },
          { label: 'Max Power (hp/rpm)', value: '190 / 4,200' },
          { label: 'Max Torque (N.m/rpm)', value: '320 / 1,450–4,200' },
          { label: 'Fuel System', value: 'TFSI direct injection' },
        ],
      },
      {
        label: 'Transmission',
        items: [
          { label: 'Type', value: '7-speed S tronic Dual-Clutch' },
          { label: 'Drive', value: 'Quattro All-Wheel Drive' },
        ],
      },
      {
        label: 'Suspension',
        items: [
          { label: 'Front', value: '5-link independent' },
          { label: 'Rear', value: 'Trapezoidal-link independent' },
        ],
      },
      {
        label: 'Brakes',
        items: [
          { label: 'Front', value: 'Ventilated disc, 312 mm' },
          { label: 'Rear', value: 'Solid disc, 300 mm' },
        ],
      },
      {
        label: 'Tyres',
        items: [{ label: 'Size', value: '225/50R17' }],
      },
      {
        label: 'Dimensions',
        items: [
          { label: 'Overall Length (mm)', value: '4,762' },
          { label: 'Overall Width (mm)', value: '1,842' },
          { label: 'Wheelbase (mm)', value: '2,820' },
        ],
      },
      {
        label: 'Capacity',
        items: [
          { label: 'Seating', value: '5 persons' },
          { label: 'Boot Capacity (L)', value: '480' },
          { label: 'Fuel Tank (L)', value: '58' },
        ],
      },
      {
        label: 'Performance',
        items: [
          { label: 'Fuel Economy (km/l)', value: '13' },
          { label: '0–100 km/h (sec)', value: '7.1' },
        ],
      },
      {
        label: 'Warranty',
        items: [{ label: 'Coverage', value: '3 years / unlimited km' }],
      },
    ],
    images: [
      'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=1200&q=80&fit=crop',
      'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=1200&q=80&fit=crop',
      'https://images.unsplash.com/photo-1617531653332-bd46c16f4d68?w=1200&q=80&fit=crop',
      'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=1200&q=80&fit=crop',
      'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=1200&q=80&fit=crop',
      'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=1200&q=80&fit=crop',
    ],
  },
]

const productsByCategory = {
  cars: allProducts.filter((p) => p.category === 'Cars'),
  hatchback: allProducts.filter((p) => p.category === 'Hatchback'),
}

export { allProducts, productsByCategory }
