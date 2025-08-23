import { hashPassword } from '../lib/auth.js';
import dbConnect from '../lib/mongodb.js';
import User from '../models/User.js';

const deliveryCenters = [
  { name: 'Sarat Bose Road DC', email: 'saratboseroadso@indiapost.gov.in' },
  { name: 'Ballygunge DC', email: 'ballygungeso@indiapost.gov.in' },
  {
    name: 'Jadavpur University DC',
    email: 'jadavpuruniversityso@indiapost.gov.in',
  },
  { name: 'Panchasayar DC', email: 'panchasayarso@indiapost.gov.in' },
];

const officeUsers = [
  { name: 'Baghajatin', email: 'baghajatinso@indiapost.gov.in' },
  {
    name: 'Baishnab Ghata Patuli Township',
    email: 'bptownshipsoso@indiapost.gov.in',
  },
  { name: 'Ballygunge', email: 'ballygungeso@indiapost.gov.in' },
  { name: 'Ballygunge RS', email: 'ballygungersso@indiapost.gov.in' },
  { name: 'Ballygunge SC', email: 'ballygungesccollegeso@indiapost.gov.in' },
  { name: 'Bijoygargh', email: 'bijoygarhso@indiapost.gov.in' },
  { name: 'Dhakuria', email: 'dhakuriaso@indiapost.gov.in' },
  { name: 'Doverlane', email: 'doverlaneso@indiapost.gov.in' },
  { name: 'East Kolkata Township', email: 'ektso@indiapost.gov.in' },
  { name: 'Ganguly Bagan', email: 'gangulybaganso@indiapost.gov.in' },
  { name: 'Garcha Road', email: 'garcharoadso@indiapost.gov.in' },
  { name: 'Garfa', email: 'garfaso@indiapost.gov.in' },
  { name: 'Garia Bus Terminal', email: 'gariabtso@indiapost.gov.in' },
  { name: 'Gariahat Market', email: 'gariahatmarketso@indiapost.gov.in' },
  { name: 'Golfgreen', email: 'golfgreenso@indiapost.gov.in' },
  { name: 'Golpark', email: 'golparkso@indiapost.gov.in' },
  { name: 'Haltu', email: 'haltuso@indiapost.gov.in' },
  { name: 'Jadavgargh', email: 'jadavgarhso@indiapost.gov.in' },
  {
    name: 'Jadavpur University',
    email: 'jadavpuruniversityso@indiapost.gov.in',
  },
  { name: 'Jodhpur Park', email: 'jodhpurparkso@indiapost.gov.in' },
  { name: 'K P Roy Lane', email: 'kproylaneso@indiapost.gov.in' },
  { name: 'Kalikapur', email: 'kalikapurso@indiapost.gov.in' },
  { name: 'Kasba', email: 'kasbakolkataso@indiapost.gov.in' },
  { name: 'Lake Gardens', email: 'lakegardensso@indiapost.gov.in' },
  { name: 'Lake Market', email: 'lakemarketso@indiapost.gov.in' },
  { name: 'Madurdaha', email: 'madurdahaso@indiapost.gov.in' },
  { name: 'Mukundapur', email: 'mukundapurso@indiapost.gov.in' },
  { name: 'Naktala', email: 'naktalaso@indiapost.gov.in' },
  { name: 'Panchasayar', email: 'panchasayarso@indiapost.gov.in' },
  { name: 'PGH Shah Road', email: 'pghshahroadso@indiapost.gov.in' },
  {
    name: 'Purbachal Main Road',
    email: 'purbanchalmainroadso@indiapost.gov.in',
  },
  { name: 'Raipur Jorabagan', email: 'raipurjorabaganroadso@indiapost.gov.in' },
  { name: 'Ras Behari Avenue', email: 'rashbehariavenueso@indiapost.gov.in' },
  { name: 'Regent Estate', email: 'regentestateso@indiapost.gov.in' },
  { name: 'RK Seva Pratisthan', email: 'rksevapratisthanso@indiapost.gov.in' },
  { name: 'Sammilani Mahavidyalaya', email: 'ssssharma365@gmail.com' },
  { name: 'Santoshpur Avenue', email: 'santoshpuravenueso@indiapost.gov.in' },
  { name: 'Santoshpur DSO', email: 'santoshpurso@indiapost.gov.in' },
  { name: 'Sarat Bose Road', email: 'saratboseroadso@indiapost.gov.in' },
  { name: 'Viveknagar', email: 'viveknagarkolkataso@indiapost.gov.in' },
];

async function seedUsers() {
  await dbConnect();
  console.log('Seeding users...');

  // Always require officeName
  async function createUserIfNotExists(email, password, role, officeName) {
    if (!officeName) {
      throw new Error(`Office name is required for user: ${email}`);
    }

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      const hashedPassword = await hashPassword(password);
      const userData = { email, password: hashedPassword, role, officeName };
      await User.create(userData);
      console.log(`✅ Created user: ${email} (${role}) - ${officeName}`);
    } else {
      console.log(`ℹ️ User already exists: ${email}`);
    }
  }

  // Create specific admin users (with officeName = 'Admin Office')
  await createUserIfNotExists(
    'aspos.southkolkata1@gmail.com',
    'admin123',
    'admin',
    'Admin SKFSD'
  );
  await createUserIfNotExists(
    'prasenjitpriyan@gmail.com',
    'admin123',
    'admin',
    'Admin SKFSD'
  );

  // Create office users (from real officeUsers array)
  for (const office of officeUsers) {
    await createUserIfNotExists(
      office.email,
      'office123',
      'office',
      office.name
    );
  }

  // Create delivery center users (using real emails)
  for (const dc of deliveryCenters) {
    await createUserIfNotExists(dc.email, 'delivery123', 'delivery', dc.name);
  }

  console.log('🎉 Users seeded successfully');
  process.exit(0);
}

seedUsers().catch((err) => {
  console.error('❌ Error seeding users:', err);
  process.exit(1);
});
